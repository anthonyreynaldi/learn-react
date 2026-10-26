// useState is a hook: a special function that gives a component memory.
import { useState } from 'react'

export default function Counter() {
  // useState(0) returns an array: [current value, setter function].
  // Array destructuring gives them names. Convention: [thing, setThing].
  // The 0 is the initial value, used only on the very first render.
  const [count, setCount] = useState(0)

  // A component can have as many state variables as it needs.
  const [step, setStep] = useState(1)

  return (
    <div>
      <p>Count: {count}</p>
      {/* Calling the setter stores the new value AND asks React to re-render */}
      <button onClick={() => setCount(count + step)}>+{step}</button>{' '}
      <button onClick={() => setCount(0)}>Reset</button>
      <p>
        Step:{' '}
        <button onClick={() => setStep(1)}>1</button>{' '}
        <button onClick={() => setStep(5)}>5</button>{' '}
        <button onClick={() => setStep(10)}>10</button>
      </p>
    </div>
  )
}
