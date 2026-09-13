import { ArrowUp } from "lucide-react";
import { FOOTER_COLUMNS, SITE } from "@/lib/content";

const LEGAL = [
  { label: "Mentions légales", href: "#contact" },
  { label: "Confidentialité", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-void pt-20">
      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12">
          {/* ---------------------------- Identité ---------------------- */}
          <div className="lg:col-span-4">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold tracking-tight text-bone">
                DSM
              </span>
              <span className="h-1.5 w-1.5 translate-y-[-3px] rounded-full bg-accent" />
              <span className="font-mono text-[10px] tracking-[0.28em] text-ash-dim uppercase">
                Digital
              </span>
            </div>
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ash">
              Agence digitale orientée résultats : création web, référencement
              naturel, acquisition payante et social media.
            </p>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-7 inline-block border-b border-line pb-1 text-sm text-bone transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              {SITE.email}
            </a>
          </div>

          {/* ---------------------------- Colonnes ---------------------- */}
          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <h3 className="font-mono text-[10px] tracking-[0.22em] text-ash-dim uppercase">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => {
                    const external = link.href.startsWith("http");
                    return (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target={external ? "_blank" : undefined}
                          rel={external ? "noopener noreferrer" : undefined}
                          className="group inline-flex items-center gap-2 text-sm text-ash transition-colors duration-300 hover:text-bone"
                        >
                          <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
                          {link.label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* ---------------------------- Bas de page -------------------- */}
        <div className="mt-16 flex flex-col gap-5 border-t border-line py-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-ash-dim">
            © {year} {SITE.name} — Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            {LEGAL.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs text-ash-dim transition-colors duration-300 hover:text-bone"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#accueil"
              aria-label="Revenir en haut de la page"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ash transition-all duration-300 hover:border-accent hover:text-accent"
            >
              <ArrowUp className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* ------------------ Typographie massive en filigrane ------------- */}
      <div
        aria-hidden
        className="pointer-events-none relative flex w-full justify-center select-none"
      >
        <span className="display translate-y-[18%] bg-gradient-to-b from-white/[0.07] to-white/0 bg-clip-text text-[19vw] leading-none whitespace-nowrap text-transparent">
          DSM DIGITAL
        </span>
      </div>
    </footer>
  );
}
