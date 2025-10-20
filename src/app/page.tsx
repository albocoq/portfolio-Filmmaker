import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/Project/ProjectsGrid";

export default function Home() {
  return (
    <main className="min-h-screen pt-44 flex flex-col gap-15">
      <Hero
        title="SACHA FILMS"
        description={[
          `Cinematography studio <br /> based in Amsterdam`,
          `Unleashing the power of <br /> visual storytelling`,
        ]}
      />
      <ProjectsGrid />
    </main>
  );
}
