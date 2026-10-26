import { formatRupiah } from '../../../../utils/format'
import { orders } from './orders.js'

// Plain CSS for this example. (In a real app it would live in a .css file.)
const css = `
  .order-row-rejected td { color: #999; text-decoration: line-through; }
`

export default function ConditionalClassName() {
  return (
    <>
      <style>{css}</style>
      <table>
        <tbody>
          {orders.slice(0, 4).map((o) => (
            // CONDITIONAL className: add the class only for rejected orders
            <tr key={o.id} className={o.status === 'rejected' ? 'order-row-rejected' : ''}>
              <td>#{o.id}</td>
              <td>{o.customer}</td>
              {/* CONDITIONAL style object: same idea with inline styles */}
              <td style={{ fontWeight: o.status === 'pending' ? 'bold' : 'normal' }}>{o.status}</td>
              <td>{formatRupiah(o.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
