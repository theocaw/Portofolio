import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import { getAboutContent } from '../content/about.js';
import FlowerEmblem from '../components/FlowerEmblem.jsx';
import './About.css';

const SEAL_STAMPS = {
  en: [
    'EDELWEISS RECORD · CLICK TO BLOOM',
    'VERIFIED · CUM LAUDE TRACK',
    'VERIFIED · DATA & SOFTWARE ENG.',
    'VERIFIED · VOCATIONAL IPB UNIVERSITY',
  ],
  id: [
    'CATATAN EDELWEISS · KLIK UNTUK MEKAR',
    'TERVERIFIKASI · JALUR CUM LAUDE',
    'TERVERIFIKASI · DATA & RPL',
    'TERVERIFIKASI · SEKOLAH VOKASI IPB',
  ],
};

const BED_FLOWERS = ['rose', 'buttercup', 'lavender'];

export default function About() {
  const { lang } = useApp();
  const about = getAboutContent(lang);
  const { intro, profile, education, toolkit, workInvitation } = about;

  const [stampIdx, setStampIdx] = useState(0);
  const [activeBed, setActiveBed] = useState(0); // 0, 1, 2, or 'all'
  const [selectedTool, setSelectedTool] = useState(null);

  const stamps = SEAL_STAMPS[lang] || SEAL_STAMPS.en;

  const visibleDomains =
    activeBed === 'all'
      ? toolkit.domains.map((d, idx) => ({ ...d, idx }))
      : [{ ...toolkit.domains[activeBed], idx: activeBed }];

  return (
    <div className="meadow-about">
      {/* Header */}
      <section className="container meadow-about-hero">
        <span className="mono kissa-eyebrow">
          {lang === 'id'
            ? '02 / TENTANG · PAVILIUN BOTANI & PROFIL'
            : '02 / ABOUT · ALPINE GLASSHOUSE PAVILION'}
        </span>
        <h1 className="meadow-about-hero__title">{intro.headline}</h1>
        <p className="meadow-about-hero__desc">{intro.description}</p>
      </section>

      {/* =========================================================
          CENTERPIECE 1: SUNLIT ALPINE GLASSHOUSE PAVILION (2 Botanical Cards)
         ========================================================= */}
      <section className="band band--paper-2 meadow-pavilion-band">
        <div className="container">
          <div className="meadow-pavilion">
            {/* Left Pavilion Wing: Profile & Focus */}
            <article className="meadow-wing kissa-spotlight">
              <div className="meadow-wing__head">
                <span className="mono">
                  {lang === 'id' ? 'TAMAN I · PROFIL & ARAH' : `GARDEN WING I · ${profile.label}`}
                </span>
                <FlowerEmblem species="rose" size={34} />
              </div>

              <h2 className="meadow-wing__title">{profile.title}</h2>

              <div className="meadow-wing__prose">
                {profile.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <div className="meadow-focus-row">
                {profile.focus.map((f) => (
                  <div key={f.label} className="meadow-focus-box">
                    <span className="mono meadow-focus-box__k">{f.label}</span>
                    <strong className="meadow-focus-box__v">{f.value}</strong>
                  </div>
                ))}
              </div>
            </article>

            {/* Right Pavilion Wing: IPB Education & Interactive Blooming Edelweiss GPA */}
            <article className="meadow-wing kissa-spotlight">
              <div className="meadow-wing__head">
                <span className="mono">
                  {lang === 'id' ? 'TAMAN II · PENDIDIKAN' : `GARDEN WING II · ${education.label}`}
                </span>
                <FlowerEmblem species="gentian" size={34} />
              </div>

              <div className="meadow-edu-block">
                <span className="mono meadow-edu-block__period">{education.period}</span>
                <h2 className="meadow-wing__title">{education.school}</h2>
                <p className="meadow-edu-block__degree">{education.degree.join(' — ')}</p>

                <div className="meadow-lang-grid">
                  {education.languages.map((l) => (
                    <div key={l.name} className="meadow-lang-item">
                      <strong>{l.name}</strong>
                      <span className="mono">{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Blooming Edelweiss GPA Medallion */}
              <motion.div
                className="meadow-gpa-card kissa-gpa-plate"
                onClick={() => setStampIdx((prev) => (prev + 1) % stamps.length)}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setStampIdx((prev) => (prev + 1) % stamps.length);
                  }
                }}
              >
                <div className="meadow-gpa-card__top">
                  <div className="mono meadow-gpa-card__meta">
                    <span>{education.gpa.label}</span>
                    <span className="meadow-gpa-card__badge">{stamps[stampIdx]}</span>
                  </div>
                  <motion.div
                    key={stampIdx}
                    initial={{ rotate: -35, scale: 0.8 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 280, damping: 16 }}
                  >
                    <FlowerEmblem species="edelweiss" size={44} />
                  </motion.div>
                </div>

                <div className="meadow-gpa-card__val">
                  <span className="meadow-gpa-card__num">{education.gpa.value}</span>
                  <span className="meadow-gpa-card__scale">{education.gpa.scale}</span>
                </div>
                <p className="meadow-gpa-card__note">{education.gpa.note}</p>
              </motion.div>
            </article>
          </div>
        </div>
      </section>

      {/* =========================================================
          CENTERPIECE 2: 3-BED BOTANICAL SEED PACKET TOOLKIT
         ========================================================= */}
      <section className="container meadow-toolkit-section">
        <div className="meadow-toolkit-header">
          <div>
            <span className="mono kissa-eyebrow">
              {lang === 'id' ? 'KEBUN KEAHLIAN · 03 PETAK BUNGA' : `BOTANICAL TOOLKIT · ${toolkit.label}`}
            </span>
            <h2 className="meadow-toolkit-title">{toolkit.title}</h2>
          </div>

          <div className="meadow-bed-tabs" role="tablist" aria-label="Toolkit botanical beds">
            {toolkit.domains.map((d, idx) => {
              const isSelected = activeBed === idx;
              return (
                <button
                  key={d.title}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`mono meadow-bed-tab ${isSelected ? 'is-active' : ''}`}
                  onClick={() => setActiveBed(idx)}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="about-garden-bed-pill"
                      className="meadow-bed-tab__bg"
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    />
                  )}
                  <span className="meadow-bed-tab__label">0{idx + 1} · {d.title}</span>
                </button>
              );
            })}
            <button
              type="button"
              role="tab"
              aria-selected={activeBed === 'all'}
              className={`mono meadow-bed-tab ${activeBed === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveBed('all')}
            >
              {activeBed === 'all' && (
                <motion.span
                  layoutId="about-garden-bed-pill"
                  className="meadow-bed-tab__bg"
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                />
              )}
              <span className="meadow-bed-tab__label">
                {lang === 'id' ? 'Semua (3)' : 'All Beds (3)'}
              </span>
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={String(activeBed)}
            className={`meadow-seed-grid ${activeBed === 'all' ? 'is-multi' : ''}`}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          >
            {visibleDomains.map((d) => (
              <article key={d.title} className="meadow-seed-card kissa-spotlight">
                <div className="meadow-seed-card__top">
                  <div className="meadow-seed-card__species">
                    <FlowerEmblem species={BED_FLOWERS[d.idx % BED_FLOWERS.length]} size={42} />
                    <div>
                      <span className="mono meadow-seed-card__code">
                        GARDEN BED 0{d.idx + 1} · {d.tools.length} TOOLS
                      </span>
                      <h3 className="meadow-seed-card__title">{d.title}</h3>
                    </div>
                  </div>

                  {selectedTool && d.tools.includes(selectedTool) && (
                    <button
                      type="button"
                      className="mono meadow-seed-clear"
                      onClick={() => setSelectedTool(null)}
                    >
                      {selectedTool} ×
                    </button>
                  )}
                </div>

                <p className="meadow-seed-card__desc">{d.description}</p>

                <div className="meadow-seed-pills">
                  {d.tools.map((tool, tIdx) => (
                    <motion.button
                      key={tool}
                      type="button"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: 'spring',
                        stiffness: 340,
                        damping: 22,
                        delay: tIdx * 0.03,
                      }}
                      className={`mono meadow-seed-pill ${selectedTool === tool ? 'is-selected' : ''}`}
                      onClick={() => setSelectedTool((prev) => (prev === tool ? null : tool))}
                    >
                      {tool}
                    </motion.button>
                  ))}
                </div>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Next-Garden Invitation */}
        <div className="meadow-next-bar">
          <div>
            <span className="mono kissa-eyebrow">
              {lang === 'id' ? '03 / SELANJUTNYA: TAMAN PROYEK' : '03 / NEXT: PROJECT FLOWER GARDEN'}
            </span>
            <h3 className="meadow-next-bar__title">{workInvitation.title}</h3>
          </div>
          <Link to={workInvitation.action.to} className="mono meadow-next-bar__cta">
            {workInvitation.action.label} ↗
          </Link>
        </div>
      </section>
    </div>
  );
}
