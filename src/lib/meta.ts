/**
 * Tracking hybride Meta (Pixel Client + CAPI Serveur)
 * Avec déduplication via event_id pour éviter les doublons.
 */

type UserData = {
  email?: string;
  phone?: string;
  name?: string;
};

type CustomData = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (
      action: string,
      eventName: string,
      params?: CustomData,
      options?: { eventID?: string }
    ) => void;
  }
}

export function trackMetaEvent(
  eventName: string,
  userData?: UserData,
  customData?: CustomData
) {
  // Identifiant unique partagé entre le Pixel (navigateur) et la CAPI (serveur)
  const eventId = `evt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

  // 1. Envoi côté navigateur (Meta Pixel)
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, customData || {}, { eventID: eventId });
  }

  // 2. Envoi côté serveur (CAPI) — contourne les bloqueurs de pub et iOS
  if (typeof window !== "undefined") {
    fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventId,
        userData,
        customData,
        eventSourceUrl: window.location.href,
      }),
    }).catch((err) => console.error("Erreur CAPI:", err));
  }
}
