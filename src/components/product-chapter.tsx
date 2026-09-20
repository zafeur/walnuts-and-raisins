"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import { ActionArrow } from "@/components/action-arrow";
import { content, type Locale } from "@/content/site";
import { design, sceneAlts, sceneImages } from "@/content/design";

const easing = [0.22, 1, 0.36, 1] as const;
const copyVariants: Variants = {
  hidden: { opacity: 0, y: 42 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: easing } },
};

export function ProductChapter({
  locale,
  index,
}: {
  locale: Locale;
  index: number;
}) {
  const reduced = useReducedMotion();
  const imageFrame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: imageFrame, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  const product = content[locale].products.items[index];
  const d = design[locale];
  const child = reduced ? undefined : copyVariants;

  return (
    <motion.article
      id={sceneImages[index]}
      className={`product-chapter chapter-${index}`}
    >
      <div ref={imageFrame} className="chapter-image">
        <motion.div className="chapter-photo" style={reduced ? undefined : { y: imageY }}>
        <Image
          src={`/images/${sceneImages[index]}.png`}
          alt={sceneAlts[locale][index]}
          fill
          sizes="(max-width: 767px) 100vw, 58vw"
        />
        </motion.div>
      </div>
      <motion.div className="chapter-copy" initial={reduced ? false : "hidden"} whileInView="visible" viewport={{ once: false, amount: 0.25 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}>
        <motion.div className="chapter-meta reveal-part" variants={child}>
          <span>{d.no[index]}</span>
          <span lang={locale === "en" ? "fa" : "en"}>{product.native}</span>
        </motion.div>
        <motion.h3 className="reveal-part" variants={child}>
          {product.name}
        </motion.h3>
        <motion.p className="chapter-detail reveal-part" variants={child}>
          {product.detail}
        </motion.p>
        <motion.p className="chapter-description reveal-part" variants={child}>
          {product.description}
        </motion.p>
        <motion.span className="chapter-use reveal-part" variants={child}>
          {product.use}
        </motion.span>
        <motion.div className="reveal-part" variants={child}>
          <Link href={`/${locale}/contact`} className="text-link">
            {d.inquire} {product.name}
            <ActionArrow />
          </Link>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}
