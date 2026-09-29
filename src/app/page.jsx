import About from "@/components/sections/About";
import Accessibility from "@/components/sections/Accessibility";
import Consulting from "@/components/sections/Consulting";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import InHouse from "@/components/sections/InHouse";
import Platforms from "@/components/sections/Platforms";
import Portfolio from "@/components/sections/Portfolio";
import ServicesOverview from "@/components/sections/ServicesOverview";

export default function Home() {
  return (
    <>
      <Hero />
      <ServicesOverview />
      <InHouse />
      <Consulting />
      <Accessibility />
      <Portfolio />
      <Platforms />
      <About />
      <Contact />
    </>
  );
}
