import { useState, type ChangeEvent, type SubmitEvent } from 'react'
import { STATUSES, type OrderStatus } from './types.ts'

export default function EventsForm() {
  const [customer, setCustomer] = useState('PT Maju Jaya')
  const [note, setNote] = useState('')
  const [status, setStatus] = useState<OrderStatus>('pending')
  const [submitted, setSubmitted] = useState('')

  // A SEPARATE handler needs its event type written out:
  // ChangeEvent of an <input>, so e.target is an HTMLInputElement.
  function handleNoteChange(e: ChangeEvent<HTMLInputElement>) {
    setNote(e.target.value)
  }

  function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    // e.target.value is a plain string. The assertion is acceptable HERE because
    // the options are rendered from STATUSES, so the value can only be one of them.
    // (For values from outside, like URLs or JSON, check instead: TS Parts 4 and 8.)
    setStatus(e.target.value as OrderStatus)
  }

  // Form submit: SubmitEvent<HTMLFormElement>.
  // (Older code and tutorials use FormEvent, which is deprecated in current React types.)
  function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitted(JSON.stringify({ customer, note, status }))
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        {/* INLINE handler: no annotation needed, e is inferred from onChange (contextual typing) */}
        <input value={customer} onChange={(e) => setCustomer(e.target.value)} aria-label="Customer" />
      </p>
      <p>
        <input value={note} onChange={handleNoteChange} placeholder="Note" aria-label="Note" />
      </p>
      <p>
        <select value={status} onChange={handleStatusChange} aria-label="Status">
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>{' '}
        <button type="submit">Save</button>
      </p>
      {submitted && (
        <p>
          Submitted: <code>{submitted}</code>
        </p>
      )}
    </form>
  )
}
