import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/content/site";

export function Brand({ locale }: { locale: Locale }) {
  return (
    <Link href={`/${locale}`} className="wordmark">
      <Image
        className="brand-logo"
        src="/images/zarchin-logo-transparent.png"
        alt="زرچین — Zarchin"
        width={1338}
        height={1176}
        sizes="(max-width: 767px) 72px, 124px"
        priority
      />
    </Link>
  );
}
