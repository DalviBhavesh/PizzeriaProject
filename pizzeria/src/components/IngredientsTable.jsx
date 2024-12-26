import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function IngredientsTable({ingredients}){
    
    let [totalCost, setTotalCost] = useState(100)
    let [xingredients,setXingredients] = useState([]);

    const handleCheckBoxChange = (event,data)=>{
        let target = event.target.checked;

        if(target){
            setTotalCost((prev)=>prev+data.price)
            setXingredients((pre)=>[...pre,data])
            
        }else if(!target){
            setTotalCost((prev)=>Math.abs(prev-data.price))
            setXingredients((prev)=>(prev.filter((e)=>e.id !== data.id)))

        }
        
        // console.log(target);
        // console.log(price);
    }

    async function build(xIng){
        
        // to monitor nonveg toppings
        let type = 'veg';

        xIng.map((e)=>{ 
            if(e.tname === "Pepperoni" || e.tname === "Chicken"){
                type = 'nonveg';
            }
        })
        
        // console.log("type: "+type);

        await axios.post(
            'http://localhost:7004/insertToCart/newOrder',
            {
                    "userID":"Bhavesh",
                    "orderDetails":{
                      "orderNo": 0,
                      "pizzaDetails": {
                        "id": "0000",
                        "type": type,
                        "price": 100,
                        "name": "Customized Pizza",
                        "image": "https://tse1.mm.bing.net/th?id=OIP.EzgXG6bFeEcuPqTeRFmZYwHaHa&pid=Api&P=0&h=180",
                        "description": "This is popular italian pizza flavoured with marinated tikka sauce and paneer",
                        "ingredients": [
                          "dough/flour",
                          "pizza saucce",
                          "pizza sauce seasoning",
                          "cheese"
                        ],
                        "topping": [
                            "No default toppings for custom pizza!"
                        ]
                      },
                      "extraIngredientsDetails": xIng,
                      "pizzaQuantity": 1,
                      "currentOrderCost": 0
                    }     
            }
        )
        .then((res)=>{
            Swal.fire({
                title: "Customized pizza added to your cart",
                icon: "success",
                draggable: true
              })
            console.log(res)
        })
        .catch((err)=>{
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "We are facing server issue!",
              });
            console.log("Error While adding data to the cart",err);
        })

    }
    
    // console.log(xingredients);

    return(
        <>
            <div className="m-2 flex flex-col justify-evenly items-center">
                <h1>pizzeria now gives you option to build your own pizza. Customize your pizza by choosing ingredients from the list below</h1>
                <table className="mt-2">
                    <tbody>
                            {/* Pizza Base Description   */}
                            <tr className=" border-gray-300">
                                <td className="border border-gray-300 p-2">
                                    <img 
                                        src="https://tse1.mm.bing.net/th?id=OIP.EzgXG6bFeEcuPqTeRFmZYwHaHa&pid=Api&P=0&h=180" 
                                        className="h-16 w-24 object-cover object-center"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2">
                                    {"Basic Pizza "}&nbsp;&nbsp;&nbsp;&#x20b9;{100+".00"}
                                </td>
                                <td className="border border-gray-300 ps-4 pe-20 text-yellow-500">
                                    <input 
                                        type="checkbox" 
                                        name="checkbox" 
                                        id="check"
                                        checked={true}
                                        readOnly
                                        />&nbsp;&nbsp;&nbsp;Add
                                </td>
                            </tr>

                            {/* Map Function Start */}
                            {
                                ingredients.map((ingredients)=>(

                                    <tr key={ingredients.id} className="border border-gray-300">

                                        {/* image */}
                                        <td className="border  border-gray-300 p-2 sm:pe-40">
                                            <img 
                                                src={ingredients.image} 
                                                className="h-16 w-24 object-contain  "
                                            />
                                        </td>

                                        {/* Price */}
                                        <td className="border border-gray-300 px-2">
                                            {ingredients.tname+" "}&nbsp;&nbsp;&nbsp;&#x20b9;{ingredients.price+".00"}
                                        </td>


                                        <td className="border border-gray-300 ps-4 sm:pe-20 text-yellow-500">
                                            <input 
                                                type="checkbox" 
                                                name="checkbox" 
                                                id="check"
                                                onChange={(event)=>handleCheckBoxChange(event,ingredients)} 
                                                />&nbsp;&nbsp;&nbsp;Add
                                        </td>
                                    </tr>


                                ))
                            }
                            
                            <tr>
                            <td colSpan={3} className="border border-gray-300">
                                    <h1 className="ps-4 font-bold text-xl text-indigo-900">Total Cost: {totalCost}</h1>
                                    <div className="h-full w-full flex justify-center items-center">
                                        <button 
                                            onClick={()=>{build(xingredients)}}
                                            className="bg-black text-yellow-400 hover:bg-slate-700 p-2 rounded-md mt-4 mb-1"
                                        
                                            >
                                            Build your pizza
                                        </button>
                                    </div>
                                </td> 
                            </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default IngredientsTable;
