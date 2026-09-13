"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import { STATS } from "@/lib/content";
import { cn } from "@/lib/utils";

function StatItem({
  value,
  suffix,
  label,
  index,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  index: number;
  start: boolean;
}) {
  const count = useCountUp(value, start, 1700 + index * 150);

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        // Séparateurs dessinés au cas par cas : 2 colonnes en mobile, 4 en desktop
        "group relative border-line px-2 py-10 md:px-6 md:py-14",
        index % 2 === 1 && "border-l",
        index >= 2 && "border-t md:border-t-0",
        index > 0 && "md:border-l",
      )}
    >
      <span className="display block text-[clamp(3rem,7vw,5.5rem)] tabular-nums text-accent transition-all duration-500 group-hover:[text-shadow:0_0_38px_rgba(0,102,255,0.55)]">
        {count}
        <span className="text-bone/90">{suffix}</span>
      </span>
      <span className="mt-3 block font-mono text-[10px] tracking-[0.2em] text-ash uppercase">
        {label}
      </span>
    </motion.div>
  );
}

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });

  return (
    <section className="relative border-y border-line bg-surface/30 py-6">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex justify-center"
      >
        <div className="glow-blue h-full w-2/3 opacity-[0.18] blur-2xl" />
      </div>

      <div
        ref={ref}
        className="shell relative grid grid-cols-2 md:grid-cols-4"
      >
        {STATS.map((stat, index) => (
          <StatItem
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            index={index}
            start={inView}
          />
        ))}
      </div>
    </section>
  );
}
