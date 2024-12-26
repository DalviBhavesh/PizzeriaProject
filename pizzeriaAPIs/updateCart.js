let express = require('express');
let mongoose = require('mongoose');
let cors = require('cors');

// BODY-PARSER TO PARSE THE ENCODED DATA FROM POST REQUESTS BODY
let bp = require('body-parser');

// IMPORTED MODEL
let {shoppingCartModel} = require('./models/shoppingCartModel');
// let {ingredientsModel} = require('./models/ingredientsModel');

let server = express();

// TO RESOLVE CORS ERROR
server.use(cors(
    {
        origin: "*" 
        // origin: "http://localhost:5173" 
    }
));

// IMPLEMENTING MIDDLEWARE TO PARSE JSON BODY
server.use(express.json());

// IMPLEMENTING BODY-PARSER IN THE SERVER
server.use(bp.urlencoded({extended:true}));

// DATABASE CONNECTION DETAILS
const DB = "PizzeriaDB";
const connURL = "mongodb://127.0.0.1:27017/"+DB;

// DATABASE CONNECTION
async function dbconnection(){
    try{
        await mongoose.connect(connURL);
        console.log("updateCart server connected to PizzeriaDB Sucessfully")
    }catch(err){
        console.log("updateCart server Not connected to PizzeriaDB, Error Occured: ",err);
    }
}

// // RECEIVE INFO OF ALL INGREDIENTS AVAILABLE IN DB
// let allAvailableIngredients;

// // FUNCTION TO GET  INGREDIENTS
// async function getIngredients() {
//     try{
//         allAvailableIngredients = await ingredientsModel.find();
//         console.log("All Ingredients Available in DB Received by the updateCart Server");
//     }catch(err){
//         console.log("Error occured while fetching All available Ingredients from the Db: ",err);
//     }
// }

// server REQUEST - 0
server.get('/',(req,res)=>{ 
    res.send(`
            <h1>PORT: 7004 . . . . RUNNING!</h1>
            <hr/>
            <h1>Valid Requests To The Server:</h1>
            <h2>[POST METHOD]..../updateCart/addExtraIngredients {"userID","orderNo","extraIngredientsDetails[{Array},{of},{objets}]"}</h2>
            <h2>[POST METHOD]..../updateCart/removeExtraIngredients {"userID","orderNo","id"}</h2>
            <h2>[POST METHOD]..../updateCart/changePizzaQuantity {"userID","orderNo","pizzaQuantity"}</h2>
            
        `);
})

// SERVER REQUEST - 1
server.post('/updateCart/addExtraIngredients',async (req,res)=>{
    try {
        let uID = req.body.userID;
        let oNum = req.body.orderNo
        let xIngredients = req.body.extraIngredientsDetails;
        
        let xIngredientsCost = 0;
        let quantityOfPizzas = 0;
        let xIngredientsCostForTotalQuantityOfPizza = 0;
        let targetedOrder;


        let userCartDetails = await shoppingCartModel.findOne({userID:uID});

        let allOrdersInCart = userCartDetails.cartDetails;

        
        // FINDING TARGET ORDER
        if(allOrdersInCart.length > 0){
            allOrdersInCart.forEach((order)=>{
                if(order.orderNo === oNum){
                    targetedOrder = order; 
                }
            })
        }

        // EXTRA INGREDIENTS ALREADY PRESENT
        let xIngredientsAlreadyPresent = targetedOrder.extraIngredientsDetails;

        // #IMPORTANT: TO REMOVE DUPLICATE DATA 
        // FILTERING EXTRA INGREDIENTS THAT ARE ALREADY PRESENT AND STILL THERE IN xIngredients
        xIngredients = await xIngredients.filter((xIng)=>{
                                return !xIngredientsAlreadyPresent.some((xIngAP) => xIng.id === xIngAP.id);
                            })

        // CALCULATING THE COST OF EXTRA INGREDIENTS FOR SINGLE PIZZA
        if(xIngredients.length > 0){
            xIngredients.forEach((obj)=>{
                xIngredientsCost += obj.price;
            })
        }

        // FETCHING THE TOTAL QUANTITY OF PIZZA OF THE TARGETED ORDER
        if(targetedOrder){
            quantityOfPizzas = targetedOrder.pizzaQuantity
        }

        // SETTING THE FINAL PRICE OF EXTRA INGREDIENTS
        xIngredientsCostForTotalQuantityOfPizza = xIngredientsCost*quantityOfPizzas;

        let newCurrentOrderCost = targetedOrder.currentOrderCost + xIngredientsCostForTotalQuantityOfPizza;

        // CALCULATING THE TOTAL COST OF THE COMPLETE CART 
        let newTotalOrderCost = userCartDetails.totalOrderCost + xIngredientsCostForTotalQuantityOfPizza;
        
        // UPDATING THE LOCAL COPY OF ARRAY OF ALL ORDERS WITH NEW DATA
        allOrdersInCart.map((order)=>{
            if(order.orderNo === oNum){
                order.extraIngredientsDetails = [...order.extraIngredientsDetails,...xIngredients];
                order.currentOrderCost = newCurrentOrderCost;

                //Changed Code Start
                const nonVegIngredients = ["Pepperoni", "Chicken"];
                if(order.pizzaDetails.name === 'Customized Pizza'){
                    order.pizzaDetails.type = order.extraIngredientsDetails?.some((xIng) =>nonVegIngredients.includes(xIng.tname))
                    ? "non-veg"
                    : "veg";
                }
                //Changed Code End   

            }
        })

        await shoppingCartModel.updateOne({userID:uID},{$set: {cartDetails:allOrdersInCart}});
        await shoppingCartModel.updateOne({userID:uID},{$set: {totalOrderCost:newTotalOrderCost}})

        res.send(`Extra Ingredients Added Successfully ${xIngredients}`)   

    } catch (err) {
        console.log("Error While Saving Data To DB",err);
        res.status(500).send("Internal Server Error !");
    }
})

// SERVER REQUEST - 2
server.post('/updateCart/removeExtraIngredients',async (req,res)=>{
    try {
        
        let uID = req.body.userID;
        let oNum = req.body.orderNo;
        let xIngredientID = req.body.id;

        let userCartDetails = await shoppingCartModel.findOne({userID:uID});
        let allOrdersInCart = userCartDetails.cartDetails;

        let targetedOrder;
        
        // FINDING TARGET ORDER
        if(allOrdersInCart.length > 0){
            allOrdersInCart.forEach((order)=>{
                if(order.orderNo === Number(oNum)){
                    targetedOrder = order; 
                }
            })
        }

        // FETCHING QUANTIY OF PIZZA IN THE TARGETED ORDER
        let pQuantity = targetedOrder.pizzaQuantity; 
        console.log("quantity: "+pQuantity)
        // FETCHING TOTAL PRICE OF TARGET ORDER BEFORE DELETING 
        //let orderPriceBeforeDeleting = targetedOrder.currentOrderCost

        // FETCHING TOTAL PRICE OF THE CART BEFORE DELETING
        let totalPriceOfCartBeforeDeleting = userCartDetails.totalOrderCost;

        // ALL EXTRA INGREDIENTS DETAILS BEFORE DELETING
        let xIngredientsBeforeDeleteing = targetedOrder.extraIngredientsDetails;

        // TARGETED EXTRA INGREDIENT DETAILS 
        let xIngredientData;
        xIngredientsBeforeDeleteing.forEach((xIng)=>{
            if(xIng.id === xIngredientID){
                xIngredientData = xIng;
            }
        });
        let xIngredientPrice = xIngredientData.price;
        console.log("Price: "+xIngredientPrice);

        let costToBeDeletedFromCurrentOrderCost = xIngredientPrice*pQuantity;

        // UPDATING AND CALIBERATING THE DATA IN THE LOCAL COPY OF ARRAY ALL ORDERS IN CART
        allOrdersInCart.map((order)=>{
            if(order.orderNo === oNum){
                order.extraIngredientsDetails = order.extraIngredientsDetails.filter((xIng)=>xIng.id !== xIngredientID);
                order.currentOrderCost = order.currentOrderCost - costToBeDeletedFromCurrentOrderCost;
                
                //Changed Code Start
                const nonVegIngredients = ["Pepperoni", "Chicken"];
                if(order.pizzaDetails.name === 'Customized Pizza'){
                    order.pizzaDetails.type = order.extraIngredientsDetails?.some((xIng) =>nonVegIngredients.includes(xIng.tname))
                    ? "non-veg"
                    : "veg";
                }
                //Changed Code End    
            }
        })

        console.log("Cost to be subracted: "+costToBeDeletedFromCurrentOrderCost);
        
        // UPDATING TOTAL COST OF THE USER CART AFTER DELETING
        let totalOrderCostAfterDeleting = totalPriceOfCartBeforeDeleting - costToBeDeletedFromCurrentOrderCost

        console.log("Total cost reduced from "+totalPriceOfCartBeforeDeleting+" to "+totalOrderCostAfterDeleting+" !");

        await shoppingCartModel.updateOne({userID:uID},{$set: {cartDetails : allOrdersInCart}});
        await shoppingCartModel.updateOne({userID:uID},{$set: {totalOrderCost : totalOrderCostAfterDeleting}})

        res.send("Removed Undesired Extra Ingredient Sucessfully . . .");

    } catch (err) {
        console.log("Error While Saving Data To DB",err);
        res.status(500).send("Internal Server Error !");
    } 
})

// SERVER REQUEST - 3
server.post('/updateCart/changePizzaQuantity',async (req,res)=>{
    try{

        let uID = req.body.userID;
        let oNum = req.body.orderNo;
        let newQuantity =  req.body.pizzaQuantity;

        // INPUT VALIDATION
        if (!uID || !oNum || newQuantity == null) {
            return res.status(400).send("Missing required fields: userID, orderNo, or pizzaQuantity.");
        }

        // CHECK QUANTITY
        if(newQuantity <= 0){
            res.status(400).send("INVALID INPUT: Quantity of pizza should not be smaller then 1")
        }else{
            let userCartDetails = await shoppingCartModel.findOne({userID:uID});
            let allOrdersInCart = userCartDetails.cartDetails;

            let totalOrderCostBeforeChange = userCartDetails.totalOrderCost;

            let targetedOrder;
            allOrdersInCart.forEach((order)=>{
                if(order.orderNo === oNum){
                    targetedOrder = order;
                }
            })

            let currentOrderQuantityBeforeChange = targetedOrder.pizzaQuantity;
            let currentOrderCostBeforeChange = targetedOrder.currentOrderCost
            let costOfSingleUnitOfOrder = currentOrderCostBeforeChange/currentOrderQuantityBeforeChange;
            

            let finalCurrentOrderCostAfterChange = costOfSingleUnitOfOrder*newQuantity;

            let totalOrderCostRemovingInitialCurrentOrderCost = totalOrderCostBeforeChange - currentOrderCostBeforeChange;

            let finalTotalOrderCostAfterAddingChangedCurrentOrderCost = totalOrderCostRemovingInitialCurrentOrderCost + finalCurrentOrderCostAfterChange;   
            
            // console.log("Total Order Cost BEFORE:"+totalOrderCostBeforeChange);
            // console.log("initial order cost: "+currentOrderCostBeforeChange)
            // console.log("total order cost After removing 1 order: "+totalOrderCostRemovingInitialCurrentOrderCost)
            // console.log("changed order cost: "+finalCurrentOrderCostAfterChange)
            // console.log(`total: ${finalTotalOrderCostAfterAddingChangedCurrentOrderCost}`)

            allOrdersInCart.map((order)=>{
                if(order.orderNo === oNum){
                    order.pizzaQuantity = newQuantity;
                    order.currentOrderCost = finalCurrentOrderCostAfterChange;
                }
            })

            await shoppingCartModel.updateOne({userID:uID},{$set :{cartDetails : allOrdersInCart}});
            await shoppingCartModel.updateOne({userID:uID},{$set :{totalOrderCost : finalTotalOrderCostAfterAddingChangedCurrentOrderCost}});
            
            res.send(`TOTAL ORDER COST CHANGED TO: ${finalTotalOrderCostAfterAddingChangedCurrentOrderCost}`);
        }
    }catch(err){
        console.log("Error While Saving Data To DB",err);
        res.status(500).send("Internal Server Error !");
    }
})

server.listen(7006,()=>{
    dbconnection();
    console.log("updatecart server is running at port: 7006");
    // getIngredients();
})


