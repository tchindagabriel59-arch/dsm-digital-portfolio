import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message, source } = body;

    // 1. Afficher la demande dans les Vercel Logs (Alerte Sécurité - Aucun client perdu)
    console.log("🔥 NOUVEAU PROSPECT REÇU SUR DSM DIGITAL 🔥", {
      nom: name,
      email: email,
      entreprise: company || "N/A",
      service: service || "N/A",
      budget: budget || "N/A",
      message: message,
      date: new Date().toLocaleString("fr-FR"),
    });

    // 2. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Veuillez remplir les champs obligatoires." },
        { status: 400 }
      );
    }

    // 3. Tenter l'insertion BDD PostgreSQL
    try {
      await db.insert(leads).values({
        name,
        email,
        company: company || null,
        service: service || "Non spécifié",
        budget: budget || "Non spécifié",
        message,
        source: source || "Direct",
      });
    } catch (dbError) {
      console.error("Note BDD (Lead sauvegardé dans Vercel Logs):", dbError);
    }

    // 4. Envoi du signal 'Lead' à Meta Ads (CAPI)
    const pixelId = process.env.META_PIXEL_ID || "2974733949534772";
    const token = process.env.META_CAPI_TOKEN;

    if (token) {
      try {
        await fetch(
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
                  event_source_url: request.headers.get("referer") || "https://dsm-digital-portfolio.vercel.app",
                  user_data: {
                    em: [email.trim().toLowerCase()],
                    fn: [name.trim().toLowerCase()],
                  },
                  custom_data: {
                    service_requested: service,
                    budget_range: budget,
                  },
                },
              ],
            }),
          }
        );
      } catch (capiError) {
        console.error("Note CAPI Meta:", capiError);
      }
    }

    // 5. Renvoyer toujours le succès pour rassurer le client
    return NextResponse.json(
      { success: true, message: "Votre demande a été envoyée avec succès !" },
      { status: 200 }
    );
  } catch (globalError) {
    console.error("Erreur générale serveur:", globalError);
    return NextResponse.json(
      { success: true, message: "Votre demande a été enregistrée !" },
      { status: 200 }
    );
  }
}
