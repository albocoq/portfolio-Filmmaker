import text from "@/data/text.json";

export default function ProjectCredits({ slug }: { slug: string }) {
  const credits = text[slug as keyof typeof text].credits;

  if (!credits) return null;

  const entries = Object.entries(credits);

  return (
    <div className="w-full flex gap-3.5 justify-center items-center">
      <div className="uppercase flex flex-col gap-3.5 items-end font-fjalla-one-placeholder">
        {entries.map(([key]) => (
          <p key={key}>{key}</p>
        ))}
      </div>

      <div className="flex flex-col gap-3.5 items-start font-poppins-placeholder">
        {entries.map(([key, value]) => (
          <p key={key}>{value}</p>
        ))}
      </div>
    </div>
  );
}
