"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ────────────────────────────────────────────────────────── */
const SELECTED = [
  { title: "OMANKO x DYNAMO",  type: "Stadium Digital Art & 3D" },
  { title: "MY DEAR PETRA",    type: "Fashion Campaign" },
  { title: "OKKO",             type: "TVC Editing & AI Mascot Gen" },
  { title: "KEDR LIVANSKY",    type: "Live Set Visuals" },
];

const EXPERIMENTS = [
  { name: "YANDEX MARKET",          desc: "Promo" },
  { name: "ILYA KURUCH",            desc: "AI Deepfake & Humor" },
  { name: "BUTERBRODNAYA / IF",     desc: "Social Media Motion System" },
  { name: "AI R&D",                 desc: "Generative Assets" },
];

/* ── Glitch hook — scrambles text on hover ───────────────────────── */
const GLITCH_CHARS = "!<>-_\\/[]{}=+*^?#░▒▓█";

function useGlitchHover(text: string) {
  const [display, setDisplay] = useState(text);
  const rafRef = useRef<number | null>(null);

  const start = () => {
    let frame = 0;
    const totalFrames = 18;

    const animate = () => {
      frame++;
      const progress = frame / totalFrames;
      const revealed = Math.min(text.length, Math.floor(progress * text.length * 1.6));
      const scrambled = text
        .split("")
        .map((char, i) =>
          char === " "
            ? " "
            : i < revealed
            ? char
            : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        )
        .join("");
      setDisplay(scrambled);

      if (frame < totalFrames) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplay(text);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
  };

  const stop = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setDisplay(text);
  };

  return { display, start, stop };
}

/* ── Campaign row ────────────────────────────────────────────────── */
function CampaignRow({ title, type }: { title: string; type: string }) {
  const { display, start, stop } = useGlitchHover(title);
  const lineRef = useRef<HTMLDivElement>(null);

  return (
    <li
      className="group relative flex flex-col gap-1.5 border-b border-white/[0.08] pb-8"
      onMouseEnter={start}
      onMouseLeave={stop}
      data-cursor-hover
    >
      {/* Underline grows on hover */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-500 ease-out group-hover:w-full" />

      <div ref={lineRef}>
        {/* Title — condensed, large */}
        <h3
          className="font-pixel leading-tight tracking-tight text-white transition-opacity duration-150 group-hover:opacity-90"
          style={{ fontSize: "clamp(18px, 3.2vw, 48px)" }}
        >
          {display}
        </h3>
      </div>

      {/* Work type */}
      <p className="font-mono-custom text-[10px] tracking-[0.3em] text-white/35 transition-colors duration-300 group-hover:text-white/60">
        {type}
      </p>
    </li>
  );
}

/* ── Main section ────────────────────────────────────────────────── */
export function Campaigns() {
  const sectionRef  = useRef<HTMLElement>(null);
  const leftRef     = useRef<HTMLUListElement>(null);
  const rightRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left: campaign items slide up with stagger
      const items = leftRef.current?.querySelectorAll("li");
      if (items && items.length > 0) {
        gsap.from(items, {
          opacity: 0,
          y: 40,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftRef.current,
            start: "top 82%",
            once: true,
          },
        });
      }

      // Right: experiments fade in together slightly later
      gsap.from(rightRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        ease: "power2.out",
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
    <section ref={sectionRef} className="px-6 py-24 md:px-12 lg:px-16">
      {/* Section label */}
      <p className="mb-16 font-mono-custom text-[10px] tracking-[0.4em] opacity-40">
        [ SELECTED CAMPAIGNS ]
      </p>

      <div className="flex flex-col gap-16 md:flex-row md:gap-0">

        {/* ── Left 60%: campaigns ─────────────────────────────────── */}
        <ul
          ref={leftRef}
          className="flex flex-col gap-0 md:w-[60%] md:pr-16"
        >
          {SELECTED.map((item) => (
            <CampaignRow key={item.title} title={item.title} type={item.type} />
          ))}
        </ul>

        {/* ── Right 40%: content & experiments ────────────────────── */}
        <div
          ref={rightRef}
          className="flex flex-col gap-6 md:w-[40%] md:border-l md:border-white/10 md:pl-16"
        >
          <p className="font-mono-custom text-[9px] tracking-[0.4em] text-white/30">
            CONTENT &amp; EXPERIMENTS
          </p>

          <ul className="flex flex-col gap-5">
            {EXPERIMENTS.map((item) => (
              <li
                key={item.name}
                className="group flex flex-col gap-0.5 border-b border-white/[0.06] pb-5 transition-colors"
              >
                <span className="font-mono-custom text-[11px] font-bold tracking-[0.2em] text-white/70 transition-colors duration-200 group-hover:text-white">
                  {item.name}
                </span>
                <span className="font-mono-custom text-[9px] tracking-[0.25em] text-white/25 transition-colors duration-200 group-hover:text-white/50">
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
