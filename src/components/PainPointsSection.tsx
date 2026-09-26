import React from 'react';
import { motion } from 'motion/react';
import { CalendarX2, Clock, Sparkles, ShieldAlert } from 'lucide-react';
import { useI18n } from '../i18n';

export const PainPointsSection: React.FC = () => {
  const { t } = useI18n();

  const renderCardIcon = (index: number) => {
    switch (index) {
      case 0:
        return <CalendarX2 className="w-6 h-6 text-[#0a0c09]" strokeWidth={1.8} />;
      case 1:
        return <Clock className="w-6 h-6 text-[#0a0c09]" strokeWidth={1.8} />;
      case 2:
        return <Sparkles className="w-6 h-6 text-[#0a0c09]" strokeWidth={1.8} />;
      default:
        return <ShieldAlert className="w-6 h-6 text-[#0a0c09]" strokeWidth={1.8} />;
    }
  };

  return (
    <section
      id="problems"
      className="relative w-full bg-[#060709] text-white py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-b border-[#181d26] overflow-hidden select-none"
    >
      {/* Subtle Ambient Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[420px] pointer-events-none opacity-15"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(156, 230, 7, 0.25) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1140px] mx-auto">
        {/* Eyebrow Label + Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#9ce607] shadow-[0_0_10px_#9ce607]" />
            <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#9ce607] font-semibold">
              {t.painPoints.label}
            </span>
          </div>

          <h2 className="font-geist font-normal text-[30px] sm:text-[42px] md:text-[50px] lg:text-[54px] leading-[1.14] tracking-[-0.025em] text-white max-w-[820px]">
            {t.painPoints.heading}
          </h2>
        </motion.div>

        {/* 4 Pain Point Cards reusing the frosted glass small card style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {t.painPoints.cards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: 0.08 * index,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative flex items-start gap-4 sm:gap-5 px-5 py-6 sm:px-6 sm:py-7 rounded-[18px] bg-[#141815]/70 hover:bg-[#191f1b]/80 backdrop-blur-md border border-white/[0.09] hover:border-[#9ce607]/40 transition-all duration-200 shadow-[0_12px_32px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              {/* Neon Lime (#9ce607) Squircle Icon Box */}
              <div className="w-12 h-12 sm:w-[52px] sm:h-[52px] rounded-[12px] bg-[#9ce607] group-hover:bg-[#abf50a] flex items-center justify-center shrink-0 shadow-[0_4px_16px_rgba(156,230,7,0.3)] transition-transform duration-200 group-hover:scale-[1.03]">
                {renderCardIcon(index)}
              </div>

              <div className="flex flex-col">
                <h3 className="font-geist font-semibold text-[16px] sm:text-[18px] text-white tracking-[-0.015em] mb-1.5">
                  {card.title}
                </h3>
                <p className="font-geist text-[13.5px] sm:text-[14.5px] leading-[1.55] text-[#d6dfd0] group-hover:text-white font-normal tracking-[-0.01em] transition-colors">
                  {card.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Closing Line */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 sm:mt-12 text-center font-editorial italic text-[24px] sm:text-[30px] md:text-[34px] text-[#9ce607] tracking-[-0.01em]"
        >
          {t.painPoints.closing}
        </motion.p>
      </div>
    </section>
  );
};
