import { useState } from 'react'

const initialOrders = [
  { id: 101, customer: 'PT Maju Jaya', total: 750000, status: 'pending' },
  { id: 102, customer: 'CV Sinar Abadi', total: 1250000, status: 'pending' },
  { id: 103, customer: 'PT Karya Baru', total: 480000, status: 'pending' },
]

// Each row keeps its note in its OWN state.
// React ties that state to the row's key.
function OrderRow({ order }) {
  const [note, setNote] = useState('')
  return (
    <li>
      #{order.id} {order.customer}{' '}
      <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Note" />
    </li>
  )
}

function OrderList({ title, keyMode, onReset }) {
  const [orders, setOrders] = useState(initialOrders)

  function handleRemoveFirst() {
    const firstId = orders[0]?.id
    setOrders(orders.filter((o) => o.id !== firstId))
  }

  return (
    <div>
      <h3>{title}</h3>
      <button onClick={handleRemoveFirst}>Remove first</button>{' '}
      <button onClick={onReset}>Reset</button>
      <ul>
        {orders.map((order, index) => (
          // BUG on the left: key={index}. FIX on the right: key={order.id}.
          <OrderRow key={keyMode === 'index' ? index : order.id} order={order} />
        ))}
      </ul>
    </div>
  )
}

export default function IndexKeyBug() {
  // Changing a component's key makes React throw it away and mount a fresh one.
  // That is how Reset works here. This trick is explained in Part 7.
  const [indexListVersion, setIndexListVersion] = useState(0)
  const [idListVersion, setIdListVersion] = useState(0)

  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      {/* Sibling keys must be unique, so each list gets its own prefix */}
      <OrderList
        key={`index-${indexListVersion}`}
        title="key = index"
        keyMode="index"
        onReset={() => setIndexListVersion(indexListVersion + 1)}
      />
      <OrderList
        key={`id-${idListVersion}`}
        title="key = id"
        keyMode="id"
        onReset={() => setIdListVersion(idListVersion + 1)}
      />
    </div>
  )
}
