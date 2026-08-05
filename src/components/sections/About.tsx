import { useEffect, useRef, useState } from 'react'

const principles = [
  {
    number: '01',
    title: 'Understand the problem',
    description:
      'I start with the workflow and the people using it, not the tech stack.',
  },
  {
    number: '02',
    title: 'Build practical solutions',
    description:
      'Every decision is weighed against what the problem actually needs.',
  },
  {
    number: '03',
    title: 'Take ownership',
    description:
      'From first line of code to the last bug fixed, it stays my responsibility.',
  },
]

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

function About() {
  const header = useReveal<HTMLDivElement>()
  const photo = useReveal<HTMLDivElement>()
  const intro = useReveal<HTMLDivElement>()
  const approach = useReveal<HTMLDivElement>()

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

        {/* Photo + Intro */}
        <div className="mt-16 grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">

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

            <div className="group relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 mx-auto lg:mx-0">
              <img
                src="/images/jeffrey-revilla.jpg"
                alt="Jeffrey R. Revilla"
                className="h-full w-full object-cover grayscale transition-all duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
              />

              {/* Subtle bottom fade for a clean, editorial edge */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950/60 to-transparent" />
            </div>
          </div>

          {/* Intro Text */}
          <div
            ref={intro.ref}
            className={`space-y-6 text-base leading-8 text-neutral-400 transition-all duration-700 ease-out sm:text-lg ${
              intro.isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            {/*
              Optional: swap the first sentence for something specific to
              you — a habit, an interest, or what pulled you into building
              things. A concrete detail here makes it unmistakably yours.
            */}
            <p>
              I like knowing how things actually work before I decide how
              to build them. Whether it&apos;s an app, a workflow, or code
              I wrote months ago, I don&apos;t just accept that something
              works — I want to know why.
            </p>

            <p>
              That&apos;s the mindset I bring into every project. I build
              for the people who&apos;ll actually use the software, not
              for how it looks in a demo, and I take that seriously from
              the first line of code to the last fix.
            </p>
          </div>
        </div>

        {/* My Approach — numbered principles */}
        <div
          ref={approach.ref}
          className={`mt-20 border-t border-white/10 pt-12 transition-all duration-700 ease-out lg:mt-28 lg:pt-16 ${
            approach.isVisible
              ? 'translate-y-0 opacity-100'
              : 'translate-y-6 opacity-0'
          }`}
        >
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            My Approach
          </p>

          <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8 lg:gap-12">
            {principles.map((principle, index) => (
              <div
                key={principle.number}
                className={`transition-all duration-700 ease-out ${
                  approach.isVisible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-6 opacity-0'
                }`}
                style={{ transitionDelay: approach.isVisible ? `${index * 120}ms` : '0ms' }}
              >
                <span className="text-sm font-semibold tabular-nums text-neutral-600">
                  {principle.number}
                </span>

                <h3 className="mt-3 text-lg font-medium text-white">
                  {principle.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-neutral-500">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

export default About