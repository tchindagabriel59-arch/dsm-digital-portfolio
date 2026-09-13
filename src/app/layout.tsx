import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { clashDisplay, satoshi } from "@/lib/fonts";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { LoadingProvider } from "@/components/providers/LoadingProvider";
import { ContactProvider } from "@/components/providers/ContactProvider";
import { Preloader } from "@/components/ui/Preloader";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { ContactDialog } from "@/components/contact/ContactDialog";

export const metadata: Metadata = {
  title: "DSM Digital — Agence de création web, SEO et publicité digitale",
  description:
    "DSM Digital conçoit des sites web performants et pilote vos campagnes Meta, TikTok et Google Ads. Boostez votre présence en ligne avec une agence orientée résultats.",
  keywords: [
    "agence digitale",
    "création site web",
    "SEO",
    "Meta Ads",
    "TikTok Ads",
    "Google Ads",
    "Sénégal",
    "Dakar",
    "Cameroun",
  ],
  authors: [{ name: "DSM Digital" }],
  openGraph: {
    title: "DSM Digital — Agence de création web & acquisition",
    description: "Transformez votre présence en ligne en machine à résultats.",
    url: "https://dsm-digital-portfolio.vercel.app",
    siteName: "DSM Digital",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${clashDisplay.variable} ${satoshi.variable} dark antialiased`}
    >
      <head>
        {/* PIXEL META (FACEBOOK ADS) */}
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
      <body className="bg-background text-foreground selection:bg-accent selection:text-white overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-white focus:rounded-md"
        >
          Aller au contenu principal
        </a>
        <LoadingProvider>
          <ContactProvider>
            <Preloader />
            <ScrollProgress />
            <Cursor />
            <SmoothScroll>
              <div id="main-content">{children}</div>
            </SmoothScroll>
            <ContactDialog />
          </ContactProvider>
        </LoadingProvider>
      </body>
    </html>
  );
}
