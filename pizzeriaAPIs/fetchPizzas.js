const express = require('express');
const mongoose = require('mongoose');
// const schema = mongoose.Schema;

// IMPORTED MODEL
const {pizzaModel} = require('./models/pizzaModel');
const cors = require('cors');

const server = express();

// TO RESOLVE CORS ERROR
server.use(cors(
    {
        origin: "*" 
        // origin: "http://localhost:5173" 
    }
));


// CREATED SCHEMA
// let pizzaSchema = new schema(
//     {
//         id: {
//           type: String,
//           required: true
//         },
//         type: {
//           type: String,
//           enum: ['veg', 'non-veg'], // Assuming only two types: veg and non-veg
//           required: true
//         },
//         price: {
//           type: Number,
//           required: true,
//           min: 0 // Ensures price is non-negative
//         },
//         name: {
//           type: String,
//           required: true
//         },
//         image: {
//           type: String,
//           required: true
//         },
//         description: {
//           type: String,
//           required: true
//         },
//         ingredients: {
//           type: [String],
//           required: true
//         },
//         topping: {
//           type: [String],
//           required: true
//         }
//       }
// );

// DATABASE CONNECTION DETAILS
const DB = "PizzeriaDB";
const connURL = "mongodb://127.0.0.1:27017/"+DB;

// DATABASE CONNECTION
async function dbconnection() {
    try{
        await mongoose.connect(connURL)
        console.log("'fetchPizzas' Server Connected With 'PizzeriaDB' Sucessfully . . . ")
    }catch(err){
        console.log("'fetchPizzas' Server Not Connected With 'PizzeriaDB', Error Occured: ",err);
    }
}

// CREATING MODEL
//let pizzaModel = mongoose.model('Pizzas',pizzaSchema);

// SERVER REQUEST - 0
server.get('/',(req,res)=>{
    res.send(`
        <h1>PORT: 7001 . . . . RUNNING!</h1>
        <hr/>
        <h1>Valid Requests To The Server:</h1>
        <h2><a href="http://localhost:7001/fetchPizzas/all">..../fetchPizzas/all</a></h2>
        <h2><a href="http://localhost:7001/fetchPizzas/0001">..../fetchPizzas/:id (fetching id: 0001)</a></h2>
         
    `)
})

// SERVER REQUEST - 1
server.get('/fetchPizzas/all',async (req,res)=>{
    try{
        const pizzasDataFromDB = await pizzaModel.find();
        console.log("Details Of All pizza's Present in DB Received sucessfully.")
        res.send(pizzasDataFromDB);
    }catch(err){
        console.log("Error Receiving Data from DB",err);
        res.status(500).send("Internal Server Error !");
    }
})

// SERVER REQUEST - 2
server.get('/fetchPizzas/:id',async (req,res)=>{
    try{
        const pizzaID = req.params.id;
        const pizzasDataFromDB = await pizzaModel.find({id:pizzaID});
        console.log("Details Of specified pizza ID Present in DB Received sucessfully.")
        res.send(pizzasDataFromDB);
    }catch(err){
        console.log("Error Receiving Data from DB",err);
        res.status(500).send("Internal Server Error !");
    }
})


server.listen(7001,()=>{
    dbconnection()
    console.log("fetchPizza server is running at port:7001");
})