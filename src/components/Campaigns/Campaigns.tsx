"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CAMPAIGNS } from "@/lib/data";

gsap.registerPlugin(ScrollTrigger);

const CONTENT_EXPERIMENTS = [
  "REELS SERIES — DAILY MOTION STUDIES",
  "AI PORTRAITS — PERSONA GENERATION",
  "LOOP ARCHIVE — ABSTRACT TEXTURES",
  "TYPE IN MOTION — KINETIC TYPOGRAPHY",
];

export function Campaigns() {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = listRef.current?.querySelectorAll("li");
      if (!items) return;

      gsap.fromTo(
        items,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="px-4 py-24 md:px-8">
      {/* Section label */}
      <p className="mb-16 font-mono-custom text-[10px] tracking-[0.4em] opacity-40">
        [ SELECTED CAMPAIGNS ]
      </p>

      <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
        {/* Left: main campaigns */}
        <ul ref={listRef} className="flex flex-col gap-8">
          {CAMPAIGNS.map((campaign, i) => (
            <li
              key={i}
              className="group flex flex-col gap-1 border-b border-white/10 pb-8 opacity-0"
              data-cursor-hover
            >
              <h3 className="font-pixel text-xs leading-relaxed transition-opacity group-hover:opacity-80 md:text-sm lg:text-base">
                {campaign.title}
              </h3>
              <p className="font-mono-custom text-[10px] tracking-widest opacity-40">
                {campaign.subtitle}
              </p>
            </li>
          ))}
        </ul>

        {/* Right: content & experiments */}
        <div className="flex flex-col gap-4">
          <p className="font-mono-custom text-[10px] tracking-[0.3em] opacity-40">
            CONTENT & EXPERIMENTS
          </p>
          <ul className="flex flex-col gap-3">
            {CONTENT_EXPERIMENTS.map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-3 font-mono-custom text-[10px] tracking-widest opacity-50 transition-opacity hover:opacity-100"
              >
                <span className="mt-0.5 opacity-40">›</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
