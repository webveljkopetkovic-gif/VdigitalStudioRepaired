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
  },
  sr: {
    url: '/sr/',
    lang: 'sr',
    ogLocale: 'sr_RS',
    canonical: 'https://vdigital.dev/sr/',
    title: 'VDigital: Izrada sajta i marketing za lekare i coacheve',
    titleHtml: 'VDigital: Izrada sajta i marketing za lekare i coacheve',
    description:
      'Izrađujemo sajtove, video sadržaj i marketing za lekare i health coacheve. Strategija, reklame i cold calling: ceo sistem za klijente za 3 nedelje.',
  },
  ru: {
    url: '/ru/',
    lang: 'ru',
    ogLocale: 'ru_RU',
    canonical: 'https://vdigital.dev/ru/',
    title: 'VDigital: Сайты и маркетинг для врачей и коучей',
    titleHtml: 'VDigital: Сайты и маркетинг для врачей и коучей',
    description:
      'Создаём сайты, видео и маркетинг для врачей и коучей. Стратегия, реклама и холодные звонки: полная система привлечения клиентов за 3 недели.',
  },
};

function buildLocalizedHead(meta) {
  return `<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
    <link rel="alternate" hreflang="en" href="https://vdigital.dev/" />
    <link rel="alternate" hreflang="sr" href="https://vdigital.dev/sr/" />
    <link rel="alternate" hreflang="ru" href="https://vdigital.dev/ru/" />
    <link rel="alternate" hreflang="x-default" href="https://vdigital.dev/" />

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
        "url": "https://vdigital.dev/"
      }
    </script>`;
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

  // Extract Vite's injected <script type="module" ...> and <link rel="stylesheet" ...> tags from <head>
  const headMatch = templateHtml.match(/<head>([\s\S]*?)<\/head>/i);
  const rawHeadInner = headMatch ? headMatch[1] : '';
  const viteAssetTags = [];
  const assetRegex =
    /<(?:script\s+type="module"[^>]*><\/script>|link\s+rel="(?:stylesheet|modulepreload)"[^>]*>)/gi;
  let match;
  while ((match = assetRegex.exec(rawHeadInner)) !== null) {
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
    const serverEntryPath = path.resolve(ssrOutDir, 'entry-server.mjs');
    const serverEntryUrl = `${pathToFileURL(serverEntryPath).href}?t=${Date.now()}`;
    const { render } = await import(serverEntryUrl);

    const routes = [
      { meta: ROUTE_SEO.en, outFile: path.resolve(distDir, 'index.html') },
      { meta: ROUTE_SEO.sr, outFile: path.resolve(distDir, 'sr/index.html') },
      { meta: ROUTE_SEO.ru, outFile: path.resolve(distDir, 'ru/index.html') },
    ];

    for (const route of routes) {
      const renderedAppHtml = render(route.meta.url);
      const localizedHead = `${buildLocalizedHead(route.meta)}\n${viteAssetTags.join('\n')}\n  </head>`;

      const routeHtml = templateHtml
        .replace(/<html lang="[^"]*">/i, `<html lang="${route.meta.lang}">`)
        .replace(/<head>[\s\S]*?<\/head>/i, localizedHead)
        .replace('<div id="root"></div>', `<div id="root">${renderedAppHtml}</div>`);

      fs.mkdirSync(path.dirname(route.outFile), { recursive: true });
      fs.writeFileSync(route.outFile, routeHtml, 'utf-8');
      console.log(
        `[prerender] Prerendered ${route.meta.url} -> ${path.relative(rootDir, route.outFile)}`
      );
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
