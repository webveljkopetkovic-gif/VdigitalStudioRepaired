import React from 'react';
import { motion } from 'motion/react';
import { TypographyPairing } from '../types';
import { useI18n } from '../i18n';

interface HeroTypographyProps {
  pairingMode?: TypographyPairing;
}

export const HeroTypography: React.FC<HeroTypographyProps> = ({ pairingMode = 'curated' }) => {
  const { t } = useI18n();

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
      <div className="relative flex items-center justify-between">
        {/* Left column paragraph pushed down towards the dark background */}
        <motion.div
          initial={{ opacity: 0, x: -24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.55, ease: smoothEase }}
          className="hidden xl:block w-56 text-left self-end mb-2 z-20"
        >
          <p
            className="text-[12px] leading-[1.6] text-neutral-200 font-normal font-geist"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.95)' }}
          >
            {t.hero.leftText}
          </p>
        </motion.div>

        {/* Center Main 4-Line Headline with strong 3D shadow for contrast over 'creative' */}
        <div className="flex-1 max-w-4xl mx-auto px-2 relative z-20">
          <h1
            id="hero-title-main"
            aria-label={`${t.hero.line1} ${t.hero.line2} ${t.hero.line3} ${t.hero.line4}`}
            className="text-[28px] sm:text-[42px] md:text-[50px] lg:text-[56px] xl:text-[62px] leading-[1.12] sm:leading-[1.1]"
            style={{
              textShadow:
                '0 10px 30px rgba(0, 0, 0, 0.95), 0 4px 12px rgba(0, 0, 0, 0.85), 0 2px 4px rgba(0, 0, 0, 0.9)',
            }}
          >
            {/* Line 1: White */}
            <span className="block overflow-hidden py-1 -my-1">
              <motion.span
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, delay: 0.1, ease: smoothEase }}
                className={`block text-white ${topLinesClass}`}
              >
                {t.hero.line1}
              </motion.span>
            </span>

            {/* Line 2: White */}
            <span className="block overflow-hidden py-1 -my-1 mt-0.5">
              <motion.span
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.85, delay: 0.22, ease: smoothEase }}
                className={`block text-white ${topLinesClass}`}
              >
                {t.hero.line2}
              </motion.span>
            </span>

            {/* Line 3: Green Italic */}
            <span className="block overflow-hidden py-1.5 -my-1.5 mt-1">
              <motion.span
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, delay: 0.36, ease: smoothEase }}
                className={`block text-[#a8f300] ${bottomLinesClass}`}
                style={{
                  textShadow:
                    '0 10px 30px rgba(0, 0, 0, 0.95), 0 4px 12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(168, 243, 0, 0.25)',
                }}
              >
                {t.hero.line3}
              </motion.span>
            </span>

            {/* Line 4: Green Italic */}
            <span className="block overflow-hidden py-1.5 -my-1.5">
              <motion.span
                initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 0.9, delay: 0.48, ease: smoothEase }}
                className={`block text-[#a8f300] ${bottomLinesClass}`}
                style={{
                  textShadow:
                    '0 10px 30px rgba(0, 0, 0, 0.95), 0 4px 12px rgba(0, 0, 0, 0.9), 0 0 30px rgba(168, 243, 0, 0.25)',
                }}
              >
                {t.hero.line4}
              </motion.span>
            </span>
          </h1>
        </div>

        {/* Right column paragraph pushed down towards the dark background */}
        <motion.div
          initial={{ opacity: 0, x: 24, filter: 'blur(6px)' }}
          animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.9, delay: 0.65, ease: smoothEase }}
          className="hidden xl:block w-56 text-right self-end mb-2 z-20"
        >
          <p
            className="text-[12px] leading-[1.6] text-neutral-200 font-normal font-geist"
            style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.95)' }}
          >
            {t.hero.rightText}
          </p>
        </motion.div>
      </div>

      {/* Responsive supporting text for mobile/tablet */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.65, ease: smoothEase }}
        className="xl:hidden mt-3 max-w-lg mx-auto flex flex-col sm:flex-row justify-between gap-3 text-[11px] text-neutral-300 px-4"
      >
        <p className="sm:text-left">{t.hero.leftText}</p>
        <p className="sm:text-right">{t.hero.rightText}</p>
      </motion.div>
    </div>
  );
};
