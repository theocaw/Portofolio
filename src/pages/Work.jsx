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
  'ames-housing': { species: 'edelweiss', label: 'EDELWEISS' },
  medigo: { species: 'rose', label: 'ALPINE ROSE' },
  canvar: { species: 'buttercup', label: 'BUTTERCUP' },
  cafier: { species: 'gentian', label: 'BLUE GENTIAN' },
  'dthanasha-kost': { species: 'lavender', label: 'LAVENDER' },
  'alumni-portal': { species: 'poppy', label: 'ALPINE POPPY' },
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
  const [expandedId, setExpandedId] = useState('medigo');

  const visibleProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p) => PROJECT_CATEGORIES[p.id] === activeFilter);

  return (
    <div className="exhibit-work">
      {/* =========================================================
          TOP: GROWING SEEDLINGS — ON-GOING PROJECTS (VERIFACE & SIREN)
         ========================================================= */}
      {ongoingSection && ongoingSection.items?.length > 0 && (
        <section className="container exhibit-ongoing">
          <div className="exhibit-ongoing__head">
            <motion.span
              className="mono kissa-eyebrow"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {lang === 'id'
                ? '03 / PROYEK · TUNAS SEDANG TUMBUH (ON-GOING 2026)'
                : '03 / WORK · GROWING SEEDLINGS (ON-GOING 2026)'}
            </motion.span>
            <div className="exhibit-mask">
              <motion.h1
                className="exhibit-hero-title"
                initial={{ y: '100%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              >
                {ongoingSection.title}
              </motion.h1>
            </div>
            <p className="exhibit-hero-sub">{ongoingSection.subtitle}</p>
          </div>

          <div className="exhibit-seedlings">
            {ongoingSection.items.map((item, idx) => (
              <motion.article
                key={item.id}
                className="exhibit-seedling"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.1 + idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <div className="exhibit-seedling__top mono">
                  <span className="exhibit-seedling__live">
                    <i className="exhibit-live-dot" aria-hidden="true" />
                    {item.status}
                  </span>
                  <span>{item.category}</span>
                </div>

                <div className="exhibit-seedling__title-row">
                  <h2 className="exhibit-seedling__title">{item.title}</h2>
                  <FlowerEmblem species={idx === 0 ? 'gentian' : 'poppy'} size={44} />
                </div>

                <p className="exhibit-seedling__tagline">{item.tagline}</p>
                <p className="exhibit-seedling__desc">{item.description}</p>

                {item.metrics && (
                  <div className="exhibit-seedling__stats">
                    {item.metrics.map((m) => (
                      <div key={m.label}>
                        <span className="mono">{m.label}</span>
                        <strong>{m.value}</strong>
                      </div>
                    ))}
                  </div>
                )}

                <div className="exhibit-tags">
                  {item.tags.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </section>
      )}

      {/* =========================================================
          MAIN: INTERACTIVE EXPANDING FLOWER EXHIBITION (6 COMPLETED)
          Full-width kinetic accordion rows — Zero static card wall!
         ========================================================= */}
      <section className="container exhibit-gallery">
        <div className="exhibit-gallery__head">
          <div>
            <span className="mono kissa-eyebrow">
              {lang === 'id'
                ? 'PAMERAN BUNGA SELESAI · 06 STUDI KASUS MEKAR'
                : 'FULL-BLOOM EXHIBITION · 06 COMPLETED CASE STUDIES'}
            </span>
            <h2 className="exhibit-gallery__title">
              {lang === 'id'
                ? 'Klik baris proyek mana saja untuk memekarkan detailnya.'
                : 'Click any project bloom below to unfurl its case study.'}
            </h2>
          </div>

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
                      layoutId="exhibit-work-filter-pill"
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

        <div className="exhibit-list">
          {visibleProjects.map((project) => {
            const spec = BLOOM_SPECS[project.id] || BLOOM_SPECS['ames-housing'];
            const isOpen = expandedId === project.id;

            return (
              <motion.article
                key={project.id}
                layout
                className={`exhibit-row ${isOpen ? 'is-open' : ''}`}
              >
                <button
                  type="button"
                  className="exhibit-row__trigger"
                  onClick={() => setExpandedId(isOpen ? null : project.id)}
                  aria-expanded={isOpen}
                >
                  <span className="mono exhibit-row__num">{project.num}</span>

                  <motion.span
                    className="exhibit-row__flower"
                    animate={{
                      rotate: isOpen ? 36 : 0,
                      scale: isOpen ? 1.18 : 0.95,
                    }}
                    transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                  >
                    <FlowerEmblem species={spec.species} size={50} />
                  </motion.span>

                  <div className="exhibit-row__heading">
                    <h3 className="exhibit-row__title">{project.title}</h3>
                    <span className="mono exhibit-row__meta">
                      {spec.label} · {project.role} · {project.meta}
                    </span>
                  </div>

                  <span className="mono exhibit-row__toggle">
                    {isOpen
                      ? lang === 'id'
                        ? 'TUTUP −'
                        : 'CLOSE −'
                      : lang === 'id'
                        ? 'MEKAR +'
                        : 'BLOOM +'}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key={`${project.id}-body`}
                      className="exhibit-row__expand"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="exhibit-row__content">
                        <div className="exhibit-row__copy">
                          <p className="exhibit-row__tagline">{project.tagline}</p>
                          <p className="exhibit-row__desc">{project.description}</p>

                          <div className="exhibit-tags">
                            {project.tags.map((t) => (
                              <span key={t} className="tag">
                                {t}
                              </span>
                            ))}
                          </div>

                          <div className="exhibit-row__cta-wrap">
                            <Link to={`/work/${project.id}`} className="mono alpine-orbit-cta">
                              {lang === 'id'
                                ? 'Buka Studi Kasus Lengkap ↗'
                                : 'Open Full Case Study ↗'}
                            </Link>
                          </div>
                        </div>

                        {project.metrics && (
                          <div className="exhibit-row__metrics">
                            {project.metrics.map((m) => (
                              <div key={m.label} className="exhibit-metric-pill">
                                <span className="mono">{m.label}</span>
                                <strong>{m.value}</strong>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
