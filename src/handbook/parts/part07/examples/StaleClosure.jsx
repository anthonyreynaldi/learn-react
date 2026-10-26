import { useState } from 'react'

export default function StaleClosure() {
  const [count, setCount] = useState(0)
  const [messages, setMessages] = useState([])

  function handleReport() {
    // This arrow function is a CLOSURE: it remembers the variables of
    // THIS render, including count. Clicking +1 later starts new renders
    // with a new count, but this closure still sees the old one.
    setTimeout(() => {
      // Updater function: uses the LATEST messages, so no message is lost
      // when several reports finish close together.
      setMessages((prev) => [
        ...prev,
        { id: prev.length + 1, text: `Report: count was ${count} (captured when you clicked)` },
      ])
    }, 3000)
  }

  return (
    <div>
      <p>Count now: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>{' '}
      <button onClick={handleReport}>Report count in 3 seconds (captured value)</button>
      <h3>Messages</h3>
      {messages.length === 0 ? (
        <p>No reports yet.</p>
      ) : (
        <ul>
          {messages.map((m) => (
            <li key={m.id}>{m.text}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
