/**
 * Work page content supporting bilingual EN & ID translations.
 * Ordered in reverse-chronological order: latest created projects first (May 2026 -> Sep 2025).
 * Includes a dedicated On-Going Project section featuring 3 active projects: Medigo, Veriface, and Siren.
 */
export const workData = {
  en: {
    intro: {
      label: '02 / WORK · ACADEMIC PROJECTS · 2025—2026',
      headline: ['Questions into', 'working systems.'],
      description: 'Academic projects in front-end, full-stack, AR, and data analysis.',
    },
    note: {
      count: '05',
      lines: [
        'ACADEMIC PROJECTS (2025 → 2026)',
        'From foundational system design to full-stack, AR, and machine learning data analysis.',
      ],
    },
    ongoingSection: {
      badge: 'ON GOING PROJECTS',
      meta: '2026 · IN ACTIVE DEVELOPMENT',
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
    completedSection: {
      badge: 'COMPLETED PROJECTS',
      meta: '2025 — 2026 · 05 PROJECTS',
      title: 'Completed Academic Projects',
      subtitle: '',
    },
    projects: [
      // 01: Ames Housing (May 2026)
      {
        id: 'ames-housing',
        tone: 'light',
        label: '01 / DATA ANALYSIS',
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
            caption:
              'Ames Housing / 5 Data Analysis Pillars: Exploratory Data Analysis, Feature Correlations, Linear Regression, Decision Tree Classification, and PCA Clustering.',
            images: [
              {
                src: '/images/work/ames/Screenshot 2026-11-03 211421.png',
                alt: '01. Sale Price Distribution in Ames (Histogram)',
                caption:
                  '01. EDA & Distribution: Right-skewed sale price distribution with transaction concentration between $130,000 and $200,000.',
                fit: 'contain',
              },
              {
                src: '/images/work/ames/Screenshot 2026-11-03 211456.png',
                alt: '02. Top 10 Strongest Price Determinants - Pearson Correlation',
                caption:
                  '02. Feature Correlation: Top 10 key house price determinants (Gr_Liv_Area, Garage_Cars, Garage_Area).',
                fit: 'contain',
              },
              {
                src: '/images/work/ames/Screenshot 2026-11-03 211518.png',
                alt: '03. Actual Sale Price vs Predicted Price',
                caption:
                  '03. Linear Regression: Property price prediction model performance (R² 81.94%, MAE $20,849) against actual sales.',
                fit: 'contain',
              },
              {
                src: '/images/work/ames/Screenshot 2026-11-03 211528.png',
                alt: '04. Decision Tree Classification',
                caption:
                  '04. Classification (Decision Tree): Branching logic for categorizing price tiers (Low, Medium, High).',
                fit: 'contain',
              },
              {
                src: '/images/work/ames/Screenshot 2026-11-03 211619.png',
                alt: '05. Market Segmentation Map Based on Labels (PCA)',
                caption:
                  '05. Clustering (PCA): 2D visualization mapping market segmentation into 3 distinct property profile clusters.',
                fit: 'contain',
              },
            ],
          },
        ],
      },
      // 02: canvAR (Apr 2026)
      {
        id: 'canvar',
        tone: 'light',
        label: '02 / ADDITIONAL EXPLORATION · AR',
        title: 'canvAR',
        tagline: 'An interactive way to explore the Business Model Canvas.',
        role: '3D Modeler & AR Developer',
        meta: 'ACADEMIC PROJECT · APR — MAY 2026',
        description:
          'Developed a 10-chapter BMC learning experience with progress tracking and AR marker scanning. Created 3D models and integrated them into the augmented reality workflow.',
        tags: ['Unity', 'Blender', 'Vuforia'],
        evidence: [
          {
            title: 'Project Evidence',
            caption: 'canvAR / BMC curriculum, 3D model, and AR marker scanning experience.',
            images: [],
            alt: '',
          },
        ],
      },
      // 03: Cafier (Mar 2026)
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
            title: 'Project Evidence',
            caption: 'Cafier / admin interface, mobile application, and authenticated API flow.',
            images: [],
            alt: '',
          },
        ],
      },
      // 04: Dthanasha Kost (Feb 2026)
      {
        id: 'dthanasha-kost',
        tone: 'light',
        label: '04 / FRONT-END & SYSTEM DESIGN',
        title: 'Dthanasha Kost',
        tagline: 'Making boarding-house operations easier to navigate.',
        role: 'System Analyst & Front-End Developer',
        meta: 'ACADEMIC PROJECT · FEB — JUN 2026',
        description:
          'Designed the system architecture and user interface for automated billing, room availability, and financial reports. Connected operational requirements to a structured web application.',
        tags: ['Laravel', 'MySQL', 'Tailwind CSS'],
        evidence: [
          {
            title: 'Dthanasha Kost Development Team',
            caption: 'Dthanasha Kost / Development team presenting the automated boarding house billing app at IPB.',
            images: [
              {
                src: '/images/work/kos/tim.jpg',
                alt: 'Dthanasha Kost Development Team',
                caption: 'Development team presenting the automated boarding house billing app at IPB campus.',
              },
            ],
          },
        ],
      },
      // 05: Alumni Portal (Sep 2025)
      {
        id: 'alumni-portal',
        tone: 'light',
        longTitle: true,
        label: '05 / FRONT-END & SYSTEM DESIGN',
        title: 'Software Engineering Technology Alumni Information System and Tracer Study Portal',
        tagline: 'Organizing the connection between alumni and career data.',
        role: 'System Analyst & Front-End Developer',
        meta: 'ACADEMIC PROJECT · SEP — DEC 2025',
        description:
          'Designed MVC structure, UML, ERD, and wireframes for alumni career records and tracer studies. The portal includes data export and email notifications.',
        tags: ['Laravel', 'MySQL', 'Tailwind CSS'],
        evidence: [
          {
            title: 'Alumni Portal Development Team',
            caption: 'Alumni Portal / Development team in front of the Alumni TPL web display at SV IPB.',
            images: [
              {
                src: '/images/work/alumni tpl/tim.jpg',
                alt: 'Alumni Portal Development Team',
                caption: 'Development team in front of the Alumni TPL web display at SV IPB.',
              },
            ],
          },
        ],
      },
    ],
    journeyInvitation: {
      title: 'There’s learning beyond these projects.',
      action: {
        label: 'Explore my journey ↗',
        to: '/journey',
      },
    },
  },
  id: {
    intro: {
      label: '02 / PROYEK · PROYEK AKADEMIK · 2025—2026',
      headline: ['Dari pertanyaan,', 'menjadi sistem nyata.'],
      description: 'Proyek akademik dalam bidang front-end, full-stack, augmented reality, dan analisis data.',
    },
    note: {
      count: '05',
      lines: [
        'PROYEK AKADEMIK (2025 → 2026)',
        'Mulai dari perancangan arsitektur sistem dasar hingga aplikasi full-stack, AR, dan analisis data machine learning.',
      ],
    },
    ongoingSection: {
      badge: 'PROYEK SEDANG BERJALAN',
      meta: '2026 · TAHAP PENGEMBANGAN AKTIF',
      title: 'Sedang Dalam Pengerjaan',
      subtitle: 'Tiga proyek aktif yang sedang dalam tahap riset dan pengembangan berkelanjutan.',
      items: [
        {
          id: 'medigo',
          index: '01',
          title: 'Medigo',
          role: 'Analis Data',
          category: 'SISTEM KESEHATAN',
          tagline: 'Platform layanan kesehatan & medis modern.',
          description:
            'Platform kesehatan digital modern yang dirancang untuk mempermudah alur layanan medis dan akses pasien.',
          status: 'Sedang Berjalan',
          tags: ['Healthcare', 'Web Platform', 'System Design'],
        },
        {
          id: 'veriface',
          index: '02',
          title: 'Veriface',
          role: 'Analis Data',
          category: 'COMPUTER VISION & AI',
          tagline: 'Gateway identitas biometrik & verifikasi keaslian wajah (liveness).',
          description:
            'Pintu verifikasi biometrik dengan deteksi landmark wajah real-time dan pencegahan manipulasi identitas (anti-spoofing).',
          status: 'Sedang Berjalan',
          tags: ['Computer Vision', 'MediaPipe', 'Deep Learning'],
        },
        {
          id: 'siren',
          index: '03',
          title: 'Siren',
          role: 'Analis Data & Analis Sistem',
          category: 'PERINGATAN & MONITORING',
          tagline: 'Sistem tanggap darurat dan peringatan kilat.',
          description:
            'Sistem komunikasi dan peringatan tanggap darurat untuk pemantauan insiden dan notifikasi keselamatan instan.',
          status: 'Sedang Berjalan',
          tags: ['Emergency System', 'Real-time', 'Active Development'],
        },
      ],
    },
    completedSection: {
      badge: 'PROYEK SELESAI',
      meta: '2025 — 2026 · 05 PROYEK',
      title: 'Proyek Akademik Selesai',
      subtitle: '',
    },
    projects: [
      // 01: Ames Housing (Mei 2026)
      {
        id: 'ames-housing',
        tone: 'light',
        label: '01 / ANALISIS DATA',
        title: 'Analisis Prediksi Harga Properti Ames Housing',
        tagline: 'Menemukan pola di balik penentuan harga properti.',
        role: 'Analis Data',
        meta: 'PROYEK AKADEMIK · MEI — JUN 2026',
        description:
          'Melakukan preprocessing dataset Ames Housing, analisis data eksploratif (EDA), visualisasi sebaran data, serta analisis korelasi fitur. Mengeksplorasi pemodelan regresi linear, pohon keputusan, dan klastering PCA.',
        tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Google Colab'],
        evidence: [
          {
            title: 'Visualisasi & Dokumentasi Analisis Data',
            caption:
              'Ames Housing / 5 Pilar Analisis Data: Exploratory Data Analysis, Korelasi Fitur, Regresi Linear, Klasifikasi Pohon Keputusan, dan Klastering PCA.',
            images: [
              {
                src: '/images/work/ames/Screenshot 2026-11-03 211421.png',
                alt: '01. Distribusi Harga Penjualan Rumah di Ames (Histogram)',
                caption:
                  '01. EDA & Distribusi: Pola sebaran harga right-skewed dengan konsentrasi transaksi pada rentang $130.000 hingga $200.000.',
                fit: 'contain',
              },
              {
                src: '/images/work/ames/Screenshot 2026-11-03 211456.png',
                alt: '02. Top 10 Faktor Terkuat Penentu Harga - Korelasi Pearson',
                caption:
                  '02. Korelasi Fitur: Top 10 faktor penentu harga rumah teratas (Gr_Liv_Area, Garage_Cars, Garage_Area).',
                fit: 'contain',
              },
              {
                src: '/images/work/ames/Screenshot 2026-11-03 211518.png',
                alt: '03. Harga Asli di Lapangan vs Harga Prediksi Model',
                caption:
                  '03. Regresi Linear: Performa model prediksi harga properti (R² 81.94%, MAE $20.849) terhadap harga aktual.',
                fit: 'contain',
              },
              {
                src: '/images/work/ames/Screenshot 2026-11-03 211528.png',
                alt: '04. Pohon Keputusan Pemilahan Kelas Rumah',
                caption:
                  '04. Klasifikasi (Decision Tree): Logika percabangan pemilahan kelas harga rumah (Murah, Menengah, Mahal).',
                fit: 'contain',
              },
              {
                src: '/images/work/ames/Screenshot 2026-11-03 211619.png',
                alt: '05. Peta Segmentasi Pasar Berdasarkan Label (PCA)',
                caption:
                  '05. Klastering (PCA): Visualisasi 2D pemetaan segmentasi pasar menjadi 3 klaster profil properti.',
                fit: 'contain',
              },
            ],
          },
        ],
      },
      // 02: canvAR (Apr 2026)
      {
        id: 'canvar',
        tone: 'light',
        label: '02 / EKSPLORASI TAMBAHAN · AR',
        title: 'canvAR',
        tagline: 'Cara interaktif untuk mempelajari Business Model Canvas.',
        role: '3D Modeler & AR Developer',
        meta: 'PROYEK AKADEMIK · APR — MEI 2026',
        description:
          'Mengembangkan media pembelajaran BMC 10 bab lengkap dengan pelacakan progres belajar dan pemindaian marker AR. Membuat model 3D dan mengintegrasikannya ke alur augmented reality.',
        tags: ['Unity', 'Blender', 'Vuforia'],
        evidence: [
          {
            title: 'Dokumentasi Proyek',
            caption: 'canvAR / Kurikulum pembelajaran BMC, model 3D, dan pengalaman pemindaian marker AR.',
            images: [],
            alt: '',
          },
        ],
      },
      // 03: Cafier (Mar 2026)
      {
        id: 'cafier',
        tone: 'light',
        label: '03 / PENGEMBANGAN FULL-STACK',
        title: 'Cafier',
        tagline: 'Menghubungkan aplikasi mobile dengan sistem backend terintegrasi.',
        role: 'Pengembang Full-Stack',
        meta: 'PROYEK AKADEMIK · MAR — MEI 2026',
        description:
          'Membangun authenticated API, panel administrasi, dan aplikasi mobile React Native terintegrasi payment gateway Midtrans.',
        tags: ['Laravel 12', 'MongoDB', 'Sanctum', 'Midtrans PHP', 'React Native'],
        evidence: [
          {
            title: 'Dokumentasi Proyek',
            caption: 'Cafier / panel administrasi, aplikasi mobile, dan alur authenticated API.',
            images: [],
            alt: '',
          },
        ],
      },
      // 04: Dthanasha Kost (Feb 2026)
      {
        id: 'dthanasha-kost',
        tone: 'light',
        label: '04 / FRONT-END & DESAIN SISTEM',
        title: 'Dthanasha Kost',
        tagline: 'Mempermudah operasional dan pengelolaan rumah kos.',
        role: 'Analis Sistem & Pengembang Front-End',
        meta: 'PROYEK AKADEMIK · FEB — JUN 2026',
        description:
          'Merancang arsitektur sistem dan antarmuka web untuk penagihan otomatis, ketersediaan kamar, dan laporan keuangan kos.',
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
      // 05: Alumni Portal (Sep 2025)
      {
        id: 'alumni-portal',
        tone: 'light',
        longTitle: true,
        label: '05 / FRONT-END & DESAIN SISTEM',
        title: 'Sistem Informasi Alumni dan Portal Tracer Study Teknologi Rekayasa Perangkat Lunak',
        tagline: 'Menghubungkan alumni dan data rekam jejak karier secara terstruktur.',
        role: 'Analis Sistem & Pengembang Front-End',
        meta: 'PROYEK AKADEMIK · SEP — DES 2025',
        description:
          'Merancang struktur MVC, UML, ERD, dan wireframe untuk pencatatan karier alumni dan tracer study. Dilengkapi ekspor data dan notifikasi email.',
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
    ],
    journeyInvitation: {
      title: 'Ada banyak pembelajaran di luar proyek-proyek ini.',
      action: {
        label: 'Jelajahi perjalananku ↗',
        to: '/journey',
      },
    },
  },
};

export const getWorkContent = (lang = 'en') => workData[lang] || workData.en;
export const work = workData.en;
