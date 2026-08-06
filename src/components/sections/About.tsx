import { useEffect, useRef, useState } from 'react'
import jeffreyAbout from '../../assets/images/jeffrey-about.jpg'

const pillars = [
  {
    number: '01',
    label: 'The Problem',
    title: 'Real-World Solutions',
    description:
      'I turn manual, repetitive processes into web applications that quietly make people\u2019s work faster and easier.',
    tags: ['Workflow audits', 'Process automation', 'Productivity gains'],
  },
  {
    number: '02',
    label: 'The Build',
    title: 'Modern Full-Stack Development',
    description:
      'End-to-end ownership \u2014 intuitive React frontends backed by scalable APIs, databases, and authentication, built to last.',
    tags: ['React & TypeScript', 'APIs & databases', 'Auth & infrastructure'],
  },
  {
    number: '03',
    label: 'The Edge',
    title: 'AI Where It Matters',
    description:
      'AI earns its place when it solves a real problem for the user \u2014 never bolted on for novelty.',
    tags: ['Applied AI', 'Practical integrations', 'User-first design'],
  },
]

const introText =
  "I've always been the kind of person who wants to understand how " +
  "something works before deciding whether it's worth building. That " +
  "habit shaped how I approach development — I'd rather spend time " +
  "understanding what a project actually needs than jump straight into " +
  "code. Whether it's a web application, a backend system, or bringing " +
  "AI into an existing workflow, I care about the same thing: writing " +
  "something that holds up, stays easy to maintain, and genuinely makes " +
  "someone's work easier."

/**
 * Lightweight scroll-reveal hook.
 * Fades + slides an element in once it enters the viewport.
 */
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

/**
 * Detects the user's reduced-motion preference so animations
 * can be skipped for people who've asked the OS to limit them.
 */
function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(query.matches)

    const handleChange = () => setPrefersReducedMotion(query.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  return prefersReducedMotion
}

/**
 * Typewriter hook — types the full paragraph once, from first character
 * to last, driven by requestAnimationFrame against a fixed duration
 * (rather than a per-character delay), so it reliably finishes within
 * `durationMs` regardless of paragraph length. Does not loop or reset.
 * Starts only when `start` becomes true (e.g. on scroll reveal), and
 * completes instantly for reduced-motion users.
 */
function useTypewriterOnce(
  text: string,
  options?: { start?: boolean; durationMs?: number },
) {
  const { start = true, durationMs = 7000 } = options ?? {}
  const prefersReducedMotion = usePrefersReducedMotion()

  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const startTimeRef = useRef<number | null>(null)
  const rafIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return

    if (prefersReducedMotion) {
      setDisplayedText(text)
      setIsComplete(true)
      return
    }

    const tick = (timestamp: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = timestamp
      }

      const elapsed = timestamp - startTimeRef.current
      const progress = Math.min(elapsed / durationMs, 1)
      setDisplayedText(text.slice(0, Math.round(progress * text.length)))

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(tick)
      } else {
        setIsComplete(true)
      }
    }

    rafIdRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current)
    }
  }, [start, text, durationMs, prefersReducedMotion])

  return { displayedText, isComplete, prefersReducedMotion }
}

function About() {
  const header = useReveal<HTMLDivElement>()
  const photo = useReveal<HTMLDivElement>()
  const intro = useReveal<HTMLDivElement>()
  const approach = useReveal<HTMLDivElement>()

  const { displayedText, isComplete, prefersReducedMotion } = useTypewriterOnce(
    introText,
    { start: intro.isVisible, durationMs: 7000 },
  )

  return (
    <section
      id="about"
      className="border-t border-white/10 bg-neutral-950 px-6 py-24 lg:px-8 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div
          ref={header.ref}
          className={`max-w-3xl transition-all duration-700 ease-out ${
            header.isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          }`}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            About Me
          </p>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Beyond the code.
          </h2>
        </div>

        {/* Photo + Intro — items-start so both columns begin on the
            same horizontal line */}
        <div className="mt-16 grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

          {/* Photo */}
          <div
            ref={photo.ref}
            className={`relative transition-all duration-700 ease-out ${
              photo.isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            {/* Decorative glow, echoes Hero background */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-white/[0.03] blur-3xl"
            />

            <div className="group relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(255,255,255,0.06)] mx-auto lg:mx-0">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={jeffreyAbout}
                  alt="Jeffrey R. Revilla"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Subtle bottom fade for a clean, editorial edge */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950/70 to-transparent" />
              </div>

              {/* Card Footer — echoes the Hero card's footer treatment */}
              <div className="flex items-center justify-between border-t border-white/10 px-6 py-4">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                  Jeffrey R. Revilla
                </span>

                <span className="h-1.5 w-1.5 rounded-full bg-white/20" />
              </div>
            </div>
          </div>

          {/* Intro Text */}
          <div
            ref={intro.ref}
            className={`transition-all duration-700 ease-out ${
              intro.isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            {/* Relative wrapper: an invisible "sizer" paragraph reserves
                the final height up front, so the paragraph typing in
                doesn't shift the "My Approach" section below as it grows.
                Sizer and visible text share identical typography/alignment
                so the reserved size matches exactly. */}
            <div className="relative max-w-2xl">
              <p
                aria-hidden="true"
                className="invisible text-left text-lg leading-8 sm:text-xl sm:leading-9 lg:text-justify"
              >
                {introText}
              </p>

              <p
                aria-hidden="true"
                className="absolute inset-0 text-left text-lg leading-8 font-normal text-neutral-300 sm:text-xl sm:leading-9 lg:text-justify"
              >
                {displayedText}
                {!isComplete && !prefersReducedMotion && (
                  <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-white/60 align-middle" />
                )}
              </p>
            </div>

            {/* Static, always-present text for screen readers — the
                animation above is decorative and hidden from assistive
                tech so the full paragraph is available immediately,
                unaffected by animation state or timing. */}
            <p className="sr-only">{introText}</p>
          </div>
        </div>

        {/* Building with Purpose — engineering philosophy, presented as an
            editorial three-column spread with a connecting "pipeline"
            that mirrors problem → build → augment. */}
        <div
          ref={approach.ref}
          className={`mt-20 border-t border-white/10 pt-12 transition-all duration-700 ease-out lg:mt-28 lg:pt-16 ${
            approach.isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            How I Build
          </p>

          <h3 className="mt-4 max-w-2xl text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Building with purpose.
          </h3>

          <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base">
            Three principles that carry through every project, from the
            first workflow audit to the last line of shipped code.
          </p>

          {/* Grid + connector spine. The spine is a hairline that runs
              behind each node, visually chaining the three stages
              together — only meaningful as a sequence, so it's shown
              on sm+ where the columns sit side by side. */}
          <div className="relative mt-14 lg:mt-16">
            <div
              aria-hidden="true"
              className="absolute inset-x-[16.6%] top-5 hidden h-px bg-gradient-to-r from-white/0 via-white/15 to-white/0 sm:block"
            />

            <div className="grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-10">
              {pillars.map((pillar, index) => (
                <div
                  key={pillar.number}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-neutral-900/40 p-7 backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-neutral-900/60 hover:shadow-[0_25px_60px_rgba(255,255,255,0.05)] sm:p-8 ${
                    approach.isVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-6 opacity-0'
                  }`}
                  style={{
                    transitionDelay: approach.isVisible ? `${index * 120}ms` : '0ms',
                  }}
                >
                  {/* Oversized ghost numeral — editorial texture, not a
                      literal step count */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 -top-4 select-none text-[6rem] font-semibold leading-none text-white/[0.04] transition-colors duration-500 group-hover:text-white/[0.06] sm:text-[7rem]"
                  >
                    {pillar.number}
                  </span>

                  {/* Node marker — aligns with the connecting spine above */}
                  <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-neutral-950 text-xs font-semibold tabular-nums text-neutral-400 transition-colors duration-500 group-hover:border-white/30 group-hover:text-white">
                    {pillar.number}
                  </span>

                  <p className="relative z-10 mt-6 text-[11px] font-medium uppercase tracking-[0.2em] text-neutral-500">
                    {pillar.label}
                  </p>

                  <h4 className="relative z-10 mt-2 text-xl font-medium text-white sm:text-2xl">
                    {pillar.title}
                  </h4>

                  <p className="relative z-10 mt-3 text-sm leading-6 text-neutral-400">
                    {pillar.description}
                  </p>

                  <div className="relative z-10 mt-6 flex flex-wrap gap-2">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-neutral-500 transition-colors duration-500 group-hover:border-white/15 group-hover:text-neutral-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default About