import Container from "@/components/Container";
import About from "@/components/sections/About";
import Accessibility from "@/components/sections/Accessibility";
import Consulting from "@/components/sections/Consulting";
import Hero from "@/components/sections/Hero";
import InHouse from "@/components/sections/InHouse";
import Portfolio from "@/components/sections/Portfolio";
import ServicesOverview from "@/components/sections/ServicesOverview";

/* Placeholder for a section still to be ported. */
function SectionShell({ id, title, bg, dark }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={`${bg} ${dark ? "text-white" : ""}`}>
      <Container className="py-16 lg:py-24">
        <h2
          id={`${id}-heading`}
          className={`text-[1.75rem] leading-tight font-bold lg:text-[2.5rem] ${dark ? "text-white" : "text-nine-blue"}`}
        >
          {title}
        </h2>
      </Container>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <InHouse />
      <Consulting />
      <Accessibility />
      <Portfolio />
      <SectionShell id="platforms" title="แพลตฟอร์ม" bg="bg-deep-navy" dark />
      <About />
      <SectionShell id="contact" title="ติดต่อเรา" bg="bg-cloud-base" />
    </>
  );
}
