import { useState } from 'react'
import { formatRupiah } from '../../../../utils/format'

const price = 25000

export default function QuantityPicker() {
  // Only the quantity is state...
  const [qty, setQty] = useState(1)

  // ...the total is a DERIVED value: calculated fresh on every render,
  // so it can never get out of sync with qty.
  const total = qty * price

  return (
    <div>
      <p>Price: {formatRupiah(price)}</p>
      <p>
        {/* Minimum quantity is 1 */}
        <button onClick={() => setQty(qty - 1)} disabled={qty <= 1}>
          −
        </button>{' '}
        <strong>{qty}</strong>{' '}
        <button onClick={() => setQty(qty + 1)}>+</button>
      </p>
      <p>Total: {formatRupiah(total)}</p>
    </div>
  )
}
