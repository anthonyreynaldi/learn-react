// The same object shape, written two ways:

export type OrderT = {
  id: number
  customer: string
}

export interface OrderI {
  id: number
  customer: string
}

// Extending a shape:
export type OrderWithTotalT = OrderT & { total: number } // type: intersection with &

export interface OrderWithTotalI extends OrderI {
  // interface: extends, like a PHP class or interface
  total: number
}

// Unions, literal types and other non-object types: ONLY `type` can express these.
export type OrderStatus = 'pending' | 'approved' | 'rejected'
export type OrderId = number | string
export type OrdersState = { status: 'loading' } | { status: 'success'; orders: OrderT[] }
// interface OrderStatus = 'pending' | 'approved'   ✗ not possible with interface

// Both are checked the same way, and both are erased at runtime.
export const example: OrderWithTotalI = { id: 101, customer: 'PT Maju Jaya', total: 750000 }
export const sameShape: OrderWithTotalT = example // ✓ same shape, so they are compatible
