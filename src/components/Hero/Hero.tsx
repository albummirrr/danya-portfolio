"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";

export function Hero() {
  const line1Ref    = useRef<HTMLSpanElement>(null);
  const line2Ref    = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([line1Ref.current, line2Ref.current, subtitleRef.current], {
        opacity: 0,
        y: 40,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative flex h-screen flex-col items-start justify-center overflow-hidden px-6 md:px-12 lg:px-16">

      {/* Name */}
      <h1
        className="font-heading leading-[0.92] tracking-tight"
        style={{ fontSize: "clamp(72px, 13vw, 200px)" }}
      >
        <span ref={line1Ref} className="block">DANYA</span>
        <span ref={line2Ref} className="block">MIRZOEV</span>
      </h1>

      {/* Subtitle */}
      <p
        ref={subtitleRef}
        className="font-body mt-8 tracking-[0.2em] text-white/50"
        style={{ fontSize: "clamp(11px, 1.1vw, 14px)" }}
      >
        MULTIDISCIPLINARY DESIGNER &amp; DIRECTOR
      </p>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ScrollIndicator />
      </div>
    </section>
  );
}
