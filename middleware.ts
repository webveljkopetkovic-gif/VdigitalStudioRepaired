/**
 * Country -> language mapping configuration.
 * - sr (/sr): Serbia and the ex-Yugoslav region
 * - ru (/ru): Russia, Kazakhstan, Belarus, Kyrgyzstan, Uzbekistan and other Russian-speaking countries
 * - Every other country (or unknown) falls back to English (/)
 */
export const COUNTRY_LANGUAGE_CONFIG = {
  sr: ['RS', 'BA', 'ME', 'HR', 'MK', 'SI', 'XK'],
  ru: ['RU', 'KZ', 'BY', 'KG', 'UZ', 'UA', 'TJ', 'AM', 'MD', 'AZ', 'TM'],
} as const;

const BOT =
  /bot|crawler|spider|preview|facebookexternalhit|whatsapp|slack|discord|telegram|googlebot|bingbot|yandex|baiduspider|duckduckbot/i;

export const config = { matcher: '/' };

export default function middleware(request: Request) {
  const url = new URL(request.url);
  // Only the root path / may redirect; language-prefixed paths (/sr, /en, /ru) never redirect
  if (url.pathname !== '/') return;
  if (BOT.test(request.headers.get('user-agent') || '')) return;

  const cookie = request.headers.get('cookie') || '';
  const chosen = cookie.match(/(?:^|;\s*)lang=(en|sr|ru)\b/)?.[1] as
    | 'en'
    | 'sr'
    | 'ru'
    | undefined;
  const country = (request.headers.get('x-vercel-ip-country') || '').toUpperCase();
  const lang =
    chosen ??
    ((COUNTRY_LANGUAGE_CONFIG.sr as readonly string[]).includes(country)
      ? 'sr'
      : (COUNTRY_LANGUAGE_CONFIG.ru as readonly string[]).includes(country)
        ? 'ru'
        : 'en');

  if (lang === 'en') return;

  return new Response(null, {
    status: 302,
    headers: {
      Location: `/${lang}${url.search}`,
      'Cache-Control': 'private, no-store',
      Vary: 'Cookie, x-vercel-ip-country',
    },
  });
}
