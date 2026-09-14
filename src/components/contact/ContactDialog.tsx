"use client";

import { useState } from "react";
import { useContact } from "@/components/providers/ContactProvider";
import { SERVICES, BUDGETS } from "@/lib/content";
import { X, Check, Loader2, Send } from "lucide-react";

export function ContactDialog() {
  const { isOpen, closeContact } = useContact();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: SERVICES[0]?.title || "Développement web",
    budget: BUDGETS[0] || "< 1 500 €",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        closeContact();
      }, 3000);
    } catch {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        closeContact();
      }, 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#111111] border border-[#222222] rounded-2xl p-6 md:p-8 text-white shadow-2xl">
        <button
          onClick={closeContact}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {status === "success" ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 bg-[#0066FF]/20 text-[#0066FF] rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold">Demande reçue !</h3>
            <p className="text-gray-400 max-w-md mx-auto">
              Merci pour votre message. Un expert de DSM Digital vous recontactera sous 24h.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Démarrer un projet</h2>
              <p className="text-sm text-gray-400">
                Parlez-nous de vos besoins, nous vous répondons sous 24 heures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  NOM COMPLET *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0066FF]"
                  placeholder="Ex: Amad Diallo"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0066FF]"
                  placeholder="nom@exemple.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                ENTREPRISE / MARQUE
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0066FF]"
                placeholder="Nom de votre entreprise"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-400 mb-1">
                VOTRE PROJET *
              </label>
              <textarea
                required
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-[#1A1A1A] border border-[#333333] rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0066FF]"
                placeholder="Décrivez brièvement vos besoins..."
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#0066FF] hover:bg-[#3385FF] text-white font-medium py-3 rounded-lg flex items-center justify-center gap-2 transition-all"
            >
              {status === "loading" ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <span>Envoyer la demande</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
