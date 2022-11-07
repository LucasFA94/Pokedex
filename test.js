import axios from 'axios'

axios.get('/start?ID=12345')
    .then(function (response){
    console.log(response);
    })
    .catch(function (error){
        console.log(error);
    })
    .finally(function (){
        console.log("executado")
    });


axios.get('/user', {
    params: {
        ID: 12345
    }
})
.then(function (response){
    console.log(response);
})
.catch(function (error){
    console.log(error)
})
.then(function (){
    console.log("executado")
})

async function getUser(){
    try{
        const response = await axios.get('/user?ID=12345');
        console.log(response);
    } catch (error){
        console.error(error)
    }
}


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