"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ASCII_BOTTOM = [
  "  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
  "  ░  D A N Y A   M I R Z O E V  ·  2026  ░",
  "  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
].join("\n");

const LINKS = [
  { label: "EMAIL",     value: "hello@danyamirzoev.com", href: "mailto:hello@danyamirzoev.com", external: false },
  { label: "TELEGRAM",  value: "@danyamirzoev",          href: "https://t.me/danyamirzoev",           external: true },
  { label: "INSTAGRAM", value: "@danyamirzoev",          href: "https://instagram.com/danyamirzoev",  external: true },
  { label: "VIMEO",     value: "danyamirzoev",           href: "https://vimeo.com/danyamirzoev",      external: true },
];

export function Contact() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const linksRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([headingRef.current, linksRef.current], {
        opacity: 0,
        y: 30,
        duration: 0.9,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 pb-20 pt-16 md:px-12 lg:px-16">
      <p className="mb-16 font-body text-[11px] tracking-[0.4em] text-white/30">
        CONTACT
      </p>

      {/* Heading */}
      <h2
        ref={headingRef}
        className="font-heading mb-20 leading-[0.92]"
        style={{ fontSize: "clamp(48px, 8vw, 120px)" }}
      >
        LET&apos;S WORK
        <br />
        TOGETHER
      </h2>

      {/* Links */}
      <div
        ref={linksRef}
        className="grid grid-cols-1 border-t border-[#222] sm:grid-cols-2 md:grid-cols-4"
      >
        {LINKS.map(({ label, value, href, external }) => (
          <a
            key={label}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group flex flex-col gap-3 border-b border-[#222] py-8 pr-6 transition-colors md:border-b-0 md:border-r md:last:border-r-0"
            data-cursor-hover
          >
            <span className="font-body text-[10px] tracking-[0.4em] text-white/30 transition-colors duration-200 group-hover:text-white/55">
              {label}
            </span>
            <span className="relative font-body text-[13px] tracking-[0.1em] text-white/65 transition-colors duration-200 group-hover:text-white">
              {value}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-all duration-500 ease-out group-hover:w-full" />
            </span>
          </a>
        ))}
      </div>

      {/* ASCII bottom (optional decoration) */}
      <pre
        className="mt-20 overflow-hidden font-['Courier_New',monospace] text-[8px] leading-[1.5] text-white/[0.07] select-none md:text-[10px]"
        aria-hidden="true"
      >
        {ASCII_BOTTOM}
      </pre>

      {/* Footer */}
      <div className="mt-8 flex flex-col gap-1 border-t border-[#111] pt-6 sm:flex-row sm:justify-between">
        <p className="font-body text-[11px] tracking-[0.2em] text-white/20">
          © 2026 DANYA MIRZOEV
        </p>
        <p className="font-body text-[11px] tracking-[0.2em] text-white/20">
          MULTIDISCIPLINARY DESIGNER &amp; DIRECTOR
        </p>
      </div>
    </section>
  );
}
