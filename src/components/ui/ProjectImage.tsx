import ImageLoadingSpinner from '@/components/ui/ImageLoadingSpinner'
import useImageLoading from '@/hooks/useImageLoading'

type ProjectImageProps = {
  src: string
  alt: string
  caption?: string
}

function ProjectImage({ src, alt, caption }: ProjectImageProps) {
  const { imageRef, isLoading, isLoaded, hasError } =
    useImageLoading(src)

  return (
    <figure className="my-8 space-y-3">
      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-slate-900">
        {isLoading && !hasError && <ImageLoadingSpinner />}

        {hasError ? (
          <div className="flex min-h-40 items-center justify-center font-general text-sm text-text-secondary">
            Gambar gagal dimuat
          </div>
        ) : (
          <img
            ref={imageRef}
            src={src}
            alt={alt}
            loading="lazy"
            className={`block w-full transition-opacity duration-500 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}
      </div>

      {caption && (
        <figcaption className="font-general text-center text-sm leading-6 text-text-secondary">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default ProjectImage