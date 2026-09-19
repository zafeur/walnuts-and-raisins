import type { Metadata } from "next";
import { business, content, type Locale } from "@/content/site";

export const siteUrl = (process.env.SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const isPublic = !business.isDraft && !new URL(siteUrl).hostname.match(/^(localhost|127\.0\.0\.1)$/);
export function pageMetadata(locale: Locale, contact = false): Metadata {
  const copy = content[locale].seo;
  const path = contact ? "/contact" : "";
  return {
    metadataBase: new URL(siteUrl),
    title: contact ? copy.contactTitle : copy.title,
    description: contact ? copy.contactDescription : copy.description,
    alternates: {
      canonical: `/${locale}${path}`,
      languages: { en: `/en${path}`, fa: `/fa${path}`, "x-default": `/en${path}` },
    },
    robots: { index: isPublic, follow: isPublic },
    icons: { icon: "/brand-mark.svg" },
  };
}
