export const homeData = {
  en: {
    headline: ['Turning complex data into', 'meaningful experiences.'],
    greeting: 'Hi, I’m Osanna Patricia Limbong.',
    intro:
      'Software Engineering student at IPB University connecting analytical insight with creative front-end craft. I turn complex data into clear stories, and build interactive experiences that feel effortless to use.',
    actions: [
      { label: 'Explore my work', to: '/work', variant: 'primary' },
      { label: 'About me', to: '/about', variant: 'secondary' },
    ],
    profilePhotos: [
      {
        src: '/images/profile/osanna-1.jpg',
        alt: 'Osanna Patricia Limbong - Sweet pose with finger on cheek',
        label: 'Dimple Smile',
        caption: '✦ pose 01 · smile',
      },
      {
        src: '/images/profile/osanna-2.jpg',
        alt: 'Osanna Patricia Limbong - Cute pout pose in IPB blazer',
        label: 'Soft Pout',
        caption: '✦ pose 02 · pout',
      },
      {
        src: '/images/profile/osanna-3.jpg',
        alt: 'Osanna Patricia Limbong - Playful tiger roar pose in IPB blazer',
        label: 'Tiger Pose',
        caption: '✦ pose 03 · roar',
      },
    ],
    identityCard: {
      header: 'PERSONAL INDEX / 2026',
      roles: ['01 / DATA ANALYST', '02 / FRONT-END DEVELOPER'],
      footnote: 'ALSO EXPLORING FULL-STACK DEVELOPMENT',
    },
    scrollCue: 'A QUICK INTRODUCTION ↓',
    marquee: [
      'Data Analyst',
      'Front-End Developer',
      'Curious by default',
      'Turning data into stories',
      'Building what clicks',
      'IPB University',
    ],
    explore: {
      title: 'Three ways to get to know me.',
      link: { label: 'EXPLORE THE DEDICATED PAGES ↗', to: '/about' },
      cards: [
        {
          index: '01 / ABOUT',
          title: 'The person behind the process.',
          description:
            'My profile, Software Engineering education, and the toolkit I’m developing through practice.',
          cta: 'Meet Osanna ↗',
          to: '/about',
        },
        {
          index: '02 / WORK',
          title: 'From questions to working systems.',
          description:
            'Five academic projects, led by Ames Housing analysis and front-end work for Dthanasha Kost.',
          cta: 'View all five projects ↗',
          to: '/work',
        },
        {
          index: '03 / JOURNEY',
          title: 'Learning beyond the classroom.',
          description:
            'A logistics internship, organizational responsibilities, and achievements—each in its own chapter.',
          cta: 'Follow my journey ↗',
          to: '/journey',
        },
      ],
    },
  },
  id: {
    headline: ['Mengubah data rumit jadi', 'pengalaman bermakna.'],
    greeting: 'Halo, aku Osanna Patricia Limbong.',
    intro:
      'Mahasiswi Rekayasa Perangkat Lunak di IPB University yang menghubungkan analisis data dengan sentuhan kreatif front-end. Mengolah data kompleks menjadi cerita yang jelas dan membangun pengalaman interaktif yang intuitif.',
    actions: [
      { label: 'Lihat proyekku', to: '/work', variant: 'primary' },
      { label: 'Tentang aku', to: '/about', variant: 'secondary' },
    ],
    profilePhotos: [
      {
        src: '/images/profile/osanna-1.jpg',
        alt: 'Osanna Patricia Limbong - Pose manis dengan jari di pipi',
        label: 'Senyum Lesung',
        caption: '✦ pose 01 · senyum',
      },
      {
        src: '/images/profile/osanna-2.jpg',
        alt: 'Osanna Patricia Limbong - Pose cemberut lucu mengenakan jas almamater IPB',
        label: 'Pose Cemberut',
        caption: '✦ pose 02 · cemberut',
      },
      {
        src: '/images/profile/osanna-3.jpg',
        alt: 'Osanna Patricia Limbong - Pose harimau ceria mengenakan jas almamater IPB',
        label: 'Pose Harimau',
        caption: '✦ pose 03 · aum',
      },
    ],
    identityCard: {
      header: 'INDEKS PRIBADI / 2026',
      roles: ['01 / ANALIS DATA', '02 / PENGEMBANG FRONT-END'],
      footnote: 'JUGA MENGEKSPLORASI FULL-STACK',
    },
    scrollCue: 'SEKILAS PENGENALAN ↓',
    marquee: [
      'Analis Data',
      'Pengembang Front-End',
      'Rasa ingin tahu tinggi',
      'Mengolah data jadi cerita',
      'Membangun karya bermakna',
      'IPB University',
    ],
    explore: {
      title: 'Tiga cara untuk mengenalku lebih dekat.',
      link: { label: 'JELAJAHI HALAMAN LENGKAP ↗', to: '/about' },
      cards: [
        {
          index: '01 / TENTANG',
          title: 'Sosok di balik proses berkarya.',
          description:
            'Profil pribadiku, pendidikan Rekayasa Perangkat Lunak, dan keahlian yang terus diasah lewat praktik.',
          cta: 'Kenali Osanna ↗',
          to: '/about',
        },
        {
          index: '02 / PROYEK',
          title: 'Dari pertanyaan menjadi sistem nyata.',
          description:
            'Lima proyek akademik, diawali analisis data Ames Housing dan pengembangan web Dthanasha Kost.',
          cta: 'Lihat 5 proyek ↗',
          to: '/work',
        },
        {
          index: '03 / PERJALANAN',
          title: 'Belajar melampaui ruang kelas.',
          description:
            'Magang logistik, keterlibatan aktif di organisasi, dan prestasi yang diraih—masing-masing punya ceritanya.',
          cta: 'Ikuti perjalananku ↗',
          to: '/journey',
        },
      ],
    },
  },
};

export const getHomeContent = (lang = 'en') => homeData[lang] || homeData.en;
export const home = homeData.en;
