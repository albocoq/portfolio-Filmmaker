import Hero from "@/components/Hero";
import ProjectCarrousel from "@/components/Project/ProjectCarrousel";
import ProjectCredits from "@/components/Project/ProjectCredits";
import ProjectDescription from "@/components/Project/ProjectDescription";
import ProjectVideo from "@/components/Project/ProjectVideo";
import fs from "fs";
import path from "path";
import text from "@/data/text.json";

export default async function WorkPage({
  params,
}: {
  params: { slug: string };
}) {
  let { slug } = await params;
  slug = slug
    .replaceAll("%20", " ")
    .replaceAll("%C3%98", "Ø")
    .replaceAll("%C3%A9", "é")
    .replaceAll("%C3%A0", "à")
    .replaceAll("%C3%BA", "ú");

  const imagesDir = path.join(process.cwd(), "public/image", slug + "/");
  let images: string[] = [];
  try {
    images = fs
      .readdirSync(imagesDir)
      .filter((file) => file.toLowerCase().endsWith(".webp"))
      .map((file) => `/image/${slug}/${file}`);
  } catch (e) {
    images = [];
  }

  const category = text[slug as keyof typeof text].category;
  const color = text[slug as keyof typeof text].color;
  const url = text[slug as keyof typeof text].url;

  return (
    <main className="min-h-screen pt-44 flex flex-col gap-24">
      <Hero
        title={slug}
        description={[category ?? "Music"]}
        color={color}
        light
      />
      <ProjectCarrousel images={images} />
      <ProjectCredits slug={slug} />
      <ProjectVideo
        video={url}
        image={images[0]}
        title={slug}
        director={text[slug as keyof typeof text].director}
      />
      <ProjectDescription slug={slug} />
    </main>
  );
}
