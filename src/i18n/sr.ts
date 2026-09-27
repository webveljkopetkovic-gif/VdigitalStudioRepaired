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
    text: 'Vi lečite, savetujete i menjate živote. Mi pravimo sajt, kreiramo sadržaj i obavljamo pozive koji dovode nove klijente na vaša vrata.',
    words: {
      row1: ['Vi', 'lečite,'],
      row1AfterHeal: ['savetujete', 'i', 'menjate', 'živote.'],
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
        photo: 'https://res.cloudinary.com/qftxmdqk/image/upload/v1790538093/0-02-05-f183470000d46207901c57a6779b1ae4b5bcb6a53af07abd7b79e27c5aa1bed7_7799938c6034200e.jpg',
        portfolioUrl: 'https://www.veljkopetkovic.com',
        portfolioLabel: 'Pogledajte radove →',
      },
      {
        id: 'member2',
        name: 'Velimir Nikolić',
        role: 'Video i Društvene mreže',
        text: 'Snima, montira i vodi sadržaj zbog kog ljudi prestaju da skroluju i počinju da vam veruju.',
        photo: 'https://res.cloudinary.com/qftxmdqk/image/upload/v1790538102/0-02-05-2f7f61b0f40e79c38060e9ab0a4dd6561d0f3d63bb587bd54585e26e23aaf8ed_89883eef4fc10efa.jpg',
      },
      {
        id: 'member3',
        name: 'Vuk Stefanović',
        role: 'Prodaja i hladni pozivi',
        text: 'Vodi hladne pozive i follow-up komunikaciju, pretvarajući interesovanje u zakazane termine.',
        photo: 'https://res.cloudinary.com/qftxmdqk/image/upload/v1790538098/0-02-05-9b7c3cb69d4c13555dde0c6d3378e91ad6d9ee5bcf9a62688fcc7af5d17c117d_b9e5c6a7a8e0c8e0.jpg',
      },
    ],
  },
  founding: {
    label: 'Prvi partneri',
    heading: 'Primamo 3 prva klijenta-partnera',
    headingItalic: 'iz oblasti medicine i koučinga.',
    text: 'VDigital je nov studio iza kog stoji iskusan tim. Naši prvi klijenti dobijaju posebne uslove, našu punu pažnju i partnera koji raste zajedno sa njima.',
    bullets: [
      'Posebni uslovi za vaš prvi projekat',
      'Direktan pristup celom timu',
      'Vaš projekat postaje naša prva istaknuta studija slučaja (isključivo uz vašu dozvolu)',
    ],
    button: 'Prijavite se za mesto partnera',
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
      privacyAgreementPrefix: 'Slanjem upita prihvatate našu ',
      privacyAgreementLink: 'Politiku privatnosti',
      privacyAgreementSuffix: '.',
      errorRequired: 'Molimo unesite vaše ime, email ili telefon i izaberite čime se bavite.',
      errorGeneric: 'Nešto nije u redu. Molimo pokušajte ponovo.',
    },
  },
  footer: {
    text: 'VDigital: sajtovi, video i marketing za doktore, health koučeve i eksperte.',
    location: 'Niš, Srbija · Radimo sa klijentima širom sveta',
    copyright: '© 2026 VDigital. Sva prava zadržana.',
    privacy: 'Politika privatnosti',
  },
  contactPage: {
    label: 'Kontakt',
    h1Regular: 'Zakažite',
    h1Italic: 'besplatan poziv.',
    intro:
      'Recite nam nešto o svom poslu, odakle bi trebalo da vam dolaze novi klijenti i šta vas trenutno koči. Proći ćemo kroz sve zajedno i pokazati vam kako bi mogao da izgleda sledeći korak.',
    stepsLabel: 'Šta sledi',
    step1: 'Pošaljite nam kratku poruku ili zatražite poziv.',
    step1Booking: 'Izaberite termin koji vam odgovara.',
    step2: 'Razgovaramo o vašem poslu, klijentima i ciljevima.',
    step3:
      'Dobijate konkretan plan, a zajedno odlučujemo da li saradnja ima smisla.',
    writeLabel: 'Više volite da pišete?',
    callbackLabel: 'Ili da vas mi pozovemo',
    callbackNamePlaceholder: 'Vaše ime',
    callbackPhonePlaceholder: 'Broj telefona',
    callbackButton: 'Pozovite me',
    callbackSuccess: 'Hvala! Zovemo vas u roku od 24 sata radnim danima.',
    callbackError: 'Nešto nije u redu. Pišite nam na WhatsApp.',
    prefilledMessage: 'Zdravo, želim da zakažem besplatan poziv sa VDigital timom.',
    calendarFallback:
      'Pošaljite nam kratku poruku ispod ili nam pišite direktno i zajedno ćemo naći termin.',
    socialsLabel: 'Društvene mreže',
  },
  privacyPage: {
    label: 'Pravne informacije',
    title: 'Politika privatnosti',
    lastUpdated: 'Poslednje ažuriranje: septembar 2026.',
    intro:
      'Ova Politika privatnosti jednostavnim jezikom objašnjava koje podatke o ličnosti prikupljamo kada kontaktirate VDigital, zašto ih prikupljamo i koja su vaša prava.',
    sections: [
      {
        heading: '1. Ko prikuplja podatke (Rukovalac podacima)',
        body: 'VDigital, Niš, Republika Srbija. Za sva pitanja ili zahteve u vezi sa zaštitom podataka o ličnosti možete nam pisati na hello@vdigital.dev.',
      },
      {
        heading: '2. Koje podatke prikupljamo',
        body: 'Kada pošaljete kontakt formu ili zahtev za poziv na našem sajtu, prikupljamo samo podatke koje sami unesete: ime, email adresu ili broj telefona, čime se bavite (profesiju) i tekst poruke. Takođe čuvamo jedan „lang“ kolačić (cookie) kako bismo zapamtili izbor jezika posetioca; on ne sadrži nikakve podatke o ličnosti.',
      },
      {
        heading: '3. Svrha obrade podataka',
        body: 'Vaše podatke koristimo isključivo kako bismo odgovorili na vaš upit, zakazali razgovor koji ste tražili ili pripremili predlog saradnje. Ne šaljemo neželjene reklamne mejlove (spam) i nikada ne prodajemo niti ustupamo vaše podatke trećim licima.',
      },
      {
        heading: '4. Pravni osnov',
        body: 'Podatke obrađujemo na osnovu vašeg pristanka prilikom slanja forme i radi preduzimanja radnji na vaš zahtev pre zaključenja ugovora, u skladu sa Zakonom o zaštiti podataka o ličnosti Republike Srbije (ZZPL) i Opštom uredbom EU o zaštiti podataka (GDPR) za posetioce iz Evropske unije.',
      },
      {
        heading: '5. Rok čuvanja podataka',
        body: 'Podatke iz upita čuvamo najduže 12 meseci od poslednje komunikacije kako bismo mogli da ispratimo vaš zahtev, osim ako ranije ne zatražite njihovo brisanje ili ne započnemo poslovnu saradnju.',
      },
      {
        heading: '6. Treća lica i obrađivači podataka',
        body: 'Za potrebe hostinga sajta i prosleđivanja upita na našu email adresu, podaci se obrađuju isključivo u neophodnom obimu putem sledećih servisa: Vercel Inc. (hosting veb-sajta i izvršavanje serverske funkcije) i Web3Forms (servis za prosleđivanje poruka iz kontakt forme na hello@vdigital.dev).',
      },
      {
        heading: '7. Vaša prava',
        body: 'U svakom trenutku imate pravo da zatražite uvid u svoje podatke, njihovu ispravku, brisanje ili ograničenje obrade slanjem mejla na hello@vdigital.dev. Takođe imate pravo da podnesete pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti Republike Srbije ili nadležnom telu za zaštitu podataka u EU.',
      },
    ],
  },
};
