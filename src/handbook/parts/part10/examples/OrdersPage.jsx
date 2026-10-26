import { useState } from 'react'
import { formatRupiah } from '../../../../utils/format'

const initialOrders = [
  { id: 101, customer: 'PT Maju Jaya', total: 750000, status: 'pending' },
  { id: 102, customer: 'CV Sinar Abadi', total: 1250000, status: 'pending' },
  { id: 103, customer: 'PT Karya Baru', total: 480000, status: 'approved' },
]

// No state: receives the data and a function to report clicks
function OrderList({ orders, selectedId, onSelect }) {
  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {orders.map((o) => (
        <li
          key={o.id}
          onClick={() => onSelect(o.id)}
          style={{
            cursor: 'pointer',
            padding: '4px 8px',
            background: o.id === selectedId ? '#e0f2fe' : undefined,
          }}
        >
          #{o.id} {o.customer} ({o.status})
        </li>
      ))}
    </ul>
  )
}

// No state either: shows one order and asks the parent to approve it
function OrderDetail({ order, onApprove }) {
  if (!order) return <p>Select an order on the left.</p>
  return (
    <div>
      <h3>Order #{order.id}</h3>
      <p>Customer: {order.customer}</p>
      <p>Total: {formatRupiah(order.total)}</p>
      <p>Status: {order.status}</p>
      {order.status === 'pending' && <button onClick={() => onApprove(order.id)}>Approve</button>}
    </div>
  )
}

// The closest common parent OWNS the state that both children need
export default function OrdersPage() {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedId, setSelectedId] = useState(null)

  // Derived: the selected order is looked up, not stored a second time
  const selectedOrder = orders.find((o) => o.id === selectedId)

  function handleApprove(id) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'approved' } : o)))
  }

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <OrderList orders={orders} selectedId={selectedId} onSelect={setSelectedId} />
      <OrderDetail order={selectedOrder} onApprove={handleApprove} />
    </div>
  )
}
