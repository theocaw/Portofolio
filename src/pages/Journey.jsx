import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import { getJourneyContent } from '../content/journey.js';
import FlowerEmblem from '../components/FlowerEmblem.jsx';
import './Journey.css';

const SEASONS = {
  en: [
    { id: 'spring', num: '01', name: 'Spring · Industry', sub: 'PT KCT Logistics', species: 'rose' },
    { id: 'summer', num: '02', name: 'Summer · Leadership', sub: '5 Campus Roles', species: 'buttercup' },
    { id: 'autumn', num: '03', name: 'Autumn · Honors', sub: 'Awards & Gemini AI', species: 'gentian' },
  ],
  id: [
    { id: 'spring', num: '01', name: 'Semi · Industri', sub: 'Magang PT KCT', species: 'rose' },
    { id: 'summer', num: '02', name: 'Panas · Organisasi', sub: '5 Peran Kampus', species: 'buttercup' },
    { id: 'autumn', num: '03', name: 'Gugur · Prestasi', sub: 'Juara & Gemini AI', species: 'gentian' },
  ],
};

const ORG_SPECIES = ['edelweiss', 'rose', 'buttercup', 'gentian', 'lavender'];

export default function Journey() {
  const { lang } = useApp();
  const journey = getJourneyContent(lang);
  const { intro, professional, organizations, achievements } = journey;
  const { internship } = professional;

  const seasons = SEASONS[lang] || SEASONS.en;
  const [activeSeason, setActiveSeason] = useState('spring');
  const [selectedOrgIdx, setSelectedOrgIdx] = useState(0);

  const activeOrg = organizations.entries[selectedOrgIdx] || organizations.entries[0];

  return (
    <div className="seasons-journey">
      {/* Compact Sunlit Kinetic Hero + 3-Season Interactive Flower Switcher */}
      <section className="container seasons-hero">
        <div className="seasons-hero__top">
          <span className="mono kissa-eyebrow">
            {lang === 'id'
              ? '04 / PERJALANAN · TIGA MUSIM PERTUMBUHAN (2024 — 2026)'
              : '04 / JOURNEY · THREE SEASONS OF GROWTH (2024 — 2026)'}
          </span>
          <div className="seasons-mask">
            <motion.h1
              className="seasons-hero__title"
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              {intro.headline}
            </motion.h1>
          </div>
          <p className="seasons-hero__desc">{intro.description}</p>
        </div>

        {/* Interactive 3-Season Meadow Selector Cards (motion layoutId) */}
        <div className="seasons-switcher" role="tablist" aria-label="Journey seasons">
          {seasons.map((s) => {
            const isSelected = activeSeason === s.id;
            return (
              <button
                key={s.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                className={`seasons-tab ${isSelected ? 'is-active' : ''}`}
                onClick={() => setActiveSeason(s.id)}
              >
                {isSelected && (
                  <motion.span
                    layoutId="alpine-season-active-card"
                    className="seasons-tab__bg"
                    transition={{ type: 'spring', stiffness: 360, damping: 28 }}
                  />
                )}
                <span className="seasons-tab__inner">
                  <FlowerEmblem species={s.species} size={42} />
                  <span className="seasons-tab__copy">
                    <span className="mono seasons-tab__num">
                      SEASON {s.num} · {s.sub}
                    </span>
                    <strong>{s.name}</strong>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* =========================================================
          INTERACTIVE SEASONAL STAGE (Morphs smoothly between 3 distinct layouts!)
         ========================================================= */}
      <section className="container seasons-stage-wrap">
        <AnimatePresence mode="wait">
          {/* SEASON 01: SPRING — PT KCT INDUSTRY POSTCARD SHOWCASE */}
          {activeSeason === 'spring' && (
            <motion.div
              key="spring"
              className="season-panel season-spring"
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="spring-postcard">
                <div className="spring-postcard__banner">
                  <div className="spring-postcard__left">
                    <span className="mono spring-badge">
                      {internship.period} · {internship.location}
                    </span>
                    <h2 className="spring-company">{internship.company}</h2>
                    <p className="spring-role">{internship.role}</p>
                  </div>

                  <a
                    href={internship.website.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mono spring-live-btn"
                  >
                    <i className="exhibit-live-dot" aria-hidden="true" />
                    {internship.website.label}
                  </a>
                </div>

                <p className="spring-desc">{internship.description}</p>

                {/* 3 Sunlit Outcome Stem Metrics */}
                <div className="spring-metrics-row">
                  {internship.metrics.map((m, i) => (
                    <motion.div
                      key={m.label}
                      className="spring-metric-card"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08 }}
                    >
                      <FlowerEmblem species={ORG_SPECIES[i]} size={34} />
                      <span className="mono">{m.label}</span>
                      <strong>{m.value}</strong>
                      <small>{m.note}</small>
                    </motion.div>
                  ))}
                </div>

                {/* Deliverables Grid */}
                <div className="spring-deliverables-grid">
                  {internship.deliverables.map((item, idx) => (
                    <div key={idx} className="spring-deliv-pill">
                      <span className="mono">0{idx + 1}</span>
                      <p>{item}</p>
                    </div>
                  ))}
                </div>

                <div className="spring-tags">
                  {internship.skills.map((skill) => (
                    <span key={skill} className="tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* SEASON 02: SUMMER — INTERACTIVE 5-ROLE CAMPUS LEADERSHIP STAGE */}
          {activeSeason === 'summer' && (
            <motion.div
              key="summer"
              className="season-panel season-summer"
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="summer-head">
                <div>
                  <span className="mono kissa-eyebrow">{organizations.label}</span>
                  <h2 className="summer-title">{organizations.title}</h2>
                </div>
                <p className="summer-sub">{organizations.description}</p>
              </div>

              {/* 5 Interactive Organization Flower Pills */}
              <div className="summer-pills-bar" role="tablist" aria-label="Select organization role">
                {organizations.entries.map((org, idx) => {
                  const isActive = idx === selectedOrgIdx;
                  return (
                    <button
                      key={org.name}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`summer-org-pill ${isActive ? 'is-active' : ''}`}
                      onClick={() => setSelectedOrgIdx(idx)}
                    >
                      <FlowerEmblem species={ORG_SPECIES[idx % ORG_SPECIES.length]} size={30} />
                      <span>
                        <small className="mono">{org.period}</small>
                        <strong>{org.name}</strong>
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Spotlight Stage for Selected Campus Role */}
              <AnimatePresence mode="wait">
                <motion.article
                  key={activeOrg.name}
                  className="summer-spotlight"
                  initial={{ opacity: 0, y: 14, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.99 }}
                  transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                >
                  <div className="summer-spotlight__left">
                    <div className="summer-spotlight__crest">
                      <FlowerEmblem
                        species={ORG_SPECIES[selectedOrgIdx % ORG_SPECIES.length]}
                        size={92}
                      />
                    </div>
                    <span className="mono summer-spotlight__badge">{activeOrg.badge}</span>
                    <span className="mono summer-spotlight__period">{activeOrg.period}</span>
                  </div>

                  <div className="summer-spotlight__main">
                    <span className="mono summer-spotlight__role">{activeOrg.role}</span>
                    <h3 className="summer-spotlight__name">{activeOrg.name}</h3>
                    <p className="summer-spotlight__desc">{activeOrg.description}</p>

                    {activeOrg.metrics && (
                      <div className="summer-spotlight__metrics">
                        {activeOrg.metrics.map((m) => (
                          <div key={m.label} className="summer-metric-box">
                            <span className="mono">{m.label}</span>
                            <strong>{m.value}</strong>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeOrg.highlights && (
                      <ul className="summer-spotlight__list">
                        {activeOrg.highlights.map((h, i) => (
                          <li key={i}>{h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </motion.article>
              </AnimatePresence>
            </motion.div>
          )}

          {/* SEASON 03: AUTUMN — TROPHY MEADOW & GOOGLE GEMINI DIPLOMA */}
          {activeSeason === 'autumn' && (
            <motion.div
              key="autumn"
              className="season-panel season-autumn"
              initial={{ opacity: 0, y: 20, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -14, filter: 'blur(4px)' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="summer-head">
                <div>
                  <span className="mono kissa-eyebrow">{achievements.label}</span>
                  <h2 className="summer-title">{achievements.title}</h2>
                </div>
              </div>

              <div className="autumn-meadow-grid">
                {achievements.entries.map((entry, idx) => {
                  const isCert = entry.badgeType === 'verified';
                  return (
                    <motion.article
                      key={entry.name}
                      className={`autumn-trophy-card ${isCert ? 'is-featured-cert' : ''}`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.07 }}
                      whileHover={{ y: -5 }}
                    >
                      <div className="autumn-trophy-card__top">
                        <span className="mono autumn-result-pill">{entry.result}</span>
                        <FlowerEmblem
                          species={isCert ? 'edelweiss' : ORG_SPECIES[(idx + 1) % ORG_SPECIES.length]}
                          size={44}
                        />
                      </div>

                      <span className="mono autumn-cat">{entry.category}</span>
                      <h3 className="autumn-name">{entry.name}</h3>
                      <span className="mono autumn-org">{entry.organizer}</span>
                      <p className="autumn-desc">{entry.description}</p>

                      <div className="autumn-foot">
                        {entry.validity && <span className="mono autumn-valid">{entry.validity}</span>}
                        {entry.certificateUrl && (
                          <a
                            href={entry.certificateUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="mono alpine-orbit-cta"
                          >
                            {lang === 'id' ? 'Lihat Sertifikat (PDF) ↗' : 'View Certificate (PDF) ↗'}
                          </a>
                        )}
                        {entry.skills && (
                          <div className="spring-tags">
                            {entry.skills.map((s) => (
                              <span key={s} className="tag">
                                {s}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
