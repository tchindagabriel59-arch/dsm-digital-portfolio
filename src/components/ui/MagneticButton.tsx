"use client";

import {
  useRef,
  type MouseEvent,
  type ReactNode,
} from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Intensité de l'attraction magnétique (px max) */
  strength?: number;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "bare";
  target?: string;
  rel?: string;
  ariaLabel?: string;
  type?: "button" | "submit";
};

const BASE =
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full text-sm font-medium transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const VARIANTS: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "bg-accent px-7 py-3.5 text-white hover:bg-accent-soft shadow-[0_0_0_0_rgba(0,102,255,0.5)] hover:shadow-[0_10px_40px_-8px_rgba(0,102,255,0.65)]",
  ghost:
    "border border-line-strong bg-transparent px-7 py-3.5 text-bone hover:border-bone/40 hover:bg-white/[0.03]",
  bare: "",
};

/**
 * Bouton magnétique : le conteneur suit légèrement la souris,
 * le contenu suit avec une amplitude plus forte (effet de profondeur).
 */
export default function MagneticButton({
  children,
  className,
  strength = 18,
  href,
  onClick,
  variant = "primary",
  target,
  rel,
  ariaLabel,
  type = "button",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const handleMove = (event: MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    x.set((relX / (rect.width / 2)) * strength);
    y.set((relY / (rect.height / 2)) * (strength * 0.6));
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const content = (
    <>
      {/* Halo lumineux qui balaie le bouton au survol */}
      <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
      <span className="relative z-10 inline-flex items-center gap-2.5">
        {children}
      </span>
    </>
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="inline-flex"
    >
      {href ? (
        <a
          href={href}
          target={target}
          rel={rel}
          aria-label={ariaLabel}
          className={cn(BASE, VARIANTS[variant], className)}
        >
          {content}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          aria-label={ariaLabel}
          className={cn(BASE, VARIANTS[variant], className)}
        >
          {content}
        </button>
      )}
    </motion.div>
  );
}
