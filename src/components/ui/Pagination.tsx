import { ChevronLeft, ChevronRight } from 'lucide-react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  firstItem: number
  lastItem: number
  totalItems: number
  onPageChange: (page: number) => void
}

function Pagination({
  currentPage,
  totalPages,
  firstItem,
  lastItem,
  totalItems,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) return null

  return (
    <nav
      aria-label="Navigasi halaman proyek"
      className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row"
    >
      <p className="font-general text-sm text-text-secondary">
        Menampilkan{' '}
        <span className="font-medium text-text-primary">
          {firstItem}–{lastItem}
        </span>{' '}
        dari{' '}
        <span className="font-medium text-text-primary">
          {totalItems}
        </span>{' '}
        proyek
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Halaman sebelumnya"
          className="flex size-10 items-center justify-center rounded-lg border border-white/10 text-text-secondary transition-colors hover:border-primary hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={18} />
        </button>

        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              type="button"
              onClick={() => onPageChange(page)}
              aria-label={`Halaman ${page}`}
              aria-current={currentPage === page ? 'page' : undefined}
              className={[
                'flex size-10 items-center justify-center rounded-lg border font-general text-sm font-medium transition-colors',
                currentPage === page
                  ? 'border-primary bg-linear-to-r from-primary to-accent text-white'
                  : 'border-white/10 text-text-secondary hover:border-primary hover:text-text-primary',
              ].join(' ')}
            >
              {page}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Halaman berikutnya"
          className="flex size-10 items-center justify-center rounded-lg border border-white/10 text-text-secondary transition-colors hover:border-primary hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </nav>
  )
}

export default Pagination