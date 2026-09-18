import { useEffect, useRef, useState } from 'react'

// Renders a single soft, blurred, accent-colored glow that trails the
// mouse with a gentle lag rather than snapping to it 1:1. Mounted once
// at the app root (see usage note below) so it floats above every
// section, tracks the cursor across the whole page, and never resets
// or restarts as the user scrolls between sections.
function CustomCursor() {
  // Touch devices have no persistent cursor to trail, so this renders
  // nothing there rather than leaving a glow stuck in the last place a
  // tap landed.
  const [hasHover, setHasHover] = useState(
    () => typeof window === 'undefined' || window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const handleChange = (event: MediaQueryListEvent) => setHasHover(event.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  const [visible, setVisible] = useState(false)
  const glowRef = useRef<HTMLDivElement | null>(null)

  // The raw pointer position (updated every mousemove) and the eased
  // "trail" position (updated every animation frame) are kept in refs,
  // not state, so the glow can move every frame without triggering a
  // React re-render each time — the DOM is mutated directly instead.
  const targetRef = useRef({ x: 0, y: 0 })
  const trailRef = useRef({ x: 0, y: 0 })
  const frameRef = useRef<number | undefined>(undefined)
  const hasPositionedRef = useRef(false)

  useEffect(() => {
    if (!hasHover) return

    const handleMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY }

      // Snap the trail to the pointer instantly on the very first move
      // so the glow doesn't visibly slide in from the top-left corner
      // the first time the mouse enters the page.
      if (!hasPositionedRef.current) {
        trailRef.current = { x: event.clientX, y: event.clientY }
        hasPositionedRef.current = true
      }

      setVisible(true)
    }

    const handleLeave = () => setVisible(false)

    window.addEventListener('mousemove', handleMove)
    document.documentElement.addEventListener('mouseleave', handleLeave)

    const animate = () => {
      // Ease toward the target each frame — this lag is what reads as
      // a soft trail chasing the pointer instead of glued to it.
      trailRef.current.x += (targetRef.current.x - trailRef.current.x) * 0.12
      trailRef.current.y += (targetRef.current.y - trailRef.current.y) * 0.12

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${trailRef.current.x}px, ${trailRef.current.y}px, 0) translate(-50%, -50%)`
      }

      frameRef.current = requestAnimationFrame(animate)
    }
    frameRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.documentElement.removeEventListener('mouseleave', handleLeave)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
    }
  }, [hasHover])

  if (!hasHover) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={glowRef}
        className={`absolute left-0 top-0 h-28 w-28 rounded-full blur-xl transition-opacity duration-300 ease-out ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle, rgba(232,131,78,0.85), rgba(194,84,44,0.4) 45%, transparent 72%)',
        }}
      />
    </div>
  )
}

export default CustomCursor