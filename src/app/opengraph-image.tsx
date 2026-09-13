import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt =
  "DSM Digital — agence de création web, SEO et publicité digitale";

/**
 * Image Open Graph générée à la volée : typographie nette, palette de marque.
 * (Plus fiable qu'un JPG statique : toujours à jour avec le positionnement.)
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0A",
          padding: "64px 72px",
          position: "relative",
        }}
      >
        {/* Halo bleu */}
        <div
          style={{
            position: "absolute",
            top: -260,
            right: -160,
            width: 720,
            height: 720,
            borderRadius: 720,
            background:
              "radial-gradient(circle, rgba(0,102,255,0.55) 0%, rgba(0,102,255,0) 68%)",
            display: "flex",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span
            style={{ fontSize: 34, color: "#FAFAFA", letterSpacing: "-0.02em" }}
          >
            DSM
          </span>
          <span
            style={{
              width: 9,
              height: 9,
              borderRadius: 9,
              background: "#0066FF",
              display: "flex",
            }}
          />
          <span
            style={{ fontSize: 17, color: "#6B6B6B", letterSpacing: "0.3em" }}
          >
            DIGITAL
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              fontSize: 78,
              color: "#FAFAFA",
              lineHeight: 1.03,
              letterSpacing: "-0.035em",
              maxWidth: 960,
            }}
          >
            Nous créons des expériences digitales qui{" "}
            <span style={{ color: "#0066FF" }}>convertissent.</span>
          </span>
          <span
            style={{
              marginTop: 28,
              fontSize: 26,
              color: "#A1A1A1",
              maxWidth: 820,
            }}
          >
            Création web · Référencement SEO · Meta, TikTok & Google Ads ·
            Social media
          </span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #1F1F1F",
            paddingTop: 26,
          }}
        >
          <span style={{ fontSize: 20, color: "#6B6B6B" }}>
            contact@dsmdigital.com
          </span>
          <span style={{ fontSize: 20, color: "#6B6B6B" }}>
            Agence digitale — Dakar
          </span>
        </div>
      </div>
    ),
    size,
  );
}
