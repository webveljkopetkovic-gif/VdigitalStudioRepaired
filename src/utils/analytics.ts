export const GA_MEASUREMENT_ID = 'G-NNXZ378TYV';
export const CONSENT_STORAGE_KEY = 'vd-consent';
export const OPEN_COOKIE_BANNER_EVENT = 'vd:open-cookie-banner';
export const CONSENT_UPDATED_EVENT = 'vd:consent-updated';

export type ConsentValue = 'granted' | 'denied';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function getConsentChoice(): ConsentValue | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      const val = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      if (val === 'granted' || val === 'denied') {
        return val;
      }
    }
  } catch {
    // Ignore storage access errors
  }
  return null;
}

export function hasAnalyticsConsent(): boolean {
  return getConsentChoice() === 'granted';
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
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    }
  } catch {
    // Ignore storage access errors
  }
  updateGtagConsent(choice);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(CONSENT_UPDATED_EVENT, { detail: { choice } })
    );
  }
}

export function openCookieSettings(): void {
  if (typeof window !== 'undefined') {
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
