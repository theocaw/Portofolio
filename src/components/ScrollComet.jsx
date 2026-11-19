import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import './ScrollComet.css';

const SECTION_SELECTOR = 'main > section, main > .hero-stage, main > .page-intro-stage, #contact';

/**
 * Scroll companion: a comet rides a vertical track as you scroll, lighting up a
 * constellation node for every section it passes. Also feeds --scroll-y to the
 * page so the pastel background can drift (parallax).
 */
export default function ScrollComet() {
  const { pathname } = useLocation();
  const { lang } = useApp();
  const [nodes, setNodes] = useState([]);
  const [lit, setLit] = useState(0);
  const [pulse, setPulse] = useState(-1);
  const cometRef = useRef(null);
  const fillRef = useRef(null);
  const nodesRef = useRef([]);
  const litRef = useRef(0);
  const pulseTimer = useRef(0);

  const measure = useCallback(() => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const seen = new Set();
    const ratios = [];
    document.querySelectorAll(SECTION_SELECTOR).forEach((el) => {
      if (el.offsetHeight < 60) return;
      let top = 0;
      let cur = el;
      while (cur) {
        top += cur.offsetTop;
        cur = cur.offsetParent;
      }
      const r = Math.min(1, Math.max(0, top / max));
      const key = Math.round(r * 100);
      if (seen.has(key)) return;
      seen.add(key);
      ratios.push({ r, top });
    });
    ratios.sort((a, b) => a.r - b.r);
    nodesRef.current = ratios;
    setNodes(ratios);
  }, []);

  const update = useCallback(() => {
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, window.scrollY / max));

    if (cometRef.current) cometRef.current.style.top = `${progress * 100}%`;
    if (fillRef.current) fillRef.current.style.height = `${progress * 100}%`;
    document.documentElement.style.setProperty('--scroll-y', String(window.scrollY));

    const count = nodesRef.current.filter((n) => n.r <= progress + 0.002).length;
    if (count !== litRef.current) {
      if (count > litRef.current) {
        setPulse(count - 1);
        window.clearTimeout(pulseTimer.current);
        pulseTimer.current = window.setTimeout(() => setPulse(-1), 900);
      }
      litRef.current = count;
      setLit(count);
    }
  }, []);

  useEffect(() => {
    let raf = 0;
    const schedule = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        update();
      });
    };

    const init = window.setTimeout(() => {
      measure();
      update();
    }, 350);

    const onResize = () => {
      measure();
      schedule();
    };

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    let ro = null;
    const main = document.querySelector('main');
    if ('ResizeObserver' in window && main) {
      ro = new ResizeObserver(() => {
        measure();
        schedule();
      });
      ro.observe(main);
    }

    return () => {
      window.clearTimeout(init);
      window.clearTimeout(pulseTimer.current);
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', onResize);
      if (ro) ro.disconnect();
      document.documentElement.style.removeProperty('--scroll-y');
    };
  }, [pathname, lang, measure, update]);

  // Reset counters when navigating to another page.
  useEffect(() => {
    litRef.current = 0;
    setLit(0);
    setNodes([]);
    nodesRef.current = [];
  }, [pathname]);

  const jumpTo = (top) => window.scrollTo({ top: Math.max(0, top - 70), behavior: 'smooth' });

  if (nodes.length < 2) return null;

  return (
    <nav className="scroll-comet" aria-label={lang === 'id' ? 'Navigasi rasi bintang' : 'Constellation navigation'}>
      <span className="scroll-comet__count mono">
        {String(lit).padStart(2, '0')}/{String(nodes.length).padStart(2, '0')}
      </span>

      <div className="scroll-comet__track">
        <span ref={fillRef} className="scroll-comet__fill" />
        {nodes.map((n, i) => (
          <button
            key={`${n.top}-${i}`}
            type="button"
            className={`scroll-comet__node ${i < lit ? 'is-lit' : ''} ${pulse === i ? 'is-pulse' : ''}`}
            style={{ top: `${n.r * 100}%` }}
            onClick={() => jumpTo(n.top)}
            aria-label={`${lang === 'id' ? 'Bagian' : 'Section'} ${i + 1}`}
          >
            <span className="scroll-comet__star">✦</span>
          </button>
        ))}
        <span ref={cometRef} className="scroll-comet__comet" aria-hidden="true">
          <span className="scroll-comet__head" />
        </span>
      </div>
    </nav>
  );
}
