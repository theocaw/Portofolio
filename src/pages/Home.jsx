import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { getHomeContent } from '../content/home.js';
import './Home.css';

const LIBRARY_BOOKS = {
  en: [
    {
      id: 'about',
      vol: 'VOL. 01',
      spine: 'ABOUT ME',
      cloth: 'pine',
      height: 100,
      railPos: 9,
      tag: '01 / THE READER & FOCUS',
      title: 'Turning complex data into clear stories & tactile web interfaces.',
      subtitle: 'Osanna Patricia Limbong — Data Analyst & Front-End Developer',
      body:
        'Software Engineering Technology (TPL) student at IPB University bridging statistical data mining with clean, interactive front-end engineering. Click any volume on the shelf—or use ← / → arrow keys—to slide the brass extractor and inspect each chapter.',
      metrics: [
        { k: 'PRIMARY ROLES', v: 'Data Analyst & Front-End' },
        { k: 'INSTITUTION', v: 'IPB University (TPL)' },
        { k: 'AVAILABILITY', v: 'Open for Internship' },
      ],
      cta: { label: 'Read Full Profile (/about) ↗', to: '/about' },
    },
    {
      id: 'education',
      vol: 'VOL. 02',
      spine: 'IPB · GPA 3.63',
      cloth: 'walnut',
      height: 91,
      railPos: 25.5,
      tag: '02 / ACADEMIC RECORD & TOOLKIT',
      title: '3.63 / 4.00 Cumulative GPA in Software Engineering Technology.',
      subtitle: 'Trained across Python, R, SQL, React, Laravel 12 & System Design',
      body:
        'Coursework spans exploratory data analysis, predictive modeling, database normalization, IEEE 830 software design specifications (DPPL), and full-stack web & mobile development.',
      metrics: [
        { k: 'CUMULATIVE GPA', v: '3.63 / 4.00' },
        { k: 'DATA TOOLKIT', v: 'Python · R · SQL' },
        { k: 'WEB TOOLKIT', v: 'React · Laravel · JS' },
      ],
      cta: { label: 'Explore Skill Catalog (/about) ↗', to: '/about' },
    },
    {
      id: 'ames',
      vol: 'VOL. 03',
      spine: 'AMES · 81.9% R²',
      cloth: 'rust',
      height: 98,
      railPos: 42,
      tag: '03 / FLAGSHIP DATA MINING CASE STUDY',
      title: 'Predicted housing prices across 2,930 properties with 81.94% R².',
      subtitle: 'Multiple Linear Regression (MAE ±$20,849), rpart Tree (72.7%) & K-Means',
      body:
        'Cleaned 82 residential attributes in RStudio, isolated Overall_Qual and Gr_Liv_Area as primary price drivers, and clustered the market into 3 actionable K-Means buyer segments with an interactive live simulator.',
      metrics: [
        { k: 'R² ACCURACY', v: '81.94% (MLR)' },
        { k: 'DATASET SCALE', v: '2,930 Homes' },
        { k: 'SEGMENTATION', v: '3 K-Means Clusters' },
      ],
      cta: { label: 'Open Case Study & Live Simulator ↗', to: '/work/ames-housing' },
    },
    {
      id: 'systems',
      vol: 'VOL. 04',
      spine: 'SYSTEMS & WEB',
      cloth: 'olive',
      height: 88,
      railPos: 58.5,
      tag: '04 / ARCHITECTURE & WEB ENGINEERING',
      title: '4-Tier IEEE 830 architectures, Midtrans POS & Kost MVC platforms.',
      subtitle: 'AlumniTPL Career Portal · Dthanasha Kost · Cafier Ordering Ecosystem',
      body:
        'Engineered normalized relational schemas, 7-module Requirements Traceability Matrices (RTM), and responsive React / Laravel 12 interfaces that digitize manual boarding-house and café workflows.',
      metrics: [
        { k: 'ARCHITECTURE', v: '4-Tier Layered SDD' },
        { k: 'SPECIFICATION', v: '12 UI Specs + 7 RTM' },
        { k: 'TECH STACK', v: 'Laravel 12 · React' },
      ],
      cta: { label: 'Browse All 5 Tape Projects (/work) ↗', to: '/work' },
    },
    {
      id: 'canvar',
      vol: 'VOL. 05',
      spine: 'CANVAR · 3D AR',
      cloth: 'brass',
      height: 94,
      railPos: 75,
      tag: '05 / SPATIAL 3D & AUGMENTED REALITY',
      title: 'Transformed static Business Model Canvas into interactive 3D AR.',
      subtitle: 'Blender 3D Modeling · Unity Engine · Vuforia Marker Tracking',
      body:
        'Modeled 5+ optimized low-poly 3D business assets in Blender and integrated real-time Vuforia image-target tracking so students can inspect business strategy blocks spatially via mobile camera.',
      metrics: [
        { k: '3D ASSETS', v: '5+ Custom Models' },
        { k: 'PLATFORM', v: 'Unity + Vuforia AR' },
        { k: 'ROLE', v: '3D Modeler & AR Dev' },
      ],
      cta: { label: 'Inspect canvAR Case Study ↗', to: '/work/canvar' },
    },
    {
      id: 'journey',
      vol: 'VOL. 06',
      spine: 'JOURNEY & KCT',
      cloth: 'burgundy',
      height: 90,
      railPos: 91,
      tag: '06 / INTERNSHIP, LEADERSHIP & HONORS',
      title: 'Shipped kctjakarta.com in industry & audited Rp 26.19M in treasury.',
      subtitle: 'PT KCT Logistics Intern · 5 Leadership Roles · Google Gemini Certified',
      body:
        'Delivered a live production company website and ~20 commercial quotations at PT Kharisma Cakrawala Transportasi, audited 280+ transactions for SITE 2025, and won 2× 2nd Place Short Movie awards.',
      metrics: [
        { k: 'PRODUCTION SITE', v: 'kctjakarta.com' },
        { k: 'TREASURY AUDIT', v: '280+ Tx (Rp 26.19M)' },
        { k: 'CREDENTIALS', v: 'Gemini AI + 2× 2nd Place' },
      ],
      cta: { label: 'Read Full Field Logbook (/journey) ↗', to: '/journey' },
    },
  ],
  id: [
    {
      id: 'about',
      vol: 'VOL. 01',
      spine: 'TENTANG AKU',
      cloth: 'pine',
      height: 100,
      railPos: 9,
      tag: '01 / PROFIL & FOKUS KARYA',
      title: 'Mengubah data rumit menjadi cerita jernih & antarmuka web yang presisi.',
      subtitle: 'Osanna Patricia Limbong — Data Analyst & Front-End Developer',
      body:
        'Mahasiswi Teknologi Rekayasa Perangkat Lunak (TPL) IPB University yang menghubungkan analisis data statistik dengan rekayasa front-end interaktif. Klik jilid buku di rak—atau tekan tombol panah ← / →—untuk menggerakkan penjepit kuningan.',
      metrics: [
        { k: 'FOKUS PERAN', v: 'Data Analyst & Front-End' },
        { k: 'INSTITUSI', v: 'IPB University (TPL)' },
        { k: 'KETERSEDIAAN', v: 'Terbuka untuk Magang' },
      ],
      cta: { label: 'Baca Profil Lengkap (/about) ↗', to: '/about' },
    },
    {
      id: 'education',
      vol: 'VOL. 02',
      spine: 'IPB · IPK 3.63',
      cloth: 'walnut',
      height: 91,
      railPos: 25.5,
      tag: '02 / REKAM AKADEMIK & KEAHLIAN',
      title: 'IPK Kumulatif 3,63 / 4,00 Teknologi Rekayasa Perangkat Lunak IPB.',
      subtitle: 'Terlatih pada Python, R, SQL, React, Laravel 12 & Arsitektur Sistem',
      body:
        'Mencakup analisis data eksploratif, pemodelan prediktif, normalisasi basis data, spesifikasi perancangan perangkat lunak IEEE 830 (DPPL), hingga pengembangan web dan mobile.',
      metrics: [
        { k: 'IPK KUMULATIF', v: '3,63 / 4,00' },
        { k: 'DATA TOOLKIT', v: 'Python · R · SQL' },
        { k: 'WEB TOOLKIT', v: 'React · Laravel · JS' },
      ],
      cta: { label: 'Buka Katalog Keahlian (/about) ↗', to: '/about' },
    },
    {
      id: 'ames',
      vol: 'VOL. 03',
      spine: 'AMES · 81.9% R²',
      cloth: 'rust',
      height: 98,
      railPos: 42,
      tag: '03 / STUDI KASUS DATA MINING UNGGULAN',
      title: 'Memprediksi harga 2.930 properti dengan akurasi R² 81,94% di RStudio.',
      subtitle: 'Regresi Linear Berganda (MAE ±$20.849), rpart Tree (72,7%) & K-Means',
      body:
        'Membersihkan 82 atribut properti, memvalidasi Overall_Qual dan Gr_Liv_Area sebagai penentu harga utama, dan membentuk 3 klaster pembeli K-Means lengkap dengan simulator prediksi interaktif.',
      metrics: [
        { k: 'AKURASI R²', v: '81,94% (MLR)' },
        { k: 'SKALA DATASET', v: '2.930 Properti' },
        { k: 'SEGMENTASI', v: '3 Klaster K-Means' },
      ],
      cta: { label: 'Buka Studi Kasus & Simulator Live ↗', to: '/work/ames-housing' },
    },
    {
      id: 'systems',
      vol: 'VOL. 04',
      spine: 'SISTEM & WEB',
      cloth: 'olive',
      height: 88,
      railPos: 58.5,
      tag: '04 / ARSITEKTUR SISTEM & WEB',
      title: 'Arsitektur 4-Tier IEEE 830, kasir Midtrans & sistem operasional kost.',
      subtitle: 'Portal Karier AlumniTPL · Dthanasha Kost · Ekosistem Cafier',
      body:
        'Merancang skema relasional ternormalisasi, matriks RTM 7 modul, serta antarmuka responsif React & Laravel 12 untuk mendigitalisasi operasional rumah kost dan kafe.',
      metrics: [
        { k: 'ARSITEKTUR', v: '4-Tier Layered SDD' },
        { k: 'SPESIFIKASI', v: '12 Layar + 7 RTM' },
        { k: 'TEKNOLOGI', v: 'Laravel 12 · React' },
      ],
      cta: { label: 'Lihat Semua 5 Proyek Kaset (/work) ↗', to: '/work' },
    },
    {
      id: 'canvar',
      vol: 'VOL. 05',
      spine: 'CANVAR · 3D AR',
      cloth: 'brass',
      height: 94,
      railPos: 75,
      tag: '05 / PEMODELAN 3D & AUGMENTED REALITY',
      title: 'Mengubah Business Model Canvas statis menjadi ruang belajar 3D AR.',
      subtitle: 'Blender 3D Modeling · Unity Engine · Vuforia Marker Tracking',
      body:
        'Memodelkan 5+ aset 3D ringan di Blender dan mengintegrasikan pelacakan marker Vuforia sehingga mahasiswa dapat mengeksplorasi blok strategi bisnis secara spasial lewat kamera.',
      metrics: [
        { k: 'ASET 3D', v: '5+ Model Kustom' },
        { k: 'PLATFORM', v: 'Unity + Vuforia AR' },
        { k: 'PERAN', v: '3D Modeler & AR Dev' },
      ],
      cta: { label: 'Lihat Studi Kasus canvAR ↗', to: '/work/canvar' },
    },
    {
      id: 'journey',
      vol: 'VOL. 06',
      spine: 'LOGBOOK & KCT',
      cloth: 'burgundy',
      height: 90,
      railPos: 91,
      tag: '06 / MAGANG, ORGANISASI & PRESTASI',
      title: 'Merilis kctjakarta.com di industri & mengaudit anggaran Rp 26,19 Juta.',
      subtitle: 'Magang PT KCT · 5 Peran Kepemimpinan · Google Gemini Certified',
      body:
        'Membangun website profil perusahaan live dan ~20 kuotasi komersial di PT Kharisma Cakrawala Transportasi, mengaudit 280+ transaksi SITE 2025, dan meraih 2× Juara 2 Film Pendek.',
      metrics: [
        { k: 'WEBSITE LIVE', v: 'kctjakarta.com' },
        { k: 'AUDIT KEUANGAN', v: '280+ Tx (Rp 26,19Jt)' },
        { k: 'KREDENSIAL', v: 'Gemini AI + 2× Juara 2' },
      ],
      cta: { label: 'Baca Logbook Lengkap (/journey) ↗', to: '/journey' },
    },
  ],
};

export default function Home() {
  const { lang } = useApp();
  const home = getHomeContent(lang);
  const { profilePhotos = [] } = home;

  const books = LIBRARY_BOOKS[lang] || LIBRARY_BOOKS.en;
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoverIdx, setHoverIdx] = useState(null);
  const [isExtracting, setIsExtracting] = useState(false);
  const [photoIdx, setPhotoIdx] = useState(0);

  const activeBook = books[activeIdx] || books[0];
  const railTargetBook = hoverIdx !== null ? books[hoverIdx] : activeBook;
  const currentPhoto = profilePhotos[photoIdx] || profilePhotos[0];

  const extractBook = (idx) => {
    setIsExtracting(true);
    setActiveIdx(idx);
    window.setTimeout(() => setIsExtracting(false), 520);
  };

  // Keyboard navigation (Left / Right arrows slide the brass book extractor)
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        setIsExtracting(true);
        setActiveIdx((prev) => (prev + 1) % books.length);
        window.setTimeout(() => setIsExtracting(false), 480);
      } else if (e.key === 'ArrowLeft') {
        setIsExtracting(true);
        setActiveIdx((prev) => (prev - 1 + books.length) % books.length);
        window.setTimeout(() => setIsExtracting(false), 480);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [books.length]);

  return (
    <div className="kissa-home">
      {/* =========================================================
          STAGE 1: INTERACTIVE LIBRARY BOOKSHELF & BRASS BOOK-EXTRACTOR
         ========================================================= */}
      <section className="container kissa-shelf-hero">
        <div className="kissa-shelf-hero__topbar">
          <div className="mono kissa-status-line">
            <span className="kissa-status-dot" />
            <span>{home.availability}</span>
          </div>
          <span className="mono kissa-shelf-hero__instruction">
            {lang === 'id'
              ? 'KLIK BUKU DI RAK ATAU TEKAN ← / → UNTUK MENARIK ARSIP'
              : 'CLICK ANY VOLUME ON THE SHELF OR PRESS ← / → TO EXTRACT'}
          </span>
        </div>

        {/* Physical Walnut Library Cabinet + Rolling Brass Extractor Arm */}
        <div className="kissa-cabinet">
          {/* Giant Recessed Architectural Typography */}
          <div className="kissa-cabinet__backdrop" aria-hidden="true">
            LIBRARY
          </div>

          {/* Top Brushed Brass Rail & Mechanical Book-Extractor Clamp */}
          <div className="kissa-extractor-rail" aria-hidden="true">
            <div className="kissa-extractor-rail__rod" />
            <div
              className={`kissa-extractor ${isExtracting ? 'is-clamping' : ''}`}
              style={{ left: `${railTargetBook.railPos}%` }}
            >
              <div className="kissa-extractor__trolley">
                <span className="kissa-extractor__wheel" />
                <span className="kissa-extractor__wheel" />
              </div>
              <div className="kissa-extractor__stem" />
              <div className="kissa-extractor__clamp">
                <span className="kissa-extractor__jaw kissa-extractor__jaw--l" />
                <span className="kissa-extractor__housing" />
                <span className="kissa-extractor__jaw kissa-extractor__jaw--r" />
              </div>
              <div className="kissa-extractor__spotlight" />
            </div>
          </div>

          {/* 6 Tall Cloth-Bound Library Volumes Standing on the Walnut Shelf */}
          <div
            className="kissa-bookshelf-row"
            role="tablist"
            aria-label="Interactive Library Bookshelf"
          >
            {books.map((book, idx) => {
              const isExtracted = idx === activeIdx;
              return (
                <button
                  key={book.id}
                  type="button"
                  role="tab"
                  aria-selected={isExtracted}
                  className={`kissa-book kissa-book--${book.cloth} ${
                    isExtracted ? 'is-extracted' : ''
                  }`}
                  style={{ '--book-h': `${book.height}%` }}
                  onMouseEnter={() => setHoverIdx(idx)}
                  onMouseLeave={() => setHoverIdx(null)}
                  onClick={() => extractBook(idx)}
                >
                  <span className="kissa-book__band kissa-book__band--top" aria-hidden="true" />
                  <span className="mono kissa-book__vol">{book.vol}</span>
                  <span className="kissa-book__spine-title">{book.spine}</span>
                  <span className="kissa-book__band kissa-book__band--bot" aria-hidden="true" />
                </button>
              );
            })}
          </div>

          {/* Dark Walnut Shelf Plank */}
          <div className="kissa-walnut-ledge" aria-hidden="true">
            <span className="mono">
              OSANNA PATRICIA LIMBONG · ARCHIVAL READING SHELF · VOL. 01 — 06
            </span>
          </div>
        </div>

        {/* Open Reading Desk: Displays the Currently Extracted Book */}
        <div className="kissa-reading-spread">
          <div className="kissa-reading-spread__main">
            <div className="mono kissa-reading-spread__head">
              <span>{activeBook.tag}</span>
              <span>
                {activeBook.vol} / 0{books.length}
              </span>
            </div>

            <h1 className="kissa-reading-spread__title">{activeBook.title}</h1>
            <p className="kissa-reading-spread__subtitle">{activeBook.subtitle}</p>
            <p className="kissa-reading-spread__body">{activeBook.body}</p>

            <div className="kissa-reading-spread__footer">
              <Link to={activeBook.cta.to} className="mono kissa-reading-spread__cta">
                {activeBook.cta.label}
              </Link>

              <div className="kissa-reading-spread__steppers">
                <button
                  type="button"
                  className="mono kissa-step-btn"
                  onClick={() => extractBook((activeIdx - 1 + books.length) % books.length)}
                  aria-label="Previous Volume"
                >
                  ← PREV
                </button>
                <button
                  type="button"
                  className="mono kissa-step-btn"
                  onClick={() => extractBook((activeIdx + 1) % books.length)}
                  aria-label="Next Volume"
                >
                  NEXT →
                </button>
              </div>
            </div>
          </div>

          {/* Right Folio Plate: 3 Verified Metrics for the Extracted Book */}
          <aside className="kissa-reading-spread__plate">
            <span className="mono kissa-reading-spread__plate-head">
              {lang === 'id' ? 'CATATAN ARSIP' : 'ARCHIVAL INDEX PLATE'}
            </span>
            <div className="kissa-reading-spread__metrics">
              {activeBook.metrics.map((m) => (
                <div key={m.k} className="kissa-plate-metric">
                  <span className="mono kissa-plate-metric__k">{m.k}</span>
                  <strong className="kissa-plate-metric__v">{m.v}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </section>

      {/* =========================================================
          STAGE 2: MEASURED IMPACT LEDGER
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
          STAGE 3: AUTHOR'S NOTE & ARCHIVAL PORTRAIT (Zero Duplicate Cards)
         ========================================================= */}
      <section className="container kissa-author-section">
        <div className="kissa-author-grid">
          <div className="kissa-author-copy">
            <span className="mono kissa-eyebrow">
              {lang === 'id' ? 'CATATAN PENULIS ARSIP' : 'AUTHOR’S NOTE'}
            </span>
            <h2 className="kissa-author-title">{home.greeting}</h2>
            <p className="kissa-author-text">{home.intro}</p>
            <div className="kissa-author-links">
              <Link to="/about" className="mono kissa-author-link">
                02 / {lang === 'id' ? 'Tentang & Keahlian ↗' : 'About & Toolkit ↗'}
              </Link>
              <Link to="/work" className="mono kissa-author-link">
                03 / {lang === 'id' ? 'Putar Arsip Kaset Proyek ↗' : 'Spin Project Cassette Deck ↗'}
              </Link>
              <Link to="/journey" className="mono kissa-author-link">
                04 / {lang === 'id' ? 'Logbook Magang & Prestasi ↗' : 'Internship & Awards Logbook ↗'}
              </Link>
            </div>
          </div>

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
