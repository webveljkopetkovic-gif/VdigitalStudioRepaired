// TODO(Veljko): Add your booking calendar URL (e.g. Cal.com or Calendly link) when ready.
export const BOOKING_URL = '';

export const TELEGRAM_USERNAME = 'veljkopetkovic'; // without @
export const TELEGRAM_URL = TELEGRAM_USERNAME
  ? `https://t.me/${TELEGRAM_USERNAME}`
  : 'https://t.me/veljkopetkovic';

export const CONTACT_EMAIL = 'hello@vdigital.dev';
// Contact form is sent only through our own server route (/api/contact).
export const FORM_ENDPOINT = '/api/contact';
// Cloudflare Turnstile site key (public). Set VITE_TURNSTILE_SITE_KEY in Vercel.
export const TURNSTILE_SITE_KEY: string =
  (typeof import.meta !== 'undefined' && import.meta.env?.VITE_TURNSTILE_SITE_KEY) || '';

export const WHATSAPP_URL = 'https://wa.me/381659131103';
export const VIBER_URL = 'viber://chat?number=%2B381659131103';
export const PHONE_URL = 'tel:+381659131103';
export const PHONE_DISPLAY = '+381 65 913 1103';

export const INSTAGRAM_URL = 'https://www.instagram.com/vdigital.dev/';
export const TIKTOK_URL = 'https://www.tiktok.com/@vdigital.studio';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/vdigital-dev';

// TODO(Veljko): Remove any social URLs from this array that aren't live yet.
export const SOCIAL_URLS: string[] = [
  INSTAGRAM_URL,
  TIKTOK_URL,
  LINKEDIN_URL,
  TELEGRAM_URL,
];
