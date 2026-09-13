"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import HeroVisual from "@/components/ui/HeroVisual";
import Marquee from "@/components/ui/Marquee";
import MagneticButton from "@/components/ui/MagneticButton";
import { useAppReady } from "@/components/providers/LoadingProvider";
import { useContactDialog } from "@/components/providers/ContactProvider";
import { MARQUEE_ITEMS, PROJECTS } from "@/lib/content";
import { cn } from "@/lib/utils";
import styles from "./hero.module.css";

/* Mise en scène séquencée : chaque bloc entre avec un léger décalage */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

const line: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 1.05, ease: [0.16, 1, 0.3, 1] } },
};

const fade: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const ready = useAppReady();
  const { openContact } = useContactDialog();
  const state = ready ? "show" : "hidden";

  return (
    <section
      id="accueil"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden pt-28 md:pt-32"
    >
      {/* Décor : grille technique + aura bleue */}
      <div
        aria-hidden
        className="grid-lines mask-fade-y pointer-events-none absolute inset-0 opacity-[0.55]"
      />
      <div aria-hidden className={styles.aura} />

      <div className="shell relative grid flex-1 items-center gap-14 pb-10 lg:grid-cols-12 lg:gap-6">
        {/* ---------------------------- Colonne texte --------------------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={state}
          className="lg:col-span-7 xl:col-span-7"
        >
          {/* Pastille de disponibilité */}
          <motion.div variants={fade} className="mb-8 flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.22em] text-ash uppercase">
              Disponible pour de nouveaux projets
            </span>
          </motion.div>

          <h1 className="display text-[clamp(2.35rem,7.4vw,6.5rem)] text-bone">
            {["Nous créons", "des expériences", "digitales qui"].map((text) => (
              <span key={text} className="block overflow-hidden pb-[0.06em]">
                <motion.span variants={line} className="block">
                  {text}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-[0.12em]">
              <motion.span variants={line} className="block">
                <span
                  className={cn(
                    styles.underline,
                    ready && styles.underlineActive,
                    "text-accent",
                  )}
                >
                  convertissent
                </span>
                <span className="text-bone">.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p
            variants={fade}
            className="mt-8 max-w-xl text-base leading-relaxed text-ash md:text-lg"
          >
            Nous concevons tous les types de sites web, quel que soit votre
            secteur — puis nous les rendons visibles grâce au SEO et à
            l’acquisition payante.
          </motion.p>

          <motion.div
            variants={fade}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              href="#realisations"
              variant="primary"
              ariaLabel="Voir nos réalisations"
            >
              Voir nos réalisations
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </MagneticButton>

            <MagneticButton
              variant="ghost"
              onClick={openContact}
              ariaLabel="Nous contacter"
            >
              Nous contacter
            </MagneticButton>
          </motion.div>

          {/* Preuve sociale discrète */}
          <motion.div
            variants={fade}
            className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6"
          >
            <span className="font-mono text-[10px] tracking-[0.2em] text-ash-dim uppercase">
              Ils nous font confiance
            </span>
            <div className="flex flex-wrap items-center gap-x-7 gap-y-2">
              {PROJECTS.map((project) => (
                <span
                  key={project.slug}
                  className="font-display text-sm font-medium tracking-tight text-ash transition-colors duration-300 hover:text-bone"
                >
                  {project.name}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ---------------------------- Colonne visuelle ------------------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={ready ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none xl:col-span-5"
        >
          <HeroVisual />

          {/* Données flottantes autour de la sphère */}
          <div className="pointer-events-none absolute inset-0 hidden xl:block">
            <div className="absolute top-[14%] -left-2 rounded-full border border-line bg-surface/70 px-3.5 py-1.5 font-mono text-[10px] tracking-widest text-ash backdrop-blur-sm">
              CRO +38%
            </div>
            <div className="absolute right-0 bottom-[18%] rounded-full border border-line bg-surface/70 px-3.5 py-1.5 font-mono text-[10px] tracking-widest text-ash backdrop-blur-sm">
              LCP 0.9s
            </div>
          </div>
        </motion.div>
      </div>

      {/* ---------------------------- Bas de section ----------------------- */}
      <div className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.9 }}
          className="shell mb-8 flex items-end justify-between"
        >
          <div className="flex items-center gap-4">
            <div className={styles.scrollTrack}>
              <span className={styles.scrollThumb} />
            </div>
            <span className="font-mono text-[10px] tracking-[0.22em] text-ash-dim uppercase">
              Défiler
            </span>
          </div>
          <a
            href="#services"
            aria-label="Aller à la section services"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ash transition-all duration-300 hover:border-accent hover:text-accent"
          >
            <ArrowDown className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="border-y border-line bg-surface/40 py-4">
          <Marquee items={MARQUEE_ITEMS} />
        </div>
      </div>
    </section>
  );
}
