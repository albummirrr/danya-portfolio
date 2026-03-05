"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HeroAscii } from "./HeroAscii";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.3 }
      ).fromTo(
        subtitleRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.3"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-start justify-center overflow-hidden px-4 md:px-8"
    >
      {/* Background ASCII art */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden">
        <HeroAscii />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-6">
        <h1
          ref={titleRef}
          className="glitch font-pixel text-3xl leading-tight tracking-tight opacity-0 md:text-5xl lg:text-7xl"
          data-text="DANYA MIRZOEV"
        >
          DANYA
          <br />
          MIRZOEV
        </h1>

        <p
          ref={subtitleRef}
          className="font-mono-custom text-xs tracking-[0.3em] opacity-0 md:text-sm"
        >
          MULTIDISCIPLINARY DESIGNER & DIRECTOR
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
