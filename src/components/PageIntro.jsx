import PageBackdrop from './PageBackdrop.jsx';
import { useApp } from '../context/AppContext.jsx';
import './PageIntro.css';

const HINTS = {
  sakura: {
    en: '🌸 Move cursor to blow sakura breeze · Tap bubbles to pop',
    id: '🌸 Gerakkan kursor untuk tiup kelopak sakura · Sentuh gelembung untuk pecahkan',
  },
  network: {
    en: '⚡ Hover to link data constellation · Click to emit sonar pulse',
    id: '⚡ Arahkan kursor ke simpul data · Klik untuk pancarkan gelombang radar',
  },
  fireflies: {
    en: '✨ Fireflies follow your cursor · Click to launch a shooting star',
    id: '✨ Kunang-kunang mengikuti kursor · Klik untuk luncurkan bintang jatuh',
  },
};

/** Page introduction used on About, Work and Journey, each with its own interactive canvas world. */
export default function PageIntro({ label, headline, description, variant = 'sakura' }) {
  const { lang } = useApp();
  const hint = HINTS[variant]?.[lang] || HINTS[variant]?.en;

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
        {hint && <span className="page-intro__theme-pill">{hint}</span>}
      </section>
    </div>
  );
}
