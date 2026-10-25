import { SupportedLocale } from '../i18n';

export interface AboutTeamMember {
  name: string;
  role: string;
  bio: string;
  photo: string;
  photoAlt: string;
}

export interface AboutPageData {
  metaTitle: string;
  metaDescription: string;
  badge: string;
  h1Regular: string;
  h1Italic: string;
  intro: string;
  missionHeading: string;
  missionText: string[];
  founderStory: {
    heading: string;
    text: string[];
    foundedYear: string;
    experienceSince: string;
    projectsDelivered: string;
  };
  teamHeading: string;
  teamSubheading: string;
  members: AboutTeamMember[];
  howWeWork: {
    heading: string;
    description: string;
    principles: { title: string; text: string }[];
  };
  cta: {
    heading: string;
    description: string;
    button: string;
  };
}

export const ABOUT_DATA: Record<SupportedLocale, AboutPageData> = {
  en: {
    metaTitle: 'About Us | VDigital, digital studio from Niš, Serbia',
    metaDescription:
      'VDigital is a three-person digital studio from Niš, Serbia, founded by Veljko Petković. We build websites, video and marketing for businesses that want more clients.',
    badge: 'About Us · VDigital Studio',
    h1Regular: 'A small studio for businesses',
    h1Italic: 'that want to grow.',
    intro:
      'VDigital is an independent digital studio from Niš, Serbia. We build websites, video content, ads, automation and cold calling for businesses of all sizes and industries, connecting it all into one client-getting system.',
    missionHeading: 'Why VDigital exists',
    missionText: [
      'After years of building websites, we kept seeing the same thing. Great businesses with great products and services were losing clients to competitors who were simply better at marketing. Most of them didn\'t need another agency to sell them a template and vanish. They needed someone to build the full system, show them every number, and stick around until it worked.',
      'That\'s what VDigital does. One small team covers the website, the content, the ads and the calls, so nothing falls between three different freelancers.',
    ],
    founderStory: {
      heading: 'Founder & background',
      text: [
        'VDigital was founded in 2026 in Niš, Serbia. The founder is Veljko Petković, a full-stack developer building for the web since 2020 with more than 30 projects delivered. Before that, he was a professional soldier, which is where the studio\'s operating style comes from: clear plan, fixed deadlines, no excuses.',
        'Instead of months of meetings, every project follows a 3-week plan where every day has a clear task.',
      ],
      foundedYear: '2026',
      experienceSince: '2020',
      projectsDelivered: '30+',
    },
    teamHeading: 'Meet the team',
    teamSubheading:
      'A small team where you work directly with the people building your system. No middlemen, no account managers, no outsourcing.',
    members: [
      {
        name: 'Veljko Petković',
        role: 'Founder & Full-Stack Developer',
        bio:
          'Builds the website, web apps, integrations and automations, making sure everything is fast, secure and measurable.',
        photo: '/images/team-veljko.jpg',
        photoAlt: 'Veljko Petković, founder of VDigital',
      },
      {
        name: 'Velimir Nikolić',
        role: 'Video Production & Social Media',
        bio:
          'Plans, shoots and edits content, and guides you on camera so you look and sound natural.',
        photo: '/images/team-velimir.jpg',
        photoAlt: 'Velimir Nikolić, video and social media at VDigital',
      },
      {
        name: 'Vuk Stefanović',
        role: 'Sales & Cold Calling',
        bio:
          'Reaches out to potential clients on your behalf, follows up and books meetings on your calendar.',
        photo: '/images/team-vuk.jpg',
        photoAlt: 'Vuk Stefanović, sales and outreach at VDigital',
      },
    ],
    howWeWork: {
      heading: 'How we work',
      description: 'Three rules we don\'t break.',
      principles: [
        {
          title: '3 weeks, not 3 months',
          text:
            'Every project follows a 3-week plan with clear daily tasks. You always know what is being done and what comes next.',
        },
        {
          title: 'You stay in control',
          text:
            'The website, the accounts and the data are yours. We manage them, but you have full access and nothing happens without your knowledge.',
        },
        {
          title: 'Results over likes',
          text:
            'We measure inquiries, bookings and sales, not views and followers.',
        },
      ],
    },
    cta: {
      heading: 'Ready for your business to grow?',
      description:
        'Book a free 30-minute call with our team. We\'ll look at where you are now and show you what the plan would look like for you.',
      button: 'Book a free call',
    },
  },
  sr: {
    metaTitle: 'O nama | VDigital, digitalni studio iz Niša',
    metaDescription:
      'VDigital je tročlani digitalni studio iz Niša koji je osnovao Veljko Petković. Pravimo sajtove, video i marketing za firme koje žele više klijenata.',
    badge: 'O nama · VDigital studio',
    h1Regular: 'Mali studio za firme',
    h1Italic: 'koje žele da rastu.',
    intro:
      'VDigital je nezavisni digitalni studio iz Niša. Pravimo sajtove, video sadržaj, reklame, automatizaciju i cold calling za firme svih veličina i delatnosti, i sve to povezujemo u jedan sistem koji dovodi klijente.',
    missionHeading: 'Zašto VDigital postoji',
    missionText: [
      'Posle godina pravljenja sajtova, stalno smo viđali isto. Dobre firme sa odličnim proizvodima i uslugama gubile su klijente od konkurencije koja je jednostavno bolja u marketingu. Većini nije trebala još jedna agencija koja proda šablon i nestane. Trebao im je neko ko će napraviti ceo sistem, pokazati im svaki broj i ostati dok ne proradi.',
      'To radi VDigital. Jedan mali tim pokriva sajt, sadržaj, reklame i pozive, tako da ništa ne propada između tri različita frilensera.',
    ],
    founderStory: {
      heading: 'Osnivač i iskustvo',
      text: [
        'VDigital je osnovan 2026. u Nišu. Osnivač je Veljko Petković, full-stack developer koji pravi za veb od 2020. i iza sebe ima više od 30 projekata. Pre toga je bio profesionalni vojnik, i odatle dolazi način na koji studio radi: jasan plan, fiksni rokovi i bez izgovora.',
        'Umesto meseci sastanaka, svaki projekat ide po planu od 3 nedelje u kome svaki dan ima jasan zadatak.',
      ],
      foundedYear: '2026',
      experienceSince: '2020',
      projectsDelivered: '30+',
    },
    teamHeading: 'Upoznajte tim',
    teamSubheading:
      'Mali tim u kome radite direktno sa ljudima koji prave vaš sistem. Bez posrednika, bez account menadžera, bez outsourcinga.',
    members: [
      {
        name: 'Veljko Petković',
        role: 'Osnivač i Full-Stack Developer',
        bio:
          'Pravi sajt, veb aplikacije, integracije i automatizacije, i pazi da sve bude brzo, sigurno i merljivo.',
        photo: '/images/team-veljko.jpg',
        photoAlt: 'Veljko Petković, osnivač VDigital',
      },
      {
        name: 'Velimir Nikolić',
        role: 'Video produkcija i društvene mreže',
        bio:
          'Planira, snima i montira sadržaj, i vodi vas pred kamerom da delujete prirodno.',
        photo: '/images/team-velimir.jpg',
        photoAlt: 'Velimir Nikolić, video produkcija i društvene mreže u VDigital',
      },
      {
        name: 'Vuk Stefanović',
        role: 'Prodaja i cold calling',
        bio:
          'Zove potencijalne klijente u vaše ime, radi follow-up i zakazuje sastanke u vašem kalendaru.',
        photo: '/images/team-vuk.jpg',
        photoAlt: 'Vuk Stefanović, prodaja i cold calling u VDigital',
      },
    ],
    howWeWork: {
      heading: 'Kako radimo',
      description: 'Tri pravila koja ne kršimo.',
      principles: [
        {
          title: '3 nedelje, ne 3 meseca',
          text:
            'Svaki projekat ide po planu od 3 nedelje sa jasnim zadacima za svaki dan. Uvek znate šta se radi i šta je sledeće.',
        },
        {
          title: 'Vi imate kontrolu',
          text:
            'Sajt, nalozi i podaci su vaši. Mi njima upravljamo, ali vi imate pun pristup i ništa se ne radi bez vašeg znanja.',
        },
        {
          title: 'Rezultati, a ne lajkovi',
          text:
            'Merimo upite, zakazivanja i prodaju, ne preglede i pratioce.',
        },
      ],
    },
    cta: {
      heading: 'Spremni da vaš posao raste?',
      description:
        'Zakažite besplatan poziv od 30 minuta sa našim timom. Pogledaćemo gde ste sada i pokazati vam kako bi plan izgledao za vas.',
      button: 'Zakažite besplatan poziv',
    },
  },
  ru: {
    metaTitle: 'О нас | VDigital, digital-студия из Сербии',
    metaDescription:
      'VDigital: студия из трёх человек из Ниша, Сербия, основанная Велько Петковичем. Создаём сайты, видео и маркетинг для бизнеса, которому нужно больше клиентов.',
    badge: 'О нас · Студия VDigital',
    h1Regular: 'Небольшая студия для бизнеса,',
    h1Italic: 'который хочет расти.',
    intro:
      'Мы независимая digital-студия из Ниша, Сербия. Делаем сайты, видеоконтент, рекламу, автоматизацию и cold calling для бизнеса любого размера и сферы и объединяем всё это в одну систему, которая приводит клиентов.',
    missionHeading: 'Почему появилась VDigital',
    missionText: [
      'За годы создания сайтов мы снова и снова видели одно и то же. Хорошие компании с отличными товарами и услугами теряли клиентов, уступая конкурентам, которые просто лучше занимались маркетингом. Большинству не нужно было ещё одно агентство, которое продаст шаблон и исчезнет. Им был нужен тот, кто построит всю систему, покажет каждую цифру и останется, пока всё не заработает.',
      'Этим и занимается VDigital. Одна небольшая команда отвечает за сайт, контент, рекламу и звонки, поэтому ничего не теряется между тремя разными фрилансерами.',
    ],
    founderStory: {
      heading: 'Основатель и опыт',
      text: [
        'VDigital основана в 2026 году в Нише. Основатель студии Велько Петкович, full-stack developer, который работает в вебе с 2020 года и реализовал более 30 проектов. До этого он служил профессиональным военным, отсюда и подход студии: чёткий план, жёсткие сроки и никаких оправданий.',
        'Вместо месяцев совещаний каждый проект идёт по плану на 3 недели, где у каждого дня есть конкретная задача.',
      ],
      foundedYear: '2026',
      experienceSince: '2020',
      projectsDelivered: '30+',
    },
    teamHeading: 'Познакомьтесь с командой',
    teamSubheading:
      'Небольшая команда, где вы работаете напрямую с теми, кто строит вашу систему. Без посредников, аккаунт-менеджеров и аутсорса.',
    members: [
      {
        name: 'Велько Петкович',
        role: 'Основатель и Full-Stack Developer',
        bio:
          'Делает сайт, веб-приложения, интеграции и автоматизации и следит, чтобы всё было быстрым, безопасным и измеримым.',
        photo: '/images/team-veljko.jpg',
        photoAlt: 'Велько Петкович, основатель VDigital',
      },
      {
        name: 'Велимир Николич',
        role: 'Видеопродакшн и соцсети',
        bio:
          'Планирует, снимает и монтирует контент и помогает вам перед камерой, чтобы вы выглядели естественно.',
        photo: '/images/team-velimir.jpg',
        photoAlt: 'Велимир Николич, видеопродакшн и соцсети в VDigital',
      },
      {
        name: 'Вук Стефанович',
        role: 'Продажи и cold calling',
        bio:
          'Звонит потенциальным клиентам от вашего имени, делает follow-up и назначает встречи в вашем календаре.',
        photo: '/images/team-vuk.jpg',
        photoAlt: 'Вук Стефанович, продажи и cold calling в VDigital',
      },
    ],
    howWeWork: {
      heading: 'Как мы работаем',
      description: 'Три правила, которые мы не нарушаем.',
      principles: [
        {
          title: '3 недели, а не 3 месяца',
          text:
            'Каждый проект идёт по плану на 3 недели с понятными задачами на каждый день. Вы всегда знаете, что происходит и что дальше.',
        },
        {
          title: 'Контроль у вас',
          text:
            'Сайт, аккаунты и данные принадлежат вам. Мы ими управляем, но у вас полный доступ, и ничего не делается без вашего ведома.',
        },
        {
          title: 'Результаты, а не лайки',
          text:
            'Мы измеряем заявки, записи и продажи, а не просмотры и подписчиков.',
        },
      ],
    },
    cta: {
      heading: 'Готовы к росту?',
      description:
        'Запишитесь на бесплатный 30-минутный звонок с нашей командой. Посмотрим, где вы сейчас, и покажем, как будет выглядеть план для вас.',
      button: 'Записаться на бесплатный звонок',
    },
  },
};
