import React from 'react';
import { Send } from 'lucide-react';
import { TELEGRAM_URL, WHATSAPP_URL } from '../config';
import { useI18n } from '../i18n';
import { WhatsAppIcon } from './BrandIcons';
import { trackMessengerClick } from '../utils/analytics';

export const FloatingChatButton: React.FC = () => {
  const { locale } = useI18n();
  const isRussian = locale === 'ru';

  const href = isRussian ? TELEGRAM_URL : WHATSAPP_URL;
  const label = isRussian ? 'Chat on Telegram' : 'Chat on WhatsApp';

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center gap-2.5">
      {/* WhatsApp / Telegram Direct Chat Button */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        title={label}
        onClick={() =>
          trackMessengerClick(isRussian ? 'telegram' : 'whatsapp', 'floating_button')
        }
        className="group flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[color:var(--vd-9ce607)] hover:bg-[color:var(--vd-abf50a)] text-[color:var(--vd-0a0c09)] font-geist font-bold text-[13px] sm:text-[14px] shadow-[0_10px_30px_color-mix(in_srgb,var(--vd-9ce607)_40%,transparent),inset_0_1px_1px_color-mix(in_srgb,var(--vd-ffffff)_65%,transparent)] transition-all duration-200 hover:scale-105 active:scale-95"
      >
        {isRussian ? (
          <>
            <Send className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.3]" />
            <span>Telegram</span>
          </>
        ) : (
          <>
            <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>WhatsApp</span>
          </>
        )}
      </a>
    </div>
  );
};
