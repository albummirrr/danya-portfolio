"use client";

import { useRef, useEffect } from "react";
import type { CategoryId, Project } from "@/data/projects";
import { VideoCard } from "./VideoCard";

interface Props {
  id: CategoryId;
  label: string;
  index: number;
  projects: Project[];
}

const PLACEHOLDER_COUNT = 4;

export function WorkCategory({ label, index, projects }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Convert vertical wheel → horizontal scroll on desktop
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Only hijack if scroll is primarily vertical
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 1.2;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  const cards = projects.length > 0 ? projects : Array.from<null>({ length: PLACEHOLDER_COUNT }).fill(null);

  return (
    <div className="border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-start">

        {/* ── Label column ──────────────────────────────────────────── */}
        <div className="flex-shrink-0 px-6 pb-2 pt-6 md:w-52 md:py-8 md:px-12 lg:w-60 lg:px-16">
          <span className="block font-mono-custom text-[9px] tracking-[0.4em] opacity-25">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 font-pixel text-[8px] leading-[2] tracking-wide md:text-[9px]">
            {label}
          </h3>
        </div>

        {/* ── Mobile: 2-column grid ─────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-2 px-6 pb-6 md:hidden">
          {cards.map((project, i) => (
            <VideoCard
              key={(project as Project | null)?.id ?? `ph-${i}`}
              project={project as Project | null}
              mobile
            />
          ))}
        </div>

        {/* ── Desktop: horizontal scroll lane ───────────────────────── */}
        <div
          ref={scrollRef}
          className="portfolio-scroll hidden flex-1 snap-x snap-mandatory gap-3 overflow-x-auto pb-8 pt-6 md:flex"
        >
          {/* Left padding spacer */}
          <div className="flex-shrink-0 w-1" aria-hidden="true" />

          {cards.map((project, i) => (
            <VideoCard
              key={(project as Project | null)?.id ?? `ph-${i}`}
              project={project as Project | null}
            />
          ))}

          {/* Right padding spacer */}
          <div className="flex-shrink-0 w-6" aria-hidden="true" />
        </div>

      </div>
    </div>
  );
}
