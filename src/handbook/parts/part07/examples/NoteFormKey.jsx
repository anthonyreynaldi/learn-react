import { useState } from 'react'

function NoteForm({ customer }) {
  const [note, setNote] = useState('')
  return (
    <div>
      <p>Note for {customer}:</p>
      <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={3} cols={30} />
    </div>
  )
}

function CustomerButtons({ onSelect }) {
  return (
    <p>
      <button onClick={() => onSelect('PT Maju Jaya')}>PT Maju Jaya</button>{' '}
      <button onClick={() => onSelect('CV Sinar Abadi')}>CV Sinar Abadi</button>
    </p>
  )
}

function WithoutKey() {
  const [selected, setSelected] = useState('PT Maju Jaya')
  return (
    <div>
      <h3>Without key (bug)</h3>
      <CustomerButtons onSelect={setSelected} />
      <NoteForm customer={selected} />
    </div>
  )
}

function WithKey() {
  const [selected, setSelected] = useState('PT Maju Jaya')
  return (
    <div>
      <h3>With key={'{selected}'} (fixed)</h3>
      <CustomerButtons onSelect={setSelected} />
      {/* A different key = a different component to React.
          Switching customer unmounts the old NoteForm and mounts a fresh one. */}
      <NoteForm key={selected} customer={selected} />
    </div>
  )
}

export default function NoteFormKey() {
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <WithoutKey />
      <WithKey />
    </div>
  )
}
