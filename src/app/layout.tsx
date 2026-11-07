import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { clashDisplay, satoshi } from "@/lib/fonts";
import SmoothScroll from "@/components/providers/SmoothScroll";
import LoadingProvider from "@/components/providers/LoadingProvider";
import ContactProvider from "@/components/providers/ContactProvider";
import ScrollProgress from "@/components/ui/ScrollProgress";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import "./globals.css";

const TITLE = "DSM Digital — Agence de Création Web, SEO & Publicité";
const DESCRIPTION =
  "Création de sites internet professionnels, référencement Google et publicités sponsorisées (Meta, TikTok, Google). Développez votre activité avec des résultats sous 30 jours.";

export const metadata: Metadata = {
  metadataBase: new URL("https://dsm-digital-portfolio.vercel.app"),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "DSM Digital",
  authors: [{ name: "DSM Digital" }],
  keywords: [
    "création site internet",
    "agence web Dakar",
    "publicité Facebook",
    "TikTok Ads",
    "Google Ads",
    "référencement SEO",
  ],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://dsm-digital-portfolio.vercel.app",
    siteName: "DSM Digital",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/images/sectors/corporate.webp",
        width: 1200,
        height: 630,
        alt: "DSM Digital — Agence Digitale & Création Web",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/images/sectors/corporate.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr" className={`${clashDisplay.variable} ${satoshi.variable}`}>
      <head>
        {/* PIXEL META — DSM DIGITAL (ID: 1094246516766017) */}
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
              fbq('init', '1094246516766017');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1094246516766017&ev=PageView&noscript=1"
            alt="Meta Pixel"
          />
        </noscript>
      </head>
      <body className="grain bg-void text-bone antialiased">
        <a href="#contenu" className="skip-link">
          Aller au contenu
        </a>

        <SmoothScroll />
        <ScrollProgress />

        <LoadingProvider>
          <ContactProvider>
            <Navbar />
            <main id="contenu">{children}</main>
            <Footer />
          </ContactProvider>
        </LoadingProvider>

        <WhatsAppButton />
      </body>
    </html>
  );
}
