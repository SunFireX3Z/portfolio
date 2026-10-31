import { createElement, type ElementType } from 'react'
import BrandIcon from '@/components/ui/BrandIcon'

import AffinityImage from '@/assets/icons/technologies/affinity.svg?url'
import CanvaImage from '@/assets/icons/technologies/canva.svg?url'
import ChatGPTImage from '@/assets/icons/technologies/chatgpt.svg?url'
import CSSImage from '@/assets/icons/technologies/css.svg?url'
import FigmaImage from '@/assets/icons/technologies/figma.svg?url'
import GeminiImage from '@/assets/icons/technologies/gemini.svg?url'
import GitImage from '@/assets/icons/technologies/git.svg?url'
import GitHubImage from '@/assets/icons/technologies/github.svg?url'
import GitHubCopilotImage from '@/assets/icons/technologies/github-copilot.svg?url'
import HTMLImage from '@/assets/icons/technologies/html5.svg?url'
import JavaScriptImage from '@/assets/icons/technologies/javascript.svg?url'
import PHPImage from '@/assets/icons/technologies/php.svg?url'
import ReactImage from '@/assets/icons/technologies/reactjs.svg?url'
import TailwindImage from '@/assets/icons/technologies/tailwind.svg?url'
import TypeScriptImage from '@/assets/icons/technologies/typescript.svg?url'
import VSCodeImage from '@/assets/icons/technologies/vscode.svg?url'

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

type LocalBrandIconProps = {
  className?: string
}

const createBrandIcon = (src: string, alt: string) => {
  function LocalBrandIcon({ className = 'size-7' }: LocalBrandIconProps) {
    return createElement(BrandIcon, {
      src,
      alt,
      className,
    })
  }

  LocalBrandIcon.displayName = `${alt.replace(/\s+/g, '')}Icon`

  return LocalBrandIcon
}

const AffinityBrandIcon = createBrandIcon(AffinityImage, 'Affinity')
const CanvaBrandIcon = createBrandIcon(CanvaImage, 'Canva')
const ChatGPTBrandIcon = createBrandIcon(ChatGPTImage, 'ChatGPT')
const CSSBrandIcon = createBrandIcon(CSSImage, 'CSS')
const FigmaBrandIcon = createBrandIcon(FigmaImage, 'Figma')
const GeminiBrandIcon = createBrandIcon(GeminiImage, 'Gemini')
const GitBrandIcon = createBrandIcon(GitImage, 'Git')
const GitHubBrandIcon = createBrandIcon(GitHubImage, 'GitHub')
const GitHubCopilotBrandIcon = createBrandIcon(
  GitHubCopilotImage,
  'GitHub Copilot',
)
const HTMLBrandIcon = createBrandIcon(HTMLImage, 'HTML')
const JavaScriptBrandIcon = createBrandIcon(JavaScriptImage, 'JavaScript')
const PHPBrandIcon = createBrandIcon(PHPImage, 'PHP')
const ReactBrandIcon = createBrandIcon(ReactImage, 'React')
const TailwindBrandIcon = createBrandIcon(TailwindImage, 'Tailwind CSS')
const TypeScriptBrandIcon = createBrandIcon(TypeScriptImage, 'TypeScript')
const VSCodeBrandIcon = createBrandIcon(VSCodeImage, 'Visual Studio Code')

export const technologies: Technology[] = [
  {
    name: 'HTML',
    Icon: HTMLBrandIcon,
    category: 'Frontend',
    iconColor: '#E34F26',
  },
  {
    name: 'Tailwind CSS',
    Icon: TailwindBrandIcon,
    category: 'Penataan Tampilan',
    iconColor: '#06B6D4',
  },
  {
    name: 'CSS',
    Icon: CSSBrandIcon,
    category: 'Penataan Tampilan',
    iconColor: '#06B6D4',
  },
  {
    name: 'JavaScript',
    Icon: JavaScriptBrandIcon,
    category: 'Bahasa Pemrograman',
    iconColor: '#F7DF1E',
  },
  {
    name: 'TypeScript',
    Icon: TypeScriptBrandIcon,
    category: 'Bahasa Pemrograman',
    iconColor: '#3178C6',
  },
  {
    name: 'React',
    Icon: ReactBrandIcon,
    category: 'Frontend',
    iconColor: '#61DAFB',
  },
  {
    name: 'PHP',
    Icon: PHPBrandIcon,
    category: 'Bahasa Pemrograman',
    iconColor: '#777BB4',
  },
  {
    name: 'Git',
    Icon: GitBrandIcon,
    category: 'Version Control',
    iconColor: '#F05032',
  },
  {
    name: 'GitHub',
    Icon: GitHubBrandIcon,
    category: 'Version Control',
    iconColor: '#FFFFFF',
  },
  {
    name: 'Affinity',
    Icon: AffinityBrandIcon,
    category: 'Desain Grafis',
    nameColor: '#C8F31D',
  },
  {
    name: 'Canva',
    Icon: CanvaBrandIcon,
    category: 'Desain Grafis',
    iconColor: '#00C4CC',
  },
  {
    name: 'Figma',
    Icon: FigmaBrandIcon,
    category: 'Desain UI/UX',
    iconColor: '#F24E1E',
  },
  {
    name: 'ChatGPT',
    Icon: ChatGPTBrandIcon,
    category: 'Asisten AI',
    iconColor: '#74AA9C',
  },
  {
    name: 'Gemini',
    Icon: GeminiBrandIcon,
    category: 'Asisten AI',
    iconColor: '#8E75B2',
  },
  {
    name: 'GitHub Copilot',
    Icon: GitHubCopilotBrandIcon,
    category: 'Asisten AI',
    iconColor: '#FFFFFF',
  },
  {
    name: 'Visual Studio Code',
    Icon: VSCodeBrandIcon,
    category: 'Editor Kode',
    iconColor: '#007ACC',
  },
]