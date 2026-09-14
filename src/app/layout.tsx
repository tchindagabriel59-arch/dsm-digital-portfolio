import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { clashDisplay, satoshi } from "@/lib/fonts";
import { SITE } from "@/lib/content";
import SmoothScroll from "@/components/providers/SmoothScroll";
import LoadingProvider from "@/components/providers/LoadingProvider";
import ContactProvider from "@/components/providers/ContactProvider";
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
  robots: {
    index: true,
    follow: true,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${clashDisplay.variable} ${satoshi.variable}`}>
      <head>
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
      </head>
      <body className="grain bg-void text-bone antialiased">
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>

        {/* Couche d'expérience */}
        <SmoothScroll />
        <ScrollProgress />

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
