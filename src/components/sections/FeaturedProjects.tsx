import { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { X, ExternalLink, FileText } from 'lucide-react'
import { SiGithub } from '@icons-pack/react-simple-icons'
import lostAndFoundImage from '../../assets/lost&foundprojects/lost&found.png'
import lostAndFoundPoster from '../../assets/lost&foundprojects/poster.jpg'
import lostAndFoundPresentation from '../../assets/lost&foundprojects/presentation.jpg'
import internshipManagementImage from '../../assets/imsprojects/ims.png'
import internshipGraduationImage from '../../assets/imsprojects/internshipgrad.jpg'
import internshipSystemDemoImage from '../../assets/imsprojects/System Demo.jpg'
import ojtTimeTrackerImage from '../../assets/ojttracker/ojt.png'
import ojtDeveloperImage1 from '../../assets/ojttracker/developerimage-1.jpg'
import ojtDeveloperImage2 from '../../assets/ojttracker/developerimage-2.jpg'

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/*  (Previously in ../../data/projects — inlined here so this section */
/*  has no external dependencies.)                                    */
/* ------------------------------------------------------------------ */

interface Project {
  id: string
  title: string
  shortDescription: string
  description: string
  role: string
  technologies: string[]
  category: string
  image: string
  gallery?: { src: string; caption: string; subtitle?: string }[]
  developerProfile?: {
    images: string[]
    name: string
    subtitle: string
  }
  github?: string
  studyPaper?: string
  liveDemo?: string
  documentation?: string
  featured: boolean
}

const projects: Project[] = [
  {
    id: 'csu-digital-lost-and-found',
    title: 'CSU Digital Lost-and-Found System',
    shortDescription:
      'An AI-assisted digital lost-and-found system designed to improve how lost and found items are reported, searched, matched, and verified.',
    description:
      'A web-based campus lost-and-found system developed for Caraga State University. The system provides structured reporting, image-assisted metadata extraction, item searching, QR-based student ID verification, and semi-automated matching to help improve the lost-and-found process. Item metadata extraction is powered by the Qwen2-VL 2B pretrained vision-language model.',
    role: 'Lead Developer',
    technologies: [
      'Vue.js',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Qwen2-VL',
      'pgvector',
      'QR Code',
    ],
    category: 'Full-Stack / AI Integration',
    image: lostAndFoundImage,
    gallery: [
      {
        src: lostAndFoundPoster,
        caption: 'SCI-COM 2026',
        subtitle: 'Caraga State University · May 2026',
      },
      {
        src: lostAndFoundPresentation,
        caption: 'Project Presentation',
        subtitle: 'February 2026',
      },
    ],
    github: '',
    liveDemo: 'https://carsu-lost-and-found-system.web.app/login',
    featured: true,
  },

  {
    id: 'internship-management-system',
    title: 'Internship Management System',
    shortDescription:
      'A web-based platform that automates the internship application and document submission process for participants applying as interns at ATI RTC 13.',
    description:
      'A web application developed by our team to streamline the application and document submission process for individuals applying as interns at the Agricultural Training Institute Regional Training Center 13 (ATI RTC 13). It transforms the traditional paper-based process into a structured digital workflow, making applications and document submissions more organized and efficient. Our team established the system\u2019s core architecture and implemented its key features using a Laravel backend and Vue.js frontend. The project was subsequently handed over to the succeeding team of interns for continued development and enhancement.',
    role: 'Full-Stack Developer (Initial Development Phase)',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Laravel',
      'PHP',
      'PostgreSQL',
    ],
    category: 'Full-Stack Web Application',
    image: internshipManagementImage,
    gallery: [
      {
        src: internshipGraduationImage,
        caption: 'Internship Graduation',
        subtitle: 'Agriculture Training Institute Region 13 · June 2026',
      },
      {
        src: internshipSystemDemoImage,
        caption: 'System Presentation',
        subtitle: 'Agriculture Training Institute Region 13 · May 2026',
      },
    ],
    github: 'https://github.com/JeffreyRomerosa/IMS-Application.git',
    liveDemo: '',
    documentation:
      'https://drive.google.com/drive/folders/1gJBBmR17e06AMz0dt1tXDtSB0PtRzFJ-?usp=sharing',
    featured: true,
  },

  {
    id: 'ojt-time-tracker',
    title: 'OJT Time Tracker',
    shortDescription:
      'A personal internship time-tracking application with attendance monitoring, rendered-hour tracking, diary management, and speech-to-text functionality.',
    description:
      'A personal web application developed to manage internship attendance, rendered hours, remaining hours, daily records, and overall internship progress. The system also includes speech-to-text functionality that allows users to dictate diary entries directly into the application, making daily documentation faster and more convenient.',
    role: 'Full-Stack Developer',
    technologies: [
      'React',
      'TypeScript',
      'Tailwind CSS',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'Speech-to-Text',
    ],
    category: 'Full-Stack Web Application',
    image: ojtTimeTrackerImage,
    developerProfile: {
      images: [ojtDeveloperImage1, ojtDeveloperImage2],
      name: 'Jeffrey R. Revilla',
      subtitle:
        'Bachelor of Science in Information Technology graduate, Caraga State University',
    },
    github: '',
    liveDemo: 'https://otj-tracker-production-0e86.up.railway.app/',
    featured: true,
  },
]

/* ------------------------------------------------------------------ */
/*  Featured Projects Section                                        */
/* ------------------------------------------------------------------ */

function FeaturedProjects() {
  const featuredProjects = projects.filter(
    (project) => project.featured,
  )

  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  // Tracks which modal image (by src) is currently tap-enlarged, for
  // touch devices where there's no hover state to zoom images on.
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null)

  // Drives the card -> modal "grow in place" animation. `entering` is the
  // brief window between the modal mounting and its opening transition
  // finishing; `exiting` is the reverse, played just before the modal
  // unmounts so it can shrink back down into the card it came from.
  const [modalPhase, setModalPhase] = useState<'entering' | 'entered' | 'exiting'>('entering')
  const [backdropShown, setBackdropShown] = useState(false)
  const originRectRef = useRef<DOMRect | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const heroImageRef = useRef<HTMLImageElement>(null)

  const openProject = (project: Project, originEl: HTMLElement) => {
    originRectRef.current = originEl.getBoundingClientRect()
    setModalPhase('entering')
    setSelectedProject(project)
    setEnlargedImage(null)
  }

  const closeModal = () => {
    const modal = modalRef.current
    const originRect = originRectRef.current
    const isTouch =
      typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

    if (!modal || (!isTouch && !originRect)) {
      setSelectedProject(null)
      return
    }

    setModalPhase('exiting')
    setBackdropShown(false)

    if (isTouch) {
      // Phone mode: slide the sheet back down and out, rather than
      // shrinking it toward the origin card — quicker and simpler to
      // track with a thumb than a scale-based exit.
      modal.style.transition = 'transform 260ms cubic-bezier(0.4,0,1,1)'
      modal.style.transform = 'translateY(100%)'
    } else {
      const endRect = modal.getBoundingClientRect()
      const scaleX = originRect!.width / endRect.width
      const scaleY = originRect!.height / endRect.height
      const translateX =
        originRect!.left + originRect!.width / 2 - (endRect.left + endRect.width / 2)
      const translateY =
        originRect!.top + originRect!.height / 2 - (endRect.top + endRect.height / 2)

      modal.style.transition =
        'transform 320ms cubic-bezier(0.4,0,1,1), opacity 260ms ease-in'
      modal.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`
      modal.style.opacity = '0'
    }

    const handleEnd = () => {
      modal.removeEventListener('transitionend', handleEnd)
      setSelectedProject(null)
      originRectRef.current = null
    }
    modal.addEventListener('transitionend', handleEnd)
  }

  // On desktop, jump the modal back to the origin card's position/size with
  // no transition, then release it on the next frame so the browser
  // animates the transform back to identity — the "card growing into a
  // modal" effect (a manual FLIP). On phone mode, skip the FLIP entirely
  // and just slide the sheet up from below the viewport instead, since a
  // stretch-from-card effect reads as slow and fiddly on a small screen.
  //
  // The hero screenshot has no reserved aspect ratio, so if we measure the
  // modal's box before that image has actually loaded, `endRect` comes out
  // too short — then the image arrives mid-animation, the modal reflows,
  // and the whole thing visibly pops/flickers. So we wait for the hero
  // image to finish loading (or resolve instantly if it's already cached,
  // e.g. from the card thumbnail) before measuring and animating.
  useLayoutEffect(() => {
    if (!selectedProject || modalPhase !== 'entering') return
    const modal = modalRef.current
    const originRect = originRectRef.current
    const isTouch =
      typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches

    if (!modal || (!isTouch && !originRect)) {
      setModalPhase('entered')
      setBackdropShown(true)
      return
    }

    let cancelled = false
    let raf: number | null = null
    let handleTransitionEnd: (() => void) | null = null

    const runEnterAnimation = () => {
      if (cancelled) return

      if (isTouch) {
        modal.style.transition = 'none'
        modal.style.transform = 'translateY(100%)'
        modal.style.opacity = '1'

        // Force a reflow so the browser registers the starting transform
        // before we animate away from it.
        void modal.offsetHeight

        setBackdropShown(true)

        raf = requestAnimationFrame(() => {
          modal.style.transition = 'transform 340ms cubic-bezier(0.22,1,0.36,1)'
          modal.style.transform = 'translateY(0px)'
        })
      } else {
        const endRect = modal.getBoundingClientRect()
        const scaleX = originRect!.width / endRect.width
        const scaleY = originRect!.height / endRect.height
        const translateX =
          originRect!.left + originRect!.width / 2 - (endRect.left + endRect.width / 2)
        const translateY =
          originRect!.top + originRect!.height / 2 - (endRect.top + endRect.height / 2)

        modal.style.transition = 'none'
        modal.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY})`
        modal.style.opacity = '0.5'

        // Force a reflow so the browser registers the starting transform
        // before we animate away from it.
        void modal.offsetHeight

        setBackdropShown(true)

        raf = requestAnimationFrame(() => {
          modal.style.transition =
            'transform 420ms cubic-bezier(0.22,1,0.36,1), opacity 320ms ease-out'
          modal.style.transform = 'translate(0px, 0px) scale(1, 1)'
          modal.style.opacity = '1'
        })
      }

      handleTransitionEnd = () => {
        modal.removeEventListener('transitionend', handleTransitionEnd!)
        setModalPhase('entered')
      }
      modal.addEventListener('transitionend', handleTransitionEnd)
    }

    const heroImage = heroImageRef.current

    if (!heroImage || heroImage.complete) {
      // No hero image to wait for, or it's already loaded/decoded — most
      // commonly because the same image is already showing in the project
      // card thumbnail and is served from cache.
      runEnterAnimation()
    } else {
      const handleHeroReady = () => {
        heroImage.removeEventListener('load', handleHeroReady)
        heroImage.removeEventListener('error', handleHeroReady)
        runEnterAnimation()
      }
      // Also animate on `error` so a broken image can't leave the modal
      // permanently stuck invisible at its pre-animation state.
      heroImage.addEventListener('load', handleHeroReady)
      heroImage.addEventListener('error', handleHeroReady)

      return () => {
        cancelled = true
        heroImage.removeEventListener('load', handleHeroReady)
        heroImage.removeEventListener('error', handleHeroReady)
        if (raf) cancelAnimationFrame(raf)
        if (handleTransitionEnd) modal.removeEventListener('transitionend', handleTransitionEnd)
      }
    }

    return () => {
      cancelled = true
      if (raf) cancelAnimationFrame(raf)
      if (handleTransitionEnd) modal.removeEventListener('transitionend', handleTransitionEnd)
    }
  }, [selectedProject, modalPhase])

  // Close on Escape, and lock background scroll while the modal is open.
  useEffect(() => {
    if (!selectedProject) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal()
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [selectedProject])

  return (
    <section
      id="projects"
      className="border-t border-neutral-200 bg-white px-6 pb-24 pt-12 lg:px-8 lg:pb-32 lg:pt-16"
    >
      {/* Keyframes for the caustic-light drift inside hovered project
          overlays — two blobs slowly wandering on independent, offset
          paths so their overlap never quite repeats. */}
      <style>{`
        @keyframes projectCausticDriftA {
          0%   { transform: translate(-12%, -8%) scale(1); }
          33%  { transform: translate(10%, 6%) scale(1.2); }
          66%  { transform: translate(-4%, 12%) scale(0.9); }
          100% { transform: translate(-12%, -8%) scale(1); }
        }
        @keyframes projectCausticDriftB {
          0%   { transform: translate(10%, 10%) scale(1); }
          50%  { transform: translate(-16%, -6%) scale(1.25); }
          100% { transform: translate(10%, 10%) scale(1); }
        }
        @keyframes projectCardFloat {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes projectCtaGlow {
          0%, 100% { text-shadow: 0 0 6px rgba(232,131,78,0.5), 0 0 2px rgba(232,131,78,0.3); }
          50%      { text-shadow: 0 0 16px rgba(232,131,78,1), 0 0 30px rgba(232,131,78,0.7); }
        }
      `}</style>

      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
            Featured Projects
          </p>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
            Systems I&apos;ve built to solve real problems.
          </h2>

          <div
            className="mx-auto mt-5 flex items-center justify-center gap-3 sm:mt-6"
            aria-hidden="true"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C2542C]/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#C2542C]" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C2542C]/60" />
          </div>
        </div>

        {/* Project List */}
        <div className="mt-16 grid gap-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {featuredProjects.map((project, index) => {
            const isHovered = hoveredId === project.id
            const isDimmed = hoveredId !== null && !isHovered

            return (
              <article
                key={project.id}
                onMouseEnter={() => setHoveredId(project.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={(event) => openProject(project, event.currentTarget)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    openProject(project, event.currentTarget)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`View full details for ${project.title}`}
                style={{ animationDelay: `${(index % 3) * 0.65}s` }}
                className={`group relative cursor-pointer rounded-2xl bg-white p-3 shadow-[0_20px_45px_-8px_rgba(23,23,23,0.32)] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C2542C] [@media(hover:none)]:shadow-[0_30px_45px_-14px_rgba(0,0,0,0.55),0_14px_24px_-10px_rgba(0,0,0,0.4)] [@media(hover:none)]:[animation:projectCardFloat_5.5s_ease-in-out_infinite] ${
                  isHovered
                    ? 'z-10 -translate-y-1 scale-105 shadow-[0_35px_65px_-12px_rgba(194,84,44,0.55),0_0_40px_rgba(194,84,44,0.35)]'
                    : ''
                } ${
                  isDimmed
                    ? 'scale-[0.97] opacity-60 blur-[2px]'
                    : ''
                }`}
              >
                {/* Project Image */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100">
                  <img
                    src={project.image}
                    alt={`${project.title} project preview`}
                    className="h-full w-full object-fill"
                  />

                  {/* Hover Overlay — darkened + blurred backdrop that fades in
                      on hover, revealing the project title and a prompt to
                      view full details. Hidden and non-interactive when idle. */}
                  <div
                    className={`absolute inset-0 hidden flex-col items-center justify-center gap-2 overflow-hidden px-5 text-center backdrop-blur-sm transition-all duration-300 ease-out [@media(hover:hover)]:flex ${
                      isHovered
                        ? 'bg-black/60 opacity-100'
                        : 'pointer-events-none bg-black/0 opacity-0'
                    }`}
                  >
                    {/* Caustic light layer — two soft, blurred accent-color
                        blobs drifting on slow independent loops, blended
                        additively so they read as light passing through
                        water rather than flat colored shapes. */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{ mixBlendMode: 'screen' }}
                    >
                      <div
                        className="absolute -left-1/4 -top-1/4 h-3/4 w-3/4 rounded-full opacity-70 blur-2xl"
                        style={{
                          background:
                            'radial-gradient(circle, rgba(232,131,78,1), transparent 70%)',
                          animation: isHovered
                            ? 'projectCausticDriftA 8.55s ease-in-out infinite'
                            : 'none',
                        }}
                      />
                      <div
                        className="absolute -bottom-1/4 -right-1/4 h-3/4 w-3/4 rounded-full opacity-60 blur-2xl"
                        style={{
                          background:
                            'radial-gradient(circle, rgba(194,84,44,1), transparent 70%)',
                          animation: isHovered
                            ? 'projectCausticDriftB 10.45s ease-in-out infinite'
                            : 'none',
                        }}
                      />
                    </div>

                    <h3
                      className={`relative z-10 text-base font-semibold text-white transition-all duration-300 ease-out sm:text-lg ${
                        isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                      }`}
                    >
                      {project.title}
                    </h3>
                    <span
                      className={`relative z-10 text-[11px] font-medium uppercase tracking-[0.15em] text-[#E8834E] transition-all delay-75 duration-300 ease-out sm:text-xs ${
                        isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
                      }`}
                    >
                      Click for full details
                    </span>
                  </div>

                  {/* Mobile Overlay — touch devices never trigger the hover
                      overlay above, so this is a permanently-on version of
                      it: same full-image dark scrim, caustic light layer,
                      title, and "Click for full details" cue. Two
                      deliberate differences from the desktop hover
                      treatment: the backdrop blur is dialed down 50% (2px
                      vs. 4px) so the screenshot underneath reads more
                      clearly without a pointer to first reveal it, and the
                      caustic light animation runs 50% more intensely
                      (faster loop + higher opacity) to bring some of the
                      motion/energy that hover normally supplies for free.
                      Hidden on devices that support real hover, where the
                      overlay above already does this job on demand. */}
                  <div className="pointer-events-none absolute inset-0 hidden flex-col items-center justify-center gap-2 overflow-hidden bg-black/60 px-5 text-center backdrop-blur-[2px] [@media(hover:none)]:flex">
                    {/* Caustic light layer — same two drifting accent-color
                        blobs as the desktop version, but 50% faster and
                        50% more opaque so they stay noticeable even though
                        the blur behind them is lighter. */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0"
                      style={{ mixBlendMode: 'screen' }}
                    >
                      <div
                        className="absolute -left-1/4 -top-1/4 h-3/4 w-3/4 rounded-full opacity-100 blur-2xl"
                        style={{
                          background:
                            'radial-gradient(circle, rgba(232,131,78,1), transparent 70%)',
                          animation: 'projectCausticDriftA 5.7s ease-in-out infinite',
                        }}
                      />
                      <div
                        className="absolute -bottom-1/4 -right-1/4 h-3/4 w-3/4 rounded-full opacity-90 blur-2xl"
                        style={{
                          background:
                            'radial-gradient(circle, rgba(194,84,44,1), transparent 70%)',
                          animation: 'projectCausticDriftB 6.97s ease-in-out infinite',
                        }}
                      />
                    </div>

                    <h3 className="relative z-10 text-base font-semibold text-white sm:text-lg">
                      {project.title}
                    </h3>
                    <span
                      className="relative z-10 text-[11px] font-medium uppercase tracking-[0.15em] text-[#E8834E] sm:text-xs"
                      style={{ animation: 'projectCtaGlow 2.4s ease-in-out infinite' }}
                    >
                      Click for full details
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm transition-opacity duration-300 ease-out ${
            backdropShown ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeModal}
        >
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} details`}
            onClick={(event) => event.stopPropagation()}
            style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-[0_35px_65px_-12px_rgba(0,0,0,0.5)]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close project details"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-[#C2542C]"
            >
              <X size={18} />
            </button>

            {/* Project Image — presented inside a laptop mockup so it reads
                as "running on a device" rather than a flat screenshot. */}
            <div className="flex justify-center rounded-t-2xl bg-neutral-100 px-6 pb-4 pt-8 sm:px-10 sm:pt-10">
              <div className="w-full max-w-lg">
                {/* Screen / bezel */}
                <div className="rounded-t-xl rounded-b-sm bg-neutral-800 p-2.5 shadow-[0_20px_35px_-15px_rgba(0,0,0,0.5)] sm:p-3">
                  {/* Camera notch */}
                  <div className="mb-2 flex justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-neutral-600" />
                  </div>

                  {/* Actual screenshot */}
                  <div className="w-full overflow-hidden rounded-sm bg-neutral-950">
                    <img
                      ref={heroImageRef}
                      src={selectedProject.image}
                      alt={`${selectedProject.title} preview`}
                      className="w-full object-contain"
                    />
                  </div>
                </div>

                {/* Hinge */}
                <div className="h-1.5 rounded-b-[3px] bg-neutral-700 sm:h-2" />

                {/* Base */}
                <div className="relative mx-auto h-2.5 w-[108%] -translate-x-[4%] rounded-b-2xl bg-gradient-to-b from-neutral-300 to-neutral-400 shadow-[0_6px_10px_-4px_rgba(0,0,0,0.35)] sm:h-3">
                  <span className="absolute left-1/2 top-0 h-1 w-14 -translate-x-1/2 rounded-b-md bg-neutral-500/60 sm:w-16" />
                </div>
              </div>
            </div>

            {/* Project Details — a dark panel, in contrast with the white
                laptop-mockup section above it. */}
            <div className="rounded-b-2xl bg-neutral-950 p-6 sm:p-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8834E]">
                {selectedProject.category}
              </span>

              <h3 className="mt-2 text-xl font-semibold tracking-tight text-white sm:text-2xl">
                {selectedProject.title}
              </h3>

              <p className="mt-1 text-sm font-medium text-neutral-400">
                {selectedProject.role}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-neutral-300 sm:text-[15px]">
                {selectedProject.description}
              </p>

              {/* Technologies */}
              <div className="mt-5 flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-neutral-700 bg-neutral-900 px-3 py-1 text-xs font-medium text-neutral-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Project Gallery — supporting evidence such as event
                  posters or presentation photos, shown only when a
                  project provides gallery items. */}
              {selectedProject.gallery && selectedProject.gallery.length > 0 && (
                <div className="mt-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    Project Gallery
                  </p>
                  <div
                    className={`mt-3 grid grid-cols-1 gap-4 sm:gap-3 ${
                      selectedProject.gallery.length > 1 ? 'sm:grid-cols-2' : ''
                    }`}
                  >
                    {selectedProject.gallery.map((item) => (
                      <figure
                        key={item.src}
                        onClick={(event) => {
                          event.stopPropagation()
                          setEnlargedImage((prev) =>
                            prev === item.src ? null : item.src,
                          )
                        }}
                        className="group relative cursor-zoom-in overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900"
                      >
                        <img
                          src={item.src}
                          alt={item.caption}
                          className={`w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110 ${
                            selectedProject.gallery!.length === 1
                              ? 'aspect-[16/9]'
                              : 'aspect-[16/10] sm:aspect-[4/3]'
                          } ${enlargedImage === item.src ? 'scale-110' : 'scale-100'}`}
                        />

                        {/* Dark gradient scrim — fades up from the bottom
                            of the image so the caption sits inside a soft
                            dark wash rather than a separate label bar. */}
                        <div
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
                          style={{
                            background:
                              'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0) 100%)',
                          }}
                        />

                        <figcaption className="absolute inset-x-0 bottom-0 px-3 py-2 text-center">
                          <span className="block text-xs font-semibold text-white">
                            {item.caption}
                          </span>
                          {item.subtitle && (
                            <span className="mt-0.5 block text-[10px] font-medium text-neutral-300">
                              {item.subtitle}
                            </span>
                          )}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </div>
              )}

              {/* Developer Profile — a paired set of photos treated as one
                  unit, with a single shared caption (name + credential)
                  below rather than a caption per image. */}
              {selectedProject.developerProfile && (
                <div className="mt-7">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                    Developer
                  </p>
                  <div className="relative mt-3 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900">
                    <div className="grid grid-cols-2 gap-px bg-neutral-800">
                      {selectedProject.developerProfile.images.map((src, index) => (
                        <div
                          key={src}
                          onClick={(event) => {
                            event.stopPropagation()
                            setEnlargedImage((prev) => (prev === src ? null : src))
                          }}
                          className="group relative cursor-zoom-in overflow-hidden"
                        >
                          <img
                            src={src}
                            alt={`${selectedProject.developerProfile!.name} photo ${index + 1}`}
                            className={`aspect-square w-full object-cover transition-transform duration-300 ease-out group-hover:scale-110 ${
                              index === 0 ? 'object-top' : 'object-center'
                            } ${enlargedImage === src ? 'scale-110' : 'scale-100'}`}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Dark gradient scrim — same treatment as the Project
                        Gallery — fades up from the bottom across both
                        combined photos so the caption sits inside a soft
                        dark wash rather than a separate label bar. */}
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
                      style={{
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.5) 35%, rgba(0,0,0,0) 100%)',
                      }}
                    />

                    <div className="absolute inset-x-0 bottom-0 px-4 py-3 text-center">
                      <span className="block text-sm font-semibold text-white">
                        {selectedProject.developerProfile.name}
                      </span>
                      <span className="mt-0.5 block text-xs font-medium text-neutral-300">
                        {selectedProject.developerProfile.subtitle}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                {selectedProject.documentation ? (
                  <a
                    href={selectedProject.documentation}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#C2542C] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a8461f]"
                  >
                    <FileText size={16} />
                    View Documentation
                  </a>
                ) : (
                  <>
                    {selectedProject.studyPaper ? (
                      <a
                        href={selectedProject.studyPaper}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-700 px-4 py-2.5 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-500 hover:bg-neutral-900"
                      >
                        <FileText size={16} />
                        View Study
                      </a>
                    ) : selectedProject.github ? (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-neutral-700 px-4 py-2.5 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-500 hover:bg-neutral-900"
                      >
                        <SiGithub size={16} />
                        View Repository
                      </a>
                    ) : null}

                    {selectedProject.liveDemo ? (
                      <a
                        href={selectedProject.liveDemo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#C2542C] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#a8461f]"
                      >
                        <ExternalLink size={16} />
                        View Live
                      </a>
                    ) : (
                      <span className="flex flex-1 cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-semibold text-neutral-600">
                        <ExternalLink size={16} />
                        Live Demo Not Available
                      </span>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default FeaturedProjects