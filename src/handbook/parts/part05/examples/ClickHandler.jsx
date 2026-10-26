import { useState } from 'react'

export default function ClickHandler() {
  const [clicks, setClicks] = useState(0)

  // Event handler: a function defined inside the component.
  // Convention: name it handle + EventName.
  function handleClick() {
    setClicks(clicks + 1)
  }

  return (
    <div>
      {/* Pass the function itself (no parentheses). React calls it on click. */}
      <button onClick={handleClick}>Click me</button>
      <p>You clicked {clicks} times.</p>
    </div>
  )
}
