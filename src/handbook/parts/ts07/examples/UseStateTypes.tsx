import { useState } from 'react'
import { sampleOrders, type Order, type RequestState } from './types.ts'

const box = { border: '1px solid #ddd', borderRadius: 8, padding: 8, marginBottom: 8 }

export default function UseStateTypes() {
  // 1. Inferred from the initial value: no <...> needed
  const [qty, setQty] = useState(1) // number
  const [search, setSearch] = useState('') // string
  const [urgent, setUrgent] = useState(false) // boolean

  // 2. An empty array: say what it will hold, or it can't hold anything useful
  const [orders, setOrders] = useState<Order[]>([])

  // 3. "Nothing yet": a union with null
  const [selected, setSelected] = useState<Order | null>(null)

  // 4. A discriminated union (TS Part 4) as state
  const [request, setRequest] = useState<RequestState<Order[]>>({ status: 'loading' })

  return (
    <div>
      <div style={box}>
        <strong>Inferred</strong>{' '}
        <button onClick={() => setQty(qty + 1)}>qty: {qty}</button>{' '}
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="search" style={{ width: 100 }} />{' '}
        <label>
          <input type="checkbox" checked={urgent} onChange={(e) => setUrgent(e.target.checked)} /> urgent
        </label>
      </div>

      <div style={box}>
        <strong>useState&lt;Order[]&gt;([])</strong>{' '}
        <button onClick={() => setOrders(sampleOrders)}>Load sample orders</button>{' '}
        <button onClick={() => setOrders([])}>Clear</button>
        <ul>
          {orders.map((o) => (
            <li key={o.id}>
              <button onClick={() => setSelected(o)}>Select</button> #{o.id} {o.customer}
            </li>
          ))}
        </ul>
        <strong>useState&lt;Order | null&gt;(null)</strong>: {selected?.customer ?? 'nothing selected'}{' '}
        {selected && <button onClick={() => setSelected(null)}>Clear selection</button>}
      </div>

      <div style={box}>
        <strong>useState&lt;RequestState&lt;Order[]&gt;&gt;</strong>{' '}
        <button onClick={() => setRequest({ status: 'loading' })}>Loading</button>{' '}
        <button onClick={() => setRequest({ status: 'success', data: sampleOrders })}>Success</button>{' '}
        <button onClick={() => setRequest({ status: 'error', message: 'Server responded with 500' })}>Error</button>
        <p>
          {request.status === 'loading' && 'Loading orders…'}
          {request.status === 'success' && `${request.data.length} orders loaded`}
          {request.status === 'error' && `Error: ${request.message}`}
        </p>
      </div>
    </div>
  )
}
