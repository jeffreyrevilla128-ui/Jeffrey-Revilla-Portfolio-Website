import { Mail, Phone, Briefcase, ArrowRight } from 'lucide-react'
import heroPhoto from '../../assets/images/hero-photo.png'

// Same inline brand icons used in About.tsx — kept as plain SVGs rather
// than pulled from an icon package, so there's no dependency on that
// package's export names lining up (avoids brittle build-time errors).
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

const contactLinks = [
  {
    label: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=jeffreyrevilla128@gmail.com',
    icon: Mail,
    external: true,
    hoverColor: '#EA4335', // Gmail red
  },
  {
    label: 'Phone',
    href: 'tel:+639381667273',
    icon: Phone,
    external: false,
    hoverColor: '#22C55E', // green, on hover only
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jeffrey-revilla-9ab321417/',
    icon: LinkedinIcon,
    external: true,
    hoverColor: '#0A66C2', // LinkedIn blue
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/jeffrey.romerosa.9',
    icon: FacebookIcon,
    external: true,
    hoverColor: '#1877F2', // Facebook blue
  },
]

// Stagger step between each icon's wave start, in seconds.
const WAVE_STAGGER_STEP = 0.15

function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden border-t border-white/10 bg-neutral-950"
    >
      {/* ================================================== */}
      {/* Wave animation — mobile ("phone mode") only.        */}
      {/* Each icon shares one 2s cycle: a quick bounce near  */}
      {/* the start of the cycle, staggered by WAVE_STAGGER-  */}
      {/* STEP per icon so the bounce sweeps left → right,    */}
      {/* then everything holds still for the rest of the     */}
      {/* cycle (~1s of pause after the last icon lands)      */}
      {/* before the whole wave repeats.                      */}
      {/* ================================================== */}
      <style>{`
        @keyframes contact-wave-bounce {
          0%, 20%, 100% {
            transform: translateY(0) scale(1);
          }
          8% {
            transform: translateY(-10px) scale(1.12);
          }
        }
        @media (max-width: 639px) {
          .wave-icon {
            animation: contact-wave-bounce 2s ease-in-out infinite;
            animation-delay: var(--wave-delay, 0s);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .wave-icon {
            animation: none;
          }
        }
      `}</style>

      {/* ================================================== */}
      {/* Background Decoration — faint diagonal accent lines  */}
      {/* and a rotated square outline, echoing the geometric   */}
      {/* markers used elsewhere on the site.                  */}
      {/* ================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="absolute right-[6%] top-[12%] hidden h-40 w-40 rotate-45 rounded-2xl border border-[#C2542C]/40 sm:block lg:h-56 lg:w-56" />
        <svg
          className="absolute bottom-0 left-0 h-64 w-64 text-[#C2542C]/50 sm:h-80 sm:w-80"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path d="M0 100 L100 0" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0 78 L78 0" stroke="currentColor" strokeWidth="0.5" />
          <path d="M0 56 L56 0" stroke="currentColor" strokeWidth="0.5" />
        </svg>
      </div>

      {/* ================================================== */}
      {/* Portrait — absolute background layer, desktop only. */}
      {/* Content below sits above it and is free to overlap  */}
      {/* it, since it's meant purely as background texture.  */}
      {/* ================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] lg:block"
      >
        <img
          src={heroPhoto}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-[center_28%] opacity-30"
        />
        {/* Fade into the section background on the left edge, and a
            touch of darkening along the bottom so it stays subordinate
            to the content rather than competing with it. */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950/60 to-transparent" />
      </div>

      {/* ================================================== */}
      {/* Content — centered across the full section width.  */}
      {/* ================================================== */}
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-6 py-20 text-center sm:px-8 lg:py-28">

          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-[#C2542C]" />
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-400">
              Contact
            </p>
            <span className="h-px w-8 bg-[#C2542C]" />
          </div>

          {/* Heading */}
          <h2 className="mt-4 max-w-xl text-3xl font-bold leading-[1.15] tracking-tight text-white sm:text-4xl">
            Have a problem that needs a solution?
          </h2>

          {/* Subheading */}
          <p className="mt-4 max-w-md text-base leading-relaxed text-neutral-400 sm:text-lg">
            Let&apos;s turn your ideas into something functional,
            purposeful, and built to last.
          </p>

          {/* Contact Icons */}
          <div className="mt-10 grid grid-cols-4 gap-3 sm:mt-12 sm:flex sm:justify-center sm:gap-8 [&:has(a:hover)_a:not(:hover)]:opacity-40">
            {contactLinks.map(({ label, href, icon: Icon, external, hoverColor }, index) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                style={{
                  ['--brand-color' as string]: hoverColor,
                  ['--wave-delay' as string]: `${index * WAVE_STAGGER_STEP}s`,
                }}
                className="wave-icon group relative flex flex-col items-center text-center transition-all duration-500 ease-out hover:z-10 hover:-translate-y-1.5 hover:scale-110"
              >
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#C2542C]/70 bg-transparent text-white transition-colors duration-500 ease-out group-hover:border-white group-hover:bg-white [@media(hover:none)]:border-white [@media(hover:none)]:bg-white sm:h-16 sm:w-16">
                  {/* Ambient glow — soft accent-color aura behind the icon,
                      the cinematic "focus" cue on hover. On touch devices
                      (no hover capability) this same look is applied by
                      default via the (hover: none) media variant, since a
                      tap can't sustain a hover state. */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 scale-100 rounded-full bg-[#C2542C] opacity-0 blur-xl transition-all duration-500 ease-out group-hover:scale-[1.9] group-hover:opacity-60 [@media(hover:none)]:scale-[1.9] [@media(hover:none)]:opacity-60"
                  />
                  <Icon className="h-4 w-4 transition-all duration-500 ease-out group-hover:scale-110 group-hover:text-[color:var(--brand-color)] group-hover:drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)] [@media(hover:none)]:scale-110 [@media(hover:none)]:text-[color:var(--brand-color)] [@media(hover:none)]:drop-shadow-[0_3px_6px_rgba(0,0,0,0.4)] sm:h-5 sm:w-5" />
                </span>
                <span className="mt-2 text-xs font-semibold text-white transition-opacity duration-500 ease-out sm:mt-3 sm:text-sm">
                  {label}
                </span>
              </a>
            ))}
          </div>

          {/* Divider */}
          <div
            className="mt-10 flex w-full max-w-2xl items-center justify-center gap-3 sm:mt-12"
            aria-hidden="true"
          >
            <span className="h-px flex-1 bg-white/10" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#C2542C]" />
            <span className="h-px flex-1 bg-white/10" />
          </div>

          {/* Availability Strip */}
          <div className="mt-6 flex w-full max-w-2xl flex-col items-center gap-5 sm:mt-8 sm:flex-row sm:items-center sm:justify-center">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#C2542C]/70 text-neutral-300">
                <Briefcase className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <p className="max-w-xs text-left text-sm font-medium leading-snug text-neutral-300 sm:max-w-sm">
                Available for web development, automation, and technical
                opportunities.
              </p>
            </div>

            <span className="hidden h-10 w-px shrink-0 bg-white/15 sm:block" />

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=jeffreyrevilla128@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:border-[#C2542C] hover:bg-[#C2542C]"
            >
              Let&apos;s talk
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </div>
      </div>
    </section>
  )
}

export default Contact