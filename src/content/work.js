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
            { label: 'Platform', value: 'Web Portal' },
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
            // 01: Ames Housing (Jun 2026)
      {
        id: 'ames-housing',
        tone: 'light',
        num: '01',
        label: 'DATA MINING & PREDICTIVE ANALYTICS',
        title: 'Ames Housing: Property Valuation & Market Segmentation',
        tagline: 'Translating 2,930 residential property records into automated valuation models and precision marketing segments.',
        role: 'Data Analyst',
        meta: 'ACADEMIC PROJECT · SEMESTER 4 · JUN 2026',
        description:
          'Conducted a comprehensive academic data mining project on the Ames Housing dataset (2,930 properties, 81 attributes) for the Data Mining (Teknik Penambangan Data) coursework at IPB University under Osanna Patricia Limbong (NIM: J0403241049). Executed a rigorous four-pillar analytics cycle: Exploratory Data Analysis & skew profiling, continuous price prediction via Multiple Linear Regression, discrete price tiering via Decision Tree (rpart), and unsupervised market segmentation using K-Means clustering with feature standardization.',
        metrics: [
          { label: 'Linear Regression (R²)', value: '81.94%' },
          { label: 'Mean Abs Error (MAE)', value: '$20,849' },
          { label: 'Classification Acc.', value: '72.7%' },
          { label: 'Dataset Scale', value: '2,930 / 81 Vars' },
        ],
        highlights: [
          'Exploratory Data Analysis: Examined 2,930 observations across 81 features (35 numerical, 46 categorical, 0 missing values). The target Sale_Price exhibited a right-skewed distribution (Min $12,789, Median $160,000, Mean $180,796, Max $755,000, SD $79,886.69).',
          'Physical Dimension Trio: Correlation analysis proved property value is overwhelmingly determined by Above-Grade Living Area (Gr_Liv_Area), Basement Area (Total_Bsmt_SF), and Garage Capacity (Garage_Cars), complemented by Overall Material Quality (Overall_Qual).',
          'Continuous Predictive Modeling: Multiple Linear Regression trained on an 80/20 train-test split (2,344 / 586 properties) achieved R² = 81.94%, MAE = $20,849.18, and RMSE = $32,692.76, establishing a reliable automated property appraisal engine.',
          'Discrete Price Tiering (Decision Tree): Segmented target prices into balanced quantile classes (Low ≤ $139k, Mid $139k–$189k, High > $189k). Built an interpretable white-box rpart model with 72.7% accuracy, splitting primarily on Overall_Qual (≥ 6.5) and Year_Built (1982).',
          'Unsupervised Market Segmentation: Applied scale() Z-score standardization on numerical features and determined 3 optimal market clusters using the Elbow Method (WSS): Segmen Ekonomis (1,261 units), Segmen Premium (1,200 units), and Segmen Lahan Ekstrem (469 units).',
        ],
        tags: [
          'R Language',
          'RStudio',
          'AmesHousing Dataset',
          'Linear Regression',
          'rpart (Decision Tree)',
          'K-Means Clustering',
          'ggplot2',
          'Elbow Method (WSS)',
        ],
        hasGallery: true,
        galleryLabel: 'View Analysis Charts (5)',
        evidence: [
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211421.png',
            alt: 'Sale Price Distribution in Ames (Histogram)',
            caption:
              '01. EDA & Distribution: Positively skewed distribution of Sale_Price (Median $160k, Mean $180.8k, Max $755k) reflecting the pull of high-end luxury properties.',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211456.png',
            alt: 'Top 10 Strongest Price Determinants - Pearson Correlation',
            caption:
              '02. Feature Correlation: Unveiling the "Physical Dimension Trio" (Gr_Liv_Area, Total_Bsmt_SF, Garage_Cars/Area) alongside Overall_Qual as primary price determinants.',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211518.png',
            alt: 'Actual Sale Price vs Predicted Price',
            caption:
              '03. Linear Regression: Evaluation on 586 test samples showing solid predictive accuracy with R² = 81.94%, MAE = $20,849.18, and RMSE = $32,692.76.',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211528.png',
            alt: 'Decision Tree Classification',
            caption:
              '04. Classification (Decision Tree): Transparent white-box rpart tree achieving 72.7% accuracy across 3 price quantiles (Low ≤ $139k, Mid $139k–$189k, High > $189k).',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211619.png',
            alt: 'Market Segmentation Map Based on Labels (PCA)',
            caption:
              '05. Market Segmentation (K-Means & PCA): 3 distinct clusters (Segmen Ekonomis, Segmen Premium, Segmen Lahan Ekstrem) derived from standardized spatial features.',
            fit: 'contain',
          },
        ],
        caseStudy: {
          courseInfo: {
            course: 'Teknik Penambangan Data (Data Mining)',
            institution: 'Sekolah Vokasi IPB University — Software Engineering Technology',
            author: 'Osanna Patricia Limbong (NIM: J0403241049)',
            date: 'June 18, 2026',
            dataset: 'Ames Housing Dataset (Dean De Cock, Truman State University)',
            scope: '2,930 Properties · 81 Features (35 Numeric, 46 Categorical) · 0 Missing Values',
          },
          pillars: [
            {
              index: '01',
              title: 'Exploratory Data Analysis & Target Distribution',
              category: 'FOUNDATIONAL EDA',
              metricBadge: '2,930 Rows · 0 Nulls',
              summary:
                'Audited dataset completeness and characterized target variable behavior. With zero missing values, the dataset was immediately ready for ML modeling without imputation.',
              details: [
                'Sale_Price distribution is right-skewed with Min = $12,789, Median = $160,000, Mean = $180,796, Max = $755,000, and Standard Deviation = $79,886.69.',
                'The difference between mean and median highlights the upward pull of luxury outliers above $350k–$400k.',
                'Pearson correlation isolated the "Physical Dimension Trio" (Gr_Liv_Area, Total_Bsmt_SF, Garage_Cars) as dominant factors over purely cosmetic traits.',
              ],
            },
            {
              index: '02',
              title: 'Continuous Price Prediction (Linear Regression)',
              category: 'SUPERVISED REGRESSION',
              metricBadge: 'R² 81.94% · MAE $20,849',
              summary:
                'Built a multiple linear regression model to predict exact property valuation for real-world automated property appraisal platforms.',
              details: [
                'Data split into 80% train (2,344 properties) and 20% test (586 properties).',
                'Model achieved R² = 81.94% (0.8194) variance explanation on unseen test records.',
                'Mean Absolute Error (MAE) of $20,849.18 and Root Mean Squared Error (RMSE) of $32,692.76, proving strong consistency across mid-market housing.',
              ],
            },
            {
              index: '03',
              title: 'Discrete Price Tiering (Decision Tree / rpart)',
              category: 'SUPERVISED CLASSIFICATION',
              metricBadge: '72.7% Acc · 3 Quantiles',
              summary:
                'Constructed an interpretable white-box classification tree to auto-route property listings into budget, mid-range, and premium tiers.',
              details: [
                'Discretized target prices into 3 balanced quantiles: Murah (≤ $139,000), Menengah ($139,000–$189,000), and Mahal (> $189,000).',
                'Overall classification accuracy reached 72.7%, with high precision on extreme classes (Murah predicted correctly 154 times, Mahal 149 times).',
                'Root decision splits utilize Overall_Qual (threshold ≥ 6.5) and Year_Built (1982), creating transparent business rules that can be codified directly into database queries.',
              ],
            },
            {
              index: '04',
              title: 'Market Segmentation & Persona Profiling (K-Means)',
              category: 'UNSUPERVISED CLUSTERING',
              metricBadge: '3 Clusters · Elbow Method',
              summary:
                'Grouped properties by physical characteristics alone (excluding Sale_Price) using standardized Euclidean distance to generate actionable marketing segments.',
              details: [
                'All numeric variables standardized with scale() to prevent large-magnitude features (lot area) from dwarfing compact features (garage capacity).',
                'Segmen Ekonomis (1,261 homes): Avg lot 8,822 sqft, living 1,226 sqft, built 1946, quality score 5.04. Ideal for young professionals and first-time buyers.',
                'Segmen Premium (1,200 homes): Avg lot 9,622 sqft, living 1,527 sqft, built 1989, quality score 6.46. Ideal for established families and modern living.',
                'Segmen Lahan Ekstrem (469 homes): Avg lot 15,059 sqft, living 2,166 sqft, built 1996, quality score 8.02. Target for luxury investors and commercial developers.',
              ],
            },
          ],
          recommendations: [
            {
              index: '01',
              title: 'Renovation Priority (House Flipping Strategy)',
              takeaway:
                'Physical dimensions drive value more than cosmetic surface finishes. Renovations should prioritize expanding garage capacity, basement finishing, or living area extensions to exponentially boost resale profit margins.',
            },
            {
              index: '02',
              title: 'AI Automated Valuation Tool (AVM)',
              takeaway:
                'Deploy the Multiple Linear Regression model (R² 81.94%, MAE $20,849) as an instant interactive appraisal calculator on property portals to drive user engagement and fast listing estimates.',
            },
            {
              index: '03',
              title: 'Automated Catalog & Inventory Sorting',
              takeaway:
                'Embed the Decision Tree branching logic into backend databases to auto-categorize incoming listings into "Discount Catalog" or "Premium Showcase" within seconds, eliminating manual inspection delays.',
            },
            {
              index: '04',
              title: 'Sniper Marketing Strategy (Not Shotgun)',
              takeaway:
                'Replace costly mass marketing with hyper-targeted cluster campaigns: promote luxury lifestyle visuals to Segmen Premium, and down-payment subsidies / affordable mortgage plans to Segmen Ekonomis.',
            },
          ],
        },
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
            { label: 'Platform', value: 'Portal Web' },
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
            // 01: Ames Housing (Jun 2026)
      {
        id: 'ames-housing',
        tone: 'light',
        num: '01',
        label: 'DATA MINING & PREDICTIVE ANALYTICS',
        title: 'Analisis Prediksi Harga Properti & Segmentasi Pasar Ames Housing',
        tagline: 'Menerjemahkan 2.930 data properti residensial menjadi mesin taksir valuasi otomatis dan segmentasi pemasaran presisi.',
        role: 'Analis Data',
        meta: 'PROYEK AKADEMIK · SEMESTER 4 · JUN 2026',
        description:
          'Melaksanakan proyek data mining akademik komprehensif pada dataset Ames Housing (2.930 unit properti, 81 atribut) dalam mata kuliah Teknik Penambangan Data di Sekolah Vokasi IPB University oleh Osanna Patricia Limbong (NIM: J0403241049). Menjalankan siklus data mining 4 pilar lengkap: Analisis Distribusi & Skewness EDA, isolasi faktor penggerak valuasi ("Trio Dimensi Fisik"), prediksi harga kontinu via Regresi Linear Berganda, pemilahan kelas harga diskrit via Pohon Keputusan (rpart), serta segmentasi persona pasar tanpa supervisi via Klastering K-Means berstandarisasi.',
        metrics: [
          { label: 'Regresi Linear (R²)', value: '81.94%' },
          { label: 'Rata-rata Error (MAE)', value: '$20.849' },
          { label: 'Akurasi Decision Tree', value: '72.7%' },
          { label: 'Skala Dataset', value: '2.930 / 81 Kolom' },
        ],
        highlights: [
          'Exploratory Data Analysis (EDA): Membedah 2.930 observasi pada 81 fitur (35 numerik, 46 kategorik, 0 missing values). Variabel target Sale_Price berdistribusi right-skewed (Min $12.789, Median $160.000, Mean $180.796, Max $755.000, SD $79.886,69).',
          'Trio Dimensi Fisik: Matriks korelasi Pearson membuktikan valuasi properti dikendalikan Luas Hunian Atas (Gr_Liv_Area), Luas Basemen (Total_Bsmt_SF), dan Kapasitas Garasi (Garage_Cars), didukung skor kualitas material (Overall_Qual).',
          'Prediksi Harga Kontinu: Model Regresi Linear Berganda dilatih pada 80% train (2.344) dan diuji pada 20% test (586), mencatatkan performa R² = 81.94%, MAE = $20.849,18, dan RMSE = $32.692,76 sebagai fondasi penaksir valuasi otomatis.',
          'Pemilahan Kelas Harga (Decision Tree): Mengelompokkan target harga ke 3 kelas kuantil berimbang (Murah ≤ $139k, Menengah $139k–$189k, Mahal > $189k). Model rpart white-box meraih akurasi 72.7% dengan cabang utama pada Overall_Qual (≥ 6.5) dan Year_Built (1982).',
          'Segmentasi Pasar (Klastering K-Means): Menstandarisasi variabel numerik via scale() dan menetapkan 3 klaster optimal melalui Elbow Method (WSS): Segmen Ekonomis (1.261 unit), Segmen Premium (1.200 unit), dan Segmen Lahan Ekstrem (469 unit).',
        ],
        tags: [
          'R Language',
          'RStudio',
          'AmesHousing Dataset',
          'Linear Regression',
          'rpart (Decision Tree)',
          'K-Means Clustering',
          'ggplot2',
          'Elbow Method (WSS)',
        ],
        hasGallery: true,
        galleryLabel: 'Lihat Grafik Analisis (5)',
        evidence: [
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211421.png',
            alt: 'Distribusi Harga Penjualan Rumah di Ames (Histogram)',
            caption:
              '01. EDA & Distribusi: Pola sebaran harga Sale_Price right-skewed (Median $160.000, Rata-rata $180.796, Tertinggi $755.000) yang ditarik oleh segelintir rumah mewah.',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211456.png',
            alt: 'Top 10 Faktor Terkuat Penentu Harga - Korelasi Pearson',
            caption:
              '02. Korelasi Fitur: Menemukan "Trio Dimensi Fisik" (Gr_Liv_Area, Total_Bsmt_SF, Garage_Cars/Area) bersama Overall_Qual sebagai penentu valuasi terkuat.',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211518.png',
            alt: 'Harga Asli di Lapangan vs Harga Prediksi Model',
            caption:
              '03. Regresi Linear: Evaluasi pada 586 data uji menunjukkan akurasi solid dengan R² = 81.94%, MAE = $20.849,18, dan RMSE = $32.692,76.',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211528.png',
            alt: 'Pohon Keputusan Pemilahan Kelas Rumah',
            caption:
              '04. Klasifikasi (Decision Tree): Pohon rpart white-box transparan dengan akurasi 72.7% membagi 3 kuantil harga (Murah ≤ $139k, Menengah $139k–$189k, Mahal > $189k).',
            fit: 'contain',
          },
          {
            src: '/images/work/ames/Screenshot 2026-11-03 211619.png',
            alt: 'Peta Segmentasi Pasar Berdasarkan Label (PCA)',
            caption:
              '05. Segmentasi Pasar (K-Means & PCA): 3 segmen pasar terpisah (Segmen Ekonomis, Segmen Premium, Segmen Lahan Ekstrem) dari fitur fisik terstandarisasi.',
            fit: 'contain',
          },
        ],
        caseStudy: {
          courseInfo: {
            course: 'Teknik Penambangan Data (Data Mining)',
            institution: 'Sekolah Vokasi IPB University — Teknologi Rekayasa Perangkat Lunak',
            author: 'Osanna Patricia Limbong (NIM: J0403241049)',
            date: '18 Juni 2026',
            dataset: 'Ames Housing Dataset (Dean De Cock, Truman State University)',
            scope: '2.930 Rumah · 81 Variabel (35 Numerik, 46 Kategorik) · 0 Missing Value',
          },
          pillars: [
            {
              index: '01',
              title: 'Exploratory Data Analysis & Karakteristik Distribusi',
              category: 'EDA DASAR',
              metricBadge: '2.930 Baris · 0 Data Kosong',
              summary:
                'Memvalidasi kelengkapan data dan membedah perilaku variabel target harga jual rumah. Tanpa adanya missing values, dataset siap diproses langsung ke algoritma ML.',
              details: [
                'Distribusi Sale_Price bersifat right-skewed dengan Nilai Minimum = $12.789, Median = $160.000, Rata-rata = $180.796, Maksimum = $755.000, dan Standar Deviasi = $79.886,69.',
                'Selisih nilai rata-rata yang lebih tinggi dibanding median mengindikasikan efek tarikan rumah-rumah mewah di atas $350k–$400k.',
                'Korelasi Pearson membuktikan "Trio Dimensi Fisik" (Gr_Liv_Area, Total_Bsmt_SF, Garage_Cars) mendominasi nilai jual dibandingkan sekadar faktor kosmetik permukaan.',
              ],
            },
            {
              index: '02',
              title: 'Prediksi Harga Kontinu (Regresi Linear Berganda)',
              category: 'REGRESI SUPERVISED',
              metricBadge: 'R² 81.94% · MAE $20.849',
              summary:
                'Membangun model regresi linear berganda untuk memprediksi angka pasti harga jual rumah sebagai penaksir valuasi otomatis di platform properti.',
              details: [
                'Data dibagi secara acak menjadi 80% data latih (2.344 rumah) dan 20% data uji (586 rumah).',
                'Model mencatatkan R² = 81.94% (0.8194) pada data uji yang belum pernah dilihat sebelumnya.',
                'Mean Absolute Error (MAE) sebesar $20.849,18 dan RMSE sebesar $32.692,76, membuktikan konsistensi prediksi yang stabil untuk hunian kelas umum.',
              ],
            },
            {
              index: '03',
              title: 'Pemilahan Kelas Harga (Pohon Keputusan / rpart)',
              category: 'KLASIFIKASI SUPERVISED',
              metricBadge: 'Akurasi 72.7% · 3 Kuantil',
              summary:
                'Menyusun model klasifikasi pohon keputusan (white-box) untuk menyortir listing baru secara otomatis ke dalam etalase diskon, reguler, atau premium.',
              details: [
                'Harga dibagi menjadi 3 kelas kuantil berimbang: Murah (≤ $139.000), Menengah ($139.000–$189.000), dan Mahal (> $189.000).',
                'Akurasi klasifikasi keseluruhan mencapai 72.7%, dengan keakuratan sangat tinggi pada kelas ekstrem (Murah tepat 154 kali, Mahal tepat 149 kali).',
                'Titik percabangan utama memanfaatkan Overall_Qual (threshold ≥ 6.5) dan Year_Built (1982), menghasilkan aturan if-then yang transparan dan dapat ditanamkan ke database.',
              ],
            },
            {
              index: '04',
              title: 'Segmentasi Pasar & Pelabelan Profil (K-Means)',
              category: 'KLASTERING UNSUPERVISED',
              metricBadge: '3 Klaster · Elbow Method',
              summary:
                'Mengelompokkan data berdasarkan karakteristik fisik properti tanpa melibatkan variabel harga untuk menyusun target pasar marketing.',
              details: [
                'Seluruh variabel numerik distandarisasi menggunakan scale() untuk mencegah variabel luas tanah mendominasi perhitungan jarak Euclidean.',
                'Segmen Ekonomis (1.261 unit): Rata-rata tanah 8.822 sqft, hunian 1.226 sqft, dibangun 1946, skor kualitas 5.04. Sangat cocok untuk pekerja muda dan first-time buyers.',
                'Segmen Premium (1.200 unit): Rata-rata tanah 9.622 sqft, hunian 1.527 sqft, dibangun 1989, skor kualitas 6.46. Target keluarga mapan dan gaya hidup modern.',
                'Segmen Lahan Ekstrem (469 unit): Rata-rata tanah 15.059 sqft, hunian 2.166 sqft, dibangun 1996, skor kualitas 8.02. Diincar pengembang properti dan investor mewah.',
              ],
            },
          ],
          recommendations: [
            {
              index: '01',
              title: 'Prioritas Renovasi (Strategi House Flipping)',
              takeaway:
                'Dimensi fisik properti mendikte valuasi jauh lebih besar daripada cat kosmetik. Renovasi sebaiknya difokuskan pada perombakan garasi, renovasi basemen, atau perluasan ruang keluarga untuk mendongkrak marjin keuntungan secara eksponensial.',
            },
            {
              index: '02',
              title: 'Kalkulator Valuasi AI (Automated Appraisal Engine)',
              takeaway:
                'Tanamkan model Regresi Linear (R² 81.94%, MAE $20.849) sebagai alat penaksir harga instan di website properti perusahaan guna meningkatkan keterlibatan calon pembeli dan penjual.',
            },
            {
              index: '03',
              title: 'Otomasi Sortir Inventori Katalog Listing',
              takeaway:
                'Integrasikan logika percabangan Decision Tree ke database listing baru agar sistem secara instan mengarahkan properti ke "Etalase Diskon" atau "Etalase Premium" tanpa pemeriksaan manual.',
            },
            {
              index: '04',
              title: 'Strategi Pemasaran Sniper (Bukan Mass-Marketing)',
              takeaway:
                'Gantikan kampanye massal yang boros biaya dengan iklan tertarget berdasarkan persona klaster: sajikan visual lifestyle mewah untuk Segmen Premium, dan tawarkan promo subsidi DP/KPR untuk Segmen Ekonomis.',
            },
          ],
        },
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
