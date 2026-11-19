import { useEffect, useRef } from 'react';
import './CustomCursor.css';

const INTERACTIVE = 'a, button, [role="button"], [role="tab"], summary';

/**
 * Clean custom cursor: a sparkle star that follows instantly and a subtle ring that trails.
 * No text labels or solid circles that duplicate buttons on the page.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return undefined;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const pos = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    let raf = 0;
    let shown = false;
    let lastTarget = null;

    const setState = (target) => {
      if (target === lastTarget) return;
      lastTarget = target;
      const interactive = target ? target.closest(INTERACTIVE) : null;
      ring.classList.toggle('is-link', Boolean(interactive));
    };

    const onMove = (e) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!shown) {
        shown = true;
        ringPos.x = pos.x;
        ringPos.y = pos.y;
        dot.classList.add('is-visible');
        ring.classList.add('is-visible');
      }
      setState(e.target instanceof Element ? e.target : null);
    };

    const onLeave = () => {
      shown = false;
      dot.classList.remove('is-visible');
      ring.classList.remove('is-visible');
    };

    const onDown = () => ring.classList.add('is-down');
    const onUp = () => ring.classList.remove('is-down');

    const frame = () => {
      raf = requestAnimationFrame(frame);
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      ring.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
    };
    raf = requestAnimationFrame(frame);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="cursor-dot" aria-hidden="true">
        <span className="cursor-dot__star">✦</span>
      </div>
    </>
  );
}
