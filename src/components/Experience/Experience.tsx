import { EXPERIENCE } from "@/lib/data";
import { ExperienceItem } from "./ExperienceItem";

export function Experience() {
  return (
    <section className="px-4 py-24 md:px-8">
      {/* Section label */}
      <p className="mb-16 font-mono-custom text-[10px] tracking-[0.4em] opacity-40">
        [ EXPERIENCE ]
      </p>

      <div className="flex flex-col divide-y divide-white/10">
        {EXPERIENCE.map((entry, i) => (
          <ExperienceItem key={i} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}
