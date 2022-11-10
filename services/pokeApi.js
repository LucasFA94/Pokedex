const axios = require('axios');


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
    .then(result=>result)
    .catch(err=>console.err(err));
    }

    static getPokemonSpecie = (id) => {
        return this.#process("pokemon-species",id)
        .then(result=>result)
        .catch(err=>console.err(err));
    }

    static getPokemonFull = (id) =>{
        return axios.all([
            this.getPokemon(id), 
            this.getPokemonSpecie(id)
        ])
        .then(axios.spread((pokemon,pokemonSpecie)=>({
            name: pokemon.name,
            no: pokemonSpecie.pokedex_numbers[0].entry_number,
            gender: pokemonSpecie.gender_rate<0? "genderless": {male: 1, female: 2},
            types: pokemon.types.map((type)=>{
                return type.type.name;
            })
        })))
        .catch((err)=>{
            console.err(err.response.data);
        })
    }

}





module.exports = PokeApi;