import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext.jsx';
import './AuroraSky.css';

const GLYPHS = ['♪', '♫', '✦'];

/**
 * Interactive Slowbar Ambience Canvas for the Home Hero:
 * - Warm analog acoustic soundwave ribbons (Matcha, Terracotta, Tube-Amp Honey Gold) drift and lean toward the cursor.
 * - Sunlit reading-lamp dust motes & floating musical notes (♪, ♫, ✦) rise gently like pour-over steam and react to cursor proximity.
 * - Click / tap releases a warm burst of musical notes & golden sparks.
 */
export default function AuroraSky() {
  const canvasRef = useRef(null);
  const { theme } = useApp();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const dark = theme === 'dark';

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    let visible = true;
    const mouse = { x: -9999, y: -9999, tx: 0.5, active: false };
    const motes = [];
    const sparks = [];

    // Slowbar Acoustic Soundwave Ribbons: Matcha Sage, Tube-Amp Honey Gold, Terracotta Vinyl
    const ribbons = dark
      ? [
          { c: [131, 182, 151], a: 0.24, y: 0.32, amp: 44, sp: 0.46, ph: 0 },
          { c: [242, 204, 126], a: 0.22, y: 0.44, amp: 54, sp: 0.36, ph: 2 },
          { c: [227, 136, 107], a: 0.2, y: 0.54, amp: 48, sp: 0.28, ph: 4 },
        ]
      : [
          { c: [53, 94, 71], a: 0.16, y: 0.32, amp: 44, sp: 0.46, ph: 0 },
          { c: [230, 163, 135], a: 0.24, y: 0.44, amp: 54, sp: 0.36, ph: 2 },
          { c: [243, 210, 133], a: 0.32, y: 0.54, amp: 48, sp: 0.28, ph: 4 },
        ];

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(95, Math.max(38, (w * h) / 13500)));
      motes.length = 0;
      for (let i = 0; i < count; i += 1) {
        const isNote = i % 5 === 0;
        motes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1.3 + Math.random() * 2.4,
          vy: -(0.18 + Math.random() * 0.45), // gently rising like warm coffee steam / dust motes
          drift: Math.random() * Math.PI * 2,
          vx: 0,
          isNote,
          glyph: GLYPHS[i % GLYPHS.length],
          colorIdx: i % 3,
        });
      }
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.y > -60 && mouse.y < h + 60;
      mouse.tx = Math.min(1, Math.max(0, mouse.x / (w || 1)));
    };

    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const burst = (x, y) => {
      for (let i = 0; i < 16; i += 1) {
        const ang = Math.random() * Math.PI * 2;
        const sp = 1 + Math.random() * 3.2;
        sparks.push({
          x,
          y,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp - 0.8,
          life: 1,
          size: 11 + Math.random() * 5,
          glyph: GLYPHS[i % GLYPHS.length],
        });
      }
    };

    const onDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (y < 0 || y > h) return;
      burst(x, y);
    };

    let lean = 0.5;
    let t = 0;

    const drawAcousticWaves = () => {
      lean += (mouse.tx - lean) * 0.03;
      ribbons.forEach((r) => {
        const baseY = h * r.y;
        const [cr, cg, cb] = r.c;
        const grad = ctx.createLinearGradient(0, baseY - 145, 0, baseY + 145);
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},0)`);
        grad.addColorStop(0.5, `rgba(${cr},${cg},${cb},${r.a})`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 16) {
          const nx = x / w;
          const wave =
            Math.sin(nx * 4.2 + t * r.sp + r.ph) * r.amp +
            Math.sin(nx * 9.5 - t * r.sp * 1.35) * (r.amp * 0.32);
          const pull = Math.exp(-Math.pow((nx - lean) * 3.2, 2)) * 34;
          ctx.lineTo(x, baseY + wave - pull);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();
      });
    };

    const drawMotesAndNotes = () => {
      const moteColors = dark
        ? ['rgba(242, 204, 126, 0.72)', 'rgba(131, 182, 151, 0.68)', 'rgba(227, 136, 107, 0.68)']
        : ['rgba(194, 73, 40, 0.48)', 'rgba(53, 94, 71, 0.45)', 'rgba(180, 125, 35, 0.52)'];

      motes.forEach((f) => {
        f.drift += 0.014;
        f.vx += Math.sin(f.drift) * 0.011;

        const dx = f.x - mouse.x;
        const dy = f.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (mouse.active && dist < 130) {
          const push = (1 - dist / 130) * 1.5;
          f.vx += (dx / (dist || 1)) * push;
          f.y += (dy / (dist || 1)) * push * 0.55;
        }

        f.vx *= 0.94;
        f.x += f.vx;
        f.y += f.vy;

        if (f.y < -14) {
          f.y = h + 12;
          f.x = Math.random() * w;
        }
        if (f.y > h + 14) {
          f.y = -12;
        }
        if (f.x < -12) f.x = w + 12;
        if (f.x > w + 12) f.x = -12;

        ctx.fillStyle = moteColors[f.colorIdx];
        if (f.isNote) {
          ctx.font = '700 12px "Space Grotesk", sans-serif';
          ctx.fillText(f.glyph, f.x, f.y);
        } else {
          ctx.beginPath();
          ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    const drawSparks = () => {
      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.045;
        s.life -= 0.022;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, s.life);
        ctx.fillStyle = i % 2 ? (dark ? '#f2cc7e' : '#c24928') : dark ? '#83b697' : '#355e47';
        ctx.font = `700 ${Math.round(s.size)}px "Space Grotesk", sans-serif`;
        ctx.fillText(s.glyph, s.x, s.y);
        ctx.restore();
      }
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      drawAcousticWaves();
      drawMotesAndNotes();
      drawSparks();
    };

    resize();

    if (reduced) {
      drawAcousticWaves();
      drawMotesAndNotes();
    } else {
      raf = requestAnimationFrame(frame);
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    window.addEventListener('resize', resize);
    if (!reduced) {
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerdown', onDown, { passive: true });
      document.addEventListener('pointerleave', onLeave);
    }

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="aurora-sky" aria-hidden="true" />;
}
