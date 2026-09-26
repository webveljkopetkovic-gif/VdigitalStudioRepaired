import React, { useState } from 'react';
import { SHOW_PROJECTS } from '../config';
import { useI18n } from '../i18n';

interface HeaderNavbarProps {
  onBookCall?: () => void;
}

export const HeaderLogo: React.FC<HeaderNavbarProps> = ({ onBookCall }) => {
  const { locale, t } = useI18n();
  const [activeTab, setActiveTab] = useState<string>('');

  const navItems = [
    { label: t.navbar.links.services, id: 'services', href: '#services' },
    { label: t.navbar.links.process, id: 'process', href: '#process' },
    ...(SHOW_PROJECTS
      ? [{ label: t.navbar.links.projects, id: 'projects', href: '#projects' }]
      : []),
    { label: t.navbar.links.team, id: 'team', href: '#team' },
    { label: t.navbar.links.pricing, id: 'pricing', href: '#pricing' },
    { label: t.navbar.links.faq, id: 'faq', href: '#faq' },
    { label: t.navbar.links.contact, id: 'contact', href: '#contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const languages: { code: 'en' | 'sr' | 'ru'; label: string; href: string }[] = [
    { code: 'en', label: 'EN', href: '/' },
    { code: 'sr', label: 'SR', href: '/sr/' },
    { code: 'ru', label: 'RU', href: '/ru/' },
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
            href="#top"
            id="agency-brand-logo"
            onClick={(e) => {
              e.preventDefault();
              setActiveTab('');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="group inline-flex items-baseline font-geist text-[20px] sm:text-[22px] font-bold tracking-[-0.04em] leading-none cursor-pointer transition-transform duration-200 hover:scale-[1.02] focus:outline-none"
            title="VDigital. Home"
            aria-label="VDigital. Home"
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
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab(item.id);
                  scrollToSection(item.id);
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
                  className={`transition-colors ${
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
            href="#contact"
            id="btn-hire-agency"
            onClick={(e) => {
              e.preventDefault();
              if (onBookCall) {
                onBookCall();
              } else {
                scrollToSection('contact');
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
