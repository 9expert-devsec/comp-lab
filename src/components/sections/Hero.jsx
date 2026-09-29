import Image from "next/image";
import Button from "@/components/Button";
import ClientSlider from "@/components/ClientSlider";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { getLogos } from "@/lib/logos";

export default function Hero() {
  return (
    <section id="top" aria-labelledby="top-heading" className="bg-cloud-base">
      <Container className="grid items-center gap-10 pt-14 pb-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pt-20 lg:pb-16">
        <div className="min-w-0">
          <Eyebrow>สอนสไตล์ใช้งานจริง</Eyebrow>
          <h1
            id="top-heading"
            className="mt-4 text-[2.125rem] leading-[1.15] font-bold text-nine-blue lg:text-[3.25rem] lg:leading-[1.1]"
          >
            พาองค์กรไทยใช้เทคโนโลยีได้จริง
          </h1>
          <p className="mt-5 max-w-[35rem] text-[1.0625rem] leading-relaxed text-deep-navy/80 lg:text-[1.1875rem]">
            ฝึกอบรม ที่ปรึกษาด้านข้อมูล และบริการ Web Accessibility สำหรับองค์กรและหน่วยงานภาครัฐ ตั้งแต่ปี 2548
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="lime" href="#contact">
              ปรึกษาทีมงาน
            </Button>
            <Button variant="outlineDark" href="#services">
              บริการสำหรับองค์กร
            </Button>
          </div>
          <p className="mt-5 text-sm text-deep-navy/70">
            มองหาหลักสูตร?{" "}
            <a
              href="https://www.9experttraining.com"
              className="font-semibold text-action-blue underline underline-offset-2 hover:text-[#0043c2]"
            >
              ไปที่ 9ExpertTraining.com
            </a>
          </p>
        </div>

        <div className="relative min-w-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-deep-navy/10 bg-deep-navy/5 hc-border">
            <Image
              src="/images/classroom.jpg"
              alt="ห้องเรียนอบรมองค์กรของ 9Expert ผู้เข้าอบรมกำลังเรียนรู้กับผู้สอน"
              fill
              sizes="(min-width: 1248px) 560px, (min-width: 1024px) 46vw, 100vw"
              loading="eager"
              fetchPriority="high"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-4 -left-3 rounded-xl bg-deep-navy px-5 py-4 text-white shadow-lg lg:-left-5">
            <div className="text-[1.625rem] font-bold text-air-blue">5,000+</div>
            <div className="text-xs text-white/75">องค์กรที่ไว้วางใจ</div>
          </div>
        </div>
      </Container>

      <Container className="pb-14">
        <ClientSlider logos={getLogos("clients")} />
      </Container>
    </section>
  );
}
