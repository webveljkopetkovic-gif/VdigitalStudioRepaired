export const SHOW_PROJECTS = false;

// TODO(Veljko): Add your booking calendar URL (e.g. Cal.com or Calendly link) when ready.
export const BOOKING_URL = '';

export const TELEGRAM_USERNAME = 'veljkopetkovic'; // without @
export const TELEGRAM_URL = TELEGRAM_USERNAME
  ? `https://t.me/${TELEGRAM_USERNAME}`
  : 'https://t.me/veljkopetkovic';

declare const __WEB3FORMS_ACCESS_KEY__: string | undefined;

export const CONTACT_EMAIL = 'hello@vdigital.dev';
export const FORM_ENDPOINT = '/api/contact';
export const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
export const WEB3FORMS_ACCESS_KEY =
  typeof __WEB3FORMS_ACCESS_KEY__ !== 'undefined' ? __WEB3FORMS_ACCESS_KEY__ : '';

export const WHATSAPP_URL = 'https://wa.me/381659131103';
export const VIBER_URL = 'viber://chat?number=%2B381659131103';
export const PHONE_URL = 'tel:+381659131103';
export const PHONE_DISPLAY = '+381 65 913 1103';

export const INSTAGRAM_URL = 'https://www.instagram.com/vdigital.studio';
export const TIKTOK_URL = 'https://www.tiktok.com/@vdigital.studio';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/vdigital-studio';

// TODO(Veljko): Remove any social URLs from this array that aren't live yet.
export const SOCIAL_URLS: string[] = [
  INSTAGRAM_URL,
  TIKTOK_URL,
  LINKEDIN_URL,
  TELEGRAM_URL,
];
