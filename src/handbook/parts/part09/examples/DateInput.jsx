import { useState } from 'react'

export default function DateInput() {
  const [deliveryDate, setDeliveryDate] = useState('')

  return (
    <div>
      <label htmlFor="di-date">Delivery date </label>
      <input id="di-date" type="date" value={deliveryDate} onChange={(e) => setDeliveryDate(e.target.value)} />
      {/* The browser may DISPLAY the date as 19/10/2026, but the value is
          always a "YYYY-MM-DD" string, the same format Laravel's date rule accepts. */}
      <p>
        deliveryDate in state: {JSON.stringify(deliveryDate)} (typeof: {typeof deliveryDate})
      </p>
    </div>
  )
}
