import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext.jsx';
import './AuroraSky.css';

/**
 * Interactive aurora + snow sky for the hero.
 * - Aurora ribbons drift and lean toward the cursor.
 * - Snowflakes fall and get pushed away by the cursor.
 * - Click / tap releases a burst of sparkles.
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
    const flakes = [];
    const sparks = [];

    // Light mode: soft pastel aurora; dark mode: vivid polar aurora.
    const ribbons = dark
      ? [
          { c: [52, 211, 153], a: 0.3, y: 0.3, amp: 46, sp: 0.5, ph: 0 },
          { c: [56, 189, 248], a: 0.26, y: 0.4, amp: 58, sp: 0.38, ph: 2 },
          { c: [168, 85, 247], a: 0.22, y: 0.5, amp: 52, sp: 0.3, ph: 4 },
        ]
      : [
          { c: [125, 211, 252], a: 0.34, y: 0.3, amp: 46, sp: 0.5, ph: 0 },
          { c: [244, 167, 208], a: 0.3, y: 0.42, amp: 58, sp: 0.38, ph: 2 },
          { c: [167, 243, 208], a: 0.3, y: 0.52, amp: 52, sp: 0.3, ph: 4 },
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

      const count = Math.round(Math.min(130, Math.max(45, (w * h) / 11000)));
      flakes.length = 0;
      for (let i = 0; i < count; i += 1) {
        flakes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 1 + Math.random() * 2.6,
          vy: 0.25 + Math.random() * 0.7,
          drift: Math.random() * Math.PI * 2,
          vx: 0,
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
      for (let i = 0; i < 18; i += 1) {
        const ang = Math.random() * Math.PI * 2;
        const sp = 1 + Math.random() * 3.4;
        sparks.push({
          x,
          y,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp - 0.8,
          life: 1,
          size: 2 + Math.random() * 3,
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

    const drawAurora = () => {
      lean += (mouse.tx - lean) * 0.03;
      ribbons.forEach((r) => {
        const baseY = h * r.y;
        const [cr, cg, cb] = r.c;
        const grad = ctx.createLinearGradient(0, baseY - 150, 0, baseY + 150);
        grad.addColorStop(0, `rgba(${cr},${cg},${cb},0)`);
        grad.addColorStop(0.5, `rgba(${cr},${cg},${cb},${r.a})`);
        grad.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = grad;

        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 16) {
          const nx = x / w;
          const wave =
            Math.sin(nx * 4 + t * r.sp + r.ph) * r.amp +
            Math.sin(nx * 9 - t * r.sp * 1.4) * (r.amp * 0.35);
          // Ribbon bulges toward the cursor's horizontal position.
          const pull = Math.exp(-Math.pow((nx - lean) * 3.2, 2)) * 36;
          ctx.lineTo(x, baseY + wave - pull);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();
      });
    };

    const drawSnow = () => {
      ctx.fillStyle = dark ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.95)';
      ctx.strokeStyle = dark ? 'transparent' : 'rgba(125,175,225,0.45)';
      ctx.lineWidth = 1;
      flakes.forEach((f) => {
        f.drift += 0.012;
        f.vx += Math.sin(f.drift) * 0.012;

        const dx = f.x - mouse.x;
        const dy = f.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (mouse.active && dist < 130) {
          const push = (1 - dist / 130) * 1.6;
          f.vx += (dx / (dist || 1)) * push;
          f.y += (dy / (dist || 1)) * push * 0.6;
        }

        f.vx *= 0.94;
        f.x += f.vx;
        f.y += f.vy;

        if (f.y > h + 6) {
          f.y = -6;
          f.x = Math.random() * w;
        }
        if (f.x < -6) f.x = w + 6;
        if (f.x > w + 6) f.x = -6;

        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
        ctx.fill();
        if (!dark) ctx.stroke();
      });
    };

    const drawSparks = () => {
      for (let i = sparks.length - 1; i >= 0; i -= 1) {
        const s = sparks[i];
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.06;
        s.life -= 0.02;
        if (s.life <= 0) {
          sparks.splice(i, 1);
          continue;
        }
        ctx.save();
        ctx.globalAlpha = Math.max(0, s.life);
        ctx.fillStyle = i % 2 ? '#fde047' : '#f472b6';
        ctx.translate(s.x, s.y);
        ctx.rotate(s.life * 6);
        const sz = s.size;
        ctx.beginPath();
        ctx.moveTo(0, -sz);
        ctx.lineTo(sz * 0.35, -sz * 0.35);
        ctx.lineTo(sz, 0);
        ctx.lineTo(sz * 0.35, sz * 0.35);
        ctx.lineTo(0, sz);
        ctx.lineTo(-sz * 0.35, sz * 0.35);
        ctx.lineTo(-sz, 0);
        ctx.lineTo(-sz * 0.35, -sz * 0.35);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      t += 0.012;
      ctx.clearRect(0, 0, w, h);
      drawAurora();
      drawSnow();
      drawSparks();
    };

    resize();

    if (reduced) {
      // Single static frame, no animation loop.
      drawAurora();
      drawSnow();
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
