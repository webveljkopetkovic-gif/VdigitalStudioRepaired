import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { useI18n } from '../i18n';
import { trackBookCallClick } from '../utils/analytics';

export const FoundingClientsSection: React.FC = () => {
  const { t, contactPath } = useI18n();
  const navigate = useNavigate();
  const isSSR = typeof window === 'undefined';

  const handleApplyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    trackBookCallClick('founding_clients');
    navigate(contactPath);
  };

  return (
    <section
      id="founding"
      className="relative w-full bg-[#060709] text-white py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-t border-white/[0.07] overflow-hidden select-none"
    >
      {/* Ambient Green Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[760px] h-[420px] pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(156, 230, 7, 0.28) 0%, transparent 70%)',
          filter: 'blur(95px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1040px] mx-auto">
        <motion.div
          initial={isSSR ? false : { opacity: 0, y: 22 }}
          whileInView={isSSR ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-[28px] sm:rounded-[36px] bg-[#111512]/85 backdrop-blur-xl border border-[#9ce607]/25 p-8 sm:p-12 lg:p-16 shadow-[0_24px_70px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden"
        >
          {/* Subtle top-right radial highlight */}
          <div
            className="absolute -top-24 -right-24 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background:
                'radial-gradient(circle, rgba(156, 230, 7, 0.18) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
            aria-hidden="true"
          />

          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#9ce607]/10 border border-[#9ce607]/30 text-[#9ce607] text-[11px] font-mono uppercase tracking-[0.2em] mb-6">
            <span className="w-2 h-2 rounded-full bg-[#9ce607] shadow-[0_0_8px_#9ce607]" />
            {t.founding.label}
          </div>

          {/* Heading + Green Italic Line */}
          <h2 className="font-geist font-semibold text-[30px] sm:text-[42px] md:text-[50px] leading-[1.12] tracking-[-0.025em] text-white max-w-3xl">
            <span className="block">{t.founding.heading}{' '}</span>
            <span className="block font-editorial italic font-normal text-[#9ce607] mt-1">
              {t.founding.headingItalic}
            </span>
          </h2>

          {/* Description */}
          <p className="font-geist text-[15px] sm:text-[17px] leading-[1.65] text-neutral-300 max-w-2xl mt-6">
            {t.founding.text}
          </p>

          {/* 3 Bullets */}
          <ul className="mt-8 space-y-3.5">
            {t.founding.bullets.map((bullet, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3.5 font-geist text-[14.5px] sm:text-[16px] text-white/95"
              >
                <span className="w-6 h-6 rounded-lg bg-[#9ce607] text-[#0a0c09] flex items-center justify-center shrink-0 mt-0.5 shadow-[0_2px_10px_rgba(156,230,7,0.35)]">
                  <Check className="w-4 h-4 stroke-[2.6]" />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          {/* CTA Button: Apply for a founding spot → */}
          <div className="mt-10 pt-2">
            <a
              href={contactPath}
              onClick={handleApplyClick}
              className="group inline-flex items-center gap-2.5 px-7 sm:px-8 py-3.5 sm:py-4 rounded-full bg-[#9ce607] hover:bg-[#abf50a] text-[#0a0c09] font-geist font-bold text-[14px] sm:text-[15px] tracking-[-0.01em] transition-all duration-200 cursor-pointer shadow-[0_8px_28px_rgba(156,230,7,0.35),inset_0_1px_1px_rgba(255,255,255,0.65)] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{t.founding.button}</span>
              <span
                className="transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
