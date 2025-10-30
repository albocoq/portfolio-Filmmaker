"use client";
import { useEffect, useRef } from "react";
import useMouseStore from "@/stores/useMouseStore";

export default function GlobalCursorEvents() {
  const { setCursorType, setHoveredElement, setColor, setNoAnime } =
    useMouseStore();
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    let currentElement: HTMLElement | null = null;

    const updateElementRect = () => {
      if (currentElement) {
        setHoveredElement(currentElement.getBoundingClientRect());

        if (currentElement.tagName === "A") {
          const [color, anime] = currentElement.id.split("-");
          setNoAnime(anime == "true" ? true : false);
          setColor(color);
        }
      }

      if (currentElement) {
        rafId.current = requestAnimationFrame(updateElementRect);
      }
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const link = target.closest("a");
      const button = target.closest("button");

      if (link) {
        currentElement = link as HTMLElement;
        setCursorType("link");
        setHoveredElement(link.getBoundingClientRect());
        setColor(link.id);

        if (rafId.current) cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(updateElementRect);
        return;
      }

      if (button) {
        currentElement = button as HTMLElement;
        setCursorType("button");
        setHoveredElement(button.getBoundingClientRect());

        if (rafId.current) cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(updateElementRect);
        return;
      }

      if (["P", "SPAN", "H1", "H2", "H3", "H4"].includes(target.tagName)) {
        currentElement = target;
        setCursorType("text");
        setHoveredElement(target.getBoundingClientRect());

        if (rafId.current) cancelAnimationFrame(rafId.current);
        rafId.current = requestAnimationFrame(updateElementRect);
        return;
      }

      currentElement = null;
      setCursorType("default");
      setHoveredElement(null);

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };

    const handleLeave = () => {
      currentElement = null;
      setHoveredElement(null);
      setCursorType("default");

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };

    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleLeave);

    return () => {
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleLeave);

      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [setCursorType, setHoveredElement, setColor]);

  return null;
}
