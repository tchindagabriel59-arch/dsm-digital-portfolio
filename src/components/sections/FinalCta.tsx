"use client";

import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";
import Reveal from "@/components/ui/Reveal";
import TextReveal from "@/components/ui/TextReveal";
import { useContactDialog } from "@/components/providers/ContactProvider";
import { SITE } from "@/lib/content";

export default function FinalCta() {
  const { openContact } = useContactDialog();

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden py-32 md:py-48"
    >
      {/* Dégradé radial bleu + grille */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-[-30%] mx-auto h-[46rem] w-[46rem] rounded-full bg-[radial-gradient(circle,rgba(0,102,255,0.22),transparent_65%)] blur-[60px] md:w-[70rem]"
      />
      <div
        aria-hidden
        className="grid-lines mask-fade-y pointer-events-none absolute inset-0 opacity-40"
      />

      <div className="shell relative flex flex-col items-center text-center">
        <Reveal y={12}>
          <div className="mb-8 flex items-center gap-3 rounded-full border border-line bg-surface/60 px-4 py-2 backdrop-blur-sm">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.22em] text-ash uppercase">
              Réponse sous 24 h
            </span>
          </div>
        </Reveal>

        <TextReveal
          as="h2"
          text="Prêt à passer à l'échelle supérieure ?"
          accent={["supérieure"]}
          className="display max-w-5xl justify-center text-[clamp(2.4rem,7vw,6rem)] text-bone"
          stagger={0.05}
        />

        <Reveal delay={0.2}>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ash md:text-lg">
            Discutons de votre projet et voyons comment nous pouvons vous aider
            à atteindre vos objectifs.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-12 flex flex-col items-center gap-7">
            <MagneticButton
              variant="primary"
              strength={26}
              onClick={openContact}
              ariaLabel="Démarrer un projet"
              className="px-10 py-5 text-base"
            >
              Démarrer un projet
              <ArrowUpRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </MagneticButton>

            <p className="text-sm text-ash-dim">
              Ou écrivez-nous à{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="text-bone underline decoration-line underline-offset-4 transition-colors duration-300 hover:text-accent hover:decoration-accent"
              >
                {SITE.email}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
