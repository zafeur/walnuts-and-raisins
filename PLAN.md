# Bilingual Walnut, Raisin, and Saffron Website

## Approved redesign revision

The user subsequently rejected the plain first design and asked to stop using Taste skills. The single-image zoom requirement below is superseded by three distinct, richly composed product scenes revealed through scrolling. The revised website uses a static layered hero with three photographs, large individual walnut/raisin/saffron chapters, Cormorant Garamond display typography for English, Vazirmatn for Farsi, and richer earth/olive/plum colour treatments. Products remain still; section entrance transitions respect reduced motion. Routes, bilingual content, contact-only sales, and draft business details remain as originally agreed.

The original implementation plan is retained below for context.

## Agreed scope

Build a responsive English/Farsi business site with Next.js, React, TypeScript, Tailwind CSS v4, and Motion. Apply the installed `design-taste-frontend` Taste skill. Serve retail and wholesale customers through product information and direct contact; no cart, payments, form backend, CMS, or database.

## Design

- Light background, readable dark text, and a single saffron-inspired accent.
- Self-hosted Outfit for English and Vazirmatn for Farsi.
- One large, representative still-life photograph of walnuts, raisins, and saffron. Depth comes from lighting, shadows, and composition.
- Desktop scroll zoom from 1 to 1.08 within a clipped frame. Products stay stationary in the photograph. No 3D models, rotation, independent movement, or scroll hijacking.
- Static image on mobile and under reduced-motion preferences.
- Headline and contact action outside the image layer.

## Pages and content

- `/` redirects to `/en`.
- `/en` and `/fa`: hero, product overview, business introduction, retail/wholesale guidance, and footer.
- `/en/contact` and `/fa/contact`: verified contact methods and useful enquiry guidance.
- Language switching preserves the current page. Persian has RTL layout, English has LTR layout, and phone/email remain LTR.
- Local content files hold translations, products, and business details.
- Localized titles, descriptions, canonical links, language alternates, robots settings, and sitemap.

## Draft defaults

Business identity, contact details, varieties, packaging, and sourcing information are pending. Label draft content clearly, omit unavailable contact methods, and invent no claims or testimonials. Generated photography represents the product categories, not verified stock. Keep the preview noindex until details and the real site origin are confirmed. Public deployment is separate.

## Acceptance

Check all four routes, root redirect, language switching, mobile navigation, RTL layout, image loading, reduced motion, desktop zoom bounds, keyboard access, focus, text contrast, mobile/tablet/desktop overflow, and metadata. Run production build, TypeScript, browser checks, and Lighthouse. Inspect desktop and mobile screenshots in both languages.
