import { useState } from 'react'

const statusColors = { approved: 'green', pending: 'orange', rejected: 'red' }

// BUGGY: mutates the object that is already in state.
function BuggyOrder() {
  const [order, setOrder] = useState({ id: 101, customer: 'PT Maju Jaya', status: 'pending' })

  function handleApprove() {
    order.status = 'approved' // changes the existing object
    setOrder(order) // same object as before -> React sees "no change" and skips the re-render
  }

  return (
    <div>
      <h3>Buggy (mutate)</h3>
      <p>
        #{order.id} {order.customer}:{' '}
        <span style={{ color: statusColors[order.status] }}>{order.status}</span>
      </p>
      <button onClick={handleApprove}>Approve (mutate)</button>
    </div>
  )
}

// FIXED: creates a NEW object with spread, then overrides one field.
function FixedOrder() {
  const [order, setOrder] = useState({ id: 102, customer: 'CV Sinar Abadi', status: 'pending' })

  function handleApprove() {
    setOrder({ ...order, status: 'approved' }) // new object -> React re-renders
  }

  return (
    <div>
      <h3>Fixed (copy)</h3>
      <p>
        #{order.id} {order.customer}:{' '}
        <span style={{ color: statusColors[order.status] }}>{order.status}</span>
      </p>
      <button onClick={handleApprove}>Approve (copy)</button>{' '}
      <button onClick={() => setOrder({ ...order, status: 'pending' })}>Reset</button>
    </div>
  )
}

export default function ObjectState() {
  // Each demo has its own separate state, so they don't affect each other.
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <BuggyOrder />
      <FixedOrder />
    </div>
  )
}
