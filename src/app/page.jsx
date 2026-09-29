import Container from "@/components/Container";

/* Section shells in page order. Backgrounds follow the design export: navy for the two dark bands. */
const SECTIONS = [
  { id: "top", title: "พาองค์กรไทยใช้เทคโนโลยีได้จริง", bg: "bg-cloud-base", hero: true },
  { id: "services", title: "บริการสำหรับองค์กร", bg: "bg-white" },
  { id: "inhouse", title: "In-House Training", bg: "bg-deep-navy", dark: true },
  { id: "consulting", title: "Data · AI · Automation", bg: "bg-cloud-base" },
  { id: "accessibility", title: "Web Accessibility", bg: "bg-white" },
  { id: "portfolio", title: "ผลงาน", bg: "bg-cloud-base" },
  { id: "platforms", title: "แพลตฟอร์ม", bg: "bg-deep-navy", dark: true },
  { id: "about", title: "เกี่ยวกับเรา", bg: "bg-white" },
  { id: "contact", title: "ติดต่อเรา", bg: "bg-cloud-base" },
];

export default function Home() {
  return SECTIONS.map(({ id, title, bg, dark, hero }) => {
    const Heading = hero ? "h1" : "h2";
    return (
      <section key={id} id={id} aria-labelledby={`${id}-heading`} className={`${bg} ${dark ? "text-white" : ""}`}>
        <Container className="py-16 lg:py-24">
          <Heading
            id={`${id}-heading`}
            className={`text-[28px] leading-tight font-bold lg:text-[40px] ${dark ? "text-white" : "text-nine-blue"}`}
          >
            {title}
          </Heading>
        </Container>
      </section>
    );
  });
}
