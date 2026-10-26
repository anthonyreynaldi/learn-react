// Handbook shell — uses concepts from later parts (useState, useEffect, useRef, hooks).
// You don't need to understand it yet.
//
// The "Ask AI" button and chat panel. Every question is sent together with the
// topic that is open right now, so the AI knows what you are looking at.
import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { MessageCircleQuestion, Send, Sparkles, Square, SquarePen, X } from 'lucide-react'
import { buildTableOfContents, buildTopicContext } from './ai/buildContext'
import { useChat } from './ai/useChat'
import { partLabel } from './registry'

// Loaded on demand: the Markdown renderer is only needed once there are messages,
// so it stays out of the main bundle.
const ChatMessage = lazy(() => import('./ChatMessage'))

const SUGGESTIONS = [
  'Explain this topic in simple words',
  'How does this compare to Laravel or Blade?',
  'Walk me through the first example line by line',
  'What mistakes do beginners make here?',
]

function ChatPanel({ tracks, part, topic }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, streaming, send, stop, reset } = useChat()
  const listRef = useRef(null)
  const inputRef = useRef(null)

  const topicLabel = `${partLabel(part)} › ${topic.title}`

  // Keep the newest message in view while the answer streams in
  useEffect(() => {
    const list = listRef.current
    if (list) list.scrollTop = list.scrollHeight
  }, [messages])

  // Focus the input when the panel opens
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  function ask(text) {
    send(text, {
      tableOfContents: buildTableOfContents(tracks),
      topicContext: buildTopicContext(part, topic),
      topicLabel,
    })
    setInput('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    ask(input)
  }

  // Enter sends, Shift+Enter makes a new line
  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing) {
      e.preventDefault()
      ask(input)
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-sky-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:bg-sky-500"
      >
        <Sparkles size={18} />
        Ask AI
      </button>
    )
  }

  return (
    <section
      className="fixed inset-0 z-50 flex flex-col bg-white shadow-2xl sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[min(640px,calc(100vh-6rem))] sm:w-[420px] sm:rounded-2xl sm:border sm:border-zinc-200 dark:bg-zinc-900 sm:dark:border-zinc-700"
      aria-label="Ask AI"
    >
      <header className="flex items-center gap-2 border-b border-zinc-200 px-4 py-3 dark:border-zinc-800">
        <MessageCircleQuestion size={18} className="text-sky-600" />
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold text-zinc-900 dark:text-white">Ask AI</div>
          <div className="truncate text-xs text-zinc-500" title={topicLabel}>
            Context: {topicLabel}
          </div>
        </div>
        <button type="button" onClick={reset} className="icon-button" title="New chat" aria-label="New chat">
          <SquarePen size={16} />
        </button>
        <button type="button" onClick={() => setOpen(false)} className="icon-button" title="Close" aria-label="Close">
          <X size={18} />
        </button>
      </header>

      <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="space-y-3">
            <p className="text-sm text-zinc-500">
              Ask anything about <strong className="text-zinc-700 dark:text-zinc-300">{topic.title}</strong> or React in
              general. The AI sees this topic’s summary, key points and example code.
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => ask(s)}
                  className="rounded-full border border-zinc-200 px-3 py-1.5 text-left text-xs text-zinc-600 hover:border-sky-500 hover:text-sky-700 dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-sky-300"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
        <Suspense fallback={<p className="text-xs text-zinc-400">Loading…</p>}>
          {messages.map((m) => (
            <ChatMessage key={m.id} message={m} />
          ))}
        </Suspense>
      </div>

      <form onSubmit={handleSubmit} className="border-t border-zinc-200 p-3 dark:border-zinc-800">
        <div className="flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Ask a question… (Enter to send, Shift+Enter for a new line)"
            className="max-h-40 min-h-[2.75rem] flex-1 resize-y rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm outline-none placeholder:text-zinc-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 dark:border-zinc-700 dark:bg-zinc-950"
          />
          {streaming ? (
            <button
              type="button"
              onClick={stop}
              className="grid size-10 place-items-center rounded-xl bg-zinc-800 text-white hover:bg-zinc-700 dark:bg-zinc-700"
              title="Stop"
              aria-label="Stop"
            >
              <Square size={14} fill="currentColor" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!input.trim()}
              className="grid size-10 place-items-center rounded-xl bg-sky-600 text-white hover:bg-sky-500 disabled:opacity-40"
              title="Send"
              aria-label="Send"
            >
              <Send size={16} />
            </button>
          )}
        </div>
        <p className="mt-1.5 text-[11px] text-zinc-400">AI answers can be wrong. Check them against the examples.</p>
      </form>
    </section>
  )
}

export default ChatPanel
