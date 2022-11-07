var axios = require('axios');

//base pokeUrl
const pokeApi = axios.create({
    baseURL: "https://pokeapi.co/api/v2"
});

//Catch pokemon data
const getPokemon = (id) => {
        return pokeApi.get(`pokemon/${id}`)
            .then(r=> {return r.data});

}

module.exports = {pokeApi, getPokemon};