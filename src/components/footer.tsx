import Link from "next/link";
import { business, content, type Locale } from "@/content/site";
import { Brand } from "@/components/brand";

export function Footer({ locale }: { locale: Locale }) {
  const c = content[locale];
  return (
    <footer className="shell site-footer">
      <div className="footer-top">
        <div><Brand locale={locale} /><p className="whitespace-pre-line mt-4 text-muted">{c.footer.text}</p></div>
        <nav aria-label={locale === "en" ? "Footer" : "پیوندهای پایین صفحه"} className="flex flex-col gap-3">
          <Link href={`/${locale}#products`}>{c.nav.products}</Link>
          <Link href={`/${locale}#about`}>{c.nav.about}</Link>
          <Link href={`/${locale}/contact`}>{c.nav.contact}</Link>
        </nav>
        <div className="flex flex-col gap-3">
          {business.email && <a href={`mailto:${business.email}`} dir="ltr">{business.email}</a>}
          {business.phone && <a href={`tel:${business.phone.replace(/[^+\d]/g, "")}`} dir="ltr">{business.phone}</a>}
          {!business.phone && !business.email && <span className="text-muted">{c.contact.unavailable}</span>}
        </div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} {business.name[locale]}</span>{business.isDraft && <span>{c.footer.preview}</span>}</div>
    </footer>
  );
}
