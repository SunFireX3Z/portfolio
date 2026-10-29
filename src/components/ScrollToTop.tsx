import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return

    if (hash) {
      document.querySelector(hash)?.scrollIntoView({
        behavior: 'instant',
        block: 'start',
      })
      return
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    })
  }, [pathname, hash, navigationType])

  return null
}

export default ScrollToTop