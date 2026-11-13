import nodemailer from 'nodemailer';

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

const ipBuckets = new Map<string, number[]>();

type Locale = 'en' | 'sr' | 'ru';

const MESSAGES: Record<
  Locale,
  {
    methodNotAllowed: string;
    rateLimited: string;
    invalidRequired: string;
    invalidContact: string;
    tooLong: string;
    serverNotConfigured: string;
    sendError: string;
    captchaFailed: string;
  }
> = {
  en: {
    methodNotAllowed: 'Method not allowed.',
    rateLimited: 'Too many requests. Please wait a few minutes or message us on WhatsApp.',
    invalidRequired: 'Please enter your name, email or phone, and select what you do.',
    invalidContact: 'Please enter a valid email address or phone number.',
    tooLong: 'One of the fields is too long. Please shorten your message and try again.',
    serverNotConfigured:
      'Contact service is not configured yet. Please reach us directly via email or WhatsApp.',
    sendError: 'Something went wrong while sending. Please try again or message us on WhatsApp.',
    captchaFailed: 'Security check failed. Please refresh the page and try again.',
  },
  sr: {
    methodNotAllowed: 'Metod nije dozvoljen.',
    rateLimited: 'Previše pokušaja. Sačekajte nekoliko minuta ili nam pišite na WhatsApp.',
    invalidRequired: 'Molimo unesite vaše ime, email ili telefon i izaberite čime se bavite.',
    invalidContact: 'Molimo unesite ispravnu email adresu ili broj telefona.',
    tooLong: 'Neko od polja je predugačko. Skratite poruku i pokušajte ponovo.',
    serverNotConfigured:
      'Kontakt forma trenutno nije podešena. Pišite nam direktno putem emaila ili na WhatsApp.',
    sendError: 'Nešto nije u redu pri slanju. Pokušajte ponovo ili nam pišite na WhatsApp.',
    captchaFailed: 'Bezbednosna provera nije prošla. Osvežite stranicu i pokušajte ponovo.',
  },
  ru: {
    methodNotAllowed: 'Метод не поддерживается.',
    rateLimited: 'Слишком много отправок. Пожалуйста, подождите несколько минут или напишите нам в Telegram.',
    invalidRequired: 'Пожалуйста, укажите ваше имя, контактные данные и сферу деятельности.',
    invalidContact: 'Пожалуйста, введите корректный email или номер телефона.',
    tooLong: 'Одно из полей слишком длинное. Пожалуйста, сократите текст и попробуйте снова.',
    serverNotConfigured:
      'Форма временно недоступна. Пожалуйста, напишите нам напрямую в Telegram или на email.',
    sendError: 'Что-то пошло не так. Пожалуйста, попробуйте ещё раз или напишите нам в Telegram.',
    captchaFailed: 'Проверка безопасности не пройдена. Обновите страницу и попробуйте снова.',
  },
};

function normalizeLocale(raw: unknown): Locale {
  if (raw === 'sr' || raw === 'ru') return raw;
  return 'en';
}

function stripHtml(input: unknown): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/<[^>]*>/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim();
}

function isValidEmailOrPhone(value: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  const phoneRegex = /^[+]?[\d\s()./-]{5,32}$/;
  const handleRegex = /^@[a-zA-Z0-9_.-]{3,64}$/;
  return emailRegex.test(value) || phoneRegex.test(value) || handleRegex.test(value);
}

function getClientIp(req: any): string {
  const forwarded = req?.headers?.['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim();
  }
  const realIp = req?.headers?.['x-real-ip'];
  if (typeof realIp === 'string' && realIp.length > 0) {
    return realIp.trim();
  }
  return req?.socket?.remoteAddress || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipBuckets.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    ipBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  ipBuckets.set(ip, recent);
  return false;
}

// Real people need more than a few seconds to fill in name, contact and field.
const MIN_FILL_TIME_MS = 3000;

function sendJson(res: any, status: number, data: Record<string, unknown>) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  return res.end(JSON.stringify(data));
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

async function verifyTurnstile(secret: string, token: string, ip: string): Promise<boolean> {
  try {
    const params = new URLSearchParams({ secret, response: token });
    if (ip && ip !== 'unknown') params.set('remoteip', ip);
    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: params,
    });
    const data: any = await response.json().catch(() => null);
    return data?.success === true;
  } catch (err) {
    console.error('[Contact API] Turnstile verification error:', err);
    return false;
  }
}

export default async function handler(req: any, res: any) {
  const smtpUser = (process.env.SMTP_USER || 'hello@vdigital.dev').trim();
  const smtpPass = (process.env.SMTP_PASS || '').trim();
  const smtpHost = (process.env.SMTP_HOST || 'mail.spacemail.com').trim();
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const mailTo = (process.env.CONTACT_TO || smtpUser).trim();
  const turnstileSecret = (process.env.TURNSTILE_SECRET_KEY || '').trim();

  let body = req.body || {};
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      body = {};
    }
  }

  const locale = normalizeLocale(body?.locale);
  const msg = MESSAGES[locale];

  if (req.method !== 'POST') {
    return sendJson(res, 405, { ok: false, message: msg.methodNotAllowed });
  }

  // Honeypot: silently accept and drop bot submissions
  if (
    body?.botcheck === true ||
    (typeof body?.botcheck === 'string' && body.botcheck.trim().length > 0) ||
    (typeof body?.website === 'string' && body.website.trim().length > 0)
  ) {
    return sendJson(res, 200, { ok: true });
  }

  // Time trap: the form sends how long it was open. Missing or too fast = bot.
  const elapsedMs = Number(body?.elapsedMs);
  if (!Number.isFinite(elapsedMs) || elapsedMs < MIN_FILL_TIME_MS) {
    console.info('[Contact API] Dropped fast/unsigned submission:', { elapsedMs });
    return sendJson(res, 200, { ok: true });
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    return sendJson(res, 429, { ok: false, message: msg.rateLimited });
  }

  // Cloudflare Turnstile (enforced once TURNSTILE_SECRET_KEY is set in Vercel)
  if (turnstileSecret) {
    const token = typeof body?.turnstileToken === 'string' ? body.turnstileToken : '';
    if (!token || !(await verifyTurnstile(turnstileSecret, token, clientIp))) {
      return sendJson(res, 400, { ok: false, message: msg.captchaFailed });
    }
  }

  const formType = body?.formType === 'callback' ? 'callback' : 'inquiry';
  const name = stripHtml(body?.name);
  const contact = stripHtml(body?.contact || body?.phone || body?.email);
  const profession = stripHtml(
    body?.profession || (formType === 'callback' ? 'Callback request' : '')
  );
  const message = stripHtml(body?.message);

  if (!name || !contact || (formType === 'inquiry' && !profession)) {
    return sendJson(res, 400, { ok: false, message: msg.invalidRequired });
  }

  if (
    name.length > 120 ||
    contact.length > 160 ||
    profession.length > 120 ||
    message.length > 2000
  ) {
    return sendJson(res, 400, { ok: false, message: msg.tooLong });
  }

  if (!isValidEmailOrPhone(contact)) {
    return sendJson(res, 400, { ok: false, message: msg.invalidContact });
  }

  if (!smtpPass) {
    console.error('[Contact API] SMTP_PASS is not set.');
    console.info('[Contact Inquiry Received]:', { name, contact, profession, message });
    return sendJson(res, 503, { ok: false, message: msg.serverNotConfigured });
  }

  const isEmail = contact.includes('@');
  const lines = [
    `Ime: ${name}`,
    `Kontakt: ${contact}`,
    `Delatnost: ${profession}`,
    `Jezik: ${locale.toUpperCase()}`,
    '',
    `Poruka:`,
    message || '(bez poruke)',
  ];

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: `"VDigital sajt" <${smtpUser}>`,
      to: mailTo,
      replyTo: isEmail ? contact : undefined,
      subject: `VDigital upit: ${name} (${profession})`,
      text: lines.join('\n'),
      html: `<pre style="font-family:inherit;font-size:14px">${escapeHtml(lines.join('\n'))}</pre>`,
    });
  } catch (err) {
    console.error('[Contact API] Failed to send inquiry email:', err);
    console.info('[Contact Inquiry Received]:', { name, contact, profession, message });
    return sendJson(res, 502, { ok: false, message: msg.sendError });
  }

  return sendJson(res, 200, { ok: true });
}
