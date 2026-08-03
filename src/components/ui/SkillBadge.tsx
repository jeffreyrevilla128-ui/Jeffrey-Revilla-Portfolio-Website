import type { ReactNode } from 'react'

interface SkillBadgeProps {
  children: ReactNode
  variant?: 'default' | 'subtle'
}

function SkillBadge({
  children,
  variant = 'default',
}: SkillBadgeProps) {
  const baseStyles =
    'inline-flex items-center rounded-full border px-3 py-1.5 text-xs font-medium transition-colors duration-200'

  const variantStyles = {
    default:
      'border-white/10 bg-white/[0.03] text-neutral-400 hover:border-white/20 hover:text-white',
    subtle:
      'border-white/5 bg-white/[0.02] text-neutral-500 hover:border-white/10 hover:text-neutral-300',
  }

  return (
    <span
      className={`${baseStyles} ${variantStyles[variant]}`}
    >
      {children}
    </span>
  )
}

export default SkillBadge