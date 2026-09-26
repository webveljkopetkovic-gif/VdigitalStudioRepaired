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

const PAGE_META: Record<SupportedLocale, { title: string; description: string }> = {
  en: {
    title: 'VDigital. | Websites, Video & Marketing for Doctors and Coaches',
    description:
      'VDigital builds websites, video content, paid ads, and sales systems for doctors and coaches that bring new clients in 3 weeks.',
  },
  sr: {
    title: 'VDigital. | Sajtovi, video i marketing za doktore i koučeve',
    description:
      'VDigital gradi veb-sajtove, video sadržaj, reklame i prodajne sisteme za doktore i koučeve koji donose nove klijente za 3 nedelje.',
  },
  ru: {
    title: 'VDigital. | Сайты, видео и маркетинг для врачей и коучей',
    description:
      'VDigital создаёт сайты, видеоконтент, рекламу и систему продаж для врачей и коучей, которые приводят новых клиентов за 3 недели.',
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
      const descEl = document.querySelector('meta[name="description"]');
      if (descEl) {
        descEl.setAttribute('content', meta.description);
      }
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
