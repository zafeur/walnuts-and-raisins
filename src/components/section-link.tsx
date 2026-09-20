"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type MouseEvent, type ReactNode } from "react";
import type { Locale } from "@/content/site";

const pendingSection = "zarchin:section";
const sections = new Set([
  "products",
  "about",
  "walnuts",
  "raisins",
  "saffron",
]);

function scrollToSection(section: string) {
  const target = document.getElementById(section);
  if (!target) return;
  target.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
    block: "start",
  });
}

export function SectionLink({
  locale,
  section,
  children,
  className,
  onClick,
}: {
  locale: Locale;
  section: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const pathname = usePathname();
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    onClick?.();
    if (pathname === `/${locale}`) {
      event.preventDefault();
      scrollToSection(section);
    } else {
      try {
        sessionStorage.setItem(pendingSection, section);
      } catch {
        /* Navigation still works without browser storage. */
      }
    }
  }
  return (
    <Link href={`/${locale}`} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
}

export function SectionNavigation() {
  const pathname = usePathname();
  useEffect(() => {
    let frame = 0;
    function navigate() {
      let section = window.location.hash.slice(1);
      if (window.location.hash)
        window.history.replaceState(
          window.history.state,
          "",
          `${window.location.pathname}${window.location.search}`,
        );
      try {
        section = sessionStorage.getItem(pendingSection) || section;
        sessionStorage.removeItem(pendingSection);
      } catch {
        /* Storage is optional. */
      }
      if (!sections.has(section)) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => scrollToSection(section));
    }
    navigate();
    window.addEventListener("hashchange", navigate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", navigate);
    };
  }, [pathname]);
  return null;
}
