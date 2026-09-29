"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import { CONTRAST_KEY, TEXT_SIZES, TEXTSIZE_KEY, savePref } from "@/lib/display-prefs";

export const NAV = [
  { id: "top", label: "หน้าแรก" },
  { id: "services", label: "บริการ" },
  { id: "portfolio", label: "ผลงาน" },
  { id: "platforms", label: "แพลตฟอร์ม" },
  { id: "about", label: "เกี่ยวกับเรา" },
  { id: "contact", label: "ติดต่อเรา" },
];

/* Reads an <html> attribute and re-renders when it changes (the attribute is the source of truth). */
function htmlAttrStore(attr) {
  return {
    subscribe(cb) {
      const mo = new MutationObserver(cb);
      mo.observe(document.documentElement, { attributes: true, attributeFilter: [attr] });
      return () => mo.disconnect();
    },
    get: () => document.documentElement.getAttribute(attr),
    getServer: () => null,
  };
}
const contrastStore = htmlAttrStore("data-contrast");
const textSizeStore = htmlAttrStore("data-textsize");

// Fixed 44px squares (no text padding) so the header row fits 320px even at the largest text size.
const toolBtn =
  "grid h-11 w-11 shrink-0 place-items-center rounded-md border font-semibold transition-colors hc-border";
const toolIdle =
  "border-deep-navy/15 text-deep-navy hover:border-action-blue hover:text-action-blue";

export default function Header() {
  const textSize = useSyncExternalStore(textSizeStore.subscribe, textSizeStore.get, textSizeStore.getServer) ?? "base";
  const level = Math.max(0, TEXT_SIZES.findIndex((t) => t.value === textSize));
  const highContrast = useSyncExternalStore(contrastStore.subscribe, contrastStore.get, contrastStore.getServer) === "high";
  const [open, setOpen] = useState(false);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Cycles ปกติ → ใหญ่ → ใหญ่มาก → ปกติ.
  const cycleText = () => {
    const next = TEXT_SIZES[(level + 1) % TEXT_SIZES.length].value;
    savePref(TEXTSIZE_KEY, "data-textsize", next === "base" ? null : next, next);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-deep-navy/10 bg-white/90 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <a href="#top" className="flex shrink-0 items-center gap-4" aria-label="9Expert Knowledge Provider หน้าแรก">
          <Image
            src="/images/9expert-signature-logo.png"
            alt="9Expert"
            width={800}
            height={262}
            loading="eager"
            className="h-10 w-auto object-contain md:h-12"
          />
          {/* Hidden on phones, and at lg–xl where the full nav leaves no room for it. */}
          <span className="hidden border-l-2 border-deep-navy/20 py-0.5 pl-4 text-[0.8125rem] leading-tight font-medium text-deep-navy/70 sm:block lg:hidden xl:block">
            Knowledge
            <br />
            Provider
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="เมนูหลัก">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className="rounded-md px-3 py-2 text-[0.9375rem] font-medium text-deep-navy/75 transition-colors hover:bg-action-blue/[0.06] hover:text-action-blue"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={cycleText}
            className={`${toolBtn} ${toolIdle}`}
            aria-label={`ขนาดตัวอักษร: ${TEXT_SIZES[level].label}`}
            title={`ขนาดตัวอักษร: ${TEXT_SIZES[level].label}`}
          >
            <span aria-hidden="true" className="flex flex-col items-center gap-0.5 leading-none">
              <span>
                <span className="text-[0.75rem]">ก</span>
                <span className="text-[1rem]">ก</span>
              </span>
              {/* Visible level: one filled bar per step. */}
              <span className="flex gap-0.5">
                {TEXT_SIZES.map((t, i) => (
                  <span
                    key={t.value}
                    className={`block h-1 w-1.5 rounded-sm ${i <= level ? "hc-dot-on bg-current" : "hc-dot bg-current opacity-25"}`}
                  />
                ))}
              </span>
            </span>
          </button>
          <button
            type="button"
            onClick={() =>
              savePref(CONTRAST_KEY, "data-contrast", highContrast ? null : "high", highContrast ? "normal" : "high")
            }
            aria-pressed={highContrast}
            className={`${toolBtn} ${
              highContrast ? "border-deep-navy bg-deep-navy text-white" : toolIdle
            }`}
            aria-label="โหมดสีตัดกันสูง"
            title="โหมดสีตัดกันสูง"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
              <path d="M12 3a9 9 0 0 0 0 18Z" fill="currentColor" />
            </svg>
          </button>
          <button
            ref={menuBtnRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid min-h-[44px] min-w-[44px] place-items-center rounded-md border border-deep-navy/15 text-deep-navy hc-border lg:hidden"
            aria-label={open ? "ปิดเมนู" : "เปิดเมนู"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </Container>

      {open && (
        <nav id="mobile-menu" className="border-t border-deep-navy/10 bg-white lg:hidden" aria-label="เมนูมือถือ">
          <Container className="py-2">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                onClick={() => setOpen(false)}
                className="block min-h-[44px] border-b border-deep-navy/5 py-3 text-[0.9375rem] font-medium text-deep-navy/80 last:border-0"
              >
                {n.label}
              </a>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
