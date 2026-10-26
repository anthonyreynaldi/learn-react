import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <p>
      Count: {count} <button onClick={() => setCount(count + 1)}>+1</button>
    </p>
  )
}

export default function SameTypeKept() {
  const [highlight, setHighlight] = useState(false)

  return (
    <div>
      <label>
        <input type="checkbox" checked={highlight} onChange={(e) => setHighlight(e.target.checked)} /> Highlight
      </label>
      {/* SAME TYPE (<div>) in the same position: React keeps it and only
          updates the changed style. Counter keeps its state. */}
      <div style={{ background: highlight ? '#fef9c3' : undefined, padding: 8 }}>
        <Counter />
      </div>
    </div>
  )
}
