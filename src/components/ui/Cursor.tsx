"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Curseur personnalisé : un point net + un anneau à ressort.
 * - grossit au survol des éléments interactifs
 * - affiche un libellé si l'élément expose `data-cursor-label`
 * - totalement désactivé sur tactile / animations réduites
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Le point suit vite, l'anneau traîne légèrement : effet "élastique"
  const dotX = useSpring(x, { stiffness: 1500, damping: 80, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 1500, damping: 80, mass: 0.2 });
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    if (!fine || reduced) return;

    // Activation décalée d'une frame (évite un rendu en cascade au montage)
    const frame = requestAnimationFrame(() => setEnabled(true));
    document.documentElement.classList.add("has-custom-cursor");

    const INTERACTIVE =
      'a, button, [role="button"], input, textarea, select, [data-cursor]';

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
    };

    const onOver = (event: MouseEvent) => {
      const el = (event.target as HTMLElement | null)?.closest?.(
        INTERACTIVE,
      ) as HTMLElement | null;
      setHovering(Boolean(el));
      setLabel(el?.dataset.cursorLabel ?? null);
    };

    const onLeave = () => setVisible(false);
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);

    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize = label ? 76 : hovering ? 52 : 30;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[120] hidden lg:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity .25s" }}
    >
      {/* Anneau */}
      <motion.div
        className="absolute top-0 left-0 flex items-center justify-center rounded-full border backdrop-blur-[1px]"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderColor: hovering ? "#0066FF" : "#3a3a3a",
          backgroundColor: hovering
            ? "rgba(0,102,255,0.10)"
            : "rgba(255,255,255,0)",
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          scale: pressed ? 0.85 : 1,
        }}
        transition={{ type: "spring", stiffness: 340, damping: 26 }}
      >
        {label ? (
          <span className="font-sans text-[10px] font-medium tracking-[0.14em] text-bone uppercase">
            {label}
          </span>
        ) : null}
      </motion.div>

      {/* Point central */}
      <motion.div
        className="absolute top-0 left-0 rounded-full bg-bone"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: hovering ? 0 : 5,
          height: hovering ? 0 : 5,
          opacity: hovering ? 0 : 1,
        }}
        transition={{ duration: 0.18 }}
      />
    </div>
  );
}
