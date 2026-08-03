import type { Project } from '../../data/projects'

interface ProjectCardProps {
  project: Project
  featured?: boolean
  index?: number
}

function ProjectCard({
  project,
  featured = false,
  index = 0,
}: ProjectCardProps) {
  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${
        featured ? 'lg:col-span-2' : ''
      }`}
    >
      {/* Project Image */}
      <div
        className={`relative overflow-hidden bg-neutral-900 ${
          featured ? 'aspect-[2/1]' : 'aspect-[16/10]'
        }`}
      >
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Image Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-80" />

        {/* Project Number */}
        <span className="absolute right-5 top-5 text-4xl font-semibold tracking-tighter text-white/20">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Project Information */}
      <div className="p-6 sm:p-8">

        {/* Project Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-500">
              {project.category}
            </p>

            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white">
              {project.title}
            </h3>
          </div>

          <span className="shrink-0 text-sm text-neutral-500">
            {project.role}
          </span>
        </div>

        {/* Description */}
        <p className="mt-5 text-sm leading-7 text-neutral-400 sm:text-base">
          {project.shortDescription}
        </p>

        {/* Technologies */}
        <div className="mt-6 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-1.5 text-xs text-neutral-400 transition-colors group-hover:border-white/15 group-hover:text-neutral-300"
            >
              {technology}
            </span>
          ))}
        </div>

        {/* Project Links */}
        {(project.github || project.liveDemo) && (
          <div className="mt-8 flex flex-wrap items-center gap-5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white transition-colors hover:text-neutral-400"
              >
                GitHub →
              </a>
            )}

            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white transition-colors hover:text-neutral-400"
              >
                Live Demo →
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default ProjectCard