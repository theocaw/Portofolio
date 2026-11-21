import { useState } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { getJourneyContent } from '../content/journey.js';
import './Journey.css';

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

  const [achFilter, setAchFilter] = useState('all');
  const filterList = ACHIEVEMENT_FILTERS[lang] || ACHIEVEMENT_FILTERS.en;

  const visibleAchievements =
    achFilter === 'all'
      ? achievements.entries
      : achFilter === 'verified'
        ? achievements.entries.filter((a) => a.badgeType === 'verified')
        : achievements.entries.filter((a) => a.badgeType !== 'verified');

  return (
    <div className="kissa-journey">
      {/* Header */}
      <section className="container kissa-journey-hero">
        <span className="mono kissa-eyebrow">
          {lang === 'id' ? '04 / LOGBOOK PERJALANAN & ARSIP KREDENSIAL' : '04 / FIELD LOGBOOK & CREDENTIALS ARCHIVE'}
        </span>
        <h1 className="kissa-journey-hero__title">{intro.headline}</h1>
        <p className="kissa-journey-hero__desc">{intro.description}</p>
      </section>

      {/* Chapter 01: Industry Internship Dossier */}
      <section className="band band--paper-2 kissa-journey-band">
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
      <section className="container kissa-journey-section kissa-journey-section--padded">
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
      <section className="band band--paper-2 kissa-journey-band">
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
