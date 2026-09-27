import React, { useEffect, useState, useRef } from 'react';
import { MessageSquare, X, Send, CheckCircle2 } from 'lucide-react';
import {
  CONTACT_EMAIL,
  TAWK_TO_PROPERTY_ID,
  TAWK_TO_WIDGET_ID,
  TELEGRAM_URL,
  TELEGRAM_USERNAME,
  WEB3FORMS_ACCESS_KEY,
  WHATSAPP_URL,
} from '../config';
import { useI18n } from '../i18n';

declare global {
  interface Window {
    Tawk_API?: {
      maximize?: () => void;
      minimize?: () => void;
      toggle?: () => void;
      showWidget?: () => void;
      onLoad?: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}

const OPEN_LIVE_CHAT_EVENT = 'vdigital:open-live-chat';

export function triggerLiveChat() {
  if (typeof window === 'undefined') return;
  if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
    window.Tawk_API.maximize();
    return;
  }
  window.dispatchEvent(new CustomEvent(OPEN_LIVE_CHAT_EVENT));
}

export const TawkToChat: React.FC = () => {
  const { locale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<
    { id: string; sender: 'agent' | 'user'; text: string }[]
  >([]);
  const [sentNotice, setSentNotice] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const propId = TAWK_TO_PROPERTY_ID.trim();
    if (!propId) return;

    const existingScript = document.getElementById('tawk-to-embed-script');
    if (existingScript) return;

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const s1 = document.createElement('script');
    s1.id = 'tawk-to-embed-script';
    s1.async = true;
    s1.src = `https://embed.tawk.to/${propId}/${TAWK_TO_WIDGET_ID || 'default'}`;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    document.head.appendChild(s1);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handleOpen = () => {
      if (window.Tawk_API && typeof window.Tawk_API.maximize === 'function') {
        window.Tawk_API.maximize();
        return;
      }
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    };
    window.addEventListener(OPEN_LIVE_CHAT_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_LIVE_CHAT_EVENT, handleOpen);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const userMsg = {
      id: `u-${Date.now()}`,
      sender: 'user' as const,
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setSentNotice(true);

    const key = WEB3FORMS_ACCESS_KEY.trim();
    if (key) {
      try {
        await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: key,
            subject: `💬 Live Chat message · VDigital (${locale.toUpperCase()})`,
            from_name: 'VDigital Live Chat',
            message: trimmed,
            language: locale,
            page: window.location.href,
          }),
        });
      } catch {
        // Ignore
      }
    }
  };

  if (!isOpen) return null;

  const lastUserText =
    messages.filter((m) => m.sender === 'user').slice(-1)[0]?.text ||
    t.contactPage.prefilledMessage;

  const whatsappHref = `${WHATSAPP_URL}?text=${encodeURIComponent(lastUserText)}`;
  const telegramHref = TELEGRAM_USERNAME.trim()
    ? `https://t.me/${TELEGRAM_USERNAME.trim()}`
    : TELEGRAM_URL;

  return (
    <div
      role="dialog"
      aria-label={t.contactPage.liveChatTitle}
      className="fixed bottom-20 right-4 sm:right-7 z-50 w-[calc(100vw-2rem)] max-w-[360px] rounded-[16px] bg-[#141416] border border-white/15 shadow-[0_24px_60px_rgba(0,0,0,0.85)] overflow-hidden font-geist text-white"
    >
      <div className="flex items-center justify-between px-4 py-3.5 bg-[#0e100d] border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#b6ff00] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#b6ff00]" />
          </span>
          <div>
            <div className="text-[13.5px] font-semibold leading-tight text-white flex items-center gap-1.5">
              <span>{t.contactPage.liveChatTitle}</span>
              <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#b6ff00]/15 text-[#b6ff00]">
                Tawk.to
              </span>
            </div>
            <div className="text-[11px] text-neutral-400 leading-tight mt-0.5">
              {t.contactPage.liveChatSubtitle}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          aria-label="Close live chat"
          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="p-4 space-y-3 max-h-[270px] overflow-y-auto bg-[#111214]">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-[#0a0a0a] border border-[#b6ff00]/50 flex items-center justify-center shrink-0 text-[12px] font-bold text-[#b6ff00]">
            V
          </div>
          <div className="rounded-2xl rounded-tl-sm bg-[#1b1d21] border border-white/[0.06] px-3.5 py-2.5 text-[13px] text-neutral-200 leading-relaxed">
            {t.contactPage.liveChatWelcome}
          </div>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed ${
                msg.sender === 'user'
                  ? 'rounded-tr-sm bg-[#b6ff00] text-[#0a0a0a] font-medium'
                  : 'rounded-tl-sm bg-[#1b1d21] text-neutral-200 border border-white/[0.06]'
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {sentNotice && (
          <div className="rounded-xl bg-[#181c15] border border-[#b6ff00]/30 p-3 text-[12px] text-neutral-300 space-y-2">
            <div className="flex items-center gap-1.5 text-[#b6ff00] font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{t.contactPage.callbackSuccess}</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md bg-[#b6ff00] text-[#0a0a0a] font-semibold text-[11px] hover:bg-[#c8ff33] transition-colors"
              >
                WhatsApp →
              </a>
              <a
                href={telegramHref}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2.5 py-1 rounded-md bg-white/10 text-white font-medium text-[11px] hover:bg-white/15 transition-colors"
              >
                Telegram →
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}?body=${encodeURIComponent(lastUserText)}`}
                className="px-2.5 py-1 rounded-md bg-white/10 text-white font-medium text-[11px] hover:bg-white/15 transition-colors"
              >
                Email →
              </a>
            </div>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 p-3 bg-[#141416] border-t border-white/[0.07]"
      >
        <MessageSquare className="w-4 h-4 text-neutral-500 shrink-0 ml-1" />
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t.contactPage.liveChatPlaceholder}
          className="flex-1 bg-transparent text-[13px] text-white placeholder:text-neutral-500 focus:outline-none"
        />
        <button
          type="submit"
          aria-label={t.contactPage.liveChatSend}
          className="px-3 py-1.5 rounded-lg bg-[#b6ff00] hover:bg-[#c6ff26] text-[#0a0a0a] text-[12px] font-semibold inline-flex items-center gap-1 transition-colors cursor-pointer shrink-0"
        >
          <span>{t.contactPage.liveChatSend}</span>
          <Send className="w-3 h-3" />
        </button>
      </form>
    </div>
  );
};
