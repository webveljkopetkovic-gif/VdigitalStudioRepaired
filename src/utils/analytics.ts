import * as CookieConsent from 'vanilla-cookieconsent';

export const GA_MEASUREMENT_ID = 'G-NNXZ378TYV';
export const YM_ID = 113158297;
export const CONSENT_STORAGE_KEY = 'vd-consent';
export const OPEN_COOKIE_BANNER_EVENT = 'vd:open-cookie-banner';
export const CONSENT_UPDATED_EVENT = 'vd:consent-updated';

export type ConsentValue = 'granted' | 'denied';
export type ConsentCategory = 'necessary' | 'analytics' | 'marketing';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    ym?: (...args: unknown[]) => void;
  }
}

const TRACKING_COOKIE_PREFIXES = [
  '_ga',
  '_gid',
  '_gat',
  '_ym_',
  'yandexuid',
  'yabs-sid',
  'ymex',
  '_fbp',
  '_fbc',
  '_ttp',
  '_gcl_',
  'li_',
];

/**
 * Deletes a cookie across current hostname and parent domain (.vdigital.dev)
 */
function deleteCookieByName(name: string): void {
  if (typeof document === 'undefined' || typeof window === 'undefined') return;
  const host = window.location.hostname;
  const parts = host.split('.');
  const rootDomain = parts.length >= 2 ? `.${parts.slice(-2).join('.')}` : host;

  const domains = ['', host, `.${host}`, rootDomain];
  const paths = ['/', window.location.pathname || '/'];

  for (const d of domains) {
    for (const p of paths) {
      const domainAttr = d ? `; domain=${d}` : '';
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; path=${p}${domainAttr}; SameSite=Lax`;
    }
  }
}

/**
 * Clears all non-essential analytics/marketing cookies when consent is withdrawn or rejected
 */
export function clearNonEssentialCookies(
  categoriesToClear: ('analytics' | 'marketing')[] = ['analytics', 'marketing']
): void {
  if (typeof document === 'undefined') return;

  const clearAnalytics = categoriesToClear.includes('analytics');
  const clearMarketing = categoriesToClear.includes('marketing');

  const rawCookies = document.cookie ? document.cookie.split(';') : [];
  for (const entry of rawCookies) {
    const eqIdx = entry.indexOf('=');
    const cookieName = (eqIdx > -1 ? entry.slice(0, eqIdx) : entry).trim();
    if (!cookieName || cookieName === 'cc_cookie') continue;

    const isAnalyticsCookie =
      cookieName.startsWith('_ga') ||
      cookieName.startsWith('_gid') ||
      cookieName.startsWith('_gat') ||
      cookieName.startsWith('_ym_') ||
      cookieName === 'yandexuid' ||
      cookieName === 'yabs-sid' ||
      cookieName === 'ymex';

    const isMarketingCookie =
      cookieName.startsWith('_fbp') ||
      cookieName.startsWith('_fbc') ||
      cookieName.startsWith('_ttp') ||
      cookieName.startsWith('_gcl_') ||
      cookieName.startsWith('li_');

    if ((clearAnalytics && isAnalyticsCookie) || (clearMarketing && isMarketingCookie)) {
      deleteCookieByName(cookieName);
    }
  }

  // Also explicitly clear standard known cookie names
  for (const prefix of TRACKING_COOKIE_PREFIXES) {
    if (
      (clearAnalytics && (prefix.startsWith('_g') || prefix.startsWith('_ym') || prefix.startsWith('y'))) ||
      (clearMarketing && (prefix.startsWith('_fb') || prefix.startsWith('_tt') || prefix.startsWith('_gcl') || prefix.startsWith('li_')))
    ) {
      deleteCookieByName(prefix);
    }
  }

  if (clearAnalytics && typeof window !== 'undefined') {
    deleteCookieByName(`_ga_${GA_MEASUREMENT_ID.replace(/^G-/, '')}`);
    deleteCookieByName(`_ym_uid`);
    deleteCookieByName(`_ym_d`);
    deleteCookieByName(`_ym_isad`);
    deleteCookieByName(`_ym_visorc`);
    // Stop Yandex Metrica from firing further hits after withdrawal
    window.ym = undefined;
  }
}

export function isCategoryAccepted(category: ConsentCategory): boolean {
  if (typeof window === 'undefined') return false;
  if (category === 'necessary') return true;
  try {
    return CookieConsent.acceptedCategory(category);
  } catch {
    return false;
  }
}

export function hasAnalyticsConsent(): boolean {
  return isCategoryAccepted('analytics');
}

export function hasMarketingConsent(): boolean {
  return isCategoryAccepted('marketing');
}

export function getConsentChoice(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  try {
    if (CookieConsent.validConsent()) {
      return CookieConsent.acceptedCategory('analytics') ? 'granted' : 'denied';
    }
  } catch {
    // Ignore if CookieConsent is not initialized yet
  }
  return null;
}

export function syncConsentState(): void {
  if (typeof window === 'undefined') return;

  const analyticsGranted = isCategoryAccepted('analytics');
  const marketingGranted = isCategoryAccepted('marketing');

  window.dataLayer = window.dataLayer || [];
  const gtagFn =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer!.push(args);
    };

  gtagFn('consent', 'update', {
    analytics_storage: analyticsGranted ? 'granted' : 'denied',
    ad_storage: marketingGranted ? 'granted' : 'denied',
    ad_user_data: marketingGranted ? 'granted' : 'denied',
    ad_personalization: marketingGranted ? 'granted' : 'denied',
  });

  const toClear: ('analytics' | 'marketing')[] = [];
  if (!analyticsGranted) toClear.push('analytics');
  if (!marketingGranted) toClear.push('marketing');
  if (toClear.length > 0) {
    clearNonEssentialCookies(toClear);
  }

  window.dispatchEvent(
    new CustomEvent(CONSENT_UPDATED_EVENT, {
      detail: {
        choice: analyticsGranted ? 'granted' : 'denied',
        analytics: analyticsGranted,
        marketing: marketingGranted,
      },
    })
  );
}

export function updateGtagConsent(choice: ConsentValue): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  const gtagFn =
    window.gtag ||
    function (...args: unknown[]) {
      window.dataLayer!.push(args);
    };
  gtagFn('consent', 'update', {
    analytics_storage: choice,
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
  });
}

export function setConsentChoice(choice: ConsentValue): void {
  if (typeof window === 'undefined') return;
  try {
    if (choice === 'granted') {
      CookieConsent.acceptCategory(['necessary', 'analytics', 'marketing']);
    } else {
      CookieConsent.acceptCategory([]);
    }
  } catch {
    // Fallback if called before CookieConsent initialization
  }
  syncConsentState();
}

export function acceptCategoryConsent(category: ConsentCategory): void {
  if (typeof window === 'undefined') return;
  try {
    const current: string[] = ['necessary'];
    if (isCategoryAccepted('analytics')) current.push('analytics');
    if (isCategoryAccepted('marketing')) current.push('marketing');
    if (!current.includes(category)) current.push(category);
    CookieConsent.acceptCategory(current);
  } catch {
    // Ignore
  }
  syncConsentState();
}

export function openCookieSettings(): void {
  if (typeof window === 'undefined') return;
  try {
    CookieConsent.showPreferences();
  } catch {
    window.dispatchEvent(new CustomEvent(OPEN_COOKIE_BANNER_EVENT));
  }
}

export function trackEvent(
  eventName: string,
  params?: Record<string, unknown>
): void {
  if (typeof window === 'undefined') return;
  if (!hasAnalyticsConsent()) return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params || {});
  }
}

export function trackBookCallClick(location: string): void {
  trackEvent('book_a_call_click', {
    button_location: location,
  });
}

export function trackMessengerClick(
  channel: 'whatsapp' | 'viber' | 'telegram',
  location: string
): void {
  trackEvent(`${channel}_click`, {
    channel,
    link_location: location,
  });
}

export function trackFormSubmit(formName: string): void {
  trackEvent('form_submit', {
    form_name: formName,
  });
}

export function trackCalBookingCompleted(): void {
  trackEvent('cal_booking_completed', {
    event_type: 'bookingSuccessful',
    cal_link: 'vdigital/30min',
  });
}
