import { experiences } from '../../data/experience'

function Experience() {
  return (
    <section
      id="experience"
      className="border-t border-white/10 bg-neutral-950 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Experience
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            What I&apos;ve worked on and contributed to.
          </h2>

          <p className="mt-6 text-base leading-8 text-neutral-400 sm:text-lg">
            My development experience has primarily come from building
            complete applications, taking responsibility for both the
            technical implementation and the problems each system was
            designed to solve.
          </p>
        </div>

        {/* Experience List */}
        <div className="mt-16 space-y-8">
          {experiences.map((experience, index) => (
            <article
              key={experience.id}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 sm:p-8 lg:p-10"
            >
              {/* Experience Number */}
              <div className="absolute right-6 top-6 text-5xl font-semibold tracking-tighter text-white/[0.04] sm:right-8 sm:top-8 lg:right-10 lg:top-10">
                {String(index + 1).padStart(2, '0')}
              </div>

              <div className="relative">

                {/* Header */}
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
                      {experience.type}
                    </p>

                    <h3 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                      {experience.title}
                    </h3>

                    <p className="mt-2 text-sm text-neutral-400">
                      {experience.organization}
                    </p>
                  </div>

                  <div className="lg:text-right">
                    <p className="text-sm font-medium text-neutral-300">
                      {experience.role}
                    </p>

                    <p className="mt-1 text-sm text-neutral-500">
                      {experience.period}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-8 max-w-4xl text-base leading-7 text-neutral-400">
                  {experience.description}
                </p>

                {/* Responsibilities + Technologies */}
                <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_0.35fr]">

                  {/* Responsibilities */}
                  <div>
                    <h4 className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
                      Responsibilities
                    </h4>

                    <ul className="mt-5 space-y-3">
                      {experience.responsibilities.map(
                        (responsibility) => (
                          <li
                            key={responsibility}
                            className="flex gap-3 text-sm leading-6 text-neutral-400"
                          >
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neutral-500" />

                            <span>{responsibility}</span>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
                      Technologies
                    </h4>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {experience.technologies.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-neutral-400 transition-colors group-hover:border-white/15 group-hover:text-neutral-300"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Experience