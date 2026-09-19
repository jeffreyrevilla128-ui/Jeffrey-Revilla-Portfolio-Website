import { useEffect, useRef, useState } from 'react'

// A minimal editorial cursor: a small solid center dot plus a thin
// outer ring that trails behind it with easing.
//
// Contrast is handled explicitly rather than via mix-blend-mode: on
// every pointer move we sample the actual background color under the
// cursor and switch to a light or dark cursor accordingly. This is
// what makes it reliable across sections — mix-blend-mode: difference
// only blends correctly within a single stacking context, and it
// silently breaks the moment a section gets its own stacking context
// (any transform/opacity/filter/will-change — e.g. from a
// framer-motion reveal), which is why the black/white sections
// stopped inverting. Sampling the real color sidesteps that entirely.
//
// On interactive elements the ring eases up in size, switches to a
// faint burnt-orange tint (regardless of section theme), and can show
// a short contextual label (e.g. "VIEW"). Mount once at the app root
// so it persists and keeps tracking across the whole page.
//
// Usage:
//   <CustomCursor />
//
// Interactive elements (a, button, [role="button"], input, textarea,
// select, summary) are picked up automatically, ring-only. Opt into a
// label with data-cursor:
//   <a href="/work/foo" data-cursor="VIEW">...</a>
//   <button data-cursor>...</button>          // uses the default label
//
// Theme detection samples computed background-color automatically. If
// a section's background can't be read this way (an image, a video, a
// canvas, a busy gradient photo) tag its container explicitly and skip
// sampling for it:
//   <section data-cursor-theme="dark">...</section>   // → light cursor
//   <section data-cursor-theme="light">...</section>  // → dark cursor

const DEFAULT_LABEL = 'VIEW'
const RING_EASE = 0.16 // outer ring lag
const DOT_EASE = 0.35 // center dot lag (tighter, feels closer to 1:1)
const BASE_RING_SIZE = 32
const HOVER_RING_SIZE = 64
const MAX_STRETCH = 0.35 // how much the ring elongates at speed
const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, [data-cursor]'

type Theme = 'light' | 'dark'

interface Point {
  x: number
  y: number
}

// Colors per theme: what the cursor looks like when it's sitting over
// a light-background section vs a dark-background section.
const THEME_COLORS: Record<Theme, { fg: string; rgb: string }> = {
  dark: { fg: '#ffffff', rgb: '255,255,255' }, // dark bg → light cursor
  light: { fg: '#111111', rgb: '17,17,17' }, // light bg → dark cursor
}

const ACCENT = { fg: '#e8834e', rgb: '232,131,78' }

// Converts ANY valid CSS color string to RGBA by letting the browser's
// own canvas painter normalize it — this is what makes detection work
// regardless of how a color was declared (oklch(), hsl(), color(),
// named colors, hex, rgb()...). Parsing getComputedStyle's string
// ourselves is brittle: Tailwind v4's default palette is defined in
// oklch(), so a plain rgb()-only regex silently fails to recognize
// those backgrounds, and detection gets "stuck" on whatever theme it
// last managed to parse — which is exactly the stuck-on-black bug.
let swatchCtx: CanvasRenderingContext2D | null | undefined
function cssColorToRgba(colorStr: string): { r: number; g: number; b: number; a: number } | null {
  if (swatchCtx === undefined) {
    const canvas = document.createElement('canvas')
    canvas.width = 1
    canvas.height = 1
    swatchCtx = canvas.getContext('2d', { willReadFrequently: true })
  }
  if (!swatchCtx) return null

  swatchCtx.clearRect(0, 0, 1, 1)
  try {
    swatchCtx.fillStyle = colorStr
  } catch {
    return null
  }
  swatchCtx.fillRect(0, 0, 1, 1)
  const [r, g, b, a] = swatchCtx.getImageData(0, 0, 1, 1).data
  return { r, g, b, a: a / 255 }
}

// Walks up from the element under the pointer looking for either an
// explicit data-cursor-theme override, or the first ancestor with an
// opaque background color, and derives light/dark from its luminance.
function detectTheme(x: number, y: number, fallback: Theme): Theme {
  let el = document.elementFromPoint(x, y) as Element | null

  while (el) {
    const override = el.getAttribute?.('data-cursor-theme')
    if (override === 'light' || override === 'dark') return override

    const computed = window.getComputedStyle(el).backgroundColor
    const rgb = cssColorToRgba(computed)
    if (rgb && rgb.a > 0.5) {
      // Relative luminance (simplified, no gamma correction — fine for
      // a light/dark threshold decision).
      const luminance = (0.2126 * rgb.r + 0.7152 * rgb.g + 0.0722 * rgb.b) / 255
      return luminance > 0.5 ? 'light' : 'dark'
    }

    el = el.parentElement
  }

  return fallback
}

function CustomCursor() {
  const [hasHover, setHasHover] = useState(
    () => typeof window === 'undefined' || window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  useEffect(() => {
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)')
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleHoverChange = (e: MediaQueryListEvent) => setHasHover(e.matches)
    const handleMotionChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches)

    // Safari < 14 fallback: addEventListener may not exist on MediaQueryList.
    if (hoverQuery.addEventListener) {
      hoverQuery.addEventListener('change', handleHoverChange)
      motionQuery.addEventListener('change', handleMotionChange)
    }

    return () => {
      if (hoverQuery.removeEventListener) {
        hoverQuery.removeEventListener('change', handleHoverChange)
        motionQuery.removeEventListener('change', handleMotionChange)
      }
    }
  }, [])

  const [visible, setVisible] = useState(false)
  const [isInteractive, setIsInteractive] = useState(false)
  const [label, setLabel] = useState('')
  const [theme, setTheme] = useState<Theme>('dark')

  const dotRef = useRef<HTMLDivElement | null>(null)
  const ringRef = useRef<HTMLDivElement | null>(null)

  const targetRef = useRef<Point>({ x: 0, y: 0 })
  const dotTrailRef = useRef<Point>({ x: 0, y: 0 })
  const ringTrailRef = useRef<Point>({ x: 0, y: 0 })
  const prevRingRef = useRef<Point>({ x: 0, y: 0 })
  const frameRef = useRef<number | undefined>(undefined)
  const hasPositionedRef = useRef(false)
  const themeRef = useRef<Theme>('dark')
  const lastThemeCheckRef = useRef(0)

  useEffect(() => {
    if (!hasHover) return

    const handleMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY }

      // Snap both dot and ring to the pointer instantly on first entry
      // (and again after re-entering the window) so nothing streaks
      // in from a stale position.
      if (!hasPositionedRef.current) {
        dotTrailRef.current = { x: event.clientX, y: event.clientY }
        ringTrailRef.current = { x: event.clientX, y: event.clientY }
        prevRingRef.current = { x: event.clientX, y: event.clientY }
        hasPositionedRef.current = true
      }

      setVisible(true)
    }

    const handleLeave = () => {
      setVisible(false)
      // Force a re-snap next time the pointer re-enters, rather than
      // easing in from wherever it last was.
      hasPositionedRef.current = false
    }

    const handleOver = (event: MouseEvent) => {
      const target = event.target as Element | null
      const match = target?.closest(INTERACTIVE_SELECTOR)
      if (match) {
        setIsInteractive(true)
        // Label only shows when explicitly requested via data-cursor;
        // native buttons/inputs still enlarge the ring but stay silent
        // unless opted in (data-cursor="VIEW" or bare data-cursor for
        // the default label).
        const attr = match.getAttribute('data-cursor')
        setLabel(attr === '' ? DEFAULT_LABEL : attr || '')
      } else {
        setIsInteractive(false)
        setLabel('')
      }
    }

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)
    window.addEventListener('mouseover', handleOver)

    const animate = (now: number) => {
      const target = targetRef.current

      // Dot stays close to the pointer; ring lags further behind,
      // which is what creates the sense of the ring "chasing" the dot.
      dotTrailRef.current.x += (target.x - dotTrailRef.current.x) * DOT_EASE
      dotTrailRef.current.y += (target.y - dotTrailRef.current.y) * DOT_EASE

      prevRingRef.current = { ...ringTrailRef.current }
      ringTrailRef.current.x += (target.x - ringTrailRef.current.x) * RING_EASE
      ringTrailRef.current.y += (target.y - ringTrailRef.current.y) * RING_EASE

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotTrailRef.current.x}px, ${dotTrailRef.current.y}px, 0) translate(-50%, -50%)`
      }

      if (ringRef.current) {
        const dx = ringTrailRef.current.x - prevRingRef.current.x
        const dy = ringTrailRef.current.y - prevRingRef.current.y
        const speed = Math.min(Math.hypot(dx, dy), 40)

        let rotation = 0
        let stretch = 0
        if (!prefersReducedMotion && speed > 0.5) {
          rotation = (Math.atan2(dy, dx) * 180) / Math.PI
          stretch = (speed / 40) * MAX_STRETCH
        }

        const scaleX = 1 + stretch
        const scaleY = 1 - stretch * 0.5

        ringRef.current.style.transform = `translate3d(${ringTrailRef.current.x}px, ${ringTrailRef.current.y}px, 0) translate(-50%, -50%) rotate(${rotation}deg) scale(${scaleX}, ${scaleY})`
      }

      // Re-sample the background under the pointer a few times a
      // second rather than every frame — section backgrounds don't
      // change pixel-by-pixel, and this keeps getComputedStyle calls
      // cheap. The CSS color transition smooths the actual swap.
      if (now - lastThemeCheckRef.current > 80) {
        lastThemeCheckRef.current = now
        const detected = detectTheme(target.x, target.y, themeRef.current)
        if (detected !== themeRef.current) {
          themeRef.current = detected
          setTheme(detected)
        }
      }

      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      window.removeEventListener('mouseover', handleOver)
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current)
    }
  }, [hasHover, prefersReducedMotion])

  if (!hasHover) return null

  const ringSize = isInteractive ? HOVER_RING_SIZE : BASE_RING_SIZE
  const colors = isInteractive ? ACCENT : THEME_COLORS[theme]

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Outer ring: thin, eased, deforms slightly with movement speed.
          Color is driven by the sampled section theme (or the accent
          on hover), transitioning smoothly across section boundaries. */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 flex items-center justify-center rounded-full transition-[width,height,border-color,background-color,opacity] duration-200 ease-out"
        style={{
          width: ringSize,
          height: ringSize,
          opacity: visible ? 1 : 0,
          border: `1px solid ${colors.fg}`,
          backgroundColor: isInteractive ? `rgba(${colors.rgb},0.07)` : 'transparent',
        }}
      >
        <span
          className="select-none text-[10px] font-medium tracking-[0.14em] transition-opacity duration-200 ease-out"
          style={{
            color: ACCENT.fg,
            opacity: isInteractive && label ? 1 : 0,
          }}
        >
          {label}
        </span>
      </div>

      {/* Center dot: near 1:1 with the pointer, fades out on hover so
          it doesn't compete with the enlarged ring / label. */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1.5 w-1.5 rounded-full transition-[background-color,opacity] duration-200 ease-out"
        style={{
          backgroundColor: colors.fg,
          opacity: visible && !isInteractive ? 1 : 0,
        }}
      />
    </div>
  )
}

export default CustomCursor