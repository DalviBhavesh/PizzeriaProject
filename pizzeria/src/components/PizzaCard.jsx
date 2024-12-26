import React from "react";
import axios from "axios";
import Swal from "sweetalert2";

function PizzaCard({pizzaData}) {

    //Making Api call to insertToCart Server
    //Adding pizza to the cart
    async function addToCart(data){
        
            await axios.post(
                'http://localhost:7004/insertToCart/newOrder',
                {
                        "userID":"Bhavesh",
                        "orderDetails":{
                          "orderNo": 0,
                          "pizzaDetails": data,
                          "extraIngredientsDetails": [],
                          "pizzaQuantity": 1,
                          "currentOrderCost": 0
                        }
                     
                }
            )
            .then((res)=>{
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: pizzaData.name+" pizza added to your cart",
                    showConfirmButton: false,
                    timer: 1500
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
    
    

    return(
        <>
            <div className="min-h-72 bg-white flex flex-row justify-evenly items-center border border-white hover:border hover:border-gray-300 hover:shadow-lg ">
                
                <div className="h-full p-2 bg-white">
                        
                        <div className="flex flex-col justify-center items-center">
                            
                            <h1 className="text-xl text-center font-bold">
                                {pizzaData.name}
                            </h1>
                            
                            <div 
                            className={pizzaData.type === 'veg'? "h-4 w-4 bg-lime-600":"h-4 w-4 bg-red-600"}
                            ></div>

                        </div>

                        <div>
                            <h1 className="text-center py-5 font-bold">
                                &#x20b9;{+pizzaData.price+".00"}
                            </h1>
                        </div>

                </div>

                <div className="p-3 bg-white h-full">
                        
                        <div>
                            {pizzaData.description}
                        </div>
                        <br />
                        <div>
                            <span className="font-bold">Ingredients: </span> 
                            {pizzaData.ingredients.map((e,index)=>( index === 0? e: ", "+e ))}
                        </div>
                        <br />
                        <div>
                            <span className="font-bold">Toppings: </span> 
                            {pizzaData.ingredients.map((e,index)=>( index === 0? e: ", "+e ))}
                        </div>

                </div>
                
                <div className="h-full bg-white">
                        <div className="w-36 h-36 mb-3 mt-2 me-2 bg-red-400 flex justify-center items-center ">
                            <img
                                className="w-36 h-36 object-cover object-top "
                                src={pizzaData.image} 
                                 
                            />
                        </div>
                        <div className="me-2 flex justify-center items-center">
                            <button 
                            className="h-10 px-3 bg-yellow-400 text-white hover:bg-yellow-500 rounded-md"
                            onClick={()=>{addToCart(pizzaData)}}
                            >
                                Add to Cart
                            </button>
                        </div>
                </div>
            
            </div>
        </>
    )
}

export default PizzaCard;
