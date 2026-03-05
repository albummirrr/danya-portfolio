import type { ExperienceEntry, WorkCategory, Campaign } from "@/types";

export const EXPERIENCE: ExperienceEntry[] = [
  {
    company: "GLEB KOSTIN SOLUTIONS",
    period: "2023 — 2025",
    role: "Head of Video Production",
    description:
      "Led end-to-end video production pipeline for a creative agency. Oversaw a team of editors and motion designers, established production standards, and delivered content across digital and broadcast channels.",
    tools: ["After Effects", "Premiere Pro", "Cinema 4D", "DaVinci Resolve"],
  },
  {
    company: "MIRAGE CINEMA",
    period: "2024 — 2026",
    role: "Digital Experience Designer",
    description:
      "Designed and directed digital experiences at the intersection of cinema and interactive media. Developed visual identities, motion systems, and generative installations for brand activations.",
    tools: ["TouchDesigner", "Stable Diffusion", "Blender", "GLSL", "Figma"],
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
