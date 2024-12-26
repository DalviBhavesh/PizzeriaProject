const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// IMPORTED MODEL
const {ingredientsModel} = require('./models/ingredientsModel');


const server = express();

// TO RESOLVE CORS ERROR
server.use(cors(
    {
        origin: "*" 
        // origin: "http://localhost:5173" 
    }
));

// DATABASE CONNECTION DETAILS
const DB = "PizzeriaDB";
const connURL = "mongodb://127.0.0.1:27017/"+DB;

// DATABASE CONNECTION
async function dbconnection(){
    try{
        await mongoose.connect(connURL);
        console.log("'fetchIngredients' Server Connected With 'PizzeriaDB' Sucessfully . . . ")
    }catch(err){
        console.log("'fetchIngredients' Server Not Connected With 'PizzeriaDB', Error Occured: ",err);
    }
    
}

// SERVER REQUEST - 0
server.get('/',(req,res)=>{
    res.send(`
        <h1>PORT: 7002 . . . . RUNNING!</h1>
        <hr/>
        <h1>Valid Requests To The Server:</h1> 
        <h2><a href="http://localhost:7002/fetchIngredients/all">..../fetchIngredients/all</a></h2>
        <h2><a href="http://localhost:7002/fetchIngredients/101">..../fetchIngredients/:id (fetching id: 101)</a></h2>   
    `)
})

// SERVER REQUEST - 1
server.get('/fetchIngredients/all',async(req,res)=>{
    try{
        let ingredientsDataFromDB = await ingredientsModel.find();
        console.log("Details Of All Ingredient's Present in DB Received sucessfully.")
        res.send(ingredientsDataFromDB);
    }catch(err){
        console.log("Error Receiving Data from DB",err);
        res.status(500).send("Internal Server Error !");
    }
})

// SERVER REQUEST - 2
server.get('/fetchIngredients/:id',async(req,res)=>{
    try{
        let ingredientsID = Number(req.params.id);
        let ingredientsDataFromDB = await ingredientsModel.find({id:ingredientsID});
        console.log("Details Of specified Ingredient ID Present in DB Received sucessfully.")
        res.send(ingredientsDataFromDB);
    }catch(err){
        console.log("Error Receiving Data from DB",err);
        res.status(500).send("Internal Server Error !");
    }
})

server.listen(7002,()=>{
    dbconnection();
    console.log("fetchIngredients server is running at port:7002");
})
