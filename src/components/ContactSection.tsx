import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  CheckCircle2,
  ArrowUpRight,
  Send,
  Mail,
  Phone,
} from 'lucide-react';
import {
  CONTACT_EMAIL,
  FORM_ENDPOINT,
  PHONE_DISPLAY,
  PHONE_URL,
  TELEGRAM_URL,
  TURNSTILE_SITE_KEY,
  VIBER_URL,
  WHATSAPP_URL,
} from '../config';
import { useI18n } from '../i18n';
import { ViberIcon, WhatsAppIcon } from './BrandIcons';
import {
  trackBookCallClick,
  trackFormSubmit,
  trackMessengerClick,
} from '../utils/analytics';

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

const TURNSTILE_SCRIPT_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  return new Promise((resolve, reject) => {
    let script = document.querySelector<HTMLScriptElement>(
      `script[src="${TURNSTILE_SCRIPT_SRC}"]`
    );
    if (!script) {
      script = document.createElement('script');
      script.src = TURNSTILE_SCRIPT_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
    script.addEventListener('load', () => resolve());
    script.addEventListener('error', () => reject(new Error('Turnstile failed to load')));
  });
}

interface ContactSectionProps {
  initialMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialMessage }) => {
  const { locale, t, contactPath, privacyPath } = useI18n();
  const navigate = useNavigate();
  const isSSR = typeof window === 'undefined';

  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [professionIndex, setProfessionIndex] = useState(0);
  const [message, setMessage] = useState(initialMessage || '');
  const [botcheck, setBotcheck] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showFallbackLink, setShowFallbackLink] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const formOpenedAt = useRef(0);
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | undefined>(undefined);

  useEffect(() => {
    formOpenedAt.current = Date.now();
  }, []);

  // Cloudflare Turnstile widget (only when a site key is configured)
  useEffect(() => {
    if (!TURNSTILE_SITE_KEY || isSubmitted) return;
    let cancelled = false;
    loadTurnstileScript()
      .then(() => {
        if (cancelled || !turnstileRef.current || !window.turnstile) return;
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          theme: 'dark',
          language: locale,
          callback: (token: string) => setTurnstileToken(token),
          'expired-callback': () => setTurnstileToken(''),
          'error-callback': () => setTurnstileToken(''),
        });
      })
      .catch((err) => console.warn(err));
    return () => {
      cancelled = true;
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.remove(turnstileWidgetId.current);
        turnstileWidgetId.current = undefined;
      }
    };
  }, [locale, isSubmitted]);

  React.useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

  const profession =
    t.contact.form.professionOptions[professionIndex] ||
    t.contact.form.professionOptions[0] ||
    'Business';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');
    setShowFallbackLink(false);

    // Honeypot check on client side
    if (botcheck.trim().length > 0) {
      setIsSubmitted(true);
      return;
    }

    const trimmedName = fullName.trim();
    const trimmedContact = contactInfo.trim();

    if (!trimmedName || !trimmedContact || !profession) {
      setErrorMsg(t.contact.form.errorRequired);
      return;
    }

    if (TURNSTILE_SITE_KEY && !turnstileToken) {
      setErrorMsg(
        locale === 'sr'
          ? 'Sačekajte trenutak da se završi bezbednosna provera.'
          : locale === 'ru'
            ? 'Подождите секунду, идёт проверка безопасности.'
            : 'Please wait a moment for the security check to finish.'
      );
      return;
    }

    const form = e.currentTarget;
    setIsSubmitting(true);

    const payload = {
      name: trimmedName,
      contact: trimmedContact,
      profession,
      message: message.trim(),
      botcheck: botcheck.trim(),
      locale,
      elapsedMs: formOpenedAt.current ? Date.now() - formOpenedAt.current : 0,
      turnstileToken,
    };

    let succeeded = false;
    let customError = '';

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.ok === true) {
        succeeded = true;
      } else if (data.message) {
        customError = data.message;
      }
    } catch (err) {
      console.warn('Contact form submission failed:', err);
    }

    setIsSubmitting(false);

    if (succeeded) {
      trackFormSubmit('contact_inquiry_form');
      window.ym?.(113158297, 'reachGoal', 'quote_request');
      setIsSubmitted(true);
      setFullName('');
      setContactInfo('');
      setProfessionIndex(0);
      setMessage('');
      setShowFallbackLink(false);
      form.reset();
    } else {
      setErrorMsg(customError || t.contact.form.errorGeneric);
      setShowFallbackLink(true);
      // Turnstile tokens are single-use, so get a fresh one for the next try
      if (turnstileWidgetId.current && window.turnstile) {
        window.turnstile.reset(turnstileWidgetId.current);
        setTurnstileToken('');
      }
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[color:var(--vd-060709)] text-white py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-t border-white/[0.06] overflow-hidden select-none"
    >
      {/* Ambient Green Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[480px] pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at center, color-mix(in srgb, var(--vd-9ce607) 25%, transparent) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start">
          {/* Left Column: Heading + Book a Call Button + Direct Contact Channels */}
          <motion.div
            initial={isSSR ? false : { opacity: 0, y: 18 }}
            whileInView={isSSR ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-[color:var(--vd-9ce607)] shadow-[0_0_10px_var(--vd-9ce607)]" />
              <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-[color:var(--vd-9ce607)] font-semibold">
                {t.contact.label}
              </span>
            </div>

            <h2 className="font-geist font-semibold text-[32px] sm:text-[42px] md:text-[48px] leading-[1.1] tracking-[-0.025em] text-white">
              {t.contact.heading}
            </h2>

            <p className="font-geist text-[15px] sm:text-[16px] leading-[1.65] text-neutral-300 mt-5">
              {t.contact.text}
            </p>

            {/* Primary Button: Book a call -> links to contact page in same language */}
            <div className="mt-8">
              <a
                href={contactPath}
                onClick={(e) => {
                  e.preventDefault();
                  trackBookCallClick('contact_section');
                  navigate(contactPath);
                }}
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[color:var(--vd-9ce607)] hover:bg-[color:var(--vd-abf50a)] text-[color:var(--vd-0a0c09)] font-geist font-bold text-[15px] tracking-[-0.01em] transition-all duration-200 cursor-pointer shadow-[0_8px_28px_color-mix(in_srgb,var(--vd-9ce607)_35%,transparent),inset_0_1px_1px_color-mix(in_srgb,var(--vd-ffffff)_65%,transparent)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t.contact.primaryButton}</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Direct Contact Channels */}
            <div className="mt-10 pt-8 border-t border-white/[0.08] w-full">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-neutral-400 mb-4">
                {t.contact.orText}
              </p>

              <div className="flex flex-wrap gap-2.5">
                {/* WhatsApp */}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackMessengerClick('whatsapp', 'contact_section')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[color:var(--vd-141815)]/80 hover:bg-[color:var(--vd-1b221d)] border border-white/10 hover:border-[color:var(--vd-9ce607)]/50 text-[13px] font-geist text-white transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[color:var(--vd-9ce607)]" />
                  <span>WhatsApp</span>
                </a>

                {/* Viber */}
                <a
                  href={VIBER_URL}
                  onClick={() => trackMessengerClick('viber', 'contact_section')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[color:var(--vd-141815)]/80 hover:bg-[color:var(--vd-1b221d)] border border-white/10 hover:border-[color:var(--vd-9ce607)]/50 text-[13px] font-geist text-white transition-all"
                >
                  <ViberIcon className="w-4 h-4 text-[color:var(--vd-9ce607)]" />
                  <span>Viber</span>
                </a>

                {/* Telegram */}
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackMessengerClick('telegram', 'contact_section')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[color:var(--vd-141815)]/80 hover:bg-[color:var(--vd-1b221d)] border border-white/10 hover:border-[color:var(--vd-9ce607)]/50 text-[13px] font-geist text-white transition-all"
                >
                  <Send className="w-4 h-4 text-[color:var(--vd-9ce607)]" />
                  <span>Telegram</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[color:var(--vd-141815)]/80 hover:bg-[color:var(--vd-1b221d)] border border-white/10 hover:border-[color:var(--vd-9ce607)]/50 text-[13px] font-geist text-white transition-all"
                >
                  <Mail className="w-4 h-4 text-[color:var(--vd-9ce607)]" />
                  <span>Email</span>
                </a>

                {/* Phone */}
                <a
                  href={PHONE_URL}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[color:var(--vd-141815)]/80 hover:bg-[color:var(--vd-1b221d)] border border-white/10 hover:border-[color:var(--vd-9ce607)]/50 text-[13px] font-geist text-white transition-all tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[color:var(--vd-9ce607)]" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Frosted Glass Contact Form */}
          <motion.div
            initial={isSSR ? false : { opacity: 0, y: 18 }}
            whileInView={isSSR ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7 w-full"
          >
            <div className="rounded-[24px] bg-[color:var(--vd-111512)]/85 backdrop-blur-xl border border-white/[0.1] p-6 sm:p-8 lg:p-10 shadow-[0_24px_60px_color-mix(in_srgb,var(--vd-000000)_65%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--vd-ffffff)_10%,transparent)]">
              {isSubmitted ? (
                <div className="py-8 flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[color:var(--vd-9ce607)] text-[color:var(--vd-0a0c09)] flex items-center justify-center shadow-[0_0_28px_color-mix(in_srgb,var(--vd-9ce607)_40%,transparent)]">
                    <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <p className="font-geist font-medium text-[18px] sm:text-[20px] text-white max-w-md">
                    {t.contact.form.success}
                  </p>
                </div>
              ) : (
                <form id="form" onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Hidden Honeypot Field */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      id="contact-botcheck"
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
                      htmlFor="contact-full-name"
                      className="block font-geist text-[13px] text-neutral-300 mb-2"
                    >
                      {t.contact.form.name} *
                    </label>
                    <input
                      id="contact-full-name"
                      name="name"
                      type="text"
                      required
                      maxLength={120}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t.contact.form.name}
                      className="w-full h-12 px-4 rounded-[12px] bg-[color:var(--vd-090c0a)]/90 border border-white/[0.12] focus:border-[color:var(--vd-9ce607)] text-[14px] font-geist text-white placeholder:text-neutral-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* 2. Email or Phone */}
                  <div>
                    <label
                      htmlFor="contact-email-phone"
                      className="block font-geist text-[13px] text-neutral-300 mb-2"
                    >
                      {t.contact.form.contact} *
                    </label>
                    <input
                      id="contact-email-phone"
                      name="contact"
                      type="text"
                      required
                      maxLength={160}
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder={t.contact.form.contact}
                      className="w-full h-12 px-4 rounded-[12px] bg-[color:var(--vd-090c0a)]/90 border border-white/[0.12] focus:border-[color:var(--vd-9ce607)] text-[14px] font-geist text-white placeholder:text-neutral-500 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* 3. What do you do? */}
                  <div>
                    <label
                      htmlFor="contact-profession"
                      className="block font-geist text-[13px] text-neutral-300 mb-2"
                    >
                      {t.contact.form.profession} *
                    </label>
                    <select
                      id="contact-profession"
                      name="profession"
                      required
                      value={professionIndex}
                      onChange={(e) => setProfessionIndex(Number(e.target.value))}
                      className="w-full h-12 px-4 rounded-[12px] bg-[color:var(--vd-090c0a)]/90 border border-white/[0.12] focus:border-[color:var(--vd-9ce607)] text-[14px] font-geist text-white focus:outline-none transition-colors"
                    >
                      {t.contact.form.professionOptions.map((option, idx) => (
                        <option
                          key={option}
                          value={idx}
                          className="bg-[color:var(--vd-0a0c09)] text-white"
                        >
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 4. Message (optional) */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block font-geist text-[13px] text-neutral-300 mb-2"
                    >
                      {t.contact.form.message}
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      maxLength={2000}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.contact.form.message}
                      className="w-full p-4 rounded-[12px] bg-[color:var(--vd-090c0a)]/90 border border-white/[0.12] focus:border-[color:var(--vd-9ce607)] text-[14px] font-geist text-white placeholder:text-neutral-500 focus:outline-none transition-colors resize-y"
                    />
                  </div>

                  {TURNSTILE_SITE_KEY && <div ref={turnstileRef} className="min-h-[65px]" />}

                  {errorMsg && (
                    <div className="space-y-2">
                      <p
                        role="alert"
                        className="text-[13px] font-geist text-[color:var(--vd-ff6b6b)]"
                      >
                        {errorMsg}
                      </p>
                      {showFallbackLink && (
                        <div className="p-3 rounded-[10px] bg-white/[0.04] border border-white/[0.1] text-[12.5px] font-geist text-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span>
                            {locale === 'sr'
                              ? 'Ili pošaljite poruku direktno na naš email:'
                              : locale === 'ru'
                                ? 'Или отправьте сообщение напрямую на email:'
                                : 'Or send your inquiry directly via email:'}
                          </span>
                          <a
                            href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
                              `VDigital Inquiry: ${fullName || 'New Client'} (${profession})`
                            )}&body=${encodeURIComponent(
                              `Name: ${fullName}\nContact: ${contactInfo}\nField: ${profession}\n\nMessage:\n${message}`
                            )}`}
                            className="inline-flex items-center gap-1.5 text-[color:var(--vd-9ce607)] hover:underline font-semibold shrink-0"
                          >
                            <span>{CONTACT_EMAIL}</span>
                            <span>→</span>
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 sm:h-[52px] px-6 rounded-[12px] bg-[color:var(--vd-9ce607)] hover:bg-[color:var(--vd-abf50a)] active:scale-[0.99] text-[color:var(--vd-0a0c09)] font-geist font-bold text-[14.5px] tracking-[-0.01em] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-[0_6px_24px_color-mix(in_srgb,var(--vd-9ce607)_35%,transparent),inset_0_1px_1px_color-mix(in_srgb,var(--vd-ffffff)_65%,transparent)] disabled:opacity-60"
                  >
                    <span>
                      {isSubmitting
                        ? t.contact.form.submitting
                        : t.contact.form.submit}
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>

                  {/* Privacy Note + Link to Privacy Policy */}
                  <p className="text-[12px] font-geist text-neutral-400 text-center pt-1 leading-relaxed">
                    {t.contact.form.privacy}{' '}
                    {t.contact.form.privacyAgreementPrefix}
                    <a
                      href={privacyPath}
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(privacyPath);
                      }}
                      className="text-neutral-300 hover:text-[color:var(--vd-9ce607)] underline underline-offset-2 transition-colors"
                    >
                      {t.contact.form.privacyAgreementLink}
                    </a>
                    {t.contact.form.privacyAgreementSuffix}
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
