let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');

// BODY-PARSER TO PARSE THE ENCODED DATA FROM POST REQUESTS BODY
let bp = require('body-parser');

// IMPORTED MODEL
let { shoppingCartModel } = require('./models/shoppingCartModel');

let server = express();

// TO RESOLVE CORS ERROR
server.use(cors(
    {
        origin: "*" 
        // origin: "http://localhost:5173" 
    }
));

// IMPLEMENTING BODY-PARSER IN THE SERVER
server.use(bp.urlencoded({extended:true}));

// IMPLEMENTING MIDDLEWARE TO PARSE JSON BODY
server.use(express.json());

// DATABASE CONNECTION DETAILS
let DB = "PizzeriaDB";
let connURL = "mongodb://127.0.0.1:27017/"+DB;

// DATABASE CONNECTION
async function dbconnection(){
    try{
        await mongoose.connect(connURL);
        console.log("'deleteFromCart' Server Connected With 'PizzeriaDB' Sucessfully . . .");
    }catch(err){
        console.log("'insertToCart' Server Not Connected With 'PizzeriaDB', Error Occured: ",err);
    }
}

// SERVER REQUEST - 0
server.get('/',(req,res)=>{
    res.send(`
        <h1>PORT: 7005 . . . . RUNNING!</h1>
        <hr/>
        <h1>Valid Requests To The Server:</h1>
        <h2>[POST METHOD]..../deleteFromCart/allOrders {"userID"}</h2>
        <h2>[POST METHOD]..../deleteFromCart/oneOrder {"userID","orderNo"}</h2>
        `)
})

// SERVER REQUEST - 1
server.post('/deleteFromCart/allOrders',async (req,res)=>{
    try{
        let uID = req.body.userID;
        await shoppingCartModel.updateOne({userID:uID},{$set : {cartDetails:[]}});
        await shoppingCartModel.updateOne({userID:uID},{$set : {totalOrderCost:0}})
        res.send("All Orders in your cart Deleted Sucessfully !");
    }catch(err){
        console.log("Error While deleting Data To DB",err);
        res.status(500).send("Internal Server Error !");
    }
})

// SERVER REQUEST - 2
server.post('/deleteFromCart/oneOrder',async (req,res)=>{
    try{
        
        let uID = req.body.userID;

        let oNum = Number(req.body.orderNo);
       
        // GETTING THE COMPLETE USER OBJECT FROM THE DB TO EXTRACT THE CART DETAILS
        let completeUserCartObject = await shoppingCartModel.findOne({userID:uID});
       
        // EXTRACTING THE CART DETAILS
        let orderInCartBeforeDeleting =  completeUserCartObject.cartDetails;
        
        if(orderInCartBeforeDeleting.length === 0){
            res.send("cart is already Empty !")
        }else{

            // FILTERING OUT THE OBJECT TO BE DELETED FOR FURTHER CLEANUP TASK
            let orderToBeDeleted = orderInCartBeforeDeleting.filter((e) => e.orderNo === oNum);
            
            // FILTERING OUT THE ORDERS THAT ARE NOT TO BE DELETED
            let orderInCartAfterDeleting = orderInCartBeforeDeleting.filter((e) =>  e.orderNo !== oNum );
            
            // RE-ORDERING THE ORDERS BY ASIGNING THE ORDER-NO IN SEQUENCE
            let temp = 1;
            orderInCartAfterDeleting.forEach((e)=>{
                e.orderNo = temp;
                temp++; 
            });
            
            // CALCULATING NEW TOTAL PRICE OF CART AFTER DELETING
            let totalOrderCostAfterDelete = completeUserCartObject.totalOrderCost - orderToBeDeleted[0].currentOrderCost;
            
            // UPDATING THE DATA IN DB
            await shoppingCartModel.updateOne({userID:uID},{$set : { cartDetails : orderInCartAfterDeleting }});
            await shoppingCartModel.updateOne({userID:uID},{$set : { totalOrderCost : totalOrderCostAfterDelete }});

            console.log(orderToBeDeleted);
            console.log("Above order is deleted from db")

            res.send("Deleted Specified Order from the Cart Sucessfully . . .")

        }
        

    }catch(err){
        console.log("Error While deleting Data To DB",err);
        res.status(500).send("Internal Server Error !");
    }
})

server.listen(7005,()=>{
    dbconnection();
    console.log("deleteFromCart server is running on port: 7005");
})