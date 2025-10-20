"use client";

import text from "@/data/text.json";
import ProjectCard from "@/components/Project/ProjectCard";
import { motion, useScroll, useTransform } from "motion/react";
import { usePathname } from "next/navigation";

export default function Accroche() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const projects = Object.keys(text).map((key) => ({
    id: key,
    title: text[key as keyof typeof text].title,
    category: text[key as keyof typeof text].category,
    video: text[key as keyof typeof text].url,
    color: text[key as keyof typeof text].color,
  }));
  const translateY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  const getNextProjects = () => {
    if (!pathname.includes("works/")) return projects.slice(0, 2);

    const currentProjectSlug = pathname.split("/works/")[1];

    const currentIndex = projects.findIndex(
      (project) => project.id === currentProjectSlug
    );

    if (currentIndex === -1) return projects.slice(0, 2);

    const nextProjects = [];
    for (let i = 1; i <= 2; i++) {
      const nextIndex = (currentIndex + i) % projects.length;
      nextProjects.push(projects[nextIndex]);
    }
    return nextProjects;
  };

  const nextProjects = getNextProjects();

  return (
    <section className="py-20 px-4 h-screen">
      {pathname.includes("works") ? (
        <div className="flex flex-col items-center text-center relative">
          <div className="h-[110px] flex items-center justify-center overflow-hidden">
            <motion.h2
              className="text-5xl font-fjalla-one-placeholder"
              initial={{ opacity: 0, y: "100%" }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              Other works
            </motion.h2>
          </div>
          <div className="w-full flex items-center justify-center group">
            {nextProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                className={`w-1/4 h-full ${
                  index === 0
                    ? "translate-x-1/2 group-hover:translate-x-0 group-hover:perspective-[200px] group-hover:rotate-[-20deg]"
                    : "-translate-x-1/2 group-hover:-perspective-[1200px] group-hover:rotate-[20deg] group-hover:translate-x-0"
                } transition-all duration-700 ease-out`}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center relative">
          <div className="absolute z-10">
            <div className="h-[110px] flex items-center justify-center overflow-hidden">
              <motion.h2
                className="text-8xl font-fjalla-one-placeholder"
                initial={{ opacity: 0, y: "100%" }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                Breathe life
              </motion.h2>
            </div>
            <div className="h-[115px] flex items-center justify-center overflow-hidden">
              <motion.h2
                className="text-8xl font-fjalla-one-placeholder"
                initial={{ opacity: 0, y: "100%" }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true }}
              >
                into your ideas
              </motion.h2>
            </div>
          </div>
          <motion.div
            className="relative w-66 h-78"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{
              y: translateY,
            }}
          >
            <div className="w-full h-full object-cover bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg"></div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
