export type CategoryId =
  | "motion-design"
  | "video-editing"
  | "art-direction"
  | "ai-generative"
  | "social-media"
  | "rnd";

export interface Project {
  id: string;
  title: string;
  category: CategoryId;
  videoUrl: string;
  posterUrl: string;
}

export interface Category {
  id: CategoryId;
  label: string;
}

export const CATEGORIES: Category[] = [
  { id: "motion-design",  label: "MOTION DESIGN 2D/3D" },
  { id: "video-editing",  label: "VIDEO EDITING" },
  { id: "art-direction",  label: "ART DIRECTION" },
  { id: "ai-generative",  label: "AI & GENERATIVE ART" },
  { id: "social-media",   label: "SOCIAL MEDIA CONTENT" },
  { id: "rnd",            label: "R&D / EXPERIMENTS" },
];

export const PROJECTS: Project[] = [
  // ── MOTION DESIGN 2D/3D ──────────────────────────────────────────────────
  { id: "md-01", title: "Brand Identity Reel",      category: "motion-design", videoUrl: "", posterUrl: "" },
  { id: "md-02", title: "Product Launch 3D",        category: "motion-design", videoUrl: "", posterUrl: "" },
  { id: "md-03", title: "Logo Animation Pack",      category: "motion-design", videoUrl: "", posterUrl: "" },
  { id: "md-04", title: "Title Sequence",           category: "motion-design", videoUrl: "", posterUrl: "" },

  // ── VIDEO EDITING ─────────────────────────────────────────────────────────
  { id: "ve-01", title: "Documentary Cut",          category: "video-editing", videoUrl: "", posterUrl: "" },
  { id: "ve-02", title: "Commercial 30s",           category: "video-editing", videoUrl: "", posterUrl: "" },
  { id: "ve-03", title: "Music Video Edit",         category: "video-editing", videoUrl: "", posterUrl: "" },
  { id: "ve-04", title: "Event Aftermovie",         category: "video-editing", videoUrl: "", posterUrl: "" },

  // ── ART DIRECTION ─────────────────────────────────────────────────────────
  { id: "ad-01", title: "Fashion Campaign",         category: "art-direction", videoUrl: "", posterUrl: "" },
  { id: "ad-02", title: "Stadium Visual",           category: "art-direction", videoUrl: "", posterUrl: "" },
  { id: "ad-03", title: "Festival Identity",        category: "art-direction", videoUrl: "", posterUrl: "" },
  { id: "ad-04", title: "Brand Manifesto",          category: "art-direction", videoUrl: "", posterUrl: "" },

  // ── AI & GENERATIVE ART ───────────────────────────────────────────────────
  { id: "ai-01", title: "AI Mascot Generation",     category: "ai-generative", videoUrl: "", posterUrl: "" },
  { id: "ai-02", title: "Generative Portraits",     category: "ai-generative", videoUrl: "", posterUrl: "" },
  { id: "ai-03", title: "Neural Textures Loop",     category: "ai-generative", videoUrl: "", posterUrl: "" },
  { id: "ai-04", title: "AI Voiceover Pipeline",    category: "ai-generative", videoUrl: "", posterUrl: "" },

  // ── SOCIAL MEDIA CONTENT ──────────────────────────────────────────────────
  { id: "sm-01", title: "Reels Series Vol.1",       category: "social-media",  videoUrl: "", posterUrl: "" },
  { id: "sm-02", title: "Story Templates",          category: "social-media",  videoUrl: "", posterUrl: "" },
  { id: "sm-03", title: "TikTok Campaign",          category: "social-media",  videoUrl: "", posterUrl: "" },
  { id: "sm-04", title: "Kinetic Typography Reel",  category: "social-media",  videoUrl: "", posterUrl: "" },

  // ── R&D / EXPERIMENTS ─────────────────────────────────────────────────────
  { id: "rd-01", title: "Shader Studies",           category: "rnd",           videoUrl: "", posterUrl: "" },
  { id: "rd-02", title: "Pixel Sorting Tests",      category: "rnd",           videoUrl: "", posterUrl: "" },
  { id: "rd-03", title: "Feedback Loop #3",         category: "rnd",           videoUrl: "", posterUrl: "" },
  { id: "rd-04", title: "Datamosh Archive",         category: "rnd",           videoUrl: "", posterUrl: "" },
];
