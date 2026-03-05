"use client";

import { useEffect, useRef } from "react";
import { HeroAscii } from "./HeroAscii";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

/* ── Glitch scramble config ─────────────────────────────────────────────── */
const GLITCH_CHARS = "!<>-_\\/[]{}=+*^?#░▒▓█▄▌▐▀$@%&";
const LINE1 = "DANYA";
const LINE2 = "MIRZOEV";
const TOTAL_FRAMES = 75; // ~1.25s @ 60fps
const LINE2_DELAY = 12;  // frames before line 2 starts resolving

function scrambleLine(real: string, revealed: number): string {
  return real
    .split("")
    .map((char, i) =>
      i < revealed
        ? char
        : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
    )
    .join("");
}

export function Hero() {
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const l1 = line1Ref.current;
    const l2 = line2Ref.current;
    if (!l1 || !l2) return;

    let frame = 0;
    let rafId: number;

    const animate = () => {
      frame++;

      // Line 1: reveals over first ~80% of TOTAL_FRAMES
      const l1Revealed = Math.min(
        LINE1.length,
        Math.floor((frame / TOTAL_FRAMES) * LINE1.length * 1.4)
      );
      l1.textContent = scrambleLine(LINE1, l1Revealed);

      // Line 2: starts after LINE2_DELAY frames
      const l2Frame = Math.max(0, frame - LINE2_DELAY);
      const l2Revealed = Math.min(
        LINE2.length,
        Math.floor((l2Frame / TOTAL_FRAMES) * LINE2.length * 1.4)
      );
      l2.textContent = scrambleLine(LINE2, l2Revealed);

      if (frame < TOTAL_FRAMES + LINE2_DELAY) {
        rafId = requestAnimationFrame(animate);
      } else {
        // Lock to final text
        l1.textContent = LINE1;
        l2.textContent = LINE2;
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <section className="relative flex h-screen flex-col items-start justify-center overflow-hidden px-6 md:px-12 lg:px-16">
      {/* Background ASCII pattern */}
      <HeroAscii />

      {/* Main content */}
      <div className="relative z-10 flex flex-col gap-8">
        {/* Name — ~40px mobile, ~120px desktop */}
        <h1
          className="font-pixel leading-[1.15] tracking-tight"
          style={{ fontSize: "clamp(38px, 8.5vw, 120px)" }}
        >
          <span ref={line1Ref} className="block">
            {LINE1}
          </span>
          <span ref={line2Ref} className="block">
            {LINE2}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="font-mono-custom tracking-[0.25em] opacity-50"
          style={{ fontSize: "clamp(9px, 1.1vw, 13px)" }}
        >
          MULTIDISCIPLINARY DESIGNER &amp; DIRECTOR
        </p>
      </div>

      {/* Scroll indicator — pinned bottom centre */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
