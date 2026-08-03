import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
}

function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/30'

  const variantStyles = {
    primary:
      'bg-white text-black hover:bg-neutral-200',
    secondary:
      'border border-white/15 text-white hover:border-white/30 hover:bg-white/[0.05]',
    ghost:
      'text-neutral-400 hover:text-white',
  }

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-7 py-3.5 text-base',
  }

  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`

  if (href) {
    return (
      <a
        href={href}
        className={styles}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={styles}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button