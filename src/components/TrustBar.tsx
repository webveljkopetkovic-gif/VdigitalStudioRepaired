import React from 'react';
import { useI18n } from '../i18n';

export const TrustBar: React.FC = () => {
  const { t } = useI18n();

  return (
    <div
      id="trust"
      className="w-full max-w-6xl mx-auto px-4 sm:px-8 pt-2 pb-1 relative z-20 select-none"
    >
      <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-5 gap-y-2 text-center font-geist text-[12px] sm:text-[13.5px] text-neutral-300/90 tracking-[-0.01em]">
        {t.trustBar.items.map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="whitespace-nowrap">{item}</span>
            {idx < t.trustBar.items.length - 1 && (
              <span
                className="text-[#9ce607] font-bold select-none"
                aria-hidden="true"
              >
                ·
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
