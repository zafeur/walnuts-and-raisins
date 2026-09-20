import { ContactForm } from "@/components/contact-form";
import { ActionArrow } from "@/components/action-arrow";
import Image from "next/image";
import { notFound } from "next/navigation";
import { business, content, isLocale } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { sceneAlts } from "@/content/design";
import { SectionLink } from "@/components/section-link";

type Props = { params: Promise<{ locale: string }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return isLocale(locale) ? pageMetadata(locale, true) : {};
}
export default async function Contact({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = content[locale];
  const methods = [
    {
      label: c.contact.phone,
      value: business.phone,
      href: `tel:${business.phone.replace(/[^+\d]/g, "")}`,
    },
    {
      label: c.contact.email,
      value: business.email,
      href: `mailto:${business.email}`,
    },
    {
      label: c.contact.whatsapp,
      value: business.whatsapp,
      href: `https://wa.me/${business.whatsapp}`,
    },
    {
      label: c.contact.instagram,
      value: business.instagram,
      href: business.instagram,
    },
  ].filter((method) => method.value);
  return (
    <main id="main" tabIndex={-1} className="shell contact-main">
      <div className="contact-heading">
        <p className="eyebrow">{c.contact.eyebrow}</p>
        <h1>{c.contact.title}</h1>
        <p className="section-description">{c.contact.description}</p>
      </div>
      <div className="contact-grid">
        <div className="contact-content">
          <ContactForm locale={locale} />
          {methods.length > 0 && <h2>{c.contact.details}</h2>}
          {methods.length ? (
            <dl className="contact-methods">
              {methods.map((method) => (
                <div key={method.label}>
                  <dt>{method.label}</dt>
                  <dd>
                    <a href={method.href} dir="ltr">
                      {method.value}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
          {business.address[locale] && (
            <div className="mt-8">
              <h3>{c.contact.address}</h3>
              <address className="not-italic mt-2">
                {business.address[locale]}
              </address>
            </div>
          )}
          <div className="enquiry-checklist">
            <h3>{c.contact.prepare}</h3>
            <ul>
              {c.contact.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <SectionLink locale={locale} section="products" className="text-link">
            {c.contact.back}
            <ActionArrow />
          </SectionLink>
        </div>
        <div className="contact-image">
          <Image
            src="/images/raisins.png"
            fill
            priority
            alt={sceneAlts[locale][1]}
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    </main>
  );
}
