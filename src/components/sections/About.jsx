import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { METRICS, METRICS_AS_OF, PRIMARY_METRIC } from "@/data/metrics";

/* Label first in the DOM so screen readers hear "ผู้เรียน 90,000+"; `order` puts the figure on top visually. */
export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="bg-white">
      <Container className="py-16 lg:py-24">
        <div className="max-w-[47.5rem]">
          <Eyebrow>เกี่ยวกับเรา</Eyebrow>
          <h2 id="about-heading" className="mt-3 text-[1.75rem] leading-tight font-bold text-nine-blue lg:text-[2.375rem]">
            พันธมิตรด้านเทคโนโลยีขององค์กรไทยตั้งแต่ปี 2548
          </h2>
          <p className="mt-5 text-[1.0625rem] leading-relaxed text-deep-navy/80">
            9Expert (บริษัท นายน์เอ็กซ์เพิร์ท จำกัด) เป็นผู้ให้บริการฝึกอบรมและที่ปรึกษาด้านเทคโนโลยีสารสนเทศ
            มุ่งเน้นการสอนแบบใช้งานได้จริง เพื่อให้องค์กรและหน่วยงานภาครัฐนำความรู้ไปปรับใช้กับงานได้ทันที
          </p>
        </div>

        <dl className="mt-10 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col justify-center hc-border rounded-2xl bg-deep-navy p-6 text-white sm:p-8 lg:p-10">
            <dt className="order-2 mt-2 text-lg text-white/85">{PRIMARY_METRIC.label}</dt>
            <dd className="order-1 text-[3.25rem] leading-none font-bold text-air-blue lg:text-[4.25rem]">
              {PRIMARY_METRIC.value}
            </dd>
          </div>
          {/* rem minimum: drops to one column when the text-size toggle makes the figures wider. */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,10rem),1fr))] gap-4">
            {METRICS.map((m) => (
              <div
                key={m.label}
                className="flex min-w-0 flex-col justify-center rounded-2xl border border-deep-navy/10 bg-cloud-base p-5 hc-border"
              >
                <dt className="order-2 mt-1 text-sm text-deep-navy/70">{m.label}</dt>
                <dd className="order-1 text-2xl leading-tight font-bold text-action-blue lg:text-[1.75rem]">
                  {m.value}
                </dd>
              </div>
            ))}
          </div>
        </dl>
        <p className="mt-4 text-[0.8125rem] text-deep-navy/60">{METRICS_AS_OF}</p>
      </Container>
    </section>
  );
}
