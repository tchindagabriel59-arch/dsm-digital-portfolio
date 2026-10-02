import { NextResponse } from "next/server";
import { db } from "@/db";
import { leads } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, service, details, branding, timeline } = body;

    // 1. Sauvegarde BDD PostgreSQL
    try {
      await db.insert(leads).values({
        name,
        email,
        company: phone || "N/A",
        service: service || "N/A",
        budget: timeline || "N/A",
        message: `Détails: ${details}\nLogo: ${branding}`,
        source: "Tunnel Client",
      });
    } catch (dbErr) { console.error("Note BDD:", dbErr); }

    // 2. Signal Meta CAPI
    const pixelId = process.env.META_PIXEL_ID || "2974733949534772";
    const token = process.env.META_CAPI_TOKEN;

    if (token) {
      fetch(`https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: [{
            event_name: "Lead",
            event_time: Math.floor(Date.now() / 1000),
            action_source: "website",
            user_data: {
              em: [email.trim().toLowerCase()],
              fn: [name.trim().toLowerCase()],
              ph: phone ? [phone.replace(/\D/g, "")] : undefined,
            },
          }],
        }),
      }).catch((err) => console.log("Meta CAPI error:", err));
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
