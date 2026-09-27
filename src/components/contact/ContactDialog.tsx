"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

type Props = { open: boolean; onClose: () => void };

const SERVICES = [
  "Création de site internet",
  "Référencement Google",
  "Publicité sponsorisée",
  "Gestion Réseaux Sociaux",
] as const;

const FIELD =
  "w-full rounded-xl border border-line bg-void/80 px-3.5 py-2.5 text-sm text-bone placeholder:text-ash-dim transition-colors focus:border-accent focus:outline-none";

export default function ContactDialog({ open, onClose }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [service, setService] = useState<string>(SERVICES[0]);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 300);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) return;
    const timer = window.setTimeout(() => {
      setStatus("idle");
      setErrors({});
    }, 400);
    return () => window.clearTimeout(timer);
  }, [open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");
    setErrors({});

    const params = new URLSearchParams(window.location.search);
    const source =
      params.get("utm_source") ??
      (document.referrer ? new URL(document.referrer).hostname : "direct");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
          service,
          budget: "Sur devis",
          source,
        }),
      });

      const payload = (await response.json()) as {
        ok?: boolean;
        success?: boolean;
        errors?: Record<string, string>;
      };

      if (response.ok || payload.ok || payload.success) {
        form.reset();
        setStatus("done");
      } else {
        setErrors(payload.errors ?? { form: "Une erreur est survenue." });
        setStatus("idle");
      }
    } catch {
      setStatus("done");
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-4">
          {/* Voile de fond */}
          <motion.button
            type="button"
            aria-label="Fermer le formulaire"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          {/* Boîte Modale Mobile Touch-Scrollable */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Démarrer un projet"
            initial={{ y: 40, opacity: 0, scale: 0.96 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 30, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 max-h-[88vh] w-full max-w-xl overflow-y-auto overscroll-contain rounded-2xl border border-line bg-[#111111] p-5 sm:p-8 text-bone shadow-2xl touch-pan-y"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 z-20 rounded-full border border-line bg-void/80 p-2 text-ash transition-colors hover:border-bone/30 hover:text-bone"
              aria-label="Fermer"
            >
              <X className="h-4 w-4" />
            </button>

            {status === "done" ? (
              <div className="flex min-h-[280px] flex-col items-center justify-center text-center py-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
                  <Check className="h-7 w-7 text-accent" />
                </div>
                <h3 className="display mt-5 text-2xl font-bold text-bone">
                  Demande envoyée !
                </h3>
                <p className="mt-2.5 max-w-sm text-xs sm:text-sm leading-relaxed text-ash">
                  Merci. Un expert de DSM Digital revient vers vous sous 24 h avec une proposition adaptée.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-6 rounded-full bg-accent px-6 py-2.5 text-xs font-medium text-white transition-opacity hover:opacity-90"
                >
                  Retour au site
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative space-y-4 sm:space-y-5">
                <div>
                  <p className="font-mono text-[9px] tracking-[0.2em] text-accent uppercase">
                    Nouveau projet
                  </p>
                  <h3 className="display mt-1 text-2xl sm:text-3xl font-bold text-bone">
                    Parlons de votre projet.
                  </h3>
                  <p className="mt-1 text-xs text-ash">
                    Réponse sous 24 h. Ou par email à{" "}
                    <a
                      href={`mailto:${SITE.email}`}
                      className="text-bone underline underline-offset-2"
                    >
                      {SITE.email}
                    </a>
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1 block font-mono text-[9px] tracking-[0.15em] text-ash-dim uppercase"
                    >
                      Nom complet *
                    </label>
                    <input
                      ref={firstFieldRef}
                      id="name"
                      name="name"
                      required
                      placeholder="Ex: Amad Diallo"
                      className={FIELD}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1 block font-mono text-[9px] tracking-[0.15em] text-ash-dim uppercase"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="nom@entreprise.com"
                      className={FIELD}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="company"
                    className="mb-1 block font-mono text-[9px] tracking-[0.15em] text-ash-dim uppercase"
                  >
                    Entreprise / Marque
                  </label>
                  <input
                    id="company"
                    name="company"
                    placeholder="Nom de votre structure"
                    className={FIELD}
                  />
                </div>

                <div>
                  <legend className="mb-2 block font-mono text-[9px] tracking-[0.15em] text-ash-dim uppercase">
                    Besoin principal
                  </legend>
                  <div className="flex flex-wrap gap-1.5">
                    {SERVICES.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setService(item)}
                        className={cn(
                          "rounded-full border px-3 py-1.5 text-[11px] transition-all",
                          service === item
                            ? "border-accent bg-accent/20 text-bone font-medium"
                            : "border-line text-ash hover:border-line-strong",
                        )}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block font-mono text-[9px] tracking-[0.15em] text-ash-dim uppercase"
                  >
                    Votre projet *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={3}
                    placeholder="Décrivez brièvement ce que vous souhaitez réaliser..."
                    className={cn(FIELD, "resize-none")}
                  />
                </div>

                {errors.form ? (
                  <p className="text-xs text-red-400">{errors.form}</p>
                ) : null}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-white transition-all active:scale-95 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : null}
                  <span>Envoyer la demande</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
