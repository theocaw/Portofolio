import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext.jsx';

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], [role="tab"], input, select, textarea, .kissa-tape-card__shell-wrap, .kissa-portrait, .kissa-gpa-plate';

export default function AmbientMotion() {
  const { theme } = useApp();
  const canvasRef = useRef(null);
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const themeRef = useRef(theme);

  useEffect(() => {
    themeRef.current = theme;
  }, [theme]);

  // 1. Lightweight 60fps sunlit library dust motes drifting across viewport
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

    const count = width < 768 ? 16 : 28;
    const motes = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: 0.9 + Math.random() * 1.9,
      vx: (Math.random() - 0.5) * 0.16,
      vy: -0.08 - Math.random() * 0.22,
      phase: i * 0.9 + Math.random() * Math.PI * 2,
      alpha: 0.14 + Math.random() * 0.28,
      warm: i % 3 !== 0,
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
      tick += 0.012;

      ctx.clearRect(0, 0, width, height);
      const isDark = themeRef.current === 'dark';

      for (const m of motes) {
        m.x += m.vx + Math.sin(tick + m.phase) * 0.14;
        m.y += m.vy;

        // Soft gentle drift away from pointer
        const dx = m.x - pointer.x;
        const dy = m.y - pointer.y;
        const distSq = dx * dx + dy * dy;
        if (distSq < 12000 && distSq > 1) {
          const dist = Math.sqrt(distSq);
          const push = ((110 - dist) / 110) * 0.42;
          m.x += (dx / dist) * push;
          m.y += (dy / dist) * push;
        }

        if (m.y < -12) {
          m.y = height + 12;
          m.x = Math.random() * width;
        }
        if (m.x < -12) m.x = width + 12;
        if (m.x > width + 12) m.x = -12;

        const twinkle = 0.65 + 0.35 * Math.sin(tick * 1.7 + m.phase);
        const a = m.alpha * twinkle * (isDark ? 0.85 : 0.72);
        const color = m.warm
          ? isDark
            ? `rgba(224, 184, 101, ${a.toFixed(3)})`
            : `rgba(184, 128, 42, ${a.toFixed(3)})`
          : isDark
            ? `rgba(126, 168, 149, ${a.toFixed(3)})`
            : `rgba(43, 74, 62, ${a.toFixed(3)})`;

        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
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

  // 2. Minimalist Precision Brass Cursor Ring (Desktop fine pointers only)
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

      // Smooth spring-lagged interpolation for the outer brass ring
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
