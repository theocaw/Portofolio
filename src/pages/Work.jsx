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
  'ames-housing': { species: 'edelweiss', flower: 'Edelweiss', accent: 'var(--blue)' },
  medigo: { species: 'rose', flower: 'Alpine Rose', accent: 'var(--pink-hot)' },
  canvar: { species: 'buttercup', flower: 'Swiss Buttercup', accent: 'var(--lime)' },
  cafier: { species: 'gentian', flower: 'Blue Gentian', accent: 'var(--sky)' },
  'dthanasha-kost': { species: 'lavender', flower: 'Mountain Lavender', accent: 'var(--lavender)' },
  'alumni-portal': { species: 'poppy', flower: 'Alpine Poppy', accent: 'var(--pink-hot)' },
};

const FILTERS = {
  en: [
    { id: 'all', label: 'All (06)' },
    { id: 'data', label: 'Data & Med' },
    { id: 'system', label: 'Web & Systems' },
    { id: 'ar', label: 'AR & 3D' },
  ],
  id: [
    { id: 'all', label: 'Semua (06)' },
    { id: 'data', label: 'Data & Medis' },
    { id: 'system', label: 'Web & Sistem' },
    { id: 'ar', label: 'AR & 3D' },
  ],
};

export default function Work() {
  const { lang } = useApp();
  const work = getWorkContent(lang);
  const { ongoingSection, projects } = work;

  const [activeFilter, setActiveFilter] = useState('all');
  const [focusedId, setFocusedId] = useState(projects[0]?.id || 'ames-housing');
  const [expandedOngoing, setExpandedOngoing] = useState(null);

  const visibleProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => PROJECT_CATEGORIES[p.id] === activeFilter);

  const stageProject =
    visibleProjects.find((p) => p.id === focusedId) || visibleProjects[0] || projects[0];
  const stageSpec = BLOOM_SPECS[stageProject.id] || BLOOM_SPECS['ames-housing'];

  return (
    <div className="greenhouse-work">
      {/* Compact Editorial Opening + Floating On-Going Seedling Strip (TOP) */}
      <section className="container gh-top">
        <div className="gh-top__head">
          <span className="mono kissa-eyebrow">
            {lang === 'id'
              ? '03 / PROYEK · RUMAH KACA KARYA'
              : '03 / WORK · THE ALPINE GREENHOUSE'}
          </span>
          <div className="gh-mask">
            <motion.h1
              className="gh-title"
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              {lang === 'id' ? (
                <>
                  Karya yang <em>Tumbuh</em> &amp; Mekar.
                </>
              ) : (
                <>
                  Works in <em>Bloom</em> &amp; Growth.
                </>
              )}
            </motion.h1>
          </div>
        </div>

        {/* TOP: Compact Interactive On-Going Seedlings Strip (Veriface & Siren) */}
        {ongoingSection && ongoingSection.items?.length > 0 && (
          <div className="gh-seedling-strip" aria-label="On-going projects in active development">
            <div className="gh-seedling-strip__label mono">
              <i className="exhibit-live-dot" aria-hidden="true" />
              <span>
                {lang === 'id' ? 'SEDANG DIKEMBANGKAN (2026)' : 'CURRENTLY GROWING (ON-GOING 2026)'}
              </span>
            </div>

            <div className="gh-seedling-capsules">
              {ongoingSection.items.map((item, idx) => {
                const open = expandedOngoing === item.id;
                return (
                  <motion.div
                    key={item.id}
                    layout
                    className={`gh-capsule ${open ? 'is-open' : ''}`}
                  >
                    <button
                      type="button"
                      className="gh-capsule__head"
                      onClick={() => setExpandedOngoing(open ? null : item.id)}
                      aria-expanded={open}
                    >
                      <FlowerEmblem species={idx === 0 ? 'gentian' : 'poppy'} size={36} />
                      <div className="gh-capsule__info">
                        <span className="mono gh-capsule__cat">
                          {item.status} · {item.category}
                        </span>
                        <strong>{item.title}</strong>
                      </div>
                      <span className="mono gh-capsule__toggle">{open ? '−' : '+'}</span>
                    </button>

                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          className="gh-capsule__body"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <p className="gh-capsule__tagline">{item.tagline}</p>
                          <p className="gh-capsule__desc">{item.description}</p>
                          <div className="gh-capsule__tags">
                            {item.tags.map((t) => (
                              <span key={t} className="tag">
                                {t}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* =========================================================
          MAIN: BRAND-NEW 2-COLUMN SPLIT GREENHOUSE GALLERY
          Left: Sticky Live-Morphing Flower Stage | Right: Hover/Click Project Index
         ========================================================= */}
      <section className="container gh-split-section">
        <div className="gh-split-bar">
          <span className="mono gh-split-bar__hint">
            {lang === 'id'
              ? 'ARAHKAN KURSOR KE PROYEK DI KANAN UNTUK PRATINJAU LANGSUNG'
              : 'HOVER ANY PROJECT ON THE RIGHT TO BLOOM THE LIVE STAGE'}
          </span>

          <div className="exhibit-filters" role="tablist">
            {(FILTERS[lang] || FILTERS.en).map((f) => {
              const isSelected = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`mono exhibit-filter ${isSelected ? 'is-active' : ''}`}
                  onClick={() => setActiveFilter(f.id)}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="gh-work-filter-pill"
                      className="exhibit-filter__bg"
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    />
                  )}
                  <span className="exhibit-filter__lbl">{f.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="gh-split-grid">
          {/* LEFT: Sticky Live-Morphing Botanical Stage */}
          <aside className="gh-stage-col">
            <div className="gh-stage-frame">
              <AnimatePresence mode="wait">
                <motion.div
                  key={stageProject.id}
                  className="gh-stage-content"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                >
                  <div className="gh-stage-top mono">
                    <span>
                      BLOOM {stageProject.num} · {stageSpec.flower.toUpperCase()}
                    </span>
                    <span>{stageProject.role}</span>
                  </div>

                  <motion.div
                    className="gh-stage-flower"
                    initial={{ rotate: -24, scale: 0.72 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 220, damping: 16 }}
                  >
                    <FlowerEmblem species={stageSpec.species} size={146} />
                  </motion.div>

                  <h2 className="gh-stage-title">{stageProject.title}</h2>
                  <p className="gh-stage-tagline">{stageProject.tagline}</p>

                  {stageProject.metrics && (
                    <div className="gh-stage-metrics">
                      {stageProject.metrics.slice(0, 4).map((m) => (
                        <div key={m.label} className="gh-stage-metric">
                          <span className="mono">{m.label}</span>
                          <strong>{m.value}</strong>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="gh-stage-footer">
                    <Link to={`/work/${stageProject.id}`} className="mono alpine-orbit-cta">
                      {lang === 'id' ? 'Buka Studi Kasus Lengkap ↗' : 'Open Full Case Study ↗'}
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </aside>

          {/* RIGHT: Airy Interactive Botanical Project Index */}
          <div className="gh-index-col">
            {visibleProjects.map((project) => {
              const spec = BLOOM_SPECS[project.id] || BLOOM_SPECS['ames-housing'];
              const isFocused = stageProject.id === project.id;

              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                >
                  <Link
                    to={`/work/${project.id}`}
                    className={`gh-index-item ${isFocused ? 'is-focused' : ''}`}
                    onMouseEnter={() => setFocusedId(project.id)}
                    onFocus={() => setFocusedId(project.id)}
                  >
                    <div className="gh-index-item__top mono">
                      <span>
                        {project.num} · {project.label}
                      </span>
                      <span>{project.meta}</span>
                    </div>

                    <div className="gh-index-item__mid">
                      <motion.span
                        className="gh-index-item__flower"
                        animate={{
                          rotate: isFocused ? 22 : 0,
                          scale: isFocused ? 1.15 : 0.94,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                      >
                        <FlowerEmblem species={spec.species} size={46} />
                      </motion.span>
                      <div>
                        <h3 className="gh-index-item__title">{project.title}</h3>
                        <p className="gh-index-item__desc">{project.tagline}</p>
                      </div>
                      <span className="mono gh-index-item__arrow">↗</span>
                    </div>

                    <div className="gh-index-item__tags">
                      {project.tags.slice(0, 4).map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
