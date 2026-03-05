"use client";

import { useRef, useEffect, useState } from "react";
import type { Project } from "@/data/projects";

interface Props {
  project: Project | null;
  mobile?: boolean;
}

export function VideoCard({ project, mobile = false }: Props) {
  const cardRef  = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Only mount <video> when card is within 300px of viewport (saves bandwidth)
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    // No video URL → no need to observe
    if (!el || !project?.videoUrl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      {
        // Start loading 300px before the card enters the visible area
        rootMargin: "300px 300px 300px 300px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [project?.videoUrl]);

  const handleMouseEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
  };

  const handleMouseLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  };

  const isEmpty = !project || (!project.videoUrl && !project.posterUrl);

  return (
    <div
      ref={cardRef}
      data-card=""
      className={[
        "group flex-shrink-0 snap-start",
        mobile ? "w-full" : "w-[400px]",
        // Scale on hover — ease-out 300ms on transform only
        "transition-transform duration-300 ease-out",
        "hover:scale-[1.02]",
      ].join(" ")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
    >
      {/* ── Media box ─────────────────────────────────────────────── */}
      <div
        className={[
          "relative aspect-video overflow-hidden",
          // Border: instant color change (no transition on border)
          "border border-[#333] group-hover:border-white",
          "bg-white/[0.03]",
        ].join(" ")}
      >
        {isEmpty ? (
          /* Placeholder skeleton */
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono-custom text-[8px] tracking-[0.3em] opacity-[0.15]">
              COMING SOON
            </span>
          </div>
        ) : (
          <>
            {/*
              Video element — rendered only after IntersectionObserver fires.
              poster opacity transition is handled by the img layer above.
            */}
            {shouldLoadVideo && project!.videoUrl && (
              <video
                ref={videoRef}
                src={project!.videoUrl}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/*
              Poster image sits on top of the video.
              On hover it fades to 0, revealing the playing video beneath.
            */}
            {project!.posterUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project!.posterUrl}
                alt={project!.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
            )}
          </>
        )}

        {/* Gradient vignette on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* ── Project title ──────────────────────────────────────────── */}
      <p className="mt-2 font-mono-custom text-[9px] tracking-[0.25em] text-white/40 transition-colors duration-300 group-hover:text-white/80">
        {project?.title ?? "—"}
      </p>
    </div>
  );
}
