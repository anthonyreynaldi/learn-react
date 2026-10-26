import { useState } from 'react'

export default function AndPattern() {
  const [urgent, setUrgent] = useState(true)

  return (
    <div>
      <p>
        Order #104 — PT Maju Jaya{' '}
        {/* &&: show something OR nothing. If urgent is false, React renders nothing. */}
        {urgent && <strong style={{ color: 'red' }}>URGENT</strong>}
      </p>
      <label>
        <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} /> Urgent
      </label>
    </div>
  )
}
