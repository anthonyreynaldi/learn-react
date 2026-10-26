import { sampleOrders, type OrderStatus } from './base.ts'

// Record<Keys, Value>: an object with EXACTLY these keys, each holding a Value.
// Every OrderStatus must have a label, so a missing one is a type error.
const statusLabels: Record<OrderStatus, string> = {
  pending: 'Waiting for approval',
  approved: 'Approved ✓',
  rejected: 'Rejected ✗',
}

export default function StatusLabels() {
  return (
    <ul>
      {sampleOrders.map((o) => (
        <li key={o.id}>
          #{o.id} {o.customer}: {statusLabels[o.status]}
        </li>
      ))}
    </ul>
  )
}
