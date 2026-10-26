import { useState } from 'react'

export default function TernaryPattern() {
  const [status, setStatus] = useState('pending')

  return (
    <div>
      <p>Order #101 is {status}.</p>
      {/* TERNARY: choose between TWO things inline */}
      {status === 'approved' ? (
        <p style={{ color: 'green' }}>Ready to ship.</p>
      ) : (
        <p style={{ color: 'orange' }}>Waiting for approval.</p>
      )}
      <button onClick={() => setStatus(status === 'approved' ? 'pending' : 'approved')}>
        Toggle status
      </button>
    </div>
  )
}
