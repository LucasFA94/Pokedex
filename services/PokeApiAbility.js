const axios = require('axios');
class PokeApiAbility{

    //get abilities
    static getAbilities = (a) =>{
        let obj = {ability:[], hidden: ''}
        a.forEach(ability=>{
            this.#getAbilityByUrl(ability.ability.url);
            //let value = this.#makingName(ability.ability.name);
            let value = ability.ability.name;
            ability.is_hidden? obj.hidden = value : obj.ability.push(value);  
        })
        
        return obj;


    }

    //get Ability https://pokeapi.co/api/v2/ability/31/
    static #getAbilityByUrl = (a)=>{
        
        axios({
            method: "get",
            url: a
        }).then(response =>{
            let abilityNames = response.data.names;
            let ability = abilityNames.find((lang)=> lang.language.name === 'en')
            console.log(ability.name);
        })
    } 
}

module.exports = PokeApiAbility;