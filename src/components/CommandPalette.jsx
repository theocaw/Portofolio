import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import './CommandPalette.css';

export default function CommandPalette() {
  const { lang, toggleLang, theme, toggleTheme } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const closeModal = () => {
    setIsOpen(false);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('osannapatricia@gmail.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = 'mailto:osannapatricia@gmail.com';
    }
  };

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            setQuery('');
            setSelectedIdx(0);
          }
          return !prev;
        });
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        closeModal();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      window.requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen]);

  const commands = [
    {
      id: 'nav-home',
      icon: '🌌',
      group: lang === 'id' ? 'HALAMAN' : 'NAVIGATION',
      title: lang === 'id' ? 'Beranda (Home)' : 'Home — Aurora Hero & Impact',
      hint: '/',
      action: () => {
        navigate('/');
        closeModal();
      },
    },
    {
      id: 'nav-work',
      icon: '💿',
      group: lang === 'id' ? 'HALAMAN' : 'NAVIGATION',
      title: lang === 'id' ? 'Proyek (Work Tracklist)' : 'Work — Case Study Tracklist',
      hint: '/work',
      action: () => {
        navigate('/work');
        closeModal();
      },
    },
    {
      id: 'nav-about',
      icon: '🌸',
      group: lang === 'id' ? 'HALAMAN' : 'NAVIGATION',
      title: lang === 'id' ? 'Tentang & Keahlian (About)' : 'About — Profile, Education & Toolkit',
      hint: '/about',
      action: () => {
        navigate('/about');
        closeModal();
      },
    },
    {
      id: 'nav-journey',
      icon: '✨',
      group: lang === 'id' ? 'HALAMAN' : 'NAVIGATION',
      title:
        lang === 'id'
          ? 'Perjalanan & Prestasi (Journey)'
          : 'Journey — Internship, Leadership & Awards',
      hint: '/journey',
      action: () => {
        navigate('/journey');
        closeModal();
      },
    },
    {
      id: 'proj-ames',
      icon: '📊',
      group: lang === 'id' ? 'STUDI KASUS' : 'CASE STUDIES',
      title: 'Ames Housing: Property Valuation & Live Simulator (R² 81.94%)',
      hint: 'Track 01',
      action: () => {
        navigate('/work/ames-housing');
        closeModal();
      },
    },
    {
      id: 'proj-canvar',
      icon: '🕶️',
      group: lang === 'id' ? 'STUDI KASUS' : 'CASE STUDIES',
      title: 'canvAR: Interactive 3D & Vuforia AR Business Model Canvas',
      hint: 'Track 02',
      action: () => {
        navigate('/work/canvar');
        closeModal();
      },
    },
    {
      id: 'proj-cafier',
      icon: '☕',
      group: lang === 'id' ? 'STUDI KASUS' : 'CASE STUDIES',
      title: 'Cafier: React Native & Laravel 12 Midtrans Ordering Ecosystem',
      hint: 'Track 03',
      action: () => {
        navigate('/work/cafier');
        closeModal();
      },
    },
    {
      id: 'proj-kost',
      icon: '🏠',
      group: lang === 'id' ? 'STUDI KASUS' : 'CASE STUDIES',
      title: 'Dthanasha Kost: Automated Boarding Operations & MVC System',
      hint: 'Track 04',
      action: () => {
        navigate('/work/dthanasha-kost');
        closeModal();
      },
    },
    {
      id: 'proj-alumni',
      icon: '🎓',
      group: lang === 'id' ? 'STUDI KASUS' : 'CASE STUDIES',
      title: 'AlumniTPL: 4-Tier Layered Architecture & Tracer Study (DPPL)',
      hint: 'Track 05',
      action: () => {
        navigate('/work/alumni-portal');
        closeModal();
      },
    },
    {
      id: 'act-copy-email',
      icon: '📋',
      group: lang === 'id' ? 'AKSI CEPAT' : 'QUICK ACTIONS',
      title: copied
        ? lang === 'id'
          ? '✓ Email Tersalin (osannapatricia@gmail.com)'
          : '✓ Copied (osannapatricia@gmail.com)'
        : lang === 'id'
          ? 'Salin Email (osannapatricia@gmail.com)'
          : 'Copy Email (osannapatricia@gmail.com)',
      hint: 'Copy',
      action: copyEmail,
    },
    {
      id: 'act-theme',
      icon: theme === 'light' ? '🌙' : '☀️',
      group: lang === 'id' ? 'AKSI CEPAT' : 'QUICK ACTIONS',
      title:
        lang === 'id'
          ? `Ganti Tema ke ${theme === 'light' ? 'Dark Mode' : 'Light Mode'}`
          : `Switch to ${theme === 'light' ? 'Dark Mode' : 'Light Mode'}`,
      hint: 'Theme',
      action: toggleTheme,
    },
    {
      id: 'act-lang',
      icon: '🌐',
      group: lang === 'id' ? 'AKSI CEPAT' : 'QUICK ACTIONS',
      title:
        lang === 'id'
          ? 'Switch Language to English (EN)'
          : 'Ganti Bahasa ke Indonesia (ID)',
      hint: lang.toUpperCase(),
      action: toggleLang,
    },
  ];

  const filtered = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.group.toLowerCase().includes(query.toLowerCase()) ||
      c.hint.toLowerCase().includes(query.toLowerCase()),
  );

  const onListKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx((prev) => (filtered.length ? (prev + 1) % filtered.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx((prev) =>
        filtered.length ? (prev - 1 + filtered.length) % filtered.length : 0,
      );
    } else if (e.key === 'Enter' && filtered[selectedIdx]) {
      e.preventDefault();
      filtered[selectedIdx].action();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="cmd-backdrop"
      onClick={closeModal}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-tabs">
          <span className="mono cmd-header-title">
            ⚡ {lang === 'id' ? 'Navigasi Cepat (Ctrl+K)' : 'Quick Command Palette (Ctrl+K)'}
          </span>

          <button
            type="button"
            className="mono cmd-close-btn"
            onClick={closeModal}
            aria-label="Close modal"
          >
            ESC ×
          </button>
        </div>

        <div className="cmd-palette-body">
          <div className="cmd-search-bar">
            <span className="cmd-search-icon" aria-hidden="true">
              ⌕
            </span>
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIdx(0);
              }}
              onKeyDown={onListKeyDown}
              placeholder={
                lang === 'id'
                  ? 'Ketik halaman, studi kasus, atau aksi...'
                  : 'Type a page, case study, or action...'
              }
              className="cmd-search-input"
            />
          </div>

          <div className="cmd-list" role="listbox">
            {filtered.length === 0 ? (
              <p className="cmd-empty mono">
                {lang === 'id' ? 'Tidak ada hasil yang cocok.' : 'No matching commands.'}
              </p>
            ) : (
              filtered.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={idx === selectedIdx}
                  className={`cmd-item ${idx === selectedIdx ? 'is-selected' : ''}`}
                  onMouseEnter={() => setSelectedIdx(idx)}
                  onClick={item.action}
                >
                  <span className="cmd-item__icon" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span className="cmd-item__title">{item.title}</span>
                  <span className="mono cmd-item__hint">{item.hint}</span>
                </button>
              ))
            )}
          </div>

          <div className="mono cmd-footer-bar">
            <span>↑↓ {lang === 'id' ? 'Pilih' : 'Navigate'}</span>
            <span>↵ {lang === 'id' ? 'Buka' : 'Select'}</span>
            <span>ESC {lang === 'id' ? 'Tutup' : 'Close'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
