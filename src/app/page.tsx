import { Hero } from "@/components/Hero/Hero";
import { Experience } from "@/components/Experience/Experience";
import { Work } from "@/components/Work/Work";
import { Campaigns } from "@/components/Campaigns/Campaigns";
import { Contact } from "@/components/Contact/Contact";
import { AsciiDivider } from "@/components/ui/AsciiDivider";

export default function Home() {
  return (
    <main>
      <Hero />
      <AsciiDivider />
      <Experience />
      <AsciiDivider />
      <Work />
      <AsciiDivider />
      <Campaigns />
      <AsciiDivider />
      <Contact />
    </main>
  );
}
