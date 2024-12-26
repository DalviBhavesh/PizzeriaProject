import React from "react";
import { MdAddCircleOutline } from "react-icons/md";

function ExtraIng({ingredients, setData}){
    
    function handleCheckBox(event,data){
        let target = event.target.checked;
        // console.log("handling ExtraIng")
        // console.log(target);
        // console.log(ingredients);
        // console.log(typeof setData)

        if(target){
            setData((prev)=>[...prev,data]);
        }else if(!target){
            setData((prev)=>prev.filter((e)=>e.id!==data.id))
        }
    }

    return(
            <>
            <div
            className={
                ingredients.tname === 'Pepperoni' || ingredients.tname === 'Chicken' ? 
                "text-xl px-1 border-e-8 border-red-400   rounded-e-md bg-white text-black m-1  font-bold inline-flex flex-row   rounded-lg shadow-lg" : 
                "text-xl px-1 border-e-8 border-green-400 rounded-e-md bg-white text-black m-1  font-bold inline-flex flex-row  rounded-lg shadow-lg"}
            >
                <input
                    className="ms-2"
                    type="checkbox" 
                    name="check" 
                    id="checkbox"
                     onChange={(event)=>{handleCheckBox(event,ingredients)}}
                    />
                <img 
                    src={ingredients.image}
                    className="w-10 h-10 my-1 ms-2  object-cover rounded-full"
                 />
                <div className=" flex flex-col justify-center items-center text-center text-sm ps-1 pe-2 " >
                    <h1>{ingredients.tname+" "}</h1>
                    <p>&#x20b9;{ingredients.price+".00"}</p>
                </div>
                
                
            </div>
               
            </>
        )
}

export default ExtraIng;


