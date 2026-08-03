import { skillCategories } from '../../data/skills'

function Skills() {
  return (
    <section
      id="skills"
      className="border-t border-white/10 bg-neutral-950 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Skills
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            The tools I use to turn ideas into working systems.
          </h2>

          <p className="mt-6 text-base leading-8 text-neutral-400 sm:text-lg">
            My skill set covers the major parts of application development,
            from building interfaces and backend services to working with
            databases and integrating intelligent features.
          </p>
        </div>

        {/* Skill Categories */}
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <article
              key={category.id}
              className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-white/20 sm:p-8"
            >
              {/* Category Header */}
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-neutral-600">
                    {String(index + 1).padStart(2, '0')}
                  </p>

                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {category.title}
                  </h3>
                </div>

                <span className="h-2 w-2 shrink-0 rounded-full bg-neutral-600 transition-colors group-hover:bg-white" />
              </div>

              {/* Category Description */}
              <p className="mt-4 text-sm leading-6 text-neutral-500">
                {category.description}
              </p>

              {/* Skills */}
              <div className="mt-8 space-y-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex items-center justify-between gap-4 border-b border-white/5 pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-neutral-300 transition-colors group-hover:text-white">
                        {skill.name}
                      </p>

                      {skill.description && (
                        <p className="mt-1 text-xs text-neutral-600">
                          {skill.description}
                        </p>
                      )}
                    </div>

                    <span className="text-neutral-700 transition-colors group-hover:text-neutral-500">
                      →
                    </span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="max-w-3xl text-sm leading-7 text-neutral-500">
            I&apos;m continuously expanding my toolkit, but I focus on
            understanding the fundamentals behind the technologies I use so
            I can adapt them to different problems and project requirements.
          </p>
        </div>

      </div>
    </section>
  )
}

export default Skills