import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import { getWorkContent } from '../content/work.js';
import FlowerEmblem from '../components/FlowerEmblem.jsx';
import './Work.css';

const PROJECT_CATEGORIES = {
  'ames-housing': 'data',
  medigo: 'data',
  canvar: 'ar',
  cafier: 'system',
  'dthanasha-kost': 'system',
  'alumni-portal': 'system',
};

const BLOOM_SPECS = {
  'ames-housing': { species: 'edelweiss', season: 'DATA & ML', tint: '#e4f2eb' },
  medigo: { species: 'rose', season: 'HEALTHCARE ETL & AI', tint: '#fdeef2' },
  canvar: { species: 'buttercup', season: 'AR & 3D SPATIAL', tint: '#fdf5dd' },
  cafier: { species: 'gentian', season: 'MOBILE & FULL-STACK', tint: '#e4f1fc' },
  'dthanasha-kost': { species: 'lavender', season: 'SYSTEM & MVC', tint: '#eeeafb' },
  'alumni-portal': { species: 'poppy', season: '4-TIER ARCHITECTURE', tint: '#fcece9' },
};

const FILTERS = {
  en: [
    { id: 'all', label: 'All Blooms (06)' },
    { id: 'data', label: 'Data & Healthcare' },
    { id: 'system', label: 'System & Web' },
    { id: 'ar', label: 'AR & 3D' },
  ],
  id: [
    { id: 'all', label: 'Semua Karya (06)' },
    { id: 'data', label: 'Data & Medis' },
    { id: 'system', label: 'Sistem & Web' },
    { id: 'ar', label: 'AR & 3D' },
  ],
};

export default function Work() {
  const { lang } = useApp();
  const work = getWorkContent(lang);
  const { ongoingSection, projects } = work;

  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedIdx, setSelectedIdx] = useState(0);

  const activeProject = projects[selectedIdx] || projects[0];
  const activeSpec = BLOOM_SPECS[activeProject.id] || BLOOM_SPECS['ames-housing'];

  const visibleProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => PROJECT_CATEGORIES[p.id] === activeFilter);

  return (
    <div className="meadow-work">
      {/* =========================================================
          STAGE 1 (TOP): GROWING SEEDLINGS — ON-GOING PROJECTS (2026)
         ========================================================= */}
      {ongoingSection && ongoingSection.items?.length > 0 && (
        <section className="band band--paper-2 kissa-ongoing-top-band">
          <div className="container kissa-ongoing-top">
            <div className="kissa-ongoing__head">
              <span className="mono kissa-eyebrow">
                {lang === 'id'
                  ? '03 / PROYEK · TUNAS SEDANG TUMBUH (ON-GOING 2026)'
                  : '03 / WORK · GROWING SEEDLINGS (ON-GOING 2026)'}
              </span>
              <h1 className="kissa-work-hero__title">{ongoingSection.title}</h1>
              <p className="kissa-ongoing__sub">{ongoingSection.subtitle}</p>
            </div>

            <div className="kissa-ongoing__grid">
              {ongoingSection.items.map((item, idx) => (
                <article key={item.id} className="kissa-ongoing-card kissa-spotlight">
                  <div className="mono kissa-ongoing-card__top">
                    <span>SEEDLING · {item.index}</span>
                    <span className="kissa-ongoing-card__status">
                      <span className="kissa-live-dot" aria-hidden="true" />
                      {item.status}
                    </span>
                  </div>

                  <div className="meadow-ongoing-head">
                    <div>
                      <span className="mono kissa-ongoing-card__cat">{item.category}</span>
                      <h2 className="kissa-ongoing-card__title">{item.title}</h2>
                    </div>
                    <FlowerEmblem species={idx === 0 ? 'gentian' : 'poppy'} size={42} />
                  </div>

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
          STAGE 2: INTERACTIVE SWISS WILDFLOWER SHOWCASE PEDESTAL
         ========================================================= */}
      <section className="container kissa-work-hero" id="bloom-pedestal">
        <div className="kissa-work-hero__head">
          <div>
            <span className="mono kissa-eyebrow">
              {lang === 'id'
                ? 'TAMAN KARYA SELESAI · 06 STUDI KASUS MEKAR'
                : 'FULL-BLOOM GARDEN · 06 COMPLETED CASE STUDIES'}
            </span>
            <h2 className="kissa-catalog__title">
              {lang === 'id'
                ? 'Pilih bunga proyek untuk membuka catatan studi kasusnya.'
                : 'Pick a project wildflower to inspect its complete case study.'}
            </h2>
          </div>
          <span className="mono kissa-work-hero__count">
            BLOOM 0{selectedIdx + 1} / 0{projects.length}
          </span>
        </div>

        <div className="meadow-showcase-desk">
          {/* Left: Interactive Blooming Botanical Pedestal */}
          <div className="meadow-pedestal kissa-spotlight">
            <div className="mono meadow-pedestal__top">
              <span>SPECIMEN 0{selectedIdx + 1}</span>
              <span>{activeSpec.season}</span>
            </div>

            <div className="meadow-pedestal__stage">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeProject.id}
                  className="meadow-pedestal__emblem"
                  initial={{ scale: 0.65, rotate: -28, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.72, rotate: 24, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <FlowerEmblem species={activeSpec.species} size={142} />
                </motion.div>
              </AnimatePresence>

              <span className="mono meadow-pedestal__short">
                {activeProject.title.split(':')[0]}
              </span>
            </div>

            {/* 6 Quick Wildflower Selector Pills */}
            <div className="meadow-pedestal__selector" role="tablist" aria-label="Select project flower">
              {projects.map((p, idx) => {
                const sp = BLOOM_SPECS[p.id] || BLOOM_SPECS['ames-housing'];
                const active = idx === selectedIdx;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    className={`meadow-pedestal__chip ${active ? 'is-active' : ''}`}
                    onClick={() => setSelectedIdx(idx)}
                  >
                    <FlowerEmblem species={sp.species} size={22} />
                    <span className="mono">{p.title.split(':')[0]}</span>
                  </button>
                );
              })}
            </div>

            <div className="meadow-pedestal__nav">
              <button
                type="button"
                className="mono meadow-step-btn"
                onClick={() => setSelectedIdx((selectedIdx - 1 + projects.length) % projects.length)}
              >
                ← PREV
              </button>
              <button
                type="button"
                className="mono meadow-step-btn"
                onClick={() => setSelectedIdx((selectedIdx + 1) % projects.length)}
              >
                NEXT →
              </button>
            </div>
          </div>

          {/* Right: Sunlit Botanical Specimen Sheet */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProject.id}
              className="kissa-jcard kissa-spotlight"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            >
              <div className="mono kissa-jcard__top">
                <span>
                  BLOOM {activeProject.num} · {activeProject.label}
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
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* =========================================================
          STAGE 3: COMPLETE FULL-BLOOM GARDEN CATALOG (ALL 6 COMPLETED)
         ========================================================= */}
      <section className="band band--paper-2 kissa-catalog-band">
        <div className="container kissa-catalog">
          <div className="kissa-catalog__head">
            <div>
              <span className="mono kissa-eyebrow">
                {lang === 'id' ? 'KOLEKSI LENGKAP TAMAN KARYA' : 'COMPLETE WILDFLOWER CATALOG'}
              </span>
              <h2 className="kissa-catalog__title">
                {lang === 'id'
                  ? 'Enam studi kasus lengkap lintas data, kesehatan, sistem & 3D.'
                  : 'Six completed case studies across data, healthcare, systems & 3D.'}
              </h2>
            </div>

            <div className="kissa-filters" role="tablist">
              {(FILTERS[lang] || FILTERS.en).map((f) => {
                const isSelected = activeFilter === f.id;
                return (
                  <button
                    key={f.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`mono kissa-filter-btn ${isSelected ? 'is-active' : ''}`}
                    onClick={() => setActiveFilter(f.id)}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="garden-work-filter-pill"
                        className="kissa-filter-btn__bg"
                        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                      />
                    )}
                    <span className="kissa-filter-btn__label">{f.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="kissa-tapes-grid">
            {visibleProjects.map((project) => {
              const origIdx = projects.findIndex((p) => p.id === project.id);
              const spec = BLOOM_SPECS[project.id] || BLOOM_SPECS['ames-housing'];
              const isLoaded = origIdx === selectedIdx;

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                  className={`kissa-tape-card kissa-spotlight ${isLoaded ? 'is-loaded' : ''}`}
                >
                  {/* Sunlit Botanical Specimen Crest Header (Zero Cassette) */}
                  <div
                    className="meadow-card-banner"
                    onClick={() => {
                      setSelectedIdx(origIdx);
                      document.getElementById('bloom-pedestal')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setSelectedIdx(origIdx);
                        document.getElementById('bloom-pedestal')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    title={
                      lang === 'id'
                        ? 'Klik untuk tampilkan di Pedestal Bunga'
                        : 'Click to inspect on Flower Pedestal'
                    }
                  >
                    <div className="meadow-card-banner__meta mono">
                      <span>BLOOM {project.num}</span>
                      <span>{spec.season}</span>
                    </div>
                    <div className="meadow-card-banner__flower">
                      <FlowerEmblem species={spec.species} size={74} />
                    </div>
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
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
