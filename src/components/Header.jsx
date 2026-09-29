"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";

export const NAV = [
  { id: "top", label: "หน้าแรก" },
  { id: "services", label: "บริการ" },
  { id: "portfolio", label: "ผลงาน" },
  { id: "platforms", label: "แพลตฟอร์ม" },
  { id: "about", label: "เกี่ยวกับเรา" },
  { id: "contact", label: "ติดต่อเรา" },
];

const TEXT_SIZE_LABEL = { base: "ปกติ", lg: "ใหญ่", xl: "ใหญ่พิเศษ" };

const toolBtn =
  "min-h-[44px] min-w-[44px] px-3 rounded-md border font-semibold transition-colors hc-border";
const toolIdle =
  "border-deep-navy/15 text-deep-navy hover:border-action-blue hover:text-action-blue";

export default function Header() {
  const [textSize, setTextSize] = useState("base");
  const [highContrast, setHighContrast] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtnRef = useRef(null);

  useEffect(() => {
    const el = document.documentElement;
    if (textSize === "base") el.removeAttribute("data-textsize");
    else el.setAttribute("data-textsize", textSize);
  }, [textSize]);

  useEffect(() => {
    const el = document.documentElement;
    if (highContrast) el.setAttribute("data-contrast", "high");
    else el.removeAttribute("data-contrast");
  }, [highContrast]);

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

  const cycleText = () =>
    setTextSize((s) => (s === "base" ? "lg" : s === "lg" ? "xl" : "base"));

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
            aria-label={`ปรับขนาดตัวอักษร (ปัจจุบัน: ${TEXT_SIZE_LABEL[textSize]})`}
            title="ปรับขนาดตัวอักษร"
          >
            <span className="text-[0.8125rem]" aria-hidden="true">ก</span>
            <span className="ml-0.5 align-middle text-[1.0625rem]" aria-hidden="true">ก</span>
          </button>
          <button
            type="button"
            onClick={() => setHighContrast((v) => !v)}
            aria-pressed={highContrast}
            className={`${toolBtn} ${
              highContrast ? "border-deep-navy bg-deep-navy text-white" : toolIdle
            }`}
            aria-label="สลับโหมดคอนทราสต์สูง"
            title="คอนทราสต์สูง"
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
