import { useState } from 'react'

export default function PlusThree() {
  const [count, setCount] = useState(0)

  function handlePlusThree() {
    // count is the same snapshot in all three lines (say 0),
    // so this is setCount(0 + 1) three times: the result is 1, not 3.
    setCount(count + 1)
    setCount(count + 1)
    setCount(count + 1)
  }

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handlePlusThree}>+3</button>{' '}
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  )
}
