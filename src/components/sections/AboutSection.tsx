import { Code2, Mail, PenTool } from 'lucide-react'
import {
  SiFigma,
  SiGithub,
  SiInstagram,
  SiYoutube,
} from 'react-icons/si'
import { FaLinkedinIn } from 'react-icons/fa'
import SectionBadge from '@/components/ui/SectionBadge'
import SectionDivider from '@/components/ui/SectionDivider'
import Card from '@/components/ui/Card'

const journey = [
  {
    number: '01',
    title: 'Graphic Design',
    description:
      'Berawal dari membuat visual di PixelLab sejak SD, ketertarikan saya pada desain berkembang menjadi kecintaan terhadap desain grafis, komposisi, dan tipografi.',
    icon: PenTool,
  },
  {
    number: '02',
    title: 'Frontend Developer',
    description:
      'Melalui jurusan Rekayasa Perangkat Lunak (RPL), saya mempelajari dasar pemrograman dan pengembangan web, mulai dari HTML, CSS, JavaScript, hingga PHP.',
    icon: Code2,
  },
  {
    number: '03',
    title: 'UI/UX Designer',
    description:
      'Menggabungkan kemampuan desain visual dan pemahaman teknis untuk merancang produk digital yang menarik, fungsional, dan mudah digunakan.',
    icon: SiFigma,
  },
]

const socials = [
  { label: 'YouTube', icon: SiYoutube, href: 'https://www.youtube.com/@SunFireX3Z' },
  { label: 'Instagram', icon: SiInstagram, href: 'https://www.instagram.com/sunfirex3z?psln=bW4ybHVicjM3cWUw' },
  { label: 'LinkedIn', icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/randy-saputra-3523a241b/' },
  {
    label: 'GitHub',
    icon: SiGithub,
    href: 'https://github.com/SunFireX3Z',
  },
  { label: 'Email', icon: Mail, href: 'mailto:randysaputra1203@gmail.com' },
]

function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen scroll-mt-24 flex-col justify-center overflow-hidden py-12 md:py-14"
    >
      <SectionDivider />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-6 md:grid-cols-2 md:gap-12 lg:px-8">
        <div>
          <div className="mb-5">
            <SectionBadge>Tentang Saya</SectionBadge>
          </div>

          <h2 className="mb-5 font-clash text-4xl font-bold tracking-tight md:text-5xl">
            Siapa Saya?
            <span className="text-orange-500">.</span>
          </h2>

          <div className="space-y-3 font-general text-base leading-7 text-text-secondary">
            <p>
              Hai, saya{' '}
              <span className="font-general font-semibold text-orange-500">
                Randy Saputra
              </span>
              , dikenal juga sebagai{' '}
              <span className="font-general font-semibold text-orange-500">
                SunFireX3Z
              </span>
              , seorang frontend developer, graphic designer, dan desainer antarmuka dari Jakarta, Indonesia.
            </p>

            <p>
              Ketertarikan saya pada desain visual dimulai sejak sekolah dasar
              ketika membuat gambar profil menggunakan PixelLab. Seiring
              waktu, saya mulai mempelajari pengembangan web melalui pendidikan
              Rekayasa Perangkat Lunak dan eksplorasi mandiri.
            </p>

            <p>
              Sekarang, saya berfokus menggabungkan kreativitas desain grafis dengan teknologi pengembangan frontend untuk menciptakan pengalaman digital yang menarik secara visual dan fungsional.
            </p>
          </div>

          <div className="mt-6">
            <p className="mb-3 font-general font-semibold text-text-primary">
              Temukan Saya
            </p>

            <div className="flex flex-wrap gap-3">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  className="flex size-11 items-center justify-center rounded-xl border border-white/10 bg-surface text-text-primary transition-colors hover:border-orange-500/50 hover:text-orange-400"
                >
                  <Icon size={19} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative space-y-4 py-2">
          <div className="absolute bottom-8 left-5 top-8 w-px bg-linear-to-b from-orange-500 via-orange-500 to-transparent" />

          {journey.map(({ number, title, description, icon: Icon }) => (
            <article key={number} className="relative pl-12">
              <div className="absolute left-0 top-5 z-10 flex size-10 items-center justify-center rounded-full border border-orange-500/40 bg-background text-orange-500">
                <Icon size={20} />
              </div>

              <Card variant="tilt" padding="md">
                <span className="absolute right-4 top-3 font-clash text-2xl font-bold text-orange-500/70">
                  {number}
                </span>

                <h3 className="mb-2 pr-10 font-clash text-lg font-bold text-text-primary">
                  {title}
                </h3>

                <p className="font-general text-sm leading-6 text-text-secondary">
                  {description}
                </p>
              </Card>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection