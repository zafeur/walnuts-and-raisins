import Image from "next/image";
import Link from "next/link";
import { business, type Locale } from "@/content/site";

export function Brand({ locale }: { locale: Locale }) {
  return <Link href={`/${locale}`} className="wordmark">
    <Image src="/brand-mark.svg" width={52} height={60} alt="" className="brand-symbol" />
    <span className="brand-type"><span className="brand-name">{business.isDraft ? (locale === "en" ? "Walnut & Raisin" : "گردو و کشمش") : business.name[locale]}</span><span className="brand-signature">{locale === "en" ? "S A F F R O N" : "زعفران"}</span></span>
  </Link>;
}
