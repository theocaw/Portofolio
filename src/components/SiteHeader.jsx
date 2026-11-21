import { Link, NavLink, useLocation } from 'react-router-dom';
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
            {lang === 'id' ? 'ARSIP & RUANG DENGAR' : 'ARCHIVE & LISTENING ROOM'}
          </span>
        </Link>

        <nav className="kissa-nav" aria-label="Main Navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `kissa-nav__link ${
                  isActive || (item.to === '/work' && pathname.startsWith('/work/'))
                    ? 'is-active'
                    : ''
                }`
              }
            >
              <span className="mono kissa-nav__idx">{item.index}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
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
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light'
              ? lang === 'id'
                ? 'Malam'
                : 'Dark'
              : lang === 'id'
                ? 'Siang'
                : 'Light'}
          </button>

          <a href="#contact" className="mono kissa-contact-link" title={site.email}>
            {lang === 'id' ? 'Kontak ↗' : 'Contact ↗'}
          </a>
        </div>
      </div>
    </header>
  );
}
