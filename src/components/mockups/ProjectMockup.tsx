import Image from "next/image";
import type { Project } from "@/lib/content";

/* ==========================================================================
   Mockups photographiques temporaires.

   `decorated=true` transforme une photo en mini landing page crédible.
   Quand les vraies captures seront disponibles, passer `decorated={false}`
   dans Work.tsx : l'image sera alors affichée seule dans le navigateur.
   ========================================================================== */

const MOCKUP_UI: Record<
  Project["slug"],
  {
    logo: string;
    eyebrow: string;
    headline: string;
    subline: string;
    cta: string;
    accent: string;
    position: string;
  }
> = {
  senauto: {
    logo: "SENAUTO",
    eyebrow: "Acheter · Vendre · Louer",
    headline: "La route commence ici.",
    subline: "Trouvez le véhicule qui vous ressemble au Sénégal.",
    cta: "Explorer les véhicules",
    accent: "#0066FF",
    position: "center 62%",
  },
  jongo: {
    logo: "JONGO",
    eyebrow: "Pilotez votre activité",
    headline: "Vos stocks. Sous contrôle.",
    subline: "Une vision claire de chaque produit, en temps réel.",
    cta: "Découvrir la solution",
    accent: "#34D399",
    position: "center 50%",
  },
  brescor: {
    logo: "BRESCOR",
    eyebrow: "Engineering group",
    headline: "Bâtir avec précision.",
    subline: "Ingénierie, construction et maîtrise des grands projets.",
    cta: "Voir notre expertise",
    accent: "#F5B83D",
    position: "center 46%",
  },
  lovelink: {
    logo: "LOVELINK",
    eyebrow: "Des rencontres qui comptent",
    headline: "Le bon lien change tout.",
    subline: "Une communauté authentique, proche de vous.",
    cta: "Créer mon profil",
    accent: "#FB7185",
    position: "center 44%",
  },
};

type Props = {
  slug: Project["slug"];
  alt: string;
  image: string;
  /** Désactiver pour afficher une vraie capture de site sans surcouche. */
  decorated?: boolean;
};

export default function ProjectMockup({
  slug,
  alt,
  image,
  decorated = true,
}: Props) {
  const ui = MOCKUP_UI[slug];

  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#0b0b0b]">
      <Image
        src={image}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 58vw"
        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
        style={{ objectPosition: ui.position }}
      />

      {decorated ? (
        <>
          {/* Traitement photo : lisibilité et profondeur */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

          {/* Navigation miniature */}
          <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[4.5%] py-[3.2%]">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full shadow-[0_0_14px_currentColor] sm:h-3 sm:w-3"
                style={{ backgroundColor: ui.accent, color: ui.accent }}
              />
              <span className="font-display text-[clamp(0.55rem,1.25vw,0.9rem)] font-semibold tracking-[0.08em] text-white">
                {ui.logo}
              </span>
            </div>
            <div className="hidden items-center gap-5 sm:flex">
              {['Accueil', 'Services', 'Contact'].map((item) => (
                <span
                  key={item}
                  className="font-mono text-[7px] tracking-[0.14em] text-white/60 uppercase"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Hero miniature */}
          <div className="absolute top-1/2 left-[5%] w-[60%] -translate-y-[42%]">
            <div className="mb-[4%] flex items-center gap-2">
              <span
                className="h-px w-5 sm:w-8"
                style={{ backgroundColor: ui.accent }}
              />
              <span
                className="font-mono text-[clamp(0.35rem,0.75vw,0.55rem)] tracking-[0.18em] uppercase"
                style={{ color: ui.accent }}
              >
                {ui.eyebrow}
              </span>
            </div>
            <p className="font-display text-[clamp(1.15rem,3.35vw,2.6rem)] font-semibold leading-[0.95] tracking-[-0.035em] text-white">
              {ui.headline}
            </p>
            <p className="mt-[4%] max-w-[22rem] text-[clamp(0.42rem,0.9vw,0.7rem)] leading-relaxed text-white/65">
              {ui.subline}
            </p>
            <span
              className="mt-[5%] inline-flex rounded-full px-[4%] py-[2.2%] font-mono text-[clamp(0.34rem,0.65vw,0.5rem)] font-medium tracking-[0.08em] text-white uppercase"
              style={{ backgroundColor: ui.accent }}
            >
              {ui.cta}
            </span>
          </div>

          {/* Pagination miniature */}
          <div className="absolute right-[4.5%] bottom-[5%] flex items-center gap-2 font-mono text-[7px] tracking-[0.15em] text-white/45">
            <span style={{ color: ui.accent }}>01</span>
            <span className="h-px w-8 bg-white/25" />
            <span>03</span>
          </div>
        </>
      ) : null}
    </div>
  );
}
