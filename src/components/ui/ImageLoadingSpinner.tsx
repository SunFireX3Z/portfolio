type ImageLoadingSpinnerProps = {
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'size-7',
  md: 'size-11',
  lg: 'size-14',
}

function ImageLoadingSpinner({
  size = 'md',
}: ImageLoadingSpinnerProps) {
  return (
    <div
      aria-label="Memuat gambar"
      role="status"
      className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/40"
    >
      <div
        className={`relative ${sizeClasses[size]} animate-spin rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,#f97316_120deg,#fbbf24_240deg,transparent_360deg)] shadow-[0_0_18px_rgba(249,115,22,0.25)]`}
      >
        <div className="absolute inset-[3px] rounded-full bg-slate-900" />
        <div className="absolute inset-[9px] rounded-full bg-linear-to-br from-orange-500 to-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]" />
      </div>
      <span className="sr-only">Memuat gambar...</span>
    </div>
  )
}

export default ImageLoadingSpinner