import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message, source } = body;

    console.log("🔥 NOUVEAU PROSPECT REÇU SUR DSM DIGITAL 🔥", {
      nom: name,
      email: email,
      entreprise: company || "Non renseignée",
      service: service || "Non spécifié",
      message: message,
      date: new Date().toLocaleString("fr-FR"),
    });

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Veuillez remplir les champs obligatoires." },
        { status: 400 }
      );
    }

    // 1. Sauvegarde dans BDD PostgreSQL
    try {
      await db.insert(leads).values({
        name,
        email,
        company: company || null,
        service: service || "Non spécifié",
        budget: budget || "Sur devis",
        message,
        source: source || "Direct",
      });
    } catch (dbError) {
      console.error("Note BDD:", dbError);
    }

    // 2. Signalement Meta CAPI
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
                },
              },
            ],
          }),
        }
      ).catch((err) => console.log("Note Meta CAPI:", err));
    }

    return NextResponse.json(
      { success: true, message: "Demande reçue avec succès !" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur générale:", error);
    return NextResponse.json(
      { success: true, message: "Demande reçue !" },
      { status: 200 }
    );
  }
}
