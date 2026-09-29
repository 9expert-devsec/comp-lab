"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";

/* Orbit geometry in px, measured on the 1440 frame. Planets sit on an arc: y = cy + R − √(R² − dx²). */
const R = 1400;
const LAYOUTS = {
  desktop: { frame: 1140, height: 390, cy: 175, sizes: [280, 150, 92], dx: [0, 300, 520] },
  mobile: { frame: null, height: 310, cy: 140, sizes: [210, 92], dx: [0, 175] },
};
const EASE = "650ms cubic-bezier(0.22, 0.61, 0.36, 1)";
const SWIPE_PX = 40;
/* Half-width (px) of the orbit-line drawing; wide enough to reach the edges of a 2560 screen. */
const ARC_SPAN = 1500;
const ORBIT_MASK = "linear-gradient(to right, transparent 0%, #000 22%, #000 78%, transparent 100%)";

const noopSubscribe = () => () => {};

function useHydrated() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}

function useMedia(query) {
  const subscribe = useCallback(
    (cb) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    [query],
  );
  return useSyncExternalStore(subscribe, () => window.matchMedia(query).matches, () => false);
}

/* Signed distance of planet i from the active one, wrapped so it is nearest either way round. */
function slotOf(i, active, n) {
  let d = (((i - active) % n) + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

function geometry(slot, layout, k) {
  const visible = layout.sizes.length - 1;
  const abs = Math.abs(slot);
  const hidden = abs > visible;
  const size = layout.sizes[Math.min(abs, visible)] * k;
  const dxRaw = hidden ? layout.dx[visible] + 220 : layout.dx[abs];
  const dx = Math.sign(slot) * dxRaw * k;
  const drop = (R - Math.sqrt(R * R - dxRaw * dxRaw)) * k;
  return { hidden, size, left: `calc(50% + ${dx - size / 2}px)`, top: layout.cy + drop - size / 2 };
}

function PlatformCta({ platform }) {
  if (!platform.url) {
    return <p className="inline-flex min-h-[44px] items-center text-[0.9375rem] font-semibold text-white/75">เร็ว ๆ นี้</p>;
  }
  return (
    <a
      href={platform.url}
      target="_blank"
      rel="noopener"
      className="hc-btn focus-lime inline-flex min-h-[44px] items-center justify-center rounded-full bg-signal-lime px-6 text-[0.9375rem] font-bold text-deep-navy transition-colors hover:bg-[#c7ee2c]"
    >
      เข้าสู่เว็บไซต์
      <span className="sr-only"> {platform.name} (เปิดในแท็บใหม่)</span>
    </a>
  );
}

const ArrowIcon = ({ dir }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d={dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const roundBtn =
  "focus-lime grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border-2 border-air-blue text-white transition-colors hover:bg-air-blue hover:text-deep-navy";

/*
 * Server HTML (and no-JS) is a plain list of every platform with real links. After hydration the
 * same data is upgraded into the orbit carousel. The wrapper's min-height reserves the orbit's space.
 */
export default function PlatformOrbit({ platforms, logos }) {
  const n = platforms.length;
  const hydrated = useHydrated();
  const reducedMotion = useMedia("(prefers-reduced-motion: reduce)");
  const mobile = useMedia("(max-width: 640px)");

  const [{ active, prev }, setPos] = useState({ active: 0, prev: 0 });
  const [mode, setMode] = useState(null); // null = default (auto unless reduced motion), "auto", "stopped"
  const [hovered, setHovered] = useState(false);
  const [focusInside, setFocusInside] = useState(false);
  const [inView, setInView] = useState(false);
  const [stageWidth, setStageWidth] = useState(null);
  const [announcement, setAnnouncement] = useState("");

  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const planetRefs = useRef([]);
  const focusAfter = useRef(null);
  const announceTimer = useRef(null);
  const pointer = useRef(null);
  const swiped = useRef(false);

  const autoOn = mode ? mode === "auto" : !reducedMotion;
  const running = autoOn && !hovered && !focusInside && inView;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, [hydrated]);

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setStageWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, [hydrated]);

  // Keyboard selection moves focus to the newly active planet once it is rendered (and no longer inert).
  useEffect(() => {
    if (focusAfter.current === null) return;
    planetRefs.current[focusAfter.current]?.focus();
    focusAfter.current = null;
  }, [active]);

  useEffect(() => () => clearTimeout(announceTimer.current), []);

  const moveTo = (i) => setPos((p) => ({ active: ((i % n) + n) % n, prev: p.active }));

  // Any user-driven change stops auto-rotation for good; only the play button restarts it.
  const userSelect = (i) => {
    const next = ((i % n) + n) % n;
    moveTo(next);
    setMode("stopped");
    // Announce after the live region has switched from "off" to "polite".
    clearTimeout(announceTimer.current);
    announceTimer.current = setTimeout(
      () => setAnnouncement(`แพลตฟอร์ม ${next + 1} จาก ${n}: ${platforms[next].name}`),
      100,
    );
  };

  const togglePlay = () => {
    if (autoOn) {
      setMode("stopped");
    } else {
      setMode("auto");
      setHovered(false);
      setFocusInside(false);
    }
  };

  const onPlanetKeyDown = (e) => {
    const target = { ArrowRight: active + 1, ArrowLeft: active - 1, Home: 0, End: n - 1 }[e.key];
    if (target === undefined) return;
    e.preventDefault();
    focusAfter.current = ((target % n) + n) % n;
    userSelect(target);
  };

  const onPointerDown = (e) => {
    pointer.current = { x: e.clientX, y: e.clientY };
    swiped.current = false;
  };
  const onPointerUp = (e) => {
    const start = pointer.current;
    pointer.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > SWIPE_PX && Math.abs(dx) > Math.abs(dy)) {
      swiped.current = true;
      userSelect(active + (dx < 0 ? 1 : -1));
    }
  };

  const onPlanetClick = (i) => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    if (i !== active) userSelect(i);
  };

  const rootHandlers = {
    onPointerEnter: (e) => e.pointerType === "mouse" && setHovered(true),
    onPointerLeave: (e) => e.pointerType === "mouse" && setHovered(false),
    onFocus: () => setFocusInside(true),
    onBlur: (e) => {
      if (!e.currentTarget.contains(e.relatedTarget)) setFocusInside(false);
    },
  };

  // Pause row + stage + controls in px, text lines in rem, so the reserve tracks the text-size toggle.
  const reserve = "mt-10 min-h-[calc(530px+10.5rem)] max-sm:min-h-[calc(450px+12rem)]";

  if (!hydrated) {
    return (
      <div ref={rootRef} className={reserve}>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {platforms.map((p) => (
            <li key={p.slug} className="rounded-2xl border-2 border-air-blue p-6">
              <h3 className="text-xl font-bold">{p.name}</h3>
              <p className="mt-2 text-[0.9375rem] text-white/80">{p.desc}</p>
              <div className="mt-4">
                <PlatformCta platform={p} />
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  const layout = mobile ? LAYOUTS.mobile : LAYOUTS.desktop;
  const k = layout.frame && stageWidth ? Math.min(1, stageWidth / layout.frame) : 1;
  const current = platforms[active];
  const arcR = R * k;
  const arcHalf = Math.min(ARC_SPAN, arcR * 0.999);
  const arcY = layout.cy + arcR - Math.sqrt(arcR * arcR - arcHalf * arcHalf);

  return (
    <div ref={rootRef} className={reserve} {...rootHandlers}>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={autoOn ? "หยุดการเลื่อนอัตโนมัติ" : "เล่นการเลื่อนอัตโนมัติ"}
          title={autoOn ? "หยุดการเลื่อนอัตโนมัติ" : "เล่นการเลื่อนอัตโนมัติ"}
          className="focus-lime grid h-11 w-11 place-items-center rounded-full border-2 border-air-blue text-white transition-colors hover:bg-air-blue hover:text-deep-navy"
        >
          {autoOn ? (
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
              <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 5l12 7-12 7V5Z" fill="currentColor" />
            </svg>
          )}
        </button>
      </div>

      <div
        ref={stageRef}
        role="tablist"
        aria-label="เลือกแพลตฟอร์ม"
        onKeyDown={onPlanetKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (pointer.current = null)}
        className="relative touch-pan-y select-none"
        style={{ height: layout.height }}
      >
        {/* Orbit line layer: spans the full viewport width and fades out toward both edges (mask on
            this layer only). Hidden in forced-colors mode, where it would render as a hard line. */}
        <div
          aria-hidden="true"
          className="hc-hide pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 forced-colors:hidden"
          style={{ maskImage: ORBIT_MASK, WebkitMaskImage: ORBIT_MASK }}
        >
          <svg
            className="absolute top-0 left-1/2 -translate-x-1/2"
            width={ARC_SPAN * 2}
            height={layout.height}
            viewBox={`${-ARC_SPAN} 0 ${ARC_SPAN * 2} ${layout.height}`}
          >
            <path
              d={`M ${-arcHalf} ${arcY} A ${arcR} ${arcR} 0 0 1 ${arcHalf} ${arcY}`}
              fill="none"
              className="stroke-air-blue"
              strokeOpacity="0.35"
              strokeWidth="1"
            />
          </svg>
        </div>

        {platforms.map((p, i) => {
          const slot = slotOf(i, active, n);
          const from = slotOf(i, prev, n);
          const g = geometry(slot, layout, k);
          const isCenter = slot === 0;
          // A planet wrapping from one end to the other jumps instead of flying across the stage.
          const animate = !reducedMotion && Math.abs(slot - from) <= 2;
          // Own white logo on every planet; side planets fall back to the 9Expert mark, then to text.
          const logo = logos.white[p.slug] ?? (isCenter ? null : logos.mark);
          return (
            <div
              key={p.slug}
              inert={g.hidden}
              className="absolute"
              style={{
                left: g.left,
                top: g.top,
                width: g.size,
                height: g.size,
                opacity: g.hidden ? 0 : 1,
                zIndex: 10 - Math.abs(slot),
                transition: animate
                  ? `left ${EASE}, top ${EASE}, width ${EASE}, height ${EASE}, opacity ${EASE}`
                  : "none",
              }}
            >
              {isCenter && (
                <span aria-hidden="true" className="hc-ring-active absolute -inset-3 rounded-full border-2 border-signal-lime" />
              )}
              <button
                ref={(el) => (planetRefs.current[i] = el)}
                type="button"
                role="tab"
                id={`platform-tab-${p.slug}`}
                aria-selected={isCenter}
                aria-controls="platform-panel"
                aria-label={p.name}
                tabIndex={isCenter ? 0 : -1}
                onClick={() => onPlanetClick(i)}
                className={`focus-lime relative grid h-full w-full place-items-center rounded-full border-2 ${
                  isCenter
                    ? "cursor-default border-action-blue bg-action-blue shadow-[0_0_60px_color-mix(in_srgb,var(--action-blue)_55%,transparent)]"
                    : "cursor-pointer border-air-blue bg-[color-mix(in_srgb,var(--deep-navy)_80%,black)]"
                }`}
              >
                {logo ? (
                  <span className="relative block h-[55%] w-[55%]">
                    <Image src={logo} alt="" fill sizes={isCenter ? "160px" : "90px"} className="object-contain" />
                  </span>
                ) : isCenter ? (
                  <span className="px-4 text-center text-[1.5rem] leading-tight font-bold text-white">{p.short}</span>
                ) : (
                  <span className="text-[1.75rem] leading-none font-bold text-air-blue">9</span>
                )}
              </button>
              {!isCenter && (
                <span
                  aria-hidden="true"
                  className="absolute top-[calc(100%+0.75rem)] left-1/2 -translate-x-1/2 text-sm font-semibold whitespace-nowrap text-cloud-base"
                >
                  {p.short}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div
        id="platform-panel"
        role="tabpanel"
        aria-labelledby={`platform-tab-${current.slug}`}
        className="mx-auto mt-6 max-w-[34rem] text-center"
      >
        <p className="text-[0.8125rem] text-white/75">
          แพลตฟอร์ม {active + 1} จาก {n}
        </p>
        <h3 className="mt-1 text-2xl font-bold lg:text-[1.75rem]">{current.name}</h3>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-white/80">{current.desc}</p>
        <div className="mt-5">
          <PlatformCta platform={current} />
        </div>
      </div>

      <p className="sr-only" aria-live={autoOn ? "off" : "polite"} aria-atomic="true">
        {announcement}
      </p>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button type="button" onClick={() => userSelect(active - 1)} aria-label="แพลตฟอร์มก่อนหน้า" className={roundBtn}>
          <ArrowIcon dir="prev" />
        </button>

        {/* Dots repeat the planets' job, so they are hidden from assistive tech and skipped by Tab. */}
        <div aria-hidden="true" className="flex items-center gap-1">
          {platforms.map((p, i) => (
            <button
              key={p.slug}
              type="button"
              tabIndex={-1}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => userSelect(i)}
              className="hc-dot-btn grid h-6 min-w-6 place-items-center"
            >
              {i === active ? (
                <span className="hc-dot relative block h-2.5 w-10 overflow-hidden rounded-full bg-white/20">
                  {autoOn ? (
                    <span
                      key={active}
                      className="hc-dot-on platform-progress absolute inset-0 rounded-full bg-signal-lime"
                      style={{ animationPlayState: running ? "running" : "paused" }}
                      onAnimationEnd={() => moveTo(active + 1)}
                    />
                  ) : (
                    <span className="hc-dot-on absolute inset-0 rounded-full bg-signal-lime" />
                  )}
                </span>
              ) : (
                <span className="hc-dot block h-2.5 w-2.5 rounded-full bg-white/40 hover:bg-white/70" />
              )}
            </button>
          ))}
        </div>

        <button type="button" onClick={() => userSelect(active + 1)} aria-label="แพลตฟอร์มถัดไป" className={roundBtn}>
          <ArrowIcon dir="next" />
        </button>
      </div>
    </div>
  );
}
