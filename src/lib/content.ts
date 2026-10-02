import {
  BarChart3,
  Code2,
  Megaphone,
  Search,
  type LucideIcon,
} from "lucide-react";

/* ==========================================================================
   Source unique de vérité — Contenu éditorial DSM DIGITAL
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
  "Création de sites web",
  "Portfolios Pro",
  "Référencement Google",
  "Publicité Meta Ads",
  "TikTok Ads",
  "Google Ads",
  "Gestion Réseaux Sociaux",
  "E-commerce",
  "Applications sur-mesure",
] as const;

/* --- Secteurs d'activité ------------------------------------------------ */
export const INDUSTRIES = [
  {
    index: "01",
    title: "Restaurants & hospitalité",
    description:
      "Menus digitaux, réservation en ligne, commande & livraison. Attirez plus de clients dès la première semaine.",
    image: "/images/sectors/restaurant.webp",
    alt: "Intérieur premium d'un restaurant contemporain",
  },
  {
    index: "02",
    title: "Sport & bien-être",
    description:
      "Abonnements, planning des cours, coaching et espace membre. Transformez vos visiteurs en membres fidèles.",
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
      "Boutiques en ligne, catalogues, lancements de collections. Vendez en ligne sans limite géographique.",
    image: "/images/sectors/fashion.webp",
    alt: "Boutique de mode et cosmétique au design premium",
  },
  {
    index: "05",
    title: "Commerce & supérettes",
    description:
      "Boutiques en ligne, catalogues, gestion de stock et caisse. Digitalisez votre commerce et vendez plus.",
    image: "/images/sectors/retail.webp",
    alt: "Allées lumineuses d'une supérette moderne",
  },
  {
    index: "06",
    title: "Entreprises & BTP",
    description:
      "Sites vitrines professionnels, présentation de services et génération de devis. Attirez les bons clients B2B.",
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
    title: "Création de sites internet",
    description:
      "Nous concevons des sites professionnels sur-mesure : sites vitrines, e-commerce, portfolios, catalogues et plateformes métier. Design moderne + rapidité sur mobile.",
    icon: Code2,
    items: [
      "Sites vitrines pour entreprises & PME",
      "Portfolios professionnels & freelances",
      "Boutiques e-commerce & catalogues",
      "Systèmes de réservation & commande",
    ],
  },
  {
    index: "02",
    title: "Référencement Google (SEO)",
    description:
      "Soyez visible sur Google en 1ère page quand des clients cherchent vos services dans votre ville ou pays. Recevez du trafic qualifié tous les jours sans payer chaque clic.",
    icon: Search,
    items: [
      "Positionnement sur les recherches Google",
      "Optimisation de votre fiche Google Business",
      "Référencement local (Dakar, Yaoundé, Abidjan...)",
      "Rédaction de contenus optimisés",
    ],
  },
  {
    index: "03",
    title: "Publicité sponsorisée (Ads)",
    description:
      "Campagnes publicitaires ciblées sur Facebook, Instagram, TikTok et Google. Attirez directement des clients prêts à acheter vos produits ou services.",
    icon: Megaphone,
    items: [
      "Publicités Facebook & Instagram (Meta)",
      "Campagnes vidéo TikTok Ads",
      "Publicités sur les recherches Google",
      "Ciblage précis de vos futurs clients",
    ],
  },
  {
    index: "04",
    title: "Gestion de vos réseaux sociaux",
    description:
      "Nous créons des visuels attractifs, rédigeons vos publications et animons vos pages Facebook, Instagram et TikTok pour booster votre notoriété et crédibilité.",
    icon: BarChart3,
    items: [
      "Création de visuels & vidéos pros",
      "Rédaction & publication régulière",
      "Gestion & réponse aux messages",
      "Rapports de visibilité mensuels",
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
  result?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "senauto",
    category: "Site Automobile / Vente & Location",
    name: "Senauto",
    title: "Senauto — Site d'achat, vente & location auto",
    description:
      "Plateforme dédiée à l'achat, la vente et la location de véhicules au Sénégal. Recherche rapide, filtres par budget et contact direct WhatsApp/Appel.",
    stack: ["Site Web", "UI/UX", "Optimisé Mobile"],
    href: "https://senauto-sn.vercel.app/",
    year: "2025",
    result: "📈 +250% de demandes de location",
  },
  {
    slug: "jongo",
    category: "Logiciel / Gestion de Stock",
    name: "Jongo",
    title: "Jongo — Solution de gestion de stocks B2B",
    description:
      "Application web pour boutiques, supérettes, grossistes et détaillants. Suivi d'inventaire facile, gestion des entrées/sorties et rapports de ventes.",
    stack: ["Logiciel Web", "Gestion", "Tableau de bord"],
    href: "https://jango-landing-nine.vercel.app/",
    year: "2025",
    result: "⚡ +50 commerces équipés",
  },
  {
    slug: "brescor",
    category: "Site Vitrine / BTP & Ingénierie",
    name: "Brescor Engineering Group",
    title: "Brescor Engineering — Site d'entreprise",
    description:
      "Site vitrine professionnel pour une grande entreprise d'ingénierie et BTP. Présentation des chantiers, crédibilité maximale et demandes de devis B2B.",
    stack: ["Site Vitrine", "Génération de Devis", "SEO"],
    href: "https://brescor-engineering-group.vercel.app/",
    year: "2024",
    result: "💼 Devis qualifiés dès le 1er mois",
  },
  {
    slug: "lovelink",
    category: "Plateforme / Rencontres",
    name: "Lovelink237",
    title: "Lovelink — Site de rencontres en ligne",
    description:
      "Plateforme communautaire avec création de profils, recherche par affinité et mise en relation sécurisée. Design attractif et rapide.",
    stack: ["Plateforme Web", "Mise en relation", "Securisée"],
    href: "https://lovelink237.com",
    year: "2024",
    result: "🚀 +10 000 utilisateurs inscrits",
  },
];

/* --- Section approche ---------------------------------------------------- */
export const PROCESS = [
  {
    index: "01",
    title: "1. Écoute & Analyse",
    summary: "Nous étudions votre activité, vos concurrents et vos objectifs avant toute création.",
    detail:
      "Comprendre votre marché local, vos clients cibles et ce dont vous avez réellement besoin pour faire décoller vos ventes.",
    deliverables: ["Analyse du besoin", "Stratégie adaptée", "Proposition de projet"],
  },
  {
    index: "02",
    title: "2. Conception & Maquette",
    summary: "Création d'un design moderne, épuré et adapté à votre image de marque.",
    detail:
      "Mise en page attrayante, choix des couleurs, mise en valeur de vos produits/services et boutons d'action clairs.",
    deliverables: ["Maquette visuelle", "Structure des pages", "Validation des textes"],
  },
  {
    index: "03",
    title: "3. Développement & Lancement",
    summary: "Mise en ligne de votre site rapide, sécurisé et 100% lisible sur téléphone portable.",
    detail:
      "Programmation propre, connexion à votre numéro WhatsApp, formulaires sécurisés et installation des outils de statistiques.",
    deliverables: ["Site web en ligne", "Nom de domaine", "Tests sur mobiles"],
  },
  {
    index: "04",
    title: "4. Publicité & Résultats",
    summary: "Nous lançons la publicité sponsorisée pour amener vos premiers clients.",
    detail:
      "Mise en place des annonces Facebook, Instagram ou TikTok. Suivi des performances pour garantir un vrai retour sur investissement.",
    deliverables: ["Campagnes de pub", "Statistiques claires", "Suivi continu"],
  },
] as const;

/* --- Section chiffres ---------------------------------------------------- */
export const STATS = [
  { value: 15, suffix: "+", label: "Projets créés" },
  { value: 4, suffix: "", label: "Services d'expertise" },
  { value: 100, suffix: "%", label: "Clients satisfaits" },
  { value: 24, suffix: "/7", label: "Disponibilité" },
] as const;

/* --- Section témoignages (Trust) ---------------------------------------- */
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  company: string;
  project?: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "DSM Digital n'a pas seulement créé notre marketplace. En 3 mois, nos demandes de location ont plus que doublé. Leur suivi pub Meta a changé la donne.",
    author: "Moussa Diop",
    role: "Fondateur",
    company: "Senauto",
    project: "Senauto",
  },
  {
    quote:
      "On cherchait un outil simple pour gérer nos stocks. Jongo a transformé notre quotidien. L'équipe DSM a livré exactement ce qu'il nous fallait, dans les délais.",
    author: "Aïcha Ndiaye",
    role: "Directrice opérationnelle",
    company: "Réseau de boutiques Dakar",
    project: "Jongo",
  },
  {
    quote:
      "Site corporate premium, génération de devis dès le premier mois. DSM comprend le B2B et livre un niveau digne des grandes agences internationales.",
    author: "Ibrahima Fall",
    role: "Directeur commercial",
    company: "Brescor Engineering Group",
    project: "Brescor",
  },
  {
    quote:
      "De la maquette au lancement pub, tout a été fluide. On a passé les 10 000 utilisateurs plus vite que prévu. Je recommande les yeux fermés.",
    author: "Kevin Manga",
    role: "CEO",
    company: "Lovelink237",
    project: "Lovelink",
  },
];

/* --- Section FAQ (Questions Fréquentes) -------------------------------- */
export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Combien de temps prend la création d'un site internet ?",
    answer:
      "En moyenne entre 7 et 14 jours ouvrés selon la complexité du projet (site vitrine, portfolio, e-commerce ou plateforme sur-mesure). Nous vous fournissons un planning clair dès le premier jour.",
  },
  {
    question: "Comment se déroule le paiement ?",
    answer:
      "Le paiement s'effectue en 2 fois : un acompte de 50% au lancement du projet pour démarrer les travaux, et le solde de 50% à la livraison finale après votre validation complète. Paiements acceptés : Virement bancaire, Wave, Orange Money ou MTN Mobile Money.",
  },
  {
    question: "Serai-je propriétaire à 100% de mon site web ?",
    answer:
      "Oui, absolument. Vous êtes l'unique propriétaire de votre nom de domaine, de vos accès d'hébergement, du code et de tous vos contenus. Aucun abonnement caché ni dépendance.",
  },
  {
    question: "Puis-je modifier mes textes et produits moi-même après ?",
    answer:
      "Oui ! Nous concevons votre site pour qu'il soit simple à utiliser. À la livraison, nous vous fournissons une courte vidéo de formation personnalisée pour ajouter ou modifier vos produits, prix et textes en toute autonomie.",
  },
  {
    question: "Le site est-il rapide et optimisé pour la connexion mobile localement ?",
    answer:
      "Oui, tous nos sites sont développés avec Next.js (la technologie utilisée par Nike et TikTok), garantissant un chargement instantané même avec une connexion 3G/4G standard au Sénégal, Cameroun ou en Côte d'Ivoire.",
  },
  {
    question: "Que se passe-t-il si j'ai un problème après la mise en ligne ?",
    answer:
      "Nous offrons un support et une garantie d'assistance technique gratuite pendant 30 jours après la livraison pour répondre à toutes vos questions et garantir le bon fonctionnement de votre écosystème.",
  },
];

/* --- Textes Hero --------------------------------------------------------- */
export const HERO = {
  badge: "⚡ Disponible pour de nouveaux projets",
  titleLines: [
    "Transformez votre",
    "présence digitale",
    "en machine à",
  ],
  titleHighlight: "générer des clients",
  subtitle:
    "Création de sites internet professionnels, référencement Google et publicités sponsorisées ciblées (Meta, TikTok, Google). Nous développons votre activité pour des résultats sous 30 jours.",
  ctaPrimary: "Obtenir une étude & devis gratuit",
  ctaSecondary: "Voir nos réalisations",
} as const;

/* --- CTA Final ----------------------------------------------------------- */
export const FINAL_CTA = {
  badge: "Réponse sous 24 h",
  title: "Prêt à faire passer votre entreprise au niveau supérieur ?",
  subtitle:
    "Discutons de votre projet. Étude gratuite + devis clair et détaillé sous 24h, sans engagement.",
  cta: "Démarrer mon projet",
  emailLabel: "Ou écrivez-nous directement à",
} as const;

/* --- Footer -------------------------------------------------------------- */
export const FOOTER_COLUMNS = [
  {
    title: "Agence",
    links: [
      { label: "À propos", href: "#approche" },
      { label: "Notre méthode", href: "#approche" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Création de sites internet", href: "#services" },
      { label: "Création de Portfolios", href: "#services" },
      { label: "Publicité sponsorisée (Ads)", href: "#services" },
      { label: "Gestion Réseaux Sociaux", href: "#services" },
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
