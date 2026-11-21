import { useState } from 'react';
import { Link } from 'react-router-dom';
import ButtonLink from '../components/ButtonLink.jsx';
import PageIntro from '../components/PageIntro.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getWorkContent } from '../content/work.js';
import './Work.css';

const PROJECT_CATEGORIES = {
  'ames-housing': 'data',
  canvar: 'ar',
  cafier: 'system',
  'dthanasha-kost': 'system',
  'alumni-portal': 'system',
};

const PROJECT_THEMES = {
  'ames-housing': { accent: 'cobalt', icon: '📊' },
  canvar: { accent: 'rose', icon: '🕶️' },
  cafier: { accent: 'amber', icon: '☕' },
  'dthanasha-kost': { accent: 'mint', icon: '🏠' },
  'alumni-portal': { accent: 'violet', icon: '🎓' },
};

const FILTERS = {
  en: [
    { id: 'all', label: '💿 Full Catalog' },
    { id: 'data', label: 'SIDE A · Data & ML' },
    { id: 'system', label: 'SIDE B · System & Web' },
    { id: 'ar', label: 'BONUS · AR & 3D' },
  ],
  id: [
    { id: 'all', label: '💿 Katalog Lengkap' },
    { id: 'data', label: 'SIDE A · Data & ML' },
    { id: 'system', label: 'SIDE B · Sistem & Web' },
    { id: 'ar', label: 'BONUS · AR & 3D' },
  ],
};

/**
 * On-Going Projects Section
 */
function OngoingSection({ section, lang }) {
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
          {section.items.map((item) => (
            <div key={item.id} className="ongoing-card">
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
                <p className="ongoing-card__description">{item.description}</p>

                {item.metrics && (
                  <div className="ongoing-card__metrics">
                    {item.metrics.map((m) => (
                      <div key={m.label} className="ongoing-mini-metric">
                        <span className="mono mini-label">{m.label}</span>
                        <span className="mini-val">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <ul className="ongoing-card__tags" aria-label="Technologies">
                {item.tags.map((tag) => (
                  <li key={tag} className="tag tag--ongoing">
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CompletedSectionHeader({ section, lang, activeFilter, setActiveFilter, counts }) {
  if (!section) return null;
  const filterItems = FILTERS[lang] || FILTERS.en;

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

        <div className="work-filter-bar" role="tablist" aria-label="Filter projects by category">
          {filterItems.map((f) => (
            <button
              key={f.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === f.id}
              className={`work-filter-pill ${activeFilter === f.id ? 'is-active' : ''}`}
              onClick={() => setActiveFilter(f.id)}
            >
              <span>{f.label}</span>
              <span className="mono work-filter-count">{counts[f.id] ?? 0}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Completed Project Bento Dossier Card:
 * Rich two-column preview with per-project color personality, 2x2 impact metrics scorecard,
 * and a single unified click action to open the full case study.
 */
function ProjectCard({ project, lang }) {
  const themeInfo = PROJECT_THEMES[project.id] || { accent: 'cobalt', icon: '✦' };

  const setVinylPlaying = (playing) => {
    document.documentElement.classList.toggle('is-vinyl-playing', playing);
  };

  return (
    <Link
      to={`/work/${project.id}`}
      className={`project-card project-card--bento project-card--${themeInfo.accent}`}
      onMouseEnter={() => setVinylPlaying(true)}
      onMouseLeave={() => setVinylPlaying(false)}
      onClick={() => setVinylPlaying(false)}
      aria-label={`${project.title} — ${lang === 'id' ? 'Lihat Studi Kasus' : 'Explore Case Study'}`}
    >
      {/* Top Folder Header */}
      <div className="project-card__top">
        <div className="project-card__badges">
          <span className="mono project-card__num" title={`Track ${project.num}`}>
            ♫ {project.num}
          </span>
          <span className="project-card__icon" aria-hidden="true">
            {themeInfo.icon}
          </span>
          <span className="mono project-card__category">{project.label}</span>
        </div>
        <div className="project-card__meta-group">
          <span className="role-badge">{project.role}</span>
          <span className="mono project-card__period">{project.meta}</span>
        </div>
      </div>

      {/* Two-Column Bento Body */}
      <div className="project-card__bento-body">
        {/* Left: Narrative & Tech Stack */}
        <div className="project-card__story-col">
          <h2 className={`project-card__title ${project.longTitle ? 'project-card__title--long' : ''}`}>
            {project.title}
          </h2>
          <p className="project-card__tagline">{project.tagline}</p>
          <p className="project-card__excerpt">{project.description}</p>

          <div className="project-card__preview-tags">
            {project.tags.slice(0, 5).map((tag) => (
              <span key={tag} className="tag tag--preview">
                {tag}
              </span>
            ))}
            {project.tags.length > 5 && (
              <span className="mono tag-more-count">+{project.tags.length - 5}</span>
            )}
          </div>
        </div>

        {/* Right: 2x2 Key Metrics Scorecard & Single CTA */}
        <div className="project-card__scorecard">
          <div className="project-card__scorecard-head">
            <span className="mono project-card__scorecard-label">
              ✦ {lang === 'id' ? 'ARSIP KATALOG · METRIK KUNCI' : 'ARCHIVE RECORD · KEY METRICS'}
            </span>
            {project.hasGallery && (
              <span className="mono project-card__chart-tag">
                {lang === 'id' ? '📊 +Grafik' : '📊 +Charts'}
              </span>
            )}
          </div>

          {project.metrics && (
            <div className="project-card__scorecard-grid">
              {project.metrics.map((m) => (
                <div key={m.label} className="project-card__score-item">
                  <span className="mono project-card__score-key">{m.label}</span>
                  <span className="project-card__score-val">{m.value}</span>
                </div>
              ))}
            </div>
          )}

          <div className="project-card__cta-bar">
            <span>{lang === 'id' ? 'Buka Studi Kasus Lengkap' : 'Explore Full Case Study'}</span>
            <span className="project-card__cta-arrow" aria-hidden="true">
              ↗
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function Work() {
  const { lang } = useApp();
  const work = getWorkContent(lang);
  const { intro, ongoingSection, completedSection, projects, journeyInvitation } = work;
  const [activeFilter, setActiveFilter] = useState('all');

  const counts = {
    all: projects.length,
    data: projects.filter((p) => PROJECT_CATEGORIES[p.id] === 'data').length,
    system: projects.filter((p) => PROJECT_CATEGORIES[p.id] === 'system').length,
    ar: projects.filter((p) => PROJECT_CATEGORIES[p.id] === 'ar').length,
  };

  const visibleProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => PROJECT_CATEGORIES[p.id] === activeFilter);

  return (
    <>
      <PageIntro {...intro} variant="network" />

      {/* On-Going Projects Section */}
      {ongoingSection && <OngoingSection section={ongoingSection} lang={lang} />}

      {/* Completed Projects Section Header */}
      {completedSection && (
        <CompletedSectionHeader
          section={completedSection}
          lang={lang}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          counts={counts}
        />
      )}

      {/* Completed Academic Projects Bento Dossier List */}
      <section className="container projects-container">
        <div className="projects-grid">
          {visibleProjects.map((project) => (
            <ProjectCard key={project.id} project={project} lang={lang} />
          ))}
        </div>
      </section>

      {/* Journey Invitation */}
      <section className="container journey-invitation">
        <h2 className="journey-invitation__title">{journeyInvitation.title}</h2>
        <ButtonLink to={journeyInvitation.action?.to || journeyInvitation.to}>
          {journeyInvitation.action?.label ||
            journeyInvitation.cta ||
            (lang === 'id' ? 'Jelajahi perjalananku' : 'Explore my journey')}
        </ButtonLink>
      </section>
    </>
  );
}
