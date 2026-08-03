function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-neutral-950 px-6 pt-24 lg:px-8"
    >
      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-white/[0.03] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="max-w-5xl">

          {/* Availability / Label */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-green-400" />

            <span className="text-sm text-neutral-400">
              Full-Stack Developer
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="max-w-5xl text-5xl font-semibold leading-[1.05] tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
            I build software that{' '}
            <span className="text-neutral-500">
              solves real problems.
            </span>
          </h1>

          {/* Introduction */}
          <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
            I&apos;m a full-stack developer focused on building practical,
            scalable web applications—from responsive interfaces and
            reliable backend systems to databases, APIs, and
            AI-powered features.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all hover:bg-neutral-200"
            >
              View My Work
            </a>

            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white/[0.05]"
            >
              Let&apos;s Connect
            </a>
          </div>

          {/* Technology Summary */}
          <div className="mt-16 border-t border-white/10 pt-6">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-600">
              Working across
            </p>

            <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-500">
              <span>Frontend</span>
              <span>Backend</span>
              <span>Databases</span>
              <span>APIs</span>
              <span>AI Integration</span>
              <span>Computer Vision</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#about"
        aria-label="Scroll to About section"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-neutral-600 transition-colors hover:text-neutral-400 sm:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.25em]">
          Scroll
        </span>

        <span className="h-10 w-px bg-white/10" />
      </a>
    </section>
  )
}

export default Hero