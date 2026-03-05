"use client";

import { useRef } from "react";
import type { Project } from "@/data/projects";

interface Props {
  project: Project | null;
  mobile?: boolean;
}

export function VideoCard({ project, mobile = false }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    const v = videoRef.current;
    if (!v || !project?.videoUrl) return;
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
      className={[
        "group flex-shrink-0 snap-start",
        mobile ? "w-full" : "w-[400px]",
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
          "relative overflow-hidden aspect-video",
          "border transition-colors duration-300",
          "border-[#333] group-hover:border-white",
          "bg-white/[0.03]",
        ].join(" ")}
      >
        {isEmpty ? (
          /* Placeholder */
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono-custom text-[8px] tracking-[0.3em] opacity-15">
              COMING SOON
            </span>
          </div>
        ) : (
          <>
            {/* Video (underneath) */}
            {project.videoUrl && (
              <video
                ref={videoRef}
                src={project.videoUrl}
                muted
                loop
                playsInline
                preload="none"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* Poster image (on top, fades out on hover) */}
            {project.posterUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.posterUrl}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
            )}
          </>
        )}

        {/* Subtle hover vignette */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
      </div>

      {/* ── Title ─────────────────────────────────────────────────── */}
      <p className="mt-2 font-mono-custom text-[9px] tracking-[0.25em] text-white/40 transition-colors duration-300 group-hover:text-white/80">
        {project?.title ?? "—"}
      </p>
    </div>
  );
}
