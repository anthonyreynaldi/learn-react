import { useState } from 'react'
import { useFetch } from './hooks/useFetch.js'

export default function CustomerDetail() {
  const [customerId, setCustomerId] = useState(1)

  // Destructuring with RENAMING: { data: customer } means
  // "take the data property and call it customer here" (Part 0)
  const { data: customer, error, loading } = useFetch(`/handbook-data/customers/${customerId}.json`)

  return (
    <div>
      <p>
        {[1, 2, 3, 99].map((id) => (
          <button key={id} onClick={() => setCustomerId(id)} style={{ fontWeight: id === customerId ? 'bold' : undefined, marginRight: 6 }}>
            Customer {id}
          </button>
        ))}
      </p>
      {loading && <p>Loading customer {customerId}…</p>}
      {error && <p style={{ color: 'red' }}>Could not load customer {customerId}: {error}</p>}
      {customer && (
        <ul>
          <li>Name: {customer.name}</li>
          <li>City: {customer.city}</li>
          <li>Phone: {customer.phone}</li>
        </ul>
      )}
    </div>
  )
}
