import Button from "@/components/Button";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";

const CARDS = [
  { title: "In-House Training", line: "หลักสูตรที่ออกแบบให้ตรงกับงานจริงของทีมคุณ", target: "inhouse" },
  { title: "Data · AI · Automation", line: "เปลี่ยนข้อมูลและงานซ้ำๆ ให้เป็นระบบที่ทำงานแทนคุณ", target: "consulting" },
  { title: "Web Accessibility", line: "เว็บไซต์ที่ทุกคนเข้าถึงและใช้งานได้ตามมาตรฐาน", target: "accessibility" },
];

export default function ServicesOverview() {
  return (
    <section id="services" aria-labelledby="services-heading" className="bg-white">
      <Container className="py-16 lg:py-20">
        <div className="mx-auto max-w-[40rem] text-center">
          <Eyebrow>บริการสำหรับองค์กร</Eyebrow>
          <h2
            id="services-heading"
            className="mt-3 text-[1.75rem] leading-tight font-bold text-nine-blue lg:text-[2.375rem]"
          >
            สามบริการหลักที่ช่วยยกระดับทีมของคุณ
          </h2>
        </div>
        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {CARDS.map((c) => (
            <li
              key={c.target}
              className="flex min-w-0 flex-col items-center rounded-2xl border border-deep-navy/10 bg-cloud-base p-7 text-center transition-colors hc-border hover:border-action-blue/40"
            >
              <h3 className="text-[1.3125rem] font-bold text-deep-navy">{c.title}</h3>
              <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-deep-navy/75">{c.line}</p>
              <Button variant="action" href={`#${c.target}`} className="mt-6">
                ดูรายละเอียด<span className="sr-only"> {c.title}</span>
              </Button>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
