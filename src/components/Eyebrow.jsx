export default function Eyebrow({ children, tone = "light" }) {
  return (
    <span
      className={`inline-block text-[0.8125rem] font-semibold tracking-wide uppercase ${
        tone === "dark" ? "text-air-blue" : "text-action-blue"
      }`}
    >
      {children}
    </span>
  );
}
