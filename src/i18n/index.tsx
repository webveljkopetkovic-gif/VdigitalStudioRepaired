import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { en, type Translations } from './en';
import { sr } from './sr';
import { ru } from './ru';

export type SupportedLocale = 'en' | 'sr' | 'ru';

const dictionaries: Record<SupportedLocale, Translations> = {
  en,
  sr,
  ru,
};

const MANUAL_LANG_KEY = 'vdigital_manual_lang';
const GEO_CHECKED_KEY = 'vdigital_geo_lang';

const SERBIA_AND_REGION_COUNTRIES = new Set([
  'RS',
  'ME',
  'BA',
  'HR',
  'MK',
  'SI',
  'XK',
]);
const RUSSIA_BELARUS_KAZAKHSTAN_COUNTRIES = new Set(['RU', 'BY', 'KZ']);

const SERBIA_AND_REGION_TIMEZONES = new Set([
  'Europe/Belgrade',
  'Europe/Podgorica',
  'Europe/Sarajevo',
  'Europe/Zagreb',
  'Europe/Skopje',
  'Europe/Ljubljana',
]);

const RUSSIA_BELARUS_KAZAKHSTAN_TIMEZONES = new Set([
  'Europe/Moscow',
  'Europe/Minsk',
  'Europe/Kaliningrad',
  'Europe/Samara',
  'Europe/Volgograd',
  'Europe/Kirov',
  'Europe/Astrakhan',
  'Europe/Saratov',
  'Europe/Ulyanovsk',
  'Asia/Yekaterinburg',
  'Asia/Omsk',
  'Asia/Novosibirsk',
  'Asia/Barnaul',
  'Asia/Tomsk',
  'Asia/Novokuznetsk',
  'Asia/Krasnoyarsk',
  'Asia/Irkutsk',
  'Asia/Chita',
  'Asia/Yakutsk',
  'Asia/Khandyga',
  'Asia/Vladivostok',
  'Asia/Ust-Nera',
  'Asia/Magadan',
  'Asia/Sakhalin',
  'Asia/Srednekolymsk',
  'Asia/Kamchatka',
  'Asia/Anadyr',
  'Asia/Almaty',
  'Asia/Qyzylorda',
  'Asia/Qostanay',
  'Asia/Aqtobe',
  'Asia/Aqtau',
  'Asia/Atyrau',
  'Asia/Oral',
]);

const PAGE_META: Record<
  SupportedLocale,
  {
    title: string;
    description: string;
    canonical: string;
    ogLocale: string;
  }
> = {
  en: {
    title: 'VDigital: Websites & Marketing for Doctors and Coaches',
    description:
      'We build websites, video content and marketing for doctors and health coaches. Strategy, ads and cold calling: a full client system in 3 weeks.',
    canonical: 'https://vdigital.dev/',
    ogLocale: 'en_US',
  },
  sr: {
    title: 'VDigital: Izrada sajta i marketing za lekare i coacheve',
    description:
      'Izrađujemo sajtove, video sadržaj i marketing za lekare i health coacheve. Strategija, reklame i cold calling: ceo sistem za klijente za 3 nedelje.',
    canonical: 'https://vdigital.dev/sr/',
    ogLocale: 'sr_RS',
  },
  ru: {
    title: 'VDigital: Сайты и маркетинг для врачей и коучей',
    description:
      'Создаём сайты, видео и маркетинг для врачей и коучей. Стратегия, реклама и холодные звонки: полная система привлечения клиентов за 3 недели.',
    canonical: 'https://vdigital.dev/ru/',
    ogLocale: 'ru_RU',
  },
};

function mapCountryToLocale(countryCode?: string | null): SupportedLocale | null {
  if (!countryCode) return null;
  const upper = countryCode.trim().toUpperCase();
  if (SERBIA_AND_REGION_COUNTRIES.has(upper)) return 'sr';
  if (RUSSIA_BELARUS_KAZAKHSTAN_COUNTRIES.has(upper)) return 'ru';
  return 'en';
}

function detectTimezoneLocale(): SupportedLocale | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!tz) return null;
    if (SERBIA_AND_REGION_TIMEZONES.has(tz)) return 'sr';
    if (RUSSIA_BELARUS_KAZAKHSTAN_TIMEZONES.has(tz)) return 'ru';
  } catch {
    // Ignore
  }
  return null;
}

export function markManualLocale(locale: SupportedLocale) {
  try {
    sessionStorage.setItem(MANUAL_LANG_KEY, locale);
  } catch {
    // Ignore storage errors
  }
}

interface I18nContextValue {
  locale: SupportedLocale;
  t: Translations;
  selectLocale: (nextLocale: SupportedLocale) => void;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  t: en,
  selectLocale: () => {},
});

export const I18nProvider: React.FC<{
  locale: SupportedLocale;
  children: React.ReactNode;
}> = ({ locale, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const t = dictionaries[locale] || en;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      const meta = PAGE_META[locale] || PAGE_META.en;
      document.title = meta.title;

      const setMeta = (selector: string, attr: string, value: string) => {
        const el = document.querySelector(selector);
        if (el) el.setAttribute(attr, value);
      };

      setMeta('meta[name="description"]', 'content', meta.description);
      setMeta('link[rel="canonical"]', 'href', meta.canonical);
      setMeta('meta[property="og:title"]', 'content', meta.title);
      setMeta('meta[property="og:description"]', 'content', meta.description);
      setMeta('meta[property="og:url"]', 'content', meta.canonical);
      setMeta('meta[property="og:locale"]', 'content', meta.ogLocale);
      setMeta('meta[property="og:image:alt"]', 'content', meta.title);
      setMeta('meta[name="twitter:title"]', 'content', meta.title);
      setMeta('meta[name="twitter:description"]', 'content', meta.description);
      setMeta('meta[name="twitter:image:alt"]', 'content', meta.title);
    }
  }, [locale]);

  // Location-based default language detection:
  // - Serbia & region (RS, ME, BA, HR, MK, SI, XK) -> Serbian (/sr/)
  // - Russia, Belarus, Kazakhstan (RU, BY, KZ) -> Russian (/ru/)
  // - Everywhere else -> English (/)
  useEffect(() => {
    if (typeof window === 'undefined') return;

    let manualChoice: string | null = null;
    try {
      manualChoice = sessionStorage.getItem(MANUAL_LANG_KEY);
    } catch {
      // Ignore
    }

    // If user explicitly navigated directly to /sr/ or /ru/, respect that URL
    if (location.pathname.startsWith('/sr') || location.pathname.startsWith('/ru')) {
      return;
    }

    // If user manually clicked EN/SR/RU switcher in this session, respect their choice
    if (manualChoice === 'en' || manualChoice === 'sr' || manualChoice === 'ru') {
      if (manualChoice === 'sr' && location.pathname === '/') {
        navigate('/sr/', { replace: true });
      } else if (manualChoice === 'ru' && location.pathname === '/') {
        navigate('/ru/', { replace: true });
      }
      return;
    }

    const applyDetectedLocale = (detected: SupportedLocale) => {
      try {
        sessionStorage.setItem(GEO_CHECKED_KEY, detected);
      } catch {
        // Ignore
      }
      if (detected === 'sr' && location.pathname === '/') {
        navigate('/sr/', { replace: true });
      } else if (detected === 'ru' && location.pathname === '/') {
        navigate('/ru/', { replace: true });
      }
    };

    // 1. Check cached geo result in sessionStorage
    try {
      const cachedGeo = sessionStorage.getItem(GEO_CHECKED_KEY) as SupportedLocale | null;
      if (cachedGeo === 'sr' || cachedGeo === 'ru' || cachedGeo === 'en') {
        applyDetectedLocale(cachedGeo);
        return;
      }
    } catch {
      // Ignore
    }

    // 2. Instant timezone check for Serbia/Region or Russia/Belarus/Kazakhstan
    const tzLocale = detectTimezoneLocale();
    if (tzLocale === 'sr' || tzLocale === 'ru') {
      applyDetectedLocale(tzLocale);
      return;
    }

    // 3. IP Geolocation lookup (GeoJS -> country.is -> ipapi.co fallback)
    let cancelled = false;
    (async () => {
      const endpoints = [
        {
          url: 'https://get.geojs.io/v1/ip/country.json',
          extract: (d: Record<string, string>) => d.country,
        },
        {
          url: 'https://api.country.is/',
          extract: (d: Record<string, string>) => d.country,
        },
        {
          url: 'https://ipapi.co/json/',
          extract: (d: Record<string, string>) => d.country_code,
        },
      ];

      for (const ep of endpoints) {
        try {
          const res = await fetch(ep.url);
          if (res.ok) {
            const data = (await res.json()) as Record<string, string>;
            const mapped = mapCountryToLocale(ep.extract(data));
            if (!cancelled && mapped) {
              applyDetectedLocale(mapped);
              return;
            }
          }
        } catch {
          // Try next geolocation endpoint
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [location.pathname, navigate]);

  const selectLocale = (nextLocale: SupportedLocale) => {
    markManualLocale(nextLocale);
    const targetPath =
      nextLocale === 'en' ? '/' : nextLocale === 'sr' ? '/sr/' : '/ru/';
    navigate(targetPath);
  };

  return (
    <I18nContext.Provider value={{ locale, t, selectLocale }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
