/**
 * Work page content.
 *
 * Ordered chronologically from earliest created (Sep 2025) to last created (May 2026).
 * Includes a dedicated On-Going Project section featuring 3 active projects: Medigo, Veriface, and Siren.
 */
export const work = {
  intro: {
    label: '02 / WORK · ACADEMIC PROJECTS · 2025—2026',
    headline: ['Questions into', 'working systems.'],
    description:
      'Academic projects in front-end, full-stack, AR, and data analysis.',
  },
  note: {
    count: '05',
    lines: [
      'ACADEMIC PROJECTS (2025 → 2026)',
      'From foundational system design to full-stack, AR, and machine learning data analysis.',
    ],
  },

  // Dedicated section for 3 ongoing projects in progress (no photos for now)
  ongoingSection: {
    badge: 'ON GOING PROJECTS',
    title: 'Currently in Progress',
    subtitle: 'Three active projects currently in active research and development.',
    items: [
      {
        id: 'medigo',
        index: '01',
        title: 'Medigo',
        role: 'Data Analyst',
        category: 'HEALTHCARE SYSTEM',
        tagline: 'Healthcare & medical services platform.',
        description:
          'A modern digital healthcare platform designed to streamline medical service flows and user healthcare access.',
        status: 'In Progress',
        tags: ['Healthcare', 'Web Platform', 'System Design'],
      },
      {
        id: 'veriface',
        index: '02',
        title: 'Veriface',
        role: 'Data Analyst',
        category: 'COMPUTER VISION & AI',
        tagline: 'Biometric identity gateway & 3D liveness verification.',
        description:
          'Biometric pre-screening gateway with real-time facial landmark detection and anti-spoofing verification.',
        status: 'In Progress',
        tags: ['Computer Vision', 'MediaPipe', 'Deep Learning'],
      },
      {
        id: 'siren',
        index: '03',
        title: 'Siren',
        role: 'Data Analyst & System Analyst',
        category: 'ALERT & MONITORING',
        tagline: 'Emergency response and rapid alert system.',
        description:
          'Rapid emergency alert and communication system for instant safety notifications and incident monitoring.',
        status: 'In Progress',
        tags: ['Emergency System', 'Real-time', 'Active Development'],
      },
    ],
  },

  // Header for completed academic projects section
  completedSection: {
    badge: 'COMPLETED PROJECTS',
    meta: '2025 — 2026 · 05 PROJECTS',
    title: 'Completed Academic Projects',
    subtitle: '',
  },

  projects: [
    // 01: Alumni Portal (September 2025) - Proyek paling awal dibuat
    {
      id: 'alumni-portal',
      tone: 'light',
      longTitle: true,
      label: '01 / FRONT-END & SYSTEM DESIGN',
      title: 'Software Engineering Technology Alumni Information System and Tracer Study Portal',
      tagline: 'Organizing the connection between alumni and career data.',
      role: 'System Analyst & Front-End Developer',
      meta: 'ACADEMIC PROJECT · SEP — DEC 2025',
      description:
        'Designed MVC structure, UML, ERD, and wireframes for alumni career records and tracer studies. The portal includes data export and email notifications.',
      tags: ['Laravel', 'MySQL', 'Tailwind CSS'],
      evidence: [
        {
          title: 'Tim Pengembang Web Alumni TPL',
          caption: 'Alumni Portal / Tim pengembang bersama display web portal Alumni TPL di Sekolah Vokasi IPB.',
          images: [
            {
              src: '/images/work/alumni tpl/tim.jpg',
              alt: 'Tim Pengembang Web Alumni TPL',
              caption: 'Tim pengembang bersama display web portal Alumni TPL di Sekolah Vokasi IPB.',
            },
          ],
        },
      ],
    },

    // 02: Dthanasha Kost (Februari 2026)
    {
      id: 'dthanasha-kost',
      tone: 'light',
      label: '02 / FRONT-END & SYSTEM DESIGN',
      title: 'Dthanasha Kost',
      tagline: 'Making boarding-house operations easier to navigate.',
      role: 'System Analyst & Front-End Developer',
      meta: 'ACADEMIC PROJECT · FEB — JUN 2026',
      description:
        'Designed the system architecture and user interface for automated billing, room availability, and financial reports. Connected operational requirements to a structured web application.',
      tags: ['Laravel', 'MySQL', 'Tailwind CSS'],
      evidence: [
        {
          title: 'Tim Pengembang Dthanasha Kost',
          caption: 'Dthanasha Kost / Tim pengembang aplikasi manajemen dan billing kos otomatis di kampus IPB.',
          images: [
            {
              src: '/images/work/kos/tim.jpg',
              alt: 'Tim Pengembang Dthanasha Kost',
              caption: 'Tim pengembang aplikasi manajemen dan billing otomatis Dthanasha Kost di kampus IPB.',
            },
          ],
        },
      ],
    },

    // 03: Cafier (Maret 2026)
    {
      id: 'cafier',
      tone: 'light',
      label: '03 / FULL-STACK DEVELOPMENT',
      title: 'Cafier',
      tagline: 'Connecting a mobile experience with the systems behind it.',
      role: 'Full-Stack Developer',
      meta: 'ACADEMIC PROJECT · MAR — MAY 2026',
      description:
        'Built an authenticated API, an administration interface, and a React Native mobile application with payment integration. Worked across backend, admin, mobile, and payment flows.',
      tags: ['Laravel 12', 'MongoDB', 'Sanctum', 'Midtrans PHP', 'React Native'],
      evidence: [
        {
          title: 'Add project screenshot',
          caption: 'Cafier / admin interface, mobile application, or authenticated API flow.',
          images: [],
          alt: '',
        },
      ],
    },

    // 04: canvAR (April 2026)
    {
      id: 'canvar',
      tone: 'light',
      label: '04 / ADDITIONAL EXPLORATION · AR',
      title: 'canvAR',
      tagline: 'An interactive way to explore the Business Model Canvas.',
      role: '3D Modeler & AR Developer',
      meta: 'ACADEMIC PROJECT · APR — MAY 2026',
      description:
        'Developed a 10-chapter BMC learning experience with progress tracking and AR marker scanning. Created 3D models and integrated them into the augmented reality workflow.',
      tags: ['Unity', 'Blender', 'Vuforia'],
      evidence: [
        {
          title: 'Add project screenshot',
          caption: 'canvAR / BMC curriculum, 3D model, or AR marker scanning experience.',
          images: [],
          alt: '',
        },
      ],
    },

    // 05: Ames Housing (Mei 2026) - Proyek terakhir dibuat
    {
      id: 'ames-housing',
      tone: 'light',
      label: '05 / DATA ANALYSIS',
      title: 'Ames Housing Price Prediction Analysis',
      tagline: 'Exploring the patterns behind housing prices.',
      role: 'Data Analyst',
      meta: 'ACADEMIC PROJECT · MAY — JUN 2026',
      description:
        'Preprocessed the Ames Housing dataset, performed EDA, visualized distributions, and examined feature correlations. Explored regression modeling, decision tree classification, and k-means clustering.',
      tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Google Colab'],
      evidence: [
        {
          title: 'Project Evidence & Visualizations',
          caption: 'Ames Housing / 5 Pilar Analisis Data: Exploratory Data Analysis, Korelasi Fitur, Regresi Linear, Klasifikasi Pohon Keputusan, dan Klastering PCA.',
          images: [
            // Slide 01: EDA & Distribusi Harga (Histogram)
            {
              src: '/images/work/ames/Screenshot 2026-11-03 211421.png',
              alt: '01. Distribusi Harga Penjualan Rumah di Ames (Histogram)',
              caption: '01. EDA & Distribusi: Pola sebaran harga right-skewed dengan konsentrasi transaksi pada rentang $130.000 hingga $200.000.',
              fit: 'contain',
            },
            // Slide 02: Korelasi Fitur / Faktor Penentu Harga (Pearson)
            {
              src: '/images/work/ames/Screenshot 2026-11-03 211456.png',
              alt: '02. Top 10 Faktor Terkuat Penentu Harga - Korelasi Pearson',
              caption: '02. Korelasi Fitur: Top 10 faktor penentu harga rumah teratas (Gr_Liv_Area, Garage_Cars, Garage_Area).',
              fit: 'contain',
            },
            // Slide 03: Evaluasi Model Regresi Linear (Scatter Plot)
            {
              src: '/images/work/ames/Screenshot 2026-11-03 211518.png',
              alt: '03. Harga Asli di Lapangan vs Harga Prediksi Model',
              caption: '03. Regresi Linear: Performa model prediksi harga properti (R² 81.94%, MAE $20.849) terhadap harga aktual.',
              fit: 'contain',
            },
            // Slide 04: Pohon Keputusan Klasifikasi (Decision Tree)
            {
              src: '/images/work/ames/Screenshot 2026-11-03 211528.png',
              alt: '04. Pohon Keputusan Pemilahan Kelas Rumah',
              caption: '04. Klasifikasi (Decision Tree): Logika percabangan pemilahan kelas harga rumah (Murah, Menengah, Mahal).',
              fit: 'contain',
            },
            // Slide 05: Klastering & Segmentasi Pasar (2D PCA)
            {
              src: '/images/work/ames/Screenshot 2026-11-03 211619.png',
              alt: '05. Peta Segmentasi Pasar Berdasarkan Label (PCA)',
              caption: '05. Klastering (PCA): Visualisasi 2D pemetaan segmentasi pasar menjadi 3 klaster profil properti.',
              fit: 'contain',
            },
          ],
        },
      ],
    },
  ],
  journeyInvitation: {
    title: 'There’s learning beyond these projects.',
    cta: 'EXPLORE MY PROFESSIONAL & ORGANIZATIONAL JOURNEY ↗',
    to: '/journey',
  },
};
