import { useState } from 'react'
import { STATUSES, type OrderStatus } from './base.ts'

export default function StatusSelectConst() {
  const [status, setStatus] = useState<OrderStatus>('pending')

  function handleChange(value: string) {
    // STATUSES is the real list at runtime AND the source of the type.
    // find() returns an OrderStatus (or undefined), no assertion needed.
    const next = STATUSES.find((s) => s === value)
    if (next) setStatus(next)
  }

  return (
    <p>
      {/* The options come from the same list the type was derived from */}
      <select value={status} onChange={(e) => handleChange(e.target.value)} aria-label="Status">
        {STATUSES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>{' '}
      state: <code>{JSON.stringify(status)}</code>
    </p>
  )
}
