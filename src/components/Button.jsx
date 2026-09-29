import Link from "next/link";

const BASE =
  "hc-btn inline-flex max-w-full items-center justify-center gap-2 min-h-[44px] px-6 py-2 rounded-lg text-center font-semibold " +
  "transition-[transform,background-color,color,border-color] duration-200 ease-out " +
  "motion-safe:hover:-translate-y-0.5 active:translate-y-0 text-[0.9375rem] leading-tight";

const VARIANTS = {
  lime: "bg-signal-lime text-deep-navy hover:bg-[#c7ee2c]",
  action: "bg-action-blue text-white hover:bg-[#0049cc]",
  outlineDark:
    "border-2 border-deep-navy/25 text-deep-navy hover:border-action-blue hover:text-action-blue hc-border",
  outlineLight: "border-2 border-white/35 text-white hover:border-air-blue hover:text-air-blue hc-border",
};

/* Renders a <Link> for in-app paths ("/…"), an <a> for other hrefs, otherwise a <button>. */
export default function Button({ variant = "action", href, className = "", children, ...rest }) {
  const cls = `${BASE} ${VARIANTS[variant]} ${className}`;
  if (href?.startsWith("/")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  );
}
