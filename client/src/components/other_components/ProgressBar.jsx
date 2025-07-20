import React, { useEffect } from "react";
import { motion, useAnimation, useSpring } from "framer-motion";

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

  const springValue = useSpring(0, { damping: 15, stiffness: 100 });

  useEffect(() => {
    springValue.set(percentage);
    controls.start({ width: `${percentage}%` });
  }, [percentage, springValue, controls]);

  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 text-sm text-white font-medium">{label}</div>
      )}
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

        <motion.span className="absolute right-13 top-1/2 transform -translate-y-1  text-xs">
            {Math.round(percentage)}%
        </motion.span>
      
      </div>
    </div>
  );
}
