"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function ContactTemplate({
  title,
  description,
  index,
}: {
  title: string;
  description: string;
  index: number;
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
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        delay: 0.1 * index,
        type: "spring",
        stiffness: 80,
        damping: 10,
      }}
      className="uppercase flex flex-col items-center gap-3"
    >
      <motion.h1
        className="text-xl font-poppins-placeholder leading-5 tracking-tight"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
      >
        {title}
      </motion.h1>

      <motion.button
        whileTap={{ scale: 0.97 }}
        className="text-5xl font-fjalla-one-placeholder tracking-tight leading-[90%] text-center  select-none relative"
        onClick={copyToClipboard}
        title="Click to copy"
      >
        <AnimatePresence mode="wait">
          {!isCopied ? (
            <motion.span
              key="description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="hover:text-secondary transition-colors duration-700 ease-out"
            >
              {description}
            </motion.span>
          ) : (
            <motion.span
              key="copied"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 15,
              }}
              className="text-secondary"
            >
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}
