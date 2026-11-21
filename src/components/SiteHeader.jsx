import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import { getSiteContent } from '../content/site.js';
import './SiteHeader.css';

// Warm Lo-Fi Slowbar Jazz progression (Fmaj7 -> Em7 -> Dm7 -> Cmaj7)
const SLOWBAR_CHORDS = [
  [174.61, 220.0, 261.63, 329.63], // Fmaj7
  [164.81, 196.0, 246.94, 293.66], // Em7
  [146.83, 174.61, 220.0, 261.63], // Dm7
  [130.81, 164.81, 196.0, 246.94], // Cmaj7
];

export default function SiteHeader() {
  const { theme, toggleTheme, lang, setLang } = useApp();
  const site = getSiteContent(lang);
  const navLinks = site.navLinks;

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = useRef({ ctx: null, timer: null, master: null });

  const stopSlowbarAudio = () => {
    const state = audioRef.current;
    if (state.timer) {
      window.clearInterval(state.timer);
      state.timer = null;
    }
    if (state.ctx) {
      try {
        state.ctx.close();
      } catch {
        // ignore
      }
      state.ctx = null;
    }
    document.documentElement.classList.remove('is-vinyl-playing');
    setIsPlayingAudio(false);
  };

  const startSlowbarAudio = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.14, ctx.currentTime);
    master.connect(ctx.destination);

    // Subtle analog vinyl surface crackle
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) {
      const r = Math.random();
      output[i] = r > 0.9965 ? (Math.random() * 2 - 1) * 0.42 : (Math.random() * 2 - 1) * 0.015;
    }
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const crackleFilter = ctx.createBiquadFilter();
    crackleFilter.type = 'bandpass';
    crackleFilter.frequency.setValueAtTime(1750, ctx.currentTime);
    crackleFilter.Q.setValueAtTime(0.9, ctx.currentTime);

    const crackleGain = ctx.createGain();
    crackleGain.gain.setValueAtTime(0.16, ctx.currentTime);

    whiteNoise.connect(crackleFilter);
    crackleFilter.connect(crackleGain);
    crackleGain.connect(master);
    whiteNoise.start();

    // Warm Rhodes-like low-pass chord cycle
    let chordIndex = 0;
    const playChord = () => {
      if (!audioRef.current.ctx || audioRef.current.ctx.state !== 'running') return;
      const now = ctx.currentTime;
      const chord = SLOWBAR_CHORDS[chordIndex % SLOWBAR_CHORDS.length];
      chordIndex += 1;

      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(620, now);
      lp.connect(master);

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        // Slight analog tape detune
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 0.6, now);

        noteGain.gain.setValueAtTime(0.0001, now);
        noteGain.gain.exponentialRampToValueAtTime(idx === 0 ? 0.095 : 0.055, now + 0.35 + idx * 0.05);
        noteGain.gain.exponentialRampToValueAtTime(0.0008, now + 3.4);

        osc.connect(noteGain);
        noteGain.connect(lp);
        osc.start(now + idx * 0.04);
        osc.stop(now + 3.5);
      });
    };

    audioRef.current = { ctx, master, timer: null };
    playChord();
    audioRef.current.timer = window.setInterval(playChord, 3400);
    document.documentElement.classList.add('is-vinyl-playing');
    setIsPlayingAudio(true);
  };

  const toggleSlowbarAudio = () => {
    if (isPlayingAudio) {
      stopSlowbarAudio();
    } else {
      startSlowbarAudio();
    }
  };

  useEffect(() => {
    return () => {
      if (audioRef.current.timer) window.clearInterval(audioRef.current.timer);
      if (audioRef.current.ctx) {
        try {
          audioRef.current.ctx.close();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return (
    <header className="site-header">
      <div className="container">
        <div className="site-header__bar">
          <div className="site-header__brand-cluster">
            <Link
              to="/"
              className="site-header__identity site-vinyl"
              aria-label={lang === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}
              title={lang === 'id' ? 'Beranda · Slowbar Vinyl & Library' : 'Home · Slowbar Vinyl & Library'}
            >
              <div className="site-vinyl__deck">
                <span className="site-vinyl__led" aria-hidden="true" />
                <div className="site-vinyl__scroll-rotor">
                  <svg
                    className="site-vinyl__disc"
                    viewBox="0 0 48 48"
                    width="38"
                    height="38"
                    aria-hidden="true"
                  >
                    {/* Outer espresso vinyl disc */}
                    <circle cx="24" cy="24" r="22" fill="#1b1410" stroke="#0d0907" strokeWidth="1.5" />

                    {/* Warm amber & matcha sheen highlights */}
                    <path
                      d="M24 3 A21 21 0 0 1 43 16 L24 24 Z"
                      fill="rgba(243, 210, 133, 0.24)"
                    />
                    <path
                      d="M24 45 A21 21 0 0 1 5 32 L24 24 Z"
                      fill="rgba(230, 163, 135, 0.24)"
                    />

                    {/* Vinyl grooves */}
                    <circle
                      cx="24"
                      cy="24"
                      r="18.5"
                      fill="none"
                      stroke="rgba(255, 248, 235, 0.14)"
                      strokeWidth="0.7"
                      strokeDasharray="10 6"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="15"
                      fill="none"
                      stroke="rgba(255, 248, 235, 0.18)"
                      strokeWidth="0.7"
                      strokeDasharray="7 5"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="11.8"
                      fill="none"
                      stroke="rgba(255, 248, 235, 0.14)"
                      strokeWidth="0.7"
                    />

                    {/* Two-tone Slowbar Terracotta & Honey Gold center label */}
                    <circle cx="24" cy="24" r="8.8" fill="#e6a387" stroke="#0d0907" strokeWidth="1.2" />
                    <path d="M24 15.2 A8.8 8.8 0 0 1 32.8 24 L15.2 24 A8.8 8.8 0 0 1 24 15.2 Z" fill="#f3d285" />
                    <circle cx="24" cy="24" r="4.5" fill="#355e47" />

                    {/* Spindle hole */}
                    <circle cx="24" cy="24" r="1.8" fill="#f5efe3" stroke="#0d0907" strokeWidth="0.9" />
                  </svg>
                </div>

                {/* Miniature turntable tonearm */}
                <svg
                  className="site-vinyl__arm"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  aria-hidden="true"
                >
                  <circle cx="19" cy="5" r="3" fill="#f3d285" stroke="#231914" strokeWidth="1.5" />
                  <path
                    d="M19 5 L14 15 L9 18"
                    fill="none"
                    stroke="#fbf7ef"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 5 L14 15 L9 18"
                    fill="none"
                    stroke="#231914"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="6.8"
                    y="16.5"
                    width="4.2"
                    height="2.8"
                    rx="0.8"
                    transform="rotate(-28 8.9 17.9)"
                    fill="#c24928"
                    stroke="#231914"
                    strokeWidth="1"
                  />
                </svg>
              </div>

              <span className="site-vinyl__note site-vinyl__note--1" aria-hidden="true">
                ♪
              </span>
              <span className="site-vinyl__note site-vinyl__note--2" aria-hidden="true">
                ✦
              </span>
            </Link>

            {/* Slowbar Ambient Lo-Fi Vinyl Toggle */}
            <button
              type="button"
              className={`mono site-vinyl__tuner ${isPlayingAudio ? 'is-playing' : ''}`}
              onClick={toggleSlowbarAudio}
              aria-pressed={isPlayingAudio}
              title={
                isPlayingAudio
                  ? lang === 'id'
                    ? 'Jeda musik ambient Slowbar'
                    : 'Pause Slowbar vinyl ambience'
                  : lang === 'id'
                    ? 'Putar musik ambient Slowbar (Lo-Fi Vinyl)'
                    : 'Play Slowbar vinyl ambience (Lo-Fi Chords)'
              }
            >
              <span className="site-vinyl__tuner-dot" aria-hidden="true" />
              <span>
                {isPlayingAudio
                  ? lang === 'id'
                    ? '♪ 45 RPM · ON'
                    : '♪ 45 RPM · ON'
                  : '♪ Slowbar FM'}
              </span>
            </button>
          </div>

          <nav className="site-header__nav" aria-label="Main">
            {navLinks.map(({ to, label }) => (
              <NavLink key={to} to={to} end={to === '/'} className="site-header__link">
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="site-header__actions">
            {/* Language Switcher */}
            <div className="site-header__lang-toggle" role="group" aria-label="Language selection">
              <button
                type="button"
                className={`site-header__lang-btn ${lang === 'en' ? 'is-active' : ''}`}
                onClick={() => setLang('en')}
                aria-label="Switch to English"
              >
                EN
              </button>
              <span className="site-header__lang-sep" aria-hidden="true">
                /
              </span>
              <button
                type="button"
                className={`site-header__lang-btn ${lang === 'id' ? 'is-active' : ''}`}
                onClick={() => setLang('id')}
                aria-label="Ganti ke Bahasa Indonesia"
              >
                ID
              </button>
            </div>

            {/* Theme Switcher */}
            <button
              type="button"
              className="site-header__theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              title={
                theme === 'light'
                  ? 'Midnight Listening Room (Dark Mode)'
                  : 'Daylight Reading Library (Light Mode)'
              }
            >
              <span className="theme-toggle__icon" aria-hidden="true">
                {theme === 'light' ? '🌙' : '☀️'}
              </span>
            </button>

            {/* Contact Action */}
            <a className="site-header__contact" href={`mailto:${site.email}`}>
              {site.contactButton || (lang === 'id' ? 'Kontak ↗' : 'Contact ↗')}
            </a>
          </div>
        </div>
        <hr className="rule" />
      </div>
    </header>
  );
}
