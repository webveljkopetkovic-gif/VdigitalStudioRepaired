import type { SupportedLocale } from '../i18n';

/**
 * Projects slider.
 * - url: live site, opened by the "Visit site" button.
 * - image: screenshot in /public/images/projects (1440x900, .webp or .jpg).
 *   If the file is missing, a designed cover in the project's accent colour is shown.
 * - status 'live' | 'wip': 'wip' adds an "in progress" badge and hides the link.
 */
export interface Project {
  id: string;
  client: string;
  url?: string;
  image?: string;
  status: 'live' | 'wip';
  accent: string;
  tags: Record<SupportedLocale, string[]>;
  field: Record<SupportedLocale, string>;
  text: Record<SupportedLocale, string>;
}

export const PROJECTS: Project[] = [
  {
    id: 'olgica',
    client: 'Olgica Božinović',
    url: 'https://bozinovicolgica.rs',
    image: '/images/projects/olgica.webp',
    status: 'live',
    accent: '#1f4d3a',
    field: {
      sr: 'Health coach i nutricionizam',
      en: 'Health coach & nutrition',
      ru: 'Health coach и нутрициология',
    },
    text: {
      sr: 'Sajt, landing stranice za programe, blog, Telegram i WhatsApp botovi i Instagram automatizacija. Ceo sistem za upite i prodaju, za srpsko i rusko tržište.',
      en: 'Website, program landing pages, blog, Telegram and WhatsApp bots and Instagram automation. One system for inquiries and sales, for the Serbian and Russian markets.',
      ru: 'Сайт, лендинги программ, блог, боты в Telegram и WhatsApp и автоматизация Instagram. Единая система заявок и продаж для сербского и русского рынков.',
    },
    tags: {
      sr: ['Sajt', 'Landing', 'Botovi', 'Automatizacija'],
      en: ['Website', 'Landing', 'Bots', 'Automation'],
      ru: ['Сайт', 'Лендинг', 'Боты', 'Автоматизация'],
    },
  },
  {
    id: 'dunja',
    client: 'Dr Dunja Crnogorac',
    image: '/images/projects/dunja.webp',
    status: 'wip',
    accent: '#3c3a6e',
    field: {
      sr: 'Homeopatija',
      en: 'Homeopathy',
      ru: 'Гомеопатия',
    },
    text: {
      sr: 'Strategija, sajt i sadržaj za društvene mreže. Projekat je trenutno u izradi.',
      en: 'Strategy, website and social media content. The project is currently in progress.',
      ru: 'Стратегия, сайт и контент для соцсетей. Проект сейчас в работе.',
    },
    tags: {
      sr: ['Strategija', 'Sajt', 'Sadržaj'],
      en: ['Strategy', 'Website', 'Content'],
      ru: ['Стратегия', 'Сайт', 'Контент'],
    },
  },
];

export const PROJECTS_COPY: Record<
  SupportedLocale,
  { kicker: string; heading: string; headingItalic: string; lead: string; visit: string; wip: string; prev: string; next: string }
> = {
  sr: {
    kicker: 'Projekti',
    heading: 'Šta smo',
    headingItalic: 'napravili.',
    lead: 'Pravi sistemi za prave firme. Prevuci ili koristi strelice.',
    visit: 'Pogledaj sajt',
    wip: 'U izradi',
    prev: 'Prethodni projekat',
    next: 'Sledeći projekat',
  },
  en: {
    kicker: 'Projects',
    heading: "What we've",
    headingItalic: 'built.',
    lead: 'Real systems for real businesses. Drag or use the arrows.',
    visit: 'Visit site',
    wip: 'In progress',
    prev: 'Previous project',
    next: 'Next project',
  },
  ru: {
    kicker: 'Проекты',
    heading: 'Что мы',
    headingItalic: 'сделали.',
    lead: 'Настоящие системы для настоящего бизнеса. Листайте или используйте стрелки.',
    visit: 'Открыть сайт',
    wip: 'В работе',
    prev: 'Предыдущий проект',
    next: 'Следующий проект',
  },
};
