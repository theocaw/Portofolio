import { useState } from 'react';
import './AmesExplorer.css';

/**
 * Exact K-Means cluster centroids from Osanna Patricia Limbong's UAS-DAMING report (Table 4.3).
 */
const CLUSTERS = [
  {
    id: 'ekonomis',
    units: 1261,
    lot: 8822,
    liv: 1226,
    year: 1946,
    qual: 5.04,
    accent: 'amber',
    name: {
      en: 'Segmen Ekonomis (Cluster 1)',
      id: 'Segmen Ekonomis (Klaster 1)',
    },
    persona: {
      en: 'First-time home buyers, young workers & budget-friendly seekers.',
      id: 'Pekerja muda, pembeli rumah pertama (first-time buyers) & pencari hunian hemat.',
    },
    strategy: {
      en: 'Sniper Ad Strategy: Highlight down-payment (DP) subsidies, affordable mortgage plans & renovation potential.',
      id: 'Strategi Iklan Sniper: Fokuskan promo subsidi DP/KPR terjangkau & potensi renovasi ruang.',
    },
  },
  {
    id: 'premium',
    units: 1200,
    lot: 9622,
    liv: 1527,
    year: 1989,
    qual: 6.46,
    accent: 'cobalt',
    name: {
      en: 'Segmen Premium (Cluster 2)',
      id: 'Segmen Premium (Klaster 2)',
    },
    persona: {
      en: 'Established families & professionals seeking modern comfort.',
      id: 'Keluarga mapan & profesional yang mengutamakan kenyamanan modern.',
    },
    strategy: {
      en: 'Sniper Ad Strategy: Showcase modern family lifestyle visuals, garage capacity & move-in-ready quality.',
      id: 'Strategi Iklan Sniper: Tampilkan visual gaya hidup keluarga modern, kapasitas garasi & rumah siap huni.',
    },
  },
  {
    id: 'ekstrem',
    units: 469,
    lot: 15059,
    liv: 2166,
    year: 1996,
    qual: 8.02,
    accent: 'violet',
    name: {
      en: 'Segmen Lahan Ekstrem (Cluster 3)',
      id: 'Segmen Lahan Ekstrem (Klaster 3)',
    },
    persona: {
      en: 'Luxury estate buyers, commercial developers & high-end investors.',
      id: 'Investor properti mewah & pengembang komersial berlahan luas.',
    },
    strategy: {
      en: 'Sniper Ad Strategy: Target high-net-worth buyers & developers with exclusive architectural & land-value pitches.',
      id: 'Strategi Iklan Sniper: Jangkau investor & developer dengan penawaran eksklusif nilai investasi lahan luas.',
    },
  },
];

const PRESETS = [
  {
    id: 'ekonomis',
    label: { en: '🏠 1946 Starter Centroid', id: '🏠 Centroid Ekonomis (1946)' },
    qual: 5,
    liv: 1226,
    lot: 8822,
    year: 1946,
  },
  {
    id: 'premium',
    label: { en: '✨ 1989 Family Centroid', id: '✨ Centroid Premium (1989)' },
    qual: 7,
    liv: 1527,
    lot: 9622,
    year: 1989,
  },
  {
    id: 'ekstrem',
    label: { en: '🏛️ 1996 Luxury Centroid', id: '🏛️ Centroid Ekstrem (1996)' },
    qual: 8,
    liv: 2166,
    lot: 15059,
    year: 1996,
  },
];

export default function AmesExplorer({ lang = 'en' }) {
  const [qual, setQual] = useState(7);
  const [liv, setLiv] = useState(1527);
  const [lot, setLot] = useState(9622);
  const [year, setYear] = useState(1989);

  // 1. Standardized Euclidean Distance to the 3 real K-Means centroids (scale() normalization)
  const sdLot = 3500;
  const sdLiv = 500;
  const sdYear = 28;
  const sdQual = 1.4;

  let nearest = CLUSTERS[0];
  let bestDist = Infinity;
  CLUSTERS.forEach((c) => {
    const d = Math.hypot(
      (lot - c.lot) / sdLot,
      (liv - c.liv) / sdLiv,
      (year - c.year) / sdYear,
      (qual - c.qual) / sdQual,
    );
    if (d < bestDist) {
      bestDist = d;
      nearest = c;
    }
  });

  // 2. Decision Tree (rpart) quantile tiering using report thresholds:
  // Root split: Overall_Qual >= 6.5, secondary split: Year_Built >= 1982 & Gr_Liv_Area
  let tier = {
    code: 'Menengah',
    range: '$139,000 – $189,000',
    catalog: lang === 'id' ? 'Etalase Reguler' : 'Standard Showcase',
    rule:
      lang === 'id'
        ? 'Overall_Qual < 6.5 & Year_Built ≥ 1982'
        : 'Overall_Qual < 6.5 & Year_Built ≥ 1982',
  };

  if (qual >= 7 && (liv >= 1450 || qual >= 8)) {
    tier = {
      code: lang === 'id' ? 'Mahal (> $189k)' : 'High Tier (> $189k)',
      range: '> $189,000',
      catalog: lang === 'id' ? 'Etalase Premium' : 'Premium Showcase',
      rule: 'Overall_Qual ≥ 6.5 & Gr_Liv_Area Tinggi',
    };
  } else if (qual <= 5 && year < 1982 && liv < 1450) {
    tier = {
      code: lang === 'id' ? 'Murah (≤ $139k)' : 'Budget Tier (≤ $139k)',
      range: '≤ $139,000',
      catalog: lang === 'id' ? 'Etalase Diskon / Ekonomis' : 'Discount / Starter Catalog',
      rule: 'Overall_Qual < 6.5 & Year_Built < 1982',
    };
  } else {
    tier = {
      code: lang === 'id' ? 'Menengah ($139k–$189k)' : 'Mid Tier ($139k–$189k)',
      range: '$139,000 – $189,000',
      catalog: lang === 'id' ? 'Etalase Keluarga Menengah' : 'Mid-Market Catalog',
      rule:
        qual >= 7
          ? 'Overall_Qual ≥ 6.5 namun Luas Hunian Kompak'
          : 'Overall_Qual < 6.5 & Year_Built ≥ 1982',
    };
  }

  // 3. Calibrated continuous Linear Regression estimate anchored on report Mean ($180,796) & Median ($160,000)
  const rawEstimate =
    160000 +
    (qual - 6.1) * 26500 +
    (liv - 1500) * 68 +
    (lot - 10150) * 2.1 +
    (year - 1971) * 640;
  const estPrice = Math.round(Math.min(755000, Math.max(12789, rawEstimate)));

  return (
    <div className="ames-explorer">
      <div className="ames-explorer__top">
        <p className="ames-explorer__intro">
          {lang === 'id'
            ? 'Geser spesifikasi fisik rumah di bawah untuk menguji bagaimana model Regresi Linear (R² 81,94%), Decision Tree (rpart), dan K-Means (3 klaster) dari laporan UAS Data Mining memetakan properti secara real-time:'
            : 'Adjust the physical property attributes below to test how the report’s Linear Regression (R² 81.94%), Decision Tree (rpart), and 3-Cluster K-Means models classify a home in real time:'}
        </p>

        <div className="ames-explorer__presets" role="group" aria-label="Cluster centroid presets">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              className={`ames-preset-btn ${
                qual === p.qual && liv === p.liv && lot === p.lot && year === p.year
                  ? 'is-active'
                  : ''
              }`}
              onClick={() => {
                setQual(p.qual);
                setLiv(p.liv);
                setLot(p.lot);
                setYear(p.year);
              }}
            >
              {p.label[lang] || p.label.en}
            </button>
          ))}
        </div>
      </div>

      <div className="ames-explorer__grid">
        {/* Left: 4 Physical Attribute Sliders */}
        <div className="ames-explorer__controls">
          <div className="ames-slider-row">
            <div className="ames-slider-head">
              <label htmlFor="ames-qual" className="mono ames-slider-label">
                01 / OVERALL_QUAL ({lang === 'id' ? 'Skor Kualitas Material' : 'Material Quality'})
              </label>
              <span className="mono ames-slider-val">{qual} / 10</span>
            </div>
            <input
              id="ames-qual"
              type="range"
              min="1"
              max="10"
              step="1"
              value={qual}
              onChange={(e) => setQual(Number(e.target.value))}
              className="ames-range"
            />
            <div className="mono ames-slider-marks">
              <span>1 (Basic)</span>
              <span>Split: 6.5</span>
              <span>10 (Luxury)</span>
            </div>
          </div>

          <div className="ames-slider-row">
            <div className="ames-slider-head">
              <label htmlFor="ames-liv" className="mono ames-slider-label">
                02 / GR_LIV_AREA ({lang === 'id' ? 'Luas Bangunan Atas' : 'Above-Grade Living Area'})
              </label>
              <span className="mono ames-slider-val">{liv.toLocaleString()} sqft</span>
            </div>
            <input
              id="ames-liv"
              type="range"
              min="600"
              max="3600"
              step="25"
              value={liv}
              onChange={(e) => setLiv(Number(e.target.value))}
              className="ames-range"
            />
            <div className="mono ames-slider-marks">
              <span>600 sqft</span>
              <span>Mean: 1,500 sqft</span>
              <span>3,600 sqft</span>
            </div>
          </div>

          <div className="ames-slider-row">
            <div className="ames-slider-head">
              <label htmlFor="ames-lot" className="mono ames-slider-label">
                03 / LOT_AREA ({lang === 'id' ? 'Luas Tanah' : 'Lot Surface Area'})
              </label>
              <span className="mono ames-slider-val">{lot.toLocaleString()} sqft</span>
            </div>
            <input
              id="ames-lot"
              type="range"
              min="3500"
              max="25000"
              step="100"
              value={lot}
              onChange={(e) => setLot(Number(e.target.value))}
              className="ames-range"
            />
            <div className="mono ames-slider-marks">
              <span>3,500 sqft</span>
              <span>9,622 sqft</span>
              <span>25,000 sqft</span>
            </div>
          </div>

          <div className="ames-slider-row">
            <div className="ames-slider-head">
              <label htmlFor="ames-year" className="mono ames-slider-label">
                04 / YEAR_BUILT ({lang === 'id' ? 'Tahun Pembangunan' : 'Construction Year'})
              </label>
              <span className="mono ames-slider-val">{year}</span>
            </div>
            <input
              id="ames-year"
              type="range"
              min="1900"
              max="2010"
              step="1"
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="ames-range"
            />
            <div className="mono ames-slider-marks">
              <span>1900</span>
              <span>Split: 1982</span>
              <span>2010</span>
            </div>
          </div>
        </div>

        {/* Right: Real-Time Model Output Dossier */}
        <div className={`ames-explorer__output ames-explorer__output--${nearest.accent}`}>
          <div className="ames-output-header">
            <span className="mono ames-output-tag">
              ✦ {lang === 'id' ? 'HASIL PREDIKSI & KLASTER' : 'LIVE MODEL OUTPUT'}
            </span>
            <span className="mono ames-output-units">
              {nearest.units.toLocaleString()} {lang === 'id' ? 'unit serupa' : 'similar homes'}
            </span>
          </div>

          <div className="ames-output-price-box">
            <span className="mono ames-output-sublabel">
              {lang === 'id'
                ? 'ESTIMASI REGRESI LINEAR (MAE ±$20.849)'
                : 'LINEAR REGRESSION ESTIMATE (MAE ±$20,849)'}
            </span>
            <div className="ames-output-price">${estPrice.toLocaleString()}</div>
          </div>

          <div className="ames-output-cards">
            <div className="ames-mini-card">
              <span className="mono ames-mini-card__label">
                {lang === 'id' ? 'KELAS DECISION TREE (72,7%)' : 'DECISION TREE TIER (72.7%)'}
              </span>
              <strong className="ames-mini-card__val">{tier.code}</strong>
              <span className="mono ames-mini-card__rule">
                {tier.catalog} · {tier.rule}
              </span>
            </div>

            <div className="ames-mini-card">
              <span className="mono ames-mini-card__label">
                {lang === 'id' ? 'SEGMEN K-MEANS (SCALE)' : 'K-MEANS PERSONA CLUSTER'}
              </span>
              <strong className="ames-mini-card__val">{nearest.name[lang]}</strong>
              <span className="ames-mini-card__desc">{nearest.persona[lang]}</span>
            </div>
          </div>

          <div className="ames-output-strategy">
            <p>{nearest.strategy[lang]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
