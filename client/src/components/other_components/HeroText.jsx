"use client"
import {TypewriterEffectSmooth} from "../other_components/typewriter-effect";

export function TypewriterEffectSmootha({nickName, message}) {
    const words = [
        {text: message, className:"font-vt323 text-4xl "},
        {
            text: nickName,
            className: "dark:text-yellow-500 text-4xl font-vt323"},
    ];
   

    return (
        <div className="flex flex-col items-center justify-center -m-7 ">
            <TypewriterEffectSmooth words={words}/>
            {/* <TypewriterEffectSmooth words={words}/> */}
            <p className="dark:text-white ">Are you redy to play and win?</p>
            <div className="flex flex-col md:flex-row pt-5 space-y-3 md:space-y-0 space-x-0 md:space-x-4">
                <button className="w-40 h-10 rounded-xl font-bold bg-black border
                 dark:border-white border-transparent text-white  text-sm">
                    Let's play</button>
                <button className="w-40 h-10 font-bold rounded-xl dark:bg-green-500 text-stroke  text-white border border-white  text-sm"> 
                    Concert</button>

            </div>
            
        </div>
    )
        
}