import { formatRupiah } from '../../../../utils/format'
import { orders } from './orders.js'

export default function GroupByStatus() {
  // reduce builds an object: { approved: [...], pending: [...], rejected: [...] }
  // push is fine here: the {} and the arrays are NEW, created inside this
  // reduce on this render. We are not mutating state or props.
  const groups = orders.reduce((acc, order) => {
    if (!acc[order.status]) acc[order.status] = []
    acc[order.status].push(order)
    return acc
  }, {})

  return (
    <div>
      {/* Object.entries turns the object into [[status, orders], ...] so we can map it */}
      {Object.entries(groups).map(([status, group]) => {
        const subtotal = group.reduce((sum, o) => sum + o.total, 0)
        return (
          // Level 1 key: the status (unique among the sections)
          <section key={status}>
            <h3>
              {status} ({group.length}) — {formatRupiah(subtotal)}
            </h3>
            <ul>
              {/* Level 2 key: the order id (unique within this list) */}
              {group.map((o) => (
                <li key={o.id}>
                  #{o.id} {o.customer} — {formatRupiah(o.total)}
                </li>
              ))}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
