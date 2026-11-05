import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext.jsx';
import './InteractivePet.css';

const MESSAGES = {
  id: [
    'Meow! Halo dari Osanna! 🐾',
    'Purrrr... nyaman banget dielus! ✨',
    'Lagi kepo proyek yang mana nih? 💻',
    'Semoga harimu menyenangkan! 🌸',
    'Kucing certified di portofolio! ★',
    'Sudah coba switch ke Dark Mode? 🌙',
    'Ngeong~ jangan lupa minum air! 🧋',
    '(ฅ^•ﻌ•^ฅ) *happy purr*',
  ],
  en: [
    'Meow! Osanna says hi! 🐾',
    'Purrrr... so cozy! ✨',
    'Checking out the projects? 💻',
    'Hope you’re having a lovely day! 🌸',
    'Portfolio resident cat on duty! ★',
    'Have you tried the Dark Mode toggle? 🌙',
    'Remember to stay hydrated! 🧋',
    '(ฅ^•ﻌ•^ฅ) *happy purr*',
  ],
};

export default function InteractivePet() {
  const { lang, theme } = useApp();
  const [petCount, setPetCount] = useState(() => {
    try {
      return parseInt(localStorage.getItem('portfolio_pet_count') || '0', 10);
    } catch {
      return 0;
    }
  });

  const [isNapping, setIsNapping] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [isFeeding, setIsFeeding] = useState(false);
  const [bubble, setBubble] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hearts, setHearts] = useState([]);

  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  const catRef = useRef(null);
  const idleTimerRef = useRef(null);
  const bubbleTimerRef = useRef(null);

  // Track mouse to move cat pupils toward cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Reset nap timer
      setIsNapping(false);
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsNapping(true);
      }, 9000);

      // Calculate eye angle
      if (catRef.current) {
        const rect = catRef.current.getBoundingClientRect();
        const catCenterX = rect.left + rect.width / 2;
        const catCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - catCenterX;
        const deltaY = e.clientY - catCenterY;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance > 0) {
          const maxOffset = 3.5;
          setPupilOffset({
            x: (deltaX / distance) * Math.min(distance / 40, maxOffset),
            y: (deltaY / distance) * Math.min(distance / 40, maxOffset),
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    idleTimerRef.current = setTimeout(() => setIsNapping(true), 9000);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(idleTimerRef.current);
      clearTimeout(bubbleTimerRef.current);
    };
  }, []);

  const spawnHearts = () => {
    const id = Date.now() + Math.random();
    setHearts((prev) => [...prev, { id, x: Math.random() * 40 - 20 }]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1200);
  };

  // Pet the cat
  const handlePetCat = () => {
    setIsNapping(false);
    setIsHappy(true);
    spawnHearts();

    const newCount = petCount + 1;
    setPetCount(newCount);
    try {
      localStorage.setItem('portfolio_pet_count', String(newCount));
    } catch {
      // storage unavailable
    }

    // Pick random message
    const msgList = MESSAGES[lang] || MESSAGES.en;
    let text = msgList[Math.floor(Math.random() * msgList.length)];
    if (newCount === 1) {
      text = lang === 'id' ? 'Hai! Makasih udah elus aku! 🐾' : 'Hi! Thanks for petting me! 🐾';
    } else if (newCount % 10 === 0) {
      text =
        lang === 'id'
          ? `Wah, sudah ${newCount}x dielus! Kamu resmi sahabat kucing! 🏆`
          : `Wow, ${newCount} pets! You are officially my best friend! 🏆`;
    }

    setBubble(text);
    clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => {
      setBubble(null);
      setIsHappy(false);
    }, 3600);
  };

  // Feed treat 🐟
  const handleFeed = (e) => {
    e.stopPropagation();
    setIsNapping(false);
    setIsFeeding(true);
    setIsHappy(true);
    spawnHearts();

    const feedText =
      lang === 'id'
        ? 'Nyam nyam nyam! Ikan lezat! 🐟✨'
        : 'Nom nom nom! Delicious fish! 🐟✨';

    setBubble(feedText);
    clearTimeout(bubbleTimerRef.current);

    setTimeout(() => {
      setIsFeeding(false);
      bubbleTimerRef.current = setTimeout(() => {
        setBubble(null);
        setIsHappy(false);
      }, 2500);
    }, 800);
  };

  if (isMinimized) {
    return (
      <button
        type="button"
        className="pet-minimized-btn"
        onClick={() => setIsMinimized(false)}
        title={lang === 'id' ? 'Panggil kucing kemari! 🐾' : 'Call the kitty back! 🐾'}
        aria-label="Restore companion"
      >
        <span className="pet-mini-icon">🐾</span>
      </button>
    );
  }

  return (
    <div className="pet-widget-container" ref={catRef}>
      {/* Speech bubble */}
      {bubble && (
        <div className="pet-speech-bubble" role="status" aria-live="polite">
          <span>{bubble}</span>
        </div>
      )}

      {/* Floating hearts */}
      {hearts.map((h) => (
        <span
          key={h.id}
          className="pet-floating-heart"
          style={{ '--offset-x': `${h.x}px` }}
          aria-hidden="true"
        >
          {theme === 'dark' ? '✨' : '💖'}
        </span>
      ))}

      {/* Cat interactive stage */}
      <div
        className={`pet-cat-card ${isNapping ? 'is-napping' : ''} ${isHappy ? 'is-happy' : ''} ${
          isFeeding ? 'is-eating' : ''
        }`}
        onClick={handlePetCat}
        role="button"
        tabIndex={0}
        title={lang === 'id' ? 'Klik untuk mengelus kucing! 🐾' : 'Click to pet the cat! 🐾'}
        aria-label="Interactive companion cat"
      >
        {/* Cat SVG Illustration */}
        <svg
          className="pet-cat-svg"
          viewBox="0 0 120 110"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Animated Tail */}
          <path
            className="pet-tail"
            d="M 92 82 C 108 80, 118 64, 110 50 C 106 42, 98 46, 101 54 C 104 62, 98 72, 88 74"
            stroke="var(--pet-fur-stroke, #1a2744)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Left Ear */}
          <path
            d="M 26 38 L 18 12 C 16 9, 28 8, 38 20 Z"
            fill="var(--pet-fur-body, #ffffff)"
            stroke="var(--pet-fur-stroke, #1a2744)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M 24 32 L 20 18 C 21 16, 27 16, 33 24 Z" fill="var(--pet-ear-pink, #fbcfe8)" />

          {/* Right Ear */}
          <path
            d="M 74 20 C 84 8, 96 9, 94 12 L 86 38 Z"
            fill="var(--pet-fur-body, #ffffff)"
            stroke="var(--pet-fur-stroke, #1a2744)"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <path d="M 79 24 C 85 16, 91 16, 92 18 L 88 32 Z" fill="var(--pet-ear-pink, #fbcfe8)" />

          {/* Cat Chubby Head & Body */}
          <ellipse
            cx="56"
            cy="62"
            rx="42"
            ry="36"
            fill="var(--pet-fur-body, #ffffff)"
            stroke="var(--pet-fur-stroke, #1a2744)"
            strokeWidth="3.5"
          />

          {/* Calico / Kawaii Patch */}
          <path
            d="M 28 36 C 36 34, 46 40, 48 48 C 50 56, 38 60, 26 56 C 20 54, 20 40, 28 36 Z"
            fill="var(--pet-patch, #fef08a)"
            opacity="0.85"
          />

          {/* Eyes & Expressions */}
          {isNapping ? (
            // Sleeping eyes ^ ^
            <g className="pet-eyes-sleeping" stroke="var(--pet-fur-stroke, #1a2744)" strokeWidth="3" strokeLinecap="round">
              <path d="M 36 54 Q 42 47 48 54" />
              <path d="M 64 54 Q 70 47 76 54" />
              {/* Sleeping zZz */}
              <text x="78" y="32" className="pet-sleep-z">z</text>
              <text x="86" y="22" className="pet-sleep-z pet-sleep-z--lg">Z</text>
            </g>
          ) : isHappy || isFeeding ? (
            // Joyful eyes > <
            <g className="pet-eyes-happy" stroke="var(--pet-fur-stroke, #1a2744)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 36 49 L 43 54 L 36 59" />
              <path d="M 76 49 L 69 54 L 76 59" />
            </g>
          ) : (
            // Cute tracking eyes
            <g className="pet-eyes-open">
              {/* Sclera */}
              <ellipse cx="42" cy="54" rx="7" ry="8" fill="var(--pet-fur-stroke, #1a2744)" />
              <ellipse cx="70" cy="54" rx="7" ry="8" fill="var(--pet-fur-stroke, #1a2744)" />
              {/* Pupil Highlights moving toward cursor */}
              <circle
                cx={42 + pupilOffset.x}
                cy={52 + pupilOffset.y}
                r="3"
                fill="#ffffff"
              />
              <circle
                cx={70 + pupilOffset.x}
                cy={52 + pupilOffset.y}
                r="3"
                fill="#ffffff"
              />
              <circle cx={44} cy="56" r="1.2" fill="#ffffff" />
              <circle cx={72} cy="56" r="1.2" fill="#ffffff" />
            </g>
          )}

          {/* Cute Blush Cheeks */}
          <circle cx="32" cy="62" r="5" fill="var(--pet-blush, #f472b6)" opacity="0.65" />
          <circle cx="80" cy="62" r="5" fill="var(--pet-blush, #f472b6)" opacity="0.65" />

          {/* Cute Nose */}
          <polygon points="53,60 59,60 56,63" fill="var(--pet-ear-pink, #f472b6)" />

          {/* W-Mouth */}
          <path
            d="M 50 63 Q 53 67 56 64 Q 59 67 62 63"
            stroke="var(--pet-fur-stroke, #1a2744)"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Whiskers */}
          <g stroke="var(--pet-fur-stroke, #1a2744)" strokeWidth="2" strokeLinecap="round" opacity="0.7">
            <line x1="22" y1="58" x2="10" y2="56" />
            <line x1="22" y1="64" x2="11" y2="67" />
            <line x1="90" y1="58" x2="102" y2="56" />
            <line x1="90" y1="64" x2="101" y2="67" />
          </g>

          {/* Cute Y2K Collar */}
          <path
            d="M 32 82 Q 56 90 80 82"
            stroke="var(--blue, #38bdf8)"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Bell / Star charm */}
          <circle cx="56" cy="87" r="4.5" fill="var(--lime, #fef08a)" stroke="var(--pet-fur-stroke, #1a2744)" strokeWidth="1.5" />

          {/* Front Paws */}
          <ellipse cx="44" cy="94" rx="7" ry="5" fill="var(--pet-fur-body, #ffffff)" stroke="var(--pet-fur-stroke, #1a2744)" strokeWidth="2.5" />
          <ellipse cx="68" cy="94" rx="7" ry="5" fill="var(--pet-fur-body, #ffffff)" stroke="var(--pet-fur-stroke, #1a2744)" strokeWidth="2.5" />
        </svg>

        {/* Action Tray */}
        <div className="pet-tray">
          <div className="pet-counter-tag" title="Total elusan">
            <span>🐾 {petCount}</span>
          </div>

          <button
            type="button"
            className="pet-action-btn"
            onClick={handleFeed}
            title={lang === 'id' ? 'Beri makan ikan! 🐟' : 'Feed a treat! 🐟'}
            aria-label="Feed treat"
          >
            🐟
          </button>

          <button
            type="button"
            className="pet-close-dot"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(true);
            }}
            title={lang === 'id' ? 'Sembunyikan kucing sebentar' : 'Minimize cat'}
            aria-label="Minimize"
          >
            –
          </button>
        </div>
      </div>
    </div>
  );
}
