import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext.jsx';
import './BotanicalHeroCanvas.css';

// Authentic Swiss Alpine Wildflower Species
const ALPINE_FLOWERS = [
  {
    name: 'Edelweiss',
    petals: 10,
    innerPetals: 6,
    outerColor: '#ffffff',
    innerColor: '#eef4e8',
    centerColor: '#eab338',
    radius: 30,
  },
  {
    name: 'Alpine Rose',
    petals: 9,
    innerPetals: 6,
    outerColor: '#e25a77',
    innerColor: '#f8b9c7',
    centerColor: '#f5cb5c',
    radius: 32,
  },
  {
    name: 'Swiss Buttercup',
    petals: 8,
    innerPetals: 5,
    outerColor: '#f3bb32',
    innerColor: '#fce18d',
    centerColor: '#b56516',
    radius: 28,
  },
  {
    name: 'Blue Gentian',
    petals: 6,
    innerPetals: 6,
    outerColor: '#4a90d6',
    innerColor: '#9ecdf8',
    centerColor: '#f5d26b',
    radius: 29,
  },
  {
    name: 'Mountain Lavender',
    petals: 9,
    innerPetals: 6,
    outerColor: '#8d7ae0',
    innerColor: '#cfc4f7',
    centerColor: '#f2ca63',
    radius: 28,
  },
  {
    name: 'Alpine Poppy',
    petals: 6,
    innerPetals: 5,
    outerColor: '#ea5d50',
    innerColor: '#f9a9a1',
    centerColor: '#2d2522',
    radius: 31,
  },
];

const BUTTERFLY_STYLES = [
  { wingA: '#f7c2cf', wingB: '#d94f6e', edge: '#521b29', accent: '#fff7e6' }, // Alpine Rose
  { wingA: '#f8d36c', wingB: '#de8c23', edge: '#4a290b', accent: '#fff9e6' }, // Swallowtail Gold
  { wingA: '#9fd4f8', wingB: '#3e82c4', edge: '#163554', accent: '#f2f9ff' }, // Adonis Blue
  { wingA: '#d4c8f7', wingB: '#7a66c9', edge: '#2d2057', accent: '#f9f7ff' }, // Mountain Violet
];

function createButterfly(width, height, index) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.85 + Math.random() * 0.55;
  return {
    id: `${Date.now()}-${index}-${Math.random()}`,
    x: width * (0.14 + Math.random() * 0.72),
    y: height * (0.16 + Math.random() * 0.56),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    angle,
    size: 15 + Math.random() * 6.5,
    wingPhase: Math.random() * Math.PI * 2,
    wingSpeed: 0.16 + Math.random() * 0.06,
    style: BUTTERFLY_STYLES[index % BUTTERFLY_STYLES.length],
    wanderAngle: angle,
    targetFlowerId: null,
  };
}

function createFlower(x, y, speciesIdx, preBloomed = false) {
  const species = ALPINE_FLOWERS[speciesIdx % ALPINE_FLOWERS.length];
  return {
    id: `${Date.now()}-${Math.random()}`,
    x,
    y,
    species,
    rot: Math.random() * Math.PI * 2,
    swayPhase: Math.random() * Math.PI * 2,
    scale: preBloomed ? 1 : 0.02,
    scaleVel: preBloomed ? 0 : 0.18,
    bornAt: performance.now(),
    hasStem: y > 300,
    leaves: [Math.random() * Math.PI * 2, Math.random() * Math.PI * 2 + 2.2],
  };
}

// Gentle Web Audio Alpine Meadow Harp & Mountain Chimes
function createMeadowAudioEngine() {
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return null;
  const ctx = new AudioCtx();
  const master = ctx.createGain();
  master.gain.value = 0.16;
  master.connect(ctx.destination);

  // Airy F major pentatonic harp chimes
  const notes = [349.23, 392.0, 440.0, 523.25, 587.33, 698.46, 783.99, 880.0];

  const playNote = (freq, duration = 2.6, gainPeak = 0.17) => {
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
    env.gain.exponentialRampToValueAtTime(gainPeak, now + 0.05);
    env.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    const hGain = ctx.createGain();
    hGain.gain.value = 0.15;

    osc.connect(env);
    osc2.connect(hGain);
    hGain.connect(env);
    env.connect(master);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration + 0.05);
    osc2.stop(now + duration + 0.05);
  };

  let timer = null;
  const start = async () => {
    if (ctx.state === 'suspended') await ctx.resume();
    playNote(notes[0], 3.0, 0.18);
    playNote(notes[3], 3.4, 0.13);
    timer = window.setInterval(() => {
      const n1 = notes[Math.floor(Math.random() * notes.length)];
      playNote(n1, 2.5 + Math.random() * 1.2, 0.13);
      if (Math.random() > 0.52) {
        const n2 = notes[Math.floor(Math.random() * notes.length)];
        window.setTimeout(() => playNote(n2, 2.2, 0.08), 240);
      }
    }, 1650);
  };

  const stop = () => {
    if (timer) window.clearInterval(timer);
    timer = null;
  };

  const playBloomChime = () => {
    if (ctx.state !== 'running') return;
    const base = notes[Math.floor(Math.random() * 5)];
    playNote(base, 1.5, 0.2);
    window.setTimeout(() => playNote(base * 1.5, 1.7, 0.13), 85);
  };

  const destroy = () => {
    stop();
    ctx.close().catch(() => {});
  };

  return { start, stop, playBloomChime, destroy };
}

export default function BotanicalHeroCanvas({ availability }) {
  const { lang, theme } = useApp();
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const themeRef = useRef(theme);

  const [butterflyCount, setButterflyCount] = useState(4);
  const [bloomCount, setBloomCount] = useState(8);
  const [audioOn, setAudioOn] = useState(false);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  const stateRef = useRef({
    width: 960,
    height: 600,
    butterflies: [],
    flowers: [],
    meadowStalks: [],
    ripples: [],
    sparks: [],
    speciesCursor: 0,
  });

  const plantFlowerAt = useCallback((x, y, playSound = true) => {
    const st = stateRef.current;
    const flower = createFlower(x, y, st.speciesCursor++, false);

    if (st.flowers.length >= 30) {
      st.flowers.shift();
    }
    st.flowers.push(flower);
    setBloomCount(st.flowers.length);

    st.ripples.push({
      x,
      y,
      r: 8,
      maxR: 82,
      alpha: 0.72,
      color: flower.species.outerColor === '#ffffff' ? '#eab338' : flower.species.outerColor,
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

    const sorted = [...st.butterflies].sort(
      (a, b) => Math.hypot(a.x - x, a.y - y) - Math.hypot(b.x - x, b.y - y),
    );
    sorted.slice(0, 2).forEach((bf) => {
      bf.targetFlowerId = flower.id;
    });

    if (playSound && audioRef.current) {
      audioRef.current.playBloomChime();
    }
  }, []);

  const toggleAudio = async () => {
    if (!audioRef.current) {
      audioRef.current = createMeadowAudioEngine();
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

  useEffect(() => {
    const st = stateRef.current;
    while (st.butterflies.length < butterflyCount) {
      st.butterflies.push(createButterfly(st.width, st.height, st.butterflies.length));
    }
    while (st.butterflies.length > butterflyCount) {
      st.butterflies.pop();
    }
  }, [butterflyCount]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.destroy();
        audioRef.current = null;
      }
    };
  }, []);

  // 60fps Swiss Meadow Living Canvas (Swaying Foreground Grass + Wildflowers + Butterflies)
  useEffect(() => {
    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    const st = stateRef.current;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const buildForegroundMeadow = (w, h) => {
      const stalkCount = Math.min(46, Math.max(22, Math.floor(w / 26)));
      st.meadowStalks = Array.from({ length: stalkCount }, (_, i) => ({
        x: (w / stalkCount) * i + Math.random() * 18,
        height: 44 + Math.random() * 68,
        phase: Math.random() * Math.PI * 2,
        speed: 1.1 + Math.random() * 0.7,
        hasBud: i % 2 === 0,
        budColor: ALPINE_FLOWERS[i % ALPINE_FLOWERS.length].outerColor,
        budSize: 3.5 + Math.random() * 3.5,
      }));
    };

    const seedInitialMeadow = (w, h) => {
      const spots = [
        [w * 0.09, h * 0.78],
        [w * 0.18, h * 0.85],
        [w * 0.29, h * 0.81],
        [w * 0.72, h * 0.82],
        [w * 0.83, h * 0.86],
        [w * 0.91, h * 0.77],
        [w * 0.12, h * 0.3],
        [w * 0.88, h * 0.29],
      ];
      st.flowers = spots.map(([fx, fy], idx) => createFlower(fx, fy, idx, true));
      st.speciesCursor = spots.length;
      setBloomCount(st.flowers.length);
    };

    const resize = () => {
      const rect = stage.getBoundingClientRect();
      st.width = Math.max(320, rect.width);
      st.height = Math.max(460, rect.height);
      canvas.width = Math.floor(st.width * dpr);
      canvas.height = Math.floor(st.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      buildForegroundMeadow(st.width, st.height);
      if (st.flowers.length === 0) {
        seedInitialMeadow(st.width, st.height);
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
      const force = (1 - f.scale) * 0.12;
      f.scaleVel = (f.scaleVel + force) * 0.78;
      f.scale = Math.max(0.01, f.scale + f.scaleVel);

      const sway = Math.sin(t * 1.45 + f.swayPhase) * 0.06;
      const r = f.species.radius * f.scale;

      // Growing slender meadow stem if planted in the lower meadow zone
      if (f.hasStem && f.y > st.height * 0.56) {
        const tipX = f.x + Math.sin(t * 1.45 + f.swayPhase) * 6;
        ctx.save();
        ctx.strokeStyle = themeRef.current === 'dark' ? '#3d8762' : '#2f7a53';
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(f.x, st.height + 6);
        ctx.quadraticCurveTo(f.x + 8, (f.y + st.height) * 0.5, tipX, f.y);
        ctx.stroke();
        ctx.restore();
      }

      ctx.save();
      ctx.translate(f.x, f.y);
      ctx.rotate(f.rot + sway);

      // Soft Z-depth shadow over sky/typography
      ctx.save();
      ctx.translate(5, 9);
      ctx.beginPath();
      ctx.arc(0, 0, r * 0.88, 0, Math.PI * 2);
      ctx.fillStyle =
        themeRef.current === 'dark' ? 'rgba(5, 14, 11, 0.34)' : 'rgba(28, 60, 44, 0.16)';
      ctx.filter = 'blur(5px)';
      ctx.fill();
      ctx.restore();

      // Leaves beneath bloom
      ctx.fillStyle = '#3b8c63';
      for (const leafAngle of f.leaves) {
        ctx.save();
        ctx.rotate(leafAngle);
        ctx.beginPath();
        ctx.ellipse(r * 0.84, 0, r * 0.52, r * 0.22, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

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
        if (outerColor === '#ffffff') {
          ctx.strokeStyle = 'rgba(130, 158, 140, 0.35)';
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
        ctx.restore();
      }

      for (let i = 0; i < innerPetals; i++) {
        const ang = (Math.PI * 2 * i) / innerPetals + 0.3;
        ctx.save();
        ctx.rotate(ang);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(r * 0.28, -r * 0.21, r * 0.66, -r * 0.15, r * 0.62, 0);
        ctx.bezierCurveTo(r * 0.66, r * 0.15, r * 0.28, r * 0.21, 0, 0);
        ctx.fillStyle = innerColor;
        ctx.fill();
        ctx.restore();
      }

      ctx.beginPath();
      ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2);
      ctx.fillStyle = centerColor;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(-r * 0.05, -r * 0.05, r * 0.08, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.48)';
      ctx.fill();

      ctx.restore();
    };

    const drawButterfly = (bf) => {
      const flap = Math.abs(Math.sin(bf.wingPhase));
      const wingScaleX = 0.25 + flap * 0.75;
      const s = bf.size;

      // Soft Z-depth shadow cast onto headline & alpine sky
      ctx.save();
      ctx.translate(bf.x + 12, bf.y + 18);
      ctx.rotate(bf.angle + Math.PI / 2);
      ctx.scale(wingScaleX * 0.88, 0.88);
      ctx.fillStyle =
        themeRef.current === 'dark' ? 'rgba(4, 12, 10, 0.38)' : 'rgba(24, 58, 42, 0.18)';
      ctx.filter = 'blur(5px)';
      ctx.beginPath();
      ctx.ellipse(-s * 0.55, -s * 0.12, s * 0.68, s * 0.52, -0.25, 0, Math.PI * 2);
      ctx.ellipse(s * 0.55, -s * 0.12, s * 0.68, s * 0.52, 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.save();
      ctx.translate(bf.x, bf.y);
      ctx.rotate(bf.angle + Math.PI / 2);

      for (const dir of [-1, 1]) {
        ctx.save();
        ctx.scale(dir * wingScaleX, 1);

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

        ctx.beginPath();
        ctx.arc(s * 0.74, -s * 0.34, s * 0.13, 0, Math.PI * 2);
        ctx.fillStyle = bf.style.accent;
        ctx.fill();

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

      // 1. Gently swaying foreground Swiss meadow grass blades & tiny wildflower buds
      const isDark = themeRef.current === 'dark';
      for (const s of st.meadowStalks) {
        const swayX = Math.sin(tick * s.speed + s.phase) * 11;
        const tipX = s.x + swayX;
        const tipY = st.height - s.height;

        ctx.beginPath();
        ctx.moveTo(s.x, st.height + 4);
        ctx.quadraticCurveTo(s.x + swayX * 0.35, st.height - s.height * 0.55, tipX, tipY);
        ctx.strokeStyle = isDark ? 'rgba(82, 168, 123, 0.52)' : 'rgba(42, 122, 79, 0.44)';
        ctx.lineWidth = 2;
        ctx.stroke();

        if (s.hasBud) {
          ctx.beginPath();
          ctx.arc(tipX, tipY, s.budSize, 0, Math.PI * 2);
          ctx.fillStyle = s.budColor;
          ctx.globalAlpha = 0.85;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      // 2. Ripples where flowers were planted
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

      // 3. Blooming Swiss Wildflowers
      for (const f of st.flowers) {
        drawFlower(f, tick);
      }

      // 4. Golden pollen sparks
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

      // 5. Living 60fps Alpine Butterflies
      for (let i = 0; i < st.butterflies.length; i++) {
        const bf = st.butterflies[i];
        let desiredVx = Math.cos(bf.wanderAngle) * 1.15;
        let desiredVy = Math.sin(bf.wanderAngle) * 1.15;
        let hurry = false;

        bf.wanderAngle += (Math.random() - 0.5) * 0.09;

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
              const orbitAngle = Math.atan2(dy, dx) + Math.PI / 2;
              desiredVx = Math.cos(orbitAngle) * 1.05;
              desiredVy = Math.sin(orbitAngle) * 1.05;
              if (performance.now() - target.bornAt > 4600) {
                bf.targetFlowerId = null;
              }
            }
          } else {
            bf.targetFlowerId = null;
          }
        }

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
    const rx = st.width * (0.12 + Math.random() * 0.76);
    const ry = st.height * (0.24 + Math.random() * 0.62);
    plantFlowerAt(rx, ry, true);
  };

  const handleClearBlooms = () => {
    const st = stateRef.current;
    st.flowers = st.flowers.slice(0, 6);
    setBloomCount(st.flowers.length);
  };

  return (
    <section className="container garden-hero-wrap">
      <div
        ref={stageRef}
        className="garden-hero-stage"
        onClick={handleStageClick}
        role="region"
        aria-label="Interactive Swiss Alpine Flower Meadow — click anywhere to plant wildflowers"
      >
        {/* Painterly Swiss Alps Mountain Peaks & Rolling Green Meadow Backdrop */}
        <svg
          className="garden-alps-backdrop"
          viewBox="0 0 1440 620"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="alpsPeakFar" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--alps-peak-top)" />
              <stop offset="100%" stopColor="var(--alps-peak-bot)" />
            </linearGradient>
            <linearGradient id="alpsHillMid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--alps-hill-top)" />
              <stop offset="100%" stopColor="var(--alps-hill-bot)" />
            </linearGradient>
            <linearGradient id="alpsMeadowNear" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--alps-meadow-top)" />
              <stop offset="100%" stopColor="var(--alps-meadow-bot)" />
            </linearGradient>
          </defs>

          {/* Soft Alpine Clouds */}
          <ellipse cx="260" cy="112" rx="140" ry="28" fill="var(--alps-cloud)" opacity="0.6" />
          <ellipse cx="1140" cy="94" rx="170" ry="32" fill="var(--alps-cloud)" opacity="0.55" />

          {/* Far Snow-Dusted Swiss Alpine Peaks */}
          <path
            d="M0 430 L170 250 L295 340 L480 195 L665 348 L860 215 L1055 335 L1250 185 L1440 315 L1440 620 L0 620 Z"
            fill="url(#alpsPeakFar)"
          />
          {/* Subtle Snow Caps */}
          <path
            d="M480 195 L430 245 L465 235 L488 250 L525 236 Z M860 215 L814 260 L848 252 L872 265 L904 252 Z M1250 185 L1200 235 L1238 228 L1264 242 L1296 226 Z"
            fill="var(--alps-snow)"
            opacity="0.78"
          />

          {/* Rolling Midground Alpine Slopes */}
          <path
            d="M0 460 Q 340 365 720 445 T 1440 420 L 1440 620 L 0 620 Z"
            fill="url(#alpsHillMid)"
          />

          {/* Foreground Sunlit Flower Meadow Valley */}
          <path
            d="M0 515 Q 420 455 860 505 T 1440 485 L 1440 620 L 0 620 Z"
            fill="url(#alpsMeadowNear)"
          />
        </svg>

        {/* Top Floating Alpine-Glass Controls (Reel 3 Inspired) */}
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
                  ? 'Harpa Taman: ON'
                  : 'Meadow Harp: ON'
                : lang === 'id'
                  ? 'Harpa Taman: OFF'
                  : 'Meadow Harp: OFF'}
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
              + {lang === 'id' ? `Tanam Bunga (${bloomCount})` : `Plant Flower (${bloomCount})`}
            </button>

            {bloomCount > 10 && (
              <button type="button" className="garden-glass-btn mono" onClick={handleClearBlooms}>
                {lang === 'id' ? 'Rapikan' : 'Trim'}
              </button>
            )}
          </div>
        </div>

        {/* Center Giant Editorial Serif Typography */}
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
                TAMAN <em>KARYA</em> &amp; DATA
              </>
            ) : (
              <>
                BLOOM &amp; <em>ENGINEER</em>
              </>
            )}
          </h1>
          <p className="garden-hero__sub">
            {lang === 'id'
              ? 'Analis Data & Front-End Developer — merangkai data kompleks menjadi wawasan yang jernih dan antarmuka web yang mekar hidup.'
              : 'Data Analyst & Front-End Developer — cultivating raw datasets into clear stories and sunlit, living web experiences.'}
          </p>
        </motion.div>

        {/* 60fps Living Canvas ABOVE Typography (Butterflies, Swaying Meadow & Planted Wildflowers) */}
        <canvas ref={canvasRef} className="garden-hero__canvas" aria-hidden="true" />

        {/* Bottom Floating Frosted Bar */}
        <div className="garden-hero__bottombar">
          <span className="mono garden-hero__hint">
            {lang === 'id'
              ? 'KLIK DI MANA SAJA DI PADANG BUNGA UNTUK MENANAM & MEMANGGIL KUPU-KUPU'
              : 'CLICK ANYWHERE IN THE MEADOW TO PLANT ALPINE WILDFLOWERS & CALL BUTTERFLIES'}
          </span>

          <div className="garden-hero__actions">
            <Link to="/work" className="garden-hero__cta mono">
              {lang === 'id' ? 'Lihat Taman Proyek ↗' : 'Explore Project Garden ↗'}
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
