import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message, source } = body;

    // 1. Validation de base
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Le nom, l'email et le message sont requis." },
        { status: 400 }
      );
    }

    // 2. Enregistrement dans la base de données PostgreSQL
    const [newLead] = await db
      .insert(leads)
      .values({
        name,
        email,
        company: company || null,
        service: service || "Non spécifié",
        budget: budget || "Non spécifié",
        message,
        source: source || "Direct",
      })
      .returning();

    // 3. Envoi du signal Lead à Meta via API de Conversions (CAPI)
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
                    em: [
                      // Hashage SHA256 recommandé par Meta (simple nettoyage ici)
                      email.trim().toLowerCase(),
                    ],
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
        console.error("Erreur d'envoi CAPI Meta :", capiError);
        // On ne bloque pas la réponse si CAPI échoue
      }
    }

    return NextResponse.json(
      { success: true, leadId: newLead.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur serveur lors de la capture du lead :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi de votre demande." },
      { status: 500 }
    );
  }
}
