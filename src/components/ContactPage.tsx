import React, { useEffect, useState } from 'react';
import {
  Mail,
  Send,
  ArrowUpRight,
  Calendar,
} from 'lucide-react';
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PHONE_DISPLAY,
  TELEGRAM_URL,
  TELEGRAM_USERNAME,
  TIKTOK_URL,
  VIBER_URL,
  WHATSAPP_URL,
} from '../config';
import { useI18n } from '../i18n';
import { HeaderLogo } from './HeaderLogo';
import { Footer } from './Footer';
import { FloatingChatButton } from './FloatingChatButton';
import { ViberIcon, WhatsAppIcon } from './BrandIcons';
import {
  acceptCategoryConsent,
  CONSENT_UPDATED_EVENT,
  hasAnalyticsConsent,
  hasMarketingConsent,
  openCookieSettings,
  trackBookCallClick,
  trackCalBookingCompleted,
  trackMessengerClick,
} from '../utils/analytics';

export const ContactPage: React.FC = () => {
  const { locale, t } = useI18n();
  const [calAllowed, setCalAllowed] = useState<boolean>(
    () => hasMarketingConsent() || hasAnalyticsConsent()
  );

  // Scroll to top when arriving on Contact page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [locale]);

  // Listen for consent updates so Cal.com loads automatically once consented
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sync = () => {
      if (hasMarketingConsent() || hasAnalyticsConsent()) {
        setCalAllowed(true);
      }
    };
    sync();
    window.addEventListener(CONSENT_UPDATED_EVENT, sync);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, sync);
  }, []);

  // Initialize Cal.com inline embed ("vdigital/30min") ONLY after consent or explicit click
  useEffect(() => {
    if (typeof window === 'undefined' || !calAllowed) return;

    const container = document.getElementById('my-cal-inline-30min');
    if (container) {
      container.innerHTML = '';
    }

    (function (C: any, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement('script')).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === 'string') {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ['initNamespace', namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');

    const Cal = (window as any).Cal;
    Cal('init', '30min', { origin: 'https://app.cal.com' });
    Cal.config = Cal.config || {};
    Cal.config.forwardQueryParams = true;

    Cal.ns['30min']('inline', {
      elementOrSelector: '#my-cal-inline-30min',
      config: { layout: 'month_view', useSlotsViewOnSmallScreen: 'true' },
      calLink: 'vdigital/30min',
    });

    Cal.ns['30min']('ui', {
      hideEventTypeDetails: false,
      layout: 'month_view',
    });

    if (!Cal.ns['30min'].__vdBookingListenerAttached) {
      Cal.ns['30min'].__vdBookingListenerAttached = true;
      Cal.ns['30min']('on', {
        action: 'bookingSuccessful',
        callback: () => {
          trackCalBookingCompleted();
        },
      });
    }
  }, [calAllowed]);

  const whatsappPrefilledHref = `${WHATSAPP_URL}?text=${encodeURIComponent(
    t.contactPage.prefilledMessage
  )}`;
  const hasTelegramUsername = Boolean(TELEGRAM_USERNAME.trim());
  const telegramDirectHref = hasTelegramUsername
    ? `https://t.me/${TELEGRAM_USERNAME.trim()}`
    : TELEGRAM_URL;

  const emailItem = {
    key: 'email',
    href: `mailto:${CONTACT_EMAIL}`,
    label: CONTACT_EMAIL,
    external: false,
    icon: <Mail className="w-3.5 h-3.5 text-[color:var(--vd-b6ff00)] shrink-0" />,
  };

  const whatsappItem = {
    key: 'whatsapp',
    href: whatsappPrefilledHref,
    label: `WhatsApp: ${PHONE_DISPLAY}`,
    external: true,
    icon: <WhatsAppIcon className="w-3.5 h-3.5 text-[color:var(--vd-b6ff00)] shrink-0" />,
  };

  const viberItem = {
    key: 'viber',
    href: VIBER_URL,
    label: `Viber: ${PHONE_DISPLAY}`,
    external: false,
    icon: <ViberIcon className="w-3.5 h-3.5 text-[color:var(--vd-b6ff00)] shrink-0" />,
  };

  const telegramItem = {
    key: 'telegram',
    href: telegramDirectHref,
    label: hasTelegramUsername
      ? `Telegram: @${TELEGRAM_USERNAME.trim()}`
      : 'Telegram: @veljkopetkovic',
    external: true,
    icon: <Send className="w-3.5 h-3.5 text-[color:var(--vd-b6ff00)] shrink-0" />,
  };

  // On /ru show Telegram first; on / and /sr show Email first
  const contactLinks =
    locale === 'ru'
      ? [telegramItem, emailItem, whatsappItem, viberItem]
      : [emailItem, whatsappItem, viberItem, telegramItem];

  const hasBookingUrl = Boolean(BOOKING_URL.trim());

  return (
    <div className="min-h-screen w-full bg-[color:var(--vd-060709)] text-white selection:bg-[color:var(--vd-b6ff00)] selection:text-black relative flex flex-col overflow-x-clip font-geist">
      {/* Subtle architectural dark grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--vd-ffffff) 4%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--vd-ffffff) 4%, transparent) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Subtle ambient radial glow at top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] opacity-20 z-0"
        style={{
          background:
            'radial-gradient(ellipse at center, color-mix(in srgb, var(--vd-b6ff00) 16%, transparent) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Existing Site Navbar */}
      <HeaderLogo />

      {/* Main Content Container: generous top padding below navbar */}
      <main className="relative z-10 flex-1 w-full max-w-[1280px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 lg:pt-20 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3.6fr)_minmax(0,6.4fr)] gap-12 lg:gap-12 xl:gap-[56px] items-start">
          {/* =============================================================== */}
          {/* LEFT COLUMN (~40%, sticky on desktop)                           */}
          {/* =============================================================== */}
          <div className="lg:sticky lg:top-24 flex flex-col items-start">
            {/* 1. Small uppercase label (~11px, letter-spacing ~0.15em, muted gray) */}
            <span className="text-[11px] uppercase tracking-[0.15em] text-neutral-400 font-medium">
              {t.contactPage.label}
            </span>

            {/* 2. H1 (~56-64px, tight line-height, regular sans + italic serif ending with period) */}
            <h1 className="font-geist font-normal text-[40px] sm:text-[52px] lg:text-[58px] xl:text-[62px] leading-[1.05] tracking-[-0.03em] text-white mt-3">
              {`${t.contactPage.h1Regular} `}
              <span className="font-editorial italic font-normal text-[color:var(--vd-b6ff00)]">
                {t.contactPage.h1Italic}
              </span>
            </h1>

            {/* 3. Intro paragraph (~16px, muted light gray, max-width ~420px) */}
            <p className="text-[15.5px] sm:text-[16px] leading-[1.62] text-neutral-300/90 max-w-[420px] mt-5 font-normal">
              {t.contactPage.intro}
            </p>

            {/* 4. Small uppercase label for the steps section */}
            <div className="mt-9 text-[11px] uppercase tracking-[0.15em] text-neutral-400 font-medium">
              {t.contactPage.stepsLabel}
            </div>

            {/* 5. Numbered list of 3 steps */}
            <ol className="mt-4 space-y-3.5">
              {/* Step 1: depends on BOOKING_URL */}
              <li className="flex items-start gap-3">
                <span className="w-[18px] h-[18px] rounded-full border border-[color:var(--vd-b6ff00)] text-[color:var(--vd-b6ff00)] text-[10.5px] font-mono tabular-nums flex items-center justify-center shrink-0 mt-[2px]">
                  1
                </span>
                <span className="text-[14px] leading-[1.5] text-neutral-200">
                  {hasBookingUrl ? (
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener"
                      onClick={() => trackBookCallClick('contact_page_step1')}
                      className="text-[color:var(--vd-b6ff00)] hover:underline inline-flex items-center gap-1"
                    >
                      <span>{t.contactPage.step1Booking}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </a>
                  ) : (
                    t.contactPage.step1
                  )}
                </span>
              </li>

              {/* Step 2 */}
              <li className="flex items-start gap-3">
                <span className="w-[18px] h-[18px] rounded-full border border-[color:var(--vd-b6ff00)] text-[color:var(--vd-b6ff00)] text-[10.5px] font-mono tabular-nums flex items-center justify-center shrink-0 mt-[2px]">
                  2
                </span>
                <span className="text-[14px] leading-[1.5] text-neutral-200">
                  {t.contactPage.step2}
                </span>
              </li>

              {/* Step 3 */}
              <li className="flex items-start gap-3">
                <span className="w-[18px] h-[18px] rounded-full border border-[color:var(--vd-b6ff00)] text-[color:var(--vd-b6ff00)] text-[10.5px] font-mono tabular-nums flex items-center justify-center shrink-0 mt-[2px]">
                  3
                </span>
                <span className="text-[14px] leading-[1.5] text-neutral-200">
                  {t.contactPage.step3}
                </span>
              </li>
            </ol>

            {/* 6. Small uppercase label "prefer to write" */}
            <div className="mt-9 text-[11px] uppercase tracking-[0.15em] text-neutral-400 font-medium">
              {t.contactPage.writeLabel}
            </div>

            {/* 7. Contact links, one per row (~14px icon and ~14px text) */}
            <div className="mt-3.5 flex flex-col space-y-2.5 w-full">
              {contactLinks.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  target={item.external ? '_blank' : undefined}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  onClick={() => {
                    if (
                      item.key === 'whatsapp' ||
                      item.key === 'viber' ||
                      item.key === 'telegram'
                    ) {
                      trackMessengerClick(item.key, 'contact_page_links');
                    }
                  }}
                  className="group inline-flex items-center gap-2.5 text-[14px] text-neutral-200 hover:text-[color:var(--vd-b6ff00)] transition-colors w-fit"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {/* Social Icons Row (Instagram, TikTok, LinkedIn, Telegram) */}
            <div className="mt-9 pt-6 border-t border-white/[0.06] w-full max-w-[420px]">
              <div className="text-[11px] uppercase tracking-[0.15em] text-neutral-400 font-medium mb-3">
                {t.contactPage.socialsLabel}
              </div>
              <div className="flex items-center gap-3">
                {/* Instagram */}
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="VDigital on Instagram"
                  title="VDigital on Instagram"
                  className="group w-10 h-10 rounded-[10px] bg-[color:var(--vd-141416)] hover:bg-[color:var(--vd-1c1d21)] border border-white/[0.06] hover:border-[color:var(--vd-b6ff00)]/50 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="w-4 h-4 text-neutral-300 group-hover:text-[color:var(--vd-b6ff00)] transition-colors"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </a>

                {/* TikTok */}
                <a
                  href={TIKTOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="VDigital on TikTok"
                  title="VDigital on TikTok"
                  className="group w-10 h-10 rounded-[10px] bg-[color:var(--vd-141416)] hover:bg-[color:var(--vd-1c1d21)] border border-white/[0.06] hover:border-[color:var(--vd-b6ff00)]/50 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 text-neutral-300 group-hover:text-[color:var(--vd-b6ff00)] transition-colors"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="VDigital on LinkedIn"
                  title="VDigital on LinkedIn"
                  className="group w-10 h-10 rounded-[10px] bg-[color:var(--vd-141416)] hover:bg-[color:var(--vd-1c1d21)] border border-white/[0.06] hover:border-[color:var(--vd-b6ff00)]/50 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 text-neutral-300 group-hover:text-[color:var(--vd-b6ff00)] transition-colors"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href={telegramDirectHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="VDigital on Telegram"
                  title="VDigital on Telegram"
                  onClick={() => trackMessengerClick('telegram', 'contact_page_socials')}
                  className="group w-10 h-10 rounded-[10px] bg-[color:var(--vd-141416)] hover:bg-[color:var(--vd-1c1d21)] border border-white/[0.06] hover:border-[color:var(--vd-b6ff00)]/50 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 text-neutral-300 group-hover:text-[color:var(--vd-b6ff00)] transition-colors"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* RIGHT COLUMN (~60%): CONTACT FORM & DIRECT CHANNELS CARD        */}
          {/* =============================================================== */}
          <div
            id="contact-page-form"
            className="w-full rounded-[14px] bg-[color:var(--vd-141416)] border border-white/[0.06] p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Card Header */}
            <div className="border-b border-white/[0.06] pb-5 mb-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[color:var(--vd-0a0a0a)] border border-[color:var(--vd-b6ff00)]/60 flex items-center justify-center text-[11px] font-bold text-[color:var(--vd-b6ff00)]">
                    V
                  </div>
                  <span className="text-[13px] text-neutral-400 font-medium">
                    VDigital
                  </span>
                </div>
                <h2 className="text-[20px] sm:text-[22px] font-semibold text-white tracking-tight">
                  {t.contact.heading}
                </h2>
              </div>

              {hasBookingUrl && (
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener"
                  onClick={() => trackBookCallClick('contact_page_header')}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-[color:var(--vd-b6ff00)] hover:bg-[color:var(--vd-c6ff26)] text-[color:var(--vd-0a0a0a)] font-semibold text-[13px] transition-colors"
                >
                  <span>{t.contactPage.step1Booking}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>

            {/* Cal inline embed code begins (gated behind consent / click-to-load) */}
            {calAllowed ? (
              <div
                id="my-cal-inline-30min"
                style={{ width: '100%', height: '100%', overflow: 'scroll' }}
                className="w-full min-h-[580px]"
              />
            ) : (
              <div className="w-full min-h-[420px] rounded-[12px] bg-[color:var(--vd-0e1012)] border border-white/[0.08] p-6 sm:p-10 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[color:var(--vd-b6ff00)]/15 border border-[color:var(--vd-b6ff00)]/40 flex items-center justify-center text-[color:var(--vd-b6ff00)]">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="max-w-md space-y-2">
                  <h3 className="text-[17px] sm:text-[19px] font-semibold text-white">
                    {locale === 'sr'
                      ? 'Interaktivni kalendar (Cal.com)'
                      : locale === 'ru'
                        ? 'Интерактивный календарь (Cal.com)'
                        : 'Interactive Booking Calendar (Cal.com)'}
                  </h3>
                  <p className="text-[13.5px] leading-relaxed text-neutral-300">
                    {locale === 'sr'
                      ? 'Kalendar za zakazivanje poziva koristi eksterni servis Cal.com. Kliknite ispod da učitate kalendar ili nam pišite direktno putem kanala ispod.'
                      : locale === 'ru'
                        ? 'Календарь записи использует внешний сервис Cal.com. Нажмите кнопку ниже, чтобы загрузить календарь, или напишите нам напрямую.'
                        : 'Our scheduling calendar is powered by Cal.com. Click below to load the interactive calendar, or reach us directly via the channels below.'}
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
                  <button
                    type="button"
                    onClick={() => {
                      acceptCategoryConsent('marketing');
                      setCalAllowed(true);
                    }}
                    className="px-5 py-2.5 rounded-[8px] bg-[color:var(--vd-b6ff00)] hover:bg-[color:var(--vd-c6ff26)] text-[color:var(--vd-0a0a0a)] font-semibold text-[13.5px] transition-colors cursor-pointer"
                  >
                    {locale === 'sr'
                      ? 'Učitaj kalendar'
                      : locale === 'ru'
                        ? 'Загрузить календарь'
                        : 'Load calendar'}
                  </button>
                  <button
                    type="button"
                    onClick={openCookieSettings}
                    className="px-4 py-2.5 rounded-[8px] bg-[color:var(--vd-1d1e22)] hover:bg-[color:var(--vd-25272c)] border border-white/[0.1] text-neutral-200 font-medium text-[13px] transition-colors cursor-pointer"
                  >
                    {t.footer.cookieSettings}
                  </button>
                </div>
              </div>
            )}
            {/* Cal inline embed code ends */}

            {/* Quick Direct Action Buttons Footer inside Card */}
            <div className="mt-7 pt-6 border-t border-white/[0.06]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* WhatsApp Button */}
                <a
                  href={whatsappPrefilledHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackMessengerClick('whatsapp', 'contact_page_card')}
                  className="h-10 px-4 rounded-[8px] bg-[color:var(--vd-1d1e22)] hover:bg-[color:var(--vd-25272c)] border border-white/[0.08] hover:border-[color:var(--vd-b6ff00)]/50 text-white font-medium text-[13px] flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[color:var(--vd-b6ff00)] shrink-0" />
                  <span>WhatsApp</span>
                </a>

                {/* Viber Button */}
                <a
                  href={VIBER_URL}
                  onClick={() => trackMessengerClick('viber', 'contact_page_card')}
                  className="h-10 px-4 rounded-[8px] bg-[color:var(--vd-1d1e22)] hover:bg-[color:var(--vd-25272c)] border border-white/[0.08] hover:border-[color:var(--vd-b6ff00)]/50 text-white font-medium text-[13px] flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <ViberIcon className="w-4 h-4 text-[color:var(--vd-b6ff00)] shrink-0" />
                  <span>Viber</span>
                </a>

                {/* Email Button */}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="h-10 px-4 rounded-[8px] bg-[color:var(--vd-1d1e22)] hover:bg-[color:var(--vd-25272c)] border border-white/[0.08] hover:border-[color:var(--vd-b6ff00)]/50 text-white font-medium text-[13px] flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <Mail className="w-4 h-4 text-[color:var(--vd-b6ff00)] shrink-0" />
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Existing Site Footer */}
      <Footer />

      {/* Floating Chat Button */}
      <FloatingChatButton />
    </div>
  );
};
