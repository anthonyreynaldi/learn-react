import { useState } from 'react'

export default function CheckboxInput() {
  const [isUrgent, setIsUrgent] = useState(false)
  const [lastEvent, setLastEvent] = useState(null)

  function handleChange(e) {
    // For checkboxes, read e.target.CHECKED (a boolean).
    // e.target.value is just the value attribute: "on" by default.
    setIsUrgent(e.target.checked)
    setLastEvent({ value: e.target.value, checked: e.target.checked })
  }

  return (
    <div>
      <label>
        {/* checked (not value) is what makes a checkbox controlled */}
        <input type="checkbox" checked={isUrgent} onChange={handleChange} /> Urgent delivery
      </label>
      <p>isUrgent in state: {String(isUrgent)}</p>
      {lastEvent && (
        <p>
          Last change: e.target.value = {JSON.stringify(lastEvent.value)}, e.target.checked ={' '}
          {String(lastEvent.checked)}
        </p>
      )}
    </div>
  )
}
