import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import { useI18n } from '../i18n';

export const FAQSection: React.FC = () => {
  const { t } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const isSSR = typeof window === 'undefined';

  return (
    <section
      id="faq"
      className="relative w-full bg-[color:var(--vd-060709)] text-white py-24 sm:py-32 px-4 sm:px-8 lg:px-12 border-t border-white/[0.06] overflow-hidden select-none"
    >
      <div className="relative z-10 w-full max-w-[920px] mx-auto">
        {/* Eyebrow Label + Heading */}
        <motion.div
          initial={isSSR ? false : { opacity: 0, y: 18 }}
          whileInView={isSSR ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <span className="w-2 h-2 rounded-full bg-[color:var(--vd-9ce607)] shadow-[0_0_10px_var(--vd-9ce607)]" />
            <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-[color:var(--vd-9ce607)] font-semibold">
              {t.faq.label}
            </span>
          </div>

          <h2 className="font-geist font-semibold text-[30px] sm:text-[42px] md:text-[48px] leading-[1.12] tracking-[-0.025em] text-white">
            {t.faq.heading}
          </h2>
        </motion.div>

        {/* 7 FAQ Accordion Items (first one open by default) */}
        <div className="space-y-3.5">
          {t.faq.items.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-[18px] border transition-colors duration-200 overflow-hidden backdrop-blur-md ${
                  isOpen
                    ? 'bg-[color:var(--vd-141815)]/85 border-[color:var(--vd-9ce607)]/45 shadow-[0_12px_32px_color-mix(in_srgb,var(--vd-000000)_45%,transparent)]'
                    : 'bg-[color:var(--vd-0e110f)]/75 border-white/[0.08] hover:border-white/[0.18]'
                }`}
              >
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${idx}`}
                    id={`faq-question-${idx}`}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 sm:px-7 sm:py-6 text-left cursor-pointer"
                  >
                    <span className="font-geist font-medium text-[16px] sm:text-[18px] text-white tracking-[-0.01em]">
                      {item.q}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 ${
                        isOpen
                          ? 'bg-[color:var(--vd-9ce607)] text-[color:var(--vd-0a0c09)] border-[color:var(--vd-9ce607)] rotate-180'
                          : 'bg-white/[0.04] text-neutral-300 border-white/10'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4 stroke-[2.2]" />
                    </span>
                  </button>
                </h3>

                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  className={
                    isOpen
                      ? 'px-6 pb-6 sm:px-7 sm:pb-7 pt-0 block'
                      : 'px-6 pb-6 sm:px-7 sm:pb-7 pt-0 hidden'
                  }
                >
                  <p className="font-geist text-[14px] sm:text-[15.5px] leading-[1.65] text-[color:var(--vd-d6dfd0)] max-w-3xl">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
