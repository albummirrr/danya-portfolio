import { EXPERIENCE } from "@/lib/data";
import { ExperienceItem } from "./ExperienceItem";

const ASCII_RULE = "─".repeat(80);

export function Experience() {
  return (
    <section className="px-6 py-24 md:px-12 lg:px-16">
      {/* Section label */}
      <p className="mb-16 font-mono-custom text-[10px] tracking-[0.4em] opacity-40">
        [ EXPERIENCE ]
      </p>

      <div className="flex flex-col">
        {EXPERIENCE.map((entry, i) => (
          <div key={i}>
            <ExperienceItem entry={entry} index={i} />
            {/* ASCII divider between items, not after last */}
            {i < EXPERIENCE.length - 1 && (
              <p
                className="overflow-hidden font-['Courier_New',monospace] text-[10px] tracking-normal text-white opacity-[0.12] select-none"
                aria-hidden="true"
              >
                {ASCII_RULE}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
