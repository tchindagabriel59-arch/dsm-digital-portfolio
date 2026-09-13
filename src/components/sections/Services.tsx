"use client";

import type { MouseEvent } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES, type Service } from "@/lib/content";

/** Suit la souris pour positionner le halo lumineux de la card. */
function handleSpotlight(event: MouseEvent<HTMLDivElement>) {
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
  card.style.setProperty("--my", `${event.clientY - rect.top}px`);
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{
        duration: 0.9,
        delay: (index % 2) * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseMove={handleSpotlight}
      className="group relative overflow-hidden rounded-2xl border border-line bg-surface/60 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/45 hover:bg-surface-2/70 hover:shadow-[0_30px_80px_-40px_rgba(0,102,255,0.65)] md:p-10"
    >
      {/* Halo qui suit le curseur */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(380px circle at var(--mx) var(--my), rgba(0,102,255,0.12), transparent 65%)",
        }}
      />

      <div className="relative flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-void/60 transition-colors duration-500 group-hover:border-accent/40">
          <Icon
            className="h-5 w-5 text-ash transition-colors duration-500 group-hover:text-accent"
            strokeWidth={1.5}
          />
        </div>
        <span className="font-mono text-[11px] tracking-widest text-ash-dim">
          {service.index}
        </span>
      </div>

      <h3 className="display relative mt-8 text-2xl text-bone md:text-[1.75rem]">
        {service.title}
      </h3>

      <p className="relative mt-4 max-w-md text-sm leading-relaxed text-ash">
        {service.description}
      </p>

      <ul className="relative mt-8 space-y-2.5 border-t border-line pt-6">
        {service.items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 text-sm text-ash transition-colors duration-300 group-hover:text-bone/85"
          >
            <span className="h-px w-3 shrink-0 bg-line-strong transition-all duration-500 group-hover:w-5 group-hover:bg-accent" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative scroll-mt-24 py-28 md:py-40">
      <div className="shell">
        <SectionHeading
          label="Services"
          title="Une expertise, quatre leviers."
          accent={["quatre"]}
          description="Chaque levier fonctionne seul. Ensemble, ils composent un système d'acquisition cohérent — du premier clic jusqu'à la conversion."
          align="between"
          action={
            <div className="hidden max-w-[15rem] border-l border-line pl-6 md:block">
              <p className="text-sm leading-relaxed text-ash-dim">
                Un interlocuteur unique, une équipe intégrée, aucun
                intermédiaire.
              </p>
            </div>
          }
        />

        <div className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-2">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={service.index}
              service={service}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
