import { useRef, useState } from 'react'
import heroPhoto from '../../assets/images/hero-photo.png'

function Hero() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLElement | null>(null)

  // Gentle mouse-driven parallax for the portrait — stays in -0.5..0.5,
  // used directly in the translate3d math below.
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
      className="relative flex min-h-screen items-start justify-center overflow-hidden bg-neutral-950 px-6 pb-10 pt-40 sm:items-center sm:pb-16 sm:pt-28 lg:px-8"
    >
      {/* ================================================== */}
      {/* Background Decoration                               */}
      {/* ================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Ambient corner light — two soft, blurred burnt-orange/amber
            glows that roam across the background rather than holding a
            fixed position. Each animates translate, scale, rotation and
            an asymmetric border-radius together, so the shape itself
            keeps deforming (stretching, compressing, going slightly
            lopsided) as it drifts — an irregular fluid glow rather than
            a static circle sliding around. Kept at very low opacity and
            heavy blur so it reads as ambient light, and on long,
            non-matching loops (12s / 14.5s) so the two never fall into a
            visibly repeating rhythm together. */}
        <div className="absolute inset-0" style={{ mixBlendMode: 'screen' }}>
          <div
            className="absolute -left-24 -top-24 h-[26rem] w-[26rem] opacity-40 blur-3xl [animation:heroCausticDriftA_12s_ease-in-out_infinite] sm:-left-32 sm:-top-32 sm:h-[38rem] sm:w-[38rem]"
            style={{
              background: 'radial-gradient(circle, rgba(232,131,78,1), transparent 70%)',
            }}
          />
          <div
            className="absolute -bottom-24 -right-24 h-[24rem] w-[24rem] opacity-[0.35] blur-3xl [animation:heroCausticDriftB_14.5s_ease-in-out_infinite] sm:-bottom-32 sm:-right-32 sm:h-[34rem] sm:w-[34rem]"
            style={{
              background: 'radial-gradient(circle, rgba(194,84,44,1), transparent 70%)',
            }}
          />
        </div>
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
          0%, 100% {
            transform: translate(0%, 0%) scale(1) rotate(0deg);
            border-radius: 42% 58% 65% 35% / 45% 45% 55% 55%;
          }
          25% {
            transform: translate(14%, 8%) scale(1.1) rotate(9deg);
            border-radius: 58% 42% 48% 52% / 62% 38% 62% 38%;
          }
          50% {
            transform: translate(6%, 18%) scale(0.92) rotate(-7deg);
            border-radius: 48% 52% 38% 62% / 40% 60% 42% 58%;
          }
          75% {
            transform: translate(-10%, 6%) scale(1.05) rotate(5deg);
            border-radius: 65% 35% 55% 45% / 55% 45% 35% 65%;
          }
        }
        @keyframes heroCausticDriftB {
          0%, 100% {
            transform: translate(0%, 0%) scale(1) rotate(0deg);
            border-radius: 55% 45% 40% 60% / 50% 60% 40% 50%;
          }
          30% {
            transform: translate(-13%, -10%) scale(1.12) rotate(-11deg);
            border-radius: 40% 60% 58% 42% / 60% 40% 55% 45%;
          }
          60% {
            transform: translate(-5%, -20%) scale(0.9) rotate(7deg);
            border-radius: 62% 38% 45% 55% / 42% 58% 40% 60%;
          }
          85% {
            transform: translate(10%, -7%) scale(1.06) rotate(-5deg);
            border-radius: 48% 52% 60% 40% / 55% 45% 60% 40%;
          }
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