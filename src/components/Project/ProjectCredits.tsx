import text from "@/data/text.json";
import Link from "next/link";

export default function ProjectCredits({ slug }: { slug: string }) {
  const credits = text[slug as keyof typeof text].credits;
  const color = text[slug as keyof typeof text].color;

  if (!credits) return null;

  const entries = Object.entries(credits);

  const parseValueWithLinks = (value: string) => {
    const parts = value.split(/(@\S+)/g);

    return parts.map((part, index) => {
      if (part.startsWith("@")) {
        return (
          <Link
            key={index}
            href={`https://instagram.com/${part.slice(1)}`}
            target="_blank"
            style={{ color }}
            className="hover:underline"
          >
            {part}
          </Link>
        );
      }
      return part;
    });
  };

  return (
    <div className="w-full flex gap-3.5 justify-center items-center">
      <div className="uppercase flex flex-col gap-3.5 items-end font-fjalla-one-placeholder">
        {entries.map(([key]) => (
          <p key={key}>{key}</p>
        ))}
      </div>

      <div className="flex flex-col gap-3.5 items-start font-poppins-placeholder">
        {entries.map(([key, value]) => (
          <p key={key}>{parseValueWithLinks(value)}</p>
        ))}
      </div>
    </div>
  );
}
