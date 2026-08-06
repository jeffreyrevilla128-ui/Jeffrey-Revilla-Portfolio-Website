import { useEffect, useRef, useState } from 'react'
import heroPhoto from '../../assets/images/hero-photo.png'

const technologies = [
  'Frontend',
  'Backend',
  'Databases',
  'APIs',
  'AI Integration',
]

function Hero() {
  const [activeTechnology, setActiveTechnology] = useState(0)
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement | null>(null)

  // Rotate technologies every 1.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTechnology((current) => (current + 1) % technologies.length)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  // Gentle mouse-driven parallax for the portrait and floating chip.
  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const section = sectionRef.current
    if (!section) return

    const bounds = section.getBoundingClientRect()
    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5

    setParallax({ x: relativeX, y: relativeY })
  }

  const handleMouseLeave = () => setParallax({ x: 0, y: 0 })

  const currentNumber = String(activeTechnology + 1).padStart(2, '0')
  const totalNumber = String(technologies.length).padStart(2, '0')

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-6 pb-16 pt-28 lg:px-8"
    >
      {/* ================================================== */}
      {/* Background Decoration                               */}
      {/* ================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-1/3 top-1/3 h-[30rem] w-[30rem] rounded-full bg-white/[0.03] blur-3xl" />
        <div className="absolute right-[-10rem] top-1/2 h-80 w-80 rounded-full bg-white/[0.02] blur-3xl" />

        {/* Soft orange glow, centered behind the portrait */}
        <div className="absolute left-1/2 top-1/2 h-[35rem] w-[35rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px]" />

        {/* Geometric accents */}
        <div className="absolute left-[8%] top-[16%] h-24 w-24 rotate-45 rounded-2xl border border-white/[0.06]" />
        <div className="absolute right-[8%] bottom-[12%] h-48 w-48 rounded-full border border-orange-500/[0.12]" />
        <div className="absolute right-[16%] top-[22%] h-2 w-2 rounded-full bg-orange-500/40" />
      </div>

      {/* ================================================== */}
      {/* Floating "Working Across" chip                      */}
      {/* ================================================== */}
      <div
        className="absolute right-4 top-28 z-30 hidden animate-[float_5s_ease-in-out_infinite] sm:right-8 sm:block lg:right-14"
        style={{
          transform: `translate3d(${parallax.x * 10}px, ${parallax.y * 8}px, 0)`,
          transition: 'transform 0.4s ease-out',
        }}
      >
        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-neutral-950/80 px-5 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-xl">

          {/* Accent dot */}
          <span className="relative flex h-2 w-2 shrink-0">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-500 opacity-40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
          </span>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Working across
            </p>

            <div
              key={technologies[activeTechnology]}
              className="mt-1 animate-[fadeIn_0.35s_ease-out]"
            >
              <span className="text-lg font-semibold tracking-tight text-white">
                {technologies[activeTechnology]}
              </span>
            </div>
          </div>

          <span className="ml-2 shrink-0 text-xs font-medium tabular-nums text-neutral-500">
            {currentNumber}/{totalNumber}
          </span>
        </div>

        {/* Progress indicators */}
        <div className="mt-2 flex items-center gap-1.5 px-1">
          {technologies.map((technology, index) => (
            <button
              key={technology}
              type="button"
              aria-label={`Show ${technology}`}
              aria-current={index === activeTechnology ? 'true' : undefined}
              onClick={() => setActiveTechnology(index)}
              className={`relative h-1 overflow-hidden rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950 ${
                index === activeTechnology
                  ? 'w-6 bg-white/40'
                  : 'w-1.5 bg-white/15 hover:bg-white/25'
              }`}
            >
              {index === activeTechnology && (
                <span
                  key={activeTechnology}
                  className="absolute inset-y-0 left-0 animate-[progress_1.5s_linear] rounded-full bg-orange-500"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ================================================== */}
      {/* Centered Anchored Hero Portrait Cutout              */}
      {/* ================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex justify-center"
        style={{
          transform: `translate3d(${parallax.x * -12}px, ${parallax.y * -6}px, 0)`,
          transition: 'transform 0.4s ease-out',
        }}
      >
        {/* Dark radial glow directly behind body */}
        <div className="absolute bottom-0 h-[400px] w-[500px] rounded-full bg-neutral-950/80 blur-2xl" />

        <img
          src={heroPhoto}
          alt=""
          className="relative h-[360px] w-auto object-contain object-bottom opacity-90 grayscale-[55%] sm:h-[480px] md:h-[580px] lg:h-[680px]"
        />
      </div>

      {/* ================================================== */}
      {/* Torso scrim: keeps the face clear, darkens the band  */}
      {/* behind the paragraph so it stands out                */}
      {/* ================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[42%] z-[5] h-[46%] bg-gradient-to-b from-transparent via-neutral-950/85 to-transparent"
      />

      {/* ================================================== */}
      {/* Hero Content Overlay                                */}
      {/* ================================================== */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">

        {/* Intro row: name + role label centered as a pair, with a fixed
            gap wide enough to clear the portrait's neck/shoulders without
            pushing all the way out to the edges */}
        <div className="mb-6 mt-12 flex flex-row flex-nowrap items-center justify-center gap-16 sm:mt-16 sm:gap-24 lg:mt-20 lg:gap-32 xl:mt-24">
          <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-xs">
            I&apos;m Jeffrey R. Revilla.
          </span>

          <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-xs">
            Full-Stack Web Developer
          </span>
        </div>

        {/* Headline Container */}
        <h1 className="relative mx-auto w-full max-w-4xl leading-[1.02] tracking-[-0.04em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
          <span className="block text-center text-5xl font-bold sm:text-6xl lg:text-7xl xl:text-7xl">
            I build software that{' '}
            <span className="text-neutral-300">
              solves real problems.
            </span>
          </span>
        </h1>

        {/* Introduction */}
        <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-neutral-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:text-lg">
          Practical, scalable web applications built to turn ideas into
          real solutions.
        </p>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">

          {/* Primary CTA */}
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-200"
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
            href="/resume/Jeffrey_R_Revilla_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View Jeffrey R. Revilla's resume (opens in a new tab)"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-neutral-950/70 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-neutral-950/90"
          >
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <path d="M14 2v6h6" />
              <path d="M9 15h6" />
              <path d="M9 11h1" />
            </svg>

            View My Resume
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero