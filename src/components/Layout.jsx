import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './SiteHeader.jsx';
import ContactFooter from './ContactFooter.jsx';
import CommandPalette from './CommandPalette.jsx';
import SplashIntro from './SplashIntro.jsx';
import AmbientMotion from './AmbientMotion.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getSiteContent } from '../content/site.js';

const JUMP_SELECTOR = [
  // Shared
  '.kissa-footer__pitch',
  '.kissa-footer__directory',
  // Home
  '.garden-hero-stage',
  '.kw-prompt-bar',
  '.kw-grid > .kw-card',
  '.kissa-cabinet',
  '.kissa-reading-spread',
  '.agc-card',
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
  '.kissa-spotlight, .kissa-cabinet, .hifi-deck, .kissa-tuner, .kissa-open-monograph, .kissa-intern-dossier, .kissa-org-card, .kissa-award-card, .kissa-tape-card, .kissa-ongoing-card';

const TILT_SELECTOR =
  '.kissa-portrait, .kissa-tape-card, .kissa-ongoing-card, .kissa-gpa-plate, .kissa-org-card, .kissa-award-card';

const MAGNETIC_SELECTOR =
  '.kissa-contact-link, .kissa-reading-spread__cta, .kissa-jcard__cta, .kissa-tuner__jump, .button-link';

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

      // Update global scroll-progress hairline bar (0% -> 100%) & parallax offset
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pct = Math.min(100, Math.max(0, (window.scrollY / maxScroll) * 100));
      document.documentElement.style.setProperty('--scroll-progress', `${pct.toFixed(1)}%`);
      document.documentElement.style.setProperty('--scroll-y', `${Math.min(window.scrollY, 1600).toFixed(0)}px`);
      document.documentElement.dataset.scrolled = window.scrollY > 18 ? 'true' : 'false';

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

  // Smooth 60fps cursor-tracking spotlight, 3D tactile tilt, and magnetic editorial CTAs.
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    let activeSpot = null;
    let activeTilt = null;
    let activeMag = null;
    let rafMotion = 0;

    const clearSpot = (el) => {
      if (!el) return;
      el.classList.remove('is-lit');
    };

    const clearTilt = (el) => {
      if (!el) return;
      el.classList.remove('is-tilting');
      el.style.removeProperty('--rx');
      el.style.removeProperty('--ry');
    };

    const clearMag = (el) => {
      if (!el) return;
      el.classList.remove('is-magnetic');
      el.style.removeProperty('--mag-x');
      el.style.removeProperty('--mag-y');
    };

    const onPointerMove = (e) => {
      const targetEl = e.target instanceof Element ? e.target : null;
      const nextSpot = targetEl ? targetEl.closest(SPOTLIGHT_SELECTOR) : null;
      const nextTilt = targetEl ? targetEl.closest(TILT_SELECTOR) : null;
      const nextMag = targetEl ? targetEl.closest(MAGNETIC_SELECTOR) : null;

      if (nextSpot !== activeSpot) {
        clearSpot(activeSpot);
        activeSpot = nextSpot;
      }
      if (nextTilt !== activeTilt) {
        clearTilt(activeTilt);
        activeTilt = nextTilt;
      }
      if (nextMag !== activeMag) {
        clearMag(activeMag);
        activeMag = nextMag;
      }

      if (!activeSpot && !activeTilt && !activeMag) return;

      const x = e.clientX;
      const y = e.clientY;
      if (rafMotion) return;

      rafMotion = window.requestAnimationFrame(() => {
        rafMotion = 0;

        if (activeSpot) {
          const rect = activeSpot.getBoundingClientRect();
          activeSpot.classList.add('kissa-spotlight', 'is-lit');
          activeSpot.style.setProperty('--mx', `${(x - rect.left).toFixed(1)}px`);
          activeSpot.style.setProperty('--my', `${(y - rect.top).toFixed(1)}px`);
        }

        if (activeTilt) {
          const rect = activeTilt.getBoundingClientRect();
          const px = (x - rect.left) / Math.max(1, rect.width) - 0.5;
          const py = (y - rect.top) / Math.max(1, rect.height) - 0.5;
          const maxDeg = activeTilt.classList.contains('kissa-portrait') ? 7.5 : 4.2;
          activeTilt.classList.add('kissa-tilt', 'is-tilting');
          activeTilt.style.setProperty('--rx', `${(-py * maxDeg * 2).toFixed(2)}deg`);
          activeTilt.style.setProperty('--ry', `${(px * maxDeg * 2).toFixed(2)}deg`);
        }

        if (activeMag) {
          const rect = activeMag.getBoundingClientRect();
          const dx = (x - (rect.left + rect.width / 2)) * 0.16;
          const dy = (y - (rect.top + rect.height / 2)) * 0.2;
          const clampX = Math.max(-7, Math.min(7, dx));
          const clampY = Math.max(-5, Math.min(5, dy));
          activeMag.classList.add('kissa-magnetic', 'is-magnetic');
          activeMag.style.setProperty('--mag-x', `${clampX.toFixed(1)}px`);
          activeMag.style.setProperty('--mag-y', `${clampY.toFixed(1)}px`);
        }
      });
    };

    const onPointerLeave = () => {
      clearSpot(activeSpot);
      clearTilt(activeTilt);
      clearMag(activeMag);
      activeSpot = null;
      activeTilt = null;
      activeMag = null;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);

    return () => {
      if (rafMotion) window.cancelAnimationFrame(rafMotion);
      clearSpot(activeSpot);
      clearTilt(activeTilt);
      clearMag(activeMag);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <>
      <AmbientMotion />
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
