import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import { getSiteContent } from '../content/site.js';
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
    <header className="kissa-header">
      <div className="container kissa-header__inner">
        <Link to="/" className="kissa-brand" aria-label="Osanna Patricia Limbong — Home">
          <span className="kissa-brand__name">Osanna Patricia Limbong</span>
          <span className="mono kissa-brand__sub">
            {lang === 'id' ? 'TAMAN BUNGA ALPEN' : 'ALPINE FLOWER GARDEN'}
          </span>
        </Link>

        <nav className="kissa-nav" aria-label="Main Navigation">
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
                className={`kissa-nav__link ${active ? 'is-active' : ''}`}
              >
                <span className="mono kissa-nav__idx">{item.index}</span>
                <span>{item.label}</span>
                {active && (
                  <motion.span
                    layoutId="garden-nav-active-bar"
                    className="kissa-nav__active-bar"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="kissa-controls">
          <div className="kissa-lang" role="group" aria-label="Language">
            <button
              type="button"
              className={`mono kissa-lang__btn ${lang === 'en' ? 'is-active' : ''}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
            <span className="mono kissa-lang__sep">/</span>
            <button
              type="button"
              className={`mono kissa-lang__btn ${lang === 'id' ? 'is-active' : ''}`}
              onClick={() => setLang('id')}
            >
              ID
            </button>
          </div>

          <button
            type="button"
            className="mono kissa-theme-btn"
            onClick={toggleTheme}
            aria-label={theme === 'light' ? 'Switch to moonlit dark mode' : 'Switch to sunlit light mode'}
          >
            {theme === 'light'
              ? lang === 'id'
                ? 'Malam'
                : 'Moonlit'
              : lang === 'id'
                ? 'Siang'
                : 'Sunlit'}
          </button>

          <a href="#contact" className="mono kissa-contact-link" title={site.email}>
            {lang === 'id' ? 'Kontak ↗' : 'Contact ↗'}
          </a>
        </div>
      </div>
    </header>
  );
}
