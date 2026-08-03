interface SocialLink {
  name: string
  href: string
  external?: boolean
}

interface SocialLinksProps {
  links?: SocialLink[]
  direction?: 'row' | 'column'
}

const defaultLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: '#',
    external: true,
  },
  {
    name: 'LinkedIn',
    href: '#',
    external: true,
  },
  {
    name: 'Email',
    href: 'mailto:your@email.com',
  },
]

function SocialLinks({
  links = defaultLinks,
  direction = 'row',
}: SocialLinksProps) {
  return (
    <div
      className={`flex ${
        direction === 'row'
          ? 'flex-row flex-wrap items-center gap-5'
          : 'flex-col items-start gap-3'
      }`}
    >
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          {...(link.external
            ? {
                target: '_blank',
                rel: 'noopener noreferrer',
              }
            : {})}
          className="text-sm font-medium text-neutral-500 transition-colors hover:text-white"
        >
          {link.name}
        </a>
      ))}
    </div>
  )
}

export default SocialLinks