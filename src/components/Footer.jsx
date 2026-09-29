import Image from "next/image";
import Container from "@/components/Container";
import { PHONE_DISPLAY, PHONE_TEL, POLICY_LINKS, social } from "@/data/site";

/* Simple single-path brand marks (24×24), drawn in currentColor. */
const SOCIAL_ICONS = {
  facebook: {
    name: "Facebook",
    d: "M14 8.5V7c0-.7.2-1 1-1h2V2.5h-3C10.9 2.5 10 4.3 10 6.8v1.7H7.5V12H10v9.5h4V12h2.8l.5-3.5H14z",
  },
  youtube: {
    name: "YouTube",
    d: "M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4a2.5 2.5 0 0 0-1.8 1.8C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8c1.6.4 7.8.4 7.8.4s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.6.4-4.8.4-4.8s0-3.2-.4-4.8zM10 15V9l5.2 3L10 15z",
  },
  linkedin: {
    name: "LinkedIn",
    d: "M5 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 10h4v11H3V10zm6.5 0h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-4.9c0-1.2 0-2.7-1.7-2.7s-2 1.3-2 2.6v5h-4V10z",
  },
};

export default function Footer() {
  const thaiYear = new Date().getFullYear() + 543;
  const policies = POLICY_LINKS.filter((p) => p.url);
  const socials = Object.entries(social).filter(([key, url]) => url && SOCIAL_ICONS[key]);
  const columns = 1 + (policies.length > 0) + (socials.length > 0);
  const gridCols = { 1: "", 2: "md:grid-cols-[1.4fr_1fr]", 3: "md:grid-cols-[1.4fr_1fr_1fr]" }[columns];

  return (
    <footer className="bg-deep-navy text-white">
      <Container className={`grid gap-8 py-12 ${gridCols}`}>
        <div>
          <div className="flex items-center gap-3">
            <Image
              src="/images/9expert-signature-logo.png"
              alt="9Expert"
              width={800}
              height={262}
              className="h-8 w-auto brightness-0 invert"
            />
            <span className="border-l border-white/20 pl-3 text-[0.6875rem] leading-tight text-on-navy-55">
              Knowledge
              <br />
              Provider
            </span>
          </div>
          <address className="mt-4 text-sm leading-relaxed text-on-navy-65 not-italic">
            บริษัท นายน์เอ็กซ์เพิร์ท จำกัด เลขที่ 318 อาคารเอเวอร์กรีน เพลส ชั้น 2 ห้อง 2B ซอยวรฤทธิ์
            ถนนพญาไท แขวงถนนเพชรบุรี เขตราชเทวี กรุงเทพฯ 10400 · โทร{" "}
            <a
              href={PHONE_TEL}
              className="whitespace-nowrap text-on-navy-85 underline-offset-2 hover:text-air-blue hover:underline"
            >
              {PHONE_DISPLAY}
            </a>
          </address>
        </div>

        {policies.length > 0 && (
          <div>
            <h2 className="text-sm font-bold tracking-wide text-on-navy-50 uppercase">นโยบาย</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {policies.map((p) => (
                <li key={p.label}>
                  <a href={p.url} className="text-on-navy-70 transition-colors hover:text-air-blue">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {socials.length > 0 && (
          <div>
            <h2 className="text-sm font-bold tracking-wide text-on-navy-50 uppercase">ติดตามเรา</h2>
            <ul className="mt-3 flex gap-3">
              {socials.map(([key, url]) => {
                const icon = SOCIAL_ICONS[key];
                return (
                  <li key={key}>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener"
                      aria-label={`9Expert บน ${icon.name} (เปิดในแท็บใหม่)`}
                      className="grid h-11 w-11 place-items-center rounded-lg border border-white/12 bg-navy-raised-2 text-on-navy-85 transition-colors hc-border hover:border-action-blue hover:bg-action-blue"
                    >
                      {/* aria-label is the whole accessible name, so it carries the new-tab note too. */}
                      <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
                        <path d={icon.d} fill="currentColor" fillRule="evenodd" />
                      </svg>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </Container>
      <div className="border-t border-white/10">
        <Container className="py-5 text-[0.8125rem] text-on-navy-50">
          © {thaiYear} บริษัท นายน์เอ็กซ์เพิร์ท จำกัด สงวนลิขสิทธิ์
        </Container>
      </div>
    </footer>
  );
}
