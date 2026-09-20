import type { MetadataRoute } from "next";
import { isPublic, siteUrl } from "@/lib/metadata";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(isPublic ? { allow: "/" } : { disallow: "/" }),
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
