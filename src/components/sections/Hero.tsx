import { useEffect, useState } from 'react'

const technologies = [
  'Frontend',
  'Backend',
  'Databases',
  'APIs',
  'AI Integration',
]

function Hero() {
  const [activeTechnology, setActiveTechnology] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // Rotate technologies every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTechnology((current) => (current + 1) % technologies.length)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  const currentNumber = String(activeTechnology + 1).padStart(2, '0')
  const totalNumber = String(technologies.length).padStart(2, '0')

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-neutral-950 px-6 py-24 lg:px-8"
    >
      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/3 top-1/3 h-[30rem] w-[30rem] rounded-full bg-white/[0.03] blur-3xl" />

        <div className="absolute right-[-10rem] top-1/2 h-80 w-80 rounded-full bg-white/[0.02] blur-3xl" />
      </div>

      {/* Hero Content */}
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 lg:grid-cols-[7fr_3fr] lg:gap-16">

        {/* ================================================== */}
        {/* LEFT SIDE */}
        {/* ================================================== */}

        <div className="max-w-4xl">

          {/* Availability / Label */}
          <div className="group mb-8 inline-flex cursor-default items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.05]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />

              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>

            <span className="text-sm text-neutral-400 transition-colors duration-300 group-hover:text-neutral-300">
              Full-Stack Developer
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="max-w-4xl leading-[1.05] tracking-[-0.04em] text-white">
            <span className="block text-2xl font-medium tracking-[-0.02em] text-neutral-300 sm:text-3xl lg:text-4xl">
              I&apos;m Jeffrey R. Revilla.
            </span>

            <span className="mt-3 block text-5xl font-semibold sm:text-6xl lg:text-7xl">
              I build software that{' '}
              <span className="text-neutral-500">
                solves real problems.
              </span>
            </span>
          </h1>

          {/* Introduction */}
          <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
            Practical, scalable web applications built to turn ideas into
            real solutions.
          </p>

          {/* Actions */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            {/* Primary CTA */}
            <a
              href="#projects"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-200"
            >
              View My Work

              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/[0.05]"
            >
              Let&apos;s Connect
            </a>
          </div>
        </div>

        {/* ================================================== */}
        {/* RIGHT SIDE — WORKING ACROSS */}
        {/* ================================================== */}

        <div className="relative w-full">

          <div
            className={`relative overflow-hidden rounded-3xl bg-neutral-100 p-8 shadow-2xl transition-all duration-500 sm:p-10 md:p-12 lg:p-12 ${
              isHovered
                ? '-translate-y-1 shadow-[0_25px_60px_rgba(255,255,255,0.08)]'
                : ''
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >

            {/* Card Header */}
            <div className="flex items-start justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">
                Working across
              </p>

              <span className="text-xs font-medium tabular-nums text-neutral-400">
                {currentNumber} / {totalNumber}
              </span>
            </div>

            {/* Technology Display */}
            <div className="mt-8 flex min-h-[clamp(9rem,16vw,13.5rem)] items-center md:mt-10">
              <div
                key={technologies[activeTechnology]}
                className="w-full animate-[fadeIn_0.35s_ease-out]"
              >
                <span
                  className="
                    block
                    max-w-full
                    whitespace-nowrap
                    text-[clamp(2.75rem,6vw,5rem)]
                    font-semibold
                    leading-[0.95]
                    tracking-[-0.045em]
                    text-neutral-950
                    md:text-[clamp(3.25rem,5.5vw,5.5rem)]
                    lg:text-[clamp(3rem,4vw,4.5rem)]
                  "
                >
                  {technologies[activeTechnology]}
                </span>

                {/* Dynamic Underline */}
                <span className="mt-5 block h-1 w-[clamp(2rem,4vw,3rem)] rounded-full bg-neutral-950 md:mt-6" />
              </div>
            </div>

            {/* Progress Indicators */}
            <div className="mt-5 flex items-center gap-2 md:mt-7">
              {technologies.map((technology, index) => (
                <button
                  key={technology}
                  type="button"
                  aria-label={`Show ${technology}`}
                  aria-current={
                    index === activeTechnology ? 'true' : undefined
                  }
                  onClick={() => setActiveTechnology(index)}
                  className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 focus-visible:ring-offset-2 ${
                    index === activeTechnology
                      ? 'w-10 bg-neutral-200'
                      : 'w-2 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                >
                  {index === activeTechnology && (
                    <span
                      key={activeTechnology}
                      className="absolute inset-y-0 left-0 animate-[progress_1.5s_linear] rounded-full bg-neutral-950"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Card Footer */}
            <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-5 md:mt-7">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-400">
                Full-Stack Development
              </span>

              <span
                aria-hidden="true"
                className={`text-sm text-neutral-400 transition-transform duration-300 ${
                  isHovered ? 'translate-x-1' : ''
                }`}
              >
                →
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero