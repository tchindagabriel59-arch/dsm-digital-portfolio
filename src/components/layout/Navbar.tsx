"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/content";
import { useContactDialog } from "@/components/providers/ContactProvider";
import { lockScroll } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#accueil");
  const [menuOpen, setMenuOpen] = useState(false);
  const { openContact } = useContactDialog();

  useMotionValueEvent(scrollY, "change", (value) => {
    setScrolled(value > 40);
  });

  /* Section active : observation des ancres pour souligner le bon lien */
  useEffect(() => {
    const sections = NAV_LINKS.map((link) =>
      document.querySelector(link.href),
    ).filter(Boolean) as Element[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const toggleMenu = (next: boolean) => {
    setMenuOpen(next);
    lockScroll(next);
  };

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[100] transition-all duration-500",
          scrolled
            ? "border-b border-line bg-void/70 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <nav className="shell flex h-[72px] items-center justify-between md:h-20">
          {/* ------------------------------- Logo ------------------------- */}
          <a
            href="#accueil"
            className="group relative z-10 flex items-baseline gap-2"
            aria-label={`${SITE.name} — retour en haut`}
          >
            <span className="font-display text-xl font-semibold tracking-tight text-bone">
              DSM
            </span>
            <span className="h-1.5 w-1.5 translate-y-[-2px] rounded-full bg-accent transition-transform duration-500 group-hover:scale-150" />
            <span className="hidden font-mono text-[10px] tracking-[0.28em] text-ash-dim uppercase sm:block">
              Digital
            </span>
          </a>

          {/* ------------------------------ Liens ------------------------- */}
          <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "group relative block px-4 py-2 text-sm transition-colors duration-300",
                    active === link.href
                      ? "text-bone"
                      : "text-ash hover:text-bone",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute bottom-1 left-1/2 h-px -translate-x-1/2 bg-accent transition-all duration-400",
                      active === link.href
                        ? "w-4 opacity-100"
                        : "w-0 opacity-0 group-hover:w-4 group-hover:opacity-60",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* ------------------------------- CTA -------------------------- */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={openContact}
              className="group hidden items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-bone transition-all duration-300 hover:border-accent hover:bg-accent/10 md:inline-flex"
            >
              Démarrer un projet
              <ArrowUpRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>

            {/* Burger mobile */}
            <button
              type="button"
              aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={menuOpen}
              onClick={() => toggleMenu(!menuOpen)}
              className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-[5px] rounded-full border border-line-strong lg:hidden"
            >
              <span
                className={cn(
                  "block h-px w-4 bg-bone transition-all duration-400",
                  menuOpen && "translate-y-[3px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "block h-px w-4 bg-bone transition-all duration-400",
                  menuOpen && "-translate-y-[3px] -rotate-45",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* --------------------------- Menu plein écran -------------------- */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[95] flex flex-col justify-between bg-void px-6 pt-28 pb-10 lg:hidden"
          >
            <div
              aria-hidden
              className="grid-lines pointer-events-none absolute inset-0 opacity-40"
            />
            <ul className="relative space-y-2">
              {NAV_LINKS.map((link, index) => (
                <li key={link.href} className="overflow-hidden">
                  <motion.a
                    href={link.href}
                    onClick={() => toggleMenu(false)}
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{
                      delay: 0.14 + index * 0.07,
                      duration: 0.8,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="flex items-baseline gap-4 py-2"
                  >
                    <span className="font-mono text-[10px] text-ash-dim">
                      0{index + 1}
                    </span>
                    <span className="display text-[clamp(2.5rem,12vw,4rem)] text-bone">
                      {link.label}
                    </span>
                  </motion.a>
                </li>
              ))}
            </ul>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="relative"
            >
              <button
                type="button"
                onClick={() => {
                  toggleMenu(false);
                  openContact();
                }}
                className="flex w-full items-center justify-between rounded-full bg-accent px-6 py-4 text-sm font-medium text-white"
              >
                Démarrer un projet
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <p className="mt-6 font-mono text-[10px] tracking-[0.2em] text-ash-dim uppercase">
                {SITE.email}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
