import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { animate, spring, createTimeline } from 'animejs';
import { useApp } from '../context/AppContext.jsx';
import './KineticGardenWidgets.css';

const CAPABILITY_PROMPTS = {
  en: [
    { prefix: 'I help teams ', highlight: 'turn raw data into clarity', suffix: ' — from cleaning to modeling' },
    { prefix: 'I design & build ', highlight: 'living front-end interfaces', suffix: ' that feel effortless to use' },
    { prefix: 'I architect ', highlight: 'structured web systems', suffix: ' — clean ERDs to responsive UI' },
    { prefix: 'I bridge ', highlight: 'analytics with storytelling', suffix: ' so insights drive action' },
  ],
  id: [
    { prefix: 'Saya membantu tim ', highlight: 'mengubah data jadi keputusan', suffix: ' — dari cleaning ke pemodelan' },
    { prefix: 'Saya merancang ', highlight: 'antarmuka web yang hidup', suffix: ' dan nyaman digunakan' },
    { prefix: 'Saya membangun ', highlight: 'sistem web terstruktur', suffix: ' — dari ERD hingga UI responsif' },
    { prefix: 'Saya menjembatani ', highlight: 'analitik dengan storytelling', suffix: ' agar insight langsung berdampak' },
  ],
};

const MORPH_SHAPES = [
  {
    d: 'M 60 12 C 74 12, 86 24, 92 38 C 106 44, 108 62, 98 76 C 102 92, 86 106, 70 100 C 60 112, 42 108, 36 94 C 20 96, 10 80, 18 64 C 8 50, 18 32, 34 32 C 38 18, 48 12, 60 12 Z',
    en: 'Data Strategy',
    id: 'Strategi Data',
  },
  {
    d: 'M 60 16 C 84 16, 104 36, 104 60 C 104 84, 84 104, 60 104 C 36 104, 16 84, 16 60 C 16 36, 36 16, 60 16 C 60 16, 60 16, 60 16 C 60 16, 60 16, 60 16 Z',
    en: 'System Design',
    id: 'Desain Sistem',
  },
  {
    d: 'M 60 8 C 72 26, 94 20, 96 42 C 114 54, 102 74, 86 80 C 86 102, 68 108, 60 94 C 52 108, 34 102, 34 80 C 18 74, 6 54, 24 42 C 26 20, 48 26, 60 8 Z',
    en: 'UI Craft',
    id: 'Rekayasa UI',
  },
];

const WORKFLOW_STEPS = [
  { code: '01', en: 'Discover & Clean', id: 'Eksplorasi & Cleaning' },
  { code: '02', en: 'Model & Validate', id: 'Model & Validasi' },
  { code: '03', en: 'Design & Prototype', id: 'Desain & Prototipe' },
  { code: '04', en: 'Build & Deliver', id: 'Bangun & Rilis' },
];

export default function KineticGardenWidgets() {
  const { lang } = useApp();
  const prompts = CAPABILITY_PROMPTS[lang] || CAPABILITY_PROMPTS.en;

  const [promptIdx, setPromptIdx] = useState(0);
  const [roleFocus, setRoleFocus] = useState('data'); // 'data' | 'frontend'
  const [morphIdx, setMorphIdx] = useState(0);

  const morphPathRef = useRef(null);
  const springOrbRef = useRef(null);
  const timelineWrapRef = useRef(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setPromptIdx((i) => (i + 1) % prompts.length);
    }, 3800);
    return () => window.clearInterval(id);
  }, [prompts.length]);

  useEffect(() => {
    const el = morphPathRef.current;
    if (!el) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const anim = animate(el, {
      d: MORPH_SHAPES[morphIdx].d,
      rotate: morphIdx * 32,
      scale: [0.92, 1.04, 1],
      ease: spring({ bounce: 0.42, duration: 760 }),
    });
    return () => anim.pause();
  }, [morphIdx]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setMorphIdx((i) => (i + 1) % MORPH_SHAPES.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const orb = springOrbRef.current;
    if (!orb) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const anim = animate(orb, {
      translateX: roleFocus === 'data' ? 0 : 124,
      scale: [1, 1.2, 1],
      ease: spring({ bounce: 0.48, duration: 700 }),
    });
    return () => anim.pause();
  }, [roleFocus]);

  useEffect(() => {
    const wrap = timelineWrapRef.current;
    if (!wrap) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const bars = wrap.querySelectorAll('.kw-timeline__fill');
    const tl = createTimeline({ loop: true, defaults: { duration: 680, ease: 'outExpo' } });

    bars.forEach((bar, i) => {
      tl.add(bar, { scaleX: [0, 1], opacity: [0.45, 1] }, i * 380);
    });
    tl.add(bars, { scaleX: 0, opacity: 0.35, duration: 420, ease: 'inOutQuad' }, '+=900');

    return () => tl.pause();
  }, []);

  const triggerNextPrompt = () => {
    setPromptIdx((i) => (i + 1) % prompts.length);
    setMorphIdx((i) => (i + 1) % MORPH_SHAPES.length);
  };

  const activePrompt = prompts[promptIdx] || prompts[0];
  const activeShape = MORPH_SHAPES[morphIdx] || MORPH_SHAPES[0];

  const donutPct = roleFocus === 'data' ? 90.75 : 100; // 3.63/4.00 = 90.75% | 6/6 shipped
  const donutCirc = 2 * Math.PI * 34;
  const donutOffset = donutCirc * (1 - donutPct / 100);

  return (
    <section className="container kw-section" aria-label="How Osanna Works & Role Focus">
      <div className="kw-header">
        <span className="mono kissa-eyebrow">
          {lang === 'id'
            ? 'CARA KERJA & NILAI INTI · DUA PERAN UTAMA'
            : 'HOW I WORK & WHAT I BRING · DUAL-TRACK PROFILE'}
        </span>
        <h2 className="kw-title">
          {lang === 'id'
            ? 'Dari eksplorasi data hingga antarmuka yang siap pakai.'
            : 'From analytical discovery to living, production-ready interfaces.'}
        </h2>
      </div>

      {/* Interactive Value-Proposition Bar */}
      <motion.div
        className="kw-prompt-bar"
        whileHover={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 380, damping: 24 }}
      >
        <span className="mono kw-prompt-badge">
          {lang === 'id' ? 'PERAN SAYA' : 'MY VALUE'}
        </span>

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
          aria-label="Next capability"
          title={lang === 'id' ? 'Lihat kemampuan berikutnya' : 'Cycle next capability'}
        >
          ↑
        </motion.button>
      </motion.div>

      {/* 4 Purposeful Interactive Recruiter Tiles */}
      <div className="kw-grid">
        {/* Tile 1: Academic & Delivery Track Record */}
        <motion.article
          className="kw-card"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        >
          <div className="mono kw-card__top">
            <span>01 / {lang === 'id' ? 'REKAM JEJAK' : 'TRACK RECORD'}</span>
            <span className="kw-pill kw-pill--rose">
              {roleFocus === 'data' ? 'IPB TPL' : 'PORTFOLIO'}
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
              <strong>{roleFocus === 'data' ? '3.63' : '06+'}</strong>
              <span className="mono">{roleFocus === 'data' ? '/ 4.00 GPA' : 'SHIPPED'}</span>
            </div>
          </div>
          <p className="kw-card__caption">
            {roleFocus === 'data'
              ? lang === 'id'
                ? 'Fondasi akademik kuat di Rekayasa Perangkat Lunak IPB University.'
                : 'Consistent 3.63/4.00 GPA in Software Engineering at IPB University.'
              : lang === 'id'
                ? '6 studi kasus selesai + 1 website perusahaan live (kctjakarta.com).'
                : '6 documented case studies + 1 live industry corporate website.'}
          </p>
        </motion.article>

        {/* Tile 2: Multidisciplinary Adaptability (Prominent Label Below Bloom) */}
        <motion.article
          className="kw-card kw-card--clickable"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
          onClick={() => setMorphIdx((i) => (i + 1) % MORPH_SHAPES.length)}
        >
          <div className="mono kw-card__top">
            <span>02 / {lang === 'id' ? 'MULTIDISIPLIN' : 'VERSATILITY'}</span>
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
                d={MORPH_SHAPES[0].d}
                fill="url(#gardenMorphGrad)"
                style={{ transformOrigin: '60px 60px' }}
              />
              <circle cx="60" cy="60" r="10" fill="var(--card-bg)" opacity="0.9" />
            </svg>
          </div>

          <div className="kw-morph-label-area">
            <AnimatePresence mode="wait">
              <motion.strong
                key={`${lang}-${morphIdx}`}
                className="kw-morph-discipline"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22 }}
              >
                {lang === 'id' ? activeShape.id : activeShape.en}
              </motion.strong>
            </AnimatePresence>
            <div className="kw-morph-dots" aria-hidden="true">
              {MORPH_SHAPES.map((s, idx) => (
                <span key={s.en} className={idx === morphIdx ? 'is-active' : ''} />
              ))}
            </div>
          </div>
        </motion.article>

        {/* Tile 3: Interactive Dual-Track Role Switcher (Clean, Zero Instruction Caption) */}
        <motion.article
          className="kw-card"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        >
          <div className="mono kw-card__top">
            <span>03 / {lang === 'id' ? 'FOKUS PERAN' : 'ROLE SWITCH'}</span>
            <span className="kw-pill kw-pill--gold">
              {roleFocus === 'data' ? 'ANALYST' : 'FRONT-END'}
            </span>
          </div>

          <div className="kw-spring-demo kw-spring-demo--tall">
            <button
              type="button"
              className="kw-spring-track"
              onClick={() => setRoleFocus((m) => (m === 'data' ? 'frontend' : 'data'))}
              aria-label="Switch between Data Analyst and Front-End Developer view"
            >
              <span className={`mono kw-spring-label ${roleFocus === 'data' ? 'is-on' : ''}`}>
                DATA
              </span>
              <span className={`mono kw-spring-label ${roleFocus === 'frontend' ? 'is-on' : ''}`}>
                UI DEV
              </span>
              <span ref={springOrbRef} className="kw-spring-orb" aria-hidden="true" />
            </button>

            <div className="kw-spring-readout mono">
              <span>
                {roleFocus === 'data'
                  ? 'PYTHON · R · SQL · ETL · ML'
                  : 'REACT · LARAVEL · TAILWIND'}
              </span>
            </div>
          </div>
        </motion.article>

        {/* Tile 4: End-to-End Delivery Process */}
        <motion.article
          className="kw-card"
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 320, damping: 22 }}
        >
          <div className="mono kw-card__top">
            <span>04 / {lang === 'id' ? 'ALUR PROSES' : 'WORKFLOW'}</span>
            <span className="kw-pill kw-pill--lavender">END-TO-END</span>
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
