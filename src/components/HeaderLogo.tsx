import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useI18n } from '../i18n';
import { trackBookCallClick } from '../utils/analytics';

interface HeaderNavbarProps {
  onBookCall?: () => void;
}

export const HeaderLogo: React.FC<HeaderNavbarProps> = ({ onBookCall }) => {
  const {
    locale,
    t,
    selectLocale,
    homePath,
    getEquivalentPath,
    isContactPage,
    isAboutPage,
    isServicePage,
    isPrivacyPage,
    isNotFoundPage,
  } = useI18n();
  const navigate = useNavigate();
  const isSubPage = isContactPage || isAboutPage || isServicePage || isPrivacyPage || isNotFoundPage;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (isSubPage) {
      navigate(`${homePath}#${sectionId}`);
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
      return;
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackBookCallClick('navbar');
    if (onBookCall) {
      onBookCall();
    } else {
      scrollToSection('contact');
    }
  };

  const navItems = [
    { id: 'services', label: t.navbar.links.services },
    { id: 'process', label: t.navbar.links.process },
    { id: 'pricing', label: t.navbar.links.pricing },
    { id: 'team', label: t.navbar.links.about },
    { id: 'faq', label: t.navbar.links.faq },
    { id: 'contact', label: t.navbar.links.contact },
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
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6 pb-2 relative z-50 select-none font-geist">
      <div
        id="navbar-backdrop-bar"
        className="relative w-full flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] gap-4"
      >
        {/* Left: VDigital Brand Logotype */}
        <div className="flex items-center justify-self-start">
          <a
            href={homePath}
            id="agency-brand-logo"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              if (isSubPage) {
                navigate(homePath);
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="group inline-flex items-baseline font-geist text-[20px] sm:text-[22px] font-bold tracking-[-0.04em] leading-none cursor-pointer transition-transform duration-200 hover:scale-[1.02] focus:outline-none"
            title="VDigital"
            aria-label="VDigital"
          >
            <span className="text-[color:var(--vd-9ce607)] drop-shadow-[0_0_12px_color-mix(in_srgb,var(--vd-9ce607)_35%,transparent)]">
              V
            </span>
            <span className="text-white">Digital</span>
            <span className="text-[color:var(--vd-9ce607)] drop-shadow-[0_0_10px_color-mix(in_srgb,var(--vd-9ce607)_50%,transparent)]">
              .
            </span>
          </a>
        </div>

        {/* Center: Scroll-only Anchor Links to Landing Page Sections */}
        <nav
          id="desktop-nav"
          aria-label="Primary navigation"
          className="hidden md:flex items-center justify-center justify-self-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 gap-6 lg:gap-8 text-[13px] font-geist whitespace-nowrap"
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={isSubPage ? `${homePath}#${item.id}` : `#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className="text-neutral-400 hover:text-white transition-colors cursor-pointer relative py-1 text-[13px] font-normal"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right: Language Switcher (EN · SR · RU) + CTA Button + Mobile Menu Trigger */}
        <div className="flex items-center justify-end justify-self-end md:col-start-3 gap-3 sm:gap-5">
          {/* Language Switcher */}
          <div
            className="flex items-center gap-1.5 text-[12px] font-geist tracking-tight"
            aria-label="Language switcher"
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
                  <span className="text-neutral-600 select-none" aria-hidden="true">
                    ·
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* CTA Button -> scrolls to #contact on landing page */}
          <a
            href={isSubPage ? `${homePath}#contact` : '#contact'}
            id="btn-hire-agency"
            onClick={handleCtaClick}
            className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-white/20 bg-neutral-900/60 hover:bg-neutral-800/90 text-white text-[12px] font-medium tracking-tight transition-all duration-200 hover:border-white/40 cursor-pointer shadow-[0_2px_10px_color-mix(in_srgb,var(--vd-000000)_50%,transparent)]"
          >
            <span>{t.navbar.cta}</span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-0.5 text-[color:var(--vd-9ce607)]"
              aria-hidden="true"
            >
              →
            </span>
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-3 rounded-[20px] bg-[color:var(--vd-0c0e12)]/98 border border-white/15 p-5 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col space-y-3 text-[14px]">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={isSubPage ? `${homePath}#${item.id}` : `#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="text-neutral-300 hover:text-white py-1.5 transition-colors"
              >
                {item.label}
              </a>
            ))}

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <a
                href={isSubPage ? `${homePath}#contact` : '#contact'}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleCtaClick(e);
                }}
                className="w-full justify-center inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[color:var(--vd-9ce607)] text-neutral-950 font-semibold text-[13px] transition-transform active:scale-95"
              >
                <span>{t.navbar.cta}</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
