import React, { useEffect, useState } from 'react';

/**
 * Cinematic intro: deep teal curtain, "VDigital." letters slam up, counter runs
 * to 100, then three colour panels lift away and the hero animation starts
 * (by adding html.vd-go). Shown once per session; add ?intro to the URL to
 * force it again while testing.
 */
const LOGO = ['V', 'D', 'i', 'g', 'i', 't', 'a', 'l', '.'];
const COUNT_MS = 1050;
const LIFT_MS = 1100;

const go = () => document.documentElement.classList.add('vd-go');

// Decided once per page load, so React StrictMode's double effect run in dev
// can't flip the answer (the first run marks the session as seen).
let introDecision: boolean | null = null;
const shouldShowIntro = () => {
  if (introDecision !== null) return introDecision;
  let allow = false;
  try {
    const root = document.documentElement;
    const forced = new URLSearchParams(window.location.search).has('intro');
    const seen = sessionStorage.getItem('vd_intro_seen');
    if (root.classList.contains('vd-motion') && (forced || !seen)) {
      sessionStorage.setItem('vd_intro_seen', '1');
      allow = true;
    }
  } catch {
    allow = false;
  }
  introDecision = allow;
  return allow;
};

export const Preloader: React.FC = () => {
  const [show, setShow] = useState(false);
  const [out, setOut] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    const allow = shouldShowIntro();

    if (!allow) {
      go();
      return;
    }

    setShow(true);
    root.style.overflow = 'hidden';

    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / COUNT_MS, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t1 = setTimeout(() => {
      setOut(true);
      root.style.overflow = '';
      // Hero starts while the curtain is still lifting, so it feels continuous.
      setTimeout(go, 280);
    }, COUNT_MS + 120);
    const t2 = setTimeout(() => setShow(false), COUNT_MS + 120 + LIFT_MS);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t1);
      clearTimeout(t2);
      root.style.overflow = '';
      setShow(false);
      setOut(false);
      go();
    };
  }, []);

  if (!show) return null;

  return (
    <div className={`vd-intro${out ? ' is-out' : ''}`} aria-hidden="true">
      <div className="vd-intro__panel vd-intro__panel--3" />
      <div className="vd-intro__panel vd-intro__panel--2" />
      <div
        className="vd-intro__panel vd-intro__panel--1"
        style={{ '--p': count / 100 } as React.CSSProperties}
      >
        <div className="vd-intro__logo">
          {LOGO.map((ch, i) => (
            <span
              key={i}
              className={i === 0 || i === LOGO.length - 1 ? 'is-accent' : undefined}
              style={{ '--c': i } as React.CSSProperties}
            >
              {ch}
            </span>
          ))}
        </div>
        <div className="vd-intro__meta">
          <span>Web · Video · Marketing</span>
          <span className="vd-intro__count">{String(count).padStart(3, '0')}</span>
        </div>
        <div className="vd-intro__bar" />
      </div>
    </div>
  );
};
