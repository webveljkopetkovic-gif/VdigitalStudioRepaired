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

export const LANG_CHOICE_STORAGE_KEY = 'vd_lang_choice';
export const LANG_BANNER_DISMISSED_KEY = 'vd_lang_banner_dismissed';

export function saveLanguageChoice(locale: SupportedLocale) {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(LANG_CHOICE_STORAGE_KEY, locale);
    }
  } catch {
    // Ignore localStorage errors (e.g. private browsing or restricted storage)
  }
}

const HOME_META: Record<
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
    title: 'VDigital: Sajtovi i marketing za doktore i koučeve',
    description:
      'Pravimo sajtove, video sadržaj i marketing za doktore i health koučeve. Strategija, reklame i hladni pozivi: ceo sistem za nove klijente za 3 nedelje.',
    canonical: 'https://vdigital.dev/sr',
    ogLocale: 'sr_RS',
  },
  ru: {
    title: 'VDigital: Сайты и маркетинг для врачей и коучей',
    description:
      'Создаём сайты, видео и маркетинг для врачей и коучей. Стратегия, реклама и холодные звонки: полная система привлечения клиентов за 3 недели.',
    canonical: 'https://vdigital.dev/ru',
    ogLocale: 'ru_RU',
  },
};

const CONTACT_META: Record<
  SupportedLocale,
  {
    title: string;
    description: string;
    canonical: string;
    ogLocale: string;
  }
> = {
  en: {
    title: 'Contact & Book a Free Call | VDigital',
    description:
      'Book a free 30-minute call with VDigital, or reach us on WhatsApp, Viber, Telegram or email. We reply within 24 hours on working days.',
    canonical: 'https://vdigital.dev/contact',
    ogLocale: 'en_US',
  },
  sr: {
    title: 'Kontakt i besplatan poziv | VDigital',
    description:
      'Zakažite besplatan poziv od 30 minuta sa VDigital timom ili nam pišite na WhatsApp, Viber, Telegram ili email. Odgovaramo u roku od 24 sata.',
    canonical: 'https://vdigital.dev/sr/kontakt',
    ogLocale: 'sr_RS',
  },
  ru: {
    title: 'Контакты и бесплатная консультация | VDigital',
    description:
      'Запишитесь на бесплатный 30-минутный звонок с VDigital или напишите нам в Telegram, WhatsApp, Viber или на email. Отвечаем в течение 24 часов.',
    canonical: 'https://vdigital.dev/ru/kontakty',
    ogLocale: 'ru_RU',
  },
};

const PRIVACY_META: Record<
  SupportedLocale,
  {
    title: string;
    description: string;
    canonical: string;
    ogLocale: string;
  }
> = {
  en: {
    title: 'Privacy Policy | VDigital',
    description:
      'Learn how VDigital collects, uses and protects your personal data under the Serbian Law on Personal Data Protection (ZZPL) and GDPR.',
    canonical: 'https://vdigital.dev/privacy',
    ogLocale: 'en_US',
  },
  sr: {
    title: 'Politika privatnosti | VDigital',
    description:
      'Saznajte kako VDigital prikuplja, koristi i štiti vaše podatke o ličnosti u skladu sa ZZPL i GDPR propisima.',
    canonical: 'https://vdigital.dev/sr/privatnost',
    ogLocale: 'sr_RS',
  },
  ru: {
    title: 'Политика конфиденциальности | VDigital',
    description:
      'Узнайте, как VDigital собирает, использует и защищает ваши персональные данные в соответствии с законом Сербии (ZZPL) и GDPR.',
    canonical: 'https://vdigital.dev/ru/konfidencialnost',
    ogLocale: 'ru_RU',
  },
};

const NOT_FOUND_META: Record<
  SupportedLocale,
  {
    title: string;
    description: string;
    canonical: string;
    ogLocale: string;
  }
> = {
  en: {
    title: '404 — Page Not Found | VDigital',
    description:
      "The page you are looking for doesn't exist or has been moved. Return to the VDigital homepage.",
    canonical: 'https://vdigital.dev/',
    ogLocale: 'en_US',
  },
  sr: {
    title: '404 — Stranica nije pronađena | VDigital',
    description:
      'Stranica koju tražite ne postoji ili je premeštena. Vratite se na početnu stranicu VDigital studija.',
    canonical: 'https://vdigital.dev/sr',
    ogLocale: 'sr_RS',
  },
  ru: {
    title: '404 — Страница не найдена | VDigital',
    description:
      'Запрашиваемая страница не существует или была перемещена. Вернитесь на главную страницу VDigital.',
    canonical: 'https://vdigital.dev/ru',
    ogLocale: 'ru_RU',
  },
};

export function getHomePath(locale: SupportedLocale): string {
  if (locale === 'sr') return '/sr';
  if (locale === 'ru') return '/ru';
  return '/';
}

export function getContactPath(locale: SupportedLocale): string {
  if (locale === 'sr') return '/sr/kontakt';
  if (locale === 'ru') return '/ru/kontakty';
  return '/contact';
}

export function getPrivacyPath(locale: SupportedLocale): string {
  if (locale === 'sr') return '/sr/privatnost';
  if (locale === 'ru') return '/ru/konfidencialnost';
  return '/privacy';
}

export function isHomeRoute(pathname: string): boolean {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return clean === '/' || clean === '/en' || clean === '/sr' || clean === '/ru';
}

export function isContactRoute(pathname: string): boolean {
  const clean = pathname.replace(/\/+$/, '');
  return (
    clean === '/contact' ||
    clean === '/en/contact' ||
    clean === '/sr/kontakt' ||
    clean === '/ru/kontakty'
  );
}

export function isPrivacyRoute(pathname: string): boolean {
  const clean = pathname.replace(/\/+$/, '');
  return (
    clean === '/privacy' ||
    clean === '/en/privacy' ||
    clean === '/sr/privatnost' ||
    clean === '/sr/privacy' ||
    clean === '/politika-privatnosti' ||
    clean === '/sr/politika-privatnosti' ||
    clean === '/ru/konfidencialnost' ||
    clean === '/ru/privacy' ||
    clean === '/politika-konfidencialnosti' ||
    clean === '/politika-konfidencijalnosti' ||
    clean === '/ru/politika-konfidencialnosti'
  );
}

interface I18nContextValue {
  locale: SupportedLocale;
  t: Translations;
  selectLocale: (nextLocale: SupportedLocale) => void;
  homePath: string;
  contactPath: string;
  privacyPath: string;
  isContactPage: boolean;
  isPrivacyPage: boolean;
  isNotFoundPage: boolean;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  t: en,
  selectLocale: () => {},
  homePath: '/',
  contactPath: '/contact',
  privacyPath: '/privacy',
  isContactPage: false,
  isPrivacyPage: false,
  isNotFoundPage: false,
});

export const I18nProvider: React.FC<{
  locale: SupportedLocale;
  children: React.ReactNode;
}> = ({ locale, children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const t = dictionaries[locale] || en;
  const isContactPage = isContactRoute(location.pathname);
  const isPrivacyPage = isPrivacyRoute(location.pathname);
  const isNotFoundPage =
    !isHomeRoute(location.pathname) && !isContactPage && !isPrivacyPage;
  const homePath = getHomePath(locale);
  const contactPath = getContactPath(locale);
  const privacyPath = getPrivacyPath(locale);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      const metaGroup = isNotFoundPage
        ? NOT_FOUND_META
        : isPrivacyPage
          ? PRIVACY_META
          : isContactPage
            ? CONTACT_META
            : HOME_META;
      const meta = metaGroup[locale] || metaGroup.en;
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

      if (isPrivacyPage) {
        setMeta('link[rel="alternate"][hreflang="en"]', 'href', 'https://vdigital.dev/privacy');
        setMeta('link[rel="alternate"][hreflang="sr"]', 'href', 'https://vdigital.dev/sr/privatnost');
        setMeta('link[rel="alternate"][hreflang="ru"]', 'href', 'https://vdigital.dev/ru/konfidencialnost');
        setMeta('link[rel="alternate"][hreflang="x-default"]', 'href', 'https://vdigital.dev/privacy');
      } else if (isContactPage) {
        setMeta('link[rel="alternate"][hreflang="en"]', 'href', 'https://vdigital.dev/contact');
        setMeta('link[rel="alternate"][hreflang="sr"]', 'href', 'https://vdigital.dev/sr/kontakt');
        setMeta('link[rel="alternate"][hreflang="ru"]', 'href', 'https://vdigital.dev/ru/kontakty');
        setMeta('link[rel="alternate"][hreflang="x-default"]', 'href', 'https://vdigital.dev/contact');
      } else {
        setMeta('link[rel="alternate"][hreflang="en"]', 'href', 'https://vdigital.dev/');
        setMeta('link[rel="alternate"][hreflang="sr"]', 'href', 'https://vdigital.dev/sr');
        setMeta('link[rel="alternate"][hreflang="ru"]', 'href', 'https://vdigital.dev/ru');
        setMeta('link[rel="alternate"][hreflang="x-default"]', 'href', 'https://vdigital.dev/');
      }
    }
  }, [locale, isContactPage, isPrivacyPage, isNotFoundPage]);

  const selectLocale = (nextLocale: SupportedLocale) => {
    saveLanguageChoice(nextLocale);
    const targetPath = isPrivacyPage
      ? getPrivacyPath(nextLocale)
      : isContactPage
        ? getContactPath(nextLocale)
        : getHomePath(nextLocale);
    navigate(`${targetPath}${location.search}`);
  };

  return (
    <I18nContext.Provider
      value={{
        locale,
        t,
        selectLocale,
        homePath,
        contactPath,
        privacyPath,
        isContactPage,
        isPrivacyPage,
        isNotFoundPage,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
