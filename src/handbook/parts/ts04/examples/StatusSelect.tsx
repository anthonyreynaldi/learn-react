import { useState } from 'react'

// A union of LITERAL types: only these three exact strings are allowed.
type OrderStatus = 'pending' | 'approved' | 'rejected'

const statuses: OrderStatus[] = ['pending', 'approved', 'rejected']

// const typo: OrderStatus = 'aproved'
// ✗ Type '"aproved"' is not assignable to type 'OrderStatus'. Did you mean '"approved"'?

// A lookup object (Part 6). Its keys are exactly the three statuses, so
// statusColors[status] is allowed for every OrderStatus.
const statusColors = {
  pending: 'orange',
  approved: 'green',
  rejected: 'red',
}

function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span style={{ background: statusColors[status], color: 'white', padding: '2px 10px', borderRadius: 10 }}>
      {status}
    </span>
  )
}

export default function StatusSelect() {
  const [status, setStatus] = useState<OrderStatus>('pending')

  function handleChange(value: string) {
    // e.target.value is just a string. Find it in the list of valid statuses:
    // the result is an OrderStatus (or undefined), with no "trust me" assertion.
    const next = statuses.find((s) => s === value)
    if (next) setStatus(next)
  }

  return (
    <div>
      <select value={status} onChange={(e) => handleChange(e.target.value)} aria-label="Status">
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>{' '}
      Order #101: <StatusBadge status={status} />
    </div>
  )
}
