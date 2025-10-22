"use client";

import ProjectCard from "./ProjectCard";
import text from "@/data/text.json";
import { Project } from "./ProjectCard";

export default function ProjectsGrid() {
  const projects: Project[] = Object.entries(text).map(([id, value]) => ({
    id,
    title: value.title,
    category: value.category,
    video: value.url,
    color: value.color,
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
