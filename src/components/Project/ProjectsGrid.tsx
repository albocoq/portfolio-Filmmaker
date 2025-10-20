"use client";

import ProjectCard from "./ProjectCard";
import text from "@/data/text.json";

export default function ProjectsGrid() {
  const projects = Object.keys(text).map((key) => ({
    id: key,
    title: text[key as keyof typeof text].title,
    category: text[key as keyof typeof text].category,
    video: text[key as keyof typeof text].url,
    color: text[key as keyof typeof text].color,
  }));

  return (
    <section id="works" className="mt-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5 px-2.5">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            delay={1}
          />
        ))}
      </div>
    </section>
  );
}
