export function trackMetaEvent(
  eventName: string,
  userData?: { email?: string; phone?: string; name?: string },
  customData?: Record<string, any>
) {
  // Génère un ID unique pour la déduplication entre Pixel et CAPI
  const eventId = `event_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`

  // 1. Envoi au navigateur (Meta Pixel Client)
  if (typeof window !== 'undefined' && (window as any).fbq) {
    ;(window as any).fbq('track', eventName, customData || {}, { eventID: eventId })
  }

  // 2. Envoi au serveur (Meta CAPI - Contourne les adblockers)
  fetch('/api/meta-capi', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      eventName,
      eventId,
      userData,
      customData,
    }),
  }).catch((err) => console.error('Erreur CAPI client fetch:', err))
}
