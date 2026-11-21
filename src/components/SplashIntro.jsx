import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext.jsx';
import './SplashIntro.css';

export default function SplashIntro() {
  const { lang } = useApp();
  const [visible, setVisible] = useState(() => {
    try {
      return !sessionStorage.getItem('portfolio_splash_done');
    } catch {
      return false;
    }
  });
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState('loading'); // 'loading' | 'dropping' | 'exiting'

  const finishSplash = useCallback(() => {
    setPhase((prev) => {
      if (prev === 'exiting') return prev;
      return 'exiting';
    });
    try {
      sessionStorage.setItem('portfolio_splash_done', '1');
    } catch {
      // ignore storage failure
    }
  }, []);

  useEffect(() => {
    if (!visible) return undefined;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      finishSplash();
      setVisible(false);
      return undefined;
    }

    let raf = 0;
    const t0 = performance.now();
    const loadDuration = 1250; // ms for 0 -> 100%

    const tick = (now) => {
      const elapsed = now - t0;
      const p = Math.min(1, elapsed / loadDuration);
      const eased = 1 - Math.pow(1 - p, 2.6);
      setProgress(Math.round(eased * 100));

      if (p >= 0.35 && p < 1) {
        setPhase((cur) => (cur === 'loading' ? 'dropping' : cur));
      }

      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setPhase('dropping');
      }
    };

    raf = requestAnimationFrame(tick);

    const exitTimer = window.setTimeout(() => {
      finishSplash();
    }, 1550);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(exitTimer);
    };
  }, [visible, finishSplash]);

  useEffect(() => {
    if (phase !== 'exiting') return undefined;
    const hideTimer = window.setTimeout(() => {
      setVisible(false);
    }, 680);
    return () => window.clearTimeout(hideTimer);
  }, [phase]);

  if (!visible) return null;

  const statusText =
    progress < 40
      ? lang === 'id'
        ? 'MEMUAT PIRINGAN VINYL...'
        : 'MOUNTING VINYL RECORD...'
      : progress < 88
        ? lang === 'id'
          ? 'MENURUNKAN JARUM · SIDE A & B...'
          : 'DROPPING TONEARM · SIDE A & B...'
        : lang === 'id'
          ? '✦ SIAP DIPUTAR'
          : '✦ READY TO PLAY';

  return (
    <div
      className={`splash-intro ${phase === 'dropping' ? 'is-dropping' : ''} ${
        phase === 'exiting' ? 'is-exiting' : ''
      }`}
      onClick={finishSplash}
      role="status"
      aria-label="Opening Osanna Patricia Limbong Portfolio"
    >
      {/* Ambient Aurora Glow Orbs */}
      <div className="splash-intro__orb splash-intro__orb--blue" aria-hidden="true" />
      <div className="splash-intro__orb splash-intro__orb--pink" aria-hidden="true" />
      <div className="splash-intro__orb splash-intro__orb--mint" aria-hidden="true" />

      <div className="splash-intro__card">
        {/* Top Tag Bar */}
        <div className="mono splash-intro__top-bar">
          <span className="splash-intro__badge">
            <span className="splash-intro__dot" />
            PORTFOLIO EDITION · 2026
          </span>
          <span className="splash-intro__rpm">45 RPM · STEREO</span>
        </div>

        {/* Center Turntable Deck */}
        <div className="splash-intro__turntable">
          <div className="splash-intro__platter">
            <svg
              className="splash-intro__disc"
              viewBox="0 0 120 120"
              width="124"
              height="124"
              aria-hidden="true"
            >
              {/* Outer Vinyl Record */}
              <circle cx="60" cy="60" r="56" fill="#111729" stroke="#070a14" strokeWidth="3" />

              {/* Vinyl Iridescent Reflections */}
              <path
                d="M60 6 A54 54 0 0 1 110 38 L60 60 Z"
                fill="rgba(96, 165, 250, 0.25)"
              />
              <path
                d="M60 114 A54 54 0 0 1 10 82 L60 60 Z"
                fill="rgba(244, 114, 182, 0.24)"
              />

              {/* Concentric Grooves */}
              <circle
                cx="60"
                cy="60"
                r="47"
                fill="none"
                stroke="rgba(255, 255, 255, 0.14)"
                strokeWidth="1.2"
                strokeDasharray="16 10"
              />
              <circle
                cx="60"
                cy="60"
                r="39"
                fill="none"
                stroke="rgba(255, 255, 255, 0.18)"
                strokeWidth="1.2"
                strokeDasharray="12 8"
              />
              <circle
                cx="60"
                cy="60"
                r="31"
                fill="none"
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1.2"
              />

              {/* Center Y2K Label */}
              <circle cx="60" cy="60" r="22" fill="#ff8dc7" stroke="#070a14" strokeWidth="2.4" />
              <path
                d="M60 38 A22 22 0 0 1 82 60 L38 60 A22 22 0 0 1 60 38 Z"
                fill="#fef08a"
              />
              <circle cx="60" cy="60" r="11" fill="#2563eb" />
              <circle cx="60" cy="60" r="4.2" fill="#faf6ef" stroke="#070a14" strokeWidth="1.8" />
            </svg>
          </div>

          {/* Animated Tonearm */}
          <svg
            className="splash-intro__arm"
            viewBox="0 0 64 64"
            width="58"
            height="58"
            aria-hidden="true"
          >
            <circle cx="50" cy="14" r="7.5" fill="#fef08a" stroke="#14234a" strokeWidth="3" />
            <path
              d="M50 14 L38 40 L23 48"
              fill="none"
              stroke="#f8fafc"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M50 14 L38 40 L23 48"
              fill="none"
              stroke="#14234a"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect
              x="17"
              y="44"
              width="11"
              height="7"
              rx="2"
              transform="rotate(-28 22.5 47.5)"
              fill="#e11d48"
              stroke="#14234a"
              strokeWidth="2.2"
            />
          </svg>

          <span className="splash-intro__note splash-intro__note--1" aria-hidden="true">
            ♪
          </span>
          <span className="splash-intro__note splash-intro__note--2" aria-hidden="true">
            ✦
          </span>
        </div>

        {/* Identity Headline */}
        <div className="splash-intro__identity">
          <h1 className="splash-intro__name">Osanna Patricia Limbong</h1>
          <p className="mono splash-intro__roles">
            DATA ANALYST <span>✦</span> FRONT-END DEVELOPER
          </p>
        </div>

        {/* Progress Meter */}
        <div className="splash-intro__progress-wrap">
          <div className="mono splash-intro__progress-meta">
            <span>{statusText}</span>
            <span className="splash-intro__percent">{progress}%</span>
          </div>
          <div className="splash-intro__bar-track">
            <div
              className="splash-intro__bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <span className="mono splash-intro__skip">
          {lang === 'id' ? 'Klik di mana saja untuk lewati ↗' : 'Click anywhere to skip ↗'}
        </span>
      </div>
    </div>
  );
}
