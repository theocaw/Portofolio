import PageBackdrop from './PageBackdrop.jsx';
import './PageIntro.css';

/** Page introduction used on About, Work and Journey, each with its own interactive canvas world. */
export default function PageIntro({ label, headline, description, variant = 'sakura' }) {
  return (
    <div className="page-intro-stage">
      <PageBackdrop variant={variant} />
      <section className="container page-intro">
        <p className="label page-intro__label">{label}</p>
        <h1 className="page-intro__headline">
          {headline.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </h1>
        <p className="page-intro__description">{description}</p>
      </section>
    </div>
  );
}
