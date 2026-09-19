# Walnut, raisin & saffron

A local-only, bilingual business website built with Next.js App Router, React, TypeScript, Tailwind CSS v4, and Motion. The revised editorial design replaces the original Taste-skill direction at the user's request: layered imagery in the hero, three separate scroll-revealed product chapters, earthy colour treatments, and expressive typography.

## Run

Requires Node.js 20.9 or later.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. `/` redirects to English. Routes: `/en`, `/fa`, `/en/contact`, `/fa/contact`.

```sh
npm run build
npm start
npm run typecheck
npm run test:e2e
```

Browser tests expect a running local server and Microsoft Edge. Configure `TEST_BASE_URL` for another port or edit `playwright.config.ts` to use another installed Chromium browser. Captures are written to `artifacts/`.

## Business content

Edit `src/content/site.ts` for both languages and the `business` object. The current descriptive wordmark and `w.` favicon are draft identity, not a supplied business name or logo. Supply the real name, phone, email, address, and optional WhatsApp/Instagram links. WhatsApp uses international digits without spaces or `+`; Instagram requires a full HTTPS URL. Empty contact methods are omitted. No fake submission or checkout exists.

Confirm product varieties, packaging, delivery terms, business story, and sourcing before adding claims. Have a fluent Persian speaker approve final copy and real brand terminology.

## Before public launch

1. Replace draft identity and verify contact details in both languages.
2. Review representative imagery against actual products; replace if necessary.
3. Set `business.isDraft` to `false` after review.
4. Set `SITE_URL` to the real HTTPS origin and rebuild for canonical URLs and sitemap. Local/draft builds are intentionally noindex.
5. Deploy separately; this task does not publish the site.

## Assets and behavior

`public/images/walnuts.png`, `raisins.png`, and `saffron.png` are the new representative product scenes. Provenance and prompts are in `ASSETS.md`. The original `still-life.png` is retained but no longer displayed. Images use Next Image with responsive sizing. Cormorant Garamond, Outfit, and Vazirmatn are installed through Fontsource and bundled locally by `next/font/local`; no runtime font CDN is required. Font licenses are included in the corresponding npm packages.

The hero is a static composition of three separate image windows. Each product gets its own large image and copy chapter. Chapters reveal once on entering the viewport, using opacity and a 24px vertical transition; reduced-motion preferences disable these transitions. There is no image zoom, product rotation, scroll hijacking, WebGL, or 3D model.

## Verification

The browser suite covers localized routes and metadata, root redirect, invalid locale, image loading, missing contact details, language switching on contact, mobile menu/Escape focus, responsive overflow, product-scene navigation, and reduced motion. Final screenshots are under `artifacts/`; see `artifacts/QA.md` for the outcome. The original Lighthouse JSON predates the redesign and does not describe the current design.
