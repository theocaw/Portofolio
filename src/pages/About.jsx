import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import { getAboutContent } from '../content/about.js';
import FlowerEmblem from '../components/FlowerEmblem.jsx';
import './About.css';

const BED_FLOWERS = ['rose', 'buttercup', 'lavender'];

export default function About() {
  const { lang } = useApp();
  const about = getAboutContent(lang);
  const { intro, profile, education, toolkit, workInvitation } = about;

  const [bloomOpen, setBloomOpen] = useState(false);
  const [activeBed, setActiveBed] = useState('all'); // 'all' | 0 | 1 | 2
  const [selectedTool, setSelectedTool] = useState(null);

  const visibleDomains =
    activeBed === 'all'
      ? toolkit.domains.map((d, idx) => ({ ...d, idx }))
      : [{ ...toolkit.domains[activeBed], idx: activeBed }];

  return (
    <div className="about-walk">
      {/* Open-Air Kinetic Opening */}
      <section className="container about-walk__hero">
        <motion.span
          className="mono kissa-eyebrow"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {lang === 'id' ? '02 / TENTANG · KONSERVATORI ALPEN' : '02 / ABOUT · THE ALPINE CONSERVATORY'}
        </motion.span>

        <div className="about-walk__headline-mask">
          <motion.h1
            className="about-walk__title"
            initial={{ y: '100%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            {intro.headline}
          </motion.h1>
        </div>

        <motion.p
          className="about-walk__desc"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.18 }}
        >
          {intro.description}
        </motion.p>
      </section>

      {/* Open Asymmetric Editorial Story + Interactive Sculptural Blooming GPA Ring */}
      <section className="container about-walk__story-band">
        <div className="about-walk__story-grid">
          <motion.div
            className="about-walk__prose-col"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mono about-walk__sub-label">{profile.label}</span>
            <h2 className="about-walk__section-h2">{profile.title}</h2>
            <div className="about-walk__paragraphs">
              {profile.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <div className="about-walk__focus-pills">
              {profile.focus.map((f, idx) => (
                <motion.div
                  key={f.label}
                  className="about-walk__focus-pill"
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 320, damping: 20 }}
                >
                  <FlowerEmblem species={idx === 0 ? 'rose' : 'gentian'} size={34} />
                  <div>
                    <span className="mono">{f.label}</span>
                    <strong>{f.value}</strong>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Interactive Sculptural Blooming GPA Ring (Click/Hover blooms petals outward!) */}
          <motion.div
            className={`about-gpa-orbit ${bloomOpen ? 'is-bloomed' : ''}`}
            onClick={() => setBloomOpen((b) => !b)}
            onMouseEnter={() => setBloomOpen(true)}
            onMouseLeave={() => setBloomOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Interactive Blooming GPA Medallion — click to bloom petals"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setBloomOpen((b) => !b);
              }
            }}
          >
            {/* 6 Animated Petals Radiating Outward on Hover/Click */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <motion.span
                key={deg}
                className="about-gpa-orbit__petal"
                animate={{
                  rotate: deg + (bloomOpen ? 18 : 0),
                  scale: bloomOpen ? 1.15 : 0.85,
                  opacity: bloomOpen ? 0.92 : 0.45,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 18,
                  delay: i * 0.03,
                }}
                aria-hidden="true"
              />
            ))}

            <div className="about-gpa-orbit__core">
              <span className="mono about-gpa-orbit__label">{education.gpa.label}</span>
              <div className="about-gpa-orbit__val">
                <span>{education.gpa.value}</span>
                <small className="mono">{education.gpa.scale}</small>
              </div>
              <span className="mono about-gpa-orbit__school">{education.school}</span>
              <span className="mono about-gpa-orbit__period">{education.period}</span>
            </div>
          </motion.div>
        </div>

        {/* Clean Horizontal Education & Languages Strip */}
        <div className="about-edu-ribbon">
          <div className="about-edu-ribbon__item">
            <span className="mono">DEGREE</span>
            <strong>{education.degree.join(' — ')}</strong>
          </div>
          {education.languages.map((l) => (
            <div key={l.name} className="about-edu-ribbon__item">
              <span className="mono">LANGUAGE</span>
              <strong>
                {l.name} · <em>{l.level}</em>
              </strong>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Floating Seed-Cloud Botanical Skill Constellation */}
      <section className="container about-constellation">
        <div className="about-constellation__head">
          <div>
            <span className="mono kissa-eyebrow">{toolkit.label}</span>
            <h2 className="about-walk__section-h2">{toolkit.title}</h2>
          </div>

          <div className="about-constellation__tabs" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeBed === 'all'}
              className={`mono about-tab ${activeBed === 'all' ? 'is-active' : ''}`}
              onClick={() => setActiveBed('all')}
            >
              {activeBed === 'all' && (
                <motion.span
                  layoutId="about-constellation-pill"
                  className="about-tab__bg"
                  transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                />
              )}
              <span className="about-tab__lbl">{lang === 'id' ? 'Semua' : 'All Flora'}</span>
            </button>

            {toolkit.domains.map((d, idx) => {
              const selected = activeBed === idx;
              return (
                <button
                  key={d.title}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={`mono about-tab ${selected ? 'is-active' : ''}`}
                  onClick={() => setActiveBed(idx)}
                >
                  {selected && (
                    <motion.span
                      layoutId="about-constellation-pill"
                      className="about-tab__bg"
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    />
                  )}
                  <span className="about-tab__lbl">{d.title}</span>
                </button>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={String(activeBed)}
            className="about-constellation__rows"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          >
            {visibleDomains.map((d) => (
              <div key={d.title} className="about-domain-row">
                <div className="about-domain-row__left">
                  <FlowerEmblem species={BED_FLOWERS[d.idx % BED_FLOWERS.length]} size={46} />
                  <div>
                    <h3 className="about-domain-row__title">{d.title}</h3>
                    <p className="about-domain-row__desc">{d.description}</p>
                  </div>
                </div>

                <div className="about-domain-row__cloud">
                  {d.tools.map((tool, tIdx) => (
                    <motion.button
                      key={tool}
                      type="button"
                      className={`mono about-seed-chip ${selectedTool === tool ? 'is-selected' : ''}`}
                      initial={{ opacity: 0, scale: 0.86 }}
                      animate={{ opacity: 1, scale: 1 }}
                      whileHover={{ y: -4, scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      transition={{ type: 'spring', stiffness: 360, damping: 20, delay: tIdx * 0.025 }}
                      onClick={() => setSelectedTool((prev) => (prev === tool ? null : tool))}
                    >
                      {tool}
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Open Horizon Next Link */}
        <div className="about-next-banner">
          <div>
            <span className="mono kissa-eyebrow">
              {lang === 'id' ? '03 / SELANJUTNYA: PAMERAN BUNGA PROYEK' : '03 / NEXT: FLOWER EXHIBITION'}
            </span>
            <h3 className="about-next-banner__title">{workInvitation.title}</h3>
          </div>
          <Link to={workInvitation.action.to} className="mono alpine-orbit-cta">
            {workInvitation.action.label} ↗
          </Link>
        </div>
      </section>
    </div>
  );
}
