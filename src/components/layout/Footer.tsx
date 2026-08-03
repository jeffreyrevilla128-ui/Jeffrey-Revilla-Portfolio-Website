const footerLinks = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Introduction */}
          <div className="max-w-md">
            <a
              href="#home"
              className="text-lg font-semibold tracking-tight text-white"
            >
              Your Name
            </a>

            <p className="mt-4 text-sm leading-6 text-neutral-400">
              Full-stack developer focused on building practical,
              scalable web applications that solve real-world problems.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h2 className="text-sm font-medium text-white">
              Navigation
            </h2>

            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-500 transition-colors hover:text-white"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h2 className="text-sm font-medium text-white">
              Connect
            </h2>

            <div className="mt-4 flex flex-col gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-500 transition-colors hover:text-white"
              >
                GitHub
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-500 transition-colors hover:text-white"
              >
                LinkedIn
              </a>

              <a
                href="mailto:your@email.com"
                className="text-sm text-neutral-500 transition-colors hover:text-white"
              >
                Email
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} Your Name. All rights reserved.
          </p>

          <p>
            Built with React, TypeScript & Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer