/**
 * Site-wide content: identity, contact details, and navigation.
 * Supports bilingual EN & ID translations.
 */
export const siteData = {
  en: {
    monogram: 'op/l.',
    name: 'Osanna Patricia Limbong',
    nameLines: ['OSANNA PATRICIA', 'LIMBONG'],
    email: 'osannapatricia@gmail.com',
    linkedin: {
      label: 'linkedin.com/in/osannapatricia',
      url: 'https://linkedin.com/in/osannapatricia',
    },
    instagram: {
      label: 'instagram.com/osannaptricia',
      url: 'https://instagram.com/osannaptricia',
    },
    navLinks: [
      { to: '/', label: 'Home' },
      { to: '/about', label: 'About' },
      { to: '/work', label: 'Work' },
      { to: '/journey', label: 'Journey' },
    ],
    contactButton: 'Contact ↗',
    contact: {
      title: 'Let’s make the next connection.',
    },
  },
  id: {
    monogram: 'op/l.',
    name: 'Osanna Patricia Limbong',
    nameLines: ['OSANNA PATRICIA', 'LIMBONG'],
    email: 'osannapatricia@gmail.com',
    linkedin: {
      label: 'linkedin.com/in/osannapatricia',
      url: 'https://linkedin.com/in/osannapatricia',
    },
    instagram: {
      label: 'instagram.com/osannaptricia',
      url: 'https://instagram.com/osannaptricia',
    },
    navLinks: [
      { to: '/', label: 'Beranda' },
      { to: '/about', label: 'Tentang' },
      { to: '/work', label: 'Proyek' },
      { to: '/journey', label: 'Perjalanan' },
    ],
    contactButton: 'Kontak ↗',
    contact: {
      title: 'Mari terhubung dan berkolaborasi.',
    },
  },
};

export const getSiteContent = (lang = 'en') => siteData[lang] || siteData.en;
export const site = siteData.en;
export const navLinks = siteData.en.navLinks;
export const contact = siteData.en.contact;
