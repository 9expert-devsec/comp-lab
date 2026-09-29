import Image from "next/image";

/* Tile / logo-box heights: "md" for the client strip, "lg" (96px / 64px) so round seals read well. */
const SIZES = {
  md: { tile: "h-16", box: "h-10" },
  lg: { tile: "h-24", box: "h-16" },
};

/* Same box for every logo whatever its aspect ratio; the image is contained inside it. */
export default function LogoTile({ src, alt, size = "md", as: Tag = "li" }) {
  const s = SIZES[size];
  return (
    <Tag
      className={`hc-logo-tile flex ${s.tile} items-center justify-center rounded-lg border border-deep-navy/10 bg-white px-4 hc-border`}
    >
      <span className={`relative block ${s.box} w-full`}>
        <Image src={src} alt={alt} fill sizes="200px" className="object-contain" />
      </span>
    </Tag>
  );
}
