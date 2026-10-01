import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { useI18n } from '../i18n';

const VERTICAL_SLATS = [
  0.006, 0.01, 0.014, 0.018, 0.024, 0.032, 0.045, 0.065, 0.095, 0.14,
  0.2, 0.28, 0.38, 0.5, 0.64, 0.78, 0.9, 1.0,
];

export const RevenueCTASection: React.FC = () => {
  const { t } = useI18n();
  const shouldReduceMotion = useReducedMotion();
  const isSSR = typeof window === 'undefined';

  const cards = [
    {
      id: 'fixed-price',
      text: t.howWeWork.card1,
      renderIcon: () => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-[#0a0c09]"
        >
          <path d="M7.5 8.5L12 10.8L12 16.2L7.5 13.9L7.5 8.5Z" />
          <path d="M7.5 8.5L12 6.2L16.5 8.5L12 10.8L7.5 8.5Z" />
          <path d="M12 11.8L16.5 9.5L20 11.3V16.5L15.5 18.8L12 17V11.8Z" />
          <path d="M12 11.8L15.5 13.6L20 11.3" />
          <path d="M15.5 13.6V18.8" />
          <path d="M4.5 12.5L7.5 14" />
          <path d="M4.5 10L7.5 11.5" />
        </svg>
      ),
    },
    {
      id: 'revenue-share',
      text: t.howWeWork.card2,
      renderIcon: () => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-[#0a0c09]"
        >
          <line x1="5" y1="9" x2="19" y2="9" />
          <circle cx="4.5" cy="9" r="1" fill="currentColor" />
          <circle cx="19.5" cy="9" r="1" fill="currentColor" />
          <polygon points="12,7.2 14,9 12,10.8 10,9" />
          <path d="M10.5 10.2L7.8 14.2" />
          <path d="M13.5 10.2L16.2 14.2" />
          <circle cx="7.2" cy="15.5" r="1.6" />
          <circle cx="16.8" cy="15.5" r="1.6" />
        </svg>
      ),
    },
    {
      id: 'hybrid',
      text: t.howWeWork.card3,
      renderIcon: () => (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-[#0a0c09]"
        >
          <ellipse cx="13.5" cy="7.5" rx="2.2" ry="1.4" transform="rotate(-15 13.5 7.5)" />
          <ellipse cx="16.2" cy="10.2" rx="2.2" ry="1.4" transform="rotate(12 16.2 10.2)" />
          <path d="M4.5 15.5H7.5V19H4.5V15.5Z" />
          <path d="M7.5 15.8C8.8 15.8 10.2 14.8 12.2 14.8H15.2C16 14.8 16.6 15.3 16.6 16C16.6 16.6 16.1 17.1 15.3 17.2L12.5 17.4" />
          <path d="M7.5 18.5H14.8C16.4 18.5 18.2 17.6 19.3 16.3C19.8 15.7 19.7 14.9 19 14.6C18.4 14.3 17.6 14.6 16.8 15.3" />
        </svg>
      ),
    },
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="pricing"
      className="relative w-full bg-[#040506] text-white py-24 sm:py-32 lg:py-40 px-4 sm:px-8 lg:px-12 overflow-hidden select-none border-t border-white/[0.06]"
    >
      {/* ===================================================================== */}
      {/* ANIMATED #9ce607 3D RIBBED VERTICAL LOUVER / SLAT BACKGROUND           */}
      {/* ===================================================================== */}
      <div
        className="absolute inset-0 pointer-events-none flex w-full h-full z-0 overflow-hidden"
        aria-hidden="true"
      >
        <motion.div
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  opacity: [0.35, 0.7, 0.35],
                  scale: [1, 1.08, 1],
                  x: ['0%', '-4%', '0%'],
                }
          }
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute -right-[10%] top-0 bottom-0 w-[65%] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 85% 50%, rgba(156, 230, 7, 0.42) 0%, rgba(156, 230, 7, 0.16) 45%, transparent 75%)',
            filter: 'blur(70px)',
          }}
        />

        {VERTICAL_SLATS.map((intensity, idx) => {
          const isAnimatedZone = idx >= 6;
          const leftStopAlpha = Math.max(0, intensity * 0.26);
          const midStopAlpha = Math.max(0, intensity * 0.68);
          const peakStopAlpha = intensity;
          const waveDelay = (VERTICAL_SLATS.length - 1 - idx) * 0.18;

          return (
            <div
              key={idx}
              className="flex-1 h-full relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(90deg, rgba(4, 5, 6, 1) 0%, rgba(8, 12, 6, 1) 92%, rgba(2, 3, 4, 1) 100%)',
                borderRight:
                  idx >= 9
                    ? '1px solid rgba(0, 0, 0, 0.72)'
                    : '1px solid rgba(255, 255, 255, 0.014)',
              }}
            >
              <motion.div
                initial={false}
                animate={
                  shouldReduceMotion || !isAnimatedZone
                    ? { opacity: 0.85 }
                    : {
                        opacity: [0.42, 1, 0.42],
                      }
                }
                transition={{
                  duration: 3.6,
                  repeat: Infinity,
                  delay: waveDelay,
                  ease: 'easeInOut',
                }}
                className="absolute inset-0 w-full h-full"
                style={{
                  background: `linear-gradient(90deg, 
                    rgba(6, 10, 4, 0.96) 0%, 
                    rgba(156, 230, 7, ${leftStopAlpha.toFixed(3)}) 24%, 
                    rgba(156, 230, 7, ${midStopAlpha.toFixed(3)}) 68%, 
                    rgba(156, 230, 7, ${peakStopAlpha.toFixed(3)}) 94%, 
                    rgba(8, 14, 4, 0.92) 100%)`,
                }}
              />

              {idx >= 11 && !shouldReduceMotion && (
                <motion.div
                  animate={{
                    y: ['-35%', '35%', '-35%'],
                    opacity: [0.15, 0.55 * intensity, 0.15],
                  }}
                  transition={{
                    duration: 4.8,
                    repeat: Infinity,
                    delay: idx * 0.22,
                    ease: 'easeInOut',
                  }}
                  className="absolute inset-x-0 -top-1/4 h-[150%] pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at 88% 50%, rgba(156, 230, 7, ${(
                      intensity * 0.55
                    ).toFixed(3)}) 0%, transparent 65%)`,
                  }}
                />
              )}
            </div>
          );
        })}

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(4,5,6,0.5) 0%, rgba(4,5,6,0) 16%, rgba(4,5,6,0) 84%, rgba(4,5,6,0.5) 100%)',
          }}
        />
      </div>

      {/* ===================================================================== */}
      {/* FOREGROUND CONTENT: HEADLINE + 3 CARDS + BOTTOM LINE                  */}
      {/* ===================================================================== */}
      <div className="relative z-10 w-full max-w-[1140px] mx-auto">
        {/* Headline */}
        <motion.h2
          initial={isSSR ? false : { opacity: 0, y: 18 }}
          whileInView={isSSR ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="font-geist font-normal text-[30px] sm:text-[42px] md:text-[50px] lg:text-[56px] leading-[1.16] tracking-[-0.025em] text-white max-w-[860px] mb-12 sm:mb-14 lg:mb-16"
        >
          {t.howWeWork.headingBefore}{' '}
          <span className="text-[#9ce607] font-normal drop-shadow-[0_0_20px_rgba(156,230,7,0.3)]">
            {t.howWeWork.headingHighlight}
          </span>{' '}
          {t.howWeWork.headingAfter}
        </motion.h2>

        {/* 3 Frosted Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={isSSR ? false : { opacity: 0, y: 18 }}
              whileInView={isSSR ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.1 + index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              onClick={scrollToContact}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  scrollToContact();
                }
              }}
              className="group relative flex items-center gap-4 sm:gap-4.5 px-5 py-5 sm:px-6 sm:py-6 rounded-[18px] bg-[#141815]/70 hover:bg-[#191f1b]/80 backdrop-blur-md border border-white/[0.09] hover:border-[#9ce607]/40 transition-all duration-200 shadow-[0_12px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)] cursor-pointer"
            >
              {/* Neon Lime (#9ce607) Squircle Icon Box */}
              <div className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-[12px] bg-[#9ce607] group-hover:bg-[#abf50a] flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(156,230,7,0.3)] transition-transform duration-200 group-hover:scale-[1.03]">
                {card.renderIcon()}
              </div>

              {/* Card Text */}
              <p className="font-geist text-[13.5px] sm:text-[14.5px] leading-[1.5] text-[#d6dfd0] group-hover:text-white font-normal tracking-[-0.01em] transition-colors">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Line */}
        <motion.p
          initial={isSSR ? false : { opacity: 0, y: 14 }}
          whileInView={isSSR ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 sm:mt-12 font-geist text-[14px] sm:text-[15.5px] leading-[1.65] text-[#d6dfd0] max-w-3xl"
        >
          {t.howWeWork.bottomLine}
        </motion.p>
      </div>
    </section>
  );
};
