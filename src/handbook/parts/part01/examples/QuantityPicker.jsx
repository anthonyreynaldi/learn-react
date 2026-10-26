// React (declarative): you describe WHAT the screen should look like
// for a given quantity. React works out which DOM changes are needed.
import { useState } from 'react'
import { formatRupiah } from '../../../../utils/format'

export default function QuantityPicker() {
  const price = 25000

  // useState keeps a value between renders. It is explained in Part 5;
  // for now just read it as "quantity starts at 0, setQuantity changes it".
  const [quantity, setQuantity] = useState(0)

  // No getElementById, no textContent: when quantity changes,
  // React re-runs this function and updates the screen for us.
  return (
    <div>
      <p>Price: {formatRupiah(price)}</p>
      <p>Quantity: {quantity}</p>
      <p>Total: {formatRupiah(quantity * price)}</p>
      <button onClick={() => setQuantity(quantity + 1)}>+</button>
    </div>
  )
}
