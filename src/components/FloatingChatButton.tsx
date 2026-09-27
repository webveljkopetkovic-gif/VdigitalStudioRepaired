import React from 'react';
import { MessageCircle, MessageSquare, Send } from 'lucide-react';
import { TELEGRAM_URL, WHATSAPP_URL } from '../config';
import { useI18n } from '../i18n';
import { triggerLiveChat } from './TawkToChat';

export const FloatingChatButton: React.FC = () => {
  const { locale, t } = useI18n();
  const isRussian = locale === 'ru';

  const href = isRussian ? TELEGRAM_URL : WHATSAPP_URL;
  const label = isRussian ? 'Chat on Telegram' : 'Chat on WhatsApp';

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center gap-2.5">
      {/* Live Tawk.to Chat Button */}
      <button
        type="button"
        onClick={triggerLiveChat}
        aria-label={t.contactPage.liveChatButton}
        title={t.contactPage.liveChatButton}
        className="group flex items-center gap-2 px-4 py-3 sm:px-4.5 sm:py-3.5 rounded-full bg-[#141416]/95 hover:bg-[#1d1e22] text-white border border-white/15 hover:border-[#b6ff00]/60 font-geist font-semibold text-[13px] sm:text-[13.5px] shadow-[0_10px_30px_rgba(0,0,0,0.65)] backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      >
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b6ff00] opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#b6ff00]" />
        </span>
        <MessageSquare className="w-4 h-4 text-[#b6ff00]" />
        <span className="hidden sm:inline">Live Chat</span>
      </button>

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
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.3]" />
            <span>WhatsApp</span>
          </>
        )}
      </a>
    </div>
  );
};
