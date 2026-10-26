import { useState } from 'react'

const MAX = 200

export default function TextareaInput() {
  const [note, setNote] = useState('Deliver before 10:00, call the warehouse first.')

  return (
    <div>
      <label htmlFor="ta-note">Delivery note</label>
      <div>
        {/* In HTML the text goes between the tags. In React, textarea uses value, like an input. */}
        <textarea
          id="ta-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={MAX}
          rows={3}
          cols={50}
        />
      </div>
      <p>
        {note.length} / {MAX} characters
      </p>
    </div>
  )
}
