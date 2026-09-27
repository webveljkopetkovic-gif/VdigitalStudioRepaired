import React from 'react';
import { Send } from 'lucide-react';
import { TELEGRAM_URL, WHATSAPP_URL } from '../config';
import { useI18n } from '../i18n';
import { WhatsAppIcon } from './BrandIcons';

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
        className="group flex items-center gap-2.5 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-[#9ce607] hover:bg-[#abf50a] text-[#0a0c09] font-geist font-bold text-[13px] sm:text-[14px] shadow-[0_10px_30px_rgba(156,230,7,0.4),inset_0_1px_1px_rgba(255,255,255,0.65)] transition-all duration-200 hover:scale-105 active:scale-95"
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
