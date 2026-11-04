import { Link } from 'react-router-dom';
import PageIntro from '../components/PageIntro.jsx';
import Evidence from '../components/Evidence.jsx';
import { work } from '../content/work.js';
import './Work.css';

const EVIDENCE_HEIGHT = { desktop: 440, mobile: 280 };

function OngoingSection({ section }) {
  if (!section || !section.items?.length) return null;

  return (
    <section className="band band--ongoing">
      <div className="container ongoing-container">
        <div className="ongoing-header">
          <div className="ongoing-badge">
            <span className="ongoing-dot" /> {section.badge || 'ON GOING PROJECTS'}
          </div>
          <span className="mono ongoing-meta">2026 · IN ACTIVE DEVELOPMENT</span>
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

function CompletedSectionHeader({ section }) {
  if (!section) return null;

  return (
    <section className="band band--completed-header">
      <div className="container completed-container">
        <div className="completed-header">
          <div className="completed-badge">
            <span className="completed-badge__icon">✦</span> {section.badge || 'COMPLETED PROJECTS'}
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

function Project({ project, index }) {
  const dark = project.tone === 'dark';
  const numStr = String(index + 1).padStart(2, '0');

  return (
    <section className={`band ${dark ? 'band--dark' : ''}`}>
      <article className="container project">
        <div className="project__overview">
          <div className="project__story">
            <div className="project__top-bar">
              <span className="mono project__num">{numStr}</span>
              <span className="role-badge">{project.role}</span>
            </div>

            <h2 className={`project__title ${project.longTitle ? 'project__title--long' : ''}`}>
              {project.title}
            </h2>
            <p className="project__tagline">{project.tagline}</p>

            <div className="project__metadata">
              <p className="mono project__meta">{project.meta}</p>
            </div>

            <p className="project__description">{project.description}</p>

            <ul className="project__tags" aria-label="Technologies">
              {project.tags.map((tag) => (
                <li key={tag} className="tag">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          <div className="project__evidence">
            {project.evidence.map((item) => (
              <Evidence key={item.title} {...item} heights={EVIDENCE_HEIGHT} tone={dark ? 'dark' : 'light'} />
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}

export default function Work() {
  const { intro, ongoingSection, completedSection, projects, journeyInvitation } = work;

  return (
    <>
      <PageIntro {...intro} />

      {/* On-Going Projects Section (3 projects: Medigo, Veriface, Siren) */}
      {ongoingSection && <OngoingSection section={ongoingSection} />}

      {/* Completed Projects Section Header (styled like Ongoing Projects header) */}
      {completedSection && <CompletedSectionHeader section={completedSection} />}

      {/* Completed Academic Projects */}
      {projects.map((project, idx) => (
        <Project key={project.id} project={project} index={idx} />
      ))}

      <Link to={journeyInvitation.to} className="band band--blue journey-invitation">
        <div className="container journey-invitation__inner">
          <h2 className="journey-invitation__title">{journeyInvitation.title}</h2>
          <p className="journey-invitation__cta">{journeyInvitation.cta}</p>
        </div>
      </Link>
    </>
  );
}
