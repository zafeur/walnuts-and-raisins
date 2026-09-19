"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business, content, type Locale } from "@/content/site";
import { Brand } from "@/components/brand";

export function Navigation({ locale }: { locale: Locale }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const c = content[locale];
  const otherLocale = locale === "en" ? "fa" : "en";
  const otherPath = path.replace(/^\/(en|fa)(?=\/|$)/, `/${otherLocale}`);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => {
    if (!open) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [open]);
  return (
    <>
      <a href="#main" className="skip-link">{c.nav.skip}</a>
      <header className="site-header shell">
        <Brand locale={locale} />
        <nav aria-label={c.nav.menu} className="desktop-nav">
          <Link href={`/${locale}#products`}>{c.nav.products}</Link>
          <Link href={`/${locale}#about`}>{c.nav.about}</Link>
          <Link className="nav-contact" href={`/${locale}/contact`} aria-current={path.endsWith("/contact") ? "page" : undefined}>{c.nav.contact}<span aria-hidden="true">↗</span></Link>
        </nav>
        <div className="header-controls">
          <Link href={otherPath} hrefLang={otherLocale} lang={otherLocale} className="language-switch" aria-label={locale === "en" ? "Switch to Farsi" : "Switch to English"}>{locale === "en" ? "فارسی" : "English"}</Link>
          <button id="menu-toggle" className="menu-toggle" aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? c.nav.close : c.nav.menu}</button>
        </div>
      </header>
      {open && <nav id="mobile-menu" aria-label={c.nav.menu} className="mobile-nav shell">
        <Link onClick={() => setOpen(false)} href={`/${locale}#products`}>{c.nav.products}</Link>
        <Link onClick={() => setOpen(false)} href={`/${locale}#about`}>{c.nav.about}</Link>
        <Link onClick={() => setOpen(false)} href={`/${locale}/contact`}>{c.nav.contact}</Link>
      </nav>}
    </>
  );
}
