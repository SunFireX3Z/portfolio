import type { ElementType } from 'react'
import {
  SiHtml5,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiPhp,
  SiFigma,
} from 'react-icons/si'
import { AffinityIcon } from 'blode-icons-react'

export type SkillCategory = {
  number: string
  title: string
  description: string
  skills: string[]
  accent: 'orange' | 'amber'
}

export type Technology = {
  name: string
  Icon: ElementType
  category: string
  iconColor?: string
  nameColor?: string
}

export const skillCategories: SkillCategory[] = [
  {
    number: '01',
    title: 'Frontend Development',
    description:
      'Membangun antarmuka web dengan fokus pada struktur, tampilan, dan pengalaman pengguna.',
    skills: ['HTML', 'Tailwind CSS', 'JavaScript', 'TypeScript', 'React'],
    accent: 'orange',
  },
  {
    number: '02',
    title: 'Desain Grafis',
    description:
      'Mengolah elemen visual, komposisi, dan tipografi untuk menyampaikan informasi secara menarik dan jelas.',
    skills: ['Komposisi', 'Tipografi', 'Teori Warna', 'Desain Visual'],
    accent: 'amber',
  },
  {
    number: '03',
    title: 'UI/UX Design',
    description:
      'Merancang antarmuka dan menyusun elemen visual agar informasi lebih jelas dan mudah dipahami.',
    skills: ['Figma', 'Layout', 'Typography', 'Visual Hierarchy'],
    accent: 'orange',
  },
]

export const technologies: Technology[] = [
  {
    name: 'HTML',
    Icon: SiHtml5,
    category: 'Frontend',
    iconColor: '#E34F26',
  },
  {
    name: 'Tailwind CSS',
    Icon: SiTailwindcss,
    category: 'Penataan Tampilan',
    iconColor: '#06B6D4',
  },
  {
    name: 'JavaScript',
    Icon: SiJavascript,
    category: 'Bahasa Pemrograman',
    iconColor: '#F7DF1E',
  },
  {
    name: 'TypeScript',
    Icon: SiTypescript,
    category: 'Bahasa Pemrograman',
    iconColor: '#3178C6',
  },
  {
    name: 'React',
    Icon: SiReact,
    category: 'Frontend',
    iconColor: '#61DAFB',
  },
  {
    name: 'PHP',
    Icon: SiPhp,
    category: 'Bahasa Pemrograman',
    iconColor: '#777BB4',
  },
  {
    name: 'Affinity',
    Icon: AffinityIcon,
    category: 'Desain Grafis',
    nameColor: '#C8F31D',
  },
  {
    name: 'Figma',
    Icon: SiFigma,
    category: 'Desain UI/UX',
    iconColor: '#F24E1E',
  },
]