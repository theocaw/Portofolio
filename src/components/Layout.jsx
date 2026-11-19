import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './SiteHeader.jsx';
import ContactFooter from './ContactFooter.jsx';
import PinyoCompanion from './PinyoCompanion.jsx';
import CustomCursor from './CustomCursor.jsx';
import ScrollComet from './ScrollComet.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getSiteContent } from '../content/site.js';

const JUMP_SELECTOR = [
  // Shared across pages
  '.page-intro__label',
  '.page-intro__headline',
  '.page-intro__description',
  '.contact-footer__copy',
  '.contact-footer__details',
  '.contact-footer__colophon',
  // Home
  '.home-hero__intro',
  '.hero-photo-deck',
  '.home-hero__meta',
  '.home-explore__heading',
  '.home-explore__cards > .page-card',
  // About
  '.profile__index',
  '.profile__narrative',
  '.education > .label',
  '.education__school',
  '.gpa',
  '.toolkit > .label',
  '.toolkit__title',
  '.toolkit__domains > .toolkit__domain',
  '.work-invitation',
  // Work
  '.ongoing-header',
  '.ongoing-headline-block',
  '.ongoing-grid > .ongoing-card',
  '.completed-header',
  '.completed-headline-block',
  '.work-filter-bar',
  '.projects-grid > .project-card',
  '.journey-invitation',
  // Project Detail
  '.project-detail-nav',
  '.project-detail-hero',
  '.detail-academic-strip',
  '.project-detail-body > .detail-card',
  '.detail-metrics-grid > .detail-metric-pill',
  '.case-pillars-grid > .case-pillar-card',
  '.case-recommendations-grid > .case-recommendation-card',
  '.project-pager-card:not(.is-disabled)',
  // Journey
  '.journey-section > .section-meta-header',
  '.journey-heading',
  '.journey-heading__title--large',
  '.journey-heading-block',
  '.journey-filter-bar',
  '.journey-section__description',
  '.experience-dossier',
  '.experience-metrics-grid > .experience-metric-card',
  '.organizations-bento > .org-bento-card',
  '.achievements-showcase-grid > .achievement-showcase-card',
].join(', ');

const TILT_SELECTOR =
  '.page-card, .toolkit__domain, .gpa, .ongoing-card, .project-card, .org-bento-card, .achievement-showcase-card, .case-pillar-card, .case-recommendation-card';

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

  // Interactive 3D tilt & cursor spotlight glare for cards across all pages.
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    let activeCard = null;

    const clearCard = (card) => {
      if (!card) return;
      card.classList.remove('is-tilting');
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
      card.style.removeProperty('--spot-x');
      card.style.removeProperty('--spot-y');
    };

    const onPointerMove = (e) => {
      const target = e.target instanceof Element ? e.target.closest(TILT_SELECTOR) : null;
      if (target !== activeCard) {
        clearCard(activeCard);
        activeCard = target;
      }
      if (!activeCard) return;

      const rect = activeCard.getBoundingClientRect();
      const px = (e.clientX - rect.left) / (rect.width || 1);
      const py = (e.clientY - rect.top) / (rect.height || 1);
      const tiltX = ((0.5 - py) * 7).toFixed(2);
      const tiltY = ((px - 0.5) * 7).toFixed(2);

      activeCard.classList.add('is-tilting');
      activeCard.style.setProperty('--tilt-x', `${tiltX}deg`);
      activeCard.style.setProperty('--tilt-y', `${tiltY}deg`);
      activeCard.style.setProperty('--spot-x', `${(px * 100).toFixed(1)}%`);
      activeCard.style.setProperty('--spot-y', `${(py * 100).toFixed(1)}%`);
    };

    const onPointerLeave = () => {
      clearCard(activeCard);
      activeCard = null;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);

    return () => {
      clearCard(activeCard);
      window.removeEventListener('pointermove', onPointerMove);
      document.documentElement.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <ContactFooter />
      <PinyoCompanion />
      <CustomCursor />
      <ScrollComet />
    </>
  );
}
