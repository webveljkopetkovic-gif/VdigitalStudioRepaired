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
  sr: {
    'web-development': {
      slug: 'web-development',
      serviceType: 'Izrada sajtova i web aplikacija',
      badge: 'Web Development & Dizajn',
      title: 'Izrada sajtova za doktore | VDigital',
      metaTitle: 'Izrada sajtova za doktore | VDigital',
      metaDescription:
        'Izrada profesionalnih i brzih sajtova za lekare, stomatologe i health koučeve. Prilagođeno pacijentima, sa integrisanim zakazivanjem i SEO optimizacijom.',
      h1: 'Izrada sajtova za doktore i koučeve',
      lead:
        'Pravimo moderne, brze i medicinski prilagođene web sajtove koji grade poverenje pacijenata i pretvaraju posete u zakazane preglede i konsultacije.',
      stats: [
        { value: '3 nedelje', label: 'Rok izrade od ideje do lansiranja' },
        { value: '100/100', label: 'Optimizacija performansi i mobilni prikaz' },
        { value: '100%', label: 'Prilagođeno medicinskim standardima' },
      ],
      problem: {
        heading: 'Zašto generički sajtovi ne donose pacijente?',
        description:
          'Većina digitalnih agencija koristi generičke WordPress šablone koji su spori, pretrpani dodacima i ne razumeju specifičnosti privatne medicinske prakse.',
        points: [
          {
            title: 'Nedostatak poverenja na prvi pogled',
            text:
              'Pacijenti traže stručnost, sigurnost i transparentnost. Šablonski sajtovi sa lošim rasporedom informacija stvaraju sumnju umesto autoriteta.',
          },
          {
            title: 'Komplikovan proces zakazivanja',
            text:
              'Ako pacijent mora da traži kontakt telefon ili popunjava dugu formu od deset polja, napustiće sajt i otići kod druge ordinacije.',
          },
          {
            title: 'Sporo učitavanje na mobilnim telefonima',
            text:
              'Preko 75% pacijenata traži lekara preko telefona. Sajt koji se učitava duže od 2.5 sekunde gubi većinu potencijalnih pacijenata pre nego što vide ponudu.',
          },
        ],
      },
      deliverables: {
        heading: 'Šta je sve uključeno u izradu sajta?',
        description:
          'Kompletan sistem „ključ u ruke“ koji rešava tehničke, dizajnerske i konverzijske potrebe vaše ordinacije ili koučing prakse.',
        items: [
          {
            title: 'Autorski dizajn usklađen sa vašim brendom',
            text:
              'Kreiramo jedinstven vizuelni identitet prilagođen vašoj specijalnosti — bez gotovih šablona koje koriste stotine drugih sajtova.',
          },
          {
            title: 'Interaktivno zakazivanje termina',
            text:
              'Direktna integracija sa Google kalendarom, Cal.com ili prilagođenim sistemom, uz automatske email i SMS potvrde pacijentima.',
          },
          {
            title: 'Medicinski copywriting i struktura usluga',
            text:
              'Pomažemo u strukturiranju tekstova tako da medicinski zahvati budu objašnjeni jasno, razumljivo i etički, bez zbunjujućeg žargona.',
          },
          {
            title: 'Lokalni SEO i Google Maps priprema',
            text:
              'Strukturirani podaci (Schema.org MedicalBusiness), indeksiranje na Google pretraživaču i optimizacija za lokalne pretrage u vašem gradu.',
          },
          {
            title: 'Pravna usklađenost (ZZPL i GDPR)',
            text:
              'Podešena politika privatnosti, režim pristanka na kolačiće (Google Consent Mode v2) i bezbedan prenos podataka putem SSL enkripcije.',
          },
          {
            title: 'Mobilna brzina i stabilan hosting',
            text:
              'Moderan kod (React/TypeScript, Tailwind) hostovan na globalnoj CDN mreži sa vremenom odziva ispod jedne sekunde.',
          },
        ],
      },
      process: {
        heading: 'Kako izgleda proces saradnje u 3 nedelje',
        description:
          'Strukturiran i transparentan proces bez beskrajnih sastanaka, gde vi trošite minimalno vreme, a dobijate gotov sajt.',
        steps: [
          {
            step: '01',
            title: 'Strategija, struktura i sadržaj',
            duration: '1. nedelja',
            text:
              'Analiziramo vašu ciljnu grupu pacijenata, definišemo ključne usluge, pišemo prodajne poruke i pripremamo vizuelni koncept.',
          },
          {
            step: '02',
            title: 'Dizajn i tehnička izrada',
            duration: '2. nedelja',
            text:
              'Programiramo responzivan sajt, povezujemo kalendar i formu za zakazivanje, optimizujemo fotografije i testiramo na svim uređajima.',
          },
          {
            step: '03',
            title: 'Podešavanje analitike i lansiranje',
            duration: '3. nedelja',
            text:
              'Povezujemo Google analitiku, postavljamo Schema.org kod, puštamo sajt u rad na vašem domenu i obučavamo vas za izmene sadržaja.',
          },
        ],
      },
      pricingModels: {
        heading: 'Modeli saradnje i formiranja cene',
        description:
          'Svaka ordinacija i praksa ima različite ciljeve. Nudimo jasne i predvidive modele saradnje bez skrivenih troškova.',
        models: [
          {
            title: 'Fiksni projekat (Turnkey Sprint)',
            subtitle: 'Za ordinacije i koučeve koji žele gotov sajt u 3 nedelje',
            description:
              'Definisan obim posla, jasan rok isporuke i fiksna cena podeljena u dve rate (avans i predaja projekta). Uključuje kompletan dizajn, kod, optimizaciju i lansiranje.',
            highlights: ['Jasno definisani rokovi', 'Fiksna investicija', 'Vlasništvo nad celim kodom'],
          },
          {
            title: 'Partnerstvo sa podelom prihoda (Revenue Share)',
            subtitle: 'Za odabrane stručnjake i visoko-profitne edukacije',
            description:
              'Manja početna investicija u izradu sajta uz procenat od novih klijenata generisanih kroz kreirani sistem akvizicije.',
            highlights: ['Minimalan rizik za vas', 'Zajednički cilj rasta', 'Dugoročna posvećenost'],
          },
          {
            title: 'Hibridni model (Sajt + Mesečno održavanje)',
            subtitle: 'Za ordinacije koje žele stalnu tehničku podršku i SEO',
            description:
              'Izrada sajta uz mesečni paket tehničkog održavanja, ažuriranja sadržaja, analize poseta i kontinuiranog rasta na Google pretrazi.',
            highlights: ['Kontinuirani tehnički nadzor', 'Redovna ažuriranja', 'SEO optimizacija'],
          },
        ],
      },
      faqs: [
        {
          question: 'Koliko traje izrada sajta?',
          answer:
            'Kompletan projekat završavamo za tačno 3 nedelje, pod uslovom da blagovremeno dobijemo osnovne informacije o vašim uslugama i timu.',
        },
        {
          question: 'Da li mi je potreban poseban softver za zakazivanje?',
          answer:
            'Ne. Mi integrišemo rešenje koje vama najviše odgovara — od besplatnog Google kalendara do platformi poput Cal.com ili prilagođenih formi koje šalju notifikacije direktno na vaš telefon ili email.',
        },
        {
          question: 'Da li sam ja vlasnik sajta nakon izrade?',
          answer:
            'Apsolutno. Celokupan izvorni kod, domen i nalozi pripadaju vama. Niste vezani nikakvim ugovorima koji vas primoravaju da ostanete kod nas ukoliko to ne želite.',
        },
        {
          question: 'Šta ako već imam stari sajt?',
          answer:
            'Možemo sačuvati postojeći domen i postojeću SEO poziciju, dok kompletan vizuelni izgled, kod i brzinu zamenjujemo modernom platformom.',
        },
      ],
      cta: {
        heading: 'Spremni za sajt koji donosi nove pacijente?',
        description:
          'Zakažite besplatan poziv od 30 minuta. Pregledaćemo vaše trenutno prisustvo na internetu i predložiti konkretan plan.',
        button: 'Zakažite besplatan poziv',
      },
    },
    'video-social-media': {
      slug: 'video-social-media',
      serviceType: 'Video produkcija i vođenje društvenih mreža',
      badge: 'Video & Društvene Mreže',
      title: 'Video i društvene mreže za doktore | VDigital',
      metaTitle: 'Video i društvene mreže za doktore | VDigital',
      metaDescription:
        'Kreiranje kratkih video formata (Reels, TikTok, Shorts) i vođenje društvenih mreža za lekare i koučeve. Izgradnja stručnog autoriteta i privlačenje novih pacijenata.',
      h1: 'Video produkcija i društvene mreže za doktore i koučeve',
      lead:
        'Pomažemo lekarima i stručnjacima da kroz edukativan i etički video sadržaj izgrade autoritet na društvenim mrežama i privuku idealne pacijente.',
      stats: [
        { value: '30-45s', label: 'Optimalno trajanje reels/short formata' },
        { value: '1 snimanje', label: 'Dovoljno za mesečni paket od 12 do 16 videa' },
        { value: '100% etično', label: 'Usklađeno sa lekarskim kodeksom' },
      ],
      problem: {
        heading: 'Zašto doktori gube vreme na društvenim mrežama bez rezultata?',
        description:
          'Većina lekara nema vremena za svakodnevno kreiranje objava, a agencije često forsiraju neautentične trendove koji narušavaju profesionalni ugled.',
        points: [
          {
            title: 'Sadržaj bez medicinske težine',
            text:
              'Plesanje i neozbiljni trendovi ne privlače pacijente koji traže ozbiljnog hirurga ili stomatologa. Potreban je balans edukacije i pristupačnosti.',
          },
          {
            title: 'Previše utrošenog vremena',
            text:
              'Lekari troše sate smišljajući šta da objave, umesto da snime sve u jednom danu sa gotovim scenarijima i profesionalnim timom.',
          },
          {
            title: 'Gledaoci ne postaju pacijenti',
            text:
              'Pregledi bez jasnog poziva na akciju i bez povezanog web sajta ostaju samo prolazne brojke bez uticaja na prihod ordinacije.',
          },
        ],
      },
      deliverables: {
        heading: 'Šta obuhvata naša video i social media usluga?',
        description:
          'Kompletan sistem u kome vi samo stanete ispred kamere na 2 do 3 sata mesečno, a mi radimo sve ostalo.',
        items: [
          {
            title: 'Priprema scenarija i tema',
            text:
              'Istražujemo najčešća pitanja vaših pacijenata i pišemo strukturirane skripte koje zvuče prirodno i stručno.',
          },
          {
            title: 'Profesionalna montaža i dinamični titlovi',
            text:
              'Rezanje pauza, dodavanje zvučnih efekata, medicinskih ilustracija i čitljivih titlova jer 80% ljudi gleda video bez zvuka.',
          },
          {
            title: 'Optimizacija za Reels, TikTok i YouTube Shorts',
            text:
              'Formatiranje i priprema za sve relevantne platforme sa privlačnim naslovnim fotografijama (thumbnails) i opisima.',
          },
          {
            title: 'Strategija konverzije posetilaca',
            text:
              'Uvezivanje profila sa vašim web sajtom i automatizacija direktnih poruka kako bi zainteresovani gledaoci lako zakazali pregled.',
          },
        ],
      },
      process: {
        heading: 'Mesečni ciklus kreiranja sadržaja',
        description:
          'Sistem koji štedi vaše vreme i osigurava konstantno prisustvo bez stresa oko objava.',
        steps: [
          {
            step: '01',
            title: 'Plan tema i priprema skripti',
            duration: 'Dan 1–3',
            text:
              'Pripremamo 12–16 kratkih tema baziranih na procedurama koje donose najveću vrednost vašoj praksi.',
          },
          {
            step: '02',
            title: 'Snimanje (jedna sesija)',
            duration: '2-3 sata',
            text:
              'U jednom snimanju prolazimo kroz sve teme u opuštenoj atmosferi uz našu režiju i asistenciju.',
          },
          {
            step: '03',
            title: 'Montaža, odobrenje i distribucija',
            duration: 'Tokom meseca',
            text:
              'Montiramo video materijal, šaljemo vam na pregled i vodimo publikaciju po optimalnom rasporedu.',
          },
        ],
      },
      pricingModels: {
        heading: 'Modeli saradnje za video i društvene mreže',
        description:
          'Prilagođavamo se vašim kapacitetima — od jednokratnih produkcijskih paketa do dugoročnog vođenja kanala.',
        models: [
          {
            title: 'Mesečni paket sadržaja',
            subtitle: '12 do 16 profesionalnih kratkih videa mesečno',
            description:
              'Kompletno istraživanje tema, pisanje skripti, vođenje snimanja, montaža i objava. Idealan format za stabilan priliv pacijenata.',
            highlights: ['Fiksna mesečna pretplata', 'Sveobuhvatna produkcija', 'Nema dugoročnog vezivanja'],
          },
          {
            title: 'Hibridni rast (Video + Plaćeni oglasi)',
            subtitle: 'Maksimalan doseg u vašem gradu ili regionu',
            description:
              'Kombinacija organskog video sadržaja sa ciljanim promovisanjem najuspešnijih videa prema pacijentima u vašoj geografskoj zoni.',
            highlights: ['Ciljano na vaš grad', 'Merenje cene po upitu', 'Brzi rezultati'],
          },
          {
            title: 'Edukativni masterclass i video kursevi',
            subtitle: 'Za koučeve i lekare koji monetizuju znanje',
            description:
              'Produkcija dužih video materijala, online kurseva i webinara sa vrhunskim zvukom, osvetljenjem i prezentacionim materijalima.',
            highlights: ['Visoka vrednost produkcije', 'Strukturisane lekcije', 'Podrška za platforme'],
          },
        ],
      },
      faqs: [
        {
          question: 'Šta ako nemam iskustva u stajanju ispred kamere?',
          answer:
            'Većina naših klijenata nikada ranije nije snimala video. Naš tim vas vodi kroz ceo proces pitanje po pitanje, tako da zvučite kao u razgovoru sa pacijentom.',
        },
        {
          question: 'Gde se snima video materijal?',
          answer:
            'Najbolji rezultati se postižu direktno u vašoj ordinaciji, jer to stvara autentičnost i poverenje. Po potrebi obezbeđujemo i studijski prostor.',
        },
        {
          question: 'Da li moram sam da pišem scenarije?',
          answer:
            'Ne. Mi pripremamo kompletne teze i skripte na osnovu intervjua sa vama i analize pretraga vaših pacijenata.',
        },
      ],
      cta: {
        heading: 'Želite video sadržaj koji gradi autoritet?',
        description:
          'Zakažite razgovor sa našim video timom i saznajte koje teme u vašoj specijalnosti imaju najveći potencijal.',
        button: 'Zakažite besplatne konsultacije',
      },
    },
    'marketing-automation': {
      slug: 'marketing-automation',
      serviceType: 'Marketing kampanje i automatizacija procesa',
      badge: 'Marketing & Automatizacija',
      title: 'Marketing i automatizacija za prakse | VDigital',
      metaTitle: 'Marketing i automatizacija za prakse | VDigital',
      metaDescription:
        'Plaćene Google i Meta reklame, automatizacija email i SMS poruka i CRM sistemi za privatne lekarske ordinacije i koučeve. Skalabilan priliv novih klijenata.',
      h1: 'Marketing i automatizacija za doktore i privatne prakse',
      lead:
        'Gradimo automatizovane marketinške levke (funnels) koji dovode kvalifikovane pacijente i eliminišu manuelni rad vašeg osoblja.',
      stats: [
        { value: '3x', label: 'Prosečno povećanje konverzije posetilaca' },
        { value: '24/7', label: 'Automatizovan odgovor na upite pacijenata' },
        { value: '0%', label: 'Zaboravljenih termina uz SMS podsetnike' },
      ],
      problem: {
        heading: 'Gde privatne prakse gube novac u marketingu?',
        description:
          'Novac uložen u reklame često propada jer ordinacija nema sistem koji brzo preuzima upit i vodi pacijenta do dolaska na pregled.',
        points: [
          {
            title: 'Spor odgovor na upite',
            text:
              'Ako pacijent pošalje upit u 21h, a odgovor dobije sutra u podne, u 70% slučajeva je već zakazao kod konkurenta koji mu se javio odmah.',
          },
          {
            title: 'Reklame bez preciznog ciljanja',
            text:
              'Trošenje budžeta na opšte fraze dovodi publiku koja traži besplatne savete, a ne pacijente spremne da plate kvalitetan zahvat ili tretman.',
          },
          {
            title: 'Nedolazak pacijenata na zakazani termin (No-shows)',
            text:
              'Prazan termin u rasporedu je direktan gubitak. Bez automatizovanih podsetnika putem SMS-a i WhatsApp-a, stopa nedolazaka dostiže 25%.',
          },
        ],
      },
      deliverables: {
        heading: 'Šta sadrži kompletan sistem automatizacije?',
        description:
          'Povezujemo oglašavanje, obradu kontakata i zadržavanje pacijenata u jedinstvenu celinu.',
        items: [
          {
            title: 'Ciljane Google Ads i Meta kampanje',
            text:
              'Prikazujemo vaše usluge ljudima koji aktivno traže rešenje za svoj zdravstveni ili estetski problem u vašoj regiji.',
          },
          {
            title: 'Automatizovani SMS i WhatsApp podsetnici',
            text:
              'Sistem automatski šalje potvrdu zakazanog pregleda, podsetnik 24h pre termina i uputstvo za dolazak, smanjujući no-show stopu na minimum.',
          },
          {
            title: 'CRM postavka za praćenje pacijenata',
            text:
              'Centralizovan pregled svih pristiglih upita po fazama: novi upit, zakazano, obavljen pregled, kontrola.',
          },
          {
            title: 'Sakupljanje Google recenzija nakon pregleda',
            text:
              'Automatizovan zahtev zadovoljnim pacijentima da ostave ocenu na Google profilu ordinacije, što drastično diže lokalni SEO rang.',
          },
        ],
      },
      process: {
        heading: 'Implementacija sistema u 3 faze',
        description:
          'Brza i bezbedna integracija sa vašim postojećim načinom rada bez ometanja svakodnevne ordinacijske rutine.',
        steps: [
          {
            step: '01',
            title: 'Mapiranje toka pacijenta',
            duration: '1. nedelja',
            text:
              'Analiziramo kako pacijent dolazi do vas, gde nastaju zastoji i koji kanali donose najprofitabilnije usluge.',
          },
          {
            step: '02',
            title: 'Podešavanje automatizacija i alata',
            duration: '2. nedelja',
            text:
              'Postavljamo email/SMS sekvence, povezujemo web sajt sa CRM-om i testiramo sve scenarije komunikacije.',
          },
          {
            step: '03',
            title: 'Pokretanje kampanja i optimizacija',
            duration: '3. nedelja',
            text:
              'Puštamo oglasne kampanje, pratimo cenu po zakazanom pregledu i fino podešavamo poruke za maksimalan povrat investicije.',
          },
        ],
      },
      pricingModels: {
        heading: 'Modeli saradnje za marketing i automatizaciju',
        description:
          'Strukturisane opcije prema fazi rasta vaše ordinacije i marketinškom budžetu.',
        models: [
          {
            title: 'Kompletna postavka sistema (One-off Setup)',
            subtitle: 'Za prakse sa sopstvenim timom za prijem upita',
            description:
              'Konfigurišemo celokupnu infrastrukturu: CRM, SMS/email automatizacije, obrasce na sajtu i predajemo vam sistem uz detaljnu obuku osoblja.',
            highlights: ['Jednokratna investicija', 'Trajno vlasništvo', 'Obuka vašeg tima'],
          },
          {
            title: 'Upravljanje kampanjama i optimizacija (Mesečni retainer)',
            subtitle: 'Za kontinuiran dotok novih pacijenata',
            description:
              'Stalno vođenje i optimizacija Google i Meta kampanja, A/B testiranje odredišnih stranica i nedeljni izveštaji o broju zakazanih pregleda.',
            highlights: ['Aktivno upravljanje budžetom', 'A/B testiranje', 'Transparentni izveštaji'],
          },
          {
            title: 'Performans model (Podela rizika)',
            subtitle: 'Za specifične visoko-tarifatne medicinske procedure',
            description:
              'Rad baziran na broju realizovanih pregleda ili novih pacijenata, uz prethodnu analizu kapaciteta ordinacije.',
            highlights: ['Plaćanje po rezultatu', 'Direktno uvezani interesi', 'Stroga selekcija partnera'],
          },
        ],
      },
      faqs: [
        {
          question: 'Koji budžet za oglašavanje je potreban na početku?',
          answer:
            'Za lokalno oglašavanje u Srbiji optimalan početni budžet za medije kreće se od 300 do 600 evra mesečno, što omogućava dovoljno podataka za optimizaciju.',
        },
        {
          question: 'Da li je automatizacija komplikovana za moje medicinske sestre?',
          answer:
            'Ne. Sistem je dizajniran da smanji njihov rad — umesto da ručno zovu pacijente i šalju poruke, sistem radi u pozadini, a one vide samo jasan kalendar.',
        },
        {
          question: 'Koliko brzo se vide prvi rezultati?',
          answer:
            'Nakon lansiranja kampanja i automatizacija u trećoj nedelji, prvi upiti i zakazivanja obično stižu već u prvih 48 do 72 sata.',
        },
      ],
      cta: {
        heading: 'Želite automatizovan sistem koji puni raspored?',
        description:
          'Zakažite razgovor i saznajte kako marketing automatizacija može rasteretiti vašu ordinaciju i doneti predvidiv rast.',
        button: 'Zakažite analizu ordinacije',
      },
    },
    'cold-calling': {
      slug: 'cold-calling',
      serviceType: 'Direktna prodaja i B2B akvizicija',
      badge: 'B2B Prodaja & Akvizicija',
      title: 'B2B prodaja i akvizicija klijenata | VDigital',
      metaTitle: 'B2B prodaja i akvizicija klijenata | VDigital',
      metaDescription:
        'Direktna prodaja, B2B hladni pozivi i personalizovani outreach za koučeve, edukatore i specijalizovane medicinske klinike. Popunjavamo kalendar kvalifikovanim sastancima.',
      h1: 'Direktna prodaja i hladni pozivi za edukacije i koučeve',
      lead:
        'Preuzimamo kompletan proces direktne komunikacije, telefonskih poziva i zakazivanja sastanaka sa premijum klijentima i korporativnim kupcima.',
      stats: [
        { value: '1 na 1', label: 'Personalizovan pristup bez spama' },
        { value: '15-25%', label: 'Stopa zakazanih sastanaka na ciljanim listama' },
        { value: 'Kvalifikovani', label: 'Razgovarate samo sa klijentima koji imaju budžet' },
      ],
      problem: {
        heading: 'Zašto masovne poruke i generički outreach propadaju?',
        description:
          'Automatizovane bot poruke na LinkedInu i generički cold emailovi danas završavaju u spamu i narušavaju reputaciju ozbiljnih edukatora i stručnjaka.',
        points: [
          {
            title: 'Svi prepoznaju šablonski spam',
            text:
              'Kada donosilac odluka dobije poruku očigledno poslatu na još hiljadu adresa, odmah je briše. Potrebno je prethodno istraživanje svake kompanije.',
          },
          {
            title: 'Strah od telefonskih poziva i manjak vremena',
            text:
              'Edukatori i koučevi su eksperti u svojoj oblasti, a ne prodavci. Ne žele da provode dane pozivajući hladne kontakte.',
          },
          {
            title: 'Sastanci sa nekvalifikovanim ljudima',
            text:
              'Trošenje 45 minuta na razgovor sa nekim ko nema budžet za vaš koučing program ili edukaciju je najbrži put do iscrpljenosti.',
          },
        ],
      },
      deliverables: {
        heading: 'Šta obuhvata naša usluga direktne prodaje?',
        description:
          'Iskusan prodajni tim koji zastupa vaš brend profesionalno, etički i sa fokusom na visokokvalitetne sastanke.',
        items: [
          {
            title: 'Kreiranje visoko-precizne baze kontakata',
            text:
              'Ručno pronalazimo i verifikujemo donosioce odluka u kompanijama ili pojedince koji savršeno odgovaraju vašem profilu idealnog kupca.',
          },
          {
            title: 'Priprema personalizovanih prodajnih scenarija',
            text:
              'Pisanje razgovornih skripti i email sekvenci koje komuniciraju vrednost bez agresivnog pritiska.',
          },
          {
            title: 'Direktni telefonski pozivi i kvalifikacija',
            text:
              'Naš obučeni prodajni predstavnik poziva kontakte, kvalifikuje njihove potrebe i direktno upisuje termin u vaš kalendar.',
          },
          {
            title: 'Nedeljni izveštaji i analiza prigovora',
            text:
              'Detaljan uvid u razloge zašto pojedini kontakti odbijaju, što vam daje dragocene podatke za unapređenje same ponude.',
          },
        ],
      },
      process: {
        heading: 'Kako izgleda proces akvizicije',
        description:
          'Transparentni koraci koji vaš raspored pune sastancima sa zainteresovanim kupcima.',
        steps: [
          {
            step: '01',
            title: 'Definisanje ponude i idealnog klijenta',
            duration: '1. nedelja',
            text:
              'Definišemo ključne benefite vaše edukacije ili programa i kriterijume koje kontakt mora da zadovolji pre nego što zakažemo sastanak.',
          },
          {
            step: '02',
            title: 'Kreiranje baze i test faza',
            duration: '2. nedelja',
            text:
              'Generišemo prvu listu od 100 do 200 ciljanih kontakata, testiramo skripte i merimo stopu odgovora.',
          },
          {
            step: '03',
            title: 'Pun kapacitet poziva i punjenje kalendara',
            duration: 'Od 3. nedelje',
            text:
              'Skaliramo broj poziva, a vi se fokusirate isključivo na vođenje prodajnih razgovora sa ljudima koji vas već čekaju.',
          },
        ],
      },
      pricingModels: {
        heading: 'Modeli saradnje za direktnu prodaju',
        description:
          'Jasne opcije prilagođene ceni vašeg programa i željenoj brzini rasta.',
        models: [
          {
            title: 'Retainer + Bonus po zakazanom sastanku',
            subtitle: 'Balansirana raspodela rizika i nagrade',
            description:
              'Mesečna baza koja pokriva pripremu lista i sate rada prodajnog predstavnika, uz bonus za svaki kvalifikovan i održan sastanak.',
            highlights: ['Posvećen prodajni agent', 'Verifikovane liste', 'Motivacija za rezultat'],
          },
          {
            title: 'Čist provizijski model (Commission-only)',
            subtitle: 'Za verifikovane programe sa visokom cenom (High-Ticket)',
            description:
              'Dostupno isključivo za edukacije i programe sa dokazanom prodajnom istorijom i cenom iznad 2.000 evra po klijentu.',
            highlights: ['Nula početnog troška', 'Plaćanje isključivo od realizacije', 'Stroga selekcija'],
          },
          {
            title: 'Postavka i obuka internog prodavca',
            subtitle: 'Za klinike i akademije koje žele sopstveni tim',
            description:
              'Pomažemo vam da zaposlite, obučite i opremite prodajnog predstavnika skriptama i CRM procedurama za dugoročnu samostalnost.',
            highlights: ['Stalna interna imovina', 'Standardizovani procesi', 'Kompletni priručnici'],
          },
        ],
      },
      faqs: [
        {
          question: 'Da li hladni pozivi mogu narušiti moj ugled?',
          answer:
            'Ne, jer ne radimo agresivnu prodaju. Naš ton je profesionalan, edukativan i konsultativan. Zovemo isključivo relevantne osobe i poštujemo njihovo vreme.',
        },
        {
          question: 'Koliko sastanaka mogu da očekujem mesečno?',
          answer:
            'U zavisnosti od tržišne niše i atraktivnosti vaše ponude, na mesečnom nivou generišemo između 15 i 35 kvalifikovanih sastanaka.',
        },
        {
          question: 'Šta se dešava ako se klijent ne pojavi na zakazanom sastanku?',
          answer:
            'Za nepojavljene termine ne naplaćujemo bonus, i naš tim odmah kontaktira osobu kako bi ponudio alternativni termin.',
        },
      ],
      cta: {
        heading: 'Želite pun kalendar sastanaka sa premijum klijentima?',
        description:
          'Zakažite strateški poziv i saznajte da li je vaša ponuda pogodna za naš sistem direktne akvizicije.',
        button: 'Zakažite strateški poziv',
      },
    },
  },
  en: {
    'web-development': {
      slug: 'web-development',
      serviceType: 'Web Development & Custom Digital Applications',
      badge: 'Web Development & Design',
      title: 'Web Development for Doctors & Coaches | VDigital',
      metaTitle: 'Web Development for Doctors & Coaches | VDigital',
      metaDescription:
        'High-performance custom websites for medical practices, clinics, and health coaches. Seamless online booking, mobile-first design, and medical SEO.',
      h1: 'Web Development for Doctors and Health Coaches',
      lead:
        'We build modern, blazing-fast, and patient-centered websites that establish medical authority, communicate trust, and convert visitors into confirmed appointments.',
      stats: [
        { value: '3 Weeks', label: 'Full delivery from concept to live deployment' },
        { value: '100/100', label: 'Mobile performance and Core Web Vitals' },
        { value: '100%', label: 'Tailored for healthcare compliance & privacy' },
      ],
      problem: {
        heading: 'Why Generic Agency Websites Fail Medical Practitioners',
        description:
          'Most agencies rely on bloated WordPress templates loaded with vulnerable plugins. They simply do not understand patient psychology or healthcare workflows.',
        points: [
          {
            title: 'Lack of Instant Clinical Trust',
            text:
              'Patients seeking medical or wellness advice scrutinize credentials, cleanliness, and professionalism. Cluttered, outdated websites cause immediate abandonment.',
          },
          {
            title: 'Friction-Heavy Booking Workflows',
            text:
              'If a patient has to hunt for a phone number or fill out an intrusive 10-field form, they click back to Google and book with a competing clinic.',
          },
          {
            title: 'Slow Mobile Loading Times',
            text:
              'Over 75% of healthcare searches occur on smartphones. A website taking more than 2.5 seconds to load loses prospective patients before they even see your treatments.',
          },
        ],
      },
      deliverables: {
        heading: "What's Included in Your Complete Web System?",
        description:
          'A complete turnkey web application engineered specifically for the operational and commercial realities of modern private healthcare and coaching.',
        items: [
          {
            title: 'Custom Brand-Aligned Visual Design',
            text:
              'Distinctive typography, color harmony, and layouts tailored to your medical specialty — zero pre-made off-the-shelf templates.',
          },
          {
            title: 'Seamless Online Booking & Calendar Sync',
            text:
              'Direct integration with Google Calendar, Cal.com, or custom booking pipelines with automatic email and SMS appointment confirmations.',
          },
          {
            title: 'Patient-Friendly Clinical Copywriting',
            text:
              'We structure complex medical terminology into clear, accessible, and ethical explanations that reassure anxious patients.',
          },
          {
            title: 'Local Healthcare SEO & Schema.org',
            text:
              'MedicalBusiness structured data, Google Maps readiness, and local search engine indexing for high visibility in your metropolitan area.',
          },
          {
            title: 'Strict Privacy & Regulatory Compliance',
            text:
              'Zero non-essential tracker cookies loaded before consent (Google Consent Mode v2), compliant privacy documentation, and SSL encryption.',
          },
          {
            title: 'Sub-Second Global Edge Hosting',
            text:
              'Modern React & Tailwind architecture deployed to global edge CDNs for lightning-fast responsiveness on every mobile device.',
          },
        ],
      },
      process: {
        heading: 'Our 3-Week Delivery Sprint',
        description:
          'A rigorous, transparent process that respects your clinical schedule while delivering a world-class digital flagship.',
        steps: [
          {
            step: '01',
            title: 'Clinical Strategy & Architecture',
            duration: 'Week 1',
            text:
              'We define your primary treatment categories, profile your ideal patients, write conversion copy, and produce interactive wireframes.',
          },
          {
            step: '02',
            title: 'Full-Stack Development & Integrations',
            duration: 'Week 2',
            text:
              'We engineer responsive layouts, wire up the interactive scheduling pipeline, optimize all image assets, and test across 20+ mobile screens.',
          },
          {
            step: '03',
            title: 'Analytics, Quality Assurance & Handover',
            duration: 'Week 3',
            text:
              'We configure analytics tracking, test edge deployments, verify Schema.org structured data, and launch your site on your primary domain.',
          },
        ],
      },
      pricingModels: {
        heading: 'Transparent Pricing & Engagement Models',
        description:
          'Predictable models designed around your practice stage, with no surprises or lock-ins.',
        models: [
          {
            title: 'Turnkey 3-Week Sprint (Fixed Price)',
            subtitle: 'Best for established clinics and solo practitioners',
            description:
              'Clear deliverables, a guaranteed 3-week timeline, and a fixed investment split into milestone payments. Complete ownership of code and assets.',
            highlights: ['Guaranteed delivery date', 'Fixed predictable budget', '100% code ownership'],
          },
          {
            title: 'Revenue Share Partnership',
            subtitle: 'For qualified high-ticket practitioners and educators',
            description:
              'A reduced upfront setup fee paired with a performance-based percentage from qualified patient leads generated by the new digital system.',
            highlights: ['Aligned growth incentives', 'Lower upfront barrier', 'Long-term engineering support'],
          },
          {
            title: 'Hybrid Growth (Build + Monthly Retainer)',
            subtitle: 'For clinics demanding continuous SEO and technical oversight',
            description:
              'Sprint deployment combined with an ongoing monthly retainer for SEO content publication, performance monitoring, and booking optimizations.',
            highlights: ['Continuous local SEO', 'Technical updates & backups', 'Conversion rate optimization'],
          },
        ],
      },
      faqs: [
        {
          question: 'How much time do I need to invest during the 3 weeks?',
          answer:
            'Approximately 2 to 3 hours total. We conduct one strategic intake call, and you review drafts at two key checkpoints. We handle all writing, coding, and setup.',
        },
        {
          question: 'Do I own the source code and domain?',
          answer:
            'Yes. You retain full 100% intellectual property ownership of the source code, content, domain, and accounts. There are zero proprietary vendor lock-ins.',
        },
        {
          question: 'Can you migrate my existing website and patient testimonials?',
          answer:
            'Absolutely. We preserve your existing domain authority, redirect older URLs to prevent broken links, and re-format your clinical credentials and patient reviews.',
        },
      ],
      cta: {
        heading: 'Ready for a website that converts visitors into patients?',
        description:
          'Book a free 30-minute discovery call. We will review your current online presence and provide a clear roadmap.',
        button: 'Book a Free Consultation',
      },
    },
    'video-social-media': {
      slug: 'video-social-media',
      serviceType: 'Short-Form Video Production & Healthcare Social Media',
      badge: 'Video & Social Media',
      title: 'Video & Social Media for Doctors | VDigital',
      metaTitle: 'Video & Social Media for Doctors | VDigital',
      metaDescription:
        'Engaging short-form video production (Reels, TikTok, Shorts) and ethical social media management for medical doctors and wellness coaches.',
      h1: 'Video Production & Social Media for Doctors and Coaches',
      lead:
        'We help medical professionals build commanding authority on modern social channels with patient-educating short-form video content.',
      stats: [
        { value: '30-45s', label: 'Ideal retention length for short-form video' },
        { value: '1 Session', label: 'Produces an entire month of 12-16 videos' },
        { value: '100% Ethical', label: 'Fully compliant with medical advertising codes' },
      ],
      problem: {
        heading: 'Why Typical Social Media Tactics Damage Doctor Reputations',
        description:
          'Standard marketing agencies treat clinics like retail stores, pushing cringe trends and generic graphics that erode professional authority.',
        points: [
          {
            title: 'Trivializing Clinical Knowledge',
            text:
              'Dancing and meme formats do not build confidence for complex surgical or therapeutic procedures. Patients need clarity, empathy, and evidence.',
          },
          {
            title: 'Exhausting Doctor Time Constraints',
            text:
              'Physicians cannot waste hours filming daily TikToks. Without a systematic recording process, social media becomes an unsustainable chore.',
          },
          {
            title: 'Views That Never Convert into Patients',
            text:
              'Viral view counts mean nothing if viewers live thousands of miles away and have no streamlined way to book a clinical consultation.',
          },
        ],
      },
      deliverables: {
        heading: 'Our End-to-End Video Production Package',
        description:
          'A done-for-you system where you speak on camera for just 2 hours a month, while our team handles scripting, editing, and distribution.',
        items: [
          {
            title: 'Clinical Scripting & Topic Research',
            text:
              'We uncover the exact questions and anxieties your prospective patients search for, crafting natural, bulleted speaking outlines.',
          },
          {
            title: 'Dynamic Editing & Synchronized Subtitles',
            text:
              'Color grading, pacing cuts, medical motion graphics, and bold subtitles tailored for the 80% of viewers watching with audio muted.',
          },
          {
            title: 'Multi-Platform Distribution',
            text:
              'Finished assets formatted with custom thumbnails, descriptions, and hashtags for Instagram Reels, YouTube Shorts, and TikTok.',
          },
          {
            title: 'Inquiry Conversion Funnel',
            text:
              'Connecting profile bios and automated message triggers directly into your booking system to convert passive viewers into clinic inquiries.',
          },
        ],
      },
      process: {
        heading: 'The Monthly Content Production Rhythm',
        description:
          'Engineered for maximum physician efficiency with zero creative fatigue.',
        steps: [
          {
            step: '01',
            title: 'Topic Strategy & Briefs',
            duration: 'Days 1–3',
            text:
              'We deliver 12 to 16 targeted treatment briefs designed to showcase your expertise in high-margin clinical procedures.',
          },
          {
            step: '02',
            title: 'The Monthly Filming Block',
            duration: '2 Hours',
            text:
              'A guided remote or on-site shoot where our director coaches your delivery so you sound authoritative, warm, and natural.',
          },
          {
            step: '03',
            title: 'Post-Production & Publishing',
            duration: 'Rolling',
            text:
              'We deliver polished cuts for your approval and schedule publication across all relevant social channels throughout the month.',
          },
        ],
      },
      pricingModels: {
        heading: 'Engagement Models for Healthcare Video',
        description:
          'Scalable packages matching your geographic reach and growth ambitions.',
        models: [
          {
            title: 'Monthly Authority Retainer',
            subtitle: '12 to 16 professional short-form videos per month',
            description:
              'Complete research, scripting assistance, professional post-production, and multi-channel publication management on a recurring monthly plan.',
            highlights: ['Consistent organic presence', 'Zero filming burnout', 'Monthly performance reviews'],
          },
          {
            title: 'Amplified Local Reach (Video + Paid Ads)',
            subtitle: 'Target prospective patients in your immediate city',
            description:
              'We take your best-performing educational videos and amplify them directly to demographic groups within a 20-mile radius of your clinic.',
            highlights: ['Geographic targeting', 'Measurable cost per patient inquiry', 'Immediate reach'],
          },
          {
            title: 'Signature Video Course & Masterclass',
            subtitle: 'For health coaches and doctors monetizing education',
            description:
              'Full studio production of long-form modules, slides, and learning materials for online patient education or practitioner academies.',
            highlights: ['High-end production value', 'Curriculum structuring', 'Learning platform setup'],
          },
        ],
      },
      faqs: [
        {
          question: 'What if I am uncomfortable speaking on camera?',
          answer:
            'Most physicians feel awkward on their first take. Our interview-style coaching feels like answering a patient question in your office, eliminating camera anxiety.',
        },
        {
          question: 'Where does the recording take place?',
          answer:
            'Filming in your clinic or private office yields the highest trust. We provide clear lighting and audio guidance for remote shoots or provide on-location crews.',
        },
        {
          question: 'Will the content comply with medical advertising regulations?',
          answer:
            'Yes. We avoid misleading guarantees, maintain ethical disclaimers, and focus on evidence-based health education that enhances your professional standing.',
        },
      ],
      cta: {
        heading: 'Establish undisputed medical authority in your city',
        description:
          'Schedule a call with our creative team to discover which clinical topics hold the highest conversion potential for your specialty.',
        button: 'Schedule a Video Strategy Call',
      },
    },
    'marketing-automation': {
      slug: 'marketing-automation',
      serviceType: 'Performance Advertising & Practice Workflow Automation',
      badge: 'Marketing & Automation',
      title: 'Marketing & Automation for Practices | VDigital',
      metaTitle: 'Marketing & Automation for Practices | VDigital',
      metaDescription:
        'Targeted Google & Meta advertising, automated SMS/email reminders, and CRM pipelines for medical practices and health coaches. Predictable patient growth.',
      h1: 'Marketing & Workflow Automation for Doctors and Coaches',
      lead:
        'We build automated acquisition and retention systems that capture high-intent patients and eliminate repetitive administrative overhead.',
      stats: [
        { value: '3x', label: 'Average lift in consultation conversion rate' },
        { value: '24/7', label: 'Instant response time for patient inquiries' },
        { value: '<5%', label: 'Appointment no-show rate with automated SMS' },
      ],
      problem: {
        heading: 'Where Medical Practices Bleed Revenue',
        description:
          'Running ads without automated follow-up leaks revenue at every stage of the patient inquiry journey.',
        points: [
          {
            title: 'Delayed Inquiry Responses',
            text:
              'When an anxious patient submits an inquiry after hours and waits 18 hours for an email reply, they have already booked with a responsive competitor.',
          },
          {
            title: 'Broad, Unfocused Ad Spending',
            text:
              'Spending money on broad search terms attracts casual browsers rather than patients prepared to pay for high-value treatments.',
          },
          {
            title: 'High No-Show and Cancellation Rates',
            text:
              'Empty slots in your clinical calendar are unrecoverable losses. Without automated two-way SMS confirmations, no-show rates hover near 25%.',
          },
        ],
      },
      deliverables: {
        heading: 'The Complete Healthcare Growth Engine',
        description:
          'Unifying targeted advertising, immediate lead qualification, and automated patient relationship management.',
        items: [
          {
            title: 'High-Intent Google & Meta Ad Campaigns',
            text:
              'Displaying your treatments exclusively to people actively searching for medical solutions within your geographic market.',
          },
          {
            title: 'Automated Two-Way SMS & WhatsApp Reminders',
            text:
              'Automated appointment confirmations, 24-hour pre-visit alerts, and directions that drop no-show rates to near zero.',
          },
          {
            title: 'Centralized Patient Pipeline CRM',
            text:
              'A unified dashboard tracking every patient stage: New Inquiry, Call Scheduled, Consultation Completed, and Treatment Started.',
          },
          {
            title: 'Automated 5-Star Google Review Engine',
            text:
              'Polite, automated prompts sent to satisfied patients post-treatment to consistently build five-star reviews on your Google Business Profile.',
          },
        ],
      },
      process: {
        heading: '3-Stage System Implementation',
        description:
          'Seamless integration into your front-desk workflow without disrupting ongoing patient care.',
        steps: [
          {
            step: '01',
            title: 'Patient Journey Mapping',
            duration: 'Week 1',
            text:
              'We examine your intake bottlenecks, identify your most profitable treatments, and map out the ideal automated communication flow.',
          },
          {
            step: '02',
            title: 'Automation & Pipeline Buildout',
            duration: 'Week 2',
            text:
              'We configure CRM pipelines, integrate website forms, draft compliance-ready SMS/email templates, and rigorously test every workflow.',
          },
          {
            step: '03',
            title: 'Campaign Activation & Optimization',
            duration: 'Week 3',
            text:
              'We launch targeted campaigns, monitor cost-per-scheduled-consultation, and fine-tune ad messaging for maximum return on ad spend.',
          },
        ],
      },
      pricingModels: {
        heading: 'Partnership Models for Practice Growth',
        description:
          'Tailored to your clinical capacity and existing administrative team.',
        models: [
          {
            title: 'Turnkey System Setup (One-Off)',
            subtitle: 'For clinics with an existing front desk team',
            description:
              'We build the entire automated CRM, appointment confirmation, and review collection system, followed by thorough staff training.',
            highlights: ['One-time investment', 'Permanent asset', 'Full staff documentation'],
          },
          {
            title: 'Managed Growth Retainer',
            subtitle: 'For ongoing advertising management and optimization',
            description:
              'Complete ongoing management of Google & Meta ads, monthly landing page optimizations, and weekly conversion metrics reporting.',
            highlights: ['Active ad budget management', 'A/B landing page testing', 'Transparent ROI reporting'],
          },
          {
            title: 'Performance-Shared Growth',
            subtitle: 'For specific high-ticket medical specialties',
            description:
              'Compensation structured around realized consultations and patient starts, following strict capacity and qualification audits.',
            highlights: ['Aligned upside', 'Strict patient qualification', 'Selective partner criteria'],
          },
        ],
      },
      faqs: [
        {
          question: 'What monthly ad budget do we need to begin?',
          answer:
            'For local clinical campaigns, we typically recommend starting with $600 to $1,200 per month in direct ad spend to acquire statistically meaningful patient data.',
        },
        {
          question: 'Will our front-desk staff be overwhelmed by new software?',
          answer:
            'No. The automation handles the repetitive tasks behind the scenes. Your staff simply interacts with a clear daily appointment calendar.',
        },
        {
          question: 'How quickly do new patient inquiries start arriving?',
          answer:
            'Once ad campaigns and automations go live in week 3, qualified inquiries typically begin landing in your CRM within 48 to 72 hours.',
        },
      ],
      cta: {
        heading: 'Automate your patient acquisition pipeline',
        description:
          'Book an architectural call to see how smart automation can free your staff from manual follow-ups and pack your consultation calendar.',
        button: 'Request a Practice Audit',
      },
    },
    'cold-calling': {
      slug: 'cold-calling',
      serviceType: 'B2B Sales Outreach & Executive Calling',
      badge: 'B2B Sales & Outreach',
      title: 'B2B Outreach & Calling for Coaches | VDigital',
      metaTitle: 'B2B Outreach & Calling for Coaches | VDigital',
      metaDescription:
        'Direct executive calling, personalized B2B outreach, and appointment setting for leadership coaches, wellness educators, and specialized healthcare clinics.',
      h1: 'Direct Sales & Cold Outreach for Coaches and Educators',
      lead:
        'We manage personalized outreach and phone representation to secure qualified appointments with high-value clients and corporate decision-makers.',
      stats: [
        { value: '1-on-1', label: 'Bespoke research per target decision-maker' },
        { value: '15-25%', label: 'Appointment booking rate on qualified lists' },
        { value: 'Qualified', label: 'You only meet buyers with confirmed budget' },
      ],
      problem: {
        heading: 'Why Generic Mass Email Outreach Is Dead',
        description:
          'Automated bot messages on LinkedIn and blast cold emails now land directly in spam folders, destroying the credibility of high-end educators.',
        points: [
          {
            title: 'Immediate Recognition of Template Spam',
            text:
              'Corporate buyers delete generic pitches in seconds. High-ticket contracts require thoughtful, bespoke research into the target company.',
          },
          {
            title: 'Discomfort With Cold Telephone Outreach',
            text:
              'Coaches and clinical specialists are educators, not telemarketers. Spending hours prospecting on the phone leads directly to burnout.',
          },
          {
            title: 'Wasting Hours with Unqualified Prospects',
            text:
              'Spending 45 minutes on a discovery call only to discover the prospect lacks budget drains time away from paying clients.',
          },
        ],
      },
      deliverables: {
        heading: 'What Our Dedicated Sales Representation Delivers',
        description:
          'An articulate, trained sales team acting as professional brand ambassadors to book confirmed meetings in your calendar.',
        items: [
          {
            title: 'Laser-Targeted Decision-Maker Databases',
            text:
              'We hand-curate and verify senior executives, HR directors, or corporate leaders that match your exact Ideal Client Profile.',
          },
          {
            title: 'Consultative Value-First Call Scripts',
            text:
              'Custom conversational scripts designed to uncover executive pain points without aggressive or spammy sales tactics.',
          },
          {
            title: 'Direct Phone Calling & Discovery Qualification',
            text:
              'Our sales specialists conduct direct phone conversations, qualify budget and timeline, and schedule appointments on your calendar.',
          },
          {
            title: 'Weekly Analytics & Market Intelligence',
            text:
              'Granular insights into common corporate objections, giving you invaluable feedback to continually sharpen your program pricing and positioning.',
          },
        ],
      },
      process: {
        heading: 'The 3-Step Client Acquisition Process',
        description:
          'A reliable system that populates your weekly calendar with qualified corporate and private buyers.',
        steps: [
          {
            step: '01',
            title: 'Offer & Target ICP Alignment',
            duration: 'Week 1',
            text:
              'We dissect your coaching program or clinical retainer, define strict buyer criteria, and write consultative scripts.',
          },
          {
            step: '02',
            title: 'Data Curation & Pilot Outreach',
            duration: 'Week 2',
            text:
              'We build a verified list of 150 target prospects, launch initial phone touches, and optimize talking points based on real feedback.',
          },
          {
            step: '03',
            title: 'Full-Scale Calling & Calendar Filling',
            duration: 'Week 3 Onward',
            text:
              'We scale daily outreach volume so you step into high-converting sales conversations with decision-makers who already know your value.',
          },
        ],
      },
      pricingModels: {
        heading: 'Engagement Models for Direct Sales',
        description:
          'Structured around your program price point and desired pace of growth.',
        models: [
          {
            title: 'Base Retainer + Performance Per Meeting',
            subtitle: 'Our most popular balanced model',
            description:
              'A monthly management fee covering prospect list building and dedicated caller hours, combined with an incentive fee for every qualified meeting held.',
            highlights: ['Dedicated caller hours', 'Verified bespoke lists', 'Aligned performance bonus'],
          },
          {
            title: 'Commission-Only Partnership',
            subtitle: 'For validated high-ticket offers ($2,500+)',
            description:
              'Available exclusively for established programs with proven sales conversion history and strong market reputation.',
            highlights: ['Zero upfront risk', 'Purely success-based', 'Selective intake process'],
          },
          {
            title: 'Internal Sales Playbook & Caller Training',
            subtitle: 'For academies building an in-house sales team',
            description:
              'We help you recruit, train, and equip your own in-house sales development representative with our proprietary scripts and CRM pipelines.',
            highlights: ['Permanent internal asset', 'Standardized phone scripts', 'Complete training manual'],
          },
        ],
      },
      faqs: [
        {
          question: 'Will cold calling hurt my professional brand image?',
          answer:
            'Never. Our approach is consultative and conversational. We treat every executive with dignity, respect their time, and represent your brand with polish.',
        },
        {
          question: 'How many qualified meetings can I expect each month?',
          answer:
            'Depending on your niche and offer clarity, our clients typically receive 15 to 30 highly qualified, pre-vetted discovery meetings every month.',
        },
        {
          question: 'What happens if a prospect cancels or no-shows?',
          answer:
            'No meeting fee is charged for no-shows, and our team immediately initiates friendly follow-up to reschedule the appointment.',
        },
      ],
      cta: {
        heading: 'Ready for a steady stream of corporate coaching clients?',
        description:
          'Schedule a strategy call to evaluate if your program is primed for our direct outreach system.',
        button: 'Schedule a Strategy Session',
      },
    },
  },
  ru: {
    'web-development': {
      slug: 'web-development',
      serviceType: 'Разработка сайтов и веб-приложений',
      badge: 'Веб-разработка и Дизайн',
      title: 'Создание сайтов для врачей | VDigital',
      metaTitle: 'Создание сайтов для врачей | VDigital',
      metaDescription:
        'Разработка современных и быстрых сайтов для врачей, частных клиник и health-коучей. Онлайн-запись пациентов, адаптивный дизайн и медицинское SEO.',
      h1: 'Создание сайтов для врачей и коучей',
      lead:
        'Создаём современные, быстрые и ориентированные на пациентов сайты, которые вызывают доверие и превращают посетителей в реальные записи на приём.',
      stats: [
        { value: '3 недели', label: 'Срок разработки от идеи до запуска' },
        { value: '100/100', label: 'Оценка производительности на смартфонах' },
        { value: '100%', label: 'Соответствие стандартам конфиденциальности' },
      ],
      problem: {
        heading: 'Почему шаблонные сайты не привлекают пациентов?',
        description:
          'Большинство агентств используют перегруженные шаблоны WordPress, которые медленно загружаются и не учитывают специфику частной медицины.',
        points: [
          {
            title: 'Недоверие с первого взгляда',
            text:
              'Пациенты ищут безопасность и экспертность. Устаревший или шаблонный сайт вызывает сомнения в квалификации врача.',
          },
          {
            title: 'Сложный процесс записи',
            text:
              'Если пациенту трудно найти телефон или нужно заполнять огромную анкету, он уходит к конкуренту с удобной онлайн-записью.',
          },
          {
            title: 'Медленная загрузка на телефонах',
            text:
              'Более 75% людей ищут врача со смартфона. Если сайт открывается дольше 2.5 секунд, большинство пользователей закрывают вкладку.',
          },
        ],
      },
      deliverables: {
        heading: 'Что входит в разработку сайта «под ключ»?',
        description:
          'Полноценная система, созданная с учётом практических потребностей клиники или эксперта.',
        items: [
          {
            title: 'Индивидуальный дизайн под ваш бренд',
            text:
              'Уникальная типографика и визуальный стиль, подчёркивающие вашу специализацию, без готовых типовых шаблонов.',
          },
          {
            title: 'Удобная онлайн-запись и интеграция с календарём',
            text:
              'Связка с Google Календарём, Cal.com или CRM с автоматическими уведомлениями на почту и в мессенджеры.',
          },
          {
            title: 'Медицинский копирайтинг',
            text:
              'Помогаем сформулировать описания услуг простым, понятным и этичным языком, без запутанной терминологии.',
          },
          {
            title: 'Медицинское SEO и микроразметка Schema.org',
            text:
              'Разметка MedicalBusiness, оптимизация под локальный поиск и индексация в поисковых системах Google и Яндекс.',
          },
          {
            title: 'Соответствие GDPR и законам о персональных данных',
            text:
              'Настроенное согласие на cookie (Google Consent Mode v2), прозрачная политика конфиденциальности и SSL-защита.',
          },
          {
            title: 'Молниеносная скорость на глобальном CDN',
            text:
              'Современный стек (React, Tailwind) с оптимизированным кодом и временем отклика страницы менее одной секунды.',
          },
        ],
      },
      process: {
        heading: 'Процесс разработки за 3 недели',
        description:
          'Чёткий и прозрачный спринт с минимальной нагрузкой на ваше расписание.',
        steps: [
          {
            step: '01',
            title: 'Стратегия и структура',
            duration: '1-я неделя',
            text:
              'Анализируем вашу аудиторию, формируем ключевые услуги, пишем тексты и согласовываем интерактивный прототип.',
          },
          {
            step: '02',
            title: 'Дизайн и программирование',
            duration: '2-я неделя',
            text:
              'Верстаем адаптивные страницы, подключаем форму записи, оптимизируем графику и тестируем отображение на всех устройствах.',
          },
          {
            step: '03',
            title: 'Аналитика и запуск сайта',
            duration: '3-я неделя',
            text:
              'Подключаем системы веб-аналитики, настраиваем микроразметку, привязываем домен и запускаем сайт в рабочий режим.',
          },
        ],
      },
      pricingModels: {
        heading: 'Модели сотрудничества',
        description:
          'Прозрачные условия без скрытых платежей и навязанных услуг.',
        models: [
          {
            title: 'Фиксированный проект (3-недельный спринт)',
            subtitle: 'Для клиник и экспертов, которым нужен готовый сайт в срок',
            description:
              'Чётко зафиксированный объём работ, гарантированный срок сдачи и оплата двумя частями (аванс и финальная сдача). Полная передача всех прав на код.',
            highlights: ['Точные сроки сдачи', 'Фиксированный бюджет', '100% владение кодом'],
          },
          {
            title: 'Партнёрство с разделением дохода (Revenue Share)',
            subtitle: 'Для масштабных проектов и онлайн-школ здоровья',
            description:
              'Сниженная стоимость разработки в обмен на процент от привлечённых через созданную систему клиентов.',
            highlights: ['Минимальные риски', 'Общая цель роста', 'Долгосрочная поддержка'],
          },
          {
            title: 'Гибридный формат (Разработка + Поддержка)',
            subtitle: 'Для постоянного роста позиций в поиске',
            description:
              'Создание сайта с последующим ежемесячным техническим сопровождением, публикацией статей и поисковой оптимизацией.',
            highlights: ['Постоянный контроль', 'Регулярные обновления', 'Рост в поиске'],
          },
        ],
      },
      faqs: [
        {
          question: 'Сколько времени мне нужно будет уделить разработке?',
          answer:
            'Около 2–3 часов за все 3 недели. Мы проводим одно установочное интервью, а затем вы утверждаете готовые этапы.',
        },
        {
          question: 'Буду ли я владельцем сайта после завершения?',
          answer:
            'Да. Все исходные файлы, домен и доступы к сервисам передаются вам в полное владение без каких-либо скрытых условий.',
        },
        {
          question: 'Что делать, если у меня уже есть старый сайт?',
          answer:
            'Мы сохраним ваш домен и существующие позиции в поисковиках, полностью обновив дизайн, скорость и удобство для пациентов.',
        },
      ],
      cta: {
        heading: 'Готовы к сайту, который стабильно приводит пациентов?',
        description:
          'Запишитесь на бесплатный 30-минутный разбор. Мы изучим ваше текущее присутствие в сети и предложим пошаговый план.',
        button: 'Записаться на консультацию',
      },
    },
    'video-social-media': {
      slug: 'video-social-media',
      serviceType: 'Видеопроизводство и ведение социальных сетей',
      badge: 'Видео и Соцсети',
      title: 'Видео и соцсети для врачей | VDigital',
      metaTitle: 'Видео и соцсети для врачей | VDigital',
      metaDescription:
        'Создание коротких экспертных видео (Reels, Shorts, TikTok) и ведение соцсетей для врачей и коучей. Построение личного бренда и привлечение пациентов.',
      h1: 'Создание видео и ведение соцсетей для врачей и коучей',
      lead:
        'Помогаем врачам и экспертам завоёвывать доверие в социальных сетях с помощью понятного, этичного и профессионального видеоконтента.',
      stats: [
        { value: '30-45 сек', label: 'Оптимальный хронометраж для вовлечения' },
        { value: '1 съёмка', label: 'Обеспечивает 12–16 видео на целый месяц' },
        { value: '100% этично', label: 'Строго в рамках врачебной этики' },
      ],
      problem: {
        heading: 'Почему стандартное ведение соцсетей не работает для врачей?',
        description:
          'Обычные SMM-агентства навязывают глупые тренды и танцы, которые вызывают недоумение у пациентов и разрушают репутацию врача.',
        points: [
          {
            title: 'Обесценивание экспертности',
            text:
              'Пациенты ищут авторитет и доказательную медицину, а не развлекательный шум. Нужен баланс доступного языка и профессионализма.',
          },
          {
            title: 'Дефицит времени у врача',
            text:
              'Врач не может тратить рабочие часы на монтаж и придумывание постов. Нужен отлаженный процесс: одна съёмка — готовый контент на месяц.',
          },
          {
            title: 'Просмотры без записей на приём',
            text:
              'Миллионные просмотры бесполезны, если в профиле нет понятной навигации и связки с сайтом для записи на консультацию.',
          },
        ],
      },
      deliverables: {
        heading: 'Что входит в видеопроизводство?',
        description:
          'Полный цикл: от выбора тем до публикации готовых роликов с субтитрами.',
        items: [
          {
            title: 'Сценарии и тезисы под запросы пациентов',
            text:
              'Изучаем реальные страхи и вопросы ваших пациентов и составляем комфортные тезисные планы для записи.',
          },
          {
            title: 'Динамичный монтаж и крупные субтитры',
            text:
              'Профессиональная цветокоррекция, вырезание пауз, визуальные акценты и чёткие субтитры (80% людей смотрят видео без звука).',
          },
          {
            title: 'Адаптация под Reels, Shorts и TikTok',
            text:
              'Форматирование с яркими обложками, цепляющими заголовками и правильными тегами для максимального органического охвата.',
          },
          {
            title: 'Воронка записи на консультацию',
            text:
              'Настройка ссылок в шапке профиля и интеграция с сайтом для быстрого перехода зрителей в категорию пациентов.',
          },
        ],
      },
      process: {
        heading: 'Ежемесячный цикл работы',
        description:
          'Минимум времени врача при стабильном присутствии в ленте.',
        steps: [
          {
            step: '01',
            title: 'Утверждение тем и сценариев',
            duration: '1–3 дня',
            text:
              'Подбираем 12–16 тем, раскрывающих ваши ключевые и наиболее маржинальные медицинские услуги.',
          },
          {
            step: '02',
            title: 'Съёмочный пул',
            duration: '2 часа',
            text:
              'В спокойном темпе записываем все ролики с суфлёром или наводящими вопросами нашего продюсера.',
          },
          {
            step: '03',
            title: 'Монтаж и публикации',
            duration: 'В течение месяца',
            text:
              'Высылаем ролики на согласование и ведём регулярный постинг по календарю наибольшей активности аудитории.',
          },
        ],
      },
      pricingModels: {
        heading: 'Варианты сотрудничества по видеоконтенту',
        description:
          'Гибкие пакеты под ваши цели в социальных сетях.',
        models: [
          {
            title: 'Ежемесячный пакет «Эксперт»',
            subtitle: '12–16 готовых коротких роликов в месяц',
            description:
              'Полный цикл сценариев, съёмки, монтажа и публикаций для стабильного притока пациентов из социальных сетей.',
            highlights: ['Регулярный контент', 'Без отвлечения от приёма', 'Ежемесячный отчёт'],
          },
          {
            title: 'Видео + Таргетированная реклама',
            subtitle: 'Охват аудитории в вашем городе',
            description:
              'Запуск лучших образовательных видео в рекламу на жителей вашего района или города для быстрого роста записи.',
            highlights: ['Локальный таргетинг', 'Прозрачная стоимость заявки', 'Быстрый эффект'],
          },
          {
            title: 'Запись онлайн-курсов и обучающих программ',
            subtitle: 'Для врачей и коучей с образовательными продуктами',
            description:
              'Профессиональная запись лекций, уроков и мастер-классов со студийным звуком и инфографикой.',
            highlights: ['Высокое качество', 'Учебная структура', 'Подготовка материалов'],
          },
        ],
      },
      faqs: [
        {
          question: 'Что делать, если я боюсь камеры?',
          answer:
            'Наш продюсер ведёт съёмку в формате диалога. Вы просто отвечаете на вопросы, как на обычном приёме с пациентом.',
        },
        {
          question: 'Где проходят съёмки?',
          answer:
            'Съёмка прямо в вашем кабинете выглядит наиболее естественно и вызывает максимальное доверие. Также возможна аренда студии.',
        },
        {
          question: 'Нужно ли мне заучивать текст наизусть?',
          answer:
            'Ни в коем случае. Мы пишем удобные тезисы, по которым вы говорите своими словами, сохраняя живую речь.',
        },
      ],
      cta: {
        heading: 'Постройте сильный личный бренд врача',
        description:
          'Обсудите с нашей командой темы, которые вызовут наибольший отклик у вашей целевой аудитории.',
        button: 'Записаться на разбор тем',
      },
    },
    'marketing-automation': {
      slug: 'marketing-automation',
      serviceType: 'Маркетинговые кампании и автоматизация клиники',
      badge: 'Маркетинг и Автоматизация',
      title: 'Маркетинг и автоматизация для врачей | VDigital',
      metaTitle: 'Маркетинг и автоматизация для врачей | VDigital',
      metaDescription:
        'Контекстная и таргетированная реклама, автоматические SMS и WhatsApp напоминания, внедрение CRM для врачей и частных клиник.',
      h1: 'Маркетинг и автоматизация для врачей и коучей',
      lead:
        'Создаём автоматизированные воронки привлечения пациентов и устраняем рутину администраторов клиники.',
      stats: [
        { value: '3x', label: 'Рост конверсии обращений в реальные визиты' },
        { value: '24/7', label: 'Мгновенные ответы на заявки пациентов' },
        { value: '<5%', label: 'Минимум пропущенных приёмов с SMS-напоминаниями' },
      ],
      problem: {
        heading: 'Где клиники теряют деньги на рекламе?',
        description:
          'Без автоматической обработки заявок и системы напоминаний бюджет на рекламу расходуется впустую.',
        points: [
          {
            title: 'Запоздалая реакция на заявку',
            text:
              'Если пациент оставил заявку вечером, а перезвонили ему только в полдень следующего дня, он уже записался в другую клинику.',
          },
          {
            title: 'Недоезды пациентов на приём',
            text:
              'Без системы напоминаний в мессенджерах до 25% пациентов забывают о времени консультации, оставляя врача без работы в этот час.',
          },
          {
            title: 'Реклама без точной аналитики',
            text:
              'Клиники часто не знают, какая именно кампания принесла реального пациента, а какая привела людей за бесплатными советами.',
          },
        ],
      },
      deliverables: {
        heading: 'Что включает система автоматизации?',
        description:
          'Объединение рекламы, приёма заявок и работы с постоянными пациентами в единый механизм.',
        items: [
          {
            title: 'Точная реклама в поиске и соцсетях',
            text:
              'Показываем ваши услуги людям, которые прямо сейчас ищут решение конкретной медицинской проблемы в вашем городе.',
          },
          {
            title: 'Автоматические напоминания в WhatsApp и SMS',
            text:
              'Подтверждение записи сразу после звонка, напоминание за сутки и схема проезда, снижающие процент неявок почти до нуля.',
          },
          {
            title: 'Настройка CRM для администраторов',
            text:
              'Наглядный интерфейс, где виден статус каждого пациента: новая заявка, записан, приём состоялся, повторный визит.',
          },
          {
            title: 'Автоматический сбор отзывов на картах',
            text:
              'Вежливый запрос отзыва довольному пациенту после приёма, что быстро выводит клинику в топ Google и Яндекс Карт.',
          },
        ],
      },
      process: {
        heading: 'Внедрение системы в 3 этапа',
        description:
          'Быстрый запуск без остановки текущей работы администраторов.',
        steps: [
          {
            step: '01',
            title: 'Аудит пути пациента',
            duration: '1-я неделя',
            text:
              'Разбираем, как пациенты обращаются к вам сейчас, выявляем узкие места и настраиваем воронку.',
          },
          {
            step: '02',
            title: 'Настройка CRM и сценариев связи',
            duration: '2-я неделя',
            text:
              'Прописываем тексты автоматических сообщений, подключаем формы на сайте и обучаем администраторов.',
          },
          {
            step: '03',
            title: 'Старт кампаний и аналитика',
            duration: '3-я неделя',
            text:
              'Запускаем рекламные кампании, контролируем стоимость привлечённого пациента и корректируем настройки.',
          },
        ],
      },
      pricingModels: {
        heading: 'Форматы сотрудничества',
        description:
          'Варианты под разные масштабы частной практики.',
        models: [
          {
            title: 'Внедрение системы «под ключ»',
            subtitle: 'Для клиник с собственным отделом приёма звонков',
            description:
              'Полная настройка CRM, сценариев сообщений, интеграции с сайтом и обучение персонала клиники.',
            highlights: ['Разовая оплата', 'Система остаётся у вас', 'Инструкции для персонала'],
          },
          {
            title: 'Ведение и оптимизация рекламы',
            subtitle: 'Для постоянного потока первичных пациентов',
            description:
              'Ежемесячное управление рекламными бюджетами, тестирование посадочных страниц и отчёты о стоимости записей.',
            highlights: ['Управление кампаниями', 'A/B тесты страниц', 'Прозрачная окупаемость'],
          },
          {
            title: 'Оплата за результат (Performance)',
            subtitle: 'Для высокомаржинальных медицинских направлений',
            description:
              'Формат с привязкой вознаграждения к числу проведённых консультаций после предварительного аудита.',
            highlights: ['Оплата за результат', 'Единая цель роста', 'Тщательный отбор клиник'],
          },
        ],
      },
      faqs: [
        {
          question: 'Какой рекламный бюджет потребуется на старте?',
          answer:
            'Для уверенного старта в крупном городе мы рекомендуем закладывать от $500–700 в месяц на прямые расходы рекламных систем.',
        },
        {
          question: 'Справятся ли наши администраторы с новой программой?',
          answer:
            'Да. Мы настраиваем максимально простой интерфейс и обучаем сотрудников, чтобы они тратили меньше времени на рутину.',
        },
        {
          question: 'Когда появятся первые пациенты?',
          answer:
            'После включения рекламы и цепочек на третьей неделе первые обращения обычно приходят в течение 2–3 дней.',
        },
      ],
      cta: {
        heading: 'Автоматизируйте поток пациентов в клинику',
        description:
          'Запишитесь на аудит, чтобы узнать, как автоматизация может избавить персонал от хаоса и заполнить расписание приёмов.',
        button: 'Записаться на аудит практики',
      },
    },
    'cold-calling': {
      slug: 'cold-calling',
      serviceType: 'B2B-продажи и прямой outreach',
      badge: 'B2B-Продажи и Outreach',
      title: 'Холодные звонки для коучей | VDigital',
      metaTitle: 'Холодные звонки для коучей | VDigital',
      metaDescription:
        'Прямые B2B-звонки, холодный аутрич и назначение встреч для коучей, экспертов и корпоративных тренеров. Заполняем календарь целевыми клиентами.',
      h1: 'Холодные звонки и привлечение клиентов для коучей и курсов',
      lead:
        'Берём на себя персонализированные телефонные переговоры и назначение встреч с платежеспособными клиентами и корпоративными заказчиками.',
      stats: [
        { value: '1 на 1', label: 'Индивидуальное изучение каждого контакта' },
        { value: '15-25%', label: 'Конверсия в назначенные встречи' },
        { value: 'Квалификация', label: 'Вы общаетесь только с теми, у кого есть бюджет' },
      ],
      problem: {
        heading: 'Почему массовые рассылки больше не работают?',
        description:
          'Одинаковые шаблонные сообщения в LinkedIn и холодный спам по почте вызывают только раздражение и губят репутацию эксперта.',
        points: [
          {
            title: 'Люди моментально отличают спам-рассылку',
            text:
              'Когда руководитель видит безликое письмо, он отправляет его в корзину. Премиальные клиенты требуют персонального внимания к их задачам.',
          },
          {
            title: 'Нежелание эксперта заниматься звонками',
            text:
              'Коучи и доктора — специалисты в своём деле, а не операторы колл-центра. Звонки отнимают моральные силы и время от работы с клиентами.',
          },
          {
            title: 'Встречи с теми, кто не может оплатить программу',
            text:
              'Проводить часовые консультации с людьми без бюджета — прямой путь к профессиональному выгоранию.',
          },
        ],
      },
      deliverables: {
        heading: 'Что включает наша услуга прямого привлечения?',
        description:
          'Опытные менеджеры, которые уважительно и грамотно представляют ваш бренд, договариваясь о встрече в вашем календаре.',
        items: [
          {
            title: 'Ручной сбор базы лиц, принимающих решения',
            text:
              'Находим прямые контакты топ-менеджеров, директоров по персоналу или частных клиентов, идеально подходящих под ваш профиль.',
          },
          {
            title: 'Разработка сценариев экспертного диалога',
            text:
              'Пишем уважительные скрипты без давления, фокусируясь на проблемах собеседника и пользе вашего подхода.',
          },
          {
            title: 'Прямые звонки и предварительная квалификация',
            text:
              'Наш специалист звонит, выявляет потребность, проверяет готовность инвестировать и фиксирует дату встречи в вашем расписании.',
          },
          {
            title: 'Аналитика и обратная связь с рынка',
            text:
              'Подробно фиксируем аргументы и возражения потенциальных клиентов, помогая вам докручивать саму ценность программы.',
          },
        ],
      },
      process: {
        heading: 'Как выстраивается процесс привлечения',
        description:
          'Прозрачный путь от базы контактов до заполненного календаря консультаций.',
        steps: [
          {
            step: '01',
            title: 'Формирование критериев отбора',
            duration: '1-я неделя',
            text:
              'Определяем главные выгоды вашего продукта и строгие критерии, которым должен соответствовать контакт перед записью.',
          },
          {
            step: '02',
            title: 'Тестовый пул звонков',
            duration: '2-я неделя',
            text:
              'Формируем первую выборку из 100–150 контактов, тестируем подачу и замеряем конверсию в согласие на созвон.',
          },
          {
            step: '03',
            title: 'Масштабирование и наполнение встреч',
            duration: 'С 3-й недели',
            text:
              'Выходим на плановую нагрузку, пока вы проводите встречи только с тёплыми и подготовленными клиентами.',
          },
        ],
      },
      pricingModels: {
        heading: 'Модели сотрудничества по прямым продажам',
        description:
          'Условия, зависящие от стоимости вашего продукта и целей по выручке.',
        models: [
          {
            title: 'Фиксированная часть + Бонус за встречу',
            subtitle: 'Оптимальный баланс для активного старта',
            description:
              'Небольшой ежемесячный фикс, покрывающий сбор качественных баз и рабочие часы менеджера, плюс оплата за каждую состоявшуюся квалифицированную встречу.',
            highlights: ['Выделенный менеджер', 'Проверенные базы', 'Мотивация на результат'],
          },
          {
            title: 'Процент от заключённых сделок',
            subtitle: 'Для дорогих программ с чеком от €2,000+',
            description:
              'Формат партнёрства для экспертов с подтверждённым опытом успешных продаж и готовыми кейсами.',
            highlights: ['Без стартового риска', 'Оплата по факту сделки', 'Индивидуальный отбор'],
          },
          {
            title: 'Построение внутреннего отдела продаж',
            subtitle: 'Для онлайн-школ и тренинговых центров',
            description:
              'Помогаем нанять, обучить и ввести в строй штатного менеджера с готовыми скриптами и регламентами в CRM.',
            highlights: ['Собственный сотрудник', 'Стандарты работы', 'Обучающие регламенты'],
          },
        ],
      },
      faqs: [
        {
          question: 'Не навредят ли звонки моей экспертной репутации?',
          answer:
            'Нет, потому что мы не занимаемся спамом. Разговор строится уважительно, кратко и исключительно по делу с теми, кому продукт действительно актуален.',
        },
        {
          question: 'Сколько встреч можно ожидать в месяц?',
          answer:
            'В зависимости от сегмента рынка и привлекательности оффера наши клиенты получают от 15 до 30 целевых созвонов ежемесячно.',
        },
        {
          question: 'Что делать, если клиент не пришёл на встречу?',
          answer:
            'За несостоявшиеся созвоны бонус не начисляется, а наш менеджер оперативно связывается для переноса времени.',
        },
      ],
      cta: {
        heading: 'Хотите стабильный поток корпоративных клиентов?',
        description:
          'Запишитесь на стратегический созвон, чтобы оценить применимость прямого аутрича для вашей программы.',
        button: 'Записаться на стратегический созвон',
      },
    },
  },
};
