import type { ComponentType } from 'react'

export type Project = {
  slug: string
  title: string
  publish: boolean
  featured: boolean
  description: string
  image: string | null
  category: string
  projectType: string
  startDate: string | null
  technologies: string[]
  role: string | null
  duration: string | null
  status: string | null
  details: string | null
  demoLink: string | null
  Content: ComponentType
}