import { useRef, useState } from 'react'

export default function StaleRefReport() {
  const [count, setCount] = useState(0)
  // A ref that always holds the LATEST count
  const countRef = useRef(0)
  const [messages, setMessages] = useState([])

  function handlePlusOne() {
    const next = count + 1
    setCount(next) // for the screen
    countRef.current = next // for callbacks that run later
  }

  function addMessage(text) {
    // Updater function, so messages from both timers are kept
    setMessages((prev) => [...prev, { id: prev.length + 1, text }])
  }

  function reportSnapshot() {
    // count is the snapshot from THIS render (Part 7 closure)
    setTimeout(() => addMessage(`Snapshot: count was ${count}`), 3000)
  }

  function reportRef() {
    // countRef.current is read when the timer fires: the latest value
    setTimeout(() => addMessage(`Ref: count is ${countRef.current}`), 3000)
  }

  return (
    <div>
      <p>Count now: {count}</p>
      <button onClick={handlePlusOne}>+1</button>
      <div style={{ display: 'flex', gap: 8, marginTop: 8, flexWrap: 'wrap' }}>
        <button onClick={reportSnapshot}>Report in 3 s (state snapshot)</button>
        <button onClick={reportRef}>Report in 3 s (ref)</button>
      </div>
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
