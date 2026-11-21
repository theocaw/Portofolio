import { useState } from 'react';
import { Link } from 'react-router-dom';
import CassetteDeck from '../components/CassetteDeck.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getHomeContent } from '../content/home.js';
import './Home.css';

const ARCHIVE_TAPES = {
  en: [
    {
      id: 'ames-housing',
      code: 'TAPE 01',
      side: 'SIDE A',
      title: 'Ames Housing: Valuation & Segmentation',
      shortTitle: 'Ames Housing Valuation',
      metricLine: '81.94% R² · 2,930 Homes · K-Means',
      summary:
        'End-to-end RStudio valuation pipeline across 82 variables: Multiple Linear Regression (MAE ±$20,849), rpart Decision Tree (72.7%), and 3 K-Means buyer clusters.',
      accent: '#2b4a3e',
      stripe: '#d9b25f',
      to: '/work/ames-housing',
    },
    {
      id: 'canvar',
      code: 'TAPE 02',
      side: 'SIDE A',
      title: 'canvAR: Spatial 3D Business Canvas',
      shortTitle: 'canvAR Spatial 3D',
      metricLine: '5+ 3D Assets · Unity & Vuforia AR',
      summary:
        'Transformed static Business Model Canvas workshops into an interactive 3D Augmented Reality mobile learning experience built in Blender, Unity, and Vuforia.',
      accent: '#b84a27',
      stripe: '#e8c587',
      to: '/work/canvar',
    },
    {
      id: 'cafier',
      code: 'TAPE 03',
      side: 'SIDE B',
      title: 'Cafier: Smart Ordering Ecosystem',
      shortTitle: 'Cafier Ordering System',
      metricLine: 'React Native · Laravel 12 · Midtrans',
      summary:
        'Dual-platform café ordering ecosystem combining React Native mobile self-ordering, Midtrans payment webhooks, and a real-time Laravel 12 kitchen display.',
      accent: '#8c5a2b',
      stripe: '#d9b25f',
      to: '/work/cafier',
    },
    {
      id: 'dthanasha-kost',
      code: 'TAPE 04',
      side: 'SIDE B',
      title: 'Dthanasha Kost: Property Operations',
      shortTitle: 'Dthanasha Kost MVC',
      metricLine: '100% Digital Billing · Tailwind CSS',
      summary:
        'Digitized manual boarding-house management into an automated Laravel MVC platform for room inventory, tenant contracts, and monthly rent reconciliation.',
      accent: '#3d5a52',
      stripe: '#c9a66b',
      to: '/work/dthanasha-kost',
    },
    {
      id: 'alumni-portal',
      code: 'TAPE 05',
      side: 'SIDE B',
      title: 'AlumniTPL: Career & Tracer Portal',
      shortTitle: 'AlumniTPL 4-Tier SDD',
      metricLine: '4-Tier Layered · 12 UI Specs · 7 RTM',
      summary:
        'IEEE 830 Software Design Document (DPPL) featuring 4-tier layered architecture, normalized relational ERD, and 12 verified UI mockups for IPB TPL alumni.',
      accent: '#63333d',
      stripe: '#d9b25f',
      to: '/work/alumni-portal',
    },
  ],
  id: [
    {
      id: 'ames-housing',
      code: 'TAPE 01',
      side: 'SIDE A',
      title: 'Ames Housing: Valuasi & Segmentasi',
      shortTitle: 'Valuasi Ames Housing',
      metricLine: '81,94% R² · 2.930 Properti · K-Means',
      summary:
        'Pipeline valuasi RStudio pada 82 variabel: Regresi Linear Berganda (MAE ±$20.849), Decision Tree rpart (72,7%), dan 3 klaster pembeli K-Means.',
      accent: '#2b4a3e',
      stripe: '#d9b25f',
      to: '/work/ames-housing',
    },
    {
      id: 'canvar',
      code: 'TAPE 02',
      side: 'SIDE A',
      title: 'canvAR: Business Model Canvas 3D AR',
      shortTitle: 'canvAR Spatial 3D',
      metricLine: '5+ Aset 3D · Unity & Vuforia AR',
      summary:
        'Mengubah materi Business Model Canvas statis menjadi pengalaman belajar spasial 3D berbasis Augmented Reality menggunakan Blender, Unity, dan Vuforia.',
      accent: '#b84a27',
      stripe: '#e8c587',
      to: '/work/canvar',
    },
    {
      id: 'cafier',
      code: 'TAPE 03',
      side: 'SIDE B',
      title: 'Cafier: Ekosistem Pemesanan Kafe',
      shortTitle: 'Sistem Pemesanan Cafier',
      metricLine: 'React Native · Laravel 12 · Midtrans',
      summary:
        'Ekosistem pemesanan ganda yang menghubungkan aplikasi mobile React Native, pembayaran Midtrans, serta dashboard dapur Laravel 12 secara real-time.',
      accent: '#8c5a2b',
      stripe: '#d9b25f',
      to: '/work/cafier',
    },
    {
      id: 'dthanasha-kost',
      code: 'TAPE 04',
      side: 'SIDE B',
      title: 'Dthanasha Kost: Manajemen Properti',
      shortTitle: 'Dthanasha Kost MVC',
      metricLine: '100% Digital · Laravel & Tailwind',
      summary:
        'Digitalisasi operasional rumah kost ke dalam sistem Laravel MVC untuk pengelolaan ketersediaan kamar, kontrak penyewa, dan penagihan bulanan otomatis.',
      accent: '#3d5a52',
      stripe: '#c9a66b',
      to: '/work/dthanasha-kost',
    },
    {
      id: 'alumni-portal',
      code: 'TAPE 05',
      side: 'SIDE B',
      title: 'AlumniTPL: Portal Karier & Tracer',
      shortTitle: 'AlumniTPL 4-Tier SDD',
      metricLine: '4-Tier Layered · 12 Layar · 7 RTM',
      summary:
        'Dokumen DPPL standar IEEE 830 berisi arsitektur 4-lapis, skema ERD ternormalisasi, dan 12 desain antarmuka terverifikasi untuk alumni TPL IPB.',
      accent: '#63333d',
      stripe: '#d9b25f',
      to: '/work/alumni-portal',
    },
  ],
};

export default function Home() {
  const { lang } = useApp();
  const home = getHomeContent(lang);
  const { profilePhotos = [] } = home;

  const tapes = ARCHIVE_TAPES[lang] || ARCHIVE_TAPES.en;
  const [activeTapeIdx, setActiveTapeIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);

  const currentTape = tapes[activeTapeIdx] || tapes[0];
  const currentPhoto = profilePhotos[photoIdx] || profilePhotos[0];

  const volumes = [
    {
      vol: 'VOL. I',
      section: lang === 'id' ? 'PERPUSTAKAAN' : 'THE LIBRARY',
      title: lang === 'id' ? 'Profil, IPB University & Katalog Keahlian' : 'Profile, IPB Education & Skill Catalog',
      meta: 'GPA 3.63 / 4.00 · Python · R · React',
      to: '/about',
      cloth: 'pine',
    },
    {
      vol: 'VOL. II',
      section: lang === 'id' ? 'ARSIP KASET' : 'TAPE ARCHIVE',
      title: lang === 'id' ? '5 Studi Kasus Selesai & Simulator Live' : 'Five Shipped Case Studies & Live Simulator',
      meta: 'Ames 81.94% R² · 4-Tier SDD · Laravel',
      to: '/work',
      cloth: 'rust',
    },
    {
      vol: 'VOL. III',
      section: lang === 'id' ? 'LOGBOOK' : 'FIELD LOGBOOK',
      title: lang === 'id' ? 'Magang PT KCT, Organisasi & Prestasi' : 'PT KCT Internship, Leadership & Honors',
      meta: 'kctjakarta.com · Rp 26.19M · Gemini AI',
      to: '/journey',
      cloth: 'espresso',
    },
  ];

  return (
    <div className="kissa-home">
      {/* =========================================================
          SECTION 1: THE LISTENING ROOM (Editorial Intro + Live Hi-Fi Cassette Deck)
         ========================================================= */}
      <section className="container kissa-hero">
        <div className="kissa-hero__grid">
          {/* Left Column: Niche Headline + Interactive Cassette Spine Rack */}
          <div className="kissa-hero__left">
            <div className="mono kissa-status-line">
              <span className="kissa-status-dot" />
              <span>{home.availability}</span>
            </div>

            <h1 className="kissa-hero__headline">
              {lang === 'id' ? (
                <>
                  Mengubah data rumit menjadi <em>cerita yang jernih</em> &amp; sistem web yang presisi.
                </>
              ) : (
                <>
                  Turning complex data into <em>clear stories</em> &amp; tactile web systems.
                </>
              )}
            </h1>

            <p className="kissa-hero__intro">
              {home.greeting} {home.intro}
            </p>

            {/* Interactive Physical Cassette Spine Selector Rack */}
            <div className="kissa-rack">
              <div className="mono kissa-rack__header">
                <span>
                  {lang === 'id'
                    ? 'PILIH KASET PROYEK UNTUK DIMASUKKAN KE DECK'
                    : 'SELECT A PROJECT CASSETTE TO LOAD INTO THE DECK'}
                </span>
                <span>01 — 05</span>
              </div>

              <div className="kissa-rack__list" role="tablist" aria-label="Project Cassettes">
                {tapes.map((tape, idx) => {
                  const isActive = idx === activeTapeIdx;
                  return (
                    <button
                      key={tape.id}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`kissa-spine ${isActive ? 'is-active' : ''}`}
                      style={{ '--spine-accent': tape.accent }}
                      onClick={() => setActiveTapeIdx(idx)}
                    >
                      <span className="kissa-spine__bar" aria-hidden="true" />
                      <span className="mono kissa-spine__code">{tape.code}</span>
                      <span className="kissa-spine__title">{tape.shortTitle}</span>
                      <span className="mono kissa-spine__metric">{tape.metricLine}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Real Interactive Hi-Fi Cassette Deck + Liner Notes */}
          <div className="kissa-hero__right">
            <CassetteDeck
              tapes={tapes}
              activeIndex={activeTapeIdx}
              onSelectIndex={setActiveTapeIdx}
            />

            {/* Liner Notes Card Beneath Deck */}
            <div className="kissa-liner-card">
              <div className="mono kissa-liner-card__head">
                <span>
                  {currentTape.code} · {currentTape.side}
                </span>
                <span>{currentTape.metricLine}</span>
              </div>
              <h2 className="kissa-liner-card__title">{currentTape.title}</h2>
              <p className="kissa-liner-card__desc">{currentTape.summary}</p>
              <Link to={currentTape.to} className="mono kissa-liner-card__cta">
                {lang === 'id' ? 'Baca Studi Kasus Lengkap ↗' : 'Read Full Case Study ↗'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 2: MEASURED IMPACT LEDGER (Clean Editorial Numbers)
         ========================================================= */}
      <section className="band band--paper-2 kissa-ledger-band">
        <div className="container kissa-ledger">
          <div className="kissa-ledger__item">
            <span className="mono kissa-ledger__k">
              {lang === 'id' ? 'DATA PROPERTI DIANALISIS' : 'PROPERTY RECORDS MINED'}
            </span>
            <span className="kissa-ledger__v">2,930</span>
            <span className="kissa-ledger__note">Ames Housing · 82 Features</span>
          </div>
          <div className="kissa-ledger__item">
            <span className="mono kissa-ledger__k">
              {lang === 'id' ? 'AKURASI PREDIKSI (R²)' : 'PREDICTIVE ACCURACY (R²)'}
            </span>
            <span className="kissa-ledger__v">81.94%</span>
            <span className="kissa-ledger__note">Multiple Linear Regression</span>
          </div>
          <div className="kissa-ledger__item">
            <span className="mono kissa-ledger__k">
              {lang === 'id' ? 'IPK KUMULATIF' : 'CUMULATIVE GPA'}
            </span>
            <span className="kissa-ledger__v">3.63</span>
            <span className="kissa-ledger__note">IPB University · TPL</span>
          </div>
          <div className="kissa-ledger__item">
            <span className="mono kissa-ledger__k">
              {lang === 'id' ? 'TRANSAKSI TERAUDIT' : 'AUDITED TRANSACTIONS'}
            </span>
            <span className="kissa-ledger__v">280+</span>
            <span className="kissa-ledger__note">Rp 26.19M · SITE 2025</span>
          </div>
        </div>
      </section>

      {/* =========================================================
          SECTION 3: THE READING LIBRARY SHELF (3 Cloth Volumes + Archival Portrait)
         ========================================================= */}
      <section className="container kissa-library-shelf">
        <div className="kissa-library-shelf__header">
          <div>
            <span className="mono kissa-eyebrow">
              {lang === 'id' ? 'KATALOG PERPUSTAKAAN' : 'THE READING ROOM ARCHIVE'}
            </span>
            <h2 className="kissa-library-shelf__title">
              {lang === 'id'
                ? 'Tiga jilid arsip untuk mengenal proses dan karyaku.'
                : 'Three cloth-bound volumes to explore the work.'}
            </h2>
          </div>
        </div>

        <div className="kissa-shelf-grid">
          {/* 3 Realistic Cloth-Bound Hardcover Volumes */}
          <div className="kissa-volumes">
            {volumes.map((v) => (
              <Link key={v.vol} to={v.to} className={`kissa-volume kissa-volume--${v.cloth}`}>
                <span className="kissa-volume__spine-crease" aria-hidden="true" />
                <div className="kissa-volume__top">
                  <span className="mono kissa-volume__vol">{v.vol}</span>
                  <span className="mono kissa-volume__sec">{v.section}</span>
                </div>
                <h3 className="kissa-volume__title">{v.title}</h3>
                <div className="kissa-volume__foot">
                  <span className="mono kissa-volume__meta">{v.meta}</span>
                  <span className="mono kissa-volume__arrow">↗</span>
                </div>
              </Link>
            ))}
          </div>

          {/* Clean Archival Matte Portrait Print */}
          {currentPhoto && (
            <figure
              className="kissa-portrait"
              onClick={() => setPhotoIdx((prev) => (prev + 1) % profilePhotos.length)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setPhotoIdx((prev) => (prev + 1) % profilePhotos.length);
                }
              }}
              title={
                lang === 'id' ? 'Klik foto untuk ganti frame potret' : 'Click print to cycle portrait'
              }
            >
              <div className="kissa-portrait__frame">
                <img
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  className="kissa-portrait__img"
                  draggable="false"
                />
              </div>
              <figcaption className="mono kissa-portrait__caption">
                <span>
                  PLATE 0{photoIdx + 1} / 0{profilePhotos.length}
                </span>
                <span>{currentPhoto.label}</span>
              </figcaption>
            </figure>
          )}
        </div>
      </section>
    </div>
  );
}
