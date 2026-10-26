import { useState } from 'react'

const initialOrders = [
  { id: 101, customer: 'PT Maju Jaya', status: 'pending' },
  { id: 102, customer: 'CV Sinar Abadi', status: 'pending' },
]

function OrderRows({ orders, onSelect, onApprove }) {
  return (
    <ul>
      {orders.map((o) => (
        <li key={o.id}>
          #{o.id} {o.customer} ({o.status}) <button onClick={() => onSelect(o)}>Select</button>{' '}
          <button onClick={() => onApprove(o.id)} disabled={o.status !== 'pending'}>
            Approve
          </button>
        </li>
      ))}
    </ul>
  )
}

// ✗ BUGGY: stores a COPY of the selected order. Now the same order exists
// twice in state, and approving updates only the copy inside orders.
function WithCopy() {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedOrder, setSelectedOrder] = useState(null)

  function approve(id) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'approved' } : o)))
  }

  return (
    <div>
      <h3>Stores selectedOrder (copy)</h3>
      <OrderRows orders={orders} onSelect={setSelectedOrder} onApprove={approve} />
      <p>Detail: {selectedOrder ? `#${selectedOrder.id} is ${selectedOrder.status}` : 'nothing selected'}</p>
    </div>
  )
}

// ✓ FIXED: stores only the id and derives the order from the one true list.
function WithId() {
  const [orders, setOrders] = useState(initialOrders)
  const [selectedId, setSelectedId] = useState(null)
  const selectedOrder = orders.find((o) => o.id === selectedId)

  function approve(id) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: 'approved' } : o)))
  }

  return (
    <div>
      <h3>Stores selectedId (derived)</h3>
      <OrderRows orders={orders} onSelect={(o) => setSelectedId(o.id)} onApprove={approve} />
      <p>Detail: {selectedOrder ? `#${selectedOrder.id} is ${selectedOrder.status}` : 'nothing selected'}</p>
    </div>
  )
}

export default function DuplicationBug() {
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <WithCopy />
      <WithId />
    </div>
  )
}
