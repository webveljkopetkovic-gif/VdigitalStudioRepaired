import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';
import {
  getAboutPath,
  getContactPath,
  getHomePath,
  getServicePath,
  ServiceSlug,
  useI18n,
} from '../i18n';
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
    contactPath,
    aboutPath,
    getEquivalentPath,
    isContactPage,
    isAboutPage,
    isServicePage,
    isPrivacyPage,
    isNotFoundPage,
  } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const isSubPage = isContactPage || isAboutPage || isServicePage || isPrivacyPage || isNotFoundPage;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setDropdownOpen(true);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 180);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

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
        {/* Left: VDigital. Brand Logotype combining #9ce607 and white */}
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
          className="hidden md:flex items-center justify-center justify-self-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 gap-6 lg:gap-8 text-[13px] font-geist whitespace-nowrap"
        >
          {/* 1. Usluge with Dropdown Menu */}
          <div
            className="relative"
            onMouseEnter={handleDropdownEnter}
            onMouseLeave={handleDropdownLeave}
          >
            <button
              type="button"
              onClick={() => {
                if (isSubPage) {
                  scrollToSection('services');
                } else {
                  setDropdownOpen((prev) => !prev);
                }
              }}
              className={`transition-colors cursor-pointer relative py-1 text-[13px] font-normal inline-flex items-center gap-1.5 focus:outline-none ${
                isServicePage
                  ? 'text-white font-medium'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <span>{t.navbar.links.services}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  dropdownOpen ? 'rotate-180 text-[#9ce607]' : 'text-neutral-500'
                }`}
              />
              {isServicePage && (
                <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#a8f300] rounded-full" />
              )}
            </button>

            {/* Dropdown Container */}
            {dropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-[18px] bg-[#0c0e12]/95 border border-white/15 p-2 shadow-[0_16px_40px_rgba(0,0,0,0.85)] backdrop-blur-xl z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-[0.2em] text-[#9ce607] border-b border-white/[0.08] mb-1">
                  {t.navbar.dropdown.servicesTitle}
                </div>
                {serviceLinks.map((service) => (
                  <a
                    key={service.slug}
                    href={service.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setDropdownOpen(false);
                      navigate(service.href);
                    }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-[12px] text-[13px] transition-colors ${
                      location.pathname === service.href
                        ? 'bg-[#9ce607]/15 text-[#9ce607] font-medium'
                        : 'text-neutral-300 hover:text-white hover:bg-white/[0.06]'
                    }`}
                  >
                    <span>{service.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* 2. Proces (#process) */}
          <a
            href={isSubPage ? `${homePath}#process` : '#process'}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('process');
            }}
            className="text-neutral-400 hover:text-white transition-colors cursor-pointer relative py-1 text-[13px] font-normal"
          >
            {t.navbar.links.process}
          </a>

          {/* 3. O nama (about page) */}
          <a
            href={aboutPath}
            onClick={(e) => {
              e.preventDefault();
              navigate(aboutPath);
            }}
            className={`transition-colors cursor-pointer relative py-1 text-[13px] font-normal ${
              isAboutPage
                ? 'text-white font-medium'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {t.navbar.links.about}
            {isAboutPage && (
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#a8f300] rounded-full" />
            )}
          </a>

          {/* 4. Kontakt (contact page) */}
          <a
            href={contactPath}
            onClick={(e) => {
              e.preventDefault();
              navigate(contactPath);
            }}
            className={`transition-colors cursor-pointer relative py-1 text-[13px] font-normal ${
              isContactPage
                ? 'text-white font-medium'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            {t.navbar.links.contact}
            {isContactPage && (
              <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#a8f300] rounded-full" />
            )}
          </a>
        </nav>

        {/* Right: Language Switcher (EN · SR · RU) + CTA Button "Book a call" + Mobile Menu Trigger */}
        <div className="flex items-center justify-end justify-self-end md:col-start-3 gap-3 sm:gap-5">
          {/* Language Switcher with real <a href> links linking to equivalent pages */}
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
              trackBookCallClick('navbar');
              if (onBookCall) {
                onBookCall();
              } else {
                navigate(contactPath);
              }
            }}
            className="hidden sm:inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-white/20 bg-neutral-900/60 hover:bg-neutral-800/90 text-white text-[12px] font-medium tracking-tight transition-all duration-200 hover:border-white/40 cursor-pointer shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
          >
            <span>{t.navbar.cta}</span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-0.5 text-[#9ce607]"
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
        <div className="md:hidden mt-3 rounded-[20px] bg-[#0c0e12]/98 border border-white/15 p-5 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col space-y-4 text-[14px]">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#9ce607]">
                {t.navbar.links.services}
              </span>
              <div className="mt-2 pl-2 border-l border-white/10 space-y-2">
                {serviceLinks.map((s) => (
                  <a
                    key={s.slug}
                    href={s.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      navigate(s.href);
                    }}
                    className={`block py-1 text-[13px] ${
                      location.pathname === s.href
                        ? 'text-[#9ce607] font-semibold'
                        : 'text-neutral-300 hover:text-white'
                    }`}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href={isSubPage ? `${homePath}#process` : '#process'}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('process');
              }}
              className="text-neutral-300 hover:text-white py-1"
            >
              {t.navbar.links.process}
            </a>

            <a
              href={aboutPath}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigate(aboutPath);
              }}
              className={`py-1 ${
                isAboutPage
                  ? 'text-[#9ce607] font-semibold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              {t.navbar.links.about}
            </a>

            <a
              href={contactPath}
              onClick={(e) => {
                e.preventDefault();
                setMobileMenuOpen(false);
                navigate(contactPath);
              }}
              className={`py-1 ${
                isContactPage
                  ? 'text-[#9ce607] font-semibold'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              {t.navbar.links.contact}
            </a>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <a
                href={contactPath}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileMenuOpen(false);
                  navigate(contactPath);
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#9ce607] text-neutral-950 font-semibold text-[13px]"
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
