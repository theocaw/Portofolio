/**
 * Journey page content supporting bilingual EN & ID translations.
 * Creative layout designed to stand strong on its own without needing photos.
 * 100% genuine data matching Osanna's actual CV, internship, organizations, and achievements.
 */
export const journeyData = {
  en: {
    intro: {
      label: '03 / JOURNEY · 2024—2025',
      headline: ['Learning through', 'responsibility.'],
      description:
        'Professional experience, organizational leadership, and competitive achievements. How practical accountability and teamwork continue to shape my analytical and engineering craft.',
    },
    professional: {
      label: '01 / PROFESSIONAL EXPERIENCE',
      title: 'A first step into the workplace.',
      internship: {
        period: 'MAY — JUL 2024 · 3 MONTHS',
        company: 'PT Kharisma Citatunggal',
        role: 'Logistics & Business Support Intern',
        location: 'Jakarta, Indonesia',
        description:
          'Contributed to daily operational logistics, client quotation drafting, and corporate digital presence. Handled shipping data in Excel and independently developed the company’s official web platform using Wix.',
        website: { label: 'kctjakarta.com ↗', url: 'https://kctjakarta.com' },
        metrics: [
          { label: 'Commercial Quotations', value: '≈20 Proposals', note: 'Prepared pricing & logistics terms' },
          { label: 'Official Web Portal', value: '1 Live Website', note: 'Independently built with Wix' },
          { label: 'Data Management', value: 'Daily Excel Ops', note: 'Logistics tracking & records' },
        ],
        skills: ['Logistics Tracking', 'Commercial Quotations', 'Excel Data Modeling', 'Wix Web Development', 'Client Communication'],
        deliverables: [
          'Audited and organized incoming logistics records and shipment inventory using structured Excel spreadsheets.',
          'Formulated and drafted approximately 20 formal commercial price quotations for industrial freight clients.',
          'Independently designed, authored, and launched the corporate website at kctjakarta.com to establish the company’s online brand presence.',
        ],
      },
    },
    organizations: {
      label: '02 / ORGANIZATIONS & VOLUNTEERING',
      title: 'Showing up. Taking responsibility.',
      description:
        'Treasury, event management, creative media, and social outreach roles across university and community programs.',
      entries: [
        {
          period: 'SEP — DEC 2025',
          name: 'SITE 2025',
          role: 'Treasurer',
          badge: 'FINANCIAL MANAGEMENT',
          description:
            'Entrusted with full financial oversight for the annual SITE event at IPB University, ensuring complete accountability and real-time budget tracking.',
          metrics: [
            { label: 'Budget Managed', value: 'Rp 26.19M' },
            { label: 'Transactions', value: '280+ Records' },
            { label: 'Compliance', value: '100% Audited' },
          ],
          highlights: [
            'Drafted comprehensive budget forecasts and monitored live expenditure across all event divisions.',
            'Systematically logged 280+ cashflow entries with strict receipt reconciliation and reporting.',
          ],
        },
        {
          period: 'OCT 2024 — NOV 2025',
          name: 'Obscura',
          role: 'Media and Branding Staff',
          badge: 'CREATIVE MEDIA',
          description:
            'Created engaging digital promotional campaigns and social media publications for the student photography community.',
          metrics: [
            { label: 'Content Produced', value: '10 Pieces' },
            { label: 'Organic Views', value: '1K – 4K / Post' },
            { label: 'Timeline', value: '14 Months' },
          ],
          highlights: [
            'Designed social media graphics, copywriting, and visual branding across official community channels.',
            'Generated organic user engagement averaging between 1,000 and 4,000 views per released publication.',
          ],
        },
        {
          period: 'MAY — OCT 2025',
          name: 'Obscura Exhibition',
          role: 'Treasurer',
          badge: 'EXHIBITION FINANCE',
          description:
            'Managed financial operations, ticketing revenue, and vendor procurement for an open public photography gallery exhibition.',
          metrics: [
            { label: 'Budget Managed', value: 'Rp 12.64M' },
            { label: 'Audited Entries', value: '170+ Records' },
            { label: 'Exhibition Scale', value: '200+ Visitors' },
          ],
          highlights: [
            'Oversaw ticketing revenue reconciliation, venue rental settlements, and vendor disbursements.',
            'Produced transparent post-event financial reports presented to stakeholders and advisors.',
          ],
        },
        {
          period: 'JUN — JUL 2025',
          name: 'AIESEC IPB · HealMe 3.0',
          role: 'Volunteer',
          badge: 'SOCIAL IMPACT',
          description:
            'Delivered child health, hygiene, and wellness education workshops across community centers in collaboration with international youth network AIESEC.',
          metrics: [
            { label: 'Locations', value: '2 Centers' },
            { label: 'Beneficiaries', value: '12 Children' },
            { label: 'Curriculum', value: '3 Modules' },
          ],
          highlights: [
            'Facilitated interactive health literacy sessions at Cinta Baca and Darushsholihat Orphanage.',
            'Collaborated with the IPB Sustainable Development Goals (SDGs) initiative for social youth empowerment.',
          ],
        },
        {
          period: 'FEB — JUN 2025',
          name: 'Lomba Pendidikan Karya · BEM SV IPB',
          role: 'Competition Staff',
          badge: 'EVENT OPERATIONS',
          description:
            'Coordinated technical operations, submission logistics, and competitor communications for a major regional student innovation competition.',
          metrics: [
            { label: 'Participants', value: '190+ Students' },
            { label: 'Teams Managed', value: '48 Competing' },
            { label: 'Jury Panel', value: '2 Expert Judges' },
          ],
          highlights: [
            'Managed technical briefing meetings, paper submissions, and evaluation scheduling for 48 teams.',
            'Served as direct liaison between participant teams, the steering committee, and honorary judges.',
          ],
        },
      ],
    },
    achievements: {
      label: '03 / ACHIEVEMENTS & CERTIFICATIONS · 2025—2026',
      title: 'Recognitions, competitions & credentials.',
      subtitle: 'Verified credentials and creative contest awards acknowledging dedication, rigor, and craft.',
      entries: [
        {
          result: 'Certified',
          badgeType: 'verified',
          category: 'OFFICIAL GOOGLE CREDENTIAL',
          name: 'Gemini Certified Student',
          organizer: 'Google for Education / SEP 2026',
          validity: 'Valid: 24/09/2026 — 24/09/2029',
          description:
            'Demonstrated knowledge and competencies in Google AI, Large Language Models (LLMs), prompt engineering, and modern AI productivity workflows.',
          tags: ['Google AI', 'LLM Competencies', 'Prompt Engineering', 'Generative AI'],
        },
        {
          result: '2nd Place',
          badgeType: 'award',
          category: 'INTERNATIONAL COMPETITION',
          name: 'International Short Film Competition',
          organizer: 'Portal 7 / 2025',
          validity: 'Awarded 2025 · Portal 7 International Festival',
          description:
            'Secured 2nd Place among international collegiate entries for cinematic storytelling, collaborative direction, and visual screen presentation.',
          tags: ['Filmmaking', 'Visual Storytelling', 'Cinematography', 'Team Collaboration'],
        },
        {
          result: '2nd Place',
          badgeType: 'award',
          category: 'NATIONAL COMPETITION',
          name: 'Short Film Competition',
          organizer: 'SEMNASA ITCAS / 2025',
          validity: 'Awarded 2025 · SEMNASA ITCAS',
          description:
            'Recognized with 2nd Place in a national film showcase evaluating narrative pacing, thematic cohesion, and audio-visual craft.',
          tags: ['Film Direction', 'Screenplay', 'Audio-Visual Craft', 'National Finalist'],
        },
        {
          result: 'Semifinalist',
          badgeType: 'milestone',
          category: 'BUSINESS PLAN COMPETITION',
          name: 'Business Plan Competition',
          organizer: 'Ideanation / 2025',
          validity: 'Semifinalist 2025 · Ideanation Venture Contest',
          description:
            'Formulated a technology venture proposal encompassing market opportunity analysis, user persona modeling, and financial runway feasibility.',
          tags: ['Business Modeling', 'Market Feasibility', 'Pitch Strategy', 'Financial Projection'],
        },
      ],
    },
  },
  id: {
    intro: {
      label: '03 / PERJALANAN · 2024—2025',
      headline: ['Belajar lewat', 'tanggung jawab nyata.'],
      description:
        'Pengalaman profesional, kepemimpinan organisasi, dan pencapaian kompetisi. Bagaimana tanggung jawab nyata dan kolaborasi tim terus membentuk kematangan berpikir analitis dan rekayasa perangkat lunakku.',
    },
    professional: {
      label: '01 / PENGALAMAN PROFESIONAL',
      title: 'Langkah awal di dunia kerja.',
      internship: {
        period: 'MEI — JUL 2024 · 3 BULAN',
        company: 'PT Kharisma Citatunggal',
        role: 'Intern Logistik & Business Support',
        location: 'Jakarta, Indonesia',
        description:
          'Berkontribusi aktif dalam operasional logistik harian, penyusunan penawaran harga komersial, dan pengembangan identitas digital perusahaan. Mengolah data pengiriman dengan Excel serta merancang dan mempublikasikan portal web resmi perusahaan menggunakan Wix.',
        website: { label: 'kctjakarta.com ↗', url: 'https://kctjakarta.com' },
        metrics: [
          { label: 'Dokumen Penawaran', value: '≈20 Dokumen', note: 'Penawaran harga & termin logistik' },
          { label: 'Portal Web Resmi', value: '1 Website Live', note: 'Dirancang mandiri dengan Wix' },
          { label: 'Manajemen Data', value: 'Operasional Excel', note: 'Pelacakan stok & pengiriman' },
        ],
        skills: ['Pelacakan Logistik', 'Penyusunan Quotation', 'Pemodelan Data Excel', 'Pengembangan Web Wix', 'Komunikasi Klien'],
        deliverables: [
          'Memvalidasi dan mengorganisir data logistik pengiriman barang harian menggunakan lembar kerja Excel terstruktur.',
          'Menyusun sekitar 20 dokumen penawaran harga komersial formal untuk klien industri dan pengangkutan kargo.',
          'Merancang, menyusun konten, dan meluncurkan website resmi perusahaan di kctjakarta.com guna memperkuat branding digital.',
        ],
      },
    },
    organizations: {
      label: '02 / ORGANISASI & KEPANITIAAN',
      title: 'Hadir aktif. Menjalankan peran penuh tanggung jawab.',
      description:
        'Peran pengelolaan keuangan, kepanitiaan acara, media kreatif, dan pengabdian masyarakat di berbagai program kampus dan komunitas.',
      entries: [
        {
          period: 'SEP — DES 2025',
          name: 'SITE 2025',
          role: 'Bendahara',
          badge: 'MANAJEMEN KEUANGAN',
          description:
            'Dipercaya mengelola seluruh perputaran dana kegiatan tahunan SITE di IPB University, memastikan transparansi penuh dan pengawasan anggaran real-time.',
          metrics: [
            { label: 'Anggaran Dikelola', value: 'Rp 26,19 Juta' },
            { label: 'Transaksi Dicatat', value: '280+ Catatan' },
            { label: 'Kepatuhan Audit', value: '100% Sesuai' },
          ],
          highlights: [
            'Menyusun rancangan estimasi anggaran dan mengawasi pengeluaran dana operasional lintas divisi acara.',
            'Mencatat secara sistematis 280+ transaksi keuangan dengan kelengkapan bukti kuitansi dan rekonsiliasi kas.',
          ],
        },
        {
          period: 'OKT 2024 — NOV 2025',
          name: 'Obscura',
          role: 'Staf Media & Branding',
          badge: 'MEDIA KREATIF',
          description:
            'Merancang kampanye promosi digital dan publikasi media sosial yang menarik untuk komunitas fotografi mahasiswa IPB.',
          metrics: [
            { label: 'Konten Diproduksi', value: '10 Karya' },
            { label: 'Penayangan Rata-rata', value: '1K – 4K / Post' },
            { label: 'Masa Bakti', value: '14 Bulan' },
          ],
          highlights: [
            'Membuat desain grafis, salinan teks (copywriting), dan tata visual media sosial resmi komunitas.',
            'Membangun interaksi pengguna organik dengan rata-rata 1.000 hingga 4.000 penayangan per konten yang dirilis.',
          ],
        },
        {
          period: 'MEI — OKT 2025',
          name: 'Obscura Exhibition',
          role: 'Bendahara',
          badge: 'KEUANGAN PAMERAN',
          description:
            'Mengelola operasional perbendaharaan, penerimaan tiket, dan pembayaran vendor untuk pameran galeri fotografi terbuka untuk umum.',
          metrics: [
            { label: 'Anggaran Dikelola', value: 'Rp 12,64 Juta' },
            { label: 'Transaksi Terekam', value: '170+ Catatan' },
            { label: 'Skala Acara', value: '200+ Pengunjung' },
          ],
          highlights: [
            'Mengawasi rekonsiliasi pendapatan tiket masuk, pelunasan sewa lokasi galeri, dan pembayaran vendor perlengkapan.',
            'Menyusun laporan pertanggungjawaban keuangan pasca-acara yang transparan kepada pembina dan pengurus.',
          ],
        },
        {
          period: 'JUN — JUL 2025',
          name: 'AIESEC IPB · HealMe 3.0',
          role: 'Relawan (Volunteer)',
          badge: 'DAMPAK SOSIAL',
          description:
            'Menyelenggarakan lokakarya edukasi kesehatan diri dan pola hidup bersih untuk anak-anak bersama jaringan pemuda internasional AIESEC.',
          metrics: [
            { label: 'Lokasi Edukasi', value: '2 Tempat' },
            { label: 'Anak Penerima', value: '12 Anak' },
            { label: 'Materi Belajar', value: '3 Modul' },
          ],
          highlights: [
            'Memfasilitasi sesi pembelajaran interaktif dan literasi kesehatan di Cinta Baca serta Panti Asuhan Darushsholihat.',
            'Berkolaborasi aktif dalam inisiatif Sustainable Development Goals (SDGs) IPB untuk pemberdayaan sosial anak.',
          ],
        },
        {
          period: 'FEB — JUN 2025',
          name: 'Lomba Pendidikan Karya · BEM SV IPB',
          role: 'Staf Panitia Lomba',
          badge: 'OPERASIONAL ACARA',
          description:
            'Mengkoordinasikan operasional teknis, alur pengumpulan karya inovasi, dan komunikasi peserta pada perlombaan karya ilmiah mahasiswa tingkat regional.',
          metrics: [
            { label: 'Total Peserta', value: '190+ Mahasiswa' },
            { label: 'Tim Bertanding', value: '48 Tim Inovasi' },
            { label: 'Dewan Juri', value: '2 Juri Ahli' },
          ],
          highlights: [
            'Mengkoordinasikan sesi technical meeting, verifikasi berkas karya, dan penjadwalan presentasi 48 tim peserta.',
            'Menjadi narahubung utama yang menjembatani peserta lomba dengan dewan juri penilai dan panitia inti.',
          ],
        },
      ],
    },
    achievements: {
      label: '03 / PRESTASI & SERTIFIKASI · 2025—2026',
      title: 'Penghargaan, kompetisi & sertifikasi.',
      subtitle: 'Sertifikasi keahlian terverifikasi dan penghargaan kompetisi kreatif atas ketekunan dan kerja keras.',
      entries: [
        {
          result: 'Tersertifikasi',
          badgeType: 'verified',
          category: 'SERTIFIKASI RESMI GOOGLE',
          name: 'Gemini Certified Student',
          organizer: 'Google for Education / SEP 2026',
          validity: 'Berlaku: 24/09/2026 — 24/09/2029',
          description:
            'Kompetensi teruji dalam pemahaman Google AI, Large Language Models (LLM), teknik prompt engineering, dan pemanfaatan generative AI untuk alur kerja modern.',
          tags: ['Google AI', 'Kompetensi LLM', 'Prompt Engineering', 'Generative AI'],
        },
        {
          result: 'Juara 2',
          badgeType: 'award',
          category: 'KOMPETISI TINGKAT INTERNASIONAL',
          name: 'International Short Film Competition',
          organizer: 'Portal 7 / 2025',
          validity: 'Penghargaan 2025 · Portal 7 International Festival',
          description:
            'Meraih Juara 2 di antara delegasi internasional atas kekuatan penceritaan sinematik, kolaborasi penyutradaraan, dan visualisasi adegan.',
          tags: ['Pembuatan Film', 'Visual Storytelling', 'Sinematografi', 'Kolaborasi Tim'],
        },
        {
          result: 'Juara 2',
          badgeType: 'award',
          category: 'KOMPETISI TINGKAT NASIONAL',
          name: 'Short Film Competition',
          organizer: 'SEMNASA ITCAS / 2025',
          validity: 'Penghargaan 2025 · SEMNASA ITCAS',
          description:
            'Meraih Juara 2 dalam ajang kompetisi film pendek nasional dengan penilaian ketat pada ritme narasi, kedalaman tema, dan estetika audio visual.',
          tags: ['Penyutradaraan Film', 'Skenario', 'Karya Audio-Visual', 'Finalis Nasional'],
        },
        {
          result: 'Semifinalis',
          badgeType: 'milestone',
          category: 'KOMPETISI BUSINESS PLAN',
          name: 'Business Plan Competition',
          organizer: 'Ideanation / 2025',
          validity: 'Semifinalis 2025 · Ideanation Venture Contest',
          description:
            'Merumuskan proposal model bisnis startup teknologi yang mencakup riset peluang pasar, pemodelan persona pengguna, dan proyeksi finansial.',
          tags: ['Pemodelan Bisnis', 'Analisis Kelayakan Pasar', 'Strategi Pitching', 'Proyeksi Keuangan'],
        },
      ],
    },
  },
};

export const getJourneyContent = (lang = 'en') => journeyData[lang] || journeyData.en;
export const journey = journeyData.en;
