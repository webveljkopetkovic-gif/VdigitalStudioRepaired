import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { getContactPath, I18nProvider, ServiceSlug, SupportedLocale } from './i18n';
import { HeaderLogo } from './components/HeaderLogo';
import PricingSection from './components/PricingSection';
import { ContactSection } from './components/ContactSection';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { ServicePage } from './components/ServicePage';
import { PrivacyPage } from './components/PrivacyPage';
import { NotFoundPage } from './components/NotFoundPage';
import { LandingHero, LandingBand, LandingStats, LandingStory, LandingServices, LandingProblems, LandingProcess, LandingIndustries, LandingTeam, LandingFAQ } from './components/LandingSections';
import { Footer } from './components/Footer';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FloatingChatButton } from './components/FloatingChatButton';
import { LanguageSuggestionBanner } from './components/LanguageSuggestionBanner';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { Preloader } from './components/Preloader';
import { useYandexMetrica } from './hooks/useYandexMetrica';
import { Analytics } from '@vercel/analytics/react';
import { useCinematicMotion } from './hooks/useCinematicMotion';

const LandingPageContent: React.FC<{ locale: SupportedLocale }> = ({ locale }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inquiryMessage, setInquiryMessage] = useState('');
  const contactPath = getContactPath(locale);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handlePricingRequest = (summary: string) => {
    setInquiryMessage(summary);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && location.hash) {
      const id = location.hash.replace(/^#/, '');
      if (id) {
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 80);
      }
    }
  }, [location.hash]);

  return (
    <I18nProvider locale={locale}>
      <div className="lp min-h-screen w-full relative flex flex-col overflow-x-clip">
        <main id="main-viewport" className="w-full flex flex-col">
          {/* Hero + navbar */}
          <section id="top" aria-label="Hero" className="relative">
            <HeaderLogo onBookCall={scrollToContact} />
            <LandingHero />
          </section>
          <LandingBand />
          <LandingStats />
          <LandingStory />
          <LandingServices />
          <LandingProblems />
          <LandingProcess />
          <LandingIndustries />
          <TestimonialsSection />
          <PricingSection lang={locale} onRequest={handlePricingRequest} />
          <LandingTeam />
          <LandingFAQ />
          <ContactSection initialMessage={inquiryMessage} />
        </main>

        <Footer />
        <FloatingChatButton />
        <LanguageSuggestionBanner />
        <CookieConsentBanner />
      </div>
    </I18nProvider>
  );
};

const AboutPageRoute: React.FC<{ locale: SupportedLocale }> = ({ locale }) => (
  <I18nProvider locale={locale}>
    <AboutPage />
    <LanguageSuggestionBanner />
    <CookieConsentBanner />
  </I18nProvider>
);

const ServicePageRoute: React.FC<{ locale: SupportedLocale; slug: ServiceSlug }> = ({
  locale,
  slug,
}) => (
  <I18nProvider locale={locale}>
    <ServicePage slug={slug} />
    <LanguageSuggestionBanner />
    <CookieConsentBanner />
  </I18nProvider>
);

const ContactPageRoute: React.FC<{ locale: SupportedLocale }> = ({ locale }) => (
  <I18nProvider locale={locale}>
    <ContactPage />
    <LanguageSuggestionBanner />
    <CookieConsentBanner />
  </I18nProvider>
);

const PrivacyPageRoute: React.FC<{ locale: SupportedLocale }> = ({ locale }) => (
  <I18nProvider locale={locale}>
    <PrivacyPage />
    <LanguageSuggestionBanner />
    <CookieConsentBanner />
  </I18nProvider>
);

const NotFoundPageRoute: React.FC<{ forcedLocale?: SupportedLocale }> = ({
  forcedLocale,
}) => {
  const location = useLocation();
  const path = location.pathname.toLowerCase();
  const locale: SupportedLocale =
    forcedLocale ||
    (path === '/en' || path.startsWith('/en/')
      ? 'en'
      : path === '/ru' || path.startsWith('/ru/')
        ? 'ru'
        : path === '/sr' || path.startsWith('/sr/')
          ? 'sr'
          : 'sr');

  return (
    <I18nProvider locale={locale}>
      <NotFoundPage />
      <LanguageSuggestionBanner />
      <CookieConsentBanner />
    </I18nProvider>
  );
};

export default function App() {
  useYandexMetrica();
  const { pathname } = useLocation();
  useCinematicMotion(pathname);

  return (
    <>
      <Preloader />
      <Routes>
        {/* Home */}
        <Route path="/" element={<LandingPageContent locale="en" />} />
        <Route path="/sr" element={<LandingPageContent locale="sr" />} />
        <Route path="/ru" element={<LandingPageContent locale="ru" />} />

        {/* About */}
        <Route path="/about" element={<AboutPageRoute locale="en" />} />
        <Route path="/sr/o-nama" element={<AboutPageRoute locale="sr" />} />
        <Route path="/ru/o-nas" element={<AboutPageRoute locale="ru" />} />

        {/* Services - SR */}
        <Route
          path="/sr/usluge/izrada-sajtova"
          element={<ServicePageRoute locale="sr" slug="web-development" />}
        />
        <Route
          path="/sr/usluge/video-i-drustvene-mreze"
          element={<ServicePageRoute locale="sr" slug="video-social-media" />}
        />
        <Route
          path="/sr/usluge/marketing-i-automatizacija"
          element={<ServicePageRoute locale="sr" slug="marketing-automation" />}
        />
        <Route
          path="/sr/usluge/hladni-pozivi"
          element={<ServicePageRoute locale="sr" slug="cold-calling" />}
        />

        {/* Services - EN */}
        <Route
          path="/services/web-development"
          element={<ServicePageRoute locale="en" slug="web-development" />}
        />
        <Route
          path="/services/video-social-media"
          element={<ServicePageRoute locale="en" slug="video-social-media" />}
        />
        <Route
          path="/services/marketing-automation"
          element={<ServicePageRoute locale="en" slug="marketing-automation" />}
        />
        <Route
          path="/services/cold-calling"
          element={<ServicePageRoute locale="en" slug="cold-calling" />}
        />

        {/* Services - RU */}
        <Route
          path="/ru/uslugi/sozdanie-sajtov"
          element={<ServicePageRoute locale="ru" slug="web-development" />}
        />
        <Route
          path="/ru/uslugi/video-i-socseti"
          element={<ServicePageRoute locale="ru" slug="video-social-media" />}
        />
        <Route
          path="/ru/uslugi/marketing-i-avtomatizaciya"
          element={<ServicePageRoute locale="ru" slug="marketing-automation" />}
        />
        <Route
          path="/ru/uslugi/holodnye-zvonki"
          element={<ServicePageRoute locale="ru" slug="cold-calling" />}
        />

        {/* Contact */}
        <Route path="/contact" element={<ContactPageRoute locale="en" />} />
        <Route path="/sr/kontakt" element={<ContactPageRoute locale="sr" />} />
        <Route path="/ru/kontakty" element={<ContactPageRoute locale="ru" />} />

        {/* Privacy */}
        <Route path="/privacy" element={<PrivacyPageRoute locale="en" />} />
        <Route path="/sr/privatnost" element={<PrivacyPageRoute locale="sr" />} />
        <Route path="/ru/konfidencialnost" element={<PrivacyPageRoute locale="ru" />} />

        {/* 404 Not Found */}
        <Route path="/sr/*" element={<NotFoundPageRoute forcedLocale="sr" />} />
        <Route path="/en/*" element={<NotFoundPageRoute forcedLocale="en" />} />
        <Route path="/ru/*" element={<NotFoundPageRoute forcedLocale="ru" />} />
        <Route path="*" element={<NotFoundPageRoute />} />
      </Routes>
      <Analytics />
    </>
  );
}
