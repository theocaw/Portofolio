import { useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import SiteHeader from './SiteHeader.jsx';
import ContactFooter from './ContactFooter.jsx';
import CommandPalette from './CommandPalette.jsx';
import SplashIntro from './SplashIntro.jsx';
import AmbientMotion from './AmbientMotion.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getSiteContent } from '../content/site.js';

export default function Layout() {
  const { pathname, hash } = useLocation();
  const { lang } = useApp();
  const site = getSiteContent(lang);
  const lenisRef = useRef(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  // 1. Liquid-smooth Lenis inertia scrolling (Awwwards motion-graphic feel)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    const raf = (time) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(raf);
    };
    rafId = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // 2. Page title & instant scroll reset on route navigation
  useEffect(() => {
    const titles = {
      '/': `${site.name} — ${lang === 'id' ? 'Taman Bunga Alpen' : 'Alpine Flower Meadow'}`,
      '/about': `${lang === 'id' ? 'Tentang' : 'About'} — ${site.name}`,
      '/work': `${lang === 'id' ? 'Proyek' : 'Work'} — ${site.name}`,
      '/journey': `${lang === 'id' ? 'Perjalanan' : 'Journey'} — ${site.name}`,
    };

    let pageTitle = titles[pathname];
    if (!pageTitle && pathname.startsWith('/work/')) {
      pageTitle = `${lang === 'id' ? 'Detail Proyek' : 'Project Detail'} — ${site.name}`;
    }
    document.title = pageTitle ?? titles['/'];

    if (!hash) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
  }, [pathname, hash, lang, site.name]);

  return (
    <>
      {/* Top 2.5px Spring-Smoothed Meadow Scroll Progress Thread */}
      <motion.div
        className="alpine-scroll-thread"
        style={{ scaleX: smoothProgress }}
        aria-hidden="true"
      />

      <AmbientMotion />
      <SplashIntro />
      <SiteHeader />

      <main className="alpine-main">
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 18, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
            transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <ContactFooter />
      <CommandPalette />
    </>
  );
}
