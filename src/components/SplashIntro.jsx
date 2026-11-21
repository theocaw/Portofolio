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
    const loadDuration = 1280; // ms for 0 -> 100%

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
    }, 1580);

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
    progress < 38
      ? lang === 'id'
        ? 'MENYEDUH KOPI & MENATA KATALOG ARSIP...'
        : 'BREWING POUR-OVER & INDEXING ARCHIVE...'
      : progress < 88
        ? lang === 'id'
          ? 'MENURUNKAN JARUM VINYL · SIDE A & B...'
          : 'DROPPING TONEARM · SIDE A & B...'
        : lang === 'id'
          ? '✦ SELAMAT DATANG DI SLOWBAR'
          : '✦ WELCOME TO THE SLOWBAR';

  return (
    <div
      className={`splash-intro ${phase === 'dropping' ? 'is-dropping' : ''} ${
        phase === 'exiting' ? 'is-exiting' : ''
      }`}
      onClick={finishSplash}
      role="status"
      aria-label="Opening Osanna Patricia Limbong Slowbar Portfolio"
    >
      {/* Ambient Slowbar Glow Orbs */}
      <div className="splash-intro__orb splash-intro__orb--blue" aria-hidden="true" />
      <div className="splash-intro__orb splash-intro__orb--pink" aria-hidden="true" />
      <div className="splash-intro__orb splash-intro__orb--mint" aria-hidden="true" />

      <div className="splash-intro__card">
        {/* Top Tag Bar */}
        <div className="mono splash-intro__top-bar">
          <span className="splash-intro__badge">
            <span className="splash-intro__dot" />
            SLOWBAR · VINYL &amp; LIBRARY ARCHIVE
          </span>
          <span className="splash-intro__rpm">45 RPM · HI-FI</span>
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
              {/* Outer Espresso Vinyl Record */}
              <circle cx="60" cy="60" r="56" fill="#1b1410" stroke="#0d0907" strokeWidth="3" />

              {/* Warm Amber & Terracotta Reflections */}
              <path
                d="M60 6 A54 54 0 0 1 110 38 L60 60 Z"
                fill="rgba(243, 210, 133, 0.25)"
              />
              <path
                d="M60 114 A54 54 0 0 1 10 82 L60 60 Z"
                fill="rgba(230, 163, 135, 0.25)"
              />

              {/* Concentric Grooves */}
              <circle
                cx="60"
                cy="60"
                r="47"
                fill="none"
                stroke="rgba(255, 248, 235, 0.14)"
                strokeWidth="1.2"
                strokeDasharray="16 10"
              />
              <circle
                cx="60"
                cy="60"
                r="39"
                fill="none"
                stroke="rgba(255, 248, 235, 0.18)"
                strokeWidth="1.2"
                strokeDasharray="12 8"
              />
              <circle
                cx="60"
                cy="60"
                r="31"
                fill="none"
                stroke="rgba(255, 248, 235, 0.15)"
                strokeWidth="1.2"
              />

              {/* Center Slowbar Terracotta & Honey Gold Label */}
              <circle cx="60" cy="60" r="22" fill="#e6a387" stroke="#0d0907" strokeWidth="2.4" />
              <path
                d="M60 38 A22 22 0 0 1 82 60 L38 60 A22 22 0 0 1 60 38 Z"
                fill="#f3d285"
              />
              <circle cx="60" cy="60" r="11" fill="#355e47" />
              <circle cx="60" cy="60" r="4.2" fill="#f5efe3" stroke="#0d0907" strokeWidth="1.8" />
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
            <circle cx="50" cy="14" r="7.5" fill="#f3d285" stroke="#231914" strokeWidth="3" />
            <path
              d="M50 14 L38 40 L23 48"
              fill="none"
              stroke="#fbf7ef"
              strokeWidth="5.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M50 14 L38 40 L23 48"
              fill="none"
              stroke="#231914"
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
              fill="#c24928"
              stroke="#231914"
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
          {lang === 'id' ? 'Klik di mana saja untuk masuk ↗' : 'Click anywhere to enter ↗'}
        </span>
      </div>
    </div>
  );
}
