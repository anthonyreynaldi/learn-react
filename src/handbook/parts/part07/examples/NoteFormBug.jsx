import { useState } from 'react'

function NoteForm({ customer }) {
  // This state belongs to "the NoteForm at this position",
  // NOT to a specific customer.
  const [note, setNote] = useState('')
  return (
    <div>
      <p>Note for {customer}:</p>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} cols={40} />
    </div>
  )
}

export default function NoteFormBug() {
  const [selected, setSelected] = useState('PT Maju Jaya')

  return (
    <div>
      <button onClick={() => setSelected('PT Maju Jaya')}>PT Maju Jaya</button>{' '}
      <button onClick={() => setSelected('CV Sinar Abadi')}>CV Sinar Abadi</button>
      {/* Same component type, same position -> React keeps it (and its state).
          Only the customer prop changes, so the old note stays. */}
      <NoteForm customer={selected} />
    </div>
  )
}
