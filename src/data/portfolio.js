/*
 * Portfolio timeline, one entry per tab. Add entries here; the component needs no change.
 * Entry shape: { year, title, desc?, tags?, logo? }
 *   logo: { src, width, height, alt } — omit or null to render no logo.
 */
export const PORTFOLIO = [
  {
    id: "consulting",
    label: "โครงการที่ปรึกษา",
    items: [
      {
        year: "2024 – ปัจจุบัน",
        title: "Airport of Thailand (AOT)",
        desc: "พัฒนาระบบ Passenger Traffic Dashboard สำหรับผู้บริหาร เพื่อวิเคราะห์และติดตามปริมาณผู้โดยสารแบบเรียลไทม์ พร้อมเชื่อมต่อข้อมูลหลายแหล่ง",
        tags: ["Dashboard", "Data Analytics", "AI Integration"],
        logo: null,
      },
    ],
  },
  {
    id: "partnerships",
    label: "ความร่วมมือ",
    items: [
      { year: "2026", title: "MOU 9Expert x สจล. (KMITL)", logo: null },
      { year: "2026", title: "The Next Human Skills x Bitkub Academy", logo: null },
    ],
  },
  {
    id: "clients",
    label: "ลูกค้าองค์กร",
    items: [{ year: "", title: "SCB, BTS, กระทรวงยุติธรรม และอื่น ๆ", logo: null }],
  },
];
