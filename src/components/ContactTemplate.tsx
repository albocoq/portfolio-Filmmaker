"use client";

import { useCallback, useEffect, useState } from "react";

export default function ContactTemplate({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(description);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = description;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "absolute";
        textarea.style.left = "-9999px";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      setIsCopied(true);
    } catch {
      setIsCopied(false);
    }
  }, [description]);

  useEffect(() => {
    if (!isCopied) return;
    const timeoutId = setTimeout(() => setIsCopied(false), 1200);
    return () => clearTimeout(timeoutId);
  }, [isCopied]);

  return (
    <div className="uppercase flex flex-col items-center gap-3">
      <h1 className="text-xl font-poppins-placeholder leading-5 tracking-tight">
        {title}
      </h1>
      <p
        className="text-5xl font-fjalla-one-placeholder tracking-tight leading-[90%] hover:text-secondary transition-colors duration-700 ease-out cursor-pointer select-none"
        onClick={copyToClipboard}
        title="Click to copy"
        aria-live="polite"
      >
        {isCopied ? "copied!" : description}
      </p>
    </div>
  );
}
