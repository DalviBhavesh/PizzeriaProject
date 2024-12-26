const mongoose = require('mongoose');
const schema = mongoose.Schema;

let ingredientsSchema = new schema(
    {
        id:{
            type:Number,
            required:true,
        },
        tname:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true,
            min:0
        },
        image:{
            type:String,
            required:true
        }
    }
);

let ingredientsModel = mongoose.model('Ingredients',ingredientsSchema);

module.exports = {ingredientsModel,ingredientsSchema};


// SAMPLE DATA FOR SCHEMA CREATION

//  {
//     "id": 101,
//     "tname": "Pepperoni",
//     "price": 110,
//     "image": "https://thumb1.shutterstock.com/display_pic_with_logo/55755/161642033/stock-photo-single-slice-of-pepperoni-meat-isolated-on-white-with-path-shot-from-above-161642033.jpg"
//   }