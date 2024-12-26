const mongoose = require('mongoose');
const schema = mongoose.Schema

let pizzaSchema = new schema(
    {
        id: {
          type: String,
          required: true
        },
        type: {
          type: String,
          enum: ['veg', 'non-veg'], // Assuming only two types: veg and non-veg
          required: true
        },
        price: {
          type: Number,
          required: true,
          min: 0 // Ensures price is non-negative
        },
        name: {
          type: String,
          required: true
        },
        image: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        ingredients: {
          type: [String],
          required: true
        },
        topping: {
          type: [String],
          required: true
        }
      }
);

let pizzaModel = mongoose.model('Pizzas',pizzaSchema);

module.exports = {pizzaModel, pizzaSchema};


// SAMPLE DATA FOR SCHEMA CREATION

//  let pizza = {
//     "id": "0001",
//     "type": "veg",
//     "price": 290,
//     "name": "Paneer Tikka",
//     "image": "https://thumb9.shutterstock.com/display_pic_with_logo/376831/127528958/stock-photo-delicious-italian-pizza-over-white-127528958.jpg",
//     "description": "This is popular italian pizza flavoured with marinated tikka sauce and paneer",
//     "ingredients": [
//       "dough/flour",
//       "pizza saucce",
//       "pizza sauce seasoning",
//       "cheese"
//     ],
//     "topping": [
//       "Paneer",
//       "Fried Onion",
//       "Green olive",
//       "Capsicum",
//       "Red peprika"
//     ]
//   }
