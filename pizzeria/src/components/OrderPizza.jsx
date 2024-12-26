import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllPizzas } from "../store/slice/dataSlice";
import PizzaCard from "./PizzaCard";

function OrderPizza(){

    // We can read data from the store with useSelector,
    const {isLoading, data, isError} = useSelector((state)=>state.dataSlice);

    // and dispatch actions using useDispatch
    const dispatch = useDispatch();
    
    // Fetch pizzas when the component mounts 
    // Directly calling the dispatch will cause infinite loop of rendering  
    useEffect(()=>{
        dispatch(getAllPizzas())
    },[dispatch]);

    //  console.log(data);
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

    //IF DATA FETCHED SUCCESSFULLY FROM SERVER
    return(
        <>
            <div className="mt-20 w-lvw px-6 md:px-20  flex flex-col justify-evenly items-center ">
                <div className="py-5 grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-12">
                    {
    
                        data.map((pizza)=>(<PizzaCard key={pizza.id} pizzaData={pizza}/>))
                        
                    }
                </div>
            </div>
        </>
    )
    
}

export default OrderPizza;