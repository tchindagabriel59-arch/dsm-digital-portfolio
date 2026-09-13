"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Instance globale : permet à n'importe quel composant de piloter le scroll. */
let lenisInstance: Lenis | null = null;

/** Scroll animé vers une ancre (#services…) avec repli natif. */
export function scrollToHash(hash: string) {
  const target = document.querySelector(hash);
  if (!target) return;

  if (lenisInstance) {
    lenisInstance.scrollTo(target as HTMLElement, {
      offset: -20,
      duration: 1.4,
    });
  } else {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export function lockScroll(locked: boolean) {
  if (locked) lenisInstance?.stop();
  else lenisInstance?.start();
  document.body.style.overflow = locked ? "hidden" : "";
}

/**
 * Smooth scroll global (Lenis).
 * Désactivé automatiquement si l'utilisateur préfère les animations réduites.
 */
export default function SmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      // Courbe "expo out" : démarrage vif, arrivée très douce
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.6,
      wheelMultiplier: 1,
    });
    lenisInstance = lenis;

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    // Interception des liens d'ancrage pour un défilement animé
    const onClick = (event: MouseEvent) => {
      const anchor = (event.target as HTMLElement | null)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const hash = anchor.getAttribute("href");
      if (!hash || hash === "#") return;
      const target = document.querySelector(hash);
      if (!target) return;
      event.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -20, duration: 1.4 });
      history.replaceState(null, "", hash);
    };

    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  return null;
}
