// Handbook shell — uses concepts from later parts (useState, hooks).
// You don't need to understand it yet.
//
// One example card. Depending on example.type it shows:
//   "react" → live Result + Code
//   "js"    → Run button with console Output + Code
//   "code"  → Code only (for reading, not runnable)
// On wide screens the two panes sit side by side; on narrow screens they become tabs.
import { useState } from 'react'
import { BookText, Code2, Play, Terminal } from 'lucide-react'
import CodeBlock from './CodeBlock'
import JsRunner from './JsRunner'
import ReactResult from './ReactResult'
import { useMediaQuery } from './lib/useMediaQuery'

const TYPE_BADGES = {
  react: { label: 'Live React', icon: Play, className: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' },
  js: { label: 'JavaScript', icon: Terminal, className: 'bg-amber-500/10 text-amber-700 dark:text-amber-300' },
  code: { label: 'For reading — not runnable', icon: BookText, className: 'bg-zinc-500/10 text-zinc-600 dark:text-zinc-400' },
}

const DEFAULT_LANG = { react: 'jsx', js: 'js', code: 'text' }

function ExampleBlock({ example }) {
  const lang = example.lang ?? DEFAULT_LANG[example.type] ?? 'text'
  const baseBadge = TYPE_BADGES[example.type] ?? TYPE_BADGES.code
  // Runnable examples written in TypeScript (.ts files) say so on their badge
  const badge = example.type === 'js' && (lang === 'ts' || lang === 'tsx') ? { ...baseBadge, label: 'TypeScript' } : baseBadge
  const BadgeIcon = badge.icon
  const code = <CodeBlock code={example.code} lang={lang} />

  return (
    <section className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40">
      <header className="border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <h3 className="font-semibold text-zinc-900 dark:text-white">{example.title}</h3>
          <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${badge.className}`}>
            <BadgeIcon size={12} />
            {badge.label}
          </span>
        </div>
        {example.caption && <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">{example.caption}</p>}
      </header>

      {example.type === 'react' && (
        <Panes
          first={{ label: 'Result', icon: Play, content: <ReactResult component={example.component} /> }}
          second={{ label: 'Code', icon: Code2, content: code }}
        />
      )}
      {example.type === 'js' && (
        <Panes
          first={{ label: 'Output', icon: Terminal, content: <JsRunner run={example.run} /> }}
          second={{ label: 'Code', icon: Code2, content: code }}
        />
      )}
      {example.type !== 'react' && example.type !== 'js' && <div className="p-4">{code}</div>}
    </section>
  )
}

// Two panes: side by side on wide screens, tabs on narrow screens.
function Panes({ first, second }) {
  const wide = useMediaQuery('(min-width: 1280px)')
  const [tab, setTab] = useState(0)

  if (wide) {
    return (
      <div className="grid grid-cols-2 divide-x divide-zinc-200 dark:divide-zinc-800">
        <Pane pane={first} />
        <Pane pane={second} />
      </div>
    )
  }

  const panes = [first, second]
  return (
    <div>
      <div className="flex gap-1 border-b border-zinc-200 px-3 pt-2 dark:border-zinc-800" role="tablist">
        {panes.map((pane, i) => {
          const Icon = pane.icon
          const active = tab === i
          return (
            <button
              key={pane.label}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(i)}
              className={`-mb-px flex items-center gap-1.5 border-b-2 px-3 py-2 text-sm font-medium ${
                active
                  ? 'border-sky-500 text-sky-700 dark:text-sky-300'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              <Icon size={14} />
              {pane.label}
            </button>
          )
        })}
      </div>
      {/* Both panes stay mounted so example state survives switching tabs */}
      <div className="p-4">
        <div hidden={tab !== 0}>{first.content}</div>
        <div hidden={tab !== 1}>{second.content}</div>
      </div>
    </div>
  )
}

function Pane({ pane }) {
  const Icon = pane.icon
  return (
    <div className="min-w-0 p-4">
      <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-zinc-500">
        <Icon size={14} />
        {pane.label}
      </div>
      {pane.content}
    </div>
  )
}

export default ExampleBlock
