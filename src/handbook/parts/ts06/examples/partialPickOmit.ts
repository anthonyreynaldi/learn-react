import type { Order } from './base.ts'

type Log = (...values: unknown[]) => void

// Omit<T, keys>: T WITHOUT some properties. A new order has no id yet (the database assigns it).
type NewOrder = Omit<Order, 'id'>

// Pick<T, keys>: ONLY some properties. Enough for a dropdown or a summary row.
type OrderSummary = Pick<Order, 'id' | 'customer' | 'status'>

// Partial<T>: every property becomes optional. A PATCH-style update sends only what changed.
type OrderUpdate = Partial<Order>

let nextId = 104
const database: Order[] = []

// Fake API functions (no network). Like POST /api/orders and PATCH /api/orders/{id}.
function createOrder(data: NewOrder): Order {
  const order: Order = { id: nextId++, ...data }
  database.push(order)
  return order
}

function updateOrder(id: number, changes: OrderUpdate): Order | undefined {
  const index = database.findIndex((o) => o.id === id)
  if (index === -1) return undefined
  database[index] = { ...database[index], ...changes }
  return database[index]
}

function toSummary({ id, customer, status }: Order): OrderSummary {
  return { id, customer, status }
}

export default function run(log: Log) {
  const created = createOrder({ customer: 'PT Maju Jaya', total: 750000, status: 'pending' })
  log('created:', created)

  const updated = updateOrder(created.id, { status: 'approved', note: 'Approved by Budi' }) // only what changed
  log('updated:', updated)

  if (updated) log('summary:', toSummary(updated)) // just id, customer and status

  // An update is still checked: Partial makes properties optional, not anything-goes.
  // updateOrder(104, { status: 'aproved' })
  // ✗ Type '"aproved"' is not assignable to type '"approved" | "pending" | "rejected" | undefined'.
  //   Did you mean '"approved"'?
  //   (TypeScript prints the union members in alphabetical order, and adds undefined because of Partial.)
}
