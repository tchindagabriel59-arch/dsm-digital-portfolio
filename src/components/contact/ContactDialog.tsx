"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, Loader2, X } from "lucide-react";
import { SITE } from "@/lib/content";
import { cn } from "@/lib/utils";

type Props = { open: boolean; onClose: () => void };

const SERVICES = [
  "Création site internet / Portfolio",
  "Référencement Google",
  "Publicité sponsorisée",
  "Gestion Réseaux Sociaux",
] as const;

// 🔑 COLLE TA CLÉ PUBLIQUE WEB3FORMS ICI
const WEB3FORMS_KEY = "5f9ecc46-a532-4735-af2d-a4cbbe0e2062";

const FIELD =
  "w-full rounded-xl border border-line bg-void/80 px-3.5 py-2.5 text-sm text-bone placeholder:text-ash-dim transition-colors focus:border-accent focus:outline-none";

export default function ContactDialog({ open, onClose }: Props) {
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [service, setService] = useState<string>(SERVICES[0]);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => firstFieldRef.current?.focus(), 300);
    return () => window.clearTimeout(timer);
  }, [open]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("loading");

    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const phone = data.get("phone") as string;
    const company = (data.get("company") as string) || "Non renseignée";
    const message = data.get("message") as string;

    try {
      // 1. Sauvegarde BDD PostgreSQL + Meta CAPI (Server-Side)
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          company,
          message,
          service,
          budget: "Sur devis",
        }),
      }).catch((err) => console.log("Note API Server:", err));

      // 2. Envoi Email Direct Gmail via Web3Forms avec Numéro WhatsApp
      if (WEB3FORMS_KEY && WEB3FORMS_KEY !== "5f9ecc46-a532-4735-af2d-a4cbbe0e2062") {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `🔥 Nouveau prospect DSM Digital : ${name}`,
            from_name: "DSM Digital Portfolio",
            name: name,
            email: email,
            whatsapp: phone,
            entreprise: company,
            service_demande: service,
            message: `Nom complet : ${name}\nEmail : ${email}\nTéléphone / WhatsApp : ${phone}\nEntreprise : ${company}\nService : ${service}\n\nProjet :\n${message}`,
          }),
        });
      }

      form.reset();
      setStatus("done");
    } catch {
      setStatus("done");
    }
  }

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-4">
          <motion.button
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 w-full max-w-xl overflow-y-auto max-h-[90vh] rounded-2xl border border-line bg-[#111111] p-5 sm:p-8 text-bone shadow-2xl touch-pan-y"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-ash hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {status === "done" ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <div className="h-16 w-16 bg-accent/20 rounded-full flex items-center justify-center">
                  <Check className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">Demande envoyée !</h3>
                <p className="mt-2 text-ash">
                  Merci. Un expert de DSM Digital vous recontactera sous 24h par email ou WhatsApp.
                </p>
                <button
                  onClick={onClose}
                  className="mt-8 bg-accent px-8 py-2.5 rounded-full text-sm font-medium text-white"
                >
                  Retour au site
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">Parlons de votre projet.</h3>
                  <p className="text-xs text-ash mt-1">
                    Réponse rapide garantie par email ou WhatsApp.
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[9px] font-mono tracking-widest text-ash-dim uppercase mb-1">
                      Nom complet *
                    </label>
                    <input
                      ref={firstFieldRef}
                      name="name"
                      required
                      placeholder="Ex: Amad Diallo"
                      className={FIELD}
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono tracking-widest text-ash-dim uppercase mb-1">
                      Email *
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="nom@exemple.com"
                      className={FIELD}
                    />
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="block text-[9px] font-mono tracking-widest text-ash-dim uppercase mb-1">
                      Numéro WhatsApp / Téléphone *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="+221 77 000 00 00"
                      className={FIELD}
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono tracking-widest text-ash-dim uppercase mb-1">
                      Entreprise / Marque
                    </label>
                    <input
                      name="company"
                      placeholder="Nom de votre structure"
                      className={FIELD}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-ash-dim uppercase mb-1.5">
                    Besoin principal
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setService(s)}
                        className={cn(
                          "px-3 py-1.5 rounded-full border text-[11px] transition-all",
                          service === s
                            ? "border-accent bg-accent/20 text-white font-medium"
                            : "border-line text-ash hover:border-line-strong"
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-mono tracking-widest text-ash-dim uppercase mb-1">
                    Votre projet *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={3}
                    placeholder="Décrivez brièvement ce que vous souhaitez réaliser..."
                    className={cn(FIELD, "resize-none")}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full bg-accent py-3.5 rounded-full flex items-center justify-center gap-2 font-medium text-white transition-all hover:bg-accent-soft active:scale-95 disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    <>
                      <span>Envoyer la demande</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
