import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Award,
  FileBadge,
  X,
} from 'lucide-react'
import { achievements, type Achievement } from '@/data/achievements'
import Card from '../ui/Card'
import SectionBadge from '../ui/SectionBadge'
import SectionDivider from '../ui/SectionDivider'

function AchievementCard({
  achievement,
  onView,
}: {
  achievement: Achievement
  onView: (achievement: Achievement) => void
}) {
  const certificate = achievement.type === 'Sertifikat'
  const Icon = certificate ? FileBadge : Award

  const [loadedImages, setLoadedImages] = useState<string[]>([])

  useEffect(() => {
    achievement.images.forEach(image => {
      const img = new Image()

      img.onload = () => {
        setLoadedImages(previous =>
          previous.includes(image.src) ? previous : [...previous, image.src],
        )
      }

      img.src = image.src
    })
  }, [achievement.images])

  const hasImages =
    achievement.images.length > 0 &&
    loadedImages.length > 0

  const accent = certificate
    ? {
        border: 'border-orange-500/25 hover:border-orange-500/60',
        decoration: 'bg-orange-500/50',
        icon: 'text-orange-500',
        avatar: 'ring-orange-500/20',
        link: 'text-orange-400 hover:text-orange-300',
      }
    : {
        border: 'border-red-500/25 hover:border-red-500/60',
        decoration: 'bg-red-500/50',
        icon: 'text-red-500',
        avatar: 'ring-red-500/20',
        link: 'text-red-400 hover:text-red-300',
      }

  return (
    <Card
      variant="interactive"
      padding="md"
      className={`group flex h-full flex-col border transition-colors ${accent.border}`}
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1">
          {Array.from({ length: 7 }, (_, index) => (
            <span
              key={index}
              className={`h-4 w-px rotate-25 ${accent.decoration}`}
            />
          ))}
        </div>

        <Icon size={17} className={accent.icon} aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col gap-8">
        <div>
          <h3 className="font-clash text-base font-semibold leading-snug text-text-primary md:text-lg">
            {achievement.title}
          </h3>

          <div className="mt-3 flex items-center gap-3">
            <div
              className={`size-10 shrink-0 overflow-hidden rounded-full border border-white/10 bg-surface p-1 ring-2 ${accent.avatar}`}
            >
              <img
                src={achievement.organizationLogo}
                alt={achievement.organizationLogoAlt}
                loading="lazy"
                className="size-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <p className="font-general text-sm font-medium text-text-primary">
                {achievement.organization}
              </p>

              <p className="font-general text-xs text-text-secondary">
                {achievement.type}
              </p>
            </div>
          </div>

          <p className="mt-4 font-general text-sm leading-6 text-text-secondary">
            {achievement.description}
          </p>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-3">
          <span className="font-general text-xs text-text-secondary">
            {achievement.date}
          </span>

          <button
            type="button"
            disabled={!hasImages}
            onClick={() => onView(achievement)}
            className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 font-general text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-40 ${accent.link}`}
          >
            {certificate ? 'Lihat Sertifikat' : 'Lihat Penghargaan'}
            <ArrowUpRight size={13} aria-hidden="true" />
          </button>
        </div>
      </div>
    </Card>
  )
}

function AchievementModal({
  achievement,
  onClose,
}: {
  achievement: Achievement
  onClose: () => void
}) {
  const [visible, setVisible] = useState(false)
  const [currentImage, setCurrentImage] = useState(0)
  const closeTimer = useRef<number | null>(null)

  const certificate = achievement.type === 'Sertifikat'
  const images = achievement.images
  const current = images[currentImage]
  const multiple = images.length > 1

  const closeModal = useCallback(() => {
    setVisible(false)

    if (closeTimer.current !== null) {
      window.clearTimeout(closeTimer.current)
    }

    closeTimer.current = window.setTimeout(onClose, 200)
  }, [onClose])

  const changeImage = useCallback(
    (step: number) => {
      if (images.length <= 1) return

      setCurrentImage(
        index => (index + step + images.length) % images.length,
      )
    },
    [images.length],
  )

  useEffect(() => {
    const overflow = document.body.style.overflow
    const frame = requestAnimationFrame(() => setVisible(true))

    document.body.style.overflow = 'hidden'

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
      if (event.key === 'ArrowLeft' && multiple) changeImage(-1)
      if (event.key === 'ArrowRight' && multiple) changeImage(1)
    }

    window.addEventListener('keydown', handleKey)

    return () => {
      cancelAnimationFrame(frame)

      if (closeTimer.current !== null) {
        window.clearTimeout(closeTimer.current)
      }

      document.body.style.overflow = overflow
      window.removeEventListener('keydown', handleKey)
    }
  }, [changeImage, closeModal, multiple])

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overscroll-contain bg-black/80 p-3 backdrop-blur-sm transition-opacity duration-200 sm:p-6 motion-reduce:transition-none ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      onMouseDown={event => {
        if (event.target === event.currentTarget) closeModal()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="achievement-modal-title"
        className={`relative my-auto flex max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-2xl transition-[opacity,transform] duration-200 sm:max-h-[calc(100dvh-3rem)] motion-reduce:transition-none ${
          visible
            ? 'translate-y-0 scale-100 opacity-100'
            : 'translate-y-2 scale-[0.98] opacity-0'
        }`}
      >
        <header className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 p-5 sm:p-6">
          <div className="min-w-0">
            <span
              className={`font-general text-xs font-medium ${
                certificate ? 'text-orange-400' : 'text-red-400'
              }`}
            >
              {achievement.type}
            </span>

            <h2
              id="achievement-modal-title"
              className="mt-2 font-clash text-lg font-semibold text-text-primary sm:text-xl"
            >
              {achievement.title}
            </h2>

            <p className="mt-1 font-general text-sm text-text-secondary">
              {achievement.organization} · {achievement.date}
            </p>
          </div>

          <button
            type="button"
            onClick={closeModal}
            aria-label="Tutup modal"
            className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-white/10 text-text-secondary transition-colors hover:border-orange-500/50 hover:text-orange-400 focus-visible:outline-2 focus-visible:outline-orange-500"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-black/20 p-4 sm:p-6">
          {current && (
            <div className="mx-auto w-full max-w-3xl">
              <div className="relative">
                <img
                  key={current.src}
                  src={current.src}
                  alt={current.alt}
                  draggable={false}
                  className="mx-auto max-h-[60dvh] w-full select-none rounded-lg object-contain"
                />

                {multiple && (
                  <>
                    <button
                      type="button"
                      onClick={() => changeImage(-1)}
                      aria-label="Gambar sebelumnya"
                      className="absolute left-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/80 text-white transition-colors hover:border-orange-500 focus-visible:outline-2 focus-visible:outline-orange-500"
                    >
                      <ArrowLeft size={20} aria-hidden="true" />
                    </button>

                    <button
                      type="button"
                      onClick={() => changeImage(1)}
                      aria-label="Gambar berikutnya"
                      className="absolute right-3 top-1/2 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/80 text-white transition-colors hover:border-orange-500 focus-visible:outline-2 focus-visible:outline-orange-500"
                    >
                      <ArrowRight size={20} aria-hidden="true" />
                    </button>
                  </>
                )}
              </div>

              {multiple && (
                <div className="mt-5 flex flex-col items-center gap-3">
                  <div className="flex justify-center gap-2">
                    {images.map((image, index) => (
                      <button
                        key={image.src}
                        type="button"
                        onClick={() => setCurrentImage(index)}
                        aria-label={`Gambar ${index + 1}`}
                        aria-current={
                          index === currentImage ? 'true' : undefined
                        }
                        className={`size-2.5 rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 ${
                          index === currentImage
                            ? 'bg-orange-500'
                            : 'bg-white/30 hover:bg-white/60'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="font-general text-xs text-text-secondary">
                    Gambar {currentImage + 1} dari {images.length}
                  </p>
                </div>
              )}

              <p className="mt-3 font-general text-center text-xs text-text-secondary">
                {current.alt}
              </p>
            </div>
          )}
        </div>

        <footer className="shrink-0 border-t border-white/10 p-5 sm:p-6">
          <p className="font-general text-sm leading-6 text-text-secondary">
            {achievement.description}
          </p>
        </footer>
      </div>
    </div>
  )
}

function CertificatesSection() {
  const [selected, setSelected] = useState<Achievement | null>(null)

  return (
    <section
      id="certificates"
      className="relative scroll-mt-24 overflow-hidden py-16 md:py-20"
    >
      <SectionDivider />

      <div className="relative mx-auto w-full max-w-7xl space-y-8 px-6 lg:px-8">
        <header className="space-y-3 text-center">
          <SectionBadge>Sertifikat &amp; Penghargaan</SectionBadge>

          <h2 className="font-clash text-3xl font-bold tracking-tight md:text-4xl">
            Sertifikat dan Penghargaan
          </h2>

          <p className="mx-auto max-w-xl font-general text-sm leading-6 text-text-secondary">
            Kumpulan hasil belajar dan pencapaian yang mendukung perjalanan
            saya di bidang desain dan teknologi.
          </p>

          <div className="flex justify-center gap-4 pt-1 font-general text-xs">
            <span className="flex items-center gap-2 text-orange-400">
              <span className="size-2 rounded-full bg-orange-500" />
              Sertifikat
            </span>

            <span className="flex items-center gap-2 text-red-400">
              <span className="size-2 rounded-full bg-red-500" />
              Penghargaan
            </span>
          </div>
        </header>

        <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-2 xl:grid-cols-3">
          {achievements.map(achievement => (
            <AchievementCard
              key={achievement.title}
              achievement={achievement}
              onView={setSelected}
            />
          ))}
        </div>
      </div>

      {selected && (
        <AchievementModal
          achievement={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  )
}

export default CertificatesSection