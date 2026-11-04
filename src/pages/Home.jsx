import { useState } from 'react';
import ButtonLink from '../components/ButtonLink.jsx';
import { Link } from 'react-router-dom';
import { home } from '../content/home.js';
import { site } from '../content/site.js';
import './Home.css';

export default function Home() {
  const { headline, profilePhotos = [], explore } = home;
  const [photoIndex, setPhotoIndex] = useState(0);

  const currentPhoto = profilePhotos[photoIndex] || {
    src: '/images/profile/osanna-1.jpg',
    alt: 'Osanna Patricia Limbong',
  };

  const nextPose = () => {
    if (profilePhotos.length > 1) {
      setPhotoIndex((prev) => (prev + 1) % profilePhotos.length);
    }
  };

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

          <aside
            className="identity-card identity-card--photo"
            aria-label="Osanna Patricia Limbong profile photo"
            onClick={nextPose}
            title="Klik untuk ganti pose! ✨"
          >
            <div className="identity-card__media">
              <img
                src={currentPhoto.src}
                alt={currentPhoto.alt}
                className="identity-card__img"
                loading="eager"
                draggable="false"
              />
              <div className="identity-card__photo-overlay">
                <div className="identity-card__photo-info">
                  <span className="identity-card__photo-name">Osanna Patricia L.</span>
                  <span className="identity-card__photo-role">IPB University</span>
                </div>
                {profilePhotos.length > 1 && (
                  <button
                    type="button"
                    className="identity-card__pose-pill"
                    onClick={(e) => {
                      e.stopPropagation();
                      nextPose();
                    }}
                    aria-label="Next pose"
                  >
                    <span className="pose-sparkle">✦</span> Pose {photoIndex + 1}/{profilePhotos.length}
                  </button>
                )}
              </div>
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
