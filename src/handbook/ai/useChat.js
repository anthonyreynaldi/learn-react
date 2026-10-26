// Handbook shell — uses concepts from later parts (useState, useRef, async, streams).
// You don't need to understand it yet.
//
// Chat state for the "Ask AI" panel: the message list, sending a question,
// reading the streamed answer piece by piece, Stop, and New chat.
import { useRef, useState } from 'react'

const ENDPOINT = '/__handbook/chat'

let nextId = 1

export function useChat() {
  const [messages, setMessages] = useState([])
  const [streaming, setStreaming] = useState(false)
  const abortRef = useRef(null)

  function updateMessage(id, changes) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, ...changes } : m)))
  }

  // context = { tableOfContents, topicContext, topicLabel }
  async function send(text, context) {
    const question = text.trim()
    if (!question || streaming) return

    const userMessage = { id: nextId++, role: 'user', content: question, topicLabel: context.topicLabel }
    const answerId = nextId++
    // Only finished, non-empty turns are sent back to the API as history
    const history = [...messages, userMessage]
      .filter((m) => !m.error && m.content.trim() !== '')
      .map(({ role, content }) => ({ role, content }))

    setMessages((prev) => [...prev, userMessage, { id: answerId, role: 'assistant', content: '', pending: true }])
    setStreaming(true)

    const controller = new AbortController()
    abortRef.current = controller

    let answer = ''
    try {
      const response = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tableOfContents: context.tableOfContents,
          topicContext: context.topicContext,
          messages: history,
        }),
        signal: controller.signal,
      })

      if (!response.ok) {
        const data = await response.json().catch(() => null)
        throw new Error(
          data?.error ??
            (response.status === 404
              ? 'The chat endpoint is missing. The AI only works with npm run dev or npm run preview.'
              : `Request failed with status ${response.status}.`),
        )
      }

      // Read the streamed answer chunk by chunk and show it as it arrives
      const reader = response.body.pipeThrough(new TextDecoderStream()).getReader()
      for (;;) {
        const { done, value } = await reader.read()
        if (done) break
        answer += value
        updateMessage(answerId, { content: answer, pending: false })
      }
      updateMessage(answerId, { pending: false })
    } catch (err) {
      if (err.name === 'AbortError') {
        updateMessage(answerId, { pending: false, content: answer, stopped: true })
      } else {
        updateMessage(answerId, { pending: false, content: answer, error: err.message })
      }
    } finally {
      abortRef.current = null
      setStreaming(false)
    }
  }

  function stop() {
    abortRef.current?.abort()
  }

  function reset() {
    stop()
    setMessages([])
  }

  return { messages, streaming, send, stop, reset }
}
