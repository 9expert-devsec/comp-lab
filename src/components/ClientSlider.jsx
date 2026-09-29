"use client";

import { useEffect, useState } from "react";
import LogoTile from "@/components/LogoTile";

const PER_SET = 6;
const INTERVAL_MS = 3800;

/* Hero client logo slider: the logos (read from public/logos/clients at build time) in sets of 6.
   Auto-advances with a visible pause/play control, pauses on hover and keyboard focus, and stays
   still under prefers-reduced-motion (WCAG 2.2.2). */
export default function ClientSlider({ logos }) {
  const sets = [];
  for (let i = 0; i < logos.length; i += PER_SET) sets.push(logos.slice(i, i + PER_SET));
  const setCount = sets.length;
  const [index, setIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(true);
  const [userPlaying, setUserPlaying] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // An explicit press of play/pause wins over the motion preference.
  const playing = userPlaying ?? !reducedMotion;
  const running = playing && !hovered && !focused;

  useEffect(() => {
    if (!running || setCount < 2) return;
    const id = setInterval(() => setIndex((v) => (v + 1) % setCount), INTERVAL_MS);
    return () => clearInterval(id);
  }, [running, setCount]);

  const onBlur = (e) => {
    if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
  };

  if (setCount === 0) return null;

  return (
    <div
      role="group"
      aria-roledescription="สไลด์"
      aria-label="องค์กรชั้นนำที่เลือกใช้บริการ"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={onBlur}
    >
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-[0.8125rem] font-medium tracking-wide text-navy-70 uppercase">
          องค์กรชั้นนำที่เลือกใช้บริการ
        </p>
        <button
          type="button"
          onClick={() => setUserPlaying(!playing)}
          aria-label={playing ? "หยุดเลื่อนสไลด์โลโก้" : "เล่นสไลด์โลโก้"}
          className="grid min-h-[44px] min-w-[44px] shrink-0 place-items-center rounded-md border border-deep-navy/15 text-deep-navy transition-colors hc-border hover:border-action-blue hover:text-action-blue"
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
              <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 5l12 7-12 7V5Z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>

      <ul
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6"
        aria-live={running ? "off" : "polite"}
        aria-label={`ชุดโลโก้ที่ ${index + 1} จาก ${sets.length}`}
      >
        {sets[index].map((logo) => (
          <LogoTile key={logo.src} {...logo} />
        ))}
      </ul>

      <div className="mt-2 flex gap-1">
        {sets.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`ชุดโลโก้ที่ ${i + 1}`}
            aria-current={index === i ? "true" : undefined}
            className="hc-dot-btn group grid h-6 min-w-6 place-items-center rounded-full"
          >
            <span
              aria-hidden="true"
              className={`block h-2.5 rounded-full transition-all duration-200 ${
                index === i
                  ? "hc-dot-on w-7 bg-action-blue"
                  : "hc-dot w-2.5 bg-deep-navy/25 group-hover:bg-deep-navy/45"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
