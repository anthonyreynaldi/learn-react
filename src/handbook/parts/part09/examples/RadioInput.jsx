import { useState } from 'react'

export default function RadioInput() {
  const [payment, setPayment] = useState('transfer')

  return (
    <fieldset>
      <legend>Payment method</legend>
      {/* Same name = one group. Each radio is "checked" when its value matches state. */}
      <label>
        <input
          type="radio"
          name="payment"
          value="transfer"
          checked={payment === 'transfer'}
          onChange={(e) => setPayment(e.target.value)}
        />{' '}
        Bank transfer
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="payment"
          value="cash"
          checked={payment === 'cash'}
          onChange={(e) => setPayment(e.target.value)}
        />{' '}
        Cash on delivery
      </label>
      <br />
      <label>
        <input
          type="radio"
          name="payment"
          value="credit"
          checked={payment === 'credit'}
          onChange={(e) => setPayment(e.target.value)}
        />{' '}
        Credit (30 days)
      </label>
      <p>payment in state: {JSON.stringify(payment)}</p>
    </fieldset>
  )
}
