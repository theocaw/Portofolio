/**
 * Journey page content.
 *
 * Photos: put files in /public/images/journey/ and list them in the images array,
 * e.g. images: ['/images/journey/site-1.jpg', '/images/journey/site-2.jpg'].
 * Several photos become a swipeable slider; an empty array shows the placeholder.
 */
export const journey = {
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
          title: 'Add internship evidence',
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
          title: 'Panitia Obscura Exhibition',
          caption: 'Obscura Exhibition / Tim kepanitiaan pameran fotografi (200+ pengunjung).',
          images: [
            {
              src: '/images/journey/obscura exhibition/panitia.jpg',
              alt: 'Tim Panitia Obscura Exhibition',
              caption: 'Dokumentasi tim kepanitiaan pameran fotografi Obscura Exhibition.',
            },
          ],
        },
      },
      {
        period: 'JUN — JUL 2025',
        name: 'AIESEC IPB · HealMe 3.0',
        role: 'Volunteer',
        description:
          'Supported 2 educational sessions in 2 locations for 12 children, using 3 educational materials.',
        evidence: {
          title: 'Dokumentasi Kegiatan AIESEC Heal Me 3.0',
          caption: 'Heal Me 3.0 / Rangkaian kegiatan sosial dan edukasi kesehatan anak.',
          images: [
            {
              src: '/images/journey/aiesec/sdgs.jpg',
              alt: 'Tim Volunteer Heal Me 3.0 di Monumen SDGs IPB',
              caption: '01. SDGs IPB: Tim volunteer Heal Me 3.0 di depan monumen Sustainable Development Goals IPB.',
            },
            {
              src: '/images/journey/aiesec/cinta baca.jpg',
              alt: 'Sesi Belajar Bersama Anak di Cinta Baca',
              caption: '02. Cinta Baca: Sesi belajar dan edukasi interaktif bersama anak-anak.',
            },
            {
              src: '/images/journey/aiesec/panti asuhan.jpg',
              alt: 'Kunjungan Sosial di Panti Asuhan Darushsholihat',
              caption: '03. Panti Asuhan: Kunjungan sosial di Panti Asuhan Putri dan Balita Darushsholihat.',
            },
            {
              src: '/images/journey/aiesec/presentasi akhir.jpg',
              alt: 'Presentasi Akhir Proyek Heal Me 3.0',
              caption: '04. Final Presentation: Sesi presentasi akhir capaian proyek sosial Heal Me 3.0.',
            },
          ],
        },
      },
      {
        period: 'FEB — JUN 2025',
        name: 'Lomba Pendidikan Karya · BEM SV IPB',
        role: 'Competition Staff',
        description: 'Supported a competition involving 190+ participants, 48 teams, and 2 judges.',
        evidence: {
          title: 'Add event photo',
          caption: 'Lomba Pendidikan Karya / competition or committee documentation.',
          images: [],
          alt: '',
        },
      },
    ],
  },
  achievements: {
    label: '03 / ACHIEVEMENTS & CERTIFICATIONS · 2025—2026',
    title: 'Recognitions, competitions & credentials.',
    entries: [
      {
        result: 'Certified',
        name: 'Gemini Certified Student',
        organizer: 'Google for Education / SEP 2026',
        evidence: {
          title: 'Gemini Certified Student Certificate',
          caption: 'Google for Education / Gemini Certified Student (University) · Issued 24/09/2026 · Valid through 24/09/2029.',
          images: [
            {
              src: '/images/journey/gemini/gemini-certified-student.svg',
              alt: 'Google Gemini Certified Student Certificate - Osanna Patricia Limbong',
              caption: 'Google for Education / Gemini Certified Student (University) — Demonstrated knowledge and competencies in Google AI.',
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
};

