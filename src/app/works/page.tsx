"use client";

import Hero from "@/components/Hero";
import VerticalCarousel from "@/components/Project/VerticalCarousel";
import { useState } from "react";

export default function WorksPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <main className="min-h-screen pt-44 flex flex-col gap-15">
      <Hero
        title="All Works"
        description={[
          {
            text: "All works",
            isSelected: selectedCategory === "all",
            onClick: () => setSelectedCategory("all"),
          },
          {
            text: "After Movie",
            isSelected: selectedCategory === "aftermovie",
            onClick: () => setSelectedCategory("aftermovie"),
          },
          {
            text: "Video Clip",
            isSelected: selectedCategory === "videoclip",
            onClick: () => setSelectedCategory("videoclip"),
          },
        ]}
        small
      />

      <VerticalCarousel selectedCategory={selectedCategory} />
    </main>
  );
}
