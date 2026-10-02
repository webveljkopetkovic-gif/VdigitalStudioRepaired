import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

function buildJsonLdGraph(meta) {
  if (meta.is404) return '';

  const orgDescription = {
    sr: 'VDigital je digitalni studio iz Niša koji pravi veb-sajtove, video produkciju i marketing sisteme za doktore, stomatologe i health koučeve.',
    en: 'VDigital is a boutique digital studio from Niš, Serbia, crafting high-performance websites, video production, and client acquisition systems for doctors and health coaches.',
    ru: 'VDigital — цифровое агентство из Ниша (Сербия), создающее высокоскоростные сайты, видеопроизводство и маркетинговые системы для врачей и коучей.',
  };

  const organizationNode = {
    '@type': ['Organization', 'ProfessionalService'],
    '@id': 'https://vdigital.dev/#organization',
    name: 'VDigital',
    alternateName: ['V Digital', 'VDigital Studio', 'VDigital agencija', 'ВДиджитал'],
    url: 'https://vdigital.dev/',
    logo: {
      '@type': 'ImageObject',
      '@id': 'https://vdigital.dev/#logo',
      url: 'https://vdigital.dev/logo.png',
      contentUrl: 'https://vdigital.dev/logo.png',
      caption: 'VDigital',
      width: 512,
      height: 512,
    },
    description: orgDescription[meta.lang] || orgDescription.en,
    email: 'hello@vdigital.dev',
    telephone: '+381 65 913 1103',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Niš',
      addressCountry: 'RS',
    },
    areaServed: ['RS', 'BA', 'ME', 'Worldwide'],
    knowsLanguage: ['sr', 'en', 'ru'],
    founder: {
      '@type': 'Person',
      '@id': 'https://vdigital.dev/#veljko',
      name: 'Veljko Petković',
      jobTitle: 'Founder, Full-Stack Developer',
      url: 'https://www.veljkopetkovic.com',
    },
    employee: [
      {
        '@type': 'Person',
        name: 'Velimir Nikolić',
        jobTitle: 'Video & Social Media',
      },
      {
        '@type': 'Person',
        name: 'Vuk Stefanović',
        jobTitle: 'Sales & Outreach',
      },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['Serbian', 'English', 'Russian'],
      telephone: '+381 65 913 1103',
      email: 'hello@vdigital.dev',
    },
    sameAs: [
      'https://www.instagram.com/vdigital.dev/',
      'https://www.tiktok.com/@vdigital.studio',
      'https://www.linkedin.com/company/vdigital-dev',
      'https://t.me/veljkopetkovic',
    ],
  };

  const webSiteNode = {
    '@type': 'WebSite',
    '@id': 'https://vdigital.dev/#website',
    name: 'VDigital',
    alternateName: ['V Digital', 'vdigital.dev'],
    url: 'https://vdigital.dev/',
    publisher: {
      '@id': 'https://vdigital.dev/#organization',
    },
    inLanguage: ['en', 'sr', 'ru'],
  };

  const webPageNode = {
    '@type':
      meta.pageType === 'about'
        ? ['WebPage', 'AboutPage']
        : meta.pageType === 'contact'
          ? ['WebPage', 'ContactPage']
          : 'WebPage',
    '@id': `${meta.canonical}#webpage`,
    url: meta.canonical,
    name: meta.titleHtml,
    description: meta.description,
    isPartOf: {
      '@id': 'https://vdigital.dev/#website',
    },
    about: {
      '@id': 'https://vdigital.dev/#organization',
    },
    inLanguage: meta.lang,
    ...(meta.pageType !== 'home'
      ? { breadcrumb: { '@id': `${meta.canonical}#breadcrumb` } }
      : {}),
  };

  const graph = [organizationNode, webSiteNode, webPageNode];

  if (meta.pageType !== 'home') {
    const homeNames = { sr: 'Početna', en: 'Home', ru: 'Главная' };
    const homeUrls = {
      sr: 'https://vdigital.dev/sr',
      en: 'https://vdigital.dev/',
      ru: 'https://vdigital.dev/ru',
    };

    const breadcrumbNode = {
      '@type': 'BreadcrumbList',
      '@id': `${meta.canonical}#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: homeNames[meta.lang] || 'Home',
          item: homeUrls[meta.lang] || 'https://vdigital.dev/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: meta.breadcrumbTitle || meta.titleHtml,
          item: meta.canonical,
        },
      ],
    };
    graph.push(breadcrumbNode);
  }

  if (meta.pageType === 'service') {
    const serviceNode = {
      '@type': 'Service',
      '@id': `${meta.canonical}#service`,
      name: meta.titleHtml,
      serviceType: meta.serviceType,
      description: meta.description,
      provider: {
        '@id': 'https://vdigital.dev/#organization',
      },
      areaServed: ['RS', 'BA', 'ME', 'Worldwide'],
      url: meta.canonical,
    };
    graph.push(serviceNode);

    if (Array.isArray(meta.faqs) && meta.faqs.length > 0) {
      const faqNode = {
        '@type': 'FAQPage',
        '@id': `${meta.canonical}#faq`,
        mainEntity: meta.faqs.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      };
      graph.push(faqNode);
    }
  }

  if (meta.pageType === 'contact') {
    const contactPageNode = {
      '@type': 'ContactPage',
      '@id': `${meta.canonical}#contactpage`,
      url: meta.canonical,
      name: meta.titleHtml,
      description: meta.description,
      mainEntity: {
        '@id': 'https://vdigital.dev/#organization',
      },
    };
    graph.push(contactPageNode);
  }

  const jsonLdPayload = {
    '@context': 'https://schema.org',
    '@graph': graph,
  };

  return `\n    <!-- Schema.org JSON-LD Structured Data (@graph) -->\n    <script type="application/ld+json">\n${JSON.stringify(
    jsonLdPayload,
    null,
    2
  )
    .split('\n')
    .map((l) => '      ' + l)
    .join('\n')}\n    </script>`;
}

function buildLocalizedHead(meta) {
  if (meta.is404) {
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
    <title>${meta.titleHtml}</title>
    <meta
      name="description"
      content="${meta.description}"
    />
    <meta name="application-name" content="VDigital" />
    <meta name="robots" content="noindex" />
    <meta name="theme-color" content="#0a0a0a" />

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
    />`;
  }

  const hreflangs = Object.entries(meta.alternates || {})
    .map(
      ([lang, href]) =>
        `    <link rel="alternate" hreflang="${lang}" href="${href}" />`
    )
    .join('\n');

  const ogLocaleAlternates = ['en_US', 'sr_RS', 'ru_RU']
    .filter((loc) => loc !== meta.ogLocale)
    .map((loc) => `    <meta property="og:locale:alternate" content="${loc}" />`)
    .join('\n');

  const jsonLdBlock = buildJsonLdGraph(meta);

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
    />${jsonLdBlock}`;
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
    const { render, SERVICES_DATA, ABOUT_DATA } = await import(serverEntryUrl);

    // Build the 24 Canonical Routes + 404 Route dynamically
    const homeAlternates = {
      en: 'https://vdigital.dev/',
      sr: 'https://vdigital.dev/sr',
      ru: 'https://vdigital.dev/ru',
      'x-default': 'https://vdigital.dev/',
    };

    const aboutAlternates = {
      en: 'https://vdigital.dev/about',
      sr: 'https://vdigital.dev/sr/o-nama',
      ru: 'https://vdigital.dev/ru/o-nas',
      'x-default': 'https://vdigital.dev/about',
    };

    const contactAlternates = {
      en: 'https://vdigital.dev/contact',
      sr: 'https://vdigital.dev/sr/kontakt',
      ru: 'https://vdigital.dev/ru/kontakty',
      'x-default': 'https://vdigital.dev/contact',
    };

    const privacyAlternates = {
      en: 'https://vdigital.dev/privacy',
      sr: 'https://vdigital.dev/sr/privatnost',
      ru: 'https://vdigital.dev/ru/konfidencialnost',
      'x-default': 'https://vdigital.dev/privacy',
    };

    const webDevAlternates = {
      en: 'https://vdigital.dev/services/web-development',
      sr: 'https://vdigital.dev/sr/usluge/izrada-sajtova',
      ru: 'https://vdigital.dev/ru/uslugi/sozdanie-sajtov',
      'x-default': 'https://vdigital.dev/services/web-development',
    };

    const videoAlternates = {
      en: 'https://vdigital.dev/services/video-social-media',
      sr: 'https://vdigital.dev/sr/usluge/video-i-drustvene-mreze',
      ru: 'https://vdigital.dev/ru/uslugi/video-i-socseti',
      'x-default': 'https://vdigital.dev/services/video-social-media',
    };

    const marketingAlternates = {
      en: 'https://vdigital.dev/services/marketing-automation',
      sr: 'https://vdigital.dev/sr/usluge/marketing-i-automatizacija',
      ru: 'https://vdigital.dev/ru/uslugi/marketing-i-avtomatizaciya',
      'x-default': 'https://vdigital.dev/services/marketing-automation',
    };

    const callingAlternates = {
      en: 'https://vdigital.dev/services/cold-calling',
      sr: 'https://vdigital.dev/sr/usluge/hladni-pozivi',
      ru: 'https://vdigital.dev/ru/uslugi/holodnye-zvonki',
      'x-default': 'https://vdigital.dev/services/cold-calling',
    };

    const routes = [
      // 1. Home Pages (3)
      {
        meta: {
          url: '/',
          lang: 'en',
          ogLocale: 'en_US',
          canonical: 'https://vdigital.dev/',
          title: 'VDigital: Websites & Marketing for Doctors and Coaches',
          titleHtml: 'VDigital: Websites & Marketing for Doctors and Coaches',
          description:
            'We build websites, video content and marketing for doctors and health coaches. Strategy, ads and cold calling: a full client system in 3 weeks.',
          pageType: 'home',
          alternates: homeAlternates,
        },
        outFile: path.resolve(distDir, 'index.html'),
      },
      {
        meta: {
          url: '/sr',
          lang: 'sr',
          ogLocale: 'sr_RS',
          canonical: 'https://vdigital.dev/sr',
          title: 'VDigital: Sajtovi i marketing za doktore i koučeve',
          titleHtml: 'VDigital: Sajtovi i marketing za doktore i koučeve',
          description:
            'Pravimo sajtove, video sadržaj i marketing za doktore i health koučeve. Strategija, reklame i hladni pozivi: ceo sistem za nove klijente za 3 nedelje.',
          pageType: 'home',
          alternates: homeAlternates,
        },
        outFile: path.resolve(distDir, 'sr.html'),
      },
      {
        meta: {
          url: '/ru',
          lang: 'ru',
          ogLocale: 'ru_RU',
          canonical: 'https://vdigital.dev/ru',
          title: 'VDigital: Сайты и маркетинг для врачей и коучей',
          titleHtml: 'VDigital: Сайты и маркетинг для врачей и коучей',
          description:
            'Создаём сайты, видео и маркетинг для врачей и коучей. Стратегия, реклама и холодные звонки: полная система привлечения клиентов за 3 недели.',
          pageType: 'home',
          alternates: homeAlternates,
        },
        outFile: path.resolve(distDir, 'ru.html'),
      },

      // 2. About Pages (3)
      {
        meta: {
          url: '/about',
          lang: 'en',
          ogLocale: 'en_US',
          canonical: 'https://vdigital.dev/about',
          title: 'About Us | VDigital',
          titleHtml: 'About Us | VDigital',
          description: ABOUT_DATA.en.metaDescription,
          breadcrumbTitle: 'About Us',
          pageType: 'about',
          alternates: aboutAlternates,
        },
        outFile: path.resolve(distDir, 'about.html'),
      },
      {
        meta: {
          url: '/sr/o-nama',
          lang: 'sr',
          ogLocale: 'sr_RS',
          canonical: 'https://vdigital.dev/sr/o-nama',
          title: 'O nama | VDigital',
          titleHtml: 'O nama | VDigital',
          description: ABOUT_DATA.sr.metaDescription,
          breadcrumbTitle: 'O nama',
          pageType: 'about',
          alternates: aboutAlternates,
        },
        outFile: path.resolve(distDir, 'sr/o-nama.html'),
      },
      {
        meta: {
          url: '/ru/o-nas',
          lang: 'ru',
          ogLocale: 'ru_RU',
          canonical: 'https://vdigital.dev/ru/o-nas',
          title: 'О нас | VDigital',
          titleHtml: 'О нас | VDigital',
          description: ABOUT_DATA.ru.metaDescription,
          breadcrumbTitle: 'О нас',
          pageType: 'about',
          alternates: aboutAlternates,
        },
        outFile: path.resolve(distDir, 'ru/o-nas.html'),
      },

      // 3. Service: Web Development (3)
      {
        meta: {
          url: '/services/web-development',
          lang: 'en',
          ogLocale: 'en_US',
          canonical: 'https://vdigital.dev/services/web-development',
          title: SERVICES_DATA.en['web-development'].metaTitle,
          titleHtml: SERVICES_DATA.en['web-development'].metaTitle,
          description: SERVICES_DATA.en['web-development'].metaDescription,
          serviceType: SERVICES_DATA.en['web-development'].serviceType,
          breadcrumbTitle: 'Web Development',
          pageType: 'service',
          faqs: SERVICES_DATA.en['web-development'].faqs,
          alternates: webDevAlternates,
        },
        outFile: path.resolve(distDir, 'services/web-development.html'),
      },
      {
        meta: {
          url: '/sr/usluge/izrada-sajtova',
          lang: 'sr',
          ogLocale: 'sr_RS',
          canonical: 'https://vdigital.dev/sr/usluge/izrada-sajtova',
          title: SERVICES_DATA.sr['web-development'].metaTitle,
          titleHtml: SERVICES_DATA.sr['web-development'].metaTitle,
          description: SERVICES_DATA.sr['web-development'].metaDescription,
          serviceType: SERVICES_DATA.sr['web-development'].serviceType,
          breadcrumbTitle: 'Izrada sajtova',
          pageType: 'service',
          faqs: SERVICES_DATA.sr['web-development'].faqs,
          alternates: webDevAlternates,
        },
        outFile: path.resolve(distDir, 'sr/usluge/izrada-sajtova.html'),
      },
      {
        meta: {
          url: '/ru/uslugi/sozdanie-sajtov',
          lang: 'ru',
          ogLocale: 'ru_RU',
          canonical: 'https://vdigital.dev/ru/uslugi/sozdanie-sajtov',
          title: SERVICES_DATA.ru['web-development'].metaTitle,
          titleHtml: SERVICES_DATA.ru['web-development'].metaTitle,
          description: SERVICES_DATA.ru['web-development'].metaDescription,
          serviceType: SERVICES_DATA.ru['web-development'].serviceType,
          breadcrumbTitle: 'Создание сайтов',
          pageType: 'service',
          faqs: SERVICES_DATA.ru['web-development'].faqs,
          alternates: webDevAlternates,
        },
        outFile: path.resolve(distDir, 'ru/uslugi/sozdanie-sajtov.html'),
      },

      // 4. Service: Video & Social Media (3)
      {
        meta: {
          url: '/services/video-social-media',
          lang: 'en',
          ogLocale: 'en_US',
          canonical: 'https://vdigital.dev/services/video-social-media',
          title: SERVICES_DATA.en['video-social-media'].metaTitle,
          titleHtml: SERVICES_DATA.en['video-social-media'].metaTitle,
          description: SERVICES_DATA.en['video-social-media'].metaDescription,
          serviceType: SERVICES_DATA.en['video-social-media'].serviceType,
          breadcrumbTitle: 'Video & Social Media',
          pageType: 'service',
          faqs: SERVICES_DATA.en['video-social-media'].faqs,
          alternates: videoAlternates,
        },
        outFile: path.resolve(distDir, 'services/video-social-media.html'),
      },
      {
        meta: {
          url: '/sr/usluge/video-i-drustvene-mreze',
          lang: 'sr',
          ogLocale: 'sr_RS',
          canonical: 'https://vdigital.dev/sr/usluge/video-i-drustvene-mreze',
          title: SERVICES_DATA.sr['video-social-media'].metaTitle,
          titleHtml: SERVICES_DATA.sr['video-social-media'].metaTitle,
          description: SERVICES_DATA.sr['video-social-media'].metaDescription,
          serviceType: SERVICES_DATA.sr['video-social-media'].serviceType,
          breadcrumbTitle: 'Video i društvene mreže',
          pageType: 'service',
          faqs: SERVICES_DATA.sr['video-social-media'].faqs,
          alternates: videoAlternates,
        },
        outFile: path.resolve(distDir, 'sr/usluge/video-i-drustvene-mreze.html'),
      },
      {
        meta: {
          url: '/ru/uslugi/video-i-socseti',
          lang: 'ru',
          ogLocale: 'ru_RU',
          canonical: 'https://vdigital.dev/ru/uslugi/video-i-socseti',
          title: SERVICES_DATA.ru['video-social-media'].metaTitle,
          titleHtml: SERVICES_DATA.ru['video-social-media'].metaTitle,
          description: SERVICES_DATA.ru['video-social-media'].metaDescription,
          serviceType: SERVICES_DATA.ru['video-social-media'].serviceType,
          breadcrumbTitle: 'Видео и соцсети',
          pageType: 'service',
          faqs: SERVICES_DATA.ru['video-social-media'].faqs,
          alternates: videoAlternates,
        },
        outFile: path.resolve(distDir, 'ru/uslugi/video-i-socseti.html'),
      },

      // 5. Service: Marketing & Automation (3)
      {
        meta: {
          url: '/services/marketing-automation',
          lang: 'en',
          ogLocale: 'en_US',
          canonical: 'https://vdigital.dev/services/marketing-automation',
          title: SERVICES_DATA.en['marketing-automation'].metaTitle,
          titleHtml: SERVICES_DATA.en['marketing-automation'].metaTitle,
          description: SERVICES_DATA.en['marketing-automation'].metaDescription,
          serviceType: SERVICES_DATA.en['marketing-automation'].serviceType,
          breadcrumbTitle: 'Marketing & Automation',
          pageType: 'service',
          faqs: SERVICES_DATA.en['marketing-automation'].faqs,
          alternates: marketingAlternates,
        },
        outFile: path.resolve(distDir, 'services/marketing-automation.html'),
      },
      {
        meta: {
          url: '/sr/usluge/marketing-i-automatizacija',
          lang: 'sr',
          ogLocale: 'sr_RS',
          canonical: 'https://vdigital.dev/sr/usluge/marketing-i-automatizacija',
          title: SERVICES_DATA.sr['marketing-automation'].metaTitle,
          titleHtml: SERVICES_DATA.sr['marketing-automation'].metaTitle,
          description: SERVICES_DATA.sr['marketing-automation'].metaDescription,
          serviceType: SERVICES_DATA.sr['marketing-automation'].serviceType,
          breadcrumbTitle: 'Marketing i automatizacija',
          pageType: 'service',
          faqs: SERVICES_DATA.sr['marketing-automation'].faqs,
          alternates: marketingAlternates,
        },
        outFile: path.resolve(distDir, 'sr/usluge/marketing-i-automatizacija.html'),
      },
      {
        meta: {
          url: '/ru/uslugi/marketing-i-avtomatizaciya',
          lang: 'ru',
          ogLocale: 'ru_RU',
          canonical: 'https://vdigital.dev/ru/uslugi/marketing-i-avtomatizaciya',
          title: SERVICES_DATA.ru['marketing-automation'].metaTitle,
          titleHtml: SERVICES_DATA.ru['marketing-automation'].metaTitle,
          description: SERVICES_DATA.ru['marketing-automation'].metaDescription,
          serviceType: SERVICES_DATA.ru['marketing-automation'].serviceType,
          breadcrumbTitle: 'Маркетинг и автоматизация',
          pageType: 'service',
          faqs: SERVICES_DATA.ru['marketing-automation'].faqs,
          alternates: marketingAlternates,
        },
        outFile: path.resolve(distDir, 'ru/uslugi/marketing-i-avtomatizaciya.html'),
      },

      // 6. Service: Cold Calling (3)
      {
        meta: {
          url: '/services/cold-calling',
          lang: 'en',
          ogLocale: 'en_US',
          canonical: 'https://vdigital.dev/services/cold-calling',
          title: SERVICES_DATA.en['cold-calling'].metaTitle,
          titleHtml: SERVICES_DATA.en['cold-calling'].metaTitle,
          description: SERVICES_DATA.en['cold-calling'].metaDescription,
          serviceType: SERVICES_DATA.en['cold-calling'].serviceType,
          breadcrumbTitle: 'B2B Sales & Outreach',
          pageType: 'service',
          faqs: SERVICES_DATA.en['cold-calling'].faqs,
          alternates: callingAlternates,
        },
        outFile: path.resolve(distDir, 'services/cold-calling.html'),
      },
      {
        meta: {
          url: '/sr/usluge/hladni-pozivi',
          lang: 'sr',
          ogLocale: 'sr_RS',
          canonical: 'https://vdigital.dev/sr/usluge/hladni-pozivi',
          title: SERVICES_DATA.sr['cold-calling'].metaTitle,
          titleHtml: SERVICES_DATA.sr['cold-calling'].metaTitle,
          description: SERVICES_DATA.sr['cold-calling'].metaDescription,
          serviceType: SERVICES_DATA.sr['cold-calling'].serviceType,
          breadcrumbTitle: 'Hladni pozivi',
          pageType: 'service',
          faqs: SERVICES_DATA.sr['cold-calling'].faqs,
          alternates: callingAlternates,
        },
        outFile: path.resolve(distDir, 'sr/usluge/hladni-pozivi.html'),
      },
      {
        meta: {
          url: '/ru/uslugi/holodnye-zvonki',
          lang: 'ru',
          ogLocale: 'ru_RU',
          canonical: 'https://vdigital.dev/ru/uslugi/holodnye-zvonki',
          title: SERVICES_DATA.ru['cold-calling'].metaTitle,
          titleHtml: SERVICES_DATA.ru['cold-calling'].metaTitle,
          description: SERVICES_DATA.ru['cold-calling'].metaDescription,
          serviceType: SERVICES_DATA.ru['cold-calling'].serviceType,
          breadcrumbTitle: 'Холодные звонки',
          pageType: 'service',
          faqs: SERVICES_DATA.ru['cold-calling'].faqs,
          alternates: callingAlternates,
        },
        outFile: path.resolve(distDir, 'ru/uslugi/holodnye-zvonki.html'),
      },

      // 7. Contact Pages (3)
      {
        meta: {
          url: '/contact',
          lang: 'en',
          ogLocale: 'en_US',
          canonical: 'https://vdigital.dev/contact',
          title: 'Contact & Book a Free Call | VDigital',
          titleHtml: 'Contact & Book a Free Call | VDigital',
          description:
            'Book a free 30-minute call with VDigital, or reach us on WhatsApp, Viber, Telegram or email. We reply within 24 hours on working days.',
          breadcrumbTitle: 'Contact',
          pageType: 'contact',
          alternates: contactAlternates,
        },
        outFile: path.resolve(distDir, 'contact.html'),
      },
      {
        meta: {
          url: '/sr/kontakt',
          lang: 'sr',
          ogLocale: 'sr_RS',
          canonical: 'https://vdigital.dev/sr/kontakt',
          title: 'Kontakt i besplatan poziv | VDigital',
          titleHtml: 'Kontakt i besplatan poziv | VDigital',
          description:
            'Zakažite besplatan poziv od 30 minuta sa VDigital timom ili nam pišite na WhatsApp, Viber, Telegram ili email. Odgovaramo u roku od 24 sata.',
          breadcrumbTitle: 'Kontakt',
          pageType: 'contact',
          alternates: contactAlternates,
        },
        outFile: path.resolve(distDir, 'sr/kontakt.html'),
      },
      {
        meta: {
          url: '/ru/kontakty',
          lang: 'ru',
          ogLocale: 'ru_RU',
          canonical: 'https://vdigital.dev/ru/kontakty',
          title: 'Контакты и бесплатная консультация | VDigital',
          titleHtml: 'Контакты и бесплатная консультация | VDigital',
          description:
            'Запишитесь на бесплатный 30-минутный звонок с VDigital или напишите нам в Telegram, WhatsApp, Viber или на email. Отвечаем в течение 24 часов.',
          breadcrumbTitle: 'Контакты',
          pageType: 'contact',
          alternates: contactAlternates,
        },
        outFile: path.resolve(distDir, 'ru/kontakty.html'),
      },

      // 8. Privacy Pages (3)
      {
        meta: {
          url: '/privacy',
          lang: 'en',
          ogLocale: 'en_US',
          canonical: 'https://vdigital.dev/privacy',
          title: 'Privacy Policy | VDigital',
          titleHtml: 'Privacy Policy | VDigital',
          description:
            'Learn how VDigital collects, uses and protects your personal data under the Serbian Law on Personal Data Protection (ZZPL) and GDPR.',
          breadcrumbTitle: 'Privacy Policy',
          pageType: 'privacy',
          alternates: privacyAlternates,
        },
        outFile: path.resolve(distDir, 'privacy.html'),
      },
      {
        meta: {
          url: '/sr/privatnost',
          lang: 'sr',
          ogLocale: 'sr_RS',
          canonical: 'https://vdigital.dev/sr/privatnost',
          title: 'Politika privatnosti | VDigital',
          titleHtml: 'Politika privatnosti | VDigital',
          description:
            'Saznajte kako VDigital prikuplja, koristi i štiti vaše podatke o ličnosti u skladu sa ZZPL i GDPR propisima.',
          breadcrumbTitle: 'Politika privatnosti',
          pageType: 'privacy',
          alternates: privacyAlternates,
        },
        outFile: path.resolve(distDir, 'sr/privatnost.html'),
      },
      {
        meta: {
          url: '/ru/konfidencialnost',
          lang: 'ru',
          ogLocale: 'ru_RU',
          canonical: 'https://vdigital.dev/ru/konfidencialnost',
          title: 'Политика конфиденциальности | VDigital',
          titleHtml: 'Политика конфиденциальности | VDigital',
          description:
            'Узнайте, как VDigital собирает, использует и защищает ваши персональные данные в соответствии с законом Сербии (ZZPL) и GDPR.',
          breadcrumbTitle: 'Политика конфиденциальности',
          pageType: 'privacy',
          alternates: privacyAlternates,
        },
        outFile: path.resolve(distDir, 'ru/konfidencialnost.html'),
      },

      // 9. 404 Not Found Page (1)
      {
        meta: {
          url: '/404',
          lang: 'sr',
          ogLocale: 'sr_RS',
          title: '404: Stranica nije pronađena | VDigital',
          titleHtml: '404: Stranica nije pronađena | VDigital',
          description:
            'Stranica koju tražite ne postoji, premeštena je ili je privremeno nedostupna.',
          pageType: '404',
          is404: true,
        },
        outFile: path.resolve(distDir, '404.html'),
      },
    ];

    for (const route of routes) {
      const renderedAppHtml = render(route.meta.url);
      const localizedHead = `${buildLocalizedHead(route.meta)}\n${viteAssetTags.join('\n')}\n  </head>`;

      const routeHtml = templateHtml
        .replace(/<html lang="[^"]*">/i, `<html lang="${route.meta.lang}">`)
        .replace(/<head>[\s\S]*?<\/head>/i, localizedHead)
        .replace(
          '<div id="root"></div>',
          `<div id="root">${renderedAppHtml}</div>`
        );

      fs.mkdirSync(path.dirname(route.outFile), { recursive: true });
      fs.writeFileSync(route.outFile, routeHtml, 'utf-8');
      console.log(
        `[prerender] Prerendered ${route.meta.url} (lang="${route.meta.lang}", canonical="${route.meta.canonical || 'none'}") -> ${path.relative(rootDir, route.outFile)}`
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
