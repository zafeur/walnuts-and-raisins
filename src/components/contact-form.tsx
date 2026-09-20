"use client";

import type { Locale } from "@/content/site";
import { ActionArrow } from "@/components/action-arrow";

const copy = {
  en: {
    title: "Tell us what you have in mind",
    name: "Your name",
    email: "Email address",
    phone: "Phone number (optional)",
    company: "Company (optional)",
    type: "Enquiry type",
    retail: "Personal order",
    wholesale: "Wholesale enquiry",
    other: "Something else",
    product: "Product of interest",
    choose: "Select a product",
    walnuts: "Walnuts",
    raisins: "Raisins",
    saffron: "Saffron",
    several: "Several products",
    message: "Your message",
    placeholder:
      "Tell us about quantities, packaging, delivery destination, or anything else you need.",
    send: "Send enquiry",
    note: "This form is a preview. Sending is not available yet.",
  },
  fa: {
    title: "از نیازتان برای ما بنویسید",
    name: "نام شما",
    email: "نشانی ایمیل",
    phone: "شماره تماس (اختیاری)",
    company: "نام شرکت (اختیاری)",
    type: "نوع درخواست",
    retail: "خرید شخصی",
    wholesale: "خرید عمده",
    other: "سایر موارد",
    product: "محصول مورد نظر",
    choose: "یک محصول انتخاب کنید",
    walnuts: "گردو",
    raisins: "کشمش",
    saffron: "زعفران",
    several: "چند محصول",
    message: "پیام شما",
    placeholder:
      "درباره مقدار سفارش، بسته‌بندی، مقصد ارسال یا سایر نیازهایتان بنویسید.",
    send: "ارسال درخواست",
    note: "این فرم پیش‌نمایش است. ارسال پیام هنوز فعال نیست.",
  },
};

export function ContactForm({ locale }: { locale: Locale }) {
  const c = copy[locale];
  return (
    <form
      className="contact-form"
      aria-labelledby="enquiry-title"
      aria-describedby="enquiry-note"
      onSubmit={(event) => event.preventDefault()}
    >
      <h2 id="enquiry-title">{c.title}</h2>
      <div className="contact-fields">
        <label htmlFor="contact-name">
          {c.name}
          <input id="contact-name" name="name" autoComplete="name" required />
        </label>
        <label htmlFor="contact-email">
          {c.email}
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            dir="ltr"
            required
          />
        </label>
        <label htmlFor="contact-phone">
          {c.phone}
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            dir="ltr"
          />
        </label>
        <label htmlFor="contact-company">
          {c.company}
          <input
            id="contact-company"
            name="company"
            autoComplete="organization"
          />
        </label>
        <label htmlFor="contact-type">
          {c.type}
          <select id="contact-type" name="enquiryType" defaultValue="retail">
            <option value="retail">{c.retail}</option>
            <option value="wholesale">{c.wholesale}</option>
            <option value="other">{c.other}</option>
          </select>
        </label>
        <label htmlFor="contact-product">
          {c.product}
          <select id="contact-product" name="product" defaultValue="">
            <option value="">{c.choose}</option>
            <option value="walnuts">{c.walnuts}</option>
            <option value="raisins">{c.raisins}</option>
            <option value="saffron">{c.saffron}</option>
            <option value="several">{c.several}</option>
          </select>
        </label>
        <label className="contact-message" htmlFor="contact-message">
          {c.message}
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            placeholder={c.placeholder}
            required
          />
        </label>
      </div>
      <p id="enquiry-note" className="contact-form-note">
        {c.note}
      </p>
      <button
        className="button contact-submit"
        type="submit"
        disabled
        aria-describedby="enquiry-note"
      >
        {c.send}
        <ActionArrow />
      </button>
    </form>
  );
}
