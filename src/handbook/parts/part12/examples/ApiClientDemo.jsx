import { useState } from 'react'
import { api, ApiError, setAuthToken } from './api/client.js'

const invalidOrder = { customer: '   ', warehouse: 'BDG', total: 0 }
const validOrder = { customer: 'PT Maju Jaya', warehouse: 'SBY', total: 750000 }

export default function ApiClientDemo() {
  const [log, setLog] = useState([])
  const [fieldErrors, setFieldErrors] = useState({})
  const [busy, setBusy] = useState(false)

  function addLog(text, ok) {
    setLog((prev) => [...prev, { n: prev.length + 1, text, ok }])
  }

  // Every call goes through the same client; errors arrive as ApiError
  async function run(label, request) {
    setBusy(true)
    try {
      const data = await request()
      addLog(`${label} → OK ${JSON.stringify(data)}`, true)
      setFieldErrors({})
    } catch (err) {
      if (err instanceof ApiError && err.status === 422) {
        setFieldErrors(err.errors) // Laravel's field errors, ready for the form
        addLog(`${label} → 422 ${err.message}`, false)
      } else if (err instanceof ApiError) {
        addLog(`${label} → ${err.status} ${err.message}`, false)
      } else {
        addLog(`${label} → network error: ${err.message}`, false) // not from the server
      }
    } finally {
      setBusy(false)
    }
  }

  async function login() {
    await run('POST /api/login', async () => {
      const { token, user } = await api.post('/api/login', { email: 'budi@ptmaju.test', password: 'secret123' })
      setAuthToken(token) // every later request sends "Authorization: Bearer <token>"
      return { user: user.name }
    })
  }

  function logout() {
    setAuthToken(null)
    addLog('Token forgotten (logged out locally)', true)
  }

  return (
    <div>
      <p style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        <button disabled={busy} onClick={() => run('POST /api/orders (no login yet)', () => api.post('/api/orders', validOrder))}>
          1. Create without login
        </button>
        <button disabled={busy} onClick={login}>
          2. Log in as Budi
        </button>
        <button disabled={busy} onClick={() => run('POST /api/orders (invalid)', () => api.post('/api/orders', invalidOrder))}>
          3. Create invalid order
        </button>
        <button disabled={busy} onClick={() => run('POST /api/orders (valid)', () => api.post('/api/orders', validOrder))}>
          4. Create valid order
        </button>
        <button disabled={busy} onClick={logout}>
          Forget token
        </button>
      </p>

      {Object.keys(fieldErrors).length > 0 && (
        <div>
          <strong>err.errors (field errors for the form):</strong>
          <ul>
            {Object.entries(fieldErrors).map(([field, messages]) => (
              <li key={field}>
                <code>{field}</code>: <span style={{ color: '#dc2626' }}>{messages[0]}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ol>
        {log.map((entry) => (
          <li key={entry.n} style={{ color: entry.ok ? undefined : '#dc2626' }}>
            <code>{entry.text}</code>
          </li>
        ))}
      </ol>
    </div>
  )
}
