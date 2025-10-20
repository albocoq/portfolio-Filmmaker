"use client";

import { motion } from "motion/react";
import { useState } from "react";

interface Project {
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
  const [hoverColor, setHoverColor] = useState<string>("");
  return (
    <motion.a
      href={`/works/${project.title}`}
      key={project.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay + index * 0.1 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-3xl p-2 bg-surface transition-all duration-700 ease group cursor-pointer ${className}`}
      style={{ backgroundColor: hoverColor || undefined }}
      onMouseEnter={() => setHoverColor(project.color)}
      onMouseLeave={() => setHoverColor("")}
    >
      <div className="aspect-[3/3] bg-gray-200 relative overflow-hidden rounded-[20px] cursor-default">
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
      </div>

      <div className="px-2 my-4 uppercase overflow-hidden h-10 text-start">
        <div className="translate-y-4 group-hover:opacity-0 group-hover:-translate-y-5 transition-all duration-700 ease-out">
          <h3 className="text-lg leading-none text-primary font-fjalla-one-placeholder ">
            {project.title.replaceAll("-", " ")}
          </h3>
          <p className="text-gray-600 text-sm leading-none opacity-0">
            {project.category}
          </p>
        </div>
        <div className="translate-y-4 group-hover:opacity-100 group-hover:-translate-y-6 transition-all duration-700 ease-out">
          <h3 className="text-lg leading-none text-gray-600 font-fjalla-one-placeholder">
            {project.title.replaceAll("-", " ")}
          </h3>
          <p className="text-gray-600 text-sm leading-none">
            {project.category}
          </p>
        </div>
      </div>
    </motion.a>
  );
}

export type { Project };
