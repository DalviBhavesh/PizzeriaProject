import axios from "axios";
import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import Swal from "sweetalert2";
import { getCart } from "../store/slice/cartSlice";

function Extras({ingredients, orderData, dispatch}){

    // console.log("Data");
    // console.log(ingridients);

    async function deleteIngredients() {
        await axios.post('http://localhost:7006/updateCart/removeExtraIngredients',
        {
            "userID": "Bhavesh",
            "orderNo": orderData.orderNo,
            "id": ingredients.id
        }).then(()=>{
            console.log(ingredients.tname + "Deleted Sucessfully")

            dispatch(getCart())

            Swal.fire({
                            position: "center",
                            icon: "success",
                            title: ingredients.tname+" Deleted ! ",
                            showConfirmButton: false,
                            timer: 1500
                          });
        }).catch((err)=>{
            console.log("Error while deleting extra Ingredients ",err)
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
        <div
            className="mx-1 text-sm font-bold inline-flex flex-row bg-gray-900 text-white rounded-lg shadow-lg"
        >
            
            <h1 className="text-base ps-3 pe-2 ">{ingredients.tname}</h1>

            <button 
                className={
                    ingredients.tname === 'Pepperoni' || ingredients.tname === 'Chicken' ? 
                    "text-xl px-1 bg-red-700 text-white rounded-e-md hover:bg-red-400 hover:text-black" : 
                    "text-xl px-1 bg-green-700 text-white rounded-e-md hover:bg-green-400 hover:text-black"}
                onClick={()=>{deleteIngredients()}}
            >
                <IoCloseCircleOutline />
            </button>
        
        </div>
           
        </>
    )
}

export default Extras;
