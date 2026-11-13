import type { SupportedLocale } from '../i18n';

/**
 * Testimonials section.
 *
 * Everything below is PLACEHOLDER copy so the design can be reviewed.
 * Replace each item with a real client statement (with their permission)
 * and then set TESTIMONIALS_LIVE to true. While it is false the section
 * only renders in `npm run dev` or when the URL has ?testimonials.
 */
export const TESTIMONIALS_LIVE = false;

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  /** Short measurable result shown as a chip, e.g. "+40% inquiries" */
  result: string;
  /** Optional photo in /public/images; initials are used when empty */
  photo?: string;
}

export interface TestimonialsCopy {
  kicker: string;
  heading: string;
  headingItalic: string;
  lead: string;
  featuredLabel: string;
  cta: string;
  featured: Testimonial;
  items: Testimonial[];
}

const make = (quote: string, name: string, role: string, result: string, n: number): Testimonial[] =>
  Array.from({ length: n }, (_, i) => ({
    quote,
    name: `${name} ${i + 1}`,
    role,
    result,
  }));

export const TESTIMONIALS_COPY: Record<SupportedLocale, TestimonialsCopy> = {
  sr: {
    kicker: 'Utisci klijenata',
    heading: 'Ne verujte nama.',
    headingItalic: 'Verujte njima.',
    lead: 'Šta kažu firme sa kojima smo radili, njihovim rečima.',
    featuredLabel: 'Izdvojeno',
    cta: 'Želim ovakav rezultat',
    featured: {
      quote:
        'Ovde ide najjača izjava klijenta. Kakav je bio problem pre saradnje, šta ste uradili i koji je konkretan rezultat. Dve do tri rečenice, njegovim rečima.',
      name: 'Ime Prezime',
      role: 'Pozicija, Naziv firme',
      result: 'Rezultat, npr. +40% upita',
    },
    items: make(
      'Ovde ide kratka izjava klijenta. Jedna do dve rečenice o saradnji i rezultatu.',
      'Ime Prezime',
      'Pozicija, Firma',
      'Rezultat',
      6
    ),
  },
  en: {
    kicker: 'Client stories',
    heading: "Don't take our word for it.",
    headingItalic: 'Take theirs.',
    lead: 'What the businesses we work with say, in their own words.',
    featuredLabel: 'Featured',
    cta: 'I want results like this',
    featured: {
      quote:
        "The client's strongest statement goes here. What the problem was before, what you did and the concrete result. Two or three sentences, in their words.",
      name: 'Full Name',
      role: 'Role, Company name',
      result: 'Result, e.g. +40% inquiries',
    },
    items: make(
      'A short client statement goes here. One or two sentences about the work and the result.',
      'Full Name',
      'Role, Company',
      'Result',
      6
    ),
  },
  ru: {
    kicker: 'Отзывы клиентов',
    heading: 'Не верьте нам.',
    headingItalic: 'Верьте им.',
    lead: 'Что говорят компании, с которыми мы работали, их словами.',
    featuredLabel: 'Главный отзыв',
    cta: 'Хочу такой результат',
    featured: {
      quote:
        'Здесь самый сильный отзыв клиента. Какая была проблема до сотрудничества, что вы сделали и какой конкретный результат. Два-три предложения его словами.',
      name: 'Имя Фамилия',
      role: 'Должность, Компания',
      result: 'Результат, напр. +40% заявок',
    },
    items: make(
      'Здесь короткий отзыв клиента. Одно-два предложения о работе и результате.',
      'Имя Фамилия',
      'Должность, Компания',
      'Результат',
      6
    ),
  },
};
