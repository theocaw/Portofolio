import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import './BotanicalHeroCanvas.css';

const FLOWER_SPECIES = [
  {
    name: 'Peony',
    petals: 10,
    innerPetals: 7,
    outerColor: '#e88b9c',
    innerColor: '#f8c8d1',
    centerColor: '#e7bc62',
    radius: 34,
  },
  {
    name: 'Marigold',
    petals: 12,
    innerPetals: 8,
    outerColor: '#df9c38',
    innerColor: '#f6d37b',
    centerColor: '#9c4c1f',
    radius: 30,
  },
  {
    name: 'Cosmos',
    petals: 8,
    innerPetals: 5,
    outerColor: '#f4ece4',
    innerColor: '#e6b2bd',
    centerColor: '#d9a441',
    radius: 32,
  },
  {
    name: 'Lavender Star',
    petals: 9,
    innerPetals: 6,
    outerColor: '#9f8fd1',
    innerColor: '#d8cef2',
    centerColor: '#f0cf7b',
    radius: 28,
  },
  {
    name: 'Camellia',
    petals: 11,
    innerPetals: 7,
    outerColor: '#c94d66',
    innerColor: '#f09bac',
    centerColor: '#f5d78c',
    radius: 35,
  },
];

const BUTTERFLY_STYLES = [
  { wingA: '#f4b5c2', wingB: '#c94d66', edge: '#471a26', accent: '#f8e6c1' }, // Camellia Swallowtail
  { wingA: '#f4c76b', wingB: '#cf7c28', edge: '#3d210b', accent: '#fff6de' }, // Marigold Monarch
  { wingA: '#9ed9ba', wingB: '#3e8565', edge: '#143326', accent: '#eefaf3' }, // Glasshouse Morpho
  { wingA: '#cfc3f2', wingB: '#7a68b5', edge: '#2a204a', accent: '#f7f4ff' }, // Twilight Velvet
];

function createButterfly(width, height, index) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.85 + Math.random() * 0.55;
  return {
    id: `${Date.now()}-${index}-${Math.random()}`,
    x: width * (0.15 + Math.random() * 0.7),
    y: height * (0.18 + Math.random() * 0.64),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    angle,
    size: 16 + Math.random() * 7,
    wingPhase: Math.random() * Math.PI * 2,
    wingSpeed: 0.16 + Math.random() * 0.06,
    style: BUTTERFLY_STYLES[index % BUTTERFLY_STYLES.length],
    wanderAngle: angle,
    targetFlowerId: null,
  };
}

function createFlower(x, y, speciesIdx, preBloomed = false) {
  const species = FLOWER_SPECIES[speciesIdx % FLOWER_SPECIES.length];
  return {
    id: `${Date.now()}-${Math.random()}`,
    x,
    y,
    species,
    rot: Math.random() * Math.PI * 2,
    swayPhase: Math.random() * Math.PI * 2,
    scale: preBloomed ? 1 : 0.02,
    scaleVel: preBloomed ? 0 : 0.17,
    bornAt: performance.now(),
    isTarget: !preBloomed,
    leaves: [
      Math.random() * Math.PI * 2,
      Math.random() * Math.PI * 2 + 2.1,
    ],
  };
}

// Gentle Web Audio botanical wind-chime / conservatory harp ambient synth
function createGardenAudioEngine() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  const ctx = new AudioCtx();
  const master = ctx.createGain();
  master.gain.value = 0.16;
  master.connect(ctx.destination);

  // Pentatonic conservatory harp frequencies (D major pentatonic)
  const notes = [293.66, 329.63, 369.99, 440.0, 493.88, 587.33, 659.25, 739.99];

  const playNote = (freq, duration = 2.6, gainPeak = 0.18) => {
    if (ctx.state === 'suspended') return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const env = ctx.createGain();

    osc.type = 'sine';
    osc2.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    osc2.frequency.setValueAtTime(freq * 2, now);

    env.gain.setValueAtTime(0.0001, now);
    env.gain.exponentialRampToValueAtTime(gainPeak, now + 0.06);
    env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const harmonicGain = ctx.createGain();
    harmonicGain.gain.value = 0.18;

    osc.connect(env);
    osc2.connect(harmonicGain);
    harmonicGain.connect(env);
    env.connect(master);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration + 0.05);
    osc2.stop(now + duration + 0.05);
  };

  let timer = null;
  const start = async () => {
    if (ctx.state === 'suspended') await ctx.resume();
    playNote(notes[0], 3.2, 0.2);
    playNote(notes[3], 3.6, 0.14);
    timer = window.setInterval(() => {
      const n1 = notes[Math.floor(Math.random() * notes.length)];
      playNote(n1, 2.4 + Math.random() * 1.4, 0.14);
      if (Math.random() > 0.55) {
        const n2 = notes[Math.floor(Math.random() * notes.length)];
        window.setTimeout(() => playNote(n2, 2.2, 0.09), 260);
      }
    }, 1700);
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const playBloomChime = () => {
    if (ctx.state !== 'running') return;
    const base = notes[Math.floor(Math.random() * 5)];
    playNote(base, 1.5, 0.22);
    window.setTimeout(() => playNote(base * 1.5, 1.8, 0.14), 90);
  };

  const destroy = () => {
    stop();
    ctx.close().catch(() => {});
  };

  return { start, stop, playBloomChime, destroy };
}

export default function BotanicalHeroCanvas({ availability }) {
  const { lang } = useApp();
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);

  const [butterflyCount, setButterflyCount] = useState(4);
  const [bloomCount, setBloomCount] = useState(5);
  const [audioOn, setAudioOn] = useState(false);

  const stateRef = useRef({
    width: 900,
    height: 580,
    butterflies: [],
    flowers: [],
    ripples: [],
    sparks: [],
    speciesCursor: 0,
    pointer: { x: -9999, y: -9999 },
  });

  // Plant a flower at (x, y) with pollen burst + ripple + butterfly attraction
  const plantFlowerAt = useCallback((x, y, playSound = true) => {
    const st = stateRef.current;
    const flower = createFlower(x, y, st.speciesCursor++, false);

    // Keep max 28 flowers so the garden stays lush and crisp at 60fps
    if (st.flowers.length >= 28) {
      st.flowers.shift();
    }
    st.flowers.push(flower);
    setBloomCount(st.flowers.length);

    st.ripples.push({
      x,
      y,
      r: 8,
      maxR: 86,
      alpha: 0.72,
      color: flower.species.outerColor,
    });

    for (let i = 0; i < 8; i++) {
      const a = (Math.PI * 2 * i) / 8 + Math.random() * 0.4;
      const spd = 0.8 + Math.random() * 1.6;
      st.sparks.push({
        x,
        y,
        vx: Math.cos(a) * spd,
        vy: Math.sin(a) * spd - 0.35,
        r: 1.8 + Math.random() * 2.2,
        alpha: 0.95,
        color: i % 2 === 0 ? '#f6d37b' : flower.species.innerColor,
      });
    }

    // Attract 2 nearest butterflies to this freshly planted bloom
    const sorted = [...st.butterflies].sort((a, b) => {
      const da = Math.hypot(a.x - x, a.y - y);
      const db = Math.hypot(b.x - x, b.y - y);
      return da - db;
    });
    sorted.slice(0, 2).forEach((bf) => {
      bf.targetFlowerId = flower.id;
    });

    if (playSound && audioRef.current) {
      audioRef.current.playBloomChime();
    }
  }, []);

  // Toggle ambient conservatory harp audio
  const toggleAudio = async () => {
    if (!audioRef.current) {
      audioRef.current = createGardenAudioEngine();
    }
    if (!audioRef.current) return;

    if (audioOn) {
      audioRef.current.stop();
      setAudioOn(false);
    } else {
      await audioRef.current.start();
      setAudioOn(true);
    }
  };

  // Sync butterfly count dynamically when user clicks − / +
  useEffect(() => {
    const st = stateRef.current;
    while (st.butterflies.length < butterflyCount) {
      st.butterflies.push(createButterfly(st.width, st.height, st.butterflies.length));
    }
    while (st.butterflies.length > butterflyCount) {
      st.butterflies.pop();
    }
  }, [butterflyCount]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.destroy();
        audioRef.current = null;
      }
    };
  }, []);

  // 60fps Living Canvas Engine (Butterflies + Blooming Flowers + Z-Depth Shadows)
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const st = stateRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const seedInitialGarden = (w, h) => {
      const spots = [
        [w * 0.13, h * 0.24],
        [w * 0.86, h * 0.27],
        [w * 0.16, h * 0.77],
        [w * 0.83, h * 0.75],
        [w * 0.52, h * 0.84],
      ];
      st.flowers = spots.map(([fx, fy], idx) => createFlower(fx, fy, idx, true));
      st.speciesCursor = spots.length;
      setBloomCount(st.flowers.length);
    };

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      st.width = Math.max(320, rect.width);
      st.height = Math.max(440, rect.height);
      canvas.width = Math.floor(st.width * dpr);
      canvas.height = Math.floor(st.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (st.flowers.length === 0) {
        seedInitialGarden(st.width, st.height);
      }
      if (st.butterflies.length === 0) {
        for (let i = 0; i < butterflyCount; i++) {
          st.butterflies.push(createButterfly(st.width, st.height, i));
        }
      }
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(stage);

    const drawFlower = (f, t) => {
      // Spring physics for blooming unfurl (scale -> 1.0 with slight overshoot)
      const force = (1 - f.scale) * 0.12;
      f.scaleVel = (f.scaleVel + force) * 0.78;
      f.scale = Math.max(0.01, f.scale + f.scaleVel);

      const sway = Math.sin(t * 1.4 + f.swayPhase) * 0.055;
      const r = f.species.radius * f.scale;

      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rot + sway);

      // Soft botanical shadow for Z-depth over typography
      ctx.save();
      ctx.translate(6, 10);
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.92, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(6, 16, 11, 0.28)';
      ctx.filter = 'blur(5px)';
      ctx.fill();
      ctx.restore();

      // Botanical leaves peeking beneath petals
      ctx.fillStyle = '#3b7355';
      for (const leafAngle of f.leaves) {
        ctx.save();
        ctx.rotate(leafAngle);
        ctx.beginPath();
        ctx.ellipse(r * 0.88, 0, r * 0.55, r * 0.24, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Outer petal ring
      const { petals, innerPetals, outerColor, innerColor, centerColor } = f.species;
      for (let i = 0; i < petals; i++) {
        const ang = (Math.PI * 2 * i) / petals;
        ctx.save();
        ctx.rotate(ang);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(r * 0.48, -r * 0.34, r * 1.05, -r * 0.22, r, 0);
        ctx.bezierCurveTo(r * 1.05, r * 0.22, r * 0.48, r * 0.34, 0, 0);
        ctx.fillStyle = outerColor;
        ctx.fill();
        ctx.restore();
      }

      // Inner petal ring
      for (let i = 0; i < innerPetals; i++) {
        const ang = (Math.PI * 2 * i) / innerPetals + 0.28;
        ctx.save();
        ctx.rotate(ang);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(r * 0.3, -r * 0.22, r * 0.68, -r * 0.16, r * 0.64, 0);
        ctx.bezierCurveTo(r * 0.68, r * 0.16, r * 0.3, r * 0.22, 0, 0);
        ctx.fillStyle = innerColor;
        ctx.fill();
        ctx.restore();
      }

      // Pollen center
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = centerColor;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(-r * 0.05, -r * 0.05, r * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.45)';
      ctx.fill();

      ctx.restore();
    };

    const drawButterfly = (bf) => {
      const flap = Math.abs(Math.sin(bf.wingPhase));
      const wingScaleX = 0.26 + flap * 0.74;
      const s = bf.size;

      // Soft Z-depth drop shadow cast onto hero headline below
      ctx.save();
      ctx.translate(bf.x + 14, bf.y + 22);
      ctx.rotate(bf.angle + Math.PI / 2);
      ctx.scale(wingScaleX * 0.9, 0.9);
      ctx.fillStyle = 'rgba(4, 12, 8, 0.34)';
      ctx.filter = 'blur(6px)';
      ctx.beginPath();
      ctx.ellipse(-s * 0.55, -s * 0.12, s * 0.68, s * 0.52, -0.25, 0, Math.PI * 2);
      ctx.ellipse(s * 0.55, -s * 0.12, s * 0.68, s * 0.52, 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(bf.x, bf.y);
      ctx.rotate(bf.angle + Math.PI / 2);

      // Draw symmetric wings with realistic sinusoidal foreshortening
      for (const dir of [-1, 1]) {
        ctx.save();
        ctx.scale(dir * wingScaleX, 1);

        // Forewing
        const grad = ctx.createLinearGradient(0, -s, s * 1.25, s * 0.3);
        grad.addColorStop(0, bf.style.wingA);
        grad.addColorStop(0.68, bf.style.wingB);
        grad.addColorStop(1, bf.style.edge);

        ctx.beginPath();
        ctx.moveTo(0, -s * 0.15);
        ctx.bezierCurveTo(s * 0.65, -s * 1.15, s * 1.48, -s * 0.68, s * 1.15, s * 0.08);
        ctx.bezierCurveTo(s * 0.85, s * 0.35, s * 0.25, s * 0.2, 0, s * 0.06);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();

        // Forewing pearl spot
        ctx.beginPath();
        ctx.arc(s * 0.74, -s * 0.34, s * 0.13, 0, Math.PI * 2);
        ctx.fillStyle = bf.style.accent;
        ctx.fill();

        // Hindwing with swallowtail curve
        ctx.beginPath();
        ctx.moveTo(0, s * 0.04);
        ctx.bezierCurveTo(s * 0.92, s * 0.12, s * 0.96, s * 0.85, s * 0.45, s * 1.05);
        ctx.bezierCurveTo(s * 0.22, s * 0.92, s * 0.12, s * 0.52, 0, s * 0.32);
        ctx.closePath();
        ctx.fillStyle = bf.style.wingB;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s * 0.45, s * 0.52, s * 0.09, 0, Math.PI * 2);
        ctx.fillStyle = bf.style.accent;
        ctx.fill();

        ctx.restore();
      }

      // Slender botanical thorax & antennae
      ctx.fillStyle = bf.style.edge;
      ctx.beginPath();
      ctx.ellipse(0, 0.08 * s, s * 0.09, s * 0.42, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = bf.style.edge;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-1, -s * 0.3);
      ctx.quadraticCurveTo(-s * 0.25, -s * 0.68, -s * 0.32, -s * 0.74);
      ctx.moveTo(1, -s * 0.3);
      ctx.quadraticCurveTo(s * 0.25, -s * 0.68, s * 0.32, -s * 0.74);
      ctx.stroke();

      ctx.restore();
    };

    let rafId = 0;
    let tick = 0;

    const frame = () => {
      rafId = window.requestAnimationFrame(frame);
      if (document.hidden) return;
      tick += 0.016;

      ctx.clearRect(0, 0, st.width, st.height);

      // 1. Expanding golden ripples where flowers were planted
      for (let i = st.ripples.length - 1; i >= 0; i--) {
        const rp = st.ripples[i];
        rp.r += 2.2;
        rp.alpha *= 0.94;
        if (rp.alpha < 0.02 || rp.r > rp.maxR) {
          st.ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = rp.color;
        ctx.globalAlpha = rp.alpha;
        ctx.lineWidth = 1.6;
        ctx.stroke();
        ctx.globalAlpha = 1;
      }

      // 2. Blooming procedural flowers
      for (const f of st.flowers) {
        drawFlower(f, tick);
      }

      // 3. Drifting pollen sparks
      for (let i = st.sparks.length - 1; i >= 0; i--) {
        const sp = st.sparks[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.97;
        sp.vy *= 0.97;
        sp.alpha *= 0.955;
        if (sp.alpha < 0.03) {
          st.sparks.splice(i, 1);
          continue;
        }
        ctx.globalAlpha = sp.alpha;
        ctx.fillStyle = sp.color;
        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // 4. Living 60fps Butterflies (flying over typography + attracted to planted blooms)
      for (let i = 0; i < st.butterflies.length; i++) {
        const bf = st.butterflies[i];
        let desiredVx = Math.cos(bf.wanderAngle) * 1.15;
        let desiredVy = Math.sin(bf.wanderAngle) * 1.15;
        let hurry = false;

        // Gentle organic wander
        bf.wanderAngle += (Math.random() - 0.5) * 0.09;

        // Steer toward assigned newly planted flower
        if (bf.targetFlowerId) {
          const target = st.flowers.find((f) => f.id === bf.targetFlowerId);
          if (target) {
            const dx = target.x - bf.x;
            const dy = target.y - bf.y;
            const dist = Math.hypot(dx, dy);
            if (dist > 26) {
              desiredVx = (dx / dist) * 2.6;
              desiredVy = (dy / dist) * 2.6;
              hurry = true;
            } else {
              // Orbit gently around the flower then release after 4.5s
              const orbitAngle = Math.atan2(dy, dx) + Math.PI / 2;
              desiredVx = Math.cos(orbitAngle) * 1.05;
              desiredVy = Math.sin(orbitAngle) * 1.05;
              if (performance.now() - target.bornAt > 4800) {
                bf.targetFlowerId = null;
              }
            }
          } else {
            bf.targetFlowerId = null;
          }
        }

        // Soft collision avoidance with other butterflies
        for (let j = 0; j < st.butterflies.length; j++) {
          if (i === j) continue;
          const other = st.butterflies[j];
          const dx = bf.x - other.x;
          const dy = bf.y - other.y;
          const d = Math.hypot(dx, dy);
          if (d > 0 && d < 64) {
            desiredVx += (dx / d) * 0.7;
            desiredVy += (dy / d) * 0.7;
          }
        }

        // Smooth boundary turnaround inside conservatory frame
        const margin = 52;
        if (bf.x < margin) desiredVx += 1.4;
        if (bf.x > st.width - margin) desiredVx -= 1.4;
        if (bf.y < margin) desiredVy += 1.4;
        if (bf.y > st.height - margin) desiredVy -= 1.4;

        bf.vx += (desiredVx - bf.vx) * 0.045;
        bf.vy += (desiredVy - bf.vy) * 0.045;
        bf.x += bf.vx;
        bf.y += bf.vy;

        const targetAngle = Math.atan2(bf.vy, bf.vx);
        let diff = targetAngle - bf.angle;
        while (diff > Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;
        bf.angle += diff * 0.12;

        bf.wingPhase += bf.wingSpeed * (hurry ? 1.65 : 1);
        drawButterfly(bf);
      }
    };

    rafId = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(rafId);
      ro.disconnect();
    };
  }, []);

  const handleStageClick = (e) => {
    if (e.target.closest('button, a')) return;
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    plantFlowerAt(e.clientX - rect.left, e.clientY - rect.top, true);
  };

  const handlePlantRandom = () => {
    const st = stateRef.current;
    const rx = st.width * (0.14 + Math.random() * 0.72);
    const ry = st.height * (0.2 + Math.random() * 0.62);
    plantFlowerAt(rx, ry, true);
  };

  const handleClearBlooms = () => {
    const st = stateRef.current;
    st.flowers = st.flowers.slice(0, 3);
    setBloomCount(st.flowers.length);
  };

  return (
    <section className="container garden-hero-wrap">
      <div
        ref={stageRef}
        className="garden-hero-stage"
        onClick={handleStageClick}
        role="region"
        aria-label="Interactive Botanical Conservatory Hero — click anywhere to plant flowers"
      >
        {/* Subtle Glasshouse Mullion Architectural Lines */}
        <div className="garden-hero__mullions" aria-hidden="true" />
        <div className="garden-hero__sunbeam" aria-hidden="true" />

        {/* Top Floating Frosted-Glass Control Bar (Reel 3 inspired) */}
        <div className="garden-hero__topbar">
          <div className="garden-glass-pill mono">
            <span className="garden-live-dot" aria-hidden="true" />
            <span>{availability}</span>
          </div>

          <div className="garden-hero__controls">
            <button
              type="button"
              className={`garden-glass-btn mono ${audioOn ? 'is-active' : ''}`}
              onClick={toggleAudio}
              aria-pressed={audioOn}
            >
              {audioOn
                ? lang === 'id'
                  ? 'Musik Taman: ON'
                  : 'Garden Audio: ON'
                : lang === 'id'
                  ? 'Musik Taman: OFF'
                  : 'Garden Audio: OFF'}
            </button>

            <div className="garden-glass-counter mono" aria-label="Butterfly count control">
              <span>{lang === 'id' ? 'Kupu-Kupu' : 'Butterflies'}</span>
              <button
                type="button"
                onClick={() => setButterflyCount((c) => Math.max(1, c - 1))}
                aria-label="Decrease butterflies"
              >
                −
              </button>
              <strong>{String(butterflyCount).padStart(2, '0')}</strong>
              <button
                type="button"
                onClick={() => setButterflyCount((c) => Math.min(10, c + 1))}
                aria-label="Increase butterflies"
              >
                +
              </button>
            </div>

            <button
              type="button"
              className="garden-glass-btn garden-glass-btn--accent mono"
              onClick={handlePlantRandom}
            >
              + {lang === 'id' ? `Tanam Bunga (${bloomCount})` : `Plant Bloom (${bloomCount})`}
            </button>

            {bloomCount > 6 && (
              <button
                type="button"
                className="garden-glass-btn mono"
                onClick={handleClearBlooms}
              >
                {lang === 'id' ? 'Rapikan' : 'Trim'}
              </button>
            )}
          </div>
        </div>

        {/* Center Giant Editorial Serif Typography (Butterflies fly ABOVE this with Z-depth shadow) */}
        <motion.div
          className="garden-hero__type"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="mono garden-hero__eyebrow">
            OSANNA PATRICIA LIMBONG · IPB UNIVERSITY (TPL)
          </span>
          <h1 className="garden-hero__headline">
            {lang === 'id' ? (
              <>
                TUMBUH &amp; <em>BERKARYA</em>
              </>
            ) : (
              <>
                BLOOM &amp; <em>ENGINEER</em>
              </>
            )}
          </h1>
          <p className="garden-hero__sub">
            {lang === 'id'
              ? 'Analis Data & Front-End Developer — merangkai data mentah menjadi model yang jernih dan antarmuka web yang terasa hidup.'
              : 'Data Analyst & Front-End Developer — cultivating complex datasets into clear models and tactile, living web experiences.'}
          </p>
        </motion.div>

        {/* 60fps Living Canvas Overlay: Butterflies & Blooming Flowers float ABOVE typography */}
        <canvas ref={canvasRef} className="garden-hero__canvas" aria-hidden="true" />

        {/* Bottom Floating Frosted Bar: Interactive Prompt + Quick Links */}
        <div className="garden-hero__bottombar">
          <span className="mono garden-hero__hint">
            {lang === 'id'
              ? 'KLIK DI MANA SAJA DI TAMAN UNTUK MENANAM BUNGA & MEMANGGIL KUPU-KUPU'
              : 'CLICK ANYWHERE IN THE GARDEN TO PLANT A FLOWER & ATTRACT BUTTERFLIES'}
          </span>

          <div className="garden-hero__actions">
            <Link to="/work" className="garden-hero__cta mono">
              {lang === 'id' ? 'Jelajahi Proyek ↗' : 'Explore Projects ↗'}
            </Link>
            <Link to="/about" className="garden-hero__cta garden-hero__cta--ghost mono">
              {lang === 'id' ? 'Profil & Keahlian' : 'About & Toolkit'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
