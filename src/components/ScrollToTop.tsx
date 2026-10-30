import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return

    if (hash) {
      const id = decodeURIComponent(hash.slice(1))

      document.getElementById(id)?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })

      return
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [pathname, hash, navigationType])

  return null
}

export default ScrollToTop