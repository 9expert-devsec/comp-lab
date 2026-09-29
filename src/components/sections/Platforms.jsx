import fs from "node:fs";
import path from "node:path";
import Container from "@/components/Container";
import PlatformOrbit from "@/components/PlatformOrbit";
import { PLATFORMS } from "@/data/platforms";

const publicFile = (p) => fs.existsSync(path.join(process.cwd(), "public", p));

/* Resolved at build time: a logo is used only if its file has been dropped into public/logos/. */
function resolveLogos() {
  const white = {};
  for (const p of PLATFORMS) {
    const file = `logos/platforms/${p.slug}-white.png`;
    white[p.slug] = publicFile(file) ? `/${file}` : null;
  }
  const markFile = "logos/brand/9expert-mark-white.png";
  return { white, mark: publicFile(markFile) ? `/${markFile}` : null };
}

/* Deterministic star field (fixed-seed PRNG), so every build renders the same decoration. */
function makeStars(count, seed) {
  let s = seed;
  const rand = () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  return Array.from({ length: count }, () => ({
    x: +(rand() * 100).toFixed(2),
    y: +(rand() * 100).toFixed(2),
    r: +(1.5 + rand() * 1.5).toFixed(2),
    o: +(0.2 + rand() * 0.45).toFixed(2),
  }));
}

const STARS = makeStars(70, 9);

export default function Platforms() {
  return (
    <section
      id="platforms"
      aria-roledescription="carousel"
      aria-label="แพลตฟอร์มการเรียนรู้ในเครือ 9Expert"
      className="relative overflow-x-clip bg-deep-navy text-white"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {STARS.map((s, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-white"
            style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.r, height: s.r, opacity: s.o }}
          />
        ))}
      </div>

      <Container className="relative py-16 lg:py-24">
        <div className="mx-auto max-w-[45rem] text-center">
          <span className="inline-block text-[0.8125rem] font-semibold tracking-wide text-signal-lime uppercase">
            9Expert Ecosystem
          </span>
          <h2 id="platforms-heading" className="mt-3 text-[1.75rem] leading-tight font-bold lg:text-[2.5rem]">
            ทุกแพลตฟอร์มการเรียนรู้ ภายใต้แบรนด์ 9Expert
          </h2>
        </div>

        <PlatformOrbit platforms={PLATFORMS} logos={resolveLogos()} />
      </Container>
    </section>
  );
}
