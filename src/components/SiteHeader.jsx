import { Link, NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { getSiteContent } from '../content/site.js';
import './SiteHeader.css';

export default function SiteHeader() {
  const { theme, toggleTheme, lang, setLang } = useApp();
  const site = getSiteContent(lang);
  const navLinks = site.navLinks;

  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header__bar">
          <Link to="/" className="site-header__identity" aria-label={`${site.name} — Home`}>
            <span className="site-header__monogram">{site.monogram}</span>
            <span className="site-header__name">
              {site.nameLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          </Link>

          <nav className="site-header__nav" aria-label="Main">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'} className="site-header__link">
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            {/* Language Switcher */}
            <div className="site-header__lang-toggle" role="group" aria-label="Language selection">
              <button
                type="button"
                className={`site-header__lang-btn ${lang === 'en' ? 'is-active' : ''}`}
                onClick={() => setLang('en')}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span className="site-header__lang-sep" aria-hidden="true">
                /
              </span>
              <button
                type="button"
                className={`site-header__lang-btn ${lang === 'id' ? 'is-active' : ''}`}
                onClick={() => setLang('id')}
                aria-label="Ganti ke Bahasa Indonesia"
              >
                ID
              </button>
            </div>

            {/* Theme Switcher */}
            <button
              type="button"
              className="site-header__theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
            >
              <span className="theme-toggle__icon" aria-hidden="true">
                {theme === 'light' ? '🌙' : '☀️'}
              </span>
            </button>

            {/* Contact Action */}
            <a className="site-header__contact" href={`mailto:${site.email}`}>
              {site.contactButton || (lang === 'id' ? 'Kontak ↗' : 'Contact ↗')}
            </a>
          </div>
        </div>
        <hr className="rule" />
      </div>
    </header>
  );
}
