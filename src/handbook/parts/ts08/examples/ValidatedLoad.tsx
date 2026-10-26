import { useState } from 'react'
import { z } from 'zod'
import { apiGet } from './apiGet.ts'
import { OrdersSchema, type Order } from './schemas.ts'

type Result =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; orders: Order[] }
  | { status: 'error'; userMessage: string; issues: string[] }

export default function ValidatedLoad() {
  const [result, setResult] = useState<Result>({ status: 'idle' })

  async function load(path: string) {
    setResult({ status: 'loading' })
    try {
      const orders = await apiGet(path, OrdersSchema) // orders: Order[], CHECKED
      setResult({ status: 'success', orders })
    } catch (err) {
      if (err instanceof z.ZodError) {
        // For developers: exactly which field is wrong, and how
        const issues = err.issues.map((issue) => `${issue.path.join('.')}: ${issue.message}`)
        // For users: a calm, simple message (log the details, don't show raw errors in production)
        setResult({ status: 'error', userMessage: 'The server sent orders in an unexpected format.', issues })
      } else {
        setResult({ status: 'error', userMessage: 'Could not load orders.', issues: [String(err)] })
      }
    }
  }

  return (
    <div>
      <p>
        <button onClick={() => load('/handbook-data/ts8/orders.json')}>Load orders.json</button>{' '}
        <button onClick={() => load('/handbook-data/ts8/orders-laravel.json')}>Load orders-laravel.json</button>
      </p>
      {result.status === 'loading' && <p>Loading…</p>}
      {result.status === 'success' && (
        <ul>
          {result.orders.map((o) => (
            <li key={o.id}>
              #{o.id} {o.customer}: {o.total + 1000} (total + 1000, a real number)
            </li>
          ))}
        </ul>
      )}
      {result.status === 'error' && (
        <div>
          <p style={{ color: '#b91c1c' }}>{result.userMessage}</p>
          <details open>
            <summary>Zod issues ({result.issues.length})</summary>
            <ul>
              {result.issues.map((issue) => (
                <li key={issue}>
                  <code>{issue}</code>
                </li>
              ))}
            </ul>
          </details>
        </div>
      )}
    </div>
  )
}
