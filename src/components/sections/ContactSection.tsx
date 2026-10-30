import { useState, type FormEvent } from 'react'
import {
  ArrowUpRight,
  Check,
  Mail,
  Send,
  Sparkles,
} from 'lucide-react'
import SectionBadge from '@/components/ui/SectionBadge'
import SectionDivider from '@/components/ui/SectionDivider'

const contactEmail = 'randysaputra1203@gmail.com'

function ContactSection() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!contactEmail) {
      window.alert('Alamat email tujuan belum dikonfigurasi.')
      return
    }

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get('name') ?? '')
    const email = String(formData.get('email') ?? '')
    const subject = String(formData.get('subject') ?? '')
    const message = String(formData.get('message') ?? '')

    const body = [
      `Nama: ${name}`,
      `Email: ${email}`,
      '',
      message,
    ].join('\n')

    const mailto = new URL(`mailto:${contactEmail}`)
    mailto.searchParams.set('subject', subject)
    mailto.searchParams.set('body', body)

    window.location.href = mailto.toString()
    setSent(true)
  }

  return (
    <section
      id="contact"
      className="relative flex min-h-screen scroll-mt-24 flex-col justify-center overflow-hidden border-t border-white/5 py-20 md:py-24"
    >
      <SectionDivider />

      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute inset-y-0 left-1/6 w-px bg-white/5" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-white/5" />
        <div className="absolute inset-y-0 right-1/6 w-px bg-white/5" />
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 px-6 md:grid-cols-2 md:gap-14 lg:px-8">
        {/* Form email */}
        <div className="space-y-6">
          <SectionBadge>Kontak</SectionBadge>

          <div className="space-y-3">
            <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl">
              Mari Mulai
              <br />
              <span className="text-orange-500">Sebuah Percakapan.</span>
            </h2>

            <p className="max-w-lg text-sm leading-6 text-text-secondary md:text-base">
              Punya ide, peluang kerja, atau ingin berkolaborasi?
              Kirimkan pesan dan ceritakan apa yang ingin kamu diskusikan.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium text-text-primary"
                >
                  Nama
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Nama kamu"
                  required
                  className="min-h-12 w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/60 focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium text-text-primary"
                >
                  Alamat Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="nama@email.com"
                  required
                  className="min-h-12 w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/60 focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-subject"
                className="text-sm font-medium text-text-primary"
              >
                Subjek
              </label>
              <input
                id="contact-subject"
                name="subject"
                type="text"
                placeholder="Apa yang ingin kamu diskusikan?"
                required
                className="min-h-12 w-full rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-colors placeholder:text-text-secondary/60 focus:border-primary"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="contact-message"
                className="text-sm font-medium text-text-primary"
              >
                Pesan
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Tuliskan pesanmu di sini..."
                required
                className="w-full resize-y rounded-xl border border-white/10 bg-surface px-4 py-3 text-sm leading-6 text-text-primary outline-none transition-colors placeholder:text-text-secondary/60 focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-accent px-5 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
            >
              {sent ? <Check size={17} /> : <Send size={17} />}
              {sent ? 'Buka Kembali Email' : 'Kirim Pesan'}
            </button>

            <p className="text-xs leading-5 text-text-secondary">
              Pesan akan disiapkan melalui aplikasi email di perangkatmu.
            </p>
          </form>
        </div>

        {/* Panel ilustrasi komunikasi */}
        <div className="relative mx-auto w-full max-w-lg">
          {/* Border luar seperti Hero */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-3 rounded-3xl border border-orange-500/20"
          />

          {/* Corner accents seperti Hero */}
          <div
            aria-hidden="true"
            className="profile-corners pointer-events-none absolute -inset-3"
          >
            <span className="profile-corner profile-corner-tl" />
            <span className="profile-corner profile-corner-tr" />
            <span className="profile-corner profile-corner-br" />
            <span className="profile-corner profile-corner-bl" />
          </div>

          {/* Glow background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-2xl bg-linear-to-br from-amber-400/20 via-orange-500/10 to-red-600/20 blur-2xl"
          />

          {/* Panel utama */}
          <div className="relative flex min-h-105 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-surface p-6 md:min-h-130 md:p-8">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.12),transparent_65%)]" />

            <div className="pointer-events-none absolute inset-0 opacity-20">
              <div className="absolute left-1/2 top-0 h-full w-px bg-linear-to-b from-transparent via-orange-400 to-transparent" />
              <div className="absolute left-0 top-1/2 h-px w-full bg-linear-to-r from-transparent via-orange-400 to-transparent" />
            </div>

            <div className="relative flex w-full max-w-sm flex-col items-center text-center">
              <div className="relative mb-8 flex size-36 items-center justify-center rounded-[2rem] border border-orange-400/30 bg-orange-500/5 shadow-[0_0_60px_rgba(249,115,22,0.08)]">
                <div className="absolute inset-3 rounded-3xl border border-orange-400/10" />

                <div className="flex size-20 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent text-white shadow-xl shadow-orange-950/40">
                  <Mail size={38} strokeWidth={1.5} />
                </div>

                <span className="absolute -right-3 top-4 flex size-9 items-center justify-center rounded-xl border border-orange-400/30 bg-surface text-orange-400">
                  <Sparkles size={17} />
                </span>

                <span className="absolute -bottom-3 -left-3 flex size-9 items-center justify-center rounded-xl border border-orange-400/30 bg-surface text-orange-400">
                  <Send size={16} />
                </span>
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-orange-400">
                Open for Conversation
              </p>

              <h3 className="text-2xl font-bold text-text-primary md:text-3xl">
                Setiap Ide Punya Awal.
              </h3>

              <p className="mt-4 max-w-xs text-sm leading-6 text-text-secondary">
                Terkadang, karya hebat dimulai dari sebuah pesan sederhana.
                Mari bicarakan ide berikutnya.
              </p>

              <div className="mt-7 flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs text-text-secondary">
                <span className="size-2 rounded-full bg-orange-500" />
                Terbuka untuk peluang dan kolaborasi
                <ArrowUpRight size={14} className="text-orange-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection