// Handbook shell — uses concepts from later parts (useState, useEffect, lists).
// You don't need to understand it yet.
//
// Left navigation: a search box plus one collapsible group per part.
// On narrow screens it slides in as a drawer.
import { useEffect, useState } from 'react'
import { Search, X } from 'lucide-react'
import SidebarPartGroup from './SidebarPartGroup'

function Sidebar({ tracks, activePartId, activeTopicId, open, onClose }) {
  const [query, setQuery] = useState('')
  const [expanded, setExpanded] = useState(() => new Set([activePartId]))
  const [lastActivePartId, setLastActivePartId] = useState(activePartId)

  // When the active part changes, expand it (state adjusted during render).
  if (lastActivePartId !== activePartId) {
    setLastActivePartId(activePartId)
    setExpanded((prev) => new Set(prev).add(activePartId))
  }

  // Close the drawer with the Escape key.
  useEffect(() => {
    if (!open) return
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  function toggle(partId) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(partId)) next.delete(partId)
      else next.add(partId)
      return next
    })
  }

  const search = query.trim().toLowerCase()
  // One section per track (React, TypeScript), each with its matching parts
  const sections = tracks
    .map((track) => ({
      track,
      groups: track.parts
        .map((part) => ({
          part,
          topics: part.topics.filter((topic) => topic.title.toLowerCase().includes(search)),
        }))
        .filter((group) => group.topics.length > 0),
    }))
    .filter((section) => section.groups.length > 0)

  return (
    <>
      {/* Dark backdrop behind the drawer (narrow screens only) */}
      {open && (
        <div className="fixed inset-0 z-40 bg-zinc-950/50 lg:hidden" onClick={onClose} />
      )}

      <aside
        className={`fixed bottom-0 left-0 top-0 z-50 flex w-[280px] flex-col border-r border-zinc-200 bg-zinc-50 transition-transform dark:border-zinc-800 dark:bg-zinc-900 lg:top-14 lg:z-20 lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-4 pt-4 lg:hidden">
          <span className="font-semibold text-zinc-900 dark:text-white">Contents</span>
          <button type="button" onClick={onClose} className="icon-button" aria-label="Close menu">
            <X size={18} />
          </button>
        </div>

        <div className="p-4">
          <label className="relative block">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search topics…"
              className="w-full rounded-lg border border-zinc-200 bg-white py-2 pl-9 pr-3 text-sm outline-none placeholder:text-zinc-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-zinc-700 dark:bg-zinc-950"
            />
          </label>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          {sections.length === 0 && (
            <p className="px-2 text-sm text-zinc-500">No topics match “{query}”.</p>
          )}
          {sections.map(({ track, groups }) => (
            <section key={track.id} className="mb-4">
              <h2 className="px-2 pb-1 pt-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                {track.title}
              </h2>
              {groups.map(({ part, topics }) => (
                <SidebarPartGroup
                  key={part.id}
                  part={part}
                  topics={topics}
                  expanded={search !== '' || expanded.has(part.id)}
                  onToggle={() => toggle(part.id)}
                  activeTopicId={part.id === activePartId ? activeTopicId : null}
                  onNavigate={onClose}
                />
              ))}
            </section>
          ))}
        </nav>
      </aside>
    </>
  )
}

export default Sidebar
