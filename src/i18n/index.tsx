import React, { createContext, useContext, useEffect } from 'react';
import { en, type Translations } from './en';
import { sr } from './sr';
import { ru } from './ru';

export type SupportedLocale = 'en' | 'sr' | 'ru';

const dictionaries: Record<SupportedLocale, Translations> = {
  en,
  sr,
  ru,
};

interface I18nContextValue {
  locale: SupportedLocale;
  t: Translations;
}

const I18nContext = createContext<I18nContextValue>({
  locale: 'en',
  t: en,
});

export const I18nProvider: React.FC<{
  locale: SupportedLocale;
  children: React.ReactNode;
}> = ({ locale, children }) => {
  const t = dictionaries[locale] || en;

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
    }
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
