import Container from "@/components/Container";
import Hero from "@/components/sections/Hero";

/* Section shells still to be ported. Backgrounds follow the design export: navy for the two dark bands. */
const SHELLS = [
  { id: "services", title: "บริการสำหรับองค์กร", bg: "bg-white" },
  { id: "inhouse", title: "In-House Training", bg: "bg-deep-navy", dark: true },
  { id: "consulting", title: "Data · AI · Automation", bg: "bg-cloud-base" },
  { id: "accessibility", title: "Web Accessibility", bg: "bg-white" },
  { id: "portfolio", title: "ผลงาน", bg: "bg-cloud-base" },
  { id: "platforms", title: "แพลตฟอร์ม", bg: "bg-deep-navy", dark: true },
  { id: "about", title: "เกี่ยวกับเรา", bg: "bg-white" },
  { id: "contact", title: "ติดต่อเรา", bg: "bg-cloud-base" },
];

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
      {SHELLS.map((s) => (
        <SectionShell key={s.id} {...s} />
      ))}
    </>
  );
}
