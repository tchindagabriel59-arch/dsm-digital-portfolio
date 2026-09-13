import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { clashDisplay, satoshi } from "@/lib/fonts";
import { SITE } from "@/lib/content";
import SmoothScroll from "@/components/providers/SmoothScroll";
import LoadingProvider from "@/components/providers/LoadingProvider";
import ContactProvider from "@/components/providers/ContactProvider";
import Cursor from "@/components/ui/Cursor";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const TITLE =
  "DSM Digital — Agence de création web, SEO et publicité digitale";
const DESCRIPTION =
  "DSM Digital conçoit des sites web performants et pilote vos campagnes Meta, TikTok et Google Ads. Boostez votre présence en ligne avec une agence orientée résultats.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: TITLE, template: "%s — DSM Digital" },
  description: DESCRIPTION,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,
  keywords: [
    "agence digitale",
    "création site web",
    "développement web",
    "référencement SEO",
    "Meta Ads",
    "TikTok Ads",
    "Google Ads",
    "social media management",
    "agence web Dakar",
    "acquisition payante",
    "site web restaurant",
    "site salle de sport",
    "site salon de coiffure",
    "site web supérette",
    "e-commerce mode cosmétique",
    "site internet entreprise",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: SITE.url,
    siteName: SITE.name,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

/** Données structurées Schema.org (Organization + WebSite). */
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE.url}#organization`,
      name: SITE.name,
      url: SITE.url,
      email: SITE.email,
      description: DESCRIPTION,
      slogan: "Nous créons des expériences digitales qui convertissent.",
      areaServed: "Worldwide",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dakar",
        addressCountry: "SN",
      },
      sameAs: [
        "https://www.linkedin.com",
        "https://www.instagram.com",
        "https://www.tiktok.com",
        "https://www.facebook.com",
      ],
      makesOffer: [
        "Développement web",
        "Référencement SEO",
        "Publicité digitale",
        "Social media management",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
    {
      "@type": "WebSite",
      "@id": `${SITE.url}#website`,
      url: SITE.url,
      name: SITE.name,
      inLanguage: "fr-FR",
      publisher: { "@id": `${SITE.url}#organization` },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${clashDisplay.variable} ${satoshi.variable}`}>
      <body className="grain bg-void text-bone antialiased">
        {/* PIXEL META — DSM DIGITAL */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '2974733949534772');
              fbq('track', 'PageView');
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />

        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>

        {/* Couche d'expérience : smooth scroll, curseur, progression */}
        <SmoothScroll />
        <ScrollProgress />
        <Cursor />

        <LoadingProvider>
          <ContactProvider>
            <Navbar />
            <main id="contenu">{children}</main>
            <Footer />
          </ContactProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
