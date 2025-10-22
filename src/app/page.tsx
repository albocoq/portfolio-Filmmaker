import Hero from "@/components/Hero";
import ProjectsGrid from "@/components/Project/ProjectsGrid";

export default function Home() {
  return (
    <main className="min-h-screen pt-44 flex flex-col gap-15">
      <Hero
        title="SACHA FILMS"
        description={[
          `Creative film studio <br /> born in Málaga`,
          `Bringing stories to life <br /> through motion`,
        ]}
      />
      <ProjectsGrid />
    </main>
  );
}
