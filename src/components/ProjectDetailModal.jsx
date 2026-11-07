import { useEffect } from 'react';
import './ProjectDetailModal.css';

export default function ProjectDetailModal({ isOpen, onClose, project, lang, onOpenGallery }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="proj-modal__backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="proj-modal__dialog" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="proj-modal__header">
          <div className="proj-modal__title-group">
            <div className="proj-modal__badges">
              <span className="mono proj-modal__num">{project.num || project.index}</span>
              <span className="mono proj-modal__cat">{project.label || project.category}</span>
              {project.status && (
                <span className="proj-modal__status">
                  <span className="ongoing-dot ongoing-dot--sm" /> {project.status}
                </span>
              )}
            </div>
            <h2 className="proj-modal__title">{project.title}</h2>
            <div className="proj-modal__meta-row">
              <span className="role-badge">{project.role}</span>
              {project.meta && <span className="mono proj-modal__period">{project.meta}</span>}
            </div>
          </div>

          <button
            type="button"
            className="proj-modal__close-btn"
            onClick={onClose}
            aria-label="Close dialog"
            title="Tutup (ESC)"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="proj-modal__body">
          {/* Tagline */}
          <p className="proj-modal__tagline">{project.tagline}</p>

          {/* Full Description */}
          <div className="proj-modal__section">
            <h3 className="mono proj-modal__section-title">
              ✦ {lang === 'id' ? 'PENJELASAN LENGKAP & LATAR BELAKANG' : 'FULL OVERVIEW & CONTEXT'}
            </h3>
            <p className="proj-modal__description">{project.description}</p>
          </div>

          {/* Key Metrics */}
          {project.metrics && (
            <div className="proj-modal__section">
              <h3 className="mono proj-modal__section-title">
                ✦ {lang === 'id' ? 'METRIK UTAMA & DAMPAK TEKNIS' : 'KEY METRICS & IMPACT'}
              </h3>
              <div className="project-metrics-grid">
                {project.metrics.map((m) => (
                  <div key={m.label} className="project-metric-pill">
                    <span className="mono project-metric-label">{m.label}</span>
                    <span className="project-metric-val">{m.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Highlights & Architecture */}
          {project.highlights && (
            <div className="proj-modal__section">
              <div className="project-highlights-box">
                <span className="mono project-highlights-title">
                  ✦ {project.role.toUpperCase()}{' '}
                  {lang === 'id' ? 'RUANG LINGKUP & ARSITEKTUR TEKNIS' : 'SCOPE & ARCHITECTURE'}
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
            </div>
          )}

          {/* Full Tech Stack */}
          {project.tags && (
            <div className="proj-modal__section">
              <h3 className="mono proj-modal__section-title">
                ✦ {lang === 'id' ? 'TEKNOLOGI & TOOLS' : 'TECHNOLOGY STACK'}
              </h3>
              <ul className="project-card__tags" aria-label="Technologies">
                {project.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="proj-modal__footer">
          {project.hasGallery && project.evidence?.length > 0 && (
            <button
              type="button"
              className="project-gallery-btn"
              onClick={() => {
                onClose();
                onOpenGallery(project);
              }}
            >
              📊 {project.galleryLabel || (lang === 'id' ? 'Lihat Grafik Analisis (5) ↗' : 'View Analysis Charts ↗')}
            </button>
          )}

          <button
            type="button"
            className="proj-modal__dismiss-btn"
            onClick={onClose}
          >
            {lang === 'id' ? 'Tutup' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
