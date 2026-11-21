import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import './CommandPalette.css';

export default function CommandPalette() {
  const { lang, toggleLang, theme, toggleTheme } = useApp();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('commands'); // 'commands' | 'recruiter'
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);

  const openModal = (tab = 'commands') => {
    setActiveTab(tab);
    setQuery('');
    setSelectedIdx(0);
    setIsOpen(true);
  };

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

  // Global Ctrl+K / Cmd+K listener + custom event from SiteHeader button
  useEffect(() => {
    const onKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            setActiveTab('commands');
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

    const onCustomOpen = (e) => {
      const requestedTab = e.detail?.tab || 'commands';
      openModal(requestedTab);
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('open-command-palette', onCustomOpen);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('open-command-palette', onCustomOpen);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && activeTab === 'commands') {
      window.requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [isOpen, activeTab]);

  const commands = [
    {
      id: 'recruiter-scan',
      icon: '⏱️',
      group: lang === 'id' ? 'RINGKASAN HR' : 'RECRUITER BRIEF',
      title:
        lang === 'id'
          ? 'Buka Ringkasan 30-Detik HR & Recruiter'
          : 'Open 30-Second Recruiter Scan',
      hint: '30s Brief',
      action: () => setActiveTab('recruiter'),
    },
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
      aria-label="Command Palette and Recruiter Brief"
    >
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        {/* Top Mode Switcher Tabs */}
        <div className="cmd-tabs">
          <div className="cmd-tabs__group" role="tablist">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'commands'}
              className={`mono cmd-tab ${activeTab === 'commands' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('commands')}
            >
              ⚡ {lang === 'id' ? 'Navigasi Cepat (Ctrl+K)' : 'Command Palette (Ctrl+K)'}
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'recruiter'}
              className={`mono cmd-tab ${activeTab === 'recruiter' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('recruiter')}
            >
              ⏱️ {lang === 'id' ? 'Ringkasan 30-Detik HR' : '30s Recruiter Scan'}
            </button>
          </div>

          <button
            type="button"
            className="mono cmd-close-btn"
            onClick={closeModal}
            aria-label="Close modal"
          >
            ESC ×
          </button>
        </div>

        {activeTab === 'commands' ? (
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
        ) : (
          <div className="cmd-recruiter-body">
            {/* Candidate Snapshot Header */}
            <div className="cmd-recruiter-hero">
              <div>
                <span className="mono cmd-recruiter-status">
                  <span className="cmd-recruiter-dot" />
                  {lang === 'id'
                    ? 'SIAP MAGANG · DATA ANALYST & FRONT-END DEVELOPER'
                    : 'OPEN FOR INTERNSHIP · DATA ANALYST & FRONT-END DEVELOPER'}
                </span>
                <h2 className="cmd-recruiter-name">Osanna Patricia Limbong</h2>
                <p className="cmd-recruiter-sub">
                  IPB University ·{' '}
                  {lang === 'id'
                    ? 'Teknologi Rekayasa Perangkat Lunak (TPL)'
                    : 'Software Engineering Technology (TPL)'}{' '}
                  · <strong>GPA 3.63 / 4.00</strong>
                </p>
              </div>

              <a
                href="/images/journey/gemini/gemini-certified-student.pdf"
                target="_blank"
                rel="noreferrer"
                className="mono cmd-recruiter-cert"
              >
                ✦ Google Gemini Certified (PDF) ↗
              </a>
            </div>

            {/* 3 Proven Outcomes */}
            <div className="cmd-recruiter-section">
              <span className="mono cmd-recruiter-label">
                01 / {lang === 'id' ? '3 BUKTI HASIL & PROYEK UTAMA' : '3 PROVEN OUTCOMES & FLAGSHIP WORK'}
              </span>
              <div className="cmd-recruiter-grid">
                <button
                  type="button"
                  className="cmd-outcome-card"
                  onClick={() => {
                    navigate('/work/ames-housing');
                    closeModal();
                  }}
                >
                  <span className="mono cmd-outcome-metric">81.94% R² · 2,930 Homes</span>
                  <strong>Ames Housing Data Mining</strong>
                  <span>
                    {lang === 'id'
                      ? 'Regresi Linear (MAE $20.849), Decision Tree rpart (72,7%), & 3 klaster K-Means.'
                      : 'Linear Regression (MAE $20,849), rpart Decision Tree (72.7%), & 3 K-Means clusters.'}
                  </span>
                </button>

                <button
                  type="button"
                  className="cmd-outcome-card"
                  onClick={() => {
                    navigate('/work/alumni-portal');
                    closeModal();
                  }}
                >
                  <span className="mono cmd-outcome-metric">4-Tier N-Tier · 7 RTM Modules</span>
                  <strong>AlumniTPL & Dthanasha Kost</strong>
                  <span>
                    {lang === 'id'
                      ? 'Arsitektur sistem DPPL/SDD standar IEEE 830, ERD ternormalisasi, & dashboard Laravel.'
                      : 'IEEE 830 DPPL/SDD architecture, normalized ERD schemas, & Laravel Tailwind dashboards.'}
                  </span>
                </button>

                <button
                  type="button"
                  className="cmd-outcome-card"
                  onClick={() => {
                    navigate('/journey');
                    closeModal();
                  }}
                >
                  <span className="mono cmd-outcome-metric">1 Live Site · Rp 26.19M Audited</span>
                  <strong>PT KCT Intern & SITE 2025</strong>
                  <span>
                    {lang === 'id'
                      ? 'Merilis kctjakarta.com, ~20 quotation komersial, & mengaudit 280+ transaksi keuangan.'
                      : 'Shipped kctjakarta.com, ~20 commercial quotations, & audited 280+ financial records.'}
                  </span>
                </button>
              </div>
            </div>

            {/* Core Technical Stack & Awards */}
            <div className="cmd-recruiter-two-col">
              <div className="cmd-recruiter-box">
                <span className="mono cmd-recruiter-label">
                  02 / {lang === 'id' ? 'KEAHLIAN INTI' : 'CORE TECHNICAL STACK'}
                </span>
                <p className="cmd-recruiter-text">
                  <strong>Data & AI:</strong> Python, R, SQL, Pandas, Matplotlib, Seaborn, Scikit-Learn, Gemini AI
                  <br />
                  <strong>Web & Systems:</strong> React, JavaScript, Laravel 12, Tailwind CSS, React Native, MySQL, MongoDB, UML/ERD
                </p>
              </div>

              <div className="cmd-recruiter-box">
                <span className="mono cmd-recruiter-label">
                  03 / {lang === 'id' ? 'PRESTASI & PENGHARGAAN' : 'COMPETITION HONORS'}
                </span>
                <p className="cmd-recruiter-text">
                  🏆 <strong>2nd Place</strong> — International Short Movie (Portal 7, 2025)
                  <br />
                  🏆 <strong>2nd Place</strong> — National Short Movie (SEMNASA ITCAS, 2025)
                  <br />
                  ★ <strong>Semifinalist</strong> — Ideanation Business Plan (2025)
                </p>
              </div>
            </div>

            {/* Direct Contact Bar */}
            <div className="cmd-recruiter-actions">
              <button
                type="button"
                className={`mono cmd-action-pill cmd-action-pill--primary ${copied ? 'is-copied' : ''}`}
                onClick={copyEmail}
              >
                {copied
                  ? '✓ osannapatricia@gmail.com'
                  : '📋 Copy Email: osannapatricia@gmail.com'}
              </button>
              <a
                href="https://github.com/theocaw"
                target="_blank"
                rel="noreferrer"
                className="mono cmd-action-pill"
              >
                GitHub ↗
              </a>
              <a
                href="https://linkedin.com/in/osannapatricia"
                target="_blank"
                rel="noreferrer"
                className="mono cmd-action-pill"
              >
                LinkedIn ↗
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
