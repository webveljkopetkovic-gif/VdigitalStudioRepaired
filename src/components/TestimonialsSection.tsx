import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useI18n } from '../i18n';
import { Testimonial, TESTIMONIALS_COPY, TESTIMONIALS_LIVE } from '../data/testimonialsData';
import { trackBookCallClick } from '../utils/analytics';

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('')
    .toUpperCase();

const Person: React.FC<{ t: Testimonial; size?: 'lg' | 'sm' }> = ({ t, size = 'sm' }) => (
  <div className={`vd-t-person vd-t-person--${size}`}>
    {t.photo ? (
      <img src={t.photo} alt="" width={48} height={48} loading="lazy" />
    ) : (
      <span className="vd-t-avatar" aria-hidden="true">
        {initials(t.name)}
      </span>
    )}
    <span>
      <strong>{t.name}</strong>
      <small>{t.role}</small>
    </span>
  </div>
);

const Stars: React.FC = () => (
  <span className="vd-t-stars" aria-label="5/5">
    {[0, 1, 2, 3, 4].map((i) => (
      <Star key={i} aria-hidden="true" />
    ))}
  </span>
);

const Card: React.FC<{ t: Testimonial; hidden?: boolean }> = ({ t, hidden }) => (
  <figure className="vd-t-card" aria-hidden={hidden ? 'true' : undefined}>
    <div className="vd-t-card__top">
      <Stars />
      <span className="vd-t-chip">{t.result}</span>
    </div>
    <blockquote>{t.quote}</blockquote>
    <figcaption>
      <Person t={t} />
    </figcaption>
  </figure>
);

const Row: React.FC<{ items: Testimonial[]; reverse?: boolean }> = ({ items, reverse }) => {
  // Each half of the loop must be wider than the widest screen, so short lists repeat.
  const group: Testimonial[] = [];
  while (group.length < 8) group.push(...items);
  return (
    <div className={`vd-t-row${reverse ? ' vd-t-row--rev' : ''}`}>
      <div className="vd-t-row__track">
        {[0, 1].map((copy) =>
          group.map((t, i) => (
            <Card key={`${copy}-${i}`} t={t} hidden={copy === 1 || i >= items.length} />
          ))
        )}
      </div>
    </div>
  );
};

export const TestimonialsSection: React.FC = () => {
  const { locale, contactPath } = useI18n();
  const navigate = useNavigate();
  const c = TESTIMONIALS_COPY[locale];

  // Placeholder copy must never reach the live site by accident.
  const [preview, setPreview] = useState(false);
  useEffect(() => {
    if (import.meta.env.DEV || new URLSearchParams(window.location.search).has('testimonials')) {
      setPreview(true);
    }
  }, []);
  if (!TESTIMONIALS_LIVE && !preview) return null;

  const half = Math.ceil(c.items.length / 2);
  const f = c.featured;

  return (
    <section id="testimonials" className="lp-section vd-t" aria-label={c.kicker}>
      <div className="lp-wrap">
        <header className="vd-t-head">
          <div>
            <span className="lp-kicker">{c.kicker}</span>
            <h2 className="lp-h2">
              {c.heading} <em>{c.headingItalic}</em>
            </h2>
          </div>
          <div className="vd-t-head__side">
            <p className="lp-lead">{c.lead}</p>
            <a
              href={contactPath}
              className="lp-btn lp-btn--primary"
              onClick={(e) => {
                e.preventDefault();
                trackBookCallClick('testimonials');
                navigate(contactPath);
              }}
            >
              {c.cta}
              <ArrowRight />
            </a>
          </div>
        </header>

        <figure className="vd-t-featured">
          <span className="vd-t-featured__mark" aria-hidden="true">
            “
          </span>
          <div className="vd-t-featured__main">
            <span className="vd-t-featured__label">{c.featuredLabel}</span>
            <blockquote>{f.quote}</blockquote>
            <figcaption>
              <Person t={f} size="lg" />
            </figcaption>
          </div>
          <aside className="vd-t-featured__score">
            <strong>5.0</strong>
            <Stars />
            <span className="vd-t-chip vd-t-chip--big">{f.result}</span>
          </aside>
        </figure>
      </div>

      <div className="vd-t-rows">
        <Row items={c.items.slice(0, half)} />
        <Row items={c.items.slice(half)} reverse />
      </div>
    </section>
  );
};
