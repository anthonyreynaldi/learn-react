import { useState } from 'react'

// Shows the time at which this component last RENDERED.
// new Date() during render is impure, but harmless here: it is only displayed.
function RenderedAt() {
  const now = new Date()
  const time = `${now.toLocaleTimeString('id-ID')}.${String(now.getMilliseconds()).padStart(3, '0')}`
  return <small style={{ color: 'gray' }}> rendered at {time}</small>
}

function ChildA() {
  return (
    <p>
      Child A
      <RenderedAt />
    </p>
  )
}

function ChildB() {
  return (
    <p>
      Child B
      <RenderedAt />
    </p>
  )
}

// The state OWNER. When its state changes, it re-renders,
// and so do ALL its children (even though their props didn't change).
function CounterParent() {
  const [count, setCount] = useState(0)
  return (
    <div style={{ border: '2px solid #0ea5e9', padding: 12 }}>
      <p>
        Parent (count: {count})
        <RenderedAt />
      </p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <ChildA />
      <ChildB />
    </div>
  )
}

// A sibling OUTSIDE the parent's subtree: it does not re-render.
function Sibling() {
  return (
    <p>
      Sibling outside the subtree
      <RenderedAt />
    </p>
  )
}

export default function RenderTriggers() {
  return (
    <div>
      <CounterParent />
      <Sibling />
    </div>
  )
}
