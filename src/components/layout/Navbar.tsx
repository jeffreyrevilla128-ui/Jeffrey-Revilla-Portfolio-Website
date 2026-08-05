import { useEffect, useRef, useState, type MouseEvent } from 'react'
import jrrLogo from '../../assets/images/jrr-logo.png'

const navigationLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

function Navbar() {
  // =====================================================
  // MENU STATES
  // =====================================================

  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // =====================================================
  // NAVBAR SCROLL STATE
  // =====================================================

  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const lastScrollY = useRef(0)

  // =====================================================
  // DESKTOP MENU CLOSE TIMER
  // =====================================================

  const desktopCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  )

  const clearDesktopCloseTimer = () => {
    if (desktopCloseTimer.current) {
      clearTimeout(desktopCloseTimer.current)
      desktopCloseTimer.current = null
    }
  }

  // =====================================================
  // DESKTOP MENU OPEN
  // =====================================================

  const openDesktopMenu = () => {
    clearDesktopCloseTimer()
    setIsDesktopMenuOpen(true)
  }

  // =====================================================
  // DESKTOP MENU CLOSE
  //
  // X button closes immediately.
  // =====================================================

  const closeDesktopMenu = () => {
    clearDesktopCloseTimer()
    setIsDesktopMenuOpen(false)
  }

  // =====================================================
  // DESKTOP MENU AUTO CLOSE
  //
  // Starts ONLY after leaving the menu.
  // =====================================================

  const scheduleDesktopMenuClose = () => {
    clearDesktopCloseTimer()

    desktopCloseTimer.current = setTimeout(() => {
      setIsDesktopMenuOpen(false)
      desktopCloseTimer.current = null
    }, 5000)
  }

  // =====================================================
  // MOBILE MENU
  // =====================================================

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((previous) => !previous)
  }

  // =====================================================
  // LOGO CLICK
  //
  // Smooth-scrolls back to the Hero/Home section.
  // =====================================================

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const homeSection = document.querySelector('#home')

    if (homeSection) {
      event.preventDefault()
      homeSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // =====================================================
  // NAVBAR SCROLL BEHAVIOR
  // =====================================================

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const previousScrollY = lastScrollY.current

      if (currentScrollY <= 20) {
        setIsNavbarVisible(true)
        lastScrollY.current = currentScrollY
        return
      }

      // Scrolling down
      if (currentScrollY > previousScrollY) {
        setIsNavbarVisible(false)

        setIsDesktopMenuOpen(false)
        setIsMobileMenuOpen(false)

        clearDesktopCloseTimer()
      }

      // Scrolling up
      else if (currentScrollY < previousScrollY) {
        setIsNavbarVisible(true)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // =====================================================
  // CLEANUP
  // =====================================================

  useEffect(() => {
    return () => {
      clearDesktopCloseTimer()
    }
  }, [])

  return (
    <header
      className={`
        fixed
        inset-x-0
        top-0
        z-50
        px-5
        pt-5
        sm:px-8
        transition-all
        duration-700
        ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          isNavbarVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-[120%] pointer-events-none opacity-0'
        }
      `}
    >
      <div className="relative mx-auto flex max-w-7xl items-center justify-between">

        {/* =====================================================
            JRR LOGO

            Simple, static mark. Clicking it smooth-scrolls
            back to the Hero/Home section.
            ===================================================== */}

        <a
          href="#home"
          aria-label="Jeffrey R. Revilla — back to home"
          onClick={handleLogoClick}
          className="
            relative
            z-20
            flex
            h-12
            w-[58px]
            shrink-0
            items-center
            justify-center
            bg-transparent
            transition-transform
            duration-300
            ease-[cubic-bezier(0.22,1,0.36,1)]
            hover:scale-105
          "
        >
          <img
            src={jrrLogo}
            alt="JRR"
            className="
              h-[38px]
              w-auto
              max-w-[48px]
              object-contain
            "
          />
        </a>

        {/* =====================================================
            DESKTOP NAVIGATION
            ===================================================== */}

        <div
          className="
            absolute
            left-1/2
            top-1/2
            hidden
            -translate-x-1/2
            -translate-y-1/2
            md:block
          "
          onMouseEnter={openDesktopMenu}
          onMouseLeave={scheduleDesktopMenuClose}
        >
          <div
            className={`
              group
              relative
              flex
              items-center
              overflow-hidden
              border
              border-white/15
              bg-neutral-950/85
              backdrop-blur-xl
              transition-all
              duration-[1350ms]
              ease-[cubic-bezier(0.22,1,0.36,1)]
              ${
                isDesktopMenuOpen
                  ? 'w-[430px] rounded-full px-2 py-2 shadow-[0_0_30px_rgba(255,255,255,0.10)]'
                  : 'h-12 w-12 cursor-pointer rounded-full shadow-[0_0_25px_rgba(255,255,255,0.08)] hover:scale-110 hover:shadow-[0_0_45px_rgba(255,255,255,0.18)]'
              }
            `}
          >
            {/* MOVING GLOW */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                -inset-[2px]
                overflow-hidden
                rounded-full
                opacity-90
                blur-[3px]
              "
            >
              <div
                className="
                  absolute
                  inset-[-150%]
                  animate-navbar-glow
                  bg-[conic-gradient(from_0deg,transparent_0deg,transparent_235deg,rgba(255,255,255,0.95)_280deg,rgba(255,255,255,0.25)_305deg,transparent_340deg,transparent_360deg)]
                "
              />
            </div>

            {/* EXTRA HOVER GLOW */}

            {!isDesktopMenuOpen && (
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  -inset-1
                  rounded-full
                  border
                  border-white/40
                  opacity-0
                  blur-[5px]
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
              />
            )}

            {/* INNER DARK SURFACE */}

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                inset-[1px]
                rounded-full
                bg-neutral-950/95
              "
            />

            {/* =================================================
                HAMBURGER / X
                ================================================= */}

            <button
              type="button"
              aria-label={
                isDesktopMenuOpen
                  ? 'Collapse navigation'
                  : 'Expand navigation'
              }
              aria-expanded={isDesktopMenuOpen}
              onClick={
                isDesktopMenuOpen
                  ? closeDesktopMenu
                  : openDesktopMenu
              }
              className="
                relative
                z-20
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-full
                text-white
                transition-transform
                duration-500
                hover:scale-105
              "
            >
              <span
                aria-hidden="true"
                className="
                  relative
                  flex
                  h-4
                  w-4
                  items-center
                  justify-center
                "
              >
                <span
                  className={`
                    absolute
                    left-1/2
                    top-1/2
                    h-px
                    w-4
                    -translate-x-1/2
                    -translate-y-1/2
                    bg-white
                    transition-transform
                    duration-500
                    ${
                      isDesktopMenuOpen
                        ? 'rotate-45'
                        : '-translate-y-[3px]'
                    }
                  `}
                />

                <span
                  className={`
                    absolute
                    left-1/2
                    top-1/2
                    h-px
                    w-4
                    -translate-x-1/2
                    -translate-y-1/2
                    bg-white
                    transition-transform
                    duration-500
                    ${
                      isDesktopMenuOpen
                        ? '-rotate-45'
                        : 'translate-y-[3px]'
                    }
                  `}
                />
              </span>
            </button>

            {/* DESKTOP LINKS */}

            <nav
              aria-label="Main navigation"
              className={`
                relative
                z-10
                flex
                items-center
                gap-1
                overflow-hidden
                transition-all
                duration-[1350ms]
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${
                  isDesktopMenuOpen
                    ? 'ml-2 max-w-[380px] opacity-100'
                    : 'ml-0 max-w-0 opacity-0'
                }
              `}
            >
              {navigationLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="
                    whitespace-nowrap
                    rounded-full
                    px-3
                    py-2
                    text-sm
                    text-neutral-400
                    transition-all
                    duration-300
                    hover:bg-white/[0.07]
                    hover:text-white
                  "
                  style={{
                    transitionDelay: isDesktopMenuOpen
                      ? `${index * 45}ms`
                      : '0ms',
                  }}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>
        </div>

        {/* =====================================================
            LET'S TALK
            ===================================================== */}

        <a
          href="#contact"
          className="
            relative
            z-20
            hidden
            shrink-0
            rounded-full
            border
            border-white/15
            bg-white/[0.03]
            px-5
            py-2.5
            text-sm
            font-medium
            text-white
            transition-all
            duration-300
            hover:border-white/30
            hover:bg-white
            hover:text-black
            md:block
          "
        >
          Let's Talk
        </a>

        {/* =====================================================
            MOBILE MENU BUTTON
            ===================================================== */}

        <button
          type="button"
          aria-label={
            isMobileMenuOpen
              ? 'Close navigation'
              : 'Open navigation'
          }
          aria-expanded={isMobileMenuOpen}
          onClick={toggleMobileMenu}
          className="
            relative
            z-20
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-white/15
            bg-neutral-950/85
            text-white
            shadow-[0_0_20px_rgba(255,255,255,0.08)]
            backdrop-blur-xl
            transition-transform
            duration-500
            hover:scale-110
            md:hidden
          "
        >
          <span
            aria-hidden="true"
            className="
              pointer-events-none
              absolute
              -inset-[2px]
              rounded-full
              border
              border-white/10
              animate-navbar-pulse
            "
          />

          <span
            aria-hidden="true"
            className="
              relative
              flex
              h-4
              w-4
              items-center
              justify-center
            "
          >
            <span
              className={`
                absolute
                left-1/2
                top-1/2
                h-px
                w-4
                -translate-x-1/2
                -translate-y-1/2
                bg-white
                transition-transform
                duration-500
                ${
                  isMobileMenuOpen
                    ? 'rotate-45'
                    : '-translate-y-[3px]'
                }
              `}
            />

            <span
              className={`
                absolute
                left-1/2
                top-1/2
                h-px
                w-4
                -translate-x-1/2
                -translate-y-1/2
                bg-white
                transition-transform
                duration-500
                ${
                  isMobileMenuOpen
                    ? '-rotate-45'
                    : 'translate-y-[3px]'
                }
              `}
            />
          </span>
        </button>
      </div>

      {/* =====================================================
          MOBILE EXPANDED MENU
          ===================================================== */}

      <div
        className={`
          mx-auto
          mt-3
          max-w-sm
          overflow-hidden
          rounded-3xl
          border
          border-white/10
          bg-neutral-950/90
          shadow-[0_0_30px_rgba(255,255,255,0.06)]
          backdrop-blur-xl
          transition-all
          duration-500
          ease-[cubic-bezier(0.22,1,0.36,1)]
          md:hidden
          ${
            isMobileMenuOpen
              ? 'max-h-[28rem] opacity-100'
              : 'max-h-0 border-transparent opacity-0'
          }
        `}
      >
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col p-3"
        >
          {navigationLinks.map((link, index) => (
            <a
              key={link.name}
              href={link.href}
              className="
                rounded-2xl
                px-4
                py-3.5
                text-sm
                text-neutral-300
                transition-all
                duration-300
                hover:bg-white/[0.06]
                hover:text-white
              "
              style={{
                transitionDelay: isMobileMenuOpen
                  ? `${index * 45}ms`
                  : '0ms',
              }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}

          <a
            href="#contact"
            className="
              mt-2
              rounded-full
              bg-white
              px-5
              py-3
              text-center
              text-sm
              font-medium
              text-black
              transition-colors
              duration-300
              hover:bg-neutral-200
            "
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Let's Talk
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar