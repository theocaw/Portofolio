export const aboutData = {
  en: {
    intro: {
      label: '01 / ABOUT OSANNA',
      headline: ['Curiosity,', 'with structure.'],
      description:
        'I like finding patterns, asking better questions, and turning what I learn into something people can use.',
    },
    profile: {
      label: 'THE PERSON / THE DIRECTION',
      glyph: '{×}',
      facts: ['OSANNA PATRICIA LIMBONG', 'SOFTWARE ENGINEERING STUDENT'],
      title: 'An analytical mindset. A practical approach to building.',
      paragraphs: [
        'I’m a Software Engineering student at IPB University, seeking an internship as a Data Analyst or Front-End Developer. My academic work spans exploratory data analysis, system design, and web and mobile applications.',
        'I’m developing the habits that connect these disciplines: understanding the problem, organizing information, and making the result clear. Full-stack development is an additional capability that helps me understand how interfaces connect to the systems behind them.',
      ],
      focus: [
        { label: '01 / PRIMARY FOCUS', value: 'Data Analyst' },
        { label: '02 / PRIMARY FOCUS', value: 'Front-End Developer' },
      ],
    },
    education: {
      label: 'EDUCATION / A FOUNDATION TO BUILD ON',
      period: 'AUG 2024 — PRESENT',
      school: 'IPB University',
      degree: ['Bachelor of Applied Engineering', 'Software Engineering'],
      languages: [
        { name: 'Indonesian', level: 'Fluent' },
        { name: 'English', level: 'Intermediate' },
      ],
      gpa: {
        label: 'ACADEMIC RECORD / GPA',
        value: '3.63',
        scale: ' / 4.00',
        note: 'Learning through academic projects in data analysis, front-end development, and software systems.',
      },
    },
    toolkit: {
      label: 'TOOLKIT / DEVELOPED THROUGH PRACTICE',
      title: 'Different tools. Clear intentions.',
      domains: [
        {
          icon: '[ ∑ ]',
          title: 'Data & analysis',
          tools: ['Python · R · SQL', 'Pandas · Matplotlib · Seaborn', 'Google Colab · Google Gemini AI'],
          description: 'Preprocessing, EDA, feature correlations, predictive modeling, and Google AI competencies.',
        },
        {
          icon: '{ / }',
          title: 'Front-end & systems',
          tools: ['Laravel · React Native', 'Tailwind CSS · MySQL', 'MVC · UML · ERD · Wireframes'],
          description: 'Interface development and system design, from requirements to application structure.',
        },
        {
          icon: '[ + ]',
          title: 'Additional capabilities',
          tools: ['MongoDB · Sanctum · Midtrans PHP', 'Unity · Blender · Vuforia', 'Wix'],
          description:
            'Full-stack applications, API integration, 3D modeling, and augmented reality in project contexts.',
        },
      ],
    },
    workInvitation: {
      title: 'See how I put these tools to work.',
      action: { label: 'Explore five projects', to: '/work' },
    },
  },
  id: {
    intro: {
      label: '01 / TENTANG OSANNA',
      headline: ['Rasa ingin tahu,', 'dengan struktur terarah.'],
      description:
        'Aku senang menemukan pola data, mengajukan pertanyaan kritis, dan mengubah wawasan menjadi karya nyata yang bermanfaat.',
    },
    profile: {
      label: 'SOSOK / ARAH TUJUAN',
      glyph: '{×}',
      facts: ['OSANNA PATRICIA LIMBONG', 'MAHASISWI REKAYASA PERANGKAT LUNAK'],
      title: 'Pola pikir analitis. Pendekatan praktis dalam membangun karya.',
      paragraphs: [
        'Aku mahasiswi Rekayasa Perangkat Lunak di IPB University, mencari kesempatan magang sebagai Data Analyst atau Front-End Developer. Pengalaman akademikku mencakup analisis data eksploratif, perancangan sistem, serta aplikasi web dan mobile.',
        'Aku terus mengasah kemampuan yang menghubungkan kedua bidang ini: memahami inti masalah, menyusun struktur informasi, dan menyajikan hasil secara jelas. Kemampuan full-stack juga membantuku memahami bagaimana antarmuka terhubung erat dengan arsitektur sistem di belakangnya.',
      ],
      focus: [
        { label: '01 / FOKUS UTAMA', value: 'Analis Data' },
        { label: '02 / FOKUS UTAMA', value: 'Pengembang Front-End' },
      ],
    },
    education: {
      label: 'PENDIDIKAN / FONDASI UTAMA',
      period: 'AGU 2024 — SEKARANG',
      school: 'IPB University',
      degree: ['Sarjana Terapan Teknik', 'Rekayasa Perangkat Lunak'],
      languages: [
        { name: 'Bahasa Indonesia', level: 'Fasih / Penutur Asli' },
        { name: 'Bahasa Inggris', level: 'Menengah (Intermediate)' },
      ],
      gpa: {
        label: 'REKAM AKADEMIS / IPK',
        value: '3.63',
        scale: ' / 4.00',
        note: 'Pengembangan diri melalui proyek akademik dalam analisis data, rekayasa front-end, dan sistem perangkat lunak.',
      },
    },
    toolkit: {
      label: 'KEAHLIAN / DIASAH LEWAT PRAKTIK',
      title: 'Beragam alat. Tujuan yang jelas.',
      domains: [
        {
          icon: '[ ∑ ]',
          title: 'Data & analisis',
          tools: ['Python · R · SQL', 'Pandas · Matplotlib · Seaborn', 'Google Colab · Google Gemini AI'],
          description: 'Preprocessing, EDA, korelasi fitur, pemodelan prediktif, dan pemanfaatan Google AI.',
        },
        {
          icon: '{ / }',
          title: 'Front-end & sistem',
          tools: ['Laravel · React Native', 'Tailwind CSS · MySQL', 'MVC · UML · ERD · Wireframes'],
          description: 'Pengembangan antarmuka dan perancangan sistem, dari analisis kebutuhan hingga struktur aplikasi.',
        },
        {
          icon: '[ + ]',
          title: 'Kemampuan tambahan',
          tools: ['MongoDB · Sanctum · Midtrans PHP', 'Unity · Blender · Vuforia', 'Wix'],
          description:
            'Aplikasi full-stack, integrasi API, pemodelan 3D, dan augmented reality dalam konteks proyek.',
        },
      ],
    },
    workInvitation: {
      title: 'Lihat bagaimana aku menerapkan kemampuan ini.',
      action: { label: 'Jelajahi 5 proyek', to: '/work' },
    },
  },
};

export const getAboutContent = (lang = 'en') => aboutData[lang] || aboutData.en;
export const about = aboutData.en;
