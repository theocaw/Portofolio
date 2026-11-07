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
  const nextProject = projectIndex !== -1 && projectIndex < work.projects.length - 1 ? work.projects[projectIndex + 1] : null;

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
        {/* Section 01: Overview & Problem Context */}
        <section className="detail-card detail-card--overview">
          <div className="detail-section-header">
            <span className="mono section-index">01</span>
            <h2 className="detail-section-title">
              {lang === 'id' ? 'Tentang Proyek & Latar Belakang' : 'Overview & Problem Context'}
            </h2>
          </div>
          <p className="detail-narrative">{project.description}</p>
        </section>

        {/* Section 02: Key Metrics & Measured Impact */}
        {project.metrics && (
          <section className="detail-card detail-card--metrics">
            <div className="detail-section-header">
              <span className="mono section-index">02</span>
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

        {/* Section 03: Technical Architecture & Scope */}
        {project.highlights && (
          <section className="detail-card detail-card--highlights">
            <div className="detail-section-header">
              <span className="mono section-index">03</span>
              <h2 className="detail-section-title">
                {lang === 'id' ? 'Ruang Lingkup & Arsitektur Teknis' : 'Scope & Technical Architecture'}
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
                    <span className="highlight-bullet">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Section 04: Applied Technologies & Tools */}
        <section className="detail-card detail-card--tech">
          <div className="detail-section-header">
            <span className="mono section-index">04</span>
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

        {/* Section 05: Evidence / Analysis Charts (Interactive Inline Showcase) */}
        {hasEvidence && (
          <section className="detail-card detail-card--evidence">
            <div className="detail-section-header">
              <span className="mono section-index">05</span>
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
                    onClick={() => setActiveSlide((prev) => (prev - 1 + project.evidence.length) % project.evidence.length)}
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
                    ⤢ {lang === 'id' ? 'Layar Penuh' : 'Fullscreen'}
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
            <span>⊞</span>
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
