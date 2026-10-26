import { useState } from 'react'
import { sampleOrders, type Order } from './base.ts'

// keyof Order = 'id' | 'customer' | 'total' | 'status' | 'note'
// So sortField can only ever be a real property name of Order.
function compareBy(a: Order, b: Order, field: keyof Order): number {
  // Order[keyof Order] = the type of ANY property: number | string | undefined
  const x = a[field]
  const y = b[field]
  if (typeof x === 'number' && typeof y === 'number') return x - y
  return String(x ?? '').localeCompare(String(y ?? ''))
}

const sortButtons: (keyof Order)[] = ['id', 'customer', 'total']
// const typo: keyof Order = 'totl'
// ✗ Type '"totl"' is not assignable to type 'keyof Order'. Did you mean '"total"'?

export default function SortableOrders() {
  const [sortField, setSortField] = useState<keyof Order>('id')
  const sorted = sampleOrders.toSorted((a, b) => compareBy(a, b, sortField))

  return (
    <div>
      <p>
        Sort by:{' '}
        {sortButtons.map((field) => (
          <button key={field} onClick={() => setSortField(field)} style={{ fontWeight: field === sortField ? 'bold' : undefined, marginRight: 6 }}>
            {field}
          </button>
        ))}
      </p>
      <table>
        <tbody>
          {sorted.map((o) => (
            <tr key={o.id}>
              <td>#{o.id}</td>
              <td>{o.customer}</td>
              <td>{o.total.toLocaleString('id-ID')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
