import { useState } from 'react'

// One component definition...
function Counter({ label }) {
  // ...but every <Counter /> on the page gets its OWN count.
  const [count, setCount] = useState(0)

  return (
    <div>
      <h3>{label}</h3>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  )
}

export default function TwoCounters() {
  return (
    <div style={{ display: 'flex', gap: 48 }}>
      <Counter label="Warehouse A" />
      <Counter label="Warehouse B" />
    </div>
  )
}
