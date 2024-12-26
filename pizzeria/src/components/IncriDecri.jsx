import React, { useEffect, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import axios from 'axios'
import Swal from 'sweetalert2'
import { getCart } from "../store/slice/cartSlice";

function IncriDecri({data, dispatch}){

    let [count, setCount] = useState(data.pizzaQuantity);
    // console.log("Quantity:")
    // console.log(data)

    // useEffect(() => {
    //     changeQuantity();
    //   }, [count, changeQuantity]);

    async function changeQuantity(num) {
        await axios.post('http://localhost:7006/updateCart/changePizzaQuantity',
            {
                "userID": "Bhavesh",
                "orderNo": data.orderNo,
                "pizzaQuantity": num
            }
        ).then(()=>{
            console.log("Quantity changed to "+num)
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Quantity Changed to "+num,
                showConfirmButton: false,
                timer: 1000
              });
              const scrollPosition = window.scrollY; // Capture current scroll position
              dispatch(getCart());
              window.scrollTo(0, scrollPosition); // Restore scroll position
        }).catch((err)=>{
            console.log("Error while updating Quantiny: ", err);
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Quantity Not Changed",
                showConfirmButton: false,
                timer: 1000
              });
        })
    }

    

    function incriment(){
        if(count<100){
            setCount((prev)=>{
                changeQuantity(prev+1)
                return prev+1
            });
            
        }
        
    }
    function decriment(){
        if(count>1){
            setCount((prev)=>{
                changeQuantity(prev-1)
                return prev-1
            });
        }
        
    }

    return(
        <>
            <div className="bg-white w-36 p-1 flex flex-row justify-start items-center text-sm">
                <button
                    className="h-7 w-7 m-1 bg-yellow-400  hover:border hover:border-black hover:text-black text-white flex flex-row justify-center items-center rounded-lg shadow-lg" 
                    onClick={()=>{
                        decriment();
                    }}
                    
                ><FaMinus /></button>
                
                <input 
                    type="text"
                    className="w-7 h-7 text-center rounded-lg font-bold text-gray-900" 
                    value={count}
                    disabled
                />
                <button
                    className="h-7 w-7 m-1 bg-yellow-400  hover:border hover:border-black hover:text-black text-white flex flex-row justify-center items-center rounded-lg shadow-lg"
                    onClick={()=>{
                        incriment()
                    }} 
                ><FaPlus /></button>
            </div>
        </>
    )
}

export default IncriDecri;