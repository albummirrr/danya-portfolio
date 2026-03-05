"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { WorkCategory as WorkCategoryType } from "@/types";
import { VideoCard } from "./VideoCard";

gsap.registerPlugin(ScrollTrigger);

/* Placeholder cards shown when category has no videos yet */
const PLACEHOLDER_COUNT = 4;

interface Props {
  category: WorkCategoryType;
  index: number;
}

export function WorkCategory({ category, index }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Horizontal scroll via GSAP on desktop */
  useEffect(() => {
    const track = trackRef.current;
    const section = sectionRef.current;
    if (!track || !section) return;

    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    if (isMobile) return;

    const totalScroll = track.scrollWidth - section.offsetWidth;

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const videos = category.videos.length > 0 ? category.videos : [];
  const showPlaceholders = videos.length === 0;

  return (
    <div
      ref={sectionRef}
      className="overflow-hidden border-t border-white/10"
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:gap-0">
        {/* Category label — sticky on desktop */}
        <div className="flex-shrink-0 px-4 pt-6 md:w-64 md:px-8 md:pt-8 lg:w-80">
          <p className="font-mono-custom text-[9px] tracking-[0.3em] opacity-30">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 font-pixel text-[9px] leading-relaxed md:text-[10px] lg:text-xs">
            {category.title}
          </h3>
        </div>

        {/* Horizontal scroll area (desktop) / Grid (mobile) */}
        <div className="flex-1 overflow-x-auto pb-8 pt-4 md:overflow-visible md:pt-8">
          {/* Mobile: CSS grid */}
          <div
            className="grid grid-cols-2 gap-3 px-4 md:hidden"
          >
            {showPlaceholders
              ? Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
                  <VideoCard key={i} />
                ))
              : videos.map((v) => <VideoCard key={v.id} video={v} />)}
          </div>

          {/* Desktop: GSAP horizontal track */}
          <div
            ref={trackRef}
            className="h-scroll-track hidden pl-4 md:flex md:pl-0"
          >
            {showPlaceholders
              ? Array.from({ length: PLACEHOLDER_COUNT }).map((_, i) => (
                  <VideoCard key={i} />
                ))
              : videos.map((v) => <VideoCard key={v.id} video={v} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
