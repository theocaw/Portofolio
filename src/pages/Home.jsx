import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import { getHomeContent } from '../content/home.js';
import BotanicalHeroCanvas from '../components/BotanicalHeroCanvas.jsx';
import KineticGardenWidgets from '../components/KineticGardenWidgets.jsx';
import AnalyticsGardenChart from '../components/AnalyticsGardenChart.jsx';
import FlowerEmblem from '../components/FlowerEmblem.jsx';
import './Home.css';

const ORBIT_BLOOMS = {
  en: [
    {
      id: 'intro',
      num: '01',
      species: 'edelweiss',
      flowerName: 'Edelweiss',
      tag: '01 / OVERVIEW',
      title: 'Turning complex data into clear stories & living web systems.',
      body: 'Software Engineering student at IPB University blending analytical rigor with tactile front-end motion craft.',
      stat: 'Data Analyst & Front-End',
      to: '/about',
      cta: 'Read Profile ↗',
    },
    {
      id: 'analytics',
      num: '02',
      species: 'rose',
      flowerName: 'Alpine Rose',
      tag: '02 / DATA & ML',
      title: 'Statistical modeling, ETL pipelines & market segmentation.',
      body: 'Transforming raw multi-source datasets into clean relational schemas, predictive models, and clear visual insights that support real decisions.',
      stat: 'Python · R · SQL · ML',
      to: '/work',
      cta: 'Inspect Data Work ↗',
    },
    {
      id: 'frontend',
      num: '03',
      species: 'buttercup',
      flowerName: 'Buttercup',
      tag: '03 / WEB & SYSTEMS',
      title: 'Structured software architectures & responsive web craft.',
      body: 'Engineering clean full-stack applications from database design and layered blueprints to smooth, interactive user interfaces.',
      stat: 'React · Full-Stack · UI',
      to: '/work',
      cta: 'Explore Projects ↗',
    },
    {
      id: 'education',
      num: '04',
      species: 'gentian',
      flowerName: 'Blue Gentian',
      tag: '04 / EDUCATION',
      title: '3.63 / 4.00 GPA in Software Engineering Technology (IPB).',
      body: 'Vocational School of IPB University — grounded in databases, data mining, software architecture, and 3D spatial prototyping.',
      stat: 'GPA 3.63 / 4.00',
      to: '/about',
      cta: 'Visit Conservatory ↗',
    },
    {
      id: 'experience',
      num: '05',
      species: 'lavender',
      flowerName: 'Lavender',
      tag: '05 / EXPERIENCE',
      title: 'Industry web delivery & transparent financial governance.',
      body: 'Delivered live corporate web solutions and commercial workflows in logistics while leading multi-organization treasury audits.',
      stat: 'Industry & 5 Campus Roles',
      to: '/journey',
      cta: 'View Journey ↗',
    },
    {
      id: 'honors',
      num: '06',
      species: 'poppy',
      flowerName: 'Alpine Poppy',
      tag: '06 / HONORS',
      title: 'Competition honors & verified generative AI credentials.',
      body: 'Recognized across international and national creative competitions alongside official Google Gemini AI certification.',
      stat: 'Awards & Gemini Certified',
      to: '/journey',
      cta: 'See All Honors ↗',
    },
  ],
  id: [
    {
      id: 'intro',
      num: '01',
      species: 'edelweiss',
      flowerName: 'Edelweiss',
      tag: '01 / RINGKASAN',
      title: 'Mengubah data rumit menjadi cerita jernih & web yang hidup.',
      body: 'Mahasiswi Rekayasa Perangkat Lunak IPB University yang memadukan analisis data presisi dengan animasi antarmuka.',
      stat: 'Data Analyst & Front-End',
      to: '/about',
      cta: 'Baca Profil ↗',
    },
    {
      id: 'analytics',
      num: '02',
      species: 'rose',
      flowerName: 'Mawar Alpen',
      tag: '02 / DATA & ML',
      title: 'Pemodelan statistik, pipeline ETL & segmentasi data.',
      body: 'Mengolah dataset mentah multi-sumber menjadi struktur data bersih, model prediktif tervalidasi, dan visualisasi yang membantu pengambilan keputusan.',
      stat: 'Python · R · SQL · ML',
      to: '/work',
      cta: 'Lihat Studi Kasus ↗',
    },
    {
      id: 'frontend',
      num: '03',
      species: 'buttercup',
      flowerName: 'Buttercup',
      tag: '03 / WEB & SISTEM',
      title: 'Arsitektur perangkat lunak terstruktur & antarmuka responsif.',
      body: 'Membangun aplikasi web full-stack dari perancangan basis data dan cetak biru sistem hingga antarmuka pengguna yang halus dan interaktif.',
      stat: 'React · Full-Stack · UI',
      to: '/work',
      cta: 'Jelajahi Proyek ↗',
    },
    {
      id: 'education',
      num: '04',
      species: 'gentian',
      flowerName: 'Gentian Biru',
      tag: '04 / PENDIDIKAN',
      title: 'IPK 3,63 / 4,00 Teknologi Rekayasa Perangkat Lunak (IPB).',
      body: 'Sekolah Vokasi IPB University — mendalami basis data, data mining, arsitektur perangkat lunak, dan prototipe spasial 3D.',
      stat: 'IPK 3,63 / 4,00',
      to: '/about',
      cta: 'Buka Paviliun Profil ↗',
    },
    {
      id: 'experience',
      num: '05',
      species: 'lavender',
      flowerName: 'Lavender',
      tag: '05 / PENGALAMAN',
      title: 'Pengembangan web industri & tata kelola keuangan transparan.',
      body: 'Merilis solusi web korporat dan operasional komersial di industri logistik sekaligus memimpin audit keuangan di berbagai organisasi kampus.',
      stat: 'Industri & 5 Organisasi',
      to: '/journey',
      cta: 'Lihat Perjalanan ↗',
    },
    {
      id: 'honors',
      num: '06',
      species: 'poppy',
      flowerName: 'Poppy Alpen',
      tag: '06 / PRESTASI',
      title: 'Penghargaan kompetisi & sertifikasi AI generatif terverifikasi.',
      body: 'Meraih penghargaan di kompetisi kreatif tingkat internasional maupun nasional serta sertifikasi resmi Google Gemini AI.',
      stat: 'Prestasi & Gemini Certified',
      to: '/journey',
      cta: 'Lihat Prestasi ↗',
    },
  ],
};

export default function Home() {
  const { lang } = useApp();
  const home = getHomeContent(lang);
  const { profilePhotos = [] } = home;

  const blooms = ORBIT_BLOOMS[lang] || ORBIT_BLOOMS.en;
  const [activeIdx, setActiveIdx] = useState(0);
  const [photoIdx, setPhotoIdx] = useState(0);

  const manifestoRef = useRef(null);
  const { scrollYProgress: manifestoProgress } = useScroll({
    target: manifestoRef,
    offset: ['start end', 'end start'],
  });
  const mRow1X = useTransform(manifestoProgress, [0, 1], [-70, 80]);
  const mRow2X = useTransform(manifestoProgress, [0, 1], [80, -70]);
  const mRow3X = useTransform(manifestoProgress, [0, 1], [-50, 60]);

  const portraitRef = useRef(null);
  const { scrollYProgress: portraitProgress } = useScroll({
    target: portraitRef,
    offset: ['start end', 'end start'],
  });
  const archScale = useTransform(portraitProgress, [0, 0.5, 1], [0.94, 1.03, 0.97]);

  const activeBloom = blooms[activeIdx] || blooms[0];
  const currentPhoto = profilePhotos[photoIdx] || profilePhotos[0];

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') setActiveIdx((prev) => (prev + 1) % blooms.length);
      if (e.key === 'ArrowLeft') setActiveIdx((prev) => (prev - 1 + blooms.length) % blooms.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [blooms.length]);

  const ringRotation = -activeIdx * 60;

  return (
    <div className="alpine-home">
      {/* =========================================================
          SCENE 1: 100SVH FULL-BLEED WIND-REACTIVE SWISS MEADOW
         ========================================================= */}
      <BotanicalHeroCanvas availability={home.availability} />

      {/* =========================================================
          SCENE 2: INTRODUCTION FIRST — "HI, I'M OSANNA PATRICIA LIMBONG."
         ========================================================= */}
      <section ref={portraitRef} className="container alpine-arch-section">
        <div className="alpine-intro-showcase">
          <motion.div
            className="alpine-arch-copy"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mono alpine-intro-tag">
              <FlowerEmblem species="rose" size={18} />
              <span>{lang === 'id' ? 'PERKENALAN · OSANNA' : 'ABOUT ME · INTRODUCTION'}</span>
            </span>
            <h2 className="alpine-arch-title">{home.greeting}</h2>
            <p className="alpine-arch-text">{home.intro}</p>

            <div className="alpine-arch-links">
              <Link to="/about" className="mono alpine-arch-pill alpine-arch-pill--primary">
                02 · {lang === 'id' ? 'Profil & Keahlian ↗' : 'About & Toolkit ↗'}
              </Link>
              <Link to="/work" className="mono alpine-arch-pill">
                03 · {lang === 'id' ? 'Taman Proyek ↗' : 'Project Greenhouse ↗'}
              </Link>
              <Link to="/journey" className="mono alpine-arch-pill">
                04 · {lang === 'id' ? 'Perjalanan & Prestasi ↗' : 'Seasons of Journey ↗'}
              </Link>
            </div>
          </motion.div>

          {currentPhoto && (
            <motion.div className="alpine-portrait-stage" style={{ scale: archScale }}>
              <div className="alpine-portrait-aura" aria-hidden="true" />
              <div className="alpine-arch-corner alpine-arch-corner--tl" aria-hidden="true">
                <FlowerEmblem species="rose" size={54} />
              </div>
              <div className="alpine-arch-corner alpine-arch-corner--tr" aria-hidden="true">
                <FlowerEmblem species="buttercup" size={38} />
              </div>
              <div className="alpine-arch-corner alpine-arch-corner--br" aria-hidden="true">
                <FlowerEmblem species="edelweiss" size={62} />
              </div>

              <figure
                className="alpine-arch-window"
                onClick={() => setPhotoIdx((prev) => (prev + 1) % profilePhotos.length)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setPhotoIdx((prev) => (prev + 1) % profilePhotos.length);
                  }
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPhoto.src}
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    className="alpine-arch-img"
                    draggable="false"
                    initial={{ opacity: 0, scale: 1.07 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>

                <figcaption className="mono alpine-arch-overlay">
                  <span>
                    0{photoIdx + 1} / 0{profilePhotos.length}
                  </span>
                  <span>{currentPhoto.label}</span>
                </figcaption>
              </figure>

              {/* Interactive Frame Dots Below Portrait */}
              <div className="alpine-portrait-dots" role="tablist" aria-label="Portrait gallery">
                {profilePhotos.map((ph, idx) => (
                  <button
                    key={ph.src}
                    type="button"
                    role="tab"
                    aria-selected={idx === photoIdx}
                    className={`alpine-portrait-dot ${idx === photoIdx ? 'is-active' : ''}`}
                    onClick={() => setPhotoIdx(idx)}
                    aria-label={ph.label}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* =========================================================
          SCENE 3: SCROLL-SCRUBBED KINETIC MANIFESTO + DRAGGABLE BLOOMS
         ========================================================= */}
      <section ref={manifestoRef} className="alpine-manifesto">
        <div className="alpine-manifesto__stage">
          <motion.div
            className="alpine-float-chip alpine-float-chip--1"
            drag
            dragSnapToOrigin
            dragElastic={0.45}
            whileHover={{ scale: 1.08 }}
            whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          >
            <FlowerEmblem species="rose" size={32} />
            <span className="mono">Data &amp; Analytics</span>
          </motion.div>

          <motion.div
            className="alpine-float-chip alpine-float-chip--2"
            drag
            dragSnapToOrigin
            dragElastic={0.45}
            whileHover={{ scale: 1.08 }}
            whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          >
            <FlowerEmblem species="buttercup" size={32} />
            <span className="mono">Front-End Craft</span>
          </motion.div>

          <motion.div
            className="alpine-float-chip alpine-float-chip--3"
            drag
            dragSnapToOrigin
            dragElastic={0.45}
            whileHover={{ scale: 1.08 }}
            whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          >
            <FlowerEmblem species="edelweiss" size={32} />
            <span className="mono">IPB · GPA 3.63</span>
          </motion.div>

          <motion.div
            className="alpine-float-chip alpine-float-chip--4"
            drag
            dragSnapToOrigin
            dragElastic={0.45}
            whileHover={{ scale: 1.08 }}
            whileDrag={{ scale: 1.15, cursor: 'grabbing' }}
            transition={{ type: 'spring', stiffness: 320, damping: 18 }}
          >
            <FlowerEmblem species="gentian" size={32} />
            <span className="mono">Gemini AI Certified</span>
          </motion.div>

          <motion.div className="alpine-manifesto__line" style={{ x: mRow1X }}>
            {lang === 'id' ? 'MERANGKAI' : 'CULTIVATING'} <em>{lang === 'id' ? 'DATA' : 'DATA'}</em>
          </motion.div>
          <motion.div className="alpine-manifesto__line" style={{ x: mRow2X }}>
            <em>{lang === 'id' ? 'MENJADI' : 'INTO LIVING'}</em> {lang === 'id' ? 'KARYA' : 'BLOOMS'}
          </motion.div>
          <motion.div className="alpine-manifesto__line" style={{ x: mRow3X }}>
            {lang === 'id' ? 'YANG BERGERAK' : '& TACTILE'} <em>{lang === 'id' ? 'HIDUP' : 'CRAFT'}</em>
          </motion.div>
        </div>
      </section>

      {/* =========================================================
          SCENE 4: INTERACTIVE ROTATING SWISS BOUQUET ORBIT (Zero Tutorial Hint)
         ========================================================= */}
      <section className="container alpine-orbit-section">
        <div className="alpine-orbit-grid">
          <div className="alpine-orbit-stage" aria-label="Interactive Rotating Swiss Wildflower Wheel">
            <div className="alpine-orbit-ring-bg" aria-hidden="true" />

            <motion.div
              className="alpine-orbit-rotor"
              animate={{ rotate: ringRotation }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            >
              {blooms.map((item, idx) => {
                const angleDeg = idx * 60;
                const isSelected = idx === activeIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`alpine-orbit-node ${isSelected ? 'is-active' : ''}`}
                    style={{
                      transform: `rotate(${angleDeg}deg) translate(var(--orbit-r, 152px)) rotate(${-angleDeg - ringRotation}deg)`,
                    }}
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`${item.flowerName} — ${item.tag}`}
                  >
                    <FlowerEmblem species={item.species} size={isSelected ? 74 : 52} />
                  </button>
                );
              })}
            </motion.div>

            <div className="alpine-orbit-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeBloom.id}
                  className="alpine-orbit-center__inner"
                  initial={{ scale: 0.6, rotate: -25, opacity: 0 }}
                  animate={{ scale: 1, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.65, rotate: 20, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                >
                  <FlowerEmblem species={activeBloom.species} size={96} />
                  <span className="mono alpine-orbit-center__name">{activeBloom.flowerName}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="alpine-orbit-copy">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${lang}-${activeBloom.id}`}
                className="alpine-orbit-panel"
                initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ type: 'spring', stiffness: 280, damping: 24 }}
              >
                <div className="mono alpine-orbit-tag">
                  <span>{activeBloom.tag}</span>
                  <span>·</span>
                  <span>{activeBloom.stat}</span>
                </div>

                <h2 className="alpine-orbit-title">{activeBloom.title}</h2>
                <p className="alpine-orbit-body">{activeBloom.body}</p>

                <div className="alpine-orbit-actions">
                  <Link to={activeBloom.to} className="mono alpine-orbit-cta">
                    {activeBloom.cta}
                  </Link>
                  <div className="alpine-orbit-steppers">
                    <button
                      type="button"
                      className="mono"
                      onClick={() => setActiveIdx((activeIdx - 1 + blooms.length) % blooms.length)}
                      aria-label="Previous flower"
                    >
                      ←
                    </button>
                    <span className="mono">
                      0{activeIdx + 1} / 0{blooms.length}
                    </span>
                    <button
                      type="button"
                      className="mono"
                      onClick={() => setActiveIdx((activeIdx + 1) % blooms.length)}
                      aria-label="Next flower"
                    >
                      →
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* =========================================================
          SCENE 5: HOW I WORK & GENERAL BLOOMING STEM OVERVIEW
         ========================================================= */}
      <KineticGardenWidgets />
      <AnalyticsGardenChart />
    </div>
  );
}
