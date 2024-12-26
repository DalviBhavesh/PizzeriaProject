const mongoose = require('mongoose');
const schema = mongoose.Schema;

// IMPORTING MODULAR SCHEMA
const { ingredientsSchema } = require('./ingredientsModel');
const { pizzaSchema } = require('./pizzaModel');

// CREATING SCHEMA FOR 'cartDetails'
let orderSchema = new schema({
    "orderNo":{
        type:Number,
        required:true
    },
    "pizzaDetails": pizzaSchema,
    "extraIngredientsDetails": [ingredientsSchema],
    "pizzaQuantity":{
        type:Number,
        required:true
    },
    "currentOrderCost":{
        type:Number,
        required:true
    }

})

// MAIN SCHEMA FOR SHOPPING CART
let shoppingCartSchema = new schema({
    "userID":{
        type:String,
        required:true,
        unique:true
    },
    "password":{
        type:String,
        required:true,
    },
    "userName":{
        type:String,
        required:true
    },
    "cartDetails":{
        type:[orderSchema],
        required:false
    },
    "totalOrderCost":{
        type:Number,
        required:true,
        min: [0, 'Total order cost cannot be negative'] 
    }
    
})

let shoppingCartModel = mongoose.model("ShoppingCarts",shoppingCartSchema);

module.exports = {shoppingCartModel, shoppingCartSchema};




// SAMPLE DATA FOR SCHEMA CREATION

// let ShoppingCartDetails = {
//   "userID": "Bhavesh",
//   "password": "Bhavesh@18",
//   "userName": "Bhavesh Dalvi",
//   "cartDetails": [
    // {
    //   "orderNo": 1,
    //   "pizzaDetails": {
    //       "id": "0001",
    //       "type": "veg",
    //       "price": 290,
    //       "name": "Paneer Tikka",
    //       "image": "https://thumb9.shutterstock.com/display_pic_with_logo/376831/127528958/stock-photo-delicious-italian-pizza-over-white-127528958.jpg",
    //       "description": "This is popular italian pizza flavoured with marinated tikka sauce and paneer",
    //       "ingredients": [
    //         "dough/flour",
    //         "pizza saucce",
    //         "pizza sauce seasoning",
    //         "cheese"
    //       ],
    //       "topping": [
    //         "Paneer",
    //         "Fried Onion",
    //         "Green olive",
    //         "Capsicum",
    //         "Red peprika"
    //       ]
    //     },
    //   "extraIngredientsDetails": [
    //     {
    //       "id": 101,
    //       "tname": "Pepperoni",
    //       "price": 110,
    //       "image": "https://thumb1.shutterstock.com/display_pic_with_logo/55755/161642033/stock-photo-single-slice-of-pepperoni-meat-isolated-on-white-with-path-shot-from-above-161642033.jpg"
    //     },
    //     {
    //       "id": 102,
    //       "tname": "Mushroom",
    //       "price": 35,
    //       "image": "https://thumb9.shutterstock.com/display_pic_with_logo/1207547/568114672/stock-photo-fresh-cultivated-button-mushrooms-and-twigs-of-parsley-in-the-wooden-basket-one-whole-mushroom-and-568114672.jpg"
    //     }
    //   ],
    //   "pizzaQuantity": 2,
    //   "currentOrderCost": 870
    // }
//   ],
//   "totalOrderCost": 870,
// }