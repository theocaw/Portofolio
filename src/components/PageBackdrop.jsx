import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext.jsx';
import './PageBackdrop.css';

/**
 * Interactive canvas backdrop for non-Home pages:
 * - "sakura"    (About)   : Sakura petals blown by cursor wind + poppable floating bubbles
 * - "network"   (Work)    : Interactive constellation data nodes + click sonar pulse wave
 * - "fireflies" (Journey) : Golden fireflies attracted to cursor + shooting stars on click
 */
export default function PageBackdrop({ variant = 'sakura' }) {
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
    let t = 0;

    const mouse = {
      x: -9999,
      y: -9999,
      vx: 0,
      vy: 0,
      prevX: 0,
      prevY: 0,
      active: false,
    };

    const items = [];
    const extras = [];
    const pulses = [];

    const spawnBurst = (x, y, count = 12) => {
      for (let i = 0; i < count; i += 1) {
        const ang = (Math.PI * 2 * i) / count + Math.random() * 0.35;
        const sp = 1.2 + Math.random() * 3.2;
        pulses.push({
          kind: 'spark',
          x,
          y,
          vx: Math.cos(ang) * sp,
          vy: Math.sin(ang) * sp - 0.6,
          size: 3 + Math.random() * 3.5,
          life: 1,
          color: i % 2 === 0 ? '#f3d285' : '#e3886b',
        });
      }
    };

    const spawnShootingStar = (targetX, targetY) => {
      const startX = targetX !== undefined ? Math.max(20, targetX - 180) : Math.random() * (w * 0.65);
      const startY = targetY !== undefined ? Math.max(10, targetY - 90) : 15 + Math.random() * (h * 0.35);
      pulses.push({
        kind: 'meteor',
        x: startX,
        y: startY,
        vx: 6.5 + Math.random() * 3,
        vy: 2.6 + Math.random() * 1.6,
        len: 75 + Math.random() * 45,
        life: 1,
      });
    };

    const initScene = () => {
      items.length = 0;
      extras.length = 0;
      pulses.length = 0;

      if (variant === 'sakura') {
        const petalColors = dark
          ? ['#e3886b', '#f2cc7e', '#83b697', '#cab89e', '#f0714d']
          : ['#e6a387', '#c24928', '#769e86', '#d97706', '#355e47'];
        const petalCount = Math.round(Math.min(55, Math.max(26, (w * h) / 13000)));
        for (let i = 0; i < petalCount; i += 1) {
          items.push({
            x: Math.random() * w,
            y: Math.random() * h,
            size: 6 + Math.random() * 7,
            vx: 0.35 + Math.random() * 0.65,
            vy: 0.45 + Math.random() * 0.75,
            rot: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.03,
            flip: Math.random() * Math.PI * 2,
            vFlip: 0.02 + Math.random() * 0.03,
            color: petalColors[i % petalColors.length],
          });
        }

        const bubbleCount = Math.round(Math.min(20, Math.max(10, w / 80)));
        for (let i = 0; i < bubbleCount; i += 1) {
          extras.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: 8 + Math.random() * 15,
            vy: -(0.3 + Math.random() * 0.55),
            phase: Math.random() * Math.PI * 2,
          });
        }
      } else if (variant === 'network') {
        const nodeColors = dark
          ? ['#83b697', '#f2cc7e', '#e3886b', '#f0714d']
          : ['#355e47', '#c24928', '#b46914', '#244231'];
        const nodeCount = Math.round(Math.min(62, Math.max(28, (w * h) / 11000)));
        for (let i = 0; i < nodeCount; i += 1) {
          items.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.75,
            vy: (Math.random() - 0.5) * 0.75,
            r: 2.2 + Math.random() * 2.4,
            color: nodeColors[i % nodeColors.length],
            pulse: Math.random() * Math.PI * 2,
          });
        }
      } else if (variant === 'fireflies') {
        const flyColors = dark
          ? [
              [242, 204, 126],
              [227, 136, 107],
              [131, 182, 151],
              [240, 113, 77],
            ]
          : [
              [217, 119, 6],
              [194, 73, 40],
              [53, 94, 71],
              [118, 158, 134],
            ];
        const flyCount = Math.round(Math.min(60, Math.max(28, (w * h) / 11500)));
        for (let i = 0; i < flyCount; i += 1) {
          items.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.55,
            vy: -(0.15 + Math.random() * 0.45),
            r: 2 + Math.random() * 3.2,
            rgb: flyColors[i % flyColors.length],
            phase: Math.random() * Math.PI * 2,
            speed: 0.025 + Math.random() * 0.03,
          });
        }
      }
    };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, rect.width);
      h = Math.max(1, rect.height);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initScene();
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      mouse.vx = Math.max(-14, Math.min(14, nx - mouse.prevX));
      mouse.vy = Math.max(-14, Math.min(14, ny - mouse.prevY));
      mouse.prevX = nx;
      mouse.prevY = ny;
      mouse.x = nx;
      mouse.y = ny;
      mouse.active = ny >= -40 && ny <= h + 40;
    };

    const onLeave = () => {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const onDown = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (y < 0 || y > h) return;

      if (variant === 'network') {
        pulses.push({ kind: 'wave', x, y, r: 4, maxR: 320, life: 1 });
        spawnBurst(x, y, 10);
      } else if (variant === 'fireflies') {
        spawnShootingStar(x, y);
        spawnBurst(x, y, 14);
      } else {
        spawnBurst(x, y, 16);
      }
    };

    const drawSakura = () => {
      // Soft ambient glow behind header
      const grad = ctx.createRadialGradient(
        mouse.active ? mouse.x : w * 0.7,
        mouse.active ? mouse.y : h * 0.35,
        10,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.75,
      );
      grad.addColorStop(
        0,
        dark ? 'rgba(227, 136, 107, 0.16)' : 'rgba(230, 163, 135, 0.24)',
      );
      grad.addColorStop(
        0.5,
        dark ? 'rgba(131, 182, 151, 0.08)' : 'rgba(53, 94, 71, 0.08)',
      );
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Floating bubbles (pop when touched by cursor!)
      extras.forEach((b) => {
        b.phase += 0.025;
        b.y += b.vy;
        b.x += Math.sin(b.phase) * 0.45 + mouse.vx * 0.03;

        if (mouse.active) {
          const dist = Math.hypot(b.x - mouse.x, b.y - mouse.y);
          if (dist < b.r + 22) {
            spawnBurst(b.x, b.y, 7);
            b.y = h + b.r + Math.random() * 40;
            b.x = Math.random() * w;
          }
        }

        if (b.y < -b.r * 2) {
          b.y = h + b.r;
          b.x = Math.random() * w;
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = dark
          ? 'rgba(242, 204, 126, 0.42)'
          : 'rgba(53, 94, 71, 0.32)';
        ctx.fillStyle = dark
          ? 'rgba(242, 204, 126, 0.06)'
          : 'rgba(251, 247, 239, 0.5)';
        ctx.lineWidth = 1.4;
        ctx.fill();
        ctx.stroke();

        // Shiny bubble reflection dot
        ctx.beginPath();
        ctx.arc(b.x - b.r * 0.32, b.y - b.r * 0.32, b.r * 0.22, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fill();
        ctx.restore();
      });

      // Sakura petals
      items.forEach((p) => {
        p.rot += p.vRot;
        p.flip += p.vFlip;

        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 140) {
            const force = (1 - dist / 140) * 1.4;
            p.x += (dx / (dist || 1)) * force + mouse.vx * 0.14;
            p.y += (dy / (dist || 1)) * force + mouse.vy * 0.14;
          }
        }

        p.x += p.vx + Math.sin(t + p.flip) * 0.35;
        p.y += p.vy;

        if (p.y > h + 16) {
          p.y = -14;
          p.x = Math.random() * w;
        }
        if (p.x > w + 16) p.x = -14;
        if (p.x < -16) p.x = w + 14;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.scale(1, 0.55 + Math.abs(Math.cos(p.flip)) * 0.45);

        const s = p.size;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = dark ? 0.78 : 0.72;
        ctx.beginPath();
        ctx.moveTo(0, s);
        ctx.bezierCurveTo(s * 0.95, s * 0.4, s * 0.85, -s * 0.8, 0, -s * 0.45);
        ctx.bezierCurveTo(-s * 0.85, -s * 0.8, -s * 0.95, s * 0.4, 0, s);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      });

      mouse.vx *= 0.9;
      mouse.vy *= 0.9;
    };

    const drawNetwork = () => {
      // Subtle cyber coordinate grid dots
      const step = 44;
      ctx.fillStyle = dark ? 'rgba(148, 163, 184, 0.12)' : 'rgba(20, 35, 74, 0.1)';
      for (let gx = step / 2; gx < w; gx += step) {
        for (let gy = step / 2; gy < h; gy += step) {
          ctx.fillRect(gx, gy, 1.5, 1.5);
        }
      }

      // Update nodes
      items.forEach((n) => {
        n.pulse += 0.04;
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        // React to sonar click waves
        pulses.forEach((pw) => {
          if (pw.kind !== 'wave') return;
          const d = Math.hypot(n.x - pw.x, n.y - pw.y);
          if (Math.abs(d - pw.r) < 28) {
            const ang = Math.atan2(n.y - pw.y, n.x - pw.x);
            n.x += Math.cos(ang) * 2.4;
            n.y += Math.sin(ang) * 2.4;
          }
        });
      });

      // Connect nearby nodes
      const linkDist = 128;
      for (let i = 0; i < items.length; i += 1) {
        const a = items[i];
        for (let j = i + 1; j < items.length; j += 1) {
          const b = items[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            const alpha = (1 - d / linkDist) * (dark ? 0.35 : 0.25);
            ctx.strokeStyle = dark
              ? `rgba(131, 182, 151, ${alpha})`
              : `rgba(53, 94, 71, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }

        // Connect node to active cursor
        if (mouse.active) {
          const dm = Math.hypot(a.x - mouse.x, a.y - mouse.y);
          if (dm < 175) {
            const alpha = (1 - dm / 175) * 0.7;
            ctx.strokeStyle = dark
              ? `rgba(242, 204, 126, ${alpha})`
              : `rgba(194, 73, 40, ${alpha})`;
            ctx.lineWidth = 1.4;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      items.forEach((n) => {
        const boost = 1 + Math.sin(n.pulse) * 0.25;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * boost, 0, Math.PI * 2);
        ctx.fillStyle = n.color;
        ctx.fill();
      });

      // Cursor radar reticle
      if (mouse.active) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 18 + Math.sin(t * 4) * 3, 0, Math.PI * 2);
        ctx.strokeStyle = dark ? 'rgba(242, 204, 126, 0.45)' : 'rgba(53, 94, 71, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();
      }
    };

    const drawFireflies = () => {
      // Occasional automatic shooting star
      if (!reduced && Math.random() < 0.007 && pulses.length < 6) {
        spawnShootingStar();
      }

      items.forEach((f) => {
        f.phase += f.speed;

        if (mouse.active) {
          const dx = mouse.x - f.x;
          const dy = mouse.y - f.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 190 && dist > 18) {
            f.x += (dx / dist) * 0.75;
            f.y += (dy / dist) * 0.75;
          }
        }

        f.x += f.vx + Math.sin(f.phase) * 0.35;
        f.y += f.vy;

        if (f.y < -12) {
          f.y = h + 12;
          f.x = Math.random() * w;
        }
        if (f.x < -12) f.x = w + 12;
        if (f.x > w + 12) f.x = -12;

        const glow = 0.45 + 0.55 * Math.sin(f.phase);
        const [r, g, b] = f.rgb;
        const rad = f.r * (2.6 + glow * 1.8);

        const halo = ctx.createRadialGradient(f.x, f.y, 0.5, f.x, f.y, rad * 2.4);
        halo.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${0.75 * glow})`);
        halo.addColorStop(0.45, `rgba(${r}, ${g}, ${b}, ${0.28 * glow})`);
        halo.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(f.x, f.y, rad * 2.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = dark ? '#ffffff' : `rgb(${r}, ${g}, ${b})`;
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.r * 0.75, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const drawPulses = () => {
      for (let i = pulses.length - 1; i >= 0; i -= 1) {
        const p = pulses[i];
        if (p.kind === 'wave') {
          p.r += 6.5;
          p.life = 1 - p.r / p.maxR;
          if (p.life <= 0) {
            pulses.splice(i, 1);
            continue;
          }
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.strokeStyle = dark
            ? `rgba(131, 182, 151, ${p.life * 0.65})`
            : `rgba(53, 94, 71, ${p.life * 0.55})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
        } else if (p.kind === 'meteor') {
          p.x += p.vx;
          p.y += p.vy;
          p.life -= 0.022;
          if (p.life <= 0 || p.x > w + 100 || p.y > h + 100) {
            pulses.splice(i, 1);
            continue;
          }
          ctx.save();
          const tailX = p.x - p.vx * (p.len / 8);
          const tailY = p.y - p.vy * (p.len / 8);
          const grad = ctx.createLinearGradient(p.x, p.y, tailX, tailY);
          grad.addColorStop(
            0,
            dark ? `rgba(242, 204, 126, ${p.life})` : `rgba(194, 73, 40, ${p.life})`,
          );
          grad.addColorStop(1, 'rgba(242, 204, 126, 0)');
          ctx.strokeStyle = grad;
          ctx.lineWidth = 2.4;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          ctx.fillStyle = dark ? '#f2cc7e' : '#c24928';
          ctx.beginPath();
          ctx.arc(p.x, p.y, 2.6, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        } else {
          // spark
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.05;
          p.life -= 0.024;
          if (p.life <= 0) {
            pulses.splice(i, 1);
            continue;
          }
          ctx.save();
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillStyle = p.color;
          ctx.translate(p.x, p.y);
          ctx.rotate(p.life * 5);
          const s = p.size;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.lineTo(s * 0.35, -s * 0.35);
          ctx.lineTo(s, 0);
          ctx.lineTo(s * 0.35, s * 0.35);
          ctx.lineTo(0, s);
          ctx.lineTo(-s * 0.35, s * 0.35);
          ctx.lineTo(-s, 0);
          ctx.lineTo(-s * 0.35, -s * 0.35);
          ctx.closePath();
          ctx.fill();
          ctx.restore();
        }
      }
    };

    const renderOnce = () => {
      ctx.clearRect(0, 0, w, h);
      if (variant === 'network') drawNetwork();
      else if (variant === 'fireflies') drawFireflies();
      else drawSakura();
      drawPulses();
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!visible) return;
      t += 0.016;
      renderOnce();
    };

    resize();

    if (reduced) {
      renderOnce();
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
  }, [variant, theme]);

  return (
    <canvas
      ref={canvasRef}
      className={`page-backdrop page-backdrop--${variant}`}
      aria-hidden="true"
    />
  );
}
