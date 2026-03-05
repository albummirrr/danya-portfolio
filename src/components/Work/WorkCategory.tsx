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
      gsap.set(labelCol, { x: scrollEl.scrollLeft * 0.06 });
    };

    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Section fade-in (ScrollTrigger) ────────────────────────────── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      tl.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
      });

      const cards = scrollRef.current?.querySelectorAll("[data-card]");
      if (cards && cards.length > 0) {
        tl.from(
          cards,
          {
            opacity: 0,
            y: 20,
            duration: 0.55,
            stagger: 0.07,
            ease: "power2.out",
          },
          "-=0.4"
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const cards = projects.length > 0
    ? projects
    : Array.from({ length: PLACEHOLDER_COUNT }, () => null as Project | null);

  return (
    <div ref={containerRef} className="border-t border-[#1a1a1a]">
      <div className="flex flex-col md:flex-row md:items-start">

        {/* ── Label column ──────────────────────────────────────────── */}
        <div
          ref={labelColRef}
          className="flex-shrink-0 px-6 pb-2 pt-6 md:w-52 md:py-8 md:px-12 lg:w-60 lg:px-16"
        >
          <span className="font-body block text-[10px] tracking-[0.4em] text-white/25">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3
            className="font-heading mt-2 leading-tight"
            style={{ fontSize: "28px" }}
          >
            {label}
          </h3>
        </div>

        {/* ── Mobile: 2-col grid ────────────────────────────────────── */}
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
          className="portfolio-scroll hidden flex-1 snap-x snap-mandatory gap-4 overflow-x-auto pb-8 pt-6 md:flex"
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
