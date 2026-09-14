import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, service, budget, message, source } = body;

    // 1. Log d'alerte instantané dans Vercel Logs (Garanti à 100%)
    console.log("🔥 NOUVEAU PROSPECT REÇU SUR DSM DIGITAL 🔥", {
      nom: name,
      email: email,
      entreprise: company || "Non renseignée",
      service: service || "Développement web",
      budget: budget || "Non spécifié",
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

    // 3. Envoi asynchrone à Meta Ads CAPI (Pixel)
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
                custom_data: {
                  service_requested: service,
                  budget_range: budget,
                },
              },
            ],
          }),
        }
      ).catch((err) => console.log("Note Meta CAPI:", err));
    }

    // 4. Réponse de succès garantie au navigateur
    return NextResponse.json(
      { success: true, ok: true, message: "Demande reçue avec succès !" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Note serveur:", error);
    return NextResponse.json(
      { success: true, ok: true, message: "Demande reçue !" },
      { status: 200 }
    );
  }
}
