import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { useI18n } from '../i18n';
import { Project, PROJECTS, PROJECTS_COPY } from '../data/projectsData';

const hostOf = (url?: string) => (url ? url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '');

const monogram = (name: string) =>
  name
    .replace(/^Dr\.?\s+/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0])
    .join('');

/** Designed project card, used until a screenshot exists in /public/images/projects. */
const Poster: React.FC<{ p: Project; locale: keyof Project['field']; wip: string }> = ({ p, locale, wip }) => (
  <div className="vd-p-poster" style={{ '--accent': p.accent } as React.CSSProperties}>
    <span className="vd-p-poster__orb vd-p-poster__orb--1" aria-hidden="true" />
    <span className="vd-p-poster__orb vd-p-poster__orb--2" aria-hidden="true" />
    <span className="vd-p-poster__mono" aria-hidden="true">
      {monogram(p.client)}
    </span>
    <div className="vd-p-poster__top">
      <span className="vd-p-poster__badge">{monogram(p.client)}</span>
      <span>{p.field[locale]}</span>
      {p.status === 'wip' ? (
        <span className="vd-p-badge">{wip}</span>
      ) : (
        p.url && <span className="vd-p-poster__host">{hostOf(p.url)}</span>
      )}
    </div>
    <strong className="vd-p-poster__name">{p.client}</strong>
    <ul className="vd-p-poster__pills">
      {p.tags[locale].map((t, i) => (
        <li key={t} style={{ '--k': i } as React.CSSProperties}>
          {t}
        </li>
      ))}
    </ul>
  </div>
);

/** Browser-framed screenshot when the image exists, otherwise the designed card. */
const Visual: React.FC<{ p: Project; locale: keyof Project['field']; wip: string }> = ({ p, locale, wip }) => {
  const [failed, setFailed] = useState(!p.image);
  if (failed) return <Poster p={p} locale={locale} wip={wip} />;
  return (
    <div className="vd-p-browser">
      <div className="vd-p-browser__bar" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{hostOf(p.url) || p.client}</span>
      </div>
      <div className="vd-p-screen">
        <img
          src={p.image}
          alt={p.client}
          width={1440}
          height={900}
          loading="lazy"
          draggable={false}
          onError={() => setFailed(true)}
        />
      </div>
      {p.status === 'wip' && <span className="vd-p-badge vd-p-badge--float">{wip}</span>}
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  const { locale } = useI18n();
  const c = PROJECTS_COPY[locale];
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const cards = (): HTMLElement[] =>
    trackRef.current ? Array.from(trackRef.current.querySelectorAll<HTMLElement>('.vd-p-card')) : [];

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    const list = cards();
    const target = list[Math.max(0, Math.min(list.length - 1, i))];
    if (!track || !target) return;
    track.scrollTo({ left: target.offsetLeft - list[0].offsetLeft, behavior: 'smooth' });
  }, []);

  // Track which card is in front.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const list = cards();
      const x = track.scrollLeft + (list[0]?.offsetLeft ?? 0);
      let best = 0;
      list.forEach((el, i) => {
        if (Math.abs(el.offsetLeft - x) < Math.abs(list[best].offsetLeft - x)) best = i;
      });
      setActive(best);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  // Mouse drag to scroll (touch already scrolls natively).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let down = false;
    let moved = false;
    let startX = 0;
    let startLeft = 0;
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      down = true;
      moved = false;
      startX = e.clientX;
      startLeft = track.scrollLeft;
      track.classList.add('is-dragging');
    };
    const onMove = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) moved = true;
      track.scrollLeft = startLeft - dx;
    };
    const onUp = () => {
      if (!down) return;
      down = false;
      track.classList.remove('is-dragging');
      // Snap to the nearest card after a drag.
      const list = cards();
      const x = track.scrollLeft + (list[0]?.offsetLeft ?? 0);
      let best = 0;
      list.forEach((el, i) => {
        if (Math.abs(el.offsetLeft - x) < Math.abs(list[best].offsetLeft - x)) best = i;
      });
      goTo(best);
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };
    track.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    track.addEventListener('click', onClick, true);
    return () => {
      track.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      track.removeEventListener('click', onClick, true);
    };
  }, [goTo]);

  const total = PROJECTS.length;
  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <section id="projects" className="lp-section vd-p" aria-label={c.kicker}>
      <div className="lp-wrap">
        <header className="vd-p-head">
          <div>
            <span className="lp-kicker">{c.kicker}</span>
            <h2 className="lp-h2">
              {c.heading} <em>{c.headingItalic}</em>
            </h2>
            <p className="lp-lead">{c.lead}</p>
          </div>
          <div className="vd-p-controls">
            <span className="vd-p-count" aria-live="polite">
              <b>{pad(active + 1)}</b> / {pad(total)}
            </span>
            <button type="button" onClick={() => goTo(active - 1)} disabled={active === 0} aria-label={c.prev}>
              <ArrowLeft />
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              disabled={active === total - 1}
              aria-label={c.next}
            >
              <ArrowRight />
            </button>
          </div>
        </header>
      </div>

      <div className="vd-p-track" ref={trackRef}>
        {PROJECTS.map((p, i) => (
          <article key={p.id} className={`vd-p-card${i === active ? ' is-active' : ''}`}>
            <Visual p={p} locale={locale} wip={c.wip} />

            <div className="vd-p-info">
              <span className="vd-p-num">{pad(i + 1)}</span>
              <div className="vd-p-info__main">
                <small>{p.field[locale]}</small>
                <h3>{p.client}</h3>
                <p>{p.text[locale]}</p>
                <ul className="lp-tags">
                  {p.tags[locale].map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
              {p.url && p.status === 'live' && (
                <a className="vd-p-visit" href={p.url} target="_blank" rel="noopener noreferrer">
                  {c.visit}
                  <ArrowUpRight />
                </a>
              )}
            </div>
          </article>
        ))}
        <div className="vd-p-end" aria-hidden="true" />
      </div>

      <div className="vd-p-progress" aria-hidden="true">
        <i style={{ transform: `scaleX(${(active + 1) / total})` }} />
      </div>
    </section>
  );
};
