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
        photo: '/team/member1.webp',
      },
      {
        id: 'member2',
        name: 'Velimir Nikolić',
        role: 'Video & Social Media',
        text: 'Films, edits and runs content that makes people stop scrolling and start trusting you.',
        photo: '/team/member2.webp',
      },
      {
        id: 'member3',
        name: 'Vuk Stefanović',
        role: 'Sales & Outreach',
        text: 'Handles cold calling and follow-ups, turning interest into booked appointments.',
        photo: '/team/member3.webp',
      },
    ],
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
      errorRequired: 'Please enter your full name, email or phone, and select what you do.',
      errorGeneric: 'Something went wrong. Please try again.',
    },
  },
  footer: {
    text: 'VDigital: websites, video and marketing for doctors, health coaches and experts.',
    location: 'Niš, Serbia · Working with clients worldwide',
    copyright: '© 2026 VDigital. All rights reserved.',
  },
  contactPage: {
    label: 'Contact',
    h1Regular: 'Book a',
    h1Italic: 'free call.',
    intro:
      "Tell us about your practice, where new clients should be coming from and what's holding you back. We'll talk it through and show you what a useful next step could look like.",
    stepsLabel: 'What happens next',
    step1: 'Pick a time that works for you.',
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
      "The calendar isn't available right now. Message us and we'll find a time together.",
    socialsLabel: 'Follow us',
  },
};

export type Translations = Omit<typeof en, 'lang'> & { lang: 'en' | 'sr' | 'ru' };
