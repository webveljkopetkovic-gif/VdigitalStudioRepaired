import React, { useEffect, useState } from 'react';

export const KineticCarouselText: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Words sequence matching design: "creative", "modern", "digital"
  const words = ['creative', 'modern', 'digital', 'creative', 'modern', 'digital'];

  const renderSegment = (keyPrefix: string) => (
    <div key={keyPrefix} className="flex items-center shrink-0">
      {words.map((word, idx) => (
        <span
          key={`${keyPrefix}-${word}-${idx}`}
          className="inline-block mx-6 sm:mx-10 md:mx-16 text-[250px] sm:text-[320px] md:text-[380px] lg:text-[420px] xl:text-[460px] font-geist font-black tracking-[-0.04em] leading-none select-none"
          style={{
            // 3D volumetric neon-lime gradient and deep ambient drop shadow matching original
            background: 'linear-gradient(180deg, #dcfce7 0%, #bef264 15%, #a8f300 45%, #65a30d 80%, #203a05 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            filter: 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.9))',
          }}
        >
          {word}
        </span>
      ))}
    </div>
  );

  return (
    <div 
      id="kinetic-carousel-container"
      aria-hidden="true"
      style={{ zIndex: 5 }}
      className="absolute top-[38%] sm:top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen max-w-full pointer-events-none select-none overflow-visible"
    >
      {/* Infinite looping marquee with 3D volumetric lettering (client-only after mount) */}
      {mounted && (
        <div className="animate-marquee-carousel flex items-center whitespace-nowrap">
          {renderSegment('seg-1')}
          {renderSegment('seg-2')}
        </div>
      )}

      {/* Atmospheric soft blurred color glows instead of hard 3D spheres - positioned up and down away from text */}
      
      {/* 1. Far Left Ambient Glow - Shifted far outside to the left margin */}
      <div 
        className="absolute top-[-60px] -left-48 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#bef264]/12 blur-[100px] pointer-events-none opacity-80" 
        aria-hidden="true"
      />

      {/* 2. Top-Right Ambient Glow - Lifted high into the upper right corner */}
      <div 
        className="absolute -top-44 right-[6%] w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-[#a8f300]/15 blur-[90px] pointer-events-none opacity-80" 
        aria-hidden="true"
      />

      {/* 3. Bottom-Right Ambient Glow - Pushed low down into the outer corner */}
      <div 
        className="absolute -bottom-40 -right-40 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-[#84cc16]/15 blur-[110px] pointer-events-none opacity-80" 
        aria-hidden="true"
      />
    </div>
  );
};
