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
          <Link
            to="/"
            className="site-header__identity site-vinyl"
            aria-label={lang === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
            title={lang === 'id' ? 'Beranda · Putar Vinyl ✨' : 'Home · Spin Vinyl ✨'}
          >
            <div className="site-vinyl__deck">
              <span className="site-vinyl__led" aria-hidden="true" />
              <div className="site-vinyl__scroll-rotor">
                <svg
                  className="site-vinyl__disc"
                  viewBox="0 0 48 48"
                  width="38"
                  height="38"
                  aria-hidden="true"
                >
                  {/* Outer vinyl disc */}
                  <circle cx="24" cy="24" r="22" fill="#13192b" stroke="#090d18" strokeWidth="1.5" />

                  {/* Iridescent sheen highlights so spin is visible */}
                  <path
                    d="M24 3 A21 21 0 0 1 43 16 L24 24 Z"
                    fill="rgba(96, 165, 250, 0.24)"
                  />
                  <path
                    d="M24 45 A21 21 0 0 1 5 32 L24 24 Z"
                    fill="rgba(244, 114, 182, 0.24)"
                  />

                  {/* Vinyl grooves */}
                  <circle
                    cx="24"
                    cy="24"
                    r="18.5"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.14)"
                    strokeWidth="0.7"
                    strokeDasharray="10 6"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="15"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.18)"
                    strokeWidth="0.7"
                    strokeDasharray="7 5"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="11.8"
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.14)"
                    strokeWidth="0.7"
                  />

                  {/* Two-tone Y2K center record label */}
                  <circle cx="24" cy="24" r="8.8" fill="#ff8dc7" stroke="#090d18" strokeWidth="1.2" />
                  <path d="M24 15.2 A8.8 8.8 0 0 1 32.8 24 L15.2 24 A8.8 8.8 0 0 1 24 15.2 Z" fill="#fef08a" />
                  <circle cx="24" cy="24" r="4.5" fill="#2563eb" />

                  {/* Spindle hole */}
                  <circle cx="24" cy="24" r="1.8" fill="#faf6ef" stroke="#090d18" strokeWidth="0.9" />
                </svg>
              </div>

              {/* Miniature turntable tonearm */}
              <svg
                className="site-vinyl__arm"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                aria-hidden="true"
              >
                <circle cx="19" cy="5" r="3" fill="#fef08a" stroke="#14234a" strokeWidth="1.5" />
                <path
                  d="M19 5 L14 15 L9 18"
                  fill="none"
                  stroke="#f8fafc"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 5 L14 15 L9 18"
                  fill="none"
                  stroke="#14234a"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <rect
                  x="6.8"
                  y="16.5"
                  width="4.2"
                  height="2.8"
                  rx="0.8"
                  transform="rotate(-28 8.9 17.9)"
                  fill="#e11d48"
                  stroke="#14234a"
                  strokeWidth="1"
                />
              </svg>
            </div>

            <span className="site-vinyl__note site-vinyl__note--1" aria-hidden="true">
              ♪
            </span>
            <span className="site-vinyl__note site-vinyl__note--2" aria-hidden="true">
              ✦
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
            {/* Quick Command Palette & 30s Recruiter Scan Trigger */}
            <button
              type="button"
              className="mono site-header__cmd-btn"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('open-command-palette', { detail: { tab: 'recruiter' } }),
                )
              }
              title={
                lang === 'id'
                  ? 'Ringkasan 30-Detik HR & Navigasi Cepat (Ctrl+K)'
                  : '30s Recruiter Scan & Command Palette (Ctrl+K)'
              }
            >
              <span>⚡ {lang === 'id' ? 'Ringkasan HR' : '30s Scan'}</span>
            </button>

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
