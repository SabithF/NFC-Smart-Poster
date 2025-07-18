"use client"
import { TypewriterEffectSmooth } from "../other_components/typewriter-effect";
import Lottie from "lottie-react";
import Playbutton from '../../assets/play-button.json';



export function TypewriterEffectSmootha({ nickName, message, onPlayClick }) {
    const words = [
        {
            text: nickName,
            className: "dark:text-yellow-500 text-4xl tracking-wider font-midorima"
        },
    ];


    return (
        <div className="flex flex-col items-center justify-center -m-7 ">
            <TypewriterEffectSmooth words={words} />
            {/* <TypewriterEffectSmooth words={words}/> */}
            {/* <p className="dark:text-white  text-xl font-vt323 -mt-5">Ready to win tickets for the concert?</p> */}
            <div className="flex flex-col md:flex-row pt-5 space-y-3 md:space-y-0 space-x-0 md:space-x-4">
                {/* <button className="w-40 h-10 rounded-xl font-bold bg-black border
                 dark:border-white border-transparent text-white  text-sm">
                    Let's play</button> */}
                {/* <div className="w-55 mt-6 cursor-pointer motion-safe:animate-bounce"
                    onClick={onPlayClick}>
                    <Lottie animationData={Playbutton} />
                </div> */}

                
                {/* <button className="w-40 h-10 font-bold rounded-xl dark:bg-green-500 text-stroke  text-white border border-white  text-sm"> 
                    Concert</button> */}

            </div>

        </div >
    )

}