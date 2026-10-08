import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { getContactPath, I18nProvider, ServiceSlug, SupportedLocale } from './i18n';
import { HeaderLogo } from './components/HeaderLogo';
import { HeroTypography } from './components/HeroTypography';
import { KineticCarouselText } from './components/KineticCarouselText';
import { SunburstRays } from './components/SunburstRays';
import { HeroCTAButtons } from './components/HeroCTAButtons';
import { TrustBar } from './components/TrustBar';
import { WordByWordStatement } from './components/WordByWordStatement';
import { PainPointsSection } from './components/PainPointsSection';
import { StickyServicesSection } from './components/StickyServicesSection';
import { WorkflowPlan } from './components/WorkflowPlan';
import { TeamLeadershipSection } from './components/TeamLeadershipSection';
import { FoundingClientsSection } from './components/FoundingClientsSection';
import { RevenueCTASection } from './components/RevenueCTASection';
import { FAQSection } from './components/FAQSection';
import { ContactSection } from './components/ContactSection';
import { ContactPage } from './components/ContactPage';
import { AboutPage } from './components/AboutPage';
import { ServicePage } from './components/ServicePage';
import { PrivacyPage } from './components/PrivacyPage';
import { NotFoundPage } from './components/NotFoundPage';
import { Footer } from './components/Footer';
import { FloatingChatButton } from './components/FloatingChatButton';
import { LanguageSuggestionBanner } from './components/LanguageSuggestionBanner';
import { CookieConsentBanner } from './components/CookieConsentBanner';
import { Preloader } from './components/Preloader';
import { useYandexMetrica } from './hooks/useYandexMetrica';
import { Analytics } from '@vercel/analytics/react';

const LandingPageContent: React.FC<{ locale: SupportedLocale }> = ({ locale }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const contactPath = getContactPath(locale);

  const goToContactPage = () => {
    navigate(contactPath);
  };

  const scrollToProcess = () => {
    document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
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
      <div className="min-h-screen w-full bg-[color:var(--vd-060709)] text-white selection:bg-[color:var(--vd-a8f300)] selection:text-black relative flex flex-col overflow-x-clip scroll-smooth">
        <main id="main-viewport" className="w-full flex flex-col">
          {/* 1 & 2 & 3. Navbar + Hero (#top) + Trust Bar (#trust) */}
          <section
            id="top"
            aria-label="Hero"
            className="relative h-screen h-[100vh] h-dvh min-h-screen max-h-screen w-full flex flex-col justify-between overflow-hidden pb-4 sm:pb-6 lg:pb-8"
          >
            {/* 1. Navbar */}
            <HeaderLogo onBookCall={goToContactPage} />

            {/* 2. Centerpiece Area: Volumetric 'creative/modern/digital', Sunburst, 4-Line Headline & Side Texts */}
            <div className="relative flex-1 flex flex-col justify-center items-center w-full my-auto py-4 sm:py-6 overflow-visible">
              <div className="absolute top-[38%] sm:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] sm:w-[850px] sm:h-[850px] md:w-[1000px] md:h-[1000px] lg:w-[1100px] lg:h-[1100px] pointer-events-none z-0">
                <SunburstRays className="w-full h-full" />
              </div>

              <KineticCarouselText />

              <div className="relative z-10 w-full">
                <HeroTypography pairingMode="curated" />
              </div>
            </div>

            {/* 3. Lower Tier: Hero CTAs + Trust Bar (#trust) */}
            <div className="relative z-20 w-full flex flex-col items-center mt-1 sm:mt-2">
              <HeroCTAButtons
                onPrimaryClick={goToContactPage}
                onSecondaryClick={scrollToProcess}
              />

              <TrustBar />
            </div>
          </section>

          {/* 4. Statement (#statement) */}
          <WordByWordStatement onExplore={goToContactPage} />

          {/* 5. Pain Points (#problems) */}
          <PainPointsSection />

          {/* 6. Services (#services) */}
          <StickyServicesSection onBookCall={goToContactPage} />

          {/* 7. Process (#process) */}
          <WorkflowPlan />

          {/* 8. Team (#team) */}
          <TeamLeadershipSection />

          {/* 9. Founding Clients (#founding) */}
          <FoundingClientsSection />

          {/* 10. How We Work (#pricing) */}
          <RevenueCTASection />

          {/* 11. FAQ (#faq) */}
          <FAQSection />

          {/* 12. Contact (#contact) */}
          <ContactSection />
        </main>

        {/* 13. Footer */}
        <Footer />

        {/* Floating Chat Button (WhatsApp on / and /sr, Telegram on /ru) */}
        <FloatingChatButton />

        {/* Non-intrusive Language Suggestion Banner (client-side only, after hydration) */}
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
