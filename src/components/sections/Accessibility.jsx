import Button from "@/components/Button";
import Container from "@/components/Container";

const ITEMS = [
  { t: "ตรวจสอบตาม WCAG 2.2", d: "ด้วยเครื่องมือ ผู้เชี่ยวชาญ และผู้ใช้งานจริง รวมถึงผู้สูงอายุและคนพิการ" },
  { t: "ใบรับรองระดับ AA", d: "ออกใบรับรองการเข้าถึงระดับมาตรฐาน AA สำหรับเว็บไซต์องค์กร" },
  { t: "พัฒนาเว็บไซต์ให้ผ่านมาตรฐาน", d: "ปรับปรุงและพัฒนาเว็บไซต์ให้ผ่านเกณฑ์การเข้าถึง" },
  { t: "ฝึกอบรมทีมพัฒนาและผู้ดูแลเนื้อหา", d: "ถ่ายทอดความรู้ให้ทีมดูแลมาตรฐานได้อย่างยั่งยืน" },
];

export default function Accessibility() {
  return (
    <section id="accessibility" aria-labelledby="accessibility-heading" className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="max-w-[45rem]">
          <span className="inline-block rounded-full bg-signal-lime px-3 py-1.5 text-[0.8125rem] font-bold text-deep-navy">
            Thai Web Accessibility by 9Expert
          </span>
          <h2
            id="accessibility-heading"
            className="mt-4 text-[1.75rem] leading-tight font-bold text-nine-blue lg:text-[2.5rem]"
          >
            เว็บไซต์ที่ทุกคนเข้าถึงและใช้งานได้
          </h2>
          <p className="mt-3 text-lg font-semibold text-action-blue">Make IT Accessible for Everyone</p>
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2">
          {ITEMS.map((it) => (
            <li key={it.t} className="min-w-0 rounded-2xl border border-deep-navy/10 bg-cloud-base p-7 hc-border">
              <h3 className="text-[1.1875rem] font-bold text-deep-navy">{it.t}</h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-deep-navy/75">{it.d}</p>
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap gap-3">
          <Button variant="action" href="#contact">
            ปรึกษาเรื่อง Web Accessibility
          </Button>
          <Button variant="outlineDark" href="https://www.thaiwebaccessibility.com/">
            ไปที่ ThaiWebAccessibility.com
            <span className="sr-only"> (เปิดในเว็บไซต์ Thai Web Accessibility)</span>
          </Button>
        </div>

        <div className="mt-12">
          <h3 className="mb-4 text-[0.8125rem] font-medium tracking-wide text-deep-navy/60 uppercase">
            หน่วยงานภาครัฐที่ให้ความไว้วางใจ
          </h3>
          {/* Placeholder tiles until the real government logos arrive. */}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {Array.from({ length: 6 }, (_, i) => (
              <li
                key={i}
                className="flex min-h-14 items-center justify-center rounded-lg border border-deep-navy/10 bg-white px-4 py-2 text-center text-sm font-semibold text-deep-navy/60 hc-border"
              >
                [โลโก้หน่วยงานรัฐ]
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
