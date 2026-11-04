import { useRef, useState } from 'react';
import './Evidence.css';

/**
 * Photo gallery for a project / organization / achievement.
 *
 * `images` is a list of files in /public (e.g. '/images/work/ames-1.png') or
 * objects { src, alt, caption }. With 0 images it shows the dashed placeholder.
 * With 1+ images it shows a swipeable slider (touch swipe, arrows, dots,
 * keyboard left/right) and no "+" marker.
 *
 * heights: { desktop, mobile } in px. tone: 'light' | 'dark'.
 */
export default function Evidence({ title, caption, images = [], heights, tone = 'light' }) {
  const slides = images.map((i) => (typeof i === 'string' ? { src: i } : i));
  const track = useRef(null);
  const [index, setIndex] = useState(0);

  const style = {
    '--evidence-h-desktop': `${heights.desktop}px`,
    '--evidence-h-mobile': `${heights.mobile}px`,
  };

  const goTo = (n) => {
    const el = track.current;
    if (!el) return;
    const next = (n + slides.length) % slides.length;
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' });
  };

  const onScroll = () => {
    const el = track.current;
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth));
  };

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') goTo(index + 1);
    if (e.key === 'ArrowLeft') goTo(index - 1);
  };

  if (slides.length === 0) {
    return (
      <figure className={`evidence evidence--${tone}`}>
        <div className="evidence__frame evidence__frame--empty" style={style}>
          <div className="evidence__status">
            <span>PHOTO PLACEHOLDER</span>
          </div>
          <p className="evidence__title">{title}</p>
          <span className="evidence__disclosure">EMPTY FRAME · NO EVIDENCE SUPPLIED</span>
        </div>
        {caption && <figcaption className="evidence__caption">{caption}</figcaption>}
      </figure>
    );
  }

  const current = slides[index] ?? slides[0];
  const many = slides.length > 1;

  return (
    <figure className={`evidence evidence--${tone}`}>
      <div className="evidence__frame evidence__frame--filled" style={style}>
        <div
          className="evidence__track"
          ref={track}
          onScroll={onScroll}
          onKeyDown={onKeyDown}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={title}
        >
          {slides.map((s, i) => (
            <img
              key={s.src}
              className={`evidence__slide ${s.fit === 'contain' ? 'evidence__slide--contain' : ''}`}
              src={s.src}
              alt={s.alt || `${title} ${i + 1}`}
              loading="lazy"
              draggable="false"
            />
          ))}
        </div>

        {many && (
          <>
            <button
              type="button"
              className="evidence__nav evidence__nav--prev"
              onClick={() => goTo(index - 1)}
              aria-label="Previous photo"
            >
              ←
            </button>
            <button
              type="button"
              className="evidence__nav evidence__nav--next"
              onClick={() => goTo(index + 1)}
              aria-label="Next photo"
            >
              →
            </button>
            <span className="evidence__count">
              {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
            </span>
          </>
        )}
      </div>

      {many && (
        <div className="evidence__dots">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              className={`evidence__dot ${i === index ? 'is-active' : ''}`}
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
            />
          ))}
        </div>
      )}

      {(current.caption || caption) && (
        <figcaption className="evidence__caption">{current.caption || caption}</figcaption>
      )}
    </figure>
  );
}
