import { useEffect, useRef, useState, type ComponentType } from 'react'
import {
  SiReact,
  SiTypescript,
  SiVuedotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiPostgresql,
  SiSupabase,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiGoogledocs,
  SiGooglesheets,
  SiGoogledrive,
} from '@icons-pack/react-simple-icons'
import {
  Network,
  Database,
  Brain,
  Sparkles,
  KeyRound,
  Webhook,
  Share2,
  Code2,
  FileCode2,
  FileText,
  FileSpreadsheet,
  Presentation,
  ArrowRight,
  Server,
  Wrench,
  X,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/*  (Previously in ../../data/skills — inlined here so this section   */
/*  has no external dependencies.)                                    */
/* ------------------------------------------------------------------ */

interface Skill {
  name: string
  description?: string
  icon?: string
  /** 0-100. Estimated for now — tune to taste. */
  proficiency?: number
}

interface SkillCategory {
  id: string
  title: string
  description: string
  /** Key into categoryIconMap — shown as a small avatar in the mobile sheet header. */
  icon: string
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description:
      'Building responsive, interactive, and user-focused web interfaces.',
    icon: 'code',
    skills: [
      { name: 'React', description: 'Component-based frontend development', icon: 'react', proficiency: 75 },
      { name: 'TypeScript', description: 'Typed application development', icon: 'typescript', proficiency: 85 },
      { name: 'Vue.js', description: 'Frontend application development', icon: 'vuejs', proficiency: 90 },
      { name: 'Tailwind CSS', description: 'Utility-first responsive styling', icon: 'tailwindcss', proficiency: 92 },
      { name: 'HTML', description: 'Semantic web structure', icon: 'html5', proficiency: 95 },
      { name: 'CSS', description: 'Custom styling and responsive layouts', icon: 'css3', proficiency: 90 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    description:
      'Developing server-side applications, APIs, and application logic.',
    icon: 'server',
    skills: [
      { name: 'Node.js', description: 'JavaScript runtime for backend applications', icon: 'nodejs', proficiency: 85 },
      { name: 'Express.js', description: 'REST API and server-side development', icon: 'express', proficiency: 82 },
      { name: 'REST APIs', description: 'API development and integration', icon: 'rest-api', proficiency: 88 },
      { name: 'Laravel', description: 'PHP framework for backend application development', icon: 'laravel', proficiency: 75 },
    ],
  },
  {
    id: 'database',
    title: 'Database',
    description:
      'Working with relational databases and application data structures.',
    icon: 'database',
    skills: [
      { name: 'PostgreSQL', description: 'Relational database development', icon: 'postgresql', proficiency: 80 },
      { name: 'pgAdmin', description: 'PostgreSQL database management', icon: 'pgadmin', proficiency: 78 },
      { name: 'pgvector', description: 'Vector similarity search with PostgreSQL', icon: 'pgvector', proficiency: 65 },
      { name: 'Supabase', description: 'Backend-as-a-service with Postgres, auth, and storage', icon: 'supabase', proficiency: 78 },
    ],
  },
  {
    id: 'ai-integration',
    title: 'Third Party Integrations',
    description:
      'Connecting pretrained AI models, APIs, and external services to existing applications and workflows.',
    icon: 'sparkles',
    skills: [
      { name: 'AI Model Integration', description: 'Connecting pretrained AI models to application workflows', icon: 'ai-model', proficiency: 78 },
      { name: 'AI APIs', description: 'Wiring third-party AI services into existing systems', icon: 'ai-api', proficiency: 80 },
      { name: 'OAuth', description: 'Implementing secure authentication and authorization with external providers', icon: 'oauth', proficiency: 75 },
      { name: 'Webhooks', description: 'Setting up event-driven communication between services', icon: 'webhooks', proficiency: 80 },
      { name: 'Third-Party APIs', description: 'Integrating external services and platforms into existing systems', icon: 'third-party-api', proficiency: 82 },
    ],
  },
  {
    id: 'development-tools',
    title: 'Development Tools',
    description:
      'Tools used for development, testing, version control, and application deployment.',
    icon: 'wrench',
    skills: [
      { name: 'Git', description: 'Version control', icon: 'git', proficiency: 90 },
      { name: 'GitHub', description: 'Source control and collaboration', icon: 'github', proficiency: 88 },
      { name: 'Docker', description: 'Application containerization', icon: 'docker', proficiency: 75 },
      { name: 'Postman', description: 'API testing and development', icon: 'postman', proficiency: 85 },
      { name: 'VS Code', description: 'Primary development environment', icon: 'vscode', proficiency: 95 },
    ],
  },
  {
    id: 'data-entry',
    title: 'Data Entry & Documentation',
    description:
      'Organizing, documenting, and managing data and records with everyday office tools.',
    icon: 'file-text',
    skills: [
      { name: 'Google Docs', description: 'Document creation and collaboration', icon: 'googledocs', proficiency: 92 },
      { name: 'Google Sheets', description: 'Spreadsheet data entry and analysis', icon: 'googlesheets', proficiency: 90 },
      { name: 'Google Drive', description: 'Cloud file storage and organization', icon: 'googledrive', proficiency: 90 },
      { name: 'Microsoft Word', description: 'Document formatting and editing', icon: 'msword', proficiency: 92 },
      { name: 'Microsoft Excel', description: 'Spreadsheet data entry and analysis', icon: 'msexcel', proficiency: 90 },
      { name: 'Microsoft PowerPoint', description: 'Presentation design and formatting', icon: 'mspowerpoint', proficiency: 85 },
    ],
  },
]

/* ------------------------------------------------------------------ */
/*  Icon map                                                          */
/*  Real brand logos (Simple Icons) where an official one exists;     */
/*  generic outline icons (lucide-react) for concepts with no logo    */
/*  of their own (REST APIs, OAuth, Webhooks, AI, pgAdmin, pgvector,  */
/*  and Word/Excel/PowerPoint — Simple Icons has no Microsoft Office  */
/*  brand marks, only the Google Workspace ones).                     */
/* ------------------------------------------------------------------ */

type IconComponent = ComponentType<{ size?: number; color?: string; className?: string }>

interface IconEntry {
  Icon: IconComponent
  color: string
  /** Color to use for the proficiency bar/percentage text instead of `color`.
   *  Needed for brand marks that are near-black (Express, GitHub) — those
   *  read fine on the white icon tile but would be invisible as a bar
   *  fill against the black card, so they use white there instead. */
  barColor?: string
}

// Simple Icons render with fill="currentColor" by default, so each brand
// icon needs its official hex passed explicitly to show its real color
// instead of inheriting black/gray text. Generic (non-branded) icons get
// a hand-picked accent color instead, since they have no official mark.
const iconMap: Record<string, IconEntry> = {
  react: { Icon: SiReact, color: '#0891B2' },
  typescript: { Icon: SiTypescript, color: '#3178C6' },
  vuejs: { Icon: SiVuedotjs, color: '#4FC08D' },
  tailwindcss: { Icon: SiTailwindcss, color: '#0E7490' },
  html5: { Icon: SiHtml5, color: '#E34F26' },
  css3: { Icon: SiCss, color: '#663399' },
  nodejs: { Icon: SiNodedotjs, color: '#5FA04E' },
  express: { Icon: SiExpress, color: '#000000', barColor: '#FFFFFF' }, // official mark is near-black; shown on a white tile, white bar for visibility
  laravel: { Icon: SiLaravel, color: '#FF2D20' },
  postgresql: { Icon: SiPostgresql, color: '#4169E1' },
  supabase: { Icon: SiSupabase, color: '#059669' },
  git: { Icon: SiGit, color: '#F05032' },
  github: { Icon: SiGithub, color: '#181717', barColor: '#FFFFFF' }, // official mark is near-black; shown on a white tile, white bar for visibility
  docker: { Icon: SiDocker, color: '#2496ED' },
  postman: { Icon: SiPostman, color: '#FF6C37' },
  googledocs: { Icon: SiGoogledocs, color: '#4285F4' },
  googlesheets: { Icon: SiGooglesheets, color: '#34A853' },
  googledrive: { Icon: SiGoogledrive, color: '#4285F4' },
  msword: { Icon: FileText, color: '#2B579A' }, // no official Word mark in this icon set; generic doc icon in Word's real brand blue
  msexcel: { Icon: FileSpreadsheet, color: '#217346' }, // no official Excel mark in this icon set; generic sheet icon in Excel's real brand green
  mspowerpoint: { Icon: Presentation, color: '#B7472A' }, // no official PowerPoint mark in this icon set; generic slide icon in PowerPoint's real brand red-orange

  // No official brand mark available for these — generic icons with a
  // fitting accent color instead.
  vscode: { Icon: FileCode2, color: '#007ACC' }, // VS Code's real brand blue
  'rest-api': { Icon: Network, color: '#0369A1' },
  pgadmin: { Icon: Database, color: '#336791' },
  pgvector: { Icon: Database, color: '#4169E1' },
  'ai-model': { Icon: Brain, color: '#6D28D9' },
  'ai-api': { Icon: Sparkles, color: '#7E22CE' },
  oauth: { Icon: KeyRound, color: '#B45309' },
  webhooks: { Icon: Webhook, color: '#047857' },
  'third-party-api': { Icon: Share2, color: '#1D4ED8' },
}

const fallbackIcon: IconEntry = { Icon: Code2, color: '#C2542C' }

function getIconEntry(skill: Skill): IconEntry {
  return (skill.icon && iconMap[skill.icon]) || fallbackIcon
}

// Small set of generic icons representing each category as a whole (not a
// specific tool) — used only for the avatar in the mobile bottom-sheet
// header. Always shown in the site's burnt-orange accent, not a brand color.
const categoryIconMap: Record<string, IconComponent> = {
  code: Code2,
  server: Server,
  database: Database,
  sparkles: Sparkles,
  wrench: Wrench,
  'file-text': FileText,
}

function getCategoryIcon(category: SkillCategory): IconComponent {
  return categoryIconMap[category.icon] || Code2
}

/* ------------------------------------------------------------------ */
/*  Animated Proficiency Bar                                          */
/*  Starts at 0% and fills to the real value the moment it mounts —   */
/*  i.e. the moment a skill row actually becomes visible (desktop     */
/*  hover-reveal, or the mobile sheet opening). A double rAF defers   */
/*  the width change to the frame *after* the 0% state has painted,   */
/*  so the browser has something to transition from instead of       */
/*  jumping straight to the final width.                              */
/* ------------------------------------------------------------------ */

function AnimatedProficiencyBar({
  proficiency,
  color,
  trackClassName,
}: {
  proficiency: number
  color: string
  trackClassName: string
}) {
  const [filled, setFilled] = useState(false)

  useEffect(() => {
    setFilled(false)
    let raf2 = 0
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setFilled(true))
    })
    return () => {
      cancelAnimationFrame(raf1)
      cancelAnimationFrame(raf2)
    }
  }, [proficiency])

  return (
    <div className={trackClassName}>
      {/* Full-width bar scaled down/up via transform rather than animating
          `width` — transform is handled on the compositor thread (no layout
          recalculation on every frame), so it stays smooth even when
          several bars are animating at once, as happens whenever a desktop
          card reveals its whole skill list together. */}
      <div
        className="h-full w-full origin-left rounded-full transition-transform duration-[1600ms] ease-out will-change-transform"
        style={{ transform: `scaleX(${filled ? proficiency / 100 : 0})`, backgroundColor: color }}
      />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Skill Icon Grid                                                    */
/*  Idle: compact icon tiles, auto-scrolling in an endless loop.       */
/*  Active (hovered): the scroll stops and each icon expands into a    */
/*  static row with the stack's name and a proficiency bar, so it's    */
/*  easy to actually read. Direction (idle only) set per category by   */
/*  the parent.                                                        */
/* ------------------------------------------------------------------ */

interface SkillIconGridProps {
  skills: Skill[]
  active: boolean
  direction: 'up' | 'down'
}

function SkillIconGrid({ skills, active, direction }: SkillIconGridProps) {
  // Idle/preview row: icon only, on a white square.
  const renderIconTile = (skill: Skill, key: string) => {
    const { Icon, color } = getIconEntry(skill)

    return (
      <div
        key={key}
        className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-[0_0_22px_var(--glow-color)] sm:h-24 sm:w-24 lg:h-28 lg:w-28"
        style={{ '--glow-color': `${color}99` } as React.CSSProperties}
      >
        <Icon size={30} color={color} className="sm:hidden" />
        <Icon size={46} color={color} className="hidden sm:block lg:hidden" />
        <Icon size={54} color={color} className="hidden lg:block" />
      </div>
    )
  }

  // Active/hovered row: small icon + name + a proficiency bar.
  // Rendered only while the parent card is active — i.e. only ever on the
  // white hovered-card background — so colors here are tuned for that,
  // not the dark idle card.
  const renderDetailRow = (skill: Skill, key: string) => {
    const { Icon, color } = getIconEntry(skill)
    const proficiency = skill.proficiency ?? 75
    // Always use the true brand color: on white, even the near-black marks
    // (GitHub, Express) read with plenty of contrast, so the white
    // `barColor` override those entries carry — needed only to survive the
    // old dark card — is skipped here.
    const fillColor = color

    return (
      <div
        key={key}
        className="flex w-full max-w-[210px] shrink-0 items-center gap-2.5 sm:max-w-[240px] sm:gap-3"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-neutral-900/10 sm:h-10 sm:w-10">
          <Icon size={16} color={color} className="sm:hidden" />
          <Icon size={20} color={color} className="hidden sm:block" />
        </div>
        <div className="min-w-0 flex-1 text-left">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate text-[11px] font-medium text-neutral-900 sm:text-xs">{skill.name}</p>
            <span className="shrink-0 text-[10px] font-semibold sm:text-[11px]" style={{ color: fillColor }}>
              {proficiency}%
            </span>
          </div>
          {skill.description && (
            <p className="mt-0.5 truncate text-[9px] leading-tight text-neutral-500 sm:text-[10px]">
              {skill.description}
            </p>
          )}
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-neutral-900/10">
            <AnimatedProficiencyBar
              proficiency={proficiency}
              color={fillColor}
              trackClassName="h-full w-full"
            />
          </div>
        </div>
      </div>
    )
  }

  // Active/hovered: a static, non-scrolling list of detail rows — the
  // motion pauses here on purpose so the name + proficiency bar are easy
  // to actually read. Scrollable (with a hidden scrollbar) as a fallback
  // in case a category has more skills than the card has room for.
  if (active) {
    return (
      <div
        className="flex h-full w-full flex-col items-center justify-center gap-3 overflow-y-auto py-1 sm:gap-4 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {skills.map((skill) => renderDetailRow(skill, skill.name))}
      </div>
    )
  }

  // Idle/preview: the list is duplicated back-to-back and the whole track
  // is translated by exactly 50% of its own height (which equals the
  // height of one un-duplicated copy) — a seamless, endlessly looping
  // scroll with no visible jump. This keeps drifting even before the
  // card is hovered.
  const loopedSkills = [...skills, ...skills]
  const animationName = direction === 'down' ? 'skillsScrollDown' : 'skillsScrollUp'

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div
        className="absolute inset-x-0 top-0 flex flex-col items-center gap-4 sm:gap-6 lg:gap-7"
        style={{ animation: `${animationName} 14s linear infinite` }}
      >
        {loopedSkills.map((skill, i) => renderIconTile(skill, `${skill.name}-${i}`))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Mobile Skill Sheet                                                 */
/*  Phones have no hover state, so tapping a category can't "reveal"   */
/*  content in place the way desktop hover does — there's no room in   */
/*  a compact card to show a whole tool list and still be readable.    */
/*  Instead the card stays compact and a tap opens this modal: a tall, */
/*  white panel centered on screen (deliberately breaking from the     */
/*  dark page so the tool list is unmistakably a distinct layer), with */
/*  each tool as its own shadowed row, stacked one per line. Desktop's */
/*  inline hover-reveal is untouched; this only ever renders on small  */
/*  screens (`sm:hidden`).                                             */
/* ------------------------------------------------------------------ */

function MobileSkillTile({ skill }: { skill: Skill }) {
  const { Icon, color } = getIconEntry(skill)
  const proficiency = skill.proficiency ?? 75

  return (
    <div className="flex items-center gap-3 rounded-xl bg-white p-3 shadow-[0_8px_20px_-8px_rgba(0,0,0,0.18)] ring-1 ring-neutral-900/5">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-neutral-50 shadow-inner">
        <Icon size={20} color={color} />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p className="truncate text-[13px] font-medium text-neutral-900">{skill.name}</p>
          <span className="shrink-0 text-[11px] font-semibold" style={{ color }}>
            {proficiency}%
          </span>
        </div>
        {skill.description && (
          <p className="mt-0.5 truncate text-[11px] leading-tight text-neutral-500">
            {skill.description}
          </p>
        )}
        <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-neutral-100">
          <AnimatedProficiencyBar
            proficiency={proficiency}
            color={color}
            trackClassName="h-full w-full"
          />
        </div>
      </div>
    </div>
  )
}

interface MobileSkillSheetProps {
  category: SkillCategory | null
  open: boolean
  onClose: () => void
}

function MobileSkillSheet({ category, open, onClose }: MobileSkillSheetProps) {
  // Keep the last category rendered while the sheet is animating closed,
  // so the panel doesn't blank out mid-transition. Once fully closed
  // (`category` becomes null after the parent's timeout) this unmounts.
  if (!category) return null

  const CategoryIcon = getCategoryIcon(category)

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-5 sm:hidden ${
        open ? '' : 'pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label={`${category.title} tools`}
    >
      {/* Backdrop */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 transition-opacity duration-300 ease-out ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Panel — white, centered, and tall so the tool list reads clearly
          against a page that's otherwise all dark/orange. */}
      <div
        className={`relative flex h-[78vh] w-full max-w-sm flex-col rounded-3xl bg-white shadow-[0_30px_70px_-15px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out ${
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Drag handle — visual affordance suggesting the sheet can be
            swiped closed, even though the swipe gesture itself isn't wired
            up (close is via the X, backdrop, outside tap, or Escape). */}
        <div
          aria-hidden="true"
          className="mx-auto mt-2.5 h-1.5 w-10 shrink-0 rounded-full bg-neutral-300"
        />

        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-4 px-5 pt-4">
          <div className="flex min-w-0 items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#C2542C]/10">
              <CategoryIcon size={20} color="#C2542C" />
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-bold text-neutral-900">{category.title}</h3>
              <p className="mt-1 text-[11px] leading-relaxed text-neutral-500">
                {category.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 transition-colors hover:bg-neutral-200 hover:text-neutral-900"
          >
            <X size={16} />
          </button>
        </div>

        {/* Tools — one per line, stacked vertically */}
        <div
          className="mt-4 flex flex-1 flex-col gap-2.5 overflow-y-auto px-5 pb-5 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#C2542C]">
            Skills
          </span>
          {category.skills.map((skill) => (
            <MobileSkillTile key={skill.name} skill={skill} />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Skills Section                                                    */
/* ------------------------------------------------------------------ */

function Skills() {
  // Tracks which card is currently active (hovered / focused / tapped),
  // so that card alone can swap its own content in place — no modal.
  const [activeId, setActiveId] = useState<string | null>(null)

  // Mobile only: briefly flashes an accent-colored glow on the tapped card
  // the instant it's tapped, before the bottom sheet slides in — a quick
  // "acknowledged" flash rather than the static hover border desktop gets.
  const [tappedId, setTappedId] = useState<string | null>(null)

  // Cursor position for the interactive background grid below, reprojected
  // to 0%..100% so it can drive the --cursor-x/--cursor-y CSS vars that
  // the glow layers track. Same approach as Hero's background.
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 })
  const sectionRef = useRef<HTMLElement | null>(null)

  // True for devices with a real mouse (can actually hover). Phones and
  // most tablets report false, which routes taps to the bottom sheet
  // below instead of the desktop inline hover-reveal. Re-checked on
  // change so a window resize / external-mouse connect stays accurate.
  const [hasHover, setHasHover] = useState(
    () => typeof window === 'undefined' || window.matchMedia('(hover: hover) and (pointer: fine)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const handleChange = (event: MediaQueryListEvent) => setHasHover(event.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  // True below the `sm` breakpoint (phones). Touch devices at or above it
  // (tablets) are wide enough that the bottom sheet's own `sm:hidden`
  // styling would hide it — those should get the same inline flip desktop
  // gets via click, just triggered by tap instead of hover.
  const [isNarrow, setIsNarrow] = useState(
    () => typeof window === 'undefined' || window.matchMedia('(max-width: 639px)').matches,
  )

  useEffect(() => {
    const query = window.matchMedia('(max-width: 639px)')
    const handleChange = (event: MediaQueryListEvent) => setIsNarrow(event.matches)
    query.addEventListener('change', handleChange)
    return () => query.removeEventListener('change', handleChange)
  }, [])

  // Touch devices only get the bottom sheet on phone-width viewports.
  // Touch devices at tablet width instead flip the card in place, same as
  // desktop's click-to-toggle, so tapping a second card closes the first.
  const usesSheet = !hasHover && isNarrow

  // Mobile bottom sheet: `sheetCategory` stays populated through the
  // closing transition (see MobileSkillSheet) so the panel doesn't blank
  // out before it finishes sliding down; `sheetOpen` drives the transition.
  const [sheetCategory, setSheetCategory] = useState<SkillCategory | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  const openSheet = (category: SkillCategory) => {
    setTappedId(category.id)
    setSheetCategory(category)
    requestAnimationFrame(() => setSheetOpen(true))
    window.setTimeout(() => setTappedId(null), 450)
  }

  const closeSheet = () => {
    setSheetOpen(false)
    window.setTimeout(() => setSheetCategory(null), 300)
  }

  // Close on Escape, and lock page scroll while the sheet is open.
  useEffect(() => {
    if (!sheetCategory) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeSheet()
    }
    document.addEventListener('keydown', handleKeyDown)

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [sheetCategory])

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const section = sectionRef.current
    if (!section) return

    const bounds = section.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width
    const y = (event.clientY - bounds.top) / bounds.height

    setCursor({ x, y })
  }

  const cursorX = `${cursor.x * 100}%`
  const cursorY = `${cursor.y * 100}%`

  return (
    <section
      id="skills"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative border-t border-white/10 bg-neutral-950 px-6 pt-16 pb-12 sm:pt-20 sm:pb-16 lg:px-8 lg:pt-24 lg:pb-20"
      style={{ ['--cursor-x' as string]: cursorX, ['--cursor-y' as string]: cursorY }}
    >
      {/* ================================================== */}
      {/* Interactive background grid — same cursor-reactive   */}
      {/* dot grid + ambient wash used in Hero's background    */}
      {/* ================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Faint dot grid, always present at very low opacity — reads as
            circuitry/blueprint texture rather than decoration */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1.5px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Same dot grid, lit in the accent gradient, but only revealed
            in a soft circle that follows the cursor. Two mask layers
            (the repeating dot shape, and the cursor spotlight) are
            intersected so only nearby dots ever light up. */}
        <div
          className="absolute inset-0 hidden transition-opacity duration-500 sm:block"
          style={{
            opacity: 0.9,
            backgroundImage: 'linear-gradient(135deg, #E8834E, #C2542C)',
            WebkitMaskImage:
              'radial-gradient(rgba(0,0,0,1) 1px, transparent 1.5px), radial-gradient(420px circle at var(--cursor-x) var(--cursor-y), rgba(0,0,0,1), transparent 72%)',
            WebkitMaskSize: '28px 28px, 100% 100%',
            WebkitMaskRepeat: 'repeat, no-repeat',
            WebkitMaskComposite: 'source-in',
            maskImage:
              'radial-gradient(rgba(0,0,0,1) 1px, transparent 1.5px), radial-gradient(420px circle at var(--cursor-x) var(--cursor-y), rgba(0,0,0,1), transparent 72%)',
            maskSize: '28px 28px, 100% 100%',
            maskRepeat: 'repeat, no-repeat',
            maskComposite: 'intersect',
          }}
        />

        {/* Soft ambient wash of the accent gradient, centered on the
            cursor — barely-there warmth, not a spotlight */}
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background:
              'radial-gradient(600px circle at var(--cursor-x) var(--cursor-y), rgba(232,131,78,0.06), transparent 70%)',
          }}
        />
      </div>

      {/* Keyframes for the auto-scrolling tech-stack list (used inline in SkillIconGrid) */}
      <style>{`
        @keyframes skillsScrollUp {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes skillsScrollDown {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
        @keyframes skillTapGlow {
          0% {
            box-shadow: 0 0 0 3px rgba(232,131,78,0.65), 0 0 46px rgba(232,131,78,0.55);
          }
          100% {
            box-shadow: 0 0 0 3px rgba(232,131,78,0), 0 0 46px rgba(232,131,78,0);
          }
        }
      `}</style>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#C2542C]/70">
            Skills &amp; Technologies
          </span>

          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Technologies I Use to Build Solutions
          </h2>

          <div
            className="mx-auto mt-5 flex items-center justify-center gap-3 sm:mt-6"
            aria-hidden="true"
          >
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-[#C2542C]/60" />
            <span className="h-1.5 w-1.5 rotate-45 bg-[#C2542C]" />
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-[#C2542C]/60" />
          </div>
        </div>

        {/* Column Grid — separated panels, each swapping its own content
            (title → tech-stack icons) in place on hover/focus/tap. No modal. */}
        <div className="mt-12 sm:mt-16 lg:mt-20">
          <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-3 sm:gap-y-5 sm:gap-x-[1.125rem] lg:gap-y-6 lg:gap-x-[1.35rem]">
            {skillCategories.map((category, index) => {
              const isActive = activeId === category.id

              return (
                <article
                  key={category.id}
                  onMouseEnter={() => hasHover && setActiveId(category.id)}
                  onMouseLeave={() => hasHover && setActiveId(null)}
                  onClick={() =>
                    usesSheet
                      ? openSheet(category)
                      : setActiveId((current) => (current === category.id ? null : category.id))
                  }
                  onFocus={() => hasHover && setActiveId(category.id)}
                  onBlur={() => hasHover && setActiveId(null)}
                  onKeyDown={(event) => {
                    if (event.key !== 'Enter' && event.key !== ' ') return
                    event.preventDefault()
                    usesSheet
                      ? openSheet(category)
                      : setActiveId((current) => (current === category.id ? null : category.id))
                  }}
                  tabIndex={0}
                  role="button"
                  aria-haspopup={usesSheet ? 'dialog' : undefined}
                  aria-expanded={usesSheet ? sheetCategory?.id === category.id : isActive}
                  aria-label={
                    usesSheet ? `${category.title} — view tools` : `${category.title} — show tech stack`
                  }
                  style={tappedId === category.id ? { animation: 'skillTapGlow 450ms ease-out' } : undefined}
                  className={`group relative h-52 flex-1 cursor-pointer overflow-hidden rounded-t-2xl rounded-b-none border bg-neutral-900 px-5 text-center shadow-[0_35px_45px_-20px_rgba(0,0,0,0.55)] transition-all duration-500 ease-out focus-visible:outline-none active:scale-[0.97] sm:h-96 lg:h-[420px] sm:active:scale-100 ${
                    isActive
                      ? 'border-[#C2542C] shadow-[0_35px_50px_-18px_rgba(0,0,0,0.6),0_0_30px_rgba(194,84,44,0.35)]'
                      : 'border-[#C2542C]/35 shadow-[0_0_18px_rgba(194,84,44,0.12)] sm:border-white/10 sm:shadow-[0_35px_45px_-20px_rgba(0,0,0,0.55)] sm:hover:border-[#C2542C]/50'
                  }`}
                >
                  {/* Category Number */}
                  <span className="absolute left-4 top-4 z-20 text-xs font-semibold tracking-wider text-[#C2542C]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* Subtle accent wash — mobile idle cards only, so the card
                      reads as interactive even without a hover state to rely
                      on. Sits below everything else. */}
                  {!isActive && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-b from-[#C2542C]/10 via-transparent to-transparent sm:hidden"
                    />
                  )}

                  {/* White wipe layer — slides up from the bottom to fully cover
                      the card on hover/active (desktop) or the instant it's
                      tapped (mobile, right before the sheet takes over).
                      Sits above the card's own dark background but below the
                      icon field content, which is what actually needs to read
                      against it. */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 z-[1] bg-white transition-transform duration-500 ease-in-out ${
                      isActive || tappedId === category.id ? 'translate-y-0' : 'translate-y-full'
                    }`}
                  />

                  {/* Icon field — a static, evenly arranged grid, blurred and
                      dimmed by default so it's only glimpsed behind the title;
                      sharpens into full view once the card is active or tapped. */}
                  <div
                    className={`absolute inset-0 z-[2] flex flex-col overflow-hidden px-4 pb-4 pt-9 transition-all duration-500 ease-out ${
                      isActive || tappedId === category.id
                        ? 'opacity-100 blur-none scale-100'
                        : 'opacity-50 blur-[3px] scale-105'
                    }`}
                  >
                    <div className="relative min-h-0 flex-1">
                      <SkillIconGrid
                        skills={category.skills}
                        active={isActive || tappedId === category.id}
                        direction={index % 2 === 0 ? 'up' : 'down'}
                      />
                    </div>
                  </div>

                  {/* Title overlay — sits above the blurred icon field by default,
                      fades out on hover to reveal the sharpened icons underneath. */}
                  <div
                    className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/55 px-6 transition-all duration-500 ${
                      isActive || tappedId === category.id ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
                    }`}
                  >
                    <h3 className="text-base font-bold uppercase tracking-tight text-white sm:text-lg">
                      {category.title}
                    </h3>
                    <p className="mt-2 max-w-[220px] text-[11px] font-medium leading-relaxed text-neutral-400 sm:mt-3 sm:max-w-[260px] sm:text-xs">
                      {category.description}
                    </p>
                    {!hasHover && (
                      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#E8834E]/40 bg-[#E8834E]/10 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-wide text-[#E8834E]">
                        Tap to Explore
                        <ArrowRight size={12} className="shrink-0" />
                      </span>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>

      <MobileSkillSheet category={sheetCategory} open={sheetOpen} onClose={closeSheet} />
    </section>
  )
}

export default Skills