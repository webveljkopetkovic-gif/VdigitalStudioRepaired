import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n';

interface StackingCardData {
  id: string;
  number: string;
  titleWhite: string;
  titleGrey: string;
  tags: string[];
  text: string;
  bgGradient: string;
  glowColor: string;
  borderColor: string;
  accentDotColor: string;
}

const CARD_STYLES = [
  {
    bgGradient: 'linear-gradient(135deg, #211f16 0%, #171611 45%, #11110e 100%)',
    glowColor: 'rgba(234, 179, 8, 0.14)',
    borderColor: 'rgba(253, 224, 71, 0.16)',
    accentDotColor: '#facc15',
  },
  {
    bgGradient: 'linear-gradient(135deg, #241914 0%, #181210 45%, #110e0d 100%)',
    glowColor: 'rgba(249, 115, 22, 0.16)',
    borderColor: 'rgba(251, 146, 60, 0.18)',
    accentDotColor: '#fb923c',
  },
  {
    bgGradient: 'linear-gradient(135deg, #12211e 0%, #0e1816 45%, #0b1110 100%)',
    glowColor: 'rgba(20, 184, 166, 0.16)',
    borderColor: 'rgba(45, 212, 191, 0.18)',
    accentDotColor: '#2dd4bf',
  },
  {
    bgGradient: 'linear-gradient(135deg, #182311 0%, #11190d 45%, #0b1009 100%)',
    glowColor: 'rgba(168, 243, 0, 0.16)',
    borderColor: 'rgba(168, 243, 0, 0.22)',
    accentDotColor: '#a8f300',
  },
];

interface StackingCardItemProps {
  service: StackingCardData;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  cardButtonLabel: string;
  onBookCall: () => void;
}

const StackingCardItem: React.FC<StackingCardItemProps> = ({
  service,
  index,
  total,
  scrollYProgress,
  cardButtonLabel,
  onBookCall,
}) => {
  const step = 1 / total;
  const enterStart = Math.max(0, index * step - 0.05);
  const enterEnd = index * step + step * 0.68;

  const y = useTransform(
    scrollYProgress,
    index === 0 ? [0, 1] : [enterStart, enterEnd],
    index === 0 ? ['0%', '0%'] : ['115%', '0%']
  );

  const nextStart = (index + 1) * step;
  const scale = useTransform(
    scrollYProgress,
    [nextStart, 1],
    [1, 1 - (total - 1 - index) * 0.035]
  );

  const brightness = useTransform(
    scrollYProgress,
    [nextStart, 1],
    [1, 1 - (total - 1 - index) * 0.12]
  );

  const topOffset = index * 24;

  return (
    <motion.div
      style={{
        y,
        scale,
        filter: useTransform(brightness, (b) => `brightness(${b})`),
        top: `${topOffset}px`,
        zIndex: index + 10,
        background: service.bgGradient,
        borderColor: service.borderColor,
      }}
      className="absolute inset-x-0 mx-auto w-full h-[380px] sm:h-[420px] md:h-[440px] rounded-[28px] sm:rounded-[36px] border p-6 sm:p-10 md:p-12 flex flex-col justify-between shadow-[0_-20px_60px_rgba(0,0,0,0.85),0_30px_70px_rgba(0,0,0,0.95)] overflow-hidden select-none origin-top backdrop-blur-xl"
    >
      {/* Internal Radial Warm Glow matching reference image */}
      <div
        className="absolute -top-24 -left-24 w-[480px] h-[480px] rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, ${service.glowColor} 0%, transparent 70%)`,
          filter: 'blur(40px)',
        }}
        aria-hidden="true"
      />

      {/* Top Specular Highlight Line */}
      <div
        className="absolute top-0 inset-x-12 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Top Area: Large 2-Line Headline + Book a call button */}
      <div className="flex items-start justify-between gap-4 relative z-10">
        <h3>
          <span className="block font-geist text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.04]">
            {service.titleWhite}
          </span>
          <span className="block font-geist text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-neutral-400 tracking-tight leading-[1.04] mt-0.5">
            {service.titleGrey}
          </span>
        </h3>

        {/* Top-Right CTA Button */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onBookCall();
            }}
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-[#a8f300] text-white hover:text-black border border-white/15 hover:border-[#a8f300] text-[12px] sm:text-[13px] font-medium transition-all duration-200 cursor-pointer"
          >
            <span>{cardButtonLabel}</span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* Tags Row */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 my-auto pt-4">
        {service.tags.map((tag, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/35 border border-white/10 text-[11px] sm:text-[12px] font-mono text-neutral-300"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: service.accentDotColor }}
              aria-hidden="true"
            />
            {tag}
          </span>
        ))}
      </div>

      {/* Bottom Area: Giant Counter Left ("01") + Description Right */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 relative z-10 mt-auto">
        <div className="font-geist text-5xl sm:text-7xl md:text-8xl font-semibold text-white tracking-tighter leading-[0.82]">
          {service.number}
        </div>

        <p className="font-geist text-xs sm:text-sm md:text-[15px] text-neutral-200/90 max-w-[380px] sm:text-right leading-relaxed font-normal">
          {service.text}
        </p>
      </div>
    </motion.div>
  );
};

interface StickyServicesSectionProps {
  onBookCall?: () => void;
}

export const StickyServicesSection: React.FC<StickyServicesSectionProps> = ({
  onBookCall,
}) => {
  const { t } = useI18n();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const cards: StackingCardData[] = t.services.cards.map((c, idx) => ({
    ...c,
    ...CARD_STYLES[idx % CARD_STYLES.length],
  }));

  const handleBookCall = () => {
    if (onBookCall) {
      onBookCall();
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      id="services"
      aria-label={t.services.label}
      className="relative w-full h-[520vh] bg-[#060709]"
    >
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-4 sm:px-8 lg:px-16">
        {/* Subtle Background Ambient Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[420px] rounded-full bg-[#a8f300]/[0.03] blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="w-full max-w-6xl mx-auto flex flex-col">
          {/* Compact Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[#a8f300] text-[10px] font-mono uppercase tracking-[0.2em] mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#a8f300] animate-pulse" />
                {t.services.label}
              </div>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-geist font-semibold tracking-tight text-white leading-[1.08]">
                {t.services.heading}
              </h2>
            </div>

            <p className="text-neutral-400 text-xs sm:text-sm max-w-xs font-geist">
              {t.services.hint}
            </p>
          </div>

          {/* Stacking Cards Deck Container */}
          <div className="relative w-full h-[460px] sm:h-[500px] md:h-[520px]">
            {cards.map((service, index) => (
              <StackingCardItem
                key={service.id}
                service={service}
                index={index}
                total={cards.length}
                scrollYProgress={scrollYProgress}
                cardButtonLabel={t.services.cardButton}
                onBookCall={handleBookCall}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
