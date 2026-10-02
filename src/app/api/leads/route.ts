import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, details, branding, timeline, source } = body;

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

    // 1. Sauvegarde BDD PostgreSQL
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

    // 2. Formatage du message d'email
    const formattedMessage = `🔥 NOUVEAU PROSPECT DSM DIGITAL 🔥\n\n• Nom : ${name}\n• Email : ${email}\n• WhatsApp : ${phone || "N/A"}\n• Service : ${service || "N/A"}\n• Description : ${details || "N/A"}\n• Logo existant : ${branding || "N/A"}\n• Délai souhaité : ${timeline || "N/A"}`;

    // 3. Envoi via Web3Forms avec En-tête Navigateur Chrome (Bypasse Cloudflare)
    const web3Key = process.env.WEB3FORMS_KEY;
    let emailSent = false;

    if (web3Key) {
      try {
        const mailRes = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          },
          body: JSON.stringify({
            access_key: web3Key,
            subject: `🔥 Prospect DSM Digital : ${name} (${service})`,
            from_name: "DSM Digital Portfolio",
            name: name,
            email: email,
            message: formattedMessage,
          }),
        });

        const resText = await mailRes.text();
        if (resText.includes('"success":true')) {
          console.log("✅ Email envoyé via Web3Forms !");
          emailSent = true;
        } else {
          console.log("⚠️ Réponse Web3Forms :", resText);
        }
      } catch (e) {
        console.error("Erreur Web3Forms:", e);
      }
    }

    // 4. Secours automatique FormSubmit si Web3Forms est bloqué
    if (!emailSent) {
      try {
        await fetch("https://formsubmit.co/ajax/digitalstoremarketing40@gmail.com", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          },
          body: JSON.stringify({
            _subject: `🔥 Prospect DSM Digital : ${name}`,
            Nom_Complet: name,
            Email: email,
            WhatsApp: phone || "N/A",
            Service: service || "N/A",
            Details_Projet: details || "N/A",
            Logo: branding || "N/A",
            Delai: timeline || "N/A",
          }),
        });
        console.log("✅ Email envoyé via le secours FormSubmit !");
      } catch (fsErr) {
        console.error("Erreur FormSubmit:", fsErr);
      }
    }

    // 5. Signal Meta CAPI
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
    console.error("Erreur globale:", error);
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
