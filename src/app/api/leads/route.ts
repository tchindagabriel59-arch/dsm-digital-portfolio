import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, details, branding, timeline, source } = body;

    // 1. Affichage du log complet dans Vercel
    console.log("🔥 NOUVEAU PROSPECT REÇU SUR DSM DIGITAL 🔥", {
      nom: name,
      email: email,
      whatsapp: phone || "Non renseigné",
      service: service || "Non spécifié",
      details: details || "N/A",
      logo: branding || "N/A",
      delai: timeline || "N/A",
      date: new Date().toLocaleString("fr-FR"),
    });

    if (!name || !email) {
      return NextResponse.json(
        { error: "Le nom et l'email sont requis." },
        { status: 400 }
      );
    }

    // 2. Sauvegarde dans la base de données PostgreSQL
    try {
      await db.insert(leads).values({
        name,
        email,
        company: phone ? `Tel/WA: ${phone}` : "Non renseigné",
        service: service || "Non spécifié",
        budget: timeline || "Sur devis",
        message: `Détails: ${details || ""}\nLogo: ${branding || ""}`,
        source: source || "Direct",
      });
    } catch (dbErr) {
      console.error("Note BDD:", dbErr);
    }

    // 3. Envoi d'email Web3Forms (Serveur à Serveur - Format Officiel Web3Forms Free)
    const web3Key = process.env.WEB3FORMS_KEY;

    if (web3Key) {
      try {
        const mailResponse = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `🔥 Nouveau prospect DSM Digital : ${name}`,
            from_name: "DSM Digital Portfolio",
            name: name,
            email: email,
            phone: phone || "Non renseigné",
            service_demande: service || "Non spécifié",
            details_projet: details || "N/A",
            logo_existant: branding || "N/A",
            delai_souhaite: timeline || "N/A",
            message: `Nom complet : ${name}\nEmail : ${email}\nWhatsApp / Tél : ${phone || "Non renseigné"}\nService demandé : ${service}\n\nDétails du projet :\n${details || "Non précisé"}\n\nLogo existant : ${branding}\nDélai souhaité : ${timeline}`,
          }),
        });

        const mailResult = await mailResponse.json();
        console.log("📧 Résultat Web3Forms :", mailResult);
      } catch (mailErr) {
        console.error("Erreur Web3Forms Fetch:", mailErr);
      }
    } else {
      console.log("⚠️ WEB3FORMS_KEY manquante dans les variables Vercel !");
    }

    // 4. Signal Meta CAPI
    const pixelId = process.env.META_PIXEL_ID || "2974733949534772";
    const token = process.env.META_CAPI_TOKEN;

    if (token) {
      fetch(
        `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [
              {
                event_name: "Lead",
                event_time: Math.floor(Date.now() / 1000),
                action_source: "website",
                event_source_url:
                  request.headers.get("referer") ||
                  "https://dsm-digital-portfolio.vercel.app",
                user_data: {
                  em: [email.trim().toLowerCase()],
                  fn: [name.trim().toLowerCase()],
                  ph: phone ? [phone.replace(/\D/g, "")] : undefined,
                },
              },
            ],
          }),
        }
      ).catch((err) => console.log("Note Meta CAPI:", err));
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Erreur serveur globale:", error);
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
