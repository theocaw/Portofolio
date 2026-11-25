import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { animate, spring, createTimeline } from 'animejs';
import { useApp } from '../context/AppContext.jsx';
import './KineticGardenWidgets.css';

const PROMPTS = {
  en: [
    { prefix: 'I can ', highlight: 'engineer ETL pipelines', suffix: ' (30,903 verified rows)' },
    { prefix: 'I can ', highlight: 'build predictive models', suffix: ' (81.94% R² Ames)' },
    { prefix: 'I can ', highlight: 'craft living interfaces', suffix: ' with spring physics' },
    { prefix: 'I can ', highlight: 'architect 4-tier systems', suffix: ' from ERD to production' },
  ],
  id: [
    { prefix: 'Saya bisa ', highlight: 'bangun pipeline ETL', suffix: ' (30.903 baris valid)' },
    { prefix: 'Saya bisa ', highlight: 'buat model prediktif', suffix: ' (81,94% R² Ames)' },
    { prefix: 'Saya bisa ', highlight: 'rancang antarmuka hidup', suffix: ' dengan fisika pegas' },
    { prefix: 'Saya bisa ', highlight: 'arsiteki sistem 4-tier', suffix: ' dari ERD ke produksi' },
  ],
};

// Organic botanical shapes with identical point count for silky Anime.js SVG morphing
const MORPH_SHAPES = [
  'M 60 12 C 74 12, 86 24, 92 38 C 106 44, 108 62, 98 76 C 102 92, 86 106, 70 100 C 60 112, 42 108, 36 94 C 20 96, 10 80, 18 64 C 8 50, 18 32, 34 32 C 38 18, 48 12, 60 12 Z',
  'M 60 16 C 84 16, 104 36, 104 60 C 104 84, 84 104, 60 104 C 36 104, 16 84, 16 60 C 16 36, 36 16, 60 16 C 60 16, 60 16, 60 16 C 60 16, 60 16, 60 16 Z',
  'M 60 8 C 72 26, 94 20, 96 42 C 114 54, 102 74, 86 80 C 86 102, 68 108, 60 94 C 52 108, 34 102, 34 80 C 18 74, 6 54, 24 42 C 26 20, 48 26, 60 8 Z',
];

const WORKFLOW_STEPS = [
  { code: '01', en: 'Scrape & Clean', id: 'Scrape & Bersihkan' },
  { code: '02', en: 'Model & Segment', id: 'Model & Segmentasi' },
  { code: '03', en: 'Design & Motion', id: 'Desain & Gerak' },
  { code: '04', en: 'Ship Full-Stack', id: 'Rilis Full-Stack' },
];

export default function KineticGardenWidgets() {
  const { lang } = useApp();
  const prompts = PROMPTS[lang] || PROMPTS.en;

  const [promptIdx, setPromptIdx] = useState(0);
  const [craftMode, setCraftMode] = useState('data'); // 'data' | 'frontend'
  const [morphIdx, setMorphIdx] = useState(0);
  const [pulseCount, setPulseCount] = useState(0);

  const morphPathRef = useRef(null);
  const springOrbRef = useRef(null);
  const timelineWrapRef = useRef(null);

  // Auto-cycle the kinetic prompt pill gently
  useEffect(() => {
    const id = window.setInterval(() => {
      setPromptIdx((i) => (i + 1) % prompts.length);
    }, 3600);
    return () => window.clearInterval(id);
  }, [prompts.length]);

  // Anime.js v4 continuous organic SVG petal/shape morphing
  useEffect(() => {
    const el = morphPathRef.current;
    if (!el) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const anim = animate(el, {
      d: MORPH_SHAPES[morphIdx],
      rotate: morphIdx * 32,
      scale: [0.92, 1.04, 1],
      ease: spring({ bounce: 0.42, duration: 760 }),
    });

    return () => anim.pause();
  }, [morphIdx]);

  // Auto-step morph shape every 2.8s
  useEffect(() => {
    const id = window.setInterval(() => {
      setMorphIdx((i) => (i + 1) % MORPH_SHAPES.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, []);

  // Anime.js v4 spring physics orb snap whenever craftMode or pulseCount changes
  useEffect(() => {
    const orb = springOrbRef.current;
    if (!orb) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const anim = animate(orb, {
      translateX: craftMode === 'data' ? 0 : 124,
      scale: [1, 1.24, 1],
      ease: spring({ bounce: 0.52, duration: 720 }),
    });
    return () => anim.pause();
  }, [craftMode, pulseCount]);

  // Anime.js v4 staggered 4-segment workflow timeline animation
  useEffect(() => {
    const wrap = timelineWrapRef.current;
    if (!wrap) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const bars = wrap.querySelectorAll('.kw-timeline__fill');
    const tl = createTimeline({ loop: true, defaults: { duration: 680, ease: 'outExpo' } });

    bars.forEach((bar, i) => {
      tl.add(
        bar,
        {
          scaleX: [0, 1],
          opacity: [0.45, 1],
        },
        i * 380,
      );
    });
    tl.add(
      bars,
      {
        scaleX: 0,
        opacity: 0.35,
        duration: 420,
        ease: 'inOutQuad',
      },
      '+=900',
    );

    return () => tl.pause();
  }, []);

  const triggerNextPrompt = () => {
    setPromptIdx((i) => (i + 1) % prompts.length);
    setMorphIdx((i) => (i + 1) % MORPH_SHAPES.length);
    setPulseCount((c) => c + 1);
  };

  const activePrompt = prompts[promptIdx] || prompts[0];
  const donutPct = craftMode === 'data' ? 81.94 : 92;
  const donutCirc = 2 * Math.PI * 34;
  const donutOffset = donutCirc * (1 - donutPct / 100);

  return (
    <section className="container kw-section" aria-label="Interactive Kinetic Motion & Micro-Widgets">
      <div className="kw-header">
        <span className="mono kissa-eyebrow">
          {lang === 'id'
            ? 'LABORATORIUM GERAK · MOTION + ANIME.JS SPRING'
            : 'KINETIC BOTANICAL STUDIO · MOTION + ANIME.JS SPRING'}
        </span>
        <h2 className="kw-title">
          {lang === 'id'
            ? 'Fisika pegas, morphing organik & mikro-widget interaktif.'
            : 'Spring physics, organic morphing & tactile micro-widgets.'}
        </h2>
      </div>

      {/* Center Kinetic Prompt Pill (Reel 1 @yunaviaa.1 inspired) */}
      <motion.div
        className="kw-prompt-bar"
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 380, damping: 24 }}
      >
        <span className="mono kw-prompt-badge">OSANNA.LAB</span>

        <div className="kw-prompt-text-wrap">
          <AnimatePresence mode="wait">
            <motion.p
              key={`${lang}-${promptIdx}`}
              className="kw-prompt-text"
              initial={{ opacity: 0, y: 12, filter: 'blur(3px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -12, filter: 'blur(3px)' }}
              transition={{ type: 'spring', stiffness: 340, damping: 24 }}
            >
              <span>{activePrompt.prefix}</span>
              <span className="kw-prompt-highlight">{activePrompt.highlight}</span>
              <span className="kw-prompt-suffix">{activePrompt.suffix}</span>
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.button
          type="button"
          className="kw-prompt-submit"
          onClick={triggerNextPrompt}
          whileTap={{ scale: 0.88 }}
          whileHover={{ scale: 1.07 }}
          transition={{ type: 'spring', stiffness: 450, damping: 18 }}
          aria-label="Cycle capability prompt"
          title={lang === 'id' ? 'Klik untuk ganti & picu animasi pegas' : 'Click to cycle & trigger spring'}
        >
          ↑
        </motion.button>
      </motion.div>

      {/* 4 Interactive Micro-UI Widgets (Reel 1 + Reel 2 Anime.js demos) */}
      <div className="kw-grid">
        {/* Widget 1: Radial Donut Card (Reel 1 pie chart widget + verified Ames R²) */}
        <motion.article
          className="kw-card"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        >
          <div className="mono kw-card__top">
            <span>01 / RADIAL METRIC</span>
            <span className="kw-pill kw-pill--rose">
              {craftMode === 'data' ? 'AMES R²' : 'UI CRAFT'}
            </span>
          </div>
          <div className="kw-donut-wrap">
            <svg viewBox="0 0 92 92" className="kw-donut-svg" aria-hidden="true">
              <circle cx="46" cy="46" r="34" className="kw-donut-track" />
              <motion.circle
                cx="46"
                cy="46"
                r="34"
                className="kw-donut-arc"
                strokeDasharray={donutCirc}
                animate={{ strokeDashoffset: donutOffset }}
                transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              />
            </svg>
            <div className="kw-donut-center">
              <strong>{craftMode === 'data' ? '81.9%' : '60fps'}</strong>
              <span className="mono">{craftMode === 'data' ? 'R² SCORE' : 'SMOOTH'}</span>
            </div>
          </div>
          <p className="kw-card__caption">
            {craftMode === 'data'
              ? lang === 'id'
                ? 'Akurasi regresi linear pada 2.930 properti Ames Housing.'
                : 'Validated linear regression accuracy on 2,930 Ames homes.'
              : lang === 'id'
                ? 'Animasi GPU-accelerated yang tetap ringan di desktop & mobile.'
                : 'GPU-accelerated micro-interactions tuned for smooth 60fps.'}
          </p>
        </motion.article>

        {/* Widget 2: Anime.js Organic Botanical SVG Morphing (Reel 2) */}
        <motion.article
          className="kw-card kw-card--clickable"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          onClick={() => setMorphIdx((i) => (i + 1) % MORPH_SHAPES.length)}
        >
          <div className="mono kw-card__top">
            <span>02 / ANIME.JS MORPH</span>
            <span className="kw-pill kw-pill--sage">HALUS</span>
          </div>
          <div className="kw-morph-stage">
            <svg viewBox="0 0 120 120" className="kw-morph-svg" aria-hidden="true">
              <defs>
                <linearGradient id="gardenMorphGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--pink-hot)" />
                  <stop offset="55%" stopColor="var(--lime)" />
                  <stop offset="100%" stopColor="var(--blue)" />
                </linearGradient>
              </defs>
              <path
                ref={morphPathRef}
                d={MORPH_SHAPES[0]}
                fill="url(#gardenMorphGrad)"
                style={{ transformOrigin: '60px 60px' }}
              />
              <circle cx="60" cy="60" r="10" fill="var(--card-bg)" opacity="0.9" />
            </svg>
          </div>
          <p className="kw-card__caption">
            {lang === 'id'
              ? 'Klik kelopak untuk memicu morphing bentuk organik Anime.js.'
              : 'Click blossom to trigger Anime.js organic spring shape morphing.'}
          </p>
        </motion.article>

        {/* Widget 3: Anime.js Spring Physics Slider Toggle (Reel 1 toggle + Reel 2 Fisika Pegas) */}
        <motion.article
          className="kw-card"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        >
          <div className="mono kw-card__top">
            <span>03 / SPRING PHYSICS</span>
            <span className="kw-pill kw-pill--gold">FISIKA PEGAS</span>
          </div>

          <div className="kw-spring-demo">
            <button
              type="button"
              className="kw-spring-track"
              onClick={() => setCraftMode((m) => (m === 'data' ? 'frontend' : 'data'))}
              aria-label="Toggle between Data Analytics and Front-End Craft mode"
            >
              <span className={`mono kw-spring-label ${craftMode === 'data' ? 'is-on' : ''}`}>
                DATA
              </span>
              <span className={`mono kw-spring-label ${craftMode === 'frontend' ? 'is-on' : ''}`}>
                CRAFT
              </span>
              <span ref={springOrbRef} className="kw-spring-orb" aria-hidden="true" />
            </button>

            <div className="kw-spring-readout mono">
              <span>{craftMode === 'data' ? 'PYTHON · R · SQL · ETL' : 'REACT · MOTION · ANIME.JS'}</span>
            </div>
          </div>

          <p className="kw-card__caption">
            {lang === 'id'
              ? 'Klik switch untuk merasakan pantulan overshoot pegas Anime.js.'
              : 'Click switch to feel elastic Anime.js spring overshoot physics.'}
          </p>
        </motion.article>

        {/* Widget 4: Anime.js 4-Segment Motion Timeline (Reel 2 Timeline Gerak) */}
        <motion.article
          className="kw-card"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        >
          <div className="mono kw-card__top">
            <span>04 / MOTION TIMELINE</span>
            <span className="kw-pill kw-pill--lavender">4-STEP</span>
          </div>

          <div ref={timelineWrapRef} className="kw-timeline">
            {WORKFLOW_STEPS.map((st) => (
              <div key={st.code} className="kw-timeline__row">
                <div className="mono kw-timeline__meta">
                  <span>{st.code}</span>
                  <span>{lang === 'id' ? st.id : st.en}</span>
                </div>
                <div className="kw-timeline__rail">
                  <div className="kw-timeline__fill" />
                </div>
              </div>
            ))}
          </div>
        </motion.article>
      </div>
    </section>
  );
}
