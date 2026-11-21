"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, ArrowUpRight, MessageSquare, Globe, Megaphone, Share2, Search, Zap } from "lucide-react";
import { trackMetaEvent } from "@/lib/meta";

const WHATSAPP_NUMBER = "221787533629";

const PLANS = [
  {
    icon: Globe,
    name: "Création de Sites Internet",
    badge: "Le Plus Demandé",
    price: "80 000",
    priceMax: "à 350 000 FCFA",
    period: "selon l'envergure de votre projet",
    description:
      "Une vitrine digitale prestigieuse et moderne, conçue sur-mesure pour inspirer une confiance immédiate et générer des ventes.",
    features: [
      "Design moderne, élégant et 100% sur-mesure",
      "Affichage ultra-rapide sur smartphone et ordinateur",
      "Boutons d'appel & redirection WhatsApp directe",
      "Formulaire interactif de capture de prospects",
      "Nom de domaine professionnel & hébergement sécurisé",
      "Livraison clé en main sous 5 à 10 jours",
    ],
    highlight: true,
    whatsappMsg: "Bonjour Gabriel, je souhaite obtenir un devis pour la création de mon site internet.",
  },
  {
    icon: Megaphone,
    name: "Publicités Sponsorisées",
    badge: "Acquisition Clients",
    price: "25 000",
    priceMax: "FCFA / mois",
    period: "(+ budget publicitaire de votre choix)",
    description:
      "Attirez quotidiennement de nouveaux clients qualifiés grâce à des campagnes ciblées sur Meta (Facebook/Instagram), TikTok et Google.",
    features: [
      "Installation Pixel & API de Conversions haute précision",
      "Création de visuels et d'accroches de vente percutantes",
      "Ciblage géographique et démographique précis",
      "Optimisation continue pour réduire le coût par prospect",
      "Suivi personnalisé et rapport de rentabilité régulier",
    ],
    highlight: false,
    whatsappMsg: "Bonjour Gabriel, je souhaite lancer des campagnes publicitaires sponsorisées pour booster mes ventes.",
  },
  {
    icon: Share2,
    name: "Gestion des Réseaux Sociaux",
    badge: "Image de Marque",
    price: "25 000",
    priceMax: "FCFA / mois",
    period: "forfait d'accompagnement mensuel",
    description:
      "Bâtissez une forte notoriété et valorisez le sérieux de votre entreprise auprès de votre communauté avec des publications régulières.",
    features: [
      "Conception graphique de visuels professionnels",
      "Rédaction de messages soignés et engageants",
      "Mise en place d'un calendrier éditorial cohérent",
      "Conseils personnalisés pour accroître votre audience",
      "Valorisation continue de vos offres et services",
    ],
    highlight: false,
    whatsappMsg: "Bonjour Gabriel, je souhaite confier la gestion de mes réseaux sociaux à votre agence.",
  },
  {
    icon: Search,
    name: "Référencement Google & Présence Locale",
    badge: "Visibilité Permanente",
    price: "45 000",
    priceMax: "FCFA",
    period: "pack mise en place & positionnement",
    description:
      "Soyez le premier choix des clients de votre secteur géographique lorsqu'ils recherchent vos services sur Google et Google Maps.",
    features: [
      "Création et optimisation de votre fiche Google My Business (Maps)",
      "Positionnement sur les mots-clés clés de votre activité",
      "Indexation officielle sur les moteurs de recherche Google",
      "Mise en avant des avis et de votre numéro direct",
      "Visibilité permanente 24h/24 sans frais supplémentaires",
    ],
    highlight: false,
    whatsappMsg: "Bonjour Gabriel, je souhaite optimiser le référencement Google et la présence locale de mon entreprise.",
  },
];

export default function Pricing() {
  const handlePlanClick = (planName: string, whatsappMsg: string) => {
    // Tracking de l'intention d'achat pour Meta
    trackMetaEvent("InitiateCheckout", {}, {
      content_name: planName,
      content_category: "Offre Tarifaire",
    });

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMsg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="tarifs" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-void border-t border-line overflow-hidden">
      {/* Halo lumineux décoratif */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/25 text-accent text-xs uppercase tracking-wider font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Tarifs Transparents & Accessibles
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-bone tracking-tight font-display">
            Des investissements pensés pour générer des résultats concrets.
          </h2>
          <p className="mt-5 text-ash text-base sm:text-lg leading-relaxed">
            Nous proposons des solutions digitales adaptées aux réalités et ambitions des entreprises, alliant excellence technique et rentabilité dès les premières semaines.
          </p>
        </div>

        {/* Grille des tarifs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {PLANS.map((plan, i) => {
            const Icon = plan.icon;
            return (
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
                    <Zap className="h-3 w-3 fill-current" /> Formule Populaire
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-ash uppercase tracking-wider">
                      {plan.badge}
                    </span>
                    <div className="p-2 rounded-lg bg-void border border-line text-accent">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-bone">{plan.name}</h3>
                  <p className="mt-2 text-xs text-ash leading-relaxed min-h-[48px]">
                    {plan.description}
                  </p>

                  {/* Bloc Prix */}
                  <div className="mt-6 pt-6 border-t border-line">
                    <div className="text-[11px] text-ash-dim uppercase tracking-wider">À partir de</div>
                    <div className="mt-1 flex items-baseline gap-1.5 flex-wrap">
                      <span className="text-3xl sm:text-4xl font-extrabold text-bone tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-sm font-semibold text-accent">
                        {plan.priceMax}
                      </span>
                    </div>
                    <div className="mt-1 text-[11px] text-ash">{plan.period}</div>
                  </div>

                  {/* Inclusions */}
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

                {/* Bouton de souscription WhatsApp */}
                <div className="mt-8 pt-6 border-t border-line">
                  <button
                    onClick={() => handlePlanClick(plan.name, plan.whatsappMsg)}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                      plan.highlight
                        ? "bg-accent hover:bg-accent-light text-white shadow-lg shadow-accent/25 hover:shadow-accent/40"
                        : "bg-void border border-line text-bone hover:border-accent hover:text-white"
                    }`}
                  >
                    <span>Commander cette offre</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Encadré Programme Partenariat & Apport d'Affaires */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 rounded-2xl border border-line bg-[#111111]/80 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-accent uppercase tracking-wider">
              <MessageSquare className="h-4 w-4" /> Programme Partenaire & Apport d&apos;Affaires
            </div>
            <h4 className="text-xl font-bold text-bone">
              Vous connaissez des entrepreneurs ayant besoin d&apos;un site ou de visibilité ?
            </h4>
            <p className="text-sm text-ash max-w-2xl">
              Recommandez DSM Digital à votre réseau professionnel. Pour chaque projet concrétisé grâce à votre mise en relation, nous vous versons une commission directe de <strong>10% à 15%</strong> sur le montant total du contrat.
            </p>
          </div>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Bonjour Gabriel, je souhaite rejoindre votre programme de partenariat / apport d'affaires.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 px-6 py-3.5 rounded-full border border-line-strong hover:border-accent text-bone text-xs font-semibold hover:text-white transition-colors"
          >
            Devenir Partenaire Apporteur
          </a>
        </motion.div>
      </div>
    </section>
  );
}
