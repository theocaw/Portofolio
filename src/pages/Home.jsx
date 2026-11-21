import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { getHomeContent } from '../content/home.js';
import './Home.css';

const LIBRARY_BOOKS = {
  en: [
    {
      id: 'intro',
      vol: 'VOL. 01',
      spine: 'INTRODUCTION',
      cloth: 'pine',
      height: 100,
      railPos: 9,
      tag: '01 / OVERVIEW & DIRECTION',
      title: 'Turning complex data into clear stories & tactile web systems.',
      subtitle: 'Osanna Patricia Limbong — Data Analyst & Front-End Developer',
      body:
        'Software Engineering student at IPB University combining analytical rigor with thoughtful interface engineering. Use the brass extractor above—or press ← / → arrow keys—to pull any volume from the shelf.',
      metrics: [
        { k: 'PRIMARY FOCUS', v: 'Data Analyst & Front-End' },
        { k: 'EDUCATION', v: 'IPB University (TPL)' },
        { k: 'AVAILABILITY', v: 'Open for Internship' },
      ],
      cta: { label: 'Read Full Profile (/about) ↗', to: '/about' },
    },
    {
      id: 'analytics',
      vol: 'VOL. 02',
      spine: 'DATA & ML',
      cloth: 'rust',
      height: 94,
      railPos: 25.5,
      tag: '02 / DATA ANALYSIS & MODELING',
      title: 'Statistical modeling, predictive analytics & market segmentation.',
      subtitle: 'Exploratory Data Analysis · Linear Regression · Decision Trees · K-Means',
      body:
        'Transforming raw, multi-variable datasets into validated predictive models, interpretable decision rules, and actionable business segments using Python, R, SQL, and interactive visualizations.',
      metrics: [
        { k: 'CORE STACK', v: 'Python · R · SQL' },
        { k: 'METHODOLOGY', v: 'EDA · Regression · Clustering' },
        { k: 'PEAK MODEL', v: '81.94% R² Validated' },
      ],
      cta: { label: 'Inspect Data Case Studies (/work) ↗', to: '/work' },
    },
    {
      id: 'frontend',
      vol: 'VOL. 03',
      spine: 'WEB & SYSTEMS',
      cloth: 'olive',
      height: 98,
      railPos: 42,
      tag: '03 / FRONT-END & SYSTEM ARCHITECTURE',
      title: 'Designing layered architectures & responsive web applications.',
      subtitle: 'React · Laravel 12 · Tailwind CSS · IEEE 830 SDD · Normalized ERD',
      body:
        'Building structured software systems from blueprint to interface—spanning 4-tier layered specifications, payment integrations, mobile ordering ecosystems, and operational dashboards.',
      metrics: [
        { k: 'WEB STACK', v: 'React · Laravel · Tailwind' },
        { k: 'ARCHITECTURE', v: '4-Tier SDD & ERD' },
        { k: 'SHIPPED WORK', v: '5 Documented Projects' },
      ],
      cta: { label: 'Explore Tape Archive (/work) ↗', to: '/work' },
    },
    {
      id: 'education',
      vol: 'VOL. 04',
      spine: 'EDUCATION',
      cloth: 'walnut',
      height: 89,
      railPos: 58.5,
      tag: '04 / ACADEMIC FOUNDATION & TOOLKIT',
      title: '3.63 / 4.00 Cumulative GPA in Software Engineering Technology.',
      subtitle: 'Vocational School of IPB University · Bilingual (ID & EN)',
      body:
        'Grounded in software engineering fundamentals, database design, machine learning, and 3D spatial prototyping—backed by an organized technical toolkit built through hands-on coursework.',
      metrics: [
        { k: 'CUMULATIVE GPA', v: '3.63 / 4.00' },
        { k: 'PROGRAM', v: 'Software Engineering (TPL)' },
        { k: 'LANGUAGES', v: 'Indonesian · English' },
      ],
      cta: { label: 'Open Library & Toolkit (/about) ↗', to: '/about' },
    },
    {
      id: 'experience',
      vol: 'VOL. 05',
      spine: 'EXPERIENCE',
      cloth: 'brass',
      height: 95,
      railPos: 75,
      tag: '05 / INDUSTRY & LEADERSHIP',
      title: 'Industry web delivery, logistics operations & treasury governance.',
      subtitle: 'PT KCT Logistics Internship · 5 Campus Leadership & Treasury Roles',
      body:
        'Shipped a live corporate website and commercial quotations during industry immersion, while leading financial audits across 280+ transactions and coordinating student organizations.',
      metrics: [
        { k: 'INDUSTRY SITE', v: 'kctjakarta.com (Live)' },
        { k: 'TREASURY AUDIT', v: '280+ Tx (Rp 26.19M)' },
        { k: 'LEADERSHIP', v: '5 Active Organizations' },
      ],
      cta: { label: 'Read Experience Logbook (/journey) ↗', to: '/journey' },
    },
    {
      id: 'honors',
      vol: 'VOL. 06',
      spine: 'HONORS & CERTS',
      cloth: 'burgundy',
      height: 91,
      railPos: 91,
      tag: '06 / AWARDS & VERIFIED CREDENTIALS',
      title: 'International competition honors & verified AI certifications.',
      subtitle: 'Google Gemini Certified Student · 2× 2nd Place Short Movie · Business Plan',
      body:
        'Recognized across international and national creative competitions alongside formal Google Gemini AI certification—balancing analytical precision with visual storytelling.',
      metrics: [
        { k: 'CERTIFICATION', v: 'Google Gemini Certified' },
        { k: 'COMPETITIONS', v: '2× 2nd Place Awards' },
        { k: 'STRATEGY', v: 'Business Plan Semifinalist' },
      ],
      cta: { label: 'View All Credentials (/journey) ↗', to: '/journey' },
    },
  ],
  id: [
    {
      id: 'intro',
      vol: 'VOL. 01',
      spine: 'PENGANTAR',
      cloth: 'pine',
      height: 100,
      railPos: 9,
      tag: '01 / RINGKASAN & ARAH KARYA',
      title: 'Mengubah data rumit menjadi cerita jernih & sistem web yang presisi.',
      subtitle: 'Osanna Patricia Limbong — Data Analyst & Front-End Developer',
      body:
        'Mahasiswi Rekayasa Perangkat Lunak IPB University yang menggabungkan ketajaman analisis data dengan rekayasa antarmuka interaktif. Gunakan penjepit kuningan di atas—atau tombol panah ← / →—untuk menarik jilid buku.',
      metrics: [
        { k: 'FOKUS UTAMA', v: 'Data Analyst & Front-End' },
        { k: 'PENDIDIKAN', v: 'IPB University (TPL)' },
        { k: 'STATUS', v: 'Terbuka untuk Magang' },
      ],
      cta: { label: 'Baca Profil Lengkap (/about) ↗', to: '/about' },
    },
    {
      id: 'analytics',
      vol: 'VOL. 02',
      spine: 'DATA & ML',
      cloth: 'rust',
      height: 94,
      railPos: 25.5,
      tag: '02 / ANALISIS DATA & PEMODELAN',
      title: 'Pemodelan statistik, analitik prediktif & segmentasi pasar.',
      subtitle: 'Exploratory Data Analysis · Regresi Linear · Decision Tree · K-Means',
      body:
        'Mengolah dataset mentah multi-variabel menjadi model prediksi tervalidasi, aturan keputusan yang mudah dibaca, dan segmen bisnis terukur menggunakan Python, R, dan SQL.',
      metrics: [
        { k: 'TEKNOLOGI INTI', v: 'Python · R · SQL' },
        { k: 'METODOLOGI', v: 'EDA · Regresi · Klastering' },
        { k: 'VALIDASI MODEL', v: '81,94% R² Teruji' },
      ],
      cta: { label: 'Lihat Studi Kasus Data (/work) ↗', to: '/work' },
    },
    {
      id: 'frontend',
      vol: 'VOL. 03',
      spine: 'WEB & SISTEM',
      cloth: 'olive',
      height: 98,
      railPos: 42,
      tag: '03 / FRONT-END & ARSITEKTUR SISTEM',
      title: 'Merancang arsitektur berlapis & aplikasi web yang responsif.',
      subtitle: 'React · Laravel 12 · Tailwind CSS · DPPL IEEE 830 · ERD Ternormalisasi',
      body:
        'Membangun sistem perangkat lunak terstruktur dari cetak biru hingga antarmuka—mencakup spesifikasi 4-tier, integrasi pembayaran, ekosistem pemesanan mobile, dan dashboard operasional.',
      metrics: [
        { k: 'WEB STACK', v: 'React · Laravel · Tailwind' },
        { k: 'ARSITEKTUR', v: '4-Tier SDD & ERD' },
        { k: 'PROYEK RILIS', v: '5 Studi Kasus Lengkap' },
      ],
      cta: { label: 'Buka Arsip Kaset (/work) ↗', to: '/work' },
    },
    {
      id: 'education',
      vol: 'VOL. 04',
      spine: 'PENDIDIKAN',
      cloth: 'walnut',
      height: 89,
      railPos: 58.5,
      tag: '04 / FONDASI AKADEMIK & KEAHLIAN',
      title: 'IPK Kumulatif 3,63 / 4,00 Teknologi Rekayasa Perangkat Lunak.',
      subtitle: 'Sekolah Vokasi IPB University · Bilingual (ID & EN)',
      body:
        'Berakar pada fondasi rekayasa perangkat lunak, desain basis data, machine learning, dan prototipe 3D AR—didukung katalog keahlian teknis yang diasah lewat proyek nyata.',
      metrics: [
        { k: 'IPK KUMULATIF', v: '3,63 / 4,00' },
        { k: 'PROGRAM STUDI', v: 'Rekayasa Perangkat Lunak' },
        { k: 'BAHASA', v: 'Indonesia · Inggris' },
      ],
      cta: { label: 'Buka Perpustakaan & Toolkit (/about) ↗', to: '/about' },
    },
    {
      id: 'experience',
      vol: 'VOL. 05',
      spine: 'PENGALAMAN',
      cloth: 'brass',
      height: 95,
      railPos: 75,
      tag: '05 / INDUSTRI & KEPEMIMPINAN',
      title: 'Pengembangan web industri, operasional logistik & tata kelola keuangan.',
      subtitle: 'Magang PT KCT · 5 Peran Kepemimpinan & Bendahara Organisasi',
      body:
        'Merilis website perusahaan live dan dokumen kuotasi komersial selama magang industri, sekaligus memimpin audit keuangan 280+ transaksi serta koordinasi organisasi kampus.',
      metrics: [
        { k: 'WEBSITE INDUSTRI', v: 'kctjakarta.com (Live)' },
        { k: 'AUDIT ANGGARAN', v: '280+ Tx (Rp 26,19Jt)' },
        { k: 'ORGANISASI', v: '5 Peran Aktif' },
      ],
      cta: { label: 'Baca Logbook Pengalaman (/journey) ↗', to: '/journey' },
    },
    {
      id: 'honors',
      vol: 'VOL. 06',
      spine: 'PRESTASI',
      cloth: 'burgundy',
      height: 91,
      railPos: 91,
      tag: '06 / PENGHARGAAN & SERTIFIKASI',
      title: 'Prestasi kompetisi internasional & sertifikasi AI terverifikasi.',
      subtitle: 'Google Gemini Certified Student · 2× Juara 2 Film Pendek · Business Plan',
      body:
        'Meraih penghargaan pada kompetisi kreatif tingkat internasional maupun nasional serta sertifikasi resmi Google Gemini AI—memadukan presisi analitis dengan penceritaan visual.',
      metrics: [
        { k: 'SERTIFIKASI', v: 'Google Gemini Certified' },
        { k: 'KOMPETISI', v: '2× Juara 2 Film Pendek' },
        { k: 'STRATEGI', v: 'Semifinalis Business Plan' },
      ],
      cta: { label: 'Lihat Semua Kredensial (/journey) ↗', to: '/journey' },
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
          STAGE 2: EDITORIAL KINETIC TAPE RIBBON (Replaces Numbers Strip)
         ========================================================= */}
      <div className="kissa-ticker" aria-hidden="true">
        <div className="kissa-ticker__track">
          {[0, 1].map((dup) => (
            <div key={dup} className="mono kissa-ticker__group">
              {home.marquee.map((phrase) => (
                <span key={phrase} className="kissa-ticker__item">
                  <span>{phrase}</span>
                  <span className="kissa-ticker__sep">—</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

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
