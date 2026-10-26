import { useState } from 'react'
import { formatRupiah } from '../../../../utils/format'
import { orders } from './orders.js'

function OrderDetail({ order }) {
  // EARLY RETURN: handle the "nothing to show" case first and stop.
  // The rest of the function can then assume order exists.
  if (!order) {
    return <p>Select an order.</p>
  }

  return (
    <div>
      <h3>Order #{order.id}</h3>
      <p>Customer: {order.customer}</p>
      <p>Total: {formatRupiah(order.total)}</p>
      <p>Status: {order.status}</p>
    </div>
  )
}

export default function EarlyReturn() {
  const [selectedId, setSelectedId] = useState(null)
  // Derived: find the selected order (undefined if none)
  const selected = orders.find((o) => o.id === selectedId)

  return (
    <div>
      <p>
        <button onClick={() => setSelectedId(101)}>#101</button>{' '}
        <button onClick={() => setSelectedId(102)}>#102</button>{' '}
        <button onClick={() => setSelectedId(103)}>#103</button>{' '}
        <button onClick={() => setSelectedId(null)}>Clear</button>
      </p>
      <OrderDetail order={selected} />
    </div>
  )
}
