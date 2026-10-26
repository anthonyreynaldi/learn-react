import { sampleOrders, type OrderStatus } from './base.ts'

type Log = (...values: unknown[]) => void

// satisfies: CHECK the value against a type, but keep the value's own, more precise type.
// - every OrderStatus must be present (like Record) → a missing or misspelled key is an error
// - the values keep their exact types: statusColors.pending is '#f59e0b', not just string
const statusColors = {
  pending: '#f59e0b',
  approved: '#16a34a',
  rejected: '#dc2626',
} satisfies Record<OrderStatus, string>

export default function run(log: Log) {
  for (const order of sampleOrders) {
    log(`#${order.id} ${order.status} → ${statusColors[order.status]}`)
  }
  log('statusColors.pending:', statusColors.pending) // type: "#f59e0b"
}
