import { notFound } from "next/navigation";
import { isLocale, locales } from "@/content/site";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SectionNavigation } from "@/components/section-link";
import localFont from "next/font/local";
import "../globals.css";

const outfit = localFont({
  src: "../../../node_modules/@fontsource-variable/outfit/files/outfit-latin-wght-normal.woff2",
  variable: "--font-outfit",
  display: "swap",
});
const vazirmatn = localFont({
  src: "../../../node_modules/@fontsource-variable/vazirmatn/files/vazirmatn-arabic-wght-normal.woff2",
  variable: "--font-vazirmatn",
  display: "swap",
});
const editorial = localFont({
  src: "../../../node_modules/@fontsource-variable/cormorant-garamond/files/cormorant-garamond-latin-wght-normal.woff2",
  variable: "--font-editorial",
  display: "swap",
  weight: "300 700",
});
const wordmark = localFont({
  src: "../../../node_modules/@fontsource-variable/noto-naskh-arabic/files/noto-naskh-arabic-arabic-wght-normal.woff2",
  variable: "--font-wordmark",
  display: "swap",
  weight: "400 700",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
      <body
        className={`${outfit.variable} ${vazirmatn.variable} ${editorial.variable} ${wordmark.variable}`}
      >
        <Navigation locale={locale} />
        <noscript>
          <style>{`[data-testid="scene-reveal"], .reveal-part { opacity: 1 !important; transform: none !important; clip-path: none !important; }`}</style>
        </noscript>
        {children}
        <SectionNavigation />
        <Footer locale={locale} />
      </body>
    </html>
  );
}
