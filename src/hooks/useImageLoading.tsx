import { useEffect, useRef, useState } from 'react'

type ImageStatus = 'loading' | 'loaded' | 'error'

function useImageLoading(src: string) {
  const imageRef = useRef<HTMLImageElement>(null)
  const [status, setStatus] = useState<ImageStatus>('loading')

  useEffect(() => {
    const image = imageRef.current

    setStatus('loading')

    if (!image) return

    function handleLoad() {
      setStatus('loaded')
    }

    function handleError() {
      setStatus('error')
    }

    image.addEventListener('load', handleLoad)
    image.addEventListener('error', handleError)

    // Menangani gambar yang sudah selesai dimuat dari cache.
    if (image.complete) {
      if (image.naturalWidth > 0) {
        handleLoad()
      } else {
        handleError()
      }
    }

    return () => {
      image.removeEventListener('load', handleLoad)
      image.removeEventListener('error', handleError)
    }
  }, [src])

  return {
    imageRef,
    isLoading: status === 'loading',
    isLoaded: status === 'loaded',
    hasError: status === 'error',
  }
}

export default useImageLoading