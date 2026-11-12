import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './SiteHeader.jsx';
import ContactFooter from './ContactFooter.jsx';
import PinyoCompanion from './PinyoCompanion.jsx';
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
  '.journey-section__description',
  '.experience-dossier',
  '.experience-metrics-grid > .experience-metric-card',
  '.organizations-bento > .org-bento-card',
  '.achievements-showcase-grid > .achievement-showcase-card',
].join(', ');

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
      const topCutoff = viewTop + 44;
      const bottomCutoff = viewBottom - 24;

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
    const mainEl = document.querySelector('main');
    if ('ResizeObserver' in window && mainEl) {
      resizeObserver = new ResizeObserver(scheduleEvaluate);
      resizeObserver.observe(mainEl);
    }

    return () => {
      window.cancelAnimationFrame(initialRaf);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', scheduleEvaluate);
      window.removeEventListener('resize', scheduleEvaluate);
      if (resizeObserver) resizeObserver.disconnect();
      targets.forEach((el) => {
        el.classList.remove('jump-target');
        delete el.dataset.jump;
        el.style.removeProperty('--jump-delay');
      });
    };
  }, [pathname, lang]);

  return (
    <>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <ContactFooter />
      <PinyoCompanion />
    </>
  );
}
