"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SELECTED = [
  { title: "OMANKO x DYNAMO",  type: "Stadium Digital Art & 3D" },
  { title: "MY DEAR PETRA",    type: "Fashion Campaign" },
  { title: "OKKO",             type: "TVC Editing & AI Mascot Gen" },
  { title: "KEDR LIVANSKY",    type: "Live Set Visuals" },
];

const EXPERIMENTS = [
  { name: "YANDEX MARKET",      desc: "Promo" },
  { name: "ILYA KURUCH",        desc: "AI Deepfake & Humor" },
  { name: "BUTERBRODNAYA / IF", desc: "Social Media Motion System" },
  { name: "AI R&D",             desc: "Generative Assets" },
];

export function Campaigns() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef    = useRef<HTMLUListElement>(null);
  const rightRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = leftRef.current?.querySelectorAll("li");
      if (items && items.length > 0) {
        gsap.from(items, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 82%",
            once: true,
          },
        });
      }

      gsap.from(rightRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rightRef.current,
          start: "top 85%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 py-16 md:px-12 lg:px-16">
      <p className="mb-16 font-body text-[11px] tracking-[0.4em] text-white/30">
        SELECTED CAMPAIGNS
      </p>

      <div className="flex flex-col gap-16 md:flex-row md:gap-0">

        {/* ── Left 60%: campaigns ─────────────────────────────────── */}
        <ul ref={leftRef} className="flex flex-col md:w-[60%] md:pr-16">
          {SELECTED.map((item) => (
            <li
              key={item.title}
              className="group relative border-b border-[#1a1a1a] py-8"
              data-cursor-hover
            >
              {/* Hover underline */}
              <div className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-500 ease-out group-hover:w-full" />

              <h3
                className="font-heading leading-tight transition-opacity duration-200 group-hover:opacity-75"
                style={{ fontSize: "clamp(28px, 4vw, 60px)" }}
              >
                {item.title}
              </h3>
              <p className="font-body mt-2 text-[13px] tracking-[0.2em] text-white/35">
                {item.type}
              </p>
            </li>
          ))}
        </ul>

        {/* ── Right 40%: content & experiments ────────────────────── */}
        <div
          ref={rightRef}
          className="flex flex-col gap-6 md:w-[40%] md:border-l md:border-[#1a1a1a] md:pl-16"
        >
          <p className="font-body text-[10px] tracking-[0.4em] text-white/25">
            CONTENT &amp; EXPERIMENTS
          </p>

          <ul className="flex flex-col gap-5">
            {EXPERIMENTS.map((item) => (
              <li
                key={item.name}
                className="group border-b border-[#1a1a1a] pb-5 transition-colors"
              >
                <span className="font-body block text-[13px] font-[500] tracking-[0.15em] text-white/60 transition-colors duration-200 group-hover:text-white">
                  {item.name}
                </span>
                <span className="font-body block text-[11px] tracking-[0.2em] text-white/25 transition-colors duration-200 group-hover:text-white/45">
                  {item.desc}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
