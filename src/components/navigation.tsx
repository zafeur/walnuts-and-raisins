"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown, Globe2, Menu, X } from "lucide-react";
import { content, type Locale } from "@/content/site";
import { sceneImages } from "@/content/design";
import { Brand } from "@/components/brand";
import { SectionLink } from "@/components/section-link";

export function Navigation({ locale }: { locale: Locale }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const c = content[locale];
  const otherLocale = locale === "en" ? "fa" : "en";
  const otherPath = path.replace(/^\/(en|fa)(?=\/|$)/, `/${otherLocale}`);
  const close = () => {
    setOpen(false);
    setProductsOpen(false);
  };
  useEffect(close, [path]);
  useEffect(() => {
    if (!open && !productsOpen) return;
    const keyboard = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const trigger = open ? "menu-toggle" : "products-toggle";
        close();
        document.getElementById(trigger)?.focus();
      }
    };
    const outside = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", keyboard);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", keyboard);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open, productsOpen]);
  const duration = reduced ? 0 : 0.32;
  return (
    <div ref={root} className="navigation-root">
      <button
        className="skip-link"
        onClick={() => document.getElementById("main")?.focus()}
      >
        {c.nav.skip}
      </button>
      <header className="site-header shell">
        <Brand locale={locale} />
        <nav aria-label={c.nav.menu} className="desktop-nav">
          <button
            id="products-toggle"
            className="products-toggle"
            aria-expanded={productsOpen}
            aria-controls="products-menu"
            onClick={() => setProductsOpen(!productsOpen)}
          >
            {c.nav.products}
            <ChevronDown
              size={15}
              aria-hidden="true"
              className={productsOpen ? "chevron-open" : ""}
            />
          </button>
          <SectionLink locale={locale} section="about" onClick={close}>
            {c.nav.about}
          </SectionLink>
          <Link
            className="nav-contact"
            href={`/${locale}/contact`}
            aria-current={path.endsWith("/contact") ? "page" : undefined}
          >
            {c.nav.contact}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
        <div className="header-controls">
          <Link
            href={otherPath}
            hrefLang={otherLocale}
            lang={otherLocale}
            className="language-switch"
            aria-label={
              locale === "en" ? "Switch to Farsi" : "Switch to English"
            }
          >
            <Globe2 size={15} aria-hidden="true" />
            {locale === "en" ? "فارسی" : "English"}
          </Link>
          <button
            id="menu-toggle"
            className="menu-toggle"
            aria-label={open ? c.nav.close : c.nav.menu}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <motion.span
              animate={{ rotate: open ? 90 : 0 }}
              transition={{ duration }}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </motion.span>
          </button>
        </div>
      </header>
      <AnimatePresence>
        {productsOpen && (
          <motion.div
            id="products-menu"
            className="products-menu shell"
            initial={{ opacity: 0, y: reduced ? 0 : -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={{ duration }}
          >
            <div className="products-menu-heading">
              <span>{c.products.label}</span>
              <SectionLink locale={locale} section="products" onClick={close}>
                {locale === "en" ? "Explore the collection" : "مشاهده مجموعه"}
                <ArrowUpRight size={16} aria-hidden="true" />
              </SectionLink>
            </div>
            <nav aria-label={c.products.label} className="menu-products-grid">
              {c.products.items.map((p, i) => (
                <SectionLink
                  locale={locale}
                  section={sceneImages[i]}
                  key={p.name}
                  onClick={close}
                >
                  <div className="menu-product-image">
                    <Image
                      src={`/images/${sceneImages[i]}.png`}
                      fill
                      sizes="240px"
                      alt=""
                    />
                  </div>
                  <div>
                    <span>{p.name}</span>
                    <small>{p.detail}</small>
                  </div>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </SectionLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label={c.nav.menu}
            className="mobile-nav shell"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          >
            {[
              { section: "products", label: c.nav.products },
              { section: "about", label: c.nav.about },
              { section: "contact", label: c.nav.contact },
            ].map((item, i) => (
              <motion.div
                key={item.section}
                initial={{
                  opacity: 0,
                  x: reduced ? 0 : locale === "fa" ? 14 : -14,
                }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration, delay: reduced ? 0 : 0.06 * i }}
              >
                {item.section === "contact" ? (
                  <Link onClick={close} href={`/${locale}/contact`}>
                    {item.label}
                    <ArrowUpRight size={21} aria-hidden="true" />
                  </Link>
                ) : (
                  <SectionLink
                    locale={locale}
                    section={item.section}
                    onClick={close}
                  >
                    {item.label}
                    <ArrowUpRight size={21} aria-hidden="true" />
                  </SectionLink>
                )}
              </motion.div>
            ))}
            <div className="mobile-products">
              {c.products.items.map((p, i) => (
                <SectionLink
                  key={p.name}
                  locale={locale}
                  section={sceneImages[i]}
                  onClick={close}
                >
                  <Image
                    src={`/images/${sceneImages[i]}.png`}
                    width={80}
                    height={64}
                    alt=""
                  />
                  <span>{p.name}</span>
                </SectionLink>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
}
