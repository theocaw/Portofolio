import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import { getJourneyContent } from '../content/journey.js';
import FlowerEmblem from '../components/FlowerEmblem.jsx';
import './Journey.css';

const TRAIL_WAYPOINTS = {
  en: [
    {
      elevation: '1,200m',
      year: '2024',
      species: 'edelweiss',
      label: 'IPB TPL',
      title: 'Entered Software Engineering Technology at IPB University',
      detail:
        'Built foundational expertise across data analysis, relational databases, and web engineering (Cumulative GPA 3.63 / 4.00).',
      anchor: '#intern-section',
    },
    {
      elevation: '1,650m',
      year: '2025',
      species: 'rose',
      label: 'PT KCT INTERN',
      title: 'Web & Logistics Intern — PT Kharisma Cakrawala Transportasi',
      detail:
        'Shipped the live corporate website (kctjakarta.com) and prepared ~20 commercial freight quotations across domestic logistics operations.',
      anchor: '#intern-section',
    },
    {
      elevation: '2,050m',
      year: '2025',
      species: 'buttercup',
      label: 'SITE TREASURY',
      title: 'Financial Governance & 280+ Audited Transactions (Rp 26.19M)',
      detail:
        'Managed multi-division budgets, vendor disbursements, and transparent financial audits across 5 student organizations and national events.',
      anchor: '#orgs-section',
    },
    {
      elevation: '2,480m',
      year: '2025',
      species: 'lavender',
      label: '2× FILM AWARDS',
      title: '2nd Place International & National Short Movie Competitions',
      detail:
        'Earned 2nd Place at Portal 7 (International) and SEMNASA ITCAS (National), plus Semifinalist at Ideanation Business Plan.',
      anchor: '#awards-section',
    },
    {
      elevation: '2,900m',
      year: '2026',
      species: 'gentian',
      label: 'GEMINI AI CERT',
      title: 'Google Gemini Certified Student (Official Credential)',
      detail:
        'Verified proficiency in generative AI workflows, analytical prompting, and responsible AI integration in software engineering.',
      anchor: '#awards-section',
    },
  ],
  id: [
    {
      elevation: '1.200m',
      year: '2024',
      species: 'edelweiss',
      label: 'IPB TPL',
      title: 'Memulai Teknologi Rekayasa Perangkat Lunak di IPB University',
      detail:
        'Membangun fondasi analisis data, basis data relasional, dan rekayasa web dengan IPK Kumulatif 3,63 / 4,00.',
      anchor: '#intern-section',
    },
    {
      elevation: '1.650m',
      year: '2025',
      species: 'rose',
      label: 'MAGANG PT KCT',
      title: 'Magang Web & Logistik — PT Kharisma Cakrawala Transportasi',
      detail:
        'Merilis website perusahaan live (kctjakarta.com) dan menyusun ~20 dokumen kuotasi komersial pada operasional logistik.',
      anchor: '#intern-section',
    },
    {
      elevation: '2.050m',
      year: '2025',
      species: 'buttercup',
      label: 'AUDIT SITE',
      title: 'Tata Kelola Keuangan & 280+ Transaksi Teraudit (Rp 26,19 Juta)',
      detail:
        'Mengelola anggaran lintas divisi dan audit laporan keuangan transparan pada 5 peran kepemimpinan organisasi kampus.',
      anchor: '#orgs-section',
    },
    {
      elevation: '2.480m',
      year: '2025',
      species: 'lavender',
      label: '2× JUARA FILM',
      title: 'Juara 2 Kompetisi Film Pendek Internasional & Nasional',
      detail:
        'Meraih Juara 2 di Portal 7 (Internasional) dan SEMNASA ITCAS (Nasional), serta Semifinalis Ideanation Business Plan.',
      anchor: '#awards-section',
    },
    {
      elevation: '2.900m',
      year: '2026',
      species: 'gentian',
      label: 'GEMINI AI CERT',
      title: 'Google Gemini Certified Student (Sertifikasi Resmi)',
      detail:
        'Terverifikasi dalam pemanfaatan AI generatif, prompting analitis, dan integrasi AI bertanggung jawab pada rekayasa perangkat lunak.',
      anchor: '#awards-section',
    },
  ],
};

const ACHIEVEMENT_FILTERS = {
  en: [
    { id: 'all', label: 'All Credentials' },
    { id: 'award', label: 'Competition Awards' },
    { id: 'verified', label: 'Certifications' },
  ],
  id: [
    { id: 'all', label: 'Semua Pencapaian' },
    { id: 'award', label: 'Juara Kompetisi' },
    { id: 'verified', label: 'Sertifikasi Resmi' },
  ],
};

const ORG_SPECIES = ['edelweiss', 'rose', 'buttercup', 'gentian', 'lavender'];

export default function Journey() {
  const { lang } = useApp();
  const journey = getJourneyContent(lang);
  const { intro, professional, organizations, achievements } = journey;
  const { internship } = professional;

  const trailContainerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trailContainerRef,
    offset: ['start 20%', 'end 80%'],
  });
  const vineProgress = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const waypoints = TRAIL_WAYPOINTS[lang] || TRAIL_WAYPOINTS.en;
  const [trailIdx, setTrailIdx] = useState(1);
  const [achFilter, setAchFilter] = useState('all');

  const activePoint = waypoints[trailIdx] || waypoints[0];
  const filterList = ACHIEVEMENT_FILTERS[lang] || ACHIEVEMENT_FILTERS.en;

  const visibleAchievements =
    achFilter === 'all'
      ? achievements.entries
      : achFilter === 'verified'
        ? achievements.entries.filter((a) => a.badgeType === 'verified')
        : achievements.entries.filter((a) => a.badgeType !== 'verified');

  return (
    <div ref={trailContainerRef} className="trail-journey">
      {/* Scroll-Drawn Living Alpine Botanical Vine Running Down the Left Margin */}
      <div className="trail-vine-rail" aria-hidden="true">
        <svg viewBox="0 0 40 1200" preserveAspectRatio="none" className="trail-vine-svg">
          <path
            d="M 20 0 C 34 150, 6 300, 20 450 C 34 600, 6 750, 20 900 C 34 1050, 12 1140, 20 1200"
            fill="none"
            stroke="var(--rule)"
            strokeWidth="2"
          />
          <motion.path
            d="M 20 0 C 34 150, 6 300, 20 450 C 34 600, 6 750, 20 900 C 34 1050, 12 1140, 20 1200"
            fill="none"
            stroke="var(--blue)"
            strokeWidth="3"
            strokeLinecap="round"
            style={{ pathLength: vineProgress }}
          />
        </svg>
      </div>

      {/* Header + Interactive 5-Bloom Swiss Alpine Trail */}
      <section className="container trail-hero">
        <motion.span
          className="mono kissa-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {lang === 'id'
            ? '04 / PERJALANAN · JALUR BUNGA ALPEN (2024 — 2026)'
            : '04 / JOURNEY · SWISS ALPINE BLOOMING TRAIL (2024 — 2026)'}
        </motion.span>
        <div className="trail-mask">
          <motion.h1
            className="trail-hero__title"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {intro.headline}
          </motion.h1>
        </div>
        <p className="trail-hero__desc">{intro.description}</p>

        {/* Interactive 5-Flower Elevation Waypoints */}
        <div className="alpine-trail">
          <div className="alpine-trail__meadow">
            <div className="alpine-trail__path-line" aria-hidden="true">
              <motion.div
                className="alpine-trail__path-fill"
                animate={{ width: `${(trailIdx / (waypoints.length - 1)) * 100}%` }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              />
            </div>

            <div className="alpine-trail__waypoints" role="tablist" aria-label="Journey Milestones">
              {waypoints.map((wp, idx) => {
                const isActive = idx === trailIdx;
                return (
                  <button
                    key={wp.label}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`alpine-trail__point ${isActive ? 'is-active' : ''}`}
                    onClick={() => setTrailIdx(idx)}
                  >
                    <motion.div
                      className="alpine-trail__flower"
                      animate={{ scale: isActive ? 1.24 : 0.88, y: isActive ? -6 : 0 }}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    >
                      <FlowerEmblem species={wp.species} size={46} />
                    </motion.div>
                    <span className="mono alpine-trail__pt-year">{wp.year}</span>
                    <span className="mono alpine-trail__pt-label">{wp.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activePoint.label}
              className="alpine-trail__readout"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            >
              <div className="alpine-trail__readout-main">
                <span className="mono alpine-trail__tag">
                  ALTITUDE {activePoint.elevation} · {activePoint.year} · {activePoint.label}
                </span>
                <h2 className="alpine-trail__title">{activePoint.title}</h2>
                <p className="alpine-trail__detail">{activePoint.detail}</p>
              </div>

              <a href={activePoint.anchor} className="mono alpine-trail__jump">
                {lang === 'id' ? 'Lihat Catatan ↓' : 'Jump to Record ↓'}
              </a>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Chapter 01: Open Editorial PT KCT Industry Internship */}
      <section className="container trail-chapter" id="intern-section">
        <span className="mono kissa-eyebrow">{professional.label}</span>
        <h2 className="trail-chapter__h2">{professional.title}</h2>

        <motion.div
          className="trail-intern-grid"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <div className="trail-intern-main">
            <div className="mono trail-intern-meta">
              <span>{internship.period}</span>
              <span>·</span>
              <span>{internship.location}</span>
            </div>
            <h3 className="trail-intern-company">{internship.company}</h3>
            <div className="trail-intern-roles">
              <span className="mono trail-role-pill">{internship.role}</span>
              <a
                href={internship.website.url}
                target="_blank"
                rel="noreferrer"
                className="mono trail-live-link"
              >
                {internship.website.label}
              </a>
            </div>
            <p className="trail-intern-desc">{internship.description}</p>

            <ul className="trail-deliverables">
              {internship.deliverables.map((item, idx) => (
                <li key={idx}>
                  <span className="mono">0{idx + 1}</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="trail-tags">
              {internship.skills.map((skill) => (
                <span key={skill} className="tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <aside className="trail-intern-metrics">
            {internship.metrics.map((m) => (
              <div key={m.label} className="trail-metric-item">
                <span className="mono">{m.label}</span>
                <strong>{m.value}</strong>
                <small>{m.note}</small>
              </div>
            ))}
          </aside>
        </motion.div>
      </section>

      {/* Chapter 02: Open Editorial Campus Leadership Rows */}
      <section className="container trail-chapter" id="orgs-section">
        <span className="mono kissa-eyebrow">{organizations.label}</span>
        <h2 className="trail-chapter__h2">{organizations.title}</h2>
        <p className="trail-chapter__desc">{organizations.description}</p>

        <div className="trail-org-rows">
          {organizations.entries.map((entry, idx) => (
            <motion.article
              key={entry.name}
              className="trail-org-row"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
            >
              <div className="trail-org-row__left">
                <FlowerEmblem species={ORG_SPECIES[idx % ORG_SPECIES.length]} size={42} />
                <div>
                  <span className="mono trail-org-row__period">
                    {entry.period} · {entry.badge}
                  </span>
                  <h3 className="trail-org-row__name">{entry.name}</h3>
                  <span className="mono trail-org-row__role">{entry.role}</span>
                </div>
              </div>

              <div className="trail-org-row__right">
                <p className="trail-org-row__desc">{entry.description}</p>
                {entry.metrics && (
                  <div className="trail-org-row__metrics">
                    {entry.metrics.map((m) => (
                      <div key={m.label}>
                        <span className="mono">{m.label}</span>
                        <strong>{m.value}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Chapter 03: Achievements & Certifications */}
      <section className="container trail-chapter" id="awards-section">
        <div className="trail-ach-head">
          <div>
            <span className="mono kissa-eyebrow">{achievements.label}</span>
            <h2 className="trail-chapter__h2">{achievements.title}</h2>
          </div>

          <div className="exhibit-filters" role="tablist">
            {filterList.map((f) => {
              const isSelected = achFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`mono exhibit-filter ${isSelected ? 'is-active' : ''}`}
                  onClick={() => setAchFilter(f.id)}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="journey-ach-filter-pill"
                      className="exhibit-filter__bg"
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    />
                  )}
                  <span className="exhibit-filter__lbl">{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="trail-awards-list">
          {visibleAchievements.map((entry, idx) => (
            <motion.article
              key={entry.name}
              layout
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              className="trail-award-row"
            >
              <div className="trail-award-row__head">
                <span className="mono trail-award-pill">{entry.result}</span>
                <span className="mono trail-award-cat">{entry.category}</span>
              </div>

              <div className="trail-award-row__main">
                <FlowerEmblem species={ORG_SPECIES[(idx + 2) % ORG_SPECIES.length]} size={40} />
                <div>
                  <h3 className="trail-award-name">{entry.name}</h3>
                  <span className="mono trail-award-org">{entry.organizer}</span>
                  <p className="trail-award-desc">{entry.description}</p>
                </div>
              </div>

              <div className="trail-award-row__foot">
                {entry.certificateUrl && (
                  <a
                    href={entry.certificateUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mono trail-live-link"
                  >
                    {lang === 'id' ? 'Lihat Sertifikat (PDF) ↗' : 'View Certificate (PDF) ↗'}
                  </a>
                )}
                {entry.skills && (
                  <div className="trail-tags">
                    {entry.skills.map((s) => (
                      <span key={s} className="tag">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  );
}
