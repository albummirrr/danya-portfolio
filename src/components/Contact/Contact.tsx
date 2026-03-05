"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── ASCII art pieces ─────────────────────────────────────────────── */
const ASCII_TOP = [
  "╔═══════════════════════════════════════════════════════════╗",
  "║                                                           ║",
  "║   ██╗     ███████╗████████╗███████╗                      ║",
  "║   ██║     ██╔════╝╚══██╔══╝██╔════╝                      ║",
  "║   ██║     █████╗     ██║   ███████╗                      ║",
  "║   ██║     ██╔══╝     ██║   ╚════██║                      ║",
  "║   ███████╗███████╗   ██║   ███████║                      ║",
  "║   ╚══════╝╚══════╝   ╚═╝   ╚══════╝                      ║",
  "║                         WORK TOGETHER                    ║",
  "╚═══════════════════════════════════════════════════════════╝",
].join("\n");

const ASCII_BOTTOM = [
  "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
  "░  ╔╦╗╔═╗╔╗╔╦ ╦╔═╗  ╔╦╗╦╦═╗╔═╗╔═╗╔═╗╦  ╦              ░",
  "░   ║║╠═╣║║║╚╦╝╠═╣  ║║║║╠╦╝╔═╝║ ║║╣ ╚╗╔╝              ░",
  "░  ═╩╝╩ ╩╝╚╝ ╩ ╩ ╩  ╩ ╩╩╩╚═╚═╝╚═╝╚═╝ ╚╝               ░",
  "░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░",
].join("\n");

/* ── Links config ─────────────────────────────────────────────────── */
const LINKS = [
  {
    label: "EMAIL",
    value: "hello@danyamirzoev.com",
    href: "mailto:hello@danyamirzoev.com",
    icon: "✉",
    external: false,
  },
  {
    label: "TELEGRAM",
    value: "@danyamirzoev",
    href: "https://t.me/danyamirzoev",
    icon: "✈",
    external: true,
  },
  {
    label: "INSTAGRAM",
    value: "@danyamirzoev",
    href: "https://instagram.com/danyamirzoev",
    icon: "◈",
    external: true,
  },
  {
    label: "VIMEO",
    value: "danyamirzoev",
    href: "https://vimeo.com/danyamirzoev",
    icon: "▶",
    external: true,
  },
];

/* ── Component ───────────────────────────────────────────────────── */
export function Contact() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLHeadingElement>(null);
  const linksRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      tl.from(headingRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out",
      }).from(
        linksRef.current?.querySelectorAll("[data-link]") ?? [],
        {
          opacity: 0,
          y: 16,
          duration: 0.55,
          stagger: 0.08,
          ease: "power2.out",
        },
        "-=0.4"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="px-6 pb-16 pt-24 md:px-12 lg:px-16">

      {/* ── ASCII top art ──────────────────────────────────────────── */}
      <pre
        className="mb-16 overflow-hidden font-['Courier_New',monospace] text-[5.5px] leading-[1.3] text-white opacity-[0.12] select-none sm:text-[7px] md:text-[9px]"
        aria-hidden="true"
      >
        {ASCII_TOP}
      </pre>

      {/* ── Heading ────────────────────────────────────────────────── */}
      <h2
        ref={headingRef}
        className="mb-20 font-pixel leading-[1.4] tracking-tight"
        style={{ fontSize: "clamp(22px, 4.5vw, 72px)" }}
      >
        LET&apos;S WORK
        <br />
        TOGETHER
      </h2>

      {/* ── Links row ──────────────────────────────────────────────── */}
      <div
        ref={linksRef}
        className="grid grid-cols-1 gap-px border-t border-white/10 sm:grid-cols-2 md:grid-cols-4"
      >
        {LINKS.map(({ label, value, href, icon, external }) => (
          <a
            key={label}
            data-link=""
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noopener noreferrer" : undefined}
            className="group flex flex-col gap-3 border-b border-white/10 py-8 pr-6 transition-colors duration-200 md:border-b-0 md:border-r md:last:border-r-0"
          >
            {/* Icon + label */}
            <div className="flex items-center gap-3">
              <span className="font-mono-custom text-base text-white/20 transition-colors duration-200 group-hover:text-white">
                {icon}
              </span>
              <span className="font-mono-custom text-[9px] tracking-[0.4em] text-white/30 transition-colors duration-200 group-hover:text-white/60">
                {label}
              </span>
            </div>

            {/* Value with hover underline */}
            <span className="relative font-mono-custom text-[11px] tracking-[0.15em] text-white/70 transition-colors duration-200 group-hover:text-white">
              {value}
              {/* Underline slides in */}
              <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-white transition-all duration-400 ease-out group-hover:w-full" />
            </span>
          </a>
        ))}
      </div>

      {/* ── ASCII bottom art ───────────────────────────────────────── */}
      <pre
        className="mt-20 overflow-hidden font-['Courier_New',monospace] text-[5px] leading-[1.3] text-white opacity-[0.08] select-none sm:text-[6.5px] md:text-[8.5px]"
        aria-hidden="true"
      >
        {ASCII_BOTTOM}
      </pre>

      {/* ── Footer bar ─────────────────────────────────────────────── */}
      <div className="mt-8 flex flex-col gap-2 border-t border-white/[0.07] pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono-custom text-[9px] tracking-[0.25em] text-white/20">
          © 2026 DANYA MIRZOEV
        </p>
        <p className="font-mono-custom text-[9px] tracking-[0.25em] text-white/20">
          MULTIDISCIPLINARY DESIGNER & DIRECTOR
        </p>
      </div>

    </section>
  );
}
