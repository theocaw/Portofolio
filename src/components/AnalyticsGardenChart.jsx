import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import './AnalyticsGardenChart.css';

const CHART_DATASETS = {
  medigo: {
    id: 'medigo',
    tabEn: 'Medigo ETL (30,903 Rows)',
    tabId: 'Medigo ETL (30.903 Baris)',
    eyebrowEn: 'VERIFIED GEOSPATIAL ETL · 5 NORMALIZED 3NF TABLES',
    eyebrowId: 'ETL GEOSPASIAL TERVERIFIKASI · 5 TABEL RELASIONAL 3NF',
    titleEn: 'Jabodetabek Healthcare Data Architecture',
    titleId: 'Arsitektur Data Faskes Jabodetabek',
    summaryEn:
      'Scraped from BPJS Aplicares (Playwright JWE interception) & OpenStreetMap Overpass API across 10 cities, normalized into 5 deduplicated CSV tables.',
    summaryId:
      'Hasil scraping BPJS Aplicares (intersepsi JWE Playwright) & OpenStreetMap Overpass API di 10 kota, dinormalisasi ke 5 tabel CSV tanpa duplikat.',
    to: '/work/medigo',
    ctaEn: 'Inspect Medigo Case Study ↗',
    ctaId: 'Buka Studi Kasus Medigo ↗',
    bars: [
      {
        key: 'faskes',
        labelEn: 'Faskes',
        labelId: 'Faskes',
        valueText: '3,069',
        pct: 74,
        colorVar: '--chart-1',
        detailEn: '3,069 verified BPJS & non-BPJS facilities across 10 Jabodetabek cities',
        detailId: '3.069 faskes BPJS & non-BPJS terverifikasi di 10 kota Jabodetabek',
      },
      {
        key: 'fasilitas',
        labelEn: 'Facilities',
        labelId: 'Fasilitas',
        valueText: '762',
        pct: 48,
        colorVar: '--chart-2',
        detailEn: '762 standardized medical equipment & service master categories',
        detailId: '762 kategori master peralatan & layanan medis terstandardisasi',
      },
      {
        key: 'spesialisasi',
        labelEn: 'Specialists',
        labelId: 'Spesialis',
        valueText: '152',
        pct: 32,
        colorVar: '--chart-3',
        detailEn: '152 distinct clinical specialist taxonomy entries',
        detailId: '152 taksonomi dokter spesialis klinis yang terstruktur',
      },
      {
        key: 'rel-fas',
        labelEn: 'Fac-Links',
        labelId: 'Rel. Fasilitas',
        valueText: '20,085',
        pct: 100,
        colorVar: '--chart-4',
        detailEn: '20,085 deduplicated faskes-to-facility junction records',
        detailId: '20.085 pasangan relasi unik faskes-ke-fasilitas medis',
      },
      {
        key: 'rel-sp',
        labelEn: 'Spec-Links',
        labelId: 'Rel. Spesialis',
        valueText: '6,835',
        pct: 84,
        colorVar: '--chart-5',
        detailEn: '6,835 deduplicated faskes-to-specialist junction records',
        detailId: '6.835 pasangan relasi unik faskes-ke-spesialis',
      },
    ],
  },
  ames: {
    id: 'ames',
    tabEn: 'Ames Housing (2,930 Homes)',
    tabId: 'Ames Housing (2.930 Rumah)',
    eyebrowEn: 'DATA MINING BENCHMARKS · REGRESSION, TREE & K-MEANS',
    eyebrowId: 'BENCHMARK DATA MINING · REGRESI, TREE & K-MEANS',
    titleEn: 'Property Valuation & Market Segmentation',
    titleId: 'Valuasi Properti & Segmentasi Pasar',
    summaryEn:
      'Four-pillar analytics on 2,930 properties (81 features, 0 nulls): Multiple Linear Regression, rpart Decision Tree, and standardized K-Means clusters.',
    summaryId:
      'Analitik empat pilar pada 2.930 properti (81 fitur, 0 null): Regresi Linear Berganda, Decision Tree rpart, dan klastering K-Means.',
    to: '/work/ames-housing',
    ctaEn: 'Inspect Ames Case Study ↗',
    ctaId: 'Buka Studi Kasus Ames ↗',
    bars: [
      {
        key: 'r2',
        labelEn: 'Linear R²',
        labelId: 'Regresi R²',
        valueText: '81.94%',
        pct: 82,
        colorVar: '--chart-1',
        detailEn: 'Multiple Linear Regression R² = 81.94% · MAE $20,849 on 586 test homes',
        detailId: 'Regresi Linear Berganda R² = 81,94% · MAE $20.849 pada 586 data uji',
      },
      {
        key: 'tree',
        labelEn: 'Tree Acc.',
        labelId: 'Akurasi Tree',
        valueText: '72.7%',
        pct: 73,
        colorVar: '--chart-2',
        detailEn: 'White-box rpart Decision Tree across Low / Mid / High price quantiles',
        detailId: 'Decision Tree rpart untuk klasifikasi kuantil harga Rendah / Sedang / Tinggi',
      },
      {
        key: 'eko',
        labelEn: 'Ekonomis',
        labelId: 'Ekonomis',
        valueText: '1,354',
        pct: 92,
        colorVar: '--chart-3',
        detailEn: 'Cluster 1 — 1,354 homes · compact affordable starter housing segment',
        detailId: 'Klaster 1 — 1.354 rumah · segmen hunian ekonomis & rumah pertama',
      },
      {
        key: 'prem',
        labelEn: 'Premium',
        labelId: 'Premium',
        valueText: '1,107',
        pct: 76,
        colorVar: '--chart-4',
        detailEn: 'Cluster 2 — 1,107 homes · modern upscale family residences',
        detailId: 'Klaster 2 — 1.107 rumah · hunian keluarga modern kelas menengah-atas',
      },
      {
        key: 'ext',
        labelEn: 'Luxury Lot',
        labelId: 'Lahan Ekstrem',
        valueText: '469',
        pct: 42,
        colorVar: '--chart-5',
        detailEn: 'Cluster 3 — 469 estates · avg lot 15,059 sqft, quality score 8.02',
        detailId: 'Klaster 3 — 469 properti · rata-rata lahan 15.059 sqft, skor kualitas 8,02',
      },
    ],
  },
};

export default function AnalyticsGardenChart() {
  const { lang } = useApp();
  const [datasetKey, setDatasetKey] = useState('medigo');
  const [hoveredIdx, setHoveredIdx] = useState(0);

  const active = CHART_DATASETS[datasetKey] || CHART_DATASETS.medigo;
  const activeBar = active.bars[hoveredIdx] || active.bars[0];

  return (
    <section className="band band--paper-2 agc-band" aria-label="Interactive Data Analytics Charts">
      <div className="container agc-wrap">
        <div className="agc-head">
          <div>
            <span className="mono kissa-eyebrow">
              {lang === 'id' ? active.eyebrowId : active.eyebrowEn}
            </span>
            <h2 className="agc-title">{lang === 'id' ? active.titleId : active.titleEn}</h2>
          </div>

          {/* Motion shared layoutId Tabs (Reel 2) */}
          <div className="agc-tabs" role="tablist" aria-label="Analytics dataset switcher">
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

          {/* Staggered Growing Interactive Bars (Shadcn Chart style from Reel 2) */}
          <div className="agc-plot" role="list" aria-label="Interactive bar visualization">
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
                      className="agc-col__bar"
                      style={{ background: `var(${bar.colorVar})` }}
                      initial={{ scaleY: 0, opacity: 0.35 }}
                      whileInView={{ scaleY: 1, opacity: 1 }}
                      viewport={{ once: true, amount: 0.35 }}
                      animate={{ height: `${bar.pct}%` }}
                      transition={{
                        type: 'spring',
                        stiffness: 220,
                        damping: 22,
                        delay: idx * 0.065,
                      }}
                    />
                  </div>
                  <span className="mono agc-col__label">
                    {lang === 'id' ? bar.labelId : bar.labelEn}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Theme-Synced CSS Custom Property Palette Footer (--chart-1 .. --chart-5) */}
          <div className="agc-footer">
            <p className="agc-summary">{lang === 'id' ? active.summaryId : active.summaryEn}</p>
            <div className="agc-swatches mono" aria-label="Theme-synced chart variables">
              {[1, 2, 3, 4, 5].map((n) => (
                <span key={n} className="agc-swatch-chip">
                  <i style={{ background: `var(--chart-${n})` }} />
                  --chart-{n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
