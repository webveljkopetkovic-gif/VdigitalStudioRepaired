import React from 'react';

export const SunburstRays: React.FC<{ className?: string }> = ({ className = '' }) => {
  // 56 distinct, bold, thicker rays with generous dark gaps matching the screenshot
  const rayCount = 56;
  const rays = Array.from({ length: rayCount }, (_, i) => {
    const angle = (i * 360) / rayCount;
    // Rhythmic pattern of bold, distinct rays (major, medium, standard)
    let length = 345;
    let strokeWidth = 2.8;
    let opacity = 0.95;

    if (i % 4 === 0) {
      // Bold major ray
      length = 370;
      strokeWidth = 4.2;
      opacity = 1.0;
    } else if (i % 2 === 0) {
      // Medium prominent ray
      length = 340;
      strokeWidth = 3.2;
      opacity = 0.9;
    } else {
      // Standard ray
      length = 310;
      strokeWidth = 2.4;
      opacity = 0.82;
    }

    return { angle, length, strokeWidth, opacity };
  });

  return (
    <div 
      id="sunburst-rays-container"
      className={`pointer-events-none select-none relative flex items-center justify-center opacity-[0.05] ${className}`}
      style={{ opacity: 0.05 }}
    >
      <svg
        viewBox="0 0 800 800"
        className="w-full h-full animate-sunburst-smooth"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Radial gradient with neon-lime colorway of 'creative' */}
          <radialGradient 
            id="sunburstThickLimeRadial" 
            gradientUnits="userSpaceOnUse" 
            cx="0" 
            cy="0" 
            r="380"
          >
            <stop offset="0%" style={{ stopColor: 'var(--vd-ecfccb)' }} stopOpacity="1" />
            <stop offset="18%" style={{ stopColor: 'var(--vd-bef264)' }} stopOpacity="0.98" />
            <stop offset="45%" style={{ stopColor: 'var(--vd-a8f300)' }} stopOpacity="0.95" />
            <stop offset="72%" style={{ stopColor: 'var(--vd-65a30d)' }} stopOpacity="0.8" />
            <stop offset="90%" style={{ stopColor: 'var(--vd-365314)' }} stopOpacity="0.45" />
            <stop offset="100%" style={{ stopColor: 'var(--vd-142602)' }} stopOpacity="0" />
          </radialGradient>

          {/* Central circular atmospheric glow behind rays */}
          <radialGradient 
            id="sunburstCenterAuraThick" 
            gradientUnits="userSpaceOnUse" 
            cx="400" 
            cy="400" 
            r="320"
          >
            <stop offset="0%" style={{ stopColor: 'var(--vd-a8f300)' }} stopOpacity="0.3" />
            <stop offset="35%" style={{ stopColor: 'var(--vd-bef264)' }} stopOpacity="0.15" />
            <stop offset="65%" style={{ stopColor: 'var(--vd-65a30d)' }} stopOpacity="0.06" />
            <stop offset="100%" style={{ stopColor: 'var(--vd-060709)' }} stopOpacity="0" />
          </radialGradient>

          {/* Glow filter for neon rays */}
          <filter id="thickRayGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="2.2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Soft atmospheric circular glow disk in the center */}
        <circle cx="400" cy="400" r="320" fill="url(#sunburstCenterAuraThick)" />

        {/* Radiating circular needle rays in all 360 degrees */}
        <g transform="translate(400, 400)" filter="url(#thickRayGlow)">
          {rays.map((ray, idx) => (
            <line
              key={`ray-${idx}`}
              x1="0"
              y1="82"
              x2="0"
              y2={ray.length}
              stroke="url(#sunburstThickLimeRadial)"
              strokeWidth={ray.strokeWidth}
              strokeOpacity={ray.opacity}
              strokeLinecap="round"
              transform={`rotate(${ray.angle})`}
            />
          ))}
        </g>
      </svg>
    </div>
  );
};
