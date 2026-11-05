import { useState, useEffect } from 'react';
import './EvidenceModal.css';

export default function EvidenceModal({ isOpen, onClose, title, images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && images.length > 1) {
        setCurrentIndex((prev) => (prev + 1) % images.length);
      }
      if (e.key === 'ArrowLeft' && images.length > 1) {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, images.length, onClose]);

  if (!isOpen || !images.length) return null;

  const current = images[currentIndex];

  return (
    <div className="evidence-modal__backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="evidence-modal__dialog" onClick={(e) => e.stopPropagation()}>
        <div className="evidence-modal__header">
          <div className="evidence-modal__title-group">
            <span className="mono evidence-modal__count">
              {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
            </span>
            <h3 className="evidence-modal__title">{title}</h3>
          </div>
          <button
            type="button"
            className="evidence-modal__close-btn"
            onClick={onClose}
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        <div className="evidence-modal__viewport">
          <img
            src={current.src}
            alt={current.alt || `${title} slide ${currentIndex + 1}`}
            className="evidence-modal__img"
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="evidence-modal__nav evidence-modal__nav--prev"
                onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                type="button"
                className="evidence-modal__nav evidence-modal__nav--next"
                onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                aria-label="Next image"
              >
                →
              </button>
            </>
          )}
        </div>

        {current.caption && (
          <div className="evidence-modal__caption-bar">
            <p className="evidence-modal__caption-text">{current.caption}</p>
          </div>
        )}
      </div>
    </div>
  );
}
