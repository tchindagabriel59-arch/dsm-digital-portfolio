"use client";

import type { ReactNode } from "react";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";
import { cn } from "@/lib/utils";

type Props = {
  /** Petit libellé monospace au-dessus du titre */
  label: string;
  title: string;
  accent?: string[];
  description?: string;
  align?: "left" | "between";
  action?: ReactNode;
  className?: string;
};

/** En-tête de section : libellé + titre révélé mot à mot + sous-titre. */
export default function SectionHeading({
  label,
  title,
  accent,
  description,
  align = "left",
  action,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8",
        align === "between" &&
          "md:flex-row md:items-end md:justify-between md:gap-16",
        className,
      )}
    >
      <div className="max-w-3xl">
        <Reveal y={14}>
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-accent" />
            <span className="font-mono text-[10px] tracking-[0.24em] text-accent uppercase">
              {label}
            </span>
          </div>
        </Reveal>

        <TextReveal
          as="h2"
          text={title}
          accent={accent}
          className="display text-[clamp(2rem,5vw,3.9rem)] text-bone"
        />

        {description ? (
          <Reveal delay={0.15}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ash">
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>

      {action ? <Reveal delay={0.2}>{action}</Reveal> : null}
    </div>
  );
}
