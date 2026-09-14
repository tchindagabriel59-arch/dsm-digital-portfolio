import { NextResponse } from "next/server";
import { db } from "@/db";
import { sql } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message, source } = body;

    // 1. Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nom, email et message requis." },
        { status: 400 }
      );
    }

    // 2. Créer la table si elle n'existe pas (SQL brut)
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
        created_at TIMESTAMP DEFAULT NOW()
      )
    `);

    // 3. Insérer le lead (SQL brut, sans Drizzle ORM)
    const result = await db.execute(sql`
      INSERT INTO leads (name, email, company, service, budget, message, source)
      VALUES (${name}, ${email}, ${company || ""}, ${service || ""}, ${budget || ""}, ${message}, ${source || "Direct"})
      RETURNING id
    `);

    const leadId = result.rows?.[0]?.id || null;

    // 4. Envoyer l'événement Lead à Meta CAPI
    const pixelId = process.env.META_PIXEL_ID || "2974733949534772";
    const token = process.env.META_CAPI_TOKEN;

    if (token) {
      try {
        const clientIp = request.headers.get("x-forwarded-for")?.split(",")[0] || "";
        const userAgent = request.headers.get("user-agent") || "";

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
                  event_source_url: "https://dsm-digital-portfolio.vercel.app",
                  user_data: {
                    em: [email.trim().toLowerCase()],
                    fn: [name.trim().toLowerCase()],
                    client_ip_address: clientIp,
                    client_user_agent: userAgent,
                  },
                  custom_data: {
                    service_requested: service || "",
                    budget_range: budget || "",
                  },
                },
              ],
            }),
          }
        );
      } catch (e) {
        console.error("Erreur CAPI:", e);
      }
    }

    return NextResponse.json({ success: true, leadId }, { status: 201 });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Erreur serveur." }, { status: 500 });
  }
}
