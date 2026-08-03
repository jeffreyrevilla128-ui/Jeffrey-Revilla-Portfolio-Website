function About() {
  return (
    <section
      id="about"
      className="border-t border-white/10 bg-neutral-950 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            About Me
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            I build software around problems, not just technology.
          </h2>
        </div>

        {/* About Content */}
        <div className="mt-12 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">

          {/* Main Description */}
          <div className="space-y-6 text-base leading-8 text-neutral-400 sm:text-lg">
            <p>
              I&apos;m a full-stack developer who enjoys turning complex
              problems into practical and scalable web applications. My
              experience comes largely from building real-world projects
              where I&apos;ve worked across the frontend, backend, database,
              and application logic.
            </p>

            <p>
              Rather than focusing only on writing code, I approach
              development by first understanding the problem, the people
              using the system, and the workflow that needs to be improved.
              From there, I build solutions that connect the different
              pieces into a system that is easier to use and maintain.
            </p>

            <p>
              I&apos;ve worked on applications involving full-stack web
              development, database design, API development, AI integration,
              computer vision, and speech-to-text functionality. These
              projects have given me experience not only in implementing
              features, but also in debugging, testing, documenting, and
              refining complete systems.
            </p>
          </div>

          {/* Developer Philosophy */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.15em] text-neutral-500">
              My Approach
            </p>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-base font-medium text-white">
                  Understand the problem
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  I focus on understanding the actual workflow and
                  requirements before deciding how technology should be used.
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium text-white">
                  Build practical solutions
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  I aim to build solutions that are useful, maintainable,
                  responsive, and appropriate for the problem being solved.
                </p>
              </div>

              <div>
                <h3 className="text-base font-medium text-white">
                  Take ownership
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  I take responsibility beyond implementation, including
                  testing, debugging, documentation, and continuous
                  improvement.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Statement */}
        <div className="mt-16 border-t border-white/10 pt-8">
          <p className="max-w-4xl text-xl font-medium leading-8 tracking-tight text-white sm:text-2xl">
            My goal is simple: understand the challenge, build the right
            solution, and make technology work for the people using it.
          </p>
        </div>

      </div>
    </section>
  )
}

export default About