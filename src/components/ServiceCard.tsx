import React from 'react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  item: ServiceItem;
  isActive: boolean;
  onHover: (id: string) => void;
  onSelect: (id: string) => void;
  onGetStarted: (item: ServiceItem) => void;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  item,
  isActive,
  onHover,
  onSelect,
  onGetStarted,
}) => {
  return (
    <div
      id={`card-${item.id}`}
      onMouseEnter={() => onHover(item.id)}
      onClick={() => onSelect(item.id)}
      className={`group relative w-full min-w-0 transition-all duration-300 ease-out cursor-pointer select-none rounded-2xl overflow-hidden border ${
        isActive
          ? 'z-30 h-[260px] sm:h-[285px] bg-[#12141a] border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.85)] scale-[1.02] sm:scale-[1.03] -translate-y-2 sm:-translate-y-3'
          : 'z-10 h-[205px] sm:h-[225px] bg-[#0c0e12]/90 border-white/[0.08] hover:border-white/20 hover:bg-[#101217]'
      }`}
    >
      {/* Background visual artwork for active or image cards */}
      {item.image && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={item.image}
            alt={item.title}
            className={`w-full h-full object-cover transition-transform duration-500 ease-out pointer-events-none ${
              isActive ? 'scale-105 opacity-90' : 'scale-100 opacity-30 group-hover:opacity-50'
            }`}
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
        </div>
      )}

      {/* Card Content Overlay */}
      <div className="relative h-full p-4 sm:p-5 flex flex-col justify-between z-10">
        {/* Top Header: Pill outline badge matching screenshot */}
        <div>
          <span className="inline-block text-[10px] sm:text-[11px] font-medium tracking-wide text-neutral-300 border border-white/20 bg-white/5 backdrop-blur-md px-3 py-1 rounded-full">
            {item.pill}
          </span>
        </div>

        {/* Bottom Bar: Title & Action Button */}
        <div className="mt-auto pt-2">
          <h3 className="text-white text-[15px] sm:text-[17px] font-medium tracking-tight">
            {item.title}
          </h3>

          {isActive && (
            <div className="mt-3">
              <button
                id={`btn-get-started-${item.id}`}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onGetStarted(item);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white text-neutral-950 text-[11px] sm:text-[12px] font-semibold tracking-tight shadow-md hover:bg-neutral-100 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <span>Get started</span>
                <span className="text-[12px] leading-none">→</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
