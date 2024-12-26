import React, { useEffect } from "react";
import { useSelector,useDispatch } from 'react-redux'
import { getAllIngredients } from '../store/slice/ingredientsSlice'
import IngredientsTable from "./IngredientsTable";

function BuildUrPizza(){

    // We can read data from the store with useSelector,
    const {isLoading, data, isError} = useSelector((state)=>state.ingredientsSlice);

    // and dispatch actions using useDispatch
    const dispatch = useDispatch();

    // Fetch pizzas when the component mounts 
    // Directly calling the dispatch will cause infinite loop of rendering 
    useEffect(()=>{
        dispatch(getAllIngredients())
    },[dispatch])

    // console.log(data);
    // console.log(isLoading);
    // console.log(isError);

    //IF DATA IS LOADING FROM SERVER
    if(isLoading){
        return(
            <>
                <div className="w-lvw h-lvh flex justify-center items-center flex-col">
                    <h1 className="font-extrabold text-7xl">LOADING.....!</h1>
                </div>
            </>
        )
    }

    //IF ERROR OCCURES WHILE FETCHING DATA
    if(isError){
        return(
            <>
                <div className="w-lvw h-lvh flex justify-center items-center flex-col">
                    <h1 className="font-extrabold text-7xl">SERVER ERROR !</h1>
                </div>
            </>
        )
    }

    return(
        <>
            <div className="w-lvw bg-white flex justify-center items-center">
                <div className="mt-20">
                    <IngredientsTable ingredients = {data} />
                </div>
            </div>
        </>
    )
}

export default BuildUrPizza;