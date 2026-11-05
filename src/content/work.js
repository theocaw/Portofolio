/**
 * Work page content supporting bilingual EN & ID translations.
 * Creative layout designed to stand strong on its own without needing photos.
 * Ordered in reverse-chronological order: latest created projects first (May 2026 -> Sep 2025).
 * Includes 3 active On-Going Projects and 5 Completed Academic Projects.
 */
export const workData = {
  en: {
    intro: {
      label: '02 / WORK · ACADEMIC PROJECTS · 2025—2026',
      headline: ['Questions into', 'working systems.'],
      description:
        'A collection of academic and exploratory projects spanning data analytics, machine learning, augmented reality, and full-stack software development.',
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
            'A modern digital healthcare platform designed to streamline medical service flows, appointment bookings, and patient health record access.',
          status: 'In Progress',
          metrics: [
            { label: 'Domain', value: 'Healthcare' },
            { label: 'Role', value: 'Data Analytics' },
            { label: 'Status', value: 'Active R&D' },
          ],
          tags: ['Healthcare', 'Web Platform', 'System Design', 'Data Flow'],
        },
        {
          id: 'veriface',
          index: '02',
          title: 'Veriface',
          role: 'Data Analyst',
          category: 'COMPUTER VISION & AI',
          tagline: 'Biometric identity gateway & 3D liveness verification.',
          description:
            'Biometric pre-screening gateway with real-time facial landmark detection, spoof-attack prevention, and high-precision identity verification.',
          status: 'In Progress',
          metrics: [
            { label: 'Core AI', value: 'MediaPipe CV' },
            { label: 'Technique', value: 'Liveness Check' },
            { label: 'Latency', value: '< 150ms' },
          ],
          tags: ['Computer Vision', 'MediaPipe', 'Deep Learning', 'Facial Landmarks'],
        },
        {
          id: 'siren',
          index: '03',
          title: 'Siren',
          role: 'Data Analyst & System Analyst',
          category: 'ALERT & MONITORING',
          tagline: 'Emergency response and rapid alert system.',
          description:
            'Rapid emergency alert and communication system for instant safety notifications, geographic incident mapping, and emergency dispatch.',
          status: 'In Progress',
          metrics: [
            { label: 'Architecture', value: 'Event-Driven' },
            { label: 'Dispatch', value: 'Real-Time' },
            { label: 'Focus', value: 'Safety Alert' },
          ],
          tags: ['Emergency System', 'Real-time', 'Active Development', 'Incident Dispatch'],
        },
      ],
    },
    completedSection: {
      badge: 'COMPLETED PROJECTS',
      meta: '2025 — 2026 · 05 PROJECTS',
      title: 'Completed Academic Projects',
      subtitle: 'In-depth case studies showcasing problem framing, data modeling, and end-to-end implementation.',
    },
    projects: [
      // 01: Ames Housing (May 2026)
      {
        id: 'ames-housing',
        tone: 'light',
        num: '01',
        label: 'DATA ANALYSIS & MACHINE LEARNING',
        title: 'Ames Housing Price Prediction Analysis',
        tagline: 'Uncovering the mathematical patterns behind residential property valuation.',
        role: 'Data Analyst',
        meta: 'ACADEMIC PROJECT · MAY — JUN 2026',
        description:
          'Conducted comprehensive end-to-end data science on the Ames Housing dataset. Cleaned and preprocessed 2,930 property records, analyzed distribution skews, built multivariate correlation models, and developed predictive machine learning pipelines.',
        metrics: [
          { label: 'Model Accuracy (R²)', value: '81.94%' },
          { label: 'Mean Abs Error', value: '$20,849' },
          { label: 'Dataset Size', value: '2,930 Records' },
          { label: 'Key Feature', value: 'Gr_Liv_Area' },
        ],
        highlights: [
          'Preprocessed 80+ property attributes, handling missing values and log-transforming skewed price distributions.',
          'Built Pearson correlation matrices isolating top property price determinants (living area, overall quality, garage capacity).',
          'Trained and evaluated Linear Regression, Decision Tree classification (Low/Mid/High tiering), and 2D PCA market segmentation.',
        ],
        tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Google Colab', 'Scikit-Learn', 'PCA Clustering'],
        hasGallery: true,
        galleryLabel: 'View Analysis Charts (5)',
        evidence: [
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211421.png',
            alt: 'Sale Price Distribution in Ames (Histogram)',
            caption: '01. EDA & Distribution: Right-skewed sale price distribution with transaction concentration between $130,000 and $200,000.',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211456.png',
            alt: 'Top 10 Strongest Price Determinants - Pearson Correlation',
            caption: '02. Feature Correlation: Top 10 key house price determinants (Gr_Liv_Area, Garage_Cars, Garage_Area).',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211518.png',
            alt: 'Actual Sale Price vs Predicted Price',
            caption: '03. Linear Regression: Property price prediction model performance (R² 81.94%, MAE $20,849) against actual sales.',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211528.png',
            alt: 'Decision Tree Classification',
            caption: '04. Classification (Decision Tree): Branching logic for categorizing price tiers (Low, Medium, High).',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211619.png',
            alt: 'Market Segmentation Map Based on Labels (PCA)',
            caption: '05. Clustering (PCA): 2D visualization mapping market segmentation into 3 distinct property profile clusters.',
            fit: 'contain',
          },
        ],
      },
      // 02: canvAR (Apr 2026)
      {
        id: 'canvar',
        tone: 'light',
        num: '02',
        label: 'AUGMENTED REALITY & 3D MODELING',
        title: 'canvAR',
        tagline: 'Transforming abstract business education into an interactive spatial 3D experience.',
        role: '3D Modeler & AR Developer',
        meta: 'ACADEMIC PROJECT · APR — MAY 2026',
        description:
          'Created an augmented reality educational tool designed to help students master the Business Model Canvas (BMC). Combines real-time camera marker recognition with 3D models and an interactive chapter progress tracker.',
        metrics: [
          { label: 'Curriculum', value: '10 Chapters' },
          { label: 'Technology', value: 'Vuforia AR' },
          { label: '3D Pipeline', value: 'Blender Custom' },
          { label: 'Target', value: 'Marker Track' },
        ],
        highlights: [
          'Modeled, textured, and optimized lightweight 3D assets in Blender for seamless mobile GPU rendering.',
          'Engineered Vuforia marker tracking pipeline in Unity with zero-jitter spatial placement.',
          'Built 10 progressive learning modules with persistent state saving and interactive canvas quizzes.',
        ],
        tags: ['Unity', 'Blender', 'Vuforia', 'C#', '3D Modeling', 'Augmented Reality'],
        hasGallery: false,
      },
      // 03: Cafier (Mar 2026)
      {
        id: 'cafier',
        tone: 'light',
        num: '03',
        label: 'FULL-STACK & MOBILE APPLICATION',
        title: 'Cafier',
        tagline: 'A seamless mobile cafe ordering experience backed by a resilient API architecture.',
        role: 'Full-Stack Developer',
        meta: 'ACADEMIC PROJECT · MAR — MAY 2026',
        description:
          'Engineered a full-stack food & beverage ordering ecosystem. Features a responsive React Native mobile app for customers, a Laravel 12 administrative portal for kitchen staff, and Midtrans payment gateway integration.',
        metrics: [
          { label: 'Architecture', value: 'Client-API' },
          { label: 'Security', value: 'Sanctum JWT' },
          { label: 'Database', value: 'MongoDB' },
          { label: 'Payment', value: 'Midtrans' },
        ],
        highlights: [
          'Developed reactive mobile ordering interface in React Native with real-time cart and order state tracking.',
          'Built secure authenticated RESTful API with Laravel 12 Sanctum and MongoDB document storage.',
          'Implemented end-to-end Midtrans payment gateway with automated server-to-server webhook order updates.',
        ],
        tags: ['Laravel 12', 'MongoDB', 'Sanctum', 'Midtrans PHP', 'React Native', 'RESTful API'],
        hasGallery: false,
      },
      // 04: Dthanasha Kost (Feb 2026)
      {
        id: 'dthanasha-kost',
        tone: 'light',
        num: '04',
        label: 'FRONT-END & SYSTEM DESIGN',
        title: 'Dthanasha Kost',
        tagline: 'Automating boarding-house operations from room availability to monthly billing.',
        role: 'System Analyst & Front-End Developer',
        meta: 'ACADEMIC PROJECT · FEB — JUN 2026',
        description:
          'Designed the system architecture and responsive web application for managing Dthanasha Kost. Replaced manual spreadsheet management with automated invoice generation, room availability mapping, and financial statements.',
        metrics: [
          { label: 'Operations', value: 'Automated' },
          { label: 'Inventory', value: 'Room Map' },
          { label: 'Reports', value: 'Cashflow Export' },
          { label: 'Pattern', value: 'MVC Design' },
        ],
        highlights: [
          'Authored formal UML class diagrams, activity workflows, and normalized relational ERD schemas.',
          'Engineered recurring billing engine with automated calculation of utility add-ons and payment logging.',
          'Built clean, accessible management dashboard using Laravel and Tailwind CSS for rapid operational overview.',
        ],
        tags: ['Laravel', 'MySQL', 'Tailwind CSS', 'UML Modeling', 'ERD', 'System Architecture'],
        hasGallery: false,
      },
      // 05: Alumni Portal (Sep 2025)
      {
        id: 'alumni-portal',
        tone: 'light',
        num: '05',
        longTitle: true,
        label: 'SYSTEM ANALYST & FRONT-END',
        title: 'Software Engineering Technology Alumni Information System and Tracer Study Portal',
        tagline: 'Bridging alumni networks and institutional career tracking into one cohesive platform.',
        role: 'System Analyst & Front-End Developer',
        meta: 'ACADEMIC PROJECT · SEP — DEC 2025',
        description:
          'Designed and developed the official Alumni Portal for the Software Engineering Technology program at IPB University. Streamlines tracer studies, career milestones tracking, and institutional accreditation reporting.',
        metrics: [
          { label: 'Target', value: 'Alumni Network' },
          { label: 'Module', value: 'Tracer Study' },
          { label: 'Data', value: 'Export Engine' },
          { label: 'Notifications', value: 'Automated' },
        ],
        highlights: [
          'Constructed complete MVC application structure, database schema, and wireframes for alumni records.',
          'Engineered customized Tracer Study survey engine supporting variable question sets and data export.',
          'Implemented automated email reminders and role-based access control for administrators and alumni.',
        ],
        tags: ['Laravel', 'MySQL', 'Tailwind CSS', 'Tracer Study', 'Wireframing', 'Data Export'],
        hasGallery: false,
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
      description:
        'Koleksi proyek akademik dan eksplorasi teknis yang mencakup analisis data, machine learning, augmented reality, dan pengembangan perangkat lunak full-stack.',
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
            'Platform kesehatan digital modern yang dirancang untuk mempermudah alur layanan medis, penjadwalan konsultasi, dan akses rekam medis pasien.',
          status: 'Sedang Berjalan',
          metrics: [
            { label: 'Bidang', value: 'Layanan Medis' },
            { label: 'Peran', value: 'Analisis Data' },
            { label: 'Status', value: 'R&D Aktif' },
          ],
          tags: ['Healthcare', 'Web Platform', 'System Design', 'Alur Data'],
        },
        {
          id: 'veriface',
          index: '02',
          title: 'Veriface',
          role: 'Analis Data',
          category: 'COMPUTER VISION & AI',
          tagline: 'Gateway identitas biometrik & verifikasi keaslian wajah (liveness).',
          description:
            'Pintu verifikasi biometrik dengan deteksi landmark wajah real-time, pencegahan manipulasi identitas (anti-spoofing), dan presisi tinggi.',
          status: 'Sedang Berjalan',
          metrics: [
            { label: 'AI Inti', value: 'MediaPipe CV' },
            { label: 'Metode', value: 'Liveness Check' },
            { label: 'Latensi', value: '< 150ms' },
          ],
          tags: ['Computer Vision', 'MediaPipe', 'Deep Learning', 'Facial Landmarks'],
        },
        {
          id: 'siren',
          index: '03',
          title: 'Siren',
          role: 'Analis Data & Analis Sistem',
          category: 'PERINGATAN & MONITORING',
          tagline: 'Sistem tanggap darurat dan peringatan kilat.',
          description:
            'Sistem komunikasi dan peringatan tanggap darurat untuk pemantauan insiden kilat, pemetaan wilayah darurat, dan koordinasi evakuasi.',
          status: 'Sedang Berjalan',
          metrics: [
            { label: 'Arsitektur', value: 'Event-Driven' },
            { label: 'Respons', value: 'Real-Time' },
            { label: 'Fokus', value: 'Tanggap Darurat' },
          ],
          tags: ['Emergency System', 'Real-time', 'Active Development', 'Dispatch Insiden'],
        },
      ],
    },
    completedSection: {
      badge: 'PROYEK SELESAI',
      meta: '2025 — 2026 · 05 PROYEK',
      title: 'Proyek Akademik Selesai',
      subtitle: 'Studi kasus mendalam yang memperlihatkan pemahaman masalah, pemodelan data, hingga implementasi sistem utuh.',
    },
    projects: [
      // 01: Ames Housing (Mei 2026)
      {
        id: 'ames-housing',
        tone: 'light',
        num: '01',
        label: 'ANALISIS DATA & MACHINE LEARNING',
        title: 'Analisis Prediksi Harga Properti Ames Housing',
        tagline: 'Menemukan pola matematis di balik penentuan nilai harga properti residensial.',
        role: 'Analis Data',
        meta: 'PROYEK AKADEMIK · MEI — JUN 2026',
        description:
          'Melakukan riset data science menyeluruh pada dataset properti Ames Housing. Melakukan pembersihan data pada 2.930 transaksi, analisis distribusi skewness, matriks korelasi multivariat, dan pembuatan pipeline machine learning prediktif.',
        metrics: [
          { label: 'Akurasi Model (R²)', value: '81.94%' },
          { label: 'Rata-rata Error', value: '$20.849' },
          { label: 'Jumlah Baris Data', value: '2.930 Rumah' },
          { label: 'Faktor Terkuat', value: 'Gr_Liv_Area' },
        ],
        highlights: [
          'Melakukan preprocessing 80+ fitur properti, mengatasi missing values, dan mentransformasi distribusi harga right-skewed.',
          'Membangun matriks korelasi Pearson yang mengisolasi 10 faktor utama penentu harga (luas bangunan, kualitas fisik, garasi).',
          'Melatih dan menguji regresi linear, klasifikasi pohon keputusan (kategori Rendah/Menengah/Tinggi), dan segmentasi pasar 2D PCA.',
        ],
        tags: ['Python', 'Pandas', 'Matplotlib', 'Seaborn', 'Google Colab', 'Scikit-Learn', 'PCA Clustering'],
        hasGallery: true,
        galleryLabel: 'Lihat Grafik Analisis (5)',
        evidence: [
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211421.png',
            alt: 'Distribusi Harga Penjualan Rumah di Ames (Histogram)',
            caption: '01. EDA & Distribusi: Pola sebaran harga right-skewed dengan konsentrasi transaksi pada rentang $130.000 hingga $200.000.',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211456.png',
            alt: 'Top 10 Faktor Terkuat Penentu Harga - Korelasi Pearson',
            caption: '02. Korelasi Fitur: Top 10 faktor penentu harga rumah teratas (Gr_Liv_Area, Garage_Cars, Garage_Area).',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211518.png',
            alt: 'Harga Asli di Lapangan vs Harga Prediksi Model',
            caption: '03. Regresi Linear: Performa model prediksi harga properti (R² 81.94%, MAE $20.849) terhadap harga aktual.',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211528.png',
            alt: 'Pohon Keputusan Pemilahan Kelas Rumah',
            caption: '04. Klasifikasi (Decision Tree): Logika percabangan pemilahan kelas harga rumah (Murah, Menengah, Mahal).',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211619.png',
            alt: 'Peta Segmentasi Pasar Berdasarkan Label (PCA)',
            caption: '05. Klastering (PCA): Visualisasi 2D pemetaan segmentasi pasar menjadi 3 klaster profil properti.',
            fit: 'contain',
          },
        ],
      },
      // 02: canvAR (Apr 2026)
      {
        id: 'canvar',
        tone: 'light',
        num: '02',
        label: 'AUGMENTED REALITY & PEMODELAN 3D',
        title: 'canvAR',
        tagline: 'Mengubah konsep bisnis teoretis menjadi media pembelajaran spasial 3D interaktif.',
        role: '3D Modeler & AR Developer',
        meta: 'PROYEK AKADEMIK · APR — MEI 2026',
        description:
          'Mengembangkan media pembelajaran augmented reality untuk membantu mahasiswa memahami Business Model Canvas (BMC). Menggabungkan pelacakan marker kamera real-time dengan objek 3D dan pelacak progres belajar.',
        metrics: [
          { label: 'Materi Belajar', value: '10 Bab BMC' },
          { label: 'Teknologi AR', value: 'Vuforia Engine' },
          { label: 'Pemodelan 3D', value: 'Blender Custom' },
          { label: 'Metode Target', value: 'Marker Tracking' },
        ],
        highlights: [
          'Membuat, memberi tekstur, dan mengoptimalkan aset 3D mandiri di Blender agar ringan dijalankan di GPU mobile.',
          'Mengimplementasikan pipeline penjejakan marker Vuforia di Unity dengan peletakan objek spasial yang stabil tanpa jitter.',
          'Membangun sistem pembelajaran 10 modul dengan penyimpanan progres dan kuis interaktif.',
        ],
        tags: ['Unity', 'Blender', 'Vuforia', 'C#', '3D Modeling', 'Augmented Reality'],
        hasGallery: false,
      },
      // 03: Cafier (Mar 2026)
      {
        id: 'cafier',
        tone: 'light',
        num: '03',
        label: 'PENGEMBANGAN FULL-STACK & MOBILE APP',
        title: 'Cafier',
        tagline: 'Pengalaman pemesanan kafe modern yang terhubung langsung dengan arsitektur backend.',
        role: 'Pengembang Full-Stack',
        meta: 'PROYEK AKADEMIK · MAR — MEI 2026',
        description:
          'Membangun ekosistem pemesanan makanan & minuman terpadu. Terdiri dari aplikasi mobile React Native untuk pelanggan, panel admin web Laravel 12 untuk staf kafe, dan integrasi payment gateway Midtrans.',
        metrics: [
          { label: 'Arsitektur', value: 'Client-API' },
          { label: 'Keamanan', value: 'Sanctum JWT' },
          { label: 'Basis Data', value: 'MongoDB' },
          { label: 'Pembayaran', value: 'Midtrans' },
        ],
        highlights: [
          'Mengembangkan antarmuka pemesanan responsif di React Native dengan manajemen state keranjang belanja real-time.',
          'Membangun RESTful API terotentikasi berkinerja tinggi dengan Laravel 12 Sanctum dan penyimpanan dokumen MongoDB.',
          'Mengintegrasikan payment gateway Midtrans end-to-end lengkap dengan penanganan webhook status transaksi otomatis.',
        ],
        tags: ['Laravel 12', 'MongoDB', 'Sanctum', 'Midtrans PHP', 'React Native', 'RESTful API'],
        hasGallery: false,
      },
      // 04: Dthanasha Kost (Feb 2026)
      {
        id: 'dthanasha-kost',
        tone: 'light',
        num: '04',
        label: 'FRONT-END & DESAIN SISTEM',
        title: 'Dthanasha Kost',
        tagline: 'Otomatisasi operasional rumah kos dari penagihan sewa hingga peta ketersediaan kamar.',
        role: 'Analis Sistem & Pengembang Front-End',
        meta: 'PROYEK AKADEMIK · FEB — JUN 2026',
        description:
          'Merancang arsitektur sistem dan aplikasi web manajemen kos Dthanasha. Menggantikan pencatatan buku manual dengan pembuatan tagihan otomatis, visualisasi ketersediaan kamar, dan laporan keuangan komprehensif.',
        metrics: [
          { label: 'Operasional', value: 'Otomatis' },
          { label: 'Inventaris', value: 'Peta Kamar' },
          { label: 'Laporan', value: 'Ekspor Keuangan' },
          { label: 'Pola Desain', value: 'Arsitektur MVC' },
        ],
        highlights: [
          'Menyusun dokumen analisis kebutuhan sistem formal, diagram alur kelas UML, dan skema basis data relasional ERD.',
          'Mengembangkan modul penagihan sewa periodik otomatis lengkap dengan rekapitulasi biaya tambahan fasilitas.',
          'Membangun dashboard operasional yang bersih dan intuitif menggunakan Laravel dan Tailwind CSS.',
        ],
        tags: ['Laravel', 'MySQL', 'Tailwind CSS', 'UML Modeling', 'ERD', 'System Architecture'],
        hasGallery: false,
      },
      // 05: Alumni Portal (Sep 2025)
      {
        id: 'alumni-portal',
        tone: 'light',
        num: '05',
        longTitle: true,
        label: 'ANALIS SISTEM & PENGEMBANG FRONT-END',
        title: 'Sistem Informasi Alumni dan Portal Tracer Study Teknologi Rekayasa Perangkat Lunak',
        tagline: 'Menghubungkan jejaring alumni dan pelacakan rekam jejak karier dalam satu ekosistem terpadu.',
        role: 'Analis Sistem & Pengembang Front-End',
        meta: 'PROYEK AKADEMIK · SEP — DES 2025',
        description:
          'Merancang dan mengembangkan portal resmi alumni untuk Program Studi Teknologi Rekayasa Perangkat Lunak IPB University. Memfasilitasi tracer study berkala, pencatatan karier alumni, dan pelaporan akreditasi institusi.',
        metrics: [
          { label: 'Pengguna', value: 'Jejaring Alumni' },
          { label: 'Kuesioner', value: 'Tracer Study' },
          { label: 'Laporan', value: 'Mesin Ekspor Data' },
          { label: 'Notifikasi', value: 'Email Otomatis' },
        ],
        highlights: [
          'Merancang struktur arsitektur MVC utuh, skema normalisasi database, dan wireframe tampilan aplikasi web.',
          'Membangun modul kuesioner Tracer Study terstandarisasi yang mendukung beragam jenis pertanyaan dan ekspor spreadsheet.',
          'Mengimplementasikan pengiriman email notifikasi otomatis dan kontrol akses berbasis hak peran (RBAC).',
        ],
        tags: ['Laravel', 'MySQL', 'Tailwind CSS', 'Tracer Study', 'Wireframing', 'Data Export'],
        hasGallery: false,
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
