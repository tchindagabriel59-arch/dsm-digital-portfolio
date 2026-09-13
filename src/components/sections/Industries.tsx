"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import Reveal from "@/components/ui/Reveal";
import { useContactDialog } from "@/components/providers/ContactProvider";
import { INDUSTRIES } from "@/lib/content";
import { cn } from "@/lib/utils";

/** Disposition bento : un grand visuel à gauche, deux à droite, trois en bas. */
const GRID_CLASSES = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4",
] as const;

export default function Industries() {
  const { openContact } = useContactDialog();

  return (
    <section className="relative border-t border-line bg-surface/20 py-28 md:py-40">
      <div className="shell">
        <SectionHeading
          label="Tous secteurs"
          title="Votre activité est unique. Votre site doit l’être."
          accent={["unique."]}
          description="Restaurant, salle de sport, supérette, salon de coiffure, marque de mode, cosmétique ou grande entreprise : nous concevons tous les types de sites, sans modèle préfabriqué."
          align="between"
          action={
            <div className="max-w-[17rem] border-l border-line pl-6">
              <p className="font-mono text-[10px] leading-relaxed tracking-[0.16em] text-ash-dim uppercase">
                Site vitrine · E-commerce · Réservation · Marketplace · SaaS ·
                Plateforme métier
              </p>
            </div>
          }
        />

        <div className="mt-16 grid gap-4 md:mt-20 lg:auto-rows-[235px] lg:grid-cols-12">
          {INDUSTRIES.map((industry, index) => (
            <motion.article
              key={industry.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.85,
                delay: (index % 3) * 0.07,
                ease: [0.16, 1, 0.3, 1],
              }}
              data-cursor=""
              className={cn(
                "group relative min-h-[265px] overflow-hidden rounded-2xl border border-line bg-surface",
                GRID_CLASSES[index],
              )}
            >
              <Image
                src={industry.image}
                alt={industry.alt}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 1024px) 100vw, 58vw"
                    : "(max-width: 1024px) 100vw, 34vw"
                }
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.06]"
              />

              {/* Désaturation légère au repos, couleurs révélées au hover */}
              <div className="absolute inset-0 bg-black/15 mix-blend-color transition-opacity duration-700 group-hover:opacity-0" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/5" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent/10 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              <span className="absolute top-5 right-5 font-mono text-[9px] tracking-[0.18em] text-white/50">
                {industry.index}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                <div className="mb-3 h-px w-0 bg-accent transition-all duration-500 group-hover:w-10" />
                <h3
                  className={cn(
                    "font-display text-xl font-semibold tracking-tight text-white",
                    index === 0 && "lg:text-3xl",
                  )}
                >
                  {industry.title}
                </h3>
                <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/65 transition-all duration-500 md:text-sm lg:translate-y-2 lg:text-white/0 lg:group-hover:translate-y-0 lg:group-hover:text-white/65">
                  {industry.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-col gap-5 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-relaxed text-ash">
              Votre secteur n’est pas dans la liste ? Tant mieux. Nous aimons
              comprendre de nouveaux métiers et construire la bonne solution.
            </p>
            <button
              type="button"
              onClick={openContact}
              className="group inline-flex shrink-0 items-center gap-3 text-sm font-medium text-bone"
            >
              Parler de votre activité
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10">
                <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
