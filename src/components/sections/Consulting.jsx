import Button from "@/components/Button";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";

const ROWS = [
  { title: "Data", items: ["Data Analytics", "Power BI Dashboard", "Report และ Visualization"] },
  { title: "AI", items: ["วิเคราะห์ข้อมูลด้วย AI", "ที่ปรึกษาการนำ AI มาใช้ในองค์กร"] },
  { title: "Automation", items: ["RPA (Robotic Process Automation)", "VBA / Excel Macro"] },
];

export default function Consulting() {
  return (
    <section id="consulting" aria-labelledby="consulting-heading" className="bg-cloud-base">
      <Container className="py-16 lg:py-24">
        <div className="max-w-[45rem]">
          <Eyebrow>Data · AI · Automation</Eyebrow>
          <h2
            id="consulting-heading"
            className="mt-3 text-[1.75rem] leading-tight font-bold text-nine-blue lg:text-[2.5rem]"
          >
            เปลี่ยนข้อมูลและงานซ้ำๆ ในองค์กร ให้เป็นระบบที่ช่วยตัดสินใจและทำงานแทนคุณ
          </h2>
        </div>
        <dl className="mt-10 border-t border-deep-navy/15 hc-border">
          {ROWS.map((r) => (
            <div
              key={r.title}
              className="grid gap-4 border-b border-deep-navy/15 py-7 hc-border md:grid-cols-[15rem_1fr] md:gap-8"
            >
              <dt className="text-2xl font-bold text-action-blue">{r.title}</dt>
              <dd className="min-w-0">
                <ul className="flex flex-wrap gap-2.5">
                  {r.items.map((it) => (
                    <li
                      key={it}
                      className="inline-flex max-w-full items-center rounded-full border border-deep-navy/15 bg-white px-4 py-2 text-[0.9375rem] font-medium text-deep-navy/85 hc-border"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          ))}
        </dl>
        <Button variant="action" href="/?topic=consulting#contact" className="mt-9">
          ปรึกษาเรื่อง Data · AI · Automation
        </Button>
      </Container>
    </section>
  );
}
