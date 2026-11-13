import { useEffect } from 'react';

/**
 * Site-wide motion engine.
 *
 * Everything is gated on `html.vd-motion`, which an inline script in index.html
 * sets before first paint (skipped for bots and prefers-reduced-motion).
 * Hidden "before" states live in motion.css under that class, so prerendered
 * HTML never flashes, and if JS dies the inline failsafe removes the class.
 */

// Must match the selectors that motion.css hides under `.vd-motion`.
const REVEAL_SELECTORS = [
  '.lp-section .lp-kicker',
  '.lp-section .lp-h2',
  '.lp-section .lp-lead',
  '.lp-closing',
  '.lp-note',
  '.lp-process__after',
  '.lp-story__points li',
  '.lp-section .lp-btn',
  '.lp-tile',
  '.lp-problem',
  '.lp-industry',
  '.lp-step',
  '.lp-stat',
  '.lp-q',
  '.lp-album__card',
  '.lp-founding',
  '.lp-founding li',
  '.vdp-shell',
  '.vd-t-featured',
  '.vd-t-row',
  '.vd-p-track',
].join(',');

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

function countUp(el: HTMLElement) {
  const original = el.dataset.vdOrig ?? el.textContent ?? '';
  el.dataset.vdOrig = original;
  const m = original.match(/\d+/);
  if (!m) return () => {};
  const target = parseInt(m[0], 10);
  // Years count from close by, small numbers from zero.
  const from = target > 1000 ? target - 40 : 0;
  const dur = 1400;
  const start = performance.now();
  let raf = 0;
  const tick = (now: number) => {
    const p = clamp((now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 4);
    const val = Math.round(from + (target - from) * eased);
    el.textContent = original.replace(m[0], String(val));
    if (p < 1) raf = requestAnimationFrame(tick);
    else el.textContent = original;
  };
  raf = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(raf);
    el.textContent = original;
  };
}

export function useCinematicMotion(pathname: string) {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    (window as unknown as { __vdMotion?: boolean }).__vdMotion = true;
    const root = document.documentElement;
    if (!root.classList.contains('vd-motion')) return;

    const cleanups: (() => void)[] = [];
    let disposed = false;

    // Wait one frame so the new route is in the DOM.
    const startRaf = requestAnimationFrame(() => {
      if (disposed) return;

      /* ---------------- Scroll reveals ---------------- */
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            el.classList.add('is-in');
            io.unobserve(el);
            const dt = el.matches('.lp-stat') ? el.querySelector<HTMLElement>('dt') : null;
            if (dt) cleanups.push(countUp(dt));
          });
        },
        { rootMargin: '0px 0px -10% 0px', threshold: 0.12 }
      );
      cleanups.push(() => io.disconnect());

      // Scans again later so sections that mount after first paint are animated too.
      const scan = () => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTORS)).filter(
        (el) => !el.closest('.lp-hero') && !el.dataset.vdSeen
      );
      els.forEach((el) => (el.dataset.vdSeen = '1'));

      // Stagger index among siblings that share a parent.
      const groups = new Map<Element, HTMLElement[]>();
      els.forEach((el) => {
        const parent = el.parentElement;
        if (!parent) return;
        const list = groups.get(parent) ?? [];
        list.push(el);
        groups.set(parent, list);
      });
      groups.forEach((list) => list.forEach((el, i) => el.style.setProperty('--i', String(i))));
      els.forEach((el) => io.observe(el));
      };
      scan();
      const rescan = setTimeout(scan, 700);
      cleanups.push(() => {
        clearTimeout(rescan);
        document.querySelectorAll<HTMLElement>('[data-vd-seen]').forEach((el) => delete el.dataset.vdSeen);
      });

      /* ---------------- Scroll-linked scenes ---------------- */
      const progress = document.createElement('div');
      progress.className = 'vd-progress';
      progress.setAttribute('aria-hidden', 'true');
      document.body.appendChild(progress);
      cleanups.push(() => progress.remove());

      const hero = document.querySelector<HTMLElement>('.lp-hero');
      const zoomers = Array.from(document.querySelectorAll<HTMLElement>('.lp-torn, .lp-founding'));
      const bands = Array.from(document.querySelectorAll<HTMLElement>('[data-band]'));
      const album = document.querySelector<HTMLElement>('.lp-album');

      let lastY = window.scrollY;
      let velocity = 0;
      let bandX = 0;
      let raf = 0;

      const frame = () => {
        raf = 0;
        const vh = window.innerHeight;
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - vh;
        progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;

        if (hero) {
          const hp = clamp(y / (hero.offsetHeight || vh));
          hero.style.setProperty('--hp', hp.toFixed(4));
        }

        // Sections zoom from a floating card to full bleed as they enter.
        zoomers.forEach((el) => {
          const r = el.getBoundingClientRect();
          const p = clamp((vh - r.top) / (vh * 0.75));
          el.style.setProperty('--zp', p.toFixed(4));
        });

        if (album) {
          const r = album.getBoundingClientRect();
          const p = clamp((vh - r.top) / (vh + r.height));
          album.style.setProperty('--ap', p.toFixed(4));
        }

        // Kinetic band: base drift + scroll velocity kick.
        const dy = y - lastY;
        lastY = y;
        velocity = velocity * 0.88 + dy * 0.12;
        bandX += 0.6 + Math.abs(velocity) * 0.9;
        bands.forEach((b) => {
          const dir = Number(b.dataset.band || 1);
          const w = b.scrollWidth / 2 || 1;
          const x = -((bandX % w) + w) % w;
          b.style.transform = `translate3d(${dir > 0 ? x : -w - x}px,0,0) skewX(${clamp(-velocity * 0.4, -12, 12) * dir}deg)`;
        });

        if (bands.length) raf = requestAnimationFrame(frame);
      };
      const kick = () => {
        if (!raf) raf = requestAnimationFrame(frame);
      };
      frame();
      window.addEventListener('scroll', kick, { passive: true });
      window.addEventListener('resize', kick);
      cleanups.push(() => {
        window.removeEventListener('scroll', kick);
        window.removeEventListener('resize', kick);
        cancelAnimationFrame(raf);
      });

      /* ---------------- Cursor + magnetic buttons (mouse only) ---------------- */
      if (window.matchMedia('(pointer: fine)').matches) {
        const dot = document.createElement('div');
        dot.className = 'vd-cursor';
        dot.setAttribute('aria-hidden', 'true');
        document.body.appendChild(dot);
        let mx = -100;
        let my = -100;
        let cx = -100;
        let cy = -100;
        let craf = 0;
        const loop = () => {
          cx += (mx - cx) * 0.2;
          cy += (my - cy) * 0.2;
          dot.style.transform = `translate3d(${cx}px,${cy}px,0)`;
          craf = requestAnimationFrame(loop);
        };
        craf = requestAnimationFrame(loop);

        const onMove = (e: PointerEvent) => {
          mx = e.clientX;
          my = e.clientY;
          const t = e.target as Element | null;
          dot.classList.toggle('is-hover', !!t?.closest('a, button, summary, [role="button"]'));

          const btn = t?.closest<HTMLElement>('.lp-btn, .vd-magnet');
          document.querySelectorAll<HTMLElement>('.vd-magnet-on').forEach((b) => {
            if (b !== btn) {
              b.classList.remove('vd-magnet-on');
              b.style.removeProperty('translate');
            }
          });
          if (btn) {
            const r = btn.getBoundingClientRect();
            const x = (e.clientX - (r.left + r.width / 2)) * 0.28;
            const yy = (e.clientY - (r.top + r.height / 2)) * 0.4;
            btn.classList.add('vd-magnet-on');
            btn.style.translate = `${x}px ${yy}px`;
          }

          // Spotlight on service tiles
          const tile = t?.closest<HTMLElement>('.lp-tile, .lp-card');
          if (tile) {
            const r = tile.getBoundingClientRect();
            tile.style.setProperty('--mx', `${e.clientX - r.left}px`);
            tile.style.setProperty('--my', `${e.clientY - r.top}px`);
          }
        };
        const onLeave = () => {
          mx = -100;
          my = -100;
        };
        window.addEventListener('pointermove', onMove, { passive: true });
        document.addEventListener('pointerleave', onLeave);
        cleanups.push(() => {
          cancelAnimationFrame(craf);
          window.removeEventListener('pointermove', onMove);
          document.removeEventListener('pointerleave', onLeave);
          dot.remove();
        });
      }
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(startRaf);
      cleanups.forEach((fn) => fn());
    };
  }, [pathname]);
}
