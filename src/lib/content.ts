import {
  BarChart3,
  Code2,
  Megaphone,
  Search,
  type LucideIcon,
} from "lucide-react";

/* ==========================================================================
   Source unique de vérité — Contenu éditorial DSM DIGITAL
   Optimisé pour la conversion (CRO) · Meta Ads · TikTok Ads · Google Ads
   ========================================================================== */

export const SITE = {
  name: "DSM Digital",
  legalName: "DSM Digital",
  tagline: "Votre présence digitale qui génère des clients",
  email: "digitalstoremarketing40@gmail.com",
  phone: "+221787533629",
  address: "Dakar, Sénégal — interventions à distance dans le monde entier",
  url: "https://dsm-digital-portfolio.vercel.app",
} as const;

export const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Réalisations", href: "#realisations" },
  { label: "Approche", href: "#approche" },
  { label: "Contact", href: "#contact" },
] as const;

/* --- Bandeau défilant du hero ------------------------------------------- */
export const MARQUEE_ITEMS = [
  "Développement web",
  "SEO",
  "Meta Ads",
  "TikTok Ads",
  "Google Ads",
  "Social media",
  "UI / UX",
  "Analytics",
  "E-commerce",
  "SaaS",
] as const;

/* --- Secteurs d'activité ------------------------------------------------ */
export const INDUSTRIES = [
  {
    index: "01",
    title: "Restaurants & hospitalité",
    description:
      "Menus digitaux, réservation en ligne, commande & livraison. Attirez plus de couverts dès la première semaine.",
    image: "/images/sectors/restaurant.webp",
    alt: "Intérieur premium d'un restaurant contemporain",
  },
  {
    index: "02",
    title: "Sport & bien-être",
    description:
      "Abonnements, planning des cours, coaching et espace membre. Transformez les visiteurs en adhérents fidèles.",
    image: "/images/sectors/sport.webp",
    alt: "Salle de sport moderne aux lumières bleues",
  },
  {
    index: "03",
    title: "Coiffure & beauté",
    description:
      "Prise de rendez-vous 24h/24, catalogue de prestations et fidélisation. Remplissez votre agenda automatiquement.",
    image: "/images/sectors/beauty.webp",
    alt: "Salon de coiffure élégant et contemporain",
  },
  {
    index: "04",
    title: "Mode & cosmétiques",
    description:
      "E-commerce premium, lookbooks, lancements de collections. Vendez en ligne sans limite géographique.",
    image: "/images/sectors/fashion.webp",
    alt: "Boutique de mode et cosmétique au design premium",
  },
  {
    index: "05",
    title: "Commerce & supérettes",
    description:
      "Boutiques en ligne, catalogues, stocks, click & collect. Digitalisez votre point de vente et multipliez vos commandes.",
    image: "/images/sectors/retail.webp",
    alt: "Allées lumineuses d'une supérette moderne",
  },
  {
    index: "06",
    title: "Entreprises & industrie",
    description:
      "Sites corporate, plateformes métiers et génération de leads B2B. Attirez les bons clients, pas n'importe lequel.",
    image: "/images/sectors/corporate.webp",
    alt: "Architecture moderne d'un siège d'entreprise",
  },
] as const;

/* --- Section services ---------------------------------------------------- */
export type Service = {
  index: string;
  title: string;
  description: string;
  icon: LucideIcon;
  items: string[];
};

export const SERVICES: Service[] = [
  {
    index: "01",
    title: "Développement web",
    description:
      "Des sites conçus pour convertir : vitrines, e-commerce, réservation, SaaS et plateformes métier. Design premium + performance technique.",
    icon: Code2,
    items: [
      "Sites vitrines & institutionnels",
      "E-commerce & catalogues produits",
      "Réservation, commande & abonnements",
      "SaaS, marketplaces & plateformes métier",
    ],
  },
  {
    index: "02",
    title: "Référencement SEO",
    description:
      "Apparaissez en 1ère page Google quand vos clients vous cherchent. Visibilité durable, trafic qualifié, sans dépendre uniquement de la pub.",
    icon: Search,
    items: [
      "Audit technique complet",
      "Optimisation on-page & contenu",
      "Stratégie de mots-clés locaux",
      "Netlinking & autorité de domaine",
    ],
  },
  {
    index: "03",
    title: "Publicité digitale",
    description:
      "Campagnes Meta, TikTok et Google pilotées au coût par prospect. Chaque euro dépensé est mesuré, testé et optimisé en continu.",
    icon: Megaphone,
    items: [
      "Meta Ads (Facebook / Instagram)",
      "TikTok Ads",
      "Google Ads (Search & Display)",
      "Retargeting & audiences lookalike",
    ],
  },
  {
    index: "04",
    title: "Social media management",
    description:
      "Une présence qui attire, engage et convertit. Contenus stratégiques, communauté active et reporting clair chaque mois.",
    icon: BarChart3,
    items: [
      "Stratégie éditoriale sur-mesure",
      "Création de contenus (visuels + textes)",
      "Community management réactif",
      "Reporting mensuel & recommandations",
    ],
  },
];

/* --- Section réalisations ------------------------------------------------ */
export type Project = {
  slug: "senauto" | "jongo" | "brescor" | "lovelink";
  category: string;
  name: string;
  title: string;
  description: string;
  stack: string[];
  href: string;
  year: string;
  result?: string; // Métrique d'impact pour la preuve sociale
};

export const PROJECTS: Project[] = [
  {
    slug: "senauto",
    category: "Plateforme web / Marketplace",
    name: "Senauto",
    title: "Senauto — Marketplace automobile",
    description:
      "Plateforme d'achat, vente et location de véhicules au Sénégal. Filtres avancés, parcours fluide et optimisé mobile pour maximiser les prises de contact.",
    stack: ["Next.js", "UI/UX", "Responsive design"],
    href: "https://senauto-sn.vercel.app/",
    year: "2025",
    result: "📈 +250% de demandes de location",
  },
  {
    slug: "jongo",
    category: "SaaS / Application métier",
    name: "Jongo",
    title: "Jongo — Gestion de stocks B2B",
    description:
      "Application web pour boutiques, supérettes, grossistes et détaillants. Suivi d'inventaire en temps réel, tableaux de bord clairs, zéro rupture de stock.",
    stack: ["SaaS", "Dashboard", "Data management"],
    href: "https://jango-landing-nine.vercel.app/",
    year: "2025",
    result: "⚡ +50 commerces équipés",
  },
  {
    slug: "brescor",
    category: "Site corporate",
    name: "Brescor Engineering Group",
    title: "Brescor Engineering — Site institutionnel",
    description:
      "Site vitrine premium pour un groupe d'ingénierie et de construction. Design corporate rassurant, portfolio projets mis en valeur, génération de leads B2B.",
    stack: ["Corporate", "Lead generation", "SEO"],
    href: "https://brescor-engineering-group.vercel.app/",
    year: "2024",
    result: "💼 Devis qualifiés dès le 1er mois",
  },
  {
    slug: "lovelink",
    category: "Plateforme communautaire",
    name: "Lovelink237",
    title: "Lovelink — Plateforme de rencontres",
    description:
      "Site de rencontres en ligne avec gestion des profils, matching intelligent et sécurisation des données. Expérience fluide, moderne et engageante.",
    stack: ["Plateforme", "Auth", "Temps réel"],
    href: "https://lovelink237.com",
    year: "2024",
    result: "🚀 +10 000 utilisateurs actifs",
  },
];

/* --- Section approche ---------------------------------------------------- */
export const PROCESS = [
  {
    index: "01",
    title: "Découverte",
    summary: "On écoute avant de proposer. Analyse de votre marché, vos freins et vos objectifs business.",
    detail:
      "Audit de l'existant, analyse concurrentielle, entretiens et lecture de vos données. L'objectif : comprendre exactement ce qui freine votre croissance avant d'écrire la moindre ligne de code.",
    deliverables: ["Audit initial", "Analyse concurrentielle", "Personas clients"],
  },
  {
    index: "02",
    title: "Stratégie",
    summary: "Une feuille de route claire, chiffrée, avec des indicateurs de succès définis dès le départ.",
    detail:
      "Arborescence, messages clés, canaux d'acquisition prioritaires et budget média. Vous savez précisément où on va, pourquoi, et comment on mesurera le succès.",
    deliverables: ["Roadmap", "Plan média", "KPIs cibles"],
  },
  {
    index: "03",
    title: "Exécution",
    summary: "Design, développement et lancement des campagnes. Tracking installé dès le jour 1.",
    detail:
      "Sprints courts avec points de validation réguliers. Chaque euro investi est mesurable. Vous voyez l'avancement en temps réel, sans zone d'ombre.",
    deliverables: ["Design system", "Développement", "Setup tracking"],
  },
  {
    index: "04",
    title: "Optimisation",
    summary: "On ne livre pas et on disparaît. On itère pour maximiser votre retour sur investissement.",
    detail:
      "Tests A/B, ajustement des créas, optimisation des enchères et du contenu. La performance n'est pas un livrable ponctuel : c'est un cycle qu'on entretient mois après mois.",
    deliverables: ["Tests A/B", "Reporting mensuel", "Itérations continues"],
  },
] as const;

/* --- Section chiffres ---------------------------------------------------- */
export const STATS = [
  { value: 15, suffix: "+", label: "Projets livrés" },
  { value: 4, suffix: "", label: "Domaines d'expertise" },
  { value: 100, suffix: "%", label: "Clients satisfaits" },
  { value: 24, suffix: "/7", label: "Support disponible" },
] as const;

/* --- Textes Hero (utilisées dans Hero.tsx) ------------------------------ */
export const HERO = {
  badge: "⚡ Disponible pour de nouveaux projets",
  titleLines: [
    "Transformez votre",
    "présence digitale",
    "en machine",
  ],
  titleHighlight: "à générer des clients",
  subtitle:
    "Création de sites web sur-mesure, SEO et campagnes publicitaires ultra-ciblées (Meta, TikTok, Google). Nous construisons votre écosystème digital pour des résultats mesurables sous 30 jours.",
  ctaPrimary: "Obtenir une étude & devis gratuit",
  ctaSecondary: "Voir nos réalisations",
} as const;

/* --- CTA Final ----------------------------------------------------------- */
export const FINAL_CTA = {
  badge: "Réponse sous 24 h",
  title: "Prêt à passer à l'échelle supérieure ?",
  subtitle:
    "Discutons de votre projet. Étude gratuite + devis sur-mesure sous 24 heures, sans engagement.",
  cta: "Démarrer mon projet",
  emailLabel: "Ou écrivez-nous à",
} as const;

/* --- Footer -------------------------------------------------------------- */
export const FOOTER_COLUMNS = [
  {
    title: "Agence",
    links: [
      { label: "À propos", href: "#approche" },
      { label: "Approche", href: "#approche" },
      { label: "Carrières", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Développement web", href: "#services" },
      { label: "Référencement SEO", href: "#services" },
      { label: "Publicité digitale", href: "#services" },
      { label: "Social media", href: "#services" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: SITE.email, href: `mailto:${SITE.email}` },
      { label: SITE.phone, href: `tel:${SITE.phone.replace(/\s/g, "")}` },
      { label: "Dakar, Sénégal", href: "#contact" },
    ],
  },
  {
    title: "Suivez-nous",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com" },
      { label: "Instagram", href: "https://www.instagram.com" },
      { label: "TikTok", href: "https://www.tiktok.com" },
      { label: "Facebook", href: "https://www.facebook.com" },
    ],
  },
] as const;
