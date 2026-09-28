/**
 * Lightweight Vercel Edge Middleware that reads the `x-vercel-ip-country` header
 * and sets a `vd_country` cookie (e.g. `RS`) for the client-side language suggestion banner.
 *
 * It never redirects and never modifies the response body.
 */
export const config = {
  matcher: [
    '/',
    '/sr',
    '/ru',
    '/contact',
    '/sr/kontakt',
    '/ru/kontakty',
    '/privacy',
    '/sr/privatnost',
    '/ru/konfidencialnost',
  ],
};

export default function middleware(request: Request): Response {
  const country = (request.headers.get('x-vercel-ip-country') || '')
    .trim()
    .toUpperCase();

  const headers = new Headers({
    'x-middleware-next': '1',
  });

  if (/^[A-Z]{2}$/.test(country)) {
    headers.set(
      'Set-Cookie',
      `vd_country=${country}; Path=/; Max-Age=86400; SameSite=Lax; Secure`
    );
  }

  return new Response(null, {
    status: 200,
    headers,
  });
}
