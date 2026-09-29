import Image from "next/image";
import Container from "@/components/Container";

const POLICIES = ["นโยบายความเป็นส่วนตัว (PDPA)", "เงื่อนไขการใช้บริการ", "นโยบายคุกกี้"];
const SOCIALS = ["Facebook", "YouTube", "LINE"];

export default function Footer() {
  const thaiYear = new Date().getFullYear() + 543;

  return (
    <footer className="bg-deep-navy text-white">
      <Container className="grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/9expert-signature-logo.png"
              alt="9Expert"
              width={900}
              height={295}
              className="h-8 w-auto brightness-0 invert"
            />
            <span className="border-l border-white/20 pl-3 text-[11px] leading-tight text-white/55">
              Knowledge
              <br />
              Provider
            </span>
          </div>
          <address className="mt-4 text-[14px] leading-relaxed text-white/65 not-italic">
            บริษัท นายน์เอ็กซ์เพิร์ท จำกัด เลขที่ 318 อาคารเอเวอร์กรีน เพลส ชั้น 2 ห้อง 2B ซอยวรฤทธิ์
            ถนนพญาไท แขวงถนนเพชรบุรี เขตราชเทวี กรุงเทพฯ 10400 · โทร{" "}
            <a href="tel:022194304" className="text-white/85 underline-offset-2 hover:text-air-blue hover:underline">
              02-219-4304-5
            </a>
          </address>
        </div>
        <div>
          <h2 className="text-[14px] font-bold tracking-wide text-white/50 uppercase">นโยบาย</h2>
          <ul className="mt-3 space-y-2 text-[14px]">
            {POLICIES.map((l) => (
              <li key={l}>
                <a href="#" className="text-white/70 transition-colors hover:text-air-blue">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-[14px] font-bold tracking-wide text-white/50 uppercase">ติดตามเรา</h2>
          <div className="mt-3 flex gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s}
                href="#"
                aria-label={s}
                className="grid h-11 w-11 place-items-center rounded-lg border border-white/12 bg-white/[0.08] text-[12px] font-semibold text-white/75 transition-colors hc-border hover:border-action-blue hover:bg-action-blue"
              >
                {s.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-5 text-[13px] text-white/50">
          © {thaiYear} บริษัท นายน์เอ็กซ์เพิร์ท จำกัด สงวนลิขสิทธิ์
        </Container>
      </div>
    </footer>
  );
}
