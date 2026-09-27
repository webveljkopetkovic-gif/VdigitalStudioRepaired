import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PHONE_DISPLAY,
  TELEGRAM_URL,
  TELEGRAM_USERNAME,
  TIKTOK_URL,
  VIBER_URL,
  WEB3FORMS_ACCESS_KEY,
  WHATSAPP_URL,
} from '../config';
import { useI18n } from '../i18n';
import { HeaderLogo } from './HeaderLogo';
import { Footer } from './Footer';
import { FloatingChatButton } from './FloatingChatButton';
import { ViberIcon, WhatsAppIcon } from './BrandIcons';
import type { CalEmbedProps } from './CalEmbed';

export const ContactPage: React.FC = () => {
  const { locale, t } = useI18n();

  // Callback form state (shown when WEB3FORMS_ACCESS_KEY is non-empty)
  const [cbName, setCbName] = useState('');
  const [cbPhone, setCbPhone] = useState('');
  const [botcheck, setBotcheck] = useState(false);
  const [cbStatus, setCbStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [cbErrorMsg, setCbErrorMsg] = useState('');

  // Cal.com client-only embed & 8s fallback state
  // Initial state is always 'loading' so static prerender outputs the calendar skeleton
  const [calState, setCalState] = useState<'loading' | 'ready' | 'fallback'>('loading');
  const [ClientCalEmbed, setClientCalEmbed] = useState<React.ComponentType<CalEmbedProps> | null>(
    null
  );
  const settledRef = useRef(false);
  const timerRef = useRef<number | null>(null);

  const handleCalLoaded = useCallback(() => {
    if (!settledRef.current) {
      settledRef.current = true;
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setCalState('ready');
    }
  }, []);

  const handleCalError = useCallback(() => {
    if (!settledRef.current) {
      settledRef.current = true;
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      setCalState('fallback');
    }
  }, []);

  // Scroll to top when arriving on Contact page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [locale]);

  // Lazy-import CalEmbed ONLY in the browser after mount and enforce 8-second fallback timer
  useEffect(() => {
    if (typeof window === 'undefined') return;

    settledRef.current = false;
    setCalState('loading');

    timerRef.current = window.setTimeout(() => {
      if (!settledRef.current) {
        settledRef.current = true;
        setCalState('fallback');
      }
    }, 8000);

    let active = true;
    import('./CalEmbed')
      .then((mod) => {
        if (active) {
          setClientCalEmbed(() => mod.CalEmbed || mod.default);
        }
      })
      .catch(() => {
        if (active && !settledRef.current) {
          settledRef.current = true;
          if (timerRef.current !== null) {
            window.clearTimeout(timerRef.current);
            timerRef.current = null;
          }
          setCalState('fallback');
        }
      });

    return () => {
      active = false;
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const handleCallbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const accessKey = WEB3FORMS_ACCESS_KEY.trim();
    if (!accessKey) return;
    if (botcheck) return;
    if (!cbName.trim() || !cbPhone.trim()) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append('access_key', accessKey);

    setCbStatus('loading');
    setCbErrorMsg('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setCbStatus('success');
        setCbName('');
        setCbPhone('');
        form.reset();
      } else {
        setCbErrorMsg(data.message || t.contactPage.callbackError);
        setCbStatus('error');
      }
    } catch {
      setCbErrorMsg(t.contactPage.callbackError);
      setCbStatus('error');
    }
  };

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
    icon: <Mail className="w-3.5 h-3.5 text-[#b6ff00] shrink-0" />,
  };

  const whatsappItem = {
    key: 'whatsapp',
    href: whatsappPrefilledHref,
    label: `WhatsApp: ${PHONE_DISPLAY}`,
    external: true,
    icon: <WhatsAppIcon className="w-3.5 h-3.5 text-[#b6ff00] shrink-0" />,
  };

  const viberItem = {
    key: 'viber',
    href: VIBER_URL,
    label: `Viber: ${PHONE_DISPLAY}`,
    external: false,
    icon: <ViberIcon className="w-3.5 h-3.5 text-[#b6ff00] shrink-0" />,
  };

  const telegramItem = hasTelegramUsername
    ? {
        key: 'telegram',
        href: `https://t.me/${TELEGRAM_USERNAME.trim()}`,
        label: `Telegram: @${TELEGRAM_USERNAME.trim()}`,
        external: true,
        icon: <Send className="w-3.5 h-3.5 text-[#b6ff00] shrink-0" />,
      }
    : null;

  // On /ru/ show Telegram first (if configured); on / and /sr/ show Email first
  const contactLinks =
    locale === 'ru'
      ? [
          ...(telegramItem ? [telegramItem] : []),
          emailItem,
          whatsappItem,
          viberItem,
        ]
      : [
          emailItem,
          whatsappItem,
          viberItem,
          ...(telegramItem ? [telegramItem] : []),
        ];

  const hasWeb3FormsKey = Boolean(WEB3FORMS_ACCESS_KEY.trim());

  const steps = [
    t.contactPage.step1,
    t.contactPage.step2,
    t.contactPage.step3,
  ];

  return (
    <div className="min-h-screen w-full bg-[#060709] text-white selection:bg-[#b6ff00] selection:text-black relative flex flex-col overflow-x-clip font-geist">
      {/* Subtle architectural dark grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Subtle ambient radial glow at top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[420px] opacity-20 z-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(182, 255, 0, 0.16) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Existing Site Navbar */}
      <HeaderLogo />

      {/* Main Content Container: max-width ~1100px, generous top padding below navbar */}
      <main className="relative z-10 flex-1 w-full max-w-[1100px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 lg:pt-20 pb-20 sm:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,4fr)_minmax(0,6fr)] gap-12 lg:gap-[64px] items-start">
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
              <span className="font-editorial italic font-normal text-[#b6ff00]">
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
              {steps.map((stepText, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="w-[18px] h-[18px] rounded-full border border-[#b6ff00] text-[#b6ff00] text-[10.5px] font-mono tabular-nums flex items-center justify-center shrink-0 mt-[2px]">
                    {idx + 1}
                  </span>
                  <span className="text-[14px] leading-[1.5] text-neutral-200">
                    {stepText}
                  </span>
                </li>
              ))}
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
                  className="group inline-flex items-center gap-2.5 text-[14px] text-neutral-200 hover:text-[#b6ff00] transition-colors w-fit"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {/* 8. Callback Form ("Or we call you") — hidden if WEB3FORMS_ACCESS_KEY is empty */}
            {hasWeb3FormsKey && (
              <div className="mt-9 w-full max-w-[420px]">
                <div className="text-[11px] uppercase tracking-[0.15em] text-neutral-400 font-medium mb-3">
                  {t.contactPage.callbackLabel}
                </div>

                <form
                  id="form"
                  onSubmit={handleCallbackSubmit}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                >
                  {/* Honeypot hidden checkbox named "botcheck" */}
                  <input
                    type="checkbox"
                    name="botcheck"
                    checked={botcheck}
                    onChange={(e) => setBotcheck(e.target.checked)}
                    className="hidden"
                    style={{ display: 'none' }}
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <input
                    type="text"
                    name="name"
                    required
                    value={cbName}
                    onChange={(e) => setCbName(e.target.value)}
                    placeholder={t.contactPage.callbackNamePlaceholder}
                    className="flex-1 min-w-0 h-9 px-3 rounded-[8px] bg-[#141416] border border-white/[0.08] focus:border-[#b6ff00] text-[13px] text-white placeholder:text-neutral-500 focus:outline-none transition-colors"
                  />

                  <input
                    type="tel"
                    name="phone"
                    required
                    value={cbPhone}
                    onChange={(e) => setCbPhone(e.target.value)}
                    placeholder={t.contactPage.callbackPhonePlaceholder}
                    className="flex-1 min-w-0 h-9 px-3 rounded-[8px] bg-[#141416] border border-white/[0.08] focus:border-[#b6ff00] text-[13px] text-white placeholder:text-neutral-500 focus:outline-none transition-colors"
                  />

                  <button
                    type="submit"
                    disabled={cbStatus === 'loading'}
                    className="h-9 px-4 rounded-[8px] bg-[#b6ff00] hover:bg-[#c6ff26] text-[#0a0a0a] font-semibold text-[13px] whitespace-nowrap shrink-0 transition-colors cursor-pointer disabled:opacity-60 inline-flex items-center justify-center gap-1.5"
                  >
                    {cbStatus === 'loading' && (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    )}
                    <span>
                      {cbStatus === 'loading'
                        ? t.contact.form.submitting
                        : t.contactPage.callbackButton}
                    </span>
                  </button>
                </form>

                {cbStatus === 'success' && (
                  <p className="mt-2.5 text-[12.5px] text-[#b6ff00] flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{t.contactPage.callbackSuccess}</span>
                  </p>
                )}

                {cbStatus === 'error' && (
                  <p className="mt-2.5 text-[12.5px] text-[#ff6b6b] flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{cbErrorMsg || t.contactPage.callbackError}</span>
                  </p>
                )}
              </div>
            )}

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
                  aria-label="Follow VDigital on Instagram"
                  title="Follow VDigital on Instagram"
                  className="group w-10 h-10 rounded-[10px] bg-[#141416] hover:bg-[#1c1d21] border border-white/[0.06] hover:border-[#b6ff00]/50 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="w-4 h-4 text-neutral-300 group-hover:text-[#b6ff00] transition-colors"
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
                  aria-label="Follow VDigital on TikTok"
                  title="Follow VDigital on TikTok"
                  className="group w-10 h-10 rounded-[10px] bg-[#141416] hover:bg-[#1c1d21] border border-white/[0.06] hover:border-[#b6ff00]/50 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 text-neutral-300 group-hover:text-[#b6ff00] transition-colors"
                  >
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>

                {/* LinkedIn */}
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow VDigital on LinkedIn"
                  title="Follow VDigital on LinkedIn"
                  className="group w-10 h-10 rounded-[10px] bg-[#141416] hover:bg-[#1c1d21] border border-white/[0.06] hover:border-[#b6ff00]/50 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 text-neutral-300 group-hover:text-[#b6ff00] transition-colors"
                  >
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </a>

                {/* Telegram */}
                <a
                  href={telegramDirectHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Contact VDigital on Telegram"
                  title="Contact VDigital on Telegram"
                  className="group w-10 h-10 rounded-[10px] bg-[#141416] hover:bg-[#1c1d21] border border-white/[0.06] hover:border-[#b6ff00]/50 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                    className="w-4 h-4 text-neutral-300 group-hover:text-[#b6ff00] transition-colors"
                  >
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* =============================================================== */}
          {/* RIGHT COLUMN (~60%): CALENDAR CARD                              */}
          {/* =============================================================== */}
          <div className="w-full rounded-[14px] bg-[#141416] border border-white/[0.06] p-5 sm:p-7 min-h-[700px] lg:min-h-[620px] flex flex-col justify-between relative overflow-hidden">
            {/* Client-Only Cal.com Inline Embed (mounted only in browser after useEffect) */}
            {ClientCalEmbed && calState !== 'fallback' && (
              <div
                className={`w-full flex-1 min-h-[640px] lg:min-h-[564px] transition-opacity duration-200 ${
                  calState === 'ready'
                    ? 'opacity-100 relative z-10'
                    : 'opacity-0 pointer-events-none absolute inset-5 sm:inset-7'
                }`}
              >
                <ClientCalEmbed onLoaded={handleCalLoaded} onError={handleCalError} />
              </div>
            )}

            {/* Month-Calendar Skeleton while loading (also rendered in static prerender HTML) */}
            {calState === 'loading' && (
              <div
                aria-busy="true"
                aria-label="Loading calendar"
                className="w-full flex-1 flex flex-col justify-between space-y-6 animate-pulse relative z-20"
              >
                {/* Top Event Header Skeleton */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-white/[0.08]" />
                    <div className="h-3.5 w-28 rounded bg-white/[0.08]" />
                  </div>
                  <div className="h-6 w-56 rounded bg-white/[0.12]" />
                  <div className="space-y-2 pt-1">
                    <div className="h-3 w-full max-w-md rounded bg-white/[0.06]" />
                    <div className="h-3 w-4/5 max-w-sm rounded bg-white/[0.06]" />
                  </div>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <div className="h-3.5 w-14 rounded bg-white/[0.07]" />
                    <div className="h-3.5 w-24 rounded bg-white/[0.07]" />
                    <div className="h-3.5 w-32 rounded bg-white/[0.07]" />
                  </div>
                </div>

                {/* Month Header & Weekday Row */}
                <div className="space-y-4 pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-32 rounded bg-white/[0.1]" />
                    <div className="flex gap-2">
                      <div className="w-6 h-6 rounded bg-white/[0.06]" />
                      <div className="w-6 h-6 rounded bg-white/[0.06]" />
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div
                        key={`wd-${i}`}
                        className="h-3 rounded bg-white/[0.05] mx-auto w-8"
                      />
                    ))}
                  </div>
                  {/* 5 Weeks x 7 Days Grid */}
                  <div className="grid grid-cols-7 gap-2 pt-1">
                    {Array.from({ length: 35 }).map((_, i) => (
                      <div
                        key={`day-${i}`}
                        className={`h-12 sm:h-14 rounded-[8px] ${
                          i % 3 === 0 || i % 5 === 0
                            ? 'bg-white/[0.08]'
                            : 'bg-white/[0.03]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Calendar Fallback (when CAL_LINK is empty OR embed hasn't loaded after 8s) */}
            {calState === 'fallback' && (
              <div className="w-full flex-1 flex flex-col justify-between">
                {/* Visual Calendar Header Preview matching screenshot feel */}
                <div className="border-b border-white/[0.06] pb-6">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-6 h-6 rounded-full bg-[#0a0a0a] border border-[#b6ff00]/60 flex items-center justify-center text-[11px] font-bold text-[#b6ff00]">
                      V
                    </div>
                    <span className="text-[13px] text-neutral-400 font-medium">
                      VDigital
                    </span>
                  </div>

                  <h2 className="text-[20px] sm:text-[22px] font-semibold text-white tracking-tight">
                    Free strategy call · 30 min
                  </h2>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mt-4 text-[13px] text-neutral-400">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#b6ff00]" />
                      30m
                    </span>
                    <span>Google Meet</span>
                    <span>Europe/Belgrade</span>
                  </div>
                </div>

                {/* Fallback Message + Large Direct Action Buttons */}
                <div className="my-auto py-10 flex flex-col items-center text-center max-w-md mx-auto">
                  <p className="text-[15px] sm:text-[16px] leading-[1.6] text-neutral-200 mb-7">
                    {t.contactPage.calendarFallback}
                  </p>

                  <div className="w-full flex flex-col gap-3">
                    {/* Large WhatsApp Button */}
                    <a
                      href={whatsappPrefilledHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full h-12 px-6 rounded-[10px] bg-[#b6ff00] hover:bg-[#c6ff26] text-[#0a0a0a] font-semibold text-[14.5px] flex items-center justify-center gap-2.5 transition-all duration-200 shadow-[0_6px_24px_rgba(182,255,0,0.22)] hover:scale-[1.01]"
                    >
                      <WhatsAppIcon className="w-4 h-4 shrink-0" />
                      <span>WhatsApp · {PHONE_DISPLAY}</span>
                    </a>

                    {/* Large Viber Button */}
                    <a
                      href={VIBER_URL}
                      className="w-full h-12 px-6 rounded-[10px] bg-[#1d1e22] hover:bg-[#25272c] border border-white/[0.08] hover:border-[#b6ff00]/50 text-white font-medium text-[14.5px] flex items-center justify-center gap-2.5 transition-all duration-200"
                    >
                      <ViberIcon className="w-4 h-4 text-[#b6ff00] shrink-0" />
                      <span>Viber · {PHONE_DISPLAY}</span>
                    </a>

                    {/* Large Email Button */}
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="w-full h-12 px-6 rounded-[10px] bg-[#1d1e22] hover:bg-[#25272c] border border-white/[0.08] hover:border-[#b6ff00]/50 text-white font-medium text-[14.5px] flex items-center justify-center gap-2.5 transition-all duration-200"
                    >
                      <Mail className="w-4 h-4 text-[#b6ff00]" />
                      <span>{CONTACT_EMAIL}</span>
                    </a>
                  </div>
                </div>

                {/* Subtle decorative month grid footer inside fallback card */}
                <div
                  aria-hidden="true"
                  className="grid grid-cols-7 gap-2 pt-4 border-t border-white/[0.05] opacity-35"
                >
                  {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(
                    (day) => (
                      <div
                        key={day}
                        className="text-center text-[10px] font-mono text-neutral-500 tracking-wider"
                      >
                        {day}
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
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
