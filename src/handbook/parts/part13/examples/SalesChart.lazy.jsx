import { formatRupiah } from '../../../../utils/format'

// A "heavy" component that is only downloaded when it is needed.
// (In a real app this might be a big chart or PDF library.)
const months = [
  { month: 'Jul', total: 41000000 },
  { month: 'Aug', total: 56500000 },
  { month: 'Sep', total: 48200000 },
  { month: 'Oct', total: 63900000 },
]

const max = Math.max(...months.map((m) => m.total))

export default function SalesChart() {
  return (
    <div>
      <h3>Sales per month</h3>
      {months.map((m) => (
        <div key={m.month} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ width: 32 }}>{m.month}</span>
          <div style={{ background: '#0ea5e9', height: 16, width: `${(m.total / max) * 240}px` }} />
          <small>{formatRupiah(m.total)}</small>
        </div>
      ))}
    </div>
  )
}
