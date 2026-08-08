import { useEffect, useRef, useState } from 'react'
import {
  Search,
  Code2,
  Sparkles,
  Layout,
  Server,
  Database,
  Webhook,
  BrainCircuit,
  ArrowRight,
} from 'lucide-react'
import jeffreyAbout from '../../assets/images/jeffrey-about.jpg'

const capabilities = [
  { label: 'Frontend', icon: Layout },
  { label: 'Backend', icon: Server },
  { label: 'Databases', icon: Database },
  { label: 'APIs', icon: Webhook },
  { label: 'AI Integration', icon: BrainCircuit },
]

const pillars = [
  {
    number: '01',
    label: 'The Problem',
    description:
      'I turn manual, repetitive processes into web applications that quietly make people\u2019s work faster and easier.',
    icon: Search,
  },
  {
    number: '02',
    label: 'The Build',
    description:
      'End-to-end ownership \u2014 intuitive React frontends backed by scalable APIs, databases, and authentication, built to last.',
    icon: Code2,
  },
  {
    number: '03',
    label: 'The Edge',
    description:
      'AI earns its place when it solves a real problem for the user \u2014 never bolted on for novelty.',
    icon: Sparkles,
  },
]

const introText = [
  "I've always been the kind of person who wants to understand how",
  "something works before deciding whether it's worth building. That",
  "habit shaped how I approach development — I'd rather spend time",
  "understanding what a project actually needs than jump straight into",
  "code. Whether it's a web application, a backend system, or bringing",
  "AI into an existing workflow, I care about the same thing: writing",
  "something that holds up, stays easy to maintain, and genuinely makes",
  "someone's work easier.",
].join(' ')

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
 * Drives the "Working Across" capability card. Cycles through `length`
 * items at a slow, deliberate pace, exposing both the settled `index`
 * and a `phase` so the caller can animate the outgoing item up-and-out
 * while the incoming item fades up into place — never an abrupt swap.
 *
 * Sequence per cycle: idle (holding) -> exiting (fade + rise out) ->
 * index advances, entering (snapped below, invisible, no transition)
 * -> idle (transitions back to settled position, fading + rising in).
 * Reduced-motion users still get the rotation, just without the
 * animated phases.
 */
function useRotatingCapability(length: number) {
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<'idle' | 'exiting' | 'entering'>('idle')
  const prefersReducedMotion = usePrefersReducedMotion()

  useEffect(() => {
    const ROTATE_MS = 4200
    const EXIT_MS = 450

    let cancelled = false
    const timers: ReturnType<typeof setTimeout>[] = []
    const frames: number[] = []

    const tick = () => {
      const holdTimer = setTimeout(() => {
        if (cancelled) return

        if (prefersReducedMotion) {
          setIndex((prev) => (prev + 1) % length)
          tick()
          return
        }

        setPhase('exiting')

        const exitTimer = setTimeout(() => {
          if (cancelled) return

          setIndex((prev) => (prev + 1) % length)
          setPhase('entering')

          const frame1 = requestAnimationFrame(() => {
            const frame2 = requestAnimationFrame(() => {
              if (!cancelled) setPhase('idle')
            })
            frames.push(frame2)
          })
          frames.push(frame1)

          tick()
        }, EXIT_MS)
        timers.push(exitTimer)
      }, ROTATE_MS)
      timers.push(holdTimer)
    }

    tick()

    return () => {
      cancelled = true
      timers.forEach(clearTimeout)
      frames.forEach(cancelAnimationFrame)
    }
  }, [length, prefersReducedMotion])

  return { index, phase }
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

  const { index: capabilityIndex, phase: capabilityPhase } =
    useRotatingCapability(capabilities.length)
  const ActiveIcon = capabilities[capabilityIndex].icon

  const { displayedText, isComplete, prefersReducedMotion } = useTypewriterOnce(
    introText,
    { start: intro.isVisible, durationMs: 7000 },
  )

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-white/10 bg-neutral-950 px-6 py-20 sm:py-24 lg:px-8 lg:py-32"
    >
      {/* Background Decoration — a diamond near the photo, a large
          hollow circle up in the text column, and a burnt-orange ring
          behind the portrait, echoing the reference composition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[6%] top-[18%] h-16 w-16 rotate-45 rounded-2xl border border-white/[0.06] sm:h-24 sm:w-24" />
        <div className="absolute right-[4%] top-[4%] h-40 w-40 rounded-full border border-white/[0.06] sm:h-56 sm:w-56" />
        <div className="absolute -left-10 bottom-[6%] h-64 w-64 rounded-full border border-[#C2542C]/60 shadow-[0_0_50px_rgba(194,84,44,0.12)] sm:h-80 sm:w-80 sm:bottom-[8%]" />
      </div>

      <div className="relative mx-auto max-w-7xl">

        {/* Section Header — label stacked above the heading, both
            centered as a pair so the section reads with one clear,
            top-level title regardless of how the columns below align */}
        <div
          ref={header.ref}
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ease-out ${
            header.isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-4 opacity-0'
          }`}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            About Me
          </p>

          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-white sm:mt-6 sm:text-4xl lg:text-5xl">
            Beyond the code
            <span className="text-[#C2542C]">.</span>
          </h2>

          <div className="mx-auto mt-5 flex items-center justify-center gap-2 sm:mt-6">
            <span className="h-px w-10 bg-[#C2542C]/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C2542C]" />
          </div>
        </div>

        {/* Photo + Content — the grid aligns to items-start so the photo's
            top edge lands level with the first line of the intro paragraph
            (now the first element in the text column), rather than with
            the section title above, keeping the two columns visually
            balanced on the same horizontal line */}
        <div className="mt-14 grid items-start gap-14 sm:mt-16 lg:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

          {/* Photo — simple single frame, no offset shadow card or
              caption underneath, matching the reference's cleaner look */}
          <div
            ref={photo.ref}
            className={`relative mx-auto w-full max-w-sm transition-all duration-700 ease-out lg:ml-[10%] ${
              photo.isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-white/[0.03] blur-3xl"
            />

            {/* Portrait + Working Across — a single merged frame: the
                photo on top, the capability card stacked directly below
                it with no gap, sharing one rounded border/shadow so the
                two read as one cohesive card rather than two overlapping
                elements. */}
            <div className="group relative z-10 overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(255,255,255,0.06)]">
              <div className="relative aspect-[6/7] overflow-hidden">
                <img
                  src={jeffreyAbout}
                  alt="Jeffrey R. Revilla"
                  className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              {/* Working Across — capability card fused to the bottom of
                  the frame, cycling through the developer's areas of work
                  like a small, live status readout. */}
              <div className="bg-white px-5 pb-2.5 pt-4 sm:px-6 sm:pb-3 sm:pt-5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C2542C]/60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C2542C]" />
                  </span>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    Working Across
                  </p>
                </div>

                {/* Fixed-height crossfade stage — reserves space for the
                    tallest label so the card never jumps size between
                    categories, and clips the outgoing/incoming content as
                    it animates through. */}
                <div className="relative mt-2.5 h-8 overflow-hidden sm:h-9">
                  <div
                    className={`absolute inset-0 flex items-center gap-2.5 ${
                      capabilityPhase === 'exiting'
                        ? '-translate-y-2 opacity-0 transition-all duration-500 ease-out'
                        : capabilityPhase === 'entering'
                          ? 'translate-y-2 opacity-0 transition-none'
                          : 'translate-y-0 opacity-100 transition-all duration-500 ease-out'
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900 sm:h-8 sm:w-8">
                      <ActiveIcon className="h-3.5 w-3.5" strokeWidth={1.75} />
                    </span>
                    <p className="truncate text-sm font-semibold tracking-tight text-neutral-900 sm:text-base">
                      {capabilities[capabilityIndex].label}
                    </p>
                  </div>
                </div>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    {capabilities.map((capability, i) => (
                      <span
                        key={capability.label}
                        className={`h-1 rounded-full transition-all duration-500 ease-out ${
                          i === capabilityIndex
                            ? 'w-6 bg-[#C2542C]'
                            : 'w-1.5 bg-neutral-200'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-[11px] font-medium tabular-nums text-neutral-400">
                    {String(capabilityIndex + 1).padStart(2, '0')}/
                    {String(capabilities.length).padStart(2, '0')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Text column — starts directly with the intro paragraph so
              its first line sits level with the photo's top edge, then
              flows into the pillar row below. Carries the same 10%
              margin on its right as the photo carries on its left, so
              both columns sit inset from their outer edges by an equal
              amount for a balanced, symmetrical composition. */}
          <div className="flex flex-col lg:mr-[10%]">

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
                  doesn't shift the pillars below as it grows. */}
              <div className="relative max-w-2xl">
                <p aria-hidden="true" className="invisible text-justify text-lg leading-8">
                  {introText}
                </p>

                <p
                  aria-hidden="true"
                  className="absolute inset-0 text-justify text-lg font-light leading-8 text-neutral-300"
                >
                  {displayedText}
                  {!isComplete && !prefersReducedMotion && (
                    <span className="ml-0.5 inline-block h-[1em] w-[2px] translate-y-[0.15em] animate-pulse bg-white/60 align-middle" />
                  )}
                </p>
              </div>

              {/* Static, always-present text for screen readers */}
              <p className="sr-only">{introText}</p>
            </div>

            {/* Building with Purpose */}
            <div
              ref={approach.ref}
              className={`mt-12 transition-all duration-700 ease-out ${
                approach.isVisible
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-6 opacity-0'
              }`}
            >
              <h3 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Building with purpose.
              </h3>

              <p className="mt-2 max-w-xl text-sm leading-6 text-neutral-500">
                These are the principles that guide how I think, build, and
                deliver solutions.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
                {pillars.map((pillar, index) => {
                  const Icon = pillar.icon
                  return (
                    <div
                      key={pillar.number}
                      className={`group rounded-2xl border border-white/10 bg-neutral-900/40 p-6 backdrop-blur-sm transition-[transform,border-color,background-color,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-neutral-900/60 hover:shadow-[0_20px_45px_rgba(0,0,0,0.35)] ${
                        approach.isVisible
                          ? 'translate-y-0 opacity-100'
                          : 'translate-y-6 opacity-0'
                      }`}
                      style={{
                        transitionDelay: approach.isVisible ? `${index * 120}ms` : '0ms',
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon
                          className="h-5 w-5 text-[#C2542C]"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                        <span className="text-sm font-medium tabular-nums text-[#C2542C]">
                          {pillar.number}
                        </span>
                      </div>

                      <h4 className="mt-4 text-lg font-semibold text-white">
                        {pillar.label}
                      </h4>

                      {/* Hover affordance — visible in the resting state,
                          fades out as the description takes its place so
                          the card always signals it's interactive without
                          needing to be discovered by accident. */}
                      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500 transition-opacity duration-300 ease-out group-hover:opacity-0">
                        <span>Hover to explore</span>
                        <ArrowRight
                          className="h-3 w-3 transition-transform duration-300 ease-out group-hover:translate-x-0.5"
                          strokeWidth={2}
                          aria-hidden="true"
                        />
                      </div>

                      {/* Description — animated with a grid-template-rows
                          fr trick (0fr -> 1fr) rather than max-height, so
                          it eases to its exact intrinsic height with no
                          snapping or shake, regardless of text length. */}
                      <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                        <div className="overflow-hidden">
                          <p className="pt-2 text-sm leading-6 text-neutral-400">
                            {pillar.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About