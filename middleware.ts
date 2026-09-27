/**
 * Country -> language mapping configuration.
 * - sr (/sr): Serbia and former Yugoslavia
 * - ru (/ru): Russia, Belarus, Ukraine, Kazakhstan
 * - Every other country (or unknown) falls back to English (/)
 */
export const COUNTRY_LANGUAGE_CONFIG = {
  sr: ['RS', 'BA', 'ME', 'HR', 'MK', 'SI', 'XK'],
  ru: ['RU', 'BY', 'UA', 'KZ'],
} as const;

const BOT =
  /bot|crawler|spider|preview|facebookexternalhit|whatsapp|slack|discord|telegram/i;

export const config = { matcher: '/' };

export default function middleware(request: Request) {
  const url = new URL(request.url);
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
      Vary: 'Cookie',
    },
  });
}
