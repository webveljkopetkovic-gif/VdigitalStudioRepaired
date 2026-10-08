import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getHomePath,
  LANG_BANNER_DISMISSED_KEY,
  LANG_CHOICE_STORAGE_KEY,
  saveLanguageChoice,
  SupportedLocale,
  useI18n,
} from '../i18n';
import {
  CONSENT_UPDATED_EVENT,
  getConsentChoice,
  OPEN_COOKIE_BANNER_EVENT,
} from '../utils/analytics';

const SR_COUNTRIES = new Set(['RS', 'BA', 'ME', 'HR']);
const RU_COUNTRIES = new Set(['RU', 'BY', 'KZ', 'KG', 'UZ', 'TJ', 'AM', 'AZ', 'MD']);

const BANNER_COPY: Record<
  SupportedLocale,
  {
    text: string;
    href: string;
  }
> = {
  sr: {
    text: 'Pogledajte sajt na srpskom →',
    href: '/sr',
  },
  ru: {
    text: 'Посмотреть сайт на русском →',
    href: '/ru',
  },
  en: {
    text: 'View this site in English →',
    href: '/',
  },
};

const CLOSE_ARIA_LABEL: Record<SupportedLocale, string> = {
  en: 'Close language suggestion',
  sr: 'Zatvori predlog jezika',
  ru: 'Закрыть предложение языка',
};

function getCookieValue(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${name}=([^;]+)`)
  );
  return match ? decodeURIComponent(match[1].trim()) : null;
}

export function detectSuggestedLanguage(): SupportedLocale {
  // 1. Preferred: check vd_country cookie set by Vercel Edge Middleware
  const countryCookie = (getCookieValue('vd_country') || '').toUpperCase();
  if (countryCookie) {
    if (SR_COUNTRIES.has(countryCookie)) return 'sr';
    if (RU_COUNTRIES.has(countryCookie)) return 'ru';
    return 'en';
  }

  // 2. Fallback: inspect navigator.languages
  if (typeof navigator !== 'undefined') {
    const browserLangs =
      Array.isArray(navigator.languages) && navigator.languages.length > 0
        ? navigator.languages
        : navigator.language
          ? [navigator.language]
          : [];

    for (const raw of browserLangs) {
      const normalized = (raw || '').trim().toLowerCase();
      if (
        normalized.startsWith('sr') ||
        normalized.startsWith('bs') ||
        normalized.startsWith('hr')
      ) {
        return 'sr';
      }
      if (normalized.startsWith('ru')) {
        return 'ru';
      }
      if (normalized.startsWith('en')) {
        return 'en';
      }
    }
  }

  return 'en';
}

export const LanguageSuggestionBanner: React.FC = () => {
  const { locale } = useI18n();
  const navigate = useNavigate();

  const [suggestedLang, setSuggestedLang] = useState<SupportedLocale | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [cookieBannerOpen, setCookieBannerOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setCookieBannerOpen(!getConsentChoice());

    const onConsentUpdated = () => setCookieBannerOpen(false);
    const onCookieOpened = () => setCookieBannerOpen(true);

    window.addEventListener(CONSENT_UPDATED_EVENT, onConsentUpdated);
    window.addEventListener(OPEN_COOKIE_BANNER_EVENT, onCookieOpened);
    return () => {
      window.removeEventListener(CONSENT_UPDATED_EVENT, onConsentUpdated);
      window.removeEventListener(OPEN_COOKIE_BANNER_EVENT, onCookieOpened);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let reduced = false;
    try {
      const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
      reduced = mql.matches;
      setPrefersReducedMotion(reduced);
    } catch {
      // Ignore matchMedia errors
    }

    // Check localStorage for prior dismissal or manual language choice
    try {
      const dismissed = window.localStorage.getItem(LANG_BANNER_DISMISSED_KEY);
      const manualChoice = window.localStorage.getItem(LANG_CHOICE_STORAGE_KEY);
      if (dismissed || manualChoice) {
        setSuggestedLang(null);
        setIsVisible(false);
        setIsEntered(false);
        return;
      }
    } catch {
      // Ignore localStorage errors
    }

    const detected = detectSuggestedLanguage();
    if (detected === locale) {
      setSuggestedLang(null);
      setIsVisible(false);
      setIsEntered(false);
      return;
    }

    setSuggestedLang(detected);

    let enterFrame = 0;
    const timer = window.setTimeout(() => {
      setIsVisible(true);
      if (reduced) {
        setIsEntered(true);
      } else {
        enterFrame = window.requestAnimationFrame(() => {
          setIsEntered(true);
        });
      }
    }, 1000);

    return () => {
      window.clearTimeout(timer);
      if (enterFrame) window.cancelAnimationFrame(enterFrame);
    };
  }, [locale]);

  const handleDismiss = () => {
    try {
      window.localStorage.setItem(LANG_BANNER_DISMISSED_KEY, '1');
    } catch {
      // Ignore localStorage errors
    }
    setIsVisible(false);
    setSuggestedLang(null);
  };

  useEffect(() => {
    if (!isVisible || !suggestedLang) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isVisible, suggestedLang]);

  if (!suggestedLang || suggestedLang === locale || !isVisible) {
    return null;
  }

  const copy = BANNER_COPY[suggestedLang];
  const closeAriaLabel = CLOSE_ARIA_LABEL[locale] || CLOSE_ARIA_LABEL.en;

  const handleSelectSuggested = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    saveLanguageChoice(suggestedLang);
    setIsVisible(false);
    setSuggestedLang(null);
    navigate(getHomePath(suggestedLang));
  };

  return (
    <div
      role="region"
      aria-label="Language suggestion"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
      className={`fixed left-4 right-4 sm:right-auto sm:left-6 z-50 pointer-events-none flex justify-center sm:justify-start ${
        cookieBannerOpen
          ? 'bottom-36 sm:bottom-36'
          : 'bottom-4 sm:bottom-7'
      } ${
        prefersReducedMotion
          ? 'opacity-100 translate-y-0'
          : `transition-all duration-300 ease-out ${
              isEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`
      }`}
    >
      <div className="pointer-events-auto inline-flex items-center justify-between gap-2 pl-4 pr-1.5 py-1.5 rounded-[12px] bg-[color:var(--vd-141416)]/95 backdrop-blur-md border border-white/[0.12] shadow-[0_14px_38px_color-mix(in_srgb,var(--vd-000000)_65%,transparent)] font-geist text-white max-w-full">
        <a
          href={copy.href}
          lang={suggestedLang}
          hrefLang={suggestedLang}
          onClick={handleSelectSuggested}
          className="inline-flex items-center gap-1.5 py-2 pr-1 text-[13.5px] sm:text-[14px] font-medium text-neutral-100 hover:text-[color:var(--vd-9ce607)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--vd-9ce607)] rounded-[6px] transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--vd-9ce607)] shrink-0" aria-hidden="true" />
          <span>{copy.text}</span>
        </a>

        <button
          type="button"
          onClick={handleDismiss}
          aria-label={closeAriaLabel}
          title={closeAriaLabel}
          className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-[8px] inline-flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--vd-9ce607)] transition-colors cursor-pointer shrink-0 text-[18px] leading-none"
        >
          <span aria-hidden="true">×</span>
        </button>
      </div>
    </div>
  );
};
