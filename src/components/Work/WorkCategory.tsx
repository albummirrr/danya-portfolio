"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { CategoryId, Project } from "@/data/projects";
import { VideoCard } from "./VideoCard";

gsap.registerPlugin(ScrollTrigger);

const PLACEHOLDER_COUNT = 4;

interface Props {
  id: CategoryId;
  label: string;
  index: number;
  projects: Project[];
}

export function WorkCategory({ label, index, projects }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const labelColRef  = useRef<HTMLDivElement>(null);
  const labelRef     = useRef<HTMLHeadingElement>(null);
  const scrollRef    = useRef<HTMLDivElement>(null);

  /* ── Wheel → horizontal scroll ─────────────────────────────────── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY * 1.2;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  /* ── Label parallax on horizontal scroll ───────────────────────── */
  useEffect(() => {
    const scrollEl = scrollRef.current;
    const labelCol = labelColRef.current;
    if (!scrollEl || !labelCol) return;

    const onScroll = () => {
      // Label drifts 6% of the scroll offset → appears to "lag behind"
      gsap.set(labelCol, { x: scrollEl.scrollLeft * 0.06 });
    };

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Section + cards entrance (ScrollTrigger) ──────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 84%",
          once: true,
        },
      });

      // Row slides up from below
      tl.from(containerRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });

      // Cards fan in left → right
      const cards = scrollRef.current?.querySelectorAll("[data-card]");
      if (cards && cards.length > 0) {
        tl.from(
          cards,
          {
            opacity: 0,
            x: 36,
            duration: 0.55,
            stagger: 0.07,
            ease: "power2.out",
          },
          "-=0.35"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  /* ── Typewriter on label ────────────────────────────────────────── */
  useEffect(() => {
    const el = labelRef.current;
    if (!el) return;

    // Hide text initially; will be typed in character-by-character
    el.textContent = "";
    let written = 0;
    let timer: ReturnType<typeof setInterval>;

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 84%",
      once: true,
      onEnter: () => {
        timer = setInterval(() => {
          written++;
          el.textContent = label.slice(0, written);
          if (written >= label.length) clearInterval(timer);
        }, 32);
      },
    });

    return () => {
      st.kill();
      clearInterval(timer);
    };
  }, [label]);

  const cards = projects.length > 0
    ? projects
    : Array.from({ length: PLACEHOLDER_COUNT }, () => null as Project | null);

  return (
    <div ref={containerRef} className="border-t border-white/10">
      <div className="flex flex-col md:flex-row md:items-start">

        {/* ── Label column ──────────────────────────────────────────── */}
        <div
          ref={labelColRef}
          className="flex-shrink-0 px-6 pb-2 pt-6 md:w-52 md:py-8 md:px-12 lg:w-60 lg:px-16"
        >
          <span className="block font-mono-custom text-[9px] tracking-[0.4em] opacity-25">
            {String(index + 1).padStart(2, "0")}
          </span>
          {/* textContent controlled by typewriter effect */}
          <h3
            ref={labelRef}
            aria-label={label}
            className="mt-2 min-h-[2.5rem] font-pixel text-[8px] leading-[2] tracking-wide md:min-h-[3rem] md:text-[9px]"
          />
        </div>

        {/* ── Mobile: 2-column grid ─────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-2 px-6 pb-6 md:hidden">
          {cards.map((project, i) => (
            <VideoCard
              key={project?.id ?? `ph-${i}`}
              project={project}
              mobile
            />
          ))}
        </div>

        {/* ── Desktop: horizontal scroll lane ───────────────────────── */}
        <div
          ref={scrollRef}
          className="portfolio-scroll hidden flex-1 snap-x snap-mandatory gap-3 overflow-x-auto pb-8 pt-6 md:flex"
        >
          <div className="w-1 flex-shrink-0" aria-hidden="true" />

          {cards.map((project, i) => (
            <VideoCard
              key={project?.id ?? `ph-${i}`}
              project={project}
            />
          ))}

          <div className="w-6 flex-shrink-0" aria-hidden="true" />
        </div>

      </div>
    </div>
  );
}
