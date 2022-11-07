import axios from 'axios'

axios.get('/start')
    .then(function (response){
    console.log(response);
    })
    .catch(function (error){
        console.log(error);
    })
    .finally(function (){
        console.log("executado")
    });





// import express from 'express'

// const app = express()

// const port = 3000

// app.get('/', (req, res) =>{
//     res.send("Hello world")
//     //console.log("Está tudo bem")
// })

// app.listen(port, ()=> {
//     console.log("Exemplo")
// })