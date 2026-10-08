import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    let allowShow = false;
    try {
      const ua = (typeof navigator !== 'undefined' ? navigator.userAgent : '') || '';
      const isBot = /bot|crawler|spider|crawling|googlebot|bingbot|yandex|duckduckbot|slurp|baiduspider/i.test(ua);
      const reducedMotion =
        typeof window !== 'undefined' &&
        window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const seen = typeof sessionStorage !== 'undefined' && sessionStorage.getItem('vd_preloader_seen');

      if (!isBot && !reducedMotion && !seen) {
        sessionStorage.setItem('vd_preloader_seen', 'true');
        allowShow = true;
      }
    } catch {
      allowShow = false;
    }

    setMounted(true);

    if (!allowShow) {
      setIsRemoved(true);
      return;
    }

    setShow(true);

    const duration = 380; // duration to 100% in ms
    const startTime = performance.now();
    let rafId: number;
    let exitTimeout: ReturnType<typeof setTimeout>;
    let removeTimeout: ReturnType<typeof setTimeout>;

    // Hard ceiling guarantee at 600ms total
    const maxTimeout = setTimeout(() => {
      setIsRemoved(true);
    }, 600);

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      const easedProgress = Math.round(easeOutCubic(rawProgress) * 100);

      setProgress(easedProgress);

      if (rawProgress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        exitTimeout = setTimeout(() => {
          setIsExiting(true);
          removeTimeout = setTimeout(() => {
            setIsRemoved(true);
          }, 180);
        }, 40);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(exitTimeout);
      clearTimeout(removeTimeout);
      clearTimeout(maxTimeout);
    };
  }, []);

  if (!mounted || !show || isRemoved) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[color:var(--vd-060709)] select-none pointer-events-none transition-opacity duration-200 ease-out ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className={`relative inline-flex items-baseline font-geist text-[46px] sm:text-[64px] md:text-[76px] font-bold tracking-[-0.04em] leading-none transition-transform duration-200 ease-out ${
          isExiting ? 'scale-[1.04]' : 'scale-100'
        }`}
        style={{
          opacity: Math.max(0.15, progress / 100),
        }}
      >
        <span className="inline-flex items-baseline">
          <span className="text-[color:var(--vd-9ce607)] drop-shadow-[0_0_18px_color-mix(in_srgb,var(--vd-9ce607)_45%,transparent)]">
            V
          </span>
          <span className="text-white">Digital</span>
          <span className="text-[color:var(--vd-9ce607)] drop-shadow-[0_0_14px_color-mix(in_srgb,var(--vd-9ce607)_60%,transparent)]">
            .
          </span>
        </span>
      </div>
    </div>
  );
};
