// Same inline brand icons used in About.tsx / Contact.tsx — kept as plain
// SVGs rather than pulled from an icon package, so there's no dependency
// on that package's export names lining up.
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
)

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.5C10 7.02 11.5 5.63 13.7 5.63c1.05 0 2.15.19 2.15.19v2.37h-1.21c-1.23 0-1.62.77-1.62 1.56V12h2.67l-.43 3h-2.24v6.8c4.56-.93 8-4.96 8-9.8z" />
  </svg>
)

const MailIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const socialLinks = [
  {
    label: 'Email',
    href: 'https://mail.google.com/mail/?view=cm&fs=1&to=jeffreyrevilla128@gmail.com',
    icon: MailIcon,
    external: true,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jeffrey-revilla-9ab321417/',
    icon: LinkedinIcon,
    external: true,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/jeffrey.romerosa.9',
    icon: FacebookIcon,
    external: true,
  },
]

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        {/* Main Footer Content — brand/tagline on one side, social       */}
        {/* icons on the other. No nav links here since the navbar        */}
        {/* already owns in-page navigation.                              */}
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:justify-between sm:text-left">
          <div className="max-w-sm">
            <a
              href="#home"
              className="text-lg font-semibold tracking-tight text-white"
            >
              Jeffrey Revilla
            </a>

            <p className="mt-2 text-sm leading-6 text-neutral-400">
              Full-stack developer focused on building practical,
              scalable web applications that solve real-world problems.
            </p>
          </div>

          <div className="flex items-center gap-5">
            {socialLinks.map(({ label, href, icon: Icon, external }) => (
              <a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                aria-label={label}
                className="text-neutral-500 transition-colors hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} Jeffrey Revilla. All rights reserved.
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