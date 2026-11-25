import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import FlowerEmblem from './FlowerEmblem.jsx';
import './AnalyticsGardenChart.css';

const BAR_SPECIES = ['edelweiss', 'rose', 'buttercup', 'gentian', 'lavender'];

// 100% General Portfolio Overview Datasets (NOT limited to 2 specific projects!)
const CHART_DATASETS = {
  skills: {
    id: 'skills',
    tabEn: 'Core Skill Balance',
    tabId: 'Komposisi Keahlian',
    eyebrowEn: 'MULTIDISCIPLINARY STRENGTHS · GENERAL OVERVIEW',
    eyebrowId: 'KEKUATAN MULTIDISIPLIN · GAMBARAN UMUM',
    titleEn: 'Where Analytical Thinking Meets Visual Craft',
    titleId: 'Perpaduan Analisis Data & Rekayasa Antarmuka',
    summaryEn:
      'A balanced foundation across data analysis, modern front-end development, structured backend/database design, AI workflows, and creative storytelling.',
    summaryId:
      'Fondasi seimbang yang menggabungkan analisis data, pengembangan front-end modern, desain sistem & basis data, alur kerja AI, serta penceritaan visual.',
    to: '/about',
    ctaEn: 'Explore Full Toolkit (/about) ↗',
    ctaId: 'Lihat Semua Keahlian (/about) ↗',
    bars: [
      {
        key: 'data',
        labelEn: 'Data & ML',
        labelId: 'Data & ML',
        valueText: '92%',
        pct: 92,
        colorVar: '--chart-1',
        detailEn: 'Python, R, SQL, Exploratory Data Analysis, Geospatial ETL, Regression & K-Means',
        detailId: 'Python, R, SQL, EDA, ETL Geospasial, Regresi Linear, Decision Tree & K-Means',
      },
      {
        key: 'frontend',
        labelEn: 'Front-End',
        labelId: 'Front-End',
        valueText: '90%',
        pct: 90,
        colorVar: '--chart-2',
        detailEn: 'React, Vite, Tailwind CSS, Motion & Anime.js — responsive, living user interfaces',
        detailId: 'React, Vite, Tailwind CSS, Motion & Anime.js — antarmuka responsif dan interaktif',
      },
      {
        key: 'systems',
        labelEn: 'Systems & DB',
        labelId: 'Sistem & DB',
        valueText: '88%',
        pct: 88,
        colorVar: '--chart-3',
        detailEn: 'Laravel, REST APIs, MySQL & MongoDB, 3NF ERD modeling & 4-tier IEEE 830 SDD',
        detailId: 'Laravel, REST API, MySQL & MongoDB, pemodelan ERD 3NF & spesifikasi 4-tier DPPL',
      },
      {
        key: 'ai',
        labelEn: 'AI & Gemini',
        labelId: 'AI & Gemini',
        valueText: '85%',
        pct: 85,
        colorVar: '--chart-4',
        detailEn: 'Google Gemini Certified Student — function calling, prompt engineering & AI integration',
        detailId: 'Google Gemini Certified Student — function calling, prompt engineering & integrasi AI',
      },
      {
        key: 'creative',
        labelEn: '3D & Story',
        labelId: '3D & Visual',
        valueText: '82%',
        pct: 82,
        colorVar: '--chart-5',
        detailEn: 'Blender 3D, Unity Vuforia AR, visual narrative & 2× 2nd Place Short Film competitions',
        detailId: 'Blender 3D, Unity Vuforia AR, narasi visual & 2× Juara 2 kompetisi film pendek',
      },
    ],
  },
  footprint: {
    id: 'footprint',
    tabEn: 'Portfolio Footprint',
    tabId: 'Sebaran Karya',
    eyebrowEn: 'ACROSS ALL DISCIPLINES · 2024 — 2026',
    eyebrowId: 'LINTAS BIDANG & PENGALAMAN · 2024 — 2026',
    titleEn: 'Everything Cultivated Across Campus & Industry',
    titleId: 'Jejak Karya di Akademik, Organisasi & Industri',
    summaryEn:
      'Hover any blooming stem to inspect how my projects, active builds, leadership roles, competitions, and industry experience fit together.',
    summaryId:
      'Arahkan kursor ke setiap tangkai bunga untuk melihat sebaran proyek selesai, proyek aktif, organisasi, prestasi, dan pengalaman industri.',
    to: '/work',
    ctaEn: 'Browse All Projects (/work) ↗',
    ctaId: 'Jelajahi Semua Proyek (/work) ↗',
    bars: [
      {
        key: 'completed',
        labelEn: 'Shipped',
        labelId: 'Selesai',
        valueText: '06',
        pct: 96,
        colorVar: '--chart-1',
        detailEn: '6 completed case studies spanning data mining, healthcare ETL, full-stack, mobile & AR',
        detailId: '6 studi kasus selesai mencakup data mining, ETL kesehatan, full-stack, mobile & AR',
      },
      {
        key: 'orgs',
        labelEn: 'Leadership',
        labelId: 'Organisasi',
        valueText: '05',
        pct: 82,
        colorVar: '--chart-2',
        detailEn: '5 student leadership & treasury roles — 280+ financial records audited transparently',
        detailId: '5 peran kepemimpinan & bendahara kampus — 280+ transaksi diaudit secara transparan',
      },
      {
        key: 'awards',
        labelEn: 'Honors',
        labelId: 'Prestasi',
        valueText: '04',
        pct: 68,
        colorVar: '--chart-3',
        detailEn: 'Google Gemini Certified Student + 2× 2nd Place Short Movie + Business Plan Semifinalist',
        detailId: 'Google Gemini Certified Student + 2× Juara 2 Film Pendek + Semifinalis Business Plan',
      },
      {
        key: 'ongoing',
        labelEn: 'Active Now',
        labelId: 'On-Going',
        valueText: '02',
        pct: 48,
        colorVar: '--chart-4',
        detailEn: '2 active 2026 builds currently growing in the studio (Veriface & Siren)',
        detailId: '2 proyek 2026 yang sedang aktif dikembangkan di studio (Veriface & Siren)',
      },
      {
        key: 'industry',
        labelEn: 'Industry',
        labelId: 'Industri',
        valueText: 'Live',
        pct: 60,
        colorVar: '--chart-5',
        detailEn: 'PT KCT Logistics internship — shipped live corporate website kctjakarta.com & ~20 quotes',
        detailId: 'Magang PT KCT — merilis website korporat live kctjakarta.com & ~20 kuotasi komersial',
      },
    ],
  },
};

export default function AnalyticsGardenChart() {
  const { lang } = useApp();
  const [datasetKey, setDatasetKey] = useState('skills');
  const [hoveredIdx, setHoveredIdx] = useState(0);

  const active = CHART_DATASETS[datasetKey] || CHART_DATASETS.skills;
  const activeBar = active.bars[hoveredIdx] || active.bars[0];

  return (
    <section className="band band--paper-2 agc-band" aria-label="Interactive Botanical Overview Chart">
      <div className="container agc-wrap">
        <div className="agc-head">
          <div>
            <span className="mono kissa-eyebrow">
              {lang === 'id' ? active.eyebrowId : active.eyebrowEn}
            </span>
            <h2 className="agc-title">{lang === 'id' ? active.titleId : active.titleEn}</h2>
          </div>

          <div className="agc-tabs" role="tablist" aria-label="Overview chart switcher">
            {Object.values(CHART_DATASETS).map((ds) => {
              const isSelected = ds.id === datasetKey;
              return (
                <button
                  key={ds.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`mono agc-tab ${isSelected ? 'is-active' : ''}`}
                  onClick={() => {
                    setDatasetKey(ds.id);
                    setHoveredIdx(0);
                  }}
                >
                  {isSelected && (
                    <motion.span
                      layoutId="garden-chart-tab-pill"
                      className="agc-tab__bg"
                      transition={{ type: 'spring', stiffness: 420, damping: 30 }}
                    />
                  )}
                  <span className="agc-tab__label">{lang === 'id' ? ds.tabId : ds.tabEn}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="agc-card kissa-spotlight">
          {/* Interactive Hover Readout Tooltip Banner */}
          <div className="agc-tooltip-strip">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${datasetKey}-${activeBar.key}`}
                className="agc-tooltip-inner"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                <span
                  className="agc-tooltip-swatch"
                  style={{ background: `var(${activeBar.colorVar})` }}
                />
                <strong className="mono agc-tooltip-val">{activeBar.valueText}</strong>
                <span className="agc-tooltip-desc">
                  {lang === 'id' ? activeBar.detailId : activeBar.detailEn}
                </span>
              </motion.div>
            </AnimatePresence>

            <Link to={active.to} className="mono agc-link">
              {lang === 'id' ? active.ctaId : active.ctaEn}
            </Link>
          </div>

          {/* Staggered Growing Flower Stems */}
          <div className="agc-plot" role="list" aria-label="Interactive blooming stem visualization">
            {active.bars.map((bar, idx) => {
              const isFocused = idx === hoveredIdx;
              return (
                <button
                  key={`${datasetKey}-${bar.key}`}
                  type="button"
                  role="listitem"
                  className={`agc-col ${isFocused ? 'is-focused' : ''}`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onFocus={() => setHoveredIdx(idx)}
                  onClick={() => setHoveredIdx(idx)}
                >
                  <span className="mono agc-col__val">{bar.valueText}</span>
                  <div className="agc-col__track">
                    <motion.div
                      key={`${datasetKey}-${bar.key}-bar`}
                      className="agc-col__stem-wrap"
                      initial={{ height: '14%', opacity: 0.4 }}
                      whileInView={{ height: `${bar.pct}%`, opacity: 1 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{
                        type: 'spring',
                        stiffness: 180,
                        damping: 20,
                        delay: idx * 0.075,
                      }}
                    >
                      <motion.span
                        className="agc-col__flower-top"
                        animate={{
                          scale: isFocused ? 1.25 : 0.96,
                          rotate: isFocused ? 18 : 0,
                        }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                      >
                        <FlowerEmblem species={BAR_SPECIES[idx % BAR_SPECIES.length]} size={38} />
                      </motion.span>
                      <div
                        className="agc-col__bar"
                        style={{ background: `var(${bar.colorVar})` }}
                      />
                    </motion.div>
                  </div>
                  <span className="mono agc-col__label">
                    {lang === 'id' ? bar.labelId : bar.labelEn}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Theme-Synced Footer */}
          <div className="agc-footer">
            <p className="agc-summary">{lang === 'id' ? active.summaryId : active.summaryEn}</p>
            <div className="agc-swatches mono" aria-label="Alpine meadow palette">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className="agc-swatch-chip">
                  <i style={{ background: `var(--chart-${n})` }} />
                  bloom-{n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
