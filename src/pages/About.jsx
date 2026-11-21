import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { getAboutContent } from '../content/about.js';
import './About.css';

const SEAL_STAMPS = {
  en: [
    'OFFICIAL RECORD · CLICK TO VERIFY',
    'VERIFIED · CUM LAUDE TRACK',
    'VERIFIED · DATA & SOFTWARE ENG.',
    'VERIFIED · VOCATIONAL IPB UNIVERSITY',
  ],
  id: [
    'CATATAN RESMI · KLIK UNTUK VERIFIKASI',
    'TERVERIFIKASI · JALUR CUM LAUDE',
    'TERVERIFIKASI · DATA & RPL',
    'TERVERIFIKASI · SEKOLAH VOKASI IPB',
  ],
};

export default function About() {
  const { lang } = useApp();
  const about = getAboutContent(lang);
  const { intro, profile, education, toolkit, workInvitation } = about;

  const [stampIdx, setStampIdx] = useState(0);
  const [stamping, setStamping] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(0); // 0, 1, 2, or 'all'
  const [selectedTool, setSelectedTool] = useState(null);

  const stamps = SEAL_STAMPS[lang] || SEAL_STAMPS.en;

  const handleStamp = () => {
    setStampIdx((prev) => (prev + 1) % stamps.length);
    setStamping(false);
    window.requestAnimationFrame(() => setStamping(true));
  };

  return (
    <div className="kissa-about">
      {/* Header */}
      <section className="container kissa-about-hero">
        <span className="mono kissa-eyebrow">
          {lang === 'id' ? '02 / TENTANG · PERPUSTAKAAN & PROFIL' : '02 / ABOUT · THE ARCHIVAL LIBRARY'}
        </span>
        <h1 className="kissa-about-hero__title">{intro.headline}</h1>
        <p className="kissa-about-hero__desc">{intro.description}</p>
      </section>

      {/* =========================================================
          CENTERPIECE 1: OPEN CLOTH-BOUND HARDCOVER MONOGRAPH ON WALNUT DESK
         ========================================================= */}
      <section className="band band--paper-2 kissa-desk-band">
        <div className="container">
          <div className="kissa-open-monograph">
            {/* Left Page: Folio 01 — Profile & Direction */}
            <div className="kissa-folio kissa-folio--left">
              <div className="mono kissa-folio__head">
                <span>CHAPTER I · {profile.label}</span>
                <span>FOLIO 01</span>
              </div>

              <h2 className="kissa-folio__title">{profile.title}</h2>

              <div className="kissa-folio__prose">
                {profile.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <div className="kissa-focus-row">
                {profile.focus.map((f) => (
                  <div key={f.label} className="kissa-focus-box">
                    <span className="mono kissa-focus-box__k">{f.label}</span>
                    <strong className="kissa-focus-box__v">{f.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* Center Recessed Book Spine & Silk Bookmark Ribbon */}
            <div className="kissa-monograph-spine" aria-hidden="true">
              <span className="kissa-silk-ribbon" />
            </div>

            {/* Right Page: Folio 02 — IPB Education & Interactive Brass Seal GPA */}
            <div className="kissa-folio kissa-folio--right">
              <div className="mono kissa-folio__head">
                <span>CHAPTER II · {education.label}</span>
                <span>FOLIO 02</span>
              </div>

              <div className="kissa-edu-block">
                <span className="mono kissa-edu-block__period">{education.period}</span>
                <h2 className="kissa-folio__title">{education.school}</h2>
                <p className="kissa-edu-block__degree">{education.degree.join(' — ')}</p>

                <div className="kissa-lang-grid">
                  {education.languages.map((l) => (
                    <div key={l.name} className="kissa-lang-item">
                      <strong>{l.name}</strong>
                      <span className="mono">{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Embossed Brass Seal GPA Plate */}
              <div
                className={`kissa-gpa-plate ${stamping ? 'is-stamping' : ''}`}
                onClick={handleStamp}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleStamp();
                  }
                }}
              >
                <div className="mono kissa-gpa-plate__top">
                  <span>{education.gpa.label}</span>
                  <span className="kissa-gpa-plate__seal">{stamps[stampIdx]}</span>
                </div>
                <div className="kissa-gpa-plate__val">
                  <span className="kissa-gpa-plate__num">{education.gpa.value}</span>
                  <span className="kissa-gpa-plate__scale">{education.gpa.scale}</span>
                </div>
                <p className="kissa-gpa-plate__note">{education.gpa.note}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CENTERPIECE 2: INTERACTIVE WALNUT 3-DRAWER CARD CATALOG CABINET
         ========================================================= */}
      <section className="container kissa-toolkit-section">
        <div className="kissa-toolkit-header">
          <div>
            <span className="mono kissa-eyebrow">CHAPTER III · {toolkit.label}</span>
            <h2 className="kissa-toolkit-title">{toolkit.title}</h2>
          </div>

          <div className="kissa-cabinet-controls">
            {selectedTool && (
              <div className="mono kissa-active-filter">
                <span>INDEX: {selectedTool}</span>
                <button
                  type="button"
                  onClick={() => setSelectedTool(null)}
                  aria-label="Clear filter"
                >
                  ×
                </button>
              </div>
            )}
            <button
              type="button"
              className="mono kissa-drawer-all-btn"
              onClick={() => setOpenDrawer((prev) => (prev === 'all' ? 0 : 'all'))}
            >
              {openDrawer === 'all'
                ? lang === 'id'
                  ? 'Tutup ke 1 Laci'
                  : 'Focus Single Drawer'
                : lang === 'id'
                  ? 'Buka Semua Laci (3)'
                  : 'Pull All Drawers (3)'}
            </button>
          </div>
        </div>

        {/* Physical Dark Walnut Card Catalog Cabinet */}
        <div className="kissa-card-cabinet">
          {toolkit.domains.map((d, idx) => {
            const isOpen = openDrawer === 'all' || openDrawer === idx;
            const hasSelectedTool = d.tools.includes(selectedTool);

            return (
              <div
                key={d.title}
                className={`kissa-wood-drawer ${isOpen ? 'is-pulled' : ''} ${
                  hasSelectedTool ? 'has-match' : ''
                }`}
              >
                {/* Brushed Brass Drawer Face & Pull Handle */}
                <button
                  type="button"
                  className="kissa-wood-drawer__face"
                  onClick={() => setOpenDrawer(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="mono kissa-wood-drawer__brass-plate">
                    DRAWER 0{idx + 1} · {d.title.toUpperCase()}
                  </span>

                  <span className="kissa-wood-drawer__pull-handle" aria-hidden="true" />

                  <span className="mono kissa-wood-drawer__state">
                    {isOpen
                      ? lang === 'id'
                        ? 'TERBUKA'
                        : 'OPEN'
                      : lang === 'id'
                        ? 'TARIK LACI ↓'
                        : 'PULL DRAWER ↓'}
                  </span>
                </button>

                {/* Ruled Archival Index Card Sliding Out of the Drawer */}
                <div className="kissa-wood-drawer__tray">
                  <div className="kissa-ruled-card">
                    <div className="kissa-ruled-card__header">
                      <h3 className="kissa-ruled-card__title">{d.title}</h3>
                      <span className="mono kissa-ruled-card__count">
                        {d.tools.length} INDEXED TOOLS
                      </span>
                    </div>

                    <p className="kissa-ruled-card__desc">{d.description}</p>

                    <div className="kissa-index-card__pills">
                      {d.tools.map((tool) => (
                        <button
                          key={tool}
                          type="button"
                          className={`mono kissa-tool-pill ${
                            selectedTool === tool ? 'is-selected' : ''
                          }`}
                          onClick={() =>
                            setSelectedTool((prev) => (prev === tool ? null : tool))
                          }
                        >
                          {tool}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Single Next-Room Invitation */}
        <div className="kissa-next-bar">
          <div>
            <span className="mono kissa-eyebrow">
              {lang === 'id' ? '03 / SELANJUTNYA: ARSIP KASET PROYEK' : '03 / NEXT: CASSETTE TAPE ARCHIVE'}
            </span>
            <h3 className="kissa-next-bar__title">{workInvitation.title}</h3>
          </div>
          <Link to={workInvitation.action.to} className="mono kissa-next-bar__cta">
            {workInvitation.action.label} ↗
          </Link>
        </div>
      </section>
    </div>
  );
}
