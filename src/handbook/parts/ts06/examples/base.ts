// The shared base for this part. Everything else is DERIVED from these two definitions.

// The list of statuses is written ONCE, as a real value (usable at runtime, e.g. for a <select>).
// `as const` keeps the exact strings instead of widening them to string[] (see "as const").
export const STATUSES = ['pending', 'approved', 'rejected'] as const

// The type is derived from the list: 'pending' | 'approved' | 'rejected'.
// Add a status to STATUSES and this type updates by itself.
export type OrderStatus = (typeof STATUSES)[number]

export type Order = {
  id: number
  customer: string
  total: number
  status: OrderStatus
  note?: string
}

export const sampleOrders: Order[] = [
  { id: 101, customer: 'PT Maju Jaya', total: 750000, status: 'approved' },
  { id: 102, customer: 'CV Sinar Abadi', total: 1250000, status: 'pending', note: 'Deliver before 10:00' },
  { id: 103, customer: 'PT Karya Baru', total: 480000, status: 'rejected' },
]
