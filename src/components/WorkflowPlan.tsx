import React from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../i18n';

const WEEK_SHIFTS = [
  ['0%', '6%', '3%', '8%', '12%'],
  ['0%', '10%', '18%', '24%'],
  ['0%', '4%', '10%', '16%'],
];

const TASK_GAPS = [
  ['1.25rem', '1.75rem', '1rem', '1.25rem', '1.5rem'],
  ['1.5rem', '2.25rem', '1.75rem', '1.5rem'],
  ['1.75rem', '1rem', '1.25rem', '1.75rem'],
];

export const WorkflowPlan: React.FC = () => {
  const { t } = useI18n();

  const headerVariants = {
    hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 36 },
    visible: (colIdx: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        delay: colIdx * 0.15,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        staggerChildren: 0.085,
        delayChildren: colIdx * 0.15 + 0.18,
      },
    }),
  };

  const taskBarVariants = {
    hidden: {
      opacity: 0,
      x: -28,
      scale: 0.94,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring' as const,
        stiffness: 260,
        damping: 24,
      },
    },
  };

  return (
    <section
      id="process"
      className="relative w-full min-h-screen flex flex-col justify-center bg-[#07080a] text-white py-20 sm:py-28 lg:py-32 px-6 sm:px-10 lg:px-16 overflow-hidden select-none border-b border-white/[0.06]"
    >
      {/* Background: Subtle Vertical Grid Hairlines */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-35"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: 'calc(100% / 12) 100%',
        }}
        aria-hidden="true"
      />

      {/* Ambient Top-Right & Center-Left Soft Glow */}
      <div
        className="absolute -top-32 right-1/4 w-[600px] h-[360px] rounded-full pointer-events-none z-0 opacity-15"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(163, 230, 53, 0.35) 0%, transparent 70%)',
          filter: 'blur(90px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col justify-between gap-12 lg:gap-16">
        {/* TOP HEADER AREA */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/[0.08] pb-10 lg:pb-12"
        >
          {/* Left: Eyebrow + Main Display Headline */}
          <div className="max-w-3xl">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#a3e635] shadow-[0_0_10px_#a3e635]" />
              <span className="font-mono text-[12px] uppercase tracking-[0.22em] text-[#a3e635] font-semibold">
                {t.process.label}
              </span>
            </div>

            <h2 className="font-geist font-semibold text-[34px] sm:text-[48px] md:text-[56px] lg:text-[64px] leading-[1.06] tracking-[-0.03em] text-white">
              {t.process.headingBefore}{' '}
              <span
                className="font-editorial italic font-normal text-[#a3e635] px-1 inline-block"
                style={{
                  textShadow: '0 0 36px rgba(163, 230, 53, 0.35)',
                }}
              >
                {t.process.headingHighlight}
              </span>
              {t.process.headingAfter}
            </h2>
          </div>

          {/* Right: Supporting Editorial Paragraph */}
          <div className="max-w-md lg:text-right self-start lg:self-end">
            <p className="font-geist text-[14px] sm:text-[15px] leading-[1.65] text-[#9ca3af] font-normal">
              {t.process.sideText}
            </p>
          </div>
        </motion.div>

        {/* TIMELINE GRID: 3-COLUMN DESKTOP / 1-COLUMN MOBILE */}
        <div className="relative w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/[0.08] border border-white/[0.08] rounded-2xl bg-[#0a0c10]/70 backdrop-blur-md shadow-[0_24px_80px_rgba(0,0,0,0.65)] overflow-hidden">
            {t.process.weeks.map((week, colIdx) => {
              const verticalCascadeSpaces = [
                'pt-0',
                'lg:pt-14',
                'lg:pt-28',
              ];

              return (
                <motion.div
                  key={week.label}
                  custom={colIdx}
                  variants={columnVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.2 }}
                  className="relative flex flex-col p-6 sm:p-8 lg:p-9 min-h-[380px] sm:min-h-[430px] lg:min-h-[480px]"
                >
                  {/* Column Header: Week Label + Green Dot + Title */}
                  <div className="flex flex-col pb-6 mb-6 border-b border-white/[0.07]">
                    <div className="flex items-center">
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full bg-[#a3e635] shrink-0"
                          style={{
                            boxShadow:
                              '0 0 10px rgba(163, 230, 53, 0.8), 0 0 20px rgba(163, 230, 53, 0.4)',
                          }}
                        />
                        <h3 className="font-mono text-[13px] uppercase tracking-[0.2em] text-white font-bold m-0">
                          {week.label}
                        </h3>
                      </div>
                    </div>

                    <p className="font-geist text-[15px] text-[#9ca3af] font-normal mt-2 pl-5">
                      {week.title}
                    </p>
                  </div>

                  {/* Staggered Task Bars Container */}
                  <div
                    className={`flex flex-col gap-3.5 sm:gap-4 flex-1 justify-start ${verticalCascadeSpaces[colIdx]}`}
                  >
                    {week.tasks.map((task, taskIdx) => {
                      const shiftLeft =
                        WEEK_SHIFTS[colIdx]?.[taskIdx] ?? '0%';
                      const innerGap =
                        TASK_GAPS[colIdx]?.[taskIdx] ?? '1.25rem';

                      return (
                        <motion.div
                          key={task.title}
                          variants={taskBarVariants}
                          whileHover={{
                            y: -3,
                            scale: 1.015,
                            transition: { duration: 0.2 },
                          }}
                          className="w-full flex items-center"
                        >
                          <div
                            style={{
                              marginLeft: shiftLeft,
                            }}
                            className="max-sm:!ml-0 w-fit max-w-full group relative rounded-[10px] bg-[#16181d]/90 hover:bg-[#1c1f26] border border-white/[0.08] hover:border-[#a3e635]/50 px-4 py-3 sm:px-4.5 sm:py-3.5 transition-colors duration-250 cursor-default shadow-[0_8px_20px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]"
                          >
                            <span
                              className="absolute left-0 top-2.5 bottom-2.5 w-[2.5px] rounded-r-full bg-[#a3e635]/40 group-hover:bg-[#a3e635] group-hover:shadow-[0_0_10px_#a3e635] transition-all duration-250"
                              aria-hidden="true"
                            />

                            <div
                              style={{ gap: innerGap }}
                              className="flex items-center justify-between pl-1.5"
                            >
                              <span className="font-geist font-semibold text-[13.5px] sm:text-[14.5px] text-white group-hover:text-[#f8fafc] tracking-[-0.01em] leading-snug">
                                {task.title}
                              </span>
                              <span className="sr-only">{' — '}</span>
                              <span className="shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/[0.06] group-hover:bg-[#a3e635]/15 border border-white/[0.08] group-hover:border-[#a3e635]/40 font-mono text-[11px] text-[#9ca3af] group-hover:text-[#a3e635] transition-colors duration-250 whitespace-nowrap">
                                {task.duration}
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Bottom Line under Process */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="flex items-center justify-center pt-2 text-center"
        >
          <p className="font-geist text-[14px] sm:text-[15.5px] text-neutral-300 max-w-2xl leading-relaxed">
            {t.process.bottomLine}
          </p>
        </motion.div>
      </div>
    </section>
  );
};
