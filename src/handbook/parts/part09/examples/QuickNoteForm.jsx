import { useState } from 'react'

export default function QuickNoteForm() {
  // Only the RESULT is state. The inputs themselves are uncontrolled.
  const [result, setResult] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    // FormData reads every named field from the form's DOM at submit time
    const formData = new FormData(e.target)
    // Turn it into a plain object: { customer: '...', note: '...', ... }
    setResult(Object.fromEntries(formData))
  }

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <form onSubmit={handleSubmit}>
        {/* UNCONTROLLED: defaultValue sets the starting value only.
            The browser keeps the current value; React doesn't track it. */}
        <div>
          <label htmlFor="qn-customer">Customer</label>
          <br />
          <input id="qn-customer" name="customer" defaultValue="CV Sinar Abadi" />
        </div>
        <div>
          <label htmlFor="qn-note">Note</label>
          <br />
          <textarea id="qn-note" name="note" defaultValue="Call before delivery." rows={2} />
        </div>
        <div>
          <label htmlFor="qn-priority">Priority</label>
          <br />
          <select id="qn-priority" name="priority" defaultValue="normal">
            <option value="low">Low</option>
            <option value="normal">Normal</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          {/* defaultChecked for checkboxes. Unchecked boxes are left out of FormData. */}
          <label>
            <input type="checkbox" name="urgent" defaultChecked={false} /> Urgent
          </label>
        </div>
        <button type="submit">Save note</button>
      </form>

      <div>
        <strong>Object.fromEntries(new FormData(form)):</strong>
        <pre>{result ? JSON.stringify(result, null, 2) : 'Submit the form to see it.'}</pre>
      </div>
    </div>
  )
}
