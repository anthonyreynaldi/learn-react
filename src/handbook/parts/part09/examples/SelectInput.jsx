import { useState } from 'react'

const warehouses = [
  { code: 'SBY', name: 'Surabaya' },
  { code: 'JKT', name: 'Jakarta' },
]

export default function SelectInput() {
  // "" = nothing chosen yet (matches the placeholder option)
  const [warehouse, setWarehouse] = useState('')

  return (
    <div>
      <label htmlFor="si-warehouse">Warehouse </label>
      {/* value on the <select>, not "selected" on an <option> like in HTML/Blade */}
      <select id="si-warehouse" value={warehouse} onChange={(e) => setWarehouse(e.target.value)}>
        <option value="" disabled>
          -- Choose a warehouse --
        </option>
        {warehouses.map((w) => (
          <option key={w.code} value={w.code}>
            {w.name}
          </option>
        ))}
      </select>
      <p>warehouse in state: {JSON.stringify(warehouse)}</p>
    </div>
  )
}
