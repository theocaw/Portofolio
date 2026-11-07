import { Link } from 'react-router-dom';
import ButtonLink from '../components/ButtonLink.jsx';
import PageIntro from '../components/PageIntro.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getWorkContent } from '../content/work.js';
import './Work.css';

/**
 * On-Going Projects Section:
 * Restored to the clean original view (title, role, tagline, description, metrics, and tags shown directly).
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

/**
 * Completed Project Card:
 * Clean, compact preview on the main page.
 * Features a small stylish button linking to the project's dedicated page.
 */
function ProjectCard({ project, lang }) {
  return (
    <article className="project-card project-card--preview-mode">
      {/* 1. Header Information */}
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

      {/* 2. Main Title & Short Tagline Preview */}
      <div className="project-card__main">
        <h2 className={`project-card__title ${project.longTitle ? 'project-card__title--long' : ''}`}>
          <Link to={`/work/${project.id}`} className="project-card__title-link">
            {project.title}
          </Link>
        </h2>
        <p className="project-card__tagline">{project.tagline}</p>
      </div>

      {/* 3. Preview Action Bar with Small Link Button to Dedicated Page */}
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

        {/* Small button linking to dedicated case-study page */}
        <Link
          to={`/work/${project.id}`}
          className="project-small-page-link"
          title={lang === 'id' ? `Lihat detail lengkap untuk ${project.title}` : `View full details for ${project.title}`}
        >
          <span>✦</span>
          <span>{lang === 'id' ? 'Lihat Detail ↗' : 'View Details ↗'}</span>
        </Link>
      </div>
    </article>
  );
}

export default function Work() {
  const { lang } = useApp();
  const work = getWorkContent(lang);
  const { intro, ongoingSection, completedSection, projects, journeyInvitation } = work;

  return (
    <>
      <PageIntro {...intro} />

      {/* On-Going Projects Section (Original full view) */}
      {ongoingSection && <OngoingSection section={ongoingSection} lang={lang} />}

      {/* Completed Projects Section Header */}
      {completedSection && <CompletedSectionHeader section={completedSection} lang={lang} />}

      {/* Completed Academic Projects List (Compact previews with links to separate pages) */}
      <section className="container projects-container">
        <div className="projects-grid">
          {projects.map((project) => (
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
            (lang === 'id' ? 'Jelajahi perjalananku ↗' : 'Explore my journey ↗')}
        </ButtonLink>
      </section>
    </>
  );
}
