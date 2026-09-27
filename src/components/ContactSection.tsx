import React, { useState } from 'react';
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
  PHONE_DISPLAY,
  PHONE_URL,
  TELEGRAM_URL,
  VIBER_URL,
  WEB3FORMS_ACCESS_KEY,
  WHATSAPP_URL,
} from '../config';
import { useI18n } from '../i18n';
import { ViberIcon, WhatsAppIcon } from './BrandIcons';

export const ContactSection: React.FC = () => {
  const { t, contactPath } = useI18n();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [professionIndex, setProfessionIndex] = useState(0);
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const profession =
    t.contact.form.professionOptions[professionIndex] ||
    t.contact.form.professionOptions[0] ||
    'Doctor';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedName = fullName.trim();
    const trimmedContact = contactInfo.trim();

    if (!trimmedName || !trimmedContact || !profession) {
      setErrorMsg(t.contact.form.errorRequired);
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.set('name', trimmedName);
    formData.set('contact', trimmedContact);
    formData.set('profession', profession);
    formData.set('message', message.trim());
    formData.append('access_key', WEB3FORMS_ACCESS_KEY);

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
        setFullName('');
        setContactInfo('');
        setProfessionIndex(0);
        setMessage('');
        form.reset();
      } else {
        setErrorMsg(data.message || t.contact.form.errorGeneric);
      }
    } catch {
      setErrorMsg(t.contact.form.errorGeneric);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative w-full bg-[#060709] text-white py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-t border-white/[0.06] overflow-hidden select-none"
    >
      {/* Ambient Green Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[480px] pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(156, 230, 7, 0.25) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1140px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-12 items-start">
          {/* Left Column: Heading + Book a Call Button + Direct Contact Channels */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#9ce607] shadow-[0_0_10px_#9ce607]" />
              <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#9ce607] font-semibold">
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
                  navigate(contactPath);
                }}
                className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#9ce607] hover:bg-[#abf50a] text-[#0a0c09] font-geist font-bold text-[15px] tracking-[-0.01em] transition-all duration-200 cursor-pointer shadow-[0_8px_28px_rgba(156,230,7,0.35),inset_0_1px_1px_rgba(255,255,255,0.65)] hover:scale-[1.02] active:scale-[0.98]"
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
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141815]/80 hover:bg-[#1b221d] border border-white/10 hover:border-[#9ce607]/50 text-[13px] font-geist text-white transition-all"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#9ce607]" />
                  <span>WhatsApp</span>
                </a>

                {/* Viber */}
                <a
                  href={VIBER_URL}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141815]/80 hover:bg-[#1b221d] border border-white/10 hover:border-[#9ce607]/50 text-[13px] font-geist text-white transition-all"
                >
                  <ViberIcon className="w-4 h-4 text-[#9ce607]" />
                  <span>Viber</span>
                </a>

                {/* Telegram */}
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141815]/80 hover:bg-[#1b221d] border border-white/10 hover:border-[#9ce607]/50 text-[13px] font-geist text-white transition-all"
                >
                  <Send className="w-4 h-4 text-[#9ce607]" />
                  <span>Telegram</span>
                </a>

                {/* Email */}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141815]/80 hover:bg-[#1b221d] border border-white/10 hover:border-[#9ce607]/50 text-[13px] font-geist text-white transition-all"
                >
                  <Mail className="w-4 h-4 text-[#9ce607]" />
                  <span>Email</span>
                </a>

                {/* Phone */}
                <a
                  href={PHONE_URL}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#141815]/80 hover:bg-[#1b221d] border border-white/10 hover:border-[#9ce607]/50 text-[13px] font-geist text-white transition-all tabular-nums"
                >
                  <Phone className="w-4 h-4 text-[#9ce607]" />
                  <span>{PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Frosted Glass Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="lg:col-span-7 w-full"
          >
            <div className="rounded-[24px] bg-[#111512]/85 backdrop-blur-xl border border-white/[0.1] p-6 sm:p-8 lg:p-10 shadow-[0_24px_60px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(255,255,255,0.1)]">
              {isSubmitted ? (
                <div className="py-8 flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#9ce607] text-[#0a0c09] flex items-center justify-center shadow-[0_0_28px_rgba(156,230,7,0.4)]">
                    <CheckCircle2 className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <p className="font-geist font-medium text-[18px] sm:text-[20px] text-white max-w-md">
                    {t.contact.form.success}
                  </p>
                </div>
              ) : (
                <form id="form" onSubmit={handleSubmit} noValidate className="space-y-5">
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
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={t.contact.form.name}
                      className="w-full h-12 px-4 rounded-[12px] bg-[#090c0a]/90 border border-white/[0.12] focus:border-[#9ce607] text-[14px] font-geist text-white placeholder:text-neutral-500 focus:outline-none transition-colors"
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
                      value={contactInfo}
                      onChange={(e) => setContactInfo(e.target.value)}
                      placeholder={t.contact.form.contact}
                      className="w-full h-12 px-4 rounded-[12px] bg-[#090c0a]/90 border border-white/[0.12] focus:border-[#9ce607] text-[14px] font-geist text-white placeholder:text-neutral-500 focus:outline-none transition-colors"
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
                      className="w-full h-12 px-4 rounded-[12px] bg-[#090c0a]/90 border border-white/[0.12] focus:border-[#9ce607] text-[14px] font-geist text-white focus:outline-none transition-colors"
                    >
                      {t.contact.form.professionOptions.map((option, idx) => (
                        <option
                          key={option}
                          value={idx}
                          className="bg-[#0a0c09] text-white"
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
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.contact.form.message}
                      className="w-full p-4 rounded-[12px] bg-[#090c0a]/90 border border-white/[0.12] focus:border-[#9ce607] text-[14px] font-geist text-white placeholder:text-neutral-500 focus:outline-none transition-colors resize-y"
                    />
                  </div>

                  {errorMsg && (
                    <p
                      role="alert"
                      className="text-[13px] font-geist text-[#ff6b6b]"
                    >
                      {errorMsg}
                    </p>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 sm:h-[52px] px-6 rounded-[12px] bg-[#9ce607] hover:bg-[#abf50a] active:scale-[0.99] text-[#0a0c09] font-geist font-bold text-[14.5px] tracking-[-0.01em] flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-[0_6px_24px_rgba(156,230,7,0.35),inset_0_1px_1px_rgba(255,255,255,0.65)] disabled:opacity-60"
                  >
                    <span>
                      {isSubmitting
                        ? t.contact.form.submitting
                        : t.contact.form.submit}
                    </span>
                    <span aria-hidden="true">→</span>
                  </button>

                  {/* Privacy Note */}
                  <p className="text-[12px] font-geist text-neutral-400 text-center pt-1">
                    {t.contact.form.privacy}
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
