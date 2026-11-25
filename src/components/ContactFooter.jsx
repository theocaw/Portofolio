import { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import { getSiteContent } from '../content/site.js';
import FlowerEmblem from './FlowerEmblem.jsx';
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
    <footer className="meadow-footer" id="contact">
      {/* Organic Curved Alpine Meadow Hill Horizon Divider */}
      <svg
        className="meadow-footer__curve"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 90 Q 360 10 720 48 T 1440 24 L 1440 90 Z"
          fill="var(--footer-hill)"
        />
      </svg>

      <div className="meadow-footer__body">
        <div className="container meadow-footer__inner">
          <motion.div
            className="meadow-footer__center"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="meadow-footer__bouquet" aria-hidden="true">
              <FlowerEmblem species="rose" size={40} />
              <FlowerEmblem species="edelweiss" size={54} />
              <FlowerEmblem species="buttercup" size={40} />
            </div>

            <span className="mono meadow-footer__eyebrow">
              {lang === 'id' ? 'MARI BERTUMBUH BERSAMA' : 'LET’S GROW SOMETHING TOGETHER'}
            </span>

            <h2 className="meadow-footer__title">{contact.title}</h2>

            <p className="meadow-footer__sub">
              {lang === 'id'
                ? 'Terbuka untuk peluang magang Data Analyst & Front-End Developer (Bogor / Jakarta / Remote).'
                : 'Open for Data Analyst & Front-End Developer internship opportunities (Bogor / Jakarta / Remote).'}
            </p>

            <div className="meadow-footer__actions">
              <a href={`mailto:${site.email}`} className="mono meadow-footer__primary">
                {lang === 'id' ? 'Kirim Email ↗' : 'Email Osanna ↗'}
              </a>
              <button type="button" className="mono meadow-footer__copy" onClick={copyEmail}>
                {copied
                  ? lang === 'id'
                    ? 'Email Tersalin ✓'
                    : 'Copied to Clipboard ✓'
                  : site.email}
              </button>
            </div>

            <div className="meadow-footer__socials">
              {site.github && (
                <a href={site.github.url} target="_blank" rel="noreferrer" className="mono">
                  GitHub ↗
                </a>
              )}
              <a href={site.linkedin.url} target="_blank" rel="noreferrer" className="mono">
                LinkedIn ↗
              </a>
              <a href={site.instagram.url} target="_blank" rel="noreferrer" className="mono">
                Instagram ↗
              </a>
            </div>
          </motion.div>

          <div className="meadow-footer__bottom mono">
            <span>OSANNA PATRICIA LIMBONG · PORTFOLIO</span>
            <span>© {site.year}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
