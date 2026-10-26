import { useState } from 'react'

const customers = ['PT Maju Jaya', 'CV Sinar Abadi', 'PT Karya Baru']

// NoteForm has NO state now. It shows the note it gets and reports changes.
function NoteForm({ customer, note, onChange }) {
  return (
    <div>
      <p>Note for {customer}:</p>
      <textarea value={note} onChange={(e) => onChange(e.target.value)} rows={3} cols={40} />
    </div>
  )
}

export default function CustomerNotes() {
  const [selected, setSelected] = useState(customers[0])
  // All notes live in the parent, keyed by customer name:
  // { 'PT Maju Jaya': '...', 'CV Sinar Abadi': '...' }
  const [notes, setNotes] = useState({})

  function handleNoteChange(text) {
    // Computed property name: update only the selected customer's note
    setNotes({ ...notes, [selected]: text })
  }

  return (
    <div>
      <p>
        {customers.map((c) => (
          <button key={c} onClick={() => setSelected(c)} style={{ fontWeight: c === selected ? 'bold' : undefined, marginRight: 6 }}>
            {c}
          </button>
        ))}
      </p>
      <NoteForm customer={selected} note={notes[selected] ?? ''} onChange={handleNoteChange} />
      <p>
        <small>notes in state: {JSON.stringify(notes)}</small>
      </p>
    </div>
  )
}
