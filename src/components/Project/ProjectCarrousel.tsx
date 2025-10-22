"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useState } from "react";

export default function ProjectCarrousel({ images }: { images: string[] }) {
  const [isHovered, setIsHovered] = useState(false);

  const tripledImages = [...images, ...images, ...images];

  return (
    <div
      className="w-[99%] overflow-hidden relative"
      style={{
        transform: "perspective(1200px) rotate(358deg)",
      }}
    >
      <motion.div
        className="flex gap-4"
        animate={{
          x: [0, -33.333 + "%"],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: isHovered ? 100 : 20,
            ease: "linear",
          },
        }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        {tripledImages.map((image, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-110 h-78 bg-gray-200 rounded-lg overflow-hidden opacity-65"
          >
            <Image
              src={image}
              width={256}
              height={160}
              alt={`Project ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
      <div className="h-full w-20 bg-gradient-to-r from-transparent to-background z-10 absolute right-0 top-0" />
      <div className="h-full w-20 bg-gradient-to-l from-transparent to-background z-10 absolute left-0 top-0" />
    </div>
  );
}
