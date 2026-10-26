import { useState } from 'react'

function MutateDemo() {
  const [order, setOrder] = useState({ id: 104, customer: 'PT Maju Jaya', status: 'pending' })

  function handleApprove() {
    order.status = 'approved'
    // Object.is(old, new) is true: React thinks nothing changed and skips the render.
    setOrder(order)
  }

  return (
    <div>
      <h3>setOrder(sameMutatedObject)</h3>
      <p>
        #{order.id} {order.customer}: {order.status}
      </p>
      <button onClick={handleApprove}>Approve</button>
    </div>
  )
}

function CopyDemo() {
  const [order, setOrder] = useState({ id: 105, customer: 'CV Sinar Abadi', status: 'pending' })

  function handleApprove() {
    // A new object: Object.is(old, new) is false, so React re-renders.
    setOrder({ ...order, status: 'approved' })
  }

  return (
    <div>
      <h3>setOrder({'{ ...order, status }'})</h3>
      <p>
        #{order.id} {order.customer}: {order.status}
      </p>
      <button onClick={handleApprove}>Approve</button>
    </div>
  )
}

export default function ImmutableUpdate() {
  // Separate components = separate state, so the demos don't affect each other.
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <MutateDemo />
      <CopyDemo />
    </div>
  )
}
