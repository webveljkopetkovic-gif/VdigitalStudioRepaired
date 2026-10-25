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
    title: 'VDigital | Websites, Video & Marketing for Growing Businesses',
    description:
      'We build websites, video content and marketing for businesses that want more clients. Strategy, ads, automation and cold calling, running in 3 weeks.',
    canonical: 'https://vdigital.dev/',
    ogLocale: 'en_US',
  },
  sr: {
    title: 'VDigital | Sajtovi, video i marketing za rast biznisa',
    description:
      'Pravimo sajtove, video sadržaj i marketing za firme koje žele više klijenata. Strategija, reklame, automatizacija i cold calling, sve za 3 nedelje.',
    canonical: 'https://vdigital.dev/sr',
    ogLocale: 'sr_RS',
  },
  ru: {
    title: 'VDigital | Сайты, видео и маркетинг для растущего бизнеса',
    description:
      'Создаём сайты, видеоконтент и маркетинг для бизнеса, которому нужно больше клиентов. Стратегия, реклама, автоматизация и cold calling за 3 недели.',
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
    title: 'Контакты и бесплатный звонок | VDigital',
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
    title: '404 - Page Not Found | VDigital',
    description:
      "The page you are looking for doesn't exist or has been moved. Return to the VDigital homepage.",
    canonical: 'https://vdigital.dev/',
    ogLocale: 'en_US',
  },
  sr: {
    title: '404 - Stranica nije pronađena | VDigital',
    description:
      'Stranica koju tražite ne postoji ili je premeštena. Vratite se na početnu stranicu VDigital studija.',
    canonical: 'https://vdigital.dev/sr',
    ogLocale: 'sr_RS',
  },
  ru: {
    title: '404 - Страница не найдена | VDigital',
    description:
      'Запрашиваемая страница не существует или была перемещена. Вернитесь на главную страницу VDigital.',
    canonical: 'https://vdigital.dev/ru',
    ogLocale: 'ru_RU',
  },
};

export type ServiceSlug =
  | 'web-development'
  | 'video-social-media'
  | 'marketing-automation'
  | 'cold-calling';

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

export function getAboutPath(locale: SupportedLocale): string {
  if (locale === 'sr') return '/sr/o-nama';
  if (locale === 'ru') return '/ru/o-nas';
  return '/about';
}

export function getServicePath(slug: ServiceSlug, locale: SupportedLocale): string {
  if (locale === 'sr') {
    switch (slug) {
      case 'web-development':
        return '/sr/usluge/izrada-sajtova';
      case 'video-social-media':
        return '/sr/usluge/video-i-drustvene-mreze';
      case 'marketing-automation':
        return '/sr/usluge/marketing-i-automatizacija';
      case 'cold-calling':
        return '/sr/usluge/hladni-pozivi';
    }
  }
  if (locale === 'ru') {
    switch (slug) {
      case 'web-development':
        return '/ru/uslugi/sozdanie-sajtov';
      case 'video-social-media':
        return '/ru/uslugi/video-i-socseti';
      case 'marketing-automation':
        return '/ru/uslugi/marketing-i-avtomatizaciya';
      case 'cold-calling':
        return '/ru/uslugi/holodnye-zvonki';
    }
  }
  switch (slug) {
    case 'web-development':
      return '/services/web-development';
    case 'video-social-media':
      return '/services/video-social-media';
    case 'marketing-automation':
      return '/services/marketing-automation';
    case 'cold-calling':
      return '/services/cold-calling';
  }
}

export function getEquivalentPath(pathname: string, targetLocale: SupportedLocale): string {
  const clean = pathname.replace(/\/+$/, '') || '/';

  if (clean === '/about' || clean === '/sr/o-nama' || clean === '/ru/o-nas') {
    return getAboutPath(targetLocale);
  }

  if (
    clean === '/contact' ||
    clean === '/sr/kontakt' ||
    clean === '/ru/kontakty' ||
    clean === '/en/contact'
  ) {
    return getContactPath(targetLocale);
  }

  if (
    clean === '/privacy' ||
    clean === '/sr/privatnost' ||
    clean === '/ru/konfidencialnost' ||
    clean === '/en/privacy' ||
    clean.includes('privatnost') ||
    clean.includes('konfidencialnost')
  ) {
    return getPrivacyPath(targetLocale);
  }

  if (
    clean === '/services/web-development' ||
    clean === '/sr/usluge/izrada-sajtova' ||
    clean === '/ru/uslugi/sozdanie-sajtov'
  ) {
    return getServicePath('web-development', targetLocale);
  }

  if (
    clean === '/services/video-social-media' ||
    clean === '/sr/usluge/video-i-drustvene-mreze' ||
    clean === '/ru/uslugi/video-i-socseti'
  ) {
    return getServicePath('video-social-media', targetLocale);
  }

  if (
    clean === '/services/marketing-automation' ||
    clean === '/sr/usluge/marketing-i-automatizacija' ||
    clean === '/ru/uslugi/marketing-i-avtomatizaciya'
  ) {
    return getServicePath('marketing-automation', targetLocale);
  }

  if (
    clean === '/services/cold-calling' ||
    clean === '/sr/usluge/hladni-pozivi' ||
    clean === '/ru/uslugi/holodnye-zvonki'
  ) {
    return getServicePath('cold-calling', targetLocale);
  }

  return getHomePath(targetLocale);
}

export function isHomeRoute(pathname: string): boolean {
  const clean = pathname.replace(/\/+$/, '') || '/';
  return clean === '/' || clean === '/en' || clean === '/sr' || clean === '/ru';
}

export function isAboutRoute(pathname: string): boolean {
  const clean = pathname.replace(/\/+$/, '');
  return clean === '/about' || clean === '/sr/o-nama' || clean === '/ru/o-nas';
}

export function isServiceRoute(pathname: string): boolean {
  const clean = pathname.replace(/\/+$/, '');
  return (
    clean.startsWith('/services/') ||
    clean.startsWith('/sr/usluge/') ||
    clean.startsWith('/ru/uslugi/')
  );
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
  aboutPath: string;
  getServicePath: (slug: ServiceSlug) => string;
  getEquivalentPath: (targetLocale: SupportedLocale) => string;
  isContactPage: boolean;
  isPrivacyPage: boolean;
  isAboutPage: boolean;
  isServicePage: boolean;
  isNotFoundPage: boolean;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  t: en,
  selectLocale: () => {},
  homePath: '/',
  contactPath: '/contact',
  privacyPath: '/privacy',
  aboutPath: '/about',
  getServicePath: () => '/services/web-development',
  getEquivalentPath: () => '/',
  isContactPage: false,
  isPrivacyPage: false,
  isAboutPage: false,
  isServicePage: false,
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
  const isAboutPage = isAboutRoute(location.pathname);
  const isServicePage = isServiceRoute(location.pathname);
  const isNotFoundPage =
    !isHomeRoute(location.pathname) &&
    !isContactPage &&
    !isPrivacyPage &&
    !isAboutPage &&
    !isServicePage;

  const homePath = getHomePath(locale);
  const contactPath = getContactPath(locale);
  const privacyPath = getPrivacyPath(locale);
  const aboutPath = getAboutPath(locale);

  const getServicePathForCurrentLocale = (slug: ServiceSlug) =>
    getServicePath(slug, locale);

  const getEquivalentPathForCurrentRoute = (targetLocale: SupportedLocale) =>
    getEquivalentPath(location.pathname, targetLocale);

  const selectLocale = (nextLocale: SupportedLocale) => {
    saveLanguageChoice(nextLocale);
    const targetPath = getEquivalentPath(location.pathname, nextLocale);
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
        aboutPath,
        getServicePath: getServicePathForCurrentLocale,
        getEquivalentPath: getEquivalentPathForCurrentRoute,
        isContactPage,
        isPrivacyPage,
        isAboutPage,
        isServicePage,
        isNotFoundPage,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
