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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: rowRef.current,
            start: "top 85%",
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
      className="grid grid-cols-1 gap-6 py-12 opacity-0 md:grid-cols-2 md:gap-16"
    >
      {/* Left: company name */}
      <div className="flex flex-col justify-between gap-4">
        <h2 className="font-pixel text-sm leading-relaxed md:text-base lg:text-xl">
          {entry.company}
        </h2>
        <span className="font-mono-custom text-[10px] tracking-widest opacity-40">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      {/* Right: details */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="font-mono-custom text-[10px] tracking-[0.3em] opacity-50">
            {entry.period}
          </p>
          <p className="font-mono-custom text-xs font-bold tracking-wider">
            {entry.role}
          </p>
        </div>

        <p className="font-mono-custom text-xs leading-relaxed opacity-60">
          {entry.description}
        </p>

        {/* Tools */}
        <div className="flex flex-wrap gap-2 pt-2">
          {entry.tools.map((tool) => (
            <span
              key={tool}
              className="border border-white/20 px-2 py-1 font-mono-custom text-[9px] tracking-widest"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
