import React from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';
import { useNavigate } from 'react-router-dom';

export const WhoWeWorkWithSection: React.FC = () => {
  const { t, contactPath } = useI18n();
  const navigate = useNavigate();
  const isSSR = typeof window === 'undefined';

  const data = t.whoWeWorkWith;
  if (!data) return null;

  return (
    <section
      id="who-we-work-with"
      className="relative w-full bg-[color:var(--vd-060709)] text-white py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-t border-white/[0.06] overflow-hidden select-none font-geist"
    >
      {/* Ambient background glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] pointer-events-none opacity-15"
        style={{
          background:
            'radial-gradient(ellipse at center, color-mix(in srgb, var(--vd-9ce607) 25%, transparent) 0%, transparent 70%)',
          filter: 'blur(110px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1240px] mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[color:var(--vd-9ce607)]/10 border border-[color:var(--vd-9ce607)]/30 text-[color:var(--vd-9ce607)] text-[11px] font-mono uppercase tracking-[0.2em] mb-5">
            <span className="w-2 h-2 rounded-full bg-[color:var(--vd-9ce607)] shadow-[0_0_8px_var(--vd-9ce607)]" />
            {data.eyebrow}
          </div>

          <h2 className="font-geist font-normal text-[32px] sm:text-[44px] lg:text-[50px] leading-[1.12] tracking-[-0.025em] text-white">
            {data.heading}
          </h2>

          <p className="mt-5 text-[15px] sm:text-[16.5px] leading-[1.65] text-neutral-300 font-normal max-w-2xl">
            {data.subheading}
          </p>
        </div>

        {/* 6 Cards Grid: 1 col mobile, 2 col sm/md, 3 col lg */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 items-stretch">
          {data.cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={isSSR ? false : { opacity: 0, y: 20 }}
              whileInView={isSSR ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.06 * idx,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex flex-col justify-between p-7 sm:p-8 rounded-[20px] bg-[color:var(--vd-111513)]/95 hover:bg-[color:var(--vd-151b17)] border border-white/[0.08] hover:border-[color:var(--vd-9ce607)]/35 transition-all duration-200 shadow-[0_18px_45px_color-mix(in_srgb,var(--vd-000000)_55%,transparent),inset_0_1px_0_color-mix(in_srgb,var(--vd-ffffff)_6%,transparent)]"
            >
              <div>
                <span className="font-editorial italic font-normal text-[26px] sm:text-[30px] leading-none text-white/50 group-hover:text-[color:var(--vd-9ce607)] transition-colors tabular-nums">
                  {`0${idx + 1}`}
                </span>

                <h3 className="font-geist font-medium text-[20px] sm:text-[22px] leading-[1.25] text-white tracking-[-0.02em] mt-4 mb-2">
                  {card.title}
                </h3>

                <p className="text-[12px] sm:text-[12.5px] font-mono text-[color:var(--vd-9ce607)] tracking-wide mb-4 leading-[1.4]">
                  {card.who}
                </p>
              </div>

              <p className="font-geist text-[14px] sm:text-[14.5px] leading-[1.62] text-neutral-400 group-hover:text-neutral-300 font-normal transition-colors">
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer line under the cards */}
        <div className="mt-12 sm:mt-16 text-center">
          <p className="font-geist text-[14.5px] sm:text-[16px] text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            {data.footerLine}{' '}
            <button
              type="button"
              onClick={() => navigate(contactPath)}
              className="inline-flex items-center gap-1 text-[color:var(--vd-9ce607)] hover:underline font-medium cursor-pointer ml-1"
            >
              <span>{t.statement.button}</span>
              <span aria-hidden="true">→</span>
            </button>
          </p>
        </div>
      </div>
    </section>
  );
};
