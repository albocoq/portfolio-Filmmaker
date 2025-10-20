"use client";

import { motion } from "motion/react";

const AnimatedAudioLines = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <motion.path
        d="M2 10v3"
        animate={{
          d: ["M2 10v3", "M2 8v7", "M2 10v3"],
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.path
        d="M6 6v11"
        animate={{
          d: ["M6 6v11", "M6 4v15", "M6 6v11"],
        }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.1,
        }}
      />
      <motion.path
        d="M10 3v18"
        animate={{
          d: ["M10 3v18", "M10 1v22", "M10 3v18"],
        }}
        transition={{
          duration: 1.0,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2,
        }}
      />
      <motion.path
        d="M14 8v7"
        animate={{
          d: ["M14 8v7", "M14 6v11", "M14 8v7"],
        }}
        transition={{
          duration: 0.9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />
      <motion.path
        d="M18 5v13"
        animate={{
          d: ["M18 5v13", "M18 3v17", "M18 5v13"],
        }}
        transition={{
          duration: 1.1,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />
      <motion.path
        d="M22 10v3"
        animate={{
          d: ["M22 10v3", "M22 8v7", "M22 10v3"],
        }}
        transition={{
          duration: 1.3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </svg>
  );
};

export default AnimatedAudioLines;
