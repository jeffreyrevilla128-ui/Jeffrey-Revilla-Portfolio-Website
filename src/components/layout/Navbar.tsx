import { useState } from 'react'

const navigationLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavigation = () => {
    setIsMenuOpen(false)
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
        {/* Logo / Name */}
        <a
          href="#home"
          className="text-lg font-semibold tracking-tight text-white transition-opacity hover:opacity-70"
          onClick={handleNavigation}
        >
          Your Name
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navigationLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm text-neutral-400 transition-colors hover:text-white"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Desktop Contact Button */}
        <a
          href="#contact"
          className="hidden rounded-full border border-white/15 px-5 py-2.5 text-sm font-medium text-white transition-all hover:border-white/30 hover:bg-white hover:text-black md:block"
        >
          Let's Talk
        </a>

        {/* Mobile Menu Button */}
        <button
          type="button"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((previous) => !previous)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:bg-white/10 md:hidden"
        >
          <span className="sr-only">
            {isMenuOpen ? 'Close menu' : 'Open menu'}
          </span>

          <div className="flex w-5 flex-col gap-1.5">
            <span
              className={`h-px w-full bg-white transition-transform ${
                isMenuOpen ? 'translate-y-2 rotate-45' : ''
              }`}
            />

            <span
              className={`h-px w-full bg-white transition-opacity ${
                isMenuOpen ? 'opacity-0' : ''
              }`}
            />

            <span
              className={`h-px w-full bg-white transition-transform ${
                isMenuOpen ? '-translate-y-1.5 -rotate-45' : ''
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-b border-white/10 bg-neutral-950/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isMenuOpen
            ? 'max-h-96 opacity-100'
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col px-6 pb-6 pt-2">
          {navigationLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={handleNavigation}
              className="border-b border-white/5 py-4 text-sm text-neutral-300 transition-colors hover:text-white"
            >
              {link.name}
            </a>
          ))}

          <a
            href="#contact"
            onClick={handleNavigation}
            className="mt-5 rounded-full bg-white px-5 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-neutral-200"
          >
            Let's Talk
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar