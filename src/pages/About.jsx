import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { getAboutContent } from '../content/about.js';
import './About.css';

export default function About() {
  const { lang } = useApp();
  const about = getAboutContent(lang);
  const { intro, profile, education, toolkit, workInvitation } = about;

  const [selectedTool, setSelectedTool] = useState(null);

  return (
    <div className="kissa-about">
      {/* =========================================================
          HEADER & MONOGRAPH SPREAD
         ========================================================= */}
      <section className="container kissa-about-hero">
        <span className="mono kissa-eyebrow">
          {lang === 'id' ? '03 / PERPUSTAKAAN & PROFIL' : '03 / THE ARCHIVAL LIBRARY & PROFILE'}
        </span>
        <h1 className="kissa-about-hero__title">{intro.headline}</h1>
        <p className="kissa-about-hero__desc">{intro.description}</p>
      </section>

      {/* Open Monograph Spread: Left Narrative + Right Academic Plate */}
      <section className="band band--paper-2 kissa-monograph-band">
        <div className="container kissa-monograph">
          {/* Left Page: Reader Profile & Focus */}
          <div className="kissa-monograph__col">
            <div className="mono kissa-monograph__head">
              <span>CHAPTER I · {profile.label}</span>
              <span>FOLIO 01</span>
            </div>

            <h2 className="kissa-monograph__title">{profile.title}</h2>

            <div className="kissa-monograph__prose">
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

          {/* Right Page: IPB Education & GPA Archival Plate */}
          <div className="kissa-monograph__col">
            <div className="mono kissa-monograph__head">
              <span>CHAPTER II · {education.label}</span>
              <span>FOLIO 02</span>
            </div>

            <div className="kissa-edu-block">
              <span className="mono kissa-edu-block__period">{education.period}</span>
              <h2 className="kissa-monograph__title">{education.school}</h2>
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

            <div className="kissa-gpa-plate">
              <div className="mono kissa-gpa-plate__top">
                <span>{education.gpa.label}</span>
                <span>IPB UNIVERSITY · TPL</span>
              </div>
              <div className="kissa-gpa-plate__val">
                <span className="kissa-gpa-plate__num">{education.gpa.value}</span>
                <span className="kissa-gpa-plate__scale">{education.gpa.scale}</span>
              </div>
              <p className="kissa-gpa-plate__note">{education.gpa.note}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CHAPTER III: INTERACTIVE INDEX CATALOG (TOOLKIT)
         ========================================================= */}
      <section className="container kissa-toolkit-section">
        <div className="kissa-toolkit-header">
          <div>
            <span className="mono kissa-eyebrow">CHAPTER III · {toolkit.label}</span>
            <h2 className="kissa-toolkit-title">{toolkit.title}</h2>
          </div>

          {selectedTool && (
            <div className="mono kissa-active-filter">
              <span>FILTER: {selectedTool}</span>
              <button
                type="button"
                onClick={() => setSelectedTool(null)}
                aria-label="Clear filter"
              >
                ×
              </button>
            </div>
          )}
        </div>

        <div className="kissa-catalog-grid">
          {toolkit.domains.map((d, idx) => {
            const isHighlighted = d.tools.includes(selectedTool);
            return (
              <article
                key={d.title}
                className={`kissa-index-card ${isHighlighted ? 'is-highlighted' : ''}`}
              >
                <div className="mono kissa-index-card__top">
                  <span>INDEX 0{idx + 1}</span>
                  <span>{d.tools.length} TOOLS</span>
                </div>

                <h3 className="kissa-index-card__title">{d.title}</h3>
                <p className="kissa-index-card__desc">{d.description}</p>

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
              </article>
            );
          })}
        </div>

        <div className="kissa-next-bar">
          <div>
            <span className="mono kissa-eyebrow">
              {lang === 'id' ? 'SELANJUTNYA DI ARSIP' : 'NEXT IN THE ARCHIVE'}
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
