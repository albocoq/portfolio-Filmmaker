import { motion } from "motion/react";
import Link from "next/link";
import { useState } from "react";

export default function TextEffect({
  text,
  url,
  onClick,
  className,
  color,
}: {
  text: string;
  url?: string;
  onClick?: () => void;
  className?: string;
  color?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);

  if (url) {
    return (
      <Link
        href={url || ""}
        className={className + " overflow-hidden relative h-fit"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.p
          initial={{ y: 0 }}
          animate={{ y: isHovered ? "-100%" : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ color: color }}
        >
          {text}
        </motion.p>
        <motion.p
          className="absolute inset-0"
          initial={{ y: 0 }}
          animate={{ y: isHovered ? 0 : "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ color: color }}
        >
          {text}
        </motion.p>
      </Link>
    );
  } else if (onClick) {
    return (
      <button
        className={className + " overflow-hidden relative h-fit z-6"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
      >
        <motion.p
          initial={{ y: 0 }}
          animate={{ y: isHovered ? "-100%" : 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ color: color }}
        >
          {text}
        </motion.p>
        <motion.p
          className="absolute inset-0"
          initial={{ y: 0 }}
          animate={{ y: isHovered ? 0 : "100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{ color: color }}
        >
          {text}
        </motion.p>
      </button>
    );
  }
  return <div className={className}>{text}</div>;
}
