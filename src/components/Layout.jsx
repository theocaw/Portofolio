import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SiteHeader from './SiteHeader.jsx';
import ContactFooter from './ContactFooter.jsx';
import { site } from '../content/site.js';

const titles = {
  '/': `${site.name} — Portfolio`,
  '/about': `About — ${site.name}`,
  '/work': `Work — ${site.name}`,
  '/journey': `Journey — ${site.name}`,
};

export default function Layout() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    document.title = titles[pathname] ?? titles['/'];
    if (!hash) window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash]);

  // Fade-and-rise animation for blocks as they scroll into view.
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) return undefined;

    const targets = document.querySelectorAll(
      '.page-card, .project__story, .project__evidence, .organization, .achievement, .toolkit__domain, .gpa, .highlight, .profile__narrative, .internship__details, .internship__evidence, .work-invitation, .education__school',
    );
    const timers = [];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add('is-visible');
          observer.unobserve(el);
          // Drop the helper classes afterwards so hover effects keep working.
          timers.push(setTimeout(() => el.classList.remove('reveal', 'is-visible'), 800));
        });
      },
      { threshold: 0.12 },
    );

    targets.forEach((el) => {
      el.classList.add('reveal');
      observer.observe(el);
    });

    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [pathname]);

  return (
    <>
      <SiteHeader />
      <main>
        <Outlet />
      </main>
      <ContactFooter />
    </>
  );
}
