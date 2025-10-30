"use client";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect } from "react";
import useMouseStore from "@/stores/useMouseStore";

export default function CustomCursor() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const { cursorType, hoveredElement } = useMouseStore();

  const smoothOptions = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(mouseX, smoothOptions);
  const y = useSpring(mouseY, smoothOptions);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!hoveredElement) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
      if (cursorType == "text") mouseX.set(e.clientX);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY, hoveredElement, cursorType]);

  useEffect(() => {
    if (hoveredElement) {
      if (cursorType === "text") {
        mouseY.set(hoveredElement.y);
      } else {
        mouseX.set(hoveredElement.x);
        mouseY.set(hoveredElement.y);
      }
    }
  }, [hoveredElement, mouseX, mouseY, cursorType]);

  const cursorStyles = {
    default: { width: 8, height: 8, color: "white" },
    link: {
      width: hoveredElement
        ? hoveredElement.width < 200
          ? hoveredElement.width * 1.2
          : hoveredElement.width
        : 20,
      height: hoveredElement
        ? hoveredElement.height < 200
          ? hoveredElement.height * 1.2
          : hoveredElement.height
        : 20,
      borderRadius: hoveredElement
        ? hoveredElement.width < 200
          ? 5
          : 20
        : 99999,
      color: hoveredElement?.color
        ? hoveredElement.color
        : "rgba(203, 203, 201, 0.25)",
    },
    button: {
      width: hoveredElement
        ? hoveredElement.width < 200
          ? hoveredElement.width * 1.2
          : hoveredElement.width
        : 20,
      height: hoveredElement
        ? hoveredElement.height < 200
          ? hoveredElement.height * 1.2
          : hoveredElement.height
        : 20,
      borderRadius: hoveredElement
        ? hoveredElement.width < 200
          ? 5
          : 20
        : 99999,
      color: hoveredElement?.color
        ? hoveredElement.color
        : "rgba(203, 203, 201, 0.25)",
    },
    text: {
      width: 6,
      height: hoveredElement ? hoveredElement.height * 0.9 : 12,
      color: "#b20506",
    },
  }[cursorType];

  if (hoveredElement?.noAnime) return;
  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-5"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: cursorStyles.width,
        height: cursorStyles.height,
        backgroundColor: cursorStyles.color,
        borderRadius: cursorStyles.borderRadius ?? 9999,
      }}
      transition={{
        width: {
          type: "spring",
          stiffness: 300,
          damping: 25,
        },
        height: {
          type: "spring",
          stiffness: 300,
          damping: 25,
        },
        backgroundColor: {
          type: "tween",
          ease: "easeInOut",
          duration: 0.5, // tu peux ajuster entre 0.4 et 0.7
        },
        borderRadius: {
          type: "spring",
          stiffness: 500,
          damping: 30,
          mass: 0.5,
        },
      }}
    />
  );
}
