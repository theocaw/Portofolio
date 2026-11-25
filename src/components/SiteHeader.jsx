import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import { getSiteContent } from '../content/site.js';
import FlowerEmblem from './FlowerEmblem.jsx';
import './SiteHeader.css';

export default function SiteHeader() {
  const { theme, toggleTheme, lang, setLang } = useApp();
  const { pathname } = useLocation();
  const site = getSiteContent(lang);

  const navItems = [
    { to: '/', index: '01', label: lang === 'id' ? 'Beranda' : 'Home' },
    { to: '/about', index: '02', label: lang === 'id' ? 'Tentang' : 'About' },
    { to: '/work', index: '03', label: lang === 'id' ? 'Proyek' : 'Work' },
    { to: '/journey', index: '04', label: lang === 'id' ? 'Perjalanan' : 'Journey' },
  ];

  return (
    <header className="alpine-dock-wrap">
      <div className="alpine-dock">
        {/* Left Floating Flower Mark (Icon Only) */}
        <Link to="/" className="alpine-brand-pill" aria-label="Osanna Patricia Limbong — Home">
          <span className="alpine-brand-pill__flower" aria-hidden="true">
            <FlowerEmblem species="edelweiss" size={26} />
          </span>
        </Link>

        {/* Center Floating Translucent Navigation Pill (Reel 3 inspired) */}
        <nav className="alpine-nav-pill" aria-label="Main Navigation">
          {navItems.map((item) => {
            const active =
              item.to === '/'
                ? pathname === '/'
                : pathname === item.to || (item.to === '/work' && pathname.startsWith('/work/'));
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={`alpine-nav-link ${active ? 'is-active' : ''}`}
              >
                {active && (
                  <motion.span
                    layoutId="alpine-dock-active-pill"
                    className="alpine-nav-link__bg"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
                <span className="alpine-nav-link__text">
                  <span className="mono alpine-nav-link__idx">{item.index}</span>
                  {item.label}
                </span>
              </NavLink>
            );
          })}
        </nav>

        {/* Right Floating Controls Pill */}
        <div className="alpine-controls-pill">
          <button
            type="button"
            className="mono alpine-mini-btn"
            onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
            aria-label="Toggle language"
          >
            {lang === 'en' ? 'EN' : 'ID'}
          </button>

          <button
            type="button"
            className="mono alpine-mini-btn"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to dusk mode' : 'Switch to daylight mode'}
          >
            {theme === 'light'
              ? lang === 'id'
                ? 'Malam'
                : 'Dusk'
              : lang === 'id'
                ? 'Siang'
                : 'Day'}
          </button>

          <a href="#contact" className="mono alpine-contact-pill" title={site.email}>
            {lang === 'id' ? 'Kontak ↗' : 'Contact ↗'}
          </a>
        </div>
      </div>
    </header>
  );
}
