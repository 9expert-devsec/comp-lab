import Image from "next/image";

/* Same box for every logo whatever its aspect ratio; the image is contained inside it. */
export default function LogoTile({ src, alt, as: Tag = "li" }) {
  return (
    <Tag className="flex h-16 items-center justify-center rounded-lg border border-deep-navy/10 bg-white px-4 hc-border">
      <span className="relative block h-10 w-full">
        <Image src={src} alt={alt} fill sizes="160px" className="object-contain" />
      </span>
    </Tag>
  );
}
