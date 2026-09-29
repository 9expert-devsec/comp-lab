/*
 * Brand ecosystem platforms, in carousel order. Add a platform by adding an entry; the counter uses the real length.
 * url: null means "not live yet" — the UI renders no link, only "เร็ว ๆ นี้".
 * Logos are looked up by slug in public/logos/platforms/<slug>-white.png (see docs/logos.md).
 */
export const PLATFORMS = [
  {
    slug: "training",
    name: "9Expert Training",
    short: "Training",
    desc: "อบรมไอทีทั้งแบบ Public และ In-House",
    url: "https://www.9experttraining.com",
  },
  {
    slug: "masterclass",
    name: "9Expert Masterclass",
    short: "Masterclass",
    desc: "คลาสเข้มข้นกับผู้เชี่ยวชาญ",
    url: "https://www.9experttraining.com/masterclass",
  },
  {
    slug: "career-path",
    name: "9Expert Career Path",
    short: "Career Path",
    desc: "เส้นทางพัฒนาทักษะตามสายอาชีพ",
    url: null,
  },
  {
    slug: "academy",
    name: "9Expert Academy",
    short: "Academy",
    desc: "เรียนออนไลน์ได้ทุกที่ ทุกเวลา",
    url: "https://academy.9experttraining.com",
  },
  {
    slug: "twa",
    name: "Thai Web Accessibility",
    short: "TWA",
    desc: "เริ่มต้นให้ทุกคนเข้าถึงได้",
    url: "https://www.thaiwebaccessibility.com",
  },
];
