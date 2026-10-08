import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CONTACT_EMAIL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PHONE_DISPLAY,
  PHONE_URL,
  TELEGRAM_URL,
  TIKTOK_URL,
} from '../config';
import {
  getAboutPath,
  getContactPath,
  getHomePath,
  getPrivacyPath,
  getServicePath,
  ServiceSlug,
  useI18n,
} from '../i18n';
import { openCookieSettings, trackMessengerClick } from '../utils/analytics';

export const Footer: React.FC = () => {
  const {
    locale,
    t,
    selectLocale,
    homePath,
    contactPath,
    privacyPath,
    aboutPath,
    getEquivalentPath,
    isContactPage,
    isAboutPage,
    isServicePage,
    isPrivacyPage,
    isNotFoundPage,
  } = useI18n();
  const navigate = useNavigate();
  const isSubPage = isContactPage || isAboutPage || isServicePage || isPrivacyPage || isNotFoundPage;

  const getSectionHref = (sectionId: string) =>
    isSubPage ? `${homePath}#${sectionId}` : `#${sectionId}`;

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string
  ) => {
    e.preventDefault();
    if (sectionId === 'about') {
      navigate(aboutPath);
      return;
    }
    if (sectionId === 'contact') {
      navigate(contactPath);
      return;
    }
    if (sectionId === 'privacy') {
      navigate(privacyPath);
      return;
    }
    if (isSubPage) {
      navigate(sectionId === 'top' ? homePath : `${homePath}#${sectionId}`);
      setTimeout(() => {
        if (sectionId === 'top') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        }
      }, 120);
      return;
    }
    if (sectionId === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const serviceLinks: { slug: ServiceSlug; label: string; href: string }[] = [
    {
      slug: 'web-development',
      label: t.navbar.dropdown.webDev,
      href: getServicePath('web-development', locale),
    },
    {
      slug: 'video-social-media',
      label: t.navbar.dropdown.videoSocial,
      href: getServicePath('video-social-media', locale),
    },
    {
      slug: 'marketing-automation',
      label: t.navbar.dropdown.marketingAuto,
      href: getServicePath('marketing-automation', locale),
    },
    {
      slug: 'cold-calling',
      label: t.navbar.dropdown.coldCalling,
      href: getServicePath('cold-calling', locale),
    },
  ];

  const languages: { code: 'en' | 'sr' | 'ru'; label: string; href: string }[] = [
    {
      code: 'en',
      label: 'EN',
      href: getEquivalentPath('en'),
    },
    {
      code: 'sr',
      label: 'SR',
      href: getEquivalentPath('sr'),
    },
    {
      code: 'ru',
      label: 'RU',
      href: getEquivalentPath('ru'),
    },
  ];

  return (
    <footer
      id="site-footer"
      className="relative w-full bg-[color:var(--vd-060709)] text-white pt-20 sm:pt-24 lg:pt-28 pb-6 sm:pb-8 px-6 sm:px-10 lg:px-14 border-t border-white/[0.06] overflow-hidden select-none font-geist"
    >
      <div className="w-full max-w-[1360px] mx-auto flex flex-col">
        {/* ================================================================= */}
        {/* TIER 1: TOP 3-COLUMN ROW (Nav Links | Brand & Socials | Location) */}
        {/* ================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-12 md:gap-8">
          {/* Left Column: Semantic Navigation Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-col items-start space-y-4 text-[14px] sm:text-[14.5px]"
          >
            {/* Services group */}
            <div className="flex flex-col space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[color:var(--vd-9ce607)]">
                {t.navbar.links.services}
              </span>
              {serviceLinks.map((service) => (
                <a
                  key={service.slug}
                  href={service.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(service.href);
                  }}
                  className="text-white hover:text-[color:var(--vd-9ce607)] transition-colors cursor-pointer font-normal text-[13.5px] sm:text-[14px]"
                >
                  {service.label}
                </a>
              ))}
            </div>

            {/* General Navigation group */}
            <div className="flex flex-col space-y-2 pt-2 border-t border-white/[0.06] w-full max-w-[220px]">
              <a
                href={getSectionHref('process')}
                onClick={(e) => handleNavClick(e, 'process')}
                className="text-neutral-300 hover:text-[color:var(--vd-9ce607)] transition-colors cursor-pointer font-normal text-[13.5px] sm:text-[14px]"
              >
                {t.navbar.links.process}
              </a>
              <a
                href={aboutPath}
                onClick={(e) => handleNavClick(e, 'about')}
                className="text-neutral-300 hover:text-[color:var(--vd-9ce607)] transition-colors cursor-pointer font-normal text-[13.5px] sm:text-[14px]"
              >
                {t.navbar.links.about}
              </a>
              <a
                href={contactPath}
                onClick={(e) => handleNavClick(e, 'contact')}
                className="text-neutral-300 hover:text-[color:var(--vd-9ce607)] transition-colors cursor-pointer font-normal text-[13.5px] sm:text-[14px]"
              >
                {t.navbar.links.contact}
              </a>
              <a
                href={privacyPath}
                onClick={(e) => handleNavClick(e, 'privacy')}
                className="text-neutral-400 hover:text-[color:var(--vd-9ce607)] transition-colors cursor-pointer font-normal text-[13.5px] sm:text-[14px]"
              >
                {t.footer.privacy}
              </a>
            </div>
          </nav>

          {/* Center Column: Studio Summary + Email/Phone + 4 Social Icons */}
          <div className="flex flex-col items-start md:items-center text-left md:text-center">
            <p className="text-[14px] sm:text-[15px] font-normal text-white mb-4 max-w-xs leading-relaxed">
              {t.footer.text}
            </p>

            <div className="flex flex-wrap items-center justify-start md:justify-center text-[14px] sm:text-[14.5px] text-neutral-400 leading-relaxed">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="hover:text-[color:var(--vd-9ce607)] transition-colors"
              >
                {CONTACT_EMAIL}
              </a>
              <span className="text-neutral-500 select-none whitespace-pre">
                {' · '}
              </span>
              <a
                href={PHONE_URL}
                className="hover:text-white transition-colors tabular-nums"
              >
                {PHONE_DISPLAY}
              </a>
            </div>

            {/* Social Icons: Instagram, TikTok, LinkedIn, Telegram */}
            <div className="flex items-center gap-3.5 sm:gap-4 mt-7">
              {/* 1. Instagram */}
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VDigital on Instagram"
                title="VDigital on Instagram"
                className="group w-11 h-11 rounded-[10px] bg-[color:var(--vd-1a1c20)] hover:bg-[color:var(--vd-22262b)] border border-white/[0.06] hover:border-[color:var(--vd-9ce607)]/50 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_14px_color-mix(in_srgb,var(--vd-000000)_40%,transparent)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="w-5 h-5 text-white group-hover:text-[color:var(--vd-9ce607)] transition-colors"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* 2. TikTok */}
              <a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VDigital on TikTok"
                title="VDigital on TikTok"
                className="group w-11 h-11 rounded-[10px] bg-[color:var(--vd-1a1c20)] hover:bg-[color:var(--vd-22262b)] border border-white/[0.06] hover:border-[color:var(--vd-9ce607)]/50 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_14px_color-mix(in_srgb,var(--vd-000000)_40%,transparent)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5 text-white group-hover:text-[color:var(--vd-9ce607)] transition-colors"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </a>

              {/* 3. LinkedIn */}
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VDigital on LinkedIn"
                title="VDigital on LinkedIn"
                className="group w-11 h-11 rounded-[10px] bg-[color:var(--vd-1a1c20)] hover:bg-[color:var(--vd-22262b)] border border-white/[0.06] hover:border-[color:var(--vd-9ce607)]/50 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_14px_color-mix(in_srgb,var(--vd-000000)_40%,transparent)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5 text-white group-hover:text-[color:var(--vd-9ce607)] transition-colors"
                >
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* 4. Telegram */}
              <a
                href={TELEGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VDigital on Telegram"
                title="VDigital on Telegram"
                onClick={() => trackMessengerClick('telegram', 'footer')}
                className="group w-11 h-11 rounded-[10px] bg-[color:var(--vd-1a1c20)] hover:bg-[color:var(--vd-22262b)] border border-white/[0.06] hover:border-[color:var(--vd-9ce607)]/50 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-[0_4px_14px_color-mix(in_srgb,var(--vd-000000)_40%,transparent)]"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                  className="w-5 h-5 text-white group-hover:text-[color:var(--vd-9ce607)] transition-colors"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Column: Location + Language Switcher */}
          <div className="flex flex-col items-start md:items-end">
            <div className="flex flex-col items-start md:items-end text-left md:text-right space-y-4">
              <address className="not-italic text-[14px] sm:text-[14.5px] text-neutral-400 leading-[1.65]">
                {t.footer.location}
              </address>

              {/* Language Switcher (EN · SR · RU) */}
              <div
                className="flex items-center gap-2 text-[13px] font-geist"
                aria-label="Footer language switcher"
              >
                {languages.map((lang, idx) => (
                  <React.Fragment key={lang.code}>
                    <a
                      href={lang.href}
                      hrefLang={lang.code}
                      lang={lang.code}
                      onClick={(e) => {
                        e.preventDefault();
                        selectLocale(lang.code);
                      }}
                      className={`transition-colors cursor-pointer ${
                        locale === lang.code
                          ? 'text-[color:var(--vd-9ce607)] font-semibold'
                          : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      {lang.label}
                    </a>
                    {idx < languages.length - 1 && (
                      <span
                        className="text-neutral-600 select-none"
                        aria-hidden="true"
                      >
                        ·
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* TIER 2: COPYRIGHT ROW                                             */}
        {/* ================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-16 sm:mt-20 mb-12 sm:mb-16 text-[13px] sm:text-[14px] text-white/90">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-left">
            <span>{t.footer.copyright}</span>
            <a
              href={privacyPath}
              onClick={(e) => handleNavClick(e, 'privacy')}
              className="text-neutral-400 hover:text-[color:var(--vd-9ce607)] transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              {t.footer.privacy}
            </a>
            <button
              type="button"
              onClick={openCookieSettings}
              className="text-neutral-400 hover:text-[color:var(--vd-9ce607)] transition-colors cursor-pointer underline-offset-4 hover:underline"
            >
              {t.footer.cookieSettings}
            </button>
          </div>
        </div>

        {/* ================================================================= */}
        {/* TIER 3: CENTERED GIANT BOTTOM VDigital. LOGOTYPE                  */}
        {/* ================================================================= */}
        <div
          role="img"
          aria-label="VDigital"
          title="VDigital"
          className="w-full pt-2 pb-4 sm:pb-6 flex justify-center items-center select-none overflow-visible"
        >
          <div
            className="font-geist font-bold tracking-[-0.045em] leading-[1.12] py-2 text-center whitespace-nowrap"
            style={{
              fontSize: 'clamp(4rem, 16.5vw, 14.5rem)',
            }}
          >
            <span className="text-[color:var(--vd-9ce607)] drop-shadow-[0_0_28px_color-mix(in_srgb,var(--vd-9ce607)_28%,transparent)]">
              V
            </span>
            <span className="text-white">Digital</span>
            <span className="text-[color:var(--vd-9ce607)] drop-shadow-[0_0_24px_color-mix(in_srgb,var(--vd-9ce607)_40%,transparent)]">
              .
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
