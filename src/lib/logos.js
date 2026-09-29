import fs from "node:fs";
import path from "node:path";
import { logoNames } from "@/data/logo-names";

const IMAGE_RE = /\.(png|svg|webp)$/i;

const titleCase = (key) => key.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

/*
 * Build-time read of public/logos/<folder>/ → [{ src, alt }], sorted by file name (the NN- prefix sets the order).
 * alt comes from src/data/logo-names.js; a missing name falls back to the title-cased key with a build warning.
 */
export function getLogos(folder) {
  const dir = path.join(process.cwd(), "public", "logos", folder);
  if (!fs.existsSync(dir)) return [];
  const names = logoNames[folder] ?? {};
  return fs
    .readdirSync(dir)
    .filter((f) => IMAGE_RE.test(f))
    .sort()
    .map((file) => {
      const key = file.replace(IMAGE_RE, "").replace(/^\d+-/, "");
      let alt = names[key];
      if (!alt) {
        alt = titleCase(key);
        console.warn(`[logos] No name for public/logos/${folder}/${file} — using "${alt}". Add "${key}" to src/data/logo-names.js.`);
      }
      return { src: `/logos/${folder}/${file}`, alt };
    });
}
