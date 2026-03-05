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
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  /* Lazy load video when card is near viewport */
  useEffect(() => {
    const el = cardRef.current;
    if (!el || !project?.videoUrl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px 300px 300px 300px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [project?.videoUrl]);

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => {});
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
        mobile ? "w-full" : "w-[380px]",
        "transition-transform duration-300 ease-out hover:scale-[1.02]",
      ].join(" ")}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
    >
      {/* ── Media box: 4:3 aspect ratio ───────────────────────────── */}
      <div
        className="relative overflow-hidden bg-white/[0.03]"
        style={{ aspectRatio: "4/3" }}
      >
        {/* Border as pseudo-element via box-shadow for instant/transition control */}
        <div className="pointer-events-none absolute inset-0 z-10 border border-[#222] transition-colors duration-300 group-hover:border-white" />

        {isEmpty ? (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-body text-[11px] tracking-[0.3em] text-white/20">
              COMING SOON
            </span>
          </div>
        ) : (
          <>
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

        {/* Vignette on hover */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Title */}
      <p className="font-body mt-2.5 text-[11px] tracking-[0.2em] text-white/40 transition-colors duration-300 group-hover:text-white/80">
        {project?.title ?? "—"}
      </p>
    </div>
  );
}
