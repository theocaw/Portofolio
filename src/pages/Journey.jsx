import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { getJourneyContent } from '../content/journey.js';
import './Journey.css';

const TUNER_STATIONS = {
  en: [
    {
      freq: '88.4',
      year: '2024',
      pos: 10,
      label: 'IPB TPL',
      title: 'Entered Software Engineering Technology at IPB University',
      detail: 'Built foundational expertise across data analysis, relational databases, and web engineering (Cumulative GPA 3.63 / 4.00).',
      anchor: '#intern-section',
    },
    {
      freq: '92.8',
      year: '2025',
      pos: 30,
      label: 'PT KCT INTERN',
      title: 'Web & Logistics Intern — PT Kharisma Cakrawala Transportasi',
      detail: 'Shipped the live corporate website (kctjakarta.com) and prepared ~20 commercial freight quotations across domestic logistics operations.',
      anchor: '#intern-section',
    },
    {
      freq: '98.2',
      year: '2025',
      pos: 50,
      label: 'SITE TREASURY',
      title: 'Financial Governance & 280+ Audited Transactions (Rp 26.19M)',
      detail: 'Managed multi-division budgets, vendor disbursements, and transparent financial audits across 5 student organizations and national events.',
      anchor: '#orgs-section',
    },
    {
      freq: '102.6',
      year: '2025',
      pos: 70,
      label: '2× FILM AWARDS',
      title: '2nd Place International & National Short Movie Competitions',
      detail: 'Earned 2nd Place at Portal 7 (International) and SEMNASA ITCAS (National), plus Semifinalist at Ideanation Business Plan.',
      anchor: '#awards-section',
    },
    {
      freq: '106.8',
      year: '2026',
      pos: 90,
      label: 'GEMINI AI CERT',
      title: 'Google Gemini Certified Student (Official Credential)',
      detail: 'Verified proficiency in generative AI workflows, analytical prompting, and responsible AI integration in software engineering.',
      anchor: '#awards-section',
    },
  ],
  id: [
    {
      freq: '88.4',
      year: '2024',
      pos: 10,
      label: 'IPB TPL',
      title: 'Memulai Teknologi Rekayasa Perangkat Lunak di IPB University',
      detail: 'Membangun fondasi analisis data, basis data relasional, dan rekayasa web dengan IPK Kumulatif 3,63 / 4,00.',
      anchor: '#intern-section',
    },
    {
      freq: '92.8',
      year: '2025',
      pos: 30,
      label: 'MAGANG PT KCT',
      title: 'Magang Web & Logistik — PT Kharisma Cakrawala Transportasi',
      detail: 'Merilis website perusahaan live (kctjakarta.com) dan menyusun ~20 dokumen kuotasi komersial pada operasional logistik.',
      anchor: '#intern-section',
    },
    {
      freq: '98.2',
      year: '2025',
      pos: 50,
      label: 'AUDIT SITE',
      title: 'Tata Kelola Keuangan & 280+ Transaksi Teraudit (Rp 26,19 Juta)',
      detail: 'Mengelola anggaran lintas divisi dan audit laporan keuangan transparan pada 5 peran kepemimpinan organisasi kampus.',
      anchor: '#orgs-section',
    },
    {
      freq: '102.6',
      year: '2025',
      pos: 70,
      label: '2× JUARA FILM',
      title: 'Juara 2 Kompetisi Film Pendek Internasional & Nasional',
      detail: 'Meraih Juara 2 di Portal 7 (Internasional) dan SEMNASA ITCAS (Nasional), serta Semifinalis Ideanation Business Plan.',
      anchor: '#awards-section',
    },
    {
      freq: '106.8',
      year: '2026',
      pos: 90,
      label: 'GEMINI AI CERT',
      title: 'Google Gemini Certified Student (Sertifikasi Resmi)',
      detail: 'Terverifikasi dalam pemanfaatan AI generatif, prompting analitis, dan integrasi AI bertanggung jawab pada rekayasa perangkat lunak.',
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

export default function Journey() {
  const { lang } = useApp();
  const journey = getJourneyContent(lang);
  const { intro, professional, organizations, achievements } = journey;
  const { internship } = professional;

  const stations = TUNER_STATIONS[lang] || TUNER_STATIONS.en;
  const [tunerIdx, setTunerIdx] = useState(1); // Start tuned to PT KCT Internship
  const [achFilter, setAchFilter] = useState('all');

  const activeStation = stations[tunerIdx] || stations[0];
  const filterList = ACHIEVEMENT_FILTERS[lang] || ACHIEVEMENT_FILTERS.en;

  const visibleAchievements =
    achFilter === 'all'
      ? achievements.entries
      : achFilter === 'verified'
        ? achievements.entries.filter((a) => a.badgeType === 'verified')
        : achievements.entries.filter((a) => a.badgeType !== 'verified');

  return (
    <div className="kissa-journey">
      {/* Header + Interactive Backlit Analog Chronology Tuner */}
      <section className="container kissa-journey-hero">
        <div className="kissa-journey-hero__head">
          <div>
            <span className="mono kissa-eyebrow">
              {lang === 'id' ? '04 / PERJALANAN · LOGBOOK & KREDENSIAL' : '04 / JOURNEY · FIELD LOGBOOK & CREDENTIALS'}
            </span>
            <h1 className="kissa-journey-hero__title">{intro.headline}</h1>
            <p className="kissa-journey-hero__desc">{intro.description}</p>
          </div>
        </div>

        {/* =========================================================
            INTERACTIVE CENTERPIECE: BACKLIT ANALOG CHRONOLOGY TUNER DIAL
           ========================================================= */}
        <div className="kissa-tuner">
          <div className="kissa-tuner__topbar">
            <div className="kissa-tuner__brand">
              <span className="kissa-tuner__led" />
              <span className="mono">CHRONOLOGY TUNER · 2024 — 2026</span>
            </div>
            <div className="kissa-tuner__step">
              <button
                type="button"
                className="mono kissa-tuner__knob"
                onClick={() => setTunerIdx((prev) => (prev - 1 + stations.length) % stations.length)}
              >
                ◀ TUNE
              </button>
              <span className="mono kissa-tuner__freq">{activeStation.freq} MHz</span>
              <button
                type="button"
                className="mono kissa-tuner__knob"
                onClick={() => setTunerIdx((prev) => (prev + 1) % stations.length)}
              >
                TUNE ▶
              </button>
            </div>
          </div>

          {/* Illuminated Warm-Amber Glass Frequency Scale */}
          <div className="kissa-tuner__glass">
            {/* Sliding Glowing Red Tuning Needle */}
            <div
              className="kissa-tuner__needle"
              style={{ left: `${activeStation.pos}%` }}
              aria-hidden="true"
            />

            {/* Ruler Tick Marks */}
            <div className="kissa-tuner__ticks" aria-hidden="true" />

            {/* Clickable Milestone Frequencies */}
            <div className="kissa-tuner__stations" role="tablist" aria-label="Journey Milestones">
              {stations.map((st, idx) => (
                <button
                  key={st.freq}
                  type="button"
                  role="tab"
                  aria-selected={idx === tunerIdx}
                  className={`kissa-tuner__station ${idx === tunerIdx ? 'is-tuned' : ''}`}
                  onClick={() => setTunerIdx(idx)}
                >
                  <span className="mono kissa-tuner__st-freq">{st.freq}</span>
                  <span className="mono kissa-tuner__st-label">{st.label}</span>
                  <span className="mono kissa-tuner__st-year">{st.year}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tuned Signal Readout */}
          <div className="kissa-tuner__readout">
            <div className="kissa-tuner__readout-main">
              <span className="mono kissa-tuner__signal">
                SIGNAL LOCKED · {activeStation.year} · {activeStation.label}
              </span>
              <h2 className="kissa-tuner__title">{activeStation.title}</h2>
              <p className="kissa-tuner__detail">{activeStation.detail}</p>
            </div>

            <a href={activeStation.anchor} className="mono kissa-tuner__jump">
              {lang === 'id' ? 'Lihat Arsip ↓' : 'Jump to Record ↓'}
            </a>
          </div>
        </div>
      </section>

      {/* Chapter 01: Industry Internship Dossier */}
      <section className="band band--paper-2 kissa-journey-band" id="intern-section">
        <div className="container kissa-journey-section">
          <div className="kissa-section-head">
            <span className="mono kissa-eyebrow">{professional.label}</span>
            <h2 className="kissa-section-title">{professional.title}</h2>
          </div>

          <article className="kissa-intern-dossier">
            <div className="kissa-intern-dossier__main">
              <div className="mono kissa-intern-dossier__meta">
                <span>{internship.period}</span>
                <span>{internship.location}</span>
              </div>

              <h3 className="kissa-intern-dossier__company">{internship.company}</h3>

              <div className="kissa-intern-dossier__role-row">
                <span className="mono kissa-role-tag">{internship.role}</span>
                <a
                  href={internship.website.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mono kissa-live-link"
                >
                  {internship.website.label}
                </a>
              </div>

              <p className="kissa-intern-dossier__desc">{internship.description}</p>

              <div className="kissa-deliverables">
                <span className="mono kissa-deliverables__head">
                  {lang === 'id' ? 'KONTRIBUSI & DELIVERABLES' : 'KEY RESPONSIBILITIES & DELIVERABLES'}
                </span>
                <ul>
                  {internship.deliverables.map((item, idx) => (
                    <li key={idx}>
                      <span className="mono kissa-deliverables__num">0{idx + 1}</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="kissa-tags-row">
                {internship.skills.map((skill) => (
                  <span key={skill} className="tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <aside className="kissa-intern-dossier__metrics">
              <span className="mono kissa-intern-dossier__metrics-head">
                {lang === 'id' ? 'RINGKASAN DAMPAK' : 'MEASURED OUTCOMES'}
              </span>
              {internship.metrics.map((m) => (
                <div key={m.label} className="kissa-intern-metric">
                  <span className="mono kissa-intern-metric__k">{m.label}</span>
                  <strong className="kissa-intern-metric__v">{m.value}</strong>
                  <span className="kissa-intern-metric__note">{m.note}</span>
                </div>
              ))}
            </aside>
          </article>
        </div>
      </section>

      {/* Chapter 02: Organizations & Leadership */}
      <section className="container kissa-journey-section kissa-journey-section--padded" id="orgs-section">
        <div className="kissa-section-head">
          <span className="mono kissa-eyebrow">{organizations.label}</span>
          <h2 className="kissa-section-title">{organizations.title}</h2>
          <p className="kissa-section-desc">{organizations.description}</p>
        </div>

        <div className="kissa-orgs-grid">
          {organizations.entries.map((entry) => (
            <article key={entry.name} className="kissa-org-card">
              <div className="mono kissa-org-card__top">
                <span>{entry.period}</span>
                <span className="kissa-org-card__badge">{entry.badge}</span>
              </div>

              <h3 className="kissa-org-card__name">{entry.name}</h3>
              <span className="mono kissa-org-card__role">{entry.role}</span>
              <p className="kissa-org-card__desc">{entry.description}</p>

              {entry.metrics && (
                <div className="kissa-org-card__metrics">
                  {entry.metrics.map((m) => (
                    <div key={m.label}>
                      <span className="mono">{m.label}</span>
                      <strong>{m.value}</strong>
                    </div>
                  ))}
                </div>
              )}

              {entry.highlights && (
                <ul className="kissa-org-card__highlights">
                  {entry.highlights.map((h, i) => (
                    <li key={i}>
                      <span>—</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* Chapter 03: Achievements & Certifications */}
      <section className="band band--paper-2 kissa-journey-band" id="awards-section">
        <div className="container kissa-journey-section">
          <div className="kissa-achievements-head">
            <div>
              <span className="mono kissa-eyebrow">{achievements.label}</span>
              <h2 className="kissa-section-title">{achievements.title}</h2>
            </div>

            <div className="kissa-filters" role="tablist">
              {filterList.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={achFilter === f.id}
                  className={`mono kissa-filter-btn ${achFilter === f.id ? 'is-active' : ''}`}
                  onClick={() => setAchFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="kissa-awards-grid">
            {visibleAchievements.map((entry) => (
              <article key={entry.name} className="kissa-award-card">
                <div className="mono kissa-award-card__top">
                  <span className={`kissa-award-pill kissa-award-pill--${entry.badgeType || 'award'}`}>
                    {entry.result}
                  </span>
                  <span className="kissa-award-card__cat">{entry.category}</span>
                </div>

                <h3 className="kissa-award-card__name">{entry.name}</h3>
                <span className="mono kissa-award-card__org">{entry.organizer}</span>
                <p className="kissa-award-card__desc">{entry.description}</p>

                <div className="kissa-award-card__foot">
                  <div className="kissa-award-card__meta-row">
                    {entry.validity && (
                      <span className="mono kissa-award-card__valid">{entry.validity}</span>
                    )}
                    {entry.certificateUrl && (
                      <a
                        href={entry.certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mono kissa-award-card__pdf"
                      >
                        {lang === 'id' ? 'Lihat Sertifikat (PDF) ↗' : 'View Certificate (PDF) ↗'}
                      </a>
                    )}
                  </div>

                  {entry.skills && (
                    <div className="kissa-tags-row">
                      {entry.skills.map((s) => (
                        <span key={s} className="tag">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
