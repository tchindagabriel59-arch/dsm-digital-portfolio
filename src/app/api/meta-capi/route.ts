import { NextResponse } from 'next/server'
import crypto from 'crypto'

function hashData(data: string | undefined): string | undefined {
  if (!data) return undefined
  return crypto.createHash('sha256').update(data.trim().toLowerCase()).digest('hex')
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { eventName, eventId, userData, customData } = body

    const pixelId = process.env.META_PIXEL_ID || '1094246516766017'
    const accessToken = process.env.META_ACCESS_TOKEN || ''

    if (!accessToken) {
      return NextResponse.json({ error: 'Missing Access Token' }, { status: 500 })
    }

    // Récupération IP et User-Agent
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] || request.headers.get('x-real-ip')
    const userAgent = request.headers.get('user-agent') || ''

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId,
          action_source: 'website',
          event_source_url: request.headers.get('referer') || 'https://dsm-digital-portfolio.vercel.app',
          user_data: {
            client_ip_address: ip,
            client_user_agent: userAgent,
            em: userData?.email ? [hashData(userData.email)] : undefined,
            ph: userData?.phone ? [hashData(userData.phone)] : undefined,
            fn: userData?.name ? [hashData(userData.name)] : undefined,
          },
          custom_data: customData || {},
        },
      ],
    }

    const response = await fetch(
      `https://graph.facebook.net/v19.0/${pixelId}/events?access_token=${accessToken}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    )

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error('Erreur Meta CAPI:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
