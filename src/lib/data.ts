import type { ExperienceEntry, WorkCategory, Campaign } from "@/types";

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "GLEB KOSTIN SOLUTIONS",
    period: "2023 — 2025",
    role: "HEAD OF VIDEO PRODUCTION",
    description:
      "Full-cycle video production. Managed art direction, motion design, compositing, and 3D creation. Integrated Generative AI workflows for voiceovers and asset generation.",
    tools: ["After Effects", "DaVinci Resolve Studio", "Premiere Pro", "Photoshop", "Generative AI"],
  },
  {
    company: "MIRAGE CINEMA",
    period: "2024 — 2026",
    role: "DIGITAL EXPERIENCE DESIGNER",
    description:
      "Curated digital atmosphere for cinema spaces. Created immersive motion graphics for digital columns and large-scale screens. Developed visual identities for film festivals and thematic events.",
    tools: ["After Effects", "Generative AI", "Cinema 4D", "Blender"],
  },
];

export const WORK_CATEGORIES: WorkCategory[] = [
  {
    id: "motion-design",
    title: "MOTION DESIGN 2D/3D",
    videos: [],
  },
  {
    id: "video-editing",
    title: "VIDEO EDITING",
    videos: [],
  },
  {
    id: "art-direction",
    title: "ART DIRECTION",
    videos: [],
  },
  {
    id: "ai-generative",
    title: "AI & GENERATIVE ART",
    videos: [],
  },
  {
    id: "social-media",
    title: "SOCIAL MEDIA CONTENT",
    videos: [],
  },
  {
    id: "rnd",
    title: "R&D / EXPERIMENTS",
    videos: [],
  },
];

export const CAMPAIGNS: Campaign[] = [
  { title: "OMANKO x DYNAMO", subtitle: "Stadium Digital Art & 3D" },
  { title: "MY DEAR PETRA", subtitle: "Fashion Campaign" },
  { title: "OKKO", subtitle: "TVC Editing & AI Mascot Gen" },
  { title: "KEDR LIVANSKY", subtitle: "Live Set Visuals" },
];
