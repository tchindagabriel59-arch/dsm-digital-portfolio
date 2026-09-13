import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: false },
};

/** 404 dans la même direction artistique que le reste du site. */
export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div
        aria-hidden
        className="grid-lines mask-fade-y pointer-events-none absolute inset-0 opacity-40"
      />
      <div
        aria-hidden
        className="glow-blue pointer-events-none absolute top-1/2 left-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 opacity-30 blur-3xl"
      />

      <div className="shell relative">
        <p className="font-mono text-[10px] tracking-[0.24em] text-accent uppercase">
          Erreur 404
        </p>
        <h1 className="display mt-6 text-[clamp(3rem,11vw,9rem)] text-bone">
          Page introuvable<span className="text-accent">.</span>
        </h1>
        <p className="mt-6 max-w-md text-base leading-relaxed text-ash">
          Le lien est peut-être obsolète. Revenez à l&apos;accueil pour
          découvrir nos services et nos réalisations.
        </p>
        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-line-strong px-6 py-3.5 text-sm text-bone transition-all duration-300 hover:border-accent hover:bg-accent/10"
        >
          <ArrowLeft className="h-4 w-4 text-accent transition-transform duration-300 group-hover:-translate-x-1" />
          Retour à l&apos;accueil
        </Link>
      </div>
    </section>
  );
}
