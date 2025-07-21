"use client"
import { TypewriterEffectSmooth } from "../other_components/typewriter-effect";


export function ProgressTypeWriter({ message }) {
    const words = [
        {
            text: message,
            className: "dark:text-blue-400 text-[10px]   tracking-wide text-center "
        },
    ];


    return (
        <div className=" ">
            <TypewriterEffectSmooth words={words} />
           
    
            </div>

    )

}