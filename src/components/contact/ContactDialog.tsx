"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = { open: boolean; onClose: () => void };

const SERVICES = [
  "Création de site internet",
  "Référencement Google",
  "Publicité sponsorisée",
  "Gestion Réseaux Sociaux",
];

const BRANDING_OPTIONS = ["Oui, j'ai déjà un logo", "Non, on part de zéro"];
const TIMELINE_OPTIONS = ["Le plus vite possible", "Dans 1 mois", "Pas d'urgence"];

// 🔑 COLLE TA CLÉ WEB3FORMS ICI (Exemple: a1b2c3d4-xxxx-xxxx)
const WEB3FORMS_KEY = "5f9ecc46-a532-4735-af2d-a4cbbe0e2062";

const FIELD =
  "w-full rounded-xl border border-line bg-void/80 px-4 py-3.5 text-sm text-bone placeholder:text-ash-dim transition-colors focus:border-accent focus:outline-none";

export default function ContactDialog({ open, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", details: "", branding: "", timeline: "",
  });

  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && step === 1) setTimeout(() => firstFieldRef.current?.focus(), 300);
  }, [open, step]);

  useEffect(() => {
    if (!open) setTimeout(() => {
      setStep(1); setStatus("idle");
      setFormData({ name: "", email: "", phone: "", service: "", details: "", branding: "", timeline: "" });
    }, 400);
  }, [open]);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  async function handleFinalSubmit(selectedTimeline: string) {
    setStatus("loading");
    const finalData = { ...formData, timeline: selectedTimeline };

    try {
      // 1. ENVOI EMAIL (Depuis le navigateur - Zéro blocage Cloudflare)
      const emailPromise = fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `🔥 Nouveau prospect : ${finalData.name}`,
          from_name: "DSM Digital Portfolio",
          ...finalData,
          message: `Détails: ${finalData.details}\nLogo: ${finalData.branding}\nDélai: ${selectedTimeline}\nWhatsApp: ${finalData.phone}`
        }),
      });

      // 2. ENVOI SERVEUR (BDD + Meta CAPI)
      const serverPromise = fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(finalData),
      });

      await Promise.all([emailPromise, serverPromise]);
      setStatus("done");
    } catch (e) {
      console.error(e);
      setStatus("done");
    }
  }

  const firstName = formData.name.split(" ")[0] || "là";

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-4">
          <motion.button onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/85 backdrop-blur-md" />
          <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-[#111111] shadow-2xl">
            {status !== "done" && (
              <div className="absolute top-0 left-0 h-1 bg-line w-full">
                <motion.div className="h-full bg-accent" initial={{ width: "20%" }} animate={{ width: `${(step / 5) * 100}%` }} />
              </div>
            )}
            <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 text-ash hover:text-white"><X className="h-5 w-5" /></button>
            <div className="p-6 sm:p-10 min-h-[400px] flex flex-col justify-center">
              {status === "done" ? (
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20"><Check className="h-8 w-8 text-accent" /></div>
                  <h3 className="mt-6 text-3xl font-bold text-bone">Demande envoyée !</h3>
                  <p className="mt-3 text-ash">Merci {firstName}. On se parle très vite sur WhatsApp.</p>
                  <button onClick={onClose} className="mt-8 rounded-full bg-accent px-8 py-3 text-sm text-white">Retour au site</button>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  {step === 1 && (
                    <motion.div key="s1" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                      <h3 className="text-2xl font-bold text-bone">Faisons connaissance.</h3>
                      <div className="space-y-4">
                        <input ref={firstFieldRef} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Nom complet *" className={FIELD} />
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Email *" className={FIELD} />
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="WhatsApp *" className={FIELD} />
                      </div>
                      <button onClick={nextStep} disabled={formData.name.length < 2 || !formData.email.includes("@")} className="w-full bg-accent py-4 rounded-xl text-white disabled:opacity-50">Continuer</button>
                    </motion.div>
                  )}
                  {step === 2 && (
                    <motion.div key="s2" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                      <h3 className="text-2xl font-bold text-bone">Quel est votre besoin ?</h3>
                      <div className="flex flex-col gap-3">
                        {SERVICES.map((s) => (
                          <button key={s} onClick={() => { setFormData({ ...formData, service: s }); nextStep(); }} className="w-full text-left px-5 py-4 rounded-xl border border-line bg-void/50 text-ash hover:border-accent hover:text-white">{s}</button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {step === 3 && (
                    <motion.div key="s3" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                      <h3 className="text-2xl font-bold text-bone">Que fait votre entreprise ?</h3>
                      <textarea value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} rows={4} placeholder="Décrivez votre activité..." className={cn(FIELD, "resize-none")} />
                      <button onClick={nextStep} disabled={formData.details.length < 5} className="w-full bg-accent py-4 rounded-xl text-white disabled:opacity-50">Continuer</button>
                    </motion.div>
                  )}
                  {step === 4 && (
                    <motion.div key="s4" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                      <h3 className="text-2xl font-bold text-bone">Avez-vous déjà un logo ?</h3>
                      <div className="flex flex-col gap-3">
                        {BRANDING_OPTIONS.map((b) => (
                          <button key={b} onClick={() => { setFormData({ ...formData, branding: b }); nextStep(); }} className="w-full text-left px-5 py-4 rounded-xl border border-line bg-void/50 text-ash hover:border-accent hover:text-white">{b}</button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {step === 5 && (
                    <motion.div key="s5" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-6">
                      <h3 className="text-2xl font-bold text-bone">C'est presque fini !</h3>
                      <p className="text-ash">Quand souhaitez-vous démarrer ?</p>
                      <div className="flex flex-col gap-3">
                        {TIMELINE_OPTIONS.map((t) => (
                          <button key={t} onClick={() => handleFinalSubmit(t)} disabled={status === "loading"} className="w-full text-left px-5 py-4 rounded-xl border border-line bg-void/50 text-ash hover:border-accent hover:text-white relative">
                            {status === "loading" ? <Loader2 className="animate-spin h-5 w-5 mx-auto" /> : t}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
