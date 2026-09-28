import React, { useEffect, useState } from 'react';

export const Preloader: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  useEffect(() => {
    setMounted(true);
    const duration = 1100; // 0 -> 100% fill duration in ms
    const startTime = performance.now();
    let rafId: number;
    let exitTimeout: ReturnType<typeof setTimeout>;
    let removeTimeout: ReturnType<typeof setTimeout>;

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
          }, 420);
        }, 140);
      }
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(exitTimeout);
      clearTimeout(removeTimeout);
    };
  }, []);

  if (!mounted || isRemoved) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-[#060709] select-none pointer-events-none transition-opacity duration-400 ease-out ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div
        className={`relative inline-flex items-baseline font-geist text-[46px] sm:text-[64px] md:text-[76px] font-bold tracking-[-0.04em] leading-none transition-transform duration-400 ease-out ${
          isExiting ? 'scale-[1.04]' : 'scale-100'
        }`}
        style={{
          opacity: Math.max(0.15, progress / 100),
        }}
      >
        <span className="inline-flex items-baseline">
          <span className="text-[#9ce607] drop-shadow-[0_0_18px_rgba(156,230,7,0.45)]">
            V
          </span>
          <span className="text-white">Digital</span>
          <span className="text-[#9ce607] drop-shadow-[0_0_14px_rgba(156,230,7,0.6)]">
            .
          </span>
        </span>
      </div>
    </div>
  );
};
