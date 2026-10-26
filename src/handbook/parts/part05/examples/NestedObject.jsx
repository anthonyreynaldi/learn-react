import { useState } from 'react'

export default function NestedObject() {
  const [order, setOrder] = useState({
    id: 103,
    status: 'pending',
    customer: { name: 'PT Karya Baru', city: 'Surabaya' },
  })

  // Nested update: copy EVERY level you change.
  // Outer object: { ...order }. Inner object: { ...order.customer }.
  function handleCityChange(e) {
    setOrder({
      ...order,
      customer: { ...order.customer, city: e.target.value },
    })
  }

  return (
    <div>
      <p>
        Order #{order.id} for {order.customer.name} ({order.status})
      </p>
      <label htmlFor="city">City </label>
      <input id="city" value={order.customer.city} onChange={handleCityChange} />
      <p>Ship to: {order.customer.city}</p>
    </div>
  )
}
