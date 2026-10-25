export interface TeamMemberTranslation {
  id: string;
  name: string;
  role: string;
  text: string;
  photo: string;
  photoAlt: string;
  portfolioUrl?: string;
  portfolioLabel?: string;
}

export interface IndustryCard {
  title: string;
  who: string;
  text: string;
}

export interface WhoWeWorkWithTranslation {
  eyebrow: string;
  heading: string;
  subheading: string;
  cards: IndustryCard[];
  footerLine: string;
}

export const en = {
  lang: 'en' as const,
  navbar: {
    links: {
      services: 'Services',
      process: 'Process',
      about: 'About',
      team: 'Team',
      pricing: 'Pricing',
      faq: 'FAQ',
      contact: 'Contact',
    },
    dropdown: {
      servicesTitle: 'Our Services',
      webDev: 'Web Development',
      videoSocial: 'Video & Social Media',
      marketingAuto: 'Marketing & Automation',
      coldCalling: 'Cold Calling & Sales',
    },
    cta: 'Book a call',
  },
  hero: {
    line1: 'Websites, video & marketing',
    line2: 'that bring you new clients',
    line3: 'while you run your business',
    leftText:
      'VDigital is a digital studio from Niš, Serbia. We build the full client acquisition system: website, content, ads, automation and sales calls. One team, one plan, running in 3 weeks.',
    rightText:
      'You keep full access to every account, number and result.',
    primaryCta: 'Book a free call',
    secondaryCta: 'See how we work',
  },
  trustBar: {
    items: [
      '30+ projects delivered',
      'Building for the web since 2020',
      'Serbian, English & Russian',
      'Full system in 3 weeks',
    ],
  },
  statement: {
    text: 'You run your business. We build the website, create the content and make the calls that bring new clients to your door.',
    words: {
      row1: ['You', 'run'],
      row1AfterHeal: ['your', 'business.'],
      row2: ['We', 'build', 'the', 'website,'],
      row2AfterWebsite: ['create', 'the', 'content'],
      row3: ['and', 'make', 'the', 'calls'],
      row3AfterCalls: ['that', 'bring', 'new', 'clients', 'to', 'your', 'door.'],
    },
    button: "Let's talk",
  },
  painPoints: {
    label: 'Sound familiar?',
    heading: 'Great at what you do. Invisible online.',
    headingMain: 'Great at what you do.',
    headingItalic: 'Invisible online.',
    cards: [
      {
        id: 'empty-calendar',
        title: 'Great business, quiet phone',
        text: "What you sell is high quality, but new clients don't find you online.",
      },
      {
        id: 'no-time',
        title: 'No time for marketing',
        text: "Between clients, orders and running the business, there's no energy left for posts, ads and messages.",
      },
      {
        id: 'online-image',
        title: 'You look smaller online than you are',
        text: 'An outdated website or random posts make your business look less professional than it actually is.',
      },
      {
        id: 'afraid-payoff',
        title: "Afraid it won't pay off",
        text: "You've heard big promises before and don't want to pay for marketing that brings nothing.",
      },
    ],
    closing: "That's exactly the part we take over.",
  },
  services: {
    label: 'Services',
    heading: 'One team. The whole system.',
    hint: 'Scroll to see all services',
    cardButton: 'Learn more',
    cards: [
      {
        id: 'web-development',
        number: '01',
        titleWhite: 'Web &',
        titleGrey: 'Development',
        tags: ['Websites', 'Landing pages', 'Online shops', 'Web apps', 'Online booking & payments', 'SEO'],
        text: 'Fast, secure websites built to turn visitors into inquiries, bookings and sales, optimized for Google and AI search from day one.',
      },
      {
        id: 'video-social',
        number: '02',
        titleWhite: 'Video &',
        titleGrey: 'Social Media',
        tags: ['Filming', 'Video editing', 'Instagram Reels', 'TikTok', 'Content planning'],
        text: 'We film, edit and publish content that shows what you do and why people should choose you. Not comfortable on camera? We guide you through every step, or create content without your face.',
      },
      {
        id: 'marketing-automation',
        number: '03',
        titleWhite: 'Marketing &',
        titleGrey: 'Automation',
        tags: ['Paid ads', 'Market & competitor analysis', 'CRM', 'Automated replies', 'Analytics'],
        text: 'Ads bring people in, and automation makes sure no inquiry is ever left unanswered. You see every number in real time.',
      },
      {
        id: 'cold-calling-sales',
        number: '04',
        titleWhite: 'Cold Calling &',
        titleGrey: 'Sales',
        tags: ['Cold calling', 'Lead generation', 'Follow-up', 'Appointment setting'],
        text: 'Our sales specialist reaches out to potential clients on your behalf and turns interest into booked calls, appointments and sales.',
      },
    ],
  },
  whoWeWorkWith: {
    eyebrow: 'Who we work with',
    heading: 'Different industries. Same problem: not enough clients.',
    subheading:
      'If people can find you online, call you, book with you or buy from you, we can build a system that brings more of them.',
    cards: [
      {
        title: 'Health & wellness',
        who: 'Clinics, dentists, physiotherapists, health coaches',
        text: 'Websites and content people trust, turning searches into booked appointments.',
      },
      {
        title: 'Coaches, courses & education',
        who: 'Coaches, trainers, online schools, workshops',
        text: 'Landing pages, video and follow-ups that fill your programs and cohorts.',
      },
      {
        title: 'Local services',
        who: 'Salons, gyms, contractors, cleaning, trades',
        text: 'Get found on Google in your city, with a one-tap call or booking flow.',
      },
      {
        title: 'Hospitality & tourism',
        who: 'Restaurants, cafes, boutique rentals, tour operators',
        text: 'Content people want to share, plus more direct bookings and fewer platform commissions.',
      },
      {
        title: 'Online shops & brands',
        who: 'E-commerce, product brands, local makers',
        text: 'Fast stores, product video and ads that turn scrolling into orders.',
      },
      {
        title: 'Startups & B2B',
        who: 'SaaS, agencies, manufacturers, lawyers, accountants, real estate',
        text: 'Clear websites, cold calling and a CRM pipeline that turns into sales meetings.',
      },
    ],
    footerLine:
      "Don't see your industry? Tell us what you sell and we'll tell you honestly if we can help.",
  },
  process: {
    label: 'Process',
    headingBefore: 'From first call to a running system in',
    headingHighlight: '3 weeks',
    headingAfter: '.',
    sideText:
      "Every project follows the same clear plan, so you always know what's happening, what's next and when it will be done.",
    weeks: [
      {
        label: 'WEEK 01',
        title: 'Strategy',
        tasks: [
          { title: 'Discovery call', duration: '1 day' },
          { title: 'Goals & KPIs', duration: '1 day' },
          { title: 'Market & competitor analysis', duration: '2 days' },
          { title: 'Positioning & growth plan', duration: '1 day' },
          { title: 'Website & content structure', duration: '1 day' },
        ],
      },
      {
        label: 'WEEK 02',
        title: 'Production',
        tasks: [
          { title: 'Scripts & hooks', duration: '1 day' },
          { title: 'Filming', duration: '1 day' },
          { title: 'Video editing', duration: '2 days' },
          { title: 'Website design', duration: '2 days' },
        ],
      },
      {
        label: 'WEEK 03',
        title: 'Implementation',
        tasks: [
          { title: 'Website development', duration: '3 days' },
          { title: 'Automation & CRM setup', duration: '1 day' },
          { title: 'Ads & cold calling launch', duration: '1 day' },
          { title: 'Testing & launch', duration: '1 day' },
        ],
      },
    ],
    bottomLine:
      'After week 3: ongoing analytics, maintenance and improvements, so your results keep growing.',
  },
  team: {
    heading: 'The people behind VDigital.',
    headingBefore: 'The people behind',
    subheading:
      'Three specialists, one direct line. You always talk to the people doing the work.',
    members: [
      {
        id: 'member1',
        name: 'Veljko Petković',
        role: 'Founder · Full-Stack Developer',
        text: 'Builds websites, web apps and automations. Building for the web since 2020, with 30+ projects delivered.',
        photo: '/images/team-veljko.jpg',
        photoAlt: 'Veljko Petković, founder of VDigital',
        portfolioUrl: 'https://www.veljkopetkovic.com',
        portfolioLabel: 'See my work →',
      },
      {
        id: 'member2',
        name: 'Velimir Nikolić',
        role: 'Video & Social Media',
        text: 'Films, edits and runs content that makes people stop scrolling and start trusting you.',
        photo: '/images/team-velimir.jpg',
        photoAlt: 'Velimir Nikolić, video & social media at VDigital',
      },
      {
        id: 'member3',
        name: 'Vuk Stefanović',
        role: 'Sales & Cold Calling',
        text: 'Handles cold calling and follow-up, turning interest into booked appointments and sales.',
        photo: '/images/team-vuk.jpg',
        photoAlt: 'Vuk Stefanović, sales & cold calling at VDigital',
      },
    ] as TeamMemberTranslation[],
  },
  founding: {
    label: 'Founding partners',
    heading: "We're taking on 3 founding clients.",
    headingItalic: '',
    text: "VDigital is a new studio built by an experienced team. We're looking for 3 businesses, in any industry, to grow with. They get founding terms, our full attention and a partner who grows with them.",
    bullets: [
      'Founding terms on your first project',
      'Direct access to the whole team',
      'Your project becomes our first featured case study (only with your permission)',
    ],
    button: 'Apply for a founding spot',
  },
  howWeWork: {
    headingBefore: "Most agencies get paid no matter what. We'd rather",
    headingHighlight: 'grow',
    headingAfter: 'with you.',
    card1: 'Fixed price: a clear price for a clearly defined scope.',
    card2: 'Revenue share: we earn a percentage of sales, only when you earn.',
    card3: 'Hybrid model: a lower fixed fee plus a percentage.',
    bottomLine:
      'No long-term contracts. You stay because you see results, not because you have to. Full access to every account, analytics and sales, including our share.',
  },
  faq: {
    label: 'FAQ',
    heading: 'Questions we hear most often',
    items: [
      {
        q: 'Do you work with my industry?',
        a: "Most likely yes. We work with any business that gets clients online or over the phone: clinics, coaches, local services, restaurants, online shops, startups and B2B companies. On the first call, we'll tell you honestly if we're the right fit.",
      },
      {
        q: 'How much does it cost?',
        a: 'It depends on the scope and the model you choose. After a free call and a short analysis, you get a precise offer with no obligation.',
      },
      {
        q: 'How does revenue share work?',
        a: 'You can pay a fixed price, a percentage of sales, or a combination. With the percentage model, we only earn when you do, and you see every number, including our share.',
      },
      {
        q: 'We already have a website. Do we need a new one?',
        a: 'Not always. We look at what you have first. If the site is working, we improve it and build the rest of the system around it.',
      },
      {
        q: 'Do I have to appear on camera?',
        a: 'No. Our video creator guides you through filming step by step, and content can also be made without your face: your space, products, team, graphics or animation.',
      },
      {
        q: 'Who owns the website and the accounts?',
        a: 'You do. We manage them, but you have full access and control, and nothing is done without your knowledge.',
      },
      {
        q: 'What if there are no results?',
        a: "There are no long-term contracts. If the collaboration isn't working, it ends as defined in the contract. And with the revenue share model, no sales for you means no earnings for us.",
      },
      {
        q: 'How long does it take?',
        a: 'From the first call to a fully running system in about 3 weeks. After that come analytics, maintenance and ongoing improvements.',
      },
      {
        q: 'Do you work with clients outside Serbia?',
        a: 'Yes. We work in Serbian, English and Russian, fully remotely.',
      },
    ],
  },
  contact: {
    label: 'Contact',
    heading: "Let's talk about your business.",
    text: "Book a free call. We'll look at where you are now, where your clients come from and what would bring you more of them.",
    primaryButton: 'Book a call',
    orText: 'Or reach us directly',
    form: {
      name: 'Full name',
      contact: 'Email or phone',
      profession: 'Your industry',
      professionOptions: [
        'Health & wellness',
        'Coaching, courses & education',
        'Local services',
        'Hospitality & tourism',
        'Online shop or brand',
        'Startup or B2B',
        'Other',
      ],
      message: "Tell us what you sell and what you'd like to improve (optional)",
      submit: 'Send inquiry',
      submitting: 'Sending...',
      success: "Thank you! We'll get back to you within 24 hours.",
      privacy: 'We only use your details to contact you about your inquiry.',
      privacyAgreementPrefix: 'By sending, you agree to our ',
      privacyAgreementLink: 'Privacy Policy',
      privacyAgreementSuffix: '.',
      errorRequired:
        'Please enter your full name, email or phone, and select your industry.',
      errorGeneric: 'Something went wrong. Please try again.',
    },
  },
  footer: {
    text: 'VDigital: websites, video and marketing for businesses that want more clients.',
    location: 'Niš, Serbia · Working with clients worldwide',
    copyright: '© 2026 VDigital · Niš, Serbia',
    privacy: 'Privacy Policy',
    cookieSettings: 'Cookie settings',
  },
  cookieBanner: {
    text: 'We use cookies to understand how visitors use our site.',
    accept: 'Accept',
    decline: 'Decline',
    privacyLink: 'Privacy Policy',
  },
  contactPage: {
    label: 'Contact',
    h1Regular: 'Book a',
    h1Italic: 'free call.',
    intro:
      "Tell us about your business, where new clients should be coming from and what's holding you back. We'll talk it through and show you what a useful next step could look like.",
    stepsLabel: 'What happens next',
    step1: 'Send us a short message or request a call.',
    step1Booking: 'Pick a time that works for you.',
    step2: 'We talk through your business, your clients and your goals.',
    step3:
      'You get a concrete plan, and we decide together whether working together makes sense.',
    writeLabel: 'Prefer to write?',
    callbackLabel: 'Or we call you',
    callbackNamePlaceholder: 'Your name',
    callbackPhonePlaceholder: 'Phone number',
    callbackButton: 'Call me',
    callbackSuccess: "Thanks! We'll call you within 24 hours on working days.",
    callbackError: 'Something went wrong. Please message us on WhatsApp.',
    prefilledMessage: "Hi VDigital, I'd like to book a free call.",
    calendarFallback:
      "Send us a short message below or reach out directly and we'll find a time together.",
    socialsLabel: 'Follow us',
  },
  privacyPage: {
    label: 'Legal',
    title: 'Privacy & Cookie Policy',
    lastUpdated: 'Last updated: October 2026',
    intro:
      'This Privacy & Cookie Policy explains how VDigital collects, uses, and protects your personal data and how cookies and trackers are managed in compliance with the EU General Data Protection Regulation (GDPR), the ePrivacy Directive, and the Law on Personal Data Protection of the Republic of Serbia (ZZPL). Zero non-essential cookies or third-party trackers load until you explicitly grant consent.',
    manageCookiesCta: 'Manage Cookie Preferences',
    cookieTableTitle: 'Complete List of Cookies & Trackers',
    cookieTableHeaders: {
      name: 'Name',
      provider: 'Provider / Country',
      purpose: 'Purpose',
      duration: 'Duration',
      category: 'Category',
    },
    cookieTableRows: [
      {
        name: 'cc_cookie',
        provider: 'vdigital.dev (First-party)',
        purpose: 'Stores your cookie consent preferences (necessary, analytics, marketing) so we do not re-ask on every visit.',
        duration: '6 months (182 days)',
        category: 'Necessary',
      },
      {
        name: 'vd_lang_choice, vd_lang_banner_dismissed',
        provider: 'vdigital.dev (localStorage)',
        purpose: 'Remembers your selected interface language (SR / EN / RU) and whether you dismissed the language suggestion bar.',
        duration: 'Persistent (local browser storage)',
        category: 'Necessary',
      },
      {
        name: '_ga, _ga_NNXZ378TYV',
        provider: 'Google Ireland Ltd / Google LLC (EU / USA)',
        purpose: 'Google Analytics 4 cookies used to distinguish unique users and measure session interactions (loaded only after Analytics consent).',
        duration: '2 years',
        category: 'Analytics',
      },
      {
        name: '_gid, _gat',
        provider: 'Google Ireland Ltd / Google LLC (EU / USA)',
        purpose: 'Google Analytics 4 cookies used to distinguish short-term sessions and throttle request rate (loaded only after Analytics consent).',
        duration: '24 hours / 1 minute',
        category: 'Analytics',
      },
      {
        name: '_ym_uid, _ym_d',
        provider: 'Yandex LLC (Russian Federation)',
        purpose: 'Yandex Metrica anonymous visitor ID and first-visit timestamp for site usage statistics (loaded only after Analytics consent).',
        duration: '1 year',
        category: 'Analytics',
      },
      {
        name: '_ym_isad, _ym_visorc',
        provider: 'Yandex LLC (Russian Federation)',
        purpose: 'Yandex Metrica ad-blocker detection and session metrics (loaded only after Analytics consent; Webvisor session replay is disabled).',
        duration: '2 days / 30 minutes',
        category: 'Analytics',
      },
      {
        name: 'Ahrefs Web Analytics (script)',
        provider: 'Ahrefs Pte. Ltd. (Singapore / EU)',
        purpose: 'Cookieless traffic measurement script (loaded only after Analytics consent).',
        duration: 'Session (no cookies set)',
        category: 'Analytics',
      },
      {
        name: 'Cal.com Embed & YouTube-nocookie',
        provider: 'Cal.com Inc. (USA) / Google LLC (USA)',
        purpose: 'Interactive call scheduling calendar and privacy-enhanced video player (loaded only after Marketing consent or explicit click-to-load).',
        duration: 'Session',
        category: 'Marketing',
      },
    ],
    sections: [
      {
        heading: '1. Data Controller',
        body: 'The data controller responsible for processing your personal data is VDigital (Veljko Petković, Niš, Republic of Serbia). For any privacy or data protection inquiries, contact us directly at hello@vdigital.dev or +381 65 913 1103.',
      },
      {
        heading: '2. Personal Data We Collect',
        body: '• Contact Form Data: When you submit an inquiry via our contact form, we collect the details you voluntarily provide: your full name, email address or phone number/messenger handle, your industry or field of work, and your message.\n• Technical & Analytics Data (Only With Prior Consent): When you first visit vdigital.dev, no non-essential cookies or third-party scripts are loaded. Only if you explicitly accept the "Analytics" or "Marketing" categories in our consent banner do we collect anonymized usage statistics (pages visited, referrer URL, browser/device type, and IP address processed by analytics providers). All fonts and images are self-hosted on vdigital.dev so no third-party font or image CDNs receive your IP address on page load.',
      },
      {
        heading: '3. Purposes and Legal Basis for Processing',
        body: '• Strictly Necessary Operations (GDPR Art. 6(1)(f) / Serbian ZZPL Art. 12(1)(6) & ePrivacy Art. 5(3)): Storing your cookie consent decision (cc_cookie) and language preference (vd_lang_choice) is strictly necessary to provide the website in the language and privacy configuration you requested.\n• Responding to Inquiries & Pre-Contractual Steps (GDPR Art. 6(1)(b) & (a) / ZZPL Art. 12(1)(1) & (2)): Processing contact form submissions to reply to your message, schedule a call, and prepare a collaboration proposal.\n• Analytics & Marketing Embeds (GDPR Art. 6(1)(a) / ZZPL Art. 12(1)(1)): Loading Google Analytics 4 (with Google Consent Mode v2), Yandex Metrica, Ahrefs Analytics, Cal.com booking widgets, or YouTube-nocookie embeds occurs strictly on the basis of your prior, freely given opt-in consent.',
      },
      {
        heading: '4. Third-Party Recipients & International Data Transfers',
        body: 'Depending on the features you use and the consent categories you accept, data may be processed by:\n• Vercel Inc. (USA / EU Edge Network) - Website hosting and serverless API execution, protected under Standard Contractual Clauses (SCCs) and the EU-US Data Privacy Framework.\n• Vercel Web Analytics (cookieless, Vercel Inc., USA, EU-US DPF) - Anonymous, privacy-friendly website performance and traffic analytics without cookies or cross-site tracking.\n• Web3Forms (USA / EU) - Processes contact form data solely when you click "Send inquiry" to deliver your message to hello@vdigital.dev.\n• Google Ireland Limited / Google LLC (Ireland / USA) - Google Analytics 4 (gated behind "Analytics" consent; IP anonymization enabled; Google Consent Mode v2 defaults all storage to denied).\n• Yandex LLC (Russian Federation) - Yandex Metrica (strictly gated behind "Analytics" consent; zero data is sent to Russian servers unless you explicitly accept Analytics cookies pursuant to GDPR Art. 49(1)(a) / ZZPL).\n• Ahrefs Pte. Ltd. (Singapore / EU) - Cookieless web analytics (strictly gated behind "Analytics" consent).\n• Cal.com, Inc. (USA) - Interactive call booking calendar on the Contact page (gated behind consent or explicit click-to-load action).',
      },
      {
        heading: '5. Data Retention',
        body: 'Contact form inquiries are retained for up to 12 months from our last communication unless you request earlier deletion or we enter into a service contract. Your cookie consent choice (cc_cookie) is stored for 6 months (182 days), after which you will be asked to renew your preference.',
      },
      {
        heading: '6. Your Rights Under GDPR & Serbian ZZPL',
        body: 'Under the GDPR and the Serbian Law on Personal Data Protection (ZZPL), you have the right to: (a) request access to and a copy of your personal data; (b) request rectification of inaccurate data; (c) request erasure ("right to be forgotten"); (d) restrict or object to processing; (e) request data portability; and (f) withdraw your consent at any time without affecting the lawfulness of processing prior to withdrawal.\n\nTo exercise any of these rights, email hello@vdigital.dev. You also have the right to lodge a complaint with the Serbian Supervisory Authority - the Commissioner for Information of Public Importance and Personal Data Protection (Poverenik za informacije od javnog značaja i zaštitu podataka o ličnosti, Bulevar kralja Aleksandra 15, 11120 Belgrade, Serbia, www.poverenik.rs, office@poverenik.rs) - or with the data protection authority in your EU/EEA member state of residence.',
      },
      {
        heading: '7. How to Change or Withdraw Cookie Consent',
        body: 'You can review, change, or withdraw your cookie consent at any time by clicking the "Manage Cookie Preferences" button below or the "Cookie settings" link in the footer of every page. When you withdraw consent, non-essential cookies (_ga, _gid, _ym_*, etc.) are immediately deleted from your browser and analytics scripts are stopped.',
      },
    ],
  },
  notFoundPage: {
    code: '404',
    label: 'Error 404',
    headingRegular: 'Ooops...',
    headingItalic: 'Page not found.',
    description:
      "Sorry, the page you are looking for doesn't exist, has been moved, or is temporarily unavailable. Let's get you back on track.",
    primaryCta: 'Back to homepage',
    secondaryCta: 'Contact us',
    imageAlt: '404 error illustration',
  },
};

export type Translations = Omit<typeof en, 'lang'> & { lang: 'en' | 'sr' | 'ru' };
