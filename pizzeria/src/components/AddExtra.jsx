import React, { useState, useEffect } from "react";
import { MdOutlineAddBox } from "react-icons/md";
import { getAllIngredients } from "../store/slice/ingredientsSlice"
import { useSelector, useDispatch } from "react-redux";
import ExtraIng from "./ExtraIng";
import { LiaSaveSolid } from "react-icons/lia";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import Swal from "sweetalert2";
import { getCart } from "../store/slice/cartSlice";

function AddExtra({oNum}){

    // We can read data from the store with useSelector,
    let {isLoading, data, isError} = useSelector((state)=>state.ingredientsSlice);
    
    // and dispatch actions using useDispatch
    const dispatch = useDispatch();
    
    // Fetch pizzas when the component mounts 
    // Directly calling the dispatch will cause infinite loop of rendering 
    useEffect(()=>{
        dispatch(getAllIngredients())
    },[dispatch])

    // console.log("---------")
    // console.log(data)
    //-----------------------------------------------------------------------
        
    let [display, setDisplay] = useState('hidden')
    let [extraIngredientsToBeAdded, setExtraIngredientsToBeAdded] = useState([]);

    //AXIOS CALL TO ADD EXTRA INGRIDIENTS
    async function handleSubmit() {
        console.log(extraIngredientsToBeAdded);
        if(extraIngredientsToBeAdded.length > 0){
            axios.post('http://localhost:7006/updateCart/addExtraIngredients',{
                userID:"Bhavesh",
                orderNo:oNum,
                extraIngredientsDetails: extraIngredientsToBeAdded
            })
            .then(()=>{
                dispatch(getCart());
                Swal.fire({
                                position: "center",
                                icon: "success",
                                title: extraIngredientsToBeAdded.length+" Extras Added Sucessfully!",
                                showConfirmButton: false,
                                timer: 1500
                            });
            }).catch((err)=>{
                console.log("Error while Inserting Extra Ingredients to the server: ",err)
                Swal.fire({
                                position: "center",
                                icon: "error",
                                title: "Extras Not added!",
                                showConfirmButton: false,
                                timer: 1500
                            });
            })
        }else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "No Extras Selected",
                showConfirmButton: false,
                timer: 1500
            });
        }
        
        
    }
    
    

    function updateDisp(){
        setDisplay((prev)=>prev === 'hidden'? 'visible': 'hidden')
    }


    //IF DATA IS LOADING FROM SERVER
    if(isLoading){
        return(
            <>
                
                    <h1 className="font-extrabold text-xl">LOADING.....!</h1>
               
            </>
        )
    }

    //IF ERROR OCCURES WHILE FETCHING DATA
    if(isError){
        return(
            <>
                <h1 className="font-extrabold text-xl">SERVER ERROR !</h1>
            </>
        )
    }


    return(
        <>
            <div
                className=" mx-1 text-sm font-bold inline-flex flex-row bg-gray-600 text-white rounded-lg shadow-lg"
            >
                        
                <h1 className="text-base ps-3 pe-2 ">Add</h1>
            
                <button 
                    className="text-xl px-1 bg-yellow-400 text-gray-600 rounded-e-md hover:bg-yellow-600 hover:text-white"
                    onClick={updateDisp}
                >
                    <MdOutlineAddBox />
                </button>

                {/* Add extra Ingredients */}
                <div 
                    className= {`absolute w-full h-full p-2 rounded-3xl backdrop-blur bg-transparent  start-0 top-0  ${display} `}
                >
                    <h1 className="text-red-500 p-2">*Extra Ingredients already present wont be added</h1>
                    
                    {/* Display All Extra Ingredients  */}
                    {data.map((e)=>(
                        <ExtraIng key={e.id} ingredients={e} setData = {setExtraIngredientsToBeAdded} />
                    ))}

                    <div className="w-full flex flex-row justify-center items-center">
                        <button
                            className="text-xl px-2 bg-yellow-300 border-2 border-black  rounded-e-md text-black hover:bg-yellow-400 hover:text-white m-1  font-bold inline-flex flex-row   rounded-lg shadow-lg"

                            onClick={handleSubmit}
                        
                        >
                            <span className="h-full flex flex-row justify-center items-center text-3xl"><LiaSaveSolid /></span>&nbsp;
                            <span className="h-full flex flex-row justify-center items-center">Save</span>
                        </button>
                        <button
                            className="text-xl px-2 rounded-e-md border-2 border-black bg-black text-yellow-300 hover:bg-gray-600 font-bold inline-flex flex-row   rounded-lg shadow-lg"
                            onClick={updateDisp}
                        > 
                            <span className="h-full flex flex-row justify-center items-center text-3xl"><RxCross2 /></span>&nbsp;
                            <span className="h-full flex flex-row justify-center items-center">Cancel</span>
                        </button>
                    </div>
                    
                    
                    
                       
                </div>

                    
            </div>
            
        </>
    )
}

export default AddExtra;