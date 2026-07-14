import { NextResponse } from 'next/server'
import { SendMailClient } from 'zeptomail'
import { getPayloadClient } from '@/lib/payload'
import { validateLead, normalizePhone } from '@/lib/validation'

export const runtime = 'nodejs'

const ZEPTO_URL = 'https://api.zeptomail.com/v1.1/email'

function clientIp(req: Request): string | undefined {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') || undefined
}

// Escape user-supplied values before embedding them in email HTML.
function esc(v: unknown): string {
  return String(v ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// Sends the team notification + a thank-you to the client via ZeptoMail.
// Each send is isolated so one failure never blocks the other or the submit.
async function sendEmails(lead: Record<string, any>) {
  const token = process.env.ZEPTOMAIL_TOKEN
  const fromAddress = process.env.LEADS_FROM || 'noreply@searchmadarth.com'
  const fromName = process.env.LEADS_FROM_NAME || 'SearchMadarth'
  const notifyTo = process.env.LEADS_NOTIFY_TO
  if (!token) {
    console.warn('[audit] email skipped — ZEPTOMAIL_TOKEN not set')
    return
  }

  const client = new SendMailClient({ url: ZEPTO_URL, token })
  const from = { address: fromAddress, name: fromName }
  const t = lead.tracking || {}

  // 1) Internal notification to the search team.
  if (notifyTo) {
    const rows = [
      ['Name', lead.name],
      ['Email', lead.email],
      ['Phone', lead.phone],
      ['Message', lead.message || '—'],
      ['Page', t.pageUrl],
      ['Referrer', t.referrer],
      ['UTM source', t.utmSource],
      ['UTM medium', t.utmMedium],
      ['UTM campaign', t.utmCampaign],
      ['gclid', t.gclid],
      ['IP', t.ip],
    ]
      .filter(([, v]) => v)
      .map(([k, v]) => `<tr><td style="padding:4px 12px 4px 0"><b>${esc(k)}</b></td><td>${esc(v)}</td></tr>`)
      .join('')

    const to = notifyTo.split(',').map((s) => ({
      email_address: { address: s.trim(), name: 'Search Team' },
    }))

    try {
      await client.sendMail({
        from,
        to,
        subject: `New audit request — ${lead.name}`,
        htmlbody: `<h2>New audit request</h2><table style="font:14px/1.5 system-ui">${rows}</table>`,
      })
    } catch (err) {
      console.warn('[audit] team email failed', err)
    }
  }

  // 2) Thank-you to the person who submitted.
  try {
    await client.sendMail({
      from,
      to: [{ email_address: { address: lead.email, name: lead.name } }],
      subject: 'Thanks — your free audit request is in',
      htmlbody: `
        <div style="font:15px/1.6 system-ui,Segoe UI,Arial;color:#252521">
          <p>Hi ${esc(lead.name)},</p>
          <p>Thanks for requesting your free audit. Our team has received your details and will review them shortly — we'll get back within one business day.</p>
          <p>Talk soon,<br/>The SearchMadarth Team</p>
        </div>`,
    })
  } catch (err) {
    console.warn('[audit] thank-you email failed', err)
  }
}

export async function POST(req: Request) {
  let body: Record<string, any>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot — bots fill hidden fields. Pretend success, store nothing.
  if (body.company_website) {
    return NextResponse.json({ ok: true })
  }

  const errors = validateLead(body)
  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 400 })
  }

  const t = body.tracking || {}
  const data = {
    name: String(body.name).trim(),
    email: String(body.email).trim(),
    phone: normalizePhone(body.phone),
    message: body.message ? String(body.message).trim() : undefined,
    tracking: {
      pageUrl: t.pageUrl,
      referrer: t.referrer,
      ip: clientIp(req),
      userAgent: req.headers.get('user-agent') || undefined,
      utmSource: t.utmSource,
      utmMedium: t.utmMedium,
      utmCampaign: t.utmCampaign,
      utmTerm: t.utmTerm,
      utmContent: t.utmContent,
      gclid: t.gclid,
      wbraid: t.wbraid,
      gbraid: t.gbraid,
      fbclid: t.fbclid,
      msclkid: t.msclkid,
      params: t.params && typeof t.params === 'object' ? t.params : undefined,
    },
  }

  try {
    const payload = await getPayloadClient()
    const lead = await payload.create({ collection: 'leads', data: data as any })
    // Non-blocking: never fail the submit if email is down.
    await sendEmails({ ...data, id: lead.id })
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[audit] failed to save lead', err)
    return NextResponse.json({ ok: false, error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
