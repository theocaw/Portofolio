import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import { getAboutContent } from '../content/about.js';
import FlowerEmblem from '../components/FlowerEmblem.jsx';
import './About.css';

const BED_FLOWERS = ['rose', 'buttercup', 'lavender'];
const OUTER_ROSE_PETALS = Array.from({ length: 12 }, (_, i) => i * 30);
const INNER_ROSE_PETALS = Array.from({ length: 10 }, (_, i) => i * 36 + 15);
const ROSE_LEAVES = [35, 125, 215, 305];

export default function About() {
  const { lang } = useApp();
  const about = getAboutContent(lang);
  const { intro, profile, education, toolkit, workInvitation } = about;

  const [bloomOpen, setBloomOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

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

      {/* Open Asymmetric Editorial Story + Lush Multi-Layered Blooming Rose GPA */}
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

          {/* Lush 22-Petal Multi-Layer Blooming Rose around GPA 3.63 / 4.00 */}
          <motion.div
            className={`about-gpa-rose ${bloomOpen ? 'is-bloomed' : ''}`}
            onClick={() => setBloomOpen((b) => !b)}
            onMouseEnter={() => setBloomOpen(true)}
            onMouseLeave={() => setBloomOpen(false)}
            role="button"
            tabIndex={0}
            aria-label="Interactive Blooming Rose GPA Medallion"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setBloomOpen((b) => !b);
              }
            }}
          >
            {/* 4 Emerald Rose Sepal Leaves */}
            {ROSE_LEAVES.map((deg, i) => (
              <motion.span
                key={`leaf-${deg}`}
                className="about-gpa-rose__leaf"
                animate={{
                  rotate: deg + (bloomOpen ? 10 : 0),
                  scale: bloomOpen ? 1.25 : 0.72,
                  opacity: bloomOpen ? 0.92 : 0.35,
                }}
                transition={{ type: 'spring', stiffness: 170, damping: 16, delay: i * 0.03 }}
                aria-hidden="true"
              />
            ))}

            {/* 12 Large Outer Velvet Rose Petals */}
            {OUTER_ROSE_PETALS.map((deg, i) => (
              <motion.span
                key={`outer-${deg}`}
                className="about-gpa-rose__petal about-gpa-rose__petal--outer"
                animate={{
                  rotate: deg + (bloomOpen ? 16 : 0),
                  scale: bloomOpen ? 1.32 : 0.78,
                  opacity: bloomOpen ? 0.96 : 0.48,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 185,
                  damping: 16,
                  delay: i * 0.018,
                }}
                aria-hidden="true"
              />
            ))}

            {/* 10 Overlapping Inner Blush Rose Petals */}
            {INNER_ROSE_PETALS.map((deg, i) => (
              <motion.span
                key={`inner-${deg}`}
                className="about-gpa-rose__petal about-gpa-rose__petal--inner"
                animate={{
                  rotate: deg - (bloomOpen ? 14 : 0),
                  scale: bloomOpen ? 1.2 : 0.82,
                  opacity: bloomOpen ? 0.94 : 0.52,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 205,
                  damping: 17,
                  delay: 0.04 + i * 0.016,
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

        {/* Clean Degree + Unified 4-Language Group (Indonesian, English, Korean, Mandarin) */}
        <div className="about-edu-ribbon">
          <div className="about-edu-ribbon__item">
            <span className="mono">{lang === 'id' ? 'PROGRAM STUDI' : 'DEGREE'}</span>
            <strong>{education.degree.join(' — ')}</strong>
          </div>

          <div className="about-edu-ribbon__item">
            <span className="mono">{lang === 'id' ? 'BAHASA' : 'LANGUAGES'}</span>
            <div className="about-lang-pills">
              {education.languages.map((l) => (
                <span key={l.name} className="about-lang-pill">
                  <strong>{l.name}</strong>
                  <em className="mono">{l.level}</em>
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Toolkit — All 3 Domains Directly Visible (No Filter Tabs!) */}
      <section className="container about-constellation">
        <div className="about-constellation__head">
          <div>
            <span className="mono kissa-eyebrow">{toolkit.label}</span>
            <h2 className="about-walk__section-h2">{toolkit.title}</h2>
          </div>
        </div>

        <div className="about-constellation__rows">
          {toolkit.domains.map((d, idx) => (
            <motion.div
              key={d.title}
              className="about-domain-row"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
            >
              <div className="about-domain-row__left">
                <FlowerEmblem species={BED_FLOWERS[idx % BED_FLOWERS.length]} size={46} />
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
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ y: -4, scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 20, delay: tIdx * 0.02 }}
                    onClick={() => setSelectedTool((prev) => (prev === tool ? null : tool))}
                  >
                    {tool}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="about-next-banner">
          <div>
            <span className="mono kissa-eyebrow">
              {lang === 'id' ? '03 / SELANJUTNYA: TAMAN PROYEK' : '03 / NEXT: PROJECT GREENHOUSE'}
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
