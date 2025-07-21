import React, { useEffect, useState } from "react";
import { motion, useAnimation, useSpring } from "framer-motion";
import {ProgressTypeWriter} from "../other_components/ProgressTypeWriter";

export function AnimatedProgressBar({
  value = 0,
  max = 100,
  label = "",
  height = 20,
  color = "#10B981",
  bgColor = "#1F2937",
}) {
  const progress = Math.min(value, max);
  const percentage = (progress / max) * 100;
  const controls = useAnimation();

  const [progressMessage, setProgressMessage] = useState("A great start! On your way to the stage")

  const springValue = useSpring(0, { damping: 15, stiffness: 100 });

  useEffect(() => {
    springValue.set(percentage);
    controls.start({ width: `${percentage}%` });
  }, [percentage, springValue, controls]);

  useEffect(() => {
    if (percentage >= 20 && percentage <= 40) {
      setProgressMessage("Nice one! Keep scanning");
    } else if (percentage > 40 && percentage <= 60) {
      setProgressMessage("Halfway there! Your fan power is building");
    } else if (percentage > 60 && percentage <= 80) {
      setProgressMessage("One more to go! Can you hear the crowd cheering?");
    } else if (percentage > 80 && percentage <= 100) {
      setProgressMessage("You did it..");
    }
  }, [percentage])
 
  return (

    
    <div className="w-full relative flex flex-col">
      {label && (
        <div className="mb-1 text-[10px] text-white  font-medium ">
          {progressMessage}
          
        </div>
      )}
    

    <div className="mb-1 flex flex-row items-center ">
        <div
          className="w-full rounded-full overflow-hidden"
          style={{ backgroundColor: bgColor, height }}
        >
          <motion.div
            className="h-full"
            initial={{ width: 0 }}
            animate={controls}
            style={{
              backgroundColor: color,
            }}
          />


        </div>
        <div className="text-white flex pl-5 justify-center items-center">
          {Math.round(percentage)}%
        </div>

      </div>

</div>
   
    
    
  );
}
