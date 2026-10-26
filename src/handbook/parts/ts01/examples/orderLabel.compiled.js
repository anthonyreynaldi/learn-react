// What the browser runs: the same code with the types ERASED.
// The `type Order` block is gone, and so are `: Order` and `: string`.
// Nothing is left to check anything at runtime.

export function orderLabel(order) {
  return `#${order.id} ${order.customer} (${order.status})`
}

const first = { id: 101, customer: 'PT Maju Jaya', status: 'approved' }
export const label = orderLabel(first)
