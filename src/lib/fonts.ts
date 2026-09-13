import localFont from "next/font/local";

/**
 * Typographies auto-hébergées (aucune requête vers un CDN tiers).
 * - Clash Display : titres / display
 * - Satoshi : corps de texte & interface
 */

export const clashDisplay = localFont({
  variable: "--font-clash",
  display: "swap",
  preload: true,
  src: [
    { path: "../fonts/clash-display-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/clash-display-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/clash-display-600.woff2", weight: "600", style: "normal" },
    { path: "../fonts/clash-display-700.woff2", weight: "700", style: "normal" },
  ],
});

export const satoshi = localFont({
  variable: "--font-satoshi",
  display: "swap",
  preload: true,
  src: [
    { path: "../fonts/satoshi-400.woff2", weight: "400", style: "normal" },
    { path: "../fonts/satoshi-500.woff2", weight: "500", style: "normal" },
    { path: "../fonts/satoshi-700.woff2", weight: "700", style: "normal" },
    { path: "../fonts/satoshi-900.woff2", weight: "900", style: "normal" },
  ],
});
