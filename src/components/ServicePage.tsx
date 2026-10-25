import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Clock,
  HelpCircle,
  Home,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useI18n } from '../i18n';
import { SERVICES_DATA, ServiceSlug } from '../data/servicesData';
import { HeaderLogo } from './HeaderLogo';
import { Footer } from './Footer';
import { FloatingChatButton } from './FloatingChatButton';
import { trackBookCallClick } from '../utils/analytics';

interface ServicePageProps {
  slug: ServiceSlug;
}

export const ServicePage: React.FC<ServicePageProps> = ({ slug }) => {
  const { locale, homePath, contactPath } = useI18n();
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const localizedServices = SERVICES_DATA[locale] || SERVICES_DATA.en;
  const service = localizedServices[slug] || localizedServices['web-development'];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [slug, locale]);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackBookCallClick(`service_${slug}_cta`);
    navigate(contactPath);
  };

  const servicesNavLabel =
    locale === 'sr' ? 'Usluge' : locale === 'ru' ? 'Услуги' : 'Services';

  return (
    <div className="min-h-screen w-full bg-[color:var(--vd-060709)] text-white selection:bg-[color:var(--vd-9ce607)] selection:text-black relative flex flex-col overflow-x-clip font-geist">
      {/* Subtle architectural dark grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.16]"
        style={{
          backgroundImage:
            'linear-gradient(to right, color-mix(in srgb, var(--vd-ffffff) 4%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--vd-ffffff) 4%, transparent) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Subtle ambient radial glow at top */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[920px] h-[480px] opacity-20 z-0"
        style={{
          background:
            'radial-gradient(ellipse at center, color-mix(in srgb, var(--vd-9ce607) 18%, transparent) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      {/* Site Navbar */}
      <HeaderLogo />

      <main className="relative z-10 flex-1 w-full max-w-[1240px] mx-auto px-5 sm:px-8 pt-8 sm:pt-12 pb-24 sm:pb-32">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-2 text-[12px] sm:text-[13px] font-mono text-neutral-400 mb-8 sm:mb-12 flex-wrap"
        >
          <a
            href={homePath}
            onClick={(e) => {
              e.preventDefault();
              navigate(homePath);
            }}
            className="hover:text-[color:var(--vd-9ce607)] transition-colors inline-flex items-center gap-1.5"
          >
            <Home className="w-3.5 h-3.5" />
            <span>{locale === 'sr' ? 'Početna' : locale === 'ru' ? 'Главная' : 'Home'}</span>
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <a
            href={`${homePath}#services`}
            onClick={(e) => {
              e.preventDefault();
              navigate(`${homePath}#services`);
            }}
            className="hover:text-[color:var(--vd-9ce607)] transition-colors"
          >
            {servicesNavLabel}
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-[color:var(--vd-9ce607)] font-semibold truncate max-w-[280px] sm:max-w-none">
            {service.h1}
          </span>
        </nav>

        {/* Section 1: Hero */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[color:var(--vd-9ce607)]/10 border border-[color:var(--vd-9ce607)]/30 text-[color:var(--vd-9ce607)] text-[11px] font-mono uppercase tracking-[0.2em] mb-5">
            <span className="w-2 h-2 rounded-full bg-[color:var(--vd-9ce607)] shadow-[0_0_8px_var(--vd-9ce607)]" />
            {service.badge}
          </div>

          <h1 className="font-geist font-semibold text-[34px] sm:text-[48px] lg:text-[58px] leading-[1.08] tracking-[-0.03em] text-white">
            {service.h1}
          </h1>

          <p className="font-geist text-[16.5px] sm:text-[19px] leading-[1.65] text-neutral-200 mt-6 font-normal max-w-3xl">
            {service.lead}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={contactPath}
              onClick={handleCtaClick}
              className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[color:var(--vd-9ce607)] hover:bg-[color:var(--vd-abf50a)] text-[color:var(--vd-0a0c09)] font-geist font-bold text-[15px] tracking-[-0.01em] transition-all duration-200 cursor-pointer shadow-[0_8px_28px_color-mix(in_srgb,var(--vd-9ce607)_35%,transparent)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{service.cta.button}</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
          {service.stats.map((stat, idx) => (
            <div
              key={idx}
              className="rounded-[20px] bg-[color:var(--vd-101311)]/85 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between"
            >
              <span className="font-geist text-[34px] sm:text-[42px] font-bold text-[color:var(--vd-9ce607)] tracking-tight">
                {stat.value}
              </span>
              <span className="text-[13.5px] font-geist text-neutral-300 mt-2">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Section 2: Problem Section */}
        <div className="mt-20 sm:mt-28 rounded-[28px] bg-[color:var(--vd-101311)]/90 border border-white/[0.08] p-8 sm:p-12 lg:p-14">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-[color:var(--vd-ff6b6b)] mb-3">
              <Zap className="w-4 h-4" />
              <span>
                {locale === 'sr'
                  ? 'Ključni izazovi prakse'
                  : locale === 'ru'
                    ? 'Главные проблемы практики'
                    : 'The Industry Problem'}
              </span>
            </div>
            <h2 className="font-geist font-semibold text-[26px] sm:text-[34px] text-white tracking-tight">
              {service.problem.heading}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-neutral-300 mt-3 leading-relaxed">
              {service.problem.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {service.problem.points.map((point, idx) => (
              <div
                key={idx}
                className="rounded-[20px] bg-[color:var(--vd-090c0a)]/90 border border-white/[0.06] p-6 flex flex-col justify-start"
              >
                <div className="w-8 h-8 rounded-lg bg-[color:var(--vd-ff6b6b)]/15 text-[color:var(--vd-ff6b6b)] flex items-center justify-center font-mono text-[13px] font-bold mb-4">
                  0{idx + 1}
                </div>
                <h3 className="font-geist font-semibold text-[17px] text-white tracking-tight mb-2">
                  {point.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-neutral-300">
                  {point.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Deliverables / What's Included */}
        <div className="mt-20 sm:mt-28">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-[color:var(--vd-9ce607)] mb-3">
              <ShieldCheck className="w-4 h-4" />
              <span>
                {locale === 'sr'
                  ? 'Kompletna isporuka'
                  : locale === 'ru'
                    ? 'Что входит в систему'
                    : 'System Deliverables'}
              </span>
            </div>
            <h2 className="font-geist font-semibold text-[28px] sm:text-[38px] text-white tracking-tight">
              {service.deliverables.heading}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-neutral-300 mt-3">
              {service.deliverables.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {service.deliverables.items.map((item, idx) => (
              <div
                key={idx}
                className="rounded-[24px] bg-[color:var(--vd-111512)]/80 border border-white/[0.08] p-7 sm:p-8 flex flex-col justify-start transition-all hover:border-[color:var(--vd-9ce607)]/40"
              >
                <div className="w-10 h-10 rounded-xl bg-[color:var(--vd-9ce607)]/10 text-[color:var(--vd-9ce607)] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="font-geist font-semibold text-[19px] text-white tracking-tight mb-2">
                  {item.title}
                </h3>
                <p className="text-[14.5px] leading-[1.68] text-neutral-300">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: 3-Week Process */}
        <div className="mt-20 sm:mt-28 rounded-[28px] bg-gradient-to-b from-[color:var(--vd-111512)] to-[color:var(--vd-0c0e0c)] border border-white/[0.08] p-8 sm:p-12 lg:p-14">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-[color:var(--vd-9ce607)] mb-3">
              <Clock className="w-4 h-4" />
              <span>
                {locale === 'sr'
                  ? 'Plan rada u 3 nedelje'
                  : locale === 'ru'
                    ? '3-недельный план реализации'
                    : '3-Week Sprint Process'}
              </span>
            </div>
            <h2 className="font-geist font-semibold text-[28px] sm:text-[38px] text-white tracking-tight">
              {service.process.heading}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-neutral-300 mt-3">
              {service.process.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {service.process.steps.map((step, idx) => (
              <div
                key={idx}
                className="rounded-[22px] bg-[color:var(--vd-090c0a)]/90 border border-white/[0.08] p-7 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[22px] font-bold text-[color:var(--vd-9ce607)]">
                      {step.step}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-white/[0.06] text-neutral-300 text-[11px] font-mono">
                      {step.duration}
                    </span>
                  </div>
                  <h3 className="font-geist font-semibold text-[18px] text-white tracking-tight mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[14px] leading-[1.65] text-neutral-300">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Pricing Models */}
        <div className="mt-20 sm:mt-28">
          <div className="max-w-2xl mb-12">
            <div className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-[color:var(--vd-9ce607)] mb-3">
              <Sparkles className="w-4 h-4" />
              <span>
                {locale === 'sr'
                  ? 'Transparentni modeli'
                  : locale === 'ru'
                    ? 'Прозрачные форматы'
                    : 'Investment Models'}
              </span>
            </div>
            <h2 className="font-geist font-semibold text-[28px] sm:text-[38px] text-white tracking-tight">
              {service.pricingModels.heading}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-neutral-300 mt-3">
              {service.pricingModels.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {service.pricingModels.models.map((model, idx) => (
              <div
                key={idx}
                className="rounded-[24px] bg-[color:var(--vd-111512)]/85 border border-white/[0.08] p-7 sm:p-8 flex flex-col justify-between transition-all hover:border-[color:var(--vd-9ce607)]/40 shadow-lg"
              >
                <div>
                  <h3 className="font-geist font-bold text-[20px] text-white tracking-tight">
                    {model.title}
                  </h3>
                  <p className="font-mono text-[12px] text-[color:var(--vd-9ce607)] uppercase tracking-wider mt-1 mb-4">
                    {model.subtitle}
                  </p>
                  <p className="text-[14px] leading-[1.65] text-neutral-300 mb-6">
                    {model.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/[0.08] space-y-2">
                  {model.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-[13px] text-neutral-200">
                      <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--vd-9ce607)]" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: FAQs */}
        <div className="mt-20 sm:mt-28 max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 text-[12px] font-mono uppercase tracking-[0.18em] text-[color:var(--vd-9ce607)] mb-3">
              <HelpCircle className="w-4 h-4" />
              <span>FAQ</span>
            </div>
            <h2 className="font-geist font-semibold text-[28px] sm:text-[36px] text-white tracking-tight">
              {locale === 'sr'
                ? 'Često postavljana pitanja'
                : locale === 'ru'
                  ? 'Часто задаваемые вопросы'
                  : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-4">
            {service.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-[18px] bg-[color:var(--vd-111512)]/80 border border-white/[0.08] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-geist font-semibold text-[16px] sm:text-[17px] text-white cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-[color:var(--vd-9ce607)] transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-[14.5px] leading-[1.7] text-neutral-300 border-t border-white/[0.05]">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Section 7: Final CTA */}
        <div className="mt-20 sm:mt-28 rounded-[28px] bg-gradient-to-b from-[color:var(--vd-141815)] to-[color:var(--vd-0c0f0d)] border border-[color:var(--vd-9ce607)]/30 p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center">
          <h2 className="font-geist font-semibold text-[28px] sm:text-[38px] text-white tracking-tight max-w-xl">
            {service.cta.heading}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-neutral-300 mt-3 max-w-lg">
            {service.cta.description}
          </p>
          <a
            href={contactPath}
            onClick={handleCtaClick}
            className="group mt-8 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[color:var(--vd-9ce607)] hover:bg-[color:var(--vd-abf50a)] text-[color:var(--vd-0a0c09)] font-geist font-bold text-[15px] tracking-[-0.01em] transition-all duration-200 cursor-pointer shadow-[0_8px_28px_color-mix(in_srgb,var(--vd-9ce607)_35%,transparent)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{service.cta.button}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </main>

      <Footer />
      <FloatingChatButton />
    </div>
  );
};
