import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageBackdrop from '../components/PageBackdrop.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getAboutContent } from '../content/about.js';
import './About.css';

const GPA_CHEERS = {
  en: [
    '✦ OFFICIAL SEAL · IPB UNIVERSITY',
    '🎓 Cum Laude Track · Software Engineering!',
    '📊 Consistent across Data Mining & System Design!',
    '☕ Balanced Academic & Slowbar Craft!',
  ],
  id: [
    '✦ STEMPEL RESMI · IPB UNIVERSITY',
    '🎓 Jalur Cum Laude · Rekayasa Perangkat Lunak!',
    '📊 Konsisten di Data Mining & Arsitektur Sistem!',
    '☕ Seimbang Akademik & Organisasi!',
  ],
};

export default function About() {
  const { lang } = useApp();
  const about = getAboutContent(lang);
  const { intro, profile, education, toolkit, workInvitation } = about;

  const [activeChapter, setActiveChapter] = useState('all'); // 'all' | 'story' | 'transcript' | 'catalog'
  const [cheerIdx, setCheerIdx] = useState(0);
  const [gpaBurst, setGpaBurst] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  const triggerGpaCheer = () => {
    setCheerIdx((prev) => (prev + 1) % GPA_CHEERS[lang].length);
    setGpaBurst(false);
    window.requestAnimationFrame(() => setGpaBurst(true));
  };

  const cheers = GPA_CHEERS[lang] || GPA_CHEERS.en;

  const bookmarks = [
    {
      id: 'all',
      label: lang === 'id' ? '📖 Buka Semua Halaman' : '📖 Open Full Book',
    },
    {
      id: 'story',
      label: lang === 'id' ? '🔖 Bab I · Profil & Fokus' : '🔖 Ch. I · Reader Profile',
    },
    {
      id: 'transcript',
      label: lang === 'id' ? '🔖 Bab II · Transkrip IPB (3.63)' : '🔖 Ch. II · IPB Transcript (3.63)',
    },
    {
      id: 'catalog',
      label: lang === 'id' ? '🗂️ Bab III · Laci Katalog Skill' : '🗂️ Ch. III · Card Catalog Toolkit',
    },
  ];

  return (
    <div className="slowbar-library-page">
      {/* =========================================================
          TOP READING ROOM STAGE & BOOKMARK RIBBON TABS
         ========================================================= */}
      <section className="library-hero">
        <PageBackdrop variant="sakura" />

        <div className="container library-hero__container">
          <div className="library-header-bar">
            <div>
              <span className="mono library-eyebrow">
                📚 {lang === 'id' ? 'RUANG BACA PERPUSTAKAAN SLOWBAR' : 'SLOWBAR READING ROOM & CARD CATALOG'}
              </span>
              <h1 className="library-main-title">{intro.headline}</h1>
              <p className="library-sub-desc">{intro.description}</p>
            </div>

            {/* Hanging Ribbon Bookmark Switcher */}
            <div className="library-bookmarks" role="tablist" aria-label="Book Chapters">
              {bookmarks.map((bm) => (
                <button
                  key={bm.id}
                  type="button"
                  role="tab"
                  aria-selected={activeChapter === bm.id}
                  className={`library-bookmark-btn ${activeChapter === bm.id ? 'is-active' : ''}`}
                  onClick={() => setActiveChapter(bm.id)}
                >
                  <span>{bm.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* =========================================================
              OPEN HARDCOVER BOOK SPREAD (Chapters I & II)
             ========================================================= */}
          {(activeChapter === 'all' || activeChapter === 'story' || activeChapter === 'transcript') && (
            <div className="library-hardcover-book">
              {/* Left Page: Chapter I — The Reader's Narrative & Focus */}
              <div
                className={`library-page library-page--left ${
                  activeChapter === 'transcript' ? 'is-dimmed' : ''
                }`}
              >
                <div className="mono library-page__head">
                  <span>CHAPTER I · {profile.label}</span>
                  <span>PAGE 01</span>
                </div>

                <h2 className="library-page__title">{profile.title}</h2>

                <div className="library-page__paragraphs">
                  {profile.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>

                {/* Stamped Focus Cards at Bottom of Left Page */}
                <div className="library-focus-stamps">
                  {profile.focus.map((f, idx) => (
                    <div
                      key={f.label}
                      className={`library-focus-stamp library-focus-stamp--${idx + 1}`}
                    >
                      <span className="mono library-focus-stamp__k">{f.label}</span>
                      <strong className="library-focus-stamp__v">{f.value}</strong>
                    </div>
                  ))}
                </div>
              </div>

              {/* Center Book Spine Fold */}
              <div className="library-book-spine-fold" aria-hidden="true">
                <span className="library-ribbon-thread" />
              </div>

              {/* Right Page: Chapter II — Academic Credentials & Interactive GPA Stamp */}
              <div
                className={`library-page library-page--right ${
                  activeChapter === 'story' ? 'is-dimmed' : ''
                }`}
              >
                <div className="mono library-page__head">
                  <span>CHAPTER II · {education.label}</span>
                  <span>PAGE 02</span>
                </div>

                <div className="library-school-card">
                  <span className="mono library-school-card__period">{education.period}</span>
                  <h2 className="library-school-card__name">{education.school}</h2>
                  <p className="library-school-card__degree">
                    {education.degree.join(' · ')}
                  </p>

                  <div className="library-languages-row">
                    {education.languages.map((l) => (
                      <div key={l.name} className="library-lang-chip">
                        <strong>{l.name}</strong>
                        <span className="mono">{l.level}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Library Wax-Seal GPA Card */}
                <div
                  className={`library-gpa-seal gpa ${gpaBurst ? 'is-bursting' : ''}`}
                  onClick={triggerGpaCheer}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      triggerGpaCheer();
                    }
                  }}
                >
                  <div className="library-gpa-seal__top">
                    <span className="mono">{education.gpa.label}</span>
                    <span className="mono library-gpa-seal__stamp">{cheers[cheerIdx]}</span>
                  </div>

                  <div className="library-gpa-seal__val">
                    <span className="library-gpa-seal__num">{education.gpa.value}</span>
                    <span className="library-gpa-seal__scale">{education.gpa.scale}</span>
                  </div>

                  <p className="library-gpa-seal__note">{education.gpa.note}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================
          CHAPTER III: WOODEN LIBRARY CARD CATALOG DRAWERS (TOOLKIT)
         ========================================================= */}
      {(activeChapter === 'all' || activeChapter === 'catalog') && (
        <section className="container library-catalog-section">
          <div className="library-catalog-header">
            <div>
              <span className="mono library-eyebrow">
                🗂️ CHAPTER III · {toolkit.label}
              </span>
              <h2 className="library-catalog-title">{toolkit.title}</h2>
            </div>

            {selectedTool && (
              <div className="mono library-active-tool-pill">
                <span>✦ {selectedTool}</span>
                <button
                  type="button"
                  onClick={() => setSelectedTool(null)}
                  aria-label="Clear selected tool"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <div className="library-drawers-grid">
            {toolkit.domains.map((d, idx) => {
              const hasActive = d.tools.includes(selectedTool);
              const drawerCode = `DRAWER 0${idx + 1}`;
              return (
                <article
                  key={d.title}
                  className={`library-drawer toolkit__domain ${hasActive ? 'is-highlighted' : ''}`}
                >
                  {/* Brass Drawer Pull Handle & Index Tag */}
                  <div className="library-drawer__handle-bar">
                    <span className="mono library-drawer__brass-tag">{drawerCode}</span>
                    <span className="library-drawer__pull" aria-hidden="true" />
                    <span className="mono library-drawer__icon">{d.icon}</span>
                  </div>

                  {/* Ruled Library Index Card inside the Drawer */}
                  <div className="library-drawer__card">
                    <h3 className="library-drawer__title">{d.title}</h3>
                    <p className="library-drawer__desc">{d.description}</p>

                    <div className="toolkit__tools--pills">
                      {d.tools.map((tool) => (
                        <button
                          key={tool}
                          type="button"
                          className={`toolkit__tool-pill ${
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
                </article>
              );
            })}
          </div>

          {/* Bottom Invitation to Vinyl Jukebox */}
          <div className="library-checkout-bar work-invitation">
            <div className="library-checkout-bar__text">
              <span className="mono">✦ NEXT ROOM IN THE SLOWBAR</span>
              <h3>{workInvitation.title}</h3>
            </div>
            <Link to={workInvitation.action.to} className="mono library-checkout-bar__btn">
              {workInvitation.action.label} ↗
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
