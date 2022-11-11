const axios = require('axios');
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
        .then(axios.spread((pokemon,pokemonSpecie)=>({
            pictures:{
                oficial: pokemon.sprites.other.home.front_default
            },
            name: this.#makingName(pokemon.name),
            nameList: this.#allNames(pokemonSpecie.names),
            no: pokemonSpecie.pokedex_numbers[0].entry_number,
            gender: pokemonSpecie.gender_rate<0? "genderless": {male: 1, female: 2},
            types: pokemon.types.map((type)=>{
                return this.#makingName(type.type.name);
            })
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
        let result = list.map((lang)=>{
            let name = lang.name
            let lName = lang.language.name
            let language = ISO6391.getName(lName);
            return {language:language, name:name};
        }).filter((lang)=> lang.language !== "")

        return result;

    }

}





module.exports = PokeApi;