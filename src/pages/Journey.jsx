import { useState } from 'react';
import PageBackdrop from '../components/PageBackdrop.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getJourneyContent } from '../content/journey.js';
import './Journey.css';

const ACHIEVEMENT_FILTERS = {
  en: [
    { id: 'all', label: 'All Plaques' },
    { id: 'award', label: '🏆 Competition Awards' },
    { id: 'verified', label: '✦ Certifications' },
  ],
  id: [
    { id: 'all', label: 'Semua Plakat' },
    { id: 'award', label: '🏆 Juara Kompetisi' },
    { id: 'verified', label: '✦ Sertifikasi Resmi' },
  ],
};

export default function Journey() {
  const { lang } = useApp();
  const journey = getJourneyContent(lang);
  const { intro, professional, organizations, achievements } = journey;
  const { internship } = professional;

  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'intern' | 'orgs' | 'awards'
  const [achFilter, setAchFilter] = useState('all');

  const filterList = ACHIEVEMENT_FILTERS[lang] || ACHIEVEMENT_FILTERS.en;

  const visibleAchievements =
    achFilter === 'all'
      ? achievements.entries
      : achFilter === 'verified'
        ? achievements.entries.filter((a) => a.badgeType === 'verified')
        : achievements.entries.filter((a) => a.badgeType !== 'verified');

  const chapterTabs = [
    { id: 'all', label: lang === 'id' ? '📔 Semua Arsip' : '📔 Full Logbook' },
    { id: 'intern', label: lang === 'id' ? '🏢 Magang Industri (PT KCT)' : '🏢 Industry Dispatch (PT KCT)' },
    { id: 'orgs', label: lang === 'id' ? '📌 Papan Organisasi (5)' : '📌 Bulletin Board (5 Orgs)' },
    { id: 'awards', label: lang === 'id' ? '🏆 Rak Piala & Sertifikat (6)' : '🏆 Trophy & Cert Shelf (6)' },
  ];

  return (
    <div className="slowbar-journey-page">
      {/* =========================================================
          TOP LOGBOOK STAGE & CHAPTER TABS
         ========================================================= */}
      <section className="logbook-hero">
        <PageBackdrop variant="fireflies" />

        <div className="container logbook-hero__container">
          <div className="logbook-header-bar">
            <div>
              <span className="mono logbook-eyebrow">
                📔 {lang === 'id' ? 'LOGBOOK PERJALANAN & PAPAN BULETIN SLOWBAR' : 'SLOWBAR TRAVELER LOGBOOK & BULLETIN BOARD'}
              </span>
              <h1 className="logbook-main-title">{intro.headline}</h1>
              <p className="logbook-sub-desc">{intro.description}</p>
            </div>

            <div className="logbook-tabs" role="tablist">
              {chapterTabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === t.id}
                  className={`mono logbook-tab-btn ${activeTab === t.id ? 'is-active' : ''}`}
                  onClick={() => setActiveTab(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* =========================================================
              CHAPTER 01: PERFORATED FIELD DISPATCH TICKET (PT KCT INTERNSHIP)
             ========================================================= */}
          {(activeTab === 'all' || activeTab === 'intern') && (
            <article className="dispatch-ticket experience-dossier">
              {/* Left Main Manifest */}
              <div className="dispatch-ticket__main">
                <div className="dispatch-ticket__top">
                  <span className="mono dispatch-ticket__stamp">
                    ✦ FIELD DISPATCH #01 · {internship.period}
                  </span>
                  <span className="mono dispatch-ticket__loc">📍 {internship.location}</span>
                </div>

                <h2 className="dispatch-ticket__company">{internship.company}</h2>
                <div className="dispatch-ticket__role-row">
                  <span className="role-badge">{internship.role}</span>
                  <a
                    href={internship.website.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mono dispatch-ticket__live-btn"
                  >
                    {internship.website.label}
                  </a>
                </div>

                <p className="dispatch-ticket__desc">{internship.description}</p>

                <div className="dispatch-ticket__deliverables">
                  <span className="mono dispatch-ticket__subhead">
                    ✦ {lang === 'id' ? 'KONTRIBUSI & DELIVERABLES:' : 'VERIFIED DELIVERABLES:'}
                  </span>
                  <ul>
                    {internship.deliverables.map((item, idx) => (
                      <li key={idx}>
                        <span className="deliverable-check">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="dispatch-ticket__skills">
                  {internship.skills.map((skill) => (
                    <span key={skill} className="mono dispatch-skill-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Perforated Tear Line */}
              <div className="dispatch-ticket__perforation" aria-hidden="true" />

              {/* Right Ticket Stub: 3 Impact Coasters */}
              <div className="dispatch-ticket__stub">
                <span className="mono dispatch-ticket__stub-head">
                  {lang === 'id' ? 'BUKTI DAMPAK' : 'IMPACT STUB'}
                </span>
                <div className="dispatch-ticket__metrics">
                  {internship.metrics.map((m) => (
                    <div key={m.label} className="dispatch-stub-card">
                      <span className="mono dispatch-stub-card__k">{m.label}</span>
                      <strong className="dispatch-stub-card__v">{m.value}</strong>
                      <span className="dispatch-stub-card__note">{m.note}</span>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* =========================================================
          CHAPTER 02: MASKING-TAPE CAFE BULLETIN BOARD (ORGANIZATIONS)
         ========================================================= */}
      {(activeTab === 'all' || activeTab === 'orgs') && (
        <section className="band band--paper-2 bulletin-board-section">
          <div className="container bulletin-board-container">
            <div className="bulletin-board-header">
              <span className="mono logbook-eyebrow">
                📌 {organizations.label} · {lang === 'id' ? 'PAPAN BULETIN KAFE' : 'TAPED STUDIO BULLETIN BOARD'}
              </span>
              <h2 className="bulletin-board-title">{organizations.title}</h2>
              <p className="bulletin-board-desc">{organizations.description}</p>
            </div>

            <div className="organizations-bento">
              {organizations.entries.map((entry, idx) => (
                <article
                  key={entry.name}
                  className={`org-bento-card org-bento-card--tilt-${(idx % 3) + 1}`}
                >
                  <span className="slowbar-masking-tape" aria-hidden="true" />

                  <div className="org-bento-card__top">
                    <span className="mono org-bento-period">{entry.period}</span>
                    <span className="mono org-bento-badge">{entry.badge}</span>
                  </div>

                  <div className="org-bento-card__identity">
                    <h3 className="org-bento-name">{entry.name}</h3>
                    <div className="role-badge-wrap">
                      <span className="role-badge">{entry.role}</span>
                    </div>
                  </div>

                  <p className="org-bento-description">{entry.description}</p>

                  {entry.metrics && (
                    <div className="org-bento-metrics">
                      {entry.metrics.map((m) => (
                        <div key={m.label} className="org-mini-stat">
                          <span className="mono org-stat-label">{m.label}</span>
                          <span className="org-stat-val">{m.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {entry.highlights && (
                    <ul className="org-bento-highlights">
                      {entry.highlights.map((h, i) => (
                        <li key={i}>
                          <span className="org-bullet">✦</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          CHAPTER 03: WOODEN TROPHY & RECORD PLAQUE SHELF (ACHIEVEMENTS)
         ========================================================= */}
      {(activeTab === 'all' || activeTab === 'awards') && (
        <section className="container trophy-shelf-section">
          <div className="trophy-shelf-header">
            <div>
              <span className="mono logbook-eyebrow">
                🏆 {achievements.label} · {lang === 'id' ? 'RAK PENGHARGAAN & SERTIFIKASI' : 'WOODEN TROPHY & PLAQUE SHELF'}
              </span>
              <h2 className="bulletin-board-title">{achievements.title}</h2>
            </div>

            <div className="journey-filter-bar" role="tablist">
              {filterList.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={achFilter === f.id}
                  className={`work-filter-pill ${achFilter === f.id ? 'is-active' : ''}`}
                  onClick={() => setAchFilter(f.id)}
                >
                  <span>{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="achievements-showcase-grid">
            {visibleAchievements.map((entry) => (
              <article key={entry.name} className="achievement-showcase-card">
                <div className="achievement-card__top">
                  <span className={`achievement-ribbon ribbon--${entry.badgeType || 'award'}`}>
                    {entry.badgeType === 'verified' ? '✦' : '🏆'} {entry.result}
                  </span>
                  <span className="mono achievement-category">{entry.category}</span>
                </div>

                <div className="achievement-card__body">
                  <h3 className="achievement-name">{entry.name}</h3>
                  <p className="mono achievement-organizer">{entry.organizer}</p>
                  <p className="achievement-description">{entry.description}</p>
                </div>

                <div className="achievement-card__footer">
                  <div className="achievement-card__meta-row">
                    {entry.validity && (
                      <span className="mono achievement-validity">🕒 {entry.validity}</span>
                    )}
                    {entry.certificateUrl && (
                      <a
                        href={entry.certificateUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mono achievement-cert-link"
                      >
                        {entry.certificateLabel ||
                          (lang === 'id' ? '📄 Lihat Sertifikat (PDF) ↗' : '📄 View Certificate (PDF) ↗')}
                      </a>
                    )}
                  </div>

                  {entry.skills && (
                    <ul className="achievement-tags">
                      {entry.skills.map((s) => (
                        <li key={s} className="tag tag--achievement">
                          {s}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
