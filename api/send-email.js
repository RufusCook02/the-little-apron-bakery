const FORMS = {
  contact: 'New contact form message',
  order: 'New custom cake enquiry',
  workshop: 'New workshop interest registration',
}

const MAX_ATTACHMENTS = 5
const MAX_BODY_BYTES = 5 * 1024 * 1024 // ~5MB defensive cap; Vercel's own limit is 4.5MB by default

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const contentLength =
    Number(req.headers['content-length'] || 0) ||
    Buffer.byteLength(JSON.stringify(req.body || {}))
  if (contentLength > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'Request body too large' })
  }

  const { form, fields, attachments } = req.body || {}

  if (!FORMS[form] || !fields || typeof fields !== 'object') {
    return res.status(400).json({ error: 'Invalid request' })
  }

  let validAttachments
  if (attachments !== undefined) {
    const isValid =
      Array.isArray(attachments) &&
      attachments.length <= MAX_ATTACHMENTS &&
      attachments.every(
        (a) =>
          a &&
          typeof a === 'object' &&
          typeof a.name === 'string' &&
          typeof a.content === 'string',
      )
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid attachments' })
    }
    validAttachments = attachments
  }

  const apiKey = process.env.BREVO_API_KEY
  const toEmail = process.env.CONTACT_TO_EMAIL
  const fromEmail = process.env.CONTACT_FROM_EMAIL

  if (!apiKey || !toEmail || !fromEmail) {
    console.error(
      'Missing BREVO_API_KEY, CONTACT_TO_EMAIL, or CONTACT_FROM_EMAIL env vars',
    )
    return res.status(500).json({ error: 'Email is not configured' })
  }

  const rows = Object.entries(fields)
    .filter(([, value]) => String(value ?? '').trim() !== '')
    .map(
      ([key, value]) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#5e6d67;font-weight:600;vertical-align:top;">${escapeHtml(key)}</td><td style="padding:4px 0;color:#2f3b37;">${escapeHtml(String(value))}</td></tr>`,
    )
    .join('')

  try {
    const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        sender: { email: fromEmail, name: 'The Little Apron website' },
        to: [{ email: toEmail }],
        replyTo: fields.email ? { email: fields.email } : undefined,
        subject: FORMS[form],
        htmlContent: `<table>${rows}</table>`,
        ...(validAttachments && validAttachments.length
          ? {
              attachment: validAttachments.map((a) => ({
                name: a.name,
                content: a.content,
              })),
            }
          : {}),
      }),
    })

    if (!brevoRes.ok) {
      const detail = await brevoRes.text()
      console.error('Brevo API error', brevoRes.status, detail)
      return res.status(502).json({ error: 'Failed to send email' })
    }

    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('Failed to send email', err)
    return res.status(500).json({ error: 'Failed to send email' })
  }
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
