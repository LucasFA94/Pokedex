const {getPokemonFull, getPokemon, process} = require("../services/PokeApi");



var express = require('express');

var router = express.Router();



/* GET home page. */
router.get('/:id', function(req, res, next) {

  let id = req.params.id;

  getPokemonFull(id)
  .then(result=> {
     res.render('index', {
     pokemon: result
  })})
  .catch(err=>{
    console.err(`Error: ${err}`)
})


});

module.exports = router;
