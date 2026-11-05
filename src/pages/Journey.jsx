import PageIntro from '../components/PageIntro.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getJourneyContent } from '../content/journey.js';
import './Journey.css';

export default function Journey() {
  const { lang } = useApp();
  const journey = getJourneyContent(lang);
  const { intro, professional, organizations, achievements } = journey;
  const { internship } = professional;

  return (
    <>
      <PageIntro {...intro} />

      {/* 01: Professional Experience Dossier */}
      <section className="container journey-section">
        <div className="section-meta-header">
          <p className="label">{professional.label}</p>
          <span className="mono section-meta-tag">
            {lang === 'id' ? 'PENGALAMAN KERJA INDUSTRI' : 'WORKPLACE IMMERSION'}
          </span>
        </div>

        <div className="journey-heading">
          <h2 className="journey-heading__title">{professional.title}</h2>
        </div>

        <article className="experience-dossier">
          <div className="experience-dossier__header">
            <div className="experience-dossier__main">
              <span className="mono experience-dossier__period">{internship.period}</span>
              <h3 className="experience-dossier__company">{internship.company}</h3>
              <div className="experience-dossier__role-wrap">
                <span className="role-badge">{internship.role}</span>
                <span className="experience-dossier__location">📍 {internship.location}</span>
              </div>
            </div>

            <a
              className="experience-dossier__link-btn"
              href={internship.website.url}
              target="_blank"
              rel="noreferrer"
            >
              {internship.website.label}
            </a>
          </div>

          <p className="experience-dossier__description">{internship.description}</p>

          {/* 3 Metric Highlight Cards */}
          <div className="experience-metrics-grid">
            {internship.metrics.map((m) => (
              <div key={m.label} className="experience-metric-card">
                <span className="mono metric-card-label">{m.label}</span>
                <span className="metric-card-val">{m.value}</span>
                <span className="metric-card-note">{m.note}</span>
              </div>
            ))}
          </div>

          {/* Deliverables Checklist */}
          <div className="experience-deliverables">
            <span className="mono deliverables-title">
              ✦ {lang === 'id' ? 'TANGGUNG JAWAB & KONTRIBUSI UTAMA' : 'KEY RESPONSIBILITIES & DELIVERABLES'}
            </span>
            <ul className="deliverables-list">
              {internship.deliverables.map((item, idx) => (
                <li key={idx}>
                  <span className="deliverable-check">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Competency Tag Cloud */}
          <div className="experience-skills-wrap">
            <span className="mono skills-title">
              {lang === 'id' ? 'KOMPETENSI TERAPAN:' : 'APPLIED COMPETENCIES:'}
            </span>
            <ul className="experience-skills-list">
              {internship.skills.map((skill) => (
                <li key={skill} className="tag tag--skill">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      {/* 02: Organizations & Leadership Bento Grid */}
      <section className="band band--paper-2">
        <div className="container section journey-section">
          <div className="section-meta-header">
            <p className="label">{organizations.label}</p>
            <span className="mono section-meta-tag">
              {lang === 'id' ? 'REKAM JEJAK KEPEMIMPINAN' : 'LEADERSHIP TRACK'}
            </span>
          </div>

          <h2 className="journey-heading__title journey-heading__title--large">{organizations.title}</h2>
          <p className="journey-section__description">{organizations.description}</p>

          <div className="organizations-bento">
            {organizations.entries.map((entry) => (
              <article key={entry.name} className="org-bento-card">
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

      {/* 03: Achievements & Certifications Showcase */}
      <section className="container section journey-section">
        <div className="section-meta-header">
          <p className="label">{achievements.label}</p>
          <span className="mono section-meta-tag">
            {lang === 'id' ? 'PRESTASI & SERTIFIKASI RESMI' : 'CREDENTIALS & HONORS'}
          </span>
        </div>

        <div className="journey-heading-block">
          <h2 className="journey-heading__title journey-heading__title--large">{achievements.title}</h2>
          <p className="journey-section__description">{achievements.subtitle}</p>
        </div>

        <div className="achievements-showcase-grid">
          {achievements.entries.map((a, idx) => {
            const isCertified = a.badgeType === 'verified';
            const isAward = a.badgeType === 'award';

            return (
              <article key={idx} className="achievement-showcase-card">
                <div className="achievement-card__top">
                  <span
                    className={`achievement-ribbon ${
                      isCertified ? 'ribbon--verified' : isAward ? 'ribbon--award' : 'ribbon--milestone'
                    }`}
                  >
                    {isCertified ? '✦ ' : isAward ? '🏆 ' : '★ '}
                    {a.result}
                  </span>
                  <span className="mono achievement-category">{a.category}</span>
                </div>

                <div className="achievement-card__body">
                  <h3 className="achievement-name">{a.name}</h3>
                  <p className="mono achievement-organizer">{a.organizer}</p>
                  <p className="achievement-description">{a.description}</p>
                </div>

                <div className="achievement-card__footer">
                  <span className="mono achievement-validity">{a.validity}</span>
                  {a.tags && (
                    <ul className="achievement-tags" aria-label="Tags">
                      {a.tags.map((t) => (
                        <li key={t} className="tag tag--achievement">
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
}
