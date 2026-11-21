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
    <footer className="band band--paper-2 contact-footer" id="contact">
      <div className="container contact-footer__inner">
        <div className="slowbar-checkout-grid">
          {/* Left: Direct Slowbar Counter Call-to-Action */}
          <div className="slowbar-checkout__pitch">
            <span className="mono slowbar-checkout__eyebrow">
              ☕ {lang === 'id' ? 'MEJA KASIR & PEMINJAMAN ARSIP' : 'SLOWBAR CASHIER & LIBRARY CHECKOUT'}
            </span>
            <h2 className="contact-footer__title">{contact.title}</h2>
            <p className="slowbar-checkout__sub">
              {lang === 'id'
                ? 'Tertarik mengajakku magang sebagai Data Analyst atau Front-End Developer? Cukup satu klik untuk mengirim pesan atau menyalin emailku.'
                : 'Looking for a Data Analyst or Front-End Developer intern? Reach out directly with one click below.'}
            </p>

            <div className="slowbar-checkout__cta-row">
              <a href={`mailto:${site.email}`} className="mono slowbar-checkout__primary-btn">
                ✉️ {lang === 'id' ? 'Kirim Email ke Osanna ↗' : 'Email Osanna Directly ↗'}
              </a>

              <button
                type="button"
                className={`mono slowbar-checkout__copy-btn ${copied ? 'is-copied' : ''}`}
                onClick={copyEmail}
              >
                {copied
                  ? lang === 'id'
                    ? '✓ Email Tersalin!'
                    : '✓ Copied to Clipboard!'
                  : `📋 ${site.email}`}
              </button>
            </div>
          </div>

          {/* Right: Tactile Slowbar Café Receipt / Library Checkout Slip */}
          <div className="slowbar-receipt contact-footer__details">
            <div className="slowbar-receipt__header">
              <span className="mono slowbar-receipt__shop">OSANNA’S SLOWBAR · EST. 2026</span>
              <span className="mono slowbar-receipt__no">RECEIPT #OPL-2026</span>
            </div>

            <div className="mono slowbar-receipt__items">
              <div className="slowbar-receipt__row">
                <span>01x DATA ANALYST INTERN</span>
                <strong>READY</strong>
              </div>
              <div className="slowbar-receipt__row">
                <span>01x FRONT-END DEVELOPER</span>
                <strong>READY</strong>
              </div>
              <div className="slowbar-receipt__row">
                <span>01x IPB SOFTWARE ENG (TPL)</span>
                <strong>GPA 3.63</strong>
              </div>
              <div className="slowbar-receipt__row">
                <span>05x VERIFIED CASE STUDIES</span>
                <strong>45 RPM</strong>
              </div>
            </div>

            <div className="slowbar-receipt__socials">
              {site.github && (
                <a
                  href={site.github.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mono slowbar-receipt__link"
                >
                  GitHub ↗
                </a>
              )}
              <a
                href={site.linkedin.url}
                target="_blank"
                rel="noreferrer"
                className="mono slowbar-receipt__link"
              >
                LinkedIn ↗
              </a>
              <a
                href={site.instagram.url}
                target="_blank"
                rel="noreferrer"
                className="mono slowbar-receipt__link"
              >
                Instagram ↗
              </a>
            </div>

            <div className="mono slowbar-receipt__barcode" aria-hidden="true">
              ||| || |||| | ||| |||| || | ||| ||||
            </div>
          </div>
        </div>

        <div className="contact-footer__colophon">
          <p className="mono contact-footer__built">
            {lang === 'id'
              ? 'DISEDUH & DIKEMBANGKAN DI SLOWBAR OSANNA · BOGOR / JAKARTA'
              : 'BREWED & ENGINEERED AT OSANNA’S SLOWBAR · BOGOR / JAKARTA'}
          </p>
          <p className="contact-footer__copy-mark">
            © {site.year} {site.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
