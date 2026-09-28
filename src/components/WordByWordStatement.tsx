import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Stethoscope, PhoneCall } from 'lucide-react';
import { useI18n } from '../i18n';
import { trackBookCallClick } from '../utils/analytics';

interface WordByWordStatementProps {
  onExplore?: () => void;
}

export const WordByWordStatement: React.FC<WordByWordStatementProps> = ({
  onExplore,
}) => {
  const { t, contactPath } = useI18n();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.065,
        delayChildren: 0.06,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0.12,
      y: 16,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  const badgeVariants = {
    hidden: {
      opacity: 0,
      scale: 0.55,
      y: 14,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 440,
        damping: 24,
      },
    },
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackBookCallClick('statement');
    if (onExplore) {
      onExplore();
    } else {
      navigate(contactPath);
    }
  };

  return (
    <section
      id="statement"
      className="relative w-full bg-[#060709] text-white py-24 sm:py-32 lg:py-40 px-4 sm:px-8 border-y border-[#181d26] overflow-hidden select-none"
    >
      {/* Ambient background glows matching dark aesthetic */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full pointer-events-none -z-0 opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0, 245, 160, 0.25) 0%, rgba(6, 182, 212, 0.15) 35%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl 2xl:max-w-[1480px] mx-auto flex flex-col items-center">
        {/* The Exact Animated Statement with 4 Glowing Icon Chips */}
        <motion.h2
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          aria-label={t.statement.text}
          className="text-center font-geist font-medium text-[26px] sm:text-[38px] md:text-[46px] lg:text-[50px] xl:text-[56px] 2xl:text-[62px] leading-[1.28] sm:leading-[1.3] tracking-[-0.02em] text-white w-full max-w-6xl xl:max-w-7xl 2xl:max-w-[1400px] mx-auto px-2 sm:px-4"
        >
          {/* ROW 1: "You heal, [Stethoscope] coach and change lives." */}
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4 md:gap-x-5 gap-y-2">
            {t.statement.words.row1.map((word, idx) => (
              <React.Fragment key={`r1-${idx}`}>
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>{' '}
              </React.Fragment>
            ))}

            {/* 1. Stethoscope Glowing Badge after "heal" */}
            <motion.span
              variants={badgeVariants}
              whileHover={{ scale: 1.14, rotate: -3 }}
              className="relative inline-flex items-center justify-center align-middle mx-1 sm:mx-1.5 cursor-pointer group"
              aria-hidden="true"
            >
              <span className="absolute -inset-1.5 rounded-2xl bg-[#00f5a0]/40 blur-md pointer-events-none group-hover:bg-[#00f5a0]/60 transition-all duration-300" />
              <span className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-[#091510]/95 border border-[#00f5a0]/80 shadow-[0_0_24px_rgba(0,245,160,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center backdrop-blur-md">
                <Stethoscope className="w-5 h-5 sm:w-7 sm:h-7 text-[#00f5a0] drop-shadow-[0_0_12px_rgba(0,245,160,0.9)]" />
              </span>
            </motion.span>

            {t.statement.words.row1AfterHeal.map((word, idx) => (
              <React.Fragment key={`r1b-${idx}`}>
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>{' '}
              </React.Fragment>
            ))}
          </div>

          {/* ROW 2: "We build the website, [Code] create the content [Video]" */}
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4 md:gap-x-5 gap-y-2 mt-2 sm:mt-3 lg:mt-4">
            {t.statement.words.row2.map((word, idx) => (
              <React.Fragment key={`r2-${idx}`}>
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>{' '}
              </React.Fragment>
            ))}

            {/* 2. Code </> Glowing Badge after "website" */}
            <motion.span
              variants={badgeVariants}
              whileHover={{ scale: 1.15, rotate: 3 }}
              className="relative inline-flex items-center justify-center align-middle mx-1 sm:mx-1.5 cursor-pointer group"
              aria-hidden="true"
            >
              <span className="absolute -inset-1.5 rounded-2xl bg-[#00e5ff]/35 blur-md pointer-events-none group-hover:bg-[#00e5ff]/55 transition-all duration-300" />
              <span className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-[#06141c]/95 border border-[#00e5ff]/80 shadow-[0_0_22px_rgba(0,229,255,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center backdrop-blur-md">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-7 sm:h-7 text-[#00e5ff] drop-shadow-[0_0_10px_rgba(0,229,255,0.9)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                  <line x1="14" y1="4" x2="10" y2="20" />
                </svg>
              </span>
            </motion.span>

            {t.statement.words.row2AfterWebsite.map((word, idx) => (
              <React.Fragment key={`r2b-${idx}`}>
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>{' '}
              </React.Fragment>
            ))}

            {/* 3. Video / Reels Glowing Magenta Badge after "content" */}
            <motion.span
              variants={badgeVariants}
              whileHover={{ scale: 1.15, rotate: 3 }}
              className="relative inline-flex items-center justify-center align-middle mx-1 sm:mx-1.5 cursor-pointer group"
              aria-hidden="true"
            >
              <span className="absolute -inset-1.5 rounded-2xl bg-[#ff2a85]/35 blur-md pointer-events-none group-hover:bg-[#ff2a85]/55 transition-all duration-300" />
              <span className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-[#1a0613]/95 border border-[#ff2a85]/80 shadow-[0_0_22px_rgba(255,42,133,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center backdrop-blur-md">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-7 sm:h-7 text-[#ff2a85] drop-shadow-[0_0_10px_rgba(255,42,133,0.9)]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="3" />
                  <line x1="2" y1="9" x2="22" y2="9" />
                  <line x1="7" y1="4" x2="5" y2="9" />
                  <line x1="12" y1="4" x2="10" y2="9" />
                  <line x1="17" y1="4" x2="15" y2="9" />
                  <polygon points="10 12 15 14.5 10 17 10 12" fill="#ff2a85" stroke="none" />
                </svg>
              </span>
            </motion.span>
          </div>

          {/* ROW 3: "and make the calls [Phone] that bring new clients to your door." */}
          <div className="flex flex-wrap items-center justify-center gap-x-2.5 sm:gap-x-4 md:gap-x-5 gap-y-2 mt-2 sm:mt-3 lg:mt-4">
            {t.statement.words.row3.map((word, idx) => (
              <React.Fragment key={`r3-${idx}`}>
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>{' '}
              </React.Fragment>
            ))}

            {/* 4. Phone Glowing Lime Badge after "calls" */}
            <motion.span
              variants={badgeVariants}
              whileHover={{ scale: 1.15, rotate: -3 }}
              className="relative inline-flex items-center justify-center align-middle mx-1 sm:mx-1.5 cursor-pointer group"
              aria-hidden="true"
            >
              <span className="absolute -inset-1.5 rounded-2xl bg-[#9ce607]/40 blur-md pointer-events-none group-hover:bg-[#9ce607]/60 transition-all duration-300" />
              <span className="relative w-9 h-9 sm:w-11 sm:h-11 md:w-13 md:h-13 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-[#111a05]/95 border border-[#9ce607]/85 shadow-[0_0_22px_rgba(156,230,7,0.5),inset_0_1px_1px_rgba(255,255,255,0.2)] flex items-center justify-center backdrop-blur-md">
                <PhoneCall className="w-5 h-5 sm:w-7 sm:h-7 text-[#9ce607] drop-shadow-[0_0_10px_rgba(156,230,7,0.9)]" />
              </span>
            </motion.span>

            {t.statement.words.row3AfterCalls.map((word, idx, arr) => (
              <React.Fragment key={`r3b-${idx}`}>
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
                {idx < arr.length - 1 ? ' ' : ''}
              </React.Fragment>
            ))}
          </div>
        </motion.h2>

        {/* CTA Button: "Let's talk →" with neon green outline glow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-12 sm:mt-16 flex justify-center"
        >
          <a
            href={contactPath}
            onClick={handleCtaClick}
            className="group relative inline-flex items-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#06080a] border border-[#00f5a0] text-white text-[14px] sm:text-[15px] font-geist font-medium transition-all duration-300 cursor-pointer shadow-[0_0_24px_rgba(0,245,160,0.4),0_0_60px_rgba(0,245,160,0.15)] hover:shadow-[0_0_36px_rgba(0,245,160,0.65),0_0_80px_rgba(0,245,160,0.25)] hover:border-[#34d399] active:scale-[0.98]"
          >
            <span className="tracking-tight text-neutral-100 group-hover:text-white">
              {t.statement.button}
            </span>
            <span
              className="transition-transform duration-200 group-hover:translate-x-1.5 text-[#00f5a0] font-bold"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
