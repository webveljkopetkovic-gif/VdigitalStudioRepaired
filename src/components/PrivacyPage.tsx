import React, { useEffect } from 'react';
import { useI18n } from '../i18n';
import { HeaderLogo } from './HeaderLogo';
import { Footer } from './Footer';
import { FloatingChatButton } from './FloatingChatButton';

// TODO(Veljko): Have this Privacy Policy text reviewed by a qualified legal advisor before launch.
export const PrivacyPage: React.FC = () => {
  const { locale, t } = useI18n();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    }
  }, [locale]);

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
            'radial-gradient(ellipse at center, rgba(182, 255, 0, 0.14) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
      />

      <HeaderLogo />

      <main className="relative z-10 flex-1 w-full max-w-[820px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 lg:pt-20 pb-20 sm:pb-28">
        <span className="text-[11px] uppercase tracking-[0.15em] text-[#9ce607] font-mono font-semibold">
          {t.privacyPage.label}
        </span>

        <h1 className="font-geist font-semibold text-[34px] sm:text-[46px] lg:text-[52px] leading-[1.08] tracking-[-0.03em] text-white mt-3">
          {t.privacyPage.title}
        </h1>

        <p className="text-[13px] font-mono text-neutral-400 mt-3">
          {t.privacyPage.lastUpdated}
        </p>

        <p className="text-[15.5px] sm:text-[16.5px] leading-[1.68] text-neutral-200 mt-6 pb-8 border-b border-white/[0.08]">
          {t.privacyPage.intro}
        </p>

        <div className="mt-8 space-y-8">
          {t.privacyPage.sections.map((sec, idx) => (
            <section
              key={idx}
              className="rounded-[16px] bg-[#111512]/75 border border-white/[0.07] p-6 sm:p-7"
            >
              <h2 className="font-geist font-semibold text-[18px] sm:text-[20px] text-white tracking-[-0.015em]">
                {sec.heading}
              </h2>
              <p className="font-geist text-[14.5px] sm:text-[15.5px] leading-[1.68] text-neutral-300 mt-3">
                {sec.body}
              </p>
            </section>
          ))}
        </div>
      </main>

      <Footer />

      <FloatingChatButton />
    </div>
  );
};
