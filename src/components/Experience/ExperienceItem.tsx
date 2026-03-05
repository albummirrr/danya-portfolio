"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ExperienceEntry } from "@/types";

gsap.registerPlugin(ScrollTrigger);

interface Props {
  entry: ExperienceEntry;
  index: number;
}

export function ExperienceItem({ entry, index }: Props) {
  const rowRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left column slides in from the left
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      // Right column slides in slightly after
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          delay: 0.12,
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 gap-8 py-14 md:grid-cols-[1fr_1fr] md:gap-20 lg:grid-cols-[5fr_6fr]"
    >
      {/* ── Left: company name ─────────────────────────────────────── */}
      <div ref={leftRef} className="flex flex-col justify-between gap-6 opacity-0">
        {/* Index */}
        <span className="font-mono-custom text-[10px] tracking-[0.4em] opacity-25">
          {String(index + 1).padStart(2, "0")} /
        </span>

        {/* Company — large condensed */}
        <h2
          className="font-pixel leading-tight tracking-tight text-white"
          style={{ fontSize: "clamp(18px, 2.8vw, 42px)" }}
        >
          {entry.company}
        </h2>
      </div>

      {/* ── Right: details ─────────────────────────────────────────── */}
      <div ref={rightRef} className="flex flex-col gap-6 opacity-0">
        {/* Period + role */}
        <div className="flex flex-col gap-2 border-l border-white/15 pl-5">
          <p className="font-mono-custom text-[10px] tracking-[0.35em] opacity-40">
            {entry.period}
          </p>
          <p className="font-mono-custom text-xs font-bold tracking-[0.2em] text-white">
            {entry.role}
          </p>
        </div>

        {/* Description */}
        <p className="font-mono-custom text-[11px] leading-[1.85] text-white/55">
          {entry.description}
        </p>

        {/* Tools — small grey */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1">
          <span className="font-mono-custom text-[9px] tracking-[0.3em] opacity-30">
            TOOLS —
          </span>
          {entry.tools.map((tool) => (
            <span
              key={tool}
              className="font-mono-custom text-[9px] tracking-widest"
              style={{ color: "#666" }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
