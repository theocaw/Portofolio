export const home = {
  headline: ['Find patterns.', 'Build clarity.'],
  greeting: 'Hi, I’m Osanna Patricia Limbong.',
  intro:
    'Software Engineering student at IPB University, exploring data analysis and building thoughtful front-end experiences.',
  actions: [
    { label: 'Explore my work', to: '/work', variant: 'primary' },
    { label: 'About me', to: '/about', variant: 'secondary' },
  ],
  profilePhotos: [
    {
      src: '/images/profile/osanna-1.jpg',
      alt: 'Osanna Patricia Limbong - Sweet pose with finger on cheek',
      label: 'Pose 1 of 3',
    },
    {
      src: '/images/profile/osanna-2.jpg',
      alt: 'Osanna Patricia Limbong - Cute pout pose in IPB blazer',
      label: 'Pose 2 of 3',
    },
    {
      src: '/images/profile/osanna-3.jpg',
      alt: 'Osanna Patricia Limbong - Playful tiger roar pose in IPB blazer',
      label: 'Pose 3 of 3',
    },
  ],
  identityCard: {
    header: 'PERSONAL INDEX / 2026',
    roles: ['01 / DATA ANALYST', '02 / FRONT-END DEVELOPER'],
    footnote: 'ALSO EXPLORING FULL-STACK DEVELOPMENT',
  },
  scrollCue: 'A QUICK INTRODUCTION ↓',
  marquee: ['Data Analyst', 'Front-End Developer', 'Curious by default', 'Finding patterns', 'Building clarity'],
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
};
