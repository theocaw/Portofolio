import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageBackdrop from '../components/PageBackdrop.jsx';
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
  'ames-housing': { accent: 'matcha', icon: '📊', rpm: '45 RPM · SIDE A-1', colorHex: '#355e47' },
  canvar: { accent: 'terracotta', icon: '🕶️', rpm: '45 RPM · BONUS-1', colorHex: '#c24928' },
  cafier: { accent: 'honey', icon: '☕', rpm: '33 RPM · SIDE B-1', colorHex: '#b46914' },
  'dthanasha-kost': { accent: 'sage', icon: '🏠', rpm: '33 RPM · SIDE B-2', colorHex: '#2f6f5e' },
  'alumni-portal': { accent: 'burgundy', icon: '🎓', rpm: '33 RPM · SIDE B-3', colorHex: '#7c2d3b' },
};

const FILTERS = {
  en: [
    { id: 'all', label: '💿 All Records (5)' },
    { id: 'data', label: 'SIDE A · Data & ML' },
    { id: 'system', label: 'SIDE B · System & Web' },
    { id: 'ar', label: 'BONUS · AR & 3D' },
  ],
  id: [
    { id: 'all', label: '💿 Semua Piringan (5)' },
    { id: 'data', label: 'SIDE A · Data & ML' },
    { id: 'system', label: 'SIDE B · Sistem & Web' },
    { id: 'ar', label: 'BONUS · AR & 3D' },
  ],
};

export default function Work() {
  const { lang } = useApp();
  const work = getWorkContent(lang);
  const { ongoingSection, projects } = work;

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedId, setSelectedId] = useState(projects[0]?.id || 'ames-housing');

  const activeProject = projects.find((p) => p.id === selectedId) || projects[0];
  const activeTheme = PROJECT_THEMES[activeProject.id] || PROJECT_THEMES['ames-housing'];
  const activeIdx = projects.findIndex((p) => p.id === activeProject.id);

  const visibleProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => PROJECT_CATEGORIES[p.id] === activeFilter);

  const stepTrack = (dir) => {
    const nextIdx = (activeIdx + dir + projects.length) % projects.length;
    setSelectedId(projects[nextIdx].id);
  };

  const setVinylPlaying = (playing) => {
    document.documentElement.classList.toggle('is-vinyl-playing', playing);
  };

  return (
    <div className="slowbar-work-page">
      {/* =========================================================
          STAGE 1: THE INTERACTIVE VINYL JUKEBOX & LISTENING STATION
         ========================================================= */}
      <section className="jukebox-hero">
        <PageBackdrop variant="network" />

        <div className="container jukebox-hero__container">
          <div className="jukebox-header-bar">
            <div>
              <span className="mono jukebox-eyebrow">
                💿 {lang === 'id' ? 'RUANG DENGAR VINYL & ARSIP PROYEK' : 'SLOWBAR VINYL JUKEBOX & CASE ARCHIVE'}
              </span>
              <h1 className="jukebox-main-title">
                {lang === 'id'
                  ? 'Pilih piringan proyek untuk diputar di meja putar.'
                  : 'Pick a project record from the crate to spin on the deck.'}
              </h1>
            </div>

            {/* Track Switcher Controls */}
            <div className="jukebox-transport">
              <button
                type="button"
                className="mono jukebox-transport__btn"
                onClick={() => stepTrack(-1)}
                title={lang === 'id' ? 'Track Sebelumnya' : 'Previous Track'}
              >
                ⏮ PREV
              </button>
              <span className="mono jukebox-transport__counter">
                TRACK 0{activeIdx + 1} / 0{projects.length}
              </span>
              <button
                type="button"
                className="mono jukebox-transport__btn"
                onClick={() => stepTrack(1)}
                title={lang === 'id' ? 'Track Berikutnya' : 'Next Track'}
              >
                NEXT ⏭
              </button>
            </div>
          </div>

          {/* Interactive Jukebox Booth: Left Spinning Deck + Right Album Liner Notes */}
          <div className={`jukebox-deck jukebox-deck--${activeTheme.accent}`}>
            {/* Left: Physical Turntable Platter & Album Jacket */}
            <div className="jukebox-deck__platter-col">
              <div className="jukebox-platter-box">
                <div className="mono jukebox-platter-box__top">
                  <span>♫ NOW ON PLATTER · #{activeProject.num}</span>
                  <span>{activeTheme.rpm}</span>
                </div>

                <div className="jukebox-turntable-stage">
                  {/* Album Sleeve Cover on the Left */}
                  <div className={`jukebox-sleeve jukebox-sleeve--${activeTheme.accent}`}>
                    <span className="mono jukebox-sleeve__code">LP · {activeProject.num}</span>
                    <span className="jukebox-sleeve__icon" aria-hidden="true">
                      {activeTheme.icon}
                    </span>
                    <span className="jukebox-sleeve__name">{activeProject.title}</span>
                    <span className="mono jukebox-sleeve__role">{activeProject.role}</span>
                  </div>

                  {/* Spinning Vinyl Record Sliding Out of the Sleeve */}
                  <div className="jukebox-spinning-disc">
                    <div className="jukebox-spinning-disc__grooves" />
                    <div
                      className="jukebox-spinning-disc__label"
                      style={{ background: activeTheme.colorHex }}
                    >
                      <span className="mono">#{activeProject.num}</span>
                    </div>
                  </div>
                </div>

                {/* Quick Track Selector Pills under Platter */}
                <div className="jukebox-track-pills" role="tablist">
                  {projects.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      role="tab"
                      aria-selected={p.id === activeProject.id}
                      className={`mono jukebox-track-pill ${p.id === activeProject.id ? 'is-active' : ''}`}
                      onClick={() => setSelectedId(p.id)}
                    >
                      ♫ {p.num} · {p.title.split(':')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Liner Notes & 2x2 Impact Scorecard */}
            <div className="jukebox-deck__notes-col">
              <div className="jukebox-liner-notes">
                <div className="jukebox-liner-notes__meta">
                  <span className="mono jukebox-liner-notes__cat">{activeProject.label}</span>
                  <span className="mono jukebox-liner-notes__period">{activeProject.meta}</span>
                </div>

                <h2 className="jukebox-liner-notes__title">{activeProject.title}</h2>
                <p className="jukebox-liner-notes__tagline">{activeProject.tagline}</p>
                <p className="jukebox-liner-notes__desc">{activeProject.description}</p>

                {/* 2x2 Key Metrics Scorecard */}
                {activeProject.metrics && (
                  <div className="jukebox-scorecard">
                    {activeProject.metrics.map((m) => (
                      <div key={m.label} className="jukebox-scorecard__item">
                        <span className="mono jukebox-scorecard__k">{m.label}</span>
                        <span className="jukebox-scorecard__v">{m.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Stack & Direct Case Study CTA */}
                <div className="jukebox-liner-notes__footer">
                  <div className="jukebox-tags">
                    {activeProject.tags.slice(0, 6).map((t) => (
                      <span key={t} className="mono jukebox-tag">
                        {t}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/work/${activeProject.id}`}
                    className="mono jukebox-open-btn"
                  >
                    <span>
                      {lang === 'id'
                        ? '📖 Buka Buku Studi Kasus Lengkap ↗'
                        : '📖 Open Full Case Study & Specs ↗'}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STAGE 2: THE PHYSICAL VINYL RECORD CRATE (All 5 Sleeves with Protruding Discs)
         ========================================================= */}
      <section className="container vinyl-crate-browse">
        <div className="vinyl-crate-browse__header">
          <div>
            <span className="mono vinyl-crate-browse__eyebrow">
              ✦ {lang === 'id' ? 'RAK KOLEKSI PIRINGAN HITAM' : 'BROWSE THE VINYL RECORD CRATES'}
            </span>
            <h2 className="vinyl-crate-browse__title">
              {lang === 'id'
                ? 'Klik sampul vinyl untuk memutar atau langsung buka arsipnya.'
                : 'Click any vinyl sleeve to load it on the platter or open its full dossier.'}
            </h2>
          </div>

          <div className="work-filter-bar" role="tablist">
            {(FILTERS[lang] || FILTERS.en).map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={activeFilter === f.id}
                className={`work-filter-pill ${activeFilter === f.id ? 'is-active' : ''}`}
                onClick={() => setActiveFilter(f.id)}
              >
                <span>{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid of Vinyl Sleeves with Protruding Spinning Discs */}
        <div className="vinyl-sleeves-grid">
          {visibleProjects.map((project) => {
            const t = PROJECT_THEMES[project.id] || PROJECT_THEMES['ames-housing'];
            const isLoaded = project.id === activeProject.id;

            return (
              <article
                key={project.id}
                className={`vinyl-record-card vinyl-record-card--${t.accent} ${
                  isLoaded ? 'is-loaded' : ''
                }`}
                onMouseEnter={() => {
                  setVinylPlaying(true);
                  setSelectedId(project.id);
                }}
                onMouseLeave={() => setVinylPlaying(false)}
              >
                <span className="slowbar-masking-tape" aria-hidden="true" />

                {/* Protruding Vinyl Disc behind the right edge */}
                <div className="vinyl-record-card__disc" aria-hidden="true">
                  <div
                    className="vinyl-record-card__disc-label"
                    style={{ background: t.colorHex }}
                  />
                </div>

                {/* Jacket Front */}
                <div className="vinyl-record-card__jacket">
                  <div className="vinyl-record-card__top">
                    <span className="mono vinyl-record-card__track">
                      ♫ TRACK {project.num} · {t.rpm}
                    </span>
                    <span className="mono vinyl-record-card__role">{project.role}</span>
                  </div>

                  <div className="vinyl-record-card__main">
                    <span className="mono vinyl-record-card__cat">{project.label}</span>
                    <h3 className="vinyl-record-card__title">{project.title}</h3>
                    <p className="vinyl-record-card__tagline">{project.tagline}</p>
                  </div>

                  {project.metrics && (
                    <div className="vinyl-record-card__mini-scores">
                      {project.metrics.slice(0, 2).map((m) => (
                        <div key={m.label} className="vinyl-record-card__score">
                          <span className="mono">{m.label}</span>
                          <strong>{m.value}</strong>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="vinyl-record-card__actions">
                    <Link
                      to={`/work/${project.id}`}
                      className="mono vinyl-record-card__cta"
                      onClick={() => setVinylPlaying(false)}
                    >
                      <span>
                        {lang === 'id' ? 'Buka Studi Kasus Lengkap ↗' : 'Explore Full Case Study ↗'}
                      </span>
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          STAGE 3: FRESHLY BREWING DUBPLATES (On-Going Projects Menu)
         ========================================================= */}
      {ongoingSection && ongoingSection.items?.length > 0 && (
        <section className="band band--paper-2 slowbar-brewing-section">
          <div className="container slowbar-brewing-container">
            <div className="slowbar-brewing-header">
              <span className="mono ongoing-badge">
                <span className="ongoing-dot" />
                {lang === 'id' ? '☕ SEDANG DISEDUH DI STUDIO (2026)' : '☕ FRESHLY BREWING IN THE STUDIO (2026)'}
              </span>
              <h2 className="slowbar-brewing-title">{ongoingSection.title}</h2>
              <p className="slowbar-brewing-sub">{ongoingSection.subtitle}</p>
            </div>

            <div className="ongoing-grid">
              {ongoingSection.items.map((item) => (
                <div key={item.id} className="ongoing-card">
                  <div className="ongoing-card__top">
                    <span className="mono ongoing-card__index">DUBPLATE · {item.index}</span>
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
      )}
    </div>
  );
}
