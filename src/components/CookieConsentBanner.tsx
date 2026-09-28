import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import {
  getConsentChoice,
  OPEN_COOKIE_BANNER_EVENT,
  setConsentChoice,
  updateGtagConsent,
} from '../utils/analytics';

export const CookieConsentBanner: React.FC = () => {
  const { t, privacyPath } = useI18n();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const existingChoice = getConsentChoice();
    if (existingChoice === 'granted') {
      updateGtagConsent('granted');
      setIsVisible(false);
    } else if (existingChoice === 'denied') {
      updateGtagConsent('denied');
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    const handleOpenSettings = () => {
      setIsVisible(true);
    };

    window.addEventListener(OPEN_COOKIE_BANNER_EVENT, handleOpenSettings);
    return () => {
      window.removeEventListener(OPEN_COOKIE_BANNER_EVENT, handleOpenSettings);
    };
  }, []);

  if (!isVisible) {
    return null;
  }

  const handleAccept = () => {
    setConsentChoice('granted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    setConsentChoice('denied');
    setIsVisible(false);
  };

  const handlePrivacyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(privacyPath);
  };

  return (
    <div
      role="region"
      aria-label={t.footer.cookieSettings}
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0px)',
      }}
      className="fixed bottom-4 left-4 right-4 sm:right-auto sm:bottom-6 sm:left-6 z-50 pointer-events-none flex justify-center sm:justify-start"
    >
      <div className="pointer-events-auto w-full sm:max-w-[360px] rounded-[14px] bg-[#111512]/90 backdrop-blur-xl border border-white/[0.12] px-4 py-3.5 shadow-[0_16px_42px_rgba(0,0,0,0.72),inset_0_1px_0_rgba(255,255,255,0.08)] font-geist text-white">
        <p className="text-[12.5px] sm:text-[13px] leading-[1.5] text-neutral-200">
          {t.cookieBanner.text}{' '}
          <a
            href={privacyPath}
            onClick={handlePrivacyClick}
            className="text-neutral-400 hover:text-[#9ce607] underline underline-offset-2 transition-colors whitespace-nowrap"
          >
            {t.cookieBanner.privacyLink}
          </a>
        </p>

        <div className="mt-3 flex items-center gap-2">
          <button
            type="button"
            onClick={handleAccept}
            className="px-3.5 py-1.5 rounded-[8px] bg-[#9ce607] hover:bg-[#abf50a] active:scale-[0.98] text-[#0a0c09] font-geist font-semibold text-[12px] sm:text-[12.5px] tracking-[-0.01em] transition-all cursor-pointer shadow-[0_2px_10px_rgba(156,230,7,0.28)]"
          >
            {t.cookieBanner.accept}
          </button>

          <button
            type="button"
            onClick={handleDecline}
            className="px-3.5 py-1.5 rounded-[8px] bg-white/[0.06] hover:bg-white/[0.12] active:scale-[0.98] border border-white/[0.1] text-neutral-300 hover:text-white font-geist font-medium text-[12px] sm:text-[12.5px] tracking-[-0.01em] transition-all cursor-pointer"
          >
            {t.cookieBanner.decline}
          </button>
        </div>
      </div>
    </div>
  );
};
