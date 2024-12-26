import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getCart } from "../store/slice/cartSlice";
import ShoppingCartCard from "./ShoppingCartCard";
import { BsFillCartXFill } from "react-icons/bs";
import { BsCart4 } from "react-icons/bs";
import axios from "axios";
import Swal from 'sweetalert2'


function Cart(){


    let {isLoading, data, isError} = useSelector((state)=>state.cartSlice)   
 
    let dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getCart());
    },[dispatch])

    


    // function to delete all orders in the user cart
    async function deleteAllOrders(){
        

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
                if (result.isConfirmed) {
                    await axios.post('http://localhost:7005/deleteFromCart/allOrders',
                        {
                            "userID": "Bhavesh"
                        })
                        .then(()=>{
                            Swal.fire({
                                title: "Deleted!",
                                text: "All orders deleted.",
                                icon: "success"
                            });
                            dispatch(getCart());
                        }).catch((err)=>{
                            console.log('Error while Deleting all orders from user Cart:',err)
                            Swal.fire({
                                icon: "error",
                                title: "Oops...",
                                text: "Server Error!",
                            });
                        })
            }
          });




        
    }

    // console.log(data);
    // console.log(isLoading);
    // console.log(isError);

    //IF DATA IS LOADING FROM SERVER
    if(isLoading){
        return(
            <>
                <div className="w-lvw h-lvh bg-yellow-400 flex justify-center items-center flex-col">
                    <h1 className="font-extrabold text-7xl">LOADING.....!</h1>
                </div>
            </>
        )
    }

    //IF ERROR OCCURES WHILE FETCHING DATA
    if(isError){
        return(
            <>
                <div className="w-lvw h-lvh bg-yellow-400 flex justify-center items-center flex-col">
                    <h1 className="font-extrabold text-7xl">SERVER ERROR !</h1>
                </div>
            </>
        )
    }
    
    if(data.cartDetails.length === 0){
        return(
            <>
                <div className="w-lvw h-lvh bg-yellow-400 text-white flex justify-center items-center flex-col">
                    <h1 className="font-extrabold text-9xl"><BsCart4 /></h1>
                    <h1 className="font-extrabold text-5xl">CART IS EMPTY !</h1> 
                </div>
            </>
        )
    }

    return(
        <>
            <div className="w-lvw min-h-lvh bg-yellow-400 flex justify-start items-center flex-col">
                <div className="w-lvw  pt-20 bg-yellow-400 flex flex-col justify-start items-center"> 
                    

                    <div className="w-full  p-3 flex flex-row justify-evenly  text-center text-3xl font-bold mx-10 mb-5">
                        
                         {/* Displays total cost of the cart */}
                        <div
                            className="bg-white text-gray-900 border-2 border-gray-900 p-2 rounded-md text-xl sm:text-3xl"
                        >
                            <h1><span
                                className="font-normal"
                            >
                                Total Cost:
                            </span> &#x20b9;{data.totalOrderCost+".00/-"}</h1>
                        </div>
                        
                        {/* Delete all items from the cart */}
                        <button
                            className="bg-red-600 text-white hover:bg-slate-700 flex flex-row justify-center items-center p-2 rounded-md shadow-lg text-xl sm:text-3xl border-2 border-white"
                            onClick={deleteAllOrders}
                        >
                           <BsFillCartXFill />&nbsp;Empty Cart
                        </button>

                    </div> 
                    
                
                    {/* Displays all orders in the cart */}
                    {data.cartDetails.map((userCartData)=>(
                        <ShoppingCartCard key={userCartData.orderNo}  orderData = {userCartData} dispatch = {dispatch} />
                    ))}

                    
                </div>
            </div>
            
        </>
    )
}

export default Cart;