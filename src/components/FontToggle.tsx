import React from 'react';
import { TypographyPairing } from '../types';

interface FontToggleProps {
  currentMode: TypographyPairing;
  onChange: (mode: TypographyPairing) => void;
}

export const FontToggle: React.FC<FontToggleProps> = ({ currentMode, onChange }) => {
  return (
    <div className="fixed bottom-4 right-4 z-40">
      <div 
        id="typography-selector"
        className="flex items-center gap-1 p-1 bg-white/90 backdrop-blur-md rounded-full shadow-lg border border-neutral-200/80 text-[11px] font-medium text-neutral-600 select-none"
      >
        <span className="px-2.5 py-0.5 text-neutral-400 font-normal">Fonts:</span>
        <button
          type="button"
          onClick={() => onChange('curated')}
          className={`px-3 py-1 rounded-full transition-all duration-200 cursor-pointer ${
            currentMode === 'curated'
              ? 'bg-neutral-900 text-white shadow-sm'
              : 'hover:text-neutral-900 hover:bg-neutral-100'
          }`}
          title="Geist Sans + PP Editorial New pairing"
        >
          Geist + PP Editorial
        </button>
        <button
          type="button"
          onClick={() => onChange('editorial')}
          className={`px-2.5 py-1 rounded-full font-editorial transition-all duration-200 cursor-pointer ${
            currentMode === 'editorial'
              ? 'bg-neutral-900 text-white shadow-sm'
              : 'hover:text-neutral-900 hover:bg-neutral-100'
          }`}
          title="PP Editorial New Display"
        >
          PP Editorial
        </button>
        <button
          type="button"
          onClick={() => onChange('geist')}
          className={`px-2.5 py-1 rounded-full font-geist transition-all duration-200 cursor-pointer ${
            currentMode === 'geist'
              ? 'bg-neutral-900 text-white shadow-sm'
              : 'hover:text-neutral-900 hover:bg-neutral-100'
          }`}
          title="Geist Modern Sans"
        >
          Geist
        </button>
      </div>
    </div>
  );
};
