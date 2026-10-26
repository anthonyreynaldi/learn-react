import type { ReactNode } from 'react'
import { formatRupiah, sampleOrders } from './types.ts'

// A GENERIC component (TS Part 5): works for a list of anything.
type ListProps<T> = {
  items: T[]
  getKey: (item: T) => string | number // a stable key per item (Part 6)
  renderItem: (item: T) => ReactNode
}

// `function List<T>`: a function declaration, because in a .tsx file
// `<T>` in front of an arrow function would be read as a JSX tag.
function List<T>({ items, getKey, renderItem }: ListProps<T>) {
  if (items.length === 0) return <p>No items.</p>
  return (
    <ul>
      {items.map((item) => (
        <li key={getKey(item)}>{renderItem(item)}</li>
      ))}
    </ul>
  )
}

type Customer = { code: string; name: string; city: string }
const customers: Customer[] = [
  { code: 'C-001', name: 'PT Maju Jaya', city: 'Jakarta' },
  { code: 'C-002', name: 'CV Sinar Abadi', city: 'Bandung' },
]

export default function GenericList() {
  return (
    <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
      <div>
        <h3>Orders</h3>
        {/* T is inferred as Order: inside renderItem, o is an Order */}
        <List items={sampleOrders} getKey={(o) => o.id} renderItem={(o) => `#${o.id} ${o.customer} · ${formatRupiah(o.total)}`} />
      </div>
      <div>
        <h3>Customers</h3>
        {/* T = Customer: c.city exists, c.total would be an error */}
        <List items={customers} getKey={(c) => c.code} renderItem={(c) => `${c.name} (${c.city})`} />
      </div>
    </div>
  )
}
