import { sampleOrders, type Order } from './base.ts'

type Log = (...values: unknown[]) => void

// INDEXED ACCESS: Order['status'] = "the type of Order's status property".
// No need to repeat 'pending' | 'approved' | 'rejected' anywhere.
type Status = Order['status'] // 'pending' | 'approved' | 'rejected'
type Money = Order['total'] // number

function countByStatus(orders: Order[], status: Status): number {
  return orders.filter((o) => o.status === status).length
}

function sumTotals(orders: Order[]): Money {
  return orders.reduce((sum, o) => sum + o.total, 0)
}

export default function run(log: Log) {
  log('approved:', countByStatus(sampleOrders, 'approved'))
  log('pending:', countByStatus(sampleOrders, 'pending'))
  log('sum of totals:', sumTotals(sampleOrders))
  // If Order.total ever becomes a string (e.g. "750000.00" from a decimal column),
  // Money changes with it, and every place using it is checked again.
}
