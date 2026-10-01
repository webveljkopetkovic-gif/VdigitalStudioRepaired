import React, { useEffect } from 'react';
import * as CookieConsent from 'vanilla-cookieconsent';
import 'vanilla-cookieconsent/dist/cookieconsent.css';
import { useI18n } from '../i18n';
import {
  OPEN_COOKIE_BANNER_EVENT,
  syncConsentState,
} from '../utils/analytics';

let isCookieConsentInitialized = false;

export const CookieConsentBanner: React.FC = () => {
  const { locale } = useI18n();

  useEffect(() => {
    if (typeof window === 'undefined') return;

    if (!isCookieConsentInitialized) {
      isCookieConsentInitialized = true;

      CookieConsent.run({
        revision: 1,
        cookie: {
          name: 'cc_cookie',
          expiresAfterDays: 182, // 6 months
          sameSite: 'Lax',
          path: '/',
        },
        guiOptions: {
          consentModal: {
            layout: 'box inline',
            position: 'bottom left',
            equalWeightButtons: true,
            flipButtons: false,
          },
          preferencesModal: {
            layout: 'box',
            position: 'right',
            equalWeightButtons: true,
            flipButtons: false,
          },
        },
        onFirstConsent: () => {
          syncConsentState();
        },
        onConsent: () => {
          syncConsentState();
        },
        onChange: () => {
          syncConsentState();
        },
        categories: {
          necessary: {
            enabled: true,
            readOnly: true,
          },
          analytics: {
            enabled: false,
            readOnly: false,
            autoClear: {
              cookies: [
                { name: /^(_ga|_gid|_gat|_ym_|yandexuid|yabs-sid|ymex)/ },
              ],
            },
          },
          marketing: {
            enabled: false,
            readOnly: false,
            autoClear: {
              cookies: [
                { name: /^(_fbp|_fbc|_ttp|_gcl_|li_)/ },
              ],
            },
          },
        },
        language: {
          default: locale,
          translations: {
            en: {
              consentModal: {
                title: 'We respect your privacy',
                description:
                  'We use strictly necessary cookies to remember your settings and, only with your explicit consent, analytics and marketing cookies to understand how visitors use our site. <a href="/privacy" class="cc-link">Privacy &amp; Cookie Policy</a>',
                acceptAllBtn: 'Accept all',
                acceptNecessaryBtn: 'Reject all',
                showPreferencesBtn: 'Settings',
              },
              preferencesModal: {
                title: 'Cookie preferences',
                acceptAllBtn: 'Accept all',
                acceptNecessaryBtn: 'Reject all',
                savePreferencesBtn: 'Save settings',
                closeIconLabel: 'Close modal',
                serviceCounterLabel: 'Service|Services',
                sections: [
                  {
                    title: 'How we use cookies',
                    description:
                      'No non-essential cookies or third-party trackers load until you explicitly opt in. You can change or withdraw your consent at any time. Read our full <a href="/privacy" class="cc-link">Privacy &amp; Cookie Policy</a>.',
                  },
                  {
                    title: 'Strictly necessary <span class="pm__badge">Always active</span>',
                    description:
                      'Essential for the website to function properly and to remember your cookie consent and language preferences. They do not track you across sites.',
                    linkedCategory: 'necessary',
                    cookieTable: {
                      headers: {
                        name: 'Name',
                        domain: 'Provider',
                        description: 'Purpose',
                        expiration: 'Duration',
                      },
                      body: [
                        {
                          name: 'cc_cookie',
                          domain: 'vdigital.dev',
                          description: 'Stores your cookie consent preferences.',
                          expiration: '6 months',
                        },
                        {
                          name: 'vd_lang_choice',
                          domain: 'vdigital.dev (localStorage)',
                          description: 'Remembers your selected site language (SR / EN / RU).',
                          expiration: 'Persistent',
                        },
                      ],
                    },
                  },
                  {
                    title: 'Analytics cookies',
                    description:
                      'Help us understand how visitors interact with our pages (Google Analytics 4, Yandex Metrica, and Ahrefs Analytics). Loaded only if you accept this category.',
                    linkedCategory: 'analytics',
                    cookieTable: {
                      headers: {
                        name: 'Name',
                        domain: 'Provider',
                        description: 'Purpose',
                        expiration: 'Duration',
                      },
                      body: [
                        {
                          name: '_ga, _ga_NNXZ378TYV',
                          domain: 'Google LLC (USA / EU)',
                          description: 'Google Analytics 4 anonymous visitor and session statistics.',
                          expiration: '2 years',
                        },
                        {
                          name: '_gid, _gat',
                          domain: 'Google LLC (USA / EU)',
                          description: 'Distinguishes visitors and throttles request rate.',
                          expiration: '24 hours / 1 min',
                        },
                        {
                          name: '_ym_uid, _ym_d, _ym_isad, _ym_visorc',
                          domain: 'Yandex LLC (Russia)',
                          description: 'Yandex Metrica visitor and session analytics.',
                          expiration: '30 min – 1 year',
                        },
                      ],
                    },
                  },
                  {
                    title: 'Marketing & third-party embeds',
                    description:
                      'Used for interactive third-party media embeds (such as YouTube videos via youtube-nocookie.com and Cal.com scheduling widgets) and advertising attribution.',
                    linkedCategory: 'marketing',
                  },
                ],
              },
            },
            sr: {
              consentModal: {
                title: 'Poštujemo vašu privatnost',
                description:
                  'Koristimo samo neophodne kolačiće za rad sajta, a analitičke i marketinške kolačiće učitavamo isključivo uz vašu izričitu saglasnost. <a href="/sr/privatnost" class="cc-link">Politika privatnosti i kolačića</a>',
                acceptAllBtn: 'Prihvati sve',
                acceptNecessaryBtn: 'Odbij sve',
                showPreferencesBtn: 'Podešavanja',
              },
              preferencesModal: {
                title: 'Podešavanje kolačića',
                acceptAllBtn: 'Prihvati sve',
                acceptNecessaryBtn: 'Odbij sve',
                savePreferencesBtn: 'Sačuvaj izbor',
                closeIconLabel: 'Zatvori prozor',
                serviceCounterLabel: 'Servis|Servisa',
                sections: [
                  {
                    title: 'Kako koristimo kolačiće',
                    description:
                      'Nijedan opcioni kolačić ili eksterni tragač se ne učitava dok ne date izričitu saglasnost. Svoj izbor možete promeniti ili povući u svakom trenutku. Pročitajte našu <a href="/sr/privatnost" class="cc-link">Politiku privatnosti i kolačića</a>.',
                  },
                  {
                    title: 'Neophodni kolačići <span class="pm__badge">Uvek aktivni</span>',
                    description:
                      'Neophodni za osnovno funkcionisanje sajta, pamćenje vaše odluke o kolačićima i izbora jezika.',
                    linkedCategory: 'necessary',
                    cookieTable: {
                      headers: {
                        name: 'Naziv',
                        domain: 'Pružalac',
                        description: 'Svrha',
                        expiration: 'Trajanje',
                      },
                      body: [
                        {
                          name: 'cc_cookie',
                          domain: 'vdigital.dev',
                          description: 'Čuva vaš izbor u vezi sa kolačićima.',
                          expiration: '6 meseci',
                        },
                        {
                          name: 'vd_lang_choice',
                          domain: 'vdigital.dev (localStorage)',
                          description: 'Pamti izabrani jezik sajta (SR / EN / RU).',
                          expiration: 'Trajno',
                        },
                      ],
                    },
                  },
                  {
                    title: 'Analitički kolačići',
                    description:
                      'Pomažu nam da razumemo kako posetioci koriste naš sajt (Google Analytics 4, Yandex Metrica i Ahrefs Analytics). Učitavaju se isključivo ako prihvatite ovu kategoriju.',
                    linkedCategory: 'analytics',
                    cookieTable: {
                      headers: {
                        name: 'Naziv',
                        domain: 'Pružalac',
                        description: 'Svrha',
                        expiration: 'Trajanje',
                      },
                      body: [
                        {
                          name: '_ga, _ga_NNXZ378TYV',
                          domain: 'Google LLC (SAD / EU)',
                          description: 'Google Analytics 4 anonimizovana statistika poseta.',
                          expiration: '2 godine',
                        },
                        {
                          name: '_gid, _gat',
                          domain: 'Google LLC (SAD / EU)',
                          description: 'Razlikovanje sesija i ograničavanje broja zahteva.',
                          expiration: '24 sata / 1 min',
                        },
                        {
                          name: '_ym_uid, _ym_d, _ym_isad, _ym_visorc',
                          domain: 'Yandex LLC (Rusija)',
                          description: 'Yandex Metrica statistika poseta i sesija.',
                          expiration: '30 min – 1 godina',
                        },
                      ],
                    },
                  },
                  {
                    title: 'Marketing i eksterni sadržaji',
                    description:
                      'Koriste se za učitavanje interaktivnih ugrađenih sadržaja trećih strana (YouTube video preko youtube-nocookie.com i Cal.com kalendar) i merenje reklamnih kampanja.',
                    linkedCategory: 'marketing',
                  },
                ],
              },
            },
            ru: {
              consentModal: {
                title: 'Мы уважаем вашу конфиденциальность',
                description:
                  'Мы используем строго необходимые файлы cookie для работы сайта, а аналитические и маркетинговые cookie загружаем только с вашего явного согласия. <a href="/ru/konfidencialnost" class="cc-link">Политика конфиденциальности и cookie</a>',
                acceptAllBtn: 'Принять все',
                acceptNecessaryBtn: 'Отклонить все',
                showPreferencesBtn: 'Настройки',
              },
              preferencesModal: {
                title: 'Настройки файлов cookie',
                acceptAllBtn: 'Принять все',
                acceptNecessaryBtn: 'Отклонить все',
                savePreferencesBtn: 'Сохранить настройки',
                closeIconLabel: 'Закрыть окно',
                serviceCounterLabel: 'Сервис|Сервиса',
                sections: [
                  {
                    title: 'Как мы используем cookie',
                    description:
                      'Ни один необязательный файл cookie или сторонний трекер не загружается без вашего согласия. Вы можете изменить или отозвать согласие в любое время. Подробнее в <a href="/ru/konfidencialnost" class="cc-link">Политике конфиденциальности и cookie</a>.',
                  },
                  {
                    title: 'Строго необходимые <span class="pm__badge">Всегда активны</span>',
                    description:
                      'Необходимы для корректной работы сайта и сохранения вашего выбора языка и настроек cookie.',
                    linkedCategory: 'necessary',
                    cookieTable: {
                      headers: {
                        name: 'Имя',
                        domain: 'Провайдер',
                        description: 'Назначение',
                        expiration: 'Срок',
                      },
                      body: [
                        {
                          name: 'cc_cookie',
                          domain: 'vdigital.dev',
                          description: 'Сохраняет ваш выбор настроек cookie.',
                          expiration: '6 месяцев',
                        },
                        {
                          name: 'vd_lang_choice',
                          domain: 'vdigital.dev (localStorage)',
                          description: 'Запоминает выбранный язык сайта (SR / EN / RU).',
                          expiration: 'Постоянно',
                        },
                      ],
                    },
                  },
                  {
                    title: 'Аналитические cookie',
                    description:
                      'Помогают нам понимать, как посетители взаимодействуют с сайтом (Google Analytics 4, Яндекс Метрика и Ahrefs Analytics). Загружаются только при вашем согласии.',
                    linkedCategory: 'analytics',
                    cookieTable: {
                      headers: {
                        name: 'Имя',
                        domain: 'Провайдер',
                        description: 'Назначение',
                        expiration: 'Срок',
                      },
                      body: [
                        {
                          name: '_ga, _ga_NNXZ378TYV',
                          domain: 'Google LLC (США / ЕС)',
                          description: 'Обезличенная статистика посещений Google Analytics 4.',
                          expiration: '2 года',
                        },
                        {
                          name: '_gid, _gat',
                          domain: 'Google LLC (США / ЕС)',
                          description: 'Различение сессий и ограничение частоты запросов.',
                          expiration: '24 часа / 1 мин',
                        },
                        {
                          name: '_ym_uid, _ym_d, _ym_isad, _ym_visorc',
                          domain: 'ООО «Яндекс» (Россия)',
                          description: 'Аналитика посещений и сессий Яндекс Метрики.',
                          expiration: '30 мин – 1 год',
                        },
                      ],
                    },
                  },
                  {
                    title: 'Маркетинг и внешние виджеты',
                    description:
                      'Используются для интерактивных виджетов третьих сторон (видео YouTube через youtube-nocookie.com и календарь Cal.com) и маркетинговой атрибуции.',
                    linkedCategory: 'marketing',
                  },
                ],
              },
            },
          },
        },
      });
    } else {
      CookieConsent.setLanguage(locale);
    }

    const handleOpenPreferences = () => {
      CookieConsent.showPreferences();
    };

    window.addEventListener(OPEN_COOKIE_BANNER_EVENT, handleOpenPreferences);
    return () => {
      window.removeEventListener(OPEN_COOKIE_BANNER_EVENT, handleOpenPreferences);
    };
  }, [locale]);

  return null;
};
