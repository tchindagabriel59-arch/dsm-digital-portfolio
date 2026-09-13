import {
  BarChart3,
  Code2,
  Megaphone,
  Search,
  type LucideIcon,
} from "lucide-react";

/* ==========================================================================
   Source unique de vérité pour tout le contenu éditorial du site.
   Modifier ce fichier suffit pour mettre à jour le portfolio.
   ========================================================================== */

export const SITE = {
  name: "DSM Digital",
  legalName: "DSM Digital",
  tagline: "Agence digitale — web, SEO & acquisition payante",
  email: "digitalstoremarketing40@gmail.com",
  phone: "+221787533629",
  address: "Dakar, Sénégal — à distance dans le monde entier",
  url: "https://dsmdigital.com",
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
] as const;

/* --- Secteurs d'activité : DSM crée tous les types de sites -------------- */
export const INDUSTRIES = [
  {
    index: "01",
    title: "Restaurants & hospitalité",
    description: "Menus digitaux, réservation, commande en ligne et livraison.",
    image: "/images/sectors/restaurant.webp",
    alt: "Intérieur premium d'un restaurant contemporain",
  },
  {
    index: "02",
    title: "Sport & bien-être",
    description: "Abonnements, planning des cours, coaching et espace membre.",
    image: "/images/sectors/sport.webp",
    alt: "Salle de sport moderne aux lumières bleues",
  },
  {
    index: "03",
    title: "Coiffure & beauté",
    description: "Prise de rendez-vous, catalogue de prestations et fidélisation.",
    image: "/images/sectors/beauty.webp",
    alt: "Salon de coiffure élégant et contemporain",
  },
  {
    index: "04",
    title: "Mode & cosmétiques",
    description: "E-commerce, lookbooks, lancements de collections et marques.",
    image: "/images/sectors/fashion.webp",
    alt: "Boutique de mode et cosmétique au design premium",
  },
  {
    index: "05",
    title: "Commerce & supérettes",
    description: "Boutiques en ligne, catalogues, stocks, click & collect et caisse.",
    image: "/images/sectors/retail.webp",
    alt: "Allées lumineuses d'une supérette moderne",
  },
  {
    index: "06",
    title: "Entreprises & industrie",
    description: "Sites corporate, plateformes métiers, intranets et génération de leads.",
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
      "Nous concevons tous les types de sites, pour tous les secteurs : de la présence locale à la plateforme métier complexe.",
    icon: Code2,
    items: [
      "Sites vitrines & institutionnels",
      "E-commerce & catalogues",
      "Réservation, commande & abonnements",
      "SaaS, marketplaces & plateformes métier",
    ],
  },
  {
    index: "02",
    title: "Référencement SEO",
    description:
      "On construit une visibilité durable : structure technique saine, contenu utile et autorité de domaine.",
    icon: Search,
    items: [
      "Audit technique",
      "Optimisation on-page",
      "Stratégie de contenu",
      "Netlinking",
    ],
  },
  {
    index: "03",
    title: "Publicité digitale",
    description:
      "Des campagnes pilotées au coût d'acquisition, testées en continu et reliées à vos vraies données business.",
    icon: Megaphone,
    items: [
      "Meta Ads (Facebook / Instagram)",
      "TikTok Ads",
      "Google Ads",
      "Retargeting",
    ],
  },
  {
    index: "04",
    title: "Social media management",
    description:
      "Une présence éditoriale cohérente, une communauté animée et des contenus qui servent vos objectifs.",
    icon: BarChart3,
    items: [
      "Stratégie éditoriale",
      "Création de contenu",
      "Community management",
      "Reporting mensuel",
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
};

export const PROJECTS: Project[] = [
  {
    slug: "senauto",
    category: "Plateforme web / Marketplace",
    name: "Senauto",
    title: "Senauto — Marketplace automobile",
    description:
      "Plateforme dédiée à l'achat, la vente et la location de véhicules au Sénégal. Interface intuitive, système de filtres avancés et parcours utilisateur optimisé pour la conversion.",
    stack: ["Next.js", "UI/UX", "Responsive design"],
    href: "https://senauto-sn.vercel.app/",
    year: "2025",
  },
  {
    slug: "jongo",
    category: "SaaS / Application métier",
    name: "Jongo",
    title: "Jongo — Solution de gestion de stocks",
    description:
      "Application web B2B pour la gestion et le suivi des stocks. Destinée aux boutiques, supérettes, grossistes et détaillants souhaitant digitaliser leur inventaire.",
    stack: ["SaaS", "Dashboard", "Data management"],
    href: "https://jango-landing-nine.vercel.app/",
    year: "2025",
  },
  {
    slug: "brescor",
    category: "Site corporate",
    name: "Brescor Engineering Group",
    title: "Brescor Engineering — Site institutionnel",
    description:
      "Site vitrine premium pour un groupe d'ingénierie et de construction. Design corporate, mise en valeur du portfolio de projets et génération de leads qualifiés.",
    stack: ["Corporate", "Lead generation", "SEO"],
    href: "https://brescor-engineering-group.vercel.app/",
    year: "2024",
  },
  {
    slug: "lovelink",
    category: "Plateforme communautaire",
    name: "Lovelink237",
    title: "Lovelink — Plateforme de rencontres",
    description:
      "Site de rencontres en ligne avec gestion complète des profils, système de matching et sécurisation des données utilisateurs.",
    stack: ["Plateforme", "Auth", "Temps réel"],
    href: "https://lovelink237.com",
    year: "2024",
  },
];

/* --- Section approche ---------------------------------------------------- */
export const PROCESS = [
  {
    index: "01",
    title: "Découverte",
    summary: "Analyse de votre marché, vos objectifs et votre audience cible.",
    detail:
      "On commence par écouter. Audit de l'existant, analyse concurrentielle, entretiens et lecture des données déjà disponibles. L'objectif : comprendre ce qui freine réellement votre croissance avant d'écrire la moindre ligne de code.",
    deliverables: ["Audit initial", "Analyse concurrentielle", "Personas"],
  },
  {
    index: "02",
    title: "Stratégie",
    summary: "Définition d'un plan d'action digital sur mesure.",
    detail:
      "Arborescence, messages clés, canaux d'acquisition prioritaires et budget média. Vous repartez avec une feuille de route claire, chiffrée, avec des indicateurs de succès définis en amont.",
    deliverables: ["Roadmap", "Plan média", "KPIs cibles"],
  },
  {
    index: "03",
    title: "Exécution",
    summary: "Développement, création de contenu et lancement des campagnes.",
    detail:
      "Design et développement en sprints courts, avec des points de validation réguliers. Tracking installé dès le premier jour pour que chaque euro dépensé soit mesurable.",
    deliverables: ["Design system", "Développement", "Setup tracking"],
  },
  {
    index: "04",
    title: "Optimisation",
    summary:
      "Analyse des KPIs et amélioration continue pour maximiser le ROI.",
    detail:
      "Tests A/B, itérations sur les créas, ajustement des enchères et du contenu. La performance n'est pas un livrable ponctuel : c'est un cycle que l'on entretient mois après mois.",
    deliverables: ["Tests A/B", "Reporting", "Itérations"],
  },
] as const;

/* --- Section chiffres ---------------------------------------------------- */
export const STATS = [
  { value: 15, suffix: "+", label: "Projets livrés" },
  { value: 4, suffix: "", label: "Domaines d'expertise" },
  { value: 100, suffix: "%", label: "Clients satisfaits" },
  { value: 24, suffix: "/7", label: "Support disponible" },
] as const;

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
