import { NextResponse } from "next/server";
import { desc, sql } from "drizzle-orm";
import { db } from "@/db";
import { leads } from "@/db/schema";
import { isValidEmail } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Tronque proprement une chaîne pour respecter les limites SQL. */
function clean(value: unknown, max: number): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

/**
 * POST /api/leads — enregistre une demande de projet.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const name = clean(body.name, 120);
    const email = clean(body.email, 180);
    const message = clean(body.message, 4000);

    const errors: Record<string, string> = {};
    if (!name || name.length < 2) errors.name = "Indiquez votre nom.";
    if (!email || !isValidEmail(email)) errors.email = "Email invalide.";
    if (!message || message.length < 10)
      errors.message = "Décrivez votre projet en quelques mots.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ ok: false, errors }, { status: 400 });
    }

    const [created] = await db
      .insert(leads)
      .values({
        name: name as string,
        email: email as string,
        company: clean(body.company, 160),
        budget: clean(body.budget, 60),
        service: clean(body.service, 80),
        message: message as string,
        source: clean(body.source, 120) ?? "site-web",
      })
      .returning({ id: leads.id, createdAt: leads.createdAt });

    return NextResponse.json({ ok: true, lead: created }, { status: 201 });
  } catch (error) {
    console.error("[POST /api/leads]", error);
    return NextResponse.json(
      { ok: false, error: "Impossible d'enregistrer la demande." },
      { status: 500 },
    );
  }
}

/**
 * GET /api/leads — statistiques légères (nombre de demandes + dernières entrées).
 * Sert à alimenter la preuve sociale dynamique de la section contact.
 */
export async function GET() {
  try {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(leads);

    const latest = await db
      .select({ createdAt: leads.createdAt })
      .from(leads)
      .orderBy(desc(leads.createdAt))
      .limit(1);

    return NextResponse.json({
      ok: true,
      count,
      lastRequestAt: latest[0]?.createdAt ?? null,
    });
  } catch (error) {
    console.error("[GET /api/leads]", error);
    return NextResponse.json({ ok: false, count: 0 }, { status: 200 });
  }
}
