import type { Project } from './project-types'

export type { Project } from './project-types'

type ProjectModule = {
  frontmatter: Omit<Project, 'Content'>
  default: Project['Content']
}

// Membaca seluruh index.mdx di dalam folder kategori dan proyek.
const modules = import.meta.glob<ProjectModule>(
  './**/index.mdx',
  {
    eager: true,
  },
)

// Membaca gambar dari seluruh subfolder proyek.
const imageModules = import.meta.glob<string>(
  './**/*.{webp,png,jpg,jpeg,avif,svg}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
)

const allProjects: Project[] = Object.entries(modules).map(
  ([path, module]) => {
    // Mendapatkan lokasi folder proyek.
    const folder = path.replace(/\/index\.mdx$/, '')

    // Mendapatkan nama gambar dari frontmatter.
    const imageName = module.frontmatter.image

    // Membentuk path gambar berdasarkan folder proyek.
    const imagePath = imageName
      ? `${folder}/${imageName.replace(/^\.\/+/, '')}`
      : null

    return {
      ...module.frontmatter,
      image: imagePath ? imageModules[imagePath] ?? null : null,
      Content: module.default,
    }
  },
)

console.log('Project modules:', Object.keys(modules))
console.log('Loaded projects:', allProjects)

export const publishedProjects = allProjects.filter(
  (project) => project.publish,
)

export const featuredProjects = publishedProjects.filter(
  (project) => project.featured,
)

export const projects = publishedProjects.filter(
  (project) => !project.featured,
)