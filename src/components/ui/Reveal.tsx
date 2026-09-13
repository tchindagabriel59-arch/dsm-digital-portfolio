"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  /** Délai avant démarrage (s) */
  delay?: number;
  /** Décalage vertical initial (px) */
  y?: number;
  className?: string;
  once?: boolean;
};

/**
 * Apparition au scroll : translation verticale + fondu, courbe expo-out.
 * Utilisé partout pour garder un rythme d'animation cohérent.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
}: Props) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
