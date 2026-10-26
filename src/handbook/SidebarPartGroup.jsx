// Handbook shell — uses concepts from later parts (lists, event handlers).
// You don't need to understand it yet.
//
// One collapsible part in the sidebar: badge + title, then its topic links.
import { ChevronRight } from 'lucide-react'
import { topicHref } from './lib/useHashRoute'
import { partLabel } from './registry'

function SidebarPartGroup({ part, topics, expanded, onToggle, activeTopicId, onNavigate }) {
  return (
    <div className="mb-1">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={expanded}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm font-semibold text-zinc-900 hover:bg-zinc-200/60 dark:text-zinc-100 dark:hover:bg-zinc-800"
      >
        <span
          className="grid h-6 min-w-6 shrink-0 place-items-center rounded-md bg-sky-500/10 px-1 text-xs font-bold text-sky-700 dark:text-sky-300"
          title={partLabel(part)}
        >
          {part.track.badgePrefix ?? ''}
          {part.number}
        </span>
        <span className="flex-1">{part.title}</span>
        <ChevronRight
          size={16}
          className={`shrink-0 text-zinc-400 transition-transform ${expanded ? 'rotate-90' : ''}`}
        />
      </button>

      {expanded && (
        <ul className="ml-5 mt-1 border-l border-zinc-200 pl-2 dark:border-zinc-800">
          {topics.map((topic) => {
            const active = topic.id === activeTopicId
            return (
              <li key={topic.id}>
                <a
                  href={topicHref(part.id, topic.id)}
                  onClick={onNavigate}
                  aria-current={active ? 'page' : undefined}
                  className={`block rounded-md px-3 py-1.5 text-sm ${
                    active
                      ? 'bg-sky-500/10 font-medium text-sky-700 dark:text-sky-300'
                      : 'text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100'
                  }`}
                >
                  {topic.title}
                </a>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default SidebarPartGroup
