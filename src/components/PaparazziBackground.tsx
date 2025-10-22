"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function PaparazziBackground({ color }: { color: string }) {
  const [flashes, setFlashes] = useState<
    { id: number; x: number; y: number; delay: number; repeatDelay: number }[]
  >([]);

  useEffect(() => {
    const margin = 10;
    const newFlashes = Array.from({ length: 10 }).map((_, i) => ({
      id: i,
      x: Math.random() * (100 - 2 * margin) + margin,
      y: Math.random() * (100 - 2 * margin) + margin,
      delay: Math.random() * 6,
      repeatDelay: Math.random() * 6 + 4,
    }));
    setFlashes(newFlashes);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {flashes.map((flash) => (
        <motion.div
          key={flash.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.8, 1.6, 0.8],
          }}
          transition={{
            duration: 0.75,
            repeat: Infinity,
            delay: flash.delay,
            repeatDelay: flash.repeatDelay,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${flash.x}%`,
            top: `${flash.y}%`,
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            background: `radial-gradient(${color}, rgba(255,255,255,0))`,
            filter: "blur(25px)",
            pointerEvents: "none",
            mixBlendMode: "screen",
          }}
        />
      ))}
    </div>
  );
}
