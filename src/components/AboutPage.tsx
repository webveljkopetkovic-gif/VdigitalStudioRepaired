import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, CheckCircle2, ChevronRight, Home } from 'lucide-react';
import { useI18n } from '../i18n';
import { ABOUT_DATA } from '../data/aboutData';
import { HeaderLogo } from './HeaderLogo';
import { Footer } from './Footer';
import { FloatingChatButton } from './FloatingChatButton';
import { trackBookCallClick } from '../utils/analytics';

export const AboutPage: React.FC = () => {
  const { locale, homePath, contactPath } = useI18n();
  const navigate = useNavigate();
  const data = ABOUT_DATA[locale] || ABOUT_DATA.en;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [locale]);

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackBookCallClick('about_page_cta');
    navigate(contactPath);
  };

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
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[460px] opacity-20 z-0"
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
          className="flex items-center gap-2 text-[12px] sm:text-[13px] font-mono text-neutral-400 mb-8 sm:mb-12"
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
            <span>Home</span>
          </a>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-600" />
          <span className="text-[color:var(--vd-9ce607)] font-semibold">
            {locale === 'sr' ? 'O nama' : locale === 'ru' ? 'О нас' : 'About Us'}
          </span>
        </nav>

        {/* Section 1: Hero Intro */}
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[color:var(--vd-9ce607)]/10 border border-[color:var(--vd-9ce607)]/30 text-[color:var(--vd-9ce607)] text-[11px] font-mono uppercase tracking-[0.2em] mb-5">
            <span className="w-2 h-2 rounded-full bg-[color:var(--vd-9ce607)] shadow-[0_0_8px_var(--vd-9ce607)]" />
            {data.badge}
          </div>

          <h1 className="font-geist font-normal text-[36px] sm:text-[50px] lg:text-[62px] leading-[1.08] tracking-[-0.03em] text-white">
            {`${data.h1Regular} `}
            <span className="font-editorial italic font-normal text-[color:var(--vd-9ce607)]">
              {data.h1Italic}
            </span>
          </h1>

          <p className="font-geist text-[16px] sm:text-[19px] leading-[1.65] text-neutral-200 mt-6 font-normal max-w-3xl">
            {data.intro}
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-12 sm:mt-16">
          <div className="rounded-[20px] bg-[color:var(--vd-101311)]/85 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between">
            <span className="font-geist text-[38px] sm:text-[46px] font-bold text-[color:var(--vd-9ce607)] tracking-tight">
              {data.founderStory.foundedYear}
            </span>
            <span className="text-[13.5px] font-geist text-neutral-300 mt-2">
              {locale === 'sr'
                ? 'Godina osnivanja studija u Nišu'
                : locale === 'ru'
                  ? 'Год основания студии в Нише'
                  : 'Studio founded in Niš, Serbia'}
            </span>
          </div>

          <div className="rounded-[20px] bg-[color:var(--vd-101311)]/85 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between">
            <span className="font-geist text-[38px] sm:text-[46px] font-bold text-white tracking-tight">
              {data.founderStory.experienceSince}
            </span>
            <span className="text-[13.5px] font-geist text-neutral-300 mt-2">
              {locale === 'sr'
                ? 'Godina od kada gradimo za web'
                : locale === 'ru'
                  ? 'Опыт разработки сайтов с 2020 года'
                  : 'Building for the web since 2020'}
            </span>
          </div>

          <div className="rounded-[20px] bg-[color:var(--vd-101311)]/85 border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between">
            <span className="font-geist text-[38px] sm:text-[46px] font-bold text-[color:var(--vd-9ce607)] tracking-tight">
              {data.founderStory.projectsDelivered}
            </span>
            <span className="text-[13.5px] font-geist text-neutral-300 mt-2">
              {locale === 'sr'
                ? 'Uspešno isporučenih projekata'
                : locale === 'ru'
                  ? 'Успешно реализованных проектов'
                  : 'Commercial web projects delivered'}
            </span>
          </div>
        </div>

        {/* Section 2: Mission & Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-16 sm:mt-24 items-start">
          <div className="rounded-[24px] bg-[color:var(--vd-101311)]/80 border border-white/[0.08] p-7 sm:p-10 space-y-4">
            <h2 className="font-geist font-semibold text-[22px] sm:text-[26px] text-white tracking-tight">
              {data.missionHeading}
            </h2>
            {data.missionText.map((paragraph, idx) => (
              <p key={idx} className="text-[15px] sm:text-[16px] leading-[1.72] text-neutral-300">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="rounded-[24px] bg-[color:var(--vd-101311)]/80 border border-white/[0.08] p-7 sm:p-10 space-y-4">
            <h2 className="font-geist font-semibold text-[22px] sm:text-[26px] text-white tracking-tight">
              {data.founderStory.heading}
            </h2>
            {data.founderStory.text.map((paragraph, idx) => (
              <p key={idx} className="text-[15px] sm:text-[16px] leading-[1.72] text-neutral-300">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Section 3: The 3-Person Team */}
        <div className="mt-20 sm:mt-28">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <h2 className="font-geist font-semibold text-[28px] sm:text-[38px] text-white tracking-tight">
              {data.teamHeading}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-neutral-300 mt-3 leading-relaxed">
              {data.teamSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {data.members.map((member, idx) => (
              <div
                key={idx}
                className="rounded-[24px] bg-[color:var(--vd-111512)]/80 border border-white/[0.08] p-6 sm:p-7 flex flex-col items-center text-center transition-all duration-300 hover:border-[color:var(--vd-9ce607)]/40 hover:-translate-y-1 shadow-[0_12px_32px_color-mix(in_srgb,var(--vd-000000)_50%,transparent)]"
              >
                <div className="relative w-40 h-40 sm:w-44 sm:h-44 rounded-[24px] overflow-hidden mb-5 border-2 border-white/10 shadow-lg">
                  <img
                    src={member.photo}
                    alt={member.photoAlt}
                    width={512}
                    height={512}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <h3 className="font-geist font-bold text-[20px] text-white tracking-tight">
                  {member.name}
                </h3>
                <span className="font-mono text-[12px] uppercase tracking-wider text-[color:var(--vd-9ce607)] font-semibold mt-1">
                  {member.role}
                </span>
                <p className="text-[14px] leading-[1.65] text-neutral-300 mt-4 text-center">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: How We Work */}
        <div className="mt-20 sm:mt-28 rounded-[28px] bg-[color:var(--vd-111512)]/90 border border-white/[0.08] p-8 sm:p-12 lg:p-14">
          <div className="max-w-2xl mb-10">
            <h2 className="font-geist font-semibold text-[26px] sm:text-[34px] text-white tracking-tight">
              {data.howWeWork.heading}
            </h2>
            <p className="text-[15px] sm:text-[16px] text-neutral-300 mt-3">
              {data.howWeWork.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {data.howWeWork.principles.map((principle, idx) => (
              <div
                key={idx}
                className="rounded-[20px] bg-[color:var(--vd-090c0a)]/90 border border-white/[0.06] p-6 flex flex-col justify-start"
              >
                <div className="w-10 h-10 rounded-xl bg-[color:var(--vd-9ce607)]/10 text-[color:var(--vd-9ce607)] flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h3 className="font-geist font-semibold text-[17px] sm:text-[18px] text-white tracking-tight mb-2">
                  {principle.title}
                </h3>
                <p className="text-[14px] leading-[1.65] text-neutral-300">
                  {principle.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: CTA */}
        <div className="mt-16 sm:mt-24 rounded-[28px] bg-gradient-to-b from-[color:var(--vd-141815)] to-[color:var(--vd-0c0f0d)] border border-[color:var(--vd-9ce607)]/30 p-8 sm:p-12 lg:p-16 text-center flex flex-col items-center">
          <h2 className="font-geist font-semibold text-[28px] sm:text-[38px] text-white tracking-tight max-w-xl">
            {data.cta.heading}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-neutral-300 mt-3 max-w-lg">
            {data.cta.description}
          </p>
          <a
            href={contactPath}
            onClick={handleCtaClick}
            className="group mt-8 inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[color:var(--vd-9ce607)] hover:bg-[color:var(--vd-abf50a)] text-[color:var(--vd-0a0c09)] font-geist font-bold text-[15px] tracking-[-0.01em] transition-all duration-200 cursor-pointer shadow-[0_8px_28px_color-mix(in_srgb,var(--vd-9ce607)_35%,transparent)] hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>{data.cta.button}</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </main>

      <Footer />
      <FloatingChatButton />
    </div>
  );
};
