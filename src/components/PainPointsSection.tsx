import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';

export const PainPointsSection: React.FC = () => {
  const { t, contactPath } = useI18n();
  const navigate = useNavigate();
  const isSSR = typeof window === 'undefined';

  const handleBookCall = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(contactPath);
  };

  // Exact 4 line-art icons from the reference layout (stacked layers, rocket, connected nodes, lifebuoy)
  const renderCardIcon = (index: number) => {
    switch (index) {
      case 0:
        return (
          <svg
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 text-[#9ce607]"
            aria-hidden="true"
          >
            <path d="M14 4L24 9.5L14 15L4 9.5L14 4Z" />
            <path d="M4 14.5L14 20L24 14.5" />
            <path d="M4 19.5L14 25L24 19.5" />
          </svg>
        );
      case 1:
        return (
          <svg
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 text-[#9ce607]"
            aria-hidden="true"
          >
            <path d="M16.5 11.5L19 9" />
            <path d="M10.5 17.5C7.5 19.5 6.5 22.5 6.5 22.5C6.5 22.5 9.5 21.5 11.5 18.5" />
            <path d="M15.2 18.8L9.2 12.8C12.2 7.8 17.5 5.2 22.8 5.2C22.8 10.5 20.2 15.8 15.2 18.8Z" />
            <path d="M9.2 12.8L5.5 13.8L7.2 16.8" />
            <path d="M15.2 18.8L14.2 22.5L11.2 20.8" />
          </svg>
        );
      case 2:
        return (
          <svg
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 text-[#9ce607]"
            aria-hidden="true"
          >
            <rect x="4.5" y="4.5" width="7.5" height="7.5" rx="2" />
            <rect x="16" y="16" width="7.5" height="7.5" rx="2" />
            <path d="M8.25 12V16.5C8.25 18.433 9.817 20 11.75 20H16" />
          </svg>
        );
      default:
        return (
          <svg
            viewBox="0 0 28 28"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-7 h-7 text-[#9ce607]"
            aria-hidden="true"
          >
            <circle cx="14" cy="14" r="9.5" />
            <circle cx="14" cy="14" r="4" />
            <line x1="7.3" y1="7.3" x2="11.2" y2="11.2" />
            <line x1="16.8" y1="16.8" x2="20.7" y2="20.7" />
            <line x1="20.7" y1="7.3" x2="16.8" y2="11.2" />
            <line x1="11.2" y1="16.8" x2="7.3" y2="20.7" />
          </svg>
        );
    }
  };

  return (
    <section
      id="problems"
      className="relative w-full bg-[#060709] text-white py-24 sm:py-32 lg:py-36 px-4 sm:px-8 lg:px-12 border-b border-[#181d26] overflow-hidden select-none"
    >
      {/* Subtle Ambient Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[480px] pointer-events-none opacity-15"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(156, 230, 7, 0.22) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-14 items-start">
          {/* =============================================================== */}
          {/* LEFT COLUMN: Eyebrow + Big Editorial Split Heading + Copy + CTA */}
          {/* =============================================================== */}
          <motion.div
            initial={isSSR ? false : { opacity: 0, y: 20 }}
            whileInView={isSSR ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-start lg:sticky lg:top-28"
          >
            {/* Uppercase Eyebrow Label */}
            <span className="font-mono text-[11px] sm:text-[12px] uppercase tracking-[0.22em] text-neutral-400 font-medium mb-5">
              {t.painPoints.label}
            </span>

            {/* Display Heading with Editorial Italic Second Line */}
            <h2
              aria-label={t.painPoints.heading}
              className="font-geist font-normal text-[38px] sm:text-[48px] xl:text-[56px] leading-[1.06] tracking-[-0.03em] text-white max-w-[440px]"
            >
              <span className="block">{t.painPoints.headingMain}{' '}</span>
              <span className="block font-editorial italic font-normal text-[#9ce607] mt-1.5 tracking-[-0.015em]">
                {t.painPoints.headingItalic}
              </span>
            </h2>

            {/* Supporting Closing Paragraph */}
            <p className="mt-6 sm:mt-7 font-geist text-[15px] sm:text-[16px] leading-[1.65] text-neutral-400 max-w-[380px]">
              {t.painPoints.closing}
            </p>

            {/* Primary CTA Button */}
            <div className="mt-8 sm:mt-9">
              <a
                href={contactPath}
                onClick={handleBookCall}
                className="group inline-flex items-center gap-3 px-6 py-3.5 rounded-[10px] bg-[#9ce607] hover:bg-[#abf50a] text-[#0a0c09] font-geist font-semibold text-[13.5px] sm:text-[14px] tracking-[-0.01em] transition-all duration-200 shadow-[0_8px_24px_rgba(156,230,7,0.28)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
              >
                <span>{t.navbar.cta}</span>
                <span
                  className="transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  →
                </span>
              </a>
            </div>
          </motion.div>

          {/* =============================================================== */}
          {/* RIGHT COLUMN: Staggered 2-Column Offset Grid of 4 Cards (01–04) */}
          {/* =============================================================== */}
          <div className="lg:col-span-7 w-full grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-7 sm:pb-14 lg:pb-16 items-stretch">
            {t.painPoints.cards.map((card, index) => {
              const isRightColumnCard = index % 2 === 1;
              const formattedNumber = `0${index + 1}`;

              return (
                <motion.div
                  key={card.id}
                  initial={isSSR ? false : { opacity: 0, y: 24 }}
                  whileInView={isSSR ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.55,
                    delay: 0.08 * index,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`group relative flex flex-col justify-between p-7 sm:p-8 lg:p-9 min-h-[270px] sm:min-h-[295px] rounded-[20px] bg-[#111513]/95 hover:bg-[#151b17] border border-white/[0.08] hover:border-[#9ce607]/35 transition-colors duration-200 shadow-[0_18px_45px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.06)] ${
                    isRightColumnCard ? 'sm:translate-y-12 lg:translate-y-16' : ''
                  }`}
                >
                  {/* Top Row: Editorial Italic Number (01..04) Left + Outline Icon Right */}
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-editorial italic font-normal text-[36px] sm:text-[40px] leading-none text-white tracking-[-0.02em] tabular-nums">
                      {formattedNumber}
                    </span>

                    <div className="shrink-0 transition-transform duration-200 group-hover:scale-105">
                      {renderCardIcon(index)}
                    </div>
                  </div>

                  {/* Bottom Content: Title + Description */}
                  <div className="mt-9 sm:mt-11">
                    <h3 className="font-geist font-normal text-[21px] sm:text-[23px] leading-[1.24] tracking-[-0.02em] text-white mb-4">
                      {card.title}
                    </h3>

                    <p className="font-geist text-[14.5px] sm:text-[15px] leading-[1.62] text-neutral-400 group-hover:text-neutral-300 font-normal transition-colors">
                      {card.text}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
