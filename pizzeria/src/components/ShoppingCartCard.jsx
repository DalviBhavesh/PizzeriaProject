import React, { useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import IncriDecri from "./IncriDecri";
import Extras from "./Extras";
import AddExtra from "./AddExtra";
import axios from "axios";
import Swal from "sweetalert2"
import { getCart } from "../store/slice/cartSlice";

function ShoppingCartCard({orderData, dispatch}){
    // console.log(userCart); 
    console.log(orderData);

    async function deleteSingleOrder(id,name){
        await axios.post('http://localhost:7005/deleteFromCart/oneOrder',
        {
            "userID": "Bhavesh",
            "orderNo": id
        }).then(()=>{
            
            dispatch(getCart());

            Swal.fire({
                position: "center",
                icon: "success",
                title: name+" Pizza removed from cart",
                showConfirmButton: false,
                timer: 1500
              });
        }).catch((err)=>{
            
            console.log("Error while Deleting Single Order: ", err);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Item Not Deleted !",
                showConfirmButton: false,
                timer: 1500
              });
        })
    }

    return(
        <>
                 
                    <div className="relative max-w-4xl p-3 rounded-3xl border border-gray-300 bg-white text-center mx-10 mb-5 shadow-lg">
                        
                        {/* Order no */}
                        <div className=" ps-6 pe-2 py-2 text-start text-2xl flex flex-row justify-around items-center">
                            <div className=" w-full text-start flex flex-row justify-start items-center">
                                <h1>
                                    {"ORDER "+orderData.orderNo+" | "+ orderData.pizzaDetails.name+" | "}
                                    <span
                                        className={orderData.pizzaDetails.type === 'veg' ?"h-5 w-5  bg-green-700 rounded-lg text-lg font-bold p-1 text-white": "h-5 w-5 bg-red-700 rounded-lg text-lg font-bold p-1 text-white"}
                                    >
                                        {orderData.pizzaDetails.type}
                                    </span>
                                </h1>
                                
                            </div>
                                
                            <div className=" text-end">
                                <button 
                                    className="text-black hover:bg-red-600 hover:text-white p-2 rounded-full border"
                                    onClick={()=>{ deleteSingleOrder(orderData.orderNo, orderData.pizzaDetails.name) }}
                                >
                                    <RiDeleteBin5Line />
                                </button>
                            </div>

                        </div>
                        <hr className="border border-gray-300"/>
                        
                        {/* Body */}
                        <div className="flex flex-row flex-wrap justify-evenly items-center">
                            
                            {/* Image */}
                            <div className=" flex flex-col justify-center items-center">
                               <img 
                                    className="w-36 h-36 p-2 object-cover rounded-3xl"
                                    src={orderData.pizzaDetails.image}  
                                /> 
                                {/* <div className="flex flex-col">
                                    <IncriDecri data = {orderData}/>
                                    <h1 className="text-lg font-thin ">
                                        Quantity
                                    </h1>

                                </div> */}
                            </div>

        

                            <div className="py-5 bg-white text-lg max-w-lg ">
                                
                                <table>
                                    <tbody>

                                        

                                        {/* Ingredients */}
                                        <tr>
                                            <th className="text-end  text-gray-900 border-gray-400 flex justify-end items-stretch">Ingredients: </th>
                                            <td className="text-start font-bold ps-2 border-b text-gray-900 border-gray-400">
                                                {orderData.pizzaDetails.ingredients.map((e,index)=>( index===0? e:", "+e ))}
                                            </td>
                                        </tr>

                                        {/* Toppings */}
                                        <tr>
                                            <th className="text-end  text-gray-900 border-gray-400 flex justify-end items-stretch">Toppings: &nbsp;</th>
                                            <td className="text-start font-bold ps-2 border-b text-gray-900 border-gray-400">
                                                {orderData.pizzaDetails.topping.map((e,index)=>( index===0? e:", "+e ))}
                                            </td>
                                        </tr>

                                        

                                        {/* Extra Ingredients */}
                                        <tr>
                                            <th className="text-end  text-gray-900 border-gray-400 flex justify-end items-stretch">Extras: &nbsp;</th>
                                            <td className="text-start ps-2 border-b text-gray-900 border-gray-400">
                                                {orderData.extraIngredientsDetails.map((e)=>(<Extras key={e.id} ingredients = {e} orderData = {orderData} dispatch={dispatch} />))}
                                                <AddExtra oNum = {orderData.orderNo} />
                                            </td>
                                        </tr>

                                        {/* Quantity */}
                                        <tr>
                                            <th className="text-end text-gray-900 flex justify-end items-stretch">Quantity: &nbsp;</th>
                                            <td className="text-start ps-2 ">
                                                <IncriDecri data = {orderData} dispatch = {dispatch}/>
                                            </td>
                                        </tr>

                                        

                                    </tbody>
                                </table>

                            </div>

                            <div className="p-4 bg-white text-gray-900 flex flex-col justify-center items-center text-2xl font-extrabold">
                                <div>
                                    &#x20b9;{orderData.currentOrderCost+".00"}
                                </div>
                                <h1 className="font-thin text-xl">Price</h1>
                            </div>

                        </div>

                        {/* <div className="bg-slate-400 flex flex-row justify-evenly items-center">
                            <div className="bg-blue-400 w-full">
                                add
                            </div>
                            <div className="bg-green-400 w-full">
                                add
                            </div>
                            <div className="bg-blue-400 w-full">
                                DELETE
                            </div>
                        </div> */}

                        {/* Footer */}
                        <div className="h-5 bg-yellow-400 rounded-b-xl"></div>
                        
                    </div>
        </>
    )
}

export default ShoppingCartCard;