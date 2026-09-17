import { useRef, useState } from 'react'
import heroPhoto from '../../assets/images/hero-photo.png'

function Hero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement | null>(null)

  // Gentle mouse-driven parallax for the portrait, ambient light, and the
  // interactive grid glow below. relativeX/Y stay in -0.5..0.5 (used for
  // translate3d math on the portrait); cursorX/Y are the same position
  // reprojected to 0%..100% so the grid glow can track it via CSS vars.
  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const section = sectionRef.current
    if (!section) return

    const bounds = section.getBoundingClientRect()
    const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5
    const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5

    setParallax({ x: relativeX, y: relativeY })
  }

  const handleMouseLeave = () => setParallax({ x: 0, y: 0 })

  const cursorX = `${(parallax.x + 0.5) * 100}%`
  const cursorY = `${(parallax.y + 0.5) * 100}%`

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative flex min-h-screen items-start justify-center overflow-hidden bg-neutral-950 px-6 pb-10 pt-40 sm:items-center sm:pb-16 sm:pt-28 lg:px-8"
      style={{ ['--cursor-x' as string]: cursorX, ['--cursor-y' as string]: cursorY }}
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

        {/* Caustic light accent — two soft, blurred accent-color blobs
            drifting on slow independent loops, blended additively so
            they read as warm light drifting through the scene rather
            than flat colored shapes. Same treatment as the Featured
            Projects hover overlay, re-tuned to run continuously here
            (no hover state to key off in the hero) at low enough
            opacity to sit as an ambient layer alongside the plain
            white orbs above rather than compete with them. */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ mixBlendMode: 'screen' }}
        >
          <div
            className="absolute left-[6%] top-[8%] h-[26rem] w-[26rem] rounded-full opacity-[0.055] blur-3xl [animation:heroCausticDriftA_17s_ease-in-out_infinite]"
            style={{
              background: 'radial-gradient(circle, rgba(232,131,78,1), transparent 70%)',
            }}
          />
          <div
            className="absolute right-[4%] bottom-[10%] h-[24rem] w-[24rem] rounded-full opacity-[0.05] blur-3xl [animation:heroCausticDriftB_20s_ease-in-out_infinite]"
            style={{
              background: 'radial-gradient(circle, rgba(194,84,44,1), transparent 70%)',
            }}
          />
        </div>

        {/* Faint dot grid, always present at very low opacity — reads as
            circuitry/blueprint texture rather than decoration */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Same dot grid, lit in the accent gradient, but only revealed
            in a soft circle that follows the cursor. Two mask layers
            (the repeating dot shape, and the cursor spotlight) are
            intersected so only nearby dots ever light up. */}
        <div
          className="absolute inset-0 hidden transition-opacity duration-500 sm:block"
          style={{
            opacity: 0.9,
            backgroundImage: 'linear-gradient(135deg, #E8834E, #C2542C)',
            WebkitMaskImage:
              'radial-gradient(rgba(0,0,0,1) 1px, transparent 1.5px), radial-gradient(420px circle at var(--cursor-x) var(--cursor-y), rgba(0,0,0,1), transparent 72%)',
            WebkitMaskSize: '28px 28px, 100% 100%',
            WebkitMaskRepeat: 'repeat, no-repeat',
            WebkitMaskComposite: 'source-in',
            maskImage:
              'radial-gradient(rgba(0,0,0,1) 1px, transparent 1.5px), radial-gradient(420px circle at var(--cursor-x) var(--cursor-y), rgba(0,0,0,1), transparent 72%)',
            maskSize: '28px 28px, 100% 100%',
            maskRepeat: 'repeat, no-repeat',
            maskComposite: 'intersect',
          }}
        />

        {/* Soft ambient wash of the accent gradient, centered on the
            cursor — barely-there warmth, not a spotlight */}
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              'radial-gradient(600px circle at var(--cursor-x) var(--cursor-y), rgba(232,131,78,0.06), transparent 70%)',
          }}
        />

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
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 flex items-start justify-center overflow-hidden h-[88vh] max-h-[760px] min-h-[540px] pt-[27vh] sm:h-auto sm:max-h-none sm:min-h-0 sm:pt-0 sm:items-stretch sm:overflow-visible"
      >
        {/* Ambient moving light, sits behind the dark vignette so it
            only ever reads as a soft, slow-drifting highlight */}
        <div className="absolute bottom-0 h-[460px] w-[640px] rounded-full bg-white blur-[110px] animate-[heroLightDrift_10s_ease-in-out_infinite]" />

        {/* Dark radial glow directly behind body */}
        <div className="absolute bottom-0 h-[400px] w-[500px] rounded-full bg-neutral-950/80 blur-2xl" />

        {/* Ghost layer: a heavily blurred duplicate of the portrait,
            offset and trailing the real one at a slower rate, so
            cursor movement reads as parallax depth rather than a flat
            cutout sliding around */}
        <img
          src={heroPhoto}
          alt=""
          className="absolute h-[138vh] max-h-[1180px] min-h-[820px] w-auto object-contain object-top opacity-30 blur-2xl grayscale-[45%] saturate-[1.1] sm:h-[480px] sm:max-h-none sm:min-h-0 sm:object-bottom md:h-[580px] lg:h-[680px]"
          style={{
            transform: `translate3d(${parallax.x * -20}px, ${parallax.y * -10}px, 0) scale(1.04)`,
            transition: 'transform 0.5s ease-out',
          }}
        />

        {/* On mobile the image is deliberately taller than its crop
            window above, so it overflows out the bottom and gets
            clipped — showing only the head/upper-half of the body,
            legs excluded. Untouched from sm: up. */}
        <img
          src={heroPhoto}
          alt=""
          className="relative h-[138vh] max-h-[1180px] min-h-[820px] w-auto object-contain object-top opacity-95 saturate-[1.15] contrast-[1.05] brightness-[1.02] sepia-[0.06] sm:h-[480px] sm:max-h-none sm:min-h-0 sm:object-bottom md:h-[580px] lg:h-[680px]"
          style={{
            transform: `translate3d(${parallax.x * -12}px, ${parallax.y * -6}px, 0)`,
            transition: 'transform 0.4s ease-out',
          }}
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
        @keyframes heroCausticDriftA {
          0%   { transform: translate(-6%, -4%) scale(1); }
          33%  { transform: translate(5%, 4%) scale(1.15); }
          66%  { transform: translate(-3%, 6%) scale(0.92); }
          100% { transform: translate(-6%, -4%) scale(1); }
        }
        @keyframes heroCausticDriftB {
          0%   { transform: translate(5%, 6%) scale(1); }
          50%  { transform: translate(-8%, -3%) scale(1.18); }
          100% { transform: translate(5%, 6%) scale(1); }
        }
      `}</style>

      {/* ================================================== */}
      {/* Torso scrim: keeps the face clear, darkens the band  */}
      {/* behind the paragraph so it stands out                */}
      {/* ================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-[36%] z-[5] hidden h-[56%] bg-gradient-to-b from-transparent via-neutral-950/90 to-transparent sm:block sm:top-[42%] sm:h-[46%] sm:via-neutral-950/85"
      />

      {/* ================================================== */}
      {/* Hero Content Overlay                                */}
      {/* ================================================== */}
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center text-center">

        {/* Intro row: name + role label centered as a pair, with a fixed
            gap wide enough to clear the portrait's neck/shoulders without
            pushing all the way out to the edges */}
        <div className="mb-1 mt-0 flex flex-col items-center justify-center gap-1.5 sm:mb-6 sm:mt-16 sm:flex-row sm:flex-nowrap sm:gap-24 lg:mt-20 lg:gap-32 xl:mt-24">
          <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-xs">
            I&apos;m Jeffrey R. Revilla.
          </span>

          <span className="whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500 sm:text-xs">
            Full-Stack Web Developer
          </span>
        </div>

        {/* Headline Container */}
        <h1 className="relative mx-auto w-full max-w-4xl leading-[1.02] tracking-[-0.04em] text-white drop-shadow-none sm:drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
          <span className="block text-center text-3xl font-bold sm:text-5xl md:text-6xl lg:text-7xl xl:text-7xl">
            I build software that{' '}
            <span className="bg-gradient-to-r from-[#F0A06E] via-[#E8834E] to-[#C2542C] bg-clip-text text-transparent">
              solves real problems.
            </span>
          </span>
        </h1>

        {/* Introduction */}
        <p className="mt-1 max-w-xl text-base font-medium leading-relaxed text-neutral-200 drop-shadow-none sm:mt-6 sm:text-lg sm:drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Practical, scalable web applications built to turn ideas into
          real solutions.
        </p>

        {/* Actions */}
        <div className="mt-2 flex flex-col gap-4 sm:mt-8 sm:flex-row">

          {/* Primary CTA */}
          <a
            href="#projects"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-neutral-200 hover:shadow-[0_12px_36px_rgba(232,131,78,0.28)] sm:w-auto"
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
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-neutral-950/70 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E8834E]/50 hover:bg-neutral-950/90 hover:shadow-[0_12px_36px_rgba(232,131,78,0.22)] sm:w-auto"
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
              className="shrink-0 transition-colors duration-300 group-hover:text-[#E8834E]"
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

      {/* ================================================== */}
      {/* Scroll-down indicator                                */}
      {/* ================================================== */}
      <a
        href="#about"
        aria-label="Scroll down"
        className="group absolute bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-neutral-950/70 text-white shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-[#E8834E]/50 hover:bg-neutral-950/90 animate-[heroScrollBounce_2.2s_ease-in-out_infinite] sm:h-14 sm:w-14"
      >
        <svg
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="transition-colors duration-300 group-hover:text-[#E8834E]"
        >
          <path d="M12 5v14" />
          <path d="m19 12-7 7-7-7" />
        </svg>
      </a>

      {/* Keyframes for the scroll indicator's gentle bounce */}
      <style>{`
        @keyframes heroScrollBounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(6px);
          }
        }
      `}</style>
    </section>
  )
}

export default Hero