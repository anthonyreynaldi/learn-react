import { useState } from 'react'

export default function ApproveWithArgument() {
  const [message, setMessage] = useState('No order approved yet.')

  // This handler needs an argument: which order to approve.
  function handleApprove(orderId) {
    setMessage(`Order #${orderId} approved.`)
  }

  return (
    <div>
      <p>Order #101 — PT Maju Jaya</p>
      {/* Wrap the call in an arrow function, so it runs on click, not during render */}
      <button onClick={() => handleApprove(101)}>Approve</button>
      <p>{message}</p>
    </div>
  )
}
