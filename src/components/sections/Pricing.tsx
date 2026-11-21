"use client";

import { motion } from "framer-motion";
import { Check, Zap, Sparkles, MessageSquare, ArrowUpRight } from "lucide-react";
import { useContact } from "@/components/providers/ContactProvider";

const PLANS = [
  {
    name: "Site Vitrine & Landing Page Pro",
    badge: "Populaire PME",
    price: "150 000",
    priceMax: "350 000 FCFA",
    period: "paiement unique",
    description:
      "Idéal pour les entreprises qui veulent une crédibilité immédiate et transformer leurs visiteurs en clients WhatsApp.",
    features: [
      "Design moderne & 100% sur-mesure",
      "Optimisé smartphone à haute vitesse",
      "Intégration WhatsApp direct & formulaires",
      "Référencement Google local (SEO)",
      "Nom de domaine pro & hébergement sécurisé",
      "Livraison rapide en 7 à 10 jours",
    ],
    highlight: false,
    ctaText: "Lancer mon site vitrine",
  },
  {
    name: "Plateforme Web & Sur-Mesure",
    badge: "Haute Performance",
    price: "450 000",
    priceMax: "FCFA et +",
    period: "sur devis selon cahier des charges",
    description:
      "Pour les projets ambitieux nécessitant une logique métier avancée, des bases de données et des automatisations.",
    features: [
      "Tout ce qui est inclus dans le Site Vitrine",
      "Espace administrateur / Tableau de bord",
      "Gestion de catalogue, membres ou réservations",
      "Base de données haute disponibilité",
      "Paiements en ligne (Orange Money, Wave, Carte)",
      "Support & maintenance prioritaire 3 mois",
    ],
    highlight: true,
    ctaText: "Discuter de mon architecture",
  },
  {
    name: "Campagnes Publicitaires",
    badge: "Croissance Rapide",
    price: "25 000",
    priceMax: "FCFA / mois",
    period: "(+ budget pub de votre choix)",
    description:
      "Générez un flux continu de prospects qualifiés grâce aux publicités ciblées sur Meta, TikTok et Google.",
    features: [
      "Configuration Pixel & CAPI haute précision",
      "Création des visuels publicitaires percutants",
      "Rédaction de messages de vente (Copywriting)",
      "Ciblage géographique & démographique ultra-précis",
      "Optimisation continue pour baisser le coût par prospect",
      "Rapport hebdomadaire des résultats",
    ],
    highlight: false,
    ctaText: "Booster mes ventes",
  },
  {
    name: "Gestion Complète Réseaux",
    badge: "Image de Marque",
    price: "25 000",
    priceMax: "FCFA / mois",
    period: "forfait mensuel",
    description:
      "Déléguez entièrement vos réseaux sociaux pour bâtir une communauté engagée et une autorité totale dans votre secteur.",
    features: [
      "Création de visuels graphiques professionnels",
      "Vidéos courtes attractives (Reels / TikTok)",
      "Calendrier de publication régulier",
      "Animation et réponses aux messages / commentaires",
      "Stratégie de croissance organique",
      "Bilan de performance mensuel",
    ],
    highlight: false,
    ctaText: "Déléguer mes réseaux",
  },
];

export default function Pricing() {
  const { openContact } = useContact();

  return (
    <section id="tarifs" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-void border-t border-line overflow-hidden">
      {/* Halo lumineux de fond */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* En-tête */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs uppercase tracking-wider font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Tarifs clairs & transparents
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-bone tracking-tight font-display">
            Investissez dans des outils qui vous rapportent des clients.
          </h2>
          <p className="mt-5 text-ash text-base sm:text-lg">
            Pas de mauvaise surprise ni de frais cachés. Nos forfaits sont pensés pour être rentabilisés dès vos premiers contrats.
          </p>
        </div>

        {/* Grille des tarifs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative flex flex-col justify-between rounded-2xl p-7 transition-all duration-300 ${
                plan.highlight
                  ? "bg-[#141414] border-2 border-accent shadow-[0_0_40px_rgba(37,99,235,0.2)] lg:-translate-y-2"
                  : "bg-[#0F0F0F] border border-line hover:border-line-strong hover:bg-[#121212]"
              }`}
            >
              {plan.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-accent text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Zap className="h-3 w-3 fill-current" /> Recommandé
                </div>
              )}

              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-ash uppercase tracking-wider">
                    {plan.badge}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-bold text-bone">{plan.name}</h3>
                <p className="mt-2 text-xs text-ash leading-relaxed min-h-[48px]">
                  {plan.description}
                </p>

                {/* Bloc Prix */}
                <div className="mt-6 pt-6 border-t border-line">
                  <div className="text-xs text-ash-dim uppercase tracking-wider">À partir de</div>
                  <div className="mt-1 flex items-baseline gap-1.5">
                    <span className="text-3xl sm:text-4xl font-extrabold text-bone tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-sm font-semibold text-accent">
                      {plan.priceMax}
                    </span>
                  </div>
                  <div className="mt-1 text-xs text-ash">{plan.period}</div>
                </div>

                {/* Liste des fonctionnalités */}
                <ul className="mt-8 space-y-3.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-xs text-ash leading-snug">
                      <div className="flex-shrink-0 mt-0.5 rounded-full p-0.5 bg-accent/15 text-accent">
                        <Check className="h-3.5 w-3.5" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bouton d'action */}
              <div className="mt-8 pt-6 border-t border-line">
                <button
                  onClick={openContact}
                  className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                    plan.highlight
                      ? "bg-accent hover:bg-accent-light text-white shadow-lg shadow-accent/25 hover:shadow-accent/40"
                      : "bg-void border border-line text-bone hover:border-accent hover:text-white"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Encadré spécial : Modalité Partenariat / Apport d'affaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-line bg-[#111111]/80 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
              <MessageSquare className="h-4 w-4" /> Programme Apport d'Affaires & Partenariat
            </div>
            <h4 className="text-xl font-bold text-bone">
              Vous avez des confrères ou partenaires qui ont besoin d'un site ?
            </h4>
            <p className="text-sm text-ash max-w-2xl">
              Recommandez DSM Digital à votre entourage. Pour chaque contrat conclu grâce à vous, nous vous reversons une **commission directe de 10% à 15%**.
            </p>
          </div>
          <button
            onClick={openContact}
            className="flex-shrink-0 px-6 py-3.5 rounded-full border border-line-strong hover:border-accent text-bone text-xs font-semibold hover:text-white transition-colors"
          >
            Devenir Partenaire Apporteur
          </button>
        </motion.div>
      </div>
    </section>
  );
}
