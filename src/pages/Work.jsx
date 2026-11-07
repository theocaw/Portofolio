import { useState } from 'react';
import ButtonLink from '../components/ButtonLink.jsx';
import PageIntro from '../components/PageIntro.jsx';
import EvidenceModal from '../components/EvidenceModal.jsx';
import ProjectDetailModal from '../components/ProjectDetailModal.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getWorkContent } from '../content/work.js';
import './Work.css';

function OngoingSection({ section, lang, expandedIds, onToggle }) {
  if (!section || !section.items?.length) return null;

  return (
    <section className="band band--ongoing">
      <div className="container ongoing-container">
        <div className="ongoing-header">
          <div className="ongoing-badge">
            <span className="ongoing-dot" />{' '}
            {section.badge || (lang === 'id' ? 'PROYEK SEDANG BERJALAN' : 'ON GOING PROJECTS')}
          </div>
          <span className="mono ongoing-meta">
            {section.meta || (lang === 'id' ? '2026 · TAHAP PENGEMBANGAN AKTIF' : '2026 · IN ACTIVE DEVELOPMENT')}
          </span>
        </div>

        <div className="ongoing-headline-block">
          <h2 className="ongoing-main-title">{section.title}</h2>
          <p className="ongoing-subtitle">{section.subtitle}</p>
        </div>

        <div className="ongoing-grid">
          {section.items.map((item) => {
            const isExpanded = Boolean(expandedIds[item.id]);

            return (
              <div key={item.id} className={`ongoing-card ${isExpanded ? 'is-expanded' : ''}`}>
                <div className="ongoing-card__top">
                  <span className="mono ongoing-card__index">{item.index}</span>
                  <span className="ongoing-card__status">
                    <span className="ongoing-dot ongoing-dot--sm" /> {item.status}
                  </span>
                </div>

                <div className="ongoing-card__body">
                  <p className="mono ongoing-card__category">{item.category}</p>
                  <h3 className="ongoing-card__title">{item.title}</h3>
                  <div className="role-badge-wrap">
                    <span className="role-badge">{item.role}</span>
                  </div>
                  <p className="ongoing-card__tagline">{item.tagline}</p>
                </div>

                {/* Preview Action Bar */}
                <div className="ongoing-card__preview-bar">
                  <div className="ongoing-card__preview-tags">
                    {item.tags.slice(0, 2).map((tag) => (
                      <span key={tag} className="tag tag--ongoing tag--preview">
                        {tag}
                      </span>
                    ))}
                    {item.tags.length > 2 && (
                      <span className="mono tag-more-count">+{item.tags.length - 2}</span>
                    )}
                  </div>

                  {/* Small Toggle Button */}
                  <button
                    type="button"
                    className={`ongoing-small-toggle-btn ${isExpanded ? 'is-active' : ''}`}
                    onClick={() => onToggle(item.id)}
                    aria-expanded={isExpanded}
                    title={
                      isExpanded
                        ? lang === 'id' ? 'Tutup detail proyek' : 'Close project details'
                        : lang === 'id' ? 'Buka detail proyek' : 'Open project details'
                    }
                  >
                    <span>{isExpanded ? '▴' : '▾'}</span>
                    <span>{isExpanded ? (lang === 'id' ? 'Tutup' : 'Close') : (lang === 'id' ? 'Detail' : 'Details')}</span>
                  </button>
                </div>

                {/* Expanded Details Drawer */}
                {isExpanded && (
                  <div className="ongoing-card__details-drawer">
                    <hr className="ongoing-drawer-rule" />
                    <div className="ongoing-drawer-section">
                      <span className="mono ongoing-drawer-label">
                        ✦ {lang === 'id' ? 'DESKRIPSI PROYEK' : 'PROJECT OVERVIEW'}
                      </span>
                      <p className="ongoing-card__description">{item.description}</p>
                    </div>

                    {item.metrics && (
                      <div className="ongoing-drawer-section">
                        <span className="mono ongoing-drawer-label">
                          ✦ {lang === 'id' ? 'METRIK STATUS' : 'STATUS METRICS'}
                        </span>
                        <div className="ongoing-card__metrics">
                          {item.metrics.map((m) => (
                            <div key={m.label} className="ongoing-mini-metric">
                              <span className="mono mini-label">{m.label}</span>
                              <span className="mini-val">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="ongoing-drawer-section">
                      <span className="mono ongoing-drawer-label">
                        ✦ {lang === 'id' ? 'TEKNOLOGI LENGKAP' : 'COMPLETE TECHNOLOGIES'}
                      </span>
                      <ul className="ongoing-card__tags" aria-label="Technologies">
                        {item.tags.map((tag) => (
                          <li key={tag} className="tag tag--ongoing">
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CompletedSectionHeader({ section, lang }) {
  if (!section) return null;

  return (
    <section className="band band--completed-header">
      <div className="container completed-container">
        <div className="completed-header">
          <div className="completed-badge">
            <span className="completed-badge__icon">✦</span>{' '}
            {section.badge || (lang === 'id' ? 'PROYEK SELESAI' : 'COMPLETED PROJECTS')}
          </div>
          <span className="mono completed-meta">{section.meta}</span>
        </div>

        <div className="completed-headline-block">
          <h2 className="completed-main-title">{section.title}</h2>
          {section.subtitle && <p className="completed-subtitle">{section.subtitle}</p>}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, isExpanded, onToggleExpand, onOpenDetailModal, onOpenGallery, lang }) {
  return (
    <article className={`project-card ${isExpanded ? 'is-expanded' : ''}`}>
      {/* 1. Header Information (Always Visible) */}
      <div className="project-card__top">
        <div className="project-card__badges">
          <span className="mono project-card__num">{project.num}</span>
          <span className="mono project-card__category">{project.label}</span>
        </div>
        <div className="project-card__meta-group">
          <span className="role-badge">{project.role}</span>
          <span className="mono project-card__period">{project.meta}</span>
        </div>
      </div>

      {/* 2. Main Title & Short Tagline Preview (Always Visible) */}
      <div className="project-card__main">
        <h2 className={`project-card__title ${project.longTitle ? 'project-card__title--long' : ''}`}>
          {project.title}
        </h2>
        <p className="project-card__tagline">{project.tagline}</p>
      </div>

      {/* 3. Preview Action Bar with the Small Detail Button (Always Visible) */}
      <div className="project-card__preview-bar">
        <div className="project-card__preview-tags">
          {project.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="tag tag--preview">
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="mono tag-more-count">+{project.tags.length - 3}</span>
          )}
        </div>

        <div className="project-card__btn-group">
          {/* THE SMALL DETAIL BUTTON */}
          <button
            type="button"
            className={`project-small-toggle-btn ${isExpanded ? 'is-active' : ''}`}
            onClick={() => onToggleExpand(project.id)}
            aria-expanded={isExpanded}
            title={
              isExpanded
                ? lang === 'id' ? 'Tutup detail proyek' : 'Close project details'
                : lang === 'id' ? 'Buka detail proyek' : 'Open full project details'
            }
          >
            <span className="btn-icon">{isExpanded ? '▴' : '▾'}</span>
            <span>
              {isExpanded
                ? lang === 'id' ? 'Tutup Detail' : 'Close Details'
                : lang === 'id' ? 'Detail Lengkap' : 'Full Details'}
            </span>
          </button>

          {/* Quick Pop-up Modal Button */}
          <button
            type="button"
            className="project-small-modal-btn"
            onClick={() => onOpenDetailModal(project)}
            title={lang === 'id' ? 'Buka dalam jendela modal pop-up' : 'Open in modal dialog'}
            aria-label={lang === 'id' ? `Buka modal ${project.title}` : `Open modal for ${project.title}`}
          >
            <span>⤢</span>
          </button>
        </div>
      </div>

      {/* 4. Expanded In-Depth Details (Revealed Only When The Small Button Is Clicked) */}
      {isExpanded && (
        <div className="project-card__detail-drawer" id={`details-${project.id}`}>
          <hr className="project-drawer-rule" />

          {/* Full In-Depth Narrative */}
          <div className="project-detail-section">
            <span className="mono project-detail-label">
              ✦ {lang === 'id' ? 'PENJELASAN LENGKAP & LATAR BELAKANG' : 'FULL OVERVIEW & PROBLEM CONTEXT'}
            </span>
            <p className="project-card__description">{project.description}</p>
          </div>

          {/* Key Metrics Grid */}
          {project.metrics && (
            <div className="project-detail-section">
              <span className="mono project-detail-label">
                ✦ {lang === 'id' ? 'METRIK KUNCI & HASIL PENGUKURAN' : 'KEY METRICS & MEASURED IMPACT'}
              </span>
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

          {/* Scope & Architecture Highlights Box */}
          {project.highlights && (
            <div className="project-detail-section">
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

          {/* Complete Technology Stack */}
          <div className="project-detail-section">
            <span className="mono project-detail-label">
              ✦ {lang === 'id' ? 'TEKNOLOGI & TOOLS TERAPAN' : 'APPLIED TECHNOLOGIES & TOOLS'}
            </span>
            <ul className="project-card__tags" aria-label="Technologies">
              {project.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {/* Drawer Bottom Actions */}
          <div className="project-detail-drawer__footer">
            {project.hasGallery && project.evidence?.length > 0 && (
              <button
                type="button"
                className="project-gallery-btn"
                onClick={() => onOpenGallery(project)}
                aria-label={`Open charts for ${project.title}`}
              >
                📊 {project.galleryLabel || (lang === 'id' ? 'Lihat Grafik Analisis (5) ↗' : 'View Analysis Charts ↗')}
              </button>
            )}

            <button
              type="button"
              className="project-collapse-footer-btn"
              onClick={() => onToggleExpand(project.id)}
            >
              <span>▴</span> {lang === 'id' ? 'Tutup Detail' : 'Collapse Details'}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default function Work() {
  const { lang } = useApp();
  const work = getWorkContent(lang);
  const { intro, ongoingSection, completedSection, projects, journeyInvitation } = work;

  // Track expanded state for projects
  const [expandedProjects, setExpandedProjects] = useState({});
  const [expandedOngoing, setExpandedOngoing] = useState({});

  // Modals state
  const [activeGalleryProject, setActiveGalleryProject] = useState(null);
  const [activeDetailProject, setActiveDetailProject] = useState(null);

  const toggleProjectExpand = (id) => {
    setExpandedProjects((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleOngoingExpand = (id) => {
    setExpandedOngoing((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      <PageIntro {...intro} />

      {/* On-Going Projects Section (Medigo, Veriface, Siren) */}
      {ongoingSection && (
        <OngoingSection
          section={ongoingSection}
          lang={lang}
          expandedIds={expandedOngoing}
          onToggle={toggleOngoingExpand}
        />
      )}

      {/* Completed Projects Section Header */}
      {completedSection && <CompletedSectionHeader section={completedSection} lang={lang} />}

      {/* Completed Academic Projects List */}
      <section className="container projects-container">
        <div className="projects-grid">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isExpanded={Boolean(expandedProjects[project.id])}
              onToggleExpand={toggleProjectExpand}
              onOpenDetailModal={(proj) => setActiveDetailProject(proj)}
              onOpenGallery={(proj) => setActiveGalleryProject(proj)}
              lang={lang}
            />
          ))}
        </div>
      </section>

      {/* Project Detail Modal (Full-Screen Case Study Dialog) */}
      <ProjectDetailModal
        isOpen={Boolean(activeDetailProject)}
        onClose={() => setActiveDetailProject(null)}
        project={activeDetailProject}
        lang={lang}
        onOpenGallery={(proj) => setActiveGalleryProject(proj)}
      />

      {/* Evidence Modal for visual analysis charts */}
      <EvidenceModal
        isOpen={Boolean(activeGalleryProject)}
        onClose={() => setActiveGalleryProject(null)}
        title={activeGalleryProject?.title || ''}
        images={activeGalleryProject?.evidence || []}
      />

      {/* Journey Invitation */}
      <section className="container journey-invitation">
        <h2 className="journey-invitation__title">{journeyInvitation.title}</h2>
        <ButtonLink to={journeyInvitation.action?.to || journeyInvitation.to}>
          {journeyInvitation.action?.label ||
            journeyInvitation.cta ||
            (lang === 'id' ? 'Jelajahi perjalananku ↗' : 'Explore my journey ↗')}
        </ButtonLink>
      </section>
    </>
  );
}
