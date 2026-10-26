import { useState } from 'react'

export default function Snapshot() {
  const [count, setCount] = useState(0)
  const [lastLogged, setLastLogged] = useState('')

  function handleClick() {
    setCount(count + 1)
    // setCount does NOT change "count" here. It schedules a re-render.
    // In this render, count is a constant snapshot: still the old value.
    setLastLogged(`Right after setCount(count + 1), count was still ${count}`)
  }

  return (
    <div>
      <p>Count on screen: {count}</p>
      <button onClick={handleClick}>+1</button>
      <p>{lastLogged}</p>
    </div>
  )
}
