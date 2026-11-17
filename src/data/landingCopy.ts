import type { SupportedLocale } from '../i18n';

export interface LandingCopy {
  stats: {
    kicker: string;
    heading: string;
    items: { value: string; label: string }[];
  };
  story: {
    kicker: string;
    heading: string;
    text: string;
    points: string[];
    button: string;
  };
}

export const LANDING_COPY: Record<SupportedLocale, LandingCopy> = {
  en: {
    stats: {
      kicker: 'In numbers',
      heading: 'A clear plan. Real numbers. Full access.',
      items: [
        { value: '30+', label: 'Projects delivered' },
        { value: '3 weeks', label: 'From first call to a running system' },
        { value: '2020', label: 'Building for the web since' },
        { value: '3', label: 'Languages: Serbian, English, Russian' },
      ],
    },
    story: {
      kicker: 'Our story',
      heading: 'Three specialists from Niš, built for businesses that want more clients.',
      text: 'Veljko has been building for the web since 2020. VDigital brings him together with a video specialist and a sales specialist, so one team handles the website, the content and the calls, and you stop juggling freelancers and agencies.',
      points: [
        'One team, one plan, one point of contact',
        'You own and control every account',
        'No long-term contracts',
      ],
      button: 'Meet the team',
    },
  },
  sr: {
    stats: {
      kicker: 'U brojkama',
      heading: 'Jasan plan. Stvarni brojevi. Pun pristup.',
      items: [
        { value: '30+', label: 'Isporučenih projekata' },
        { value: '3 nedelje', label: 'Od prvog poziva do sistema koji radi' },
        { value: '2020', label: 'Gradimo za web od' },
        { value: '3', label: 'Jezika: srpski, engleski, ruski' },
      ],
    },
    story: {
      kicker: 'Naša priča',
      heading: 'Tri specijaliste iz Niša, za firme koje žele više klijenata.',
      text: 'Veljko gradi za web od 2020. godine. VDigital ga spaja sa video specijalistom i stručnjakom za prodaju, pa jedan tim radi sajt, sadržaj i pozive, a vi više ne morate da koordinišete frilensere i agencije.',
      points: [
        'Jedan tim, jedan plan, jedna kontakt osoba',
        'Vi posedujete i kontrolišete svaki nalog',
        'Bez dugoročnih ugovora',
      ],
      button: 'Upoznajte tim',
    },
  },
  ru: {
    stats: {
      kicker: 'В цифрах',
      heading: 'Понятный план. Реальные цифры. Полный доступ.',
      items: [
        { value: '30+', label: 'Реализованных проектов' },
        { value: '3 недели', label: 'От первого звонка до работающей системы' },
        { value: '2020', label: 'Создаём сайты с' },
        { value: '3', label: 'Языка: сербский, английский, русский' },
      ],
    },
    story: {
      kicker: 'Наша история',
      heading: 'Три специалиста из Ниша для бизнеса, которому нужно больше клиентов.',
      text: 'Велько создаёт сайты с 2020 года. VDigital объединяет его с видеоспециалистом и специалистом по продажам: одна команда делает сайт, контент и звонки, а вам не нужно координировать фрилансеров и агентства.',
      points: [
        'Одна команда, один план, один контакт',
        'Все аккаунты принадлежат вам и под вашим контролем',
        'Без долгосрочных договоров',
      ],
      button: 'Познакомиться с командой',
    },
  },
};
