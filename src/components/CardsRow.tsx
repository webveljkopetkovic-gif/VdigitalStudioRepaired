import React, { useEffect, useState, useRef, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ServiceItem } from '../types';
import { ServiceCard } from './ServiceCard';

interface CardsRowProps {
  services: ServiceItem[];
  activeId: string;
  onSelect: (id: string) => void;
  onGetStarted: (item: ServiceItem) => void;
}

export const CardsRow: React.FC<CardsRowProps> = ({
  services,
  activeId,
  onSelect,
  onGetStarted,
}) => {
  const [isUserHovering, setIsUserHovering] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartXRef = useRef<number | null>(null);

  // We show all 6 services matching the 6 cards
  const displayServices = useMemo(() => services.slice(0, 6), [services]);

  // Split into pairs of 2 for mobile and tablet:
  // Slide 0: [0, 1] -> Slide 1: [2, 3] -> Slide 2: [4, 5] -> then loops back to Slide 0
  const slides = useMemo(() => [
    [displayServices[0], displayServices[1]],
    [displayServices[2], displayServices[3]],
    [displayServices[4], displayServices[5]],
  ], [displayServices]);

  // Mobile/Tablet automatic slider loop: updates currentSlide index only
  useEffect(() => {
    if (isUserHovering) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3800);

    return () => clearInterval(interval);
  }, [isUserHovering]);

  // Safely synchronize activeId when currentSlide changes on mobile/tablet
  useEffect(() => {
    const currentPair = slides[currentSlide];
    if (currentPair && currentPair[0] && !currentPair.some((item) => item?.id === activeId)) {
      onSelect(currentPair[0].id);
    }
  }, [currentSlide, slides, activeId, onSelect]);

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    setIsUserHovering(true);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartXRef.current - touchEndX;
      if (diff > 45) {
        handleNextSlide();
      } else if (diff < -45) {
        handlePrevSlide();
      }
      touchStartXRef.current = null;
    }
    setTimeout(() => setIsUserHovering(false), 2000);
  };

  return (
    <section 
      id="services-section" 
      className="relative w-full py-14 sm:py-20 bg-[#060709] border-t border-white/[0.06] select-none overflow-hidden"
      onMouseEnter={() => setIsUserHovering(true)}
      onMouseLeave={() => setIsUserHovering(false)}
    >
      {/* Section Header */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 mb-6 sm:mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-[11px] font-medium text-neutral-300 mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#a8f300]" />
            <span>Expertise &amp; Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-geist font-medium text-white tracking-tight">
            Specialized disciplines designed for scale
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-neutral-400 font-geist max-w-md">
          Explore our capabilities across strategy, design, and high-performance digital experiences.
        </p>
      </div>

      {/* 1. MOBILE & TABLET SLIDER (< lg): Shows 2 cards -> slides to next 2 -> then back to first */}
      <div className="block lg:hidden w-full max-w-xl md:max-w-2xl mx-auto px-4">
        {/* Slider Frame */}
        <div 
          className="relative overflow-hidden rounded-2xl py-3"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {slides.map((pair, slideIdx) => (
              <div 
                key={`slide-${slideIdx}`} 
                className="w-full shrink-0 grid grid-cols-2 items-end gap-3 sm:gap-4 px-1 min-h-[300px]"
              >
                {pair.map((item) => (
                  <ServiceCard
                    key={item.id}
                    item={item}
                    isActive={item.id === activeId}
                    onHover={onSelect}
                    onSelect={onSelect}
                    onGetStarted={onGetStarted}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Slider Navigation Controls */}
        <div className="flex items-center justify-between mt-3 px-1">
          {/* Indicator Pills for 3 pairs */}
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={`dot-${idx}`}
                type="button"
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx 
                    ? 'w-7 bg-[#a8f300]' 
                    : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide pair ${idx + 1}`}
              />
            ))}
          </div>

          {/* Slide Count & Left/Right Arrow Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-neutral-400 mr-1">
              0{currentSlide + 1} / 0{slides.length}
            </span>
            <button
              type="button"
              onClick={handlePrevSlide}
              className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 text-white active:scale-95 transition-all cursor-pointer"
              aria-label="Previous 2 cards"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNextSlide}
              className="p-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/15 text-white active:scale-95 transition-all cursor-pointer"
              aria-label="Next 2 cards"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 2. DESKTOP VIEW (lg+): Full 100vw Edge-to-Edge Panoramic Cards Strip */}
      <div className="hidden lg:block w-screen max-w-full px-6 lg:px-9 xl:px-10 overflow-hidden">
        <div className="w-full flex items-end justify-between gap-3.5 xl:gap-4 overflow-x-auto no-scrollbar py-6 min-h-[320px]">
          {displayServices.map((item) => (
            <ServiceCard
              key={item.id}
              item={item}
              isActive={item.id === activeId}
              onHover={onSelect}
              onSelect={onSelect}
              onGetStarted={onGetStarted}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
