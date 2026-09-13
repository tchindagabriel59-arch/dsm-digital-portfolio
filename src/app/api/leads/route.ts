import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message, source } = body;

    // 1. Validation des champs obligatoires
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Le nom, l'email et le message sont requis." },
        { status: 400 }
      );
    }

    // 2. Auto-création de la table 'leads' dans Neon si elle n'existe pas
    try {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS leads (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          company TEXT,
          service TEXT,
          budget TEXT,
          message TEXT NOT NULL,
          source TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);
    } catch (tableErr) {
      console.error("Note sur la table :", tableErr);
    }

    // 3. Insertion du lead dans la base de données
    let leadId = null;
    try {
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
      leadId = newLead?.id;
    } catch (dbErr) {
      console.error("Erreur insertion BDD :", dbErr);
    }

    // 4. Envoi du signal 'Lead' à Meta Ads via API de Conversions (CAPI)
    const pixelId = process.env.META_PIXEL_ID || "2974733949534772";
    const token = process.env.META_CAPI_TOKEN;

    if (token) {
      try {
        const clientIp =
          request.headers.get("x-forwarded-for")?.split(",")[0] || "";
        const userAgent = request.headers.get("user-agent") || "";

        const capiPayload: Record<string, any> = {
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
                client_ip_address: clientIp,
                client_user_agent: userAgent,
              },
              custom_data: {
                service_requested: service,
                budget_range: budget,
              },
            },
          ],
        };

        if (process.env.META_TEST_EVENT_CODE) {
          capiPayload.test_event_code = process.env.META_TEST_EVENT_CODE;
        }

        await fetch(
          `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(capiPayload),
          }
        );
      } catch (capiError) {
        console.error("Erreur envoi CAPI Meta :", capiError);
      }
    }

    // 5. Réponse de succès au visiteur
    return NextResponse.json(
      { success: true, leadId: leadId || "recorded" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur globale :", error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de l'envoi." },
      { status: 500 }
    );
  }
}
