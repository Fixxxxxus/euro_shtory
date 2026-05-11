import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactFloatingButton } from "@/components/ContactFloatingButton";
import { PageTransition } from "@/components/PageTransition";

const display = Manrope({
  subsets: ["latin", "cyrillic"],
  variable: "--font-outfit",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-geist-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "EUROSHTHORY — плиссе и Duette®",
    template: "%s · EUROSHTHORY",
  },
  description:
    "Премиальные системы плиссе и Duette® для дома и офиса. Подбор, монтаж, консультация.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${display.variable} ${inter.variable}`} style={{ backgroundColor: "#0f1419" }}>
      <body className="min-h-screen font-sans">
        {/* inline fallback если CSS с другого порта не подтянулся */}
        <style
          dangerouslySetInnerHTML={{
            __html: [
              "body{background-color:#0f1419;color:#f4efe6;margin:0;min-height:100%;font-family:system-ui,-apple-system,sans-serif}",
              "@media(min-width:768px){.site-nav-desktop{display:flex!important;flex-wrap:wrap;gap:.35rem;justify-content:flex-end;align-items:center}}",
              "@media(max-width:767.98px){.site-nav-desktop{display:none!important}.site-nav-mobile{display:block}}",
              "@media(min-width:768px){.site-nav-mobile{display:none!important}}",
            ].join(""),
          }}
        />
        <SiteHeader />
        <PageTransition>{children}</PageTransition>
        <SiteFooter />
        <ContactFloatingButton />
      </body>
    </html>
  );
}
