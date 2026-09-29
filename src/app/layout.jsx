import { IBM_Plex_Sans_Thai } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const ibmPlexSansThai = IBM_Plex_Sans_Thai({
  variable: "--font-ibm-plex-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "9Expert | นายน์เอ็กซ์เพิร์ท",
  description:
    "9Expert ผู้ให้บริการฝึกอบรม In-House ที่ปรึกษาด้าน Data · AI · Automation และบริการ Web Accessibility สำหรับองค์กรและหน่วยงานภาครัฐ ตั้งแต่ปี 2548",
};

export default function RootLayout({ children }) {
  return (
    <html lang="th" className={ibmPlexSansThai.variable}>
      <body className="min-h-screen bg-cloud-base">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-lg focus:bg-action-blue focus:px-4 focus:py-2 focus:text-white"
        >
          ข้ามไปยังเนื้อหา
        </a>
        <Header />
        <main id="main-content" tabIndex={-1} className="focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
