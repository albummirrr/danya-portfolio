import { Hero } from "@/components/Hero/Hero";
import { Experience } from "@/components/Experience/Experience";
import { Campaigns } from "@/components/Campaigns/Campaigns";
import { Work } from "@/components/Work/Work";
import { Contact } from "@/components/Contact/Contact";
import { SectionDivider } from "@/components/ui/SectionDivider";

export default function Home() {
  return (
    <main>
      <Hero />
      <SectionDivider />
      <Experience />
      <SectionDivider />
      <Campaigns />
      <SectionDivider />
      <Work />
      <SectionDivider />
      <Contact />
    </main>
  );
}
