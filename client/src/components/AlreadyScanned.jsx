// AlreadyScannedPage.jsx
import React from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { GridBackground } from "./other_components/GridBackground";
import { Spotlight } from "./other_components/spotlight";
import { UserProfile } from "./UserProfile";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.06 }
  },
  exit: { opacity: 0, y: -24, transition: { duration: 0.25, ease: "easeIn" } }
};

const item = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } }
};

export default function AlreadyScannedPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const posterId = location.state?.posterId ?? null;

  return (
    <motion.section
      className="min-h-screen w-full relative overflow-hidden flex flex-col justify-center"
      variants={container}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* background */}
      <div className="absolute inset-0 -z-10">
        <GridBackground />
        <Spotlight />
      </div>

      {/* cross icon with bounce */}
      <motion.div
        className="items-center justify-center flex"
        initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.05 }}
      >
        <img src="/assets/img/cross2.png" alt="Cross" className="h-24 drop-shadow-xl" />
      </motion.div>

      {/* content*/}
      <motion.div
        className="mx-auto max-w-2xl px-6 py-8 flex flex-col items-center text-center font-lucky"
        variants={item}
      >
        <motion.h1
          className="text-4xl sm:text-6xl font-bold text-white font-brigada mb-4"
          variants={item}
        >
          <span className="text-yellow-600">Poster already </span>
          <span className="text-red-500">scanned</span>
          {posterId && (
            <span className="block text-base mt-2 text-blue-200">Poster ID: {posterId}</span>
          )}
        </motion.h1>

        <motion.div className="mt-6" variants={item}>
          <p className="text-lg text-blue-300">----- Progress -----</p>
          <div className="mt-1">
            <UserProfile />
          </div>
        </motion.div>


      </motion.div>
    </motion.section>
  );
}
