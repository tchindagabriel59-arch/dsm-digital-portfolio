"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  active: boolean;
  onComplete: () => void;
};

/**
 * Écran de chargement d'introduction :
 * le monogramme DSM apparaît, la barre bleue se remplit, puis le voile
 * se rétracte vers le haut pour révéler le site.
 */
export default function Preloader({ active, onComplete }: Props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active) return;

    const start = performance.now();
    const DURATION = 1500;
    let frame = 0;

    const tick = (now: number) => {
      const elapsed = now - start;
      const linear = Math.min(1, elapsed / DURATION);
      // easeOutCubic pour une montée qui ralentit en fin de course
      const eased = 1 - Math.pow(1 - linear, 3);
      setProgress(Math.round(eased * 100));

      if (linear < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        window.setTimeout(onComplete, 420);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, onComplete]);

  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[200] flex flex-col justify-between bg-void px-6 py-8 md:px-12 md:py-12"
          initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Ligne de tête */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="flex items-center justify-between font-mono text-[10px] tracking-[0.22em] text-ash-dim uppercase"
          >
            <span>Agence digitale</span>
            <span>Est. 2024</span>
          </motion.div>

          {/* Monogramme centré */}
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-lg">
              <div className="flex items-end justify-between">
                <motion.span
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="display text-[clamp(3.5rem,12vw,7rem)] text-bone"
                >
                  DSM
                  <span className="text-accent">.</span>
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="pb-3 font-mono text-xs tabular-nums text-ash"
                >
                  {String(progress).padStart(3, "0")}
                </motion.span>
              </div>

              {/* Barre de progression bleue */}
              <div className="mt-5 h-px w-full overflow-hidden bg-line">
                <div
                  className="h-full bg-accent shadow-[0_0_14px_rgba(0,102,255,0.9)]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-5 font-mono text-[10px] tracking-[0.22em] text-ash-dim uppercase"
              >
                Web — SEO — Ads — Social
              </motion.p>
            </div>
          </div>

          <div className="h-4" />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
