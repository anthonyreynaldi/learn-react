import { useEffect, useState } from 'react'

function LiveClock() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('id-ID'))

  useEffect(() => {
    // START: a timer that ticks every second
    const intervalId = setInterval(() => {
      setTime(new Date().toLocaleTimeString('id-ID'))
    }, 1000)

    // STOP: cleanup clears the timer when the clock is removed.
    // Without it the timer would keep running forever (a memory leak).
    return () => clearInterval(intervalId)
  }, [])

  return <p style={{ fontSize: 24, fontFamily: 'monospace' }}>{time}</p>
}

export default function ClockToggle() {
  const [show, setShow] = useState(true)
  return (
    <div>
      <button onClick={() => setShow(!show)}>{show ? 'Hide clock' : 'Show clock'}</button>
      {/* Hiding unmounts LiveClock, which runs its cleanup */}
      {show && <LiveClock />}
    </div>
  )
}
