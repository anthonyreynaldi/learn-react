import { useState } from 'react'

// A child with its own state (the typed text)
function Notes() {
  const [text, setText] = useState('')
  return <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Type a note" />
}

// A: NOT RENDERING. When show is false, Notes is removed (unmounted)
// and its state is thrown away. Showing it again mounts a NEW Notes.
function PanelA() {
  const [show, setShow] = useState(true)
  return (
    <div>
      <h3>A: {'{show && <Notes />}'}</h3>
      <button onClick={() => setShow(!show)}>Toggle</button>
      <p>{show && <Notes />}</p>
    </div>
  )
}

// B: HIDING. Notes stays mounted; CSS just hides it, so its state survives.
function PanelB() {
  const [show, setShow] = useState(true)
  return (
    <div>
      <h3>B: display: none</h3>
      <button onClick={() => setShow(!show)}>Toggle</button>
      <p style={{ display: show ? 'block' : 'none' }}>
        <Notes />
      </p>
    </div>
  )
}

export default function HidingVsUnmounting() {
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <PanelA />
      <PanelB />
    </div>
  )
}
