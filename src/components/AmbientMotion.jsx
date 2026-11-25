import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext.jsx';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [role="tab"], input, select, textarea, .kissa-tape-card__shell-wrap, .kissa-portrait, .kissa-gpa-plate, .garden-hero-stage';

export default function AmbientMotion() {
  const { theme } = useApp();
  const canvasRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // 1. Floating Wildflower Petals & Golden Pollen Drifting Across Viewport (60fps)
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    if (!ctx) return undefined;

    let width = window.innerWidth;
    let height = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const petalCount = width < 768 ? 14 : 24;
    const items = Array.from({ length: petalCount }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: i % 3 === 0 ? 4.8 + Math.random() * 4.5 : 1.5 + Math.random() * 2,
      isPetal: i % 3 === 0,
      vx: 0.14 + Math.random() * 0.25,
      vy: 0.18 + Math.random() * 0.34,
      rot: Math.random() * Math.PI * 2,
      vRot: (Math.random() - 0.5) * 0.018,
      phase: i * 0.8 + Math.random() * Math.PI * 2,
      alpha: 0.22 + Math.random() * 0.28,
      hueType: i % 4,
    }));

    const pointer = { x: -9999, y: -9999 };
    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    let rafId = 0;
    let tick = 0;

    const draw = () => {
      rafId = window.requestAnimationFrame(draw);
      if (document.hidden) return;
      tick += 0.014;

      ctx.clearRect(0, 0, width, height);
      const isDark = themeRef.current === 'dark';

      for (const p of items) {
        p.x += p.vx + Math.sin(tick + p.phase) * 0.28;
        p.y += p.isPetal ? p.vy : -p.vy * 0.45;
        p.rot += p.vRot;

        // Gentle breeze repulsion around pointer
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 14000 && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const push = ((118 - dist) / 118) * 0.55;
          p.x += (dx / dist) * push;
          p.y += (dy / dist) * push;
        }

        if (p.y > height + 18) {
          p.y = -18;
          p.x = Math.random() * width;
        } else if (p.y < -18) {
          p.y = height + 18;
          p.x = Math.random() * width;
        }
        if (p.x > width + 18) p.x = -18;
        if (p.x < -18) p.x = width + 18;

        const a = p.alpha * (isDark ? 0.72 : 0.65);
        const palette = isDark
          ? [
              `rgba(232, 121, 144, ${a.toFixed(3)})`,
              `rgba(231, 188, 98, ${a.toFixed(3)})`,
              `rgba(118, 186, 149, ${a.toFixed(3)})`,
              `rgba(169, 154, 212, ${a.toFixed(3)})`,
            ]
          : [
              `rgba(194, 75, 99, ${a.toFixed(3)})`,
              `rgba(216, 162, 62, ${a.toFixed(3)})`,
              `rgba(90, 141, 115, ${a.toFixed(3)})`,
              `rgba(138, 121, 184, ${a.toFixed(3)})`,
            ];

        ctx.fillStyle = palette[p.hueType];

        if (p.isPetal) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.scale(1, 0.58 + 0.25 * Math.sin(tick * 2 + p.phase));
          ctx.beginPath();
          ctx.moveTo(0, -p.size);
          ctx.bezierCurveTo(p.size * 0.9, -p.size * 0.4, p.size * 0.85, p.size * 0.75, 0, p.size);
          ctx.bezierCurveTo(-p.size * 0.85, p.size * 0.75, -p.size * 0.9, -p.size * 0.4, 0, -p.size);
          ctx.fill();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    rafId = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  // 2. Minimalist Precision Botanical Rose-Gold Cursor Ring (Desktop fine pointers only)
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    const ring = ringRef.current;
    const dot = dotRef.current;
    if (!ring || !dot) return undefined;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let visible = false;
    let hovering = false;
    let pressed = false;
    let rafId = 0;

    const onMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) {
        ringX = targetX;
        ringY = targetY;
        visible = true;
        ring.classList.add('is-visible');
        dot.classList.add('is-visible');
      }
      const isInteractive =
        e.target instanceof Element && Boolean(e.target.closest(INTERACTIVE_SELECTOR));
      if (isInteractive !== hovering) {
        hovering = isInteractive;
        ring.classList.toggle('is-hover', hovering);
        dot.classList.toggle('is-hover', hovering);
      }
    };

    const onDown = () => {
      pressed = true;
      ring.classList.add('is-pressed');
    };

    const onUp = () => {
      pressed = false;
      ring.classList.remove('is-pressed');
    };

    const onLeave = () => {
      visible = false;
      ring.classList.remove('is-visible', 'is-hover', 'is-pressed');
      dot.classList.remove('is-visible', 'is-hover');
    };

    const animate = () => {
      rafId = window.requestAnimationFrame(animate);
      if (!visible) return;

      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      const ringScale = pressed ? 0.82 : hovering ? 1.55 : 1;
      ring.style.transform = `translate3d(${ringX.toFixed(1)}px, ${ringY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      dot.style.transform = `translate3d(${targetX.toFixed(1)}px, ${targetY.toFixed(1)}px, 0) translate(-50%, -50%)`;
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <>
      <canvas ref={canvasRef} className="kissa-dust-canvas" aria-hidden="true" />
      <div ref={ringRef} className="kissa-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="kissa-cursor-dot" aria-hidden="true" />
    </>
  );
}
