import { site, contact } from '../content/site.js';
import './ContactFooter.css';

export default function ContactFooter() {
  return (
    <footer className="band band--paper-2 contact-footer" id="contact">
      <div className="container contact-footer__inner">
        <div className="contact-footer__invitation">
          <div className="contact-footer__copy">
            <h2 className="contact-footer__title">{contact.title}</h2>
          </div>

          <div className="contact-footer__details">
            <div className="contact-footer__item">
              <a className="contact-footer__label-link" href={`mailto:${site.email}`}>
                <span className="label">EMAIL ↗</span>
              </a>
              <a className="contact-footer__email" href={`mailto:${site.email}`}>
                {site.email}
              </a>
            </div>
            <div className="contact-footer__item">
              <a
                className="contact-footer__label-link"
                href={site.linkedin.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="label">LINKEDIN ↗</span>
              </a>
              <a
                className="contact-footer__linkedin"
                href={site.linkedin.url}
                target="_blank"
                rel="noreferrer"
              >
                {site.linkedin.label}
              </a>
            </div>
            <div className="contact-footer__item">
              <a
                className="contact-footer__label-link"
                href={site.instagram.url}
                target="_blank"
                rel="noreferrer"
              >
                <span className="label">INSTAGRAM ↗</span>
              </a>
              <a
                className="contact-footer__instagram"
                href={site.instagram.url}
                target="_blank"
                rel="noreferrer"
              >
                {site.instagram.label}
              </a>
            </div>
          </div>
        </div>

        <hr className="rule" />

        <div className="contact-footer__signature">
          <span className="contact-footer__monogram">{site.monogram}</span>
          <p className="contact-footer__meta">
            <span>{site.location.toUpperCase()}</span>
            <span>{site.name.toUpperCase()}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
