"use client";

import text from "@/data/text.json";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  AnimatePresence,
} from "motion/react";
import { useEffect, useRef, useState } from "react";

export default function VerticalCarousel({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const projects = Object.entries(text).map(([key, value]) => ({
    id: key,
    title: value.title,
    category: value.category,
    video: value.url,
    color: value.color,
  }));

  const filtered =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const items = [...filtered, ...filtered, ...filtered];

  const y = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    y.stop();

    y.set(0);

    const controls = animate(y, -100 / 3, {
      duration: 20,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    });

    return () => controls.stop();
  }, [filtered.length]);

  const translateY = useTransform(y, (v) => `${v}%`);

  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <div
      ref={containerRef}
      className="relative h-[75vh] overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 5%, rgb(0, 0, 0) 95%, rgba(0, 0, 0, 0) 100%)",
      }}
    >
      <motion.div
        className="flex flex-col items-center gap-10 py-10 will-change-transform"
        style={{ y: translateY }}
      >
        {items.map((project, i) => {
          const uniqueId = `${project.id}-${i}`;
          const isActive = hoveredId === uniqueId;

          return (
            <motion.a
              layout
              key={uniqueId}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: i * 0.1 }}
              href={`/works/${project.title}`}
              className="relative flex items-end gap-4 cursor-pointer"
              onMouseEnter={() => setHoveredId(uniqueId)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <h3 className="font-fjalla-one-placeholder text-5xl uppercase truncate">
                {project.title.replaceAll("-", " ")}
              </h3>
              <p className="font-poppins text-secondary">{project.category}</p>

              <AnimatePresence>
                {isActive && (
                  <motion.div
                    className="absolute left-[85%] w-[250px] h-[200px] rounded-2xl overflow-hidden shadow-lg"
                    initial={{
                      opacity: 0,
                      y: 10,
                      scale: 0.95,
                      filter: "blur(10px)",
                      transform: "perspective(1000px) rotate(0deg)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      filter: "blur(0px)",
                      transform: "perspective(1000px) rotate(10deg)",
                    }}
                    exit={{
                      opacity: 0,
                      y: 10,
                      filter: "blur(10px)",
                      transform: "perspective(1000px) rotate(0deg)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <video
                      src={project.video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.a>
          );
        })}
      </motion.div>
    </div>
  );
}
