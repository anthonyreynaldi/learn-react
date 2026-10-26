// Handbook shell — uses concepts from later parts (useState, useEffect, hooks).
// You don't need to understand it yet. The lesson code lives in parts/*/examples/.
//
// Page layout: header bar on top, sidebar on the left (a drawer on narrow
// screens), and the selected topic on the right.
import { useEffect, useState } from 'react'
import './handbook.css'
import { flatTopics, tracks } from './registry'
import { useHashRoute } from './lib/useHashRoute'
import { useTheme } from './lib/useTheme'
import HeaderBar from './HeaderBar'
import Sidebar from './Sidebar'
import TopicView from './TopicView'
import ChatPanel from './ChatPanel'

function Handbook() {
  const { partId, topicId } = useHashRoute()
  const { theme, toggleTheme } = useTheme()
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Find the topic from the URL; fall back to the first topic.
  const found = flatTopics.findIndex(
    (entry) => entry.part.id === partId && entry.topic.id === topicId,
  )
  const index = found === -1 ? 0 : found
  const { part, topic } = flatTopics[index]

  // Start each topic at the top of the page.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [part.id, topic.id])

  return (
    <div className="handbook min-h-screen bg-white text-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
      <HeaderBar
        theme={theme}
        onToggleTheme={toggleTheme}
        onOpenMenu={() => setDrawerOpen(true)}
      />

      <Sidebar
        tracks={tracks}
        activePartId={part.id}
        activeTopicId={topic.id}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />

      <main className="lg:pl-[280px]">
        <TopicView
          key={`${part.id}/${topic.id}`}
          part={part}
          topic={topic}
          previous={flatTopics[index - 1]}
          next={flatTopics[index + 1]}
        />
      </main>

      {/* Not keyed by topic: the conversation survives topic changes,
          and each new question uses the topic that is open at that moment. */}
      <ChatPanel tracks={tracks} part={part} topic={topic} />
    </div>
  )
}

export default Handbook
