import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import './SplashIntro.css';

const PETAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export default function SplashIntro() {
  const { lang } = useApp();
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  const finishSplash = useCallback(() => {
    setExiting(true);
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
    const duration = 1280;

    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 2.5);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    const exitTimer = window.setTimeout(() => finishSplash(), 1580);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(exitTimer);
    };
  }, [visible, finishSplash]);

  useEffect(() => {
    if (!exiting) return undefined;
    const hideTimer = window.setTimeout(() => setVisible(false), 620);
    return () => window.clearTimeout(hideTimer);
  }, [exiting]);

  if (!visible) return null;

  const statusLine =
    progress < 45
      ? lang === 'id'
        ? 'MEMBUKA KONSERVATORI BOTANI...'
        : 'OPENING BOTANICAL CONSERVATORY...'
      : progress < 92
        ? lang === 'id'
          ? 'MENYEMAI BUNGA & ARSIP DATA...'
          : 'BLOOMING FLORA & DATA ARCHIVE...'
        : lang === 'id'
          ? 'SELAMAT DATANG DI TAMAN'
          : 'WELCOME TO THE GARDEN';

  return (
    <div
      className={`kissa-splash ${exiting ? 'is-exiting' : ''}`}
      onClick={finishSplash}
      role="status"
      aria-label="Opening Osanna Patricia Limbong Botanical Garden Portfolio"
    >
      <div className="kissa-splash__frame">
        <div className="mono kissa-splash__meta">
          <span>OSANNA PATRICIA LIMBONG</span>
          <span>BOTANICAL GARDEN · 2026</span>
        </div>

        {/* Blooming Botanical Peony Emblem Animated via Motion Springs */}
        <div className="kissa-splash__bloom-wrap" aria-hidden="true">
          <svg viewBox="0 0 180 180" className="kissa-splash__bloom-svg">
            <defs>
              <linearGradient id="splashPetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8c8d1" />
                <stop offset="55%" stopColor="#e27a90" />
                <stop offset="100%" stopColor="#a83d55" />
              </linearGradient>
              <linearGradient id="splashLeafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#86c7a4" />
                <stop offset="100%" stopColor="#2e5e46" />
              </linearGradient>
            </defs>

            {/* Outer Botanical Leaves */}
            {[22, 112, 202, 292].map((deg, i) => (
              <motion.ellipse
                key={`leaf-${deg}`}
                cx="90"
                cy="34"
                rx="14"
                ry="34"
                fill="url(#splashLeafGrad)"
                opacity="0.72"
                style={{ transformOrigin: '90px 90px' }}
                initial={{ scale: 0, rotate: deg - 24 }}
                animate={{ scale: 1, rotate: deg }}
                transition={{ type: 'spring', stiffness: 150, damping: 16, delay: 0.06 * i }}
              />
            ))}

            {/* 8 Unfurling Peony Petals */}
            {PETAL_ANGLES.map((deg, i) => (
              <motion.path
                key={`petal-${deg}`}
                d="M 90 90 C 66 64, 68 24, 90 18 C 112 24, 114 64, 90 90 Z"
                fill="url(#splashPetalGrad)"
                opacity="0.92"
                style={{ transformOrigin: '90px 90px' }}
                initial={{ scale: 0, rotate: deg - 30 }}
                animate={{ scale: 1, rotate: deg }}
                transition={{ type: 'spring', stiffness: 190, damping: 18, delay: 0.08 + i * 0.045 }}
              />
            ))}

            {/* Golden Pollen Core */}
            <motion.circle
              cx="90"
              cy="90"
              r="14"
              fill="#f3cc73"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.35 }}
            />
          </svg>
        </div>

        <motion.div
          className="kissa-splash__title"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
        >
          Osanna Patricia Limbong
        </motion.div>

        <div className="kissa-splash__meter">
          <div className="mono kissa-splash__meter-row">
            <span>{statusLine}</span>
            <span>{String(progress).padStart(3, '0')}%</span>
          </div>
          <div className="kissa-splash__track">
            <div className="kissa-splash__fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <span className="mono kissa-splash__skip">
          {lang === 'id' ? 'Klik di mana saja untuk masuk' : 'Click anywhere to enter'}
        </span>
      </div>
    </div>
  );
}
