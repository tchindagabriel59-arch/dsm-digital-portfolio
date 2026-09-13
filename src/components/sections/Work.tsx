"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import BrowserFrame from "@/components/ui/BrowserFrame";
import ProjectMockup from "@/components/mockups/ProjectMockup";
import SectionHeading from "@/components/ui/SectionHeading";
import { PROJECTS, type Project } from "@/lib/content";
import { cn } from "@/lib/utils";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);

  // Parallaxe douce du mockup pendant la traversée du viewport
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [34, -34]);

  const reversed = index % 2 === 1;
  const displayUrl = project.href.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 46 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden rounded-3xl border border-line bg-surface/40 p-5 transition-all duration-500 hover:border-line-strong hover:bg-surface/70 md:p-8 lg:p-10"
    >
      {/* Lueur bleue au survol */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[42rem] -translate-x-1/2 rounded-full bg-accent/10 opacity-0 blur-[90px] transition-opacity duration-700 group-hover:opacity-100"
      />

      <div
        className={cn(
          "relative grid items-center gap-8 lg:grid-cols-12 lg:gap-14",
          reversed && "lg:[&>*:first-child]:order-2",
        )}
      >
        {/* ------------------------------ Mockup ------------------------- */}
        <motion.div style={{ y }} className="lg:col-span-7">
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-label="Visiter"
            aria-label={`Visiter le site ${project.name} (nouvel onglet)`}
            className="block transition-transform duration-700 ease-out will-change-transform group-hover:scale-[1.02]"
          >
            <BrowserFrame url={displayUrl}>
              <ProjectMockup
                slug={project.slug}
                alt={`Aperçu temporaire illustré du projet ${project.title}`}
                image={`/images/projects/${project.slug}.webp`}
              />
            </BrowserFrame>
          </a>
        </motion.div>

        {/* ------------------------------ Contenu ------------------------ */}
        <div className="lg:col-span-5">
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-accent uppercase">
              {project.category}
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] text-ash-dim uppercase">
              {project.year}
            </span>
          </div>

          <h3 className="display text-[clamp(1.65rem,2.6vw,2.35rem)] text-bone">
            {project.title}
          </h3>

          <p className="mt-5 text-sm leading-relaxed text-ash md:text-[0.95rem]">
            {project.description}
          </p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-line px-3 py-1.5 text-xs text-ash transition-colors duration-300 group-hover:border-line-strong"
              >
                {tech}
              </li>
            ))}
          </ul>

          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-9 inline-flex items-center gap-3 border-b border-line pb-2 text-sm text-bone transition-colors duration-300 hover:border-accent"
          >
            Visiter le site
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong transition-all duration-300 group-hover:border-accent group-hover:bg-accent/10">
              <ArrowUpRight className="h-3.5 w-3.5 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </a>
        </div>
      </div>

      {/* Numéro de projet en filigrane */}
      <span
        aria-hidden
        className="display pointer-events-none absolute right-6 bottom-2 text-[5rem] leading-none text-white/[0.025] select-none md:text-[8rem]"
      >
        0{index + 1}
      </span>
    </motion.article>
  );
}

export default function Work() {
  return (
    <section
      id="realisations"
      className="relative scroll-mt-24 border-y border-line bg-surface/20 py-28 md:py-40"
    >
      <div
        aria-hidden
        className="grid-lines mask-fade-y pointer-events-none absolute inset-0 opacity-30"
      />

      <div className="shell relative">
        <SectionHeading
          label="Réalisations"
          title="Sélection de projets récents."
          accent={["récents."]}
          description="Des marques qui nous ont fait confiance pour construire leur présence digitale."
          align="between"
          action={
            <div className="hidden items-center gap-3 md:flex">
              <span className="font-mono text-[10px] tracking-[0.2em] text-ash-dim uppercase">
                04 études de cas
              </span>
              <span className="h-px w-10 bg-line-strong" />
            </div>
          }
        />

        <div className="mt-16 space-y-6 md:mt-20 md:space-y-8">
          {PROJECTS.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
