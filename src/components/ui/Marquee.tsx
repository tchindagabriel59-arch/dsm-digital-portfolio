"use client";

import { Fragment } from "react";
import { cn } from "@/lib/utils";

type Props = {
  items: readonly string[];
  className?: string;
  /** Vitesse lente pour les bandeaux secondaires */
  slow?: boolean;
};

/**
 * Bandeau défilant infini (pur CSS : aucune charge JS au scroll).
 * Le contenu est dupliqué et translaté de -50% en boucle.
 */
export default function Marquee({ items, className, slow = false }: Props) {
  const track = (
    <div className="flex shrink-0 items-center">
      {items.map((item, index) => (
        <Fragment key={`${item}-${index}`}>
          <span className="px-6 font-display text-sm font-medium tracking-[0.18em] whitespace-nowrap text-ash uppercase md:px-9 md:text-base">
            {item}
          </span>
          <span aria-hidden className="text-accent">
            /
          </span>
        </Fragment>
      ))}
    </div>
  );

  return (
    <div
      className={cn("mask-fade-x group relative overflow-hidden", className)}
    >
      <div
        className={cn(
          "flex w-max",
          slow ? "animate-marquee-slow" : "animate-marquee",
          "group-hover:[animation-play-state:paused]",
        )}
      >
        {track}
        {track}
      </div>
    </div>
  );
}
