import { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext.jsx';
import './PinyoCompanion.css';

const DIALOGUES = {
  id: {
    poke: [
      'Halo! Aku Pinyo! 🧸✨',
      'Hmm? Jangan ditarik dong gantungan tasku...',
      'Pinyo lagi mikir... kamu lagi cari Software Engineer ya? 💻',
      'Topi kupluk Pinyo hangat banget lho!',
      'Portofolio Osanna keren kan? Jangan cuma liatin Pinyo terus...',
      'Capek... tapi kalau kamu scroll, Pinyo ikut nemenin.',
      '(•̀⤙•́) *pouting cute*',
      'Pinyo emang moody, tapi ramah kok!',
      'Coba cek proyek Medigo atau Alumni TPL di atas!',
    ],
    swing: [
      'Waaah! Ayunannya seru tapi Pinyo pusing! 🌀',
      'Gantungan tas edisi terbatas Pop Mart nih! ★',
      'Swing swing~ kayak lagi digantung di ransel Osanna.',
    ],
    treat: [
      'Nyam nyam! Biskuitnya manis banget! 🍪✨',
      'Makasih camilannya! Moody Pinyo langsung reda 50%.',
      'Biskuit terenak hari ini! ( ˘▽˘ )っ🍪',
    ],
    sleep: 'Zzz... Pinyo tidur sebentar ya. Jangan lupa hubungi Osanna...',
    wake: 'Hoammm... Pinyo bangun kok! Mau lihat proyek apa sekarang?',
  },
  en: {
    poke: [
      "Hi! I'm Pinyo! 🧸✨",
      "Hmm? Please don't tug on my keychain strap...",
      "Pinyo is contemplating life... and Osanna's code. 💻",
      'My knit beanie is super cozy! ✨',
      "Aren't Osanna's projects neat? Don't just stare at Pinyo!",
      'A bit moody today, but happy you are browsing around.',
      '(•̀⤙•́) *pouting cute*',
      "Pinyo might look brooding, but I'm friendly!",
      'Have you explored the Medigo project yet?',
    ],
    swing: [
      'Whoaa! Swinging like a genuine backpack plush! 🌀',
      'Limited edition Pop Mart pendant on duty! ★',
      'Swing swing~ feels like a train ride.',
    ],
    treat: [
      'Nom nom! That cookie was so crispy and sweet! 🍪✨',
      'Thanks for the treat! Pinyo feels 50% happier.',
      'Best snack ever! ( ˘▽˘ )っ🍪',
    ],
    sleep: 'Zzz... taking a quick power nap. Ping Osanna anytime...',
    wake: 'Yaaawn... Pinyo is awake! What are we checking out?',
  },
};

export default function PinyoCompanion() {
  const { lang, theme } = useApp();
  const [moodCount, setMoodCount] = useState(() => {
    try {
      return parseInt(localStorage.getItem('portfolio_pinyo_mood') || '0', 10);
    } catch {
      return 0;
    }
  });

  const [isNapping, setIsNapping] = useState(false);
  const [isHappy, setIsHappy] = useState(false);
  const [isFlapping, setIsFlapping] = useState(false);
  const [isSwinging, setIsSwinging] = useState(false);
  const [bubble, setBubble] = useState(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [sparkles, setSparkles] = useState([]);
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });

  const containerRef = useRef(null);
  const idleTimerRef = useRef(null);
  const bubbleTimerRef = useRef(null);

  // Mouse move listener: eye tracking and wake up from nap
  useEffect(() => {
    const handleMouseMove = (e) => {
      setIsNapping(false);
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        setIsNapping(true);
      }, 9500);

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const deltaX = e.clientX - centerX;
        const deltaY = e.clientY - centerY;
        const distance = Math.hypot(deltaX, deltaY);

        if (distance > 0) {
          const maxOffset = 3.2;
          setPupilOffset({
            x: (deltaX / distance) * Math.min(distance / 35, maxOffset),
            y: (deltaY / distance) * Math.min(distance / 35, maxOffset),
          });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    idleTimerRef.current = setTimeout(() => setIsNapping(true), 9500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(idleTimerRef.current);
      clearTimeout(bubbleTimerRef.current);
    };
  }, []);

  const spawnSparkles = (count = 4) => {
    const icons = theme === 'dark' ? ['✨', '⭐', '🍪', '💫'] : ['✨', '💖', '🍪', '🌸'];
    const newItems = Array.from({ length: count }).map(() => ({
      id: Date.now() + Math.random(),
      icon: icons[Math.floor(Math.random() * icons.length)],
      x: Math.random() * 50 - 25,
    }));

    setSparkles((prev) => [...prev, ...newItems]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((item) => !newItems.some((n) => n.id === item.id)));
    }, 1200);
  };

  const triggerBubble = (text, duration = 3200) => {
    setBubble(text);
    clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => {
      setBubble(null);
    }, duration);
  };

  const updateMood = (increment = 1) => {
    const newCount = moodCount + increment;
    setMoodCount(newCount);
    try {
      localStorage.setItem('portfolio_pinyo_mood', String(newCount));
    } catch {
      // storage unavailable
    }
  };

  // Swing plush doll
  const handleSwing = (e) => {
    if (e) e.stopPropagation();
    setIsNapping(false);
    setIsSwinging(true);
    spawnSparkles(3);
    setTimeout(() => setIsSwinging(false), 2200);

    const dialogues = DIALOGUES[lang]?.swing || DIALOGUES.en.swing;
    const text = dialogues[Math.floor(Math.random() * dialogues.length)];
    triggerBubble(text);
  };

  // Poke / Pet Pinyo
  const handlePoke = (e) => {
    // If clicked on upper keychain area, swing instead
    if (e) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickY = e.clientY - rect.top;
      if (clickY < 40) {
        handleSwing(e);
        return;
      }
    }

    setIsNapping(false);
    setIsFlapping(true);
    setIsHappy(true);
    spawnSparkles(4);
    updateMood(1);

    setTimeout(() => {
      setIsFlapping(false);
      setIsHappy(false);
    }, 600);

    const dialogues = DIALOGUES[lang]?.poke || DIALOGUES.en.poke;
    let text = dialogues[Math.floor(Math.random() * dialogues.length)];
    if (moodCount === 0) {
      text = lang === 'id' ? 'Halo! Aku Pinyo, salam kenal! 🧸✨' : "Hi! I'm Pinyo, nice to meet you! 🧸✨";
    } else if ((moodCount + 1) % 10 === 0) {
      text =
        lang === 'id'
          ? `Wah! Pinyo sudah ${moodCount + 1}x kamu elus! Bestie resmi Osanna! 🏆`
          : `Yay! ${moodCount + 1} pets for Pinyo! Officially Osanna's best friend! 🏆`;
    }

    triggerBubble(text);
  };

  // Feed treat 🍪
  const handleTreat = (e) => {
    e.stopPropagation();
    setIsNapping(false);
    setIsFlapping(true);
    setIsHappy(true);
    spawnSparkles(6);
    updateMood(2);

    setTimeout(() => {
      setIsFlapping(false);
      setIsHappy(false);
    }, 900);

    const dialogues = DIALOGUES[lang]?.treat || DIALOGUES.en.treat;
    const text = dialogues[Math.floor(Math.random() * dialogues.length)];
    triggerBubble(text, 3500);
  };

  if (isMinimized) {
    return (
      <button
        type="button"
        className="pinyo-minimized-btn"
        onClick={() => setIsMinimized(false)}
        title={lang === 'id' ? 'Panggil Pinyo kemari! 🧸' : 'Call Pinyo back! 🧸'}
        aria-label="Restore companion Pinyo"
      >
        <span className="pinyo-mini-icon">🧸</span>
        <span className="pinyo-mini-text">Pinyo</span>
        <span className="pinyo-mini-counter">{moodCount}</span>
      </button>
    );
  }

  return (
    <div className="pinyo-widget-container" ref={containerRef}>
      {/* Speech Bubble */}
      {bubble && (
        <div className="pinyo-speech-bubble" role="status" aria-live="polite">
          <span>{bubble}</span>
        </div>
      )}

      {/* Floating Sparkles */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="pinyo-floating-sparkle"
          style={{ '--offset-x': `${s.x}px` }}
          aria-hidden="true"
        >
          {s.icon}
        </span>
      ))}

      {/* Main Pinyo Card */}
      <div
        className={`pinyo-card ${isNapping ? 'is-napping' : ''} ${isHappy ? 'is-happy' : ''} ${
          isFlapping ? 'is-flapping' : ''
        }`}
        onClick={handlePoke}
        role="button"
        tabIndex={0}
        title={lang === 'id' ? 'Klik untuk mengelus atau mengayun Pinyo! 🧸' : 'Click to pet or swing Pinyo! 🧸'}
        aria-label="Interactive companion Pinyo"
      >
        {/* SVG Illustration Container with Keychain Assembly */}
        <div className={`pinyo-assembly ${isSwinging ? 'is-swinging' : ''}`}>
          <svg
            className="pinyo-svg"
            viewBox="0 0 220 280"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* 1. TOP KEYCHAIN: Ring & Clasp */}
            <g id="pinyoRingGroup" onClick={handleSwing} className="pinyo-ring-group">
              <circle cx="110" cy="18" r="15" stroke="var(--pinyo-ring, #251a16)" strokeWidth="5" fill="none" />
              <circle cx="110" cy="18" r="15" stroke="#523e35" strokeWidth="2.2" fill="none" opacity="0.75" />
              <rect x="105" y="3" width="10" height="4" rx="2" fill="#847167" stroke="var(--pinyo-ring, #251a16)" strokeWidth="1.5" />
              {/* Canvas Strap */}
              <rect x="99" y="30" width="22" height="18" rx="3" fill="#eae1cf" stroke="var(--pinyo-ring, #251a16)" strokeWidth="2.5" />
              <line x1="102.5" y1="32" x2="102.5" y2="46" stroke="#9e8d7b" strokeWidth="1.5" strokeDasharray="2 2" />
              <line x1="117.5" y1="32" x2="117.5" y2="46" stroke="#9e8d7b" strokeWidth="1.5" strokeDasharray="2 2" />
            </g>

            {/* 2. GREY KNIT BEANIE / PILOT HAT (CLEARLY VISIBLE OUTSIDE) */}
            <g id="pinyoBeanie">
              <path
                d="M 52 132 C 48 84, 68 44, 110 44 C 152 44, 172 84, 168 132 C 168 142, 162 148, 154 148 C 146 148, 144 140, 146 130 C 150 96, 136 62, 110 62 C 84 62, 70 96, 74 130 C 76 140, 74 148, 66 148 C 58 148, 52 142, 52 132 Z"
                fill="var(--pinyo-beanie, #47525d)"
                stroke="var(--ink, #1a2744)"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <path
                d="M 64 88 C 72 58, 90 44, 110 44 C 130 44, 148 58, 156 88 Z"
                fill="var(--pinyo-beanie-crown, #4e5b68)"
              />
              {/* Ribbed Knit Lines */}
              <path d="M 76 66 C 90 56, 130 56, 144 66" stroke="var(--pinyo-beanie-rib, #333d47)" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 68 84 C 86 70, 134 70, 152 84" stroke="var(--pinyo-beanie-rib, #333d47)" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M 60 106 C 72 90, 84 84, 94 82" stroke="var(--pinyo-beanie-rib, #333d47)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              <path d="M 160 106 C 148 90, 136 84, 126 82" stroke="var(--pinyo-beanie-rib, #333d47)" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Chevron knit marks */}
              <path d="M 104 52 L 110 56 L 116 52" stroke="#687787" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 92 68 L 98 72 L 104 68" stroke="#687787" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <path d="M 116 68 L 122 72 L 128 68" stroke="#687787" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </g>

            {/* 3. BEANIE TASSELS / BRAIDS */}
            <g className="pinyo-tassel-left">
              <path
                d="M 58 136 Q 50 160 54 182 Q 48 204 52 222 L 50 234"
                stroke="var(--pinyo-tassel, #38434e)"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 58 136 Q 50 160 54 182 Q 48 204 52 222 L 50 234"
                stroke="#596775"
                strokeWidth="3.5"
                strokeDasharray="6 4"
                fill="none"
              />
              <circle cx="50" cy="236" r="5.5" fill="var(--ink, #1c232b)" />
              <path d="M 50 241 L 45 256 M 50 241 L 50 258 M 50 241 L 55 255" stroke="var(--pinyo-tassel, #38434e)" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            <g className="pinyo-tassel-right">
              <path
                d="M 162 136 Q 170 160 166 182 Q 172 204 168 222 L 170 234"
                stroke="var(--pinyo-tassel, #38434e)"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d="M 162 136 Q 170 160 166 182 Q 172 204 168 222 L 170 234"
                stroke="#596775"
                strokeWidth="3.5"
                strokeDasharray="6 4"
                fill="none"
              />
              <circle cx="170" cy="236" r="5.5" fill="var(--ink, #1c232b)" />
              <path d="M 170 241 L 165 256 M 170 241 L 170 258 M 170 241 L 175 255" stroke="var(--pinyo-tassel, #38434e)" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* 4. BROWN SHERPA BODY */}
            <g id="pinyoSherpaBody">
              <path
                d="M 74 162 C 64 178, 66 214, 76 228 C 90 234, 130 234, 144 228 C 154 214, 156 178, 146 162 Z"
                fill="var(--pinyo-body, #4c372c)"
                stroke="var(--ink, #1a2744)"
                strokeWidth="3"
              />
              <circle cx="94" cy="198" r="3.5" fill="#3b2b22" opacity="0.6" />
              <circle cx="126" cy="202" r="3.5" fill="#3b2b22" opacity="0.6" />
              <circle cx="110" cy="216" r="3.5" fill="#3b2b22" opacity="0.6" />
            </g>

            {/* 5. LITTLE FEET / BOOTS */}
            <g id="pinyoFeet">
              <ellipse cx="85" cy="236" rx="14" ry="8.5" fill="#eae1cf" stroke="var(--ink, #1a2744)" strokeWidth="3" />
              <path d="M 85 229 L 85 241" stroke="#9e8f7d" strokeWidth="2" strokeLinecap="round" />
              <ellipse cx="135" cy="236" rx="14" ry="8.5" fill="#eae1cf" stroke="var(--ink, #1a2744)" strokeWidth="3" />
              <path d="M 135 229 L 135 241" stroke="#9e8f7d" strokeWidth="2" strokeLinecap="round" />
            </g>

            {/* 6. FLUFFY WHITE FUR HOOD TRIM & FOREHEAD HORN */}
            <g id="pinyoFluffyHood">
              <ellipse cx="110" cy="116" rx="43" ry="39" fill="var(--pinyo-fluff, #ffffff)" stroke="var(--ink, #1a2744)" strokeWidth="3.5" />
              <circle cx="110" cy="80" r="17" fill="var(--pinyo-fluff, #ffffff)" />
              <circle cx="88" cy="86" r="16" fill="var(--pinyo-fluff, #ffffff)" />
              <circle cx="132" cy="86" r="16" fill="var(--pinyo-fluff, #ffffff)" />
              <circle cx="73" cy="108" r="17" fill="var(--pinyo-fluff, #ffffff)" />
              <circle cx="147" cy="108" r="17" fill="var(--pinyo-fluff, #ffffff)" />
              <circle cx="75" cy="132" r="17" fill="var(--pinyo-fluff, #ffffff)" />
              <circle cx="145" cy="132" r="17" fill="var(--pinyo-fluff, #ffffff)" />
              <path d="M 74 96 Q 66 112 74 126" stroke="var(--ink, #1a2744)" strokeWidth="2.5" fill="none" />
              <path d="M 146 96 Q 154 112 146 126" stroke="var(--ink, #1a2744)" strokeWidth="2.5" fill="none" />

              {/* Forehead Horn / Tooth */}
              <polygon points="103,66 117,66 110,40" fill="#eae1cf" stroke="var(--ink, #1a2744)" strokeWidth="2.5" strokeLinejoin="round" />
              <path d="M 110 40 L 110 66" stroke="#c4b6a1" strokeWidth="1.5" />
            </g>

            {/* 7. FACE & THICK PINK BANGS (COVERING FOREHEAD) */}
            <g id="pinyoFace">
              <ellipse cx="110" cy="122" rx="33" ry="26" fill="var(--pinyo-skin, #feddc9)" stroke="#33201a" strokeWidth="2" />
              <ellipse cx="83" cy="130" rx="10.5" ry="6.5" fill="var(--pinyo-blush, #f87171)" opacity="0.65" />
              <ellipse cx="137" cy="130" rx="10.5" ry="6.5" fill="var(--pinyo-blush, #f87171)" opacity="0.65" />

              {/* Freckles */}
              <g fill="#8c4738" opacity="0.75">
                <circle cx="81" cy="128" r="1.1" />
                <circle cx="85" cy="130" r="1.2" />
                <circle cx="89" cy="127" r="0.9" />
                <circle cx="106" cy="126" r="1" />
                <circle cx="114" cy="126" r="1" />
                <circle cx="131" cy="127" r="0.9" />
                <circle cx="135" cy="130" r="1.2" />
                <circle cx="139" cy="128" r="1.1" />
              </g>

              {/* THICK SALMON PINK BANGS COVERING FOREHEAD */}
              <g id="pinyoBangs">
                <path
                  d="M 74 92 
                     C 74 116, 78 122, 82 121
                     C 86 114, 90 125, 96 123
                     C 100 115, 104 126, 110 124
                     C 114 115, 118 125, 124 123
                     C 128 116, 134 124, 138 120
                     C 142 115, 146 110, 146 92
                     C 134 82, 86 82, 74 92 Z"
                  fill="var(--pinyo-hair, #f78585)"
                  stroke="var(--pinyo-hair-stroke, #2e1915)"
                  strokeWidth="2.8"
                  strokeLinejoin="round"
                />
                {/* Hair Strand Highlights */}
                <path d="M 78 94 C 79 108, 81 116, 83 120" stroke="#ffb4b4" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 85 96 C 88 108, 93 118, 95 122" stroke="#ffb4b4" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 102 92 C 104 106, 107 118, 109 123" stroke="#ffb4b4" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 117 96 C 119 108, 122 118, 123 122" stroke="#ffb4b4" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 132 94 C 134 108, 137 116, 138 119" stroke="#ffb4b4" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M 77 94 C 95 86, 125 86, 143 94" stroke="#d65e5e" strokeWidth="3" strokeLinecap="round" fill="none" />
              </g>

              {/* Eyes Expression */}
              {isNapping ? (
                // Sleeping Eyes ^ ^
                <g className="pinyo-eyes-sleeping" stroke="#33201a" strokeWidth="3" strokeLinecap="round">
                  <path d="M 83 125 Q 91 118 99 125" fill="none" />
                  <path d="M 121 125 Q 129 118 137 125" fill="none" />
                  <text x="146" y="98" className="pinyo-sleep-z">z</text>
                  <text x="156" y="86" className="pinyo-sleep-z pinyo-sleep-z--lg">Z</text>
                </g>
              ) : isHappy ? (
                // Joyful / Poked Eyes > <
                <g className="pinyo-eyes-happy" stroke="#33201a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M 84 119 L 93 124 L 84 129" fill="none" />
                  <path d="M 136 119 L 127 124 L 136 129" fill="none" />
                </g>
              ) : (
                // Eye-Tracking Burgundy Eyes
                <g className="pinyo-eyes-open">
                  <ellipse cx="91" cy="124" rx="8.5" ry="9.5" fill="#2d0b13" stroke="#1c060c" strokeWidth="1.5" />
                  <ellipse cx="129" cy="124" rx="8.5" ry="9.5" fill="#2d0b13" stroke="#1c060c" strokeWidth="1.5" />
                  <ellipse cx="91" cy="125.5" rx="7.5" ry="7.5" fill="#581624" opacity="0.75" />
                  <ellipse cx="129" cy="125.5" rx="7.5" ry="7.5" fill="#581624" opacity="0.75" />

                  {/* Pupil Highlights moving with cursor */}
                  <circle cx={90.5 + pupilOffset.x} cy={123 + pupilOffset.y} r="3.2" fill="#ffffff" />
                  <circle cx={93} cy={126} r="1.4" fill="#ffffff" opacity="0.8" />
                  <circle cx={128.5 + pupilOffset.x} cy={123 + pupilOffset.y} r="3.2" fill="#ffffff" />
                  <circle cx={131} cy={126} r="1.4" fill="#ffffff" opacity="0.8" />

                  {/* Eyelid curves */}
                  <path d="M 82 117 Q 91 114 100 118" stroke="#33201a" strokeWidth="2" strokeLinecap="round" fill="none" />
                  <path d="M 120 118 Q 129 114 138 117" stroke="#33201a" strokeWidth="2" strokeLinecap="round" fill="none" />
                </g>
              )}

              {/* Nose dot */}
              <circle cx="110" cy="128" r="1.8" fill="#f472b6" opacity="0.75" />

              {/* Signature Moody Pout Mouth */}
              <g id="pinyoMouth">
                <path d="M 106 137 Q 110 139.5 114 137" stroke="#3e1d16" strokeWidth="2.3" strokeLinecap="round" fill="none" />
                <ellipse cx="110" cy="140" rx="3.5" ry="1.5" fill="#f87171" opacity="0.45" />
                <circle cx="110" cy="144" r="1.2" fill="#e07272" opacity="0.5" />
              </g>
            </g>

            {/* 8. FLUFFY WHITE CHEST COLLAR */}
            <g id="pinyoChestCollar">
              <path
                d="M 82 148 C 76 160, 86 172, 98 172 C 104 176, 116 176, 122 172 C 134 172, 144 160, 138 148 C 128 156, 92 156, 82 148 Z"
                fill="var(--pinyo-fluff, #ffffff)"
                stroke="var(--ink, #1a2744)"
                strokeWidth="2.8"
              />
              <path d="M 94 158 Q 100 166 108 159 Q 116 166 124 158" stroke="#dbe4ef" strokeWidth="2" fill="none" />
            </g>

            {/* 9. FLUFFY SHERPA WINGS */}
            <g id="pinyoWings">
              <g className="pinyo-wing-left">
                <path
                  d="M 76 164 C 60 174, 46 190, 50 206 C 56 210, 70 200, 76 188 Z"
                  fill="var(--pinyo-body, #4c372c)"
                  stroke="var(--ink, #1a2744)"
                  strokeWidth="3"
                />
                <path d="M 50 206 C 58 200, 66 192, 70 182" stroke="#eae1cf" strokeWidth="2.5" fill="none" />
              </g>
              <g className="pinyo-wing-right">
                <path
                  d="M 144 164 C 160 174, 174 190, 170 206 C 164 210, 150 200, 144 188 Z"
                  fill="var(--pinyo-body, #4c372c)"
                  stroke="var(--ink, #1a2744)"
                  strokeWidth="3"
                />
                <path d="M 170 206 C 162 200, 154 192, 150 182" stroke="#eae1cf" strokeWidth="2.5" fill="none" />
              </g>
            </g>
          </svg>
        </div>

        {/* Action Controls Tray */}
        <div className="pinyo-tray">
          <div className="pinyo-counter-tag" title="Level mood Pinyo">
            <span>❤️ {moodCount}</span>
          </div>

          <button
            type="button"
            className="pinyo-action-btn"
            onClick={handleTreat}
            title={lang === 'id' ? 'Beri biskuit untuk Pinyo! 🍪' : 'Give Pinyo a cookie treat! 🍪'}
            aria-label="Feed cookie"
          >
            🍪
          </button>

          <button
            type="button"
            className="pinyo-close-dot"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(true);
            }}
            title={lang === 'id' ? 'Sembunyikan Pinyo sebentar' : 'Minimize Pinyo'}
            aria-label="Minimize"
          >
            –
          </button>
        </div>
      </div>
    </div>
  );
}
