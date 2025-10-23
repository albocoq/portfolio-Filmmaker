"use client";

import { motion } from "motion/react";
import TextEffect from "./TextEffect";
import { ScreenFitText } from "./ScreenFitText";
import PaparazziBackground from "./PaparazziBackground";

export default function Hero({
  title,
  description,
  color,
  small,
  light,
}: {
  title: string;
  description:
    | string[]
    | { text: string; isSelected?: boolean; onClick?: () => void }[];
  color?: string;
  small?: boolean;
  light?: boolean;
}) {
  return (
    <section className="flex flex-col items-center justify-center p-5 px-10 gap-5">
      {light && <PaparazziBackground color={color ?? ""} />}

      <div
        className={`flex items-center justify-center ${
          small ? "h-[110px]" : "h-[260px]"
        } overflow-hidden w-full`}
      >
        <motion.div
          initial={{ y: "140%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full flex justify-center overflow-hidden"
        >
          <ScreenFitText
            text={title.replaceAll("-", " ")}
            color={color}
            minFontSize={small ? 40 : 20}
            maxFontSize={small ? 120 : 280}
          />
        </motion.div>
      </div>

      <div
        className={`flex flex-col sm:flex-row gap-2 place-content-around ${small ? "w-2/5" : "w-full"}`}
      >
        {description.map((item, index) => (
          <motion.h2
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.4 }}
            className="text-primary-500 text-xl text-center flex flex-col items-center justify-center uppercase overflow-hidden"
          >
            {typeof item === "string" ? (
              item
                .split("<br />")
                .map((line, lineIndex) => <span key={lineIndex}>{line}</span>)
            ) : (
              <TextEffect
                text={item.text}
                color={!item.isSelected ? "#626262" : undefined}
                onClick={item.onClick}
                className="text-header font-poppins font-medium"
              />
            )}
          </motion.h2>
        ))}
      </div>
    </section>
  );
}
