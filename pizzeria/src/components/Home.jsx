import React from "react";

function Home(){
    return(
        <>
            <div className="mt-14 mb-10 w-lvw px-6 bg-white flex flex-col justify-evenly items-center ">
                <div className="max-w-screen-lg">

                    <div>
                        <br />
                        <h1 className="text-4xl block text-center">Our Story</h1>
                        <br />
                        <p className="text-justify">
                        We believe in good. We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations where they had to come up with wacky and fun excuses. The person with the best excuse won the Best Excuse Badge and won Pizzeria’s vouchers. Their enthusiastic response proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!
                        </p>
                        <br />
                        <p className="text-justify">
                        Ever since we launched the Tastiest Pan Pizza, ever, people have not been able to resist the softest, cheesiest, crunchiest, butteriest Domino's Fresh Pan Pizza. They have been leaving the stage in the middle of a performance and even finding excuses to be disqualified in a football match.
                        </p>
                        <br />
                        <p className="text-justify">
                        We launched Fresh Pan Pizza Best Excuse Awards on our Facebook fan page. Fans were given situations where they had to come up with wacky and fun excuses. The person with the best excuse won the Best Excuse Badge and won Domino's vouchers. Their enthusiastic response proved that Pizzeria's Fresh Pan Pizza is the Tastiest Pan Pizza. Ever!
                        </p>
                        <br />

                    </div>

                    <br />

                    <div className="flex flex-row flex-wrap">

                        {/* IMAGE */}
                        <div className="w-full sm:w-1/2 px-4">
                            <img 
                            src="/Dough.png" 
                            className="w-full"
                            />
                        </div>

                        {/* Description */}
                        <div className="w-full sm:w-1/2  px-4 flex flex-col justify-center items-center">

                            
                            <h1 className="w-full text-4xl text-center sm:text-left " >Ingredients</h1>
                            <br />
                            <p className="text-justify">
                                We're ruthless about goodness. We have no qualms about tearing up a day-old lettuce leaf (straight from the farm), or steaming a baby (carrot).
                                Cut. Cut. Chop. Chop. Steam. Steam. Stir. Stir. While they're still young and fresh - that's our motto. It makes the kitchen a better place.
                            </p>
                            <br />

                        </div>

                    </div>

                    <br />

                    <div className="flex flex-row flex-wrap-reverse">

                        {/* Description */}
                        <div className="w-full sm:w-1/2  px-4 flex flex-col justify-center items-center">
                            <h1 className="w-full text-4xl text-center sm:text-left " >Our Chefs</h1>
                            <br />
                            <p className="text-justify">
                                They make sauces sing and salads dance. They create magic with skill, knowledge, passion, and stirring spoons (among other things). They make goodness so good, it doesn’t know what to do with itself. We do, though. We send it to you.
                            </p>
                            <br />   
                        </div>

                        {/* Image */}
                        <div className="w-full sm:w-1/2 px-4">
                            <img 
                                src="/Chef.png" 
                                className="w-full"
                            />
                        </div>
                    </div>

                    <br />

                    <div className="flex flex-row">

                        {/* Image */}
                        <div className="w-full sm:w-1/2 px-4">
                            <img 
                                src="/Clock.png" 
                                className="w-full"
                            />
                        </div>

                        {/* Description*/}
                        <div className="w-full sm:w-1/2  px-4 flex flex-col justify-center items-center">
                            <h1 className="text-4xl block text-center">45 min delivery</h1>
                        </div>

                    </div>

                </div>
            </div>
            
        </>
    )
}

export default Home;