import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
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

const ROOM_TRACKS = {
  '/': { en: 'Side A · Welcome to Osanna’s Slowbar', id: 'Side A · Selamat Datang di Slowbar Osanna' },
  '/about': { en: 'Reading Room · Book of Osanna (GPA 3.63)', id: 'Ruang Baca · Buku Profil Osanna (IPK 3.63)' },
  '/work': { en: 'Vinyl Jukebox · 5 Case Studies & 2 Brewing', id: 'Jukebox Vinyl · 5 Studi Kasus & 2 Sedang Diseduh' },
  '/journey': { en: 'Café Logbook · Internship, Leadership & Honors', id: 'Logbook Kafe · Magang, Organisasi & Prestasi' },
};

export default function SiteHeader() {
  const { theme, toggleTheme, lang, setLang } = useApp();
  const { pathname } = useLocation();
  const site = getSiteContent(lang);

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

  const currentTrackObj =
    ROOM_TRACKS[pathname] ||
    (pathname.startsWith('/work/')
      ? {
          en: `Now Playing · ${pathname.replace('/work/', '').toUpperCase()} LP`,
          id: `Sedang Diputar · LP ${pathname.replace('/work/', '').toUpperCase()}`,
        }
      : ROOM_TRACKS['/']);

  const dockItems = [
    {
      to: '/',
      icon: '☕',
      label: lang === 'id' ? 'Slowbar' : 'Slowbar',
      sub: lang === 'id' ? 'Meja Kafe' : 'Café Desk',
    },
    {
      to: '/about',
      icon: '📚',
      label: lang === 'id' ? 'Perpustakaan' : 'Library',
      sub: lang === 'id' ? 'Buku & Katalog' : 'Book & Catalog',
    },
    {
      to: '/work',
      icon: '💿',
      label: lang === 'id' ? 'Jukebox Vinyl' : 'Vinyl Jukebox',
      sub: lang === 'id' ? 'Rak Piringan' : 'Record Crates',
    },
    {
      to: '/journey',
      icon: '📔',
      label: lang === 'id' ? 'Logbook' : 'Logbook',
      sub: lang === 'id' ? 'Arsip & Piala' : 'Archive & Shelf',
    },
  ];

  return (
    <>
      {/* Top Slowbar Wooden Counter Status Bar */}
      <header className="slowbar-topbar">
        <div className="container slowbar-topbar__inner">
          {/* Left: Brand Sign & Turntable Mini Icon */}
          <div className="slowbar-topbar__left">
            <Link
              to="/"
              className="site-vinyl slowbar-sign"
              aria-label={lang === 'id' ? 'Kembali ke Meja Slowbar' : 'Back to Slowbar Counter'}
            >
              <div className="site-vinyl__deck">
                <span className="site-vinyl__led" aria-hidden="true" />
                <div className="site-vinyl__scroll-rotor">
                  <svg
                    className="site-vinyl__disc"
                    viewBox="0 0 48 48"
                    width="34"
                    height="34"
                    aria-hidden="true"
                  >
                    <circle cx="24" cy="24" r="22" fill="#1b1410" stroke="#0d0907" strokeWidth="1.5" />
                    <path d="M24 3 A21 21 0 0 1 43 16 L24 24 Z" fill="rgba(243, 210, 133, 0.25)" />
                    <path d="M24 45 A21 21 0 0 1 5 32 L24 24 Z" fill="rgba(230, 163, 135, 0.25)" />
                    <circle
                      cx="24"
                      cy="24"
                      r="17"
                      fill="none"
                      stroke="rgba(255, 248, 235, 0.16)"
                      strokeWidth="0.8"
                      strokeDasharray="9 5"
                    />
                    <circle cx="24" cy="24" r="8.8" fill="#e6a387" stroke="#0d0907" strokeWidth="1.2" />
                    <path d="M24 15.2 A8.8 8.8 0 0 1 32.8 24 L15.2 24 A8.8 8.8 0 0 1 24 15.2 Z" fill="#f3d285" />
                    <circle cx="24" cy="24" r="4.5" fill="#355e47" />
                    <circle cx="24" cy="24" r="1.8" fill="#f5efe3" />
                  </svg>
                </div>
                <svg className="site-vinyl__arm" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <circle cx="19" cy="5" r="3" fill="#f3d285" stroke="#231914" strokeWidth="1.5" />
                  <path d="M19 5 L14 15 L9 18" fill="none" stroke="#231914" strokeWidth="1.6" strokeLinecap="round" />
                  <rect
                    x="6.8"
                    y="16.5"
                    width="4.2"
                    height="2.8"
                    rx="0.8"
                    transform="rotate(-28 8.9 17.9)"
                    fill="#c24928"
                  />
                </svg>
              </div>

              <div className="slowbar-sign__text">
                <span className="slowbar-sign__title">OSANNA’S SLOWBAR</span>
                <span className="mono slowbar-sign__sub">
                  {lang === 'id' ? 'PERPUSTAKAAN & KAFE VINYL' : 'LIBRARY & VINYL LISTENING CAFÉ'}
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Interactive Vinyl Radio & Equalizer Strip */}
          <div className="slowbar-topbar__center">
            <button
              type="button"
              className={`slowbar-player-pill ${isPlayingAudio ? 'is-playing' : ''}`}
              onClick={toggleSlowbarAudio}
              aria-pressed={isPlayingAudio}
              title={
                lang === 'id'
                  ? 'Klik untuk putar/jeda musik Lo-Fi Vinyl Slowbar'
                  : 'Click to play/pause Slowbar Lo-Fi Vinyl Ambience'
              }
            >
              <span className="slowbar-player-pill__eq" aria-hidden="true">
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className="mono slowbar-player-pill__track">
                {currentTrackObj[lang] || currentTrackObj.en}
              </span>
              <span className="mono slowbar-player-pill__cta">
                {isPlayingAudio ? '⏸ 45 RPM' : '▶ PLAY FM'}
              </span>
            </button>
          </div>

          {/* Right: Room Controls (Language, Lamp Switch, Quick Search) */}
          <div className="slowbar-topbar__right">
            <div className="site-header__lang-toggle" role="group" aria-label="Language selection">
              <button
                type="button"
                className={`site-header__lang-btn ${lang === 'en' ? 'is-active' : ''}`}
                onClick={() => setLang('en')}
              >
                EN
              </button>
              <span className="site-header__lang-sep">/</span>
              <button
                type="button"
                className={`site-header__lang-btn ${lang === 'id' ? 'is-active' : ''}`}
                onClick={() => setLang('id')}
              >
                ID
              </button>
            </div>

            <button
              type="button"
              className="slowbar-lamp-btn"
              onClick={toggleTheme}
              title={
                theme === 'light'
                  ? lang === 'id'
                    ? 'Redupkan Lampu (Midnight Lounge)'
                    : 'Dim Café Lights (Midnight Lounge)'
                  : lang === 'id'
                    ? 'Nyalakan Lampu Baca (Daylight Library)'
                    : 'Turn On Reading Lamp (Daylight Library)'
              }
            >
              <span aria-hidden="true">{theme === 'light' ? '🏮' : '☀️'}</span>
              <span className="mono slowbar-lamp-btn__label">
                {theme === 'light'
                  ? lang === 'id'
                    ? 'Malam'
                    : 'Lounge'
                  : lang === 'id'
                    ? 'Siang'
                    : 'Daylight'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Persistent Floating Bottom Slowbar Café Dock (Inspired by Reel 2) */}
      <nav className="slowbar-dock" aria-label="Slowbar Room Navigation">
        <div className="slowbar-dock__tray">
          {dockItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `slowbar-dock__item ${
                  isActive || (item.to === '/work' && pathname.startsWith('/work/')) ? 'is-active' : ''
                }`
              }
            >
              <span className="slowbar-dock__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="slowbar-dock__text">
                <span className="slowbar-dock__label">{item.label}</span>
                <span className="mono slowbar-dock__sub">{item.sub}</span>
              </span>
            </NavLink>
          ))}

          <span className="slowbar-dock__divider" aria-hidden="true" />

          <a
            href="#contact"
            className="slowbar-dock__order-btn"
            title={site.email}
          >
            <span aria-hidden="true">🧾</span>
            <span>{lang === 'id' ? 'Meja Kasir' : 'Order / Hire'}</span>
          </a>
        </div>
      </nav>
    </>
  );
}
