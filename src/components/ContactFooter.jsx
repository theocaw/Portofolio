import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { getSiteContent } from '../content/site.js';
import './ContactFooter.css';

export default function ContactFooter() {
  const { lang } = useApp();
  const site = getSiteContent(lang);
  const contact = site.contact;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <footer className="kissa-footer" id="contact">
      <div className="container kissa-footer__inner">
        <div className="kissa-footer__grid">
          <div className="kissa-footer__pitch">
            <span className="mono kissa-eyebrow">
              {lang === 'id' ? 'HUBUNGI LANGSUNG' : 'DIRECT CORRESPONDENCE'}
            </span>
            <h2 className="kissa-footer__title">{contact.title}</h2>
            <p className="kissa-footer__sub">
              {lang === 'id'
                ? 'Terbuka untuk peluang magang Data Analyst & Front-End Developer (Bogor / Jakarta / Remote).'
                : 'Open for Data Analyst & Front-End Developer internship opportunities (Bogor / Jakarta / Remote).'}
            </p>

            <div className="kissa-footer__actions">
              <a href={`mailto:${site.email}`} className="mono kissa-footer__primary">
                {lang === 'id' ? 'Kirim Email ↗' : 'Email Osanna ↗'}
              </a>
              <button
                type="button"
                className="mono kissa-footer__copy"
                onClick={copyEmail}
              >
                {copied
                  ? lang === 'id'
                    ? 'Email Tersalin'
                    : 'Copied to Clipboard'
                  : site.email}
              </button>
            </div>
          </div>

          <div className="kissa-footer__directory">
            <span className="mono kissa-footer__dir-head">
              {lang === 'id' ? 'TAUTAN TAMAN' : 'GARDEN LINKS'}
            </span>
            <ul className="kissa-footer__links">
              {site.github && (
                <li>
                  <a href={site.github.url} target="_blank" rel="noreferrer">
                    <span>GitHub</span>
                    <span className="mono">{site.github.label} ↗</span>
                  </a>
                </li>
              )}
              <li>
                <a href={site.linkedin.url} target="_blank" rel="noreferrer">
                  <span>LinkedIn</span>
                  <span className="mono">{site.linkedin.label} ↗</span>
                </a>
              </li>
              <li>
                <a href={site.instagram.url} target="_blank" rel="noreferrer">
                  <span>Instagram</span>
                  <span className="mono">{site.instagram.label} ↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="kissa-footer__colophon">
          <span className="mono">
            OSANNA PATRICIA LIMBONG · ALPINE FLOWER GARDEN
          </span>
          <span className="mono">© {site.year}</span>
        </div>
      </div>
    </footer>
  );
}
