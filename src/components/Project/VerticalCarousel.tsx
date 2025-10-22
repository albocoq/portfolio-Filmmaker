"use client";

import text from "@/data/text.json";
import { motion } from "motion/react";
import { useState } from "react";

export default function VerticalCarousel({
  selectedCategory,
}: {
  selectedCategory: string;
}) {
  const projects = Object.keys(text).map((key) => ({
    id: key,
    title: text[key as keyof typeof text].title,
    category: text[key as keyof typeof text].category,
    video: text[key as keyof typeof text].url,
    color: text[key as keyof typeof text].color,
  }));
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const [isHovered, setIsHovered] = useState("");

  const tripledProjects = [
    ...filteredProjects,
    ...filteredProjects,
    ...filteredProjects,
  ].map((project, index) => ({
    ...project,
    uniqueId: `${project.id}-${index}`,
  }));

  return (
    <div
      className="relative h-[75vh] overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(rgba(0, 0, 0, 0) 0%, rgb(0, 0, 0) 5%, rgb(0, 0, 0) 95%, rgba(0, 0, 0, 0) 100%)",
      }}
    >
      <motion.div
        className="flex flex-col items-center gap-10 py-10"
        animate={{
          y: [0, -33.333 + "%"],
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
        onHoverStart={() => setIsHovered("pause")}
        onHoverEnd={() => setIsHovered("")}
      >
        {tripledProjects.map((project, index) => (
          <motion.a
            layout
            key={project.uniqueId}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: index * 0.1 }}
            href={`/works/${project.title}`}
            className="flex items-end gap-4 relative"
            onHoverStart={() => setIsHovered(project.uniqueId)}
            onHoverEnd={() => setIsHovered("")}
          >
            <h3 className="font-fjalla-one-placeholder text-5xl uppercase">
              {project.title.replaceAll("-", " ")}
            </h3>
            <p className="font-poppins text-secondary">{project.category}</p>
            <motion.div
              className="w-[250px] h-[200px] rounded-2xl absolute left-[85%] overflow-hidden"
              initial={{
                opacity: 0,
                transform: "perspective(1000px) rotate(10deg)",
                filter: "blur(10px)",
              }}
              animate={{
                opacity: isHovered === project.uniqueId ? 1 : 0,
                transform: "perspective(1000px) rotate(10deg)",
                filter:
                  isHovered === project.uniqueId ? "blur(0px)" : "blur(10px)",
              }}
              transition={{ duration: 0.3 }}
            >
              <video
                src={project.video}
                width={300}
                height={300}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
