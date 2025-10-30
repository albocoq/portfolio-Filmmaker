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

      // Continue de mettre à jour tant qu'il y a un élément survolé
      if (currentElement) {
        rafId.current = requestAnimationFrame(updateElementRect);
      }
    };

    const handleOver = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      if (!target) return;

      // Trouver le parent pertinent
      const link = target.closest("a");
      const button = target.closest("button");

      if (link) {
        currentElement = link as HTMLElement;
        setCursorType("link");
        setHoveredElement(link.getBoundingClientRect());
        setColor(link.id);

        // Démarrer la boucle d'animation
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

      // Arrêter la boucle d'animation
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
    };

    const handleLeave = () => {
      currentElement = null;
      setHoveredElement(null);
      setCursorType("default");

      // Arrêter la boucle d'animation
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

      // Nettoyer la boucle d'animation
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [setCursorType, setHoveredElement, setColor]);

  return null;
}
