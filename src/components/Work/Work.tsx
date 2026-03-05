import { CATEGORIES, PROJECTS } from "@/data/projects";
import { WorkCategory } from "./WorkCategory";

export function Work() {
  // Group projects by category
  const lanes = CATEGORIES.map((cat) => ({
    ...cat,
    projects: PROJECTS.filter((p) => p.category === cat.id),
  }));

  return (
    <section className="py-24">
      {/* Section label */}
      <p className="mb-12 px-6 font-mono-custom text-[10px] tracking-[0.4em] opacity-40 md:px-12 lg:px-16">
        [ WORK ]
      </p>

      <div className="flex flex-col">
        {lanes.map((lane, i) => (
          <WorkCategory
            key={lane.id}
            id={lane.id}
            label={lane.label}
            index={i}
            projects={lane.projects}
          />
        ))}
      </div>
    </section>
  );
}
