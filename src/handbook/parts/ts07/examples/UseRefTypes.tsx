import { useEffect, useRef, useState } from 'react'

export default function UseRefTypes() {
  // 1. A DOM ref: useRef<HTMLInputElement>(null).
  //    .current is HTMLInputElement | null: null until React attaches it.
  const inputRef = useRef<HTMLInputElement>(null)

  // 2. A value ref: holds a timer id between renders (Part 11).
  //    window.setInterval returns a number in the browser.
  //    (Plain setInterval may be typed with Node's Timeout type in some setups; window.* avoids that.)
  const intervalRef = useRef<number | null>(null)
  const [seconds, setSeconds] = useState(0)

  function start() {
    if (intervalRef.current !== null) return // already running
    intervalRef.current = window.setInterval(() => setSeconds((s) => s + 1), 1000)
  }

  function stop() {
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  // Clear the timer if the component is removed while running
  useEffect(
    () => () => {
      if (intervalRef.current !== null) window.clearInterval(intervalRef.current)
    },
    [],
  )

  return (
    <div>
      <p>
        <input ref={inputRef} placeholder="Customer" />{' '}
        {/* ?. because current may be null (e.g. if the input isn't rendered) */}
        <button onClick={() => inputRef.current?.focus()}>Focus</button>
      </p>
      <p>
        Stopwatch: {seconds}s <button onClick={start}>Start</button> <button onClick={stop}>Stop</button>{' '}
        <button
          onClick={() => {
            stop()
            setSeconds(0)
          }}
        >
          Reset
        </button>
      </p>
    </div>
  )
}
