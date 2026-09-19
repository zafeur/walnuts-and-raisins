"use client";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { useRef, useState } from "react";
import type { Locale } from "@/content/site";
import { sceneImages, sceneAlts } from "@/content/design";
export function HeroImage({ locale }: { locale: Locale }) {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const names = locale === "en" ? ["Walnuts", "Raisins", "Saffron"] : ["گردو", "کشمش", "زعفران"];
  return <div className="hero-showcase">
    <div className="showcase-image-area">
      {sceneImages.map((name, i) => <div key={name} id={`scene-panel-${name}`} role="tabpanel" aria-labelledby={`scene-tab-${name}`} hidden={selected !== i} className="showcase-panel">
        <Image src={`/images/${name}.png`} alt={sceneAlts[locale][i]} fill priority={i === 0} fetchPriority={i === 0 ? "high" : "auto"} sizes="(max-width: 767px) 100vw, 50vw" />
      </div>)}
      <span className="showcase-count" aria-hidden="true">{locale === "en" ? `0${selected + 1} / 03` : ["۰۱ / ۰۳", "۰۲ / ۰۳", "۰۳ / ۰۳"][selected]}</span>
    </div>
    <div className="showcase-selectors" role="tablist" aria-label={locale === "en" ? "Choose a product scene" : "انتخاب تصویر محصول"}>
      {names.map((name, i) => <button key={name} ref={el => { buttons.current[i] = el; }} id={`scene-tab-${sceneImages[i]}`} role="tab" aria-selected={selected === i} aria-controls={`scene-panel-${sceneImages[i]}`} tabIndex={selected === i ? 0 : -1} onClick={() => setSelected(i)} onKeyDown={event => {
        let next = selected;
        const forward = locale === "fa" ? "ArrowLeft" : "ArrowRight";
        const backward = locale === "fa" ? "ArrowRight" : "ArrowLeft";
        if (event.key === forward) next = (i + 1) % 3;
        else if (event.key === backward) next = (i + 2) % 3;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = 2;
        else return;
        event.preventDefault(); setSelected(next); buttons.current[next]?.focus();
      }}><span className="selector-number" aria-hidden="true">{locale === "en" ? `0${i + 1}` : ["۰۱", "۰۲", "۰۳"][i]}</span>{name}<span className="selector-indicator" aria-hidden="true">↗</span></button>)}
    </div>
  </div>;
}
export function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <motion.div data-testid="scene-reveal" className={className} initial={false} whileInView={reduced ? {} : { opacity: [.65, 1], y: [24, 0] }} viewport={{ once: true, amount: .12 }} transition={{ duration: .8, ease: [.22, 1, .36, 1] }}>{children}</motion.div>;
}
