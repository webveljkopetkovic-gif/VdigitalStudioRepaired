import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Check,
  CheckCircle2,
  Clapperboard,
  Code2,
  CornerDownRight,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  Megaphone,
  PhoneCall,
  ShoppingBag,
  Store,
  UtensilsCrossed,
} from 'lucide-react';
import { getServicePath, ServiceSlug, useI18n } from '../i18n';
import { BRAND_PATHS } from '../data/brandPaths';
import { trackBookCallClick } from '../utils/analytics';

const SERVICE_ORDER: { slug: ServiceSlug; icon: React.ElementType }[] = [
  { slug: 'web-development', icon: Code2 },
  { slug: 'video-social-media', icon: Clapperboard },
  { slug: 'marketing-automation', icon: Megaphone },
  { slug: 'cold-calling', icon: PhoneCall },
];

const INDUSTRY_ICONS: React.ElementType[] = [
  HeartPulse,
  GraduationCap,
  Dumbbell,
  UtensilsCrossed,
  ShoppingBag,
  Store,
];

const scrollToId = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
};

/* ------------------------------------------------------- Tools marquee */

const TOOLS: { name: string; brand?: string }[] = [
  { name: 'Claude', brand: 'claude' },
  { name: 'Cursor', brand: 'cursor' },
  { name: 'Vercel', brand: 'vercel' },
  { name: 'Render', brand: 'render' },
  { name: 'Close CRM' },
  { name: 'Zapier', brand: 'zapier' },
  { name: 'n8n', brand: 'n8n' },
  { name: 'Figma', brand: 'figma' },
  { name: 'Google AI Studio', brand: 'gemini' },
];

const ToolLogo: React.FC<{ name: string; brand?: string }> = ({ name, brand }) => {
  const b = brand ? BRAND_PATHS[brand] : undefined;
  return (
    <li className="lp-logo" style={b ? ({ '--brand': b.hex } as React.CSSProperties) : undefined}>
      {b ? (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d={b.path} />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth="2.4" />
          <path d="M15.2 9.4a4.2 4.2 0 1 0 0 5.2" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      )}
      <span>{name}</span>
    </li>
  );
};

const ToolsMarquee: React.FC = () => (
  <div className="lp-marquee" role="group" aria-label="Tools">
    <div className="lp-marquee__track">
      {[0, 1].map((copy) => (
        <ul className="lp-marquee__row" key={copy} aria-hidden={copy === 1 ? 'true' : undefined}>
          {TOOLS.map((tool) => (
            <ToolLogo key={tool.name} {...tool} />
          ))}
        </ul>
      ))}
    </div>
  </div>
);

/* ------------------------------------------------------------------ Hero */

export const LandingHero: React.FC = () => {
  const { t, contactPath } = useI18n();
  const navigate = useNavigate();
  return (
    <div className="lp-hero">
      <div className="lp-wrap lp-hero__inner">
        <span className="lp-kicker">{t.trustBar.items[3]}</span>

        <h1 className="lp-h1">
          <span>{t.hero.line1}</span>
          <span>
            <em>{t.hero.line2}</em>
          </span>
        </h1>

        <p className="lp-hero__sub">{t.hero.line3}</p>
        <p className="lp-hero__text">{t.hero.leftText}</p>

        <div className="lp-cta">
          <a
            href={contactPath}
            className="lp-btn lp-btn--primary"
            onClick={(e) => {
              e.preventDefault();
              trackBookCallClick('hero');
              navigate(contactPath);
            }}
          >
            {t.hero.primaryCta}
            <ArrowRight />
          </a>
          <a href="#process" className="lp-btn lp-btn--ghost" onClick={scrollToId('process')}>
            {t.hero.secondaryCta}
          </a>
        </div>
        <p className="lp-hero__note">{t.hero.rightText}</p>

        <ToolsMarquee />
      </div>
    </div>
  );
};

/* ----------------------------------------------------------- Trust strip */

export const LandingTrust: React.FC = () => {
  const { t } = useI18n();
  return (
    <section className="lp-trust" aria-label="VDigital">
      <div className="lp-wrap">
        <ul>
          {t.trustBar.items.map((item) => (
            <li key={item}>
              <BadgeCheck />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------- Services */

const TILE_ART: Record<ServiceSlug, React.ReactNode> = {
  'web-development': (
    <div className="lp-art lp-art--web" aria-hidden="true">
      <div className="lp-art__bar">
        <i />
        <i />
        <i />
      </div>
      <div className="lp-art__hero" />
      <div className="lp-art__cols">
        <b />
        <b />
        <b />
      </div>
    </div>
  ),
  'video-social-media': (
    <div className="lp-art lp-art--video" aria-hidden="true">
      <div className="lp-art__phone">
        <span className="lp-art__play" />
        <em />
        <em />
      </div>
    </div>
  ),
  'marketing-automation': (
    <div className="lp-art lp-art--chart" aria-hidden="true">
      {[34, 52, 44, 70, 62, 92].map((h, i) => (
        <b key={i} style={{ height: `${h}%` }} />
      ))}
    </div>
  ),
  'cold-calling': (
    <div className="lp-art lp-art--call" aria-hidden="true">
      <span />
      <span />
      <span />
      <PhoneCall />
    </div>
  ),
};

export const LandingServices: React.FC = () => {
  const { t, locale, contactPath } = useI18n();
  const navigate = useNavigate();
  return (
    <section id="services" className="lp-section">
      <div className="lp-wrap">
        <header className="lp-bentohead">
          <div>
            <span className="lp-kicker">{t.services.label}</span>
            <h2 className="lp-h2">{t.services.heading}</h2>
          </div>
          <a
            href={contactPath}
            className="lp-btn lp-btn--ghost"
            onClick={(e) => {
              e.preventDefault();
              trackBookCallClick('services');
              navigate(contactPath);
            }}
          >
            {t.hero.primaryCta}
            <ArrowRight />
          </a>
        </header>

        <div className="lp-bento">
          {SERVICE_ORDER.map(({ slug, icon: Icon }, i) => {
            const card = t.services.cards[i];
            const path = getServicePath(slug, locale);
            return (
              <a
                key={slug}
                href={path}
                className={`lp-tile lp-tile--${i + 1}`}
                onClick={(e) => {
                  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                  e.preventDefault();
                  navigate(path);
                }}
              >
                <div className="lp-tile__body">
                  <span className="lp-tile__icon">
                    <Icon />
                  </span>
                  <h3>
                    {card.titleWhite} {card.titleGrey}
                  </h3>
                  <p>{card.text}</p>
                  <ul className="lp-tags">
                    {card.tags.slice(0, 4).map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </div>
                {TILE_ART[slug]}
                <span className="lp-tile__go" aria-label={t.services.cardButton}>
                  <ArrowUpRight />
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------------- Problems */

export const LandingProblems: React.FC = () => {
  const { t } = useI18n();
  return (
    <section id="problems" className="lp-section lp-section--tint">
      <div className="lp-wrap">
        <header className="lp-head lp-head--center">
          <span className="lp-kicker">{t.painPoints.label}</span>
          <h2 className="lp-h2">
            {t.painPoints.headingMain} <em>{t.painPoints.headingItalic}</em>
          </h2>
        </header>

        <div className="lp-problems">
          {t.painPoints.cards.map((card, i) => (
            <article key={card.id} className="lp-card lp-problem">
              <span className="lp-problem__n">0{i + 1}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          ))}
        </div>

        <p className="lp-closing">
          <CornerDownRight aria-hidden="true" />
          {t.painPoints.closing}
        </p>
      </div>
    </section>
  );
};

/* --------------------------------------------------------------- Process */

export const LandingProcess: React.FC = () => {
  const { t } = useI18n();
  return (
    <section id="process" className="lp-section">
      <div className="lp-wrap">
        <header className="lp-head lp-head--center">
          <span className="lp-kicker">{t.process.label}</span>
          <h2 className="lp-h2">
            {t.process.headingBefore} <em>{t.process.headingHighlight}</em>
            {t.process.headingAfter}
          </h2>
          <p className="lp-lead">{t.process.sideText}</p>
        </header>

        <ol className="lp-steps">
          {t.process.weeks.map((week, i) => (
            <li key={week.label} className="lp-step">
              <span className="lp-step__num">0{i + 1}</span>
              <div className="lp-step__main">
                <span className="lp-step__label">{week.label}</span>
                <h3>{week.title}</h3>
              </div>
              <ul className="lp-step__tasks">
                {week.tasks.map((task) => (
                  <li key={task.title}>
                    <span>{task.title}</span>
                    <small>{task.duration}</small>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <p className="lp-process__after">
          <CheckCircle2 aria-hidden="true" />
          {t.process.bottomLine}
        </p>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------ Industries */

export const LandingIndustries: React.FC = () => {
  const { t, contactPath } = useI18n();
  const navigate = useNavigate();
  const w = t.whoWeWorkWith;
  return (
    <section id="who-we-work-with" className="lp-section lp-section--tint">
      <div className="lp-wrap">
        <header className="lp-head lp-head--center">
          <span className="lp-kicker">{w.eyebrow}</span>
          <h2 className="lp-h2">{w.heading}</h2>
          <p className="lp-lead">{w.subheading}</p>
        </header>

        <div className="lp-industries">
          {w.cards.map((card, i) => {
            const Icon = INDUSTRY_ICONS[i % INDUSTRY_ICONS.length];
            return (
              <article key={card.title} className="lp-card lp-industry">
                <span className="lp-industry__icon">
                  <Icon />
                </span>
                <h3>{card.title}</h3>
                <p className="lp-industry__who">{card.who}</p>
                <p>{card.text}</p>
              </article>
            );
          })}
        </div>

        <p className="lp-note">
          <span>{w.footerLine}</span>
          <a
            href={contactPath}
            onClick={(e) => {
              e.preventDefault();
              navigate(contactPath);
            }}
          >
            {t.statement.button} <ArrowRight size={15} />
          </a>
        </p>
      </div>
    </section>
  );
};

/* -------------------------------------------------- Team + founding band */

export const LandingTeam: React.FC = () => {
  const { t, contactPath } = useI18n();
  const navigate = useNavigate();
  return (
    <section id="team" className="lp-section">
      <div className="lp-wrap">
        <header className="lp-head">
          <span className="lp-kicker">{t.navbar.links.team}</span>
          <h2 className="lp-h2">{t.team.heading}</h2>
          <p className="lp-lead">{t.team.subheading}</p>
        </header>

        <div className="lp-team">
          {t.team.members.map((m) => (
            <article key={m.id} className="lp-card lp-member">
              <div className="lp-member__photo">
                <img src={m.photo} alt={m.photoAlt} loading="lazy" width={480} height={500} />
              </div>
              <h3>{m.name}</h3>
              <p className="lp-member__role">{m.role}</p>
              <p>{m.text}</p>
              {m.portfolioUrl && (
                <a
                  className="lp-member__link"
                  href={m.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {m.portfolioLabel}
                </a>
              )}
            </article>
          ))}
        </div>

        <div id="founding" className="lp-founding">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span className="lp-kicker">{t.founding.label}</span>
            <h3>{t.founding.heading}</h3>
            <p>{t.founding.text}</p>
            <a
              href={contactPath}
              className="lp-btn"
              onClick={(e) => {
                e.preventDefault();
                trackBookCallClick('founding');
                navigate(contactPath);
              }}
            >
              {t.founding.button}
              <ArrowRight />
            </a>
          </div>
          <ul>
            {t.founding.bullets.map((b) => (
              <li key={b}>
                <Check aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------------- FAQ */

export const LandingFAQ: React.FC = () => {
  const { t } = useI18n();
  return (
    <section id="faq" className="lp-section lp-section--tint">
      <div className="lp-wrap lp-faq">
        <header className="lp-head">
          <span className="lp-kicker">{t.faq.label}</span>
          <h2 className="lp-h2">{t.faq.heading}</h2>
        </header>

        <div className="lp-faq__list">
          {t.faq.items.map((item, i) => (
            <details key={item.q} className="lp-q" open={i === 0}>
              <summary>
                <span>{item.q}</span>
                <i aria-hidden="true" />
              </summary>
              <div>{item.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
