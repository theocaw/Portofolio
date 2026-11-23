import { useState } from 'react';
import { Link } from 'react-router-dom';
import CassetteDeck, { CassetteShell } from '../components/CassetteDeck.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getWorkContent } from '../content/work.js';
import './Work.css';

const PROJECT_CATEGORIES = {
  'ames-housing': 'data',
  medigo: 'data',
  canvar: 'ar',
  cafier: 'system',
  'dthanasha-kost': 'system',
  'alumni-portal': 'system',
};

const TAPE_SPECS = {
  'ames-housing': { accent: '#2b4a3e', stripe: '#d9b25f', side: 'SIDE A' },
  medigo: { accent: '#2f6b58', stripe: '#e5c67e', side: 'SIDE A' },
  canvar: { accent: '#b84a27', stripe: '#e8c587', side: 'BONUS' },
  cafier: { accent: '#8c5a2b', stripe: '#d9b25f', side: 'SIDE B' },
  'dthanasha-kost': { accent: '#3d5a52', stripe: '#c9a66b', side: 'SIDE B' },
  'alumni-portal': { accent: '#63333d', stripe: '#d9b25f', side: 'SIDE B' },
};

const FILTERS = {
  en: [
    { id: 'all', label: 'All Tapes (06)' },
    { id: 'data', label: 'Side A · Data & Healthcare' },
    { id: 'system', label: 'Side B · System & Web' },
    { id: 'ar', label: 'Bonus · AR & 3D' },
  ],
  id: [
    { id: 'all', label: 'Semua Kaset (06)' },
    { id: 'data', label: 'Side A · Data & Medis' },
    { id: 'system', label: 'Side B · Sistem & Web' },
    { id: 'ar', label: 'Bonus · AR & 3D' },
  ],
};

export default function Work() {
  const { lang } = useApp();
  const work = getWorkContent(lang);
  const { ongoingSection, projects } = work;

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedIdx, setSelectedIdx] = useState(0);

  const deckTapes = projects.map((p) => {
    const spec = TAPE_SPECS[p.id] || TAPE_SPECS['ames-housing'];
    const firstMetric = p.metrics?.[0] ? `${p.metrics[0].value} · ${p.role}` : p.role;
    return {
      id: p.id,
      code: `TAPE ${p.num}`,
      side: spec.side,
      title: p.title,
      shortTitle: p.title.split(':')[0],
      metricLine: firstMetric,
      accent: spec.accent,
      stripe: spec.stripe,
      to: `/work/${p.id}`,
    };
  });

  const activeProject = projects[selectedIdx] || projects[0];

  const visibleProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => PROJECT_CATEGORIES[p.id] === activeFilter);

  return (
    <div className="kissa-work">
      {/* =========================================================
          STAGE 1 (TOP): ON-GOING PROJECTS IN ACTIVE DEVELOPMENT
         ========================================================= */}
      {ongoingSection && ongoingSection.items?.length > 0 && (
        <section className="band band--paper-2 kissa-ongoing-top-band">
          <div className="container kissa-ongoing-top">
            <div className="kissa-ongoing__head">
              <span className="mono kissa-eyebrow">
                {lang === 'id'
                  ? '03 / PROYEK · SEDANG DALAM PENGEMBANGAN (2026)'
                  : '03 / WORK · CURRENTLY IN ACTIVE DEVELOPMENT (2026)'}
              </span>
              <h1 className="kissa-work-hero__title">{ongoingSection.title}</h1>
              <p className="kissa-ongoing__sub">{ongoingSection.subtitle}</p>
            </div>

            <div className="kissa-ongoing__grid">
              {ongoingSection.items.map((item) => (
                <article key={item.id} className="kissa-ongoing-card kissa-spotlight">
                  <div className="mono kissa-ongoing-card__top">
                    <span>STUDIO MASTER · {item.index}</span>
                    <span className="kissa-ongoing-card__status">
                      <span className="kissa-live-dot" aria-hidden="true" />
                      {item.status}
                    </span>
                  </div>
                  <span className="mono kissa-ongoing-card__cat">{item.category}</span>
                  <h2 className="kissa-ongoing-card__title">{item.title}</h2>
                  <p className="kissa-ongoing-card__tagline">{item.tagline}</p>
                  <p className="kissa-ongoing-card__desc">{item.description}</p>

                  {item.metrics && (
                    <div className="kissa-ongoing-card__metrics">
                      {item.metrics.map((m) => (
                        <div key={m.label}>
                          <span className="mono">{m.label}</span>
                          <strong>{m.value}</strong>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="kissa-jcard__tags">
                    {item.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          STAGE 2: STEREO CASSETTE LISTENING DESK (COMPLETED ARCHIVE)
         ========================================================= */}
      <section className="container kissa-work-hero" id="tape-deck">
        <div className="kissa-work-hero__head">
          <div>
            <span className="mono kissa-eyebrow">
              {lang === 'id'
                ? 'ARSIP KASET SELESAI · 06 STUDI KASUS'
                : 'COMPLETED CASSETTE ARCHIVE · 06 CASE STUDIES'}
            </span>
            <h2 className="kissa-catalog__title">
              {lang === 'id'
                ? 'Pilih kaset proyek untuk diputar di deck stereo.'
                : 'Select a completed project cassette to spin on the stereo deck.'}
            </h2>
          </div>
          <span className="mono kissa-work-hero__count">
            0{selectedIdx + 1} / 0{projects.length} LOADED
          </span>
        </div>

        <div className="kissa-listening-desk">
          {/* Left: Real Physical Cassette Deck */}
          <CassetteDeck
            tapes={deckTapes}
            activeIndex={selectedIdx}
            onSelectIndex={setSelectedIdx}
            showDetailsLink={false}
          />

          {/* Right: Editorial J-Card Liner Notes & 2x2 Scorecard (Smooth Crossfade Key) */}
          <div key={activeProject.id} className="kissa-jcard kissa-panel-reveal kissa-spotlight">
            <div className="mono kissa-jcard__top">
              <span>
                TAPE {activeProject.num} · {activeProject.label}
              </span>
              <span>{activeProject.meta}</span>
            </div>

            <h3 className="kissa-jcard__title">{activeProject.title}</h3>
            <p className="kissa-jcard__tagline">{activeProject.tagline}</p>
            <p className="kissa-jcard__desc">{activeProject.description}</p>

            {activeProject.metrics && (
              <div className="kissa-jcard__metrics">
                {activeProject.metrics.map((m) => (
                  <div key={m.label} className="kissa-jcard__metric">
                    <span className="mono kissa-jcard__metric-k">{m.label}</span>
                    <strong className="kissa-jcard__metric-v">{m.value}</strong>
                  </div>
                ))}
              </div>
            )}

            <div className="kissa-jcard__footer">
              <div className="kissa-jcard__tags">
                {activeProject.tags.slice(0, 6).map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>

              <Link to={`/work/${activeProject.id}`} className="mono kissa-jcard__cta">
                {lang === 'id' ? 'Buka Studi Kasus Lengkap ↗' : 'Open Full Case Study ↗'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STAGE 3: COMPLETE CASSETTE CATALOG SHELF (ALL 6 COMPLETED)
         ========================================================= */}
      <section className="band band--paper-2 kissa-catalog-band">
        <div className="container kissa-catalog">
          <div className="kissa-catalog__head">
            <div>
              <span className="mono kissa-eyebrow">
                {lang === 'id' ? 'RAK KOLEKSI KASET' : 'COMPLETE TAPE CATALOG'}
              </span>
              <h2 className="kissa-catalog__title">
                {lang === 'id'
                  ? 'Enam rekaman studi kasus yang telah diselesaikan.'
                  : 'Six completed case studies across data, healthcare, systems & 3D.'}
              </h2>
            </div>

            <div className="kissa-filters" role="tablist">
              {(FILTERS[lang] || FILTERS.en).map((f) => (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={activeFilter === f.id}
                  className={`mono kissa-filter-btn ${activeFilter === f.id ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="kissa-tapes-grid">
            {visibleProjects.map((project) => {
              const origIdx = projects.findIndex((p) => p.id === project.id);
              const spec = TAPE_SPECS[project.id] || TAPE_SPECS['ames-housing'];
              const isLoaded = origIdx === selectedIdx;

              return (
                <article
                  key={project.id}
                  className={`kissa-tape-card kissa-spotlight ${isLoaded ? 'is-loaded' : ''}`}
                >
                  <div
                    className="kissa-tape-card__shell-wrap"
                    onClick={() => {
                      setSelectedIdx(origIdx);
                      document.getElementById('tape-deck')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedIdx(origIdx);
                        document.getElementById('tape-deck')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    title={
                      lang === 'id'
                        ? 'Klik kaset untuk muat ke Deck Stereo'
                        : 'Click cassette to load into Stereo Deck'
                    }
                  >
                    <CassetteShell
                      code={`TAPE ${project.num}`}
                      title={project.title.split(':')[0]}
                      subtitle={project.role}
                      accent={spec.accent}
                      stripe={spec.stripe}
                      side={spec.side}
                      isSpinning={isLoaded}
                      compact
                    />
                  </div>

                  <div className="kissa-tape-card__body">
                    <div className="mono kissa-tape-card__meta">
                      <span>{project.label}</span>
                      <span>{project.role}</span>
                    </div>

                    <h3 className="kissa-tape-card__title">{project.title}</h3>
                    <p className="kissa-tape-card__tagline">{project.tagline}</p>

                    {project.metrics && (
                      <div className="kissa-tape-card__metrics">
                        {project.metrics.slice(0, 2).map((m) => (
                          <div key={m.label} className="kissa-tape-card__metric">
                            <span className="mono">{m.label}</span>
                            <strong>{m.value}</strong>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="kissa-tape-card__actions">
                      <Link to={`/work/${project.id}`} className="mono kissa-tape-card__open-btn">
                        {lang === 'id' ? 'Buka Studi Kasus Lengkap ↗' : 'Open Full Case Study ↗'}
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
