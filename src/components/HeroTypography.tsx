import React from 'react';
import { motion } from 'motion/react';
import { TypographyPairing } from '../types';
import { useI18n } from '../i18n';

interface HeroTypographyProps {
  pairingMode?: TypographyPairing;
}

export const HeroTypography: React.FC<HeroTypographyProps> = ({ pairingMode = 'curated' }) => {
  const { t } = useI18n();
  const isSSR = typeof window === 'undefined';

  const isAllEditorial = pairingMode === 'editorial';
  const isAllGeist = pairingMode === 'geist';

  const topLinesClass = isAllEditorial
    ? 'font-editorial font-normal tracking-[-0.02em]'
    : 'font-geist font-semibold tracking-[-0.035em]';

  const bottomLinesClass = isAllGeist
    ? 'font-geist font-light italic tracking-[-0.03em]'
    : 'font-editorial italic font-normal tracking-[-0.015em]';

  const smoothEase: [number, number, number, number] = [0.215, 0.61, 0.355, 1];

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 py-2 text-center select-none z-20">
      <div className="relative grid grid-cols-1 sm:grid-cols-2 xl:flex xl:items-center xl:justify-between gap-y-3 sm:gap-x-3 xl:gap-0 max-w-lg xl:max-w-none mx-auto">
        {/* Center Main 4-Line Headline with dedicated dark shadow layer behind <h1> */}
        <div className="order-1 sm:col-span-2 xl:order-2 xl:flex-1 max-w-4xl mx-auto px-2 relative z-10 w-full">
          {/* Outer Ambient Black Shadow Layer behind <h1> */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-4 sm:-inset-x-10 -inset-y-6 sm:-inset-y-10 -z-10 rounded-full"
            style={{
              background:
                'radial-gradient(ellipse 68% 66% at 50% 50%, color-mix(in srgb, var(--vd-hero-halo) 92%, transparent) 0%, color-mix(in srgb, var(--vd-hero-halo-bg) 80%, transparent) 44%, color-mix(in srgb, var(--vd-hero-halo-bg) 35%, transparent) 70%, color-mix(in srgb, var(--vd-hero-halo-bg) 0%, transparent) 100%)',
              filter: 'blur(20px)',
            }}
          />
          {/* Inner Core Black Layer directly behind <h1> text */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-x-2 sm:-inset-x-6 -inset-y-2 sm:-inset-y-5 -z-10 rounded-[48px]"
            style={{
              background:
                'radial-gradient(ellipse 62% 58% at 50% 50%, color-mix(in srgb, var(--vd-hero-halo) 88%, transparent) 0%, color-mix(in srgb, var(--vd-hero-halo-2) 68%, transparent) 54%, color-mix(in srgb, var(--vd-hero-halo) 0%, transparent) 100%)',
              filter: 'blur(12px)',
            }}
          />

          <h1
            id="hero-title-main"
            aria-label={`${t.hero.line1} ${t.hero.line2} ${t.hero.line3} ${t.hero.line4}`}
            className="relative z-10 text-[24px] sm:text-[36px] md:text-[42px] lg:text-[48px] xl:text-[52px] leading-[1.14] sm:leading-[1.12] drop-shadow-[0_14px_32px_color-mix(in_srgb,var(--vd-hero-shadow)_100%,transparent)]"
            style={{
              textShadow:
                '0 16px 44px color-mix(in srgb, var(--vd-hero-shadow) 100%, transparent), 0 8px 22px color-mix(in srgb, var(--vd-hero-shadow) 100%, transparent), 0 3px 8px color-mix(in srgb, var(--vd-hero-shadow) 100%, transparent)',
            }}
          >
            {/* Line 1: White */}
            <span className="block overflow-hidden py-1 -my-1">
              <motion.span
                initial={isSSR ? false : { opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={isSSR ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, delay: 0.1, ease: smoothEase }}
                className={`block text-white ${topLinesClass}`}
              >
                {t.hero.line1}{' '}
              </motion.span>
            </span>

            {/* Line 2: White */}
            <span className="block overflow-hidden py-1 -my-1 mt-0.5">
              <motion.span
                initial={isSSR ? false : { opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={isSSR ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, delay: 0.22, ease: smoothEase }}
                className={`block text-white ${topLinesClass}`}
              >
                {t.hero.line2}{' '}
              </motion.span>
            </span>

            {/* Line 3: Green Italic */}
            <span className="block overflow-hidden py-1.5 -my-1.5 mt-1">
              <motion.span
                initial={isSSR ? false : { opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={isSSR ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, delay: 0.36, ease: smoothEase }}
                className={`block text-[color:var(--vd-a8f300)] ${bottomLinesClass}`}
                style={{
                  textShadow:
                    '0 14px 36px color-mix(in srgb, var(--vd-hero-shadow) 100%, transparent), 0 5px 14px color-mix(in srgb, var(--vd-hero-shadow) 98%, transparent), 0 0 30px color-mix(in srgb, var(--vd-a8f300) 28%, transparent)',
                }}
              >
                {t.hero.line3}{' '}
              </motion.span>
            </span>

            {/* Line 4: Green Italic */}
            <span className="block overflow-hidden py-1.5 -my-1.5">
              <motion.span
                initial={isSSR ? false : { opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={isSSR ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, delay: 0.48, ease: smoothEase }}
                className={`block text-[color:var(--vd-a8f300)] ${bottomLinesClass}`}
                style={{
                  textShadow:
                    '0 14px 36px color-mix(in srgb, var(--vd-hero-shadow) 100%, transparent), 0 5px 14px color-mix(in srgb, var(--vd-hero-shadow) 98%, transparent), 0 0 30px color-mix(in srgb, var(--vd-a8f300) 28%, transparent)',
                }}
              >
                {t.hero.line4}
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Left paragraph (single element in DOM, responsive across mobile/tablet/desktop) */}
        <motion.div
          initial={isSSR ? false : { opacity: 0, x: -24, filter: 'blur(6px)' }}
          animate={isSSR ? undefined : { opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.55, ease: smoothEase }}
          className="order-2 xl:order-1 mt-6 sm:mt-7 xl:mt-0 px-4 sm:px-0 sm:pl-4 xl:pl-0 xl:w-60 text-center sm:text-left xl:self-end xl:-mb-8 2xl:-mb-10 relative z-30"
        >
          <p
            className="text-[12px] sm:text-[12.5px] 2xl:text-[13px] leading-[1.62] text-white font-medium font-geist"
            style={{
              textShadow:
                '0 2px 14px color-mix(in srgb, var(--vd-hero-shadow) 100%, transparent), 0 1px 4px color-mix(in srgb, var(--vd-hero-shadow) 100%, transparent)',
            }}
          >
            {t.hero.leftText}
          </p>
        </motion.div>

        {/* Right paragraph (single element in DOM, responsive across mobile/tablet/desktop) */}
        <motion.div
          initial={isSSR ? false : { opacity: 0, x: 24, filter: 'blur(6px)' }}
          animate={isSSR ? undefined : { opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.65, ease: smoothEase }}
          className="order-3 xl:order-3 mt-0 sm:mt-7 xl:mt-0 px-4 sm:px-0 sm:pr-4 xl:pr-0 xl:w-60 text-center sm:text-right xl:self-end xl:-mb-8 2xl:-mb-10 relative z-30"
        >
          <p
            className="text-[12px] sm:text-[12.5px] 2xl:text-[13px] leading-[1.62] text-white font-medium font-geist"
            style={{
              textShadow:
                '0 2px 14px color-mix(in srgb, var(--vd-hero-shadow) 100%, transparent), 0 1px 4px color-mix(in srgb, var(--vd-hero-shadow) 100%, transparent)',
            }}
          >
            {t.hero.rightText}
          </p>
        </motion.div>
      </div>
    </div>
  );
};
