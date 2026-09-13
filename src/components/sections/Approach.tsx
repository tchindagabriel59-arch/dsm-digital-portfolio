"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROCESS } from "@/lib/content";
import { cn } from "@/lib/utils";

export default function Approach() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Ligne de progression verticale synchronisée avec le scroll de la section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 55%", "end 75%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <section id="approche" className="relative scroll-mt-24 py-28 md:py-40">
      <div className="shell">
        <SectionHeading
          label="Notre approche"
          title="Une méthode, des résultats."
          accent={["résultats."]}
          description="Quatre étapes, aucune zone d'ombre. Vous savez en permanence où en est votre projet et pourquoi chaque décision est prise."
        />

        <div
          ref={containerRef}
          className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-12 lg:gap-20"
        >
          {/* ------------------------ Rail sticky (desktop) --------------- */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-32">
              <div className="relative pl-8">
                {/* Rail + progression */}
                <span className="absolute top-2 bottom-2 left-[3px] w-px bg-line" />
                <motion.span
                  style={{ scaleY: progress }}
                  className="absolute top-2 bottom-2 left-[3px] w-px origin-top bg-accent shadow-[0_0_10px_rgba(0,102,255,0.8)]"
                />

                <ul className="space-y-10">
                  {PROCESS.map((step, index) => (
                    <li key={step.index} className="relative">
                      <span
                        className={cn(
                          "absolute top-[9px] -left-8 h-[7px] w-[7px] -translate-x-[2px] rounded-full border transition-all duration-500",
                          index <= active
                            ? "border-accent bg-accent shadow-[0_0_12px_rgba(0,102,255,0.9)]"
                            : "border-line-strong bg-void",
                        )}
                      />
                      <div
                        className={cn(
                          "transition-all duration-500",
                          index === active
                            ? "opacity-100"
                            : "opacity-35 hover:opacity-60",
                        )}
                      >
                        <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                          {step.index}
                        </span>
                        <h3 className="display mt-1 text-2xl text-bone">
                          {step.title}
                        </h3>
                        <p className="mt-2 max-w-xs text-sm leading-relaxed text-ash">
                          {step.summary}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* ------------------------ Panneaux de détail ------------------ */}
          <div className="lg:col-span-8">
            {PROCESS.map((step, index) => (
              <motion.div
                key={step.index}
                onViewportEnter={() => setActive(index)}
                viewport={{ margin: "-45% 0px -45% 0px" }}
                className="border-t border-line py-10 first:border-t-0 first:pt-0 lg:min-h-[46vh] lg:py-16"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-15% 0px" }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* Rappel de l'étape sur mobile */}
                  <div className="mb-5 flex items-center gap-4 lg:hidden">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-accent">
                      {step.index}
                    </span>
                    <span className="h-px flex-1 bg-line" />
                  </div>

                  <h3 className="display text-[clamp(1.9rem,4.2vw,3.1rem)] text-bone">
                    {step.title}
                  </h3>

                  <p className="mt-6 max-w-xl text-base leading-relaxed text-ash">
                    {step.detail}
                  </p>

                  <ul className="mt-8 flex flex-wrap gap-2">
                    {step.deliverables.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-line bg-surface/60 px-4 py-2 text-xs text-ash"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
