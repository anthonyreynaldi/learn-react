// Handbook shell — uses concepts from later parts. You don't need to understand it yet.
//
// Previous/Next cards at the bottom of a topic page.
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { topicHref } from './lib/useHashRoute'
import { partLabel } from './registry'

function NavCard({ entry, direction }) {
  const isNext = direction === 'next'
  return (
    <a
      href={topicHref(entry.part.id, entry.topic.id)}
      className={`group flex flex-col gap-1 rounded-xl border border-zinc-200 p-4 transition-colors hover:border-sky-500 dark:border-zinc-800 dark:hover:border-sky-500 ${
        isNext ? 'items-end text-right sm:col-start-2' : ''
      }`}
    >
      <span className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-zinc-500">
        {!isNext && <ArrowLeft size={14} />}
        {isNext ? 'Next' : 'Previous'} · {partLabel(entry.part)}
        {isNext && <ArrowRight size={14} />}
      </span>
      <span className="font-semibold text-zinc-900 group-hover:text-sky-600 dark:text-zinc-100 dark:group-hover:text-sky-400">
        {entry.topic.title}
      </span>
    </a>
  )
}

function PrevNext({ previous, next }) {
  return (
    <nav className="mt-16 grid gap-4 border-t border-zinc-200 pt-8 sm:grid-cols-2 dark:border-zinc-800">
      {previous && <NavCard entry={previous} direction="previous" />}
      {next && <NavCard entry={next} direction="next" />}
    </nav>
  )
}

export default PrevNext
