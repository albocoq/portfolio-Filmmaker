"use client";

import text from "@/data/text.json";
import ProjectCard from "@/components/Project/ProjectCard";
import { motion, useScroll, useTransform } from "motion/react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useMemo } from "react";

export default function Accroche() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const translateY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  // ✅ Calcul des projets optimisé
  const projects = useMemo(
    () =>
      Object.keys(text).map((key) => ({
        id: key,
        title: text[key as keyof typeof text].title,
        category: text[key as keyof typeof text].category,
        video: text[key as keyof typeof text].url,
        color: text[key as keyof typeof text].color,
      })),
    []
  );

  // ✅ Récupération des projets suivants mémoïsée
  const nextProjects = useMemo(() => {
    if (!pathname.includes("works/")) return projects.slice(0, 2);
    const currentProjectSlug = pathname.split("/works/")[1];
    const currentIndex = projects.findIndex((p) => p.id === currentProjectSlug);
    if (currentIndex === -1) return projects.slice(0, 2);
    return Array.from(
      { length: 2 },
      (_, i) => projects[(currentIndex + i + 1) % projects.length]
    );
  }, [pathname, projects]);

  const isWorkPage = pathname.includes("works");

  return (
    <section className="py-20 px-4 h-screen will-change-transform">
      {isWorkPage ? (
        <div className="flex flex-col items-center text-center relative">
          <motion.h2
            className="text-5xl font-fjalla-one-placeholder h-[110px] flex items-center justify-center overflow-hidden"
            initial={{ opacity: 0, y: "100%" }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Other works
          </motion.h2>

          <div className="w-full flex items-center justify-center group">
            {nextProjects.map((project, index) => {
              const isFirst = index === 0;
              const cardClass = `
                w-1/4 h-full transition-all duration-700 ease-out will-change-transform
                ${
                  isFirst
                    ? "translate-x-1/2 group-hover:translate-x-0 group-hover:rotate-[-15deg]"
                    : "-translate-x-1/2 group-hover:translate-x-0 group-hover:rotate-[15deg]"
                }
              `;
              return (
                <ProjectCard
                  key={project.id}
                  project={project}
                  className={cardClass}
                />
              );
            })}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center relative">
          <div className="absolute z-10">
            {["Creative minds.", "Lifestyle vibes."].map((text, i) => (
              <motion.h2
                key={text}
                className="text-8xl font-fjalla-one-placeholder h-[110px] flex items-center justify-center overflow-hidden"
                initial={{ opacity: 0, y: "100%" }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                {text}
              </motion.h2>
            ))}
          </div>

          <motion.div
            className="relative w-66 h-78 will-change-transform"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{ y: translateY }}
          >
            <Image
              src="/image/first_page.png"
              width={500}
              height={500}
              alt="First Page"
              className="w-full h-full object-cover rounded-2xl"
              priority
            />
          </motion.div>
        </div>
      )}
    </section>
  );
}
