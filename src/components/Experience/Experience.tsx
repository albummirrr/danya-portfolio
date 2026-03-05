import { EXPERIENCE } from "@/lib/data";
import { ExperienceItem } from "./ExperienceItem";

export function Experience() {
  return (
    <section className="px-6 py-16 md:px-12 lg:px-16">
      <p className="mb-16 font-body text-[11px] tracking-[0.4em] text-white/30">
        EXPERIENCE
      </p>

      <div className="flex flex-col gap-16 md:gap-24">
        {EXPERIENCE.map((entry, i) => (
          <ExperienceItem key={i} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}
