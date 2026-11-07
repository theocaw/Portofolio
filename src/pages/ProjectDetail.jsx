import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { getWorkContent } from '../content/work.js';
import EvidenceModal from '../components/EvidenceModal.jsx';
import './ProjectDetail.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const { lang } = useApp();
  const work = getWorkContent(lang);

  const projectIndex = work.projects.findIndex((p) => p.id === id);
  const project = projectIndex !== -1 ? work.projects[projectIndex] : null;
  const prevProject = projectIndex > 0 ? work.projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex !== -1 && projectIndex < work.projects.length - 1
      ? work.projects[projectIndex + 1]
      : null;

  // Embedded gallery state (for projects with evidence like Ames Housing)
  const [activeSlide, setActiveSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Scroll to top when project ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveSlide(0);
  }, [id]);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const hasEvidence = Boolean(project.hasGallery && project.evidence?.length);

  // Dynamic section index counter
  let currentSection = 0;
  const nextSectionIndex = () => {
    currentSection += 1;
    return String(currentSection).padStart(2, '0');
  };

  return (
    <article className="project-detail-page">
      {/* 1. Top Breadcrumb Bar */}
      <nav className="container project-detail-nav" aria-label="Breadcrumbs">
        <Link to="/work" className="project-detail-back-link">
          <span className="back-arrow">←</span>
          <span>{lang === 'id' ? 'Kembali ke Semua Proyek' : 'Back to All Projects'}</span>
        </Link>

        <div className="project-detail-nav-meta">
          <span className="mono nav-index">{project.num} / 05</span>
          <span className="mono nav-cat">{project.label}</span>
        </div>
      </nav>

      {/* 2. Hero Dossier Header */}
      <header className="container project-detail-hero">
        <div className="project-detail-hero__top">
          <div className="project-detail-hero__badges">
            <span className="mono hero-num-badge">{project.num}</span>
            <span className="mono hero-cat-badge">{project.label}</span>
          </div>

          <div className="project-detail-hero__meta">
            <span className="role-badge">{project.role}</span>
            <span className="mono hero-period">{project.meta}</span>
          </div>
        </div>

        <h1 className="project-detail-hero__title">{project.title}</h1>
        <p className="project-detail-hero__tagline">{project.tagline}</p>
      </header>

      {/* 3. Main Case Study Content */}
      <main className="container project-detail-body">
        {/* Academic Coursework Strip if present */}
        {project.caseStudy?.courseInfo && (
          <aside className="detail-academic-strip" aria-label="Coursework Dossier">
            <div className="academic-strip-header">
              <span className="mono academic-strip-tag">
                {lang === 'id' ? 'DOSIR AKADEMIK RESMI' : 'OFFICIAL ACADEMIC DOSSIER'}
              </span>
              <span className="mono academic-strip-date">{project.caseStudy.courseInfo.date}</span>
            </div>
            <div className="academic-strip-grid">
              <div className="academic-strip-item">
                <span className="mono academic-label">{lang === 'id' ? 'Mata Kuliah' : 'Course'}</span>
                <span className="academic-value">{project.caseStudy.courseInfo.course}</span>
              </div>
              <div className="academic-strip-item">
                <span className="mono academic-label">{lang === 'id' ? 'Institusi' : 'Institution'}</span>
                <span className="academic-value">{project.caseStudy.courseInfo.institution}</span>
              </div>
              <div className="academic-strip-item">
                <span className="mono academic-label">{lang === 'id' ? 'Penulis' : 'Author'}</span>
                <span className="academic-value">{project.caseStudy.courseInfo.author}</span>
              </div>
              <div className="academic-strip-item">
                <span className="mono academic-label">{lang === 'id' ? 'Sumber Dataset' : 'Dataset Source'}</span>
                <span className="academic-value">{project.caseStudy.courseInfo.dataset}</span>
              </div>
            </div>
            {project.caseStudy.courseInfo.scope && (
              <div className="academic-strip-footer">
                <span className="mono academic-label">{lang === 'id' ? 'Cakupan Data' : 'Data Scope'}</span>
                <span className="academic-scope-text">{project.caseStudy.courseInfo.scope}</span>
              </div>
            )}
          </aside>
        )}

        {/* Section: Overview & Problem Context */}
        <section className="detail-card detail-card--overview">
          <div className="detail-section-header">
            <span className="mono section-index">{nextSectionIndex()}</span>
            <h2 className="detail-section-title">
              {lang === 'id' ? 'Tentang Proyek & Latar Belakang' : 'Overview & Problem Context'}
            </h2>
          </div>
          <p className="detail-narrative">{project.description}</p>
        </section>

        {/* Section: Key Metrics & Measured Impact */}
        {project.metrics && (
          <section className="detail-card detail-card--metrics">
            <div className="detail-section-header">
              <span className="mono section-index">{nextSectionIndex()}</span>
              <h2 className="detail-section-title">
                {lang === 'id' ? 'Hasil & Metrik Kunci' : 'Key Metrics & Measured Impact'}
              </h2>
            </div>

            <div className="project-metrics-grid detail-metrics-grid">
              {project.metrics.map((m) => (
                <div key={m.label} className="project-metric-pill detail-metric-pill">
                  <span className="mono project-metric-label">{m.label}</span>
                  <span className="project-metric-val detail-metric-val">{m.value}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Technical Architecture & Scope */}
        {project.highlights && (
          <section className="detail-card detail-card--highlights">
            <div className="detail-section-header">
              <span className="mono section-index">{nextSectionIndex()}</span>
              <h2 className="detail-section-title">
                {lang === 'id' ? 'Ruang Lingkup & Metodologi' : 'Scope & Technical Methodology'}
              </h2>
            </div>

            <div className="project-highlights-box detail-highlights-box">
              <span className="mono project-highlights-title">
                ✦ {project.role.toUpperCase()}{' '}
                {lang === 'id' ? 'LANGKAH PENGERJAAN & IMPLEMENTASI' : 'RESPONSIBILITIES & METHODOLOGY'}
              </span>
              <ul className="project-highlights-list">
                {project.highlights.map((h, i) => (
                  <li key={i}>
                    <span className="highlight-bullet">•</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Section: Four Pillars of Data Mining Analysis (if caseStudy.pillars exist) */}
        {project.caseStudy?.pillars && (
          <section className="detail-card detail-card--pillars">
            <div className="detail-section-header">
              <span className="mono section-index">{nextSectionIndex()}</span>
              <div className="detail-evidence-title-group">
                <h2 className="detail-section-title">
                  {lang === 'id' ? 'Empat Pilar Analisis Data Mining' : 'Four Pillars of the Data Mining Cycle'}
                </h2>
                <span className="mono evidence-counter">
                  {project.caseStudy.pillars.length} {lang === 'id' ? 'PILAR' : 'PILLARS'}
                </span>
              </div>
            </div>

            <div className="case-pillars-grid">
              {project.caseStudy.pillars.map((pillar) => (
                <article key={pillar.index} className="case-pillar-card">
                  <div className="case-pillar-header">
                    <div className="case-pillar-badges">
                      <span className="mono case-pillar-idx">{pillar.index}</span>
                      <span className="mono case-pillar-category">{pillar.category}</span>
                    </div>
                    {pillar.metricBadge && (
                      <span className="mono case-pillar-metric">{pillar.metricBadge}</span>
                    )}
                  </div>

                  <h3 className="case-pillar-title">{pillar.title}</h3>
                  <p className="case-pillar-summary">{pillar.summary}</p>

                  <ul className="case-pillar-bullets">
                    {pillar.details.map((bullet, bIdx) => (
                      <li key={bIdx}>
                        <span className="highlight-bullet">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Section: Executive Summary & Actionable Recommendations (if caseStudy.recommendations exist) */}
        {project.caseStudy?.recommendations && (
          <section className="detail-card detail-card--recommendations">
            <div className="detail-section-header">
              <span className="mono section-index">{nextSectionIndex()}</span>
              <div className="detail-evidence-title-group">
                <h2 className="detail-section-title">
                  {lang === 'id'
                    ? 'Kesimpulan Eksekutif & Rekomendasi Bisnis Terapan'
                    : 'Executive Summary & Actionable Business Insights'}
                </h2>
                <span className="mono evidence-counter">
                  {project.caseStudy.recommendations.length} {lang === 'id' ? 'AKSI' : 'ACTIONS'}
                </span>
              </div>
            </div>

            <div className="case-recommendations-grid">
              {project.caseStudy.recommendations.map((rec) => (
                <div key={rec.index} className="case-recommendation-card">
                  <div className="case-rec-badge">
                    <span className="mono case-rec-num">{rec.index}</span>
                    <span className="mono case-rec-tag">
                      {lang === 'id' ? 'REKOMENDASI STRATEGIS' : 'ACTIONABLE INSIGHT'}
                    </span>
                  </div>
                  <h3 className="case-rec-title">{rec.title}</h3>
                  <p className="case-rec-takeaway">{rec.takeaway}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Applied Technologies & Tools */}
        <section className="detail-card detail-card--tech">
          <div className="detail-section-header">
            <span className="mono section-index">{nextSectionIndex()}</span>
            <h2 className="detail-section-title">
              {lang === 'id' ? 'Teknologi & Alat Terapan' : 'Applied Technology Stack'}
            </h2>
          </div>

          <ul className="project-card__tags detail-tags-list" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag} className="tag tag--lg">
                {tag}
              </li>
            ))}
          </ul>
        </section>

        {/* Section: Evidence / Analysis Charts (Interactive Inline Showcase) */}
        {hasEvidence && (
          <section className="detail-card detail-card--evidence">
            <div className="detail-section-header">
              <span className="mono section-index">{nextSectionIndex()}</span>
              <div className="detail-evidence-title-group">
                <h2 className="detail-section-title">
                  {lang === 'id' ? 'Bukti Analisis & Grafik Visual' : 'Visual Analysis & Evidence Charts'}
                </h2>
                <span className="mono evidence-counter">
                  {String(activeSlide + 1).padStart(2, '0')} / {String(project.evidence.length).padStart(2, '0')}
                </span>
              </div>
            </div>

            <div className="detail-evidence-viewer">
              <div className="detail-evidence-frame">
                <img
                  src={project.evidence[activeSlide].src}
                  alt={project.evidence[activeSlide].alt}
                  className="detail-evidence-img"
                />
              </div>

              {project.evidence.length > 1 && (
                <div className="detail-evidence-controls">
                  <button
                    type="button"
                    className="evidence-nav-btn"
                    onClick={() =>
                      setActiveSlide((prev) => (prev - 1 + project.evidence.length) % project.evidence.length)
                    }
                    aria-label="Previous chart"
                  >
                    ←
                  </button>

                  <div className="evidence-dots">
                    {project.evidence.map((ev, idx) => (
                      <button
                        key={ev.src}
                        type="button"
                        className={`evidence-dot ${activeSlide === idx ? 'is-active' : ''}`}
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className="evidence-nav-btn"
                    onClick={() => setActiveSlide((prev) => (prev + 1) % project.evidence.length)}
                    aria-label="Next chart"
                  >
                    →
                  </button>

                  <button
                    type="button"
                    className="evidence-fullscreen-btn"
                    onClick={() => setIsModalOpen(true)}
                  >
                    ⛶ {lang === 'id' ? 'Layar Penuh' : 'Fullscreen'}
                  </button>
                </div>
              )}

              {project.evidence[activeSlide].caption && (
                <div className="detail-evidence-caption">
                  <p>{project.evidence[activeSlide].caption}</p>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* 4. Next / Previous Project Navigation */}
      <footer className="container project-detail-footer">
        <div className="project-detail-pager">
          {prevProject ? (
            <Link to={`/work/${prevProject.id}`} className="project-pager-card project-pager-card--prev">
              <span className="mono pager-direction">
                ← {lang === 'id' ? 'Proyek Sebelumnya' : 'Previous Project'}
              </span>
              <span className="pager-title">{prevProject.title}</span>
            </Link>
          ) : (
            <div className="project-pager-card is-disabled" />
          )}

          <Link to="/work" className="project-pager-all-btn">
            <span>▦</span>
            <span>{lang === 'id' ? 'Semua Proyek' : 'All Projects'}</span>
          </Link>

          {nextProject ? (
            <Link to={`/work/${nextProject.id}`} className="project-pager-card project-pager-card--next">
              <span className="mono pager-direction">
                {lang === 'id' ? 'Proyek Selanjutnya' : 'Next Project'} →
              </span>
              <span className="pager-title">{nextProject.title}</span>
            </Link>
          ) : (
            <div className="project-pager-card is-disabled" />
          )}
        </div>
      </footer>

      {/* Fullscreen modal for visual evidence if requested */}
      {hasEvidence && (
        <EvidenceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={project.title}
          images={project.evidence}
        />
      )}
    </article>
  );
}
