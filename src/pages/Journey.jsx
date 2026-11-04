import PageIntro from '../components/PageIntro.jsx';
import Evidence from '../components/Evidence.jsx';
import { journey } from '../content/journey.js';
import './Journey.css';

export default function Journey() {
  const { intro, professional, organizations, achievements } = journey;
  const { internship } = professional;

  return (
    <>
      <PageIntro {...intro} />

      {/* Professional experience */}
      <section className="container section journey-section">
        <p className="label">{professional.label}</p>
        <div className="journey-heading">
          <h2 className="journey-heading__title">{professional.title}</h2>
          <p className="mono journey-heading__note">
            {professional.note.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
        </div>
        <hr className="rule" />

        <div className="internship">
          <div className="internship__details">
            <p className="label">{internship.period}</p>
            <h3 className="internship__company">{internship.company}</h3>
            <p className="internship__role">{internship.role}</p>
            <p className="internship__description">{internship.description}</p>
            <a
              className="text-link internship__website"
              href={internship.website.url}
              target="_blank"
              rel="noreferrer"
            >
              {internship.website.label}
            </a>
            <div className="internship__highlights">
              {internship.highlights.map((h) => (
                <div key={h.label} className={`highlight highlight--${h.tone}`}>
                  <span className="highlight__value">{h.value}</span>
                  <span className="mono highlight__label">{h.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="internship__evidence">
            <Evidence {...internship.evidence[0]} heights={{ desktop: 360, mobile: 240 }} />
          </div>
        </div>
      </section>

      {/* Organizations */}
      <section className="band band--paper-2">
        <div className="container section journey-section journey-section--organizations">
          <p className="label">{organizations.label}</p>
          <h2 className="journey-heading__title journey-heading__title--large">{organizations.title}</h2>
          <p className="journey-section__description">{organizations.description}</p>

          <div className="organizations">
            {organizations.entries.map((entry) => (
              <article key={entry.name} className="organization">
                <hr className="rule" />
                <div className="organization__details">
                  <p className="mono organization__period">{entry.period}</p>
                  <div className="organization__story">
                    <h3 className="organization__name">{entry.name}</h3>
                    <p className="mono organization__role">{entry.role}</p>
                    <p className="organization__description">{entry.description}</p>
                  </div>
                  <div className="organization__evidence">
                    <Evidence {...entry.evidence} heights={{ desktop: 260, mobile: 210 }} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="band band--blue-soft">
        <div className="container section journey-section">
          <p className="label">{achievements.label}</p>
          <h2 className="journey-heading__title journey-heading__title--large journey-heading__title--light">
            {achievements.title}
          </h2>
          <div className="achievements">
            {achievements.entries.map((a) => (
              <article key={a.name} className="achievement">
                <hr className="rule" />
                <p className="achievement__result">{a.result}</p>
                <div className="achievement__details">
                  <h3 className="achievement__name">{a.name}</h3>
                  <p className="mono achievement__organizer">{a.organizer}</p>
                </div>
                <Evidence {...a.evidence} heights={{ desktop: 280, mobile: 230 }} tone="light" />
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
