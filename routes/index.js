const {getPokemonFull} = require("../services/pokeApi");

let {Pokemon} = require ('../class/Pokemon')

var express = require('express');

var router = express.Router();



/* GET home page. */
router.get('/:id', function(req, res, next) {

  let id = req.params.id;


  getPokemonFull(id)
  .then(result=> {
     res.render('index', {
     pokemon: result
  })}
  )
  .catch(err=>{
    console.log(`Error: ${err}`)
})



});

module.exports = router;
