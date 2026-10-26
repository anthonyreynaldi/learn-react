import { useState } from 'react'

// Fake saves (no network). One rejects with a real Error, the other with a plain
// string, because JavaScript can throw anything. That's why catch gives `unknown`.
function fakeSaveError(): Promise<void> {
  return new Promise((_, reject) => setTimeout(() => reject(new Error('Server responded with 500')), 400))
}
function fakeSaveString(): Promise<void> {
  return new Promise((_, reject) => setTimeout(() => reject('timeout'), 400))
}

export default function CatchPattern() {
  const [message, setMessage] = useState('')
  const [saving, setSaving] = useState(false)

  async function save(request: () => Promise<void>) {
    setSaving(true)
    setMessage('')
    try {
      await request()
      setMessage('Saved.')
    } catch (err) {
      // err: unknown. Check before using it:
      if (err instanceof Error) {
        setMessage(`Could not save: ${err.message}`) // here err is Error
      } else {
        setMessage(`Could not save: ${String(err)}`) // something else was thrown
      }
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <button onClick={() => save(fakeSaveError)} disabled={saving}>
        Save (throws an Error)
      </button>{' '}
      <button onClick={() => save(fakeSaveString)} disabled={saving}>
        Save (throws a string)
      </button>
      {saving && <p>Saving…</p>}
      {message && <p style={{ color: '#b91c1c' }}>{message}</p>}
    </div>
  )
}
