"use client";

import { useEffect, useRef } from "react";

const HALF = 4; // half of 8px

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const onMouseMove = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - HALF}px, ${e.clientY - HALF}px)`;
    };

    const onEnter = () => cursor.classList.add("cursor--hover");
    const onLeave = () => cursor.classList.remove("cursor--hover");

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", (e) => {
      if ((e.target as Element).closest("a, button, [data-cursor-hover]")) onEnter();
    });
    document.addEventListener("mouseout", (e) => {
      if ((e.target as Element).closest("a, button, [data-cursor-hover]")) onLeave();
    });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return <div ref={cursorRef} className="cursor" aria-hidden="true" />;
}
