import React, { useEffect, useState } from 'react';
import { X, Play, ShieldCheck } from 'lucide-react';
import {
  acceptCategoryConsent,
  CONSENT_UPDATED_EVENT,
  hasMarketingConsent,
  openCookieSettings,
} from '../utils/analytics';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  youtubeId?: string;
}

export const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  youtubeId = 'dQw4w9WgXcQ',
}) => {
  const [marketingAllowed, setMarketingAllowed] = useState<boolean>(() =>
    hasMarketingConsent()
  );
  const [userClickedPlay, setUserClickedPlay] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const sync = () => setMarketingAllowed(hasMarketingConsent());
    sync();
    window.addEventListener(CONSENT_UPDATED_EVENT, sync);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, sync);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      setUserClickedPlay(false);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const canRenderIframe = userClickedPlay && marketingAllowed;

  const handleActivateVideo = () => {
    if (!marketingAllowed) {
      acceptCategoryConsent('marketing');
      setMarketingAllowed(true);
    }
    setUserClickedPlay(true);
  };

  return (
    <div
      id="video-showreel-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-neutral-950 border border-white/15 rounded-2xl overflow-hidden shadow-2xl shadow-black"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-neutral-900/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#a8f300] animate-pulse" />
            <h3 className="text-sm font-geist font-medium text-white">
              Agency Showreel 2026 • Concepts &amp; Branding
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Click-to-load YouTube-nocookie container (only inserted after click + marketing consent) */}
        <div className="relative aspect-video w-full bg-neutral-900 flex items-center justify-center overflow-hidden group">
          {canRenderIframe ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${encodeURIComponent(
                youtubeId
              )}?autoplay=1&rel=0`}
              title="VDigital Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <>
              <div className="absolute inset-0 bg-gradient-to-tr from-black via-neutral-900 to-[#162e03]/60 opacity-90" />

              <div className="relative z-10 flex flex-col items-center gap-4 text-center px-6 max-w-md">
                <button
                  type="button"
                  onClick={handleActivateVideo}
                  aria-label="Play video"
                  className="w-16 h-16 rounded-full bg-[#a8f300] text-black flex items-center justify-center shadow-lg shadow-[#a8f300]/30 hover:scale-105 transition-transform cursor-pointer"
                >
                  <Play className="w-7 h-7 fill-current ml-1" />
                </button>
                <div>
                  <p className="text-lg font-geist font-semibold text-white">
                    Striking Concepts &amp; Digital Innovation
                  </p>
                  <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed">
                    This video is hosted on YouTube (youtube-nocookie.com). Clicking play enables marketing/external media embeds.
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2.5 mt-1">
                  <button
                    type="button"
                    onClick={handleActivateVideo}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#9ce607] hover:bg-[#abf50a] text-[#0a0c09] font-geist font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Accept &amp; load video</span>
                  </button>
                  <button
                    type="button"
                    onClick={openCookieSettings}
                    className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-neutral-200 font-geist font-medium text-xs transition-colors cursor-pointer"
                  >
                    Cookie settings
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
