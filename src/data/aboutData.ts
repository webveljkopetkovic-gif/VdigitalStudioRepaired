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
  sr: {
    metaTitle: 'O nama | VDigital',
    metaDescription:
      'Saznajte ko je VDigital studio iz Niša. Osnovan 2026. godine od strane Veljka Petkovića, naš tročlani tim pravi sajtove, video i marketing za doktore i koučeve.',
    badge: 'O nama · VDigital Studio',
    h1Regular: 'Digitalni studio stvoren za',
    h1Italic: 'lekare i stručnjake.',
    intro:
      'VDigital je digitalni studio iz Niša koji pomaže lekarima, stomatolozima i health koučevima da izgrade prepoznatljiv brend, popune raspored i digitalizuju svoje poslovanje.',
    missionHeading: 'Zašto postojimo i zašto baš medicina i koučing?',
    missionText: [
      'Tokom proteklih godina rada sa različitim industrijama primetili smo paradoks: lekari, terapeuti i koučevi rade najodgovorniji posao — leče i unapređuju ljudske živote — a u isto vreme imaju najlošije digitalno prisustvo. Tipične marketinške agencije tretiraju medicinske ordinacije kao restorane brze hrane, forsirajući neozbiljne trendove i jeftine šablone koji ruše profesionalni ugled.',
      'VDigital je nastao sa jasnom misijom: da ponudi dostojanstven, visoko-profesionalan i tehnološki besprekoran sistem akvizicije pacijenata. Spajamo medicinsku etiku, minimalistički dizajn i napredno programiranje.',
    ],
    founderStory: {
      heading: 'Osnivač i istorijat',
      text: [
        'Studio je 2026. godine u Nišu osnovao Veljko Petković, full-stack softverski inženjer koji gradi za web od 2020. godine sa preko 30 uspešno isporučenih digitalnih projekata širom Evrope i sveta.',
        'Kombinujući inženjersku preciznost, brzinu modernog weba i duboko razumevanje prodajnih tokova, stvorili smo agilni studio koji ne troši mesece na sastančenje, već u tro-nedeljnim sprintovima isporučuje gotove sisteme koji odmah donose merljive rezultate.',
      ],
      foundedYear: '2026.',
      experienceSince: '2020.',
      projectsDelivered: '30+',
    },
    teamHeading: 'Upoznajte naš tročlani tim',
    teamSubheading:
      'Mali, fokusiran i uigran tim gde direktno komunicirate sa ljudima koji rade na vašem projektu — bez posrednika i nepotrebnih slojeva menadžmenta.',
    members: [
      {
        name: 'Veljko Petković',
        role: 'Osnivač i Full-Stack Inženjer',
        bio:
          'Odgovoran za kompletnu tehničku arhitekturu, performanse sajtova, bezbednost podataka i automatizaciju zakazivanja. Programira za web od 2020. godine sa više od 30 uspešno realizovanih projekata.',
        photo: '/images/team-veljko.jpg',
        photoAlt: 'Veljko Petković, osnivač VDigital',
      },
      {
        name: 'Velimir Nikolić',
        role: 'Video produkcija i Društvene mreže',
        bio:
          'Zadužen za kreiranje vizuelnog identiteta, pripremu scenarija, snimanje i dinamičnu video montažu edukativnih formata koji grade poverenje i autoritet kod pacijenata.',
        photo: '/images/team-velimir.jpg',
        photoAlt: 'Velimir Nikolić, video i društvene mreže u VDigital',
      },
      {
        name: 'Vuk Stefanović',
        role: 'Prodaja i Direktna akvizicija',
        bio:
          'Specijalista za direktnu komunikaciju, B2B hladne pozive i kvalifikaciju novih klijenata. Vodi računa o tome da vaš kalendar bude popunjen isključivo relevantnim i platežnim sastancima.',
        photo: '/images/team-vuk.jpg',
        photoAlt: 'Vuk Stefanović, prodaja i komunikacija u VDigital',
      },
    ],
    howWeWork: {
      heading: 'Kako radimo: Principi našeg studija',
      description:
        'Naš rad se zasniva na tri stuba koja garantuju uspeh svakog zajedničkog projekta.',
      principles: [
        {
          title: 'Isporuka u 3 nedelje',
          text:
            'Umesto razvučenih višemesečnih projekata, radimo u fokusiranim tronedeljnim sprintovima gde je svaki dan unapred isplaniran.',
        },
        {
          title: 'Medicinska etika i profesionalizam',
          text:
            'Ne forsiramo jeftine senzacije. Svaki tekst, video i oglas osmišljen je tako da podigne vaš ugled i poštuje zakonske okvire struke.',
        },
        {
          title: 'Merljiv rezultat umesto ispraznih metrika',
          text:
            'Za nas uspeh nisu samo lajkovi i posete sajtu, već broj zakazanih pregleda, popunjeni termini i stvarni povrat vaše investicije.',
        },
      ],
    },
    cta: {
      heading: 'Želite da sarađujemo na vašem projektu?',
      description:
        'Zakažite besplatan razgovor od 30 minuta direktno sa našim timom i saznajte kako možemo unaprediti vašu praksu.',
      button: 'Zakažite besplatan poziv',
    },
  },
  en: {
    metaTitle: 'About Us | VDigital',
    metaDescription:
      'Learn about VDigital, a boutique digital studio from Niš, Serbia. Founded in 2026 by Veljko Petković, our 3-person team builds websites, video, and marketing for doctors and health coaches.',
    badge: 'About Us · VDigital Studio',
    h1Regular: 'A digital studio built for',
    h1Italic: 'doctors and coaches.',
    intro:
      'VDigital is an independent digital studio based in Niš, Serbia. We partner with doctors, private clinics, and health coaches to build commanding online authority, automated patient acquisition, and modern web infrastructure.',
    missionHeading: 'Why We Exist and Why Healthcare & Coaching?',
    missionText: [
      'Over years of building digital products, we noticed a striking contrast: healthcare providers and coaches perform the most vital work in society — healing and elevating human lives — yet their digital presentation is often decades behind. Conventional marketing agencies treat medical practices like eCommerce stores, deploying tacky templates and gimmicks that erode clinical credibility.',
      'VDigital was created with a clear directive: to provide dignified, high-performance, and technologically pristine digital systems for practitioners. We combine clinical ethics, refined typography, and full-stack software craftsmanship.',
    ],
    founderStory: {
      heading: 'Founder & Background',
      text: [
        'The studio was founded in 2026 in Niš, Serbia, by Veljko Petković, a full-stack software engineer who has been building for the web since 2020 with more than 30 successful digital systems delivered across Europe and North America.',
        'Combining software engineering rigor, sub-second web speed, and conversion psychology, we designed an agile studio model that eliminates weeks of pointless meetings and deploys turnkey client acquisition engines in disciplined 3-week sprints.',
      ],
      foundedYear: '2026',
      experienceSince: '2020',
      projectsDelivered: '30+',
    },
    teamHeading: 'Meet Our 3-Person Core Team',
    teamSubheading:
      'A compact, specialized team where you work directly with the craftsmen building your digital assets — no middlemen, account managers, or outsourced junior talent.',
    members: [
      {
        name: 'Veljko Petković',
        role: 'Founder & Full-Stack Engineer',
        bio:
          'Oversees system architecture, web performance, privacy compliance, and appointment automation. Building for the web since 2020 with 30+ completed client applications.',
        photo: '/images/team-veljko.jpg',
        photoAlt: 'Veljko Petković, founder of VDigital',
      },
      {
        name: 'Velimir Nikolić',
        role: 'Video Production & Social Media',
        bio:
          'Directs visual storytelling, treatment topic scripting, on-camera coaching, and dynamic video editing that transforms clinical wisdom into patient trust.',
        photo: '/images/team-velimir.jpg',
        photoAlt: 'Velimir Nikolić, video and social media at VDigital',
      },
      {
        name: 'Vuk Stefanović',
        role: 'Sales & Direct Outreach',
        bio:
          'Specializes in consultative direct outreach, B2B calling, and executive qualification, ensuring your weekly schedule is packed with pre-vetted consultations.',
        photo: '/images/team-vuk.jpg',
        photoAlt: 'Vuk Stefanović, sales and outreach at VDigital',
      },
    ],
    howWeWork: {
      heading: 'How We Work: Our Operating Principles',
      description:
        'Every project is guided by three non-negotiable operational principles.',
      principles: [
        {
          title: '3-Week Sprint Delivery',
          text:
            'Instead of months-long agency inertia, we operate in tight 3-week delivery sprints where every day has clear deliverables.',
        },
        {
          title: 'Ethical Medical Authority',
          text:
            'We protect your medical reputation. Every script, page, and campaign is designed to elevate your professional standing under strict healthcare standards.',
        },
        {
          title: 'Tangible Business Results',
          text:
            'We measure success by filled consultation calendars, confirmed patient arrivals, and revenue growth rather than vanity social impressions.',
        },
      ],
    },
    cta: {
      heading: 'Ready to elevate your practice?',
      description:
        'Schedule a 30-minute discovery call directly with our team to discuss your goals and review our implementation roadmap.',
      button: 'Book a Free Strategy Call',
    },
  },
  ru: {
    metaTitle: 'О нас | VDigital',
    metaDescription:
      'Узнайте больше о VDigital — digital-студии из Ниша (Сербия). Основанная в 2026 году Велько Петковичем, наша команда из 3 человек создаёт сайты, видео и маркетинг для врачей и коучей.',
    badge: 'О нас · Студия VDigital',
    h1Regular: 'Digital-студия, созданная для',
    h1Italic: 'врачей и экспертов.',
    intro:
      'VDigital — независимая digital-студия из Ниша (Сербия). Мы помогаем частным клиникам, врачам и health-коучам выстраивать высокий авторитет, автоматизировать запись пациентов и развивать частную практику.',
    missionHeading: 'Почему мы сфокусированы на медицине и коучинге?',
    missionText: [
      'Работая в сфере разработки, мы увидели явное противоречие: врачи и наставники выполняют важнейшую социальную работу, сохраняя и улучшая здоровье людей, но их сайты и маркетинг часто безнадёжно устарели. Большинство агентств предлагают типовые решения, которые не вызывают доверия у пациентов и вредят профессиональной репутации.',
      'Студия VDigital создана с чёткой целью: дать экспертам эстетичные, быстрые и этичные системы привлечения пациентов. Мы объединяем врачебную этику, чистый дизайн и современные технологии веб-разработки.',
    ],
    founderStory: {
      heading: 'Основатель и история студии',
      text: [
        'Студию основал в 2026 году в Нише Велько Петкович — full-stack инженер, занимающийся веб-разработкой с 2020 года и успешно запустивший более 30 проектов в Европе и мире.',
        'Объединив инженерный подход, мгновенную скорость загрузки страниц и глубокое понимание воронок продаж, мы создали формат работы в 3-недельных спринтах, который даёт работающий результат без затянутых встреч и переплат.',
      ],
      foundedYear: '2026',
      experienceSince: '2020',
      projectsDelivered: '30+',
    },
    teamHeading: 'Наша команда из 3 специалистов',
    teamSubheading:
      'Компактная и слаженная команда, где вы общаетесь напрямую с создателями вашего проекта без посредников и менеджеров.',
    members: [
      {
        name: 'Велько Петкович',
        role: 'Основатель и Full-Stack Инженер',
        bio:
          'Отвечает за архитектуру сайтов, максимальную скорость работы, защиту персональных данных и автоматизацию записи. В веб-разработке с 2020 года, реализовал более 30 коммерческих проектов.',
        photo: '/images/team-veljko.jpg',
        photoAlt: 'Велько Петкович, основатель VDigital',
      },
      {
        name: 'Велимир Николич',
        role: 'Видеопроизводство и SMM',
        bio:
          'Разрабатывает визуальный стиль, готовит понятные сценарии медицинских тем, режиссирует съёмку и монтирует динамичные ролики, формирующие доверие у зрителей.',
        photo: '/images/team-velimir.jpg',
        photoAlt: 'Велимир Николич, видео и соцсети в VDigital',
      },
      {
        name: 'Вук Стефанович',
        role: 'Продажи и Аутрич',
        bio:
          'Эксперт по прямым переговорам, B2B-аутричу и квалификации заявок. Заботится о том, чтобы в вашем расписании появлялись встречи только с целевыми клиентами.',
        photo: '/images/team-vuk.jpg',
        photoAlt: 'Вук Стефанович, продажи и коммуникации в VDigital',
      },
    ],
    howWeWork: {
      heading: 'Принципы нашей работы',
      description:
        'Три правила, на которых строится каждый наш проект.',
      principles: [
        {
          title: 'Запуск за 3 недели',
          text:
            'Вместо долгих месяцев согласований мы работаем по чёткому спринту, где каждый день приближает запуск готовой системы.',
        },
        {
          title: 'Врачебная этика и престиж',
          text:
            'Никакого дешёвого хайпа. Все материалы подчеркивают вашу экспертность и соответствуют профессиональным нормам.',
        },
        {
          title: 'Реальные клиенты вместо пустых цифр',
          text:
            'Для нас главный показатель — заполненное расписание консультаций и рост выручки вашей практики.',
        },
      ],
    },
    cta: {
      heading: 'Хотите обсудить развитие вашей практики?',
      description:
        'Запишитесь на 30-минутный разбор с нашей командой, и мы покажем точки роста вашего интернет-присутствия.',
      button: 'Записаться на бесплатный звонок',
    },
  },
};
