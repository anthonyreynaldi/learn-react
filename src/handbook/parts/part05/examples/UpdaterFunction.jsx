import { useState } from 'react'

export default function UpdaterFunction() {
  const [count, setCount] = useState(0)

  // Passing a VALUE: all three use the same snapshot -> +1 in total.
  function handleValue() {
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  // Passing an UPDATER FUNCTION: React queues them and feeds each one
  // the result of the previous one: 0 -> 1 -> 2 -> 3. So +3 in total.
  function handleUpdater() {
    setCount((c) => c + 1)
    setCount((c) => c + 1)
    setCount((c) => c + 1)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={handleValue}>+3 (value)</button>
        <button onClick={handleUpdater}>+3 (updater)</button>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
      {/* Batching: React waits until the handler finishes, applies all
          three updates, then re-renders ONCE. Same for both buttons. */}
      <p>Either button: 3 state updates, but only 1 re-render (batching).</p>
    </div>
  )
}
