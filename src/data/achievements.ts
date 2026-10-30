export type AchievementImage = {
  src: string
  alt: string
}

export type Achievement = {
  title: string
  organization: string
  organizationLogo: string
  organizationLogoAlt: string
  type: 'Sertifikat' | 'Penghargaan'
  description: string
  date: string
  images: AchievementImage[]
}

export const achievements: Achievement[] = [
  {
    title: 'Siswa Berprestasi Jurusan PPLG',
    organization: "SMK As-Syafi'iyah Jakarta",
    organizationLogo: '/images/logo/As-Syafiiyah.png',
    organizationLogoAlt: 'Logo SMK As-Syafiiyah Jakarta',
    type: 'Penghargaan',
    description: 'Penghargaan eksklusif yang diberikan kepada siswa terbaik atas pencapaian akademik, kedisiplinan, dan kompetensi keahlian unggul di bidang Pengembangan Perangkat Lunak dan Gim (PPLG) sepanjang angkatan 2025 - 2026.',
    date: 'Mei 2026',
    images: [
      {
        src: '/images/achievements/SiswaBerprestasiSertifikat.jpeg',
        alt: 'Sertifikat Siswa Berprestasi Jurusan PPLG Angkatan 2025-2026',
      },
    ],
  },
  {
    title: 'TOEIC® Listening and Reading Test',
    organization: 'PT International Test Center (ITC) Indonesia',
    organizationLogo: '/images/logo/ITC.png',
    organizationLogoAlt: 'Logo PT International Test Center (ITC) Indonesia',
    type: 'Sertifikat',
    description: 'Sertifikasi uji kompetensi standar internasional untuk mengukur kemampuan efisiensi komunikasi berbahasa Inggris dalam lingkungan kerja profesional global.',
    date: 'April 2026',
    images: [],
  },
  {
    title: 'Sertifikasi Kompetensi BNSP',
    organization: 'LSP Teknologi Digital Indonesia',
    organizationLogo: '/images/logo/LSP.png',
    organizationLogoAlt: 'Logo LSP Teknologi Digital Indonesia',
    type: 'Sertifikat',
    description: 'Sertifikasi profesi resmi skala nasional yang menyatakan kelayakan standardisasi keahlian kerja teknis pada klaster atau skema kompetensi pemrograman situs web.',
    date: 'Mei 2026',
    images: [
      {
        src: '/images/certificates/belajar-aplikasi-web-react.png',
        alt: 'Sertifikat Kompetensi BNSP',
      },
    ],
  },
  {
    title: 'Juara 1 Lomba Poster Nasional (ROFESTION Vol. 2)',
    organization: 'Universitas Sahid',
    organizationLogo: '/images/logo/Logo_Universitas_Sahid.png',
    organizationLogoAlt: 'Logo Universitas Sahid',
    type: 'Penghargaan',
    description: 'Meraih peringkat pertama dalam kompetisi desain poster tingkat nasional, bersaing dengan peserta dari berbagai daerah dalam mengolah pesan komunikasi visual yang kreatif dan solutif.',
    date: 'Oktober 2024',
    images: [
      {
        src: '/images/achievements/UsahidSertifikat.png',
        alt: 'Penghargaan Juara 1 Lomba Poster Nasional (ROFESTION Vol. 2)',
      },
    ],
  },
  {
    title: 'Juara 1 Lomba Desain Poster Hardiknas',
    organization: "SMK As-Syafi'iyah Jakarta",
    organizationLogo: '/images/logo/As-Syafiiyah.png',
    organizationLogoAlt: "Logo SMK As-Syafi'iyah Jakarta",
    type: 'Penghargaan',
    description: 'Memenangkan peringkat pertama pada kompetisi internal sekolah dalam rangka Hari Pendidikan Nasional 2025 dengan merancang poster bertema apresiasi tokoh pendidikan nasional.',
    date: 'November 2025',
    images: [
      {
        src: '/images/achievements/finalis-ui-ux-nasional.png',
        alt: 'Penghargaan Juara 1 Lomba Desain Poster Hardiknas',
      },
    ],
  },
  {
    title: 'Sertifikat Praktik Kerja Lapangan (PKL)',
    organization: 'Kecamatan Jatinegara, Kota Administrasi Jakarta Timur',
    organizationLogo: '/images/logo/Lambang_Kota_Jakarta_Timur.png',
    organizationLogoAlt: 'Logo Kota Administrasi Jakarta Timur',
    type: 'Sertifikat',
    description: 'Menyelesaikan program magang industri selama 3 bulan dengan predikat Sangat Baik (Nilai Rata-Rata 87/A). Berhasil menerapkan kompetensi teknis dalam optimalisasi manajemen data administrasi dan penyelesaian tugas operasional wilayah.',
    date: 'Januari 2025 – Maret 2025',
    images: [
      {
        src: '/images/certificates/PKLSertifikatDepan.jpeg',
        alt: 'Sertifikat Praktik Kerja Lapangan (PKL) bagian depan',
      },
      {
        src: '/images/certificates/PKLSertifikatBelakang.jpeg',
        alt: 'Sertifikat Praktik Kerja Lapangan (PKL) bagian belakang',
      },
    ],
  },
  {
    title: 'Webinar Series: Festival Hari Guru "Let\'s Celebrate Our Teachers"',
    organization: 'Eduplay X S1 PG PAUD Universitas Negeri Jakarta',
    organizationLogo: '/images/logo/UNJ.png', // Silakan sesuaikan jalur logo UNJ jika ada
    organizationLogoAlt: 'Logo Universitas Negeri Jakarta',
    type: 'Sertifikat',
    description: 'Berpartisipasi aktif sebagai peserta dalam rangkaian webinar nasional untuk memperingati Hari Guru. Fokus pada pengembangan wawasan mengenai kolaborasi edukatif, platform digital pembelajaran, dan manajemen kegiatan berbasis komunitas.',
    date: 'November 2024',
    images: [
      {
        src: '/images/certificates/UNJSertifikat.jpeg',
        alt: 'Sertifikat Webinar Festival Hari Guru UNJ',
      },
    ],
  },
]