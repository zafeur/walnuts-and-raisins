import { expect, test } from "@playwright/test";

test("English entry, localized routes, metadata, and contact switching", async ({ page, request }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
  for (const locale of ["en", "fa"]) {
    for (const suffix of ["", "/contact"]) {
      const response = await page.goto(`/${locale}${suffix}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute("dir", locale === "fa" ? "rtl" : "ltr");
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", `http://localhost:3000/${locale}${suffix}`);
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
      for (const image of await page.locator("main img").all()) {
        await image.scrollIntoViewIfNeeded();
        await expect(image).toBeVisible();
        await expect.poll(() => image.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0);
      }
    }
  }
  await page.goto("/en/contact");
  await page.getByRole("link", { name: "Switch to Farsi" }).click();
  await expect(page).toHaveURL(/\/fa\/contact$/);
  await page.getByRole("link", { name: "Switch to English" }).click();
  await expect(page).toHaveURL(/\/en\/contact$/);
  await expect(page.getByText("Contact details coming soon").first()).toBeVisible();
  expect(await page.locator('a[href^="tel:"],a[href^="mailto:"],form').count()).toBe(0);
  expect(errors).toEqual([]);
  expect((await request.get("/de")).status()).toBe(404);
  expect(await (await request.get("/sitemap.xml")).text()).toContain("/fa/contact");
});

test("mobile navigation, RTL layout, and no overflow at narrow widths", async ({ page }) => {
  for (const width of [360, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const locale of ["en", "fa"]) {
      for (const suffix of ["", "/contact"]) {
        await page.goto(`/${locale}${suffix}`);
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
      }
    }
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/en");
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(page.locator("#mobile-menu")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
  await expect(page.locator("#menu-toggle")).toBeFocused();
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await page.locator("#mobile-menu").getByRole("link", { name: "Contact us" }).click();
  await expect(page).toHaveURL(/\/en\/contact$/);
  await expect(page.locator("#mobile-menu")).toHaveCount(0);
});

test("separate product scenes are navigable and reduced motion stays static", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/en");
  await expect(page.locator(".hero-composition img")).toHaveCount(3);
  for (const name of ["walnuts", "raisins", "saffron"]) {
    await page.locator(`.ingredient-bar a[href="#${name}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${name}$`));
    await expect(page.locator(`#${name} h3`)).toBeInViewport();
    await expect(page.locator(`#${name} img`)).toHaveAttribute("src", new RegExp(name));
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const scene of await page.getByTestId("scene-reveal").all()) {
    await expect(scene).toHaveCSS("transform", "none");
    await expect(scene).toHaveCSS("opacity", "1");
  }
  await expect(page.getByTestId("hero-zoom")).toHaveCount(0);
});

test("visual review captures", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const locale of ["en", "fa"]) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`/${locale}`);
    await page.evaluate(() => document.fonts.ready);
    for (const img of await page.locator("main img").all()) { await img.scrollIntoViewIfNeeded(); await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.naturalWidth)).toBeGreaterThan(0); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({ path: `artifacts/${locale}-desktop.png`, fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: `artifacts/${locale}-mobile.png`, fullPage: true });
    await page.goto(`/${locale}/contact`);
    await page.screenshot({ path: `artifacts/${locale}-contact-mobile.png`, fullPage: true });
  }
});
