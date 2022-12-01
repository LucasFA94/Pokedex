const axios = require('axios');
const {getAbilities} = require('../services/PokeApiAbility')
const ISO6391 = require('iso-639-1')

class PokeApi{
    //base pokeUrl

    static #pokeApi = axios.create({
        baseURL: "https://pokeapi.co/api/v2"
    });
  

    //process
    static #process = (string,id)=> {
        return this.#pokeApi.get(`${string}/${id}`)
        .then(response=> response.data)
        .catch(err=>{
            console.log(`Error: ${err}`)
        })
    }

    //Catch pokemon data
    static getPokemon = (id) => {
    return this.#process("pokemon",id)
    .then(response=>response)
    .catch(err=>console.err(err));
    }
    //Catch pokemon by Specie 
    static getPokemonSpecie = (id) => {
        return this.#process("pokemon-species",id)
        .then(response=>response)
        .catch(err=>console.err(    err));
    }

    //catch mostly information
    static getPokemonFull = (id) =>{
        return axios.all([
            this.getPokemon(id), 
            this.getPokemonSpecie(id)
        ])
        .then(axios.spread(({name, types, height, weight, abilities},{names, pokedex_numbers, gender_rate, genera, capture_rate, hatch_counter})=>(
            {
            pictures:{
                oficial: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
            },
            name: this.#makingName(name),
            nameList: this.#allNames(names),
            no: pokedex_numbers[0].entry_number,
            gender: gender_rate<0? "genderless": {male: 1, female: 2},
            types: types.map(({type:{name}})=>{
                return this.#makingName(name);
            }),
            classification: this.#getGenus(genera),
            height: this.#getHeight(height),
            weight: this.#getWeight(weight),
            captureRate: capture_rate,
            hatch: this.#getHatchCounter(hatch_counter),
            abilities: getAbilities(abilities)
        })))
        .catch((err)=>{
            console.err(err.response.data);
        })
    }

    //private functions
    //Capitalize
    static #makingName = (String)=>{
        return String[0].toUpperCase() + String.substr(1);
    }

    //Get names from other language
    static #allNames = (list)=>{
        let result = list.map(({name,language})=>{
            let lname = name;
            let cName = language.name;
            let cLanguage = ISO6391.getName(cName);
            return {language:cLanguage, name:lname};
        }).filter(({language})=> language !== "")

        return result;

    }

    //Get Classification in en
    static #getGenus = (values)=>{
        const result = values.find(({language:{name}}) => name == "en");
        return result.genus;
    }

    //get height in meters
    static #getHeight = (h)=>{
        let height = h/ 10.0;
        return `${height}m`;
    }

    //get weight in kg
    static #getWeight = (w)=>{
        let weight = w/ 10.0;
        return `${weight}kg`;
    }

    //get hatch counter
    static #getHatchCounter = (n) =>{
        return n * 256;
    }

}





module.exports = PokeApi;