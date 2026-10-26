// Shared types for TS Part 7 (same approach as TS Part 6: derive from one list).
export const STATUSES = ['pending', 'approved', 'rejected'] as const
export type OrderStatus = (typeof STATUSES)[number]

export type Order = {
  id: number
  customer: string
  total: number
  status: OrderStatus
}

// Loading state for any data (TS Parts 4 and 5)
export type RequestState<T> =
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; message: string }

export const sampleOrders: Order[] = [
  { id: 101, customer: 'PT Maju Jaya', total: 750000, status: 'approved' },
  { id: 102, customer: 'CV Sinar Abadi', total: 1250000, status: 'pending' },
  { id: 103, customer: 'PT Karya Baru', total: 480000, status: 'pending' },
]

export function formatRupiah(n: number): string {
  return 'Rp ' + n.toLocaleString('id-ID')
}
