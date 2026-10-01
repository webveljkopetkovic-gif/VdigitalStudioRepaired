/**
 * Lightweight Vercel Edge Middleware.
 * Does not set any cookies before user consent (strictly ePrivacy / GDPR compliant).
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

export default function middleware(): Response {
  const headers = new Headers({
    'x-middleware-next': '1',
  });

  return new Response(null, {
    status: 200,
    headers,
  });
}
