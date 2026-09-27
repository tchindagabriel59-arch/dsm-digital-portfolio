import { Space_Grotesk, Inter } from "next/font/google";

/**
 * Typographies d'agence modernes servies via Next.js Google Fonts
 * - Space_Grotesk : Titres & Display (--font-clash)
 * - Inter : Corps de texte & UI (--font-satoshi)
 */

export const clashDisplay = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-clash",
  display: "swap",
});

export const satoshi = Inter({
  subsets: ["latin"],
  variable: "--font-satoshi",
  display: "swap",
});
