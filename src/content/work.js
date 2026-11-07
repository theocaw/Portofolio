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
        label: 'SYSTEM ARCHITECTURE & SOFTWARE DESIGN',
        title: 'AlumniTPL: Software Engineering Technology Alumni Information System & Tracer Study',
        tagline: 'Architecting an N-Tier centralized alumni information and institutional career-tracking ecosystem.',
        role: 'System Analyst & Front-End Developer',
        meta: 'ACADEMIC PROJECT · DPPL / SDD · SEP — DEC 2025',
        description:
          'Authored the Software Design Description (Deskripsi Perancangan Perangkat Lunak / DPPL) and designed the full-stack system architecture for Website Alumni TPL IPB. Developed by team "Turu Dulu Bang" (Osanna Patricia Limbong, Husnul Khotimah, M. Akbar Rafliansyah Lubis, Rizal Hadi Musthofani) under the Software Engineering Technology program at IPB University. Engineered a rigorous N-Tier Layered Architecture spanning 7 core functional requirements (DPPL-FR01 to FR07), a comprehensive Requirements Traceability Matrix (RTM), normalized relational ERD schemas, and 12 high-fidelity responsive user interface specifications.',
        metrics: [
          { label: 'Architecture', value: '4-Tier Layered' },
          { label: 'Requirements', value: '7 Core FRs (RTM)' },
          { label: 'UI Specifications', value: '12 Screen Layouts' },
          { label: 'Data Baseline', value: '5,000 Alumni Scale' },
        ],
        highlights: [
          'Layered Architecture (N-Tier): Structured into Presentation (Blade, Tailwind CSS, JS), Business Logic (Controllers & Services), Data Access (Repository & ORM), and Data Layer (Models & MySQL) ensuring strict separation of concerns.',
          'Requirements Traceability Matrix (RTM): Mapped SRS requirements to technical DPPL specifications across 7 core functional modules (DPPL-FR01 through FR07).',
          'Two-Step Student/Alumni Authentication: Engineered initial identity verification against prodi databases (IPB email and NIM) followed by secure encrypted password configuration.',
          'Administrative Analytics Dashboard: Designed real-time Area Chart visualizations with yearly dropdown filters, headline statistic cards (5,000 alumni baseline with 8.5% annual growth trend), and instant Excel/PDF export pipelines.',
          'Public Discovery & Tracer Study Engine: Created public-facing landing showcases for outstanding alumni alongside survey distribution tools with automated email notifications.',
        ],
        tags: [
          'System Architecture',
          'UML Modeling',
          'ERD & Data Schema',
          'DPPL / SDD Document',
          'N-Tier Layered Design',
          'Laravel Blade',
          'Tailwind CSS',
          'MySQL / ORM',
        ],
        hasGallery: true,
        galleryLabel: 'View System Evidence (1)',
        evidence: [
          {
            src: '/images/work/alumni tpl/tim.jpg',
            alt: 'AlumniTPL Development Team - Turu Dulu Bang',
            caption:
              'Development Team "Turu Dulu Bang" — Software Engineering Technology, IPB University (Osanna Patricia Limbong, Husnul Khotimah, M. Akbar Rafliansyah Lubis, Rizal Hadi Musthofani).',
            fit: 'contain',
          },
        ],
        caseStudy: {
          courseInfo: {
            course: 'Deskripsi Perancangan Perangkat Lunak (DPPL / SDD)',
            institution: 'Sekolah Vokasi IPB University — Software Engineering Technology',
            author: 'Tim "Turu Dulu Bang" (Osanna Patricia Limbong, Husnul Khotimah, M. Akbar Rafliansyah Lubis, Rizal Hadi Musthofani)',
            date: 'Odd Semester 2025 · IEEE 830 Standards',
            dataset: 'Dokumen DPPL & SRS Website Alumni TPL IPB (11 Pages)',
            scope: '12 UI Specifications · 7 Functional Modules (DPPL-FR01 to FR07) · N-Tier Architecture & ERD Schemas',
          },
          pillarsTitle: 'Core Software Design & Architectural Pillars',
          pillars: [
            {
              index: '01',
              title: 'Layered N-Tier System Architecture',
              category: 'SYSTEM ARCHITECTURE',
              metricBadge: '4 Horizontal Layers',
              summary:
                'Engineered an N-Tier layered architecture to ensure strict separation of concerns, long-term maintainability, and testing isolation.',
              details: [
                'Presentation Layer: Manages user requests, view rendering, and client interactions using Laravel Blade, Tailwind CSS, and vanilla JavaScript.',
                'Business Logic Layer: Encapsulates prodi business rules, career tracking workflows, and operational permissions inside isolated Controllers and Services.',
                'Data Access Layer: Uses the Repository Pattern and Object-Relational Mapping (ORM) to abstract data persistence from business workflows.',
                'Data Layer: Enforces relational database integrity across MySQL and phpMyAdmin storage models.',
              ],
            },
            {
              index: '02',
              title: 'Requirements Traceability Matrix (DPPL-FR01 to FR07)',
              category: 'ENGINEERING SPECIFICATION',
              metricBadge: '7 Functional Modules',
              summary:
                'Formulated an end-to-end Requirements Traceability Matrix linking SRS business needs to exact DPPL software components.',
              details: [
                'DPPL-FR01: Multi-role authentication (Admin & Alumni) with encrypted credential storage.',
                'DPPL-FR02: Independent alumni profile, educational background, and employment history updates.',
                'DPPL-FR03: Centralized administrative CRUD management (verify, edit, delete alumni records).',
                'DPPL-FR04: Interactive analytics dashboard displaying area trend charts and KPI summary cards.',
                'DPPL-FR05: Filtered alumni records export engine supporting Microsoft Excel (.xlsx) and Adobe PDF.',
                'DPPL-FR06: Information broadcast and tracer study survey engine with automated email dispatch.',
                'DPPL-FR07: Public catalog allowing prospective students and partners to discover outstanding alumni without logging in.',
              ],
            },
            {
              index: '03',
              title: 'Comprehensive Relational Data Decomposition (ERD)',
              category: 'DATABASE DESIGN',
              metricBadge: 'Normalized Relational Schema',
              summary:
                'Designed a fully normalized relational schema mapping entity lifecycles, foreign keys, and career progressions.',
              details: [
                'Core User & Identity: User entity partitioned by role (Admin vs Alumni) with verification flags and bcrypt password encryption.',
                'Career & Education Tracking: Dedicated RiwayatKarir and RiwayatPendidikan entities capturing company name, job level, entry year, and graduation year.',
                'Information & Surveys: InformasiUmum, KontenGambarInformasi, and Notifikasi entities supporting multimedia announcements and automated email dispatches.',
                'Outstanding Honors: AlumniBerprestasi entity highlighting award titles and public accolades.',
              ],
            },
            {
              index: '04',
              title: '12 Screen Interface Design System & User Journeys',
              category: 'UI/UX SPECIFICATION',
              metricBadge: '12 UI Specifications',
              summary:
                'Crafted 12 comprehensive interface specifications in an elegant deep purple color palette (#5B45B0) adhering to responsive design guidelines.',
              details: [
                'Admin Management: Login, Analytics Dashboard (5,000 alumni baseline, 8.5% YoY growth), Data Alumni table with row actions, Tambah Alumni form, and Berprestasi management.',
                'Public Portal & Landing: Sticky navbar, hero showcase, featured outstanding alumni card, and 3-column information feed.',
                'Alumni Onboarding: 2-step registration verifying @apps.ipb.ac.id and NIM against prodi databases before setting passwords.',
                'Resilient Error States: Standardized "Gagal Memuat" error dialog with single-click return actions for connection interruptions.',
              ],
            },
          ],
          recommendationsTitle: 'Engineering Standards & Key Deliverables',
          recommendations: [
            {
              index: '01',
              title: 'IEEE 830 Standards & Requirements Traceability',
              takeaway:
                'Every user story from the SRS document was traced directly to technical DPPL modules, ensuring 100% testable implementation coverage with zero architectural ambiguity.',
            },
            {
              index: '02',
              title: 'Strict Separation of Concerns (N-Tier Architecture)',
              takeaway:
                'Separating presentation, business logic, data access, and storage prevents code entanglement, allowing frontend components to evolve independently from database migrations.',
            },
            {
              index: '03',
              title: 'Two-Stage Verified Identity Pipeline',
              takeaway:
                'Restricting alumni registration to institutional @apps.ipb.ac.id emails and NIM validation safeguards directory integrity against fraudulent accounts.',
            },
            {
              index: '04',
              title: 'Accreditation-Ready Data Export Engine',
              takeaway:
                'Built-in PDF and Excel export capabilities empower academic administrators to generate instant statistical reports for national accreditation audits.',
            },
          ],
        },
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
        label: 'ARSITEKTUR SISTEM & PERANCANGAN PERANGKAT LUNAK',
        title: 'AlumniTPL: Sistem Informasi Alumni dan Portal Tracer Study Teknologi Rekayasa Perangkat Lunak IPB',
        tagline: 'Merancang arsitektur berlapis (N-Tier) untuk sistem informasi alumni terpusat dan pelacakan tracer study berkala.',
        role: 'Analis Sistem & Pengembang Front-End',
        meta: 'PROYEK AKADEMIK · DOKUMEN DPPL / SDD · SEP — DES 2025',
        description:
          'Menyusun Dokumen Deskripsi Perancangan Perangkat Lunak (DPPL / Software Design Description - SDD) dan merancang arsitektur sistem utuh Website Alumni TPL IPB. Dikerjakan oleh tim "Turu Dulu Bang" (Osanna Patricia Limbong, Husnul Khotimah, M. Akbar Rafliansyah Lubis, Rizal Hadi Musthofani) pada Program Studi Teknologi Rekayasa Perangkat Lunak, Sekolah Vokasi IPB University. Merancang Arsitektur Berlapis (N-Tier Layered Architecture) yang mencakup 7 kebutuhan fungsional (DPPL-FR01 s.d. FR07), Matriks Keterurutan Kebutuhan (RTM), skema relasi database (ERD), serta 12 spesifikasi antarmuka layar pengguna responsif.',
        metrics: [
          { label: 'Arsitektur', value: '4 Lapisan N-Tier' },
          { label: 'Kebutuhan Sistem', value: '7 Modul (RTM)' },
          { label: 'Spesifikasi UI', value: '12 Desain Layar' },
          { label: 'Skala Basis Data', value: '5.000 Data Alumni' },
        ],
        highlights: [
          'Arsitektur Berlapis (Layered Architecture): Membagi sistem ke dalam Lapisan Presentation (Blade, Tailwind CSS, JS), Business Logic (Controllers & Services), Akses Data (Repository & ORM), dan Data Layer (Models & MySQL) untuk pemisahan tanggung jawab (Separation of Concerns).',
          'Matriks Keterurutan Kebutuhan (RTM): Memetakan seluruh kebutuhan SRS ke dalam rancangan teknis DPPL pada 7 kebutuhan fungsional utama (DPPL-FR01 hingga FR07).',
          'Registrasi 2-Tahap Alumni: Memvalidasi Email IPB (@apps.ipb.ac.id) dan NIM ke basis data prodi sebelum alumni dapat menyetel kata sandi terenkripsi (bcrypt).',
          'Dasbor Eksekutif & Visualisasi Data: Merancang grafik area pemantauan alumni dengan filter tahun (misal: 2024), kartu total 5.000 alumni dengan tren kenaikan tahunan 8.5%, serta mesin ekspor Excel & PDF.',
          'Pusat Informasi & Showcase Alumni Berprestasi: Menyediakan etalase publik profil alumni sukses tanpa login, formulir survei tracer study, serta pengiriman notifikasi otomatis ke email alumni.',
        ],
        tags: [
          'Arsitektur Sistem',
          'Pemodelan UML',
          'ERD & Skema Data',
          'Dokumen DPPL / SDD',
          'Arsitektur Berlapis N-Tier',
          'Laravel Blade',
          'Tailwind CSS',
          'MySQL / ORM',
        ],
        hasGallery: true,
        galleryLabel: 'Lihat Dokumentasi Sistem (1)',
        evidence: [
          {
            src: '/images/work/alumni tpl/tim.jpg',
            alt: 'Tim Pengembang Sistem AlumniTPL - Turu Dulu Bang',
            caption:
              'Tim Pengembang "Turu Dulu Bang" — Teknologi Rekayasa Perangkat Lunak Sekolah Vokasi IPB (Osanna Patricia Limbong, Husnul Khotimah, Muhammad Akbar Rafliansyah Lubis, Rizal Hadi Musthofani).',
            fit: 'contain',
          },
        ],
        caseStudy: {
          courseInfo: {
            course: 'Deskripsi Perancangan Perangkat Lunak (DPPL / SDD)',
            institution: 'Sekolah Vokasi IPB University — Teknologi Rekayasa Perangkat Lunak',
            author: 'Tim "Turu Dulu Bang" (Osanna Patricia Limbong, Husnul Khotimah, M. Akbar Rafliansyah Lubis, Rizal Hadi Musthofani)',
            date: 'Semester Ganjil 2025 · Standar IEEE 830',
            dataset: 'Dokumen DPPL & SRS Website Alumni TPL IPB (11 Halaman)',
            scope: '12 Spesifikasi Layar UI · 7 Kebutuhan Fungsional (DPPL-FR01 s.d. FR07) · Arsitektur N-Tier & ERD Normalisasi',
          },
          pillarsTitle: 'Pilar Perancangan & Arsitektur Perangkat Lunak',
          pillars: [
            {
              index: '01',
              title: 'Perancangan Arsitektur Berlapis (Layered N-Tier Architecture)',
              category: 'ARSITEKTUR SISTEM',
              metricBadge: '4 Lapisan Horizontal',
              summary:
                'Menerapkan pola arsitektur berlapis untuk memastikan pemisahan tanggung jawab (Separation of Concerns), stabilitas tinggi, dan kemudahan pengujian.',
              details: [
                'Lapisan Presentation: Menangani request, validasi tampilan, dan rendering komponen menggunakan Laravel Blade, Tailwind CSS, dan JavaScript.',
                'Lapisan Business Logic: Memusatkan seluruh aturan bisnis, alur kerja verifikasi, dan proses tracer study di dalam Controllers dan Services.',
                'Lapisan Akses Data: Menggunakan Repository Pattern dan Object-Relational Mapping (ORM) sebagai abstraksi antara logika bisnis dan data fisik.',
                'Lapisan Data: Menjamin integritas struktur fisik data menggunakan MySQL DBMS dan phpMyAdmin.',
              ],
            },
            {
              index: '02',
              title: 'Matriks Keterurutan Kebutuhan (DPPL-FR01 s.d. DPPL-FR07)',
              category: 'SPESIFIKASI REKAYASA',
              metricBadge: '7 Kebutuhan Fungsional',
              summary:
                'Menyusun Requirements Traceability Matrix (RTM) yang menghubungkan analisis kebutuhan SRS dengan komponen teknis DPPL.',
              details: [
                'DPPL-FR01: Fitur autentikasi multi-peran (Admin & Alumni) dengan kata sandi terenkripsi dan Remember Me.',
                'DPPL-FR02: Fitur pembaruan mandiri data pribadi, riwayat pendidikan, dan rekam jejak karier alumni.',
                'DPPL-FR03: Pengelolaan data alumni oleh admin mencakup validasi status akun, edit data, dan konfirmasi hapus.',
                'DPPL-FR04: Tampilan dasbor visualisasi grafik area jumlah alumni terhadap periode dan statistik card ringkas.',
                'DPPL-FR05: Mesin ekspor data alumni terfilter ke format file Microsoft Excel (.xlsx) atau Adobe PDF.',
                'DPPL-FR06: Modul pembuatan survei tracer study dan pengumuman umum dengan notifikasi email otomatis.',
                'DPPL-FR07: Akses publik terbuka tanpa login untuk melihat profil alumni berprestasi di landing page.',
              ],
            },
            {
              index: '03',
              title: 'Dekomposisi Data & Relasi Entitas (ERD)',
              category: 'PERANCANGAN BASIS DATA',
              metricBadge: 'Skema Relasional Ternormalisasi',
              summary:
                'Membongkar struktur data kompleks menjadi entitas-entitas terisolasi dengan relasi relasional yang kokoh.',
              details: [
                'Entitas User & Alumni: Pemisahan data autentikasi (id_user, username, password terenkripsi, id_role) dan profil alumni (angkatan, pekerjaan, perusahaan, domisili).',
                'Rekam Jejak Karier & Pendidikan: Entitas RiwayatKarir dan RiwayatPendidikan yang mencatat nama perusahaan, tingkat jabatan, nama instansi, tahun masuk, dan kelulusan.',
                'Informasi & Komunikasi: Entitas InformasiUmum, KontenGambarInformasi, dan Notifikasi untuk publikasi berita, banner gambar, dan log pengiriman pesan.',
                'Alumni Berprestasi: Entitas AlumniBerprestasi untuk pelabelan prestasi khusus yang ditampilkan di beranda publik.',
              ],
            },
            {
              index: '04',
              title: '12 Spesifikasi Desain Antarmuka & Skema Warna Ungu',
              category: 'SPESIFIKASI UI/UX',
              metricBadge: '12 Rancangan Layar',
              summary:
                'Merancang 12 tata letak layar antarmuka pengguna berbasis palet warna ungu (#5B45B0) yang terbagi atas zona otorisasi admin dan portal publik.',
              details: [
                'Zona Admin: Layar Login Admin, Dasbor Analitik (grafik area & total 5.000 alumni tren 8.5%), Tabel Data Alumni dengan aksi per baris, Form Tambah Alumni, dan Kelola Berprestasi.',
                'Zona Publik & Alumni: Sticky navigation bar, hero sambutan kampus SV IPB, kartu sorotan alumni berprestasi, dan 3 kolom warta terkini.',
                'Alur Registrasi 2-Tahap: Verifikasi awal Email IPB (@apps.ipb.ac.id) & NIM sebelum membuka form pembuatan kata sandi.',
                'Layar Pesan Gagal Memuat: Layar penanganan kendala teknis terstandarisasi dengan satu tombol aksi Kembali ke layar sebelumnya.',
              ],
            },
          ],
          recommendationsTitle: 'Prinsip Rekayasa & Standar Implementasi',
          recommendations: [
            {
              index: '01',
              title: 'Kepatuhan Standar IEEE 830 & Ketertelusuran RTM',
              takeaway:
                'Seluruh kebutuhan sistem dari dokumen SRS dipetakan secara presisi ke dokumen DPPL, menghasilkan acuan pengembangan yang 100% teruji dan minim ambiguitas teknis.',
            },
            {
              index: '02',
              title: 'Pemisahan Tanggung Jawab (Arsitektur Berlapis)',
              takeaway:
                'Pemisahan tegas antara lapisan presentation, logika bisnis, akses data, dan database mencegah ketergantungan kode yang rumit dan mempermudah pengujian unit.',
            },
            {
              index: '03',
              title: 'Autentikasi Terverifikasi 2-Tahap Berbasis Domain IPB',
              takeaway:
                'Validasi email resmi @apps.ipb.ac.id dan NIM ke database prodi sebelum pembuatan akun menjamin keaslian identitas alumni dan mencegah manipulasi data survei.',
            },
            {
              index: '04',
              title: 'Ekspor Data Laporan Akreditasi Otomatis',
              takeaway:
                'Dukungan ekspor instan ke format Excel dan PDF memudahkan program studi dalam mengolah rekap data karier alumni untuk keperluan audit akreditasi nasional.',
            },
          ],
        },
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
