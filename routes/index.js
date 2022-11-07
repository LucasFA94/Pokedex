const {pokeApi, getPokemon} = require("../services/pokeApi");
const { default: axios } = require('axios');


var express = require('express');

var router = express.Router();



/* GET home page. */
router.get('/:id', async function(req, res, next) {

  let id = req.params.id;

  getPokemon(id)
  .then(result=> res.render('index', {
    pokemon: result
  }));


});

module.exports = router;
