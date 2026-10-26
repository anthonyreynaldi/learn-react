import { useEffect, useState } from 'react'

const orders = [
  { id: 101, customer: 'PT Maju Jaya' },
  { id: 102, customer: 'CV Sinar Abadi' },
  { id: 103, customer: 'PT Karya Baru' },
  { id: 104, customer: 'PT Maju Jaya' },
]

function matches(order, search) {
  return order.customer.toLowerCase().includes(search.trim().toLowerCase())
}

// Shows when this component last rendered, with milliseconds (technique from Part 7).
function RenderedAt() {
  // new Date() during render is impure, but it is only displayed here, on purpose.
  // eslint-disable-next-line react-hooks/purity -- deliberate, for the render timestamp
  const now = new Date()
  const time = `${now.toLocaleTimeString('id-ID')}.${String(now.getMilliseconds()).padStart(3, '0')}`
  return <small style={{ color: 'gray' }}>rendered at {time}</small>
}

// ✗ Effect version: filtered list copied into state by an effect.
// Each keystroke: render with the OLD list → effect → setState → render AGAIN.
function EffectFilter({ search }) {
  const [visible, setVisible] = useState(orders)
  useEffect(() => {
    // The pattern this topic warns against, kept on purpose for comparison.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- deliberate "wrong" version
    setVisible(orders.filter((o) => matches(o, search)))
  }, [search])

  return (
    <div>
      <h3>Effect + state</h3>
      <RenderedAt />
      <ul>
        {visible.map((o) => (
          <li key={o.id}>
            #{o.id} {o.customer}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ✓ Derived version: calculated during render. One render per keystroke.
function DerivedFilter({ search }) {
  const visible = orders.filter((o) => matches(o, search))
  return (
    <div>
      <h3>Derived during render</h3>
      <RenderedAt />
      <ul>
        {visible.map((o) => (
          <li key={o.id}>
            #{o.id} {o.customer}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function EffectVsDerived() {
  // One shared search box, so both versions start rendering at the same moment
  const [search, setSearch] = useState('')
  return (
    <div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search customer" />
      <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
        <EffectFilter search={search} />
        <DerivedFilter search={search} />
      </div>
    </div>
  )
}
