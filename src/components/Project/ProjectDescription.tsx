import text from "@/data/text.json";

export default function ProjectDescription({ slug }: { slug: string }) {
  const description = text[slug as keyof typeof text];

  if (description.sections.length === 0) return null;
  return (
    <div className="w-full flex flex-col justify-center items-center gap-10">
      {description.sections.map((section, index) => (
        <div
          key={index}
          className="w-1/2 flex flex-col gap-2 justify-center items-center"
        >
          <h1 className="text-2xl leading-10 font-fjalla-one-placeholder uppercase">
            {section.title}
          </h1>
          <p className="text-center text-lg leading-6">{section.content}</p>
        </div>
      ))}
    </div>
  );
}
