const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// BODY-PARSER TO PARSE THE ENCODED DATA FROM POST REQUESTS BODY
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

// DATABASE CONNECTION
async function dbconnection(){
    try {
        await mongoose.connect(connURL);
        console.log("'insertToCart' Server Connected With 'PizzeriaDB' Sucessfully . . . ");
    } catch (err) {
        console.log("'insertToCart' Server Not Connected With 'PizzeriaDB', Error Occured: ",err);
    }
}

// SERVER REQUEST - 0
server.get('/',(req,res)=>{
    res.send(`
        <h1>PORT: 7004 . . . . RUNNING!</h1>
        <hr/>
        <h1>Valid Requests To The Server:</h1>
        <h2>[POST METHOD]..../insertToCart/newUserCart {"userID","password","username"}</h2>
        <h2>[POST METHOD]..../insertToCart/newOrder {"userID","orderDetails"}</h2>
         
    `)
})



// SERVER REQUEST - 1
// TO ADD USER AND INITIALIZE CART DETAILS
server.post("/insertToCart/newUserCart",async (req,res)=>{
     
    try{

        let initialData = {
            "userID": "",
            "password": "",
            "userName": "user",
            "cartDetails": [],
            "totalOrderCost": 0,
          }

        orderData = req.body;
        initialData.userID = orderData.userID;
        initialData.password = orderData.password;
        if(orderData.username){
            initialData.userName = orderData.username;
        }
        
        
        let newOrder = new shoppingCartModel(initialData);
        
        await newOrder.save()
        console.log(orderData);
        console.log("New user with empty cart created Successfully!")
        
        res.status(200).send("New user with empty cart created Successfully!");
    }catch(err){
        console.log("Error While Saving Data To DB",err);
        res.status(500).send("Internal Server Error !");
    }
})

// SERVER REQUEST - 2
// TO ADD ORDERS INTO THE CART OF PARTICULAR USER
server.post("/insertToCart/newOrder",async (req,res)=>{
    
    try{
        
        let orderData = req.body;

        let uID = orderData.userID;
        let newOrder = req.body.orderDetails;
        
        let userCartDetails = await shoppingCartModel.findOne({userID:uID}); 
        
        let previousOrdersInCart = userCartDetails.cartDetails;
        
        //UPDATE THE ORDER NO OF NEW ORDER
        newOrder.orderNo = previousOrdersInCart.length+1;

        // UPDATE THE CURRENT ORDER COST
        let extraIngredients = newOrder.extraIngredientsDetails;
        let totalCostOfIngredients = 0;
        
        // ITERATING THE ARRAY FOR CALCULATING TOTAL COST
        extraIngredients.forEach((obj)=>{totalCostOfIngredients += obj.price});

        // SETTING THE CURRENT COST
        newOrder.currentOrderCost = (newOrder.pizzaDetails.price+totalCostOfIngredients)*(newOrder.pizzaQuantity)

        //ADD THE NEW ORDER IN THE PREVIOUS CART ORDERS
        userCartDetails.cartDetails.push(newOrder);

        //UPDATE THE TOTAL COST OF CART
        userCartDetails.totalOrderCost +=  newOrder.currentOrderCost;

        //FINALLY UPDATE THE CHANGES IN THE DB
        await shoppingCartModel.updateOne({userID:uID},{$set : {cartDetails : userCartDetails.cartDetails}});
        await shoppingCartModel.updateOne({userID:uID},{$set : {totalOrderCost: userCartDetails.totalOrderCost}})
        
        // console.log(userCartDetails);
        res.send("Order Added to the Cart Sucessfully");

    }catch(err){
        console.log("Error While Saving Data To DB",err);
        res.status(500).send("Internal Server Error !");
    }

})


server.listen(7004,()=>{
    dbconnection()
    console.log("insertToCart server is running at port:7004");
})