import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { HeroImage, Reveal } from "@/components/hero-image";
import { business, content, isLocale } from "@/content/site";
import { design, sceneAlts, sceneImages } from "@/content/design";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) { const { locale } = await params; return isLocale(locale) ? pageMetadata(locale) : {}; }
export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = content[locale]; const d = design[locale];
  return <main id="main" tabIndex={-1}>
    <section className="hero shell" aria-labelledby="hero-title">
      <div className="hero-copy"><p className="eyebrow">{d.label}</p><h1 id="hero-title">{d.title}<em>{d.titleAccent}</em></h1><p className="hero-description">{d.intro}</p><Link href="#products" className="button">{d.explore}<span aria-hidden="true" className="direction-arrow">↗</span></Link><p className="hero-detail">{d.detail}</p></div>
      <HeroImage locale={locale} />
    </section>
    <nav className="ingredient-bar" aria-label={c.nav.products}>{c.products.items.map((p, i) => <Link href={`#${sceneImages[i]}`} key={p.name}><span>{p.name}</span><span className="ingredient-native" lang={locale === "en" ? "fa" : "en"}>{p.native}</span><span aria-hidden="true">↗</span></Link>)}</nav>
    <section id="products" className="collection" aria-labelledby="products-title">
      <Reveal className="collection-heading shell"><div><p className="eyebrow">{c.products.label}</p><h2 id="products-title" className="section-title whitespace-pre-line">{d.collection}</h2></div><p className="section-description">{d.collectionText}</p></Reveal>
      <div className="product-scenes">{c.products.items.map((p, i) => <article id={sceneImages[i]} key={p.name} className={`product-chapter chapter-${i}`}>
        <Reveal className="chapter-image"><Image src={`/images/${sceneImages[i]}.png`} alt={sceneAlts[locale][i]} fill sizes="(max-width: 767px) 100vw, 58vw" /></Reveal>
        <Reveal className="chapter-copy"><div className="chapter-meta"><span>{d.no[i]}</span><span lang={locale === "en" ? "fa" : "en"}>{p.native}</span></div><h3>{p.name}</h3><p className="chapter-detail">{p.detail}</p><p className="chapter-description">{p.description}</p><span className="chapter-use">{p.use}</span><Link href={`/${locale}/contact`} className="text-link">{d.inquire} {p.name}<span aria-hidden="true" className="direction-arrow">↗</span></Link></Reveal>
      </article>)}</div>
      <p className="product-note shell">{c.products.note}</p>
    </section>
    <section id="about" className="story-section" aria-labelledby="about-title"><div className="shell story-layout"><p className="eyebrow">{c.about.label}</p><Reveal><h2 id="about-title" className="section-title whitespace-pre-line">{d.storyTitle}</h2><p className="story-lead">{d.storyText}</p></Reveal><div className="story-business"><p>{c.about.text}</p>{business.isDraft && <p className="story-draft">{c.about.draft}</p>}</div></div></section>
    <section className="shell section-space enquiries" aria-labelledby="enquiry-title"><Reveal><p className="eyebrow">{c.nav.contact}</p><h2 id="enquiry-title" className="section-title whitespace-pre-line">{d.contactTitle}</h2><p className="enquiry-intro">{d.contactIntro}</p></Reveal><div className="enquiry-grid"><div><span className="enquiry-label">{d.retail}</span><h3>{c.enquiry.retail}</h3><p>{c.enquiry.retailText}</p></div><div><span className="enquiry-label">{d.wholesale}</span><h3>{c.enquiry.wholesale}</h3><p>{c.enquiry.wholesaleText}</p></div></div><Link href={`/${locale}/contact`} className="button">{c.hero.action}<span aria-hidden="true" className="direction-arrow">↗</span></Link></section>
  </main>;
}
