"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { TESTIMONIALS } from "@/lib/content";

export default function Testimonials() {
  return (
    <section
      id="temoignages"
      className="relative scroll-mt-24 border-y border-line bg-void py-28 md:py-40"
    >
      <div
        aria-hidden
        className="grid-lines mask-fade-y pointer-events-none absolute inset-0 opacity-25"
      />

      <div className="shell relative">
        <SectionHeading
          label="Témoignages"
          title="Ce que disent ceux qui nous font confiance."
          accent={["confiance."]}
          description="Des résultats concrets, des relations durables. Voici ce que nos clients retiennent de leur collaboration avec DSM Digital."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-2 xl:gap-6">
          {TESTIMONIALS.map((t, index) => (
            <motion.article
              key={t.author + t.company}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-line bg-surface/40 p-7 transition-all duration-500 hover:border-line-strong hover:bg-surface/70 md:p-8"
            >
              {/* Lueur au hover */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-24 -right-16 h-48 w-48 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
              />

              <div className="relative">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
                  <Quote className="h-4 w-4 text-accent" />
                </div>

                <blockquote className="text-[0.95rem] leading-relaxed text-bone md:text-base">
                  “{t.quote}”
                </blockquote>
              </div>

              <footer className="relative mt-8 flex items-center gap-4 border-t border-line pt-6">
                {/* Avatar initiales */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-void font-display text-sm font-semibold text-accent">
                  {t.author
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>

                <div className="min-w-0">
                  <p className="truncate font-medium text-bone">{t.author}</p>
                  <p className="truncate text-xs text-ash">
                    {t.role}
                    {t.company ? ` · ${t.company}` : ""}
                  </p>
                </div>

                {t.project ? (
                  <span className="ml-auto hidden shrink-0 rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 font-mono text-[9px] tracking-wider text-accent uppercase sm:inline-block">
                    {t.project}
                  </span>
                ) : null}
              </footer>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
