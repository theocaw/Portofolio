import { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import { getWorkContent } from '../content/work.js';
import EvidenceModal from '../components/EvidenceModal.jsx';
import AmesExplorer from '../components/AmesExplorer.jsx';
import FlowerEmblem from '../components/FlowerEmblem.jsx';
import './ProjectDetail.css';

const PROJECT_FLOWERS = {
  'ames-housing': { species: 'edelweiss', name: 'Edelweiss' },
  medigo: { species: 'rose', name: 'Alpine Rose' },
  canvar: { species: 'buttercup', name: 'Swiss Buttercup' },
  cafier: { species: 'gentian', name: 'Blue Gentian' },
  'dthanasha-kost': { species: 'lavender', name: 'Mountain Lavender' },
  'alumni-portal': { species: 'poppy', name: 'Alpine Poppy' },
};

export default function ProjectDetail() {
  const { id } = useParams();
  const { lang } = useApp();
  const work = getWorkContent(lang);

  const projectIndex = work.projects.findIndex((p) => p.id === id);
  const project = projectIndex !== -1 ? work.projects[projectIndex] : null;
  const prevProject = projectIndex > 0 ? work.projects[projectIndex - 1] : null;
  const nextProject =
    projectIndex !== -1 && projectIndex < work.projects.length - 1
      ? work.projects[projectIndex + 1]
      : null;

  const [activeSlide, setActiveSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setActiveSlide(0);
  }, [id]);

  if (!project) {
    return <Navigate to="/work" replace />;
  }

  const flower = PROJECT_FLOWERS[project.id] || PROJECT_FLOWERS['ames-housing'];
  const totalCount = String(work.projects.length).padStart(2, '0');
  const hasEvidence = Boolean(project.hasGallery && project.evidence?.length);

  let currentSection = 0;
  const nextSectionIndex = () => {
    currentSection += 1;
    return String(currentSection).padStart(2, '0');
  };

  return (
    <article className="bloom-detail-page">
      {/* 1. Full-Bleed Sunlit Swiss Alpine Botanical Case Study Hero */}
      <div className="bloom-detail-banner">
        <div className="container bloom-detail-banner__inner">
          <nav className="bloom-detail-nav" aria-label="Breadcrumbs">
            <Link to="/work" className="mono bloom-back-pill">
              ← {lang === 'id' ? 'Kembali ke Taman Proyek' : 'Back to Project Garden'}
            </Link>
            <span className="mono bloom-index-pill">
              {flower.name.toUpperCase()} · {project.num} / {totalCount}
            </span>
          </nav>

          <div className="bloom-detail-hero">
            <div className="bloom-detail-hero__text">
              <div className="bloom-detail-hero__meta mono">
                <span className="bloom-cat-chip">{project.label}</span>
                <span>{project.role}</span>
                <span>·</span>
                <span>{project.meta}</span>
              </div>

              <div className="bloom-mask">
                <motion.h1
                  className="bloom-detail-hero__title"
                  initial={{ y: '100%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
                >
                  {project.title}
                </motion.h1>
              </div>

              <motion.p
                className="bloom-detail-hero__tagline"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.16 }}
              >
                {project.tagline}
              </motion.p>
            </div>

            <motion.div
              className="bloom-detail-hero__emblem"
              initial={{ scale: 0.6, rotate: -30, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
              aria-hidden="true"
            >
              <FlowerEmblem species={flower.species} size={138} />
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. Main Case Study Content */}
      <main className="container bloom-detail-body">
        {/* Official Academic / Competition Dossier Ribbon */}
        {project.caseStudy?.courseInfo && (
          <motion.aside
            className="bloom-dossier-strip"
            aria-label="Project Dossier"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <div className="bloom-dossier-strip__top mono">
              <span>
                {lang === 'id' ? 'CATATAN BOTANI PROYEK' : 'BOTANICAL PROJECT SPECIFICATION'}
              </span>
              <span>{project.caseStudy.courseInfo.date}</span>
            </div>
            <div className="bloom-dossier-strip__grid">
              <div>
                <span className="mono">{lang === 'id' ? 'Konteks' : 'Context'}</span>
                <strong>{project.caseStudy.courseInfo.course}</strong>
              </div>
              <div>
                <span className="mono">{lang === 'id' ? 'Institusi' : 'Institution'}</span>
                <strong>{project.caseStudy.courseInfo.institution}</strong>
              </div>
              <div>
                <span className="mono">{lang === 'id' ? 'Peran / Penulis' : 'Author'}</span>
                <strong>{project.caseStudy.courseInfo.author}</strong>
              </div>
              <div>
                <span className="mono">{lang === 'id' ? 'Sumber Data' : 'Data / Foundation'}</span>
                <strong>{project.caseStudy.courseInfo.dataset}</strong>
              </div>
            </div>
            {project.caseStudy.courseInfo.scope && (
              <div className="bloom-dossier-strip__scope">
                <span className="mono">{lang === 'id' ? 'Cakupan' : 'Scope'}</span>
                <p>{project.caseStudy.courseInfo.scope}</p>
              </div>
            )}
          </motion.aside>
        )}

        {/* Section: Overview */}
        <motion.section
          className="bloom-section"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
        >
          <div className="bloom-section__head">
            <span className="mono bloom-sec-num">{nextSectionIndex()}</span>
            <h2 className="bloom-sec-title">
              {lang === 'id' ? 'Tentang Proyek & Latar Belakang' : 'Overview & Problem Context'}
            </h2>
          </div>
          <p className="bloom-narrative">{project.description}</p>
        </motion.section>

        {/* Section: Key Metrics */}
        {project.metrics && (
          <motion.section
            className="bloom-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <div className="bloom-section__head">
              <span className="mono bloom-sec-num">{nextSectionIndex()}</span>
              <h2 className="bloom-sec-title">
                {lang === 'id' ? 'Hasil & Metrik Kunci' : 'Key Metrics & Measured Impact'}
              </h2>
            </div>

            <div className="bloom-metrics-grid">
              {project.metrics.map((m, idx) => (
                <motion.div
                  key={m.label}
                  className="bloom-metric-card"
                  whileHover={{ y: -4 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                >
                  <span className="mono bloom-metric-card__k">
                    0{idx + 1} · {m.label}
                  </span>
                  <strong className="bloom-metric-card__v">{m.value}</strong>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Section: Methodology & Highlights */}
        {project.highlights && (
          <motion.section
            className="bloom-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
          >
            <div className="bloom-section__head">
              <span className="mono bloom-sec-num">{nextSectionIndex()}</span>
              <h2 className="bloom-sec-title">
                {lang === 'id' ? 'Ruang Lingkup & Metodologi' : 'Scope & Technical Methodology'}
              </h2>
            </div>

            <ul className="bloom-highlights-list">
              {project.highlights.map((h, i) => (
                <li key={i}>
                  <span className="mono bloom-hl-num">0{i + 1}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Interactive Ames Housing Live Simulator */}
        {project.id === 'ames-housing' && (
          <motion.section
            className="bloom-section"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
          >
            <div className="bloom-section__head">
              <span className="mono bloom-sec-num">{nextSectionIndex()}</span>
              <h2 className="bloom-sec-title">
                {lang === 'id'
                  ? 'Simulator Interaktif Valuasi & Klaster Pasar Ames'
                  : 'Interactive Ames Valuation & Market Cluster Simulator'}
              </h2>
            </div>
            <AmesExplorer lang={lang} />
          </motion.section>
        )}

        {/* Section: Core Analysis & Engineering Pillars */}
        {project.caseStudy?.pillars && (
          <section className="bloom-section">
            <div className="bloom-section__head">
              <span className="mono bloom-sec-num">{nextSectionIndex()}</span>
              <h2 className="bloom-sec-title">
                {project.caseStudy.pillarsTitle ||
                  (lang === 'id'
                    ? 'Pilar Analisis & Rekayasa Sistem'
                    : 'Core Analysis & Engineering Pillars')}
              </h2>
            </div>

            <div className="bloom-pillars-grid">
              {project.caseStudy.pillars.map((pillar, idx) => (
                <motion.article
                  key={pillar.index}
                  className="bloom-pillar-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: idx * 0.06 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="bloom-pillar-card__top mono">
                    <span>
                      {pillar.index} · {pillar.category}
                    </span>
                    {pillar.metricBadge && (
                      <span className="bloom-pillar-badge">{pillar.metricBadge}</span>
                    )}
                  </div>
                  <h3 className="bloom-pillar-card__title">{pillar.title}</h3>
                  <p className="bloom-pillar-card__summary">{pillar.summary}</p>
                  <ul className="bloom-pillar-card__bullets">
                    {pillar.details.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </section>
        )}

        {/* Section: Executive Recommendations */}
        {project.caseStudy?.recommendations && (
          <section className="bloom-section">
            <div className="bloom-section__head">
              <span className="mono bloom-sec-num">{nextSectionIndex()}</span>
              <h2 className="bloom-sec-title">
                {project.caseStudy.recommendationsTitle ||
                  (lang === 'id'
                    ? 'Kesimpulan Eksekutif & Rekomendasi Terapan'
                    : 'Executive Summary & Key Takeaways')}
              </h2>
            </div>

            <div className="bloom-rec-grid">
              {project.caseStudy.recommendations.map((rec, idx) => (
                <motion.div
                  key={rec.index}
                  className="bloom-rec-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                >
                  <span className="mono bloom-rec-card__tag">
                    {rec.index} · {rec.badge || (lang === 'id' ? 'INSIGHT UTAMA' : 'KEY TAKEAWAY')}
                  </span>
                  <h3 className="bloom-rec-card__title">{rec.title}</h3>
                  <p className="bloom-rec-card__text">{rec.takeaway}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Applied Technology Stack */}
        <section className="bloom-section">
          <div className="bloom-section__head">
            <span className="mono bloom-sec-num">{nextSectionIndex()}</span>
            <h2 className="bloom-sec-title">
              {lang === 'id' ? 'Teknologi & Alat Terapan' : 'Applied Technology Stack'}
            </h2>
          </div>
          <div className="bloom-tags-cloud">
            {project.tags.map((tag) => (
              <span key={tag} className="tag bloom-tag-lg">
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* Section: Interactive Visual Analysis Charts Gallery */}
        {hasEvidence && (
          <section className="bloom-section">
            <div className="bloom-section__head bloom-section__head--split">
              <div className="bloom-section__head-left">
                <span className="mono bloom-sec-num">{nextSectionIndex()}</span>
                <h2 className="bloom-sec-title">
                  {lang === 'id' ? 'Bukti Analisis & Grafik Visual' : 'Visual Analysis & Evidence'}
                </h2>
              </div>
              <span className="mono bloom-index-pill">
                {String(activeSlide + 1).padStart(2, '0')} /{' '}
                {String(project.evidence.length).padStart(2, '0')}
              </span>
            </div>

            <div className="bloom-evidence-box">
              <div className="bloom-evidence-frame">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={project.evidence[activeSlide].src}
                    src={project.evidence[activeSlide].src}
                    alt={project.evidence[activeSlide].alt}
                    className="bloom-evidence-img"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.28 }}
                  />
                </AnimatePresence>
              </div>

              {project.evidence.length > 1 && (
                <div className="bloom-evidence-controls">
                  <button
                    type="button"
                    className="mono bloom-ev-btn"
                    onClick={() =>
                      setActiveSlide(
                        (prev) => (prev - 1 + project.evidence.length) % project.evidence.length,
                      )
                    }
                    aria-label="Previous chart"
                  >
                    ←
                  </button>

                  <div className="bloom-ev-dots">
                    {project.evidence.map((ev, idx) => (
                      <button
                        key={ev.src}
                        type="button"
                        className={`bloom-ev-dot ${activeSlide === idx ? 'is-active' : ''}`}
                        onClick={() => setActiveSlide(idx)}
                        aria-label={`Slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    className="mono bloom-ev-btn"
                    onClick={() => setActiveSlide((prev) => (prev + 1) % project.evidence.length)}
                    aria-label="Next chart"
                  >
                    →
                  </button>

                  <button
                    type="button"
                    className="mono bloom-ev-full"
                    onClick={() => setIsModalOpen(true)}
                  >
                    {lang === 'id' ? 'Layar Penuh ↗' : 'Fullscreen ↗'}
                  </button>
                </div>
              )}

              {project.evidence[activeSlide].caption && (
                <p className="bloom-evidence-caption">{project.evidence[activeSlide].caption}</p>
              )}
            </div>
          </section>
        )}
      </main>

      {/* 3. Next / Previous Blooming Case Study Pager */}
      <footer className="container bloom-detail-footer">
        <div className="bloom-pager">
          {prevProject ? (
            <Link to={`/work/${prevProject.id}`} className="bloom-pager-card">
              <span className="mono bloom-pager-dir">
                ← {lang === 'id' ? 'Bunga Sebelumnya' : 'Previous Bloom'}
              </span>
              <strong>{prevProject.title}</strong>
            </Link>
          ) : (
            <div aria-hidden="true" />
          )}

          {nextProject ? (
            <Link to={`/work/${nextProject.id}`} className="bloom-pager-card bloom-pager-card--next">
              <span className="mono bloom-pager-dir">
                {lang === 'id' ? 'Bunga Selanjutnya' : 'Next Bloom'} →
              </span>
              <strong>{nextProject.title}</strong>
            </Link>
          ) : (
            <div aria-hidden="true" />
          )}
        </div>
      </footer>

      {hasEvidence && (
        <EvidenceModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={project.title}
          images={project.evidence}
        />
      )}
    </article>
  );
}
