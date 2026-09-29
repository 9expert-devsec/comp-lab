import { Suspense } from "react";
import Button from "@/components/Button";
import { ContactForm, ContactFormFromUrl } from "@/components/ContactForm";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import {
  COMPANY_PROFILE_URL,
  GOOGLE_MAPS_EMBED_SRC,
  GOOGLE_MAPS_URL,
  INHOUSE_QUOTE_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "@/data/site";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="bg-cloud-base">
      <Container className="grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:py-24">
        <div className="min-w-0">
          <Eyebrow>ติดต่อเรา</Eyebrow>
          <h2
            id="contact-heading"
            className="mt-3 text-[1.75rem] leading-tight font-bold text-nine-blue lg:text-[2.375rem]"
          >
            พร้อมช่วยวางแผนให้ทีมของคุณ
          </h2>
          <p className="mt-3 text-[0.9375rem] text-navy-75">
            ต้องการอบรม In-House?{" "}
            <a
              href={INHOUSE_QUOTE_URL}
              className="font-semibold text-action-blue underline underline-offset-2 hover:text-[#0043c2]"
            >
              ขอใบเสนอราคาที่นี่
              <span className="sr-only"> (เปิดในเว็บไซต์ 9Expert Training)</span>
            </a>
          </p>

          {/* The URL's ?topic= is read on the client; the fallback is the same form without a preselection. */}
          <Suspense fallback={<ContactForm topic={null} />}>
            <ContactFormFromUrl />
          </Suspense>
        </div>

        <div className="min-w-0 space-y-4">
          <div className="rounded-2xl border border-deep-navy/10 bg-white p-7 hc-border">
            <h3 className="text-lg font-bold text-deep-navy">ที่อยู่ติดต่อ</h3>
            <address className="mt-3 text-[0.9375rem] leading-relaxed text-navy-80 not-italic">
              บริษัท นายน์เอ็กซ์เพิร์ท จำกัด
              <br />
              เลขที่ 318 อาคารเอเวอร์กรีน เพลส ชั้น 2 ห้อง 2B
              <br />
              ซอยวรฤทธิ์ ถนนพญาไท แขวงถนนเพชรบุรี
              <br />
              เขตราชเทวี กรุงเทพฯ 10400
              <br />
              โทร{" "}
              <a href={PHONE_TEL} className="font-semibold text-action-blue hover:underline">
                {PHONE_DISPLAY}
              </a>
            </address>
            {COMPANY_PROFILE_URL && (
              <Button variant="action" href={COMPANY_PROFILE_URL} className="mt-5 w-full">
                ดาวน์โหลด Company Profile
              </Button>
            )}
          </div>

          <div className="overflow-hidden rounded-2xl border border-deep-navy/10 bg-white hc-border">
            {/* The card's overflow-hidden + rounded-2xl gives the map its rounded top corners. */}
            <iframe
              src={GOOGLE_MAPS_EMBED_SRC}
              title="แผนที่ที่ตั้ง บริษัท นายน์เอ็กซ์เพิร์ท จำกัด"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="block h-[300px] w-full border-0 bg-deep-navy/5 md:h-[360px]"
            />
            <div className="p-4">
              <Button
                variant="outlineDark"
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener"
                className="w-full"
              >
                เปิดใน Google Maps
                <span className="sr-only"> (เปิดในแท็บใหม่)</span>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
