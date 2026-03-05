import { WORK_CATEGORIES } from "@/lib/data";
import { WorkCategory } from "./WorkCategory";

export function Work() {
  return (
    <section className="py-24">
      {/* Section label */}
      <p className="mb-16 px-4 font-mono-custom text-[10px] tracking-[0.4em] opacity-40 md:px-8">
        [ WORK ]
      </p>

      <div className="flex flex-col gap-0">
        {WORK_CATEGORIES.map((category, i) => (
          <WorkCategory key={category.id} category={category} index={i} />
        ))}
      </div>
    </section>
  );
}
