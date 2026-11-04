import { Link, NavLink } from 'react-router-dom';
import { site, navLinks } from '../content/site.js';
import './SiteHeader.css';

export default function SiteHeader() {
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

          <a className="site-header__contact" href={`mailto:${site.email}`}>
            Contact ↗
          </a>
        </div>
        <hr className="rule" />
      </div>
    </header>
  );
}
