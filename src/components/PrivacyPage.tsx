import React, { useEffect } from 'react';
import { useI18n } from '../i18n';
import { HeaderLogo } from './HeaderLogo';
import { Footer } from './Footer';
import { FloatingChatButton } from './FloatingChatButton';
import { openCookieSettings } from '../utils/analytics';

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

      <main className="relative z-10 flex-1 w-full max-w-[920px] mx-auto px-5 sm:px-8 pt-10 sm:pt-16 lg:pt-20 pb-20 sm:pb-28">
        <span className="text-[11px] uppercase tracking-[0.15em] text-[#9ce607] font-mono font-semibold">
          {t.privacyPage.label}
        </span>

        <h1 className="font-geist font-semibold text-[32px] sm:text-[44px] lg:text-[50px] leading-[1.08] tracking-[-0.03em] text-white mt-3">
          {t.privacyPage.title}
        </h1>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-[13px] font-mono text-neutral-400">
            {t.privacyPage.lastUpdated}
          </p>

          <button
            type="button"
            onClick={openCookieSettings}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] bg-[#161b17] hover:bg-[#1e2620] border border-[#9ce607]/40 text-[#9ce607] font-geist font-semibold text-[13px] transition-colors cursor-pointer"
          >
            <span>{t.privacyPage.manageCookiesCta}</span>
          </button>
        </div>

        <p className="text-[15.5px] sm:text-[16.5px] leading-[1.68] text-neutral-200 mt-6 pb-8 border-b border-white/[0.08]">
          {t.privacyPage.intro}
        </p>

        <div className="mt-8 space-y-7">
          {t.privacyPage.sections.map((sec, idx) => (
            <section
              key={idx}
              className="rounded-[16px] bg-[#111512]/75 border border-white/[0.07] p-6 sm:p-7"
            >
              <h2 className="font-geist font-semibold text-[18px] sm:text-[20px] text-white tracking-[-0.015em]">
                {sec.heading}
              </h2>
              <div className="font-geist text-[14.5px] sm:text-[15.5px] leading-[1.7] text-neutral-300 mt-3 whitespace-pre-line">
                {sec.body}
              </div>
            </section>
          ))}

          {/* Complete Cookie & Tracker Audit Table */}
          <section className="rounded-[16px] bg-[#111512]/75 border border-white/[0.07] p-6 sm:p-7 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
              <h2 className="font-geist font-semibold text-[18px] sm:text-[20px] text-white tracking-[-0.015em]">
                {t.privacyPage.cookieTableTitle}
              </h2>
              <button
                type="button"
                onClick={openCookieSettings}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[8px] bg-[#9ce607] hover:bg-[#abf50a] text-[#0a0c09] font-geist font-semibold text-[12.5px] transition-colors cursor-pointer"
              >
                <span>{t.privacyPage.manageCookiesCta}</span>
              </button>
            </div>

            <div className="overflow-x-auto -mx-6 sm:-mx-7 px-6 sm:px-7">
              <table className="w-full text-left border-collapse min-w-[640px] text-[13.5px]">
                <thead>
                  <tr className="border-b border-white/[0.1] text-neutral-400 font-mono text-[11.5px] uppercase tracking-wider">
                    <th className="py-3 pr-4 font-semibold">
                      {t.privacyPage.cookieTableHeaders.name}
                    </th>
                    <th className="py-3 px-4 font-semibold">
                      {t.privacyPage.cookieTableHeaders.provider}
                    </th>
                    <th className="py-3 px-4 font-semibold">
                      {t.privacyPage.cookieTableHeaders.purpose}
                    </th>
                    <th className="py-3 px-4 font-semibold">
                      {t.privacyPage.cookieTableHeaders.duration}
                    </th>
                    <th className="py-3 pl-4 font-semibold">
                      {t.privacyPage.cookieTableHeaders.category}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.06] text-neutral-200">
                  {t.privacyPage.cookieTableRows.map((row, i) => (
                    <tr key={i} className="align-top">
                      <td className="py-3.5 pr-4 font-mono text-[12.5px] text-[#9ce607] whitespace-nowrap">
                        {row.name}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-300">
                        {row.provider}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-300 leading-relaxed">
                        {row.purpose}
                      </td>
                      <td className="py-3.5 px-4 text-neutral-400 whitespace-nowrap">
                        {row.duration}
                      </td>
                      <td className="py-3.5 pl-4 whitespace-nowrap">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-[11.5px] font-medium text-neutral-200">
                          {row.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      <FloatingChatButton />
    </div>
  );
};
