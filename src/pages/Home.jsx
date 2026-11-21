import { useState, useRef, useEffect } from 'react';
import ButtonLink from '../components/ButtonLink.jsx';
import { Link } from 'react-router-dom';
import AuroraSky from '../components/AuroraSky.jsx';
import { useApp } from '../context/AppContext.jsx';
import { getHomeContent } from '../content/home.js';
import './Home.css';

const IMPACT_COUNTERS = {
  en: [
    { target: 2930, decimals: 0, suffix: '', formatThousands: true, label: 'PROPERTY RECORDS ANALYZED', note: 'Ames Housing Data Mining' },
    { target: 81.94, decimals: 2, suffix: '%', formatThousands: false, label: 'PREDICTIVE ACCURACY (R²)', note: 'Multiple Linear Regression' },
    { target: 5, decimals: 0, prefix: '0', suffix: '', formatThousands: false, label: 'SHIPPED CASE STUDIES', note: 'Data, AR, Web & System Design' },
    { target: 280, decimals: 0, suffix: '+', formatThousands: false, label: 'AUDITED TRANSACTIONS', note: 'Rp 26.19M Budget · SITE 2025' },
  ],
  id: [
    { target: 2930, decimals: 0, suffix: '', formatThousands: true, label: 'DATA PROPERTI DIANALISIS', note: 'Data Mining Ames Housing' },
    { target: 81.94, decimals: 2, suffix: '%', formatThousands: false, label: 'AKURASI PREDIKSI (R²)', note: 'Regresi Linear Berganda' },
    { target: 5, decimals: 0, prefix: '0', suffix: '', formatThousands: false, label: 'STUDI KASUS AKADEMIK', note: 'Data, AR, Web & Arsitektur Sistem' },
    { target: 280, decimals: 0, suffix: '+', formatThousands: false, label: 'TRANSAKSI TERAUDIT', note: 'Anggaran Rp 26,19 Juta · SITE 2025' },
  ],
};

function ImpactCounterStrip({ lang }) {
  const items = IMPACT_COUNTERS[lang] || IMPACT_COUNTERS.en;
  const stripRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = stripRef.current;
    if (!el) return undefined;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setProgress(1);
      return undefined;
    }

    let raf = 0;
    let started = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          started = true;
          const t0 = performance.now();
          const dur = 1150;
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setProgress(eased);
            if (p < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.15 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const formatVal = (item) => {
    const cur = item.target * progress;
    if (item.decimals > 0) {
      return `${item.prefix || ''}${cur.toFixed(item.decimals)}${item.suffix || ''}`;
    }
    const rounded = Math.round(cur);
    const numStr = item.formatThousands
      ? rounded.toLocaleString(lang === 'id' ? 'id-ID' : 'en-US')
      : String(rounded);
    return `${item.prefix || ''}${numStr}${item.suffix || ''}`;
  };

  return (
    <div ref={stripRef} className="home-counters" aria-label="Measured Impact Highlights">
      {items.map((item) => (
        <div key={item.label} className="home-counter-card">
          <span className="mono home-counter-card__label">{item.label}</span>
          <span className="home-counter-card__value">{formatVal(item)}</span>
          <span className="home-counter-card__note">{item.note}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const { lang } = useApp();
  const home = getHomeContent(lang);
  const { headline, profilePhotos = [], explore } = home;
  const [photoIndex, setPhotoIndex] = useState(0);

  const swipeStartX = useRef(null);
  const swipeStartY = useRef(null);
  const didSwipe = useRef(false);

  const onSwipeStart = (clientX, clientY) => {
    swipeStartX.current = clientX;
    swipeStartY.current = clientY;
    didSwipe.current = false;
  };

  const onSwipeMove = (clientX, clientY) => {
    if (swipeStartX.current === null) return;
    const deltaX = clientX - swipeStartX.current;
    const deltaY = clientY - swipeStartY.current;
    if (Math.abs(deltaX) > 10 && Math.abs(deltaX) > Math.abs(deltaY)) {
      didSwipe.current = true;
    }
  };

  const onSwipeEnd = (clientX, clientY) => {
    if (swipeStartX.current === null) return;
    const deltaX = clientX - swipeStartX.current;
    const deltaY = clientY - swipeStartY.current;

    // Minimum swipe threshold: 30px horizontally, dominant over vertical scroll
    if (Math.abs(deltaX) > 30 && Math.abs(deltaX) > Math.abs(deltaY)) {
      didSwipe.current = true;
      if (deltaX < 0) {
        // Swiped left -> next photo
        setPhotoIndex((prev) => (prev + 1) % profilePhotos.length);
      } else {
        // Swiped right -> previous photo
        setPhotoIndex((prev) => (prev - 1 + profilePhotos.length) % profilePhotos.length);
      }
    }

    swipeStartX.current = null;
    swipeStartY.current = null;

    setTimeout(() => {
      didSwipe.current = false;
    }, 120);
  };

  const onSwipeCancel = () => {
    swipeStartX.current = null;
    swipeStartY.current = null;
    didSwipe.current = false;
  };

  return (
    <>
      <div className="hero-stage">
      <AuroraSky />
      <section className="container home-hero">
        <div className="home-hero__composition">
          <div className="home-hero__intro">
            {home.availability && (
              <a href="#contact" className="home-hero__status-pill mono">
                <span className="home-hero__status-dot" aria-hidden="true" />
                <span>{home.availability}</span>
              </a>
            )}
            <h1 className="home-hero__headline">
              <span>{headline[0]}</span>
              <span className="home-hero__headline-accent">{headline[1]}</span>
            </h1>

            <div className="home-hero__person">
              <p className="home-hero__greeting">{home.greeting}</p>
              <p className="home-hero__text">{home.intro}</p>
            </div>

            <div className="home-hero__actions">
              {home.actions.map((a) => (
                <ButtonLink key={a.to} to={a.to} variant={a.variant}>
                  {a.label}
                </ButtonLink>
              ))}
            </div>
          </div>

          <aside className="hero-photo-deck" aria-label="Osanna Patricia Limbong photos">
            <div
              className="hero-photo-deck__stage-wrapper"
              onTouchStart={(e) => onSwipeStart(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchMove={(e) => onSwipeMove(e.touches[0].clientX, e.touches[0].clientY)}
              onTouchEnd={(e) => onSwipeEnd(e.changedTouches[0].clientX, e.changedTouches[0].clientY)}
              onTouchCancel={onSwipeCancel}
              onMouseDown={(e) => onSwipeStart(e.clientX, e.clientY)}
              onMouseMove={(e) => {
                if (e.buttons === 1) onSwipeMove(e.clientX, e.clientY);
              }}
              onMouseUp={(e) => onSwipeEnd(e.clientX, e.clientY)}
              onMouseLeave={onSwipeCancel}
            >
              <div
                className="hero-photo-deck__pin"
                title={lang === 'id' ? 'Klik foto untuk ganti pose! ✨' : 'Click photo to switch pose! ✨'}
                aria-hidden="true"
                onClick={() => setPhotoIndex((prev) => (prev + 1) % profilePhotos.length)}
              >
                <span className="hero-photo-deck__star">★</span>
              </div>

              <div className="hero-photo-deck__stage">
                {profilePhotos.map((photo, idx) => {
                  let cardState = 'is-active';
                  if (idx === (photoIndex + 1) % profilePhotos.length) cardState = 'is-right';
                  else if (idx === (photoIndex + 2) % profilePhotos.length) cardState = 'is-left';

                  return (
                    <div
                      key={photo.src}
                      className={`hero-polaroid ${cardState}`}
                      onClick={() => {
                        if (didSwipe.current) return;
                        setPhotoIndex(idx);
                      }}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setPhotoIndex(idx);
                        }
                      }}
                      title={
                        lang === 'id'
                          ? 'Geser (swipe) atau klik untuk ganti pose! ✨'
                          : 'Swipe or click to change pose! ✨'
                      }
                      aria-label={`${photo.label} - Pose ${idx + 1}`}
                    >
                      <div className="hero-polaroid__media">
                        <img
                          src={photo.src}
                          alt={photo.alt}
                          className="hero-polaroid__img"
                          loading="eager"
                          draggable="false"
                        />
                      </div>
                      <div className="hero-polaroid__caption">
                        <span>✦ {photo.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>

        <hr className="rule" />

        <div className="home-hero__meta">
          <a href="#explore">{home.scrollCue}</a>
        </div>
      </section>
      </div>

      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((n) => (
            <div className="marquee__item" key={n}>
              {home.marquee.map((word) => (
                <span key={word}>✦ {word}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section className="band band--paper-2" id="explore">
        <div className="container section home-explore">
          <ImpactCounterStrip lang={lang} />

          <div className="home-explore__heading">
            <h2 className="home-explore__title">{explore.title}</h2>
          </div>

          <div className="home-explore__cards">
            {explore.cards.map((card) => (
              <Link key={card.to} to={card.to} className="page-card">
                <span className="page-card__index">{card.index}</span>
                <h3 className="page-card__title">{card.title}</h3>
                <p className="page-card__description">{card.description}</p>
                <span className="page-card__cta">{card.cta}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
