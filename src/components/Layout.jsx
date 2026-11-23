import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './SiteHeader.jsx';
import ContactFooter from './ContactFooter.jsx';
import CommandPalette from './CommandPalette.jsx';
import SplashIntro from './SplashIntro.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getSiteContent } from '../content/site.js';

const JUMP_SELECTOR = [
  // Shared
  '.kissa-footer__pitch',
  '.kissa-footer__directory',
  // Home
  '.kissa-cabinet',
  '.kissa-reading-spread',
  '.kissa-ticker',
  '.kissa-author-copy',
  '.kissa-portrait',
  // About
  '.kissa-about-hero',
  '.kissa-open-monograph',
  '.kissa-toolkit-header',
  '.kissa-card-cabinet',
  '.kissa-next-bar',
  // Work
  '.kissa-work-hero__head',
  '.kissa-listening-desk',
  '.kissa-catalog__head',
  '.kissa-tapes-grid > .kissa-tape-card',
  '.kissa-ongoing__head',
  '.kissa-ongoing__grid > .kissa-ongoing-card',
  // Journey
  '.kissa-journey-hero__head',
  '.kissa-tuner',
  '.kissa-intern-dossier',
  '.kissa-orgs-grid > .kissa-org-card',
  '.kissa-awards-grid > .kissa-award-card',
  // Project Detail
  '.project-detail-hero',
  '.detail-academic-strip',
  '.project-detail-body > .detail-card',
  '.case-pillars-grid > .case-pillar-card',
].join(', ');

const SPOTLIGHT_SELECTOR =
  '.kissa-spotlight, .kissa-cabinet, .hifi-deck, .kissa-tuner, .kissa-open-monograph, .kissa-intern-dossier, .kissa-org-card, .kissa-award-card';

function getDocumentBounds(el) {
  const height = el.offsetHeight;
  if (height === 0) return null;

  let top = 0;
  let cur = el;
  while (cur) {
    top += cur.offsetTop;
    cur = cur.offsetParent;
  }
  return { top, bottom: top + height };
}

export default function Layout() {
  const { pathname, hash } = useLocation();
  const { lang } = useApp();
  const site = getSiteContent(lang);

  const titles = {
    '/': `${site.name} — ${lang === 'id' ? 'Portofolio' : 'Portfolio'}`,
    '/about': `${lang === 'id' ? 'Tentang' : 'About'} — ${site.name}`,
    '/work': `${lang === 'id' ? 'Proyek' : 'Work'} — ${site.name}`,
    '/journey': `${lang === 'id' ? 'Perjalanan' : 'Journey'} — ${site.name}`,
  };

  useEffect(() => {
    let pageTitle = titles[pathname];
    if (!pageTitle && pathname.startsWith('/work/')) {
      pageTitle = `${lang === 'id' ? 'Detail Proyek' : 'Project Detail'} — ${site.name}`;
    }
    document.title = pageTitle ?? titles['/'];
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, lang]);

  // Bidirectional scroll jump-in / jump-out animation for sections and columns across all pages.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const targets = Array.from(document.querySelectorAll(JUMP_SELECTOR));

    if (reduced || targets.length === 0) {
      targets.forEach((el) => {
        el.classList.remove('jump-target');
        delete el.dataset.jump;
        el.style.removeProperty('--jump-delay');
      });
      return undefined;
    }

    targets.forEach((el) => el.classList.add('jump-target'));

    let rafId = null;

    const evaluateJumpStates = (isInitial = false) => {
      rafId = null;

      const viewTop = window.scrollY;
      const viewBottom = viewTop + window.innerHeight;
      const docBottom = document.documentElement.scrollHeight;
      const atPageBottom = viewBottom >= docBottom - 6;
      const topCutoff = viewTop + 6;
      const bottomCutoff = viewBottom - 10;

      // Update global scroll-progress hairline bar (0% -> 100%)
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100));
      document.documentElement.style.setProperty('--scroll-progress', `${pct.toFixed(1)}%`);

      // Batch all DOM layout reads before writing styles/attributes.
      const measurements = targets.map((el) => ({
        el,
        bounds: getDocumentBounds(el),
        prev: el.dataset.jump || '',
      }));

      const newlyEntering = [];
      const exiting = [];

      for (const { el, bounds, prev } of measurements) {
        if (!bounds) continue;

        const isAbove = bounds.bottom <= topCutoff;
        const isBelow = bounds.top >= bottomCutoff && !(atPageBottom && bounds.bottom > topCutoff);
        const inView = !isAbove && !isBelow;

        if (inView) {
          if (prev !== 'in-bottom' && prev !== 'in-top') {
            const nextState = prev === 'out-top' ? 'in-top' : 'in-bottom';
            newlyEntering.push({ el, nextState });
          }
        } else if (isAbove) {
          if (prev !== 'out-top') {
            exiting.push({ el, nextState: 'out-top' });
          }
        } else if (isInitial || !prev) {
          exiting.push({ el, nextState: 'idle' });
        } else if (prev === 'in-bottom' || prev === 'in-top') {
          exiting.push({ el, nextState: 'out-bottom' });
        }
      }

      // Apply staggered delays to columns/sections entering together.
      newlyEntering.forEach(({ el, nextState }, idx) => {
        const delay = Math.min(idx * 65, 260);
        el.style.setProperty('--jump-delay', `${delay}ms`);
        el.dataset.jump = nextState;
      });

      exiting.forEach(({ el, nextState }) => {
        el.style.removeProperty('--jump-delay');
        el.dataset.jump = nextState;
      });
    };

    const scheduleEvaluate = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => evaluateJumpStates(false));
    };

    const initialRaf = window.requestAnimationFrame(() => evaluateJumpStates(true));

    window.addEventListener('scroll', scheduleEvaluate, { passive: true });
    window.addEventListener('resize', scheduleEvaluate, { passive: true });

    let resizeObserver = null;
    let mutationObserver = null;
    const mainEl = document.querySelector('main');
    if ('ResizeObserver' in window && mainEl) {
      resizeObserver = new ResizeObserver(scheduleEvaluate);
      resizeObserver.observe(mainEl);
    }
    if ('MutationObserver' in window && mainEl) {
      mutationObserver = new MutationObserver(() => {
        document.querySelectorAll(JUMP_SELECTOR).forEach((el) => {
          if (!targets.includes(el)) {
            el.classList.add('jump-target');
            targets.push(el);
          }
        });
        scheduleEvaluate();
      });
      mutationObserver.observe(mainEl, { childList: true, subtree: true });
    }

    return () => {
      window.cancelAnimationFrame(initialRaf);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleEvaluate);
      window.removeEventListener('resize', scheduleEvaluate);
      if (resizeObserver) resizeObserver.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
      targets.forEach((el) => {
        el.classList.remove('jump-target');
        delete el.dataset.jump;
        el.style.removeProperty('--jump-delay');
      });
    };
  }, [pathname, lang]);

  // Smooth 60fps cursor-tracking warm reading-lamp spotlight on interactive surfaces.
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    let activeEl = null;
    let rafSpot = 0;

    const clearEl = (el) => {
      if (!el) return;
      el.classList.remove('is-lit');
    };

    const onPointerMove = (e) => {
      const target = e.target instanceof Element ? e.target.closest(SPOTLIGHT_SELECTOR) : null;
      if (target !== activeEl) {
        clearEl(activeEl);
        activeEl = target;
      }
      if (!activeEl) return;

      const x = e.clientX;
      const y = e.clientY;
      if (rafSpot) return;
      rafSpot = window.requestAnimationFrame(() => {
        rafSpot = 0;
        if (!activeEl) return;
        const rect = activeEl.getBoundingClientRect();
        activeEl.classList.add('kissa-spotlight', 'is-lit');
        activeEl.style.setProperty('--mx', `${(x - rect.left).toFixed(1)}px`);
        activeEl.style.setProperty('--my', `${(y - rect.top).toFixed(1)}px`);
      });
    };

    const onPointerLeave = () => {
      clearEl(activeEl);
      activeEl = null;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);

    return () => {
      if (rafSpot) window.cancelAnimationFrame(rafSpot);
      clearEl(activeEl);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <>
      <SplashIntro />
      <SiteHeader />
      <main>
        <div key={pathname} className="kissa-page-transition">
          <Outlet />
        </div>
      </main>
      <ContactFooter />
      <CommandPalette />
    </>
  );
}
