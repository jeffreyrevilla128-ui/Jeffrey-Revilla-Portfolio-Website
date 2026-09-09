import { useRef, useState, type ComponentType } from 'react'
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
  skills: Skill[]
}

const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    title: 'Frontend',
    description:
      'Building responsive, interactive, and user-focused web interfaces.',
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
  react: { Icon: SiReact, color: '#61DAFB' },
  typescript: { Icon: SiTypescript, color: '#3178C6' },
  vuejs: { Icon: SiVuedotjs, color: '#4FC08D' },
  tailwindcss: { Icon: SiTailwindcss, color: '#06B6D4' },
  html5: { Icon: SiHtml5, color: '#E34F26' },
  css3: { Icon: SiCss, color: '#663399' },
  nodejs: { Icon: SiNodedotjs, color: '#5FA04E' },
  express: { Icon: SiExpress, color: '#000000', barColor: '#FFFFFF' }, // official mark is near-black; shown on a white tile, white bar for visibility
  laravel: { Icon: SiLaravel, color: '#FF2D20' },
  postgresql: { Icon: SiPostgresql, color: '#4169E1' },
  supabase: { Icon: SiSupabase, color: '#3ECF8E' },
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
  'rest-api': { Icon: Network, color: '#0EA5E9' },
  pgadmin: { Icon: Database, color: '#336791' },
  pgvector: { Icon: Database, color: '#4169E1' },
  'ai-model': { Icon: Brain, color: '#8B5CF6' },
  'ai-api': { Icon: Sparkles, color: '#A855F7' },
  oauth: { Icon: KeyRound, color: '#F59E0B' },
  webhooks: { Icon: Webhook, color: '#10B981' },
  'third-party-api': { Icon: Share2, color: '#06B6D4' },
}

const fallbackIcon: IconEntry = { Icon: Code2, color: '#C2542C' }

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
    const { Icon, color } = (skill.icon && iconMap[skill.icon]) || fallbackIcon

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
    const { Icon, color } = (skill.icon && iconMap[skill.icon]) || fallbackIcon
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
            <div
              className="h-full rounded-full"
              style={{ width: `${proficiency}%`, backgroundColor: fillColor }}
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
/*  Skills Section                                                    */
/* ------------------------------------------------------------------ */

function Skills() {
  // Tracks which card is currently active (hovered / focused / tapped),
  // so that card alone can swap its own content in place — no modal.
  const [activeId, setActiveId] = useState<string | null>(null)

  // Cursor position for the interactive background grid below, reprojected
  // to 0%..100% so it can drive the --cursor-x/--cursor-y CSS vars that
  // the glow layers track. Same approach as Hero's background.
  const [cursor, setCursor] = useState({ x: 0.5, y: 0.5 })
  const sectionRef = useRef<HTMLElement | null>(null)

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
                  onMouseEnter={() => setActiveId(category.id)}
                  onMouseLeave={() => setActiveId(null)}
                  onClick={() =>
                    setActiveId((current) => (current === category.id ? null : category.id))
                  }
                  onFocus={() => setActiveId(category.id)}
                  onBlur={() => setActiveId(null)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isActive}
                  aria-label={`${category.title} — show tech stack`}
                  className={`group relative h-52 flex-1 cursor-pointer overflow-hidden rounded-t-2xl rounded-b-none border bg-neutral-900 px-5 text-center shadow-[0_35px_45px_-20px_rgba(0,0,0,0.55)] transition-all duration-500 ease-out focus-visible:outline-none sm:h-96 lg:h-[420px] ${
                    isActive
                      ? 'border-[#C2542C] shadow-[0_35px_50px_-18px_rgba(0,0,0,0.6),0_0_30px_rgba(194,84,44,0.35)]'
                      : 'border-white/10 hover:border-[#C2542C]/50'
                  }`}
                >
                  {/* Category Number */}
                  <span className="absolute left-4 top-4 z-20 text-xs font-semibold tracking-wider text-[#C2542C]">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* White wipe layer — slides up from the bottom to fully cover
                      the card on hover/active, and slides back down on leave.
                      Sits above the card's own dark background but below the
                      icon field content, which is what actually needs to read
                      against it. */}
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 z-[1] bg-white transition-transform duration-500 ease-in-out ${
                      isActive ? 'translate-y-0' : 'translate-y-full'
                    }`}
                  />

                  {/* Icon field — a static, evenly arranged grid, blurred and
                      dimmed by default so it's only glimpsed behind the title;
                      sharpens into full view once the card is active. */}
                  <div
                    className={`absolute inset-0 z-[2] flex flex-col overflow-hidden px-4 pb-4 pt-9 transition-all duration-500 ease-out ${
                      isActive
                        ? 'opacity-100 blur-none scale-100'
                        : 'opacity-50 blur-[3px] scale-105'
                    }`}
                  >
                    <div className="relative min-h-0 flex-1">
                      <SkillIconGrid
                        skills={category.skills}
                        active={isActive}
                        direction={index % 2 === 0 ? 'up' : 'down'}
                      />
                    </div>
                  </div>

                  {/* Title overlay — sits above the blurred icon field by default,
                      fades out on hover to reveal the sharpened icons underneath. */}
                  <div
                    className={`pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/55 px-6 transition-all duration-500 ${
                      isActive ? 'translate-y-2 opacity-0' : 'translate-y-0 opacity-100'
                    }`}
                  >
                    <h3 className="text-base font-bold uppercase tracking-tight text-white sm:text-lg">
                      {category.title}
                    </h3>
                    <p className="mt-2 max-w-[220px] text-[11px] font-medium leading-relaxed text-neutral-400 sm:mt-3 sm:max-w-[260px] sm:text-xs">
                      {category.description}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills