export interface TeamMemberTranslation {
  id: string;
  name: string;
  role: string;
  text: string;
  photo: string;
  portfolioUrl?: string;
  portfolioLabel?: string;
}

export const en = {
  lang: 'en' as const,
  navbar: {
    links: {
      services: 'Services',
      process: 'Process',
      projects: 'Projects',
      team: 'Team',
      pricing: 'Pricing',
      faq: 'FAQ',
      contact: 'Contact',
    },
    cta: 'Book a call',
  },
  hero: {
    line1: 'Websites, video & marketing',
    line2: 'for doctors and coaches',
    line3: 'that bring you new clients',
    line4: 'while you focus on your work',
    leftText:
      "We're a team of three: a full-stack developer, a video creator and a sales specialist. Together we build the whole system that turns strangers into your clients.",
    rightText:
      'From the first call to a fully running system in 3 weeks. You keep full access to every account, number and result.',
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
    text: 'You heal, coach and change lives. We build the website, create the content and make the calls that bring new clients to your door.',
    words: {
      row1: ['You', 'heal,'],
      row1AfterHeal: ['coach', 'and', 'change', 'lives.'],
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
        title: 'Great work, empty calendar',
        text: "You're excellent at what you do, but new clients don't find you online.",
      },
      {
        id: 'no-time',
        title: 'No time for marketing',
        text: "Between patients and sessions, there's no energy left for posts, ads and messages.",
      },
      {
        id: 'online-image',
        title: "Your online image doesn't match your expertise",
        text: 'An outdated website or random posts make you look less professional than you are.',
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
    cardButton: 'Book a call',
    cards: [
      {
        id: 'web-development',
        number: '01',
        titleWhite: 'Web &',
        titleGrey: 'Development',
        tags: ['Websites', 'Landing pages', 'Web apps', 'Online booking', 'SEO'],
        text: 'Fast, secure websites built to turn visitors into booked appointments, optimized for Google and AI search from day one.',
      },
      {
        id: 'video-social',
        number: '02',
        titleWhite: 'Video &',
        titleGrey: 'Social Media',
        tags: ['Filming', 'Video editing', 'Instagram Reels', 'TikTok', 'Content planning'],
        text: 'We film, edit and publish content that shows your expertise and builds trust. Not comfortable on camera? We guide you through every step.',
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
        tags: ['Cold calling', 'Lead generation', 'Follow-ups', 'Appointment setting'],
        text: 'Our sales specialist reaches out to potential clients on your behalf and turns interest into booked calls and appointments.',
      },
    ],
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
          { title: 'Positioning & innovation plan', duration: '1 day' },
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
          { title: 'Ads & outreach launch', duration: '1 day' },
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
    subheading: 'Three specialists, one direct line. You always talk to the people doing the work.',
    members: [
      {
        id: 'member1',
        name: 'Veljko Petković',
        role: 'Founder · Full-Stack Developer',
        text: 'Builds websites, web apps and automations. Building for the web since 2020, with 30+ projects delivered.',
        photo: 'https://res.cloudinary.com/qftxmdqk/image/upload/v1790538093/0-02-05-f183470000d46207901c57a6779b1ae4b5bcb6a53af07abd7b79e27c5aa1bed7_7799938c6034200e.jpg',
        portfolioUrl: 'https://www.veljkopetkovic.com',
        portfolioLabel: 'See my work →',
      },
      {
        id: 'member2',
        name: 'Velimir Nikolić',
        role: 'Video & Social Media',
        text: 'Films, edits and runs content that makes people stop scrolling and start trusting you.',
        photo: 'https://res.cloudinary.com/qftxmdqk/image/upload/v1790538102/0-02-05-2f7f61b0f40e79c38060e9ab0a4dd6561d0f3d63bb587bd54585e26e23aaf8ed_89883eef4fc10efa.jpg',
      },
      {
        id: 'member3',
        name: 'Vuk Stefanović',
        role: 'Sales & Outreach',
        text: 'Handles cold calling and follow-ups, turning interest into booked appointments.',
        photo: 'https://res.cloudinary.com/qftxmdqk/image/upload/v1790538098/0-02-05-9b7c3cb69d4c13555dde0c6d3378e91ad6d9ee5bcf9a62688fcc7af5d17c117d_b9e5c6a7a8e0c8e0.jpg',
      },
    ] as TeamMemberTranslation[],
  },
  founding: {
    label: 'Founding clients',
    heading: "We're taking on 3 founding clients",
    headingItalic: 'from healthcare and coaching.',
    text: 'VDigital is a new studio built by an experienced team. Our first clients get founding terms, our full attention and a partner who grows with them.',
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
    card3: 'Hybrid: a lower fixed fee plus a percentage.',
    bottomLine:
      'No long-term contracts. You stay because you see results, not because you have to. Full access to every account, analytics and sales, including our share.',
  },
  faq: {
    label: 'FAQ',
    heading: 'Questions we hear most often',
    items: [
      {
        q: 'How much does it cost?',
        a: 'It depends on the scope and the model you choose. After a free call and a short analysis, you get a precise offer with no obligation.',
      },
      {
        q: 'How does the revenue share work?',
        a: 'You can pay a fixed price, a percentage of sales, or a combination. With the percentage model, we only earn when you do, and you see every number, including our share.',
      },
      {
        q: 'Do I have to appear on camera?',
        a: 'No. Our video creator guides you through filming step by step, and content can also be made without your face: your practice, graphics, text or animation.',
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
    heading: "Let's talk about your practice.",
    text: "Book a free call. We'll look at where you are now, where your clients come from and what would bring you more of them.",
    primaryButton: 'Book a call',
    orText: 'Or reach us directly',
    form: {
      name: 'Full name',
      contact: 'Email or phone',
      profession: 'What do you do?',
      professionOptions: [
        'Doctor',
        'Health or life coach',
        'Courses & education',
        'Other',
      ],
      message: 'Message (optional)',
      submit: 'Send inquiry',
      submitting: 'Sending...',
      success: "Thank you! We'll get back to you within 24 hours.",
      privacy: 'We only use your details to contact you about your inquiry.',
      privacyAgreementPrefix: 'By sending, you agree to our ',
      privacyAgreementLink: 'Privacy Policy',
      privacyAgreementSuffix: '.',
      errorRequired: 'Please enter your full name, email or phone, and select what you do.',
      errorGeneric: 'Something went wrong. Please try again.',
    },
  },
  footer: {
    text: 'VDigital: websites, video and marketing for doctors, health coaches and experts.',
    location: 'Niš, Serbia · Working with clients worldwide',
    copyright: '© 2026 VDigital. All rights reserved.',
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
      "Tell us about your practice, where new clients should be coming from and what's holding you back. We'll talk it through and show you what a useful next step could look like.",
    stepsLabel: 'What happens next',
    step1: 'Send us a short message or request a call.',
    step1Booking: 'Pick a time that works for you.',
    step2: 'We talk through your practice, your clients and your goals.',
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
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: September 2026',
    intro:
      'This Privacy Policy explains in plain language what personal data we collect when you contact VDigital, why we collect it, and what rights you have.',
    sections: [
      {
        heading: '1. Who collects the data (Data Controller)',
        body: 'VDigital, based in Niš, Republic of Serbia. For any privacy-related questions or requests, you can reach us directly at hello@vdigital.dev.',
      },
      {
        heading: '2. What data we collect & cookies',
        body: 'When you submit a contact or callback form on our website, we collect only the information you choose to provide: your name, your email address or phone number, your profession or area of work, and your message. We also store local preferences in your browser to remember your language choice ("vd_lang_choice") and your cookie consent choice ("vd-consent" = "granted" or "denied"). By default, Google Analytics 4 is loaded with Google Consent Mode v2 set to denied. Only if you click "Accept" on the cookie banner do we enable Google Analytics 4 cookies to understand how visitors use our site (such as pages visited, button clicks, and device type). Advertising cookies and ad personalization remain disabled at all times. You can change your choice at any time using the "Cookie settings" link in the footer.',
      },
      {
        heading: '3. Purpose of processing',
        body: 'We use your information exclusively to reply to your inquiry, schedule a call you requested, prepare a proposal for potential collaboration, and—if you accept analytics cookies—measure aggregate website usage. We do not send unsolicited marketing newsletters and we never sell or rent your data.',
      },
      {
        heading: '4. Legal basis',
        body: 'We process your data based on your consent (when submitting a form or accepting analytics cookies) and to take steps at your request prior to entering into a contract, in accordance with the Serbian Law on Personal Data Protection (ZZPL) and the EU General Data Protection Regulation (GDPR) for visitors from the European Economic Area.',
      },
      {
        heading: '5. Data retention period',
        body: 'Inquiry messages are retained for up to 12 months after our last communication so we can follow up on your request, unless you ask us to delete them sooner or we enter into a formal collaboration.',
      },
      {
        heading: '6. Third-party processors',
        body: 'To host this website, deliver your form submission to our inbox, and analyze website traffic (when consented), data is processed strictly as needed by: Vercel Inc. (website hosting and serverless API execution), Web3Forms (form delivery service that forwards your inquiry to hello@vdigital.dev), and Google Ireland Limited / Google LLC (Google Analytics 4 for anonymized website usage statistics, activated only if you accept analytics cookies).',
      },
      {
        heading: '7. Your rights',
        body: 'You have the right to request access to your personal data, correction of inaccurate data, deletion of your data, or restriction of processing at any time by emailing hello@vdigital.dev, and you can withdraw analytics cookie consent at any time via the "Cookie settings" link in the footer. You also have the right to lodge a complaint with the Serbian Commissioner for Information of Public Importance and Personal Data Protection (Poverenik za informacije od javnog značaja i zaštitu podataka o ličnosti) or with your local data protection authority in the EU.',
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
