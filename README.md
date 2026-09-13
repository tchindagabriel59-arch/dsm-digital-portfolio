# DSM Digital — Portfolio d'agence

Landing page one-page de l'agence **DSM Digital** (création web, SEO, publicité
digitale, social media). Conçue pour servir de page d'atterrissage à des
campagnes payantes (Meta, TikTok, Google Ads) : elle doit impressionner **et**
convertir.

---

## Stack

| Brique      | Choix                                                       |
| ----------- | ----------------------------------------------------------- |
| Framework   | Next.js 16 (App Router) + TypeScript                        |
| Styling     | Tailwind CSS v4 (config en CSS) + CSS Modules               |
| Animations  | Framer Motion + animations CSS custom                       |
| Smooth scroll | Lenis                                                     |
| Icônes      | Lucide React (aucun emoji dans l'UI)                        |
| Typographies| Clash Display (titres) + Satoshi (texte), auto-hébergées     |
| Données     | PostgreSQL + Drizzle ORM (table `leads`)                    |

---

## Démarrage

```bash
npm install
cp .env.example .env      # renseigner DATABASE_URL
npx drizzle-kit push      # crée la table `leads`
npm run dev               # http://localhost:3000
```

Scripts utiles :

```bash
npm run build       # build de production
npm run start       # serveur de production
npm run typecheck   # vérification TypeScript
npm run lint        # ESLint
```

---

## Architecture

```
src/
├── app/
│   ├── api/
│   │   ├── health/route.ts      # healthcheck
│   │   └── leads/route.ts       # POST (nouvelle demande) / GET (stats)
│   ├── globals.css              # design system Tailwind v4 (@theme)
│   ├── layout.tsx               # métadonnées SEO, JSON-LD, providers
│   ├── opengraph-image.tsx      # image OG générée (1200×630)
│   ├── page.tsx                 # assemblage des sections
│   ├── robots.ts / sitemap.ts
├── components/
│   ├── contact/ContactDialog.tsx    # formulaire → base de données
│   ├── layout/{Navbar,Footer}.tsx
│   ├── mockups/ProjectMockup.tsx    # placeholders CSS des projets
│   ├── providers/                   # Lenis, écran de chargement, contact
│   ├── sections/                    # Hero, Services, Work, Approach, Stats, CTA
│   └── ui/                          # briques réutilisables + micro-interactions
├── db/{index.ts,schema.ts}
├── fonts/                            # woff2 auto-hébergés
├── hooks/useCountUp.ts
└── lib/{content.ts,fonts.ts,utils.ts}
```

---

## Personnalisation

### Contenu

Tout l'éditorial vit dans **`src/lib/content.ts`** : coordonnées, navigation,
services, projets, étapes de la méthode, chiffres clés, colonnes du footer.
Aucun texte n'est codé en dur dans les sections (hors titres de section).

### Couleurs, typographies, animations

Tout se règle dans le bloc `@theme` de **`src/app/globals.css`** :

```css
--color-void: #0a0a0a;   /* fond principal */
--color-surface: #111111;
--color-line: #1f1f1f;   /* bordures */
--color-accent: #0066ff; /* bleu signature */
--color-accent-soft: #3385ff;
--color-bone: #fafafa;   /* texte */
--color-ash: #a1a1a1;    /* texte secondaire */
```

### Remplacer les images temporaires par de vraies captures

Les quatre projets utilisent déjà des **photographies WebP temporaires**
transformées en mini landing pages. Elles sont dans `public/images/projects/`.
Les six images de secteurs sont dans `public/images/sectors/`.

Pour remplacer un mockup de projet :

1. Exporter la capture au ratio 16:10 (format conseillé : 1600×1000, WebP).
2. Remplacer le fichier portant le même nom dans `public/images/projects/`.
3. Dans `src/components/sections/Work.tsx`, ajouter `decorated={false}` afin de
   masquer le texte temporaire et d'afficher la vraie capture seule :

```tsx
<ProjectMockup
  slug={project.slug}
  alt={`Aperçu du projet ${project.title}`}
  image={`/images/projects/${project.slug}.webp`}
  decorated={false}
/>
```

Pour une image sectorielle, remplacer simplement le fichier correspondant dans
`public/images/sectors/` : aucun code ne doit être modifié.

### Sources des visuels temporaires

Photographies issues de Pexels, compressées localement en WebP : 大狮 陈
(restauration), Fire Flintq8 (sport), Max Vakhtbovych (beauté et mode), Nothing
Ahead (commerce), Brett Sayles (corporate), Youness Hamiddine (automobile),
Ryan Klaus (stocks), Mukhtar Shuaib Mukhtar (construction) et Ron Lach
(communauté). Elles servent uniquement de visuels de démonstration en attendant
les captures définitives.

---

## Formulaire de contact

`ContactDialog` envoie les demandes sur `POST /api/leads`, qui valide puis
insère la ligne dans la table `leads` (nom, email, entreprise, service, budget,
message, source). La **source** est déduite du paramètre `utm_source` ou du
referrer : utile pour attribuer les leads à vos campagnes payantes.

Consulter les demandes :

```bash
psql "$DATABASE_URL" -c "select created_at, name, email, service, source from leads order by created_at desc;"
```

---

## Micro-interactions

- Écran de chargement (barre bleue + monogramme), joué une fois par session
- Curseur personnalisé (point + anneau élastique, libellé « Visiter »)
- Barre de progression de lecture
- Révélation typographique mot par mot au scroll
- Boutons magnétiques
- Parallaxe sur les mockups, halo suivant la souris sur les cards services
- Sphère filaire 3D en canvas réagissant au curseur
- Bandeau défilant infini, timeline sticky, compteurs animés

Toutes les animations sont désactivées si `prefers-reduced-motion: reduce`.

---

## SEO

- Métadonnées complètes (title, description, OG, Twitter Card, canonical)
- `opengraph-image.tsx` : image sociale 1200×630 générée sans dépendance
- Données structurées Schema.org `Organization` + `WebSite`
- `sitemap.xml` et `robots.txt` générés automatiquement
- HTML sémantique, `lang="fr"`, libellés ARIA, lien d'évitement

Penser à mettre à jour `SITE.url` dans `src/lib/content.ts` avec le domaine
définitif avant la mise en production.

---

## Déploiement (Vercel)

1. Pousser le dépôt sur GitHub, puis « Import Project » sur Vercel.
2. Renseigner la variable d'environnement `DATABASE_URL` (Neon, Supabase,
   Railway…).
3. Lancer `npx drizzle-kit push` une fois contre la base de production.
4. Déployer : le build Next.js est détecté automatiquement.

---

© DSM Digital — Tous droits réservés.
