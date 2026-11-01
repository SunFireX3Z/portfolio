type ProjectImageProps = {
  src: string
  alt: string
  caption?: string
}

function ProjectImage({ src, alt, caption }: ProjectImageProps) {
  return (
    <figure className="my-8 space-y-3">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full rounded-xl border border-white/10"
      />

      {caption && (
        <figcaption className="font-general text-center text-sm leading-6 text-text-secondary">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

export default ProjectImage