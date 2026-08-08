import { useRef, useState } from 'react'
import heroPhoto from '../../assets/images/hero-photo.png'

function Hero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement | null>(null)

  // Gentle mouse-driven parallax for the portrait and ambient light.
  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const section = sectionRef.current
    if (!section) return

    const bounds = section.getBoundingClientRect()
    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5

    setParallax({ x: relativeX, y: relativeY })
  }

  const handleMouseLeave = () => setParallax({ x: 0, y: 0 })

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-950 px-6 pb-10 pt-20 sm:pb-16 sm:pt-28 lg:px-8"
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

        {/* Burnt-orange ambient glow behind the portrait — removed for
            now. Geometric ring below still carries the accent color. */}

        {/* Geometric accents: one neutral, one carrying the burnt-orange
            signature at low opacity as a quiet section marker */}
        <div className="absolute left-[8%] top-[16%] h-24 w-24 rotate-45 rounded-2xl border border-white/[0.06]" />
        <div className="absolute right-[8%] bottom-[12%] h-48 w-48 rounded-full border border-[#C2542C]/[0.28]" />
      </div>

      {/* ================================================== */}
      {/* Centered Anchored Hero Portrait Cutout              */}
      {/* ================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex items-start justify-center overflow-hidden h-[108vh] max-h-[920px] min-h-[620px] sm:h-auto sm:max-h-none sm:min-h-0 sm:items-stretch sm:overflow-visible"
        style={{
          transform: `translate3d(${parallax.x * -12}px, ${parallax.y * -6}px, 0)`,
          transition: 'transform 0.4s ease-out',
        }}
      >
        {/* Ambient moving light, sits behind the dark vignette so it
            only ever reads as a soft, slow-drifting highlight */}
        <div className="absolute bottom-0 h-[460px] w-[640px] rounded-full bg-white blur-[110px] animate-[heroLightDrift_10s_ease-in-out_infinite]" />

        {/* Dark radial glow directly behind body */}
        <div className="absolute bottom-0 h-[400px] w-[500px] rounded-full bg-neutral-950/80 blur-2xl" />

        {/* On mobile the image is deliberately taller than its crop
            window above, so it overflows out the bottom and gets
            clipped — showing only the head/upper-half of the body,
            legs excluded. Untouched from sm: up. */}
        <img
          src={heroPhoto}
          alt=""
          className="relative h-[216vh] max-h-[1840px] min-h-[1240px] w-auto object-contain object-top opacity-90 grayscale-[55%] sm:h-[480px] sm:max-h-none sm:min-h-0 sm:object-bottom md:h-[580px] lg:h-[680px]"
        />
      </div>

      {/* Keyframes for the ambient light drift behind the portrait.
          Self-contained here so it doesn't depend on tailwind.config.js. */}
      <style>{`
        @keyframes heroLightDrift {
          0%, 100% {
            transform: translateX(-60px) scale(0.94);
            opacity: 0.04;
          }
          50% {
            transform: translateX(60px) scale(1.06);
            opacity: 0.1;
          }
        }
      `}</style>

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
        <div className="mb-4 mt-8 flex flex-row flex-nowrap items-center justify-center gap-10 sm:mb-6 sm:mt-16 sm:gap-24 lg:mt-20 lg:gap-32 xl:mt-24">
          <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-xs">
            I&apos;m Jeffrey R. Revilla.
          </span>

          <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-xs">
            Full-Stack Web Developer
          </span>
        </div>

        {/* Headline Container */}
        <h1 className="relative mx-auto w-full max-w-4xl leading-[1.02] tracking-[-0.04em] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
          <span className="block text-center text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl">
            I build software that{' '}
            <span className="text-neutral-300">
              solves real problems.
            </span>
          </span>
        </h1>

        {/* Introduction */}
        <p className="mt-4 max-w-xl text-base font-medium leading-relaxed text-neutral-200 drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)] sm:mt-6 sm:text-lg">
          Practical, scalable web applications built to turn ideas into
          real solutions.
        </p>

        {/* Actions */}
        <div className="mt-6 flex flex-col gap-4 sm:mt-8 sm:flex-row">

          {/* Primary CTA */}
          <a
            href="#projects"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-200 hover:shadow-[0_12px_32px_rgba(194,84,44,0.22)]"
          >
            View My Work

            <span
              aria-hidden="true"
              className="transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#C2542C]"
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
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-neutral-950/70 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#C2542C]/40 hover:bg-neutral-950/90 hover:shadow-[0_12px_32px_rgba(194,84,44,0.16)]"
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
              className="shrink-0 transition-colors duration-300 group-hover:text-[#D97B44]"
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