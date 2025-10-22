"use client";

import { motion } from "motion/react";
import { useState, useMemo } from "react";

export interface Project {
  id: string;
  title: string;
  category: string;
  video: string;
  color: string;
}

interface ProjectCardProps {
  project: Project;
  index?: number;
  delay?: number;
  className?: string;
}

export default function ProjectCard({
  project,
  index = 0,
  delay = 0.1,
  className = "",
}: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const displayTitle = useMemo(
    () => project.title.replaceAll("-", " "),
    [project.title]
  );

  return (
    <motion.a
      href={`/works/${project.title}`}
      key={project.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay + index * 0.1 }}
      viewport={{ once: true }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl p-2 transition-all duration-700 ease-out cursor-pointer ${className}`}
      style={{ backgroundColor: isHovered ? project.color : "var(--surface)" }}
    >
      <div className="aspect-[3/3] relative overflow-hidden rounded-[20px]">
        <video
          src={project.video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-2 my-4 uppercase overflow-hidden h-10 text-start">
        <div
          className={`transition-all duration-700 ease-out ${
            isHovered ? "opacity-0 -translate-y-5" : "opacity-100 translate-y-0"
          }`}
        >
          <h3 className="text-lg leading-none text-primary font-fjalla-one-placeholder">
            {displayTitle}
          </h3>
        </div>

        <div
          className={`absolute transition-all duration-700 ease-out ${
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <h3 className="text-lg leading-none text-gray-600 font-fjalla-one-placeholder">
            {displayTitle}
          </h3>
          <p className="text-gray-600 text-sm leading-none">
            {project.category}
          </p>
        </div>
      </div>
    </motion.a>
  );
}
