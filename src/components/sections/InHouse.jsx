import Button from "@/components/Button";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { INHOUSE_QUOTE_URL } from "@/data/site";

const POINTS = [
  "หลักสูตรมาตรฐานหรือ Customize ให้ตรงกับงานของทีม (มีค่าบริการเพิ่มเติม)",
  "จัดอบรม Onsite ที่องค์กร หรือ Online ผ่าน Microsoft Teams",
  "เลือกเดือนและวันอบรมได้ตามความสะดวกของทีม",
  "ลดหย่อนภาษีได้สูงสุด 200% ตามเงื่อนไขที่กำหนด",
];

export default function InHouse() {
  return (
    <section id="inhouse" aria-labelledby="inhouse-heading" className="bg-deep-navy text-white">
      <Container className="grid items-start gap-10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div className="min-w-0">
          <Eyebrow tone="dark">In-House Training</Eyebrow>
          <h2 id="inhouse-heading" className="mt-3 text-[1.75rem] leading-tight font-bold lg:text-[2.5rem]">
            หลักสูตรที่ออกแบบให้ตรงกับงานของทีมคุณ
          </h2>
          <Button
            variant="lime"
            href={INHOUSE_QUOTE_URL}
            className="mt-8"
          >
            ขอใบเสนอราคา In-House
            <span className="sr-only"> (เปิดในเว็บไซต์ 9Expert Training)</span>
          </Button>
        </div>
        <ul className="min-w-0 space-y-4">
          {POINTS.map((p) => (
            <li key={p} className="flex gap-4 rounded-xl border border-white/10 bg-navy-raised p-5 hc-border">
              <svg width="24" height="24" viewBox="0 0 24 24" className="mt-0.5 shrink-0" aria-hidden="true">
                <circle cx="12" cy="12" r="11" className="fill-air-blue" />
                <path
                  d="M7 12.5l3.2 3.2L17 9"
                  fill="none"
                  className="stroke-deep-navy"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="min-w-0 text-base leading-relaxed text-on-navy-90">{p}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
