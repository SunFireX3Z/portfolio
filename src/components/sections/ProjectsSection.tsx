  import { Link } from 'react-router'
  import { ArrowRight } from 'lucide-react'
  import ProjectCard from '../ui/ProjectCard'
  import FeaturedProjectCard from '../ui/FeaturedProjectCard'
  import SectionBadge from '../ui/SectionBadge'
  import { featuredProjects, projects } from '../../data/projects'
  import SectionDivider from '../ui/SectionDivider'

  function ProjectsSection() {
    return (
      <section
        id="projects"
        className="relative scroll-mt-22 flex min-h-screen flex-col justify-center py-12 md:py-14">

        <SectionDivider />

        <div className="mx-auto w-full max-w-7xl space-y-8 px-6 lg:px-8">
          {/* Header section */}
          <div className="max-w-2xl space-y-3">
            <SectionBadge>Portofolio</SectionBadge>

            <h2 className="text-3xl font-bold md:text-4xl">
              Proyek Pilihan
            </h2>

            <p className="leading-7 text-text-secondary">
              Beberapa proyek yang merepresentasikan eksplorasi saya dalam
              pengembangan aplikasi dan desain antarmuka.
            </p>
          </div>

          {/* Featured projects */}
          <FeaturedProjectCard projects={featuredProjects} />

          {/* Other projects */}
          <div className="space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-text-primary">
                  Proyek Lainnya
                </h3>

                <p className="mt-1 text-sm text-text-secondary">
                  Proyek lain yang juga pernah saya kerjakan.
                </p>
              </div>

              <Link
                to="/projects"
                className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-accent"
              >
                Lihat Semua Proyek
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <ProjectCard key={project.slug} {...project} />
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  export default ProjectsSection