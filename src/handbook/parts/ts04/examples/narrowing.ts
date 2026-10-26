type Log = (...values: unknown[]) => void

type OrderStatus = 'pending' | 'approved' | 'rejected'
type Order = { id: number; customer: string; status: OrderStatus; note: string | null }

// 1. typeof narrowing
function formatId(id: number | string): string {
  // here: id is number | string
  if (typeof id === 'number') {
    return `#${id}` // here: id is number
  }
  return id.toUpperCase() // here: id is string (the number case already returned)
}

// 2. a null check
function noteText(order: Order): string {
  // here: order.note is string | null
  if (order.note !== null) {
    return order.note.trim() // here: order.note is string
  }
  return '(no note)'
}

// 3. an equality check
function shippingLabel(status: OrderStatus): string {
  if (status === 'approved') {
    return 'Ready to ship' // here: status is 'approved'
  }
  return `Not ready (${status})` // here: status is 'pending' | 'rejected'
}

// 4. an early return
function customerName(order: Order | undefined): string {
  if (!order) return 'Unknown customer' // here: order is undefined
  return order.customer // here: order is Order
}

export default function run(log: Log) {
  const order: Order = { id: 101, customer: 'PT Maju Jaya', status: 'approved', note: '  Call first  ' }

  log(formatId(101), formatId('so-0042'))
  log(noteText(order), '|', noteText({ ...order, note: null }))
  log(shippingLabel('approved'), '|', shippingLabel('pending'))
  log(customerName(order), '|', customerName(undefined))
}
