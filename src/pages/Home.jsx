import { useState } from 'react';
import ButtonLink from '../components/ButtonLink.jsx';
import { Link } from 'react-router-dom';
import { home } from '../content/home.js';
import { site } from '../content/site.js';
import './Home.css';

export default function Home() {
  const { headline, profilePhotos = [], explore } = home;
  const [photoIndex, setPhotoIndex] = useState(0);

  return (
    <>
      <section className="container home-hero">
        <div className="home-hero__composition">
          <div className="home-hero__intro">
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
            <div className="hero-photo-deck__stage-wrapper">
              <div className="hero-photo-deck__pin" title="Klik foto untuk ganti pose! ✨" aria-hidden="true">
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
                      onClick={() => setPhotoIndex(idx)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setPhotoIndex(idx);
                        }
                      }}
                      title="Klik untuk bawa pose ini ke depan! ✨"
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
                        <span>{photo.caption || photo.label}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="hero-photo-deck__pills" role="tablist" aria-label="Pilih pose">
              {profilePhotos.map((photo, idx) => (
                <button
                  key={photo.src}
                  type="button"
                  role="tab"
                  aria-selected={photoIndex === idx}
                  className={`hero-photo-deck__pill ${photoIndex === idx ? 'is-active' : ''}`}
                  onClick={() => setPhotoIndex(idx)}
                >
                  <span className="hero-photo-deck__pill-star">✦</span>
                  <span>{photo.label}</span>
                </button>
              ))}
            </div>

            <div className="hero-photo-deck__profile">
              <span className="hero-photo-deck__badge">PERSONAL INDEX · 2026</span>
              <h2 className="hero-photo-deck__name">Osanna Patricia Limbong</h2>
              <p className="hero-photo-deck__meta">Software Engineering · IPB University</p>
            </div>
          </aside>
        </div>

        <hr className="rule" />

        <div className="home-hero__meta">
          <span>{site.location.toUpperCase()}</span>
          <a href="#explore">{home.scrollCue}</a>
        </div>
      </section>

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
          <div className="home-explore__heading">
            <h2 className="home-explore__title">{explore.title}</h2>
            <Link to={explore.link.to} className="home-explore__link">
              {explore.link.label}
            </Link>
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
