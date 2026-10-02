"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Check, Loader2, X } from "lucide-react";
import { SITE } from "@/lib/content";
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

// 🔑 COLLE TA CLÉ PUBLIQUE WEB3FORMS ICI (Cherche-la dans Form Setup sur Web3Forms)
const WEB3FORMS_KEY = "5f9ecc46-a532-4735-af2d-a4cbbe0e2062";

const FIELD =
  "w-full rounded-xl border border-line bg-void/80 px-4 py-3.5 text-sm text-bone placeholder:text-ash-dim transition-colors focus:border-accent focus:outline-none";

export default function ContactDialog({ open, onClose }: Props) {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    details: "",
    branding: "",
    timeline: "",
  });

  const firstFieldRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && step === 1) {
      setTimeout(() => firstFieldRef.current?.focus(), 300);
    }
  }, [open, step]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(1);
        setStatus("idle");
        setFormData({ name: "", email: "", phone: "", service: "", details: "", branding: "", timeline: "" });
      }, 400);
    }
  }, [open]);

  const nextStep = () => setStep((s) => s + 1);
  const prevStep = () => setStep((s) => s - 1);

  const isStep1Valid = formData.name.trim().length >= 2 && formData.email.includes("@") && formData.phone.trim().length >= 6;
  const isStep3Valid = formData.details.trim().length >= 5;

  async function handleFinalSubmit(selectedTimeline: string) {
    setStatus("loading");
    const finalData = { ...formData, timeline: selectedTimeline };

    const params = new URLSearchParams(window.location.search);
    const source = params.get("utm_source") ?? (document.referrer ? new URL(document.referrer).hostname : "direct");

    try {
      // 1. Sauvegarde BDD + Meta CAPI (Server)
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...finalData, source }),
      }).catch((err) => console.log("API Server error:", err));

      // 2. Envoi Email Direct via Web3Forms (Client-Side)
      if (WEB3FORMS_KEY && WEB3FORMS_KEY !== "5f9ecc46-a532-4735-af2d-a4cbbe0e2062") {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: `🔥 Nouveau prospect DSM Digital : ${finalData.name}`,
            from_name: "DSM Digital Portfolio",
            name: finalData.name,
            email: finalData.email,
            message: `Nom complet : ${finalData.name}\nEmail : ${finalData.email}\nWhatsApp : ${finalData.phone}\n\nService demandé : ${finalData.service}\n\nDétails de l'entreprise : \n${finalData.details}\n\nLogo existant : ${finalData.branding}\nDélai souhaité : ${selectedTimeline}`,
          }),
        });
      }
      setStatus("done");
    } catch (e) {
      console.error("Erreur submission:", e);
      setStatus("done");
    }
  }

  const firstName = formData.name.split(" ")[0] || "là";

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-4">
          <motion.button onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/85 backdrop-blur-md" />

          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl border border-line bg-[#111111] shadow-2xl"
          >
            {status !== "done" && (
              <div className="absolute top-0 left-0 h-1 bg-line w-full">
                <motion.div className="h-full bg-accent" initial={{ width: "20%" }} animate={{ width: `${(step / 5) * 100}%` }} transition={{ ease: "easeInOut" }} />
              </div>
            )}

            <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 text-ash hover:text-white">
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 sm:p-10 min-h-[400px] flex flex-col justify-center">
              {status === "done" ? (
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
                    <Check className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="mt-6 text-3xl font-bold text-bone">Demande envoyée !</h3>
                  <p className="mt-3 text-ash">
                    Merci {firstName}. Un expert de DSM Digital vous contactera sous 24h par WhatsApp ou email.
                  </p>
                  <button onClick={onClose} className="mt-8 rounded-full bg-accent px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90">
                    Retour au site
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence mode="wait">
                  {/* ÉTAPE 1 : Contact */}
                  {step === 1 && (
                    <motion.div key="step1" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                      <div>
                        <p className="font-mono text-[10px] tracking-widest text-accent uppercase">Étape 1/5</p>
                        <h3 className="mt-2 text-2xl font-bold text-bone">Prêt à faire décoller votre projet ?</h3>
                        <p className="text-sm text-ash mt-2">Commençons par les présentations.</p>
                      </div>
                      <div className="space-y-4">
                        <input ref={firstFieldRef} value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Votre nom complet *" className={FIELD} />
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="Votre email *" className={FIELD} />
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="Numéro WhatsApp *" className={FIELD} />
                      </div>
                      <button onClick={nextStep} disabled={!isStep1Valid} className="w-full bg-accent py-4 rounded-xl flex items-center justify-center gap-2 font-medium text-white hover:bg-accent-soft disabled:opacity-50 transition-all">
                        Continuer <ArrowRight className="h-4 w-4" />
                      </button>
                    </motion.div>
                  )}

                  {/* ÉTAPE 2 : Service */}
                  {step === 2 && (
                    <motion.div key="step2" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                      <div>
                        <p className="font-mono text-[10px] tracking-widest text-accent uppercase">Étape 2/5</p>
                        <h3 className="mt-2 text-2xl font-bold text-bone">Enchanté {firstName} !</h3>
                        <p className="text-sm text-ash mt-2">Quel est le besoin principal de votre entreprise aujourd'hui ?</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        {SERVICES.map((s) => (
                          <button key={s} onClick={() => { setFormData({ ...formData, service: s }); nextStep(); }} className="w-full text-left px-5 py-4 rounded-xl border border-line bg-void/50 text-ash hover:border-accent hover:text-white transition-all">
                            {s}
                          </button>
                        ))}
                      </div>
                      <button onClick={prevStep} className="text-sm text-ash hover:text-white flex items-center gap-2 mt-4"><ArrowLeft className="h-4 w-4" /> Retour</button>
                    </motion.div>
                  )}

                  {/* ÉTAPE 3 : Description */}
                  {step === 3 && (
                    <motion.div key="step3" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                      <div>
                        <p className="font-mono text-[10px] tracking-widest text-accent uppercase">Étape 3/5</p>
                        <h3 className="mt-2 text-2xl font-bold text-bone">Aider votre activité à grandir.</h3>
                        <p className="text-sm text-ash mt-2">Pour bien vous accompagner, que fait votre entreprise exactement ?</p>
                      </div>
                      <textarea value={formData.details} onChange={(e) => setFormData({ ...formData, details: e.target.value })} rows={4} placeholder="Ex: J'ai un salon de coiffure et je souhaite que les clientes puissent réserver en ligne..." className={cn(FIELD, "resize-none")} />
                      <div className="flex justify-between items-center mt-4">
                        <button onClick={prevStep} className="text-sm text-ash hover:text-white flex items-center gap-2"><ArrowLeft className="h-4 w-4" /> Retour</button>
                        <button onClick={nextStep} disabled={!isStep3Valid} className="bg-accent px-6 py-3 rounded-xl flex items-center gap-2 font-medium text-white disabled:opacity-50">Continuer <ArrowRight className="h-4 w-4" /></button>
                      </div>
                    </motion.div>
                  )}

                  {/* ÉTAPE 4 : Branding */}
                  {step === 4 && (
                    <motion.div key="step4" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                      <div>
                        <p className="font-mono text-[10px] tracking-widest text-accent uppercase">Étape 4/5</p>
                        <h3 className="mt-2 text-2xl font-bold text-bone">C'est très clair !</h3>
                        <p className="text-sm text-ash mt-2">Concernant votre visuel, avez-vous déjà un logo et des couleurs définies ?</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        {BRANDING_OPTIONS.map((b) => (
                          <button key={b} onClick={() => { setFormData({ ...formData, branding: b }); nextStep(); }} className="w-full text-left px-5 py-4 rounded-xl border border-line bg-void/50 text-ash hover:border-accent hover:text-white transition-all">
                            {b}
                          </button>
                        ))}
                      </div>
                      <button onClick={prevStep} className="text-sm text-ash hover:text-white flex items-center gap-2 mt-4"><ArrowLeft className="h-4 w-4" /> Retour</button>
                    </motion.div>
                  )}

                  {/* ÉTAPE 5 : Urgence & Envoi direct */}
                  {step === 5 && (
                    <motion.div key="step5" initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="space-y-6">
                      <div>
                        <p className="font-mono text-[10px] tracking-widest text-accent uppercase">Étape 5/5</p>
                        <h3 className="mt-2 text-2xl font-bold text-bone">Dernière étape, {firstName}.</h3>
                        <p className="text-sm text-ash mt-2">Pour nous organiser, quand souhaiteriez-vous démarrer ce projet ?</p>
                      </div>
                      <div className="flex flex-col gap-3">
                        {TIMELINE_OPTIONS.map((t) => (
                          <button key={t} onClick={() => handleFinalSubmit(t)} disabled={status === "loading"} className="w-full text-left px-5 py-4 rounded-xl border border-line bg-void/50 text-ash hover:border-accent hover:text-white transition-all relative font-medium">
                            {status === "loading" ? <Loader2 className="animate-spin h-5 w-5 absolute right-5 top-1/2 -translate-y-1/2 text-accent" /> : t}
                          </button>
                        ))}
                      </div>
                      <button onClick={prevStep} className="text-sm text-ash hover:text-white flex items-center gap-2 mt-4"><ArrowLeft className="h-4 w-4" /> Retour</button>
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
