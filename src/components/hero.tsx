"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ActionArrow } from "@/components/action-arrow";
import { SectionLink } from "@/components/section-link";
import { content, type Locale } from "@/content/site";
import { design, heroSceneAlts, sceneImages } from "@/content/design";

export function Hero({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const section = useRef<HTMLElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: section,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const d = design[locale];
  const products = content[locale].products.items;
  useEffect(() => {
    if (reduced) return;
    const timer = window.setTimeout(() => setSelected(current => (current + 1) % sceneImages.length), 5000);
    return () => window.clearTimeout(timer);
  }, [selected, reduced]);

  return (
    <section ref={section} className="hero" aria-labelledby="hero-title">
      <div className="hero-backgrounds">
        {sceneImages.map((name, i) => (
          <motion.div
            key={name}
            id={`scene-panel-${name}`}
            role="tabpanel"
            aria-labelledby={`scene-tab-${name}`}
            aria-hidden={selected !== i}
            className="hero-backdrop"
            initial={false}
            animate={{ opacity: selected === i ? 1 : 0 }}
            transition={{ duration: reduced ? 0 : 0.75, ease: "easeInOut" }}
          >
            <Image
              src={`/images/hero-${name}.png`}
              alt={heroSceneAlts[locale][i]}
              fill
              priority={i === 0}
              loading="eager"
              fetchPriority={i === 0 ? "high" : "auto"}
              sizes="100vw"
              quality={85}
            />
          </motion.div>
        ))}
      </div>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-inner shell">
        <motion.div className="hero-copy" style={{ y: reduced || mobile ? 0 : textY }}>
          <p className="eyebrow">
            {locale === "en"
              ? "ZARCHIN · THE GOLDEN SELECTION"
              : "زرچین؛ انتخابی از جنس طلا"}
          </p>
          <h1 id="hero-title">
            {d.title}
            <em>{d.titleAccent}</em>
          </h1>
          <p className="hero-description">{d.intro}</p>
          <SectionLink locale={locale} section="products" className="button">
            {d.explore}
            <ActionArrow />
          </SectionLink>
          <p className="hero-detail">{d.detail}</p>
        </motion.div>
        <div
          className="hero-controls"
          role="tablist"
          aria-orientation={mobile ? "horizontal" : "vertical"}
          aria-label={
            locale === "en" ? "Choose a product scene" : "انتخاب تصویر محصول"
          }
        >
          {products.map((product, i) => (
            <button
              key={product.name}
              ref={(el) => {
                buttons.current[i] = el;
              }}
              id={`scene-tab-${sceneImages[i]}`}
              role="tab"
              aria-selected={selected === i}
              aria-controls={`scene-panel-${sceneImages[i]}`}
              tabIndex={selected === i ? 0 : -1}
              onClick={() => setSelected(i)}
              onKeyDown={(event) => {
                let next = selected;
                if (
                  event.key === "ArrowDown" || event.key === (locale === "fa" ? "ArrowLeft" : "ArrowRight")
                )
                  next = (i + 1) % 3;
                else if (
                  event.key === "ArrowUp" || event.key === (locale === "fa" ? "ArrowRight" : "ArrowLeft")
                )
                  next = (i + 2) % 3;
                else if (event.key === "Home") next = 0;
                else if (event.key === "End") next = 2;
                else return;
                event.preventDefault();
                setSelected(next);
                buttons.current[next]?.focus();
              }}
            >
              <span className="hero-control-number">{d.no[i]}</span>
              <span className="hero-control-copy">
                <span>{product.name}</span>
                <small>{product.detail}</small>
              </span>
              <ArrowUpRight size={19} aria-hidden="true" />
              <span className="hero-control-line" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
