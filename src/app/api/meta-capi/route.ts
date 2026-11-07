import { NextResponse } from "next/server";
import crypto from "crypto";

function hashData(data: string | undefined): string | undefined {
  if (!data) return undefined;
  return crypto
    .createHash("sha256")
    .update(data.trim().toLowerCase())
    .digest("hex");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { eventName, eventId, userData, customData, eventSourceUrl } = body;

    const pixelId = process.env.META_PIXEL_ID || "1094246516766017";
    const accessToken = process.env.META_ACCESS_TOKEN;

    if (!accessToken) {
      console.error("META_ACCESS_TOKEN manquant");
      return NextResponse.json(
        { error: "Access Token manquant" },
        { status: 500 }
      );
    }

    // Récupération IP et User-Agent du visiteur
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "";
    const userAgent = request.headers.get("user-agent") || "";

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: "website",
          event_source_url:
            eventSourceUrl ||
            request.headers.get("referer") ||
            "https://dsm-digital-portfolio.vercel.app",
          user_data: {
            client_ip_address: ip,
            client_user_agent: userAgent,
            em: userData?.email ? [hashData(userData.email)] : undefined,
            ph: userData?.phone
              ? [hashData(userData.phone.replace(/\D/g, ""))]
              : undefined,
            fn: userData?.name
              ? [hashData(userData.name.split(" ")[0])]
              : undefined,
          },
          custom_data: customData || {},
        },
      ],
    };

    const response = await fetch(
      `https://graph.facebook.com/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("Erreur Meta CAPI:", result);
      return NextResponse.json({ error: result }, { status: response.status });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error("Erreur CAPI serveur:", error);
    return NextResponse.json(
      { error: "Erreur serveur interne" },
      { status: 500 }
    );
  }
}
