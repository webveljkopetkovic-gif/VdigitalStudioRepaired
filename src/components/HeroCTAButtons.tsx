import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowDown } from 'lucide-react';
import { useI18n } from '../i18n';

interface HeroCTAButtonsProps {
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export const HeroCTAButtons: React.FC<HeroCTAButtonsProps> = ({
  onPrimaryClick,
  onSecondaryClick,
}) => {
  const { t, contactPath } = useI18n();
  const navigate = useNavigate();

  const handlePrimary = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onPrimaryClick) {
      onPrimaryClick();
    } else {
      navigate(contactPath);
    }
  };

  const handleSecondary = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onSecondaryClick) {
      onSecondaryClick();
    } else {
      document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      id="hero-cta-group"
      className="relative z-20 flex flex-wrap items-center justify-center gap-4 sm:gap-5 px-4 mb-5 sm:mb-7"
    >
      {/* 1. Primary CTA: Beveled Neon Lime Pill Button "Book a free call →" */}
      <a
        href={contactPath}
        id="btn-hero-get-started"
        onClick={handlePrimary}
        className="group relative inline-flex items-center cursor-pointer select-none focus:outline-none hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
      >
        {/* Soft Ambient Outer Neon Glow underneath the button */}
        <span
          className="absolute -inset-2 rounded-full bg-[#a8f300]/30 blur-xl opacity-85 group-hover:opacity-100 group-hover:bg-[#a8f300]/45 transition-all duration-300 pointer-events-none"
          aria-hidden="true"
        />

        {/* Outer Metallic Dark Bevel / Rim Ring */}
        <span className="relative p-[2.5px] rounded-full bg-gradient-to-b from-[#e2f999]/80 via-[#3f6212] to-[#1a2e05] shadow-[0_10px_28px_rgba(0,0,0,0.85),0_0_20px_rgba(168,243,0,0.3)]">
          {/* Inner Glossy Neon Lime Pill Surface */}
          <span
            className="relative flex items-center gap-2.5 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-b from-[#d9f99d] via-[#a8f300] to-[#84cc16] text-[#090d03] font-geist font-bold text-[13px] sm:text-[14px] tracking-[-0.01em] shadow-[inset_0_2px_2px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(63,98,18,0.45)]"
          >
            <span>{t.hero.primaryCta}</span>
            <span
              className="text-[15px] leading-none transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
          </span>
        </span>
      </a>

      {/* 2. Secondary CTA: "See how we work" with arrow-down icon */}
      <a
        href="#process"
        id="btn-hero-watch-video"
        onClick={handleSecondary}
        className="group relative inline-flex items-center cursor-pointer select-none focus:outline-none hover:scale-[1.03] active:scale-[0.98] transition-transform duration-200"
      >
        {/* Outer Subtle Silver/Dark Rim */}
        <span className="relative p-[1.5px] rounded-full bg-gradient-to-b from-white/35 via-white/10 to-white/5 shadow-[0_10px_28px_rgba(0,0,0,0.85)] group-hover:from-white/50 group-hover:via-white/20 transition-all duration-200">
          {/* Inner Matte Dark Charcoal Pill Surface */}
          <span className="relative flex items-center gap-2.5 px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-gradient-to-b from-[#20232a] via-[#13151a] to-[#0a0c0f] text-white font-geist font-medium text-[13px] sm:text-[14px] tracking-[-0.01em] shadow-[inset_0_1px_1px_rgba(255,255,255,0.18)]">
            <ArrowDown className="w-3.5 h-3.5 text-white group-hover:text-[#a8f300] transition-all duration-200 group-hover:translate-y-0.5" />
            <span className="text-neutral-100 group-hover:text-white transition-colors">
              {t.hero.secondaryCta}
            </span>
          </span>
        </span>
      </a>
    </div>
  );
};
