import { useState } from 'react'
import { formatRupiah } from '../../../../utils/format'

const price = 120000 // Floor Tile 60x60

export default function NumberInput() {
  // Keep the RAW string in state. e.target.value is always a string,
  // even for type="number", and an empty field is "" (not 0).
  const [qty, setQty] = useState('2')

  // Convert only when you calculate
  const qtyNumber = Number(qty)
  const total = qtyNumber * price

  return (
    <div>
      <label htmlFor="ni-qty">Quantity </label>
      <input id="ni-qty" type="number" min="1" value={qty} onChange={(e) => setQty(e.target.value)} />
      <ul>
        <li>
          qty in state: {JSON.stringify(qty)} (typeof: {typeof qty})
        </li>
        <li>
          Number(qty): {qtyNumber} (typeof: {typeof qtyNumber})
        </li>
        <li>
          Total for Floor Tile 60x60 ({formatRupiah(price)} each): {formatRupiah(total)}
        </li>
      </ul>
    </div>
  )
}
