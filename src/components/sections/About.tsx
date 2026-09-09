import { useEffect, useRef, useState } from 'react'
import {
  Search,
  Code2,
  Gauge,
  Mail,
} from 'lucide-react'
import jeffreyAbout from '../../assets/images/jeffrey-about.jpg'

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.02 11.5 5.63 13.7 5.63c1.05 0 2.15.19 2.15.19v2.37h-1.21c-1.23 0-1.62.77-1.62 1.56V12h2.67l-.43 3h-2.24v6.8c4.56-.93 8-4.96 8-9.8z" />
  </svg>
)

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
)

const socialLinks = [
  { label: 'Facebook', icon: FacebookIcon, href: 'https://www.facebook.com/jeffrey.romerosa.9' },
  { label: 'Gmail', icon: Mail, href: 'mailto:jeffreyrevilla128@gmail.com' },
  { label: 'LinkedIn', icon: LinkedinIcon, href: 'https://www.linkedin.com/in/jeffrey-revilla-9ab321417/' },
]

const pillars = [
  {
    number: '01',
    label: 'Understand',
    tagline: 'Start with the problem.',
    description:
      'I first understand the workflow, the people using it, and where time, money, or effort is being lost. I build around the actual problem—not just the requested feature.',
    icon: Search,
  },
  {
    number: '02',
    label: 'Build',
    tagline: 'Turn the problem into a solution.',
    description:
      'I design and build practical systems around the workflow—clean interfaces, reliable backends, and the right technology to make the process simpler, faster, and easier to manage.',
    icon: Code2,
  },
  {
    number: '03',
    label: 'Optimize',
    tagline: 'Make the solution worth building.',
    description:
      'I look beyond getting the system working. I focus on maintainability, automation, scalability, and opportunities to reduce costs or create more value for the business.',
    icon: Gauge,
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

/* ------------------------------------------------------------------ */
/*  Reveal-on-scroll: fires once when the element enters the viewport, */
/*  then disconnects. This is the only motion trigger in the section — */
/*  no scroll-hijacking, no forced wait, no hidden panels.             */
/* ------------------------------------------------------------------ */

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

function About() {
  const header = useReveal<HTMLDivElement>()
  const photo = useReveal<HTMLDivElement>()
  const intro = useReveal<HTMLDivElement>()
  const pillarsBlock = useReveal<HTMLDivElement>()

  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-neutral-200 bg-white px-6 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:px-8 lg:pt-24 lg:pb-20"
    >
      {/* Background Decoration */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute left-[6%] top-[18%] h-16 w-16 rotate-45 rounded-2xl border border-black/[0.06] sm:h-24 sm:w-24" />
        <div className="absolute right-[4%] top-[4%] h-40 w-40 rounded-full border border-black/[0.06] sm:h-56 sm:w-56" />
        <div className="absolute -left-10 bottom-[6%] h-64 w-64 rounded-full border border-[#C2542C]/60 shadow-[0_0_50px_rgba(194,84,44,0.12)] sm:h-80 sm:w-80 sm:bottom-[8%]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <div
          ref={header.ref}
          className={`mx-auto max-w-3xl text-center transition-all duration-700 ease-out ${
            header.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
            Who I Am
          </h2>

          <div className="mx-auto mt-5 flex items-center justify-center gap-2 sm:mt-6">
            <span className="h-px w-10 bg-[#C2542C]/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#C2542C]" />
          </div>
        </div>

        <div className="mt-12 grid items-start gap-12 sm:mt-14 lg:mt-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          {/* Photo Column */}
          <div
            ref={photo.ref}
            className={`relative z-10 mx-auto w-full max-w-sm transition-all duration-700 ease-out lg:ml-[10%] ${
              photo.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
            }`}
          >
            <div className="origin-top-right scale-90">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] bg-black/[0.03] blur-3xl"
              />

              <div className="group relative z-10 overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-900 shadow-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl">
                <div className="relative aspect-[6/7] overflow-hidden">
                  <img
                    src={jeffreyAbout}
                    alt="Jeffrey R. Revilla"
                    className="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                  <div className="absolute inset-x-0 bottom-0 px-5 pb-3 pt-4 sm:px-6 sm:pb-4 sm:pt-5">
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#C2542C]/60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#C2542C]" />
                      </span>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                        Connect With Me
                      </p>
                    </div>

                    {/* Social Icons Row */}
                    <div className="mt-3 flex items-center gap-3">
                      {socialLinks.map((social) => {
                        const Icon = social.icon
                        return (
                          <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={social.label}
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-neutral-800/80 text-white transition-all duration-300 hover:scale-110 hover:border-[#C2542C] hover:bg-[#C2542C]"
                          >
                            <Icon className="h-4 w-4" />
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="flex flex-col lg:mr-[10%]">
            {/* Intro */}
            <div
              ref={intro.ref}
              className={`transition-all duration-700 ease-out ${
                intro.isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <h3 className="text-2xl font-semibold uppercase tracking-[0.2em] text-neutral-900 sm:text-3xl lg:text-4xl">
                I&apos;m Jeffrey
              </h3>

              <p className="mt-4 max-w-2xl text-left text-base font-light leading-7 text-neutral-600 sm:mt-5 sm:text-lg lg:text-xl">
                {introText}
              </p>
            </div>
          </div>
        </div>

        {/* Building With Purpose — full-width, sits below the photo + intro row */}
        <div className="mt-12 sm:mt-14 lg:mt-16">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
              Building with purpose.
            </h3>

            <p className="mt-2 text-sm leading-6 text-neutral-500">
              These are the principles that guide how I think, build, and
              deliver solutions.
            </p>
          </div>

          <div
            ref={pillarsBlock.ref}
            className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-3"
          >
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon

              return (
                <div
                  key={pillar.number}
                  className={`group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-neutral-950/95 p-5 shadow-[0_0_35px_-8px_rgba(194,84,44,0.3)] backdrop-blur-md transition-all duration-500 ease-out hover:-translate-y-1 hover:border-white/30 hover:bg-neutral-900/95 hover:shadow-[0_25px_60px_-12px_rgba(194,84,44,0.55)] ${
                    pillarsBlock.isVisible
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-6 opacity-0'
                  }`}
                  style={
                    prefersReducedMotion
                      ? undefined
                      : { transitionDelay: `${index * 120}ms` }
                  }
                >
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-3 -z-10 rounded-[1.75rem] bg-[#C2542C]/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />

                  <div>
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

                    <h4 className="mt-3 text-base font-semibold text-white sm:text-lg">
                      {pillar.label}
                    </h4>

                    <p className="mt-1 text-xs font-medium leading-5 text-[#C2542C] sm:text-sm">
                      {pillar.tagline}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-neutral-400 sm:text-sm sm:leading-6">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-1">
                    <span className="h-1 w-4 rounded-full bg-[#C2542C]" />
                    <span className="h-1 w-1 rounded-full bg-white/20" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About