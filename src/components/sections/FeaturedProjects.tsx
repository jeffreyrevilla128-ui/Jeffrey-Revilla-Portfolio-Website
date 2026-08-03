import { projects } from '../../data/projects'

function FeaturedProjects() {
  const featuredProjects = projects.filter(
    (project) => project.featured,
  )

  return (
    <section
      id="projects"
      className="border-t border-white/10 bg-neutral-950 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
              Featured Projects
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Systems I&apos;ve built to solve real problems.
            </h2>

            <p className="mt-6 text-base leading-8 text-neutral-400 sm:text-lg">
              A selection of projects where I&apos;ve worked across frontend,
              backend, databases, and intelligent application features to
              turn ideas and requirements into working systems.
            </p>
          </div>

          <a
            href="#contact"
            className="shrink-0 text-sm font-medium text-white transition-colors hover:text-neutral-400"
          >
            Let&apos;s work together →
          </a>
        </div>

        {/* Project List */}
        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <article
              key={project.id}
              className={`group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 ${
                index === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Project Image */}
              <div
                className={`relative overflow-hidden bg-neutral-900 ${
                  index === 0
                    ? 'aspect-[2/1]'
                    : 'aspect-[16/10]'
                }`}
              >
                <img
                  src={project.image}
                  alt={`${project.title} project preview`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-80" />

                {/* Project Number */}
                <span className="absolute right-5 top-5 text-4xl font-semibold tracking-tighter text-white/20">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Project Content */}
              <div className="p-6 sm:p-8">
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

                <p className="mt-5 text-sm leading-7 text-neutral-400 sm:text-base">
                  {project.shortDescription}
                </p>

                {/* Technologies */}
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-neutral-400 transition-colors group-hover:border-white/15 group-hover:text-neutral-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                {(project.github || project.liveDemo) && (
                  <div className="mt-8 flex items-center gap-5">
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
          ))}
        </div>

      </div>
    </section>
  )
}

export default FeaturedProjects