import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const ROUTE_SEO = {
  en: {
    url: '/',
    lang: 'en',
    ogLocale: 'en_US',
    canonical: 'https://vdigital.dev/',
    title: 'VDigital: Websites & Marketing for Doctors and Coaches',
    titleHtml: 'VDigital: Websites & Marketing for Doctors and Coaches',
    description:
      'We build websites, video content and marketing for doctors and health coaches. Strategy, ads and cold calling: a full client system in 3 weeks.',
    pageType: 'home',
  },
  sr: {
    url: '/sr',
    lang: 'sr',
    ogLocale: 'sr_RS',
    canonical: 'https://vdigital.dev/sr',
    title: 'VDigital: Sajtovi i marketing za doktore i koučeve',
    titleHtml: 'VDigital: Sajtovi i marketing za doktore i koučeve',
    description:
      'Pravimo sajtove, video sadržaj i marketing za doktore i health koučeve. Strategija, reklame i hladni pozivi: ceo sistem za nove klijente za 3 nedelje.',
    pageType: 'home',
  },
  ru: {
    url: '/ru',
    lang: 'ru',
    ogLocale: 'ru_RU',
    canonical: 'https://vdigital.dev/ru',
    title: 'VDigital: Сайты и маркетинг для врачей и коучей',
    titleHtml: 'VDigital: Сайты и маркетинг для врачей и коучей',
    description:
      'Создаём сайты, видео и маркетинг для врачей и коучей. Стратегия, реклама и холодные звонки: полная система привлечения клиентов за 3 недели.',
    pageType: 'home',
  },
  contactEn: {
    url: '/contact',
    lang: 'en',
    ogLocale: 'en_US',
    canonical: 'https://vdigital.dev/contact',
    title: 'Contact & Book a Free Call | VDigital',
    titleHtml: 'Contact & Book a Free Call | VDigital',
    description:
      'Book a free 30-minute call with VDigital, or reach us on WhatsApp, Viber, Telegram or email. We reply within 24 hours on working days.',
    pageType: 'contact',
  },
  contactSr: {
    url: '/sr/kontakt',
    lang: 'sr',
    ogLocale: 'sr_RS',
    canonical: 'https://vdigital.dev/sr/kontakt',
    title: 'Kontakt i besplatan poziv | VDigital',
    titleHtml: 'Kontakt i besplatan poziv | VDigital',
    description:
      'Zakažite besplatan poziv od 30 minuta sa VDigital timom ili nam pišite na WhatsApp, Viber, Telegram ili email. Odgovaramo u roku od 24 sata.',
    pageType: 'contact',
  },
  contactRu: {
    url: '/ru/kontakty',
    lang: 'ru',
    ogLocale: 'ru_RU',
    canonical: 'https://vdigital.dev/ru/kontakty',
    title: 'Контакты и бесплатная консультация | VDigital',
    titleHtml: 'Контакты и бесплатная консультация | VDigital',
    description:
      'Запишитесь на бесплатный 30-минутный звонок с VDigital или напишите нам в Telegram, WhatsApp, Viber или на email. Отвечаем в течение 24 часов.',
    pageType: 'contact',
  },
  privacyEn: {
    url: '/privacy',
    lang: 'en',
    ogLocale: 'en_US',
    canonical: 'https://vdigital.dev/privacy',
    title: 'Privacy Policy | VDigital',
    titleHtml: 'Privacy Policy | VDigital',
    description:
      'Learn how VDigital collects, uses and protects your personal data under the Serbian Law on Personal Data Protection (ZZPL) and GDPR.',
    pageType: 'privacy',
  },
  privacySr: {
    url: '/sr/privatnost',
    lang: 'sr',
    ogLocale: 'sr_RS',
    canonical: 'https://vdigital.dev/sr/privatnost',
    title: 'Politika privatnosti | VDigital',
    titleHtml: 'Politika privatnosti | VDigital',
    description:
      'Saznajte kako VDigital prikuplja, koristi i štiti vaše podatke o ličnosti u skladu sa ZZPL i GDPR propisima.',
    pageType: 'privacy',
  },
  privacyRu: {
    url: '/ru/konfidencialnost',
    lang: 'ru',
    ogLocale: 'ru_RU',
    canonical: 'https://vdigital.dev/ru/konfidencialnost',
    title: 'Политика конфиденциальности | VDigital',
    titleHtml: 'Политика конфиденциальности | VDigital',
    description:
      'Узнайте, как VDigital собирает, использует и защищает ваши персональные данные в соответствии с законом Сербии (ZZPL) и GDPR.',
    pageType: 'privacy',
  },
};

function buildLocalizedHead(meta) {
  let hreflangs = '';
  if (meta.pageType === 'contact') {
    hreflangs = `    <link rel="alternate" hreflang="en" href="https://vdigital.dev/contact" />
    <link rel="alternate" hreflang="sr" href="https://vdigital.dev/sr/kontakt" />
    <link rel="alternate" hreflang="ru" href="https://vdigital.dev/ru/kontakty" />
    <link rel="alternate" hreflang="x-default" href="https://vdigital.dev/contact" />`;
  } else if (meta.pageType === 'privacy') {
    hreflangs = `    <link rel="alternate" hreflang="en" href="https://vdigital.dev/privacy" />
    <link rel="alternate" hreflang="sr" href="https://vdigital.dev/sr/privatnost" />
    <link rel="alternate" hreflang="ru" href="https://vdigital.dev/ru/konfidencialnost" />
    <link rel="alternate" hreflang="x-default" href="https://vdigital.dev/privacy" />`;
  } else {
    hreflangs = `    <link rel="alternate" hreflang="en" href="https://vdigital.dev/" />
    <link rel="alternate" hreflang="sr" href="https://vdigital.dev/sr" />
    <link rel="alternate" hreflang="ru" href="https://vdigital.dev/ru" />
    <link rel="alternate" hreflang="x-default" href="https://vdigital.dev/" />`;
  }

  const contactJsonLd =
    meta.pageType === 'contact'
      ? `
    <!-- Schema.org JSON-LD Structured Data (ContactPage) -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "${meta.titleHtml}",
        "description": "${meta.description}",
        "url": "${meta.canonical}",
        "mainEntity": {
          "@type": "ProfessionalService",
          "name": "VDigital",
          "telephone": "+381 65 913 1103",
          "email": "hello@vdigital.dev",
          "url": "https://vdigital.dev"
        }
      }
    </script>`
      : '';

  const ogLocaleAlternates = ['en_US', 'sr_RS', 'ru_RU']
    .filter((loc) => loc !== meta.ogLocale)
    .map((loc) => `    <meta property="og:locale:alternate" content="${loc}" />`)
    .join('\n');

  return `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- Google Consent Mode v2 (strictly local default — zero network requests before consent) -->
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('consent', 'default', {
        'ad_storage': 'denied',
        'ad_user_data': 'denied',
        'ad_personalization': 'denied',
        'analytics_storage': 'denied',
        'wait_for_update': 500
      });
    </script>
    <!-- Google tag (gtag.js) — gated behind "analytics" consent -->
    <script
      type="text/plain"
      data-category="analytics"
      async
      src="https://www.googletagmanager.com/gtag/js?id=G-NNXZ378TYV"
    ></script>
    <script type="text/plain" data-category="analytics">
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-NNXZ378TYV', { anonymize_ip: true });
    </script>
    <!-- Ahrefs Analytics — gated behind "analytics" consent -->
    <script
      type="text/plain"
      data-category="analytics"
      src="https://analytics.ahrefs.com/analytics.js"
      data-key="eb8zYfNi2/lC1GJjWzbHlw"
      async
    ></script>
    <!-- Yandex.Metrika counter — gated behind "analytics" consent -->
    <script type="text/plain" data-category="analytics">
        (function(m,e,t,r,i,k,a){
            m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
        })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=113158297', 'ym');

        ym(113158297, 'init', {defer:true, ssr:true, webvisor:false, clickmap:true, referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
    </script>
    <!-- /Yandex.Metrika counter -->
    <meta name="ahrefs-site-verification" content="3fc2f972861e0a609e2ed3cc2936b37fcf31ba9d0fa888f996c8d9ceb6717131" />
    <meta name="yandex-verification" content="ef0ec9a99331b0d2" />
    <title>${meta.titleHtml}</title>
    <meta
      name="description"
      content="${meta.description}"
    />
    <meta name="application-name" content="VDigital" />
    <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
    <meta name="theme-color" content="#0a0a0a" />

    <!-- Canonical & Hreflang Links -->
    <link rel="canonical" href="${meta.canonical}" />
${hreflangs}

    <!-- Favicons & Web App Manifest -->
    <link rel="icon" href="/favicon.ico" sizes="16x16 32x32 48x48" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
    <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="manifest" href="/site.webmanifest" />

    <!-- Preload Self-Hosted Critical WOFF2 Fonts -->
    <link
      rel="preload"
      href="/fonts/Geist-Variable.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <link
      rel="preload"
      href="/fonts/Newsreader-Italic.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />
    <link
      rel="preload"
      href="/fonts/GeistMono-Variable.woff2"
      as="font"
      type="font/woff2"
      crossorigin
    />

    <!-- Open Graph Metadata -->
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="VDigital" />
    <meta property="og:locale" content="${meta.ogLocale}" />
${ogLocaleAlternates}
    <meta property="og:url" content="${meta.canonical}" />
    <meta
      property="og:title"
      content="${meta.titleHtml}"
    />
    <meta
      property="og:description"
      content="${meta.description}"
    />
    <meta property="og:image" content="https://vdigital.dev/og-image.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta
      property="og:image:alt"
      content="${meta.titleHtml}"
    />

    <!-- Twitter Card Metadata -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta
      name="twitter:title"
      content="${meta.titleHtml}"
    />
    <meta
      name="twitter:description"
      content="${meta.description}"
    />
    <meta name="twitter:image" content="https://vdigital.dev/og-image.png" />
    <meta
      name="twitter:image:alt"
      content="${meta.titleHtml}"
    />

    <!-- Schema.org JSON-LD Structured Data (WebSite) -->
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "VDigital",
        "alternateName": ["VDigital Studio", "vdigital.dev"],
        "url": "https://vdigital.dev"
      }
    </script>${contactJsonLd}`;
}

export async function runPrerender() {
  const rootDir = process.cwd();
  const distDir = path.resolve(rootDir, 'dist');
  const distIndexPath = path.resolve(distDir, 'index.html');
  const ssrOutDir = path.resolve(rootDir, 'dist-ssr');

  if (!fs.existsSync(distIndexPath)) {
    throw new Error('dist/index.html not found. Run client build first.');
  }

  const templateHtml = fs.readFileSync(distIndexPath, 'utf-8');
  if (!templateHtml.includes('<div id="root"></div>')) {
    console.log('[prerender] dist/index.html is already prerendered.');
    return;
  }

  // Extract all scripts (module, importmap, external CDN), inline styles, and stylesheet/modulepreload/preconnect links from <head>
  const headMatch = templateHtml.match(/<head>([\s\S]*?)<\/head>/i);
  const rawHeadInner = headMatch ? headMatch[1] : '';
  const viteAssetTags = [];
  const assetRegex =
    /<(?:script(?![^>]*type=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>|style[^>]*>[\s\S]*?<\/style>|link[^>]*\brel=["'](?:stylesheet|modulepreload|preconnect)["'][^>]*>)/gi;
  let match;
  while ((match = assetRegex.exec(rawHeadInner)) !== null) {
    if (
      match[0].includes('googletagmanager.com/gtag/js') ||
      match[0].includes('G-NNXZ378TYV') ||
      match[0].includes('analytics.ahrefs.com/analytics.js') ||
      match[0].includes('mc.yandex.ru/metrika/tag.js') ||
      match[0].includes('wait_for_update') ||
      match[0].includes('data-category=')
    ) {
      continue;
    }
    viteAssetTags.push(`    ${match[0]}`);
  }

  await build({
    configFile: false,
    resolve: {
      alias: {
        '@': rootDir,
      },
    },
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist-ssr',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          format: 'esm',
          entryFileNames: 'entry-server.mjs',
        },
      },
    },
    logLevel: 'warn',
  });

  try {
    globalThis.document = globalThis.document || { referrer: '' };
    const serverEntryPath = path.resolve(ssrOutDir, 'entry-server.mjs');
    const serverEntryUrl = `${pathToFileURL(serverEntryPath).href}?t=${Date.now()}`;
    const { render } = await import(serverEntryUrl);

    const routes = [
      {
        meta: ROUTE_SEO.en,
        outFiles: [
          path.resolve(distDir, 'index.html'),
          path.resolve(distDir, 'en.html'),
          path.resolve(distDir, 'en/index.html'),
        ],
      },
      {
        meta: ROUTE_SEO.sr,
        outFiles: [
          path.resolve(distDir, 'sr.html'),
          path.resolve(distDir, 'sr/index.html'),
        ],
      },
      {
        meta: ROUTE_SEO.ru,
        outFiles: [
          path.resolve(distDir, 'ru.html'),
          path.resolve(distDir, 'ru/index.html'),
        ],
      },
      {
        meta: ROUTE_SEO.contactEn,
        outFiles: [
          path.resolve(distDir, 'contact.html'),
          path.resolve(distDir, 'contact/index.html'),
          path.resolve(distDir, 'en/contact.html'),
          path.resolve(distDir, 'en/contact/index.html'),
        ],
      },
      {
        meta: ROUTE_SEO.contactSr,
        outFiles: [
          path.resolve(distDir, 'sr/kontakt.html'),
          path.resolve(distDir, 'sr/kontakt/index.html'),
        ],
      },
      {
        meta: ROUTE_SEO.contactRu,
        outFiles: [
          path.resolve(distDir, 'ru/kontakty.html'),
          path.resolve(distDir, 'ru/kontakty/index.html'),
        ],
      },
      {
        meta: ROUTE_SEO.privacyEn,
        outFiles: [
          path.resolve(distDir, 'privacy.html'),
          path.resolve(distDir, 'privacy/index.html'),
          path.resolve(distDir, 'en/privacy.html'),
          path.resolve(distDir, 'en/privacy/index.html'),
        ],
      },
      {
        meta: ROUTE_SEO.privacySr,
        outFiles: [
          path.resolve(distDir, 'sr/privatnost.html'),
          path.resolve(distDir, 'sr/privatnost/index.html'),
          path.resolve(distDir, 'politika-privatnosti.html'),
          path.resolve(distDir, 'politika-privatnosti/index.html'),
          path.resolve(distDir, 'sr/politika-privatnosti.html'),
          path.resolve(distDir, 'sr/politika-privatnosti/index.html'),
        ],
      },
      {
        meta: ROUTE_SEO.privacyRu,
        outFiles: [
          path.resolve(distDir, 'ru/konfidencialnost.html'),
          path.resolve(distDir, 'ru/konfidencialnost/index.html'),
          path.resolve(distDir, 'politika-konfidencialnosti.html'),
          path.resolve(distDir, 'politika-konfidencialnosti/index.html'),
          path.resolve(distDir, 'ru/politika-konfidencialnosti.html'),
          path.resolve(distDir, 'ru/politika-konfidencialnosti/index.html'),
        ],
      },
    ];

    for (const route of routes) {
      const renderedAppHtml = render(route.meta.url);
      const localizedHead = `${buildLocalizedHead(route.meta)}\n${viteAssetTags.join('\n')}\n  </head>`;

      const routeHtml = templateHtml
        .replace(/<html lang="[^"]*">/i, `<html lang="${route.meta.lang}">`)
        .replace(/<head>[\s\S]*?<\/head>/i, localizedHead)
        .replace('<div id="root"></div>', `<div id="root">${renderedAppHtml}</div>`);

      for (const outFile of route.outFiles) {
        fs.mkdirSync(path.dirname(outFile), { recursive: true });
        fs.writeFileSync(outFile, routeHtml, 'utf-8');
        console.log(
          `[prerender] Prerendered ${route.meta.url} (lang="${route.meta.lang}", canonical="${route.meta.canonical}") -> ${path.relative(rootDir, outFile)}`
        );
      }
    }
  } finally {
    fs.rmSync(ssrOutDir, { recursive: true, force: true });
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  runPrerender().catch((err) => {
    console.error('[prerender] Failed:', err);
    process.exit(1);
  });
}
