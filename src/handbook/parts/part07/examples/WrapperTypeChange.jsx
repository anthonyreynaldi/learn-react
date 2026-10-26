import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return (
    <p>
      Count: {count} <button onClick={() => setCount(count + 1)}>+1</button>
    </p>
  )
}

export default function WrapperTypeChange() {
  const [useSection, setUseSection] = useState(false)

  return (
    <div>
      <label>
        <input type="checkbox" checked={useSection} onChange={(e) => setUseSection(e.target.checked)} /> Use
        section wrapper
      </label>
      {/* DIFFERENT TYPE in the same position (<div> vs <section>):
          React destroys the old subtree, including Counter and its state,
          and builds a new one from scratch. */}
      {useSection ? (
        <section>
          <Counter />
        </section>
      ) : (
        <div>
          <Counter />
        </div>
      )}
    </div>
  )
}
