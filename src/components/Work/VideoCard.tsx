"use client";

import { useRef } from "react";
import type { VideoItem } from "@/types";

interface Props {
  video?: VideoItem;
}

export function VideoCard({ video }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current && video?.src) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      className="video-card group flex-shrink-0"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
    >
      {/* Aspect ratio box */}
      <div className="relative aspect-video w-56 overflow-hidden bg-white/5 md:w-72 lg:w-80">
        {video ? (
          <>
            {/* Thumbnail */}
            {video.thumbnail && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={video.thumbnail}
                alt={video.title}
                className="video-card__thumb"
                loading="lazy"
              />
            )}

            {/* Video (lazy — only rendered when src present) */}
            {video.src && (
              <video
                ref={videoRef}
                className="video-card__video"
                src={video.src}
                muted
                loop
                playsInline
                preload="none"
              />
            )}
          </>
        ) : (
          /* Placeholder skeleton */
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-mono-custom text-[9px] tracking-widest opacity-20">
              [ COMING SOON ]
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/10" />
      </div>

      {/* Title */}
      <p className="mt-2 font-mono-custom text-[9px] tracking-widest opacity-60 transition-opacity group-hover:opacity-100">
        {video?.title ?? "—"}
      </p>
    </div>
  );
}
