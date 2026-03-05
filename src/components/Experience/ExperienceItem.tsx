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
  const leftRef  = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const rowRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([leftRef.current, rightRef.current], {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rowRef.current,
          start: "top 82%",
          once: true,
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-1 gap-8 md:grid-cols-[5fr_6fr] md:gap-20"
    >
      {/* Left: company name + index */}
      <div ref={leftRef}>
        <span className="font-body mb-4 block text-[11px] tracking-[0.4em] text-white/25">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h2
          className="font-heading leading-tight"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
        >
          {entry.company}
        </h2>
      </div>

      {/* Right: details */}
      <div ref={rightRef} className="flex flex-col gap-6">
        {/* Period + role */}
        <div className="border-l border-white/15 pl-5">
          <p className="font-body text-[13px] tracking-[0.3em] text-white/40">
            {entry.period}
          </p>
          <p
            className="font-body mt-1 font-[500] text-white"
            style={{ fontSize: "20px" }}
          >
            {entry.role}
          </p>
        </div>

        {/* Description */}
        <p
          className="font-body leading-[1.6]"
          style={{ fontSize: "18px", color: "#ccc" }}
        >
          {entry.description}
        </p>

        {/* Tools */}
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <span
            className="font-body text-[14px] tracking-widest"
            style={{ color: "#555" }}
          >
            TOOLS —
          </span>
          {entry.tools.map((tool) => (
            <span
              key={tool}
              className="font-body text-[14px]"
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
