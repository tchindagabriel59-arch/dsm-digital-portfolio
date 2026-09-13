"use client";

import { createElement } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  /** Mots à mettre en bleu signature (comparaison insensible à la ponctuation) */
  accent?: string[];
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  /** Durée du décalage entre chaque mot */
  stagger?: number;
};

const normalize = (word: string) =>
  word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

/**
 * Révélation typographique mot par mot :
 * chaque mot est masqué par un conteneur `overflow-hidden` puis remonte.
 */
export default function TextReveal({
  text,
  accent = [],
  className,
  as = "h2",
  delay = 0,
  stagger = 0.045,
}: Props) {
  const words = text.split(" ");
  const accents = accent.map(normalize);

  return createElement(
    as,
    { className: cn("flex flex-wrap", className) },
    words.map((word, index) => (
      <span
        key={`${word}-${index}`}
        className="relative inline-block overflow-hidden pb-[0.12em] align-bottom"
      >
        <motion.span
          className={cn(
            "inline-block whitespace-pre",
            accents.includes(normalize(word)) ? "text-accent" : undefined,
          )}
          initial={{ y: "110%" }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{
            duration: 0.95,
            delay: delay + index * stagger,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
          {index < words.length - 1 ? "\u00A0" : ""}
        </motion.span>
      </span>
    )),
  );
}
