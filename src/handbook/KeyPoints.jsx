// Handbook shell — uses concepts from later parts (lists). You don't need to understand it yet.
//
// The "Key points" callout box on a topic page.
import { Lightbulb } from 'lucide-react'

function KeyPoints({ notes }) {
  return (
    <aside className="mt-8 rounded-xl border border-sky-200 bg-sky-50 p-5 dark:border-sky-900/60 dark:bg-sky-950/30">
      <h2 className="mb-3 flex items-center gap-2 font-semibold text-sky-900 dark:text-sky-200">
        <Lightbulb size={18} />
        Key points
      </h2>
      <ul className="space-y-2">
        {notes.map((note, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-sky-500" />
            <span>{note}</span>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default KeyPoints
