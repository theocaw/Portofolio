/**
 * Journey page content supporting bilingual EN & ID translations.
 */
export const journeyData = {
  en: {
    intro: {
      label: '03 / JOURNEY · 2024—2025',
      headline: ['Learning through', 'responsibility.'],
      description:
        'Professional experience, organizational involvement, and achievements. Different settings that have shaped how I organize work, collaborate, and follow through.',
    },
    professional: {
      label: '01 / PROFESSIONAL EXPERIENCE',
      title: 'A first step into the workplace.',
      internship: {
        period: 'MAY — JUL 2024',
        company: 'PT Kharisma Citatunggal',
        role: 'Logistics & Business Support Intern',
        description:
          'Worked with logistics data in Excel and prepared approximately 20 quotations. Independently developed and published the company website using Wix.',
        website: { label: 'kctjakarta.com ↗', url: 'https://kctjakarta.com' },
        highlights: [
          { value: '≈20', label: 'QUOTATIONS', tone: 'lime' },
          { value: 'Wix', label: 'PUBLISHED WEBSITE', tone: 'blue' },
        ],
        evidence: [
          {
            title: 'Internship Evidence',
            caption: 'PT Kharisma Citatunggal / published Wix website or work documentation.',
            images: [],
            alt: '',
          },
        ],
      },
    },
    organizations: {
      label: '02 / ORGANIZATIONS & VOLUNTEERING',
      title: 'Showing up. Taking responsibility.',
      description:
        'Treasury, committee, content, and volunteer roles. The figures below describe organizational activities—not software project outcomes.',
      entries: [
        {
          period: 'SEP — DEC 2025',
          name: 'SITE 2025',
          role: 'Treasurer',
          description: 'Managed an IDR 26.19 million budget and recorded 280+ transactions.',
          evidence: {
            title: 'SITE 2025 Committee Documentation',
            caption: 'SITE 2025 / Documentation of committee workflow and event execution.',
            images: [
              {
                src: '/images/journey/site/first meet panitia.jpg',
                alt: 'First Committee Meeting SITE 2025',
                caption: '01. First Meet: Inaugural gathering of all SITE 2025 committee divisions.',
              },
              {
                src: '/images/journey/site/pembekalan.jpg',
                alt: 'Briefing Session SITE 2025',
                caption: '02. Briefing: Orientation and briefing session for all participants.',
              },
              {
                src: '/images/journey/site/technical meetinf.jpg',
                alt: 'Technical Meeting SITE 2025',
                caption: '03. Technical Meeting: Coordination in the main auditorium.',
              },
              {
                src: '/images/journey/site/puncak acara.jpg',
                alt: 'Culmination Day SITE 2025',
                caption: '04. Culmination: Grand finale and closing celebration of SITE 2025.',
              },
            ],
          },
        },
        {
          period: 'OCT 2024 — NOV 2025',
          name: 'Obscura',
          role: 'Media and Branding Staff',
          description: 'Created 10 content pieces, with approximately 1,000–4,000 views per post.',
          evidence: {
            title: 'Add event photo',
            caption: 'Obscura / published content or event documentation from the organization.',
            images: [],
            alt: '',
          },
        },
        {
          period: 'MAY — OCT 2025',
          name: 'Obscura Exhibition',
          role: 'Treasurer',
          description:
            'Managed IDR 12.64 million and 170+ transactions for an exhibition with approximately 200 visitors.',
          evidence: {
            title: 'Obscura Exhibition Committee',
            caption: 'Obscura Exhibition / Photography exhibition committee team (200+ visitors).',
            images: [
              {
                src: '/images/journey/obscura exhibition/panitia.jpg',
                alt: 'Obscura Exhibition Committee',
                caption: 'Photography exhibition committee team that hosted 200+ visitors.',
                fit: 'contain',
              },
            ],
          },
        },
        {
          period: 'OCT 2024',
          name: 'Agrirun',
          role: 'Ticketing Staff',
          description: 'Handled ticketing distribution and registration for approximately 1,000 participants.',
          evidence: {
            title: 'Add event photo',
            caption: 'Agrirun / registration or ticketing documentation.',
            images: [],
            alt: '',
          },
        },
        {
          period: 'SEP 2024',
          name: 'Gebyar Nusantara',
          role: 'Costume Division Staff',
          description: 'Organized and distributed traditional performance costumes for 60 performers.',
          evidence: {
            title: 'Add event photo',
            caption: 'Gebyar Nusantara / costume preparation or performance photo.',
            images: [],
            alt: '',
          },
        },
      ],
    },
    achievements: {
      label: '03 / RECOGNITION & AWARDS',
      title: 'Effort acknowledged.',
      entries: [
        {
          result: '2nd place',
          name: 'National Photography Competition',
          organizer: 'National University / 2025',
          evidence: {
            title: 'National Photography Certificate',
            caption: 'National University / 2nd Place Winner Certificate for photography.',
            images: [
              {
                src: '/images/journey/lomba foto/sertif.jpg',
                alt: 'National Photography Competition Certificate',
                caption: '2nd Place Winner Certificate in National Photography Competition.',
                fit: 'contain',
              },
            ],
          },
        },
        {
          result: '2nd place',
          name: 'International Short Film Competition',
          organizer: 'Portal 7 / 2025',
          evidence: {
            title: 'Portal 7 Award',
            caption: 'Portal 7 / 2nd Place award in the International Short Film Competition with team.',
            images: [
              {
                src: '/images/journey/portal 7/portal.jpg',
                alt: '2nd Place International Short Film Competition Portal 7',
                caption: '2nd Place Winner award in International Short Film Competition Portal 7 with team.',
              },
            ],
          },
        },
        {
          result: '2nd place',
          name: 'Short Film Competition',
          organizer: 'SEMNASA ITCAS / 2025',
          evidence: {
            title: 'Add certificate',
            caption: 'SEMNASA ITCAS / certificate photo for 2nd place.',
            images: [],
            alt: '',
          },
        },
        {
          result: 'Semifinalist',
          name: 'Business Plan Competition',
          organizer: 'Ideanation / 2025',
          evidence: {
            title: 'Add certificate',
            caption: 'Ideanation / certificate photo for semifinalist.',
            images: [],
            alt: '',
          },
        },
      ],
    },
  },
  id: {
    intro: {
      label: '03 / PERJALANAN · 2024—2025',
      headline: ['Belajar lewat', 'tanggung jawab nyata.'],
      description:
        'Pengalaman profesional, keterlibatan organisasi, dan prestasi. Berbagai ruang yang membentuk caraku mengelola tugas, berkolaborasi, dan menuntaskan tanggung jawab.',
    },
    professional: {
      label: '01 / PENGALAMAN PROFESIONAL',
      title: 'Langkah awal di dunia kerja.',
      internship: {
        period: 'MEI — JUL 2024',
        company: 'PT Kharisma Citatunggal',
        role: 'Intern Logistik & Business Support',
        description:
          'Mengelola data logistik operasional menggunakan Excel dan menyusun sekitar 20 dokumen penawaran harga (quotations). Merancang dan meluncurkan website resmi perusahaan secara mandiri dengan Wix.',
        website: { label: 'kctjakarta.com ↗', url: 'https://kctjakarta.com' },
        highlights: [
          { value: '≈20', label: 'PENAWARAN HARGA', tone: 'lime' },
          { value: 'Wix', label: 'WEBSITE DILUNCURKAN', tone: 'blue' },
        ],
        evidence: [
          {
            title: 'Dokumentasi Magang',
            caption: 'PT Kharisma Citatunggal / website Wix yang dipublikasikan dan dokumentasi kerja.',
            images: [],
            alt: '',
          },
        ],
      },
    },
    organizations: {
      label: '02 / ORGANISASI & KEPANITIAAN',
      title: 'Hadir aktif. Menjalankan peran penuh tanggung jawab.',
      description:
        'Peran bendahara, kepanitiaan, konten kreatif, dan relawan. Data di bawah ini menggambarkan cakupan kegiatan organisasi—bukan hasil proyek software.',
      entries: [
        {
          period: 'SEP — DES 2025',
          name: 'SITE 2025',
          role: 'Bendahara',
          description: 'Mengelola anggaran dana sebesar Rp 26,19 juta dan mencatat lebih dari 280 transaksi keuangan.',
          evidence: {
            title: 'Dokumentasi Kepanitiaan SITE 2025',
            caption: 'SITE 2025 / Dokumentasi alur kepanitiaan dan pelaksanaan acara.',
            images: [
              {
                src: '/images/journey/site/first meet panitia.jpg',
                alt: 'First Meet Panitia SITE 2025',
                caption: '01. First Meet: Pertemuan perdana seluruh divisi kepanitiaan SITE 2025.',
              },
              {
                src: '/images/journey/site/pembekalan.jpg',
                alt: 'Sesi Pembekalan Peserta SITE 2025',
                caption: '02. Pembekalan: Sesi pengarahan materi dan pembekalan peserta.',
              },
              {
                src: '/images/journey/site/technical meetinf.jpg',
                alt: 'Technical Meeting SITE 2025',
                caption: '03. Technical Meeting: Koordinasi teknis acara bersama seluruh peserta di auditorium.',
              },
              {
                src: '/images/journey/site/puncak acara.jpg',
                alt: 'Puncak Acara SITE 2025',
                caption: '04. Puncak Acara: Penutupan dan perayaan puncak kegiatan SITE 2025.',
              },
            ],
          },
        },
        {
          period: 'OKT 2024 — NOV 2025',
          name: 'Obscura',
          role: 'Staf Media & Branding',
          description: 'Memproduksi 10 konten kreatif dengan rata-rata 1.000–4.000 penayangan per unggahan.',
          evidence: {
            title: 'Dokumentasi Konten',
            caption: 'Obscura / konten yang dipublikasikan dan dokumentasi kegiatan komunitas.',
            images: [],
            alt: '',
          },
        },
        {
          period: 'MEI — OKT 2025',
          name: 'Obscura Exhibition',
          role: 'Bendahara',
          description:
            'Mengelola anggaran Rp 12,64 juta dan 170+ transaksi untuk pameran yang dihadiri 200+ pengunjung.',
          evidence: {
            title: 'Panitia Obscura Exhibition',
            caption: 'Obscura Exhibition / Tim kepanitiaan pameran fotografi (200+ pengunjung).',
            images: [
              {
                src: '/images/journey/obscura exhibition/panitia.jpg',
                alt: 'Panitia Obscura Exhibition',
                caption: 'Tim kepanitiaan pameran fotografi yang menyambut 200+ pengunjung.',
                fit: 'contain',
              },
            ],
          },
        },
        {
          period: 'OKT 2024',
          name: 'Agrirun',
          role: 'Staf Ticketing',
          description: 'Menangani registrasi dan distribusi tiket untuk sekitar 1.000 peserta lari.',
          evidence: {
            title: 'Dokumentasi Acara',
            caption: 'Agrirun / dokumentasi registrasi dan layanan tiket peserta.',
            images: [],
            alt: '',
          },
        },
        {
          period: 'SEP 2024',
          name: 'Gebyar Nusantara',
          role: 'Staf Divisi Kostum',
          description: 'Menyiapkan, merawat, dan mendistribusikan kostum tari tradisional untuk 60 penampil acara.',
          evidence: {
            title: 'Dokumentasi Acara',
            caption: 'Gebyar Nusantara / persiapan kostum dan dokumentasi penampilan.',
            images: [],
            alt: '',
          },
        },
      ],
    },
    achievements: {
      label: '03 / PRESTASI & PENGHARGAAN',
      title: 'Apresiasi atas kerja keras.',
      entries: [
        {
          result: 'Juara 2',
          name: 'Lomba Fotografi Nasional',
          organizer: 'Universitas Nasional / 2025',
          evidence: {
            title: 'Sertifikat Juara 2 Lomba Foto',
            caption: 'Universitas Nasional / Sertifikat Juara 2 Lomba Fotografi Tingkat Nasional.',
            images: [
              {
                src: '/images/journey/lomba foto/sertif.jpg',
                alt: 'Sertifikat Juara 2 Lomba Foto Universitas Nasional',
                caption: 'Sertifikat raihan Juara 2 Lomba Fotografi Tingkat Nasional.',
                fit: 'contain',
              },
            ],
          },
        },
        {
          result: 'Juara 2',
          name: 'International Short Film Competition',
          organizer: 'Portal 7 / 2025',
          evidence: {
            title: 'Penghargaan 2nd Winner Portal 7',
            caption: 'Portal 7 / Raihan Juara 2 (2nd Winner) International Short Film Competition bersama tim.',
            images: [
              {
                src: '/images/journey/portal 7/portal.jpg',
                alt: 'Juara 2 International Short Film Competition Portal 7',
                caption: 'Raihan Juara 2 (2nd Winner) International Short Film Competition Portal 7 bersama tim.',
              },
            ],
          },
        },
        {
          result: 'Juara 2',
          name: 'Short Film Competition',
          organizer: 'SEMNASA ITCAS / 2025',
          evidence: {
            title: 'Dokumentasi Prestasi',
            caption: 'SEMNASA ITCAS / foto sertifikat raihan Juara 2 kompetisi film pendek.',
            images: [],
            alt: '',
          },
        },
        {
          result: 'Semifinalis',
          name: 'Business Plan Competition',
          organizer: 'Ideanation / 2025',
          evidence: {
            title: 'Dokumentasi Prestasi',
            caption: 'Ideanation / foto sertifikat semifinalis lomba business plan.',
            images: [],
            alt: '',
          },
        },
      ],
    },
  },
};

export const getJourneyContent = (lang = 'en') => journeyData[lang] || journeyData.en;
export const journey = journeyData.en;
