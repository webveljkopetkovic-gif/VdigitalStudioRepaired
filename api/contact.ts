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

const MAX_TRACKED_IPS = 5000;

function pruneBuckets(now: number) {
  for (const [ip, timestamps] of ipBuckets) {
    if (!timestamps.some((t) => now - t < RATE_LIMIT_WINDOW_MS)) {
      ipBuckets.delete(ip);
    }
  }
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  if (ipBuckets.size > MAX_TRACKED_IPS) {
    pruneBuckets(now);
  }
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

export default async function handler(req: any, res: any) {
  const web3FormsKey = (
    process.env.WEB3FORMS_ACCESS_KEY ||
    process.env.VITE_WEB3FORMS_ACCESS_KEY ||
    ''
  ).trim();

  if (req.method === 'GET') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(JSON.stringify({ ok: true, accessKey: web3FormsKey }));
  }

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
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(JSON.stringify({ ok: false, message: msg.methodNotAllowed }));
  }

  // Honeypot check: silently accept and ignore bot submissions
  if (
    body?.botcheck === true ||
    body?.botcheck === 'true' ||
    body?.botcheck === 'on' ||
    (typeof body?.botcheck === 'string' && body.botcheck.trim().length > 0) ||
    (typeof body?.website === 'string' && body.website.trim().length > 0)
  ) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(JSON.stringify({ ok: true }));
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp)) {
    res.statusCode = 429;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(JSON.stringify({ ok: false, message: msg.rateLimited }));
  }

  const formType = body?.formType === 'callback' ? 'callback' : 'inquiry';
  const name = stripHtml(body?.name);
  const contact = stripHtml(body?.contact || body?.phone || body?.email);
  const profession = stripHtml(
    body?.profession || (formType === 'callback' ? 'Callback request' : '')
  );
  const message = stripHtml(body?.message);

  if (!name || !contact || (formType === 'inquiry' && !profession)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(JSON.stringify({ ok: false, message: msg.invalidRequired }));
  }

  if (
    name.length > 120 ||
    contact.length > 160 ||
    profession.length > 120 ||
    message.length > 2000
  ) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(JSON.stringify({ ok: false, message: msg.tooLong }));
  }

  if (!isValidEmailOrPhone(contact)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(JSON.stringify({ ok: false, message: msg.invalidContact }));
  }

  if (!web3FormsKey) {
    res.statusCode = 503;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(JSON.stringify({ ok: false, message: msg.serverNotConfigured }));
  }

  try {
    const payload: Record<string, string> = {
      access_key: web3FormsKey,
      from_name: 'VDigital Website',
      subject: `VDigital Inquiry — ${name} (${profession})`,
      name,
      contact,
      profession,
      locale: locale.toUpperCase(),
    };
    if (message) {
      payload.message = message;
    }

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json().catch(() => null);
    if (!response.ok || (result && result.success === false)) {
      res.statusCode = 502;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-store');
      return res.end(JSON.stringify({ ok: false, message: msg.sendError }));
    }
  } catch {
    res.statusCode = 502;
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    return res.end(JSON.stringify({ ok: false, message: msg.sendError }));
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'no-store');
  return res.end(JSON.stringify({ ok: true }));
}
