import './PageIntro.css';

/** Page introduction used on About, Work and Journey. */
export default function PageIntro({ label, headline, description }) {
  return (
    <section className="container page-intro">
      <p className="label page-intro__label">{label}</p>
      <h1 className="page-intro__headline">
        {headline.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </h1>
      <p className="page-intro__description">{description}</p>
    </section>
  );
}
