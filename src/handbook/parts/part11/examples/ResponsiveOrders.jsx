import { formatRupiah } from '../../../../utils/format'
import { useWindowWidth } from './hooks/useWindowWidth.js'

const orders = [
  { id: 101, customer: 'PT Maju Jaya', total: 750000, status: 'approved' },
  { id: 102, customer: 'CV Sinar Abadi', total: 1250000, status: 'pending' },
  { id: 103, customer: 'PT Karya Baru', total: 480000, status: 'rejected' },
]

const card = { border: '1px solid #ddd', borderRadius: 8, padding: 10, marginBottom: 8 }

export default function ResponsiveOrders() {
  // One line instead of useState + useEffect + addEventListener + cleanup
  const width = useWindowWidth()
  const isNarrow = width < 768

  return (
    <div>
      <p>
        <small>
          Window width: {width}px → {isNarrow ? 'cards' : 'table'}
        </small>
      </p>
      {isNarrow ? (
        orders.map((o) => (
          <div key={o.id} style={card}>
            <strong>
              #{o.id} {o.customer}
            </strong>
            <div>
              {formatRupiah(o.total)} · {o.status}
            </div>
          </div>
        ))
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>#{o.id}</td>
                <td>{o.customer}</td>
                <td>{formatRupiah(o.total)}</td>
                <td>{o.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
