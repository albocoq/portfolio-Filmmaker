"use client";

import React, { useEffect, useRef, useState } from "react";

export function ScreenFitText({
  text,
  color,
  minFontSize = 60,
  maxFontSize = 280,
}: {
  text: string;
  color?: string;
  minFontSize?: number;
  maxFontSize?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState(maxFontSize);

  useEffect(() => {
    const resize = () => {
      const container = containerRef.current;
      const textEl = textRef.current;
      if (!container || !textEl) return;

      let newSize = maxFontSize;
      textEl.style.fontSize = `${newSize}px`;

      while (
        textEl.scrollWidth > container.clientWidth &&
        newSize > minFontSize
      ) {
        newSize -= 2;
        textEl.style.fontSize = `${newSize}px`;
      }

      setFontSize(newSize);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [text, minFontSize, maxFontSize]);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center overflow-hidden font-black"
    >
      <p
        ref={textRef}
        style={{
          fontSize,
          color,
          lineHeight: 1,
          whiteSpace: "nowrap",
          textTransform: "uppercase",
          fontFamily: "Orbitron, sans-serif",
        }}
      >
        {text}
      </p>
    </div>
  );
}
