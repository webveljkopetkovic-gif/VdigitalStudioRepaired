import { type Translations, type TeamMemberTranslation } from './en';

export const sr: Translations = {
  lang: 'sr',
  navbar: {
    links: {
      services: 'Usluge',
      process: 'Proces',
      about: 'O nama',
      team: 'Tim',
      pricing: 'Cenovnik',
      faq: 'FAQ',
      contact: 'Kontakt',
    },
    dropdown: {
      servicesTitle: 'Naše usluge',
      webDev: 'Izrada sajtova',
      videoSocial: 'Video i društvene mreže',
      marketingAuto: 'Marketing i automatizacija',
      coldCalling: 'Cold calling i prodaja',
    },
    cta: 'Zakažite poziv',
  },
  hero: {
    line1: 'Sajtovi, video i marketing',
    line2: 'koji vam dovode nove klijente',
    line3: 'dok vi vodite posao',
    leftText:
      'VDigital je digitalni studio iz Niša. Pravimo ceo sistem koji vam dovodi klijente: sajt, sadržaj, reklame, automatizaciju i prodajne pozive. Jedan tim, jedan plan, sve radi za 3 nedelje.',
    rightText:
      'Zadržavate pun pristup svakom nalogu, broju i rezultatu.',
    primaryCta: 'Zakažite besplatan poziv',
    secondaryCta: 'Pogledajte kako radimo',
  },
  trustBar: {
    items: [
      '30+ isporučenih projekata',
      'Pravimo za veb od 2020.',
      'Srpski, engleski i ruski',
      'Ceo sistem za 3 nedelje',
    ],
  },
  statement: {
    text: 'Vi vodite posao. Mi pravimo sajt, kreiramo sadržaj i obavljamo pozive koji dovode nove klijente na vaša vrata.',
    words: {
      row1: ['Vi', 'vodite'],
      row1AfterHeal: ['posao.'],
      row2: ['Mi', 'pravimo', 'sajt,'],
      row2AfterWebsite: ['kreiramo', 'sadržaj'],
      row3: ['i', 'obavljamo', 'pozive'],
      row3AfterCalls: ['koji', 'dovode', 'nove', 'klijente', 'na', 'vaša', 'vrata.'],
    },
    button: 'Hajde da pričamo',
  },
  painPoints: {
    label: 'Zvuči poznato?',
    heading: 'Odlični u svom poslu. Nevidljivi na internetu.',
    headingMain: 'Odlični u svom poslu.',
    headingItalic: 'Nevidljivi na internetu.',
    cards: [
      {
        id: 'empty-calendar',
        title: 'Dobar posao, tih telefon',
        text: 'Ono što prodajete je kvalitetno, ali novi klijenti vas ne pronalaze na internetu.',
      },
      {
        id: 'no-time',
        title: 'Nemate vremena za marketing',
        text: 'Između klijenata, porudžbina i vođenja firme, ne ostaje vam energije za objave, reklame i poruke.',
      },
      {
        id: 'online-image',
        title: 'Na internetu delujete manje nego što jeste',
        text: 'Zastareo sajt ili nasumične objave čine da vaša firma deluje manje profesionalno nego što zaista jeste.',
      },
      {
        id: 'afraid-payoff',
        title: 'Strah da se neće isplatiti',
        text: 'Već ste slušali velika obećanja i ne želite da plaćate marketing koji ne donosi ništa.',
      },
    ],
    closing: 'Upravo taj deo mi preuzimamo.',
  },
  services: {
    label: 'Usluge',
    heading: 'Jedan tim. Ceo sistem.',
    hint: 'Skrolujte da vidite sve usluge',
    cardButton: 'Saznajte više',
    cards: [
      {
        id: 'web-development',
        number: '01',
        titleWhite: 'Veb &',
        titleGrey: 'programiranje',
        tags: ['Sajtovi', 'Landing page', 'Online prodavnice', 'Veb aplikacije', 'Online zakazivanje i plaćanje', 'SEO'],
        text: 'Brzi i sigurni sajtovi napravljeni da posetioce pretvore u upite, zakazivanja i prodaju, optimizovani za Google i AI pretragu od prvog dana.',
      },
      {
        id: 'video-social',
        number: '02',
        titleWhite: 'Video &',
        titleGrey: 'društvene mreže',
        tags: ['Snimanje', 'Video montaža', 'Instagram Reels', 'TikTok', 'Plan sadržaja'],
        text: 'Snimamo, montiramo i objavljujemo sadržaj koji pokazuje šta radite i zašto ljudi treba da izaberu baš vas. Niste opušteni pred kamerom? Vodimo vas kroz svaki korak, ili pravimo sadržaj bez vašeg lica.',
      },
      {
        id: 'marketing-automation',
        number: '03',
        titleWhite: 'Marketing &',
        titleGrey: 'automatizacija',
        tags: ['Plaćeni oglasi', 'Analiza tržišta i konkurencije', 'CRM', 'Automatski odgovori', 'Analitika'],
        text: 'Reklame dovode ljude, a automatizacija osigurava da nijedan upit ne ostane bez odgovora. Svaki broj vidite u realnom vremenu.',
      },
      {
        id: 'cold-calling-sales',
        number: '04',
        titleWhite: 'Cold Calling &',
        titleGrey: 'prodaja',
        tags: ['Cold calling', 'Lead generation', 'Follow-up', 'Appointment setting'],
        text: 'Naš prodajni stručnjak kontaktira potencijalne klijente u vaše ime i pretvara interesovanje u zakazane pozive, sastanke i prodaju.',
      },
    ],
  },
  whoWeWorkWith: {
    eyebrow: 'Sa kim radimo',
    heading: 'Različite delatnosti. Isti problem: premalo klijenata.',
    subheading:
      'Ako ljudi mogu da vas pronađu na internetu, da vas pozovu, zakažu kod vas ili kupe od vas, možemo da napravimo sistem koji će ih dovesti još više.',
    cards: [
      {
        title: 'Zdravlje i wellness',
        who: 'Klinike, stomatolozi, fizioterapeuti, health koučevi',
        text: 'Sajtovi i sadržaj kojima ljudi veruju, tako da pretraga postane zakazan termin.',
      },
      {
        title: 'Koučevi, kursevi i edukacija',
        who: 'Koučevi, treneri, online škole, radionice',
        text: 'Landing page, video i follow-up koji popunjavaju vaše programe i kurseve.',
      },
      {
        title: 'Lokalne usluge',
        who: 'Saloni, teretane, servisi, čišćenje, građevina',
        text: 'Budite vidljivi na Google-u u svom gradu, a poziv ili zakazivanje neka bude na jedan klik.',
      },
      {
        title: 'Ugostiteljstvo i turizam',
        who: 'Restorani, kafići, apartmani, turističke agencije',
        text: 'Sadržaj koji ljudi žele da podele, plus više direktnih rezervacija i manje provizija platformama.',
      },
      {
        title: 'Online prodavnice i brendovi',
        who: 'E-commerce, brendovi proizvoda, lokalni proizvođači',
        text: 'Brze prodavnice, video proizvoda i reklame koje skrolovanje pretvaraju u porudžbine.',
      },
      {
        title: 'Startapi i B2B',
        who: 'SaaS, agencije, proizvođači, advokati, knjigovođe, nekretnine',
        text: 'Jasni sajtovi, cold calling i CRM pipeline koji se pretvaraju u prodajne sastanke.',
      },
    ],
    footerLine:
      'Ne vidite svoju delatnost? Recite nam šta prodajete i iskreno ćemo vam reći da li možemo da pomognemo.',
  },
  process: {
    label: 'Proces',
    headingBefore: 'Od prvog poziva do sistema koji radi za',
    headingHighlight: '3 nedelje',
    headingAfter: '.',
    sideText:
      'Svaki projekat prati isti jasan plan, tako da uvek znate šta se radi, šta je sledeće i kada će biti gotovo.',
    weeks: [
      {
        label: 'NEDELJA 01',
        title: 'Strategija',
        tasks: [
          { title: 'Uvodni poziv', duration: '1 dan' },
          { title: 'Ciljevi i KPI', duration: '1 dan' },
          { title: 'Analiza tržišta i konkurencije', duration: '2 dana' },
          { title: 'Pozicioniranje i plan rasta', duration: '1 dan' },
          { title: 'Struktura sajta i sadržaja', duration: '1 dan' },
        ],
      },
      {
        label: 'NEDELJA 02',
        title: 'Produkcija',
        tasks: [
          { title: 'Scenariji i hooks', duration: '1 dan' },
          { title: 'Snimanje', duration: '1 dan' },
          { title: 'Video montaža', duration: '2 dana' },
          { title: 'Dizajn sajta', duration: '2 dana' },
        ],
      },
      {
        label: 'NEDELJA 03',
        title: 'Implementacija',
        tasks: [
          { title: 'Izrada sajta', duration: '3 dana' },
          { title: 'Podešavanje automatizacije i CRM-a', duration: '1 dan' },
          { title: 'Pokretanje reklama i cold calling-a', duration: '1 dan' },
          { title: 'Testiranje i lansiranje', duration: '1 dan' },
        ],
      },
    ],
    bottomLine:
      'Posle 3. nedelje: stalna analitika, održavanje i unapređenja, kako bi rezultati nastavili da rastu.',
  },
  team: {
    heading: 'Ljudi iza VDigital-a.',
    headingBefore: 'Ljudi iza',
    subheading:
      'Tri stručnjaka, jedna direktna linija. Uvek razgovarate sa ljudima koji zaista rade na vašem projektu.',
    members: [
      {
        id: 'member1',
        name: 'Veljko Petković',
        role: 'Osnivač · Full-Stack Developer',
        text: 'Pravi sajtove, veb aplikacije i automatizacije. Za veb pravi od 2020, sa više od 30 isporučenih projekata.',
        photo: '/images/team-veljko.jpg',
        photoAlt: 'Veljko Petković, osnivač VDigital-a',
        portfolioUrl: 'https://www.veljkopetkovic.com',
        portfolioLabel: 'Pogledajte radove →',
      },
      {
        id: 'member2',
        name: 'Velimir Nikolić',
        role: 'Video i društvene mreže',
        text: 'Snima, montira i vodi sadržaj zbog kog ljudi prestaju da skroluju i počinju da vam veruju.',
        photo: '/images/team-velimir.jpg',
        photoAlt: 'Velimir Nikolić, video i društvene mreže u VDigital-u',
      },
      {
        id: 'member3',
        name: 'Vuk Stefanović',
        role: 'Prodaja i cold calling',
        text: 'Vodi cold calling i follow-up, pretvarajući interesovanje u zakazane sastanke i prodaju.',
        photo: '/images/team-vuk.jpg',
        photoAlt: 'Vuk Stefanović, prodaja i cold calling u VDigital-u',
      },
    ] as TeamMemberTranslation[],
  },
  founding: {
    label: 'Prvi partneri',
    heading: 'Primamo 3 prva klijenta-partnera.',
    headingItalic: '',
    text: 'VDigital je nov studio iza kog stoji iskusan tim. Tražimo 3 firme, iz bilo koje delatnosti, sa kojima ćemo rasti. Dobijaju posebne uslove, našu punu pažnju i partnera koji raste zajedno sa njima.',
    bullets: [
      'Posebni uslovi za vaš prvi projekat',
      'Direktan pristup celom timu',
      'Vaš projekat postaje naša prva istaknuta studija slučaja (samo uz vašu dozvolu)',
    ],
    button: 'Prijavite se za mesto partnera',
  },
  howWeWork: {
    headingBefore: 'Većina agencija naplaćuje bez obzira na rezultat. Mi radije',
    headingHighlight: 'rastemo',
    headingAfter: 'sa vama.',
    card1: 'Fiksna cena: jasna cena za jasno definisan obim posla.',
    card2: 'Revenue share: zarađujemo procenat od prodaje, samo kada i vi zarađujete.',
    card3: 'Hibridni model: niža fiksna naknada plus procenat.',
    bottomLine:
      'Bez dugoročnih ugovora. Ostajete zato što vidite rezultate, a ne zato što morate. Pun pristup svakom nalogu, analitici i prodaji, uključujući i naš udeo.',
  },
  faq: {
    label: 'FAQ',
    heading: 'Pitanja koja najčešće čujemo',
    items: [
      {
        q: 'Da li radite sa mojom delatnošću?',
        a: 'Najverovatnije da. Radimo sa svakom firmom koja dobija klijente preko interneta ili telefona: klinike, koučevi, lokalne usluge, restorani, online prodavnice, startapi i B2B firme. Na prvom pozivu ćemo vam iskreno reći da li smo pravi izbor.',
      },
      {
        q: 'Koliko ovo košta?',
        a: 'Sve naše cene i paketi su jasno prikazani u cenovniku iznad. Birate samo usluge i model plaćanja koji vam odgovaraju, a cena se računa odmah.',
      },
      {
        q: 'Kako funkcioniše revenue share?',
        a: 'Možete odabrati fiksno plaćanje, procenat od prodaje ili kombinaciju. Kod modela na procenat, mesečna naknada za usluge prodaje je 0 € i zarađujemo samo kada vi ostvarite prodaju, uz potpun uvid u sve brojeve.',
      },
      {
        q: 'Već imamo sajt. Da li nam treba novi?',
        a: 'Ne uvek. Prvo pogledamo šta imate. Ako sajt radi, unapredimo ga i oko njega napravimo ostatak sistema.',
      },
      {
        q: 'Da li moram da se pojavljujem pred kamerom?',
        a: 'Ne morate. Naš video kreator vas vodi kroz snimanje korak po korak, a sadržaj može da se napravi i bez vašeg lica: vaš prostor, proizvodi, tim, grafike ili animacije.',
      },
      {
        q: 'Ko je vlasnik sajta i naloga?',
        a: 'Vi. Mi njima upravljamo, ali vi imate pun pristup i kontrolu, i ništa se ne radi bez vašeg znanja.',
      },
      {
        q: 'Šta ako ne bude rezultata?',
        a: 'Nema dugoročnih ugovora. Ako saradnja ne daje rezultate, prekida se kako je definisano ugovorom. A kod revenue share modela, ako vi nemate prodaju, nemamo ni mi zaradu.',
      },
      {
        q: 'Koliko vremena je potrebno?',
        a: 'Od prvog poziva do sistema koji radi potrebno je oko 3 nedelje. Nakon toga slede analitika, održavanje i stalna unapređenja.',
      },
      {
        q: 'Da li radite sa klijentima van Srbije?',
        a: 'Da. Radimo na srpskom, engleskom i ruskom, potpuno na daljinu.',
      },
    ],
  },
  contact: {
    label: 'Kontakt',
    heading: 'Hajde da pričamo o vašem poslu.',
    text: 'Zakažite besplatan poziv. Pogledaćemo gde ste sada, odakle vam dolaze klijenti i šta bi vam donelo više njih.',
    primaryButton: 'Zakažite poziv',
    orText: 'Ili nas kontaktirajte direktno',
    form: {
      name: 'Ime i prezime',
      contact: 'Email ili telefon',
      profession: 'Vaša delatnost',
      professionOptions: [
        'Zdravlje i wellness',
        'Koučing, kursevi i edukacija',
        'Lokalne usluge',
        'Ugostiteljstvo i turizam',
        'Online prodavnica ili brend',
        'Startap ili B2B',
        'Ostalo',
      ],
      message: 'Recite nam šta prodajete i šta biste želeli da unapredite (opciono)',
      submit: 'Pošaljite upit',
      submitting: 'Slanje...',
      success: 'Hvala vam! Javićemo vam se u roku od 24 sata.',
      privacy: 'Vaše podatke koristimo isključivo za odgovor na vaš upit.',
      privacyAgreementPrefix: 'Slanjem poruke prihvatate našu ',
      privacyAgreementLink: 'Politiku privatnosti',
      privacyAgreementSuffix: '.',
      errorRequired:
        'Molimo unesite ime i prezime, kontakt i izaberite vašu delatnost.',
      errorGeneric: 'Došlo je do greške. Molimo pokušajte ponovo.',
    },
  },
  footer: {
    text: 'VDigital: sajtovi, video i marketing za firme koje žele više klijenata.',
    location: 'Niš, Srbija · Radimo sa klijentima širom sveta',
    copyright: '© 2026 VDigital · Niš, Srbija',
    privacy: 'Politika privatnosti',
    cookieSettings: 'Podešavanja kolačića',
  },
  cookieBanner: {
    text: 'Koristimo kolačiće kako bismo razumeli kako posetioci koriste naš sajt.',
    accept: 'Prihvati',
    decline: 'Odbij',
    privacyLink: 'Politika privatnosti',
  },
  contactPage: {
    label: 'Kontakt',
    h1Regular: 'Zakažite',
    h1Italic: 'besplatan poziv.',
    intro:
      'Recite nam o svojoj firmi, odakle bi trebalo da dolaze novi klijenti i šta vas usporava. Proći ćemo kroz to zajedno i pokazati vam šta bi mogao biti koristan sledeći korak.',
    stepsLabel: 'Šta se dešava dalje',
    step1: 'Pošaljite nam kratku poruku ili zatražite poziv.',
    step1Booking: 'Izaberite termin koji vam odgovara.',
    step2: 'Razgovaramo o vašem poslu, klijentima i ciljevima.',
    step3:
      'Dobijate konkretan plan i zajedno procenjujemo da li saradnja ima smisla.',
    writeLabel: 'Više volite da pišete?',
    callbackLabel: 'Ili mi zovemo vas',
    callbackNamePlaceholder: 'Vaše ime',
    callbackPhonePlaceholder: 'Broj telefona',
    callbackButton: 'Pozovite me',
    callbackSuccess: 'Hvala! Pozvaćemo vas u roku od 24h radnim danima.',
    callbackError: 'Došlo je do greške. Pišite nam na WhatsApp.',
    prefilledMessage: 'Zdravo VDigital, želim da zakažem besplatan poziv.',
    calendarFallback:
      'Pošaljite nam kratku poruku ispod ili nas kontaktirajte direktno i naći ćemo zajednički termin.',
    socialsLabel: 'Pratite nas',
  },
  privacyPage: {
    label: 'Pravne informacije',
    title: 'Politika privatnosti i kolačića',
    lastUpdated: 'Poslednje ažuriranje: oktobar 2026.',
    intro:
      'Ova Politika privatnosti i kolačića objašnjava kako VDigital prikuplja, koristi i štiti vaše lične podatke i kako se upravlja kolačićima i trekerima u skladu sa Zakonom o zaštiti podataka o ličnosti Republike Srbije (ZZPL), Opštom uredbom EU o zaštiti podataka (GDPR) i ePrivacy direktivom. Nijedan neophodni kolačić ili treća strana se ne učitava pre vašeg izričitog pristanka.',
    manageCookiesCta: 'Upravljaj podešavanjima kolačića',
    cookieTableTitle: 'Kompletna lista kolačića i trekera',
    cookieTableHeaders: {
      name: 'Naziv',
      provider: 'Provajder / Zemlja',
      purpose: 'Svrha',
      duration: 'Trajanje',
      category: 'Kategorija',
    },
    cookieTableRows: [
      {
        name: 'cc_cookie',
        provider: 'vdigital.dev (Prva strana)',
        purpose: 'Čuva vaše izbore saglasnosti za kolačiće (neophodni, analitički, marketinški) kako vas ne bismo ponovo pitali pri svakoj poseti.',
        duration: '6 meseci (182 dana)',
        category: 'Neophodni',
      },
      {
        name: 'vd_lang_choice, vd_lang_banner_dismissed',
        provider: 'vdigital.dev (localStorage)',
        purpose: 'Pamti izabrani jezik interfejsa (SR / EN / RU) i status preporuke jezika.',
        duration: 'Trajno (lokalno skladište pregledača)',
        category: 'Neophodni',
      },
      {
        name: '_ga, _ga_NNXZ378TYV',
        provider: 'Google Ireland Ltd / Google LLC (EU / SAD)',
        purpose: 'Google Analytics 4 kolačići za razlikovanje jedinstvenih posetilaca i sesija (učitavaju se isključivo nakon pristanka na Analitiku).',
        duration: '2 godine',
        category: 'Analitika',
      },
      {
        name: '_gid, _gat',
        provider: 'Google Ireland Ltd / Google LLC (EU / SAD)',
        purpose: 'Google Analytics 4 kolačići za kratkoročne sesije i ograničavanje broja zahteva (isključivo uz pristanak).',
        duration: '24 sata / 1 minut',
        category: 'Analitika',
      },
      {
        name: '_ym_uid, _ym_d',
        provider: 'Yandex LLC (Ruska Federacija)',
        purpose: 'Yandex Metrika anonimni identifikator posetioca i vreme prve posete za statistiku korišćenja (isključivo uz pristanak na Analitiku).',
        duration: '1 godina',
        category: 'Analitika',
      },
      {
        name: '_ym_isad, _ym_visorc',
        provider: 'Yandex LLC (Ruska Federacija)',
        purpose: 'Yandex Metrika detekcija blokatora reklama i metrike sesija (Webvisor je isključen; isključivo uz pristanak).',
        duration: '2 dana / 30 minuta',
        category: 'Analitika',
      },
      {
        name: 'Ahrefs Web Analytics (skripta)',
        provider: 'Ahrefs Pte. Ltd. (Singapur / EU)',
        purpose: 'Analitika poseta bez kolačića (učitava se isključivo nakon pristanka na Analitiku).',
        duration: 'Sesija (bez kolačića)',
        category: 'Analitika',
      },
      {
        name: 'Cal.com Embed & YouTube-nocookie',
        provider: 'Cal.com Inc. (SAD) / Google LLC (SAD)',
        purpose: 'Interaktivni kalendar za zakazivanje poziva i video plejer sa pojačanom privatnošću (isključivo uz Marketinški pristanak ili klik za učitavanje).',
        duration: 'Sesija',
        category: 'Marketing',
      },
    ],
    sections: [
      {
        heading: '1. Rukovalac podacima',
        body: 'Rukovalac odgovoran za obradu vaših ličnih podataka je VDigital (Veljko Petković, Niš, Republika Srbija). Za sva pitanja u vezi sa zaštitom privatnosti kontaktirajte nas na hello@vdigital.dev ili +381 65 913 1103.',
      },
      {
        heading: '2. Lični podaci koje prikupljamo',
        body: '• Podaci iz kontakt forme: Kada pošaljete upit putem kontakt forme, prikupljamo podatke koje dobrovoljno navedete: vaše ime i prezime, email adresu ili broj telefona, vašu delatnost i vašu poruku.\n• Tehnički i analitički podaci (isključivo uz prethodni pristanak): Prilikom prve posete sajtu vdigital.dev ne učitavaju se nikakvi opcioni kolačići niti skripte trećih strana. Tek ukoliko izričito prihvatite kategorije "Analitika" ili "Marketing" prikupljaju se anonimizovani statistički podaci.',
      },
      {
        heading: '3. Svrha i pravni osnov obrade',
        body: '• Neophodno funkcionisanje: Čuvanje izbora o kolačićima i jeziku radi ispravnog funkcionisanja sajta.\n• Odgovor na upite: Obrada podataka iz kontakt forme radi odgovora na vašu poruku i zakazivanja poziva.\n• Analitika i marketing: Isključivo na osnovu vašeg prethodnog, slobodno datog pristanka.',
      },
      {
        heading: '4. Primaoci podataka i međunarodni transfer',
        body: 'Podatke mogu obrađivati Vercel Inc. (hosting), Web3Forms (prenos forme na naš email), kao i Google, Yandex, Ahrefs i Cal.com uz poštovanje Standardnih ugovornih klauzula.',
      },
      {
        heading: '5. Rok čuvanja podataka',
        body: 'Upiti iz kontakt forme čuvaju se najduže 12 meseci od poslednje komunikacije, osim ako ne zatražite ranije brisanje ili ne zaključimo ugovor o saradnji.',
      },
      {
        heading: '6. Vaša prava po ZZPL i GDPR',
        body: 'Imate pravo na pristup, ispravku, brisanje, ograničenje obrade, prigovor i prenosivost podataka. Takođe imate pravo na pritužbu Povereniku za informacije od javnog značaja i zaštitu podataka o ličnosti (Bulevar kralja Aleksandra 15, Beograd, office@poverenik.rs).',
      },
      {
        heading: '7. Kako promeniti ili povući pristanak',
        body: 'Pristanak možete povući u svakom trenutku klikom na "Podešavanja kolačića" u futeru svake stranice.',
      },
    ],
  },
  notFoundPage: {
    code: '404',
    label: 'Greška 404',
    headingRegular: 'Uuups...',
    headingItalic: 'Stranica nije pronađena.',
    description:
      'Stranica koju tražite ne postoji, premeštena je ili je trenutno nedostupna. Hajde da vas vratimo na pravo mesto.',
    primaryCta: 'Nazad na početnu',
    secondaryCta: 'Kontaktirajte nas',
    imageAlt: 'Ilustracija 404 greške',
  },
};
