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
  // ⚠️ REMPLACE CE NUMÉRO par ton vrai numéro WhatsApp (format international sans + ni espaces)
  // Exemple Sénégal : 221771234567 | Cameroun : 2376XXXXXXXX
  const WHATSAPP_NUMBER = "237651387914";
  const WHATSAPP_MESSAGE = encodeURIComponent(
    "Bonjour DSM Digital 👋\nJ'ai vu votre portfolio et je souhaite obtenir un devis pour mon projet."
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

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

        {/* ═══════════════════════════════════════════
            BOUTON WHATSAPP FLOTTANT — Conversion N°1
            ═══════════════════════════════════════════ */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discuter sur WhatsApp"
          className="group fixed bottom-6 right-6 z-[200] flex items-center gap-3"
        >
          {/* Bulle de texte (apparaît au survol sur desktop) */}
          <span className="pointer-events-none hidden md:block opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300 bg-[#111111] border border-[#1F1F1F] text-white text-sm font-medium px-4 py-2.5 rounded-full shadow-xl whitespace-nowrap">
            Une question ? Écrivez-nous
          </span>

          {/* Bouton principal */}
          <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
            {/* Pulsation animée */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />

            {/* Icône WhatsApp SVG officielle */}
            <svg
              viewBox="0 0 24 24"
              fill="currentColor"
              className="relative h-7 w-7"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
          </span>
        </a>
      </body>
    </html>
  );
}
