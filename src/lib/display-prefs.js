/*
 * Display preferences (high contrast) stored in localStorage and mirrored as attributes on <html>.
 * The <html> attribute is the single source of truth: the inline head script sets it before first
 * paint, and the header toggle reads and writes it.
 */
export const CONTRAST_KEY = "9x-contrast"; // "high" | "normal"

/*
 * Runs in <head> before the body is painted. No stored choice → follow `prefers-contrast: more`.
 * Kept tiny and dependency-free; every storage access is guarded (private mode, blocked storage).
 */
export const PREFS_SCRIPT = `(function(){var d=document.documentElement,c=null;try{c=localStorage.getItem("${CONTRAST_KEY}")}catch(e){}try{if(c==="high"||(c===null&&matchMedia("(prefers-contrast: more)").matches))d.setAttribute("data-contrast","high")}catch(e){}})();`;

/* Sets or clears an <html> attribute and remembers the choice. */
export function savePref(key, attr, value, stored) {
  const el = document.documentElement;
  if (value) el.setAttribute(attr, value);
  else el.removeAttribute(attr);
  try {
    localStorage.setItem(key, stored);
  } catch {
    // Storage unavailable: the choice still applies for this page view.
  }
}
