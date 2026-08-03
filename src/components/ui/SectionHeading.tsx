interface SectionHeadingProps {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const alignmentStyles = {
    left: 'text-left',
    center: 'mx-auto text-center',
  }

  return (
    <div className={`max-w-3xl ${alignmentStyles[align]}`}>
      {/* Eyebrow */}
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
        {eyebrow}
      </p>

      {/* Title */}
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className="mt-6 text-base leading-8 text-neutral-400 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  )
}

export default SectionHeading