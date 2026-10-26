import { useState } from 'react'
import { sampleOrders, type Order, type OrderStatus } from './types.ts'

type OrderRowProps = {
  order: Order
  // A function prop: takes an id and a status, returns nothing
  onChangeStatus: (id: number, status: OrderStatus) => void
}

function OrderRow({ order, onChangeStatus }: OrderRowProps) {
  return (
    <li>
      #{order.id} {order.customer} ({order.status}){' '}
      <button onClick={() => onChangeStatus(order.id, 'approved')}>Approve</button>{' '}
      <button onClick={() => onChangeStatus(order.id, 'rejected')}>Reject</button>
      {/* onChangeStatus(order.id, 'aproved')
          ✗ Argument of type '"aproved"' is not assignable to parameter of type '"approved" | "pending" | "rejected"'. */}
    </li>
  )
}

export default function CallbackProps() {
  const [orders, setOrders] = useState(sampleOrders) // inferred: Order[]

  // Its signature matches onChangeStatus exactly
  function handleChangeStatus(id: number, status: OrderStatus) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)))
  }

  return (
    <ul>
      {orders.map((o) => (
        <OrderRow key={o.id} order={o} onChangeStatus={handleChangeStatus} />
      ))}
    </ul>
  )
}
