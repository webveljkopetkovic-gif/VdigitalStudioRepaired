import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { getServicePath, ServiceSlug, useI18n } from '../i18n';
import { trackBookCallClick } from '../utils/analytics';

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
    bgGradient: 'linear-gradient(135deg, var(--vd-211f16) 0%, var(--vd-171611) 45%, var(--vd-11110e) 100%)',
    glowColor: 'rgba(234, 179, 8, 0.14)',
    borderColor: 'rgba(253, 224, 71, 0.16)',
    accentDotColor: '#facc15',
  },
  {
    bgGradient: 'linear-gradient(135deg, var(--vd-241914) 0%, var(--vd-181210) 45%, var(--vd-110e0d) 100%)',
    glowColor: 'rgba(249, 115, 22, 0.16)',
    borderColor: 'rgba(251, 146, 60, 0.18)',
    accentDotColor: '#fb923c',
  },
  {
    bgGradient: 'linear-gradient(135deg, var(--vd-12211e) 0%, var(--vd-0e1816) 45%, var(--vd-0b1110) 100%)',
    glowColor: 'color-mix(in srgb, var(--vd-14b8a6) 16%, transparent)',
    borderColor: 'color-mix(in srgb, var(--vd-2dd4bf) 18%, transparent)',
    accentDotColor: 'var(--vd-2dd4bf)',
  },
  {
    bgGradient: 'linear-gradient(135deg, var(--vd-182311) 0%, var(--vd-11190d) 45%, var(--vd-0b1009) 100%)',
    glowColor: 'color-mix(in srgb, var(--vd-a8f300) 16%, transparent)',
    borderColor: 'color-mix(in srgb, var(--vd-a8f300) 22%, transparent)',
    accentDotColor: 'var(--vd-a8f300)',
  },
];

const SERVICE_SLUGS: ServiceSlug[] = [
  'web-development',
  'video-social-media',
  'marketing-automation',
  'cold-calling',
];

interface StackingCardItemProps {
  service: StackingCardData;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  cardButtonLabel: string;
  serviceUrl: string;
}

const StackingCardItem: React.FC<StackingCardItemProps> = ({
  service,
  index,
  total,
  scrollYProgress,
  cardButtonLabel,
  serviceUrl,
}) => {
  const navigate = useNavigate();
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
  const brightnessFilter = useTransform(brightness, (b) => `brightness(${b})`);
  const isSSR = typeof window === 'undefined';

  const topOffset = index * 24;

  return (
    <motion.div
      style={{
        ...(isSSR
          ? {}
          : {
              y,
              scale,
              filter: brightnessFilter,
            }),
        top: `${topOffset}px`,
        zIndex: index + 10,
        background: service.bgGradient,
        borderColor: service.borderColor,
      }}
      className="absolute inset-x-0 mx-auto w-full h-[380px] sm:h-[420px] md:h-[440px] rounded-[28px] sm:rounded-[36px] border p-6 sm:p-10 md:p-12 flex flex-col justify-between shadow-[0_-20px_60px_color-mix(in_srgb,var(--vd-000000)_85%,transparent),0_30px_70px_color-mix(in_srgb,var(--vd-000000)_95%,transparent)] overflow-hidden select-none origin-top backdrop-blur-xl"
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

      {/* Top Area: Large 2-Line Headline + Service Page Link button */}
      <div className="flex items-start justify-between gap-4 relative z-10">
        <h3>
          <a
            href={serviceUrl}
            onClick={(e) => {
              e.preventDefault();
              navigate(serviceUrl);
            }}
            className="group/heading block cursor-pointer transition-opacity hover:opacity-90"
          >
            <span className="block font-geist text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white tracking-tight leading-[1.04]">
              {service.titleWhite}{' '}
            </span>
            <span className="block font-geist text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-neutral-400 tracking-tight leading-[1.04] mt-0.5">
              {service.titleGrey}
            </span>
          </a>
        </h3>

        {/* Top-Right CTA Button linking to service page */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <a
            href={serviceUrl}
            onClick={(e) => {
              e.preventDefault();
              navigate(serviceUrl);
            }}
            className="group inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-[color:var(--vd-a8f300)] text-white hover:text-black border border-white/15 hover:border-[color:var(--vd-a8f300)] text-[12px] sm:text-[13px] font-medium transition-all duration-200 cursor-pointer"
          >
            <span>{cardButtonLabel}</span>
            <span
              aria-hidden="true"
              className="text-[color:var(--vd-a8f300)] group-hover:text-black font-bold transition-transform group-hover:translate-x-0.5"
            >
              →
            </span>
          </a>
        </div>
      </div>

      {/* Tags Row */}
      <ul className="relative z-10 flex flex-wrap items-center gap-2 my-auto pt-4 list-none p-0 m-0">
        {service.tags.map((tag, idx) => (
          <li
            key={idx}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/35 border border-white/10 text-[11px] sm:text-[12px] font-mono text-neutral-300"
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: service.accentDotColor }}
              aria-hidden="true"
            />
            {tag}
          </li>
        ))}
      </ul>

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
  const { locale, t, contactPath } = useI18n();
  const navigate = useNavigate();
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
    trackBookCallClick('services');
    if (onBookCall) {
      onBookCall();
    } else {
      navigate(contactPath);
    }
  };

  return (
    <section
      ref={containerRef}
      id="services"
      aria-label={t.services.label}
      className="relative w-full h-[520vh] bg-[color:var(--vd-060709)]"
    >
      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-4 sm:px-8 lg:px-16">
        {/* Subtle Background Ambient Glow */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[420px] rounded-full bg-[color:var(--vd-a8f300)]/[0.03] blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        <div className="w-full max-w-6xl mx-auto flex flex-col">
          {/* Compact Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-[color:var(--vd-a8f300)] text-[10px] font-mono uppercase tracking-[0.2em] mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--vd-a8f300)] animate-pulse" />
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
            {cards.map((service, index) => {
              const slug = SERVICE_SLUGS[index % SERVICE_SLUGS.length];
              const serviceUrl = getServicePath(slug, locale);
              return (
                <StackingCardItem
                  key={service.id}
                  service={service}
                  index={index}
                  total={cards.length}
                  scrollYProgress={scrollYProgress}
                  cardButtonLabel={t.services.cardButton}
                  serviceUrl={serviceUrl}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
