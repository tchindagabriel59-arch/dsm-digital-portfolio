import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, details, branding, timeline, source } = body;

    const WEB3FORMS_KEY = process.env.WEB3FORMS_KEY;

    console.log("🔥 NOUVEAU PROSPECT REÇU SUR DSM DIGITAL 🔥", {
      nom: name, email, whatsapp: phone, service,
      details, logo: branding, delai: timeline
    });

    if (!name || !email) {
      return NextResponse.json({ error: "Champs requis" }, { status: 400 });
    }

    try {
      await db.insert(leads).values({
        name, email,
        company: "Tunnel Interactif",
        service: service || "Non spécifié",
        budget: timeline || "Non spécifié",
        message: `Détails: ${details}\nLogo: ${branding}`,
        source: source || "Direct",
      });
    } catch (e) { console.error(e); }

    if (WEB3FORMS_KEY) {
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `🔥 Nouveau prospect DSM Digital : ${name}`,
          from_name: "DSM Digital Portfolio",
          name, email,
          message: `Nom : ${name}\nEmail : ${email}\nWhatsApp : ${phone}\n\nService : ${service}\n\nEntreprise/Projet : \n${details}\n\nLogo existant : ${branding}\nDélai souhaité : ${timeline}`,
        }),
      }).catch(e => console.error(e));
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
