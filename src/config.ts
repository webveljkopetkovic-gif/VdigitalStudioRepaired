export const SHOW_PROJECTS = false;

export const CAL_LINK = "vdigital/30min"; // e.g. "vdigital/30min"
export const WEB3FORMS_ACCESS_KEY =
  (typeof process !== 'undefined' && process.env?.WEB3FORMS_ACCESS_KEY) ||
  '8cae6776-aeee-436b-a022-349b42efa483';
export const TELEGRAM_USERNAME = "";      // without @

export const CALENDLY_URL = '[CALENDLY_URL]';
export const TELEGRAM_URL = TELEGRAM_USERNAME ? `https://t.me/${TELEGRAM_USERNAME}` : 'https://t.me/vdigital_dev';
export const CONTACT_EMAIL = 'hello@vdigital.dev';
export const FORM_ENDPOINT = 'https://api.web3forms.com/submit';

export const WHATSAPP_URL = 'https://wa.me/381659131103';
export const VIBER_URL = 'viber://chat?number=%2B381659131103';
export const PHONE_URL = 'tel:+381659131103';
export const PHONE_DISPLAY = '+381 65 913 1103';

export const INSTAGRAM_URL = 'https://www.instagram.com/vdigital.studio';
export const TIKTOK_URL = 'https://www.tiktok.com/@vdigital.studio';
export const LINKEDIN_URL = 'https://www.linkedin.com/company/vdigital-studio';
