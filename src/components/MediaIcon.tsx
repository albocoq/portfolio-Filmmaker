import Image from "next/image";

interface MediaIconProps {
  name: "play" | "stop" | "previous" | "next";
  size?: number;
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function MediaIcon({
  name,
  size = 24,
  className = "",
  onClick,
}: MediaIconProps) {
  const iconPath = `/icons/${name}.svg`;

  return (
    <div
      className={`inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      <Image
        src={iconPath}
        alt={name}
        width={size}
        height={size}
        className="w-full h-full"
      />
    </div>
  );
}
