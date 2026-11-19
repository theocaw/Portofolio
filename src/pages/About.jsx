import { useState } from 'react';
import PageIntro from '../components/PageIntro.jsx';
import ButtonLink from '../components/ButtonLink.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getAboutContent } from '../content/about.js';
import './About.css';

const GPA_CHEERS = {
  en: [
    '✨ Click to celebrate!',
    '🎓 Cum Laude Track · IPB University!',
    '📊 Consistent across Data & Software Engineering!',
    '🔥 Academic & Organizational Balance!',
  ],
  id: [
    '✨ Klik untuk rayakan!',
    '🎓 Jalur Cum Laude · IPB University!',
    '📊 Konsisten di Data & Rekayasa Perangkat Lunak!',
    '🔥 Seimbang Akademik & Organisasi!',
  ],
};

export default function About() {
  const { lang } = useApp();
  const about = getAboutContent(lang);
  const { intro, profile, education, toolkit, workInvitation } = about;

  const [cheerIdx, setCheerIdx] = useState(0);
  const [gpaBurst, setGpaBurst] = useState(false);
  const [selectedTool, setSelectedTool] = useState(null);

  const triggerGpaCheer = () => {
    setCheerIdx((prev) => (prev + 1) % GPA_CHEERS[lang].length);
    setGpaBurst(false);
    window.requestAnimationFrame(() => setGpaBurst(true));
  };

  const cheers = GPA_CHEERS[lang] || GPA_CHEERS.en;

  return (
    <>
      <PageIntro {...intro} variant="sakura" />

      {/* Profile */}
      <section className="band band--paper-2">
        <div className="container section profile">
          <div className="profile__index">
            <p className="label">{profile.label}</p>
            <p className="profile__glyph" aria-hidden="true">
              {profile.glyph}
            </p>
            <ul className="profile__facts">
              {profile.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>

          <div className="profile__narrative">
            <h2 className="profile__title">{profile.title}</h2>
            {profile.paragraphs.map((p) => (
              <p key={p} className="profile__paragraph">
                {p}
              </p>
            ))}
            <hr className="rule" />
            <div className="profile__focus">
              {profile.focus.map((f) => (
                <div key={f.label} className="profile__focus-item">
                  <span className="mono profile__focus-label">{f.label}</span>
                  <span className="profile__focus-value">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="container education">
        <p className="label">{education.label}</p>
        <div className="education__credentials">
          <div className="education__school">
            <p className="label">{education.period}</p>
            <h2 className="education__name">{education.school}</h2>
            <p className="education__degree">
              {education.degree.map((d) => (
                <span key={d}>{d}</span>
              ))}
            </p>
            <hr className="rule" />
            <ul className="education__languages">
              {education.languages.map((l) => (
                <li key={l.name}>
                  <span className="education__language-name">{l.name}</span>
                  <span className="mono education__language-level">{l.level}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className={`gpa band--lime ${gpaBurst ? 'is-bursting' : ''}`}
            onClick={triggerGpaCheer}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                triggerGpaCheer();
              }
            }}
            role="button"
            tabIndex={0}
            aria-label={`${education.gpa.label}: ${education.gpa.value} ${education.gpa.scale}`}
          >
            <div className="gpa__top-row">
              <p className="mono gpa__label">{education.gpa.label}</p>
              <span className="mono gpa__cheer-pill">{cheers[cheerIdx]}</span>
            </div>
            <p className="gpa__value">
              <span className="gpa__number">{education.gpa.value}</span>
              <span className="gpa__scale">{education.gpa.scale}</span>
            </p>
            <p className="gpa__note">{education.gpa.note}</p>
          </div>
        </div>
      </section>

      {/* Toolkit & Work invitation */}
      <section className="band band--blue-soft">
        <div className="container section toolkit">
          <div className="toolkit__header-row">
            <div>
              <p className="label">{toolkit.label}</p>
              <h2 className="toolkit__title">{toolkit.title}</h2>
            </div>
            {selectedTool && (
              <div className="toolkit__active-badge mono">
                <span>✦ {selectedTool}</span>
                <button
                  type="button"
                  className="toolkit__clear-btn"
                  onClick={() => setSelectedTool(null)}
                  aria-label="Clear selected tool"
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <div className="toolkit__domains">
            {toolkit.domains.map((d) => {
              const hasActive = d.tools.includes(selectedTool);
              return (
                <article
                  key={d.title}
                  className={`toolkit__domain ${hasActive ? 'is-highlighted' : ''}`}
                >
                  <hr className="rule" />
                  <p className="toolkit__icon" aria-hidden="true">
                    {d.icon}
                  </p>
                  <h3 className="toolkit__domain-title">{d.title}</h3>
                  <ul className="toolkit__tools toolkit__tools--pills">
                    {d.tools.map((t) => (
                      <li key={t}>
                        <button
                          type="button"
                          className={`toolkit__tool-pill ${selectedTool === t ? 'is-selected' : ''}`}
                          onClick={() => setSelectedTool((prev) => (prev === t ? null : t))}
                        >
                          {t}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <p className="toolkit__description">{d.description}</p>
                </article>
              );
            })}
          </div>

          <div className="work-invitation">
            <h3 className="work-invitation__title">{workInvitation.title}</h3>
            <ButtonLink to={workInvitation.action.to}>{workInvitation.action.label}</ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
