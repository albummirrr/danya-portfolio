export interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  src?: string;
}

export interface WorkCategory {
  id: string;
  title: string;
  videos: VideoItem[];
}

export interface ExperienceEntry {
  company: string;
  period: string;
  role: string;
  description: string;
  tools: string[];
}

export interface Campaign {
  title: string;
  subtitle: string;
}
