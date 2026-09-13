"use client";

import { useEffect, useState } from "react";

/**
 * Compteur animé (easeOutExpo) déclenché par un booléen.
 * Respecte `prefers-reduced-motion` en affichant directement la valeur finale.
 */
export function useCountUp(target: number, start: boolean, duration = 1900) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    if (reduced) {
      const immediate = requestAnimationFrame(() => setValue(target));
      return () => cancelAnimationFrame(immediate);
    }

    let frame = 0;
    const startedAt = performance.now();

    const tick = (now: number) => {
      const linear = Math.min(1, (now - startedAt) / duration);
      const eased = linear === 1 ? 1 : 1 - Math.pow(2, -10 * linear);
      setValue(Math.round(eased * target));
      if (linear < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start, duration]);

  return value;
}
