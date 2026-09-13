"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Fine ligne bleue de progression de lecture, fixée en haut de page. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 z-[110] h-px w-full origin-left bg-gradient-to-r from-accent via-accent-soft to-accent shadow-[0_0_12px_rgba(0,102,255,0.8)]"
    />
  );
}
