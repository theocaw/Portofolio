import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import { getHomeContent } from '../content/home.js';
import BotanicalHeroCanvas from '../components/BotanicalHeroCanvas.jsx';
import KineticGardenWidgets from '../components/KineticGardenWidgets.jsx';
import AnalyticsGardenChart from '../components/AnalyticsGardenChart.jsx';
import FlowerEmblem from '../components/FlowerEmblem.jsx';
import './Home.css';

const MEADOW_BLOOMS = {
  en: [
    {
      id: 'intro',
      num: '01',
      species: 'edelweiss',
      flowerName: 'EDELWEISS',
      stemHeight: 118,
      tag: '01 / OVERVIEW & DIRECTION',
      title: 'Turning complex data into clear stories & living web systems.',
      subtitle: 'Osanna Patricia Limbong — Data Analyst & Front-End Developer',
      body:
        'Software Engineering student at IPB University blending analytical rigor with tactile front-end craft. Pick any Swiss alpine wildflower above—or press ← / → arrow keys—to explore each pillar.',
      metrics: [
        { k: 'PRIMARY FOCUS', v: 'Data Analyst & Front-End' },
        { k: 'EDUCATION', v: 'IPB University (TPL)' },
        { k: 'AVAILABILITY', v: 'Open for Internship' },
      ],
      cta: { label: 'Read Full Profile (/about) ↗', to: '/about' },
    },
    {
      id: 'analytics',
      num: '02',
      species: 'rose',
      flowerName: 'ALPINE ROSE',
      stemHeight: 102,
      tag: '02 / DATA ANALYSIS & MODELING',
      title: 'Statistical modeling, geospatial ETL & market segmentation.',
      subtitle: 'Exploratory Data Analysis · Linear Regression · Decision Trees · K-Means',
      body:
        'Cultivating raw multi-source datasets into normalized 3NF schemas, validated predictive models, and actionable business segments using Python, R, SQL, and interactive charts.',
      metrics: [
        { k: 'CORE STACK', v: 'Python · R · SQL' },
        { k: 'GEOSPATIAL ETL', v: '30,903 Verified Rows' },
        { k: 'PEAK MODEL', v: '81.94% R² Validated' },
      ],
      cta: { label: 'Explore Data Case Studies (/work) ↗', to: '/work' },
    },
    {
      id: 'frontend',
      num: '03',
      species: 'buttercup',
      flowerName: 'BUTTERCUP',
      stemHeight: 112,
      tag: '03 / FRONT-END & SYSTEM ARCHITECTURE',
      title: 'Designing layered architectures & responsive web applications.',
      subtitle: 'React · Laravel 13 · Tailwind CSS · IEEE 830 SDD · Normalized ERD',
      body:
        'Growing structured software systems from blueprint to interface—spanning 4-tier layered specifications, AI function-calling platforms, payment integrations, and operational dashboards.',
      metrics: [
        { k: 'WEB STACK', v: 'React · Laravel · Tailwind' },
        { k: 'ARCHITECTURE', v: '4-Tier SDD & 3NF ERD' },
        { k: 'COMPLETED WORK', v: '6 Documented Projects' },
      ],
      cta: { label: 'Visit Project Garden (/work) ↗', to: '/work' },
    },
    {
      id: 'education',
      num: '04',
      species: 'gentian',
      flowerName: 'BLUE GENTIAN',
      stemHeight: 96,
      tag: '04 / ACADEMIC FOUNDATION & TOOLKIT',
      title: '3.63 / 4.00 Cumulative GPA in Software Engineering Technology.',
      subtitle: 'Vocational School of IPB University · Bilingual (ID & EN)',
      body:
        'Rooted in software engineering fundamentals, database design, machine learning, and 3D spatial prototyping—backed by an organized technical toolkit sharpened across hands-on coursework.',
      metrics: [
        { k: 'CUMULATIVE GPA', v: '3.63 / 4.00' },
        { k: 'PROGRAM', v: 'Software Engineering (TPL)' },
        { k: 'LANGUAGES', v: 'Indonesian · English' },
      ],
      cta: { label: 'Visit Botanical Pavilion (/about) ↗', to: '/about' },
    },
    {
      id: 'experience',
      num: '05',
      species: 'lavender',
      flowerName: 'LAVENDER',
      stemHeight: 108,
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
      cta: { label: 'Walk Alpine Trail (/journey) ↗', to: '/journey' },
    },
    {
      id: 'honors',
      num: '06',
      species: 'poppy',
      flowerName: 'ALPINE POPPY',
      stemHeight: 100,
      tag: '06 / AWARDS & VERIFIED CREDENTIALS',
      title: 'International competition honors & verified AI certifications.',
      subtitle: 'Google Gemini Certified Student · 2× 2nd Place Short Movie · Business Plan',
      body:
        'Recognized across international and national creative competitions alongside formal Google Gemini AI certification—balancing analytical precision with expressive storytelling.',
      metrics: [
        { k: 'CERTIFICATION', v: 'Google Gemini Certified' },
        { k: 'COMPETITIONS', v: '2× 2nd Place Awards' },
        { k: 'STRATEGY', v: 'Business Plan Semifinalist' },
      ],
      cta: { label: 'View Credentials (/journey) ↗', to: '/journey' },
    },
  ],
  id: [
    {
      id: 'intro',
      num: '01',
      species: 'edelweiss',
      flowerName: 'EDELWEISS',
      stemHeight: 118,
      tag: '01 / RINGKASAN & ARAH KARYA',
      title: 'Mengubah data rumit menjadi cerita jernih & sistem web yang hidup.',
      subtitle: 'Osanna Patricia Limbong — Data Analyst & Front-End Developer',
      body:
        'Mahasiswi Rekayasa Perangkat Lunak IPB University yang memadukan ketajaman analisis data dengan rekayasa antarmuka interaktif. Pilih salah satu bunga Alpen di atas—atau tekan panah ← / →—untuk membuka tiap pilar.',
      metrics: [
        { k: 'FOKUS UTAMA', v: 'Data Analyst & Front-End' },
        { k: 'PENDIDIKAN', v: 'IPB University (TPL)' },
        { k: 'STATUS', v: 'Terbuka untuk Magang' },
      ],
      cta: { label: 'Baca Profil Lengkap (/about) ↗', to: '/about' },
    },
    {
      id: 'analytics',
      num: '02',
      species: 'rose',
      flowerName: 'MAWAR ALPEN',
      stemHeight: 102,
      tag: '02 / ANALISIS DATA & PEMODELAN',
      title: 'Pemodelan statistik, ETL geospasial & segmentasi pasar.',
      subtitle: 'Exploratory Data Analysis · Regresi Linear · Decision Tree · K-Means',
      body:
        'Mengolah dataset multi-sumber menjadi skema 3NF ternormalisasi, model prediksi tervalidasi, dan segmen bisnis terukur menggunakan Python, R, SQL, serta grafik interaktif.',
      metrics: [
        { k: 'TEKNOLOGI INTI', v: 'Python · R · SQL' },
        { k: 'ETL GEOSPASIAL', v: '30.903 Baris Valid' },
        { k: 'VALIDASI MODEL', v: '81,94% R² Teruji' },
      ],
      cta: { label: 'Lihat Studi Kasus Data (/work) ↗', to: '/work' },
    },
    {
      id: 'frontend',
      num: '03',
      species: 'buttercup',
      flowerName: 'BUTTERCUP',
      stemHeight: 112,
      tag: '03 / FRONT-END & ARSITEKTUR SISTEM',
      title: 'Merancang arsitektur berlapis & aplikasi web yang responsif.',
      subtitle: 'React · Laravel 13 · Tailwind CSS · DPPL IEEE 830 · ERD 3NF',
      body:
        'Menumbuhkan sistem perangkat lunak terstruktur dari cetak biru hingga antarmuka—mencakup spesifikasi 4-tier, platform AI function calling, integrasi pembayaran, dan dashboard operasional.',
      metrics: [
        { k: 'WEB STACK', v: 'React · Laravel · Tailwind' },
        { k: 'ARSITEKTUR', v: '4-Tier SDD & ERD 3NF' },
        { k: 'PROYEK SELESAI', v: '6 Studi Kasus Lengkap' },
      ],
      cta: { label: 'Masuk Taman Proyek (/work) ↗', to: '/work' },
    },
    {
      id: 'education',
      num: '04',
      species: 'gentian',
      flowerName: 'GENTIAN BIRU',
      stemHeight: 96,
      tag: '04 / FONDASI AKADEMIK & KEAHLIAN',
      title: 'IPK Kumulatif 3,63 / 4,00 Teknologi Rekayasa Perangkat Lunak.',
      subtitle: 'Sekolah Vokasi IPB University · Bilingual (ID & EN)',
      body:
        'Berakar pada fondasi rekayasa perangkat lunak, desain basis data, machine learning, dan prototipe 3D AR—didukung rangkaian keahlian teknis yang diasah lewat proyek nyata.',
      metrics: [
        { k: 'IPK KUMULATIF', v: '3,63 / 4,00' },
        { k: 'PROGRAM STUDI', v: 'Rekayasa Perangkat Lunak' },
        { k: 'BAHASA', v: 'Indonesia · Inggris' },
      ],
      cta: { label: 'Buka Paviliun Profil (/about) ↗', to: '/about' },
    },
    {
      id: 'experience',
      num: '05',
      species: 'lavender',
      flowerName: 'LAVENDER',
      stemHeight: 108,
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
      cta: { label: 'Susuri Jalur Alpen (/journey) ↗', to: '/journey' },
    },
    {
      id: 'honors',
      num: '06',
      species: 'poppy',
      flowerName: 'POPPY ALPEN',
      stemHeight: 100,
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
      cta: { label: 'Lihat Kredensial (/journey) ↗', to: '/journey' },
    },
  ],
};

export default function Home() {
  const { lang } = useApp();
  const home = getHomeContent(lang);
  const { profilePhotos = [] } = home;

  const blooms = MEADOW_BLOOMS[lang] || MEADOW_BLOOMS.en;
  const [activeIdx, setActiveIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);

  const activeBloom = blooms[activeIdx] || blooms[0];
  const currentPhoto = profilePhotos[photoIdx] || profilePhotos[0];

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') {
        setActiveIdx((prev) => (prev + 1) % blooms.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveIdx((prev) => (prev - 1 + blooms.length) % blooms.length);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [blooms.length]);

  return (
    <div className="meadow-home">
      {/* =========================================================
          STAGE 1: 60FPS INTERACTIVE SWISS ALPINE FLOWER MEADOW HERO
         ========================================================= */}
      <BotanicalHeroCanvas availability={home.availability} />

      {/* =========================================================
          STAGE 2: INTERACTIVE 6-FLOWER SWISS MEADOW BED (Replaces Bookshelf)
         ========================================================= */}
      <section className="container meadow-bed-section">
        <div className="meadow-bed-section__top">
          <div className="mono meadow-status-line">
            <span className="meadow-status-dot" />
            <span>
              {lang === 'id'
                ? 'PADANG BUNGA ALPEN · 06 PILAR UTAMA'
                : 'SWISS WILDFLOWER BED · 06 CORE PILLARS'}
            </span>
          </div>
          <span className="mono meadow-bed-section__hint">
            {lang === 'id'
              ? 'KLIK BUNGA ATAU TEKAN ← / → UNTUK MEKARKAN TOPIK'
              : 'PICK ANY WILDFLOWER OR PRESS ← / → TO BLOOM'}
          </span>
        </div>

        {/* Sunlit Alpine Meadow Flowerbed with 6 Swaying Interactive Wildflowers */}
        <div className="meadow-bed" role="tablist" aria-label="Interactive Swiss Wildflower Bed">
          <div className="meadow-bed__backdrop" aria-hidden="true">
            MEADOW
          </div>

          <div className="meadow-bed__row">
            {blooms.map((item, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`meadow-flower-btn ${isSelected ? 'is-bloomed' : ''}`}
                  onClick={() => setActiveIdx(idx)}
                  whileHover={{ y: -8 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 340, damping: 20 }}
                >
                  <motion.div
                    className="meadow-flower-btn__head"
                    animate={{
                      scale: isSelected ? 1.24 : 0.94,
                      rotate: isSelected ? [0, 6, -4, 0] : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="meadow-sun-halo"
                        className="meadow-flower-btn__halo"
                        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
                      />
                    )}
                    <FlowerEmblem species={item.species} size={68} />
                  </motion.div>

                  <span
                    className="meadow-flower-btn__stem"
                    style={{ height: `${item.stemHeight}px` }}
                    aria-hidden="true"
                  >
                    <i className="meadow-leaf meadow-leaf--l" />
                    <i className="meadow-leaf meadow-leaf--r" />
                  </span>

                  <span className="meadow-flower-btn__label-plate">
                    <span className="mono meadow-flower-btn__num">{item.num}</span>
                    <span className="mono meadow-flower-btn__name">{item.flowerName}</span>
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Lush Alpine Clover Ground Strip */}
          <div className="meadow-bed__turf" aria-hidden="true">
            <span className="mono">
              SWISS ALPINE WILDFLOWER COLLECTION · EDELWEISS · ROSE · BUTTERCUP · GENTIAN · LAVENDER · POPPY
            </span>
          </div>
        </div>

        {/* Open Sunlit Meadow Field Note Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${lang}-${activeBloom.id}`}
            className="meadow-field-note kissa-spotlight"
            initial={{ opacity: 0, y: 14, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          >
            <div className="meadow-field-note__main">
              <div className="mono meadow-field-note__head">
                <span>{activeBloom.tag}</span>
                <span>
                  {activeBloom.flowerName} · {activeBloom.num} / 0{blooms.length}
                </span>
              </div>

              <h2 className="meadow-field-note__title">{activeBloom.title}</h2>
              <p className="meadow-field-note__subtitle">{activeBloom.subtitle}</p>
              <p className="meadow-field-note__body">{activeBloom.body}</p>

              <div className="meadow-field-note__footer">
                <Link to={activeBloom.cta.to} className="mono meadow-field-note__cta">
                  {activeBloom.cta.label}
                </Link>

                <div className="meadow-field-note__steppers">
                  <button
                    type="button"
                    className="mono meadow-step-btn"
                    onClick={() => setActiveIdx((activeIdx - 1 + blooms.length) % blooms.length)}
                    aria-label="Previous Wildflower"
                  >
                    ← PREV
                  </button>
                  <button
                    type="button"
                    className="mono meadow-step-btn"
                    onClick={() => setActiveIdx((activeIdx + 1) % blooms.length)}
                    aria-label="Next Wildflower"
                  >
                    NEXT →
                  </button>
                </div>
              </div>
            </div>

            <aside className="meadow-field-note__plate">
              <div className="meadow-field-note__plate-top">
                <span className="mono">
                  {lang === 'id' ? 'CATATAN BOTANI' : 'MEADOW SPECIMEN NOTE'}
                </span>
                <FlowerEmblem species={activeBloom.species} size={34} />
              </div>
              <div className="meadow-field-note__metrics">
                {activeBloom.metrics.map((m) => (
                  <div key={m.k} className="meadow-plate-metric">
                    <span className="mono meadow-plate-metric__k">{m.k}</span>
                    <strong className="meadow-plate-metric__v">{m.v}</strong>
                  </div>
                ))}
              </div>
            </aside>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* =========================================================
          STAGE 3: KINETIC PROMPT & ANIME.JS SPRING MICRO-WIDGETS
         ========================================================= */}
      <KineticGardenWidgets />

      {/* =========================================================
          STAGE 4: INTERACTIVE STAGGERED DATA CHARTS
         ========================================================= */}
      <AnalyticsGardenChart />

      {/* =========================================================
          STAGE 5: SUNLIT BOTANICAL RIBBON & AUTHOR'S NOTE
         ========================================================= */}
      <div className="kissa-ticker" aria-hidden="true">
        <div className="kissa-ticker__track">
          {[0, 1].map((dup) => (
            <div key={dup} className="mono kissa-ticker__group">
              {home.marquee.map((phrase) => (
                <span key={phrase} className="kissa-ticker__item">
                  <span>{phrase}</span>
                  <span className="kissa-ticker__sep">✿</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="container kissa-author-section">
        <div className="kissa-author-grid">
          <div className="kissa-author-copy">
            <span className="mono kissa-eyebrow">
              {lang === 'id' ? 'CATATAN PENULIS TAMAN' : 'GARDEN KEEPER’S NOTE'}
            </span>
            <h2 className="kissa-author-title">{home.greeting}</h2>
            <p className="kissa-author-text">{home.intro}</p>
            <div className="kissa-author-links">
              <Link to="/about" className="mono kissa-author-link">
                02 / {lang === 'id' ? 'Paviliun Profil & Keahlian ↗' : 'About Pavilion & Toolkit ↗'}
              </Link>
              <Link to="/work" className="mono kissa-author-link">
                03 / {lang === 'id' ? 'Jelajahi Taman Proyek ↗' : 'Explore Project Garden ↗'}
              </Link>
              <Link to="/journey" className="mono kissa-author-link">
                04 / {lang === 'id' ? 'Jalur Alpen & Prestasi ↗' : 'Alpine Trail & Honors ↗'}
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
                  key={currentPhoto.src}
                  src={currentPhoto.src}
                  alt={currentPhoto.alt}
                  className="kissa-portrait__img"
                  draggable="false"
                />
              </div>
              <figcaption className="mono kissa-portrait__caption">
                <span>
                  BLOOM 0{photoIdx + 1} / 0{profilePhotos.length}
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
