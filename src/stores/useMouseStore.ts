import { create } from "zustand";

type MouseType = "default" | "link" | "button" | "text";

interface HoveredElement {
  width: number;
  height: number;
  x: number;
  y: number;
  color?: string;
  noAnime?: boolean;
}

interface MouseState {
  cursorType: MouseType;
  hoveredElement: HoveredElement | null;
  setCursorType: (type: MouseType) => void;
  setHoveredElement: (rect: DOMRect | null) => void;
  setColor: (color: string) => void;
  setNoAnime: (noAnime: boolean) => void;
}

const useMouseStore = create<MouseState>((set) => ({
  cursorType: "default",
  hoveredElement: null,

  setCursorType: (type) => set({ cursorType: type }),

  setHoveredElement: (rect) =>
    set({
      hoveredElement: rect
        ? {
            width: rect.width,
            height: rect.height,
            x: rect.left + rect.width / 2,
            y: rect.top + rect.height / 2,
          }
        : null,
    }),
  setColor: (color) =>
    set((state) => ({
      hoveredElement: { ...(state.hoveredElement as HoveredElement), color },
    })),
  setNoAnime: (noAnime) =>
    set((state) => ({
      hoveredElement: { ...(state.hoveredElement as HoveredElement), noAnime },
    })),
}));

export default useMouseStore;
