import { useState } from 'react'

const statusColors = { approved: 'green', pending: 'orange', rejected: 'red' }

const initialOrders = [
  { id: 101, customer: 'PT Maju Jaya', status: 'pending' },
  { id: 102, customer: 'CV Sinar Abadi', status: 'pending' },
  { id: 103, customer: 'PT Karya Baru', status: 'pending' },
]

// CHILD: has no state. It receives data AND a function (onChangeStatus) as props.
// Clicking a button calls the parent's function; the parent changes its own state.
function OrderRow({ id, customer, status, onChangeStatus }) {
  return (
    <tr>
      <td>#{id}</td>
      <td>{customer}</td>
      <td style={{ color: statusColors[status] }}>{status}</td>
      <td>
        <button onClick={() => onChangeStatus(id, 'approved')}>Approve</button>{' '}
        <button onClick={() => onChangeStatus(id, 'rejected')}>Reject</button>
      </td>
    </tr>
  )
}

// PARENT: owns the state, so only it changes the state.
export default function OrderApproval() {
  const [orders, setOrders] = useState(initialOrders)

  // Convention: the prop is called onX, the parent's function is called handleX.
  function handleChangeStatus(id, newStatus) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o)))
  }

  // Derived value: counted from state, not stored separately.
  const waiting = orders.filter((o) => o.status === 'pending').length

  return (
    <div>
      <p>
        Waiting for approval: <strong>{waiting}</strong>{' '}
        <button onClick={() => setOrders(initialOrders)}>Reset</button>
      </p>
      <table>
        <tbody>
          {/* map + key={o.id} renders one row per order. Keys are explained in Part 6. */}
          {orders.map((o) => (
            <OrderRow
              key={o.id}
              id={o.id}
              customer={o.customer}
              status={o.status}
              onChangeStatus={handleChangeStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  )
}
