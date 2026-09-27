import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowUpRight,
} from 'lucide-react';
import {
  BOOKING_URL,
  CONTACT_EMAIL,
  FORM_ENDPOINT,
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

export const ContactPage: React.FC = () => {
  const { locale, t, privacyPath } = useI18n();
  const navigate = useNavigate();

  // Callback form state ("Or we call you" in left column)
  const [cbName, setCbName] = useState('');
  const [cbPhone, setCbPhone] = useState('');
  const [cbBotcheck, setCbBotcheck] = useState('');
  const [cbStatus, setCbStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [cbErrorMsg, setCbErrorMsg] = useState('');

  // Main contact form state (Right column card)
  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [professionIndex, setProfessionIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [botcheck, setBotcheck] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formErrorMsg, setFormErrorMsg] = useState('');

  const profession =
    t.contact.form.professionOptions[professionIndex] ||
    t.contact.form.professionOptions[0] ||
    'Doctor';

  // Scroll to top when arriving on Contact page
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [locale]);

  const handleCallbackSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (cbBotcheck.trim().length > 0) {
      setCbStatus('success');
      return;
    }
    if (!cbName.trim() || !cbPhone.trim()) return;

    const form = e.currentTarget;
    setCbStatus('loading');
    setCbErrorMsg('');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: cbName.trim(),
          contact: cbPhone.trim(),
          profession: 'Callback request',
          botcheck: cbBotcheck,
          locale,
          formType: 'callback',
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok && data.ok !== false) {
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

  const handleMainFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormErrorMsg('');

    if (botcheck.trim().length > 0) {
      setFormStatus('success');
      return;
    }

    const trimmedName = fullName.trim();
    const trimmedContact = contactInfo.trim();

    if (!trimmedName || !trimmedContact || !profession) {
      setFormErrorMsg(t.contact.form.errorRequired);
      setFormStatus('error');
      return;
    }

    const form = e.currentTarget;
    setFormStatus('loading');

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: trimmedName,
          contact: trimmedContact,
          profession,
          message: message.trim(),
          botcheck,
          locale,
          formType: 'inquiry',
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok !== false) {
        setFormStatus('success');
        setFullName('');
        setContactInfo('');
        setProfessionIndex(0);
        setMessage('');
        form.reset();
      } else {
        setFormErrorMsg(data.message || t.contact.form.errorGeneric);
        setFormStatus('error');
      }
    } catch {
      setFormErrorMsg(t.contact.form.errorGeneric);
      setFormStatus('error');
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

  const telegramItem = {
    key: 'telegram',
    href: telegramDirectHref,
    label: hasTelegramUsername
      ? `Telegram: @${TELEGRAM_USERNAME.trim()}`
      : 'Telegram: @veljkopetkovic',
    external: true,
    icon: <Send className="w-3.5 h-3.5 text-[#b6ff00] shrink-0" />,
  };

  // On /ru show Telegram first; on / and /sr show Email first
  const contactLinks =
    locale === 'ru'
      ? [telegramItem, emailItem, whatsappItem, viberItem]
      : [emailItem, whatsappItem, viberItem, telegramItem];

  const hasBookingUrl = Boolean(BOOKING_URL.trim());

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
              {/* Step 1: depends on BOOKING_URL */}
              <li className="flex items-start gap-3">
                <span className="w-[18px] h-[18px] rounded-full border border-[#b6ff00] text-[#b6ff00] text-[10.5px] font-mono tabular-nums flex items-center justify-center shrink-0 mt-[2px]">
                  1
                </span>
                <span className="text-[14px] leading-[1.5] text-neutral-200">
                  {hasBookingUrl ? (
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener"
                      className="text-[#b6ff00] hover:underline inline-flex items-center gap-1"
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
                <span className="w-[18px] h-[18px] rounded-full border border-[#b6ff00] text-[#b6ff00] text-[10.5px] font-mono tabular-nums flex items-center justify-center shrink-0 mt-[2px]">
                  2
                </span>
                <span className="text-[14px] leading-[1.5] text-neutral-200">
                  {t.contactPage.step2}
                </span>
              </li>

              {/* Step 3 */}
              <li className="flex items-start gap-3">
                <span className="w-[18px] h-[18px] rounded-full border border-[#b6ff00] text-[#b6ff00] text-[10.5px] font-mono tabular-nums flex items-center justify-center shrink-0 mt-[2px]">
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
                  className="group inline-flex items-center gap-2.5 text-[14px] text-neutral-200 hover:text-[#b6ff00] transition-colors w-fit"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </a>
              ))}
            </div>

            {/* 8. Callback Form ("Or we call you") */}
            <div className="mt-9 w-full max-w-[420px]">
              <div className="text-[11px] uppercase tracking-[0.15em] text-neutral-400 font-medium mb-3">
                {t.contactPage.callbackLabel}
              </div>

              <form
                onSubmit={handleCallbackSubmit}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
              >
                {/* Honeypot hidden field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="cb-botcheck">Do not fill this field</label>
                  <input
                    id="cb-botcheck"
                    type="text"
                    name="botcheck"
                    value={cbBotcheck}
                    onChange={(e) => setCbBotcheck(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <input
                  type="text"
                  name="name"
                  required
                  maxLength={120}
                  value={cbName}
                  onChange={(e) => setCbName(e.target.value)}
                  placeholder={t.contactPage.callbackNamePlaceholder}
                  aria-label={t.contactPage.callbackNamePlaceholder}
                  className="flex-1 min-w-0 h-9 px-3 rounded-[8px] bg-[#141416] border border-white/[0.08] focus:border-[#b6ff00] text-[13px] text-white placeholder:text-neutral-500 focus:outline-none transition-colors"
                />

                <input
                  type="tel"
                  name="phone"
                  required
                  maxLength={60}
                  value={cbPhone}
                  onChange={(e) => setCbPhone(e.target.value)}
                  placeholder={t.contactPage.callbackPhonePlaceholder}
                  aria-label={t.contactPage.callbackPhonePlaceholder}
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

              <p className="mt-2 text-[11.5px] text-neutral-500 leading-relaxed">
                {t.contact.form.privacyAgreementPrefix}
                <a
                  href={privacyPath}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(privacyPath);
                  }}
                  className="text-neutral-400 hover:text-[#b6ff00] underline underline-offset-2 transition-colors"
                >
                  {t.contact.form.privacyAgreementLink}
                </a>
                {t.contact.form.privacyAgreementSuffix}
              </p>

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
          {/* RIGHT COLUMN (~60%): CONTACT FORM & DIRECT CHANNELS CARD        */}
          {/* =============================================================== */}
          <div
            id="contact-page-form"
            className="w-full rounded-[14px] bg-[#141416] border border-white/[0.06] p-5 sm:p-8 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Card Header */}
            <div className="border-b border-white/[0.06] pb-5 mb-6 flex items-center justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-6 h-6 rounded-full bg-[#0a0a0a] border border-[#b6ff00]/60 flex items-center justify-center text-[11px] font-bold text-[#b6ff00]">
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
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[8px] bg-[#b6ff00] hover:bg-[#c6ff26] text-[#0a0a0a] font-semibold text-[13px] transition-colors"
                >
                  <span>{t.contactPage.step1Booking}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}
            </div>

            {formStatus === 'success' ? (
              <div className="py-12 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#b6ff00] text-[#0a0c09] flex items-center justify-center shadow-[0_0_28px_rgba(182,255,0,0.35)]">
                  <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
                </div>
                <p className="font-geist font-medium text-[18px] sm:text-[20px] text-white max-w-md">
                  {t.contact.form.success}
                </p>
              </div>
            ) : (
              <form
                id="form"
                onSubmit={handleMainFormSubmit}
                noValidate
                className="space-y-4"
              >
                {/* Hidden Honeypot Field */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="page-botcheck">Do not fill this field</label>
                  <input
                    id="page-botcheck"
                    type="text"
                    name="botcheck"
                    value={botcheck}
                    onChange={(e) => setBotcheck(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* 1. Full Name */}
                <div>
                  <label
                    htmlFor="page-full-name"
                    className="block font-geist text-[13px] text-neutral-300 mb-1.5"
                  >
                    {t.contact.form.name} *
                  </label>
                  <input
                    id="page-full-name"
                    name="name"
                    type="text"
                    required
                    maxLength={120}
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t.contact.form.name}
                    className="w-full h-11 px-4 rounded-[10px] bg-[#0c0d10] border border-white/[0.1] focus:border-[#b6ff00] text-[14px] font-geist text-white placeholder:text-neutral-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* 2. Email or Phone */}
                <div>
                  <label
                    htmlFor="page-email-phone"
                    className="block font-geist text-[13px] text-neutral-300 mb-1.5"
                  >
                    {t.contact.form.contact} *
                  </label>
                  <input
                    id="page-email-phone"
                    name="contact"
                    type="text"
                    required
                    maxLength={160}
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder={t.contact.form.contact}
                    className="w-full h-11 px-4 rounded-[10px] bg-[#0c0d10] border border-white/[0.1] focus:border-[#b6ff00] text-[14px] font-geist text-white placeholder:text-neutral-500 focus:outline-none transition-colors"
                  />
                </div>

                {/* 3. What do you do? */}
                <div>
                  <label
                    htmlFor="page-profession"
                    className="block font-geist text-[13px] text-neutral-300 mb-1.5"
                  >
                    {t.contact.form.profession} *
                  </label>
                  <select
                    id="page-profession"
                    name="profession"
                    required
                    value={professionIndex}
                    onChange={(e) => setProfessionIndex(Number(e.target.value))}
                    className="w-full h-11 px-4 rounded-[10px] bg-[#0c0d10] border border-white/[0.1] focus:border-[#b6ff00] text-[14px] font-geist text-white focus:outline-none transition-colors"
                  >
                    {t.contact.form.professionOptions.map((option, idx) => (
                      <option
                        key={option}
                        value={idx}
                        className="bg-[#0c0d10] text-white"
                      >
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 4. Message (optional) */}
                <div>
                  <label
                    htmlFor="page-message"
                    className="block font-geist text-[13px] text-neutral-300 mb-1.5"
                  >
                    {t.contact.form.message}
                  </label>
                  <textarea
                    id="page-message"
                    name="message"
                    rows={4}
                    maxLength={2000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t.contact.form.message}
                    className="w-full p-4 rounded-[10px] bg-[#0c0d10] border border-white/[0.1] focus:border-[#b6ff00] text-[14px] font-geist text-white placeholder:text-neutral-500 focus:outline-none transition-colors resize-y"
                  />
                </div>

                {formStatus === 'error' && formErrorMsg && (
                  <p
                    role="alert"
                    className="text-[13px] font-geist text-[#ff6b6b] flex items-center gap-1.5"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formErrorMsg}</span>
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full h-12 px-6 rounded-[10px] bg-[#b6ff00] hover:bg-[#c6ff26] text-[#0a0a0a] font-semibold text-[14.5px] flex items-center justify-center gap-2 transition-all duration-200 shadow-[0_6px_24px_rgba(182,255,0,0.22)] cursor-pointer disabled:opacity-60"
                >
                  {formStatus === 'loading' && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}
                  <span>
                    {formStatus === 'loading'
                      ? t.contact.form.submitting
                      : t.contact.form.submit}
                  </span>
                  <span aria-hidden="true">→</span>
                </button>

                <p className="text-[12px] font-geist text-neutral-400 text-center pt-1 leading-relaxed">
                  {t.contact.form.privacy}{' '}
                  {t.contact.form.privacyAgreementPrefix}
                  <a
                    href={privacyPath}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(privacyPath);
                    }}
                    className="text-neutral-300 hover:text-[#b6ff00] underline underline-offset-2 transition-colors"
                  >
                    {t.contact.form.privacyAgreementLink}
                  </a>
                  {t.contact.form.privacyAgreementSuffix}
                </p>
              </form>
            )}

            {/* Quick Direct Action Buttons Footer inside Card */}
            <div className="mt-7 pt-6 border-t border-white/[0.06]">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {/* WhatsApp Button */}
                <a
                  href={whatsappPrefilledHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 px-4 rounded-[8px] bg-[#1d1e22] hover:bg-[#25272c] border border-white/[0.08] hover:border-[#b6ff00]/50 text-white font-medium text-[13px] flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#b6ff00] shrink-0" />
                  <span>WhatsApp</span>
                </a>

                {/* Viber Button */}
                <a
                  href={VIBER_URL}
                  className="h-10 px-4 rounded-[8px] bg-[#1d1e22] hover:bg-[#25272c] border border-white/[0.08] hover:border-[#b6ff00]/50 text-white font-medium text-[13px] flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <ViberIcon className="w-4 h-4 text-[#b6ff00] shrink-0" />
                  <span>Viber</span>
                </a>

                {/* Email Button */}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="h-10 px-4 rounded-[8px] bg-[#1d1e22] hover:bg-[#25272c] border border-white/[0.08] hover:border-[#b6ff00]/50 text-white font-medium text-[13px] flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <Mail className="w-4 h-4 text-[#b6ff00] shrink-0" />
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
