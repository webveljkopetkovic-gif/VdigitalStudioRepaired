import { type Translations } from './en';

export const sr: Translations = {
  lang: 'sr',
  navbar: {
    links: {
      services: 'Usluge',
      process: 'Proces',
      projects: 'Projekti',
      team: 'Tim',
      pricing: 'Modeli saradnje',
      faq: 'FAQ',
      contact: 'Kontakt',
    },
    cta: 'Zakažite poziv',
  },
  hero: {
    line1: 'Sajtovi, video i marketing',
    line2: 'za doktore i koučeve',
    line3: 'koji vam donose nove klijente',
    line4: 'dok ste vi fokusirani na svoj posao',
    leftText:
      'Mi smo tim od troje ljudi: full-stack developer, video kreator i stručnjak za prodaju. Zajedno gradimo ceo sistem koji nepoznate ljude pretvara u vaše klijente.',
    rightText:
      'Od prvog poziva do potpuno funkcionalnog sistema za 3 nedelje. Zadržavate pun pristup svakom nalogu, broju i rezultatu.',
    primaryCta: 'Zakažite besplatan poziv',
    secondaryCta: 'Pogledajte kako radimo',
  },
  trustBar: {
    items: [
      '30+ isporučenih projekata',
      'Gradimo za veb od 2020.',
      'Srpski, engleski i ruski',
      'Ceo sistem za 3 nedelje',
    ],
  },
  statement: {
    text: 'Vi lečite, trenirate i menjate živote. Mi pravimo sajt, kreiramo sadržaj i obavljamo pozive koji dovode nove klijente na vaša vrata.',
    words: {
      row1: ['Vi', 'lečite,'],
      row1AfterHeal: ['trenirate', 'i', 'menjate', 'živote.'],
      row2: ['Mi', 'pravimo', 'sajt,'],
      row2AfterWebsite: ['kreiramo', 'sadržaj'],
      row3: ['i', 'obavljamo', 'pozive'],
      row3AfterCalls: ['koji', 'dovode', 'nove', 'klijente', 'na', 'vaša', 'vrata.'],
    },
    button: 'Hajde da pričamo',
  },
  painPoints: {
    label: 'Zvuči poznato?',
    heading: 'Izuzetni u svom poslu. Nevidljivi na internetu.',
    headingMain: 'Izuzetni u svom poslu.',
    headingItalic: 'Nevidljivi na internetu.',
    cards: [
      {
        id: 'empty-calendar',
        title: 'Odličan rad, prazan kalendar',
        text: 'Izvrsni ste u onome što radite, ali novi klijenti vas ne pronalaze onlajn.',
      },
      {
        id: 'no-time',
        title: 'Nemate vremena za marketing',
        text: 'Između pacijenata i sesija, ne ostaje vam energije za objave, reklame i poruke.',
      },
      {
        id: 'online-image',
        title: 'Vaš onlajn imidž ne prati vašu stručnost',
        text: 'Zastareo sajt ili nasumične objave čine da delujete manje profesionalno nego što zaista jeste.',
      },
      {
        id: 'afraid-payoff',
        title: 'Strah da se neće isplatiti',
        text: 'Već ste slušali velika obećanja i ne želite da plaćate marketing koji ne donosi rezultate.',
      },
    ],
    closing: 'Upravo taj deo mi preuzimamo na sebe.',
  },
  services: {
    label: 'Usluge',
    heading: 'Jedan tim. Ceo sistem.',
    hint: 'Skrolujte da vidite sve usluge',
    cardButton: 'Zakažite poziv',
    cards: [
      {
        id: 'web-development',
        number: '01',
        titleWhite: 'Veb i',
        titleGrey: 'Programiranje',
        tags: ['Veb-sajtovi', 'Landing stranice', 'Veb aplikacije', 'Onlajn zakazivanje', 'SEO'],
        text: 'Brzi i sigurni sajtovi napravljeni da posetioce pretvore u zakazane termine, optimizovani za Google i AI pretragu od prvog dana.',
      },
      {
        id: 'video-social',
        number: '02',
        titleWhite: 'Video i',
        titleGrey: 'Društvene mreže',
        tags: ['Snimanje', 'Video montaža', 'Instagram Reels', 'TikTok', 'Planiranje sadržaja'],
        text: 'Snimamo, montiramo i objavljujemo sadržaj koji pokazuje vašu stručnost i gradi poverenje. Niste opušteni pred kamerom? Vodimo vas kroz svaki korak.',
      },
      {
        id: 'marketing-automation',
        number: '03',
        titleWhite: 'Marketing i',
        titleGrey: 'Automatizacija',
        tags: ['Plaćeni oglasi', 'Analiza tržišta i konkurencije', 'CRM', 'Automatski odgovori', 'Analitika'],
        text: 'Reklame dovode ljude, a automatizacija osigurava da nijedan upit ne ostane bez odgovora. Svaki broj vidite u realnom vremenu.',
      },
      {
        id: 'cold-calling-sales',
        number: '04',
        titleWhite: 'Hladni pozivi i',
        titleGrey: 'Prodaja',
        tags: ['Hladni pozivi', 'Generisanje lidova', 'Follow-up pozivi', 'Zakazivanje termina'],
        text: 'Naš stručnjak za prodaju kontaktira potencijalne klijente u vaše ime i pretvara interesovanje u zakazane pozive i preglede.',
      },
    ],
  },
  process: {
    label: 'Proces',
    headingBefore: 'Od prvog poziva do gotovog sistema za',
    headingHighlight: '3 nedelje',
    headingAfter: '.',
    sideText:
      'Svaki projekat prati isti jasan plan, tako da u svakom trenutku znate šta se radi, šta je sledeće i kada će biti gotovo.',
    weeks: [
      {
        label: 'NEDELJA 01',
        title: 'Strategija',
        tasks: [
          { title: 'Uvodni poziv', duration: '1 dan' },
          { title: 'Ciljevi i KPI-jevi', duration: '1 dan' },
          { title: 'Analiza tržišta i konkurencije', duration: '2 dana' },
          { title: 'Pozicioniranje i plan inovacija', duration: '1 dan' },
          { title: 'Struktura sajta i sadržaja', duration: '1 dan' },
        ],
      },
      {
        label: 'NEDELJA 02',
        title: 'Produkcija',
        tasks: [
          { title: 'Scenariji i udice (hooks)', duration: '1 dan' },
          { title: 'Snimanje', duration: '1 dan' },
          { title: 'Video montaža', duration: '2 dana' },
          { title: 'Dizajn veb-sajta', duration: '2 dana' },
        ],
      },
      {
        label: 'NEDELJA 03',
        title: 'Implementacija',
        tasks: [
          { title: 'Izrada veb-sajta', duration: '3 dana' },
          { title: 'Podešavanje automatizacije i CRM-a', duration: '1 dan' },
          { title: 'Pokretanje reklama i prodaje', duration: '1 dan' },
          { title: 'Testiranje i lansiranje', duration: '1 dan' },
        ],
      },
    ],
    bottomLine:
      'Posle 3. nedelje: stalna analitika, održavanje i unapređenja, kako bi vaši rezultati nastavili da rastu.',
  },
  team: {
    heading: 'Ljudi iza VDigital.',
    headingBefore: 'Ljudi iza',
    subheading: 'Tri stručnjaka, jedna direktna linija. Uvek razgovarate sa ljudima koji zaista rade na vašem projektu.',
    members: [
      {
        id: 'member1',
        name: 'Veljko Petković',
        role: 'Osnivač · Full-Stack Developer',
        text: 'Gradi veb-sajtove, veb aplikacije i automatizacije. Na vebu gradi od 2020. godine, sa više od 30 isporučenih projekata.',
        photo: '/team/member1.webp',
      },
      {
        id: 'member2',
        name: '[TEAM_2_NAME]',
        role: 'Video i Društvene mreže',
        text: 'Snima, montira i vodi sadržaj zbog kog ljudi prestaju da skroluju i počinju da vam veruju.',
        photo: '/team/member2.webp',
      },
      {
        id: 'member3',
        name: '[TEAM_3_NAME]',
        role: 'Prodaja i Outreach',
        text: 'Vodi hladne pozive i follow-up komunikaciju, pretvarajući interesovanje u zakazane termine.',
        photo: '/team/member3.webp',
      },
    ],
  },
  founding: {
    label: 'Founding klijenti',
    heading: 'Primamo 3 founding klijenta',
    headingItalic: 'iz oblasti medicine i koučinga.',
    text: 'VDigital je nov studio iza kog stoji iskusan tim. Naši prvi klijenti dobijaju posebne founding uslove, našu punu pažnju i partnera koji raste zajedno sa njima.',
    bullets: [
      'Founding uslovi za vaš prvi projekat',
      'Direktan pristup celom timu',
      'Vaš projekat postaje naša prva istaknuta studija slučaja (isključivo uz vašu dozvolu)',
    ],
    button: 'Prijavite se za founding mesto',
  },
  howWeWork: {
    headingBefore: 'Većina agencija naplaćuje bez obzira na rezultat. Mi radije',
    headingHighlight: 'rastemo',
    headingAfter: 'sa vama.',
    card1: 'Fiksna cena: jasna cena za jasno definisan obim posla.',
    card2: 'Podela prihoda (Revenue share): zarađujemo procenat od prodaje, samo kada vi zarađujete.',
    card3: 'Hibridni model: niža fiksna naknada plus procenat od rezultata.',
    bottomLine:
      'Bez dugoročnih ugovora. Ostajete zato što vidite rezultate, a ne zato što morate. Pun pristup svakom nalogu, analitici i prodaji, uključujući i naš udeo.',
  },
  faq: {
    label: 'FAQ',
    heading: 'Pitanja koja najčešće čujemo',
    items: [
      {
        q: 'Koliko ovo košta?',
        a: 'Zavisi od obima posla i modela saradnje koji odaberete. Nakon besplatnog poziva i kratke analize, dobijate preciznu ponudu bez ikakve obaveze.',
      },
      {
        q: 'Kako funkcioniše podela prihoda (revenue share)?',
        a: 'Možete platiti fiksnu cenu, procenat od prodaje ili kombinaciju oba. Kod procentualnog modela zarađujemo samo kada i vi zarađujete, i vidite svaki broj, uključujući naš udeo.',
      },
      {
        q: 'Da li moram da se pojavljujem pred kamerom?',
        a: 'Ne morate. Naš video kreator vas vodi kroz snimanje korak po korak, a sadržaj možemo kreirati i bez vašeg lica: prikaz vaše ordinacije ili prakse, grafike, tekst ili animacije.',
      },
      {
        q: 'Ko je vlasnik sajta i naloga?',
        a: 'Vi. Mi njima upravljamo, ali vi imate pun pristup i kontrolu, i ništa se ne radi bez vašeg znanja.',
      },
      {
        q: 'Šta ako ne bude rezultata?',
        a: 'Nema dugoročnih ugovornih obaveza. Ako saradnja ne daje rezultate, prekida se kako je definisano ugovorom. A kod modela podele prihoda, ako nema prodaje za vas — nema zarade ni za nas.',
      },
      {
        q: 'Koliko vremena je potrebno?',
        a: 'Od prvog poziva do potpuno funkcionalnog sistema potrebno je oko 3 nedelje. Nakon toga slede analitika, održavanje i stalna unapređenja.',
      },
      {
        q: 'Da li radite sa klijentima van Srbije?',
        a: 'Da. Radimo na srpskom, engleskom i ruskom jeziku, potpuno na daljinu (remote).',
      },
    ],
  },
  contact: {
    label: 'Kontakt',
    heading: 'Hajde da pričamo o vašoj praksi.',
    text: 'Zakažite besplatan poziv. Pogledaćemo gde ste sada, odakle vam dolaze klijenti i šta bi vam donelo više njih.',
    primaryButton: 'Zakažite poziv',
    orText: 'Ili nam pišite direktno',
    form: {
      name: 'Ime i prezime',
      contact: 'Email ili telefon',
      profession: 'Čime se bavite?',
      professionOptions: [
        'Doktor / Stomatolog / Klinika',
        'Health ili life kouč',
        'Kursevi i edukacija',
        'Ostalo',
      ],
      message: 'Poruka (opciono)',
      submit: 'Pošaljite upit',
      submitting: 'Slanje...',
      success: 'Hvala vam! Javićemo vam se u roku od 24 sata.',
      privacy: 'Vaše podatke koristimo isključivo da vas kontaktiramo povodom vašeg upita.',
      errorRequired: 'Molimo unesite vaše ime, email ili telefon i izaberite čime se bavite.',
    },
  },
  footer: {
    text: 'VDigital: sajtovi, video i marketing za doktore, health koučeve i eksperte.',
    location: 'Niš, Srbija · Radimo sa klijentima širom sveta',
    copyright: '© 2026 VDigital. Sva prava zadržana.',
  },
};
