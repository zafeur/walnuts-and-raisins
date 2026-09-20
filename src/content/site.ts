export const locales = ["en", "fa"] as const;
export type Locale = (typeof locales)[number];
export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

// Supply verified business details here before launch. Empty methods are omitted.
export const business = {
  name: { en: "Zarchin", fa: "زرچین" },
  isDraft: true,
  phone: "",
  email: "",
  whatsapp: "", // International digits only, without + or spaces.
  instagram: "", // Full HTTPS profile URL.
  address: { en: "", fa: "" },
};

export const content = {
  en: {
    nav: {
      products: "Our products",
      about: "About us",
      contact: "Contact us",
      home: "Home",
      menu: "Menu",
      close: "Close menu",
      skip: "Skip to content",
    },
    draft: "Zarchin design preview · Business contact details to be confirmed.",
    hero: {
      eyebrow: "Walnuts, raisins & saffron",
      title: "Simple ingredients. Rich possibilities.",
      description:
        "For your kitchen, your shop, and everything you bring to the table.",
      action: "Get in touch",
      imageAlt:
        "Walnuts in a ceramic bowl, golden and dark raisins, and saffron threads arranged on a sunlit stone surface.",
    },
    products: {
      label: "Our products",
      title: "Three ingredients. A world of flavour.",
      description:
        "Everyday favourites and a little something special. Explore the collection and ask us about your order.",
      items: [
        {
          name: "Walnuts",
          native: "گردو",
          detail: "Rich, earthy, versatile.",
          description:
            "A satisfying crunch for baking, sharing, and everyday cooking.",
          use: "For the kitchen & the table",
        },
        {
          name: "Raisins",
          native: "کشمش",
          detail: "A little natural sweetness.",
          description:
            "Enjoy by the handful, fold into a bake, or add to your favourite rice dish.",
          use: "For snacking & baking",
        },
        {
          name: "Saffron",
          native: "زعفران",
          detail: "Small threads. Distinctive flavour.",
          description:
            "Bring colour and a delicate aroma to rice, tea, and dishes worth taking your time over.",
          use: "For a finishing touch",
        },
      ],
      note: "Ask about current varieties, quantities, and packaging.",
    },
    about: {
      label: "About us",
      title: "Good food starts with simple things.",
      text: "We sell walnuts, raisins, and saffron to individuals and businesses. Whether you are stocking your pantry or your shelves, your enquiry starts with a conversation.",
      draft:
        "Our business story and sourcing details will be added before launch.",
    },
    enquiry: {
      title: "For your pantry. For your business.",
      retail: "Buying for yourself?",
      retailText:
        "Tell us which products you have in mind and the quantity you need. Ask about available packaging and delivery.",
      wholesale: "Buying for your business?",
      wholesaleText:
        "Share your product requirements, order volume, and destination so we can discuss your enquiry.",
      action: "Let’s talk",
    },
    footer: {
      text: "Walnuts, raisins, and saffron.\nFor everyday use and business orders.",
      copyright: "Walnut, raisin & saffron",
      preview:
        "Preview only. Representative imagery; business details pending.",
    },
    contact: {
      eyebrow: "Contact us",
      title: "A good place to start.",
      description:
        "A small order or a business enquiry. Tell us what you are looking for.",
      details: "Talk to us directly",
      unavailable: "Contact details coming soon",
      unavailableText:
        "This is a design preview. Verified business contact details will be added before the site launches.",
      phone: "Call us",
      email: "Email us",
      whatsapp: "WhatsApp",
      instagram: "Instagram",
      address: "Visit us",
      prepare: "What to include in your enquiry",
      list: [
        "The products you are interested in",
        "The quantity and packaging you need",
        "Your delivery location and preferred timing",
      ],
      back: "Explore our products",
    },
    seo: {
      title: "Walnuts, Raisins & Saffron | Retail & Wholesale",
      description:
        "Explore walnuts, raisins, and saffron for your kitchen or business. Get in touch for retail and wholesale enquiries.",
      contactTitle: "Contact Us | Walnuts, Raisins & Saffron",
      contactDescription:
        "Contact us about walnuts, raisins, and saffron, including quantities, packaging, and retail or wholesale orders.",
    },
  },
  fa: {
    nav: {
      products: "محصولات ما",
      about: "درباره ما",
      contact: "تماس با ما",
      home: "خانه",
      menu: "منو",
      close: "بستن منو",
      skip: "رفتن به محتوای اصلی",
    },
    draft: "پیش‌نمایش زرچین · اطلاعات تماس هنوز نهایی نشده‌اند.",
    hero: {
      eyebrow: "گردو، کشمش و زعفران",
      title: "مواد ساده، طعم‌های ماندگار",
      description: "برای آشپزخانه، فروشگاه و هر آنچه به سفره می‌آورید.",
      action: "با ما در تماس باشید",
      imageAlt:
        "گردو در کاسه سرامیکی، کشمش طلایی و تیره و رشته‌های زعفران روی سطح سنگی در نور آفتاب.",
    },
    products: {
      label: "محصولات ما",
      title: "سه محصول، دنیایی از طعم",
      description:
        "از طعم‌های آشنای هر روز تا عطر خوش زعفران. محصولات را ببینید و درباره سفارش خود با ما صحبت کنید.",
      items: [
        {
          name: "گردو",
          native: "Walnuts",
          detail: "طعمی غنی، کاربردی همیشگی",
          description: "برای پخت‌وپز، شیرینی‌پزی و لذت یک میان‌وعده ساده.",
          use: "برای آشپزخانه و سفره",
        },
        {
          name: "کشمش",
          native: "Raisins",
          detail: "شیرینی دلنشین طبیعت",
          description:
            "برای میان‌وعده، شیرینی خانگی یا همراهی با برنج و غذاهای محبوب شما.",
          use: "برای میان‌وعده و شیرینی‌پزی",
        },
        {
          name: "زعفران",
          native: "Saffron",
          detail: "رشته‌هایی ظریف، طعمی متمایز",
          description:
            "رنگ و عطری لطیف برای برنج، چای و غذاهایی که با حوصله آماده می‌کنید.",
          use: "برای عطر و رنگی دلپذیر",
        },
      ],
      note: "درباره انواع موجود، مقدار سفارش و بسته‌بندی از ما بپرسید.",
    },
    about: {
      label: "درباره ما",
      title: "طعم خوب از سادگی آغاز می‌شود.",
      text: "ما گردو، کشمش و زعفران را به مشتریان خانگی و کسب‌وکارها عرضه می‌کنیم. برای خرید خانه یا تأمین محصولات فروشگاه، از یک گفت‌وگو شروع کنیم.",
      draft:
        "داستان کسب‌وکار و جزئیات تأمین محصولات پیش از انتشار نهایی اضافه می‌شود.",
    },
    enquiry: {
      title: "برای خانه شما، برای کسب‌وکار شما",
      retail: "برای مصرف شخصی خرید می‌کنید؟",
      retailText:
        "محصول و مقدار مورد نیازتان را با ما در میان بگذارید. درباره بسته‌بندی موجود و ارسال از ما بپرسید.",
      wholesale: "برای کسب‌وکارتان خرید می‌کنید؟",
      wholesaleText:
        "نوع محصول، حجم سفارش و مقصد را با ما در میان بگذارید تا درباره نیاز شما صحبت کنیم.",
      action: "با هم صحبت کنیم",
    },
    footer: {
      text: "گردو، کشمش و زعفران\nبرای مصرف روزانه و سفارش‌های عمده",
      copyright: "گردو، کشمش و زعفران",
      preview:
        "صرفاً پیش‌نمایش. تصویر نمونه است و اطلاعات کسب‌وکار هنوز نهایی نشده‌اند.",
    },
    contact: {
      eyebrow: "تماس با ما",
      title: "شروع یک گفت‌وگوی خوب",
      description: "برای خرید شخصی یا سفارش عمده، بگویید به دنبال چه هستید.",
      details: "مستقیم با ما در تماس باشید",
      unavailable: "اطلاعات تماس به‌زودی اضافه می‌شود",
      unavailableText:
        "این سایت پیش‌نمایش طرح است. اطلاعات تأییدشده تماس پیش از انتشار نهایی اضافه خواهد شد.",
      phone: "تماس تلفنی",
      email: "ایمیل",
      whatsapp: "واتس‌اپ",
      instagram: "اینستاگرام",
      address: "نشانی ما",
      prepare: "در پیام خود چه بنویسید؟",
      list: [
        "محصولات مورد نظرتان",
        "مقدار سفارش و بسته‌بندی مورد نیاز",
        "مقصد ارسال و زمان مورد نظرتان",
      ],
      back: "مشاهده محصولات",
    },
    seo: {
      title: "گردو، کشمش و زعفران | فروش خرد و عمده",
      description:
        "گردو، کشمش و زعفران برای خانه یا کسب‌وکار شما. برای خرید خرد و عمده با ما در تماس باشید.",
      contactTitle: "تماس با ما | گردو، کشمش و زعفران",
      contactDescription:
        "برای اطلاع از مقدار سفارش، بسته‌بندی و خرید خرد و عمده گردو، کشمش و زعفران با ما تماس بگیرید.",
    },
  },
};
