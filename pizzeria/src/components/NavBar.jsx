import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { FaShoppingCart } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";


function NavBar(){

    let [ham, setHam] = useState("hidden");

    // using console.log in thsi function will print the old value of the state 
    // because setHam() is an asynchronous function 
    // To see the updated value of ham, you can use the useEffect hook to monitor changes to ham
    let dropdownFunction = ()=>{
        if(ham === 'hidden'){
            setHam('');
            //console.log(ham);
        }else{
            setHam('hidden')
            //console.log(ham);
        }
    }  
     
    // Check Log changes to `ham` using useEffect
    // useEffect(() => {
    //     console.log("Current value of ham:", ham);
    // }, [ham]);

    return(
        <>

            <nav className="fixed top-0 bg-black w-lvw h-14 ps-1 flex justify-center items-center shadow-lg z-50">
                
                {/* Logo and Navlink Div */}
                <div className=" mx-2 flex w-full justify-start items-center ">

                        <NavLink
                            to={""}
                            className = {({isActive})=>isActive? "text-white ": "text-gray-400"}
                        >
                        <div 
                            className="flex flex-row"
                        >
                            <h1 className="text-2xl hover:text-white" >Pizzeria</h1>
                            <img 
                                src="logo.jpg"  
                                className="h-10 mx-2"
                            />
                        </div>
                        
                        </NavLink>
                    
                    
                        <NavLink
                            to={"/orderPizza"}
                            className = {({isActive})=>(isActive? "text-white ": "text-gray-400")}
                        >
                            <h1 className="mx-2 hover:text-white hidden sm:inline">
                                Order Pizza
                            </h1>
                        </NavLink>
                    
                    
                        <NavLink
                            to={"/buildUrPizza"}
                            className = {({isActive})=>(isActive? "text-white ": "text-gray-400")}
                        >
                            <h1 className="mx-2 hover:text-white hidden sm:inline">
                                Build Ur Pizza
                            </h1>
                        </NavLink>
                    
                </div>

                {/* Shopping Cart Div */}
                <div className="me-7 hidden sm:inline">
                    <NavLink to={"cart"}
                        className = {({isActive})=>(isActive? "text-black": "text-white")}

                    >
                        <div className=" bg-yellow-400 w-36 h-9 p-1 flex flex-row justify-evenly items-center rounded-sm text-center hover:bg-yellow-500 hover:text-gray-900">
                        <FaShoppingCart /><h1> Shopping cart</h1>
                        </div>
                    </NavLink>
                </div>

                {/* Hamburger Menu Div */}
                <div 
                    className="me-4 inline sm:hidden" 
                    onClick={dropdownFunction}
                >
                        <div className=" text-white w-9 h-9 p-1 me-2 flex flex-row justify-evenly items-center rounded-md text-center text-3xl bg-gray-700 hover:bg-gray-500">
                        <GiHamburgerMenu />
                        </div>
                </div>

            </nav>


            {/* Dropdown menu design */}
            <div 
                className={` fixed top-0 w-full  backdrop-blur-sm bg-transparent z-40  sm:hidden ${ham}`}
            >
                    <div
                        className="mt-14 w-full border-t text-sm bg-black p-2 flex flex-row justify-evenly items-center"
                        onClick={dropdownFunction}
                    >
                        
                        <NavLink
                            to={"/"}
                            className = {({isActive})=>(isActive? "text-white ": "text-gray-400")}
                        >
                            <h1 className="mx-2 hover:text-white pe-2 border-e">
                                Home
                            </h1>
                        </NavLink>


                        <NavLink
                            to={"/orderPizza"}
                            className = {({isActive})=>(isActive? "text-white ": "text-gray-400")}
                        >
                            <h1 className="mx-2 hover:text-white pe-2 border-e">
                                Order Pizza
                            </h1>
                        </NavLink>
                    
                    
                        <NavLink
                            to={"/buildUrPizza"}
                            className = {({isActive})=>(isActive? "text-white ": "text-gray-400")}
                        >
                            <h1 className="mx-2 hover:text-white pe-2 border-e">
                                Build Ur Pizza
                            </h1>
                        </NavLink>

                        <NavLink to={"cart"}
                        className = {({isActive})=>(isActive? "text-black": "text-white")}
                        >
                            <div className=" bg-yellow-400 text-lg w-16 h-8 p-1 flex flex-row justify-evenly items-center rounded-sm text-center hover:bg-yellow-500 hover:text-gray-900">
                            <FaShoppingCart />
                            </div>
                        </NavLink>


                    </div>
            </div>

        </>
    )
}

export default NavBar;

