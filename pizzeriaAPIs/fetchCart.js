const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bp = require('body-parser');

// IMPORTED MODEL
const {shoppingCartModel} = require('./models/shoppingCartModel');

const server = express();

// TO RESOLVE CORS ERROR
server.use(cors(
    {
        origin: "*" 
        // origin: "http://localhost:5173" 
    }
));

// IMPLEMENTING BODY-PARSER IN THE SERVER
server.use(bp.urlencoded({extended:true}));//if FALSE : uses 'qs library'  if TRUE: uses 'querystring' library for encoding

// IMPLEMENTING MIDDLEWARE TO PARSE JSON BODY
server.use(express.json());

// DATABASE CONNECTION DETAILS
const DB = "PizzeriaDB";
const connURL = "mongodb://127.0.0.1:27017/"+DB;

async function dbconnection() {
    try {
        await mongoose.connect(connURL);
        console.log("'fetchCart' Server Connected With 'PizzeriaDB' Sucessfully . . . ");
    } catch (err) {
        console.log("'fetchCart' Server Not Connected With 'PizzeriaDB', Error Occured: ",err);
    }
}

// SERVER REQUEST - 0
server.get('/',(req,res)=>{
    res.send(`
        <h1>PORT: 7003 . . . . RUNNING!</h1>
        <hr/>
        <h1>Valid Requests To The Server:</h1>
        <h2><a href="http://localhost:7003/fetchCart/allCarts">..../fetchCart/all</a></h2>
        <h2>[POST METHOD]..../fetchCart/userCart {"userID","password"}</h2>
         
    `)
})

// SERVER REQUEST - 1
server.get('/fetchCart/allCarts',async (req,res)=>{
    try{
        let shoppingCartDataFromDB = await shoppingCartModel.find();
        res.send(shoppingCartDataFromDB);
        console.log("Details Of All order's Present in Shopping Cart Received from DB sucessfully.")
    }catch(err){
        console.log("Error Receiving Data from DB",err);
        res.status(500).send("Internal Server Error !");
    }
})

// SERVER REQUEST - 2
server.post('/fetchCart/userCart',async (req,res)=>{
    try{
        let specificUserCartDataFromDB = await shoppingCartModel.findOne({userID:req.body.userID, password:req.body.password});
        console.log("Details Of Specified user cart Received from DB sucessfully.")
        res.send(specificUserCartDataFromDB); 
    }catch(err){
        console.log("Error Receiving Data from DB",err);
        res.status(500).send("Internal Server Error !");
    }
})

server.listen(7003,()=>{
    dbconnection();
    console.log("fetchCart server is running at port:7003");
})