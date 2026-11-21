import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import './CassetteDeck.css';

// Warm Lo-Fi Analog Tape Chords (Fmaj7 -> Em7 -> Dm7 -> Cmaj7)
const TAPE_CHORDS = [
  [174.61, 220.0, 261.63, 329.63],
  [164.81, 196.0, 246.94, 293.66],
  [146.83, 174.61, 220.0, 261.63],
  [130.81, 164.81, 196.0, 246.94],
];

/**
 * Realistic Physical Analog Cassette Tape Shell (Reusable for Deck & Rack)
 */
export function CassetteShell({
  code = 'TAPE 01',
  title = 'Ames Housing',
  subtitle = '81.94% R² · Data Mining',
  accent = '#2b4a3e',
  stripe = '#d9b25f',
  side = 'SIDE A',
  isSpinning = false,
  compact = false,
}) {
  return (
    <div
      className={`cassette-shell ${isSpinning ? 'is-spinning' : ''} ${
        compact ? 'is-compact' : ''
      }`}
      style={{ '--tape-accent': accent, '--tape-stripe': stripe }}
    >
      {/* 4 Metallic Corner Screws */}
      <span className="cassette-screw cassette-screw--tl" aria-hidden="true" />
      <span className="cassette-screw cassette-screw--tr" aria-hidden="true" />
      <span className="cassette-screw cassette-screw--bl" aria-hidden="true" />
      <span className="cassette-screw cassette-screw--br" aria-hidden="true" />

      {/* Printed Archival Paper Sticker Label */}
      <div className="cassette-label">
        <div className="cassette-label__header">
          <span className="mono cassette-label__side">{side}</span>
          <span className="mono cassette-label__spec">TYPE II CrO₂ · 60 MIN</span>
          <span className="mono cassette-label__code">{code}</span>
        </div>

        <div className="cassette-label__stripe" />

        <div className="cassette-label__titles">
          <span className="cassette-label__title">{title}</span>
          <span className="mono cassette-label__sub">{subtitle}</span>
        </div>

        {/* Recessed Transparent Tape Window with Two Toothed Spools */}
        <div className="cassette-window">
          <div className="cassette-spool cassette-spool--left">
            <div className="cassette-spool__tape-pack" />
            <div className="cassette-spool__hub">
              <span className="cassette-spool__teeth" />
            </div>
          </div>

          <div className="cassette-window__scale" aria-hidden="true">
            <span className="cassette-tape-bridge" />
            <div className="mono cassette-window__marks">
              <span>100</span>
              <span>50</span>
              <span>0</span>
            </div>
          </div>

          <div className="cassette-spool cassette-spool--right">
            <div className="cassette-spool__tape-pack cassette-spool__tape-pack--sm" />
            <div className="cassette-spool__hub">
              <span className="cassette-spool__teeth" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Trapezoidal Magnetic Tape Head Housing */}
      <div className="cassette-head-bridge" aria-hidden="true">
        <span className="cassette-hole cassette-hole--lg" />
        <span className="cassette-hole cassette-hole--sm" />
        <span className="cassette-head-pad" />
        <span className="cassette-hole cassette-hole--sm" />
        <span className="cassette-hole cassette-hole--lg" />
      </div>
    </div>
  );
}

/**
 * Interactive Hi-Fi Brushed-Metal Stereo Cassette Deck (Model OPL-26)
 */
export default function CassetteDeck({
  tapes,
  activeIndex,
  onSelectIndex,
  showDetailsLink = true,
}) {
  const { lang } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [deckMotion, setDeckMotion] = useState('idle'); // 'idle' | 'ejecting' | 'inserting'
  const [displayIndex, setDisplayIndex] = useState(activeIndex);
  const [counter, setCounter] = useState(14);
  const audioRef = useRef({ ctx: null, timer: null });

  const activeTape = tapes[displayIndex] || tapes[0];

  // Physical eject -> swap -> insert animation whenever activeIndex changes
  useEffect(() => {
    if (activeIndex === displayIndex) return undefined;
    setDeckMotion('ejecting');
    const swapTimer = window.setTimeout(() => {
      setDisplayIndex(activeIndex);
      setCounter(0);
      setDeckMotion('inserting');
    }, 260);
    const settleTimer = window.setTimeout(() => {
      setDeckMotion('idle');
    }, 620);
    return () => {
      window.clearTimeout(swapTimer);
      window.clearTimeout(settleTimer);
    };
  }, [activeIndex, displayIndex]);

  // Mechanical tape counter ticking when playing
  useEffect(() => {
    if (!isPlaying) return undefined;
    const id = window.setInterval(() => {
      setCounter((c) => (c + 1) % 9999);
    }, 850);
    return () => window.clearInterval(id);
  }, [isPlaying]);

  // Web Audio Lo-Fi Tape Crackle & Warm Rhodes Chords
  const stopAudio = () => {
    if (audioRef.current.timer) {
      window.clearInterval(audioRef.current.timer);
      audioRef.current.timer = null;
    }
    if (audioRef.current.ctx) {
      try {
        audioRef.current.ctx.close();
      } catch {
        // ignore
      }
      audioRef.current.ctx = null;
    }
    setIsPlaying(false);
  };

  const startAudio = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) {
      setIsPlaying(true);
      return;
    }

    const ctx = new AudioCtx();
    const master = ctx.createGain();
    master.gain.setValueAtTime(0.13, ctx.currentTime);
    master.connect(ctx.destination);

    // Subtle analog cassette tape hiss & crackle
    const bufferSize = ctx.sampleRate * 3;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i += 1) {
      const r = Math.random();
      output[i] = r > 0.997 ? (Math.random() * 2 - 1) * 0.32 : (Math.random() * 2 - 1) * 0.012;
    }
    const hiss = ctx.createBufferSource();
    hiss.buffer = noiseBuffer;
    hiss.loop = true;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1600, ctx.currentTime);
    const hissGain = ctx.createGain();
    hissGain.gain.setValueAtTime(0.16, ctx.currentTime);
    hiss.connect(filter);
    filter.connect(hissGain);
    hissGain.connect(master);
    hiss.start();

    let step = displayIndex % TAPE_CHORDS.length;
    const triggerChord = () => {
      if (!audioRef.current.ctx || audioRef.current.ctx.state !== 'running') return;
      const now = ctx.currentTime;
      const chord = TAPE_CHORDS[step % TAPE_CHORDS.length];
      step += 1;

      const lp = ctx.createBiquadFilter();
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(580, now);
      lp.connect(master);

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq + (Math.random() - 0.5) * 0.5, now);
        g.gain.setValueAtTime(0.0001, now);
        g.gain.exponentialRampToValueAtTime(idx === 0 ? 0.09 : 0.05, now + 0.38 + idx * 0.04);
        g.gain.exponentialRampToValueAtTime(0.0008, now + 3.4);
        osc.connect(g);
        g.connect(lp);
        osc.start(now + idx * 0.04);
        osc.stop(now + 3.5);
      });
    };

    audioRef.current = { ctx, timer: null };
    triggerChord();
    audioRef.current.timer = window.setInterval(triggerChord, 3400);
    setIsPlaying(true);
  };

  const togglePlay = () => {
    if (isPlaying) stopAudio();
    else startAudio();
  };

  const handleStep = (dir) => {
    const next = (activeIndex + dir + tapes.length) % tapes.length;
    onSelectIndex(next);
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

  const paddedCounter = String(counter).padStart(4, '0');

  return (
    <div className="hifi-deck">
      {/* Top Brushed Metal Faceplate Header */}
      <div className="hifi-deck__topbar">
        <div className="hifi-deck__brand">
          <span className={`hifi-deck__led ${isPlaying ? 'is-on' : ''}`} />
          <span className="mono hifi-deck__model">OSANNA HI-FI · STEREO DECK OPL-26</span>
        </div>

        {/* Dual Backlit Analog VU Meters */}
        <div className="hifi-deck__vu-group" aria-hidden="true">
          <div className={`hifi-vu ${isPlaying ? 'is-active' : ''}`}>
            <span className="mono hifi-vu__ch">L</span>
            <div className="hifi-vu__arc" />
            <span className="hifi-vu__needle hifi-vu__needle--l" />
          </div>
          <div className={`hifi-vu ${isPlaying ? 'is-active' : ''}`}>
            <span className="mono hifi-vu__ch">R</span>
            <div className="hifi-vu__arc" />
            <span className="hifi-vu__needle hifi-vu__needle--r" />
          </div>
        </div>
      </div>

      {/* Main Smoked-Glass Cassette Well */}
      <div className="hifi-deck__well">
        <div className="hifi-deck__well-glass" aria-hidden="true" />
        <div className={`hifi-deck__tray is-${deckMotion}`}>
          <CassetteShell
            code={activeTape.code}
            title={activeTape.shortTitle || activeTape.title}
            subtitle={activeTape.metricLine}
            accent={activeTape.accent}
            stripe={activeTape.stripe}
            side={activeTape.side || 'SIDE A'}
            isSpinning={isPlaying && deckMotion === 'idle'}
          />
        </div>
      </div>

      {/* Bottom Mechanical Transport Piano Keys & Tape Counter */}
      <div className="hifi-deck__controls">
        <div className="hifi-deck__transport" role="group" aria-label="Cassette deck controls">
          <button
            type="button"
            className="mono hifi-key"
            onClick={() => handleStep(-1)}
            title={lang === 'id' ? 'Kaset Sebelumnya' : 'Previous Tape'}
          >
            ◀◀
          </button>
          <button
            type="button"
            className={`mono hifi-key hifi-key--play ${isPlaying ? 'is-pressed' : ''}`}
            onClick={togglePlay}
            aria-pressed={isPlaying}
          >
            {isPlaying ? '❚❚ PAUSE' : '▶ PLAY'}
          </button>
          <button
            type="button"
            className="mono hifi-key"
            onClick={() => handleStep(1)}
            title={lang === 'id' ? 'Kaset Berikutnya' : 'Next Tape'}
          >
            ▶▶
          </button>
        </div>

        <div className="hifi-deck__readout">
          <div className="hifi-counter" title="Mechanical Tape Counter">
            <span className="mono hifi-counter__label">COUNTER</span>
            <span className="mono hifi-counter__digits">{paddedCounter}</span>
          </div>

          {showDetailsLink && activeTape.to && (
            <Link to={activeTape.to} className="mono hifi-deck__open-link">
              {lang === 'id' ? 'Buka Arsip ↗' : 'Open Dossier ↗'}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
