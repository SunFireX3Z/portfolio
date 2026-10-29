import { useEffect, useState } from 'react'

function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(
    sectionIds[0] ?? '',
  )

  useEffect(() => {
    if (sectionIds.length === 0) {
      setActiveSection('')
      return
    }

    let ticking = false

    const updateActiveSection = () => {
      const offset = 140
      const sections = sectionIds
        .map((id) => document.getElementById(id))
        .filter((section): section is HTMLElement => section !== null)
        .map((section) => ({
          id: section.id,
          top: section.getBoundingClientRect().top,
        }))
        .sort((a, b) => a.top - b.top)

      if (sections.length === 0) {
        setActiveSection('')
        ticking = false
        return
      }

      const pageBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2

      if (pageBottom) {
        setActiveSection(sections[sections.length - 1].id)
        ticking = false
        return
      }

      const currentSection = sections.findLast(
        (section) => section.top <= offset,
      )

      setActiveSection(currentSection?.id ?? sections[0].id)
      ticking = false
    }

    const handleScroll = () => {
      if (ticking) return

      ticking = true
      window.requestAnimationFrame(updateActiveSection)
    }

    updateActiveSection()

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [sectionIds.join('|')])

  return activeSection
}

export default useActiveSection