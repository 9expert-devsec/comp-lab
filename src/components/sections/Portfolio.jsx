"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { PORTFOLIO } from "@/data/portfolio";

function TimelineItem({ year, title, desc, tags, logo }) {
  return (
    <li className="group relative grid gap-1 border-l-2 border-deep-navy/15 pb-10 pl-6 last:pb-0 hc-border md:grid-cols-[10.5rem_1fr] md:gap-8 md:border-l-0 md:pb-0 md:pl-0">
      <div className="md:pt-1 md:text-right">
        {year && <span className="text-[0.9375rem] font-bold text-action-blue">{year}</span>}
      </div>
      <div className="min-w-0 md:relative md:border-l-2 md:border-deep-navy/15 md:pb-10 md:pl-8 md:group-last:pb-0 hc-border">
        <span
          aria-hidden="true"
          className="hc-dot-on absolute top-1.5 -left-[7px] h-3 w-3 rounded-full bg-action-blue ring-4 ring-cloud-base"
        />
        {logo && (
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
            className="mb-3 h-10 w-auto object-contain"
          />
        )}
        <h3 className="text-[1.1875rem] font-bold text-deep-navy lg:text-[1.3125rem]">{title}</h3>
        {desc && <p className="mt-2 max-w-[40rem] text-[0.9375rem] leading-relaxed text-navy-75">{desc}</p>}
        {tags?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="ประเภทงาน">
            {tags.map((tg) => (
              <li
                key={tg}
                className="inline-flex items-center rounded-full bg-action-tint-cloud px-3 py-1.5 text-[0.8125rem] font-semibold text-action-blue"
              >
                {tg}
              </li>
            ))}
          </ul>
        )}
      </div>
    </li>
  );
}

/* WAI-ARIA tabs with automatic activation: arrows move and select, Home/End jump to the ends. */
export default function Portfolio() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);

  const onKeyDown = (e) => {
    const last = PORTFOLIO.length - 1;
    const next = {
      ArrowRight: active === last ? 0 : active + 1,
      ArrowLeft: active === 0 ? last : active - 1,
      Home: 0,
      End: last,
    }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="bg-cloud-base">
      <Container className="py-16 lg:py-24">
        <Eyebrow>ผลงาน</Eyebrow>
        <h2
          id="portfolio-heading"
          className="mt-3 text-[1.75rem] leading-tight font-bold text-nine-blue lg:text-[2.5rem]"
        >
          ผลลัพธ์จริงจากองค์กรที่ร่วมงานกับเรา
        </h2>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="ประเภทผลงาน">
          {PORTFOLIO.map((t, i) => (
            <button
              key={t.id}
              ref={(el) => (tabRefs.current[i] = el)}
              type="button"
              role="tab"
              id={`portfolio-tab-${t.id}`}
              aria-selected={active === i}
              aria-controls={`portfolio-panel-${t.id}`}
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={onKeyDown}
              className={`min-h-[44px] rounded-full px-5 text-sm font-semibold transition-colors hc-border ${
                active === i
                  ? "bg-action-blue text-white"
                  : "border border-deep-navy/15 bg-white text-navy-75 hover:border-action-blue hover:text-action-blue"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {PORTFOLIO.map((t, i) => (
          <div
            key={t.id}
            role="tabpanel"
            id={`portfolio-panel-${t.id}`}
            aria-labelledby={`portfolio-tab-${t.id}`}
            tabIndex={0}
            hidden={active !== i}
            className="mt-10"
          >
            <ol>
              {t.items.map((it) => (
                <TimelineItem key={it.title} {...it} />
              ))}
            </ol>
          </div>
        ))}
      </Container>
    </section>
  );
}
