export type TimelineItem = {
  id: string
  title: string
  institution: string
  period: string
  description: string
  details: string[]
  logo: string
  logoAlt: string
}

export const education: TimelineItem[] = [
  {
    id: 'education-smk',
    title: 'Rekayasa Perangkat Lunak',
    institution: 'SMK As-Syafi’iyah 01 Jakarta',
    period: '2023 – 2026',
    description:
      'Mempelajari pemrograman, pengembangan aplikasi, perancangan sistem, dan pengelolaan basis data.',
    details: [
      'Mempelajari pengembangan web menggunakan HTML, CSS, JavaScript, dan PHP.',
      'Mempelajari perancangan basis data dan pemodelan sistem menggunakan UML.',
      'Mengenal proses perancangan antarmuka dan pengalaman pengguna.',
    ],
    logo: '/images/logo/As-Syafiiyah.png',
    logoAlt: 'Logo SMK As-Syafi’iyah 01 Jakarta',
  },
]

export const experiences: TimelineItem[] = [
  {
    id: 'pkl-kantor-camat',
    title: 'Web Developer & Designer',
    institution: 'Kantor Camat Jatinegara',
    period: 'PKL · 3 bulan',
    description:
      'Mendukung kebutuhan pengembangan aplikasi dan desain visual untuk kegiatan instansi.',
    details: [
      'Mengembangkan sistem informasi jadwal internal.',
      'Membuat aplikasi untuk membantu perhitungan anggaran.',
      'Mendesain banner untuk kegiatan resmi instansi.',
    ],
    logo: '/images/logo/Lambang_Kota_Jakarta_Timur.png',
    logoAlt: 'Logo Kantor Camat Jatinegara',
  },
  {
    id: 'pkl-smk-assyafiiyah',
    title: 'Pengembangan Web Junior',
    institution: 'SMK As-Syafi’iyah',
    period: 'PKL · 3 bulan',
    description:
      'Mengembangkan aplikasi sistem kasir untuk membantu pengelolaan transaksi Koperasi Sekolah dan BMT.',
    details: [
      'Mengembangkan aplikasi Point of Sale (POS).',
      'Membantu pengelolaan data transaksi Koperasi Sekolah dan BMT.',
    ],
    logo: '/images/logo/As-Syafiiyah.png',
    logoAlt: 'Logo institusi sekolah',
  },
]