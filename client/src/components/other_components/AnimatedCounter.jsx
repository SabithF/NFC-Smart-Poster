import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

function Number({ mv, number, height }) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let scroll = offset * height;
    if (offset > 5) scroll -= 10 * height;
    return -scroll;
  });

  return (
    <motion.span
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        lineHeight: 1,
      }}
    >
      <motion.span style={{ y }}>{number}</motion.span>
    </motion.span>
  );
}

function Digit({ value, height = 20 }) {
  const spring = useSpring(value, { stiffness: 120, damping: 20 });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  return (
    <div style={{ position: "relative", width: "1ch", height, overflow: "hidden" }}>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={spring} number={i} height={height} />
      ))}
    </div>
  );
}

export default function Counter({ value, fontSize = 20 }) {
  const height = fontSize;

  // support multiple digits (e.g., 1234)
  const digits = String(value)
    .padStart(1, "0")
    .split("")
    .map((d) => parseInt(d, 10));

  return (
    <div style={{ display: "flex" }}>
      {digits.map((digit, index) => (
        <Digit key={index} value={digit} height={height} />
      ))}
    </div>
  );
}
