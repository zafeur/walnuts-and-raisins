import { notFound } from "next/navigation";
import { business, content, isLocale, locales } from "@/content/site";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import localFont from "next/font/local";
import "../globals.css";

const outfit = localFont({ src: "../../../node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2", variable: "--font-outfit", display: "swap" });
const vazirmatn = localFont({ src: "../../../node_modules/@fontsource-variable/vazirmatn/files/vazirmatn-arabic-wght-normal.woff2", variable: "--font-vazirmatn", display: "swap" });
const editorial = localFont({ src: "../../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2", variable: "--font-editorial", display: "swap", weight: "300 700" });

export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
    <body className={`${outfit.variable} ${vazirmatn.variable} ${editorial.variable}`}>
      <Navigation locale={locale} />
      {children}
      <Footer locale={locale} />
      {business.isDraft && <aside className="draft-notice">{content[locale].draft}</aside>}
    </body>
  </html>;
}
