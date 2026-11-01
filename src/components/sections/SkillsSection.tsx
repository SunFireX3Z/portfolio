import SectionBadge from '@/components/ui/SectionBadge'
import SkillCategoryCard from '@/components/ui/SkillCategoryCard'
import SectionDivider from '@/components/ui/SectionDivider'
import { skillCategories, technologies } from '@/data/skills'
import TechnologyList from '@/components/ui/TechnologyList'

function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative scroll-mt-24 border-t border-white/5 py-20 md:py-28"
    >
      <SectionDivider />

      <div className="mx-auto w-full max-w-7xl space-y-14 px-6 md:space-y-16 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <SectionBadge>Keahlian</SectionBadge>

          <h2 className="font-clash text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            Keahlian dan Teknologi
          </h2>

          <p className="font-general max-w-2xl text-base leading-7 text-slate-400 md:text-lg md:leading-8">
            Perangkat dan keterampilan yang saya gunakan untuk membuat desain
            visual, merancang antarmuka, serta mengembangkan aplikasi web.
          </p>
        </div>

        <div className="space-y-5">
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-8 rounded-full bg-orange-500" />
            <h3 className="font-clash text-xl font-bold text-orange-400 md:text-2xl">
              Kemampuan Utama
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
            {skillCategories.map((category, index) => (
              <SkillCategoryCard
                key={category.title}
                category={category}
                index={index}
              />
            ))}
          </div>
        </div>

        <div className="space-y-7">
          <div className="flex flex-col gap-3 border-b border-white/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <h3 className="font-clash text-2xl font-bold text-white md:text-3xl">
                Teknologi yang Digunakan
              </h3>

              <p className="font-general text-base leading-7 text-slate-400">
                Teknologi dan perangkat lunak yang saya pelajari serta gunakan
                dalam berbagai proyek.
              </p>
            </div>

            <span className="w-fit rounded-full border border-orange-400/25 bg-orange-400/10 px-4 py-2 font-general text-sm font-medium text-orange-300">
              {technologies.length} Teknologi
            </span>
          </div>

          <TechnologyList technologies={technologies} />
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-orange-500/20 bg-slate-900/70 p-6 md:p-8 lg:p-10">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-orange-500/10 blur-3xl" />

          <div className="relative grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-center md:gap-12">
            <div className="space-y-4">
              <p className="font-general text-sm font-semibold uppercase tracking-[0.18em] text-orange-400">
                Pendekatan Kerja
              </p>

              <h3 className="font-clash text-2xl font-bold leading-snug text-white md:text-3xl">
                Tidak hanya membuatnya berfungsi, tetapi juga nyaman digunakan.
              </h3>

              <p className="font-general text-base leading-7 text-slate-400">
                Saya berusaha menyeimbangkan tampilan visual, kemudahan
                penggunaan, dan struktur kode saat mengerjakan proyek.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-orange-500/20 bg-slate-950/70 p-5">
                <span className="mb-4 flex size-11 items-center justify-center rounded-lg bg-orange-500/15 font-clash text-lg font-bold text-orange-400">
                  01
                </span>

                <h4 className="font-clash text-lg font-semibold text-white">
                  Desain Visual
                </h4>

                <p className="mt-2 font-general text-base leading-7 text-slate-400">
                  Memperhatikan komposisi, tipografi, konsistensi, dan
                  hierarki visual.
                </p>
              </div>

              <div className="rounded-xl border border-orange-500/20 bg-slate-950/70 p-5">
                <span className="mb-4 flex size-11 items-center justify-center rounded-lg bg-orange-500/15 font-clash text-lg font-bold text-orange-400">
                  02
                </span>

                <h4 className="font-clash text-lg font-semibold text-white">
                  Pengembangan Frontend
                </h4>

                <p className="mt-2 font-general text-base leading-7 text-slate-400">
                  Mengutamakan susunan komponen yang jelas dan kode yang
                  mudah dipelihara.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsSection