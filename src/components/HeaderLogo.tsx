import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SHOW_PROJECTS } from '../config';
import {
  getContactPath,
  getHomePath,
  useI18n,
} from '../i18n';

interface HeaderNavbarProps {
  onBookCall?: () => void;
}

export const HeaderLogo: React.FC<HeaderNavbarProps> = ({ onBookCall }) => {
  const { locale, t, selectLocale, homePath, contactPath, isContactPage } = useI18n();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(isContactPage ? 'contact' : '');

  const navItems = [
    { label: t.navbar.links.services, id: 'services', href: isContactPage ? `${homePath}#services` : '#services', isRoute: false },
    { label: t.navbar.links.process, id: 'process', href: isContactPage ? `${homePath}#process` : '#process', isRoute: false },
    ...(SHOW_PROJECTS
      ? [{ label: t.navbar.links.projects, id: 'projects', href: isContactPage ? `${homePath}#projects` : '#projects', isRoute: false }]
      : []),
    { label: t.navbar.links.team, id: 'team', href: isContactPage ? `${homePath}#team` : '#team', isRoute: false },
    { label: t.navbar.links.pricing, id: 'pricing', href: isContactPage ? `${homePath}#pricing` : '#pricing', isRoute: false },
    { label: t.navbar.links.faq, id: 'faq', href: isContactPage ? `${homePath}#faq` : '#faq', isRoute: false },
    { label: t.navbar.links.contact, id: 'contact', href: contactPath, isRoute: true },
  ];

  const scrollToSection = (sectionId: string) => {
    if (isContactPage) {
      navigate(homePath);
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

  const languages: { code: 'en' | 'sr' | 'ru'; label: string; href: string }[] = [
    {
      code: 'en',
      label: 'EN',
      href: isContactPage ? getContactPath('en') : getHomePath('en'),
    },
    {
      code: 'sr',
      label: 'SR',
      href: isContactPage ? getContactPath('sr') : getHomePath('sr'),
    },
    {
      code: 'ru',
      label: 'RU',
      href: isContactPage ? getContactPath('ru') : getHomePath('ru'),
    },
  ];

  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-4 sm:pt-6 pb-2 relative z-40 select-none">
      <div
        id="navbar-backdrop-bar"
        className="w-full flex items-center justify-between gap-4"
      >
        {/* Left: VDigital. Brand Logotype combining #9ce607 and white */}
        <div className="flex items-center">
          <a
            href={homePath}
            id="agency-brand-logo"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('');
              if (isContactPage) {
                navigate(homePath);
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="group inline-flex items-baseline font-geist text-[20px] sm:text-[22px] font-bold tracking-[-0.04em] leading-none cursor-pointer transition-transform duration-200 hover:scale-[1.02] focus:outline-none"
            title="VDigital"
            aria-label="VDigital"
          >
            <span className="text-[#9ce607] drop-shadow-[0_0_12px_rgba(156,230,7,0.35)]">
              V
            </span>
            <span className="text-white">Digital</span>
            <span className="text-[#9ce607] drop-shadow-[0_0_10px_rgba(156,230,7,0.5)]">
              .
            </span>
          </a>
        </div>

        {/* Center: Semantic Navigation Links */}
        <nav
          id="desktop-nav"
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-[13px] font-geist"
        >
          {navItems.map((item) => {
            const isActive = isContactPage
              ? item.id === 'contact'
              : activeTab === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                  if (item.isRoute) {
                    navigate(contactPath);
                  } else {
                    scrollToSection(item.id);
                  }
                }}
                className={`transition-colors cursor-pointer relative py-1 text-[13px] font-normal ${
                  isActive
                    ? 'text-white font-medium'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#a8f300] rounded-full" />
                )}
              </a>
            );
          })}
        </nav>

        {/* Right: Language Switcher (EN · SR · RU) + CTA Button "Book a call" */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Language Switcher with real <a href> links */}
          <div
            className="flex items-center gap-1.5 text-[12px] font-geist tracking-tight"
            aria-label="Language switcher"
          >
            {languages.map((lang, idx) => (
              <React.Fragment key={lang.code}>
                <a
                  href={lang.href}
                  onClick={(e) => {
                    e.preventDefault();
                    selectLocale(lang.code);
                  }}
                  className={`transition-colors cursor-pointer ${
                    locale === lang.code
                      ? 'text-[#9ce607] font-semibold'
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

          <a
            href={contactPath}
            id="btn-hire-agency"
            onClick={(e) => {
              e.preventDefault();
              if (onBookCall) {
                onBookCall();
              } else {
                navigate(contactPath);
              }
            }}
            className="group inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-white/20 bg-neutral-900/60 hover:bg-neutral-800/90 text-white text-[12px] font-medium tracking-tight transition-all duration-200 hover:border-white/40 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            <span>{t.navbar.cta}</span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </header>
  );
};
