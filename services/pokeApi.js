var axios = require('axios');

//base pokeUrl
const pokeApi = axios.create({
    baseURL: "https://pokeapi.co/api/v2"
});

//process
const process = (string,id)=> {
    return pokeApi.get(`${string}/${id}`)
    .then(response=> response.data)
    .catch(err=>{
        console.log(`Error: ${err}`)
    })
}

//Catch pokemon data
const getPokemon = (id) => {
        
    return process("pokemon",id)
    .then(result=>result)

}

const getPokemonSpecie = (id) => {
    return process("pokemon-species",id)
    .then(result=>result)
}


const getPokemonFull = (id) =>{
    return axios.all([
        getPokemon(id), 
        getPokemonSpecie(id)
    ]).then(axios.spread((pokemon,pokemonSpecie)=>({
        name: pokemon.name,
        no: pokemonSpecie.pokedex_numbers[0].entry_number,
        gender: pokemonSpecie.gender_rate<0? "genderless": {male: 1, female: 2},
        types: pokemon.types.map((type)=>{
            return type.type.name;
        })
    })))
}
module.exports = {getPokemon, getPokemonSpecie, getPokemonFull};