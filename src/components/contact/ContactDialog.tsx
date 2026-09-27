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

// 🔑 COLLE TA CLÉ ICI (Cherche-la dans "Form Setup" sur Web3Forms)
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
    const company = (data.get("company") as string) || "Non renseignée";
    const message = data.get("message") as string;

    try {
      // 1. Sauvegarde BDD + Meta CAPI (Server)
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message, service }),
      });

      // 2. Envoi Email via Web3Forms (Client-Side)
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: name,
          email: email,
          subject: `🔥 Nouveau prospect : ${name}`,
          message: `Nom: ${name}\nEmail: ${email}\nEntreprise: ${company}\nService: ${service}\nMessage: ${message}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("done");
        form.reset();
      } else {
        console.error("Erreur Web3Forms:", result);
        setStatus("done"); // On affiche quand même "Succès" au client
      }
    } catch (e) {
      console.error("Erreur envoi:", e);
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
            className="relative z-10 w-full max-w-xl overflow-y-auto rounded-2xl border border-line bg-[#111111] p-5 sm:p-8 text-bone shadow-2xl"
          >
            <button onClick={onClose} className="absolute top-4 right-4 p-2 text-ash hover:text-white">
              <X className="h-5 w-5" />
            </button>

            {status === "done" ? (
              <div className="flex flex-col items-center justify-center text-center py-10">
                <div className="h-16 w-16 bg-accent/20 rounded-full flex items-center justify-center">
                  <Check className="h-8 w-8 text-accent" />
                </div>
                <h3 className="mt-6 text-2xl font-bold">Demande envoyée !</h3>
                <p className="mt-2 text-ash">Nous vous répondrons sous 24 heures.</p>
                <button onClick={onClose} className="mt-8 bg-accent px-8 py-2.5 rounded-full text-sm">Retour</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <h3 className="text-2xl font-bold">Parlons de votre projet.</h3>
                  <p className="text-sm text-ash">Réponse rapide garantie par email ou WhatsApp.</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <input ref={firstFieldRef} name="name" required placeholder="Nom complet *" className={FIELD} />
                  <input name="email" type="email" required placeholder="Email *" className={FIELD} />
                </div>
                <input name="company" placeholder="Entreprise / Marque" className={FIELD} />

                <div>
                  <p className="text-[10px] text-ash-dim uppercase tracking-widest mb-2">Besoin principal</p>
                  <div className="flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <button key={s} type="button" onClick={() => setService(s)} className={cn("px-4 py-2 rounded-full border text-[11px] transition-all", service === s ? "border-accent bg-accent/20 text-white" : "border-line text-ash")}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <textarea name="message" required rows={3} placeholder="Détails du projet... *" className={FIELD} />

                <button type="submit" disabled={status === "loading"} className="w-full bg-accent py-4 rounded-full flex items-center justify-center gap-3 font-bold transition-all hover:bg-accent-soft">
                  {status === "loading" ? <Loader2 className="animate-spin" /> : <>Envoyer la demande <ArrowRight className="h-4 w-4" /></>}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
