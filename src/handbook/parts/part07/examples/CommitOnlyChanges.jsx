import { useState } from 'react'

export default function CommitOnlyChanges() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString('id-ID'))

  function handleTick() {
    setTime(new Date().toLocaleTimeString('id-ID'))
  }

  // Every Tick re-renders this whole component, and the JSX below is
  // created again. But in the COMMIT step React compares it with the
  // previous JSX and only changes the time text in the DOM.
  // The <input> is the same type in the same position, so React leaves
  // the real input alone: your text, cursor and focus stay.
  return (
    <div>
      <p>Time: {time}</p>
      {/* onMouseDown + preventDefault keeps the button from stealing focus,
          so you can see the input keep its focus */}
      <button onClick={handleTick} onMouseDown={(e) => e.preventDefault()}>
        Tick
      </button>
      <p>
        <input placeholder="Type here, then click Tick" />
      </p>
    </div>
  )
}
