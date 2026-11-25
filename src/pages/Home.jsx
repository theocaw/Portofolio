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
      title: 'Geospatial ETL, regression modeling & K-Means segmentation.',
      body: '30,903 normalized Jabodetabek healthcare records for Medigo & 81.94% R² validated property valuation on Ames Housing.',
      stat: 'Python · R · SQL',
      to: '/work',
      cta: 'Inspect Data Work ↗',
    },
    {
      id: 'frontend',
      num: '03',
      species: 'buttercup',
      flowerName: 'Buttercup',
      tag: '03 / WEB & SYSTEMS',
      title: 'Layered architectures & responsive full-stack experiences.',
      body: 'From 4-tier IEEE 830 specifications and 3NF ERDs to Laravel 13 APIs, Gemini AI assistants, and React motion UIs.',
      stat: 'React · Laravel · Tailwind',
      to: '/work',
      cta: 'Enter Flower Exhibition ↗',
    },
    {
      id: 'education',
      num: '04',
      species: 'gentian',
      flowerName: 'Blue Gentian',
      tag: '04 / EDUCATION',
      title: '3.63 / 4.00 GPA in Software Engineering Technology (IPB).',
      body: 'Vocational School of IPB University — grounded in databases, data mining, full-stack engineering, and 3D AR.',
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
      title: 'Industry web delivery & transparent treasury governance.',
      body: 'Shipped live corporate site kctjakarta.com during PT KCT internship and audited 280+ transactions (Rp 26.19M).',
      stat: 'PT KCT · 5 Campus Roles',
      to: '/journey',
      cta: 'Walk Alpine Trail ↗',
    },
    {
      id: 'honors',
      num: '06',
      species: 'poppy',
      flowerName: 'Alpine Poppy',
      tag: '06 / HONORS',
      title: 'International competition awards & Google Gemini AI Cert.',
      body: '2× 2nd Place Short Movie (Portal 7 Intl & SEMNASA National), Business Plan Semifinalist & Google Gemini Certified.',
      stat: 'Google Gemini Certified',
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
      title: 'ETL geospasial, pemodelan regresi & segmentasi K-Means.',
      body: '30.903 baris data faskes Jabodetabek untuk Medigo & akurasi R² 81,94% pada valuasi properti Ames Housing.',
      stat: 'Python · R · SQL',
      to: '/work',
      cta: 'Lihat Studi Kasus ↗',
    },
    {
      id: 'frontend',
      num: '03',
      species: 'buttercup',
      flowerName: 'Buttercup',
      tag: '03 / WEB & SISTEM',
      title: 'Arsitektur berlapis & aplikasi web full-stack responsif.',
      body: 'Dari spesifikasi DPPL 4-tier dan ERD 3NF hingga API Laravel 13, asisten Gemini AI, dan UI interaktif React.',
      stat: 'React · Laravel · Tailwind',
      to: '/work',
      cta: 'Masuk Pameran Proyek ↗',
    },
    {
      id: 'education',
      num: '04',
      species: 'gentian',
      flowerName: 'Gentian Biru',
      tag: '04 / PENDIDIKAN',
      title: 'IPK 3,63 / 4,00 Teknologi Rekayasa Perangkat Lunak (IPB).',
      body: 'Sekolah Vokasi IPB University — mendalami basis data, data mining, rekayasa perangkat lunak, dan 3D AR.',
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
      title: 'Pengembangan web industri & audit tata kelola keuangan.',
      body: 'Merilis website live kctjakarta.com saat magang PT KCT serta mengaudit 280+ transaksi (Rp 26,19 Juta).',
      stat: 'PT KCT · 5 Organisasi',
      to: '/journey',
      cta: 'Susuri Jalur Alpen ↗',
    },
    {
      id: 'honors',
      num: '06',
      species: 'poppy',
      flowerName: 'Poppy Alpen',
      tag: '06 / PRESTASI',
      title: 'Penghargaan kompetisi internasional & Sertifikasi Gemini AI.',
      body: '2× Juara 2 Film Pendek (Portal 7 Intl & SEMNASA), Semifinalis Business Plan & Google Gemini Certified Student.',
      stat: 'Google Gemini Certified',
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
  const archScale = useTransform(portraitProgress, [0, 0.5, 1], [0.92, 1.03, 0.96]);

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
          SCENE 2: SCROLL-SCRUBBED KINETIC MANIFESTO + DRAGGABLE BLOOMS
          (Reel 1 & Reel 2 Motion-Graphic Sequence — ZERO Boxed Grid)
         ========================================================= */}
      <section ref={manifestoRef} className="alpine-manifesto">
        <div className="alpine-manifesto__hint mono">
          {lang === 'id'
            ? 'TARIK & LEMPAR BUNGA-BUNGA DI BAWAH INI — MEREKA MEMBAL DENGAN FISIKA PEGAS'
            : 'GRAB & FLING ANY FLOATING BLOOM BELOW — ELASTIC SPRING PHYSICS'}
        </div>

        <div className="alpine-manifesto__stage">
          {/* Draggable Interactive Floating Botanical Chips (Reel 1 playful motion) */}
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
            <span className="mono">3,069 Faskes ETL</span>
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
            <span className="mono">81.94% R² Ames</span>
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

          {/* Giant Scroll-Scrubbed Kinetic Serif Lines */}
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
          SCENE 3: INTERACTIVE ROTATING SWISS BOUQUET ORBIT
          (Open-Air Orbital Flower Wheel — Zero Rectangular Card Wall)
         ========================================================= */}
      <section className="container alpine-orbit-section">
        <div className="alpine-orbit-grid">
          {/* Left: Rotating 6-Flower Botanical Orbit Wheel */}
          <div className="alpine-orbit-stage" aria-label="Interactive Rotating Swiss Wildflower Wheel">
            <div className="alpine-orbit-ring-bg" aria-hidden="true" />

            {/* Rotating Orbit of 6 Flowers */}
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

            {/* Center Blooming Emblem */}
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

          {/* Right: Open Editorial Typography Reveal (No heavy boxed frame) */}
          <div className="alpine-orbit-copy">
            <span className="mono alpine-orbit-eyebrow">
              {lang === 'id'
                ? 'PUTAR RODA BUNGA ALPEN · KLIK ATAU TEKAN ← / →'
                : 'SPIN THE ALPINE FLOWER WHEEL · CLICK OR PRESS ← / →'}
            </span>

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
          SCENE 4: KINETIC ANIME.JS STUDIO & LIVING FLOWER DATA CHART
         ========================================================= */}
      <KineticGardenWidgets />
      <AnalyticsGardenChart />

      {/* =========================================================
          SCENE 5: ARCHED CONSERVATORY WINDOW PORTRAIT & STORY
         ========================================================= */}
      <section ref={portraitRef} className="container alpine-arch-section">
        <div className="alpine-arch-grid">
          <motion.div
            className="alpine-arch-copy"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mono kissa-eyebrow">
              {lang === 'id' ? 'PENJAGA TAMAN · OSANNA' : 'MEET THE GARDEN KEEPER'}
            </span>
            <h2 className="alpine-arch-title">{home.greeting}</h2>
            <p className="alpine-arch-text">{home.intro}</p>

            <div className="alpine-arch-links">
              <Link to="/about" className="mono alpine-arch-pill">
                02 · {lang === 'id' ? 'Paviliun Profil ↗' : 'Conservatory Profile ↗'}
              </Link>
              <Link to="/work" className="mono alpine-arch-pill">
                03 · {lang === 'id' ? 'Pameran Proyek ↗' : 'Flower Exhibition ↗'}
              </Link>
              <Link to="/journey" className="mono alpine-arch-pill">
                04 · {lang === 'id' ? 'Jalur Alpen ↗' : 'Alpine Trail ↗'}
              </Link>
            </div>
          </motion.div>

          {currentPhoto && (
            <motion.figure
              className="alpine-arch-frame-wrap"
              style={{ scale: archScale }}
              onClick={() => setPhotoIdx((prev) => (prev + 1) % profilePhotos.length)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setPhotoIdx((prev) => (prev + 1) % profilePhotos.length);
                }
              }}
              title={lang === 'id' ? 'Klik untuk ganti potret' : 'Click arch to cycle portrait'}
            >
              <div className="alpine-arch-corner alpine-arch-corner--tl" aria-hidden="true">
                <FlowerEmblem species="rose" size={48} />
              </div>
              <div className="alpine-arch-corner alpine-arch-corner--br" aria-hidden="true">
                <FlowerEmblem species="edelweiss" size={56} />
              </div>

              <div className="alpine-arch-window">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentPhoto.src}
                    src={currentPhoto.src}
                    alt={currentPhoto.alt}
                    className="alpine-arch-img"
                    draggable="false"
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>
              </div>

              <figcaption className="mono alpine-arch-caption">
                <span>0{photoIdx + 1} / 0{profilePhotos.length}</span>
                <span>{currentPhoto.label}</span>
              </figcaption>
            </motion.figure>
          )}
        </div>
      </section>
    </div>
  );
}
