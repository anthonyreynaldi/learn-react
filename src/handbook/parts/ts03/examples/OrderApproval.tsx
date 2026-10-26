import { useState } from 'react'

type Order = { id: number; customer: string; status: 'pending' | 'approved' }

type OrderRowProps = {
  order: Order
  // A FUNCTION TYPE: "a function that takes a number and returns nothing".
  // void = the return value isn't used.
  onApprove: (id: number) => void
}

function OrderRow({ order, onApprove }: OrderRowProps) {
  return (
    <li>
      #{order.id} {order.customer} ({order.status}){' '}
      {order.status === 'pending' && <button onClick={() => onApprove(order.id)}>Approve</button>}
      {/* onApprove(String(order.id)) would be an error:
          Argument of type 'string' is not assignable to parameter of type 'number'. */}
    </li>
  )
}

export default function OrderApproval() {
  const [orders, setOrders] = useState<Order[]>([
    { id: 101, customer: 'PT Maju Jaya', status: 'pending' },
    { id: 102, customer: 'CV Sinar Abadi', status: 'pending' },
  ])

  // Matches (id: number) => void, so it can be passed as onApprove
  function handleApprove(id: number) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'approved' } : o)))
  }

  return (
    <ul>
      {orders.map((o) => (
        <OrderRow key={o.id} order={o} onApprove={handleApprove} />
      ))}
    </ul>
  )
}
