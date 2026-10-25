import { SupportedLocale } from '../i18n';

export type ServiceSlug =
  | 'web-development'
  | 'video-social-media'
  | 'marketing-automation'
  | 'cold-calling';

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceDetail {
  slug: ServiceSlug;
  serviceType: string;
  badge: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  lead: string;
  stats: { value: string; label: string }[];
  problem: {
    heading: string;
    description: string;
    points: { title: string; text: string }[];
  };
  deliverables: {
    heading: string;
    description: string;
    items: { title: string; text: string }[];
  };
  process: {
    heading: string;
    description: string;
    steps: { step: string; title: string; duration: string; text: string }[];
  };
  pricingModels: {
    heading: string;
    description: string;
    models: { title: string; subtitle: string; description: string; highlights: string[] }[];
  };
  faqs: ServiceFAQ[];
  cta: {
    heading: string;
    description: string;
    button: string;
  };
}

export const SERVICES_DATA: Record<SupportedLocale, Record<ServiceSlug, ServiceDetail>> = {
  en: {
    'web-development': {
      slug: 'web-development',
      serviceType: 'Web Development',
      badge: 'Web & development',
      title: 'Web Development & Web Apps | VDigital',
      metaTitle: 'Web Development & Web Apps | VDigital',
      metaDescription:
        'Fast custom websites, online shops and web apps that turn visitors into inquiries, bookings and sales. Mobile-first, SEO-ready from day one, built in 3 weeks.',
      h1: 'Websites that bring you clients, not just compliments',
      lead:
        'We design and build fast, custom websites, online shops and web apps that build trust and turn visitors into inquiries, bookings and sales.',
      stats: [
        { value: '3 weeks', label: 'From first call to live site' },
        { value: '100%', label: 'You own the code, domain and content' },
        { value: 'Mobile-first', label: 'Built for the phone first, where most of your visitors are' },
      ],
      problem: {
        heading: "Why most websites don't bring in clients",
        description:
          'Too many sites are built from heavy templates and left alone after launch. They look decent, but nobody calls.',
        points: [
          {
            title: 'No reason to trust you',
            text:
              'Visitors decide in seconds. An outdated or cluttered site makes them leave before they even see what you offer.',
          },
          {
            title: 'Too hard to take action',
            text:
              'If people have to hunt for a phone number or fill out a long form, they head back to Google and pick a competitor.',
          },
          {
            title: 'Slow on mobile',
            text:
              'Most people find you on a phone. A slow site loses them before the page even loads.',
          },
        ],
      },
      deliverables: {
        heading: 'What goes into your website',
        description:
          'A complete site built around how your business actually gets clients.',
        items: [
          {
            title: 'Custom design',
            text: 'Layout, colors and typography tailored to your brand. No off-the-shelf templates.',
          },
          {
            title: 'Booking, ordering & payments',
            text:
              'Online booking synced to your calendar, inquiry forms, online store or card payments, depending on what you sell. Automatic email or SMS confirmations.',
          },
          {
            title: 'Copy that sells',
            text:
              'We write clear, simple copy that explains what you do and why clients should choose you.',
          },
          {
            title: 'SEO from day one',
            text:
              'Structured data, Google Business Profile setup and local SEO so you get found when people search in your city or niche. Ready for AI search too.',
          },
          {
            title: 'Privacy & security',
            text:
              'Cookie consent configured properly (Google Consent Mode v2), privacy policy and SSL on every page.',
          },
          {
            title: 'Fast hosting',
            text:
              'A modern React stack on a global CDN so the site loads fast on every phone.',
          },
        ],
      },
      process: {
        heading: 'How we build it in 3 weeks',
        description: "A clear process that doesn't eat up your schedule.",
        steps: [
          {
            step: '01',
            title: 'Strategy & structure',
            duration: 'Week 1',
            text:
              'We define your offer, your ideal clients and what the site needs to do, then write the copy and plan every page.',
          },
          {
            step: '02',
            title: 'Design & build',
            duration: 'Week 2',
            text:
              'We design the pages, build the site, hook up booking, forms or payments and test across phones and screens.',
          },
          {
            step: '03',
            title: 'Testing & launch',
            duration: 'Week 3',
            text:
              'We set up analytics, test SEO and speed, polish the details and launch on your domain.',
          },
        ],
      },
      pricingModels: {
        heading: 'Three ways to work together',
        description:
          'Choose the model that fits where your business is today. No long-term contracts.',
        models: [
          {
            title: 'Fixed price',
            subtitle: 'Clear scope & date',
            description:
              'Best when you know exactly what you need. Clear scope, fixed price and an agreed launch date. Everything we build is yours.',
            highlights: ['Agreed launch date', 'Full code & domain ownership', 'No hidden fees'],
          },
          {
            title: 'Revenue share',
            subtitle: 'Performance-aligned',
            description:
              'Lower upfront cost, and we earn a percentage of the sales the new system brings in. We only win when you win.',
            highlights: ['Lower upfront commitment', 'Aligned incentives', 'Full transparency'],
          },
          {
            title: 'Hybrid (build + monthly growth)',
            subtitle: 'Launch + ongoing support',
            description:
              'The site plus ongoing work after launch: SEO content, updates, backups and improvements so the same traffic brings more inquiries.',
            highlights: ['Continuous SEO updates', 'Technical maintenance', 'Conversion improvements'],
          },
        ],
      },
      faqs: [
        {
          question: 'How much of my time is needed?',
          answer:
            'Around 2 to 3 hours total: one kickoff call and two short reviews. We handle the writing, design and setup.',
        },
        {
          question: 'Do I own the website and the domain?',
          answer:
            'Yes. The code, domain, content and accounts are 100% yours. If you ever stop working with us, you take everything with you.',
        },
        {
          question: 'Can you redesign my existing website?',
          answer:
            "Yes. We keep what is working, transfer your content and reviews, and set up redirects so you don't lose any Google rankings.",
        },
      ],
      cta: {
        heading: 'Ready for a website that brings you clients?',
        description:
          "Book a free 30-minute call. We'll look at your current online presence and show you what we'd change.",
        button: 'Book a free consultation',
      },
    },
    'video-social-media': {
      slug: 'video-social-media',
      serviceType: 'Video Production & Social Media',
      badge: 'Video & social media',
      title: 'Video Production & Social Media Management | VDigital',
      metaTitle: 'Video Production & Social Media Management | VDigital',
      metaDescription:
        'Short-form video for Instagram Reels, TikTok and YouTube Shorts. We plan, film, edit and publish content that turns viewers into clients.',
      h1: 'Video content that makes people stop scrolling and start buying',
      lead:
        'We plan, film, edit and publish short-form video that shows what you do, builds trust and brings people to your site, your inbox or your door.',
      stats: [
        { value: '1 shoot', label: 'A full month of content from a single shoot day' },
        { value: '12 to 16', label: 'Short-form videos per month' },
        { value: 'Faceless options', label: 'Content can work without you on camera' },
      ],
      problem: {
        heading: 'Why most business social media goes nowhere',
        description:
          'Posting without a plan takes hours and brings likes at best, not clients.',
        points: [
          {
            title: 'Random posts, no plan',
            text:
              "A post here, a post there, copied trends and stock graphics. People scroll past because nothing says why you're different.",
          },
          {
            title: 'No time to film',
            text:
              "Running a business doesn't leave hours for daily filming. Without a system, social media becomes a chore you keep putting off.",
          },
          {
            title: 'Views that never become clients',
            text:
              "Views mean nothing if viewers don't have a clear way to contact you, book or buy.",
          },
        ],
      },
      deliverables: {
        heading: 'End-to-end video production',
        description:
          'You spend around 2 hours on camera a month, or none at all. We handle everything else.',
        items: [
          {
            title: 'Topics & scripts',
            text:
              'We find the questions your clients ask and the reasons they buy, then turn them into simple scripts and hooks.',
          },
          {
            title: 'Filming',
            text:
              'On-location or remote with our direction. We guide you so you sound natural, not rehearsed.',
          },
          {
            title: 'Editing & captions',
            text:
              'Fast pacing, clean color, animated graphics and captions for the majority who watch with sound off.',
          },
          {
            title: 'Publishing',
            text:
              'Videos formatted and posted to Instagram Reels, TikTok and YouTube Shorts, with captions, covers and hashtags.',
          },
          {
            title: 'Viewer-to-client flow',
            text:
              'Bio links, automated DM replies and booking links so people who liked the video can actually reach you.',
          },
        ],
      },
      process: {
        heading: 'How a month of content works',
        description: 'Built to fit into your business, not take it over.',
        steps: [
          {
            step: '01',
            title: 'The plan',
            duration: 'Days 1 to 3',
            text: 'We send you 12 to 16 video ideas built around your best products or services.',
          },
          {
            step: '02',
            title: 'Filming',
            duration: 'One day',
            text: 'One focused shoot, in person or remote, with our director walking you through every shot.',
          },
          {
            step: '03',
            title: 'Edit & publish',
            duration: 'Rest of month',
            text: 'You approve the edits, we publish on schedule and report what worked.',
          },
        ],
      },
      pricingModels: {
        heading: 'How we can work together on video',
        description:
          'Fixed price, revenue share or a combination, just like every VDigital service.',
        models: [
          {
            title: 'Monthly content plan',
            subtitle: 'Turnkey short-form',
            description:
              '12 to 16 short-form videos a month, from idea to publication, with monthly performance reviews.',
            highlights: ['12 to 16 videos/month', 'Full editing and captions', 'Publishing & analytics'],
          },
          {
            title: 'Content + paid ads',
            subtitle: 'Amplify top performers',
            description:
              'We boost your best-performing videos to the right people in your city, country or market. You see what each lead costs.',
            highlights: ['Targeted ad campaigns', 'Lead cost reporting', 'Creative testing'],
          },
          {
            title: 'One-off production',
            subtitle: 'Brand, promo or course',
            description:
              'Brand video, product videos, an event promo or an online course. Planned, filmed and edited from start to finish.',
            highlights: ['Complete single production', 'Professional cinematography', 'All raw footage delivered'],
          },
        ],
      },
      faqs: [
        {
          question: "What if I'm not comfortable on camera?",
          answer:
            "Most people aren't at first. We film like a conversation: you answer the questions you already answer for clients every day. And many videos can be made entirely without your face.",
        },
        {
          question: 'Where do we film?',
          answer:
            'At your space, on location, or remotely with simple instructions for lighting and sound. We pick whatever fits the content.',
        },
        {
          question: 'Do I need to post every day?',
          answer:
            'No. Consistency matters more than volume. For most businesses, 3 to 4 good videos a week is plenty.',
        },
      ],
      cta: {
        heading: 'Ready to be the business people see first?',
        description:
          "Book a call with our team and we'll show you what video ideas fit your business best.",
        button: 'Book a video strategy call',
      },
    },
    'marketing-automation': {
      slug: 'marketing-automation',
      serviceType: 'Marketing & Automation',
      badge: 'Marketing & automation',
      title: 'Paid Ads, CRM & Marketing Automation | VDigital',
      metaTitle: 'Paid Ads, CRM & Marketing Automation | VDigital',
      metaDescription:
        'Google and Meta ads, a CRM pipeline and automated replies and reminders so every lead gets answered and you know where your clients come from.',
      h1: 'Ads that bring people in. Automation that turns them into buyers.',
      lead:
        'We run your Google and Meta ads and connect them to a CRM and automated follow-ups, so no inquiry is ever forgotten and you always know what each client cost you.',
      stats: [
        { value: '24/7', label: 'Every inquiry gets an instant response' },
        { value: '1 dashboard', label: 'All leads, calls and sales in one place' },
        { value: 'Live', label: 'You see every number, including ad spend' },
      ],
      problem: {
        heading: 'Where most businesses lose money',
        description:
          'Running ads without follow-up is like paying people to visit your store and keeping the door locked.',
        points: [
          {
            title: 'Slow replies',
            text:
              "Someone reaches out in the evening, and doesn't get a reply until tomorrow afternoon. By then, they've already bought from someone faster.",
          },
          {
            title: 'Ads for everyone and no one',
            text:
              'Broad targeting brings clicks from people who were never going to buy. Budget gone, phone silent.',
          },
          {
            title: 'No-shows and forgotten leads',
            text:
              'Booked calls and appointments get missed, and interested people never get a second message. Every one of them is lost revenue.',
          },
        ],
      },
      deliverables: {
        heading: 'A complete growth system',
        description:
          'Ads, instant replies and a clear pipeline, connected into one system.',
        items: [
          {
            title: 'Google & Meta ads',
            text:
              'Campaigns shown to people already looking for what you sell, in your city, country or market.',
          },
          {
            title: 'Automated replies & reminders',
            text:
              'Instant responses to new inquiries, plus email, SMS or WhatsApp confirmations and reminders that reduce no-shows.',
          },
          {
            title: 'CRM pipeline',
            text:
              'Every lead in one place, from first message to closed sale, so nothing slips through and you see exactly where people drop off.',
          },
          {
            title: 'Review requests',
            text:
              'Automated, polite messages to happy clients asking for a Google review, so your rating keeps climbing.',
          },
          {
            title: 'Market & competitor analysis',
            text:
              'We look at what competitors are doing, where the gaps are and how to position your offer before spending ad money.',
          },
        ],
      },
      process: {
        heading: 'How we set it up in 3 weeks',
        description: 'Built into the way you already work, without slowing your team down.',
        steps: [
          {
            step: '01',
            title: 'Mapping the client journey',
            duration: 'Week 1',
            text:
              'We find where leads get stuck, which products or services make you the most money, and what follow-up should look like.',
          },
          {
            step: '02',
            title: 'Building the system',
            duration: 'Week 2',
            text:
              'We set up the CRM, connect forms from your site and channels, write message templates and test every workflow.',
          },
          {
            step: '03',
            title: 'Launch & optimization',
            duration: 'Week 3',
            text:
              'We launch campaigns, track cost per lead and sale, and continually improve what is working.',
          },
        ],
      },
      pricingModels: {
        heading: 'Three ways to work together',
        description: 'No long-term contracts. Full access to every account and number.',
        models: [
          {
            title: 'One-time setup',
            subtitle: 'Built and handed over',
            description:
              'We build the CRM, automations and review system, train your team and hand it over. It stays yours.',
            highlights: ['Custom CRM configuration', 'Automated workflows', 'Team training included'],
          },
          {
            title: 'Monthly management',
            subtitle: 'Continuous optimization',
            description:
              'Ongoing ad management, testing and improvements, with a clear monthly report showing what each client cost you.',
            highlights: ['Full ad account management', 'Ongoing copy and creative tests', 'Monthly performance reporting'],
          },
          {
            title: 'Revenue share',
            subtitle: 'Shared upside',
            description:
              'Lower fixed fee plus a percentage of the sales the system brings in. Available after we review your offer and numbers together.',
            highlights: ['Lower upfront retainer', 'Tied to verified sales', 'Shared growth incentives'],
          },
        ],
      },
      faqs: [
        {
          question: 'How much should I spend on ads?',
          answer:
            'It depends on your market and goals. After the week 1 analysis, we recommend a starting budget. You can start small and put more behind what works.',
        },
        {
          question: 'Will my team have to learn complicated software?',
          answer:
            'No. We set up simple tools, show your team how to use them, and write short guides. Most of the work runs on its own.',
        },
        {
          question: 'When do new inquiries start coming in?',
          answer:
            'Usually in the first days after ads go live in week 3. The first weeks are for testing, and results grow as we learn what works for your business.',
        },
      ],
      cta: {
        heading: 'Stop losing clients you already paid for',
        description:
          "Book a call and we'll show you where your leads are leaking today and how to fix it.",
        button: 'Request a free audit',
      },
    },
    'cold-calling': {
      slug: 'cold-calling',
      serviceType: 'Cold Calling & Sales',
      badge: 'Cold calling & sales',
      title: 'Cold Calling & Appointment Setting | VDigital',
      metaTitle: 'Cold Calling & Appointment Setting | VDigital',
      metaDescription:
        'Cold calling for your business: we reach out to potential clients, qualify them and book appointments straight into your calendar. For B2B and B2C.',
      h1: "We call your future clients so you don't have to",
      lead:
        'Our sales specialist reaches out to the right people, qualifies their interest and books appointments directly into your calendar. You only speak with people who actually need what you offer.',
      stats: [
        { value: '1-on-1', label: 'Every list researched by hand' },
        { value: 'Qualified', label: 'Budget and need verified before the meeting' },
        { value: 'Weekly', label: 'Reports on calls, bookings and objections' },
      ],
      problem: {
        heading: 'Why blast emails and spam messages no longer work',
        description:
          'Generic outreach goes to spam and does more damage to your reputation than good.',
        points: [
          {
            title: 'People spot templates instantly',
            text:
              'Copy-paste messages get deleted in seconds. A real conversation starts with real research.',
          },
          {
            title: "You don't have time to call",
            text:
              "You're good at your work, not at spending hours cold-calling strangers. Prospecting gets pushed to \"next week\" forever.",
          },
          {
            title: 'Meetings with the wrong people',
            text:
              'An hour on a call with someone who has neither budget nor need is an hour taken from paying clients.',
          },
        ],
      },
      deliverables: {
        heading: 'Your dedicated sales team',
        description:
          'A trained specialist who represents your business professionally and fills your calendar with real meetings.',
        items: [
          {
            title: 'Targeted contact lists',
            text:
              'We build and verify lists of companies or people that match your ideal client: industry, size, location and title.',
          },
          {
            title: 'Human-sounding scripts',
            text:
              "Conversational scripts built around your clients' problems, without pushy sales tricks.",
          },
          {
            title: 'Calls & qualification',
            text:
              'We make the calls, verify need, budget and timing, and book the meeting on your calendar.',
          },
          {
            title: 'Follow-up',
            text:
              'Anyone who says "not right now" gets a polite check-in at the right time, by phone, email or message.',
          },
          {
            title: 'Weekly reporting',
            text:
              'Call volume, booked meetings and the objections we hear most often, so you can sharpen your offer and pricing.',
          },
        ],
      },
      process: {
        heading: 'From first call to a full calendar',
        description: 'A clear process that keeps your schedule filled with qualified meetings.',
        steps: [
          {
            step: '01',
            title: 'Offer & ideal client',
            duration: 'Week 1',
            text: "We review your offer, define exactly who we're calling, and write the scripts.",
          },
          {
            step: '02',
            title: 'Lists & test calls',
            duration: 'Week 2',
            text: 'We build the first contact list, start calling and adjust the pitch based on real responses.',
          },
          {
            step: '03',
            title: 'Full outreach',
            duration: 'From week 3',
            text: "We ramp up daily call volume so you walk into meetings with people who already know why you're calling.",
          },
        ],
      },
      pricingModels: {
        heading: 'Three ways to work together',
        description: "Tailored to your offer's price point and how fast you want to grow.",
        models: [
          {
            title: 'Base fee + per meeting',
            subtitle: 'Balanced risk & reward',
            description:
              'A monthly fee for list building and call hours, plus a bonus for each qualified meeting that actually takes place. Our most balanced model.',
            highlights: ['Dedicated call hours', 'Performance meeting bonus', 'Zero bonus for no-shows'],
          },
          {
            title: 'Revenue share',
            subtitle: 'Pure commission',
            description:
              'A percentage of the deals we help you close. Best for offers with a proven sales track record.',
            highlights: ['Commission based on closed deals', 'Aligned incentives', 'Proven sales required'],
          },
          {
            title: 'Playbook & sales training',
            subtitle: 'In-house enablement',
            description:
              'For businesses building their own sales team. We hand over our scripts, CRM setup and training so your people can run it themselves.',
            highlights: ['Complete phone scripts', 'CRM setup and pipelines', 'Sales training sessions'],
          },
        ],
      },
      faqs: [
        {
          question: 'Will cold calling damage my reputation?',
          answer:
            "No. Our calls are short, polite and helpful. We respect people's time and represent your business the same way you would.",
        },
        {
          question: 'How many meetings can I expect?',
          answer:
            'It depends on your market, offer and pricing. After the first two weeks of test calls, we can give you a realistic monthly estimate.',
        },
        {
          question: "What if someone cancels or doesn't show?",
          answer:
            'We follow up and try to reschedule. With the pay-per-meeting model, you only pay the meeting bonus for calls that actually happen.',
        },
        {
          question: 'Do you call in other languages?',
          answer: 'Yes. We make calls in Serbian, English and Russian.',
        },
      ],
      cta: {
        heading: 'Ready for a calendar full of real sales meetings?',
        description:
          "Book a strategy call and we'll tell you honestly if your offer is ready for cold calling.",
        button: 'Book a strategy call',
      },
    },
  },
  sr: {
    'web-development': {
      slug: 'web-development',
      serviceType: 'Veb i programiranje',
      badge: 'Veb i programiranje',
      title: 'Izrada sajtova i veb aplikacija | VDigital',
      metaTitle: 'Izrada sajtova i veb aplikacija | VDigital',
      metaDescription:
        'Brzi sajtovi po meri, online prodavnice i veb aplikacije koje posetioce pretvaraju u upite, zakazivanja i prodaju. Prilagođeni telefonu, spremni za SEO, gotovi za 3 nedelje.',
      h1: 'Sajtovi koji vam donose klijente, ne samo komplimente',
      lead:
        'Dizajniramo i pravimo brze sajtove po meri, online prodavnice i veb aplikacije koji ulivaju poverenje i pretvaraju posetioce u upite, zakazivanja i prodaju.',
      stats: [
        { value: '3 nedelje', label: 'Od prvog poziva do sajta koji je online' },
        { value: '100%', label: 'Kod, domen i sadržaj su vaši' },
        { value: 'Mobile-first', label: 'Pravljeno prvo za telefon, gde je većina vaših posetilaca' },
      ],
      problem: {
        heading: 'Zašto većina sajtova ne dovodi klijente',
        description:
          'Mnogi sajtovi su napravljeni od teških šablona i ostavljeni sami posle lansiranja. Izgledaju solidno, ali niko ne zove.',
        points: [
          {
            title: 'Nema razloga da vam veruju',
            text:
              'Posetioci odlučuju za par sekundi. Zastareo ili pretrpan sajt ih tera da odu pre nego što vide šta nudite.',
          },
          {
            title: 'Previše je teško javiti se',
            text:
              'Ako ljudi moraju da traže broj telefona ili da popune dugu formu, vrate se na Google i izaberu konkurenciju.',
          },
          {
            title: 'Spor na telefonu',
            text:
              'Većina ljudi vas pronalazi preko mobilnog. Spor sajt ih izgubi pre nego što se stranica uopšte učita.',
          },
        ],
      },
      deliverables: {
        heading: 'Šta sve ulazi u vaš sajt',
        description:
          'Kompletan sajt napravljen oko toga kako vaša firma zaista dobija klijente.',
        items: [
          {
            title: 'Dizajn po meri',
            text: 'Raspored, boje i tipografija napravljeni za vaš brend. Bez gotovih šablona.',
          },
          {
            title: 'Zakazivanje, porudžbine i plaćanje',
            text:
              'Online zakazivanje povezano sa kalendarom, kontakt forme, online prodavnica ili plaćanje karticom, u zavisnosti od toga šta prodajete. Automatske potvrde mejlom ili SMS-om.',
          },
          {
            title: 'Tekstovi koji prodaju',
            text:
              'Pišemo jasne, jednostavne tekstove koji objašnjavaju šta radite i zašto da izaberu baš vas.',
          },
          {
            title: 'SEO od prvog dana',
            text:
              'Strukturisani podaci, podešavanje Google Business Profile-a i lokalni SEO, da vas pronađu kada traže u vašem gradu ili delatnosti. Spremno i za AI pretragu.',
          },
          {
            title: 'Privatnost i bezbednost',
            text:
              'Pravilno podešena saglasnost za kolačiće (Google Consent Mode v2), politika privatnosti i SSL na svakoj stranici.',
          },
          {
            title: 'Brz hosting',
            text:
              'Moderan React stack na globalnom CDN-u, da se sajt brzo učitava na svakom telefonu.',
          },
        ],
      },
      process: {
        heading: 'Kako ga pravimo za 3 nedelje',
        description: 'Jasan proces koji vam ne oduzima ceo raspored.',
        steps: [
          {
            step: '01',
            title: 'Strategija i struktura',
            duration: 'Nedelja 1',
            text:
              'Definišemo vašu ponudu, idealne klijente i šta sajt treba da radi, pa pišemo tekstove i planiramo svaku stranicu.',
          },
          {
            step: '02',
            title: 'Dizajn i izrada',
            duration: 'Nedelja 2',
            text:
              'Dizajniramo stranice, pravimo sajt, povezujemo zakazivanje, forme ili plaćanje i testiramo na raznim telefonima i ekranima.',
          },
          {
            step: '03',
            title: 'Testiranje i lansiranje',
            duration: 'Nedelja 3',
            text:
              'Podešavamo analitiku, proveravamo SEO i brzinu, sređujemo poslednje detalje i puštamo sajt na vaš domen.',
          },
        ],
      },
      pricingModels: {
        heading: 'Tri načina saradnje',
        description:
          'Izaberite model koji odgovara trenutnoj fazi vaše firme. Bez dugoročnih ugovora.',
        models: [
          {
            title: 'Fiksna cena',
            subtitle: 'Jasna cena i rok',
            description:
              'Najbolje kada tačno znate šta vam treba. Jasan obim posla, fiksna cena i dogovoren datum lansiranja. Sve što napravimo je vaše.',
            highlights: ['Fiksiran datum lansiranja', 'Potpuno vlasništvo nad kodom', 'Bez skrivenih troškova'],
          },
          {
            title: 'Revenue share',
            subtitle: 'Povezan sa uspehom',
            description:
              'Manji trošak na početku, a mi zarađujemo procenat od prodaje koju novi sistem donese. Mi dobijamo samo kad i vi dobijate.',
            highlights: ['Manje početno ulaganje', 'Zajednički cilj', 'Potpuna transparentnost'],
          },
          {
            title: 'Hibridni model (izrada + održavanje)',
            subtitle: 'Lansiranje + stalan rast',
            description:
              'Sajt plus stalni rad posle lansiranja: SEO sadržaj, ažuriranja, bekapi i unapređenja, da isti broj posetilaca donese više upita.',
            highlights: ['Redovno SEO održavanje', 'Tehnička podrška', 'Kontinuirana unapređenja'],
          },
        ],
      },
      faqs: [
        {
          question: 'Koliko mog vremena je potrebno?',
          answer:
            'Oko 2 do 3 sata ukupno: jedan poziv na početku i dva kratka pregleda verzija. Pisanje, dizajn i podešavanje radimo mi.',
        },
        {
          question: 'Da li sam ja vlasnik sajta i domena?',
          answer:
            'Da. Kod, domen, sadržaj i nalozi su vaši. Ako ikada prestanete da radite sa nama, sve nosite sa sobom.',
        },
        {
          question: 'Možete li da redizajnirate moj postojeći sajt?',
          answer:
            'Možemo. Zadržimo ono što radi, prebacimo vaš sadržaj i recenzije i podesimo preusmerenja, tako da ne izgubite pozicije na Google-u.',
        },
      ],
      cta: {
        heading: 'Spremni za sajt koji vam donosi klijente?',
        description:
          'Zakažite besplatan poziv od 30 minuta. Pogledaćemo vaše trenutno prisustvo na internetu i pokazati vam šta bismo promenili.',
        button: 'Zakažite besplatne konsultacije',
      },
    },
    'video-social-media': {
      slug: 'video-social-media',
      serviceType: 'Video i društvene mreže',
      badge: 'Video i društvene mreže',
      title: 'Video produkcija i vođenje društvenih mreža | VDigital',
      metaTitle: 'Video produkcija i vođenje društvenih mreža | VDigital',
      metaDescription:
        'Kratki video snimci za Instagram Reels, TikTok i YouTube Shorts. Planiramo, snimamo, montiramo i objavljujemo sadržaj koji gledaoce pretvara u klijente.',
      h1: 'Video sadržaj zbog kog ljudi prestaju da skroluju i počinju da kupuju',
      lead:
        'Planiramo, snimamo, montiramo i objavljujemo kratke video snimke koji pokazuju šta radite, grade poverenje i dovode ljude na vaš sajt, u inbox ili na vrata.',
      stats: [
        { value: '1 snimanje', label: 'Sadržaj za ceo mesec iz jednog dana snimanja' },
        { value: '12 do 16', label: 'Kratkih videa mesečno' },
        { value: 'Bez lica', label: 'Sadržaj može da radi i bez vas pred kamerom' },
      ],
      problem: {
        heading: 'Zašto većina firmi na društvenim mrežama ne ide nikuda',
        description:
          'Objavljivanje bez plana oduzima vreme i donosi lajkove u najboljem slučaju, ne klijente.',
        points: [
          {
            title: 'Nasumične objave, nema plana',
            text:
              'Objava tu i tamo, kopirani trendovi i stock grafike. Ljudi skroluju dalje jer ništa ne govori po čemu ste drugačiji.',
          },
          {
            title: 'Nema vremena za snimanje',
            text:
              'Vođenje firme ne ostavlja sate za svakodnevno snimanje. Bez sistema, mreže postaju obaveza koju stalno odlažete.',
          },
          {
            title: 'Pregledi koji nikad ne postanu klijenti',
            text:
              'Pregledi ne znače ništa ako gledaoci nemaju jasan način da vas kontaktiraju, zakažu ili kupe.',
          },
        ],
      },
      deliverables: {
        heading: 'Video produkcija od A do Ž',
        description:
          'Pred kamerom ste oko 2 sata mesečno, ili uopšte ne. Sve ostalo radimo mi.',
        items: [
          {
            title: 'Teme i scenariji',
            text:
              'Pronalazimo pitanja koja vaši klijenti postavljaju i razloge zbog kojih kupuju, pa ih pretvaramo u jednostavne scenarije i hooks.',
          },
          {
            title: 'Snimanje',
            text:
              'Snimanje kod vas ili na daljinu uz naše vođenje. Vodimo vas tako da zvučite prirodno, a ne naučeno.',
          },
          {
            title: 'Montaža i titlovi',
            text:
              'Brz ritam, čiste boje, animirane grafike i titlovi za sve koji gledaju bez zvuka.',
          },
          {
            title: 'Objavljivanje',
            text:
              'Video snimci prilagođeni i objavljeni za Instagram Reels, TikTok i YouTube Shorts, sa opisima, naslovnim slikama i hešteg-ovima.',
          },
          {
            title: 'Od gledaoca do klijenta',
            text:
              'Linkovi u profilu, automatski odgovori na poruke i linkovi za zakazivanje, da ljudi kojima se video svideo zaista mogu da vas dobiju.',
          },
        ],
      },
      process: {
        heading: 'Kako izgleda mesec sadržaja',
        description: 'Napravljeno da se uklopi u vaš posao, a ne obrnuto.',
        steps: [
          {
            step: '01',
            title: 'Plan',
            duration: 'Dani 1 do 3',
            text: 'Šaljemo vam 12 do 16 ideja za video, napravljenih oko vaših najboljih proizvoda ili usluga.',
          },
          {
            step: '02',
            title: 'Snimanje',
            duration: 'Jedan dan',
            text: 'Jedno fokusirano snimanje, kod vas ili na daljinu, a naš režiser vas vodi kroz svaki kadar.',
          },
          {
            step: '03',
            title: 'Montaža i objave',
            duration: 'Ostatak meseca',
            text: 'Vi odobrite montažu, mi objavljujemo po planu i javljamo šta je dalo rezultat.',
          },
        ],
      },
      pricingModels: {
        heading: 'Kako možemo da radimo zajedno na videu',
        description:
          'Fiksna cena, revenue share ili kombinacija, kao i za svaku VDigital uslugu.',
        models: [
          {
            title: 'Mesečni plan sadržaja',
            subtitle: 'Kompletna produkcija',
            description:
              '12 do 16 kratkih videa mesečno, od ideje do objave, uz mesečni pregled rezultata.',
            highlights: ['12 do 16 videa mesečno', 'Montaža i titlovi', 'Objavljivanje i analiza'],
          },
          {
            title: 'Sadržaj + plaćeni oglasi',
            subtitle: 'Pojačavanje najboljih videa',
            description:
              'Najbolje video snimke promovišemo pravim ljudima u vašem gradu, zemlji ili tržištu. Vidite koliko košta svaki upit.',
            highlights: ['Ciljano promovisanje', 'Praćenje cene upita', 'Testiranje sadržaja'],
          },
          {
            title: 'Jednokratna produkcija',
            subtitle: 'Video o brendu ili proizvodu',
            description:
              'Video o brendu, video snimci proizvoda, promo za događaj ili online kurs. Planirano, snimljeno i montirano od početka do kraja.',
            highlights: ['Namenska produkcija', 'Visok kvalitet', 'Svi sirovi snimci uključeni'],
          },
        ],
      },
      faqs: [
        {
          question: 'Šta ako mi nije prijatno pred kamerom?',
          answer:
            'Većini ljudi nije u početku. Snimamo kao razgovor: odgovarate na pitanja koja klijentima ionako odgovarate svaki dan. A mnogi video snimci mogu da se naprave i potpuno bez vašeg lica.',
        },
        {
          question: 'Gde snimamo?',
          answer:
            'U vašem prostoru, na lokaciji ili na daljinu uz jednostavna uputstva za svetlo i zvuk. Biramo ono što odgovara sadržaju.',
        },
        {
          question: 'Da li moram da objavljujem svaki dan?',
          answer:
            'Ne. Doslednost je važnija od količine. Za većinu firmi dovoljno je 3 do 4 dobra videa nedeljno.',
        },
      ],
      cta: {
        heading: 'Spremni da budete firma koju ljudi prvu vide?',
        description:
          'Zakažite poziv sa našim timom i pokazaćemo vam koje ideje za video najviše odgovaraju vašem poslu.',
        button: 'Zakažite poziv za video strategiju',
      },
    },
    'marketing-automation': {
      slug: 'marketing-automation',
      serviceType: 'Marketing i automatizacija',
      badge: 'Marketing i automatizacija',
      title: 'Plaćeni oglasi, CRM i automatizacija marketinga | VDigital',
      metaTitle: 'Plaćeni oglasi, CRM i automatizacija marketinga | VDigital',
      metaDescription:
        'Google i Meta oglasi, CRM pipeline i automatski odgovori i podsetnici, da svaki upit dobije odgovor i da znate odakle vam dolaze klijenti.',
      h1: 'Reklame koje dovode ljude. Automatizacija koja ih pretvara u kupce.',
      lead:
        'Vodimo vaše Google i Meta oglase i povezujemo ih sa CRM-om i automatskim follow-up porukama, tako da nijedan upit ne bude zaboravljen i da uvek znate koliko vas je koštao svaki klijent.',
      stats: [
        { value: '24/7', label: 'Svaki upit dobija trenutni odgovor' },
        { value: '1 dashboard', label: 'Svi potencijalni klijenti, pozivi i prodaje na jednom mestu' },
        { value: 'Uživo', label: 'Vidite svaki broj, uključujući potrošnju na oglase' },
      ],
      problem: {
        heading: 'Gde većina firmi gubi novac',
        description:
          'Reklame bez follow-up-a su kao da plaćate da vam ljudi dođu, a vrata ostavite zaključana.',
        points: [
          {
            title: 'Spori odgovori',
            text:
              'Neko pošalje upit uveče, a odgovor dobije sutra popodne. Do tada je već kupio kod nekog bržeg.',
          },
          {
            title: 'Oglasi za sve i nikoga',
            text:
              'Široko targetiranje donosi klikove od ljudi koji nikad nisu ni planirali da kupe. Budžet ode, a telefon ćuti.',
          },
          {
            title: 'No-show i zaboravljeni upiti',
            text:
              'Zakazani pozivi i termini se propuštaju, a zainteresovani ljudi nikad ne dobiju drugu poruku. Svaki od njih je izgubljen novac.',
          },
        ],
      },
      deliverables: {
        heading: 'Kompletan sistem za rast',
        description:
          'Oglasi, brzi odgovori i jasan pipeline, povezani u jedan sistem.',
        items: [
          {
            title: 'Google i Meta oglasi',
            text:
              'Kampanje koje se prikazuju ljudima koji već traže ono što prodajete, u vašem gradu, zemlji ili tržištu.',
          },
          {
            title: 'Automatski odgovori i podsetnici',
            text:
              'Trenutni odgovori na nove upite, plus potvrde i podsetnici mejlom, SMS-om ili preko WhatsApp-a koji smanjuju no-show.',
          },
          {
            title: 'CRM pipeline',
            text:
              'Svaki potencijalni klijent na jednom mestu, od prve poruke do zaključene prodaje, tako da ništa ne promakne i tačno vidite gde ljudi odustaju.',
          },
          {
            title: 'Zahtevi za recenzije',
            text:
              'Automatske, ljubazne poruke zadovoljnim klijentima sa molbom za Google recenziju, da vaša ocena stalno raste.',
          },
          {
            title: 'Analiza tržišta i konkurencije',
            text:
              'Gledamo šta radi konkurencija, gde su praznine i kako da pozicioniramo vašu ponudu pre nego što potrošimo novac na oglase.',
          },
        ],
      },
      process: {
        heading: 'Kako ga postavljamo za 3 nedelje',
        description: 'Uklopljeno u način na koji već radite, bez usporavanja vašeg tima.',
        steps: [
          {
            step: '01',
            title: 'Mapiramo put klijenta',
            duration: 'Nedelja 1',
            text:
              'Pronalazimo gde se upiti zaglavljuju, koji proizvodi ili usluge vam donose najviše novca i kako treba da izgleda follow-up.',
          },
          {
            step: '02',
            title: 'Pravimo sistem',
            duration: 'Nedelja 2',
            text:
              'Podešavamo CRM, povezujemo forme sa sajta i kanale, pišemo šablone poruka i testiramo svaki tok.',
          },
          {
            step: '03',
            title: 'Pokretanje i optimizacija',
            duration: 'Nedelja 3',
            text:
              'Pokrećemo kampanje, pratimo cenu po upitu i prodaji i stalno unapređujemo ono što radi.',
          },
        ],
      },
      pricingModels: {
        heading: 'Tri načina saradnje',
        description: 'Bez dugoročnih ugovora. Pun pristup svakom nalogu i broju.',
        models: [
          {
            title: 'Jednokratno podešavanje',
            subtitle: 'Postavljeno i predato',
            description:
              'Pravimo CRM, automatizacije i sistem za recenzije, obučimo vaš tim i predamo vam sve. Ostaje vaše.',
            highlights: ['Podešavanje CRM sistema', 'Automatizovani tokovi poruka', 'Obuka vašeg tima'],
          },
          {
            title: 'Mesečno vođenje',
            subtitle: 'Stalna optimizacija',
            description:
              'Stalno vođenje oglasa, testiranje i unapređenja, uz jasan mesečni izveštaj koliko vas je koštao svaki klijent.',
            highlights: ['Vođenje oglasnih naloga', 'Testiranje novih reklama', 'Mesečni izveštaji cene upita'],
          },
          {
            title: 'Revenue share',
            subtitle: 'Udeo u rezultatu',
            description:
              'Niža fiksna naknada plus procenat od prodaje koju sistem donese. Moguće nakon što zajedno pogledamo vašu ponudu i brojke.',
            highlights: ['Manja fiksna naknada', 'Povezano sa prodatim', 'Zajednički rast'],
          },
        ],
      },
      faqs: [
        {
          question: 'Koliko treba da trošim na oglase?',
          answer:
            'Zavisi od vašeg tržišta i ciljeva. Posle analize u prvoj nedelji preporučujemo početni budžet. Možete početi sa malim i ulagati više u ono što radi.',
        },
        {
          question: 'Da li će moj tim morati da uči komplikovan softver?',
          answer:
            'Ne. Podešavamo jednostavne alate, pokažemo vašem timu kako da ih koristi i napišemo kratka uputstva. Većina posla radi sama.',
        },
        {
          question: 'Kada počinju da stižu novi upiti?',
          answer:
            'Obično u prvim danima nakon što oglasi krenu u trećoj nedelji. Prve nedelje služe za testiranje, a rezultati rastu kako učimo šta radi za vaš posao.',
        },
      ],
      cta: {
        heading: 'Prestanite da gubite klijente koje ste već platili',
        description:
          'Zakažite poziv i pokazaćemo vam gde vam danas cure upiti i kako to da rešimo.',
        button: 'Zatražite besplatnu analizu',
      },
    },
    'cold-calling': {
      slug: 'cold-calling',
      serviceType: 'Cold calling i prodaja',
      badge: 'Cold calling i prodaja',
      title: 'Cold calling i appointment setting | VDigital',
      metaTitle: 'Cold calling i appointment setting | VDigital',
      metaDescription:
        'Cold calling (hladni pozivi) za vašu firmu: zovemo potencijalne klijente, proveravamo da li su pravi i zakazujemo sastanke u vašem kalendaru. Za B2B i B2C.',
      h1: 'Mi zovemo vaše buduće klijente, da vi ne morate',
      lead:
        'Naš prodajni stručnjak kontaktira prave ljude, proverava da li su zainteresovani i zakazuje sastanke direktno u vašem kalendaru. Vi pričate samo sa ljudima kojima zaista treba ono što nudite.',
      stats: [
        { value: '1-na-1', label: 'Svaka lista ručno istražena' },
        { value: 'Provereni', label: 'Budžet i potreba provereni pre sastanka' },
        { value: 'Nedeljno', label: 'Izveštaji o pozivima, sastancima i prigovorima' },
      ],
      problem: {
        heading: 'Zašto masovni mejlovi i spam poruke više ne rade',
        description:
          'Generičke poruke završe u spamu i više štete vašem imenu nego što pomažu.',
        points: [
          {
            title: 'Ljudi odmah prepoznaju šablon',
            text:
              'Copy-paste poruke se brišu za par sekundi. Pravi razgovor počinje od pravog istraživanja.',
          },
          {
            title: 'Nemate vremena da zovete',
            text:
              'Dobri ste u svom poslu, ne u satima telefoniranja nepoznatim ljudima. Traženje klijenata se stalno odlaže za "sledeću nedelju".',
          },
          {
            title: 'Sastanci sa pogrešnim ljudima',
            text:
              'Sat vremena razgovora sa nekim ko nema ni budžet ni potrebu je sat oduzet klijentima koji plaćaju.',
          },
        ],
      },
      deliverables: {
        heading: 'Vaš sopstveni prodajni tim',
        description:
          'Obučen prodavac koji profesionalno predstavlja vašu firmu i puni vam kalendar pravim sastancima.',
        items: [
          {
            title: 'Ciljane liste kontakata',
            text:
              'Pravimo i proveravamo liste firmi ili ljudi koji odgovaraju vašem idealnom klijentu: delatnost, veličina, lokacija i pozicija.',
          },
          {
            title: 'Skripte koje zvuče ljudski',
            text:
              'Skripte za razgovor napravljene oko problema vaših klijenata, bez napadnih prodajnih trikova.',
          },
          {
            title: 'Pozivi i provera',
            text:
              'Mi zovemo, proveravamo potrebu, budžet i vreme, i zakazujemo sastanak u vašem kalendaru.',
          },
          {
            title: 'Follow-up',
            text:
              'Ko kaže "ne sada" dobija podsetnik u pravom trenutku, telefonom, mejlom ili porukom.',
          },
          {
            title: 'Nedeljni izveštaji',
            text:
              'Broj poziva, zakazanih sastanaka i prigovori koje najčešće čujemo, da možete da izoštrite ponudu i cene.',
          },
        ],
      },
      process: {
        heading: 'Od prvog poziva do punog kalendara',
        description: 'Jasan proces koji vam drži kalendar punim proverenih sastanaka.',
        steps: [
          {
            step: '01',
            title: 'Ponuda i idealni klijent',
            duration: 'Nedelja 1',
            text: 'Prolazimo kroz vašu ponudu, tačno definišemo koga zovemo i pišemo skripte.',
          },
          {
            step: '02',
            title: 'Liste i probni pozivi',
            duration: 'Nedelja 2',
            text: 'Pravimo prvu listu kontakata, krećemo sa pozivima i prilagođavamo pristup prema pravim odgovorima.',
          },
          {
            step: '03',
            title: 'Puni cold calling',
            duration: 'Od nedelje 3',
            text: 'Povećavamo broj poziva dnevno, tako da ulazite na sastanke sa ljudima koji već znaju zašto ih zovete.',
          },
        ],
      },
      pricingModels: {
        heading: 'Tri načina saradnje',
        description: 'Prilagođeno ceni vaše ponude i brzini kojom želite da rastete.',
        models: [
          {
            title: 'Osnovna naknada + po sastanku',
            subtitle: 'Balansiran rizik i nagrada',
            description:
              'Mesečna naknada za pravljenje lista i sate poziva, plus bonus za svaki provereni sastanak koji se zaista održi. Naš najizbalansiraniji model.',
            highlights: ['Fokusirani sati poziva', 'Bonus samo za održane sastanke', 'Ručno istražene baze'],
          },
          {
            title: 'Revenue share',
            subtitle: 'Procenat od zaključenog',
            description:
              'Procenat od poslova koje pomognemo da zaključite. Za ponude koje već imaju dokazanu prodaju.',
            highlights: ['Bez početnog rizika', 'Povezano sa prihodom', 'Za dokazane ponude'],
          },
          {
            title: 'Prodajni priručnik i obuka',
            subtitle: 'Za interni tim',
            description:
              'Za firme koje prave svoj prodajni tim. Predajemo naše skripte, CRM podešavanje i obuku, da vaši ljudi mogu sami da rade.',
            highlights: ['Kompletne skripte', 'Podešen CRM tok', 'Obuka vaših prodavaca'],
          },
        ],
      },
      faqs: [
        {
          question: 'Da li će cold calling naštetiti mom ugledu?',
          answer:
            'Ne. Naši pozivi su kratki, ljubazni i korisni. Poštujemo tuđe vreme i predstavljamo vašu firmu onako kako biste vi.',
        },
        {
          question: 'Koliko sastanaka mogu da očekujem?',
          answer:
            'Zavisi od tržišta, ponude i cene. Posle prve dve nedelje probnih poziva možemo da vam damo realnu mesečnu procenu.',
        },
        {
          question: 'Šta ako neko otkaže ili se ne pojavi?',
          answer:
            'Javljamo se ponovo i pokušavamo da zakažemo novi termin. Kod modela po sastanku, bonus plaćate samo za sastanke koji se zaista održe.',
        },
        {
          question: 'Da li zovete i na drugim jezicima?',
          answer: 'Da. Zovemo na srpskom, engleskom i ruskom.',
        },
      ],
      cta: {
        heading: 'Spremni za kalendar pun pravih prodajnih sastanaka?',
        description:
          'Zakažite strateški poziv i iskreno ćemo vam reći da li je vaša ponuda spremna za cold calling.',
        button: 'Zakažite strateški poziv',
      },
    },
  },
  ru: {
    'web-development': {
      slug: 'web-development',
      serviceType: 'Веб и разработка',
      badge: 'Веб и разработка',
      title: 'Создание сайтов и веб-приложений | VDigital',
      metaTitle: 'Создание сайтов и веб-приложений | VDigital',
      metaDescription:
        'Быстрые сайты под ключ, интернет-магазины и веб-приложения, которые превращают посетителей в заявки, записи и продажи. Mobile-first, SEO с первого дня, запуск за 3 недели.',
      h1: 'Сайты, которые приносят клиентов, а не только комплименты',
      lead:
        'Мы проектируем и создаём быстрые сайты, интернет-магазины и веб-приложения, которые вызывают доверие и превращают посетителей в заявки, записи и продажи.',
      stats: [
        { value: '3 недели', label: 'От первого звонка до запуска сайта' },
        { value: '100%', label: 'Код, домен и контент принадлежат вам' },
        { value: 'Mobile-first', label: 'Сначала для телефона, ведь там большинство ваших посетителей' },
      ],
      problem: {
        heading: 'Почему большинство сайтов не приводят клиентов',
        description:
          'Многие сайты собраны из тяжёлых шаблонов и брошены после запуска. Выглядят нормально, но никто не звонит.',
        points: [
          {
            title: 'Нет причин вам доверять',
            text:
              'Посетитель решает за секунды. Устаревший или перегруженный сайт заставляет уйти раньше, чем он увидит ваше предложение.',
          },
          {
            title: 'Слишком сложно сделать следующий шаг',
            text:
              'Если нужно искать номер телефона или заполнять длинную форму, человек возвращается в поиск и выбирает конкурента.',
          },
          {
            title: 'Медленно на телефоне',
            text:
              'Большинство людей находят вас с мобильного. Медленный сайт теряет их ещё до загрузки страницы.',
          },
        ],
      },
      deliverables: {
        heading: 'Что входит в ваш сайт',
        description:
          'Полноценный сайт, построенный вокруг того, как ваш бизнес на самом деле получает клиентов.',
        items: [
          {
            title: 'Индивидуальный дизайн',
            text: 'Структура, цвета и типографика под ваш бренд. Без готовых шаблонов.',
          },
          {
            title: 'Запись, заказы и оплата',
            text:
              'Онлайн-запись с синхронизацией календаря, формы заявок, интернет-магазин или оплата картой, в зависимости от того, что вы продаёте. Автоматические подтверждения по email или SMS.',
          },
          {
            title: 'Тексты, которые продают',
            text:
              'Пишем понятные, простые тексты о том, что вы делаете и почему выбрать стоит именно вас.',
          },
          {
            title: 'SEO с первого дня',
            text:
              'Структурированные данные, настройка Google Business Profile и Яндекс Бизнеса, локальное SEO, чтобы вас находили в вашем городе или нише. Готово и для AI-поиска.',
          },
          {
            title: 'Конфиденциальность и безопасность',
            text:
              'Правильное согласие на cookies (Google Consent Mode v2), политика конфиденциальности и SSL на каждой странице.',
          },
          {
            title: 'Быстрый хостинг',
            text:
              'Современный стек на React и глобальный CDN, чтобы сайт быстро открывался на любом телефоне.',
          },
        ],
      },
      process: {
        heading: 'Как мы делаем сайт за 3 недели',
        description: 'Понятный процесс, который не съедает ваше расписание.',
        steps: [
          {
            step: '01',
            title: 'Стратегия и структура',
            duration: 'Неделя 1',
            text:
              'Определяем ваше предложение, идеальных клиентов и задачи сайта, затем пишем тексты и планируем каждую страницу.',
          },
          {
            step: '02',
            title: 'Дизайн и разработка',
            duration: 'Неделя 2',
            text:
              'Рисуем страницы, собираем сайт, подключаем запись, формы или оплату и тестируем на разных телефонах и экранах.',
          },
          {
            step: '03',
            title: 'Тестирование и запуск',
            duration: 'Неделя 3',
            text:
              'Настраиваем аналитику, проверяем SEO и скорость, доводим детали и запускаем сайт на вашем домене.',
          },
        ],
      },
      pricingModels: {
        heading: 'Три формата работы',
        description:
          'Выберите модель, которая подходит вашему бизнесу сейчас. Без долгосрочных контрактов.',
        models: [
          {
            title: 'Фиксированная цена',
            subtitle: 'Понятные сроки и бюджет',
            description:
              'Лучше всего, когда вы точно знаете, что нужно. Понятный объём, фиксированная цена и согласованная дата запуска. Всё, что мы делаем, принадлежит вам.',
            highlights: ['Фиксированный срок', 'Полное владение кодом', 'Без скрытых платежей'],
          },
          {
            title: 'Revenue share',
            subtitle: 'Процент от продаж',
            description:
              'Меньше затрат на старте, а мы получаем процент от продаж, которые принесёт новая система. Мы выигрываем, только когда выигрываете вы.',
            highlights: ['Меньше затрат на старте', 'Общий результат', 'Полная прозрачность'],
          },
          {
            title: 'Гибрид (разработка + поддержка)',
            subtitle: 'Запуск + развитие',
            description:
              'Сайт плюс работа после запуска: SEO-контент, обновления, бэкапы и улучшения, чтобы тот же трафик приносил больше заявок.',
            highlights: ['Регулярное SEO-развитие', 'Техническая поддержка', 'Оптимизация конверсий'],
          },
        ],
      },
      faqs: [
        {
          question: 'Сколько моего времени это займёт?',
          answer:
            'Около 2–3 часов в сумме: один звонок в начале и два коротких просмотра черновиков. Тексты, дизайн и настройку берём на себя.',
        },
        {
          question: 'Сайт и домен будут моими?',
          answer:
            'Да. Код, домен, контент и аккаунты принадлежат вам. Если вы когда-нибудь перестанете с нами работать, всё остаётся у вас.',
        },
        {
          question: 'Можете переделать мой текущий сайт?',
          answer:
            'Да. Сохраняем то, что работает, переносим контент и отзывы и настраиваем редиректы, чтобы вы не потеряли позиции в поиске.',
        },
      ],
      cta: {
        heading: 'Готовы к сайту, который приносит клиентов?',
        description:
          'Запишитесь на бесплатный 30-минутный звонок. Посмотрим на ваше текущее присутствие в интернете и покажем, что бы мы изменили.',
        button: 'Записаться на бесплатную консультацию',
      },
    },
    'video-social-media': {
      slug: 'video-social-media',
      serviceType: 'Видео и соцсети',
      badge: 'Видео и соцсети',
      title: 'Видеопродакшн и ведение соцсетей | VDigital',
      metaTitle: 'Видеопродакшн и ведение соцсетей | VDigital',
      metaDescription:
        'Короткие видео для Instagram Reels, TikTok и YouTube Shorts. Планируем, снимаем, монтируем и публикуем контент, который превращает зрителей в клиентов.',
      h1: 'Видео, из-за которых люди перестают листать и начинают покупать',
      lead:
        'Планируем, снимаем, монтируем и публикуем короткие видео, которые показывают, что вы делаете, вызывают доверие и приводят людей на сайт, в директ или к вам в дверь.',
      stats: [
        { value: '1 съёмка', label: 'Контент на весь месяц за один съёмочный день' },
        { value: '12–16', label: 'Коротких видео в месяц' },
        { value: 'Без лица', label: 'Контент может работать и без вас в кадре' },
      ],
      problem: {
        heading: 'Почему соцсети большинства компаний никуда не ведут',
        description:
          'Публикации без плана отнимают время и в лучшем случае приносят лайки, а не клиентов.',
        points: [
          {
            title: 'Случайные посты, никакого плана',
            text:
              'Пост тут, пост там, скопированные тренды и стоковая графика. Люди листают дальше, потому что ничто не говорит, чем вы отличаетесь.',
          },
          {
            title: 'Нет времени снимать',
            text:
              'Управление бизнесом не оставляет часов на ежедневные съёмки. Без системы соцсети превращаются в обязанность, которую вы постоянно откладываете.',
          },
          {
            title: 'Просмотры, которые не становятся клиентами',
            text:
              'Просмотры ничего не значат, если у зрителя нет понятного способа связаться с вами, записаться или купить.',
          },
        ],
      },
      deliverables: {
        heading: 'Видеопродакшн под ключ',
        description:
          'Вы проводите перед камерой около 2 часов в месяц или не появляетесь вовсе. Всё остальное делаем мы.',
        items: [
          {
            title: 'Темы и сценарии',
            text:
              'Находим вопросы, которые задают ваши клиенты, и причины, по которым они покупают, и превращаем их в простые сценарии и hooks.',
          },
          {
            title: 'Съёмка',
            text:
              'У вас на месте или удалённо с нашим сопровождением. Помогаем держаться естественно, а не заученно.',
          },
          {
            title: 'Монтаж и субтитры',
            text:
              'Динамичный ритм, чистый цвет, моушн-графика и субтитры для всех, кто смотрит без звука.',
          },
          {
            title: 'Публикация',
            text:
              'Видео адаптированы и опубликованы в Instagram Reels, TikTok и YouTube Shorts, с подписями, обложками и хэштегами.',
          },
          {
            title: 'От зрителя к клиенту',
            text:
              'Ссылки в профиле, автоответы в сообщениях и ссылки на запись, чтобы тот, кому понравилось видео, действительно мог до вас дойти.',
          },
        ],
      },
      process: {
        heading: 'Как устроен месяц контента',
        description: 'Встраивается в ваш бизнес, а не наоборот.',
        steps: [
          {
            step: '01',
            title: 'План',
            duration: 'Дни 1–3',
            text: 'Присылаем 12–16 идей для видео вокруг ваших лучших товаров или услуг.',
          },
          {
            step: '02',
            title: 'Съёмка',
            duration: 'Один день',
            text: 'Одна сфокусированная съёмка, на месте или удалённо, наш режиссёр ведёт вас через каждый дубль.',
          },
          {
            step: '03',
            title: 'Монтаж и публикации',
            duration: 'Остаток месяца',
            text: 'Вы утверждаете монтаж, мы публикуем по графику и показываем, что сработало.',
          },
        ],
      },
      pricingModels: {
        heading: 'Как мы можем работать над видео',
        description:
          'Фиксированная цена, revenue share или комбинация, как и с любой услугой VDigital.',
        models: [
          {
            title: 'Ежемесячный контент-план',
            subtitle: 'Полное ведение',
            description:
              '12–16 коротких видео в месяц, от идеи до публикации, с ежемесячным разбором результатов.',
            highlights: ['12–16 видео в месяц', 'Полный монтаж и титры', 'Публикации и аналитика'],
          },
          {
            title: 'Контент + платная реклама',
            subtitle: 'Трафик на лучшие видео',
            description:
              'Продвигаем ваши лучшие видео нужной аудитории в вашем городе, стране или на вашем рынке. Вы видите стоимость каждой заявки.',
            highlights: ['Таргетированная реклама', 'Отслеживание стоимости заявки', 'Тесты креативов'],
          },
          {
            title: 'Разовый продакшн',
            subtitle: 'Имиджевый проект или курс',
            description:
              'Имиджевое видео, видео товаров, промо мероприятия или онлайн-курс. Спланировано, снято и смонтировано от начала до конца.',
            highlights: ['Проект под ключ', 'Кинематографичное качество', 'Все исходники включены'],
          },
        ],
      },
      faqs: [
        {
          question: 'А если мне некомфортно перед камерой?',
          answer:
            'Поначалу почти всем так. Мы снимаем как разговор: вы отвечаете на вопросы, на которые и так каждый день отвечаете клиентам. А многие видео можно сделать вообще без вашего лица.',
        },
        {
          question: 'Где проходит съёмка?',
          answer:
            'У вас, на локации или удалённо с простыми инструкциями по свету и звуку. Выбираем то, что подходит контенту.',
        },
        {
          question: 'Нужно ли публиковать каждый день?',
          answer:
            'Нет. Регулярность важнее количества. Большинству компаний хватает 3–4 хороших видео в неделю.',
        },
      ],
      cta: {
        heading: 'Готовы стать компанией, которую видят первой?',
        description:
          'Запишитесь на звонок с нашей командой, и мы покажем, какие идеи для видео лучше всего подойдут вашему бизнесу.',
        button: 'Записаться на звонок по видеостратегии',
      },
    },
    'marketing-automation': {
      slug: 'marketing-automation',
      serviceType: 'Маркетинг и автоматизация',
      badge: 'Маркетинг и автоматизация',
      title: 'Платная реклама, CRM и автоматизация маркетинга | VDigital',
      metaTitle: 'Платная реклама, CRM и автоматизация маркетинга | VDigital',
      metaDescription:
        'Реклама в Google, Meta и Яндексе, CRM pipeline, автоответы и напоминания, чтобы каждая заявка получала ответ, а вы знали, откуда приходят клиенты.',
      h1: 'Реклама, которая приводит людей. Автоматизация, которая превращает их в покупателей.',
      lead:
        'Ведём вашу рекламу в Google и Meta и связываем её с CRM и автоматическими follow-up сообщениями, чтобы ни одна заявка не потерялась и вы всегда знали, во сколько обошёлся каждый клиент.',
      stats: [
        { value: '24/7', label: 'Каждая заявка получает мгновенный ответ' },
        { value: '1 dashboard', label: 'Все заявки, звонки и продажи в одном месте' },
        { value: 'В реальном времени', label: 'Вы видите каждую цифру, включая расход на рекламу' },
      ],
      problem: {
        heading: 'Где большинство компаний теряет деньги',
        description:
          'Реклама без follow-up похожа на то, как если бы вы платили за посетителей и держали дверь закрытой.',
        points: [
          {
            title: 'Медленные ответы',
            text:
              'Человек оставляет заявку вечером, а ответ получает на следующий день после обеда. К этому времени он уже купил у того, кто ответил быстрее.',
          },
          {
            title: 'Реклама для всех и ни для кого',
            text:
              'Широкий таргетинг приносит клики от людей, которые и не собирались покупать. Бюджет потрачен, телефон молчит.',
          },
          {
            title: 'No-show и забытые заявки',
            text:
              'Назначенные звонки и визиты срываются, а заинтересованные люди так и не получают второго сообщения. Каждый из них означает потерянные деньги.',
          },
        ],
      },
      deliverables: {
        heading: 'Полная система роста',
        description:
          'Реклама, быстрые ответы и понятный pipeline, связанные в одну систему.',
        items: [
          {
            title: 'Реклама в Google, Meta и Яндексе',
            text:
              'Кампании, которые видят люди, уже ищущие то, что вы продаёте, в вашем городе, стране или на вашем рынке.',
          },
          {
            title: 'Автоответы и напоминания',
            text:
              'Мгновенные ответы на новые заявки, а также подтверждения и напоминания по email, SMS, WhatsApp или Telegram, которые снижают no-show.',
          },
          {
            title: 'CRM pipeline',
            text:
              'Каждая заявка в одном месте, от первого сообщения до закрытой сделки, чтобы ничего не терялось и было видно, где люди отваливаются.',
          },
          {
            title: 'Запросы отзывов',
            text:
              'Автоматические вежливые сообщения довольным клиентам с просьбой оставить отзыв в Google или на Яндекс Картах, чтобы рейтинг постоянно рос.',
          },
          {
            title: 'Анализ рынка и конкурентов',
            text:
              'Смотрим, что делают конкуренты, где пробелы и как позиционировать ваше предложение, прежде чем тратить деньги на рекламу.',
          },
        ],
      },
      process: {
        heading: 'Как мы настраиваем это за 3 недели',
        description: 'Встраиваем в то, как вы уже работаете, не замедляя команду.',
        steps: [
          {
            step: '01',
            title: 'Путь клиента',
            duration: 'Неделя 1',
            text:
              'Находим, где застревают заявки, какие товары или услуги приносят больше всего денег и как должен выглядеть follow-up.',
          },
          {
            step: '02',
            title: 'Строим систему',
            duration: 'Неделя 2',
            text:
              'Настраиваем CRM, подключаем формы с сайта и каналы, пишем шаблоны сообщений и тестируем каждый сценарий.',
          },
          {
            step: '03',
            title: 'Запуск и оптимизация',
            duration: 'Неделя 3',
            text:
              'Запускаем кампании, отслеживаем стоимость заявки и продажи и постоянно улучшаем то, что работает.',
          },
        ],
      },
      pricingModels: {
        heading: 'Три формата работы',
        description: 'Без долгосрочных контрактов. Полный доступ ко всем аккаунтам и цифрам.',
        models: [
          {
            title: 'Разовая настройка',
            subtitle: 'Настройка под ключ',
            description:
              'Строим CRM, автоматизации и систему отзывов, обучаем вашу команду и передаём всё вам. Остаётся у вас.',
            highlights: ['Настройка CRM-системы', 'Сценарии автоматизации', 'Обучение команды'],
          },
          {
            title: 'Ежемесячное ведение',
            subtitle: 'Постоянная оптимизация',
            description:
              'Постоянное ведение рекламы, тесты и улучшения, плюс понятный ежемесячный отчёт о том, во сколько обошёлся каждый клиент.',
            highlights: ['Управление рекламой', 'Тестирование креативов', 'Отчёты о стоимости заявок'],
          },
          {
            title: 'Revenue share',
            subtitle: 'Процент от продаж',
            description:
              'Меньшая фиксированная оплата плюс процент от продаж, которые приносит система. Возможно после того, как мы вместе посмотрим на ваше предложение и цифры.',
            highlights: ['Меньше фиксированных затрат', 'Привязка к продажам', 'Общий результат'],
          },
        ],
      },
      faqs: [
        {
          question: 'Сколько нужно тратить на рекламу?',
          answer:
            'Зависит от рынка и целей. После анализа на первой неделе мы порекомендуем стартовый бюджет. Можно начать с малого и вкладывать больше в то, что работает.',
        },
        {
          question: 'Придётся ли моей команде осваивать сложные программы?',
          answer:
            'Нет. Мы настраиваем простые инструменты, показываем команде, как ими пользоваться, и пишем короткие инструкции. Большая часть работает сама.',
        },
        {
          question: 'Когда начнут приходить новые заявки?',
          answer:
            'Обычно в первые дни после запуска рекламы на третьей неделе. Первые недели уходят на тесты, а результаты растут по мере того, как мы понимаем, что работает именно для вас.',
        },
      ],
      cta: {
        heading: 'Перестаньте терять клиентов, за которых уже заплатили',
        description:
          'Запишитесь на звонок, и мы покажем, где сегодня утекают заявки и как это исправить.',
        button: 'Запросить бесплатный аудит',
      },
    },
    'cold-calling': {
      slug: 'cold-calling',
      serviceType: 'Cold calling и продажи',
      badge: 'Cold calling и продажи',
      title: 'Cold calling и appointment setting | VDigital',
      metaTitle: 'Cold calling и appointment setting | VDigital',
      metaDescription:
        'Cold calling (холодные звонки) для вашего бизнеса: звоним потенциальным клиентам, квалифицируем их и назначаем встречи в вашем календаре. Для B2B и B2C.',
      h1: 'Мы звоним вашим будущим клиентам, чтобы не пришлось вам',
      lead:
        'Наш специалист по продажам связывается с нужными людьми, проверяет их интерес и назначает встречи прямо в вашем календаре. Вы говорите только с теми, кому действительно нужно ваше предложение.',
      stats: [
        { value: '1-на-1', label: 'Каждый список собран вручную' },
        { value: 'Квалифицированы', label: 'Бюджет и потребность проверены до встречи' },
        { value: 'Еженедельно', label: 'Отчёты о звонках, встречах и возражениях' },
      ],
      problem: {
        heading: 'Почему массовые рассылки и спам больше не работают',
        description:
          'Шаблонные сообщения попадают в спам и вредят вашему имени больше, чем помогают.',
        points: [
          {
            title: 'Шаблон видно сразу',
            text:
              'Сообщения под копирку удаляют за секунды. Настоящий разговор начинается с настоящего исследования.',
          },
          {
            title: 'У вас нет времени звонить',
            text:
              'Вы сильны в своём деле, а не в многочасовых звонках незнакомым людям. Поиск клиентов вечно откладывается «на следующую неделю».',
          },
          {
            title: 'Встречи не с теми людьми',
            text:
              'Час разговора с тем, у кого нет ни бюджета, ни потребности, это час, отнятый у платящих клиентов.',
          },
        ],
      },
      deliverables: {
        heading: 'Ваш собственный отдел продаж',
        description:
          'Обученный специалист, который профессионально представляет ваш бизнес и заполняет календарь реальными встречами.',
        items: [
          {
            title: 'Целевые базы контактов',
            text:
              'Собираем и проверяем списки компаний или людей, которые соответствуют вашему идеальному клиенту: сфера, размер, локация и должность.',
          },
          {
            title: 'Скрипты, которые звучат по-человечески',
            text:
              'Разговорные скрипты, построенные вокруг проблем ваших клиентов, без навязчивых приёмов продаж.',
          },
          {
            title: 'Звонки и квалификация',
            text:
              'Мы звоним, проверяем потребность, бюджет и сроки и назначаем встречу в вашем календаре.',
          },
          {
            title: 'Follow-up',
            text:
              'Те, кто говорит «не сейчас», получают напоминание в нужный момент, по телефону, email или в мессенджере.',
          },
          {
            title: 'Еженедельные отчёты',
            text:
              'Количество звонков, назначенных встреч и самые частые возражения, чтобы вы могли отточить предложение и цены.',
          },
        ],
      },
      process: {
        heading: 'От первого звонка до заполненного календаря',
        description:
          'Понятный процесс, который держит ваш календарь заполненным квалифицированными встречами.',
        steps: [
          {
            step: '01',
            title: 'Предложение и идеальный клиент',
            duration: 'Неделя 1',
            text:
              'Разбираем ваше предложение, точно определяем, кому звонить, и пишем скрипты.',
          },
          {
            step: '02',
            title: 'Базы и тестовые звонки',
            duration: 'Неделя 2',
            text:
              'Собираем первую базу, начинаем звонить и корректируем подачу по реальным ответам.',
          },
          {
            step: '03',
            title: 'Полный cold calling',
            duration: 'С недели 3',
            text:
              'Увеличиваем число звонков в день, чтобы вы приходили на встречи с людьми, которые уже знают, зачем им звонили.',
          },
        ],
      },
      pricingModels: {
        heading: 'Три формата работы',
        description: 'Под цену вашего предложения и темп роста, который вы хотите.',
        models: [
          {
            title: 'Базовая оплата + за встречу',
            subtitle: 'Сбалансированная модель',
            description:
              'Ежемесячная оплата за сбор баз и часы звонков плюс бонус за каждую квалифицированную встречу, которая действительно состоялась. Наша самая сбалансированная модель.',
            highlights: ['Часы работы специалиста', 'Бонус только за состоявшиеся встречи', 'Проверенные базы'],
          },
          {
            title: 'Revenue share',
            subtitle: 'Процент от закрытых сделок',
            description:
              'Процент от сделок, которые мы помогли закрыть. Для предложений с подтверждённой историей продаж.',
            highlights: ['Без стартового риска', 'Оплата от выручки', 'Для проверенных продуктов'],
          },
          {
            title: 'Скрипты и обучение отдела продаж',
            subtitle: 'Внедрение в вашу компанию',
            description:
              'Для компаний, которые строят свой отдел продаж. Передаём наши скрипты, настройку CRM и обучение, чтобы ваши люди работали сами.',
            highlights: ['Готовые разговорные скрипты', 'Настройка CRM и воронок', 'Обучение сотрудников'],
          },
        ],
      },
      faqs: [
        {
          question: 'Не навредит ли cold calling моей репутации?',
          answer:
            'Нет. Наши звонки короткие, вежливые и полезные. Мы уважаем чужое время и представляем ваш бизнес так, как это сделали бы вы.',
        },
        {
          question: 'Сколько встреч можно ожидать?',
          answer:
            'Зависит от рынка, предложения и цены. После первых двух недель тестовых звонков дадим реалистичный прогноз на месяц.',
        },
        {
          question: 'Что если человек отменит встречу или не придёт?',
          answer:
            'Мы связываемся снова и пытаемся перенести встречу. В модели с оплатой за встречу бонус оплачивается только за встречи, которые действительно состоялись.',
        },
        {
          question: 'Вы звоните на других языках?',
          answer: 'Да. Звоним на сербском, английском и русском.',
        },
      ],
      cta: {
        heading: 'Готовы к календарю, полному реальных встреч по продажам?',
        description:
          'Запишитесь на стратегический звонок, и мы честно скажем, готово ли ваше предложение к cold calling.',
        button: 'Записаться на стратегический звонок',
      },
    },
  },
};
