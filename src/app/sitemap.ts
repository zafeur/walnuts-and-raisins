import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/metadata";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/contact"].flatMap((path) =>
    ["en", "fa"].map((locale) => ({
      url: `${siteUrl}/${locale}${path}`,
      alternates: {
        languages: { en: `${siteUrl}/en${path}`, fa: `${siteUrl}/fa${path}` },
      },
    })),
  );
}
