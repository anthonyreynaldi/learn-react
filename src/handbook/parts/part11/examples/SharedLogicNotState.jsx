import { useLocalStorage } from './hooks/useLocalStorage.js'

const box = { border: '1px solid #ccc', padding: 8, borderRadius: 6 }

// Two DIFFERENT components using the same hook with the SAME key.
// Each call to useLocalStorage creates its own useState inside:
// they share the code, not the state.
function NoteEditorA() {
  const [note, setNote] = useLocalStorage('handbook-shared-note', '')
  return (
    <div style={box}>
      <h3>Editor A</h3>
      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Type here" />
      <p>A's state: {JSON.stringify(note)}</p>
    </div>
  )
}

function NoteEditorB() {
  const [note, setNote] = useLocalStorage('handbook-shared-note', '')
  return (
    <div style={box}>
      <h3>Editor B</h3>
      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Type here" />
      <p>B's state: {JSON.stringify(note)}</p>
    </div>
  )
}

export default function SharedLogicNotState() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
      <NoteEditorA />
      <NoteEditorB />
    </div>
  )
}
