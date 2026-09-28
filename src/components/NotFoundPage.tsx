import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n';
import { HeaderLogo } from './HeaderLogo';
import { Footer } from './Footer';
import { FloatingChatButton } from './FloatingChatButton';

const NOT_FOUND_ILLUSTRATION_URL =
  'https://res.cloudinary.com/qftxmdqk/image/upload/v1790617071/b564f5b9-54be-4548-b0a3-3ef5f5c3aed5.png';

export const NotFoundPage: React.FC = () => {
  const { locale, t, homePath, contactPath } = useI18n();
  const navigate = useNavigate();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [locale]);

  const handleGoHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(homePath);
  };

  const handleGoContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(contactPath);
  };

  return (
    <div className="min-h-screen w-full bg-[#060709] text-white selection:bg-[#a8f300] selection:text-black relative flex flex-col overflow-x-clip font-geist">
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

      {/* Ambient radial lime glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/3 right-1/4 w-[680px] h-[460px] opacity-20 z-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(156, 230, 7, 0.28) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />

      <HeaderLogo />

      <main className="relative z-10 flex-1 w-full max-w-[1280px] mx-auto px-5 sm:px-8 lg:px-12 py-12 sm:py-16 lg:py-24 flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: 404 Typography & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start text-left order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9ce607]/10 border border-[#9ce607]/30 text-[#9ce607] text-[11px] font-mono uppercase tracking-[0.2em] mb-5">
              <span className="w-2 h-2 rounded-full bg-[#9ce607] shadow-[0_0_8px_#9ce607]" />
              {t.notFoundPage.label}
            </div>

            {/* Giant 404 Display */}
            <div
              aria-hidden="true"
              className="font-geist font-bold text-[96px] sm:text-[132px] lg:text-[156px] leading-[0.88] tracking-[-0.05em] text-[#9ce607] drop-shadow-[0_0_36px_rgba(156,230,7,0.28)] select-none"
            >
              {t.notFoundPage.code}
            </div>

            {/* Main Heading using VDigital Geist + Newsreader Italic */}
            <h1 className="font-geist font-normal text-[34px] sm:text-[46px] lg:text-[54px] leading-[1.06] tracking-[-0.03em] text-white mt-4">
              {`${t.notFoundPage.headingRegular} `}
              <span className="font-editorial italic font-normal text-[#b6ff00]">
                {t.notFoundPage.headingItalic}
              </span>
            </h1>

            {/* Description */}
            <p className="font-geist text-[15px] sm:text-[16.5px] leading-[1.65] text-neutral-300/90 max-w-[460px] mt-4">
              {t.notFoundPage.description}
            </p>

            {/* CTA Buttons matching site style */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4">
              <a
                href={homePath}
                onClick={handleGoHome}
                className="group relative inline-flex items-center cursor-pointer select-none focus:outline-none hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
              >
                <span
                  className="absolute -inset-2 rounded-full bg-[#a8f300]/30 blur-xl opacity-85 group-hover:opacity-100 group-hover:bg-[#a8f300]/45 transition-all duration-300 pointer-events-none"
                  aria-hidden="true"
                />
                <span className="relative p-[2.5px] rounded-full bg-gradient-to-b from-[#e2f999]/80 via-[#3f6212] to-[#1a2e05] shadow-[0_10px_28px_rgba(0,0,0,0.85),0_0_20px_rgba(168,243,0,0.3)]">
                  <span className="relative flex items-center gap-2.5 px-7 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-b from-[#d9f99d] via-[#a8f300] to-[#84cc16] text-[#090d03] font-geist font-bold text-[13.5px] sm:text-[14.5px] tracking-[-0.01em] shadow-[inset_0_2px_2px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(63,98,18,0.45)]">
                    <ArrowLeft className="w-4 h-4 stroke-[2.4] transition-transform duration-200 group-hover:-translate-x-1" />
                    <span>{t.notFoundPage.primaryCta}</span>
                  </span>
                </span>
              </a>

              <a
                href={contactPath}
                onClick={handleGoContact}
                className="group relative inline-flex items-center cursor-pointer select-none focus:outline-none hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
              >
                <span className="relative p-[1.5px] rounded-full bg-gradient-to-b from-white/35 via-white/10 to-white/5 shadow-[0_10px_28px_rgba(0,0,0,0.85)] group-hover:from-white/50 group-hover:via-white/20 transition-all duration-200">
                  <span className="relative flex items-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-gradient-to-b from-[#20232a] via-[#13151a] to-[#0a0c0f] text-white font-geist font-medium text-[13.5px] sm:text-[14.5px] tracking-[-0.01em] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]">
                    <span className="text-neutral-100 group-hover:text-white transition-colors">
                      {t.notFoundPage.secondaryCta}
                    </span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-300 group-hover:text-[#a8f300] transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Provided 404 Unplugged Cord Illustration */}
          <div className="lg:col-span-6 flex items-center justify-center lg:justify-end order-1 lg:order-2">
            <div className="relative w-full max-w-[520px] lg:max-w-[600px] flex items-center justify-center">
              <div
                aria-hidden="true"
                className="absolute inset-8 rounded-full bg-[#9ce607]/15 blur-3xl pointer-events-none"
              />
              <img
                src={NOT_FOUND_ILLUSTRATION_URL}
                alt={t.notFoundPage.imageAlt}
                className="relative z-10 w-full h-auto object-contain select-none pointer-events-none drop-shadow-[0_16px_48px_rgba(156,230,7,0.18)]"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <FloatingChatButton />
    </div>
  );
};
