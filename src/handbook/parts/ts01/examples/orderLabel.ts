// What you write: TypeScript
type Order = {
  id: number
  customer: string
  status: 'pending' | 'approved' | 'rejected'
}

export function orderLabel(order: Order): string {
  return `#${order.id} ${order.customer} (${order.status})`
}

const first: Order = { id: 101, customer: 'PT Maju Jaya', status: 'approved' }
export const label = orderLabel(first)
