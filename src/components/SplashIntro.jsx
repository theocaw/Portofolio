import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext.jsx';
import { CassetteShell } from './CassetteDeck.jsx';
import './SplashIntro.css';

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
    const duration = 1250;

    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 2.5);
      setProgress(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      }
    };

    raf = requestAnimationFrame(tick);
    const exitTimer = window.setTimeout(() => finishSplash(), 1550);

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
        ? 'MEMUAT KASET ARSIP · TYPE II CrO₂'
        : 'LOADING ARCHIVE CASSETTE · TYPE II CrO₂'
      : progress < 92
        ? lang === 'id'
          ? 'MENYELARASKAN DECK STEREO & KATALOG...'
          : 'CALIBRATING STEREO DECK & CATALOG...'
        : lang === 'id'
          ? 'SIAP DIPUTAR'
          : 'READY TO PLAY';

  return (
    <div
      className={`kissa-splash ${exiting ? 'is-exiting' : ''}`}
      onClick={finishSplash}
      role="status"
      aria-label="Opening Osanna Patricia Limbong Archive & Listening Room"
    >
      <div className="kissa-splash__frame">
        <div className="mono kissa-splash__meta">
          <span>OSANNA PATRICIA LIMBONG</span>
          <span>ARCHIVE &amp; LISTENING ROOM · 2026</span>
        </div>

        <div className="kissa-splash__cassette-wrap">
          <CassetteShell
            code="VOL. 01"
            title="Osanna Patricia Limbong"
            subtitle="Data Analyst · Front-End Developer"
            accent="#2b4a3e"
            stripe="#d9b25f"
            side="SIDE A"
            isSpinning
          />
        </div>

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
