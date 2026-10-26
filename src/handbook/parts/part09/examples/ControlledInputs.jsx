import { useState } from 'react'

export default function ControlledInputs() {
  const [customer, setCustomer] = useState('PT Maju Jaya')
  const [productCode, setProductCode] = useState('')
  const [phone, setPhone] = useState('')

  return (
    <div>
      {/* CONTROLLED input: value comes from state, onChange writes to state.
          State is the single source of truth; the input only displays it. */}
      <div>
        <label htmlFor="ci-customer">Customer </label>
        <input id="ci-customer" value={customer} onChange={(e) => setCustomer(e.target.value)} />
        <p>You typed: {customer}</p>
      </div>

      {/* Because we decide what goes into state, we can transform the input */}
      <div>
        <label htmlFor="ci-code">Product code </label>
        <input
          id="ci-code"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value.toUpperCase())}
          placeholder="ft-6060"
        />
      </div>

      {/* ...or reject characters: remove everything that isn't a digit */}
      <div>
        <label htmlFor="ci-phone">Phone (digits only) </label>
        <input
          id="ci-phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
          placeholder="0315550101"
        />
      </div>
    </div>
  )
}
