import { memo, useCallback, useMemo, useState } from 'react'
import { formatRupiah } from '../../../../utils/format'
import { generateOrders } from './generateOrders.js'

const allOrders = generateOrders(300)

function matches(order, search) {
  return order.customer.toLowerCase().includes(search.trim().toLowerCase())
}

// Shows when the table last rendered (Part 7 technique).
function RenderedAt() {
  // new Date() during render is impure, but only displayed here, on purpose.
  // eslint-disable-next-line react-hooks/purity -- deliberate, for the render timestamp
  const now = new Date()
  const time = `${now.toLocaleTimeString('id-ID')}.${String(now.getMilliseconds()).padStart(3, '0')}`
  return <small style={{ color: 'gray' }}>table rendered at {time}</small>
}

// A "slow-ish" child: renders 300 rows
function OrderTable({ orders, onSelect }) {
  return (
    <div>
      <RenderedAt />
      <div style={{ maxHeight: 180, overflowY: 'auto', border: '1px solid #ddd' }}>
        <table>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} onClick={() => onSelect(o.id)} style={{ cursor: 'pointer' }}>
                <td>#{o.id}</td>
                <td>{o.customer}</td>
                <td>{formatRupiah(o.total)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// memo: React skips re-rendering MemoOrderTable when EVERY prop is
// Object.is-equal to the previous render's prop.
const MemoOrderTable = memo(OrderTable)

// Shared parent UI: search box, Help toggle, selected order
function Controls({ search, setSearch, showHelp, setShowHelp, selectedId }) {
  return (
    <>
      <p>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Filter by customer" />{' '}
        <button onClick={() => setShowHelp(!showHelp)}>{showHelp ? 'Hide help' : 'Help'}</button>{' '}
        <small>Selected: {selectedId ? `#${selectedId}` : '–'}</small>
      </p>
      {showHelp && <p style={{ background: '#fef9c3', padding: 6 }}>Click a row to select an order. Type to filter.</p>}
    </>
  )
}

// (A) No memo: every parent render re-renders the table
function VersionA() {
  const [search, setSearch] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const visible = allOrders.filter((o) => matches(o, search))
  return (
    <>
      <Controls {...{ search, setSearch, showHelp, setShowHelp, selectedId }} />
      <OrderTable orders={visible} onSelect={(id) => setSelectedId(id)} />
    </>
  )
}

// (B) memo, but the props are NEW every render, so memo can't skip anything:
// filter() returns a new array and the arrow function is a new function.
function VersionB() {
  const [search, setSearch] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const visible = allOrders.filter((o) => matches(o, search)) // new array every render
  return (
    <>
      <Controls {...{ search, setSearch, showHelp, setShowHelp, selectedId }} />
      <MemoOrderTable orders={visible} onSelect={(id) => setSelectedId(id)} />
    </>
  )
}

// (C) memo + stable props: useMemo keeps the same array while search is the same,
// useCallback keeps the same function. Toggling Help no longer re-renders the table.
function VersionC() {
  const [search, setSearch] = useState('')
  const [showHelp, setShowHelp] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const visible = useMemo(() => allOrders.filter((o) => matches(o, search)), [search])
  const handleSelect = useCallback((id) => setSelectedId(id), [])
  return (
    <>
      <Controls {...{ search, setSearch, showHelp, setShowHelp, selectedId }} />
      <MemoOrderTable orders={visible} onSelect={handleSelect} />
    </>
  )
}

const versions = {
  A: { label: '(A) No memo', Component: VersionA },
  B: { label: '(B) memo, new props each render', Component: VersionB },
  C: { label: '(C) memo + useMemo + useCallback', Component: VersionC },
}

export default function MemoOrderTableDemo() {
  const [version, setVersion] = useState('A')
  const { Component } = versions[version]

  return (
    <div>
      <p>
        {Object.entries(versions).map(([key, v]) => (
          <label key={key} style={{ marginRight: 12 }}>
            <input type="radio" name="memo-version" checked={version === key} onChange={() => setVersion(key)} />{' '}
            {v.label}
          </label>
        ))}
      </p>
      {/* key: each version starts fresh when you switch (Part 7) */}
      <Component key={version} />
    </div>
  )
}
