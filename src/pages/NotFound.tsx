import { Link } from 'react-router'
import { ArrowLeft, House } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="flex min-h-[90vh] flex-col items-center justify-center px-6 py-20 text-center">
      <span className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">
        Error 404
      </span>

      <h1 className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-8xl font-bold tracking-tight text-transparent md:text-9xl">
        404
      </h1>

      <h2 className="mt-6 text-2xl font-bold text-text-primary md:text-3xl">
        Halaman Tidak Ditemukan
      </h2>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
        Maaf, halaman yang kamu cari tidak tersedia atau mungkin sudah dipindahkan.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 px-5 py-3 text-sm font-semibold text-white transition hover:brightness-110"
        >
          <House size={18} />
          Kembali ke Beranda
        </Link>

        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold text-text-secondary transition hover:border-orange-400 hover:text-text-primary"
        >
          <ArrowLeft size={18} />
          Halaman Sebelumnya
        </button>
      </div>
    </section>
  )
}