import { useEffect, useRef, useState } from 'react'

export default function Stopwatch() {
  // Shown on screen → STATE (changing them must re-render)
  const [startTime, setStartTime] = useState(null)
  const [now, setNow] = useState(null)

  // Never shown, only needed to stop the timer → a REF.
  // useRef(null) returns the same box { current: null } on every render.
  const intervalRef = useRef(null)

  function handleStart() {
    const t = Date.now()
    setStartTime(t)
    setNow(t)
    clearInterval(intervalRef.current) // in case it was already running
    // Changing ref.current does NOT re-render; it just stores the id
    intervalRef.current = setInterval(() => setNow(Date.now()), 10)
  }

  function handleStop() {
    clearInterval(intervalRef.current)
  }

  function handleReset() {
    clearInterval(intervalRef.current)
    setStartTime(null)
    setNow(null)
  }

  // Stop the timer if the component is removed while running
  useEffect(() => () => clearInterval(intervalRef.current), [])

  const seconds = startTime !== null ? (now - startTime) / 1000 : 0

  return (
    <div>
      <p style={{ fontSize: 32, fontFamily: 'monospace' }}>{seconds.toFixed(2)} s</p>
      <button onClick={handleStart}>Start</button> <button onClick={handleStop}>Stop</button>{' '}
      <button onClick={handleReset}>Reset</button>
    </div>
  )
}
