import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuroraSky from '../components/AuroraSky.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getHomeContent } from '../content/home.js';
import './Home.css';

const SLOWBAR_STATIONS = {
  en: [
    {
      id: 'reader',
      kind: 'book',
      color: 'matcha',
      railPos: 11,
      spineCode: 'VOL. 01',
      spineTitle: 'THE READER',
      icon: '📖',
      tag: 'SLOWBAR HOST · NICHE & BIO',
      title: 'I turn complex datasets into clear stories & build tactile web interfaces.',
      subtitle: 'Osanna Patricia Limbong — Software Engineering (TPL) at IPB University',
      body:
        'Welcome to my Slowbar—where analytical data mining meets warm, human-centered front-end engineering. Pull a book from the shelf or drop the needle on a vinyl record to inspect my work.',
      stats: [
        { k: 'TARGET ROLES', v: 'Data Analyst & Front-End' },
        { k: 'CAMPUS', v: 'IPB University (TPL)' },
        { k: 'STATUS', v: 'Open for Internship' },
      ],
      cta: { label: 'Open Full Library Book (/about) ↗', to: '/about' },
      vinylLabel: 'SIDE A · INTRO',
    },
    {
      id: 'ames',
      kind: 'vinyl',
      color: 'terracotta',
      railPos: 27,
      spineCode: 'LP · 01',
      spineTitle: 'AMES 81.9% R²',
      icon: '💿',
      tag: 'FLAGSHIP VINYL · DATA MINING & ML',
      title: 'Predicted housing prices across 2,930 properties with 81.94% R² accuracy.',
      subtitle: 'Multiple Linear Regression (MAE ±$20,849), rpart Decision Tree (72.7%), & K-Means',
      body:
        'Built an end-to-end R valuation pipeline cleaning 82 raw features, isolating Overall_Qual & Gr_Liv_Area as primary value drivers, and segmenting the market into 3 actionable K-Means buyer clusters.',
      stats: [
        { k: 'R² ACCURACY', v: '81.94% (MLR)' },
        { k: 'DATASET', v: '2,930 Properties' },
        { k: 'CLUSTERS', v: '3 K-Means Segments' },
      ],
      cta: { label: 'Spin Record & Try Live Simulator ↗', to: '/work/ames-housing' },
      vinylLabel: '45 RPM · AMES LP',
    },
    {
      id: 'brew',
      kind: 'cup',
      color: 'honey',
      railPos: 43,
      spineCode: 'MENU · 02',
      spineTitle: 'POUR-OVER',
      icon: '☕',
      tag: 'HOUSE SPECIAL · MEASURED IMPACT',
      title: 'Numbers brewed from real academic research, systems & treasury audits.',
      subtitle: 'Every project in this Slowbar is backed by verifiable outcomes—never filler.',
      body:
        'From analyzing thousands of residential records in RStudio to auditing 280+ financial transactions worth Rp 26.19M and shipping a live corporate logistics site during my internship.',
      stats: [
        { k: 'RECORDS MINED', v: '2,930 Homes' },
        { k: 'SHIPPED WORKS', v: '05 Case Studies' },
        { k: 'AUDITED LEDGER', v: '280+ Tx (Rp 26.19M)' },
      ],
      cta: { label: 'Browse Full Vinyl Jukebox (/work) ↗', to: '/work' },
      vinylLabel: 'HOUSE BLEND · 2026',
    },
    {
      id: 'systems',
      kind: 'vinyl',
      color: 'sage',
      railPos: 59,
      spineCode: 'LP · 02',
      spineTitle: 'WEB & SDD',
      icon: '🏛️',
      tag: 'SIDE B VINYL · SYSTEM ARCHITECTURE & WEB',
      title: 'Engineered 4-Tier IEEE 830 architectures, Midtrans POS & Kost dashboards.',
      subtitle: 'AlumniTPL Career Portal, Dthanasha Kost Laravel MVC, & Cafier React Native',
      body:
        'Designed normalized relational schemas, 7-module Requirements Traceability Matrices (RTM), and responsive Tailwind/React/Laravel interfaces that digitize manual operations.',
      stats: [
        { k: 'ARCHITECTURE', v: '4-Tier Layered SDD' },
        { k: 'UI SPECS', v: '12 Mockups + 7 RTM' },
        { k: 'STACK', v: 'Laravel 12 · React' },
      ],
      cta: { label: 'Inspect AlumniTPL SDD Spec ↗', to: '/work/alumni-portal' },
      vinylLabel: '33 RPM · SYSTEMS',
    },
    {
      id: 'academic',
      kind: 'book',
      color: 'burgundy',
      railPos: 75,
      spineCode: 'VOL. 02',
      spineTitle: 'GPA 3.63',
      icon: '🎓',
      tag: 'ARCHIVE TRANSCRIPT · EDUCATION & TOOLKIT',
      title: '3.63 / 4.00 Cumulative GPA in Software Engineering Technology at IPB.',
      subtitle: 'Combining statistical programming (Python, R, SQL) with modern front-end craft',
      body:
        'Trained across exploratory data analysis, machine learning, database normalization, software design documentation (DPPL), and interactive web/mobile development.',
      stats: [
        { k: 'CUMULATIVE GPA', v: '3.63 / 4.00' },
        { k: 'DATA STACK', v: 'Python · R · SQL' },
        { k: 'WEB STACK', v: 'React · Laravel · JS' },
      ],
      cta: { label: 'View Card Catalog Toolkit (/about) ↗', to: '/about' },
      vinylLabel: 'IPB ARCHIVE · TPL',
    },
    {
      id: 'journey',
      kind: 'book',
      color: 'walnut',
      railPos: 89,
      spineCode: 'VOL. 03',
      spineTitle: 'LOGBOOK',
      icon: '🏆',
      tag: 'TRAVELER LOGBOOK · INTERNSHIP & AWARDS',
      title: 'Shipped kctjakarta.com in industry & won 2× 2nd Place Short Movie Awards.',
      subtitle: 'PT KCT Logistics Intern · 5 Campus Leadership Roles · Google Gemini Certified',
      body:
        'Delivered a live company profile website and ~20 commercial quotations at PT Kharisma Cakrawala Transportasi, managed organizational treasuries, and earned international & national competition honors.',
      stats: [
        { k: 'LIVE SITE', v: 'kctjakarta.com' },
        { k: 'HONORS', v: '2× 2nd Place Awards' },
        { k: 'CERTIFIED', v: 'Google Gemini AI' },
      ],
      cta: { label: 'Read Full Café Logbook (/journey) ↗', to: '/journey' },
      vinylLabel: 'FIELD LOG · 2025–26',
    },
  ],
  id: [
    {
      id: 'reader',
      kind: 'book',
      color: 'matcha',
      railPos: 11,
      spineCode: 'VOL. 01',
      spineTitle: 'PROFIL',
      icon: '📖',
      tag: 'TUAN RUMAH SLOWBAR · FOKUS & PROFIL',
      title: 'Mengolah data kompleks jadi cerita terukur & antarmuka web yang hangat.',
      subtitle: 'Osanna Patricia Limbong — Teknologi Rekayasa Perangkat Lunak (TPL) IPB University',
      body:
        'Selamat datang di Slowbar-ku—tempat analisis data bertemu kerajinan front-end yang interaktif. Klik buku di rak atau piringan vinyl di meja untuk menurunkan lampu gantung dan membaca isinya.',
      stats: [
        { k: 'TARGET PERAN', v: 'Data Analyst & Front-End' },
        { k: 'KAMPUS', v: 'IPB University (TPL)' },
        { k: 'STATUS', v: 'Siap Magang 2026' },
      ],
      cta: { label: 'Buka Buku Perpustakaan (/about) ↗', to: '/about' },
      vinylLabel: 'SIDE A · INTRO',
    },
    {
      id: 'ames',
      kind: 'vinyl',
      color: 'terracotta',
      railPos: 27,
      spineCode: 'LP · 01',
      spineTitle: 'AMES 81.9% R²',
      icon: '💿',
      tag: 'VINYL UNGGULAN · DATA MINING & ML',
      title: 'Memprediksi harga 2.930 properti dengan akurasi R² 81,94% di RStudio.',
      subtitle: 'Regresi Linear Berganda (MAE ±$20.849), Decision Tree rpart (72,7%), & K-Means',
      body:
        'Membangun pipeline valuasi dari 82 variabel mentah, mengidentifikasi Overall_Qual & Gr_Liv_Area sebagai penentu harga utama, dan memetakan 3 segmen pasar K-Means untuk Sniper Marketing.',
      stats: [
        { k: 'AKURASI R²', v: '81,94% (MLR)' },
        { k: 'DATASET', v: '2.930 Properti' },
        { k: 'KLASTER', v: '3 Segmen K-Means' },
      ],
      cta: { label: 'Putar Vinyl & Coba Simulator Live ↗', to: '/work/ames-housing' },
      vinylLabel: '45 RPM · AMES LP',
    },
    {
      id: 'brew',
      kind: 'cup',
      color: 'honey',
      railPos: 43,
      spineCode: 'MENU · 02',
      spineTitle: 'RACIKAN',
      icon: '☕',
      tag: 'SAJIAN UTAMA · DAMPAK TERUKUR',
      title: 'Angka nyata dari riset akademik, arsitektur sistem, dan audit keuangan.',
      subtitle: 'Setiap karya di Slowbar ini memiliki bukti metrik asli—bukan sekadar klaim.',
      body:
        'Mulai dari menambang ribuan data properti di RStudio, mengaudit 280+ transaksi senilai Rp 26,19 Juta, hingga merilis website perusahaan logistik secara live saat magang.',
      stats: [
        { k: 'DATA DIANALISIS', v: '2.930 Properti' },
        { k: 'STUDI KASUS', v: '05 Proyek Selesai' },
        { k: 'TRANSAKSI AUDIT', v: '280+ Tx (Rp 26,19Jt)' },
      ],
      cta: { label: 'Buka Jukebox Vinyl (/work) ↗', to: '/work' },
      vinylLabel: 'HOUSE BLEND · 2026',
    },
    {
      id: 'systems',
      kind: 'vinyl',
      color: 'sage',
      railPos: 59,
      spineCode: 'LP · 02',
      spineTitle: 'WEB & SDD',
      icon: '🏛️',
      tag: 'VINYL SIDE B · ARSITEKTUR SISTEM & WEB',
      title: 'Merancang arsitektur 4-Tier IEEE 830, kasir Midtrans & dashboard kost.',
      subtitle: 'Portal Karier AlumniTPL, Dthanasha Kost Laravel MVC, & Cafier React Native',
      body:
        'Menyusun skema ERD ternormalisasi, matriks RTM 7 modul, serta antarmuka responsif menggunakan React, Laravel 12, dan Tailwind CSS.',
      stats: [
        { k: 'ARSITEKTUR', v: '4-Tier Layered SDD' },
        { k: 'SPESIFIKASI', v: '12 Layar + 7 RTM' },
        { k: 'TEKNOLOGI', v: 'Laravel 12 · React' },
      ],
      cta: { label: 'Lihat Spesifikasi DPPL AlumniTPL ↗', to: '/work/alumni-portal' },
      vinylLabel: '33 RPM · SYSTEMS',
    },
    {
      id: 'academic',
      kind: 'book',
      color: 'burgundy',
      railPos: 75,
      spineCode: 'VOL. 02',
      spineTitle: 'IPK 3.63',
      icon: '🎓',
      tag: 'TRANSKRIP ARSIP · PENDIDIKAN & TOOLKIT',
      title: 'IPK Kumulatif 3,63 / 4,00 Teknologi Rekayasa Perangkat Lunak di IPB.',
      subtitle: 'Memadukan pemrograman statistik (Python, R, SQL) dengan rekayasa front-end',
      body:
        'Terlatih dalam eksplorasi data, machine learning, perancangan basis data, dokumen DPPL/SDD, hingga pengembangan aplikasi web dan mobile.',
      stats: [
        { k: 'IPK KUMULATIF', v: '3,63 / 4,00' },
        { k: 'DATA STACK', v: 'Python · R · SQL' },
        { k: 'WEB STACK', v: 'React · Laravel · JS' },
      ],
      cta: { label: 'Buka Laci Katalog Skill (/about) ↗', to: '/about' },
      vinylLabel: 'IPB ARCHIVE · TPL',
    },
    {
      id: 'journey',
      kind: 'book',
      color: 'walnut',
      railPos: 89,
      spineCode: 'VOL. 03',
      spineTitle: 'LOGBOOK',
      icon: '🏆',
      tag: 'LOGBOOK PERJALANAN · MAGANG & PRESTASI',
      title: 'Merilis kctjakarta.com di industri & meraih 2× Juara 2 Film Pendek.',
      subtitle: 'Magang PT KCT · 5 Peran Kepemimpinan Kampus · Google Gemini Certified',
      body:
        'Membangun website profil perusahaan live dan ~20 dokumen kuotasi di PT Kharisma Cakrawala Transportasi, mengelola kebendaharaan acara, serta meraih penghargaan internasional & nasional.',
      stats: [
        { k: 'WEBSITE LIVE', v: 'kctjakarta.com' },
        { k: 'PRESTASI', v: '2× Juara 2 Kompetisi' },
        { k: 'SERTIFIKASI', v: 'Google Gemini AI' },
      ],
      cta: { label: 'Baca Logbook Perjalanan (/journey) ↗', to: '/journey' },
      vinylLabel: 'FIELD LOG · 2025–26',
    },
  ],
};

const CRATE_SLEEVES = {
  en: [
    {
      id: 'ames-housing',
      code: 'SIDE A · 01',
      metric: '81.94% R²',
      sub: '2,930 Homes Analyzed',
      title: 'Ames Housing Valuation & K-Means',
      role: 'Data Analyst · RStudio',
      color: 'matcha',
      to: '/work/ames-housing',
    },
    {
      id: 'canvar',
      code: 'BONUS · 02',
      metric: '5+ 3D Assets',
      sub: 'Vuforia Spatial AR',
      title: 'canvAR Business Model Canvas',
      role: '3D Modeler & AR Dev',
      color: 'terracotta',
      to: '/work/canvar',
    },
    {
      id: 'cafier',
      code: 'SIDE B · 03',
      metric: 'Midtrans API',
      sub: 'Mobile + Web POS',
      title: 'Cafier Smart Ordering Ecosystem',
      role: 'Mobile & Front-End Dev',
      color: 'honey',
      to: '/work/cafier',
    },
    {
      id: 'dthanasha-kost',
      code: 'SIDE B · 04',
      metric: '100% Digital',
      sub: 'Laravel 12 MVC',
      title: 'Dthanasha Kost Property System',
      role: 'Front-End & UI Designer',
      color: 'sage',
      to: '/work/dthanasha-kost',
    },
    {
      id: 'alumni-portal',
      code: 'SIDE B · 05',
      metric: '4-Tier SDD',
      sub: '12 UI + 7 RTM Modules',
      title: 'AlumniTPL Career & Tracer Portal',
      role: 'System Analyst & UI/UX',
      color: 'burgundy',
      to: '/work/alumni-portal',
    },
  ],
  id: [
    {
      id: 'ames-housing',
      code: 'SIDE A · 01',
      metric: '81,94% R²',
      sub: '2.930 Properti Dianalisis',
      title: 'Valuasi & Klastering Ames Housing',
      role: 'Data Analyst · RStudio',
      color: 'matcha',
      to: '/work/ames-housing',
    },
    {
      id: 'canvar',
      code: 'BONUS · 02',
      metric: '5+ Aset 3D',
      sub: 'Vuforia Spatial AR',
      title: 'canvAR Business Model Canvas',
      role: '3D Modeler & AR Dev',
      color: 'terracotta',
      to: '/work/canvar',
    },
    {
      id: 'cafier',
      code: 'SIDE B · 03',
      metric: 'Midtrans API',
      sub: 'Mobile + Web POS',
      title: 'Ekosistem Pemesanan Cafier',
      role: 'Mobile & Front-End Dev',
      color: 'honey',
      to: '/work/cafier',
    },
    {
      id: 'dthanasha-kost',
      code: 'SIDE B · 04',
      metric: '100% Digital',
      sub: 'Laravel 12 MVC',
      title: 'Sistem Manajemen Dthanasha Kost',
      role: 'Front-End & UI Designer',
      color: 'sage',
      to: '/work/dthanasha-kost',
    },
    {
      id: 'alumni-portal',
      code: 'SIDE B · 05',
      metric: '4-Tier SDD',
      sub: '12 Layar + 7 Modul RTM',
      title: 'Portal Karier & Tracer AlumniTPL',
      role: 'System Analyst & UI/UX',
      color: 'burgundy',
      to: '/work/alumni-portal',
    },
  ],
};

export default function Home() {
  const { lang } = useApp();
  const home = getHomeContent(lang);
  const { profilePhotos = [] } = home;

  const stations = SLOWBAR_STATIONS[lang] || SLOWBAR_STATIONS.en;
  const crateSleeves = CRATE_SLEEVES[lang] || CRATE_SLEEVES.en;

  const [activeId, setActiveId] = useState('reader');
  const [isLifting, setIsLifting] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [crateOpen, setCrateOpen] = useState(true);

  const activeStation = stations.find((s) => s.id === activeId) || stations[0];
  const currentPhoto = profilePhotos[photoIndex] || profilePhotos[0];

  const handleSelectStation = (id) => {
    if (id === activeId) return;
    setIsLifting(true);
    setActiveId(id);
    window.setTimeout(() => setIsLifting(false), 520);
  };

  return (
    <div className="slowbar-home">
      {/* =========================================================
          STAGE 1: Interactive Slowbar Café Shelf & Overhead Brass Picker Lamp
         ========================================================= */}
      <section className="slowbar-stage hero-stage">
        <AuroraSky />

        <div className="container slowbar-stage__container">
          {/* Top Café Header Strip */}
          <div className="slowbar-stage__intro-bar">
            <a href="#contact" className="mono slowbar-status-pill">
              <span className="slowbar-status-dot" />
              <span>{home.availability}</span>
            </a>
            <span className="mono slowbar-stage__hint">
              {lang === 'id'
                ? '✦ KLIK BUKU, VINYL, ATAU KOPI DI MEJA UNTUK MENGGERAKKAN LAMPU PENJEPIT'
                : '✦ CLICK ANY BOOK, VINYL, OR CUP ON THE COUNTER TO MOVE THE OVERHEAD PICKER LAMP'}
            </span>
          </div>

          {/* Interactive Slowbar Gantry Rail, Hanging Brass Lamp Picker & Wooden Countertop */}
          <div className="slowbar-booth">
            {/* Giant Background Display Word (like @ui.debbie's PORTFOLIO backdrop) */}
            <div className="slowbar-booth__backdrop-word" aria-hidden="true">
              SLOWBAR
            </div>

            {/* Overhead Brass Rail & Sliding Lamp / Record Picker Arm */}
            <div className="slowbar-rail" aria-hidden="true">
              <div className="slowbar-rail__bar" />
              <div
                className={`slowbar-picker ${isLifting ? 'is-grabbing' : ''}`}
                style={{ left: `${activeStation.railPos}%` }}
              >
                <div className="slowbar-picker__carriage" />
                <div className="slowbar-picker__cord" />
                <div className="slowbar-picker__lamp">
                  <span className="slowbar-picker__claw-left" />
                  <span className="slowbar-picker__bulb" />
                  <span className="slowbar-picker__claw-right" />
                </div>
                <div className="slowbar-picker__beam" />
              </div>
            </div>

            {/* The Physical Objects on the Slowbar Wooden Countertop */}
            <div
              className="slowbar-counter-items"
              role="tablist"
              aria-label={lang === 'id' ? 'Objek Meja Slowbar' : 'Slowbar Counter Objects'}
            >
              {stations.map((item) => {
                const isSelected = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    className={`slowbar-object slowbar-object--${item.kind} slowbar-object--${item.color} ${
                      isSelected ? 'is-picked' : ''
                    }`}
                    onClick={() => handleSelectStation(item.id)}
                  >
                    <span className="mono slowbar-object__code">{item.spineCode}</span>
                    <span className="slowbar-object__icon" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="slowbar-object__title">{item.spineTitle}</span>
                    {item.kind === 'vinyl' && (
                      <span className="slowbar-object__disc-edge" aria-hidden="true" />
                    )}
                    {item.kind === 'cup' && (
                      <span className="slowbar-object__steam" aria-hidden="true">
                        ~ ~
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Wooden Countertop Plank */}
            <div className="slowbar-wooden-plank" aria-hidden="true">
              <span className="mono">
                ☕ OSANNA PATRICIA LIMBONG · ANALOG LISTENING BAR &amp; READING ARCHIVE · EST. 2026
              </span>
            </div>
          </div>

          {/* =========================================================
              INTERACTIVE LISTENING & READING TABLE (Shows the Picked Object!)
             ========================================================= */}
          <div className={`slowbar-reading-desk slowbar-reading-desk--${activeStation.color}`}>
            {/* Left Column: Live Turntable Platter + Taped Café Guestbook Polaroid */}
            <div className="slowbar-desk__left">
              {/* Interactive Turntable Platter */}
              <div className="slowbar-turntable-card">
                <div className="mono slowbar-turntable-card__head">
                  <span>💿 {activeStation.vinylLabel}</span>
                  <span>HI-FI · 45 RPM</span>
                </div>

                <div className="slowbar-turntable-card__body">
                  <div className="slowbar-platter-wrap">
                    <div className="slowbar-platter-disc">
                      <div className="slowbar-platter-grooves" />
                      <div className="slowbar-platter-label">
                        <span className="mono">{activeStation.spineCode}</span>
                      </div>
                    </div>
                    <div className="slowbar-platter-tonearm" aria-hidden="true" />
                  </div>

                  {/* Taped Polaroid Coaster on the Table */}
                  {currentPhoto && (
                    <div
                      className="slowbar-polaroid-coaster"
                      onClick={() => setPhotoIndex((prev) => (prev + 1) % profilePhotos.length)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setPhotoIndex((prev) => (prev + 1) % profilePhotos.length);
                        }
                      }}
                      title={
                        lang === 'id'
                          ? 'Klik foto polaroid untuk ganti pose!'
                          : 'Click polaroid to switch pose!'
                      }
                    >
                      <span className="slowbar-masking-tape" aria-hidden="true" />
                      <div className="slowbar-polaroid-coaster__img-wrap">
                        <img
                          src={currentPhoto.src}
                          alt={currentPhoto.alt}
                          className="slowbar-polaroid-coaster__img"
                          draggable="false"
                        />
                      </div>
                      <span className="mono slowbar-polaroid-coaster__caption">
                        ✦ {currentPhoto.label}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Open Book Spread / Liner Notes of the Picked Object */}
            <div className="slowbar-desk__right">
              <div className="slowbar-open-book">
                <div className="slowbar-open-book__header">
                  <span className="mono slowbar-open-book__tag">
                    {activeStation.icon} {activeStation.tag}
                  </span>
                  <span className="mono slowbar-open-book__code">
                    ARCHIVE #{activeStation.spineCode}
                  </span>
                </div>

                <h1 className="slowbar-open-book__title">{activeStation.title}</h1>
                <p className="slowbar-open-book__subtitle">{activeStation.subtitle}</p>
                <p className="slowbar-open-book__body">{activeStation.body}</p>

                {/* 3 Stamped Library Index Coasters */}
                <div className="slowbar-open-book__stats">
                  {activeStation.stats.map((st) => (
                    <div key={st.k} className="slowbar-stat-coaster">
                      <span className="mono slowbar-stat-coaster__k">{st.k}</span>
                      <span className="slowbar-stat-coaster__v">{st.v}</span>
                    </div>
                  ))}
                </div>

                <div className="slowbar-open-book__footer">
                  <Link to={activeStation.cta.to} className="slowbar-open-book__cta">
                    <span>{activeStation.cta.label}</span>
                  </Link>

                  <div className="slowbar-open-book__quick-nav">
                    {stations.map((s, idx) => (
                      <button
                        key={s.id}
                        type="button"
                        className={`mono slowbar-quick-dot ${s.id === activeId ? 'is-active' : ''}`}
                        onClick={() => handleSelectStation(s.id)}
                        title={s.spineTitle}
                      >
                        0{idx + 1}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          STAGE 2: Interactive Unboxing Vinyl & Archive Crate
          (Inspired by Reel 2's 3D box that pops open & fans out 5 metric cards!)
         ========================================================= */}
      <section className="band band--paper-2 slowbar-crate-section" id="explore">
        <div className="container slowbar-crate-container">
          <div className="slowbar-crate-header">
            <div>
              <span className="mono slowbar-crate-eyebrow">
                ✦ {lang === 'id' ? 'KOTAK KOLEKSI VINYL & ARSIP' : 'THE UNBOXING RECORD CRATE'}
              </span>
              <h2 className="slowbar-crate-title">
                {lang === 'id'
                  ? 'Karya yang kuseduh, dan angka yang berhasil digerakkan.'
                  : 'Things I brewed & shipped, and the numbers they moved.'}
              </h2>
            </div>

            <button
              type="button"
              className="mono slowbar-crate-toggle-btn"
              onClick={() => setCrateOpen((prev) => !prev)}
            >
              {crateOpen
                ? lang === 'id'
                  ? '📦 Tutup Kotak Vinyl'
                  : '📦 Close Record Crate'
                : lang === 'id'
                  ? '✨ Buka & Sebarkan 5 Vinyl'
                  : '✨ Unbox & Fan Out 5 Records'}
            </button>
          </div>

          {/* Interactive 3D Record Crate that fans out 5 colorful vertical cards */}
          <div className={`slowbar-unbox-stage ${crateOpen ? 'is-open' : 'is-closed'}`}>
            <div className="slowbar-fanned-cards">
              {crateSleeves.map((sleeve, idx) => (
                <Link
                  key={sleeve.id}
                  to={sleeve.to}
                  className={`slowbar-fan-card slowbar-fan-card--${sleeve.color}`}
                  style={{ '--fan-idx': idx }}
                >
                  <span className="slowbar-masking-tape" aria-hidden="true" />
                  <div className="slowbar-fan-card__top">
                    <span className="mono slowbar-fan-card__code">{sleeve.code}</span>
                    <span className="slowbar-fan-card__disc" aria-hidden="true">
                      💿
                    </span>
                  </div>

                  <div className="slowbar-fan-card__metric-block">
                    <span className="slowbar-fan-card__metric">{sleeve.metric}</span>
                    <span className="mono slowbar-fan-card__sub">{sleeve.sub}</span>
                  </div>

                  <div className="slowbar-fan-card__bottom">
                    <h3 className="slowbar-fan-card__title">{sleeve.title}</h3>
                    <span className="mono slowbar-fan-card__role">{sleeve.role} ↗</span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Physical 3D Wooden Crate Base */}
            <div
              className="slowbar-wooden-crate"
              onClick={() => setCrateOpen((prev) => !prev)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setCrateOpen((prev) => !prev);
                }
              }}
            >
              <div className="slowbar-wooden-crate__lip" />
              <div className="slowbar-wooden-crate__front">
                <span className="mono slowbar-wooden-crate__stamp">
                  OSANNA’S VINYL &amp; DATA ARCHIVE · CRATE #01–05
                </span>
                <span className="mono slowbar-wooden-crate__hint">
                  {crateOpen
                    ? lang === 'id'
                      ? 'Klik kartu di atas untuk buka studi kasus · Klik kotak untuk melipat'
                      : 'Click any record card above to open case study · Click crate to fold'
                    : lang === 'id'
                      ? '✦ KLIK KOTAK KAYU INI UNTUK MEMBUKA 5 PIRINGAN PROYEK'
                      : '✦ CLICK THIS WOODEN CRATE TO UNBOX 5 PROJECT RECORDS'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
