import Link from "next/link";
import { ActionArrow } from "@/components/action-arrow";
import { ProductChapter } from "@/components/product-chapter";
import { notFound } from "next/navigation";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { content, isLocale } from "@/content/site";
import { design } from "@/content/design";
import { pageMetadata } from "@/lib/metadata";
type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale) : {};
}
export default async function Home({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = content[locale];
  const d = design[locale];
  return (
    <main id="main" tabIndex={-1}>
      <Hero locale={locale} />
      <section
        id="products"
        className="collection"
        aria-labelledby="products-title"
      >
        <Reveal className="collection-heading shell">
          <div>
            <p className="eyebrow">{c.products.label}</p>
            <h2
              id="products-title"
              className="section-title whitespace-pre-line"
            >
              {d.collection}
            </h2>
          </div>
          <p className="section-description">{d.collectionText}</p>
        </Reveal>
        <div className="product-scenes">
          {c.products.items.map((product, index) => (
            <ProductChapter key={product.name} locale={locale} index={index} />
          ))}
        </div>
        <p className="product-note shell">{c.products.note}</p>
      </section>
      <section
        id="about"
        className="story-section"
        aria-labelledby="about-title"
      >
        <div className="shell story-layout">
          <p className="eyebrow">{c.about.label}</p>
          <Reveal>
            <h2 id="about-title" className="section-title whitespace-pre-line">
              {d.storyTitle}
            </h2>
            <p className="story-lead">{d.storyText}</p>
          </Reveal>
          <div className="story-business">
            <p>{c.about.text}</p>
          </div>
        </div>
      </section>
      <section
        className="shell section-space enquiries"
        aria-labelledby="enquiry-title"
      >
        <Reveal>
          <p className="eyebrow">{c.nav.contact}</p>
          <h2 id="enquiry-title" className="section-title whitespace-pre-line">
            {d.contactTitle}
          </h2>
          <p className="enquiry-intro">{d.contactIntro}</p>
        </Reveal>
        <div className="enquiry-grid">
          <div>
            <span className="enquiry-label">{d.retail}</span>
            <h3>{c.enquiry.retail}</h3>
            <p>{c.enquiry.retailText}</p>
          </div>
          <div>
            <span className="enquiry-label">{d.wholesale}</span>
            <h3>{c.enquiry.wholesale}</h3>
            <p>{c.enquiry.wholesaleText}</p>
          </div>
        </div>
        <Link href={`/${locale}/contact`} className="button">
          {c.hero.action}
          <ActionArrow />
        </Link>
      </section>
    </main>
  );
}
